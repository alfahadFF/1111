/* ============================================================
   sync/remote.js — السحابة شاشة تلو الأخرى
   المنيو: جداول categories + items كما ملأها المستخدم
   (name = الصنف، variant = الحجم)
   ============================================================ */
window.SyncRemote = {
  /* تفريغ موحّد عبر المحرك العام — يغني عن الدفع القديم.
     (الدفع القديم الكامل مع delExtra أُبطل: كان يمسح جداول السحابة إن
     فُرّغ وذاكرة الصفحة فارغة — كما يحدث عند عودة الإنترنت بعد إقلاع
     أوفلاين، حيث يتجاهل الإقلاع النسخة المحلية!) */
  async flush() {
    const cfg = window.ALFA_CONFIG || {};
    if (!cfg.syncEnabled || !cfg.supabase || !cfg.supabase.url) {
      /* تعطيل السحابة لا يلغي تفريغ صندوق المنيو إلى الخادم المحلي؛
         قد تكون نسخة config.js ناقصة بينما يبقى offline_server قناة
         تثبيت ورفع مستقلة. */
      var localMenu = null;
      try { if (window.MenuOutbox) localMenu = await MenuOutbox.flush(); } catch (e) {}
      return { sent: 0, skipped: true, reason: 'sync-disabled', menu: localMenu };
    }
    var sent = 0;
    try {
      if (window.AlfaOutbox) {
        const rs = await AlfaOutbox.flushAll();
        (rs || []).forEach(function (r) { if (r && r.flushed) sent += (r.rows || 0) + (r.dels || 0); });
      }
    } catch (e) {}
    try { if (window.MenuOutbox) { await MenuOutbox.flush(); } } catch (e) {}
    try {
      const stable = (!window.AlfaOutbox || !AlfaOutbox.hasPending || !AlfaOutbox.hasPending())
        && (!window.MenuOutbox || !MenuOutbox.hasPending || !MenuOutbox.hasPending());
      if (stable) window.dispatchEvent(new Event('alfa:uploads-settled'));
    } catch (e) {}
    return { sent: sent, skipped: false };
  },
};

window.AlfaCloud = {
  menu: { state: 'idle' },
  customers: { state: 'idle' },
  liveMenu: function () {
    try {
      const id = String(((window.DEMO_DATA && DEMO_DATA.items) || [])[0] && DEMO_DATA.items[0].id || '');
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    } catch (e) { return false; }
  },
  html: function () {
    const m = this.menu || {};
    const live = this.liveMenu();
    if (m.state === 'ok') {
      return '<div class="cloud-banner cloud-ok">☁ سُحب الآن من السحابة — '
        + (m.cats || 0) + ' تصنيفات · ' + (m.items || 0)
        + ' صنفاً — الربط نجح</div>';
    }
    if (m.state === 'fail' && live) {
      return '<div class="cloud-banner cloud-warn">⚠ تعذر تحديث السحابة الآن — يظهر آخر منيو محفوظ (ليس تجريبياً)'
        + (m.error ? ' · ' + String(m.error).slice(0, 90) : '') + '</div>';
    }
    if (m.state === 'local') {
      return '<div class="cloud-banner cloud-warn">▣ يعمل من اللقطة المحلية — الاتصال اختياري لرفع التعديلات'
        + (m.error ? ' · ' + String(m.error).slice(0, 90) : '') + '</div>';
    }
    if (m.state === 'pending') {
      return '<div class="cloud-banner cloud-warn">⏳ التعديل محفوظ محلياً بانتظار الرفع — لن تُستبدل به نسخة سحابية أقدم</div>';
    }
    if (m.state === 'fail' || m.state === 'offline' || m.state === 'empty') {
      const why = m.error ? ' · ' + String(m.error).slice(0, 90) : '';
      return '<div class="cloud-banner cloud-fail">⚠ تعذر رفع التعديلات الآن — البيانات المحلية محفوظة ولن تُستبدل' + why + '</div>';
    }
    return '';
  },
};

window.AlfaSB = (function () {
  function cfg() { return (window.ALFA_CONFIG && ALFA_CONFIG.supabase) || {}; }
  function enabled() { const s = cfg(); return !!(s.url && s.anonKey); }
  function useProxy() {
    try {
      if (location.protocol === 'file:') return false;
      const host = String(location.hostname || '').toLowerCase();
      /* Local-first mode: when the app is opened from the local server,
         REST calls must stay on that server. The server persists them locally
         and queues cloud delivery; the browser must not bypass it and call
         Supabase directly. */
      const isPrivateIpv4 = /^(10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[0-1])\.)/.test(host);
      const localMode = !!(window.ALFA_CONFIG && ALFA_CONFIG.offline && ALFA_CONFIG.offline.localFirst !== false);
      if (localMode && (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost') || isPrivateIpv4)) return true;
      return /e2b\.app$/i.test(host);
    } catch (e) { return false; }
  }
  function root() {
    if (useProxy()) return '';
    return String(cfg().url || '').replace(/\/$/, '');
  }
  function headers(prefer) {
    const s = cfg();
    const h = {
      apikey: s.anonKey,
      Authorization: 'Bearer ' + s.anonKey,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (prefer) h.Prefer = prefer;
    return h;
  }
  function rest(table, qs) { return root() + '/rest/v1/' + table + (qs || ''); }
  /* مهلة كل طلب (وضع سوريا): الطلب المعلق يُجهض بدل التكدس — تُضبط عبر AlfaSB.timeoutMs */
  function localOperationId(url, opts, explicitId) {
    const method = String((opts && opts.method) || 'GET').toUpperCase();
    if (!useProxy() || ['GET', 'HEAD', 'OPTIONS'].includes(method)) return '';
    /* InvoiceSync deliberately deletes invoice_items before inserting the
       current line set. A content-only idempotency key would suppress a
       legitimate later re-insert of an identical line set, so let that
       replace sequence remain controlled by its delete/upsert flow. */
    if (/\/invoice_items(?:\?|\/|$)/i.test(String(url || '')) && method === 'POST') return '';
    /* لا نستخدم hash ثابتاً للقطات المنيو: إذا كانت لقطة 2111 قد سُجلت
       سابقاً ثم أعاد cloud-pull الخادم إلى 2000، فإعادة إرسال 2111 يجب أن
       تُطبَّق من جديد، لا أن يعيد الخادم idempotent بلا كتابة. */
    if (explicitId) return 'browser-' + String(explicitId).replace(/[^A-Za-z0-9_.:-]/g, '_');
    const body = opts && opts.body != null ? String(opts.body) : '';
    const raw = method + '|' + String(url || '') + '|' + body;
    let h = 2166136261;
    for (let i = 0; i < raw.length; i++) {
      h ^= raw.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return 'browser-' + (h >>> 0).toString(16);
  }
  function rfetch(url, opts) {
    const ms = Number((window.AlfaSB && window.AlfaSB.timeoutMs) || 15000);
    /* ── منع التخزين المؤقت للمتصفح ──────────────────────────────────
       سيرفر Supabase لا يُرسل ترويسة Cache-Control، فيطبّق المتصفح
       تخزيناً تقديرياً: يعيد الرد القديم نفسه من ذاكرته دون أن يسأل
       السيرفر. النتيجة: بعد حفظ إعدادات الطباعة، تعيد الصفحة تحميلها
       فتقرأ نسخةً قديمة من ذاكرة المتصفح وتكتبها فوق الجديدة — فيبدو
       للمستخدم أن «التغييرات لا تُحفظ». الخيار cache:'no-store' يُلزم
       المتصفح بسؤال السيرفر في كل مرة (وهو خيارٌ للطلب لا ترويسة،
       فلا يُطلق طلب CORS مسبق). ────────────────────────────────────── */
    const o = Object.assign({}, opts || {}, { cache: 'no-store' });
    const explicitOpId = String(o.alfaOpId || o.opId || '').trim();
    delete o.alfaOpId;
    delete o.opId;
    const localOpId = localOperationId(url, o, explicitOpId);
    if (localOpId) {
      o.headers = Object.assign({}, o.headers || {});
      if (!o.headers['X-Alfa-Op-Id'] && !o.headers['x-alfa-op-id']) {
        o.headers['X-Alfa-Op-Id'] = localOpId;
      }
    }
    if (typeof AbortController === 'undefined') return fetch(url, o);
    const ctrl = new AbortController();
    const t = setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, ms);
    o.signal = ctrl.signal;
    return fetch(url, o).then(function (res) { clearTimeout(t); return res; },
      function (err) {
        clearTimeout(t);
        if (ctrl.signal.aborted) throw new Error('timeout after ' + ms + 'ms');
        throw err;
      });
  }
  function get(table, qs, opts) {
    const h = headers();
    /* في وضع المزامنة التلقائية، القراءة السحابية تكون مباشرة من Supabase
       حتى لو كان التطبيق يمر عبر offline_server؛ لا نسمح لقراءة local-store
       أن تُقدَّم على أنها نسخة سحابية. هذا العلم يُرفع مؤقتاً أثناء دورة
       المزامنة فقط، أما القراءة العادية فتبقى Local-first. */
    const forceLocal = !!(opts && opts.localOnly);
    const forcedCloud = !forceLocal && (!!(opts && opts.cloudPull) || window.__ALFA_CLOUD_PULL_ACTIVE === true);
    if (forcedCloud && useProxy()) return cloudGet(table, qs);
    if (!forceLocal && opts && opts.cloudPull && useProxy()) h['X-Alfa-Cloud-Pull'] = '1';
    return rfetch(rest(table, qs || '?select=*'), { headers: h }).then(function (res) {
      return res.text().then(function (t) {
        if (!res.ok) throw new Error(table + ' ' + res.status + ' ' + t.slice(0, 180));
        return t ? JSON.parse(t) : [];
      });
    });
  }

  /* قراءة مباشرة من Supabase لمسار الجلب الآلي المحروس، بما في ذلك
     الجداول التي لا يمرّرها offline_server.js عبر cloud-pull. لا تُستخدم
     في القراءة العادية: اللقطة المحلية تبقى Local-first، والجلب هنا لا
     يحدث إلا داخل AlfaAutoSync بعد النسخة القبلية وفحص الصندوق. */
  function cloudGet(table, qs) {
    const s = cfg();
    const base = String(s.url || '').replace(/\/$/, '');
    if (!base || !s.anonKey) return Promise.reject(new Error('cloud-not-configured'));
    const query = qs || '?select=*';
    /* في الوضع المحلي، تمر قراءة المنيو السحابية الصريحة عبر
       offline_server نفسه لا عبر Supabase مباشرة. هكذا يطبّق الخادم حاجز
       pending/failed ويثبت النسخة المعادة محلياً قبل أن تراها الشاشة. */
    const localCloudPull = useProxy() && ['categories', 'items', 'invoices', 'invoice_items'].indexOf(String(table)) >= 0;
    const url = localCloudPull ? rest(table, query) : base + '/rest/v1/' + table + query;
    const h = headers();
    if (localCloudPull) h['X-Alfa-Cloud-Pull'] = '1';
    return rfetch(url, { headers: h }).then(function (res) {
      return res.text().then(function (t) {
        if (!res.ok) throw new Error(table + ' cloud ' + res.status + ' ' + t.slice(0, 180));
        return t ? JSON.parse(t) : [];
      });
    });
  }

  function upsert(table, rows, conflict, opts) {
    if (!rows.length) return Promise.resolve();
    const o = opts || {};
    return rfetch(rest(table, '?on_conflict=' + conflict), {
      method: 'POST',
      headers: headers('resolution=merge-duplicates,return=minimal'),
      body: JSON.stringify(rows),
      alfaOpId: o.alfaOpId || o.opId || '',
      /* keepalive: يتيح إتمام الطلب عند مغادرة الصفحة (pagehide) */
      keepalive: !!o.keepalive,
    }).then(function (res) {
      return res.text().then(function (t) {
        if (!res.ok) throw new Error(table + ' upsert ' + res.status + ' ' + t.slice(0, 220));
        return t ? JSON.parse(t) : null;
      });
    });
  }
  function patch(table, qs, body, opts) {
    const o = opts || {};
    return rfetch(rest(table, qs || ''), {
      method: 'PATCH',
      headers: headers(o.prefer || 'return=minimal'),
      body: JSON.stringify(body || {}),
    }).then(function (res) {
      return res.text().then(function (t) {
        if (!res.ok) throw new Error(table + ' patch ' + res.status + ' ' + t.slice(0, 220));
        return t ? JSON.parse(t) : null;
      });
    });
  }

  function del(table, ids) {
    if (!ids.length) return Promise.resolve();
    const list = ids.map(function (id) { return '"' + String(id).replace(/"/g, '') + '"'; }).join(',');
    return rfetch(rest(table, '?id=in.(' + list + ')'), {
      method: 'DELETE',
      headers: headers('return=minimal'),
    }).then(function (res) {
      if (!res.ok) return res.text().then(function (t) { throw new Error(table + ' delete ' + t.slice(0, 180)); });
    });
  }
  function delFilter(table, qs) {
    return rfetch(rest(table, qs || ''), {
      method: 'DELETE',
      headers: headers('return=minimal'),
    }).then(function (res) {
      if (!res.ok) return res.text().then(function (t) { throw new Error(table + ' delete ' + t.slice(0, 180)); });
    });
  }
  function rpc(fn, args) {
    return rfetch(root() + '/rest/v1/rpc/' + encodeURIComponent(fn), {
      method: 'POST', headers: headers('return=representation'),
      body: JSON.stringify(args || {}),
    }).then(function (res) { return res.text().then(function (t) {
      if (!res.ok) throw new Error('rpc ' + fn + ' ' + res.status + ' ' + t.slice(0, 220));
      return t ? JSON.parse(t) : null;
    }); });
  }
  function insert(table, rows) {
    if (!rows.length) return Promise.resolve();
    return rfetch(rest(table, ''), {
      method: 'POST',
      headers: headers('return=minimal'),
      body: JSON.stringify(rows),
    }).then(function (res) {
      return res.text().then(function (t) {
        if (!res.ok) throw new Error(table + ' insert ' + res.status + ' ' + t.slice(0, 220));
      });
    });
  }
  let localStatusCache = { at: 0, value: null, promise: null };
  function localStatus() {
    if (!useProxy()) return Promise.resolve(null);
    const now = Date.now();
    if (localStatusCache.value && now - localStatusCache.at < 5000) return Promise.resolve(localStatusCache.value);
    if (localStatusCache.promise) return localStatusCache.promise;
    localStatusCache.promise = fetch('/__status', { cache: 'no-store' })
      .then(function (res) { if (!res.ok) throw new Error('local-status-' + res.status); return res.json(); })
      .then(function (value) {
        localStatusCache = { at: Date.now(), value: value, promise: null };
        return value;
      })
      .catch(function () {
        localStatusCache = { at: 0, value: null, promise: null };
        return null;
      });
    return localStatusCache.promise;
  }
  function localTableInitialized(table) {
    if (!useProxy()) return Promise.resolve(true);
    return localStatus().then(function (status) {
      return !!(status && status.initializedTables && status.initializedTables[String(table)]);
    });
  }
  return {
    enabled: enabled, get: get, cloudGet: cloudGet, rpc: rpc, upsert: upsert, patch: patch, del: del,
    delFilter: delFilter, insert: insert, localStatus: localStatus,
    localTableInitialized: localTableInitialized,
    localMode: useProxy,
    transportAvailable: function () { return useProxy() || navigator.onLine !== false; },
    timeoutMs: 15000,
  };
})();

/* LAN remains usable when the browser reports no Internet. All local-first
   modules use this transport test instead of navigator.onLine alone. */
window.alfaTransportAvailable = function () {
  try {
    return !!(window.AlfaSB && AlfaSB.transportAvailable && AlfaSB.transportAvailable());
  } catch (e) { return navigator.onLine !== false; }
};

/* تسجيل مسار patch صفّي مبكرًا. manager.js سيضيف pushRows/delRows لاحقًا
   إلى نفس السجلات دون أن يستبدل هذا المسار، بفضل register الدمجي في outbox. */
window.alfaInstallPatchAdapters = function () {
  if (!window.AlfaOutbox || !window.AlfaSB || !AlfaSB.patch) return;
  const tables = {
    employees: 'employees', suppliers: 'suppliers', customers: 'customers',
    agents: 'delivery_agents', audit: 'audit_log',
    expenditures: 'expenditures', purchases: 'material_purchases',
  };
  Object.keys(tables).forEach(function (boxName) {
    const table = tables[boxName];
    AlfaOutbox.register(boxName, {
      patchRows: function (rows) {
        return (rows || []).reduce(function (p, row) {
          return p.then(function () {
            const patch = row && row.__alfa_patch;
            if (!row || !row.id || !patch || typeof patch !== 'object') return null;
            return AlfaSB.patch(table, '?id=eq.' + encodeURIComponent(String(row.id)), patch);
          });
        }, Promise.resolve()).then(function () {
          return { patched: (rows || []).length };
        });
      },
    });
  });
};
try { window.alfaInstallPatchAdapters(); } catch (e) {}

/* تقييد تعديل صف على شكل patch؛ يُستخدم بعد مقارنة الصف القديم بالجديد.
   عند السحب، mergeLists يطبّق هذه الحقول فقط فوق نسخة السحابة. */
window.alfaCommitPatchedRow = function (boxName, row, patch) {
  if (!row || !row.id || !patch || typeof patch !== 'object') return Promise.resolve({ skipped: true });
  const payload = Object.assign({}, row, { __alfa_patch: patch });
  if (window.AlfaOutbox) return AlfaOutbox.commitOne(boxName, payload);
  if (!window.AlfaSB || !AlfaSB.patch) return Promise.resolve({ skipped: true });
  const table = { agents: 'delivery_agents', audit: 'audit_log', purchases: 'material_purchases' }[boxName] || boxName;
  return AlfaSB.patch(table, '?id=eq.' + encodeURIComponent(String(row.id)), patch);
};

/* Do not let an empty local REST table erase an IndexedDB snapshot before the
   local node has completed its first cloud/bootstrap pull. Direct cloud mode
   remains authoritative, while a fresh local node preserves the browser copy
   until its initialized flag is true. */
window.alfaAdoptRemoteRows = function (table, rows, apply) {
  rows = Array.isArray(rows) ? rows : [];
  /* السحب الفارغ لا يمحو لقطة محلية غير فارغة؛ الحذف المقصود يمر من
     outbox، وبعد تفريغه تكون اللقطة المحلية نفسها فارغة. */
  const keys = {
    employees: 'employees', suppliers: 'suppliers', audit_log: 'audit_log',
    customers: 'customers', inventory_materials: 'inventory_materials',
    inventory_log: 'inventory_log', expenditures: 'expenditures',
    material_purchases: 'material_purchases', shifts: 'shifts_history',
    loyalty_ledger: 'loyalty_ledger',
  };
  const local = window.DEMO_DATA && keys[table] && DEMO_DATA[keys[table]];
  if (!rows.length && Array.isArray(local) && local.length) {
    return Promise.resolve({ authoritative: false, n: 0, reason: 'local-snapshot-preserved' });
  }
  if (rows.length || !window.AlfaSB || !AlfaSB.localTableInitialized) {
    apply(rows);
    return Promise.resolve({ authoritative: true, n: rows.length });
  }
  return AlfaSB.localTableInitialized(table).then(function (authoritative) {
    if (authoritative) apply(rows);
    return { authoritative: authoritative, n: rows.length };
  });
};

window.MenuSync = (function () {
  const sb = window.AlfaSB;
  const GOOD_MENU_KEY = 'menu_last_good_v1';
  const MENU_BROADCAST_KEY = 'alfaprosys_menu_broadcast_v1';
  const MENU_CHANNEL_NAME = 'alfaprosys_menu_v1';
  const MENU_TAB_ID = String(Date.now()) + '-' + Math.random().toString(16).slice(2);
  let menuChannel = null;
  let lastMenuBroadcastAt = 0;
  let pushTimer = null;

  function catalogSnapshot(items, cats) {
    try {
      return {
        items: JSON.parse(JSON.stringify(Array.isArray(items) ? items : [])),
        cats: JSON.parse(JSON.stringify(Array.isArray(cats) ? cats : [])),
        at: Date.now(),
      };
    } catch (e) {
      return null;
    }
  }

  function rememberGoodMenu(items, cats) {
    const snapshot = catalogSnapshot(items, cats);
    if (!snapshot || !snapshot.items.length || !snapshot.cats.length) return Promise.resolve(false);
    if (!(window.SyncStorage && SyncStorage.setKey)) return Promise.resolve(false);
    return SyncStorage.setKey(GOOD_MENU_KEY, snapshot).then(function () { return true; })
      .catch(function () { return false; });
  }

  /* تبويبا الإدارة والكاشير صفحتان مستقلتان؛ حدث window المحلي لا يصل
     إلى التبويب الآخر. ننشر اللقطة المحلية فور الحفظ عبر BroadcastChannel
     مع fallback إلى storage event، من دون انتظار إعادة فتح الشاشة. */
  function broadcastMenuSnapshot(items, cats) {
    const snapshot = catalogSnapshot(items, cats);
    if (!snapshot) return;
    snapshot.sender = MENU_TAB_ID;
    lastMenuBroadcastAt = Number(snapshot.at) || Date.now();
    try {
      if (!menuChannel && typeof BroadcastChannel === 'function') {
        menuChannel = new BroadcastChannel(MENU_CHANNEL_NAME);
      }
      if (menuChannel) menuChannel.postMessage(snapshot);
    } catch (e) {}
    try {
      localStorage.setItem(MENU_BROADCAST_KEY, JSON.stringify(snapshot));
    } catch (e) {}
  }

  function applyBroadcastMenu(snapshot) {
    if (!snapshot || snapshot.sender === MENU_TAB_ID) return;
    const at = Number(snapshot.at) || 0;
    if (!at || at <= lastMenuBroadcastAt) return;
    if (!Array.isArray(snapshot.items) || !Array.isArray(snapshot.cats)) return;
    if (window.__ALFA_MERGING === true) return;
    if (window.MenuOutbox && MenuOutbox.hasPending && MenuOutbox.hasPending()) return;
    lastMenuBroadcastAt = at;
    try {
      DEMO_DATA.categories = JSON.parse(JSON.stringify(snapshot.cats));
      DEMO_DATA.items = JSON.parse(JSON.stringify(snapshot.items));
      DEMO_DATA.offers = [];
      DEMO_DATA.discount_settings = { invoice_pct: 0, items: [] };
      if (window.alfaPersist) window.alfaPersist();
      rememberGoodMenu(snapshot.items, snapshot.cats);
      notifyMenuUpdated();
    } catch (e) {}
  }

  function initMenuBroadcast() {
    try {
      if (typeof BroadcastChannel === 'function') {
        menuChannel = new BroadcastChannel(MENU_CHANNEL_NAME);
        menuChannel.onmessage = function (event) { applyBroadcastMenu(event && event.data); };
      }
    } catch (e) { menuChannel = null; }
    try {
      window.addEventListener('storage', function (event) {
        if (event && event.key === MENU_BROADCAST_KEY && event.newValue) {
          try { applyBroadcastMenu(JSON.parse(event.newValue)); } catch (e) {}
        }
      });
    } catch (e) {}
  }

  /* local-store قد يكون أقدم أو ناقصاً من آخر لقطة صحيحة في المتصفح.
     لا نسمح لقراءة الإقلاع أن تستبدل لقطة كاملة بصنف/تصنيف واحد.
     التعديل المقصود يمر عبر MenuOutbox، ولذلك يُلتقط قبل هذا الحاجز. */
  function localCatalogIsIncomplete(remoteItems, remoteCats, opts) {
    if (opts && opts.cloudPull) return false;
    const currentItems = window.DEMO_DATA && Array.isArray(DEMO_DATA.items) ? DEMO_DATA.items : [];
    const currentCats = window.DEMO_DATA && Array.isArray(DEMO_DATA.categories) ? DEMO_DATA.categories : [];
    if (!currentItems.length || !currentCats.length) return false;
    return (Array.isArray(remoteItems) && remoteItems.length < currentItems.length)
      || (Array.isArray(remoteCats) && remoteCats.length < currentCats.length);
  }
  /* تُفعّل بعد نجاح قراءة أعمدة الترتيب الجديدة؛ قبل تطبيق migration
     يستمر التطبيق تلقائياً على schema القديمة بلا كسر للمزامنة. */
  let orderColumnsAvailable = false;
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function isUuid(id) { return UUID.test(String(id || '')); }
  function notifyMenuUpdated() {
    try { window.dispatchEvent(new Event('alfa:menu-updated')); } catch (e) {}
  }

  /* ────────────────────────────────────────────────────────────
     baseName — الاسم الأساسي للصنف (محتوى العمود name في السحابة)

     محلياً:  it.name = «الاسم + الصيغة» (مؤلَّف في fromRemote)
     سحابياً:  العمود name = الاسم وحده، والعمود variant = الصيغة

     لذلك عند الدفع نحو السحابة يجب تجريد الاسم من الصيغة، وإلا
     تكرّر الاسم عند كل سحب («برغر سندويش عادي سندويش عادي»).
     ──────────────────────────────────────────────────────────── */
  function collapseMenuLabel(value) {
    let text = String(value || '').replace(/\s+/g, ' ').trim();
    if (!text) return '';
    const same = function (a, b) {
      return String(a || '').toLocaleLowerCase() === String(b || '').toLocaleLowerCase();
    };
    let words = text.split(' '), changed = true;
    while (changed && words.length > 1) {
      changed = false;
      if (words.length % 2 === 0) {
        const half = words.length / 2;
        let repeated = true;
        for (let j = 0; j < half; j++) {
          if (!same(words[j], words[j + half])) { repeated = false; break; }
        }
        if (repeated) { words = words.slice(0, half); changed = true; continue; }
      }
      const out = [];
      words.forEach(function (word) {
        if (!out.length || !same(out[out.length - 1], word)) out.push(word);
      });
      changed = out.length !== words.length;
      words = out;
    }
    return words.join(' ').trim();
  }
  function stripMenuVariantSuffix(name, variant) {
    const n = collapseMenuLabel(name), v = collapseMenuLabel(variant);
    const nn = n.toLocaleLowerCase(), vv = v.toLocaleLowerCase();
    if (!n || !v || nn === vv) return n;
    return nn.endsWith(' ' + vv) ? n.slice(0, n.length - v.length - 1).trim() : n;
  }
  function baseName(it) {
    const full = collapseMenuLabel(it && it.name);
    if (!full) return '';
    const raw = collapseMenuLabel(it && (it.variant_clean || it.variant));
    if (!raw) return full;
    return stripMenuVariantSuffix(full, raw) || full;
  }
  window.AlfaItemBase = baseName;

  function fromRemote(i, cats) {
    const cid = i.category_id != null ? String(i.category_id) : '';
    const cat = (cats || []).find(function (c) { return String(c.id) === cid; });
    const rawName = collapseMenuLabel(i.name);
    const variant = collapseMenuLabel(i.variant);
    /* الاسم السحابي قد يكون قديماً ومركباً من name + variant، أو قد يحتوي
       تكراراً كاملاً. نطبع النسخة المحلية للعرض فقط، دون تغيير السعر أو
       المعرّف أو أي صف آخر في السحابة. */
    const base = stripMenuVariantSuffix(rawName, variant) || rawName;
    const norm = function (v) { return collapseMenuLabel(v).toLocaleLowerCase(); };
    const family = collapseMenuLabel(i.family || base);
    const option = collapseMenuLabel(i.option_name || base);
    const composed = variant && norm(base) !== norm(variant) && !norm(base).endsWith(' ' + norm(variant))
      ? collapseMenuLabel(base + ' ' + variant)
      : collapseMenuLabel(base);
    return {
      id: String(i.id),
      category_id: cid,
      category_name: cat ? cat.name : '',
      /* الاسم كما في العمود name — يُستخدم لتسمية زر البيع وللدفع بلا تكرار */
      base_name: base,
      family: family || base,
      option_name: option || base,
      variant: variant || null,
      variant_clean: collapseMenuLabel(i.variant_clean || variant) || null,
      name: composed,
      price: Math.round(Number(i.price) || 0),
      cost_mode: i.cost_mode || 'manual',
      cost_manual: Math.round(Number(i.cost_manual) || 0),
      is_available: i.is_available !== false,
      /* category_order ثابت من التصنيف، وitem_order ترتيب داخله.
         fallback يحافظ على عمل النسخ القديمة قبل تطبيق migration. */
      category_order: Number(i.category_order) || Number(cat && cat.sort_order) || 0,
      item_order: Number(i.item_order) || Number(i.sort_order) || 0,
      sort_order: Number(i.item_order) || Number(i.sort_order) || 0,
      order_count: Number(i.order_count) || 0,
      is_pinned_popular: !!i.is_pinned_popular,
      image_url: i.image_url || null,
      barcode: i.barcode || null,
      category_name: i.category_name || (cat ? cat.name : ''),
      price_new: i.price_new,
      price_usd: i.price_usd,
      discount_pct: i.discount_pct,
      online_discount_pct: i.online_discount_pct,
    };
  }

  function toRemote(it) {
    if (!isUuid(it.id) || !isUuid(it.category_id)) return null;
    const family = collapseMenuLabel(it.family || it.option_name);
    const variant = collapseMenuLabel(it.variant || it.variant_clean);

    /* ── إصلاح: العمود name يجب أن يحمل اسم الصنف نفسه، لا اسم «الصنف الأب».
       سابقاً كانت تُكتب family فوق الاسم فيضيع الاسم الذي أدخله المستخدم
       (مثال: كُتب «برغر» بدل «كريسبي برغر»). كما نجرّد هنا أي variant
       مكرر داخل base_name قبل الإرسال، من دون إضافة أعمدة جديدة للسحابة. ── */
    const baseRaw = collapseMenuLabel(it.base_name || baseName(it) || it.name || family);
    const base = stripMenuVariantSuffix(baseRaw, variant) || baseRaw;

    /* ── إصلاح: option_name كان يتجمّد على اسم التصنيف الرئيسي عندما يُترك
       حقل «التصنيف الفرعي» فارغاً عند الإنشاء. نُصحّحه هنا تلقائياً. ── */
    const catName = collapseMenuLabel(it.category_name);
    const optRaw  = collapseMenuLabel(it.option_name);
    const optName = (!optRaw || optRaw === catName) ? (family || base) : optRaw;

    /* contract_price موجود في نموذج الإدارة القديم لكنه ليس عموداً في
       public.items حالياً (إرساله يسبب 42703 ويُفشل upsert كله). يبقى
       محلياً إلى أن تُعتمد migration صريحة لهذا الحقل. */
    const row = {
      id: it.id,
      category_id: it.category_id,
      name: base,
      variant: variant || null,
      family: family || null,
      option_name: optName || null,
      variant_clean: collapseMenuLabel(it.variant_clean || variant) || null,
      category_name: it.category_name || null,
      barcode: it.barcode || null,
      price: Math.round(Number(it.price) || 0),
      cost_mode: it.cost_mode || 'manual',
      cost_manual: Math.round(Number(it.cost_manual) || 0),
      is_available: it.is_available !== false,
      sort_order: Number(it.item_order != null ? it.item_order : it.sort_order) || 0,
      order_count: Number(it.order_count) || 0,
      is_pinned_popular: !!it.is_pinned_popular,
      image_url: it.image_url || null,
    };
    if (orderColumnsAvailable) {
      row.category_order = Number(it.category_order) || 0;
      row.item_order = Number(it.item_order != null ? it.item_order : it.sort_order) || 0;
    }
    return row;
  }

  function pull(opts) {
    opts = opts || {};
    if (!sb.enabled()) {
      if (window.AlfaCloud) window.AlfaCloud.menu = {
        state: 'local', error: 'السحابة غير مهيّأة — الحفظ المحلي مستمر'
      };
      return Promise.resolve({ skipped: true, reason: 'cloud-not-configured' });
    }
    if (!window.alfaTransportAvailable()) {
      const pending = !!(window.MenuOutbox && MenuOutbox.hasPending && MenuOutbox.hasPending());
      if (window.AlfaCloud) window.AlfaCloud.menu = {
        state: pending ? 'pending' : 'local',
        error: pending ? 'تعديل محلي بانتظار الرفع' : 'لا يوجد ناقل اتصال الآن'
      };
      return Promise.resolve({ skipped: true, reason: 'offline' });
    }
    /* عند التحديث السحابي الصريح نرفع صندوق المنيو في المتصفح قبل
       القراءة، حتى لا تسبق قراءة قديمة عملية الرفع وتعود فتستبدل السعر. */
    const beforeRead = opts.cloudPull && window.MenuOutbox && MenuOutbox.flush
      ? MenuOutbox.flush()
      : Promise.resolve({ skipped: true });
    const legacyItemSelect = '?select=id,category_id,name,price,cost_mode,cost_manual,is_available,sort_order,order_count,is_pinned_popular,image_url,variant,variant_clean,family,option_name,barcode,category_name,price_new,price_usd,discount_pct,online_discount_pct&order=sort_order.asc';
    const extendedItemSelect = '?select=id,category_id,name,price,cost_mode,cost_manual,is_available,sort_order,category_order,item_order,order_count,is_pinned_popular,image_url,variant,variant_clean,family,option_name,barcode,category_name,price_new,price_usd,discount_pct,online_discount_pct&order=category_order.asc,item_order.asc,sort_order.asc';
    function getItemsWithOrderColumns() {
      return sb.get('items', extendedItemSelect, { cloudPull: !!opts.cloudPull, localOnly: !!opts.localOnly }).then(function (rows) {
        orderColumnsAvailable = true;
        return rows;
      }).catch(function (err) {
        const msg = String(err && err.message || err);
        if (!/42703|category_order|item_order|does not exist/i.test(msg)) throw err;
        orderColumnsAvailable = false;
        return sb.get('items', legacyItemSelect, { cloudPull: !!opts.cloudPull, localOnly: !!opts.localOnly });
      });
    }
    return beforeRead.then(function () { return Promise.all([
      sb.get('categories', '?select=id,name,icon,sort_order,is_active&order=sort_order.asc', { cloudPull: !!opts.cloudPull, localOnly: !!opts.localOnly }),
      getItemsWithOrderColumns(),
    ]); }).then(function (pair) {
      /* قاعدة البيانات هي المصدر الفعلي؛ لا نحذف صفوفاً منها بسبب شكل
         المعرّف. حتى السجلات المرحّلة بمعرفات قديمة يجب أن تصل كما هي. */
      const cats = pair[0] || [];
      const remote = pair[1] || [];
      /* قبل الكتابة فوق النسخة المحلية: ارفع أي تعديلات معلقة أولاً
         (push-before-pull) حتى لا يمحو السحب تعديلات لم تصل بعد. */
      const gate = opts.cloudPull
        ? Promise.resolve({ skipped: true })
        : ((window.MenuOutbox && MenuOutbox.flush) ? MenuOutbox.flush() : Promise.resolve({ skipped: true }));
        return gate.then(function () {
          if (window.MenuOutbox && MenuOutbox.hasPending()) {
            /* تعذّر الرفع رغم الاتصال. لا نستبدل لقطة كاملة بصندوق
               متصفح ناقص: markDirty يخزن snapshot كاملة، لكن النسخ
               القديمة قد تكون قيدت صنفاً واحداً فقط قبل اكتمال الإقلاع.
               ندمج الصفوف المعلقة فوق baseline الحالي/المضمّن ونحترم
               الحذف الصريح فقط، ثم نبقي الصندوق كما هو بانتظار التأكيد. */
            const snap = MenuOutbox.snapshot();
            let pendingRepair = Promise.resolve();
            if (snap && window.DEMO_DATA) {
              const embedded = window.ALFA_LOCAL_CATALOG_SNAPSHOT || {};
              const liveItems = Array.isArray(DEMO_DATA.items) ? DEMO_DATA.items : [];
              const liveCats = Array.isArray(DEMO_DATA.categories) ? DEMO_DATA.categories : [];
              const seedItems = liveItems.length ? liveItems : (Array.isArray(embedded.items) ? embedded.items : []);
              const seedCats = liveCats.length ? liveCats : (Array.isArray(embedded.categories) ? embedded.categories : []);
              const delItems = new Set((snap.delItems || []).map(function (id) { return String(id); }));
              const delCats = new Set((snap.delCats || []).map(function (id) { return String(id); }));
              const mergePending = function (seed, rows) {
                const out = (Array.isArray(seed) ? seed : []).map(function (row) {
                  return JSON.parse(JSON.stringify(row));
                });
                const byId = {};
                out.forEach(function (row) {
                  if (row && row.id != null) byId[String(row.id)] = row;
                });
                (Array.isArray(rows) ? rows : []).forEach(function (row) {
                  if (!row || row.id == null) return;
                  const id = String(row.id);
                  const copy = JSON.parse(JSON.stringify(row));
                  if (byId[id]) Object.assign(byId[id], copy);
                  else { byId[id] = copy; out.push(copy); }
                });
                return out;
              };
              const mergedCats = mergePending(seedCats, snap.cats)
                .filter(function (row) { return row && !delCats.has(String(row.id)); });
              const mergedItems = mergePending(seedItems, snap.items)
                .filter(function (row) {
                  return row && !delItems.has(String(row.id))
                    && !delCats.has(String(row.category_id));
                });
              DEMO_DATA.categories = mergedCats;
              DEMO_DATA.items = mergedItems;
              DEMO_DATA.offers = [];
              /* أصلح snapshot الصندوق نفسه إذا كان قديماً/ناقصاً، ثم
                 أعد دفع اللقطة الكاملة إلى local-store. لا نمسح الصندوق
                 ولا نعتبر الرفع سحابياً قبل /__sync و/__status. */
              const needsRepair = mergedCats.length > (snap.cats || []).length
                || mergedItems.length > (snap.items || []).length;
              if (needsRepair && MenuOutbox.markDirty) {
                pendingRepair = MenuOutbox.markDirty(mergedItems, mergedCats)
                  .then(function () { return MenuOutbox.flush(); })
                  .catch(function () { return null; });
              }
              try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
              notifyMenuUpdated();
            }
            if (window.AlfaCloud) window.AlfaCloud.menu = { state: 'pending', error: 'تعديلات معلقة بانتظار الرفع' };
            try { if (window.showToast) showToast('توجد تعديلات منيو معلقة — ستُرفع تلقائياً', '⏳'); } catch (e) {}
            return pendingRepair.then(function () {
              return { skipped: true, reason: 'pending-local' };
            });
          }
          if (!remote.length) {
            /* فراغ السحابة لا يعني حذف المنيو المحلية. حتى بعد أن يكون
               الخادم المحلي قد علّم الجدول initialized، تبقى اللقطة
               المحلية هي ما يُعرض ويُحفظ؛ الحذف المقصود يمر من outbox
               ويرفع DELETE صريحاً قبل أن تصبح اللقطة فارغة. إذا كانت
               الذاكرة كاملة لكن local-store فارغاً، أصلحه من نفس اللقطة
               حتى لا ينجح الرسم مرة واحدة ثم يعود الجهاز ناقصاً بعد reload. */
            const localItems = (window.DEMO_DATA && Array.isArray(DEMO_DATA.items)) ? DEMO_DATA.items : [];
            const localCats = (window.DEMO_DATA && Array.isArray(DEMO_DATA.categories)) ? DEMO_DATA.categories : [];
            const repair = localItems.length && localCats.length
              ? reconcileLocalMenu(localItems, localCats).catch(function (e) {
                  return { skipped: true, reason: String(e && e.message || e) };
                })
              : Promise.resolve({ skipped: true, reason: 'no-complete-local-snapshot' });
            if (window.AlfaCloud) window.AlfaCloud.menu = {
              state: 'local',
              items: localItems.length,
              cats: localCats.length,
            };
            return repair.then(function (reconciled) {
              return { skipped: true, reason: 'local-snapshot-preserved', reconciled: reconciled };
            });
          }
          if (localCatalogIsIncomplete(remote, cats, opts)) {
            /* local-store موجود لكنه ناقص: لا نعتبره حذفاً مقصوداً ولا
               نسمح له بمحو آخر لقطة كاملة عند الإقلاع. بعد حماية الذاكرة
               نُصلح local-store نفسه من اللقطة الكاملة بلا إنشاء عمليات
               cloud-outbox، حتى لا يبقى الجهاز ناقصاً في الإقلاع التالي. */
            const localItems = (window.DEMO_DATA && Array.isArray(DEMO_DATA.items)) ? DEMO_DATA.items : [];
            const localCats = (window.DEMO_DATA && Array.isArray(DEMO_DATA.categories)) ? DEMO_DATA.categories : [];
            const reconcile = reconcileLocalMenu(localItems, localCats).catch(function (e) {
              return { skipped: true, reason: String(e && e.message || e) };
            });
            if (window.AlfaCloud) window.AlfaCloud.menu = {
              state: 'local',
              items: localItems.length,
              cats: localCats.length,
              error: 'لقطة الخادم المحلي ناقصة — استُبقيت آخر لقطة كاملة'
            };
            return reconcile.then(function (repair) {
              return { skipped: true, reason: 'local-catalog-incomplete', reconciled: repair };
            });
          }
          /* لا نستبدل تصنيفات حقيقية بلقطة محلية ناقصة. وجود items مع
             categories فارغة يعني عادة أن local-store لم يكتمل bootstrap؛
             اعتمادها يمسح كل أزرار POS رغم أن اللقطة الحالية سليمة. */
          const currentCats = (window.DEMO_DATA && Array.isArray(DEMO_DATA.categories))
            ? DEMO_DATA.categories : [];
          if (!cats.length && currentCats.length && remote.length) {
            if (window.AlfaCloud) window.AlfaCloud.menu = {
              state: 'local', items: (DEMO_DATA.items || []).length, cats: currentCats.length,
              error: 'تصنيفات الخادم المحلي غير مكتملة — استُبقيت اللقطة الحالية'
            };
            return { skipped: true, reason: 'local-categories-empty' };
          }
          const oldItems = (window.DEMO_DATA && Array.isArray(DEMO_DATA.items)) ? DEMO_DATA.items : [];
          const items = remote.map(function (i) {
            const next = fromRemote(i, cats);
            /* contract_price ليس في schema السحابية؛ لا نمحو قيمة محلية
               موجودة على هذا الجهاز عند إعادة قراءة بقية حقول الصنف. */
            const old = oldItems.find(function (x) { return x && String(x.id) === String(i.id); });
            if (old && Object.prototype.hasOwnProperty.call(old, 'contract_price')) {
              next.contract_price = old.contract_price;
            }
            return next;
          });
          if (window.DEMO_DATA) {
            DEMO_DATA.categories = cats;
            DEMO_DATA.items = items;
            /* لا تُعرض عروض/خصومات الملف التجريبي مع المنيو الحقيقي */
            DEMO_DATA.offers = [];
            DEMO_DATA.discount_settings = { invoice_pct: 0, items: [] };
            notifyMenuUpdated();
          }
          if (window.AlfaCloud) window.AlfaCloud.menu = { state: 'ok', items: items.length, cats: cats.length, at: Date.now() };
          try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
          return rememberGoodMenu(items, cats).then(function () {
            broadcastMenuSnapshot(items, cats);
            return { pulled: true, items: items.length, cats: cats.length };
          });
        });
    }).catch(function (e) {
      const pending = !!(window.MenuOutbox && MenuOutbox.hasPending && MenuOutbox.hasPending());
      const error = 'تعذر تحديث السحابة؛ استُبقيت النسخة المحلية' + (e && e.message ? ' — ' + e.message : '');
      if (window.AlfaCloud) window.AlfaCloud.menu = { state: pending ? 'pending' : 'local', error: error };
      return { skipped: true, error: error };
    });
  }

  /* تحويل لقطة محلية (أصناف+تصنيفات) إلى صفوف السحابة — تُستخدم للرفع
     المباشر ورفع الصندوق الصادر ورفع المغادرة (keepalive). */
  function buildRows(itemsArr, catsArr) {
    const sourceItems = Array.isArray(itemsArr) ? itemsArr : [];
    const sourceCats = Array.isArray(catsArr) ? catsArr : [];
    const items = sourceItems.map(toRemote).filter(Boolean);
    const cats = sourceCats.map(function (c) {
      if (!isUuid(c.id)) return null;
      return {
        id: String(c.id), name: c.name || '', icon: c.icon || '🏷️',
        sort_order: Number(c.sort_order) || 0, is_active: c.is_active !== false,
      };
    }).filter(Boolean);
    return {
      items: items,
      cats: cats,
      skippedItems: Math.max(0, sourceItems.length - items.length),
      skippedCats: Math.max(0, sourceCats.length - cats.length),
    };
  }

  /* الكتابة عبر offline_server مقبولة حتى لو كانت نسخة config.js لا تحتوي
     مفاتيح Supabase؛ الخادم يثبت الصف محلياً ويضعه في outbox القرصي. */
  function menuWriteAvailable() {
    try {
      const transport = !!(window.alfaTransportAvailable && window.alfaTransportAvailable());
      const local = !!(sb.localMode && sb.localMode());
      return transport && (sb.enabled() || local);
    } catch (e) { return false; }
  }

  /* رفع لقطة صريحة (لا يقرأ DEMO_DATA) — يُستخدم مع الصندوق الصادر عند
     الإقلاع حيث تكون الذاكرة فارغة بعد. upsert ⇒ آمن للتكرار. */
  function pushPayload(itemsArr, catsArr, opts) {
    if (!menuWriteAvailable()) {
      return Promise.resolve({ skipped: true, reason: sb.enabled() ? 'offline' : 'cloud-not-configured' });
    }
    const rows = buildRows(itemsArr, catsArr);
    if (!rows.items.length && !rows.cats.length) return Promise.resolve({ skipped: true, reason: 'no-uuid' });
    const o = opts || {};
    const opBase = String(o.alfaOpId || o.opId || '').trim();
    const catOpts = Object.assign({}, o, { alfaOpId: opBase ? opBase + ':categories' : '' });
    const itemOpts = Object.assign({}, o, { alfaOpId: opBase ? opBase + ':items' : '' });
    const partial = !!(rows.skippedItems || rows.skippedCats);
    return sb.upsert('categories', rows.cats, 'id', catOpts)
      .then(function () { return sb.upsert('items', rows.items, 'id', itemOpts); })
      .then(function () {
        return {
          pushed: true,
          partial: partial,
          skippedItems: rows.skippedItems,
          skippedCats: rows.skippedCats,
          items: rows.items.length,
          cats: rows.cats.length,
        };
      });
  }

  function reconcileLocalMenu(itemsArr, catsArr) {
    if (!(sb.localMode && sb.localMode())) return Promise.resolve({ skipped: true, reason: 'not-local-mode' });
    const rows = buildRows(itemsArr, catsArr);
    if (!rows.items.length || !rows.cats.length) {
      return Promise.resolve({ skipped: true, reason: 'incomplete-browser-snapshot' });
    }
    return fetch('/__local-menu-reconcile', {
      method: 'POST',
      cache: 'no-store',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: rows.items, cats: rows.cats })
    }).then(function (res) {
      return res.text().then(function (text) {
        let body = null;
        try { body = text ? JSON.parse(text) : null; } catch (e) {}
        if (!res.ok) throw new Error('local-menu-reconcile-' + res.status);
        return body || { ok: true };
      });
    });
  }

  function verifyLocalPayload(itemsArr, catsArr) {
    if (!(sb.localMode && sb.localMode())) return Promise.resolve({ verified: true, skipped: true });
    const expected = buildRows(itemsArr, catsArr);
    return Promise.all([
      sb.get('categories', '?select=id,name,sort_order,is_active&limit=1000', { localOnly: true }),
      sb.get('items', '?select=id,category_id,name,price,variant,variant_clean&limit=1000', { localOnly: true })
    ]).then(function (pair) {
      const catMap = {}, itemMap = {};
      (pair[0] || []).forEach(function (row) { if (row && row.id != null) catMap[String(row.id)] = row; });
      (pair[1] || []).forEach(function (row) { if (row && row.id != null) itemMap[String(row.id)] = row; });
      const catsOk = expected.cats.every(function (row) {
        const actual = catMap[String(row.id)];
        return !!actual
          && String(actual.name || '') === String(row.name || '')
          && Number(actual.sort_order || 0) === Number(row.sort_order || 0)
          && (actual.is_active !== false) === (row.is_active !== false);
      });
      const itemsOk = expected.items.every(function (row) {
        const actual = itemMap[String(row.id)];
        return !!actual
          && String(actual.category_id || '') === String(row.category_id || '')
          && String(actual.name || '') === String(row.name || '')
          && Number(actual.price || 0) === Number(row.price || 0)
          && String(actual.variant || '') === String(row.variant || '')
          && String(actual.variant_clean || '') === String(row.variant_clean || '');
      });
      return {
        verified: catsOk && itemsOk,
        items: expected.items.length,
        cats: expected.cats.length,
        actualItems: Object.keys(itemMap).length,
        actualCats: Object.keys(catMap).length,
      };
    }).catch(function (e) {
      return { verified: false, reason: String(e && e.message || e) };
    });
  }

  function push() {
    if (!menuWriteAvailable()) return Promise.resolve({ skipped: true, reason: 'upload-unavailable' });
    const d = window.DEMO_DATA || {};
    const local = !!(sb.localMode && sb.localMode());
    return pushPayload(d.items, d.categories).then(function (r) {
      if (r && r.pushed) {
        try {
          if (window.showToast) showToast(
            local
              ? 'تم تثبيت المنيو في الخادم المحلي — بانتظار رفع السحابة ✅'
              : 'تم رفع وتحديث المنيو في السحابة بنجاح ✅',
            local ? '💾' : '☁️'
          );
        } catch (err) {}
      }
      return r;
    });
  }

  /* ── رفع فوري مباشر (بديل pushSoon المؤجَّل لمسارات الحفظ الصريحة):
     يُستدعى لحظة الضغط على «حفظ» فيصل قاعدة البيانات مباشرة عند توفر
     الاتصال، ويمسح الصندوق الصادر عند النجاح، ويُبقيه (مع تنبيه واضح)
     عند الفشل لتُعاد المحاولة تلقائياً. ── */
  function pushNow() {
    if (!menuWriteAvailable()) return Promise.resolve({ skipped: true, reason: 'upload-unavailable' });
    const local = !!(sb.localMode && sb.localMode());
    return push().then(function (r) {
      /* استجابة offline_server هي تثبيت محلي فقط؛ لا نمسح الصندوق منها.
         مسح الصندوق هنا كان سبب إعلان نجاح سحابي وهمي وضياع التعديل عند
         الإقلاع قبل أن يصل الرفع الحقيقي إلى Supabase. */
      if (r && r.pushed && !r.partial && window.MenuOutbox && !local) {
        return Promise.resolve(MenuOutbox.clear()).then(function () { return r; });
      }
      if (r && r.pushed && local) r.pending = true;
      return r;
    }).catch(function (e) {
      try { if (window.showToast) showToast('تعذّر الرفع المباشر — حُفظ وسيُعاد تلقائياً: ' + (e && e.message || e), '⚠️'); } catch (err) {}
      throw e;
    });
  }

  function pushSoon() {
    if (!menuWriteAvailable()) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      push().catch(function (e) {
        try { if (window.showToast) { console.error(e); showToast('تعذر رفع المنيو: ' + (e && e.message ? e.message : JSON.stringify(e)), '⚠️'); } } catch (err) {}
      });
    }, 700);
  }

  let menuPullInflight = null;
  function menuPullGuarded(opts) {
    /* التحديث السحابي الصريح لا يتشارك وعد قراءة محلية سابقاً؛ يجب أن
       يصل الطلب المعلّم إلى الخادم حتى يقرأ Supabase فعلاً. */
    if (opts && opts.cloudPull) return pull(opts);
    if (!menuPullInflight) {
      menuPullInflight = pull(opts || {}).then(function (r) { menuPullInflight = null; return r; },
        function (e) { menuPullInflight = null; throw e; });
    }
    return menuPullInflight;
  }

  initMenuBroadcast();

  return {
    /* منع تكدس سحب المنيو: المتزامنون يتشاركون نفس الوعد (المنيو بلا صندوق outbox) */
    enabled: sb.enabled, canWrite: menuWriteAvailable, pull: menuPullGuarded, push: push, pushSoon: pushSoon,
    pushNow: pushNow, pushPayload: pushPayload, buildRows: buildRows,
    reconcileLocalMenu: reconcileLocalMenu,
    verifyLocalPayload: verifyLocalPayload,
    rememberGood: rememberGoodMenu, publish: broadcastMenuSnapshot,
    /* الحذف يُرجع الوعد خاماً (دون ابتلاع الخطأ) ليتعامل معه commitMenuDelete:
       نجاح ⇒ يُستكمل الحفظ، فشل ⇒ يُقيَّد في الصندوق الصادر ويُعاد تلقائياً. */
    removeItem: function (id) { return (!sb.enabled() || !id) ? Promise.resolve({ skipped: true }) : sb.del('items', [id]); },
    removeCat: function (id) { return (!sb.enabled() || !id) ? Promise.resolve({ skipped: true }) : sb.del('categories', [id]); },
  };
})();

/* ================================================================
   MenuOutbox — الصندوق الصادر للمنيو (ضمان عدم ضياع أي تعديل)
   ----------------------------------------------------------------
   المشكلة الأصلية: الحفظ كان يجدول الرفع بعد 700ms فقط (pushSoon)،
   فإن غادر المستخدم الصفحة قبلها مات المؤقت، ثم يمحو السحبُ عند
   الإقلاع التالي النسخةَ المحلية ⇒ تعديلات تضيع بصمت.
   الحل: كل حفظ صريح (إضافة/تعديل/حذف/أسعار/تكاليف) يُقيَّد فوراً في
   هذا الصندوق الدائم (IndexedDB) ثم يُرفع مباشرة. أي فشل (انقطاع،
   إغلاق سريع، خطأ شبكة) يُعاد تلقائياً: عند عودة الإنترنت، وعند كل
   إقلاع عبر مسار الرفع فقط، وبمحاولة أخيرة عند المغادرة.
   الرفع upsert ⇒ آمن للتكرار ولا ازدواجية إطلاقاً.
   ================================================================ */
window.MenuOutbox = (function () {
  const KEY = 'menu_outbox_v1';
  let cache = null;      /* {items, cats, delItems:[], delCats:[], at} */
  let hydrated = false;
  let hydrating = null;
  let flushing = false;
  let flushAgainRequested = false;
  let inFlight = null;

  function toast(msg, icon) { try { if (window.showToast) showToast(msg, icon); } catch (e) {} }
  function refreshBadge() { try { if (window.NetBadge) NetBadge.refresh(); } catch (e) {} }
  function cloudOn() { return !!(window.AlfaSB && AlfaSB.enabled && AlfaSB.enabled()); }
  /* يمكن لخادم offline_server أن يكون قناة كتابة محلية حتى لو لم تُحمّل
     نسخة الصفحة مفاتيح السحابة. لذلك لا نخلط «السحابة مفعّلة» مع
     «هناك ناقل محلي قادر على تثبيت العملية». */
  function localTransportOn() {
    try { return !!(window.AlfaSB && AlfaSB.localMode && AlfaSB.localMode()); }
    catch (e) { return false; }
  }
  function uploadTransportOn() {
    try {
      return !!(window.alfaTransportAvailable && window.alfaTransportAvailable())
        && (cloudOn() || localTransportOn());
    } catch (e) { return false; }
  }

  /* قبول offline_server لطلب POST يعني أن التعديل ثُبّت محلياً فقط؛
     لا يعني أن Supabase استلمه. لا نزيل نسخة المتصفح المعلقة ولا نعلن
     نجاحاً سحابياً إلا بعد /__sync ثم /__status. */
  function confirmLocalCloud() {
    if (!localTransportOn()) return Promise.resolve({ confirmed: true, direct: true });
    return fetch('/__sync', {
      method: 'POST',
      cache: 'no-store',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'X-Alfa-Explicit-Sync': '1' },
      body: '{}',
    }).then(function (res) {
      if (!res.ok) throw new Error('local-sync-' + res.status);
      return res.json();
    }).then(function (syncResult) {
      return fetch('/__status', { cache: 'no-store', credentials: 'same-origin' })
        .then(function (res) {
          if (!res.ok) throw new Error('local-status-' + res.status);
          return res.json();
        })
        .then(function (status) {
          const pending = Number(
            status && (status.pendingMenuCloudOperations != null
              ? status.pendingMenuCloudOperations
              : status.pendingCloudOperations) || 0
          );
          const failed = Number(
            status && (status.failedMenuCloudOperations != null
              ? status.failedMenuCloudOperations
              : status.failedCloudOperations) || 0
          );
          if (failed) return { confirmed: false, failed: true, status: status, result: syncResult };
          if (pending) return { confirmed: false, pending: true, status: status, result: syncResult };
          if (!status || status.cloudConfigured !== true) {
            return { confirmed: false, pending: true, reason: 'cloud-not-confirmed', status: status, result: syncResult };
          }
          return { confirmed: true, status: status, result: syncResult };
        });
    }).catch(function (e) {
      return { confirmed: false, pending: true, reason: String(e && e.message || e) };
    });
  }

  function persist() {
    refreshBadge();
    if (!(window.SyncStorage && SyncStorage.setKey)) return Promise.resolve(false);
    if (cache) return SyncStorage.setKey(KEY, cache);
    if (SyncStorage.delKey) return SyncStorage.delKey(KEY);
    return Promise.resolve(false);
  }

  function hydrate() {
    if (hydrated) return hydrating || Promise.resolve(cache);
    hydrated = true;
    if (!(window.SyncStorage && SyncStorage.getKey)) return Promise.resolve(cache);
    hydrating = SyncStorage.getKey(KEY).then(function (v) {
      if (v && typeof v === 'object' && (
        Array.isArray(v.items) || Array.isArray(v.cats)
        || Array.isArray(v.delItems) || Array.isArray(v.delCats)
      )) cache = v;
      refreshBadge();
      return cache;
    }).catch(function () { return cache; }).then(function (v) {
      hydrating = null;
      return v;
    });
    return hydrating;
  }

  function hasPending() {
    /* الصندوق حالة محلية، لا حالة سحابة. يجب أن يبقى ظاهراً ومؤثراً
       حتى عند غياب المفاتيح أو انقطاع الإنترنت. */
    return !!(cache && ((cache.items && cache.items.length) || (cache.cats && cache.cats.length)
      || (cache.delItems && cache.delItems.length) || (cache.delCats && cache.delCats.length)));
  }

  /* تقييد لقطة كاملة من الحالة الحالية — يُستدعى لحظة كل حفظ صريح.
     لا يجوز إسقاط القيد لأن السحابة غير مفعّلة: السحابة قناة رفع اختيارية. */
  function markDirty(itemsArr, catsArr) {
    return hydrate().then(function () {
      const prev = cache || {};
      try {
        cache = {
          items: JSON.parse(JSON.stringify(itemsArr || [])),
          cats: JSON.parse(JSON.stringify(catsArr || [])),
          delItems: prev.delItems || [],
          delCats: prev.delCats || [],
          at: Date.now(),
          /* معرف جديد لكل حفظ؛ لا يعاد استخدام hash لقطة قديمة بعد
             أن يعيد cloud-pull الخادم إلى قيمة سابقة. */
          opId: 'menu-' + Date.now() + '-' + Math.random().toString(16).slice(2),
        };
      } catch (e) { return { failed: true }; }
      try { if (window.AlfaLeaveGuard && AlfaLeaveGuard.markDirty) AlfaLeaveGuard.markDirty('menu'); } catch (e) {}
      return persist().then(function (saved) { return saved === false ? { failed: true } : { queued: true }; });
    });
  }

  /* تقييد حذف معلَق (يُنفَّذ قبل رفع اللقطة عند التفريغ). */
  function addDelete(kind, id, itemsArr, catsArr) {
    if (!id) return Promise.resolve({ skipped: true });
    const sid = String(id);
    const d = window.DEMO_DATA || {};
    return hydrate().then(function () {
      try {
        cache = {
          items: JSON.parse(JSON.stringify(itemsArr || d.items || [])),
          cats: JSON.parse(JSON.stringify(catsArr || d.categories || [])),
          delItems: ((cache && cache.delItems) || []).slice(),
          delCats: ((cache && cache.delCats) || []).slice(),
          at: Date.now(),
          opId: 'menu-delete-' + Date.now() + '-' + Math.random().toString(16).slice(2),
        };
      } catch (e) { return { failed: true }; }
      const key = (kind === 'cat') ? 'delCats' : 'delItems';
      if (cache[key].indexOf(sid) < 0) cache[key].push(sid);
      try { if (window.AlfaLeaveGuard && AlfaLeaveGuard.markDirty) AlfaLeaveGuard.markDirty('menu'); } catch (e) {}
      return persist().then(function (saved) { return saved === false ? { failed: true } : { queued: true }; });
    });
  }

  function clear() { cache = null; return persist(); }

  /* إزالة آثار سجلات قديمة من الصندوق دون مسح تعديلات حقيقية معلّقة. */
  function prune(predicate) {
    return hydrate().then(function () {
      if (!cache || typeof predicate !== 'function') return { pruned: 0 };
      let pruned = 0;
      function keep(list, kind) {
        return (list || []).filter(function (row) {
          if (predicate(row, kind)) { pruned++; return false; }
          return true;
        });
      }
      cache.items = keep(cache.items, 'item');
      cache.cats = keep(cache.cats, 'cat');
      cache.delItems = keep(cache.delItems.map(function (id) { return { id: id }; }), 'item').map(function (row) { return row.id; });
      cache.delCats = keep(cache.delCats.map(function (id) { return { id: id }; }), 'cat').map(function (row) { return row.id; });
      return persist().then(function () { return { pruned: pruned }; });
    }).catch(function () { return { pruned: 0, failed: true }; });
  }

  /* تفريغ الصندوق: الحذوفات أولاً ثم اللقطة. يُستدعى عند الإقلاع
     كرفع محلي فقط، وعند عودة الإنترنت. */
  function flush() {
    if (flushing) {
      /* حفظ ثانٍ أثناء رفع لقطة أولى: لا نُسقطه ولا ننتظر إقلاعاً
         جديداً؛ نعيد التفريغ فور انتهاء الطلب الحالي. */
      flushAgainRequested = true;
      return inFlight || Promise.resolve({ skipped: true, reason: 'busy' });
    }
    flushing = true;
    inFlight = hydrate().then(function () {
      if (!hasPending()) return { skipped: true, reason: 'empty' };
      if (!uploadTransportOn()) {
        return { skipped: true, reason: cloudOn() ? 'offline' : 'cloud-not-configured' };
      }
      if (!window.MenuSync || !MenuSync.pushPayload) return { skipped: true, reason: 'no-sync' };
      const snap = cache;
      const sb = window.AlfaSB;
      const dels = [];
      if (snap.delItems && snap.delItems.length) dels.push(sb.del('items', snap.delItems));
      if (snap.delCats && snap.delCats.length) dels.push(sb.del('categories', snap.delCats));
      return Promise.all(dels).then(function () {
        return MenuSync.pushPayload(snap.items, snap.cats, { alfaOpId: snap.opId });
      }).then(function (result) {
        if (result && result.pushed && !result.partial
            && sb.localMode && sb.localMode()
            && MenuSync.verifyLocalPayload) {
          return MenuSync.verifyLocalPayload(snap.items, snap.cats).then(function (verification) {
            if (!verification || verification.verified !== true) {
              return {
                failed: true,
                reason: 'local-write-not-verified',
                verification: verification,
                result: result
              };
            }
            return result;
          });
        }
        return result;
      }).then(function (result) {
        /* «skipped» ليس نجاحاً. لا نمسح الصندوق إلا بعد أن يؤكد
           مسار upsert أنه كتب فعلاً، وإلا يضيع القيد المحلي عند
           غياب المفاتيح أو عند وجود صفوف لا يمكن تحويلها للسحابة. */
        if (!result || result.pushed !== true) return result || { skipped: true, reason: 'upload-not-confirmed' };
        if (result.partial) {
          /* رُفعت الصفوف الصالحة فقط؛ تبقى اللقطة كاملة في الصندوق
             حتى لا يُعتبر صنف محلي غير قابل للتحويل «محفوظاً سحابياً». */
          return result;
        }
        /* عند المرور عبر offline_server، HTTP 201 يعني «ثُبّت محلياً»
           فقط. ننتظر تأكيد /__sync و/​__status قبل مسح صندوق المتصفح؛
           وإلا يعيد الإقلاع السحابة القديمة فوق التعديل المحلي. */
        return confirmLocalCloud().then(function (confirmation) {
          if (!confirmation || confirmation.confirmed !== true) {
            const failed = !!(confirmation && confirmation.failed);
            toast(
              failed
                ? 'فشل رفع تعديل المنيو — بقي محفوظاً محلياً لإعادة المحاولة ⚠️'
                : 'تم تثبيت تعديل المنيو محلياً — بانتظار رفع السحابة ⏳',
              failed ? '⚠️' : '💾'
            );
            return {
              queued: true,
              local: true,
              pending: true,
              failed: failed,
              result: result,
              confirmation: confirmation,
            };
          }
          /* لا نمسح إلا إن كانت اللقطة ما تزال هي نفسها
             (لم يطرأ تعديل أحدث أثناء الرفع). */
          const saved = cache === snap ? clear() : persist();
          return Promise.resolve(saved).then(function () {
            toast('تم رفع تعديلات المنيو المعلقة إلى السحابة ✅', '☁️');
            return { flushed: true, result: result, confirmation: confirmation };
          });
        });
      });
    }).catch(function (e) {
      const error = String((e && e.message) || e);
      toast('تعذر رفع تعديل المنيو — حُفظ محلياً وسيُعاد تلقائياً: ' + error, '⚠️');
      return { failed: true, error: error };
    }).then(function (r) {
      const rerun = flushAgainRequested || !!(r && r.flushed && hasPending());
      flushAgainRequested = false;
      flushing = false; inFlight = null; refreshBadge();
      if (r && r.flushed && !hasPending()) {
        try { if (window.AlfaLeaveGuard && AlfaLeaveGuard.clearDirty) AlfaLeaveGuard.clearDirty('menu'); } catch (e) {}
      }
      /* إذا تغيّر الصنف/السعر أثناء الرفع الأول، cache تحمل اللقطة
         الأحدث. أطلق رفعاً ثانياً فوراً بدلاً من تركها معلقة بصمت. */
      if (rerun && hasPending()) {
        setTimeout(function () { flush().catch(function () {}); }, 0);
      }
      return r;
    });
    return inFlight;
  }

  /* محاولة أخيرة عند مغادرة الصفحة — keepalive يُتم الطلب بعد المغادرة.
     غير مؤكدة: لا نمسح الصندوق هنا أبداً، فالإقلاع التالي يؤكد ويتفادى
     الفقد. تُتخطى إن تجاوزت الحمولة حدّ المتصفح (~64KB). */
  function flushKeepalive() {
    if (!hasPending()) return;
    if (!uploadTransportOn()) return;
    if (!window.MenuSync || !MenuSync.buildRows) return;
    try {
      const sb = window.AlfaSB;
      const rows = MenuSync.buildRows(cache.items, cache.cats);
      const payload = JSON.stringify(rows);
      if (payload.length > 50000) return;
      const opBase = cache.opId || ('menu-keepalive-' + Date.now() + '-' + Math.random().toString(16).slice(2));
      sb.upsert('categories', rows.cats, 'id', { keepalive: true, alfaOpId: opBase + ':categories' }).then(function () {
        return sb.upsert('items', rows.items, 'id', { keepalive: true, alfaOpId: opBase + ':items' });
      }).catch(function () {});
    } catch (e) {}
  }

  return {
    markDirty: markDirty, addDelete: addDelete, clear: clear, prune: prune,
    flush: flush, flushKeepalive: flushKeepalive,
    hasPending: hasPending, hydrate: hydrate,
    snapshot: function () { return cache; },
  };
})();

/* فحص تشخيصي آمن من Console على الجهاز الرئيسي؛ لا يعرض مفاتيح السحابة.
   يفصل بوضوح بين نجاح الحفظ المحلي، وجود صندوق الرفع، وحالة الناقل. */
window.alfaMenuSyncDiagnostics = function () {
  const ready = (window.MenuOutbox && MenuOutbox.hydrate)
    ? MenuOutbox.hydrate()
    : Promise.resolve();
  return Promise.resolve(ready).then(function () {
    const snap = window.MenuOutbox && MenuOutbox.snapshot ? MenuOutbox.snapshot() : null;
    const localStatus = (window.AlfaSB && AlfaSB.localStatus)
      ? AlfaSB.localStatus().catch(function () { return null; })
      : Promise.resolve(null);
    return localStatus.then(function (server) {
      return {
        storage: window.SyncStorage && SyncStorage.engine || 'unavailable',
        localItems: (window.DEMO_DATA && DEMO_DATA.items || []).length,
        localCategories: (window.DEMO_DATA && DEMO_DATA.categories || []).length,
        outboxPending: !!(window.MenuOutbox && MenuOutbox.hasPending && MenuOutbox.hasPending()),
        outboxItems: snap && snap.items ? snap.items.length : 0,
        outboxCategories: snap && snap.cats ? snap.cats.length : 0,
        pendingDeletes: (snap && snap.delItems || []).length + (snap && snap.delCats || []).length,
        cloudConfigured: !!(window.AlfaSB && AlfaSB.enabled && AlfaSB.enabled()),
        transportAvailable: !!(window.alfaTransportAvailable && window.alfaTransportAvailable()),
        localTransport: !!(window.AlfaSB && AlfaSB.localMode && AlfaSB.localMode()),
        localServer: server ? {
          pendingCloudOperations: Number(server.pendingCloudOperations || 0),
          pendingMenuCloudOperations: Number(server.pendingMenuCloudOperations || 0),
          failedCloudOperations: Number(server.failedCloudOperations || 0),
          failedMenuCloudOperations: Number(server.failedMenuCloudOperations || 0),
          initializedItems: !!(server.initializedTables && server.initializedTables.items),
        } : null,
      };
    });
  });
};

/* ── حفظ منيو مباشر: تقييد فوري في الصندوق + رفع فوري لقاعدة البيانات.
   تُستدعى من كل مسارات الحفظ الصريحة بدل pushSoon المؤجَّل. ── */
window.commitMenuNow = function (itemsArr, catsArr) {
  const d = window.DEMO_DATA || {};
  const items = itemsArr || d.items || [];
  const cats = catsArr || d.categories || [];
  /* الحفظ المحلي هو الخطوة الأولى دائماً، حتى إذا لم تكن السحابة مفعلة
     أو انقطع الاتصال. لا نعتمد على مؤقت Proxy وحده عند ضغط «حفظ». */
  function directLocalMenuSave() {
    if (!(window.SyncStorage && SyncStorage.save)) {
      return Promise.resolve({ saved: false, reason: 'no-storage' });
    }
    let snapshot;
    try {
      /* لا نمرر Proxy إلى structured clone؛ نأخذ لقطة خاماً تشمل
         التعديل الحالي وجميع أعلام الكتالوج اللازمة عند reload. */
      snapshot = JSON.parse(JSON.stringify(window.DEMO_DATA || {}));
      snapshot.items = JSON.parse(JSON.stringify(items || []));
      snapshot.categories = JSON.parse(JSON.stringify(cats || []));
    } catch (e) {
      return Promise.resolve({ saved: false, reason: 'snapshot-clone-failed' });
    }
    return Promise.resolve(SyncStorage.save(snapshot)).then(function (ok) {
      return ok === false ? { saved: false, reason: 'storage-failed' } : { saved: true, direct: true };
    }).catch(function (e) {
      return { saved: false, reason: String(e && e.message || e) };
    });
  }

  let local = Promise.resolve({ local: true });
  try {
    if (window.alfaPersist) local = Promise.resolve(window.alfaPersist());
    else local = directLocalMenuSave();
  } catch (e) { local = directLocalMenuSave(); }
  /* أثناء تهيئة data.js قد يعيد alfaPersist نتيجة skipped قبل تحرير
     الشاشات. لا نعتبر ذلك حفظاً: نثبت لقطة المنيو مباشرة عبر SyncStorage. */
  local = local.then(function (result) {
    return result && result.saved === true ? result : directLocalMenuSave();
  });

  /* لا نبدأ الرفع قبل اكتمال كتابة اللقطة المحلية والصندوق الدائم؛ عند
     إغلاق الصفحة أو فشل الشبكة تبقى العملية محفوظة للصندوق التالي. */
  return local.then(function (localResult) {
    let queued = Promise.resolve({ local: true });
    try { if (window.MenuOutbox) queued = MenuOutbox.markDirty(items, cats); } catch (e) {}
    return Promise.resolve(queued).then(function (queueResult) {
      const localFailed = localResult && localResult.saved === false;
      const queueFailed = queueResult && queueResult.failed;
      if (localFailed || queueFailed) {
        try {
          if (window.showToast) showToast('تعذر تثبيت تعديل المنيو محلياً — لم يُعتمد الحفظ', '⚠️');
        } catch (e) {}
        return { failed: true, reason: localFailed ? 'local-snapshot-failed' : (queueResult.reason || 'outbox-persist-failed') };
      }
      /* هذه آخر لقطة محلية معتمدة للمنيو؛ تُستخدم عند إقلاع لاحق إذا
         كان local-store ناقصاً، ولا تعني نجاحاً سحابياً. */
      try {
        if (window.MenuSync && MenuSync.rememberGood) MenuSync.rememberGood(items, cats);
        if (window.MenuSync && MenuSync.publish) MenuSync.publish(items, cats);
      } catch (e) {}

      const canWrite = !!(window.MenuSync && MenuSync.canWrite && MenuSync.canWrite());
      if (!canWrite) {
        /* نجاح الحفظ المحلي لا يحتاج اتصالاً؛ حالة الرفع تظهر في الشارة
           ويُعاد الرفع من الصندوق عند توفر الناقل. */
        return { queued: true, local: true, reason: 'upload-unavailable' };
      }
      /* استخدم تفريغ الصندوق نفسه لا رفع اللقطة وحدها؛ فهذا يحافظ على
         عمليات الحذف المعلقة قبل upsert، ولا يمسحها عند نجاح الرفع فقط. */
      if (window.MenuOutbox && MenuOutbox.flush) return MenuOutbox.flush();
      /* لا يرفض أبداً: الفشل مُقيَّد مسبقاً في الصندوق ومُعلن بتنبيه،
         فالرفض هنا مجرد ضجيج في صفحات تستدعيه نار-وانسَ. */
      if (window.MenuSync.pushNow) {
        return MenuSync.pushNow().catch(function (e) { return { failed: true, error: String((e && e.message) || e) }; });
      }
      MenuSync.pushSoon();
      return { legacy: true, queued: true };
    });
  }).catch(function (e) {
    try { if (window.showToast) showToast('تعذر تثبيت تعديل المنيو محلياً — ' + String(e && e.message || e), '⚠️'); } catch (err) {}
    return { failed: true, reason: 'menu-commit-failed' };
  });
};

/* ── حذف مع ضمان الوصول: يُقيَّد الحذف محلياً أولاً، ثم يُرفع عند توفر
   الاتصال. deletedItemIds: أصناف حُذفت ضمناً (حذف تصنيف). ── */
window.commitMenuDelete = function (kind, id, itemsArr, catsArr, deletedItemIds) {
  const d = window.DEMO_DATA || {};
  const items = itemsArr || d.items || [];
  const cats = catsArr || d.categories || [];
  const queuedDeletes = [];
  try {
    if (window.MenuOutbox) {
      queuedDeletes.push(MenuOutbox.addDelete(kind, id, items, cats));
      (deletedItemIds || []).forEach(function (iid) {
        queuedDeletes.push(MenuOutbox.addDelete('item', iid, items, cats));
      });
    }
  } catch (e) {}
  try {
    if (window.alfaPersist) queuedDeletes.push(Promise.resolve(window.alfaPersist()));
  } catch (e) {}

  /* حذف تصنيف يحذف ضمناً كل أصنافه. لا نرسل DELETE قبل أن يثبت
     الصندوق المحلي، ويفضل مسار flush الموحد كي لا تُمسح عملية الحذف
     إذا نجح رفع اللقطة وفشل حذف السطر أو العكس. */
  return Promise.all(queuedDeletes).then(function (results) {
    const failed = (results || []).find(function (r) { return r && (r.failed || r.saved === false); });
    if (failed) {
      try { if (window.showToast) showToast('تعذر تثبيت حذف المنيو محلياً — لم يُعتمد الحذف', '⚠️'); } catch (e) {}
      return { failed: true, reason: 'menu-delete-local-failed' };
    }
    try {
      if (window.MenuSync && MenuSync.rememberGood) MenuSync.rememberGood(items, cats);
      if (window.MenuSync && MenuSync.publish) MenuSync.publish(items, cats);
    } catch (e) {}
    const canWrite = !!(window.MenuSync && MenuSync.canWrite && MenuSync.canWrite());
    if (!canWrite) {
      try { if (window.showToast) showToast('تم الحذف محلياً — سيُرفع تلقائياً عند توفر الاتصال', '⏳'); } catch (e) {}
      return { queued: true, local: true, reason: 'upload-unavailable' };
    }
    if (window.MenuOutbox && MenuOutbox.flush) {
      return MenuOutbox.flush().then(function (r) {
        if (r && r.failed) {
          try { if (window.showToast) showToast('تعذّر رفع الحذف — سيُعاد تلقائياً: ' + (r.error || ''), '⚠️'); } catch (e) {}
        }
        return r;
      });
    }
    return window.commitMenuNow ? window.commitMenuNow(items, cats) : { queued: true };
  }).catch(function (e) {
    try { if (window.showToast) showToast('تعذر تثبيت حذف المنيو محلياً — ' + String(e && e.message || e), '⚠️'); } catch (err) {}
    return { failed: true, reason: 'menu-delete-failed' };
  });
};

/* ربط تلقائي: إعادة الرفع عند عودة الإنترنت + محاولة أخيرة عند المغادرة. */
try {
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('online', function () { if (window.MenuOutbox) MenuOutbox.flush(); });
    window.addEventListener('pagehide', function () { if (window.MenuOutbox) MenuOutbox.flushKeepalive(); });
    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden' && window.MenuOutbox) MenuOutbox.flushKeepalive();
      });
    }
  }
  if (window.MenuOutbox) MenuOutbox.hydrate();
} catch (e) {}

window.CustomerSync = (function () {
  const sb = window.AlfaSB;
  let pushTimer = null;

  function row(c) {
    const due = c.next_due_date ? String(c.next_due_date) : null;
    return {
      id: String(c.id),
      name: c.name || '',
      phone: c.phone || null,
      whatsapp: c.whatsapp || null,
      address: c.address || null,
      type: c.type || 'regular',
      notes: c.notes || null,
      contract_price_list: c.contract_price_list || null,
      credit_limit: Number(c.credit_limit) || 0,
      credit_balance: Number(c.credit_balance) || 0,
      next_due_date: due || null,
      payments: Array.isArray(c.payments) ? c.payments : [],
      source: c.source || 'pos',
    };
  }

  function pull() {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.resolve({ skipped: true });
    return sb.get('customers', '?select=*&order=name.asc').then(function (remote) {
      /* كل صف موجود في قاعدة البيانات حقيقي حتى لو كان معرفه يشبه seed
         قديماً؛ القراءة لا تحذف ولا تستبعد أي سجل. */
      const rows = remote || [];
      if (!rows.length) {
        /* الفراغ البعيد لا يمحو لقطة عملاء محلية موجودة؛ حذف الجميع
           يجب أن يكون محلياً ومُسجلاً في الصندوق أولاً. */
        if (window.DEMO_DATA && (DEMO_DATA.customers || []).length) {
          window.AlfaCloud.customers = { state: 'local', n: DEMO_DATA.customers.length };
          return { skipped: true, reason: 'local-snapshot-preserved' };
        }
        return (sb.localTableInitialized ? sb.localTableInitialized('customers') : Promise.resolve(true)).then(function (authoritative) {
          if (!authoritative) {
            window.AlfaCloud.customers = { state: 'local', n: (window.DEMO_DATA && DEMO_DATA.customers || []).length };
            return { skipped: true, reason: 'local-snapshot-preserved' };
          }
          if (window.DEMO_DATA) DEMO_DATA.customers = [];
          window.AlfaCloud.customers = { state: 'ok', n: 0 };
          return { pulled: true, n: 0 };
        });
      }
      if (window.DEMO_DATA) DEMO_DATA.customers = rows;
      window.AlfaCloud.customers = { state: 'ok', n: rows.length };
      return { pulled: true, n: rows.length };
    }).catch(function (e) {
      window.AlfaCloud.customers = { state: 'fail', error: String(e && e.message || e) };
      return { skipped: true, error: String(e && e.message || e) };
    });
  }

  function push() {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.resolve({ skipped: true });
    const list = ((window.DEMO_DATA && DEMO_DATA.customers) || []).map(row);
    return sb.upsert('customers', list, 'id')
      .then(function () { return { pushed: true, n: list.length }; });
  }

  function pushSoonLegacy() {
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      push().catch(function (e) {
        try { if (window.showToast) showToast('تعذر رفع العملاء: ' + (e && e.message || e), '⚠️'); } catch (err) {}
      });
    }, 700);
  }
  function pushSoon() {
    if (!sb.enabled()) return;
    if (!window.AlfaOutbox) { pushSoonLegacy(); return; }
    /* التزام مباشر: تقييد دائم + دفع فوري + إعادة تلقائية */
    AlfaOutbox.commitRows('customers', (window.DEMO_DATA && DEMO_DATA.customers) || []);
  }

  /* ── صندوق صادر العملاء ── */
  function pushRows(rows) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    const list = (rows || []).map(row);
    if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
    return sb.upsert('customers', list, 'id').then(function () { return { pushed: true, n: list.length }; });
  }
  function delRows(ids) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    return sb.del('customers', ids || []);
  }
  function applyBox(b) {
    if (!window.DEMO_DATA || !window.AlfaOutbox) return;
    DEMO_DATA.customers = AlfaOutbox.mergeLists(DEMO_DATA.customers, b);
    try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
  }
  if (window.AlfaOutbox) AlfaOutbox.register('customers', { pushRows: pushRows, delRows: delRows });
  function pullGuarded() {
    if (!window.AlfaOutbox) return pull();
    return AlfaOutbox.guarded('customers', pull, applyBox)();
  }

  return {
    enabled: sb.enabled, pull: pullGuarded, push: push, pushSoon: pushSoon,
    remove: function (id) {
      if (!sb.enabled() || !id) return Promise.resolve({ skipped: true });
      if (window.AlfaOutbox) return AlfaOutbox.commitDelete('customers', id);
      return sb.del('customers', [id]).catch(function () {});
    },
  };
})();

window.InvoiceSync = (function () {
  const sb = window.AlfaSB;
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function isUuid(id) { return UUID.test(String(id || '')); }

  function fromLine(l) {
    const lineName = l.name || '';
    return {
      id: l.item_id || ('line_' + l.id),
      line_id: l.id,
      name: lineName,
      is_service: !!l.is_service || (!l.item_id && /^خدمة\s/.test(String(lineName))),
      qty: Number(l.qty) || 0,
      price: Math.round(Number(l.price) || 0),
      total: Math.round(Number(l.total) || 0),
      note: l.note || '',
      original_price: l.original_price == null ? null : Math.round(Number(l.original_price) || 0),
      price_override: !!l.price_override,
      override_reason: l.override_reason || '',
      offer_id: l.offer_id || null,
      is_free: !!l.is_free,
      offer_disc: !!l.offer_disc,
    };
  }

  function fromInv(row, lines) {
    /* ── إذا كانت الفاتورة لديها modified_at → حالتها المحلية = modified ── */
    var localStatus = row.status || 'open';
    if (localStatus === 'printed' && row.modified_at) localStatus = 'modified';
    var dd = row.discount_detail || null;
    var delivery = row.delivery_info || null;
    if (!delivery && dd && dd._delivery) {
      delivery = dd._delivery;
      dd = Object.assign({}, dd);
      delete dd._delivery;
    } else if (dd && dd._delivery) {
      dd = Object.assign({}, dd);
      delete dd._delivery;
    }
    var printNo = null;
    if (dd && dd._print != null) {
      printNo = Number(dd._print) || null;
      dd = Object.assign({}, dd);
      delete dd._print;
    }
    /* خدمات الطلب (طاولة/توصيل) تُرحَّل داخل discount_detail وتُعاد هنا لحقول مباشرة */
    var svcT = (dd && Number(dd.service_table)) || 0;
    var svcD = (dd && Number(dd.service_delivery)) || 0;
    var svcH = (dd && Number(dd.service_hall)) || 0;
    /* مدة التحضير: من عمود حقيقي إن وُجد، وإلا من الحامل _prep */
    var prep = Number(row.prep_minutes) > 0
      ? { minutes: Number(row.prep_minutes), set_at: row.prep_set_at || null }
      : (dd && dd._prep) || null;
    if (dd && dd._prep) { dd = Object.assign({}, dd); delete dd._prep; }
    /* بيانات التحصيل والوردية لا تفترض أعمدة جديدة في Supabase؛ تُحفظ داخل
       metadata الفاتورة ثم تُعاد إلى النموذج المحلي عند السحب. */
    var alfaMeta = (dd && dd._alfa_meta) || {};
    if (dd && dd._alfa_meta) { dd = Object.assign({}, dd); delete dd._alfa_meta; }
    var paymentHistory = Array.isArray(alfaMeta.payment_history) ? alfaMeta.payment_history : [];
    var paymentStatus = alfaMeta.payment_status === 'unpaid' ? 'unpaid' : (alfaMeta.payment_status === 'paid' ? 'paid' : null);
    return {
      id: String(row.id),
      no: Number(row.no) || 0,
      /* رمز السحب الترويجي — كان يُولَّد ويُطبع محلياً فقط ولا يُقرأ من
         السحابة، فلا يمكن التحقق من رمز رابح على جهاز آخر. */
      draw_code: row.draw_code || null,
      date: row.date || '',
      type: row.type || 'takeaway',
      hall: row.hall || '',
      table_label: row.table_label || '',
      customer_name: row.customer_name || '',
      phone: row.phone || '',
      cashier: row.cashier || '',
      cashier_key: alfaMeta.cashier_key || '',
      issued_shift_key: alfaMeta.issued_shift_key || '',
      shift_kind: alfaMeta.shift_kind || '',
      payment_status: paymentStatus || ((row.pay_type === 'deferred') ? 'unpaid' : 'paid'),
      paid: (paymentStatus || ((row.pay_type === 'deferred') ? 'unpaid' : 'paid')) === 'paid',
      paid_by: alfaMeta.paid_by || '',
      paid_by_key: alfaMeta.paid_by_key || '',
      paid_shift_key: alfaMeta.paid_shift_key || '',
      paid_at: alfaMeta.paid_at || '',
      payment_history: paymentHistory,
      status: localStatus,
      kitchen_status: row.kitchen_status || 'new',
      pay_type: row.pay_type || null,
      contract_id: row.contract_id || null,
      online_order_id: row.online_order_id || null,
      discount: Number(row.discount) || 0,
      discount_detail: dd,
      delivery_info: delivery,
      service_table: svcT,
      service_delivery: svcD,
      service_hall: svcH,
      service_fee: svcT + svcD + svcH,
      prep_minutes: prep ? (Number(prep.minutes) || null) : null,
      prep_set_at:  prep ? (prep.set_at || null) : null,
      stock_applied: !!row.stock_applied,
      notes: row.notes || '',
      address: row.address || '',
      total: Number(row.total) || 0,
      time: row.time || '',
      queue_no: row.queue_no,
      cancel_reason: row.cancel_reason || null,
      pending_reason: row.pending_reason || null,
      cancelled_at: row.cancelled_at || null,
      modified_at: row.modified_at || null,
      modifications: row.modifications || null,
      cancel_items: row.cancel_items || null,
      last_kitchen_print: row.last_kitchen_print || null,
      is_online: !!row.is_online,
      is_new_customer: !!row.is_new_customer,
      created_at: row.created_at,
      print_no: printNo,
      items: (lines || []).map(fromLine),
    };
  }

  function toInv(inv) {
    /* ── حالة modified تبقى محلية فقط — في Supabase تبقى printed ── */
    var statusForDB = inv.status;
    if (statusForDB === 'modified') statusForDB = 'printed';
    var dd = inv.discount_detail ? Object.assign({}, inv.discount_detail) : {};
    if (inv.delivery_info) dd._delivery = inv.delivery_info;
    /* مدة التحضير المتوقعة (يضبطها المطبخ من شاشته): تُحمل داخل
       discount_detail لأن عمود prep_minutes غير موجود في قاعدة البيانات —
       تماماً كما حُمِل delivery_info قديماً في _delivery. إن أُضيف العمود
       لاحقاً تُقرأ القيمة منه مباشرة (انظر fromInv). */
    if (Number(inv.prep_minutes) > 0) {
      dd._prep = { minutes: Number(inv.prep_minutes), set_at: inv.prep_set_at || null };
    }
    if (Number(inv.print_no) > 0) {
      dd._print = Number(inv.print_no);
    }
    dd._alfa_meta = {
      cashier_key: inv.cashier_key || '',
      issued_shift_key: inv.issued_shift_key || '',
      shift_kind: inv.shift_kind || '',
      payment_status: window.alfaInvoicePaymentStatus ? alfaInvoicePaymentStatus(inv) : (inv.payment_status || 'paid'),
      paid_by: inv.paid_by || '',
      paid_by_key: inv.paid_by_key || '',
      paid_shift_key: inv.paid_shift_key || '',
      paid_at: inv.paid_at || '',
      payment_history: Array.isArray(inv.payment_history) ? inv.payment_history : [],
    };
    if (!Object.keys(dd).length) dd = null;
    return {
      id: String(inv.id),
      no: Number(inv.no) || 0,
      /* يُرفع الآن مع الفاتورة — السحابة تفرض عليه فهرساً فريداً */
      draw_code: inv.draw_code || null,
      date: inv.date || '',
      type: inv.type || 'takeaway',
      hall: inv.hall || null,
      table_label: inv.table_label || null,
      customer_name: inv.customer_name || null,
      phone: inv.phone || null,
      cashier: inv.cashier || null,
      status: statusForDB,
      kitchen_status: inv.kitchen_status || 'new',
      pay_type: inv.pay_type || 'cash',
      contract_id: inv.contract_id || null,
      online_order_id: inv.online_order_id || inv.source_order_id || null,
      discount: Number(inv.discount) || 0,
      discount_detail: dd,
      delivery_info: inv.delivery_info || null,
      stock_applied: !!inv.stock_applied,
      notes: inv.notes || null,
      address: inv.address || null,
      total: Number(inv.total) || 0,
      time: inv.time || null,
      queue_no: inv.queue_no == null ? null : inv.queue_no,
      cancel_reason: inv.cancel_reason || null,
      pending_reason: inv.pending_reason || null,
      cancelled_at: inv.cancelled_at || null,
      modified_at: inv.modified_at || null,
      modifications: inv.modifications || null,
      cancel_items: inv.cancel_items || null,
      last_kitchen_print: inv.last_kitchen_print || null,
      is_online: !!inv.is_online,
      is_new_customer: !!inv.is_new_customer,
    };
  }

  function toLine(invId, c) {
    const iid = c.offer_disc ? null : (isUuid(c.id) ? c.id : null);
    return {
      invoice_id: invId,
      item_id: iid,
      name: c.name || '',
      qty: Number(c.qty) || 0,
      price: Math.round(Number(c.price) || 0),
      total: Math.round((Number(c.price) || 0) * (Number(c.qty) || 0)),
      note: c.note || null,
      /* هذه الأعمدة موجودة محلياً فقط في بعض النسخ؛ جدول Supabase الحالي
         يدعم حقول العرض والمجاني، لكنه لا يدعم original_price/price_override/
         override_reason. لا نرسل أعمدة غير موجودة كي لا تتوقف مزامنة الفاتورة. */
      offer_id: c.offer_id || null,
      is_free: !!c.is_free,
      offer_disc: !!c.offer_disc,
    };
  }

  function pull(opts) {
    opts = opts || {};
    if (!sb.enabled()) return Promise.resolve({ skipped: true, reason: 'cloud-config-missing' });
    if (!window.alfaTransportAvailable()) return Promise.resolve({ skipped: true, reason: 'transport-unavailable' });
    /* كل استدعاء InvoiceSync.pull() هو طلب صريح من شاشة/زر؛ افتراض
       cloudPull=true يمنع رجوعه إلى local-store الفارغ عند نسيان الخيار. */
    const cloudPull = opts.cloudPull !== false;
    return Promise.all([
      sb.get('invoices', '?select=*&order=created_at.desc', { cloudPull: cloudPull }),
      sb.get('invoice_items', '?select=*', { cloudPull: cloudPull }),
    ]).then(function (pair) {
      const rows = pair[0] || [];
      const lines = pair[1] || [];
      const by = {};
      lines.forEach(function (l) {
        const k = String(l.invoice_id);
        (by[k] || (by[k] = [])).push(l);
      });
      if (!rows.length && window.DEMO_DATA && (DEMO_DATA.invoices || []).length) {
        return { skipped: true, reason: 'local-snapshot-preserved' };
      }
      if (!rows.length && sb.localTableInitialized) {
        return sb.localTableInitialized('invoices').then(function (authoritative) {
          if (!authoritative) return { skipped: true, reason: 'local-snapshot-preserved' };
          if (window.DEMO_DATA) DEMO_DATA.invoices = [];
          return { pulled: true, n: 0 };
        });
      }
      const invoices = rows.map(function (r) { return fromInv(r, by[String(r.id)] || []); });
      if (window.DEMO_DATA) DEMO_DATA.invoices = invoices;
      return { pulled: true, n: invoices.length };
    }).catch(function (e) {
      return { skipped: true, error: String(e && e.message || e) };
    });
  }

  /* ── جلب فاتورة واحدة بالمعرف ──
     مُصمَّم لصفحة تتبع الطلب (track.html): الزبون يفتح الرابط من هاتفه
     بلا جلسة ولا نسخة محلية، فلا يجوز سحب جدول الفواتير كاملاً إلى
     متصفحه (أسماء وأرقام كل الزبائن) — نجلب فاتورته وحدها. */
  function fetchOne(id) {
    if (!sb.enabled() || !id) return Promise.resolve(null);
    const sid = String(id);
    return Promise.all([
      sb.get('invoices', '?select=*&id=eq.' + encodeURIComponent(sid) + '&limit=1'),
      sb.get('invoice_items', '?select=*&invoice_id=eq.' + encodeURIComponent(sid)),
    ]).then(function (pair) {
      const row = (pair[0] || [])[0];
      if (!row) return null;
      const inv = fromInv(row, pair[1] || []);
      if (window.DEMO_DATA) {
        const list = (window.DEMO_DATA.invoices || []).slice();
        const i = list.findIndex(function (x) { return String(x.id) === sid; });
        if (i >= 0) list[i] = inv; else list.push(inv);
        window.DEMO_DATA.invoices = list;
      }
      return inv;
    }).catch(function () { return null; });
  }

  function pushOne(inv, _retriedCode, _retriedNo) {
    if (!sb.enabled() || !inv || !inv.id) return Promise.resolve({ skipped: true });
    var row = toInv(inv);
    var lines = (inv.items || []).map(function (c) { return toLine(row.id, c); });
    console.log('[InvoiceSync] pushOne:', row.id, 'status:', row.status, 'items:', lines.length);
    return sb.upsert('invoices', [row], 'id')
      .then(function () {
        console.log('[InvoiceSync] invoices upsert OK:', row.id);
        return sb.delFilter('invoice_items', '?invoice_id=eq.' + encodeURIComponent(row.id));
      })
      .then(function () {
        console.log('[InvoiceSync] invoice_items delete OK:', row.id);
        return sb.insert('invoice_items', lines);
      })
      .then(function () {
        console.log('[InvoiceSync] invoice_items insert OK:', row.id, '—', lines.length, 'lines');
        return { pushed: true, id: row.id };
      })
      .catch(function (e) {
        var msg = String((e && e.message) || e);
        /* ── تضارب رمز السحب مع جهاز آخر ──
           السحابة تفرض فهرساً فريداً على draw_code، فإذا ولّد كاشيران
           الرمز نفسه فشل الرفع بـ 409. بدون هذه المعالجة يبقى الصف
           المعلَّق في الصندوق يُعاد رفعه بالرمز ذاته إلى الأبد — أي
           فاتورة أموال لا تصل للسحابة أبداً. نولّد رمزاً جديداً
           ونعيد المحاولة مرة واحدة. */
        /* ── تضارب رقم الفاتورة بين جهازين أوفلاين ──
           القيد الفريد invoices_date_no_key على (date,no) يرفض الفاتورة
           إذا أنشأ جهازان الرقم نفسه دون اتصال. سابقاً كانت تُرفض
           نهائياً فتضيع. نمنحها الآن رقماً جديداً ونعيد المحاولة مرة
           واحدة — الرقم المطبوع يختلف عن المحفوظ، لكن الفاتورة لا تضيع. */
        if (!_retriedNo && /date_no|invoices_date_no_key/.test(msg) && /duplicate|unique|23505/i.test(msg)) {
          var fresh = window.alfaFreshInvoiceNo ? window.alfaFreshInvoiceNo() : 0;
          if (fresh && fresh !== Number(inv.no)) {
            var oldId = String(inv.id);
            inv.no = fresh;
            inv.id = window.nextInvoiceId ? window.nextInvoiceId(fresh) : inv.id;
            if (window.DEMO_DATA && Array.isArray(window.DEMO_DATA.invoices)) {
              window.DEMO_DATA.invoices.forEach(function (x) {
                if (String(x.id) === oldId) { x.no = fresh; x.id = inv.id; }
              });
            }
            try { if (window.alfaPersist) window.alfaPersist(); } catch (e2) {}
            console.log('[InvoiceSync] رقم مكرّر — أُعيد ترقيمها إلى', fresh);
            return pushOne(inv, _retriedCode, true);
          }
        }
        if (!_retriedCode && /draw_code/i.test(msg) && /duplicate|unique|23505/i.test(msg)) {
          var code = window.alfaNewDrawCode ? alfaNewDrawCode() : null;
          if (code) {
            inv.draw_code = code;
            row.draw_code = code;
            if (window.DEMO_DATA && Array.isArray(window.DEMO_DATA.invoices)) {
              window.DEMO_DATA.invoices.forEach(function (x) {
                if (String(x.id) === String(inv.id)) x.draw_code = code;
              });
            }
            try { if (window.alfaPersist) window.alfaPersist(); } catch (err) {}
            console.warn('[InvoiceSync] تضارب رمز سحب — إعادة المحاولة برمز جديد:', code);
            return pushOne(inv, true);
          }
        }
        console.error('[InvoiceSync] pushOne FAILED:', row.id, msg);
        throw e;
      });
  }

  function removeRaw(id) {
    return sb.delFilter('invoice_items', '?invoice_id=eq.' + encodeURIComponent(id))
      .then(function () { return sb.del('invoices', [id]); });
  }
  function remove(id) {
    if (!sb.enabled() || !id) return Promise.resolve({ skipped: true });
    if (window.AlfaOutbox) return AlfaOutbox.commitDelete('invoices', id);
    return removeRaw(id).catch(function (e) {
      try { if (window.showToast) showToast('تعذر حذف الفاتورة من السحابة: ' + (e && e.message || e), '⚠️'); } catch (err) {}
    });
  }

  function pushSoon(inv) {
    if (!sb.enabled() || !inv) return Promise.resolve({ skipped: true });
    if (!window.AlfaOutbox) {
      return pushOne(inv).catch(function (e) {
        try { if (window.showToast) showToast('تعذر رفع الفاتورة: ' + (e && e.message || e), '⚠️'); } catch (err) {}
        return { failed: true, error: String(e && e.message || e) };
      });
    }
    /* التزام مباشر للفاتورة: ننتظر تثبيتها محلياً قبل الطباعة؛
       الرفع السحابي لاحق ويمكن أن يفشل دون فقد الصف المحلي. */
    return AlfaOutbox.commitOne('invoices', inv);
  }

  /* ── صندوق صادر الفواتير (أحرج مسار — فلوس حقيقية!) ── */
  function pushRows(rows) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    return (rows || []).reduce(function (p, inv) { return p.then(function () { return pushOne(inv); }); }, Promise.resolve())
      .then(function () { return { pushed: true, n: (rows || []).length }; });
  }
  function delRows(ids) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    return (ids || []).reduce(function (p, id) { return p.then(function () { return removeRaw(id); }); }, Promise.resolve());
  }
  function applyBox(b) {
    if (!window.DEMO_DATA || !window.AlfaOutbox) return;
    DEMO_DATA.invoices = AlfaOutbox.mergeLists(DEMO_DATA.invoices, b);
    try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
  }
  if (window.AlfaOutbox) AlfaOutbox.register('invoices', { pushRows: pushRows, delRows: delRows });
  function pullGuarded() {
    if (!window.AlfaOutbox) return pull();
    return AlfaOutbox.guarded('invoices', pull, applyBox)();
  }

  return { pull: pullGuarded, pushOne: pushOne, pushSoon: pushSoon, remove: remove, fetchOne: fetchOne };
})();


/* ══════════════════════════════════════════════════════════════
   دمج الطلبات الأونلاين مع حفظ ترحيل الحالة
   ──────────────────────────────────────────────────────────────
   الحالات النهائية (done / rejected) لا تُستبدل أبداً بـ new من
   أي طرف — وإلا بعد «قبول وطباعة» يعود الطلب للظهور كأنه جديد
   عند أول سحب (خصوصاً PosSync الذي كان يستبدل المصفوفة كاملة).
   ══════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   مفتاح الطلب الأونلاين: الرقم + التاريخ
   ──────────────────────────────────────────────────────────────
   رقم الطلب يبدأ من 001 كل يوم، فيتكرر الرقم نفسه بين الأيام —
   وهذا مقبول تماماً. لكن الرقم وحده لا يكفي لتمييز الطلب، فالمفتاح
   صار مركّباً: «on 001|2026-09-25». يُستخدم للدمج والبحث والإشعارات
   حتى لا يختلط طلب اليوم بطلب يوم آخر يحمل الرقم نفسه.
   ══════════════════════════════════════════════════════════════ */
window.alfaOrderKey = function (o) {
  if (!o) return '';
  var d = o.date || (o.created_at ? String(o.created_at).slice(0, 10) : '');
  return String(o.id != null ? o.id : '') + '|' + String(d || '');
};

window.alfaMergeOnlineOrders = function (localList, remoteList) {
  var RANK = { new: 0, rejected: 1, done: 1 };
  var byId = {};
  function rank(s) { return RANK[s] || 0; }
  function put(row, preferTerminal) {
    if (!row || row.id == null) return;
    var id = window.alfaOrderKey(row);
    var cur = byId[id];
    if (!cur) { byId[id] = row; return; }
    var cr = rank(cur.status), rr = rank(row.status);
    if (cr > 0 && rr === 0) {
      /* الحالي نهائي والجديد new — احتفظ بالنهائي + print_no */
      byId[id] = Object.assign({}, row, {
        status: cur.status,
        invoice_id: cur.invoice_id || row.invoice_id || null,
        no: cur.no != null ? cur.no : row.no,
        print_no: cur.print_no != null ? cur.print_no : row.print_no,
        date: cur.date || row.date || null
      });
      return;
    }
    if (rr > 0 && cr === 0) {
      /* الوارد نهائي والمحلي new — خذ النهائي */
      byId[id] = Object.assign({}, cur, row, {
        print_no: row.print_no != null ? row.print_no : cur.print_no
      });
      return;
    }
    if (preferTerminal && cr > 0 && rr > 0) {
      /* كلاهما نهائي: فضّل من لديه فاتورة */
      var keep = (cur.invoice_id && !row.invoice_id) ? cur : Object.assign({}, cur, row);
      if (keep.print_no == null) keep.print_no = cur.print_no != null ? cur.print_no : row.print_no;
      byId[id] = keep;
      return;
    }
    byId[id] = Object.assign({}, cur, row, {
      print_no: (row.print_no != null ? row.print_no : cur.print_no)
    });
  }
  (localList || []).forEach(function (x) { put(Object.assign({}, x), true); });
  (remoteList || []).forEach(function (x) { put(Object.assign({}, x), false); });
  return Object.keys(byId).map(function (k) { return byId[k]; }).sort(function (a, b) {
    return String(b.created_at || '').localeCompare(String(a.created_at || ''));
  });
};

window.PosSync = (function () {
  const sb = window.AlfaSB;

  function pullOffers() {
    return Promise.all([
      sb.get('offers', '?select=id,title,price,active,expires_at'),
      sb.get('offer_items', '?select=*').catch(function () { return []; }),
    ]).then(function (pair) {
      const offers = pair[0] || [];
      const lines = pair[1] || [];
      const by = {};
      lines.forEach(function (l) {
        const k = String(l.offer_id);
        (by[k] || (by[k] = [])).push({ item_id: l.item_id, qty: Number(l.qty) || 1, free: !!l.free });
      });
      return offers.map(function (o) {
        return {
          id: String(o.id),
          title: o.title || '',
          price: Math.round(Number(o.price) || 0),
          active: o.active !== false,
          expires_at: o.expires_at || null,
          items: by[String(o.id)] || [],
        };
      });
    });
  }

  function pull() {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.resolve({ skipped: true });
    return Promise.all([
      pullOffers().catch(function () { return []; }),
      sb.get('contracts', '?select=*').catch(function () { return []; }),
      sb.get('online_orders', '?select=*').catch(function () { return []; }),
      /* إعدادات الكاشير الحية: خصم + تصميم فاتورة + قواعد بيع + أسعار */
      sb.get('settings', '?select=key,value&key=in.(discount,invoice_print,branding,pos_rules,price)').catch(function () { return []; }),
      sb.get('contract_installments', '?select=*').catch(function () { return []; }),
    ]).then(function (pack) {
      const offers = pack[0] || [];
      var contracts = pack[1] || [];
      const online = pack[2] || [];
      const setRows = pack[3] || [];
      const inst = pack[4] || [];
      if (inst.length && contracts.length) {
        const by = {};
        inst.forEach(function (r) {
          const k = String(r.contract_id);
          (by[k] || (by[k] = [])).push({
            id: r.id, due_date: r.due_date, amount: Number(r.amount) || 0,
            paid: !!r.paid, paid_date: r.paid_date || '',
          });
        });
        contracts = contracts.map(function (c) {
          return Object.assign({}, c, { installments: by[String(c.id)] || c.installments || [] });
        });
      }
      if (window.DEMO_DATA) {
        DEMO_DATA.offers = offers;
        DEMO_DATA.contracts = contracts;
        /* لا تستبدل الطلبات بالكامل — احفظ ترحيل الحالة المحلي */
        DEMO_DATA.online_orders = (window.alfaMergeOnlineOrders || function (a, b) {
          return (b && b.length) ? b : (a || []);
        })(DEMO_DATA.online_orders || [], online);
        const liveIds = {};
        (DEMO_DATA.items || []).forEach(function (i) { liveIds[String(i.id)] = true; });
        (setRows || []).forEach(function (r) {
          if (!r || !r.key) return;
          if (r.key === 'discount' && r.value) {
            DEMO_DATA.discount_settings = {
              invoice_pct: Number(r.value.invoice_pct) || 0,
              items: (r.value.items || []).filter(function (x) { return liveIds[String(x.item_id)]; }),
            };
          }
          if (r.key === 'invoice_print' && r.value) {
            DEMO_DATA.invoice_print_settings = r.value;
            try { if (window.alfaApplyInvoicePrint) window.alfaApplyInvoicePrint(r.value); } catch (e) {}
          }
          if (r.key === 'branding' && r.value) DEMO_DATA.branding = r.value;
          if (r.key === 'pos_rules' && r.value) {
            DEMO_DATA.pos_rules = r.value;
            try {
              if (r.value.require_shift != null) {
                localStorage.setItem('alfaprosys_require_shift', r.value.require_shift ? '1' : '0');
              }
            } catch (e) {}
          }
          if (r.key === 'price' && r.value) DEMO_DATA.price_settings = r.value;
        });
      }
      return { pulled: true, offers: offers.length, contracts: contracts.length, online: online.length };
    }).catch(function (e) {
      return { skipped: true, error: String(e && e.message || e) };
    });
  }

  /* ── حراسة السحب الموحّد: إعادة تطبيق المعلَّقات فوق النتيجة ── */
  function applyOffersBox(b) {
    if (!window.DEMO_DATA || !window.AlfaOutbox) return;
    DEMO_DATA.offers = AlfaOutbox.mergeLists(DEMO_DATA.offers, b);
  }
  function applyContractsBox(b) {
    if (!window.DEMO_DATA || !window.AlfaOutbox) return;
    DEMO_DATA.contracts = AlfaOutbox.mergeLists(DEMO_DATA.contracts, b);
  }
  function applyOnlineBox(b) {
    if (!window.DEMO_DATA || !window.AlfaOutbox) return;
    DEMO_DATA.online_orders = AlfaOutbox.mergeLists(DEMO_DATA.online_orders, b, window.alfaOrderKey);
  }
  function applySettingsBox(b) {
    if (!window.DEMO_DATA) return;
    const rows = (b && b.rows) || {};
    if (rows['discount']) DEMO_DATA.discount_settings = rows['discount'].value;
    if (rows['price']) DEMO_DATA.price_settings = rows['price'].value;
    if (rows['loyalty']) DEMO_DATA.loyalty = rows['loyalty'].value;
    if (rows['invoice_print']) {
      DEMO_DATA.invoice_print_settings = rows['invoice_print'].value;
      try { if (window.alfaApplyInvoicePrint) window.alfaApplyInvoicePrint(rows['invoice_print'].value); } catch (e) {}
    }
    if (rows['branding']) DEMO_DATA.branding = rows['branding'].value;
    if (rows['pos_rules']) {
      DEMO_DATA.pos_rules = rows['pos_rules'].value;
      try {
        if (rows['pos_rules'].value && rows['pos_rules'].value.require_shift != null) {
          localStorage.setItem('alfaprosys_require_shift', rows['pos_rules'].value.require_shift ? '1' : '0');
        }
      } catch (e) {}
    }
  }
  function persistAll() { try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {} }
  function pullGuarded() {
    if (!window.AlfaOutbox) return pull();
    const g = window.AlfaOutbox.guarded;
    const p1 = g('offers', pull, function (b) { applyOffersBox(b); persistAll(); });
    const p2 = g('contracts', p1, function (b) { applyContractsBox(b); persistAll(); });
    const p3 = g('online_orders', p2, function (b) { applyOnlineBox(b); persistAll(); });
    const p4 = g('settings', p3, function (b) { applySettingsBox(b); persistAll(); });
    return p4();
  }

  return { pull: pullGuarded };
})();

window.SessionSync = (function () {
  const sb = window.AlfaSB;
  let pushTimer = null;
  function sessionKey(session) {
    const s = session || (window.DEMO_DATA && DEMO_DATA.cashierSession) || {};
    const k = (window.alfaCurrentCashierKey ? alfaCurrentCashierKey() : '') || s.cashier_key || 'cashier';
    return 'cashier_session:' + String(k || 'cashier');
  }
  function currentSessionCloudRow(rows) {
    const key = sessionKey((window.DEMO_DATA && DEMO_DATA.cashierSession) || {});
    return (rows || []).find(function (r) { return r.key === key; })
      || (rows || []).find(function (r) { return r.key === 'cashier_session'; })
      || null;
  }

  function applyUi(ui) {
    if (!ui || typeof ui !== 'object') return;
    try {
      if (ui.require_shift != null) localStorage.setItem('alfaprosys_require_shift', ui.require_shift ? '1' : '0');
      if (ui.tables && window.DEMO_DATA && Array.isArray(ui.tables) && ui.tables.length) DEMO_DATA.tables = ui.tables;
    } catch (e) {}
  }

  function mapShift(r) {
    const pay = r.by_payment || {};
    const meta = pay._alfa_shift || {};
    return {
      id: String(r.id),
      date: r.date || '',
      cashier: r.cashier || 'الكاشير',
      cashier_key: meta.cashier_key || '',
      shift_key: meta.shift_key || '',
      shift_kind: meta.shift_kind || '',
      opened_at: r.opened_at || '',
      closed_at: r.closed_at || '',
      opening_cash: Number(r.opening_cash) || 0,
      sales_total: Number(r.sales_total) || 0,
      invoices_count: Number(r.invoices_count) || 0,
      cancelled_count: Number(r.cancelled_count) || 0,
      by_payment: pay,
      expenditures: Number(r.expenditures) || 0,
      closing_cash: r.closing_cash == null ? 0 : Number(r.closing_cash),
      difference: pay._diff != null ? Number(pay._diff) : 0,
      notes: r.notes || '',
    };
  }

  function pull() {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.resolve({ skipped: true });
    return Promise.all([
      sb.get('settings', '?select=key,value&key=in.(cashier_session,ui)').catch(function () { return []; }),
      /* الجلسة مفصولة بمفتاح الكاشير؛ لا يكتب المسائي فوق الصباحي. */
      sb.get('settings', '?select=key,value').then(function (rows) {
        return (rows || []).filter(function (r) { return String(r.key || '').indexOf('cashier_session:') === 0; });
      }).catch(function () { return []; }),
      sb.get('shifts', '?select=*&order=date.desc').catch(function () { return []; }),
    ]).then(function (pack) {
      const rows = (pack[0] || []).concat(pack[1] || []).filter(function (r, i, a) {
        return a.findIndex(function (x) { return x.key === r.key; }) === i;
      });
      const shifts = pack[2] || [];
      const current = currentSessionCloudRow(rows);
      if (current && current.value && typeof current.value === 'object' && window.DEMO_DATA) {
        DEMO_DATA.cashierSession = Object.assign({}, DEMO_DATA.cashierSession || {}, current.value);
      }
      rows.forEach(function (r) {
        if (r.key === 'ui') applyUi(r.value);
      });
      const applyShifts = function (authoritative) {
        if (!shifts.length && ((window.DEMO_DATA && DEMO_DATA.shifts_history) || []).length) {
          return { skipped: true, reason: 'local-snapshot-preserved' };
        }
        if (!shifts.length && !authoritative) return { skipped: true, reason: 'local-snapshot-preserved' };
        if (window.DEMO_DATA) DEMO_DATA.shifts_history = (shifts || []).map(mapShift);
        return { pulled: true, shifts: shifts.length };
      };
      if (!shifts.length && sb.localTableInitialized) return sb.localTableInitialized('shifts').then(applyShifts);
      return applyShifts(true);
    }).catch(function (e) {
      return { skipped: true, error: String(e && e.message || e) };
    });
  }

  function push() {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.resolve({ skipped: true });
    const session = (window.DEMO_DATA && DEMO_DATA.cashierSession) || {};
    return sb.upsert('settings', [{ key: sessionKey(session), value: session }], 'key')
      .then(function () { return { pushed: true, key: sessionKey(session) }; });
  }

  function pushSoon() {
    if (!sb.enabled()) return;
    if (!window.AlfaOutbox) {
      clearTimeout(pushTimer);
      pushTimer = setTimeout(function () {
        push().catch(function () {});
      }, 400);
      return;
    }
    const value = (window.DEMO_DATA && DEMO_DATA.cashierSession) || {};
    AlfaOutbox.commitOne('cashier_session', { key: sessionKey(value), value: value });
  }

  function pushCloseRaw(row) {
    const pay = Object.assign({}, row.by_payment || {});
    if (row.difference != null) pay._diff = row.difference;
    pay._alfa_shift = {
      cashier_key: row.cashier_key || '',
      shift_key: row.shift_key || '',
      shift_kind: row.shift_kind || '',
    };
    const rec = {
      id: String(row.id || ('sh_' + Date.now())),
      date: row.date || '',
      cashier: row.cashier || 'الكاشير',
      opened_at: row.opened_at || null,
      closed_at: row.closed_at || null,
      opening_cash: Number(row.opening_cash) || 0,
      sales_total: Number(row.sales_total) || 0,
      invoices_count: Number(row.invoices_count) || 0,
      cancelled_count: Number(row.cancelled_count) || 0,
      by_payment: pay,
      expenditures: Number(row.expenditures) || 0,
      closing_cash: Number(row.closing_cash) || 0,
      notes: row.notes || '',
      closed_by: row.cashier || null,
    };
    return sb.upsert('shifts', [rec], 'id');
  }
  function pushClose(row) {
    if (!sb.enabled() || !row) return Promise.resolve({ skipped: true });
    if (window.AlfaOutbox) return AlfaOutbox.commitOne('shifts', row);
    return pushCloseRaw(row)
      .then(function () { return push(); })
      .catch(function (e) {
        try { if (window.showToast) showToast('تعذر رفع الوردية: ' + (e && e.message || e), '⚠️'); } catch (err) {}
        return { skipped: true, error: String(e && e.message || e) };
      });
  }

  /* ── صندوقا الجلسة والورديات ── */
  function pushSessionRows(rows) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    const list = (rows || []).map(function (r) { return { key: r.key || 'cashier_session', value: r.value || {} }; });
    if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
    return sb.upsert('settings', list, 'key').then(function () { return { pushed: true, n: list.length }; });
  }
  function pushShiftRows(rows) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    return (rows || []).reduce(function (p, r) { return p.then(function () { return pushCloseRaw(r); }); }, Promise.resolve())
      .then(function () { return { pushed: true, n: (rows || []).length }; });
  }
  function delShiftRows(ids) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    return sb.del('shifts', ids || []);
  }
  function applySessionBox(b) {
    if (!window.DEMO_DATA) return;
    const rows = b && b.rows || {};
    const r = rows[sessionKey((window.DEMO_DATA && DEMO_DATA.cashierSession) || {})]
      || rows.cashier_session
      || Object.keys(rows).map(function (k) { return rows[k]; }).find(function (x) { return x && x.value && x.value.cashier_key === (window.alfaCurrentCashierKey ? alfaCurrentCashierKey() : 'cashier'); });
    if (r) {
      DEMO_DATA.cashierSession = Object.assign({}, DEMO_DATA.cashierSession || {}, (r.value || r));
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
  }
  function applyShiftsBox(b) {
    if (!window.DEMO_DATA || !window.AlfaOutbox) return;
    DEMO_DATA.shifts_history = AlfaOutbox.mergeLists(DEMO_DATA.shifts_history, b);
    try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
  }
  if (window.AlfaOutbox) {
    AlfaOutbox.register('cashier_session', { pushRows: pushSessionRows, delRows: function () { return Promise.resolve(); } });
    AlfaOutbox.register('shifts', { pushRows: pushShiftRows, delRows: delShiftRows });
  }
  function pullGuarded() {
    if (!window.AlfaOutbox) return pull();
    return AlfaOutbox.guarded('shifts', AlfaOutbox.guarded('cashier_session', pull, applySessionBox), applyShiftsBox)();
  }

  return { pull: pullGuarded, push: push, pushSoon: pushSoon, pushClose: pushClose };
})();

window.OnlineOrderSync = (function () {
  const sb = window.AlfaSB;
  let pushTimer = null;

  /* يوم الطلب: لا يكون فارغاً أبداً — العمود NOT NULL وهو جزء من مفتاح
     الجدول، فأي صف بلا تاريخ يُرفض برمز 23502. */
  function orderDay(o) {
    var d = o && o.date ? String(o.date) : '';
    if (/^\d{4}-\d{2}-\d{2}/.test(d)) return d.slice(0, 10);
    var c = o && o.created_at ? String(o.created_at) : '';
    if (/^\d{4}-\d{2}-\d{2}/.test(c)) return c.slice(0, 10);
    return new Date().toISOString().slice(0, 10);
  }

  function row(o) {
    return {
      id: String(o.id),
      created_at: o.created_at || null,
      customer: o.customer || null,
      items: o.items || [],
      subtotal: Number(o.subtotal) || 0,
      delivery_fee: Number(o.delivery_fee) || 0,
      discount: Number(o.discount) || 0,
      total: Number(o.total) || 0,
      payment: o.payment || 'cash',
      status: o.status || 'new',
      source: o.source || 'online',
      invoice_id: o.invoice_id || null,
      no: o.no == null ? null : o.no,
      /* ── تنبيه: لا تُضِف هنا عموداً غير موجود في الجدول ──────────
         كان يُرسل print_no وهو عمود غير موجود في online_orders، فيردّ
         الخادم 400 (PGRST204) ويفشل رفع الطلب كاملاً — فيبقى الطلب
         محلياً ولا تُحفظ حالته، ويبدو كأن النظام لا يجلب شيئاً.
         الأعمدة المتاحة في الجدول: id · created_at · customer · items ·
         subtotal · delivery_fee · discount · total · payment · status ·
         source · invoice_id · no · date.
         رقم الطباعة يبقى محلياً في الطلب ولا يُرفع — والدمج يحفظه. ── */
      date: orderDay(o),
    };
  }

  function pull() {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.resolve({ skipped: true });
    return sb.get('online_orders', '?select=*&order=created_at.desc').then(function (remote) {
      if (window.DEMO_DATA) {
        var local = DEMO_DATA.online_orders || [];
        DEMO_DATA.online_orders = (window.alfaMergeOnlineOrders || function (a, b) {
          return (b && b.length) ? b : (a || []);
        })(local, remote || []);
      }
      return { pulled: true, n: (remote || []).length };
    }).catch(function (e) {
      return { skipped: true, error: String(e && e.message || e) };
    });
  }

  function pushOne(o) {
    if (!sb.enabled() || !o || !o.id) return Promise.resolve({ skipped: true });
    return sb.upsert('online_orders', [row(o)], 'id,date');
  }

  function pushAll() {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.resolve({ skipped: true });
    const list = ((window.DEMO_DATA && DEMO_DATA.online_orders) || []).map(row);
    if (!list.length) return Promise.resolve({ skipped: true, reason: 'empty' });
    return sb.upsert('online_orders', list, 'id,date').then(function () { return { pushed: true, n: list.length }; });
  }

  function pushSoonLegacy(o) {
    if (o) {
      pushOne(o).catch(function (e) {
        try { if (window.showToast) showToast('تعذر رفع الطلب الأونلاين: ' + (e && e.message || e), '⚠️'); } catch (err) {}
      });
      return;
    }
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () { pushAll().catch(function () {}); }, 500);
  }
  function pushSoon(o) {
    if (!sb.enabled()) return Promise.resolve({ skipped: true });
    if (!window.AlfaOutbox) { pushSoonLegacy(o); return pushOne(o); }
    /* ترحيل الحالة فوري: قيّد في الصندوق + ارفع الصف مباشرة حتى لا
       يعود الطلب «جديداً» عند أول سحب قبل انتهاء ارتداد الـ250ms. */
    var pBox = o
      ? AlfaOutbox.commitOne('online_orders', o)
      : AlfaOutbox.commitRows('online_orders', (window.DEMO_DATA && DEMO_DATA.online_orders) || []);
    var pDirect = o ? pushOne(o).catch(function () { return null; }) : Promise.resolve(null);
    return Promise.all([pBox, pDirect]).then(function (pair) {
      if (window.AlfaOutbox && AlfaOutbox.flush) {
        return AlfaOutbox.flush('online_orders').catch(function () { return null; }).then(function () {
          return pair[1] || pair[0];
        });
      }
      return pair[1] || pair[0];
    });
  }

  /* ── صندوق صادر الطلبات الأونلاين ── */
  function pushRows(rows) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    const list = (rows || []).map(row);
    if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
    return sb.upsert('online_orders', list, 'id,date').then(function () { return { pushed: true, n: list.length }; });
  }
  function delRows(keys) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    var list = keys || [];
    if (!list.length) return Promise.resolve();
    /* المفتاح المركّب «رقم|تاريخ»: الحذف يجب أن يحمل التاريخ أيضاً وإلا
       لمسحنا الطلب نفسه من كل الأيام. */
    return Promise.all(list.map(function (k) {
      var str = String(k), bar = str.indexOf('|');
      if (bar < 0) return sb.del('online_orders', [str]);
      var id = str.slice(0, bar), dt = str.slice(bar + 1);
      return sb.delFilter('online_orders',
        '?id=eq.' + encodeURIComponent(id) + '&date=eq.' + encodeURIComponent(dt));
    }));
  }
  function applyBox(b) {
    if (!window.DEMO_DATA || !window.AlfaOutbox) return;
    DEMO_DATA.online_orders = AlfaOutbox.mergeLists(DEMO_DATA.online_orders, b);
    try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
  }
  if (window.AlfaOutbox) AlfaOutbox.register('online_orders', { pushRows: pushRows, delRows: delRows });
  function pullGuarded() {
    if (!window.AlfaOutbox) return pull();
    return AlfaOutbox.guarded('online_orders', pull, applyBox)();
  }

  return { pull: pullGuarded, pushOne: pushOne, pushAll: pushAll, pushSoon: pushSoon,
    remove: function (id) {
      if (!sb.enabled() || !id) return Promise.resolve({ skipped: true });
      if (window.AlfaOutbox) return AlfaOutbox.commitDelete('online_orders', id);
      return sb.del('online_orders', [id]).catch(function () {});
    } };
})();

window.AgentSync = (function () {
  const sb = window.AlfaSB;
  let pushTimer = null;

  function row(a) {
    return {
      id: String(a.id),
      name: a.name || '',
      type: a.type || 'employee',
      phone: a.phone || null,
      fee_per_trip: Number(a.fee_per_trip) || 0,
      notes: a.notes || null,
      is_active: a.is_active !== false,
    };
  }

  function pull() {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.resolve({ skipped: true });
    return sb.get('delivery_agents', '?select=*&order=name.asc').then(function (remote) {
      if (!(remote || []).length && window.DEMO_DATA && (DEMO_DATA.delivery_agents || []).length) {
        return { skipped: true, reason: 'local-snapshot-preserved' };
      }
      if (window.DEMO_DATA) DEMO_DATA.delivery_agents = remote || [];
      if ((remote || []).length) return { pulled: true, n: remote.length };
      return sb.get('settings', '?select=key,value&key=eq.delivery_agents').then(function (rows) {
        const val = rows && rows[0] && rows[0].value;
        if (Array.isArray(val) && val.length && window.DEMO_DATA) DEMO_DATA.delivery_agents = val;
        return { pulled: true, n: Array.isArray(val) ? val.length : 0 };
      });
    }).catch(function (e) {
      return { skipped: true, error: String(e && e.message || e) };
    });
  }

  function push() {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.resolve({ skipped: true });
    const list = ((window.DEMO_DATA && DEMO_DATA.delivery_agents) || []).map(row);
    return sb.upsert('delivery_agents', list, 'id')
      .then(function () { return { pushed: true, n: list.length }; });
  }

  function pushSoon() {
    if (!sb.enabled()) return;
    if (!window.AlfaOutbox) {
      clearTimeout(pushTimer);
      pushTimer = setTimeout(function () { push().catch(function () {}); }, 500);
      return;
    }
    AlfaOutbox.commitRows('agents', (window.DEMO_DATA && DEMO_DATA.delivery_agents) || []);
  }

  /* ── صندوق صادر المندوبين ── */
  function pushRows(rows) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    const list = (rows || []).map(row);
    if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
    return sb.upsert('delivery_agents', list, 'id').then(function () { return { pushed: true, n: list.length }; });
  }
  function delRows(ids) {
    if (!sb.enabled() || !window.alfaTransportAvailable()) return Promise.reject(new Error('offline'));
    return sb.del('delivery_agents', ids || []);
  }
  function applyBox(b) {
    if (!window.DEMO_DATA || !window.AlfaOutbox) return;
    DEMO_DATA.delivery_agents = AlfaOutbox.mergeLists(DEMO_DATA.delivery_agents, b);
    try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
  }
  if (window.AlfaOutbox) AlfaOutbox.register('agents', { pushRows: pushRows, delRows: delRows });
  function pullGuarded() {
    if (!window.AlfaOutbox) return pull();
    return AlfaOutbox.guarded('agents', pull, applyBox)();
  }

  return { pull: pullGuarded, push: push, pushSoon: pushSoon,
    remove: function (id) {
      if (!sb.enabled() || !id) return Promise.resolve({ skipped: true });
      if (window.AlfaOutbox) return AlfaOutbox.commitDelete('agents', id);
      return sb.del('delivery_agents', [id]).catch(function () {});
    } };
})();

window.AlfaLive = {
  /* أُبقي الاسم للتوافق مع الصفحات القديمة؛ بعد bootstrap لا يسمح
     المسار الموحد بجلب جديد، لأن الاتجاه يصبح من المحلي إلى السحابة. */
  start: function () { return null; },
  refresh: function (after) {
    if (window.AlfaAutoSync && AlfaAutoSync.pull) {
      return AlfaAutoSync.pull('legacy-refresh').then(function (r) {
        if (typeof after === 'function') after(r); return r;
      });
    }
    return Promise.resolve({ skipped: true });
  },
};

/* ================================================================
   AlfaAutoSync — مزامنة ثنائية آمنة
   ----------------------------------------------------------------
   - الرفع يبقى تلقائياً عبر الصناديق الموجودة.
   - جلب bootstrap واحد فقط عند أول تهيئة ناجحة؛ لا يوجد سحب تلقائي
     متكرر عند الإقلاع أو عودة الاتصال أو عودة التبويب.
   - بعد bootstrap يصبح الاتجاه المحلي ← السحابة عبر الصناديق الصادرة؛
     الحفظ المحلي يسبق الرفع دائماً.
   - عند اختلاف أول جلب تُعرض مراجعة واحدة واضحة، خصوصاً تغييرات الأسعار،
     بخياري قبول أو رفض؛ لا تُعاد الرسالة بعد القرار.
   ================================================================ */
window.AlfaAutoSync = (function () {
  const STATE_KEY = 'alfa_auto_sync_state_v1';
  const BACKUP_KEY = 'alfa_auto_sync_backup_v1';
  /* لقطة جارية منفصلة عن آخر دورة ناجحة. إذا أُغلق التبويب أثناء jobs
     نستعيدها عند الإقلاع قبل أي دورة جديدة، فلا يبقى نصف جلب في اللقطة. */
  const PRE_PULL_KEY = 'alfa_auto_sync_pre_pull_v1';
  const TRACKED = [
    'categories', 'items', 'customers', 'invoices', 'employees',
    'inventory', 'inventory_materials', 'inventory_log', 'suppliers',
    'contracts', 'expenditures', 'material_purchases', 'audit_log',
    'loyalty', 'loyalty_ledger', 'delivery_agents', 'offers', 'discount_settings',
    'price_settings', 'cashierSession', 'shifts_history', 'tables',
    'branding', 'pos_rules', 'invoice_print_settings', 'profit_pct',
    'online_orders_cfg', 'online_orders',
  ];
  const LOCK_KEY = 'alfa_auto_sync_lock_v1';
  const LABELS = {
    categories: 'التصنيفات', items: 'الأصناف والأسعار', customers: 'العملاء',
    invoices: 'الفواتير', employees: 'الموظفون', inventory: 'المخزون',
    inventory_materials: 'مواد المخزون', inventory_log: 'حركات المخزون',
    suppliers: 'الموردون', contracts: 'العقود', expenditures: 'المصاريف',
    material_purchases: 'مشتريات المواد', audit_log: 'سجل التدقيق',
    loyalty: 'إعدادات الولاء', loyalty_ledger: 'دفتر الولاء', delivery_agents: 'عمال التوصيل',
    offers: 'العروض', discount_settings: 'الخصومات', price_settings: 'إعدادات الأسعار',
    cashierSession: 'جلسة الكاشير', shifts_history: 'الورديات', tables: 'الطاولات',
    branding: 'بيانات المطعم', pos_rules: 'قواعد البيع',
    invoice_print_settings: 'إعدادات الطباعة', profit_pct: 'نسبة الربح',
    online_orders_cfg: 'إعدادات الطلبات الأونلاين', online_orders: 'الطلبات الأونلاين',
  };
  let started = false;
  let running = null;
  let state = null;
  let statePromise = null;
  let lastAttempt = 0;
  let lastVisibilityPull = 0;
  let recoveryPromise = null;
  let recoveryBlocked = false;

  function clone(value) {
    try { return JSON.parse(JSON.stringify(value == null ? null : value)); }
    catch (e) { return null; }
  }
  function snapshot() {
    return clone(window.DEMO_DATA || {}) || {};
  }
  function json(value) {
    try { return JSON.stringify(value == null ? null : value); }
    catch (e) { return ''; }
  }
  function equal(a, b) { return json(a) === json(b); }
  function acquireLock() {
    try {
      const now = Date.now();
      const old = JSON.parse(localStorage.getItem(LOCK_KEY) || 'null');
      if (old && old.at && now - Number(old.at) < 90000) return false;
      const token = String(now) + '-' + Math.random().toString(36).slice(2);
      localStorage.setItem(LOCK_KEY, JSON.stringify({ at: now, token: token }));
      const check = JSON.parse(localStorage.getItem(LOCK_KEY) || 'null');
      return !!(check && check.token === token);
    } catch (e) { return true; }
  }
  function releaseLock() {
    try { localStorage.removeItem(LOCK_KEY); } catch (e) {}
  }
  function sessionAllowed() {
    try {
      const path = String(window.location.pathname || '').split('/').pop() || 'index.html';
      const role = sessionStorage.getItem('alfaprosys_role');
      return path !== 'index.html' && path !== 'track.html' && !!role;
    } catch (e) { return false; }
  }
  function rowId(row, index) {
    if (row && row.id != null) return String(row.id);
    if (row && row.key != null) return String(row.key);
    return '#' + index;
  }
  function diffArray(before, after) {
    const a = Array.isArray(before) ? before : [];
    const b = Array.isArray(after) ? after : [];
    const am = {}, bm = {};
    a.forEach(function (row, i) { am[rowId(row, i)] = row; });
    b.forEach(function (row, i) { bm[rowId(row, i)] = row; });
    let added = 0, removed = 0, changed = 0;
    Object.keys(bm).forEach(function (id) {
      if (!Object.prototype.hasOwnProperty.call(am, id)) added++;
      else if (!equal(am[id], bm[id])) changed++;
    });
    Object.keys(am).forEach(function (id) {
      if (!Object.prototype.hasOwnProperty.call(bm, id)) removed++;
    });
    return { added: added, removed: removed, changed: changed,
      total: added + removed + changed };
  }
  function diff(before, after) {
    return TRACKED.map(function (key) {
      const b = before && before[key], a = after && after[key];
      const d = Array.isArray(b) || Array.isArray(a)
        ? diffArray(b, a)
        : (equal(b, a) ? { added: 0, removed: 0, changed: 0, total: 0 }
          : { added: 0, removed: 0, changed: 1, total: 1 });
      return Object.assign({ key: key }, d);
    }).filter(function (d) { return d.total > 0; });
  }
  /* تفاصيل مستقلة لتغيّر أسعار الأصناف؛ تُعرض للمستخدم عند أول جلب
     فقط، بدلاً من رسالة عامة تتكرر مع كل رفع أو إعادة فتح للشاشة. */
  function priceChanges(beforeRows, afterRows) {
    const before = {}, after = {};
    (Array.isArray(beforeRows) ? beforeRows : []).forEach(function (row, i) {
      before[rowId(row, i)] = row || {};
    });
    (Array.isArray(afterRows) ? afterRows : []).forEach(function (row, i) {
      after[rowId(row, i)] = row || {};
    });
    const fields = [
      { key: 'price', label: 'السعر' },
      { key: 'price_new', label: 'السعر الجديد' },
      { key: 'price_usd', label: 'السعر بالدولار' },
    ];
    const out = [];
    Object.keys(after).forEach(function (id) {
      if (!Object.prototype.hasOwnProperty.call(before, id)) return;
      const oldRow = before[id], newRow = after[id];
      const changed = fields.map(function (field) {
        const oldValue = oldRow[field.key] == null || oldRow[field.key] === '' ? null : oldRow[field.key];
        const newValue = newRow[field.key] == null || newRow[field.key] === '' ? null : newRow[field.key];
        if (String(oldValue) === String(newValue)) return null;
        return { label: field.label, from: oldValue, to: newValue };
      }).filter(Boolean);
      if (changed.length) {
        out.push({ id: id, name: newRow.name || oldRow.name || id, fields: changed });
      }
    });
    return out;
  }
  function priceText(value) {
    if (value == null || value === '') return 'غير محدد';
    const n = Number(value);
    return Number.isFinite(n) ? n.toLocaleString('en-US') : String(value);
  }
  function esc(value) {
    if (window.e) return window.e(value);
    return String(value == null ? '' : value).replace(/[&<>'"]/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[c];
    });
  }
  function loadState() {
    if (state) return Promise.resolve(state);
    if (statePromise) return statePromise;
    statePromise = (window.SyncStorage && SyncStorage.getKey
      ? SyncStorage.getKey(STATE_KEY) : Promise.resolve(null))
      .then(function (v) {
        state = v && typeof v === 'object' ? v : {};
        return state;
      }).catch(function () { state = {}; return state; })
      .then(function (v) { statePromise = null; return v; });
    return statePromise;
  }
  function saveState() {
    if (!window.SyncStorage || !SyncStorage.setKey) return Promise.resolve(false);
    return SyncStorage.setKey(STATE_KEY, state || {}).catch(function () { return false; });
  }
  /* ترحيل آمن: النسخة السابقة كانت تسحب عند كل إقلاع. وجود دورة ناجحة
     قديمة يعني أن الجلب الأول تم فعلاً، فلا نعيد فتح مراجعة بلا سبب. */
  function migrateLegacyState() {
    if (!state || state.bootstrapDone) return Promise.resolve(state);
    if (state.lastPullAt || state.lastBackupAt || state.reviewedBackupAt) {
      state.bootstrapDone = true;
      state.bootstrapMigratedAt = Date.now();
      return saveState().then(function () { return state; });
    }
    return Promise.resolve(state);
  }
  function getBackup() {
    if (!window.SyncStorage || !SyncStorage.getKey) return Promise.resolve(null);
    return SyncStorage.getKey(BACKUP_KEY).catch(function () { return null; });
  }
  function saveBackup(value) {
    if (!window.SyncStorage || !SyncStorage.setKey) return Promise.resolve(false);
    return SyncStorage.setKey(BACKUP_KEY, value).catch(function () { return false; });
  }
  function clearBackup() {
    if (!window.SyncStorage || !SyncStorage.delKey) return Promise.resolve(false);
    return SyncStorage.delKey(BACKUP_KEY).catch(function () { return false; });
  }
  function savePrePull(value) {
    if (!window.SyncStorage || !SyncStorage.setKey) return Promise.resolve(false);
    return SyncStorage.setKey(PRE_PULL_KEY, value).catch(function () { return false; });
  }
  function getPrePull() {
    if (!window.SyncStorage || !SyncStorage.getKey) return Promise.resolve(null);
    return SyncStorage.getKey(PRE_PULL_KEY).catch(function () { return null; });
  }
  function clearPrePull() {
    if (!window.SyncStorage || !SyncStorage.delKey) return Promise.resolve(false);
    return SyncStorage.delKey(PRE_PULL_KEY).catch(function () { return false; });
  }
  function saveLocalSnapshot(value) {
    if (!window.SyncStorage || !SyncStorage.save) return Promise.resolve(false);
    return SyncStorage.save(value).then(function (ok) { return ok !== false; }).catch(function () { return false; });
  }
  async function recoverInterruptedPull() {
    const pending = await getPrePull();
    if (!pending || !pending.before || typeof pending.before !== 'object') return { found: false, ok: true };
    const before = clone(pending.before) || pending.before;
    restoreInMemory(before);
    const saved = await saveLocalSnapshot(before);
    if (!saved) {
      try { if (window.showToast) showToast('تعذر استعادة النسخة القبلية — أُوقف الجلب حفاظاً على البيانات', '⚠️'); } catch (e) {}
      return { found: true, ok: false };
    }
    const cleared = await clearPrePull();
    if (!cleared) {
      try { if (window.showToast) showToast('تعذر تثبيت اكتمال الاستعادة — أُوقف الجلب حفاظاً على البيانات', '⚠️'); } catch (e) {}
      return { found: true, ok: false };
    }
    try { window.dispatchEvent(new Event('alfa:auto-sync-applied')); } catch (e) {}
    try { if (window.showToast) showToast('استُعيدت النسخة المحلية قبل جلب غير مكتمل', '↩️'); } catch (e) {}
    return { found: true, ok: true };
  }
  function hasChanges(changes) { return Array.isArray(changes) && changes.length > 0; }
  function pendingBrowser() {
    const outbox = window.AlfaOutbox;
    const menu = window.MenuOutbox;
    return !!((outbox && outbox.hasPending && outbox.hasPending())
      || (menu && menu.hasPending && menu.hasPending()));
  }
  async function pendingLocal() {
    try {
      if (window.AlfaOutbox && AlfaOutbox.hydrateAll) await AlfaOutbox.hydrateAll();
      if (window.MenuOutbox && MenuOutbox.hydrate) await MenuOutbox.hydrate();
    } catch (e) {}
    if (pendingBrowser()) return true;
    /* في الوضع المحلي، وجود عمليات على القرص يعني أن server لم يثبت
       رفعها بعد؛ لا نبدأ جلباً قد يسبقها. هذه قراءة حالة فقط ولا تعيد
       محاولة أي عملية، وبالأخص لا تعيد طلب inventory_log. */
    try {
      if (window.AlfaSB && AlfaSB.localMode && AlfaSB.localMode() && AlfaSB.localStatus) {
        const s = await AlfaSB.localStatus();
        if (s && Number(s.pendingCloudOperations || 0) > 0) return true;
      }
    } catch (e) {}
    return false;
  }
  async function flushUploads() {
    /* الرفع الآلي أولاً، كما اتُّفق عليه. لا نستخدم هنا مسار pull. */
    try { if (window.SyncRemote && SyncRemote.flush) await SyncRemote.flush(); } catch (e) {}
  }
  function jobs() {
    const common = [
      [window.MenuSync, { cloudPull: true }],
      [window.CustomerSync, {}],
      [window.InvoiceSync, { cloudPull: true }],
      [window.PosSync, {}],
      [window.SessionSync, {}],
      [window.AgentSync, {}],
      [window.TableSync, {}],
    ];
    let list = common;
    try {
      if (sessionStorage.getItem('alfaprosys_role') === 'manager') {
        list = common.concat([
          [window.EmployeeSync, {}], [window.SupplierSync, {}],
          [window.InventorySync, {}], [window.ExpenditureSync, {}],
          [window.AuditSync, {}], [window.SettingsSync, {}],
        ]);
      }
    } catch (e) {}
    return list.filter(function (pair) { return pair[0] && typeof pair[0].pull === 'function'; });
  }
  function resultFailed(result) {
    return !!(result && (result.error || result.failed));
  }
  function reviewMarkup(backup) {
    const rows = (backup.changes || []).map(function (d) {
      return '<li><strong>' + esc(LABELS[d.key] || d.key) + '</strong>: '
        + (d.added ? '+' + d.added + ' إضافة ' : '')
        + (d.changed ? d.changed + ' تعديل ' : '')
        + (d.removed ? '−' + d.removed + ' حذف' : '') + '</li>';
    }).join('');
    const prices = backup.priceChanges || [];
    const priceRows = prices.map(function (row) {
      const details = (row.fields || []).map(function (field) {
        return '<span style="display:block">' + esc(field.label) + ': '
          + '<b>' + esc(priceText(field.from)) + '</b> ← <b style="color:#fde68a">'
          + esc(priceText(field.to)) + '</b></span>';
      }).join('');
      return '<li><strong>' + esc(row.name) + '</strong>' + details + '</li>';
    }).join('');
    const when = backup.at ? new Date(backup.at).toLocaleString('ar-SY') : '';
    return '<div id="alfaAutoSyncReview" style="position:fixed;left:12px;right:12px;bottom:12px;z-index:99990;direction:rtl;background:#102a43;color:#fff;border:2px solid #fbbf24;border-radius:14px;padding:13px 15px;box-shadow:0 10px 30px rgba(0,0,0,.35);font:700 13px Tahoma,Arial,sans-serif">'
      + '<div style="font-size:15px;margin-bottom:6px">⚠️ تغييرات من السحابة تحتاج قراراً واحداً</div>'
      + '<div style="font-weight:500;opacity:.9;margin-bottom:6px">' + esc(when) + ' — بعد القبول أو الرفض لن تتكرر هذه الرسالة تلقائياً.</div>'
      + (priceRows ? '<div style="color:#fde68a;margin:7px 0 3px">تغييرات الأسعار:</div><ul style="margin:4px 18px 9px;padding:0;line-height:1.8">' + priceRows + '</ul>' : '')
      + '<ul style="margin:6px 18px 10px;padding:0;line-height:1.8">' + (rows || '<li>لا توجد تفاصيل إضافية</li>') + '</ul>'
      + '<div style="display:flex;gap:7px;flex-wrap:wrap">'
      + '<button type="button" data-alfa-review="accept" style="border:0;border-radius:9px;padding:8px 12px;background:#22c55e;color:#052e16;font-weight:800;cursor:pointer">قبول التغييرات</button>'
      + '<button type="button" data-alfa-review="reject" style="border:1px solid #fecaca;border-radius:9px;padding:8px 12px;background:#991b1b;color:#fff;font-weight:800;cursor:pointer">رفض والإبقاء على المحلي</button>'
      + '<button type="button" data-alfa-review="show" style="border:1px solid rgba(255,255,255,.45);border-radius:9px;padding:8px 12px;background:transparent;color:#fff;font-weight:800;cursor:pointer">عرض التفاصيل</button>'
      + '</div></div>';
  }
  async function finishReview(backup, decision) {
    if (!backup) return;
    await loadState();
    state.bootstrapDone = true;
    state.reviewedBackupAt = backup.at;
    state.lastDecision = decision;
    state.lastDecisionAt = Date.now();
    await saveState();
    await clearBackup();
    const box = document.getElementById('alfaAutoSyncReview');
    if (box) box.remove();
    if (window.showToast) showToast(decision === 'accepted' ? 'تم اعتماد تغييرات السحابة' : 'تم الإبقاء على التعديلات المحلية', decision === 'accepted' ? '✅' : '↩️');
  }
  async function showReview(backup) {
    if (!backup || !hasChanges(backup.changes) || !document.body) return;
    const old = document.getElementById('alfaAutoSyncReview');
    if (old) old.remove();
    document.body.insertAdjacentHTML('beforeend', reviewMarkup(backup));
    const box = document.getElementById('alfaAutoSyncReview');
    if (!box) return;
    box.querySelector('[data-alfa-review="show"]').onclick = function () {
      const text = (backup.changes || []).map(function (d) {
        return (LABELS[d.key] || d.key) + ': +' + d.added + ' / تعديل ' + d.changed + ' / حذف ' + d.removed;
      }).join('\n');
      if (window.alert) alert('تفاصيل آخر مزامنة:\n\n' + text);
    };
    box.querySelector('[data-alfa-review="accept"]').onclick = function () {
      finishReview(backup, 'accepted').catch(function () {});
    };
    box.querySelector('[data-alfa-review="reject"]').onclick = function () {
      rollback(backup).catch(function () {});
    };
  }
  function restoreInMemory(before) {
    if (!before || !window.DEMO_DATA) return;
    try {
      Object.keys(window.DEMO_DATA).forEach(function (key) {
        if (!Object.prototype.hasOwnProperty.call(before, key)) delete window.DEMO_DATA[key];
      });
      Object.keys(before).forEach(function (key) { window.DEMO_DATA[key] = before[key]; });
      if (window.alfaPersist) window.alfaPersist();
    } catch (e) {}
  }
  /* عند رفض تغيير سعر سحابي، المحلي هو الفائز ويُقيَّد منيوه في الصندوق
     ثم يُرفع تلقائياً؛ لا نعيد فتح نفس المقارنة في الدورة التالية. */
  async function enqueueLocalMenuWinner(localSnapshot) {
    try {
      if (window.MenuOutbox && MenuOutbox.markDirty) {
        await MenuOutbox.markDirty(localSnapshot.items || [], localSnapshot.categories || []);
        if (MenuOutbox.flush) await MenuOutbox.flush();
      } else if (window.MenuSync && MenuSync.push) {
        await MenuSync.push();
      }
    } catch (e) {}
  }
  async function rollback(backupArg) {
    const backup = backupArg || await getBackup();
    if (!backup || !backup.before) return;
    window.__ALFA_AUTO_SYNC_PAUSED = true;
    try {
      const before = clone(backup.before) || backup.before;
      restoreInMemory(before);
      const ok = window.SyncStorage && SyncStorage.save
        ? await SyncStorage.save(before) : false;
      if (ok !== false) {
        await enqueueLocalMenuWinner(before);
        await loadState();
        state.bootstrapDone = true;
        state.reviewedBackupAt = backup.at;
        state.lastDecision = 'rejected';
        state.lastRollbackAt = Date.now();
        await saveState();
        await clearBackup();
        try { await clearPrePull(); } catch (e) {}
        try { window.dispatchEvent(new Event('alfa:auto-sync-applied')); } catch (e) {}
        if (window.showToast) showToast('تم رفض تغييرات السحابة والإبقاء على المحلي — سيُرفع تلقائياً', '↩️');
        setTimeout(function () { location.reload(); }, 250);
      }
    } finally { window.__ALFA_AUTO_SYNC_PAUSED = false; }
  }
  async function pull(reason) {
    if (!started || window.__ALFA_AUTO_SYNC_PAUSED || navigator.onLine === false) return { skipped: true, reason: 'offline-or-paused' };
    if (!sessionAllowed()) return { skipped: true, reason: 'no-session' };
    if (recoveryBlocked) return { skipped: true, reason: 'recovery-failed' };
    if (recoveryPromise) return recoveryPromise.then(function () { return pull(reason); });
    if (running) return running;
    await loadState();
    await migrateLegacyState();
    /* الجلب التلقائي/الموحّد مرة واحدة فقط. بعد تثبيت bootstrap يصبح
       الاتجاه المحلي ← السحابة، ولا تُفتح مراجعة جديدة عند الإقلاع أو
       عودة الاتصال أو استقرار صندوق الرفع. */
    if (state && state.bootstrapDone) return { skipped: true, reason: 'bootstrap-complete' };
    if (!window.AlfaSB || !AlfaSB.enabled || !AlfaSB.enabled()) return { skipped: true, reason: 'not-configured' };
    const now = Date.now();
    if (now - lastAttempt < 5000) return { skipped: true, reason: 'debounced' };
    if (!acquireLock()) return { skipped: true, reason: 'another-tab-syncing' };
    lastAttempt = now;
    running = (async function () {
      await loadState();
      await migrateLegacyState();
      if (state && state.bootstrapDone) return { skipped: true, reason: 'bootstrap-complete' };
      const before = snapshot();
      const previousBackup = await getBackup();
      /* لا نبدأ دورة جلب فوق صندوق محلي قائم. مسار الصندوق نفسه يرفع
         تلقائياً عبر online/queue؛ أما الجلب فينتظر حتى تصبح اللقطة
         المحلية مستقرة، كي لا يسبق التعديل المحلي أو يمحوه. */
      if (await pendingLocal()) {
        /* لا نحسب التأجيل كمحاولة كاملة؛ حدث alfa:uploads-settled
           يجب أن يستطيع إعادة المحاولة فور استقرار الصندوق. */
        lastAttempt = 0;
        if (window.showToast) showToast('تم تأجيل الجلب حتى يكتمل رفع التعديلات المحلية', '⏳');
        return { skipped: true, reason: 'local-writes-pending' };
      }
      /* الحفظ الدائم يسبق flush وjobs فعلياً. لا نسمح بأي جلب إذا تعذّر
         حفظ النسخة القبلية؛ هذا هو حاجز منع فقدان اللقطة المحلية. */
      const preSaved = await savePrePull({
        version: 1, at: Date.now(), reason: reason || 'automatic', before: before,
      });
      if (!preSaved) {
        if (window.showToast) showToast('تعذر حفظ النسخة القبلية — أُوقف الجلب حفاظاً على البيانات', '⚠️');
        return { skipped: true, reason: 'backup-failed' };
      }
      await flushUploads();
      if (await pendingLocal()) {
        await clearPrePull();
        lastAttempt = 0;
        if (window.showToast) showToast('تم تأجيل الجلب حتى يكتمل رفع التعديلات المحلية', '⏳');
        return { skipped: true, reason: 'local-writes-pending' };
      }
      let results = [];
      let failed = null;
      window.__ALFA_CLOUD_PULL_ACTIVE = true;
      try {
        results = await Promise.all(jobs().map(function (pair) {
          return Promise.resolve(pair[0].pull(pair[1] || {}));
        }));
        const bad = results.find(resultFailed);
        if (bad) failed = bad;
      } catch (e) { failed = e; }
      finally { window.__ALFA_CLOUD_PULL_ACTIVE = false; }
      if (failed) {
        restoreInMemory(before);
        const restored = await saveLocalSnapshot(before);
        if (restored) await clearPrePull();
        return { skipped: true, reason: 'pull-failed', error: String(failed.message || failed.error || failed) };
      }
      const after = snapshot();
      const changes = diff(before, after);
      await loadState();
      state.lastPullAt = Date.now();
      state.lastPullReason = reason || 'automatic';
      if (!hasChanges(changes)) {
        const localSaved = await saveLocalSnapshot(after);
        if (!localSaved) {
          restoreInMemory(before);
          const restored = await saveLocalSnapshot(before);
          if (restored) await clearPrePull();
          return { skipped: true, reason: 'local-persist-failed' };
        }
        state.lastPullChanged = false;
        state.bootstrapDone = true;
        state.bootstrapAt = state.bootstrapAt || Date.now();
        state.lastDecision = 'accepted-no-difference';
        await saveState();
        await clearPrePull();
        return { pulled: true, changed: false };
      }
      const backup = {
        version: 1,
        at: Date.now(),
        reason: reason || 'automatic',
        before: before,
        after: after,
        changes: changes,
        priceChanges: priceChanges(before.items, after.items),
      };
      const backupSaved = await saveBackup(backup);
      if (!backupSaved) {
        restoreInMemory(before);
        const restored = await saveLocalSnapshot(before);
        if (restored) await clearPrePull();
        if (previousBackup) await saveBackup(previousBackup);
        else if (window.SyncStorage && SyncStorage.delKey) await SyncStorage.delKey(BACKUP_KEY).catch(function () {});
        if (window.showToast) showToast('تعذر حفظ النسخة القبلية النهائية — أُعيدت اللقطة المحلية', '⚠️');
        return { skipped: true, reason: 'backup-failed' };
      }
      const localSaved = await saveLocalSnapshot(after);
      if (!localSaved) {
        restoreInMemory(before);
        const restored = await saveLocalSnapshot(before);
        if (restored) await clearPrePull();
        if (previousBackup) await saveBackup(previousBackup);
        else if (window.SyncStorage && SyncStorage.delKey) await SyncStorage.delKey(BACKUP_KEY).catch(function () {});
        if (window.showToast) showToast('تعذر حفظ اللقطة الجديدة محلياً — أُعيدت النسخة السابقة', '⚠️');
        return { skipped: true, reason: 'local-persist-failed' };
      }
      state.lastPullChanged = true;
      state.lastBackupAt = backup.at;
      state.bootstrapDone = true;
      state.bootstrapAt = state.bootstrapAt || backup.at;
      state.reviewedBackupAt = null;
      state.lastDecision = null;
      await saveState();
      await clearPrePull();
      try { window.dispatchEvent(new Event('alfa:auto-sync-applied')); } catch (e) {}
      if (document.body) showReview(backup);
      return { pulled: true, changed: true, changes: changes };
    })().catch(function (e) { return { skipped: true, error: String(e && e.message || e) }; }).finally(function () {
      releaseLock();
      running = null;
    });
    return running;
  }
  function start() {
    if (started) return;
    /* لا نسحب بيانات المطعم في شاشة الدخول أو صفحة التتبع العامة قبل
       التحقق من جلسة المستخدم. */
    if (!sessionAllowed()) return;
    started = true;
    /* إذا انقطع تبويب أثناء jobs، أعد اللقطة القبلية الدائمة أولاً؛
       لا نعرض نصف نتيجة ولا نبدأ جلباً جديداً فوقها. */
    const recovery = recoverInterruptedPull().catch(function () { return { found: true, ok: false }; });
    recoveryPromise = recovery;
    recovery.then(function (status) {
      if (status && status.ok === false) recoveryBlocked = true;
      if (recoveryPromise === recovery) recoveryPromise = null;
      return loadState().then(function () {
        return migrateLegacyState().then(function () {
          return getBackup().then(function (backup) {
            /* إن كانت هناك مراجعة معلّقة من أول جلب، نعرضها حتى يختار
               المستخدم مرة واحدة؛ بعد القرار لا نعرضها في الإقلاعات التالية. */
            if (backup && (!state || state.reviewedBackupAt !== backup.at)) {
              if (document.body) showReview(backup);
              else document.addEventListener('DOMContentLoaded', function () { showReview(backup); }, { once: true });
            }
          });
        });
      });
    }).catch(function () {});
    setTimeout(function () {
      recovery.then(function (status) {
        if (!status || status.ok !== false) pull('startup');
      });
    }, 900);
    /* إذا تعذر الجلب الأول فقط، نعيد المحاولة عند عودة الاتصال أو بعد
       استقرار الرفع. بعد bootstrap لا يستدعي أي من الحدثين جلباً جديداً. */
    window.addEventListener('online', function () { pull('bootstrap-online'); });
    window.addEventListener('alfa:uploads-settled', function () { pull('bootstrap-uploads-settled'); });
  }
  return { start: start, pull: pull, rollback: rollback, showReview: showReview,
    state: function () { return state; } };
})();


/* ================================================================
   AlfaSyncBarrier + AlfaLeaveGuard
   ---------------------------------------------------------------
   حارس موحّد لشاشات المنيو والمخزون والمصاريف:
   - التعديل المحلي يُثبّت أولاً.
   - «محلي فقط» يترك العملية في الصندوق ولا يجري سحباً.
   - «محلي + سحابة» لا يعتبر العملية ناجحة حتى يجيب /__sync ثم
     يثبت /__status أن عمليات الوحدة لا pending ولا failed.
   - إغلاق المتصفح نفسه يبقى تحت beforeunload الأصلي؛ لا يمكن للمتصفح
     ضمان عرض نافذة مخصّصة أو انتظار الشبكة أثناء الإغلاق.
   ================================================================ */
window.AlfaSyncBarrier = (function () {
  const MODULES = {
    menu: {
      label: 'المنيو والأسعار',
      pending: 'pendingMenuCloudOperations',
      failed: 'failedMenuCloudOperations',
      browser: function () { return !!(window.MenuOutbox && MenuOutbox.hasPending && MenuOutbox.hasPending()); },
      hydrate: function () { return window.MenuOutbox && MenuOutbox.hydrate ? MenuOutbox.hydrate() : Promise.resolve(); },
      flush: function () { return window.MenuOutbox && MenuOutbox.flush ? MenuOutbox.flush() : Promise.resolve({ skipped: true, reason: 'no-menu-outbox' }); },
    },
    inventory: {
      label: 'المخزون',
      pending: 'pendingInventoryCloudOperations',
      failed: 'failedInventoryCloudOperations',
      browser: function () {
        const b = window.AlfaOutbox && AlfaOutbox.snapshot ? AlfaOutbox.snapshot('inventory') : null;
        return !!((b && Object.keys(b.rows || {}).length) || (b && (b.dels || []).length)
          || (window.AlfaOutbox && AlfaOutbox.hasPending && AlfaOutbox.hasPending('inventory')));
      },
      hydrate: function () { return window.AlfaOutbox && AlfaOutbox.hydrate ? AlfaOutbox.hydrate('inventory') : Promise.resolve(); },
      flush: function () { return window.AlfaOutbox && AlfaOutbox.flush ? AlfaOutbox.flush('inventory') : Promise.resolve({ skipped: true, reason: 'no-inventory-outbox' }); },
    },
    expenditures: {
      label: 'المصاريف والمشتريات',
      pending: 'pendingExpenditureCloudOperations',
      failed: 'failedExpenditureCloudOperations',
      browser: function () {
        const out = window.AlfaOutbox;
        const a = out && out.snapshot ? out.snapshot('expenditures') : null;
        const b = out && out.snapshot ? out.snapshot('purchases') : null;
        const has = function (x) { return !!(x && (Object.keys(x.rows || {}).length || (x.dels || []).length)); };
        return has(a) || has(b)
          || !!(out && out.hasPending && (out.hasPending('expenditures') || out.hasPending('purchases')));
      },
      hydrate: function () {
        if (!window.AlfaOutbox || !AlfaOutbox.hydrate) return Promise.resolve();
        return Promise.all([AlfaOutbox.hydrate('expenditures'), AlfaOutbox.hydrate('purchases')]);
      },
      flush: function () {
        if (!window.AlfaOutbox || !AlfaOutbox.flush) return Promise.resolve([]);
        return Promise.all([AlfaOutbox.flush('expenditures'), AlfaOutbox.flush('purchases')]);
      },
    },
  };

  function moduleInfo(name) { return MODULES[name] || null; }
  function isLocalTransport() {
    try { return !!(window.AlfaSB && AlfaSB.localMode && AlfaSB.localMode()); } catch (e) { return false; }
  }
  function cloudConfigured() {
    try { return !!(window.AlfaSB && AlfaSB.enabled && AlfaSB.enabled()); } catch (e) { return false; }
  }
  function freshStatus() {
    if (!isLocalTransport()) return Promise.resolve(null);
    return fetch('/__status', { cache: 'no-store', credentials: 'same-origin' })
      .then(function (res) { if (!res.ok) throw new Error('local-status-' + res.status); return res.json(); })
      .catch(function () { return null; });
  }
  function localSnapshotSave() {
    let result;
    try { result = window.alfaPersist ? window.alfaPersist() : null; }
    catch (e) { result = Promise.reject(e); }
    return Promise.resolve(result).then(function (r) {
      if (r && r.saved === false) throw new Error(r.reason || 'local-persist-failed');
      /* أثناء إقلاع data.js قد يكون persistNow مؤجلاً بسبب الدمج؛ لا نخرج
         قبل كتابة لقطة خام مؤكدة إلى IndexedDB. */
      if (r && r.skipped && window.SyncStorage && SyncStorage.save && window.DEMO_DATA) {
        let snap;
        try { snap = JSON.parse(JSON.stringify(window.DEMO_DATA)); } catch (e) { throw e; }
        return Promise.resolve(SyncStorage.save(snap)).then(function (ok) {
          if (ok === false) throw new Error('local-storage-failed');
          return { saved: true, fallback: true };
        });
      }
      return r || { saved: true };
    });
  }
  function hydrate(name) {
    const info = moduleInfo(name);
    return info ? Promise.resolve(info.hydrate()).catch(function () {}) : Promise.resolve();
  }
  function browserPending(name) {
    const info = moduleInfo(name);
    try { return !!(info && info.browser()); } catch (e) { return false; }
  }
  function statusCounts(name, status) {
    const info = moduleInfo(name);
    if (!info || !status) return { pending: 0, failed: 0 };
    const hasPendingField = Object.prototype.hasOwnProperty.call(status, info.pending);
    const hasFailedField = Object.prototype.hasOwnProperty.call(status, info.failed);
    /* خادم قديم قبل v141 لا يملك عدادات المخزون/المصاريف؛ عندها نستخدم
       الإجمالي كحاجز محافظ بدلاً من المخاطرة بسحب فوق عملية معلّقة. */
    return {
      pending: Number(status[hasPendingField ? info.pending : 'pendingCloudOperations'] || 0),
      failed: Number(status[hasFailedField ? info.failed : 'failedCloudOperations'] || 0),
    };
  }
  function localState(name) {
    return hydrate(name).then(function () {
      return freshStatus().then(function (status) {
        const counts = statusCounts(name, status);
        return {
          browserPending: browserPending(name),
          serverPending: counts.pending,
          serverFailed: counts.failed,
          status: status,
        };
      });
    });
  }
  function flushAndConfirm(name) {
    const info = moduleInfo(name);
    if (!info) return Promise.resolve({ local: true, cloud: false, skipped: true, reason: 'unknown-module' });
    return localSnapshotSave().then(function () {
      return hydrate(name);
    }).then(function () {
      return Promise.resolve(info.flush()).then(function (browserResult) {
        /* /__sync ينتظر إتمام الرفع من الخادم المحلي؛ لا يكفي HTTP 201
           من REST المحلي لأنه يعني «ثُبّت محلياً» فقط. */
        if (isLocalTransport()) {
          return fetch('/__sync', {
            method: 'POST',
            cache: 'no-store',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', 'X-Alfa-Explicit-Sync': '1' },
            body: '{}',
          }).then(function (res) {
            if (!res.ok) throw new Error('local-sync-' + res.status);
            return res.json();
          }).then(function (syncResult) {
            return freshStatus().then(function (status) {
              const counts = statusCounts(name, status);
              const failedBrowser = Array.isArray(browserResult)
                ? browserResult.some(function (r) { return r && r.failed; })
                : !!(browserResult && browserResult.failed);
              if (failedBrowser || counts.failed) {
                return { local: true, cloud: false, failed: true, reason: 'failed-cloud-operation', result: syncResult, status: status };
              }
              if (!status || counts.pending || browserPending(name)) {
                return { local: true, cloud: false, pending: true, reason: 'cloud-still-pending', result: syncResult, status: status };
              }
              if (!cloudConfigured()) return { local: true, cloud: false, pending: true, reason: 'cloud-not-configured', result: syncResult, status: status };
              return { local: true, cloud: true, result: syncResult, status: status };
            });
          });
        }
        const failed = Array.isArray(browserResult)
          ? browserResult.some(function (r) { return r && r.failed; })
          : !!(browserResult && browserResult.failed);
        if (failed || browserPending(name)) {
          return { local: true, cloud: false, failed: failed, pending: !failed, reason: failed ? 'direct-upload-failed' : 'cloud-still-pending', result: browserResult };
        }
        return { local: true, cloud: true, result: browserResult };
      });
    }).catch(function (e) {
      return { local: false, cloud: false, failed: true, reason: String(e && e.message || e) };
    });
  }
  return {
    modules: MODULES,
    ensureLocal: localSnapshotSave,
    state: localState,
    flushAndConfirm: flushAndConfirm,
    status: freshStatus,
  };
})();

/* التحديث الصريح من شاشة الكاشير — لا polling ولا pull عند إضافة صنف. */
window.AlfaManualSync = {
  async refreshLocalMenu() {
    if (!window.MenuSync || !MenuSync.pull) return { skipped: true, reason: 'no-menu-sync' };
    return MenuSync.pull({ localOnly: true });
  },
  async refreshCloudMenu() {
    if (!window.MenuSync || !MenuSync.pull) return { skipped: true, reason: 'no-menu-sync' };
    /* المرحلة الأولى صريحة ومحلية؛ بعدها فقط نسمح بقراءة السحابة. */
    await MenuSync.pull({ localOnly: true });
    const gate = await window.AlfaSyncBarrier.flushAndConfirm('menu');
    if (!gate.cloud) return Object.assign({ skipped: true }, gate);
    return MenuSync.pull({ cloudPull: true });
  },
};

/* نافذة مغادرة موحّدة لصفحات المنيو والمخزون والمصاريف. */
window.AlfaLeaveGuard = (function () {
  const path = String(window.location.pathname || '').split('/').pop() || '';
  const inferred = /menu_admin\.html/i.test(path) ? 'menu'
    : /inventory\.html/i.test(path) ? 'inventory'
    : /expenditures\.html/i.test(path) ? 'expenditures' : '';
  const dirty = { menu: false, inventory: false, expenditures: false };
  let activeModule = inferred;
  let activeDialog = null;
  let busy = false;
  let approvedLeave = false;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function moduleLabel(name) {
    const info = window.AlfaSyncBarrier && AlfaSyncBarrier.modules && AlfaSyncBarrier.modules[name];
    return info ? info.label : name;
  }
  function markDirty(name) { if (dirty[name] !== undefined) dirty[name] = true; }
  function clearDirty(name) { if (dirty[name] !== undefined) dirty[name] = false; }
  function hasSyncDirty() {
    if (!activeModule) return false;
    /* حفظ المنيو المحلي المؤكد لا يوقف مغادرة الصفحة؛ أي رفع سحابي
       متبقٍ يظل في MenuOutbox ويستمر تلقائياً دون نافذة «قد لا يتم
       الحفظ». هذا الاستثناء خاص بالمنيو ولا يغيّر حماية المخزون والمصاريف. */
    if (activeModule === 'menu') return false;
    if (dirty[activeModule]) return true;
    try {
      if (activeModule === 'menu' && window.MenuOutbox && MenuOutbox.hasPending && MenuOutbox.hasPending()) return true;
      if (activeModule === 'inventory' && window.AlfaOutbox && AlfaOutbox.snapshot && AlfaOutbox.snapshot('inventory')) return true;
      if (activeModule === 'expenditures' && window.AlfaOutbox && AlfaOutbox.snapshot) {
        return !!(AlfaOutbox.snapshot('expenditures') || AlfaOutbox.snapshot('purchases'));
      }
    } catch (e) {}
    return false;
  }
  function injectStyle() {
    if (document.getElementById('alfaLeaveGuardStyle')) return;
    const s = document.createElement('style');
    s.id = 'alfaLeaveGuardStyle';
    s.textContent = '#alfaLeaveGuard{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:18px;direction:rtl;background:rgba(15,23,42,.58);font-family:Tahoma,Arial,sans-serif}#alfaLeaveGuard .alfa-lg-card{width:min(560px,100%);background:#fff;color:#172033;border-radius:16px;padding:22px;box-shadow:0 18px 60px rgba(0,0,0,.35);text-align:right}#alfaLeaveGuard h3{margin:0 0 9px;font-size:19px}#alfaLeaveGuard p{margin:0 0 16px;line-height:1.75;color:#475569;font-size:13px}#alfaLeaveGuard .alfa-lg-actions{display:grid;gap:9px}#alfaLeaveGuard button{border:0;border-radius:10px;padding:12px 14px;font:800 13px Tahoma,Arial,sans-serif;cursor:pointer}#alfaLeaveGuard button:disabled{opacity:.55;cursor:wait}#alfaLeaveGuard .alfa-lg-cloud{background:#0f766e;color:#fff}#alfaLeaveGuard .alfa-lg-local{background:#e2e8f0;color:#172033}#alfaLeaveGuard .alfa-lg-stay{background:#fff;border:1px solid #cbd5e1;color:#475569!important}#alfaLeaveGuard .alfa-lg-status{min-height:21px;margin-top:11px;color:#b45309;font-size:12px;font-weight:700}';
    document.head.appendChild(s);
  }
  function closeDialog() {
    if (activeDialog && activeDialog.parentNode) activeDialog.parentNode.removeChild(activeDialog);
    activeDialog = null; busy = false;
  }
  function localThenLeave(continuation, name) {
    busy = true;
    const status = activeDialog && activeDialog.querySelector('.alfa-lg-status');
    if (status) status.textContent = 'جاري تثبيت النسخة المحلية…';
    return window.AlfaSyncBarrier.ensureLocal().then(function () {
      clearDirty(name);
      approvedLeave = true;
      closeDialog();
      return continuation();
    }).catch(function (e) {
      busy = false;
      if (status) status.textContent = 'تعذر الحفظ المحلي؛ بقيت في الصفحة. ' + String(e && e.message || e);
      try { if (window.showToast) showToast('تعذر تثبيت التعديل محلياً — لم تتم المغادرة', '⚠️'); } catch (err) {}
      return null;
    });
  }
  function cloudThenLeave(continuation, name) {
    busy = true;
    const status = activeDialog && activeDialog.querySelector('.alfa-lg-status');
    if (status) status.textContent = 'جاري الحفظ المحلي ثم انتظار تأكيد السحابة…';
    return window.AlfaSyncBarrier.flushAndConfirm(name).then(function (r) {
      if (!r || r.local === false) {
        busy = false;
        if (status) status.textContent = 'تعذر تثبيت التعديل محلياً؛ بقيت في الصفحة حفاظاً على البيانات.';
        try { if (window.showToast) showToast('تعذر تثبيت التعديل محلياً — لم تتم المغادرة', '⚠️'); } catch (e) {}
        return null;
      }
      clearDirty(name);
      approvedLeave = true;
      closeDialog();
      if (!r || !r.cloud) {
        const msg = r && r.failed
          ? 'حُفظ محلياً، لكن رفع السحابة فشل؛ بقيت العملية معلّقة لإعادة المحاولة.'
          : 'حُفظ محلياً، لكن الرفع لم يكتمل؛ بقيت العملية معلّقة لإعادة المحاولة.';
        try { if (window.showToast) showToast(msg, r && r.failed ? '⚠️' : '⏳'); } catch (e) {}
      } else {
        try { if (window.showToast) showToast('حُفظ محلياً وتم تأكيد الرفع إلى السحابة ✅', '☁️'); } catch (e) {}
      }
      return continuation();
    }).catch(function (e) {
      busy = false;
      if (status) status.textContent = 'تعذر إتمام الرفع؛ يمكنك البقاء أو المغادرة مع إبقاء النسخة المحلية.';
      try { if (window.showToast) showToast('حُفظ محلياً؛ الرفع معلّق ولم تُفقد العملية', '⏳'); } catch (err) {}
      return null;
    });
  }
  function showDialog(name, continuation) {
    if (activeDialog || busy) return;
    injectStyle();
    const label = moduleLabel(name);
    const box = document.createElement('div');
    box.id = 'alfaLeaveGuard';
    box.innerHTML = '<div class="alfa-lg-card" role="alertdialog" aria-modal="true" aria-label="حفظ قبل المغادرة">'
      + '<h3>تعديل غير محسوم في ' + esc(label) + '</h3>'
      + '<p>الحفظ المحلي مضمون أولاً. اختر إن كنت تريد ترك التعديل محلياً بانتظار الرفع، أو انتظار نتيجة الرفع الآن. لن يستبدل أي جلب سحابي تعديلاً معلّقاً.</p>'
      + '<div class="alfa-lg-actions">'
      + '<button class="alfa-lg-local" data-alfa-lg="local">💾 حفظ محلي فقط والمتابعة</button>'
      + '<button class="alfa-lg-cloud" data-alfa-lg="cloud">☁️ حفظ محلي ثم رفع للسحابة وانتظار النتيجة</button>'
      + '<button class="alfa-lg-stay" data-alfa-lg="stay">↩️ إلغاء والبقاء في الصفحة</button>'
      + '</div><div class="alfa-lg-status" aria-live="polite"></div></div>';
    document.body.appendChild(box);
    activeDialog = box;
    const buttons = box.querySelectorAll('button');
    box.querySelector('[data-alfa-lg="stay"]').onclick = function () { if (!busy) closeDialog(); };
    box.querySelector('[data-alfa-lg="local"]').onclick = function () { if (!busy) localThenLeave(continuation, name); };
    box.querySelector('[data-alfa-lg="cloud"]').onclick = function () { if (!busy) cloudThenLeave(continuation, name); };
    /* منع النقر خارج الحوار من إسقاط قرار الحفظ. */
    box.addEventListener('click', function (e) { if (e.target === box && !busy) e.stopPropagation(); });
    return buttons;
  }
  function beforeNavigate(continuation) {
    const proceed = typeof continuation === 'function' ? continuation : function () {};
    if (!activeModule || !window.AlfaSyncBarrier) return Promise.resolve(proceed());
    /* لا نعرض حارس مغادرة للمنيو: حفظها المحلي تم بالفعل، والصندوق
       المعلق ليس «حفظاً مفقوداً» بل رفعاً مؤجلاً سيستمر بعد المغادرة. */
    if (activeModule === 'menu') return Promise.resolve(proceed());
    if (activeDialog || busy) return Promise.resolve(null);
    return window.AlfaSyncBarrier.state(activeModule).then(function (state) {
      const unresolved = !!(state && (state.browserPending || state.serverPending || state.serverFailed || dirty[activeModule]));
      if (!unresolved) return proceed();
      showDialog(activeModule, proceed);
      return null;
    }).catch(function () {
      if (hasSyncDirty()) { showDialog(activeModule, proceed); return null; }
      return proceed();
    });
  }
  /* الروابط العادية للخروج إلى index.html لا تمر دائماً من AlfaNav. نلتقطها
     في مرحلة capture، أما روابط الإدارة فتستعمل AlfaNav.navigate كي تبقى
     داخل iframe. */
  if (activeModule && document && document.addEventListener) {
    document.addEventListener('click', function (event) {
      const a = event.target && event.target.closest ? event.target.closest('a[href]') : null;
      if (!a || event.defaultPrevented) return;
      const href = String(a.getAttribute('href') || '');
      if (!/^index\.html(?:\?|$)/i.test(href)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      beforeNavigate(function () { window.location.href = href; });
    }, true);
    window.addEventListener('beforeunload', function (event) {
      if (approvedLeave || !hasSyncDirty()) return;
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
      event.preventDefault();
      event.returnValue = '';
    });
    window.addEventListener('pagehide', function () {
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
      try { if (activeModule === 'menu' && window.MenuOutbox) MenuOutbox.flushKeepalive(); } catch (e) {}
    });
  }
  return {
    module: function () { return activeModule; },
    register: function (name) { if (name && dirty[name] !== undefined) activeModule = name; },
    markDirty: markDirty,
    clearDirty: clearDirty,
    beforeNavigate: beforeNavigate,
    state: function () { return activeModule ? window.AlfaSyncBarrier.state(activeModule) : Promise.resolve({}); },
  };
})();
