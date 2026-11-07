#!/usr/bin/env node
'use strict';

/*
 * alfaprosys — local-first server
 *
 * This server serves the application and provides a small PostgREST-compatible
 * local store for the calls already made by the browser. Mutations are written
 * to disk first, then queued for replay to Supabase when Internet is available.
 * No npm package is required.
 */

const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');
const { URL } = require('url');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || process.argv[2] || 3030);
const HOST = process.env.HOST || '0.0.0.0';
const REPLICA_TOKEN = String(process.env.ALFA_REPLICA_TOKEN || '');
const DATA_DIR = path.resolve(process.env.ALFA_DATA_DIR || path.join(ROOT, 'offline-data'));
const STORE_FILE = path.join(DATA_DIR, 'local-store.json');
const OPS_FILE = path.join(DATA_DIR, 'cloud-outbox.ndjson');
const INFLIGHT_OPS_FILE = path.join(DATA_DIR, 'cloud-outbox.inflight.ndjson');
const FAILED_OPS_FILE = path.join(DATA_DIR, 'cloud-outbox-failed.ndjson');
const CONFIG_FILE = path.join(ROOT, 'assets', 'js', 'config.js');
const AUTH_FILE = path.resolve(process.env.ALFA_AUTH_FILE || path.join(ROOT, 'offline-auth.json'));
const SESSION_COOKIE = 'alfaprosys_session';
const sessions = new Map();
const MENU_TABLES = new Set(['categories', 'items']);
const INVENTORY_TABLES = new Set(['inventory_materials', 'inventory_log']);
const EXPENDITURE_TABLES = new Set(['expenditures', 'material_purchases']);
/* الجلب الصريح من السحابة متاح للمنيو والفواتير؛ بقية الجداول تبقى
   محلية حتى تطلب شاشتها مسارها الخاص. */
const CLOUD_PULL_TABLES = new Set(['categories', 'items', 'invoices', 'invoice_items']);
/* الأعمدة الفعلية الموجودة حالياً في Supabase.invoice_items. الحقول
   الإضافية تبقى محلية ولا يجوز أن توقف رفع الفواتير كلها. */
const INVOICE_ITEM_CLOUD_COLUMNS = [
  'invoice_id', 'item_id', 'name', 'qty', 'price', 'total', 'note',
  'offer_id', 'is_free', 'offer_disc',
];
const MANAGER_ONLY_TABLES = new Set([
  'categories', 'items', 'offers', 'offer_items', 'price_settings',
]);
const CASHIER_SETTING_KEYS = new Set(['cashier_session']);
const PRIVATE_STATIC_NAMES = new Set([
  'offline_server.js', 'offline-auth.json', 'offline-network.conf',
  'package.json', 'supabase_fixes.sql',
]);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

/* Tables used by the application. Unknown tables are also accepted, so a
   future module does not silently lose local work. */
const BOOTSTRAP_TABLES = [
  'categories', 'items', 'customers', 'invoices', 'invoice_items',
  'inventory_materials', 'inventory_log', 'suppliers', 'employees',
  'contracts', 'contract_installments', 'expenditures', 'material_purchases',
  'audit_log', 'settings', 'offers', 'offer_items', 'loyalty_ledger',
  'online_orders', 'delivery_agents', 'shifts', 'dining_tables',
];

function readCloudConfig() {
  if (process.env.ALFA_LOCAL_ONLY === '1' || process.env.ALFA_LOCAL_ONLY === 'true') {
    return { url: '', anonKey: '' };
  }
  let text = '';
  try { text = fs.readFileSync(CONFIG_FILE, 'utf8'); } catch (e) {}
  const url = process.env.ALFA_SUPABASE_URL ||
    ((text.match(/url:\s*['"](https?:\/\/[^'"]+)['"]/i) || [])[1] || '');
  const anonKey = process.env.ALFA_SUPABASE_ANON_KEY ||
    ((text.match(/anonKey:\s*['"]([^'"]+)['"]/i) || [])[1] || '');
  return { url: String(url || '').replace(/\/$/, ''), anonKey: String(anonKey || '') };
}

const CLOUD = readCloudConfig();
const PEER_URL = String(process.env.ALFA_PEER_URL || '').replace(/\/$/, '');
const NODE_NAME = process.env.ALFA_NODE_NAME || require('os').hostname();
const IS_STANDBY = NODE_NAME === 'secondary-standby';
let store = {
  version: 1,
  tables: {},
  initialized: {},
  meta: {
    createdAt: new Date().toISOString(),
    lastCloudFlush: null,
    lastReplicaAt: null,
    appliedOps: {},
  },
};
let writeChain = Promise.resolve();
/* All outbox file mutations share one in-process queue. Cloud network waits
   never hold this queue: a flush first claims the current file, so writes
   arriving during a slow upload go to a fresh active file. */
let outboxMutationChain = Promise.resolve();
let flushPromise = null;
let flushAgainRequested = false;
let syncPromise = null;
let peerPromise = null;
let peerState = { ok: !PEER_URL, lastAt: null, error: '' };

function log(...args) { console.log('[offline-server]', ...args); }
function warn(...args) { console.warn('[offline-server]', ...args); }

function loadAuthConfig() {
  try {
    const parsed = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
    if (parsed && parsed.users && typeof parsed.users === 'object') return parsed;
  } catch (e) {
    warn('offline authentication file could not be read:', e.message);
  }
  return { users: {} };
}

const AUTH = loadAuthConfig();

function authUser(role, pin) {
  const user = AUTH.users && AUTH.users[String(role || '')];
  if (!user || !user.hash || !user.salt) return false;
  const iterations = Number(user.iterations) || 210000;
  const actual = crypto.pbkdf2Sync(
    Buffer.from(String(pin == null ? '' : pin), 'utf8'),
    Buffer.from(String(user.salt), 'hex'),
    iterations, 32, 'sha256'
  );
  const expected = Buffer.from(String(user.hash), 'hex');
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function requestCookies(req) {
  const out = {};
  String(req.headers.cookie || '').split(';').forEach((part) => {
    const at = part.indexOf('=');
    if (at < 0) return;
    const key = part.slice(0, at).trim();
    const value = part.slice(at + 1).trim();
    if (key) out[key] = value;
  });
  return out;
}

function requestRole(req) {
  const token = requestCookies(req)[SESSION_COOKIE];
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt && session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return session.role || null;
}

function setSessionCookie(res, token) {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800`);
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
}

function requireAuthenticated(req, res) {
  const role = requestRole(req);
  if (!role) {
    json(res, 401, { error: 'authentication required' });
    return null;
  }
  return role;
}

function requireTableWriteRole(req, res, tableName) {
  const role = requireAuthenticated(req, res);
  if (!role) return null;
  if (MANAGER_ONLY_TABLES.has(tableName) && role !== 'manager') {
    json(res, 403, { error: 'manager role required', table: tableName });
    return null;
  }
  return role;
}

function ensureTable(name) {
  if (!Array.isArray(store.tables[name])) store.tables[name] = [];
  return store.tables[name];
}

function loadStore() {
  try {
    const raw = fs.readFileSync(STORE_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      store = Object.assign(store, parsed);
      store.tables = store.tables && typeof store.tables === 'object' ? store.tables : {};
      store.initialized = store.initialized && typeof store.initialized === 'object' ? store.initialized : {};
      store.meta = store.meta && typeof store.meta === 'object' ? store.meta : {};
      store.meta.appliedOps = store.meta.appliedOps && typeof store.meta.appliedOps === 'object'
        ? store.meta.appliedOps : {};
    }
  } catch (e) {
    if (e.code !== 'ENOENT') warn('local store could not be read:', e.message);
  }
  BOOTSTRAP_TABLES.forEach(ensureTable);
}

function persist() {
  const snapshot = JSON.stringify(store, null, 2);
  writeChain = writeChain.then(async () => {
    await fsp.mkdir(DATA_DIR, { recursive: true });
    const tmp = STORE_FILE + '.tmp';
    await fsp.writeFile(tmp, snapshot, 'utf8');
    await fsp.rename(tmp, STORE_FILE);
  }).catch((e) => warn('local store write failed:', e.message));
  return writeChain;
}

function outboxOpId(op) {
  return String(op && (op.id || op.opId || '') || '');
}

function uniqueOutboxOps(...lists) {
  const map = new Map();
  lists.flat().forEach((op) => {
    const id = outboxOpId(op);
    if (id && !map.has(id)) map.set(id, op);
  });
  return Array.from(map.values());
}

function readNdjsonFile(file) {
  try {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
    const rows = [];
    lines.forEach((line, index) => {
      try {
        const value = JSON.parse(line);
        if (value && typeof value === 'object') rows.push(value);
      } catch (e) {
        warn('cloud outbox invalid line:', path.basename(file), index + 1, e.message);
      }
    });
    return rows;
  } catch (e) {
    if (e.code !== 'ENOENT') warn('cloud outbox could not be read:', path.basename(file), e.message);
    return [];
  }
}

function readPendingOps() {
  /* An in-flight claim is still pending from the operator's perspective. */
  return uniqueOutboxOps(readNdjsonFile(OPS_FILE), readNdjsonFile(INFLIGHT_OPS_FILE));
}

function readFailedOps() {
  return readNdjsonFile(FAILED_OPS_FILE);
}

function queueOutboxMutation(task) {
  const run = outboxMutationChain.then(task);
  outboxMutationChain = run.catch(() => {});
  return run;
}

async function writeNdjsonFile(file, ops) {
  const text = ops.length ? ops.map((x) => JSON.stringify(x)).join('\n') + '\n' : '';
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const tmp = file + '.tmp';
  await fsp.writeFile(tmp, text, 'utf8');
  await fsp.rename(tmp, file);
}

async function appendNdjsonFile(file, ops) {
  if (!ops.length) return;
  const text = ops.map((x) => JSON.stringify(x)).join('\n') + '\n';
  await fsp.mkdir(DATA_DIR, { recursive: true });
  await fsp.appendFile(file, text, 'utf8');
}

/* If the process stopped after claiming the active file but before finishing
   the upload, put the claim back into the active queue before accepting work. */
function recoverInflightOutbox() {
  if (!fs.existsSync(INFLIGHT_OPS_FILE)) return;
  const recovered = uniqueOutboxOps(readNdjsonFile(INFLIGHT_OPS_FILE), readNdjsonFile(OPS_FILE));
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const tmp = OPS_FILE + '.recover.tmp';
    const text = recovered.length ? recovered.map((x) => JSON.stringify(x)).join('\n') + '\n' : '';
    fs.writeFileSync(tmp, text, 'utf8');
    fs.renameSync(tmp, OPS_FILE);
    fs.unlinkSync(INFLIGHT_OPS_FILE);
    warn('recovered interrupted cloud outbox claim:', recovered.length);
  } catch (e) {
    warn('cloud outbox recovery failed:', e.message);
  }
}

/* Replace only the operations represented by snapshotOps. Writes appended
   after that snapshot are merged in, never discarded. This is used by peer
   replication; normal local mutations use appendPendingOps(). */
async function writePendingOps(ops, snapshotOps) {
  const activeFlush = flushPromise;
  if (activeFlush) await activeFlush.catch(() => {});
  const snapshotIds = new Set((Array.isArray(snapshotOps) ? snapshotOps : []).map(outboxOpId));
  return queueOutboxMutation(async () => {
    const current = readNdjsonFile(OPS_FILE);
    const concurrent = current.filter((op) => !snapshotIds.has(outboxOpId(op)));
    const merged = uniqueOutboxOps(ops, concurrent);
    await writeNdjsonFile(OPS_FILE, merged);
    return merged;
  }).catch((e) => {
    warn('cloud outbox write failed:', e.message);
    throw e;
  });
}

function appendPendingOps(ops) {
  return queueOutboxMutation(() => appendNdjsonFile(OPS_FILE, ops).then(() => ops));
}

function claimPendingOps() {
  return queueOutboxMutation(async () => {
    if (fs.existsSync(INFLIGHT_OPS_FILE)) {
      const recovered = uniqueOutboxOps(readNdjsonFile(INFLIGHT_OPS_FILE), readNdjsonFile(OPS_FILE));
      await writeNdjsonFile(OPS_FILE, recovered);
      try { await fsp.unlink(INFLIGHT_OPS_FILE); } catch (e) {
        if (e.code !== 'ENOENT') throw e;
      }
    }
    const active = readNdjsonFile(OPS_FILE);
    if (!active.length) return [];
    await fsp.mkdir(DATA_DIR, { recursive: true });
    await fsp.rename(OPS_FILE, INFLIGHT_OPS_FILE);
    await fsp.writeFile(OPS_FILE, '', 'utf8');
    return active;
  });
}

function finishClaim(retryOps, failedOps) {
  return queueOutboxMutation(async () => {
    const active = readNdjsonFile(OPS_FILE);
    const merged = uniqueOutboxOps(retryOps, active);
    await writeNdjsonFile(OPS_FILE, merged);
    if (failedOps.length) {
      const existingFailed = readFailedOps();
      await writeNdjsonFile(FAILED_OPS_FILE, uniqueOutboxOps(existingFailed, failedOps));
    }
    try { await fsp.unlink(INFLIGHT_OPS_FILE); } catch (e) {
      if (e.code !== 'ENOENT') throw e;
    }
    return merged;
  });
}

function requeueFailedOps() {
  return queueOutboxMutation(async () => {
    const failed = readFailedOps();
    const revived = failed.map((op) => {
      const next = sanitizeCloudOperation(Object.assign({}, op, { attempts: 0, lastError: '' }));
      delete next.lastStatus;
      delete next.failedAt;
      delete next.failureType;
      return next;
    });
    const active = readNdjsonFile(OPS_FILE);
    /* Write the active queue first. If power is lost before clearing the
       failed file, the operation may be duplicated but cannot be lost. */
    await writeNdjsonFile(OPS_FILE, uniqueOutboxOps(revived, active));
    await writeNdjsonFile(FAILED_OPS_FILE, []);
    return revived.length;
  });
}

/* إصلاح تلقائي لعمليات invoice_items القديمة التي عُزلت بسبب أعمدة محلية
   غير موجودة في Supabase. لا نعيد محاولة أخطاء الجداول الأخرى تلقائياً. */
function repairFailedInvoiceItemOps() {
  return queueOutboxMutation(async () => {
    const failed = readFailedOps();
    const repairable = [];
    const keep = [];
    failed.forEach((op) => {
      const parsed = operationUrl(op);
      const table = parsed ? parsed.pathname.replace(/^\/rest\/v1\//, '') : '';
      if (table === 'invoice_items' && ['POST', 'PUT', 'PATCH'].includes(String(op.method || '').toUpperCase())) {
        const next = sanitizeCloudOperation(Object.assign({}, op, { attempts: 0, lastError: '' }));
        delete next.lastStatus;
        delete next.failedAt;
        delete next.failureType;
        repairable.push(next);
      } else {
        keep.push(op);
      }
    });
    if (!repairable.length) return 0;
    const active = readPendingOps();
    await writeNdjsonFile(OPS_FILE, uniqueOutboxOps(repairable, active));
    await writeNdjsonFile(FAILED_OPS_FILE, keep);
    return repairable.length;
  });
}

/* Idempotency is local-first infrastructure, not a UI feature. Browser
   retries, pagehide/keepalive, and a reconnect can repeat the same REST
   mutation. Remember a bounded set of operation IDs on disk so a repeated
   request is acknowledged without duplicating a row or audit event. */
function appliedOperationMap() {
  if (!store.meta || typeof store.meta !== 'object') store.meta = {};
  if (!store.meta.appliedOps || typeof store.meta.appliedOps !== 'object') store.meta.appliedOps = {};
  return store.meta.appliedOps;
}

function operationAlreadyApplied(opId) {
  if (!opId) return false;
  return Object.prototype.hasOwnProperty.call(appliedOperationMap(), String(opId));
}

function rememberAppliedOperation(opId) {
  if (!opId) return;
  const map = appliedOperationMap();
  map[String(opId)] = Date.now();
  const entries = Object.entries(map).sort((a, b) => Number(a[1]) - Number(b[1]));
  /* Keep the disk metadata bounded while retaining several days of retries. */
  const keep = entries.slice(-5000);
  store.meta.appliedOps = Object.fromEntries(keep);
}

function operationUrl(op) {
  try { return new URL(String(op && op.path || ''), 'http://replica.local'); } catch (e) { return null; }
}

function operationTable(op) {
  const parsed = operationUrl(op);
  if (!parsed || !parsed.pathname.startsWith('/rest/v1/')) return '';
  return parsed.pathname.slice('/rest/v1/'.length).split('/')[0];
}

function isMenuOperation(op) {
  return MENU_TABLES.has(operationTable(op));
}

function menuOperations(ops) {
  return (Array.isArray(ops) ? ops : []).filter(isMenuOperation);
}

function operationsForTables(ops, tables) {
  return (Array.isArray(ops) ? ops : []).filter((op) => tables.has(operationTable(op)));
}

function inventoryOperations(ops) {
  return operationsForTables(ops, INVENTORY_TABLES);
}

function expenditureOperations(ops) {
  return operationsForTables(ops, EXPENDITURE_TABLES);
}

function sanitizeInvoiceItemRow(row) {
  if (!row || typeof row !== 'object') return row;
  const out = {};
  INVOICE_ITEM_CLOUD_COLUMNS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(row, key)) out[key] = row[key];
  });
  return out;
}

/* Operations created by older clients may contain local-only invoice item
   fields. Strip them at the server boundary as well, so an old outbox can be
   repaired without losing the invoice or blocking later uploads. */
function sanitizeCloudOperation(op) {
  if (!op || typeof op !== 'object') return op;
  const parsed = operationUrl(op);
  if (!parsed || parsed.pathname.replace(/^\/rest\/v1\//, '') !== 'invoice_items') return op;
  if (!['POST', 'PUT', 'PATCH'].includes(String(op.method || '').toUpperCase())) return op;
  const next = Object.assign({}, op);
  if (Array.isArray(op.body)) next.body = op.body.map(sanitizeInvoiceItemRow);
  else if (op.body && typeof op.body === 'object') next.body = sanitizeInvoiceItemRow(op.body);
  return next;
}

/* Replay a queued REST mutation into memory while importing a replica. The
   replay is deliberately idempotent for ordinary inserts: a row with the
   same id is merged rather than appended twice. */
function applyReplicaOperation(op) {
  if (!op || !op.method) return;
  const parsed = operationUrl(op);
  if (!parsed || !parsed.pathname.startsWith('/rest/v1/')) return;
  const restPath = parsed.pathname.slice('/rest/v1/'.length);
  if (!restPath || restPath.includes('/') || restPath.startsWith('rpc')) return;
  const tableName = restPath;
  ensureTable(tableName);
  const search = parsed.searchParams;
  if (op.method === 'POST') {
    if (search.has('on_conflict')) {
      applyUpsert(tableName, op.body, conflictKeys(search));
      return;
    }
    const rows = Array.isArray(op.body) ? op.body : [op.body];
    const table = ensureTable(tableName);
    rows.filter((row) => row && typeof row === 'object').forEach((row) => {
      const key = row.id != null ? 'id' : (row.key != null ? 'key' : '');
      const ix = key ? table.findIndex((old) => equalValue(old && old[key], row[key])) : -1;
      if (ix >= 0) table[ix] = Object.assign({}, table[ix], row);
      else table.push(Object.assign({}, row));
    });
  } else if (op.method === 'PATCH' || op.method === 'PUT') {
    applyPatch(tableName, search, op.body || {});
  } else if (op.method === 'DELETE') {
    applyDelete(tableName, search);
  }
}

function applyReplicaOperations(ops) {
  (Array.isArray(ops) ? ops : []).forEach(applyReplicaOperation);
}

function uniqueOperations(...lists) {
  const map = new Map();
  lists.flat().forEach((op) => {
    if (op && op.id) map.set(String(op.id), op);
  });
  return Array.from(map.values());
}

function replicaPendingMap() {
  const current = store.meta && store.meta.replicaPending;
  return current && typeof current === 'object' ? current : {};
}

async function replicateToPeer() {
  if (!PEER_URL || peerPromise) return;
  peerPromise = (async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    try {
      const outboundOps = readPendingOps();
      const payload = {
        source: NODE_NAME,
        store,
        pendingOperations: outboundOps,
      };
      const response = await fetch(PEER_URL + '/__replica/state', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(REPLICA_TOKEN ? { 'X-Alfa-Replica-Token': REPLICA_TOKEN } : {}),
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('peer http ' + response.status);
      let remote = null;
      try { remote = await response.json(); } catch (e) {}
      if (remote && remote.store && typeof remote.store === 'object') {
        const localOpsNow = readPendingOps();
        const remoteOps = Array.isArray(remote.pendingOperations) ? remote.pendingOperations : [];
        const oldMeta = store.meta || {};
        const incoming = remote.store;
        store = {
          version: Number(incoming.version) || 1,
          tables: incoming.tables && typeof incoming.tables === 'object' ? incoming.tables : {},
          initialized: incoming.initialized && typeof incoming.initialized === 'object' ? incoming.initialized : {},
          meta: Object.assign({}, oldMeta, incoming.meta || {}),
        };
        BOOTSTRAP_TABLES.forEach(ensureTable);
        /* The peer response is a hand-off acknowledgement. Replaying the
           union of queued mutations protects writes made during the request
           and makes a primary/secondary role switch converge offline. */
        const mergedOps = uniqueOperations(localOpsNow, outboundOps, remoteOps);
        applyReplicaOperations(mergedOps);
        /* An operation that was present when the peer request started but is
           absent now was already uploaded or quarantined meanwhile. Do not
           resurrect it from the peer response and upload it twice. */
        const nowIds = new Set(localOpsNow.map((op) => String(op && op.id || '')));
        const leftDuringFlight = new Set(outboundOps
          .map((op) => String(op && op.id || ''))
          .filter((id) => id && !nowIds.has(id)));
        const outboxOps = mergedOps.filter((op) => !leftDuringFlight.has(String(op && op.id || '')));
        const tracked = replicaPendingMap();
        tracked[String(remote.source || 'peer')] = remoteOps.map((op) => String(op.id)).filter(Boolean);
        store.meta.replicaPending = tracked;
        await writePendingOps(outboxOps, localOpsNow);
        store.meta.lastReplicaAt = new Date().toISOString();
        await persist();
      }
      peerState = { ok: true, lastAt: new Date().toISOString(), error: '' };
    } catch (e) {
      peerState = { ok: false, lastAt: peerState.lastAt, error: String(e && e.message || e) };
    } finally {
      clearTimeout(timer);
      peerPromise = null;
    }
  })();
  return peerPromise;
}

function queueOperation(method, requestPath, body, headers, role, opId) {
  const op = {
    id: String(opId || `${Date.now()}-${Math.random().toString(16).slice(2)}`),
    opId: String(opId || ''),
    at: new Date().toISOString(),
    actorRole: role || 'system',
    method,
    path: requestPath,
    body: body == null ? null : body,
    prefer: headers && headers.prefer ? headers.prefer : undefined,
    attempts: 0,
    lastError: '',
  };
  return appendPendingOps([op]).then(() => op);
}

function parseScalar(raw) {
  let v = raw == null ? '' : String(raw);
  try { v = decodeURIComponent(v); } catch (e) {}
  v = v.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v === 'null') return null;
  if (/^-?(?:\d+\.?\d*|\.\d+)$/.test(v)) return Number(v);
  return v;
}

function parseFilter(raw) {
  let v = raw == null ? '' : String(raw);
  try { v = decodeURIComponent(v); } catch (e) {}
  if (v.startsWith('eq.')) return { op: 'eq', value: parseScalar(v.slice(3)) };
  if (v.startsWith('neq.')) return { op: 'neq', value: parseScalar(v.slice(4)) };
  if (v.startsWith('in.(') && v.endsWith(')')) {
    const inner = v.slice(4, -1);
    return { op: 'in', value: inner ? inner.split(',').map(parseScalar) : [] };
  }
  if (v === 'is.null') return { op: 'isnull', value: null };
  if (v === 'not.is.null') return { op: 'notnull', value: null };
  return { op: 'eq', value: parseScalar(v) };
}

function equalValue(a, b) {
  if (a == null || b == null) return a == null && b == null;
  return String(a) === String(b);
}

function rowMatches(row, search) {
  for (const [key, raw] of search.entries()) {
    if (['select', 'order', 'limit', 'offset', 'on_conflict', 'prefer'].includes(key)) continue;
    const f = parseFilter(raw);
    const value = row ? row[key] : undefined;
    if (f.op === 'eq' && !equalValue(value, f.value)) return false;
    if (f.op === 'neq' && equalValue(value, f.value)) return false;
    if (f.op === 'in' && !f.value.some((x) => equalValue(value, x))) return false;
    if (f.op === 'isnull' && value != null) return false;
    if (f.op === 'notnull' && value == null) return false;
  }
  return true;
}

function selectedRow(row, select) {
  if (!select || select === '*') return Object.assign({}, row);
  const fields = select.split(',').map((x) => x.trim()).filter(Boolean);
  const out = {};
  fields.forEach((field) => {
    /* Basic PostgREST aliases are enough for current screens. */
    const m = field.match(/^([A-Za-z0-9_]+)(?::([A-Za-z0-9_]+))?$/);
    if (m) out[m[2] || m[1]] = row[m[1]];
  });
  return out;
}

function sortRows(rows, order) {
  if (!order) return rows;
  const specs = String(order).split(',').map((part) => {
    const bits = part.trim().split('.');
    return { key: bits[0], dir: bits[1] === 'desc' ? -1 : 1 };
  });
  return rows.sort((a, b) => {
    for (const s of specs) {
      const av = a[s.key], bv = b[s.key];
      if (equalValue(av, bv)) continue;
      if (av == null) return -1 * s.dir;
      if (bv == null) return 1 * s.dir;
      return (String(av) < String(bv) ? -1 : 1) * s.dir;
    }
    return 0;
  });
}

function conflictKeys(search) {
  const raw = search.get('on_conflict') || 'id';
  return String(raw).split(',').map((x) => x.trim()).filter(Boolean);
}

function rowsSame(a, b, keys) {
  return keys.every((key) => a && b && a[key] != null && equalValue(a[key], b[key]));
}

function applyUpsert(tableName, payload, keys) {
  const table = ensureTable(tableName);
  const rows = Array.isArray(payload) ? payload : [payload];
  const result = [];
  for (const row of rows) {
    if (!row || typeof row !== 'object') continue;
    const ix = table.findIndex((old) => rowsSame(old, row, keys));
    if (ix >= 0) table[ix] = Object.assign({}, table[ix], row);
    else table.push(Object.assign({}, row));
    result.push(table[ix >= 0 ? ix : table.length - 1]);
  }
  return result;
}

function applyInsert(tableName, payload) {
  const table = ensureTable(tableName);
  const rows = Array.isArray(payload) ? payload : [payload];
  rows.filter((x) => x && typeof x === 'object').forEach((row) => table.push(Object.assign({}, row)));
  return rows;
}

function applyDelete(tableName, search) {
  const table = ensureTable(tableName);
  const before = table.length;
  const kept = table.filter((row) => !rowMatches(row, search));
  store.tables[tableName] = kept;
  return before - kept.length;
}

function applyPatch(tableName, search, payload) {
  const table = ensureTable(tableName);
  let n = 0;
  table.forEach((row) => {
    if (rowMatches(row, search)) { Object.assign(row, payload || {}); n++; }
  });
  return n;
}

/* Reads never reconcile a table from the cloud. Pending local writes are
   already represented in cloud-outbox.ndjson and are replayed by
   flushCloudOutbox() only. */

function localItemById(id) {
  if (id == null || id === '') return null;
  return ensureTable('items').find((item) => equalValue(item && item.id, id)) || null;
}

function invoiceItemRows(payload) {
  const rows = Array.isArray(payload) ? payload : [payload];
  return rows.map((source) => {
    const row = Object.assign({}, source || {});
    if (!row || typeof row !== 'object') return row;
    const qty = Number(row.qty);
    const price = Number(row.price);
    if (!Number.isFinite(qty) || qty <= 0 || !Number.isFinite(price)) {
      const error = new Error('invalid invoice item quantity or price');
      error.status = 422;
      throw error;
    }
    const item = row.item_id != null ? localItemById(row.item_id) : null;
    /* During first local bootstrap the browser can reach the node before the
       menu arrives; accept the local write then. Once the menu is initialized,
       an unknown item is rejected instead of silently accepting a bad price. */
    if (row.item_id != null && !item && store.initialized.items) {
      const error = new Error('menu snapshot is missing item ' + String(row.item_id));
      error.status = 409;
      throw error;
    }
    /* Offer/free/service lines have their own pricing context. A normal item
       line, however, must match the local menu unless it is an emergency
       override in this specific invoice. */
    if (item && !row.offer_id && !row.offer_disc && !row.is_free) {
      const normal = Math.round(Number(item.price) || 0);
      const applied = Math.round(price);
      if (row.price_override) {
        row.original_price = normal;
        row.price_override = true;
      } else if (applied !== normal) {
        const error = new Error('invoice item price does not match local menu price');
        error.status = 409;
        throw error;
      }
    }
    row.price = Math.round(price);
    row.total = Math.round(row.price * qty);
    return row;
  });
}

function recalculateLocalInvoiceTotals() {
  const invoices = ensureTable('invoices');
  const lines = ensureTable('invoice_items');
  const changed = [];
  invoices.forEach((invoice) => {
    if (!invoice || invoice.id == null) return;
    const sum = lines.filter((line) => equalValue(line && line.invoice_id, invoice.id))
      .reduce((total, line) => total + (Number(line && line.total) || 0), 0);
    const discount = Math.max(0, Math.round(Number(invoice.discount) || 0));
    const next = Math.max(0, Math.round(sum - discount));
    if (Number(invoice.total) !== next && lines.some((line) => equalValue(line && line.invoice_id, invoice.id))) {
      invoice.total = next;
      changed.push({ id: String(invoice.id), total: next });
    }
  });
  return changed;
}

function json(res, status, value, extra) {
  const body = value == null ? '' : JSON.stringify(value);
  res.writeHead(status, Object.assign({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, max-age=0',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,PUT,DELETE,OPTIONS,HEAD',
  }, extra || {}));
  res.end(body);
}

function text(res, status, value, extra) {
  res.writeHead(status, Object.assign({
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store, max-age=0',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,PUT,DELETE,OPTIONS,HEAD',
  }, extra || {}));
  res.end(value == null ? '' : String(value));
}

function isLoopbackRequest(req) {
  const address = String(req.socket && req.socket.remoteAddress || '');
  return address === '127.0.0.1' || address === '::1' || address === '::ffff:127.0.0.1';
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const buf = Buffer.concat(chunks);
      if (!buf.length) return resolve(null);
      const type = String(req.headers['content-type'] || '');
      if (type.includes('application/json')) {
        try { return resolve(JSON.parse(buf.toString('utf8'))); } catch (e) { return reject(new Error('bad json')); }
      }
      resolve(buf);
    });
    req.on('error', reject);
  });
}

function cloudHeaders(extra) {
  return Object.assign({
    apikey: CLOUD.anonKey,
    Authorization: 'Bearer ' + CLOUD.anonKey,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }, extra || {});
}

async function cloudRequest(method, requestPath, body, prefer, timeoutMs) {
  if (!CLOUD.url || !CLOUD.anonKey) throw new Error('Supabase configuration is missing');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Number(timeoutMs) || 8000);
  try {
    const init = { method, headers: cloudHeaders(prefer ? { Prefer: prefer } : {}), signal: controller.signal };
    if (body != null && method !== 'GET' && method !== 'HEAD') init.body = JSON.stringify(body);
    const response = await fetch(CLOUD.url + requestPath, init);
    const raw = await response.text();
    let parsed = raw;
    try { parsed = raw ? JSON.parse(raw) : null; } catch (e) {}
    if (!response.ok) {
      const err = new Error(`cloud ${response.status}: ${raw.slice(0, 220)}`);
      err.status = response.status;
      throw err;
    }
    return { status: response.status, value: parsed };
  } finally {
    clearTimeout(timer);
  }
}

function isPermanentCloudError(error) {
  const status = Number(error && error.status);
  if (!Number.isFinite(status)) return false;
  /* Operation-specific permanent rejections go to the dead-letter file.
     401/403 are deliberately not quarantined: they usually indicate a
     shared key/RLS/configuration problem, so valid operations must remain
     recoverable after the configuration is fixed. */
  return [400, 404, 405, 409, 410, 413, 414, 422].includes(status);
}

async function flushCloudOutbox() {
  if (IS_STANDBY) return {
    sent: 0,
    pending: readPendingOps().length,
    failed: readFailedOps().length,
    skipped: 'standby',
  };
  if (flushPromise) {
    flushAgainRequested = true;
    return flushPromise;
  }
  flushPromise = (async () => {
    const before = readPendingOps();
    if (!before.length || !CLOUD.url || !CLOUD.anonKey) {
      return { sent: 0, pending: before.length, failed: readFailedOps().length };
    }

    /* Atomically move the current queue aside. New local mutations append to
       a fresh cloud-outbox.ndjson while the slow network upload is running. */
    const ops = await claimPendingOps();
    if (!ops.length) return { sent: 0, pending: readPendingOps().length, failed: readFailedOps().length };

    let sent = 0;
    const retry = [];
    const failed = [];
    for (let index = 0; index < ops.length; index++) {
      const op = ops[index];
      try {
        const cloudOp = sanitizeCloudOperation(op);
        await cloudRequest(cloudOp.method, cloudOp.path, cloudOp.body, cloudOp.prefer);
        sent++;
      } catch (e) {
        op.attempts = Number(op.attempts || 0) + 1;
        op.lastError = String(e && e.message || e);
        op.lastStatus = Number(e && e.status) || null;
        if (isPermanentCloudError(e)) {
          op.failedAt = new Date().toISOString();
          op.failureType = 'permanent';
          failed.push(op);
          warn('cloud operation moved to failed outbox:', op.id, op.lastStatus, op.lastError);
          /* A rejected operation is isolated; later independent operations
             continue instead of being held behind it forever. */
          continue;
        }
        /* Network/5xx/rate-limit failures remain retryable. Keep this op and
           everything after it in order for the next reconnect attempt. */
        retry.push(op, ...ops.slice(index + 1));
        break;
      }
    }

    await finishClaim(retry, failed);
    if (sent || failed.length) {
      store.meta.lastCloudFlush = new Date().toISOString();
      await persist();
    }
    return {
      sent,
      pending: readPendingOps().length,
      failed: readFailedOps().length,
      failedNow: failed.length,
      retrying: retry.length,
    };
  })().catch((e) => {
    warn('cloud outbox flush failed; claimed operations will recover on restart:', e.message);
    return { sent: 0, pending: readPendingOps().length, failed: readFailedOps().length, error: e.message };
  }).finally(() => {
    const rerun = flushAgainRequested;
    flushAgainRequested = false;
    flushPromise = null;
    if (rerun && CLOUD.url && CLOUD.anonKey && !IS_STANDBY) {
      setImmediate(() => { flushCloudOutbox().catch(() => {}); });
    }
  });
  return flushPromise;
}

/* Upload-only reconnect path. The local store is never hydrated from
   Supabase at startup, on a REST read, or on a periodic timer. The embedded
   browser snapshot and local-store remain authoritative for the running node;
   this path only replays mutations already committed to cloud-outbox.ndjson. */
async function syncUploads() {
  if (syncPromise) return syncPromise;
  syncPromise = (async () => {
    const flushed = await flushCloudOutbox();
    await replicateToPeer();
    return { ok: true, uploaded: flushed && flushed.sent || 0, pending: readPendingOps().length };
  })().finally(() => { syncPromise = null; });
  return syncPromise;
}

async function handleRest(req, res, parsed) {
  const pathname = parsed.pathname;
  if (pathname === '/rest/v1/' || pathname === '/rest/v1') return json(res, 200, []);
  const restPath = pathname.slice('/rest/v1/'.length);
  if (!restPath || restPath.includes('/')) return json(res, 404, { error: 'unknown endpoint' });

  /* RPCs that are not local data operations are forwarded when possible. The
     invoice numbering service remains independent and is not replaced here. */
  if (restPath === 'rpc' || restPath.startsWith('rpc/')) {
    if (!CLOUD.url || !CLOUD.anonKey) return json(res, 503, { error: 'cloud unavailable' });
    try {
      const body = await readBody(req);
      const result = await cloudRequest(req.method, pathname + parsed.search, body, req.headers.prefer);
      return json(res, result.status || 200, result.value);
    } catch (e) {
      return json(res, e.status || 503, { error: String(e.message || e) });
    }
  }

  const tableName = restPath;
  ensureTable(tableName);

  /* القراءة السحابية ليست مسار إقلاع ولا قراءة عادية. لا تُنفّذ إلا عند
     ضغط زر «تحديث السحابة» الذي يرسل هذا العنوان صراحةً، ثم تُحفظ النتيجة
     محلياً حتى تستمر الشاشة أوفلاين بالبيانات الجديدة. */
  const explicitCloudPull = String(req.headers['x-alfa-cloud-pull'] || '') === '1';
  if (explicitCloudPull && req.method === 'GET' && CLOUD_PULL_TABLES.has(tableName)) {
    if (!requireAuthenticated(req, res)) return;
    if (!CLOUD.url || !CLOUD.anonKey) return json(res, 503, { error: 'cloud unavailable' });
    if (!IS_STANDBY) {
      try { await flushCloudOutbox(); } catch (e) {}
    }
    const pendingMenuOps = menuOperations(readPendingOps());
    const failedMenuOps = menuOperations(readFailedOps());
    /* قبول الكتابة محلياً ثم نقلها إلى failed outbox لا يجعلها آمنة
       للاستبدال بنسخة سحابية قديمة. هذا كان سبب اختفاء تعديل السعر
       بعد مغادرة الصفحة: upload المحلي ينجح، الرفع السحابي يفشل، ثم
       cloud-pull يرى السحابة القديمة ويمحو local-store. */
    if (pendingMenuOps.length || failedMenuOps.length) {
      return json(res, 409, {
        error: failedMenuOps.length ? 'failed local menu operations' : 'pending local menu operations',
        reason: failedMenuOps.length ? 'local-menu-upload-failed' : 'upload-before-pull',
        pendingMenuOperations: pendingMenuOps.length,
        failedMenuOperations: failedMenuOps.length,
      });
    }
    try {
      const result = await cloudRequest('GET', pathname + parsed.search, null, null);
      const rows = Array.isArray(result.value) ? result.value : [];
      store.tables[tableName] = rows;
      store.initialized[tableName] = true;
      store.meta.lastCloudPull = new Date().toISOString();
      await persist();
      res.setHeader('Cache-Control', 'no-store');
      return json(res, 200, rows);
    } catch (e) {
      return json(res, Number(e && e.status) || 503, { error: String(e && e.message || e) });
    }
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    /* Reads are local-only unless the explicit cloud-pull header above was
       sent by the user action. Reconnect still remains upload-only. */
    let rows = ensureTable(tableName).filter((row) => rowMatches(row, parsed.searchParams));
    sortRows(rows, parsed.searchParams.get('order'));
    const offset = Number(parsed.searchParams.get('offset') || 0) || 0;
    const limitRaw = parsed.searchParams.get('limit');
    if (offset) rows = rows.slice(offset);
    if (limitRaw != null) rows = rows.slice(0, Number(limitRaw) || 0);
    rows = rows.map((row) => selectedRow(row, parsed.searchParams.get('select') || '*'));
    if (req.method === 'HEAD') return text(res, 200, '');
    return json(res, 200, rows);
  }

  const role = requireTableWriteRole(req, res, tableName);
  if (!role) return;
  const opId = String(req.headers['x-alfa-op-id'] || '').trim();
  if (opId && operationAlreadyApplied(opId)) {
    return json(res, 200, { ok: true, idempotent: true, op_id: opId });
  }
  let body = await readBody(req);
  const search = parsed.searchParams;
  if (tableName === 'invoice_items' && ['POST', 'PUT'].includes(req.method)) {
    body = invoiceItemRows(body);
  }
  if (tableName === 'settings' && String(role).indexOf('cashier') === 0) {
    const rows = Array.isArray(body) ? body : [body];
    const queryKey = String(search.get('key') || '').replace(/^eq\./, '');
    const keys = rows.filter(Boolean).map((row) => row && row.key != null ? String(row.key) : queryKey);
    if (keys.some((key) => !CASHIER_SETTING_KEYS.has(key) && !key.startsWith('cashier_session:'))) {
      return json(res, 403, { error: 'cashier cannot change protected settings' });
    }
  }
  let result = [];
  if (req.method === 'POST') {
    if (search.has('on_conflict')) result = applyUpsert(tableName, body, conflictKeys(search));
    else result = applyInsert(tableName, body);
  } else if (req.method === 'PATCH' || req.method === 'PUT') {
    applyPatch(tableName, search, body || {});
    result = ensureTable(tableName).filter((row) => rowMatches(row, search));
  } else if (req.method === 'DELETE') {
    applyDelete(tableName, search);
  } else {
    return json(res, 405, { error: 'method not allowed' });
  }

  rememberAppliedOperation(opId);
  const op = await queueOperation(req.method, pathname + parsed.search, body, req.headers, role, opId);
  const derivedInvoiceTotals = tableName === 'invoice_items'
    ? recalculateLocalInvoiceTotals() : [];
  for (const correction of derivedInvoiceTotals) {
    const correctionPath = '/rest/v1/invoices?id=eq.' + encodeURIComponent(correction.id);
    const correctionOpId = (opId || op.id) + ':invoice-total:' + correction.id;
    await queueOperation('PATCH', correctionPath, { total: correction.total }, req.headers, role, correctionOpId);
  }
  await persist();
  /* Cloud sync and standby replication are best-effort and never delay the
     local response. The local disk commit above is the source of truth. */
  setImmediate(() => {
    flushCloudOutbox().catch(() => {});
    replicateToPeer().catch(() => {});
  });
  if (req.headers.prefer && String(req.headers.prefer).includes('return=representation')) return json(res, 200, result);
  if (req.method === 'DELETE') return text(res, 204, '');
  return text(res, 201, '');
}

function safeStaticPath(urlPath) {
  let decoded;
  try { decoded = decodeURIComponent(urlPath); } catch (e) { return null; }
  if (decoded === '/') decoded = '/index.html';
  const full = path.normalize(path.join(ROOT, decoded));
  if (full !== ROOT && !full.startsWith(ROOT + path.sep)) return null;
  return full;
}

async function serveStatic(req, res, parsed) {
  const full = safeStaticPath(parsed.pathname);
  if (!full) return text(res, 403, 'forbidden');
  const rel = path.relative(ROOT, full).replace(/\\/g, '/');
  const base = path.basename(full).toLowerCase();
  if (PRIVATE_STATIC_NAMES.has(base) || rel.startsWith('.git/') || rel.startsWith('offline-data/') ||
      rel.startsWith('runtime/') || /\.(?:bat|vbs|ps1|cmd)$/i.test(rel)) {
    return text(res, 404, 'not found');
  }
  try {
    const stat = await fsp.stat(full);
    if (!stat.isFile()) return text(res, 404, 'not found');
    const type = MIME[path.extname(full).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    fs.createReadStream(full).pipe(res);
  } catch (e) {
    return text(res, 404, 'not found');
  }
}

async function handle(req, res) {
  const parsed = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'OPTIONS') return text(res, 204, '');
  if (parsed.pathname === '/__auth/session') {
    const role = requestRole(req);
    return json(res, 200, { authenticated: !!role, role: role || null });
  }
  if (parsed.pathname === '/__auth/login') {
    if (req.method !== 'POST') return json(res, 405, { error: 'method not allowed' });
    const body = await readBody(req);
    const role = String(body && body.role || '');
    const pin = String(body && body.pin || '');
    const isManager = role === 'manager';
    const isCashier = role === 'cashier' || role.indexOf('cashier_') === 0;
    if ((!isManager && !isCashier) || !authUser(role, pin)) {
      return json(res, 401, { error: 'invalid credentials' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, { role, createdAt: Date.now(), expiresAt: Date.now() + 8 * 3600e3 });
    setSessionCookie(res, token);
    return json(res, 200, { authenticated: true, role });
  }
  if (parsed.pathname === '/__auth/logout') {
    const token = requestCookies(req)[SESSION_COOKIE];
    if (token) sessions.delete(token);
    clearSessionCookie(res);
    return json(res, 200, { authenticated: false, role: null });
  }
  if (parsed.pathname === '/__ok') return text(res, 200, 'ok');
  /* Startup repair: copy the browser's last complete menu snapshot into the
     local store without creating cloud-outbox operations. It is used only
     when local-store is demonstrably incomplete and there is no pending/failed
     menu write, so it cannot overwrite an offline edit. */
  if (parsed.pathname === '/__local-menu-reconcile') {
    if (req.method !== 'POST') return json(res, 405, { error: 'method not allowed' });
    if (!isLoopbackRequest(req) && !requestRole(req)) return json(res, 403, { error: 'local reconcile only' });
    const pendingMenu = menuOperations(readPendingOps());
    const failedMenu = menuOperations(readFailedOps());
    if (pendingMenu.length || failedMenu.length) {
      return json(res, 409, {
        error: failedMenu.length ? 'failed local menu operations' : 'pending local menu operations',
        pendingMenuOperations: pendingMenu.length,
        failedMenuOperations: failedMenu.length,
      });
    }
    const body = await readBody(req);
    const cats = body && Array.isArray(body.cats) ? body.cats : [];
    const items = body && Array.isArray(body.items) ? body.items : [];
    if (!cats.length || !items.length) return json(res, 400, { error: 'complete menu snapshot required' });
    store.tables.categories = cats;
    store.tables.items = items;
    store.initialized.categories = true;
    store.initialized.items = true;
    store.meta.lastLocalMenuReconcile = new Date().toISOString();
    await persist();
    return json(res, 200, {
      ok: true,
      reconciled: true,
      items: items.length,
      cats: cats.length,
      source: 'browser-local-snapshot',
    });
  }
  /* Role changes are explicit and local-only. The secondary standby process
     must be stopped before the active process can bind the same port; this
     endpoint lets the hidden VBS launcher do that without a terminal. */
  if (parsed.pathname === '/__shutdown') {
    if (!isLoopbackRequest(req)) return json(res, 403, { error: 'local shutdown only' });
    if (req.method !== 'GET' && req.method !== 'POST') return json(res, 405, { error: 'method not allowed' });
    json(res, 200, { ok: true, shuttingDown: true });
    setImmediate(() => server.close(() => process.exit(0)));
    return;
  }
  if (parsed.pathname === '/__replica/state') {
    if (req.method !== 'POST') return json(res, 405, { error: 'method not allowed' });
    if (REPLICA_TOKEN && String(req.headers['x-alfa-replica-token'] || '') !== REPLICA_TOKEN) {
      return json(res, 403, { error: 'replica authentication failed' });
    }
    const body = await readBody(req);
    if (!body || !body.store || typeof body.store !== 'object') return json(res, 400, { error: 'bad replica payload' });
    /* This endpoint never forwards the payload back to the sender, preventing
       a replication loop. Pending operations are retained as a hand-off
       journal: if the active host changes while offline, the next host can
       replay the exact writes instead of relying on a stale snapshot. */
    const incoming = body.store;
    const source = String(body.source || 'peer');
    const localPending = readPendingOps();
    const incomingPending = Array.isArray(body.pendingOperations) ? body.pendingOperations : [];
    const oldMeta = store.meta || {};
    const incomingMeta = incoming.meta && typeof incoming.meta === 'object' ? incoming.meta : {};
    const tracked = Object.assign({}, oldMeta.replicaPending || {}, incomingMeta.replicaPending || {});
    const previousMirrored = new Set((tracked[source] || []).map(String));
    const incomingIds = new Set(incomingPending.map((op) => String(op && op.id || '')).filter(Boolean));
    /* Operations previously mirrored from this source disappear from the
       local outbox once the source stops advertising them (acknowledged by
       its cloud flush). Locally-created operations are never in this list. */
    const localSurvivors = localPending.filter((op) => {
      const id = String(op && op.id || '');
      return !previousMirrored.has(id) || incomingIds.has(id);
    });
    store = {
      version: Number(incoming.version) || 1,
      tables: incoming.tables && typeof incoming.tables === 'object' ? incoming.tables : {},
      initialized: incoming.initialized && typeof incoming.initialized === 'object' ? incoming.initialized : {},
      meta: Object.assign({}, oldMeta, incomingMeta, { lastReplicaSource: source }),
    };
    BOOTSTRAP_TABLES.forEach(ensureTable);
    /* The incoming snapshot is the baseline. Local pending writes are applied
       last so a recent offline write on the receiving host is not erased by
       an older snapshot from the peer. */
    applyReplicaOperations(incomingPending);
    applyReplicaOperations(localSurvivors);
    const merged = uniqueOperations(incomingPending, localSurvivors);
    tracked[source] = incomingPending.map((op) => String(op.id)).filter(Boolean);
    store.meta.replicaPending = tracked;
    await writePendingOps(merged, localPending);
    await persist();
    return json(res, 200, {
      ok: true,
      source: NODE_NAME,
      store,
      pendingOperations: merged,
      pendingCloudOperations: merged.length,
    });
  }
  if (parsed.pathname === '/__requeue-failed' || parsed.pathname === '/__requeue-rejected') {
    if (!isLoopbackRequest(req)) return json(res, 403, { error: 'local only' });
    if (req.method !== 'GET' && req.method !== 'POST') return json(res, 405, { error: 'method not allowed' });
    const requeued = await requeueFailedOps();
    setImmediate(() => { flushCloudOutbox().catch(() => {}); });
    return json(res, 200, {
      ok: true,
      requeued,
      pendingCloudOperations: readPendingOps().length,
      failedCloudOperations: readFailedOps().length,
    });
  }
  if (parsed.pathname === '/__status') {
    const pending = readPendingOps();
    const failed = readFailedOps();
    const pendingMenu = menuOperations(pending);
    const pendingInventory = inventoryOperations(pending);
    const pendingExpenditure = expenditureOperations(pending);
    const failedMenu = menuOperations(failed);
    const failedInventory = inventoryOperations(failed);
    const failedExpenditure = expenditureOperations(failed);
    return json(res, 200, {
      ok: true,
      mode: 'local-first',
      node: NODE_NAME,
      host: HOST,
      port: PORT,
      dataDir: DATA_DIR,
      peer: PEER_URL || null,
      peerState,
      pendingCloudOperations: pending.length,
      pendingMenuCloudOperations: pendingMenu.length,
      pendingInventoryCloudOperations: pendingInventory.length,
      pendingExpenditureCloudOperations: pendingExpenditure.length,
      failedCloudOperations: failed.length,
      failedMenuCloudOperations: failedMenu.length,
      failedInventoryCloudOperations: failedInventory.length,
      failedExpenditureCloudOperations: failedExpenditure.length,
      rejectedCloudOperations: failed.length,
      lastFailedCloudOperation: failed.slice(-1)[0] || null,
      lastCloudFlush: store.meta.lastCloudFlush || null,
      lastReplicaAt: store.meta.lastReplicaAt || null,
      cloudConfigured: !!(CLOUD.url && CLOUD.anonKey),
      initializedTables: Object.assign({}, store.initialized),
      tables: Object.fromEntries(Object.entries(store.tables).map(([k, v]) => [k, Array.isArray(v) ? v.length : 0])),
    });
  }
  if (parsed.pathname === '/__sync') {
    const result = await syncUploads();
    const pending = readPendingOps();
    const failed = readFailedOps();
    return json(res, 200, Object.assign(result, {
      pendingCloudOperations: pending.length,
      pendingMenuCloudOperations: menuOperations(pending).length,
      pendingInventoryCloudOperations: inventoryOperations(pending).length,
      pendingExpenditureCloudOperations: expenditureOperations(pending).length,
      failedCloudOperations: failed.length,
      failedMenuCloudOperations: menuOperations(failed).length,
      failedInventoryCloudOperations: inventoryOperations(failed).length,
      failedExpenditureCloudOperations: expenditureOperations(failed).length,
      pulled: false,
    }));
  }
  if (parsed.pathname.startsWith('/rest/v1')) return handleRest(req, res, parsed);
  return serveStatic(req, res, parsed);
}

recoverInflightOutbox();
loadStore();
const server = http.createServer((req, res) => {
  handle(req, res).catch((e) => {
    warn('request failed:', e.stack || e.message || e);
    if (!res.headersSent) json(res, Number(e && e.status) || 500, { error: String(e.message || e) });
    else res.end();
  });
});

server.listen(PORT, HOST, () => {
  log(`listening on http://${HOST}:${PORT}`);
  log(`data directory: ${DATA_DIR}`);
  if (CLOUD.url && CLOUD.anonKey && !IS_STANDBY) {
    /* أصلح عمليات invoice_items القديمة أولاً، ثم أعد رفعها؛ لا نعيد
       محاولة أخطاء الجداول الأخرى تلقائياً. */
    repairFailedInvoiceItemOps().then((repaired) => {
      if (repaired) log(`repaired ${repaired} failed invoice_items operations`);
      return syncUploads();
    }).catch((e) => warn('cloud upload repair failed:', e.message));
    setInterval(() => { syncUploads().catch(() => {}); }, 15000);
  } else if (IS_STANDBY) {
    warn('secondary standby mode: cloud upload is held for the active host.');
  } else {
    warn('Supabase config not found; local-only mode is active.');
  }
  if (PEER_URL) {
    log(`standby replication target: ${PEER_URL}`);
    setInterval(() => { replicateToPeer().catch(() => {}); }, 5000);
  }
});

process.on('SIGINT', () => server.close(() => process.exit(0)));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
