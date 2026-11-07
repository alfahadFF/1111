/* ============================================================
   sync/storage.js — تخزين التشغيل في IndexedDB (أوفلاين حقيقي)
   الإعدادات الصغيرة (ثيم، مسودة، هوية) تبقى في localStorage.
   يهاجر تلقائياً من المفتاح القديم alfaprosys_data_v1.
   عند تعذر IndexedDB يستخدم localStorage كخطة احتياطية بدلاً من إسقاط الحفظ بصمت.
   ============================================================ */
window.SyncStorage = (function () {
  const DB_NAME = 'AlfaProSysDB';
  const DB_VER = 1;
  const STORE = 'kv';
  const DATA_KEY = 'data';
  const QUEUE_KEY = 'queue';
  const LEGACY = 'alfaprosys_data_v1';
  const LEGACY_Q = 'alfaprosys_queue_v1';
  const FALLBACK_PREFIX = 'alfaprosys_idb_fallback_v1:';

  let dbp = null;

  function openDb() {
    if (dbp) return dbp;
    dbp = new Promise(function (resolve, reject) {
      if (!window.indexedDB) { reject(new Error('no-idb')); return; }
      const req = indexedDB.open(DB_NAME, DB_VER);
      req.onupgradeneeded = function () {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
      req.onblocked = function () { reject(new Error('idb-blocked')); };
    });
    return dbp;
  }

  function idbGet(key) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        const tx = db.transaction(STORE, 'readonly');
        const r = tx.objectStore(STORE).get(key);
        r.onsuccess = function () { resolve(r.result === undefined ? null : r.result); };
        r.onerror = function () { reject(r.error); };
        tx.onabort = function () { reject(tx.error || new Error('idb-read-aborted')); };
      });
    });
  }

  function idbSet(key, val) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        const tx = db.transaction(STORE, 'readwrite');
        try {
          tx.objectStore(STORE).put(val, key);
        } catch (e) {
          reject(e);
          return;
        }
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { reject(tx.error); };
        tx.onabort = function () { reject(tx.error || new Error('idb-write-aborted')); };
      });
    });
  }

  function idbDel(key) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        const tx = db.transaction(STORE, 'readwrite');
        try {
          tx.objectStore(STORE).delete(key);
        } catch (e) {
          reject(e);
          return;
        }
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { reject(tx.error); };
        tx.onabort = function () { reject(tx.error || new Error('idb-delete-aborted')); };
      });
    });
  }

  function fallbackName(key) { return FALLBACK_PREFIX + String(key); }
  function fallbackGet(key) {
    try {
      const raw = localStorage.getItem(fallbackName(key));
      return raw == null ? null : JSON.parse(raw);
    } catch (e) { return null; }
  }
  function fallbackSet(key, val) {
    try {
      localStorage.setItem(fallbackName(key), JSON.stringify(val));
      return true;
    } catch (e) {
      warnFail();
      return false;
    }
  }
  function fallbackDel(key) {
    try {
      localStorage.removeItem(fallbackName(key));
      return true;
    } catch (e) { return false; }
  }

  function warnFail() {
    try { if (window.showToast) showToast('تعذر الحفظ المحلي — تحقق من مساحة الجهاز', '⚠️'); } catch (e) {}
  }

  /* لقطات البيانات لها مساران: IndexedDB وlocalStorage الاحتياطي.
     لا يجوز أن تفوز نسخة fallback قديمة على نسخة IndexedDB أحدث لمجرد
     أنها موجودة؛ كان ذلك يعيد المنيو الناقصة بعد إغلاق التبويبات.
     نضع طابعاً زمنياً على الكتابات الجديدة، أما اللقطات القديمة بلا
     طابع فـIndexedDB هي مصدرها المفضّل. */
  function prepareValue(key, val) {
    if (key !== DATA_KEY || !val || typeof val !== 'object') return val;
    try {
      const copy = JSON.parse(JSON.stringify(val));
      copy.__alfa_storage_saved_at = Date.now();
      return copy;
    } catch (e) {
      return val;
    }
  }

  function getDataSnapshot() {
    const fallback = fallbackGet(DATA_KEY);
    return idbGet(DATA_KEY).then(function (value) {
      if (value != null && fallback != null) {
        const iv = Number(value && value.__alfa_storage_saved_at) || 0;
        const fv = Number(fallback && fallback.__alfa_storage_saved_at) || 0;
        if (iv && fv) return iv >= fv ? value : fallback;
        /* بيانات ما قبل الطابع الزمني: لا تجعل fallback القديم يتغلب
           على سجل IndexedDB الموجود. */
        return value;
      }
      return value != null ? value : fallback;
    }).catch(function () { return fallback; });
  }

  function get(key) {
    if (key === DATA_KEY) return getDataSnapshot();
    const fallback = fallbackGet(key);
    return idbGet(key).then(function (value) {
      return fallback != null ? fallback : value;
    }).catch(function () { return fallback != null ? fallback : fallbackGet(key); });
  }
  function set(key, val) {
    const prepared = prepareValue(key, val);
    return idbSet(key, prepared).then(function () {
      /* إزالة نسخة احتياطية قديمة بعد عودة IndexedDB للعمل. */
      fallbackDel(key);
      return true;
    }).catch(function () { return fallbackSet(key, prepared); });
  }
  function del(key) {
    return idbDel(key).then(function () {
      fallbackDel(key);
      return true;
    }).catch(function () { return fallbackDel(key); });
  }

  return {
    engine: 'indexeddb+localStorage-fallback',

    /* مفاتيح عامة (صناديق الصادرة المعلقة وغيرها) */
    getKey: get,
    setKey: set,
    delKey: del,

    load: function () {
      return get(DATA_KEY).then(function (data) {
        if (data) return data;
        try {
          const raw = localStorage.getItem(LEGACY);
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          return set(DATA_KEY, parsed).then(function () {
            try { localStorage.removeItem(LEGACY); } catch (e) {}
            return parsed;
          }).catch(function () { return parsed; });
        } catch (e) { return null; }
      }).catch(function () {
        try {
          const raw = localStorage.getItem(LEGACY);
          return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
      });
    },

    save: function (data) {
      return set(DATA_KEY, data).then(function (ok) {
        if (ok === false) warnFail();
        return ok;
      }).catch(function () {
        warnFail();
        return false;
      });
    },

    loadQueue: function () {
      return get(QUEUE_KEY).then(function (q) {
        if (Array.isArray(q)) return q;
        try {
          const raw = localStorage.getItem(LEGACY_Q);
          const parsed = raw ? JSON.parse(raw) : [];
          if (parsed && parsed.length) {
            set(QUEUE_KEY, parsed).catch(function () {});
            try { localStorage.removeItem(LEGACY_Q); } catch (e) {}
          }
          return parsed || [];
        } catch (e) { return []; }
      }).catch(function () { return []; });
    },

    saveQueue: function (q) {
      return set(QUEUE_KEY, q || []).catch(function () { return false; });
    },

    clear: function () {
      return Promise.all([del(DATA_KEY), del(QUEUE_KEY)]).then(function () {
        try {
          localStorage.removeItem(LEGACY);
          localStorage.removeItem(LEGACY_Q);
        } catch (e) {}
      }).catch(function () {});
    },
  };
})();
