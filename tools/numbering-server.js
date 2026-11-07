#!/usr/bin/env node
'use strict';

/*
 * خدمة ترقيم محلية بسيطة.
 *
 * تحفظ عدّاداً مستقلاً لكل يوم عمل، وتنفذ عمليتي:
 *   GET /next?day=YYYY-MM-DD  -> { no }
 *   GET /set?day=YYYY-MM-DD&no=N -> { no }
 *
 * تعمل على الجهاز الفعّال وحده، لذلك لا تحتاج إلى وجود الجهاز الرئيسي
 * عندما يكون الجهاز الفرعي هو المضيف الفعّال. تحفظ الحالة في offline-data
 * حتى لا يعود العداد إلى الصفر بعد إعادة تشغيل الخادم.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.NUMBERING_PORT || process.argv[2] || 8787);
const HOST = process.env.NUMBERING_HOST || '0.0.0.0';
const DATA_DIR = path.resolve(process.env.ALFA_DATA_DIR || path.join(__dirname, '..', 'offline-data'));
const STATE_FILE = path.join(DATA_DIR, 'numbering-state.json');

function send(res, status, value) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Cache-Control': 'no-store, max-age=0',
  });
  res.end(body);
}

function loadState() {
  try {
    const parsed = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    if (parsed && parsed.days && typeof parsed.days === 'object') return parsed;
  } catch (e) {}
  return { version: 1, days: {} };
}

let state = loadState();

function saveState() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const temp = STATE_FILE + '.tmp';
  fs.writeFileSync(temp, JSON.stringify(state, null, 2) + '\n', 'utf8');
  fs.renameSync(temp, STATE_FILE);
}

function validDay(day) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(day || ''));
}

function current(day) {
  return Math.max(0, Number(state.days[day]) || 0);
}

const server = http.createServer((req, res) => {
  try {
    if (req.method === 'OPTIONS') return send(res, 204, {});
    if (req.method !== 'GET') return send(res, 405, { error: 'method-not-allowed' });

    const url = new URL(req.url || '/', 'http://numbering.local');
    if (url.pathname === '/health' || url.pathname === '/') {
      return send(res, 200, { ok: true, service: 'local-numbering', port: PORT });
    }

    const day = String(url.searchParams.get('day') || '');
    if (!validDay(day)) return send(res, 400, { error: 'day-must-be-YYYY-MM-DD' });

    if (url.pathname === '/next') {
      const no = current(day) + 1;
      state.days[day] = no;
      saveState();
      return send(res, 200, { day, no });
    }

    if (url.pathname === '/set') {
      const requested = Number(url.searchParams.get('no')) || 0;
      const no = Math.max(current(day), requested);
      state.days[day] = no;
      saveState();
      return send(res, 200, { day, no });
    }

    return send(res, 404, { error: 'not-found' });
  } catch (e) {
    return send(res, 500, { error: String(e && e.message || e) });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[numbering] listening on http://${HOST}:${PORT}`);
  console.log(`[numbering] state file: ${STATE_FILE}`);
});

function close() { server.close(() => process.exit(0)); }
process.on('SIGINT', close);
process.on('SIGTERM', close);
