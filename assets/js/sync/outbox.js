/* ================================================================
   sync/outbox.js — محرك الصندوق الصادر العام (ضمان عدم ضياع أي تعديل)
   ----------------------------------------------------------------
   القاعدة الذهبية: أي كتابة على أي وحدة تمر من هنا:
     1) تُقيَّد فوراً في صندوق دائم (IndexedDB) — متانة قبل الشبكة.
     2) تُدفع مباشرة لقاعدة البيانات (مع ارتداد 250ms لدمج الدفعات).
     3) أي فشل (انقطاع/إغلاق/خطأ) يُعاد تلقائياً: عند عودة الإنترنت،
        وعند كل إقلاع عبر مسار الرفع فقط؛ لا يُستدعى pull كي يبدأ النظام.
   الرفع upsert + حذف صريح مسجَّل ⇒ آمن للتكرار ولا ازدواجية.
   ملاحظة: صندوق المنيو (MenuOutbox) بقي مستقلاً كما هو (مُختبَر).
   ================================================================ */
window.AlfaOutbox = (function () {
  const PREFIX = 'alfa_outbox_v1:';
  const PUSH_DEBOUNCE = 250;   /* دمج دفعات الكتابة السريعة — آمن لأن التقييد يسبق */
  const boxes = {};            /* name -> {rows:{id:row}, dels:[id], at} */
  const adapters = {};         /* name -> {pushRows(rows)->Promise, delRows(ids)->Promise} */
  const hydrated = {};
  const hydrating = {};
  const flushing = {};
  const pulling = {};            /* اسم => وعد السحب الجاري (المتزامنون يتشاركونه) */
  const timers = {};

  function cloudOn() { return !!(window.AlfaSB && AlfaSB.enabled && AlfaSB.enabled()); }
  function toast(msg, icon) { try { if (window.showToast) showToast(msg, icon); } catch (e) {} }
  function refreshBadge() { try { if (window.NetBadge) NetBadge.refresh(); } catch (e) {} }
  function guardModule(name) {
    if (name === 'inventory') return 'inventory';
    if (name === 'expenditures' || name === 'purchases') return 'expenditures';
    return '';
  }
  function markGuardDirty(name) {
    const module = guardModule(name);
    try { if (module && window.AlfaLeaveGuard && AlfaLeaveGuard.markDirty) AlfaLeaveGuard.markDirty(module); } catch (e) {}
  }
  function clearGuardDirty(name) {
    const module = guardModule(name);
    try { if (module && window.AlfaLeaveGuard && AlfaLeaveGuard.clearDirty) AlfaLeaveGuard.clearDirty(module); } catch (e) {}
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function rowId(r) { return String(r.id != null ? r.id : (r.key != null ? r.key : '')); }
  /* جداول مفتاحها مركّب: الطلبات الأونلاين تتكرر أرقامها بين الأيام،
     فالمفتاح هنا «الرقم|التاريخ» — وإلا اختلط طلب يوم بطلب يوم آخر. */
  const COMPOSITE = {
    online_orders: function (r) {
      if (!r) return '';
      return String(r.id != null ? r.id : '') + '|' + String(r.date || '');
    },
  };
  function rowKey(name, r) {
    const f = COMPOSITE[name];
    return f ? f(r) : rowId(r);
  }
  function isEmpty(b) { return !b || (!Object.keys(b.rows || {}).length && !(b.dels || []).length); }

  function persist(name) {
    refreshBadge();
    if (!(window.SyncStorage && SyncStorage.setKey)) return Promise.resolve(false);
    const b = boxes[name];
    if (b && !isEmpty(b)) return SyncStorage.setKey(PREFIX + name, b);
    if (SyncStorage.delKey) return SyncStorage.delKey(PREFIX + name);
    return Promise.resolve(false);
  }

  function hydrate(name) {
    if (hydrated[name]) return hydrating[name] || Promise.resolve(boxes[name] || null);
    hydrated[name] = true;
    if (!(window.SyncStorage && SyncStorage.getKey)) return Promise.resolve(null);
    hydrating[name] = SyncStorage.getKey(PREFIX + name).then(function (v) {
      if (v && !isEmpty(v)) boxes[name] = v;
      refreshBadge();
      return boxes[name] || null;
    }).catch(function () { return boxes[name] || null; }).then(function (v) {
      hydrating[name] = null;
      return v;
    });
    return hydrating[name];
  }

  function hydrateAll() {
    return Promise.all(Object.keys(adapters).map(hydrate)).then(function () { refreshBadge(); });
  }

  function boxOf(name) {
    if (!boxes[name]) boxes[name] = { rows: {}, dels: [], at: 0 };
    return boxes[name];
  }

  function hasPending(name) {
    if (!cloudOn()) return false;
    if (name) return !isEmpty(boxes[name]);
    return Object.keys(boxes).some(function (k) { return !isEmpty(boxes[k]); });
  }

  function pendingCount() {
    if (!cloudOn()) return 0;
    let n = 0;
    Object.keys(boxes).forEach(function (k) {
      const b = boxes[k]; if (!b) return;
      n += Object.keys(b.rows || {}).length + (b.dels || []).length;
    });
    return n;
  }

  function register(name, adapter) {
    /* تسمح الوحدات بإضافة مسار patch صفّي بعد التسجيل الأساسي، دون
       استبدال pushRows/delRows الخاصين بها. */
    adapters[name] = Object.assign({}, adapters[name] || {}, adapter || {});
  }

  /* التزام صفوف: تقييد دائم أولاً ثم دفع مرتد. لا يرفض أبداً. */
  function commitRows(name, rows) {
    rows = (rows || []).filter(Boolean);
    if (!rows.length) return Promise.resolve({ skipped: true });
    markGuardDirty(name);
    /* حتى دون مفاتيح السحابة نثبت الصندوق محلياً؛ قد تُضاف الإعدادات
       لاحقاً أو يعمل التطبيق خلف وسيط محلي. */
    return hydrate(name).then(function () {
      const b = boxOf(name);
      rows.forEach(function (r) {
        const id = rowKey(name, r);
        if (!id) return;
        b.dels = (b.dels || []).filter(function (x) { return String(x) !== id; });
        try {
          const next = clone(r);
          const previous = b.rows[id];
          /* ضغط تعديلين متتاليين على الصف نفسه يجب ألا يسقط حقول
             patch الأولى: الاسم ثم الراتب مثلاً قبل وصول الشبكة. */
          if (previous && previous.__alfa_patch && next && next.__alfa_patch) {
            next.__alfa_patch = Object.assign({}, previous.__alfa_patch, next.__alfa_patch);
          }
          b.rows[id] = next;
        } catch (e) { b.rows[id] = r; }
      });
      b.at = Date.now();
      /* لا نعتبر العملية محفوظة قبل اكتمال IndexedDB؛ الطباعة أثر جانبي
         ويمكن إعادة محاولتها، أما الفاتورة فلا يجوز أن تختفي. */
      return persist(name).then(function (saved) {
        if (saved === false) return { failed: true, reason: 'local-persist-failed' };
        markGuardDirty(name);
        if (cloudOn()) queuePush(name);
        return { committed: true, local: true, n: rows.length };
      });
    }).catch(function () { return { failed: true }; });
  }

  function commitOne(name, row) { return commitRows(name, row ? [row] : []); }

  function commitDelete(name, id) {
    if (id == null || id === '') return Promise.resolve({ skipped: true });
    markGuardDirty(name);
    const sid = String(id);
    return hydrate(name).then(function () {
      const b = boxOf(name);
      delete b.rows[sid];
      b.dels = b.dels || [];
      if (b.dels.indexOf(sid) < 0) b.dels.push(sid);
      b.at = Date.now();
      return persist(name).then(function (saved) {
        if (saved === false) return { failed: true, reason: 'local-persist-failed' };
        markGuardDirty(name);
        if (cloudOn()) queuePush(name);
        return { deleted: true, local: true, id: sid };
      });
    }).catch(function () { return { failed: true }; });
  }

  function queuePush(name) {
    clearTimeout(timers[name]);
    timers[name] = setTimeout(function () { flush(name); }, PUSH_DEBOUNCE);
  }

  /* تفريغ صندوق: الحذوفات أولاً ثم الصفوف. يُزيل فقط ما لم يتغير أثناء الرفع. */
  function flush(name) {
    if (flushing[name]) return flushing[name];
    const a = adapters[name];
    flushing[name] = hydrate(name).then(function () {
      const b = boxes[name];
      if (!a || !b || isEmpty(b)) return { skipped: true, reason: 'empty' };
      if (!cloudOn() || !window.alfaTransportAvailable || !window.alfaTransportAvailable()) return { skipped: true, reason: 'offline' };
      const dels = (b.dels || []).slice();
      const ids = Object.keys(b.rows || {});
      const rows = ids.map(function (id) { return b.rows[id]; });
      const patchRows = rows.filter(function (r) {
        return r && r.__alfa_patch && typeof r.__alfa_patch === 'object';
      });
      const normalRows = rows.filter(function (r) {
        return !(r && r.__alfa_patch && typeof r.__alfa_patch === 'object');
      });
      return Promise.resolve()
        .then(function () { return dels.length ? a.delRows(dels) : null; })
        .then(function () {
          return patchRows.length && typeof a.patchRows === 'function'
            ? a.patchRows(patchRows)
            : null;
        })
        .then(function () { return normalRows.length ? a.pushRows(normalRows) : null; })
        .then(function () {
          const bb = boxes[name];
          if (bb) {
            bb.dels = (bb.dels || []).filter(function (x) { return dels.indexOf(x) < 0; });
            ids.forEach(function (id, i) { if (bb.rows[id] === rows[i]) delete bb.rows[id]; });
            persist(name);
          }
          const total = dels.length + rows.length;
          /* تنبيه فقط لاسترداد معلَّقات قديمة — الدفعات الفورية تبقى صامتة. */
          if (total && Date.now() - (b.at || 0) > 3000) toast('تم رفع ' + total + ' تعديل معلق (' + name + ') ✅', '☁️');
          return { flushed: true, rows: rows.length, dels: dels.length, patches: patchRows.length };
        });
    }).catch(function (e) {
      return { failed: true, error: String((e && e.message) || e) };
    }).then(function (r) {
      flushing[name] = null; refreshBadge();
      if (r && r.flushed) clearGuardDirty(name);
      return r;
    });
    return flushing[name];
  }

  function flushAll() {
    return Promise.all(Object.keys(adapters).map(flush)).then(function (rs) { refreshBadge(); return rs; });
  }

  /* إزالة صفوف legacy محددة من صندوق قديم دون لمس بقية العمليات
     التشغيلية. تُستخدم عند ترقية seed قديم إلى وضع البيانات الحية. */
  function prune(name, predicate) {
    return hydrate(name).then(function () {
      const b = boxes[name];
      if (!b) return { pruned: 0 };
      let n = 0;
      Object.keys(b.rows || {}).forEach(function (id) {
        if (predicate && predicate(b.rows[id])) { delete b.rows[id]; n++; }
      });
      b.dels = (b.dels || []).filter(function (id) {
        const remove = predicate && predicate({ id: id });
        if (remove) n++;
        return !remove;
      });
      return persist(name).then(function () { refreshBadge(); return { pruned: n }; });
    }).catch(function () { return { pruned: 0, failed: true }; });
  }

  /* دمج عام: صفوف السحابة + صفوف الصندوق − المحذوفات.
     إذا كان الصف يحمل __alfa_patch فنحن لا نستبدل صف السحابة القديم
     كله؛ نطبّق فقط الحقول التي عدّلها هذا الجهاز، حتى لا يمحو تعديل
     محلي على الراتب مثلاً رقم هاتف عدّله صاحب المطعم من هاتفه. */
  function mergeLists(cloudRows, box, idFn) {
    const getId = idFn || (function (r) { return String(r.id != null ? r.id : r.key); });
    const clean = function (r) {
      const c = clone(r || {});
      try { delete c.__alfa_patch; } catch (e) {}
      return c;
    };
    const mergeBoxRow = function (remote, local) {
      const patch = local && local.__alfa_patch;
      if (!patch || typeof patch !== 'object') return clean(local);
      return Object.assign({}, clean(remote || local), clean(patch));
    };
    const dels = {};
    ((box && box.dels) || []).forEach(function (id) { dels[String(id)] = true; });
    const out = [];
    const seen = {};
    (cloudRows || []).forEach(function (r) {
      const id = getId(r);
      if (dels[id] || seen[id]) return;
      seen[id] = true;
      out.push(clean(r));
    });
    Object.keys((box && box.rows) || {}).forEach(function (id) {
      if (dels[id]) return;
      if (seen[id]) {
        for (let i = 0; i < out.length; i++) {
          if (getId(out[i]) === id) { out[i] = mergeBoxRow(out[i], box.rows[id]); break; }
        }
      } else {
        seen[id] = true;
        out.push(clean(box.rows[id]));
      }
    });
    return out;
  }

  /* تغليف السحب: تفريغ أولاً، ثم سحب، ثم إعادة تطبيق ما بقي معلقاً فوق
     النتيجة — فالسحب لا يمحو تعديلاً لم يصل بعد أبداً. */
  function guarded(name, pullFn, applyBox) {
    return function () {
      if (pulling[name]) return pulling[name];
      const clear = function () { pulling[name] = null; };
      pulling[name] = flush(name).then(function (flushResult) {
        /* نجاح REST المحلي لا يعني أن السحابة استلمت العملية. إذا فشل
           الصندوق أو بقيت عملية هذه الوحدة pending/failed على الخادم،
           نوقف pull حتى لا تعود نسخة قديمة فوق المحلي. */
        if (flushResult && flushResult.failed) return { skipped: true, reason: 'local-upload-failed' };
        const protectedModule = name === 'purchases' ? 'expenditures' : name;
        if (window.AlfaSyncBarrier && ['inventory', 'expenditures'].indexOf(protectedModule) >= 0
            && AlfaSyncBarrier.state) {
          return AlfaSyncBarrier.state(protectedModule).then(function (st) {
            if (st && (st.browserPending || st.serverPending || st.serverFailed)) {
              return { skipped: true, reason: 'local-writes-protected' };
            }
            return pullFn();
          });
        }
        return pullFn();
      }).then(function (res) {
        const b = boxes[name];
        if (b && !isEmpty(b) && typeof applyBox === 'function') {
          try { applyBox(clone(b)); } catch (e) {}
        }
        clear();
        return res;
      }, function (err) { clear(); throw err; });
      return pulling[name];
    };
  }

  return {
    register: register,
    commitOne: commitOne, commitRows: commitRows, commitDelete: commitDelete,
    flush: flush, flushAll: flushAll, prune: prune,
    hasPending: hasPending, pendingCount: pendingCount,
    snapshot: function (name) { const b = boxes[name]; return b ? clone(b) : null; },
    hydrate: hydrate, hydrateAll: hydrateAll,
    mergeLists: mergeLists, guarded: guarded,
  };
})();


/* ============================================================
   صندوق الملفات الصغير (لوغو / QR)
   ------------------------------------------------------------
   لا نضع File داخل صندوق الصفوف: يُحوّل إلى data URL ويُخزّن في
   IndexedDB، فيبقى صالحاً بعد إغلاق الصفحة وإعادة فتحها. عند عودة
   الاتصال يُرفع الملف ثم يُستبدل الرابط المحلي برابط التخزين العام.
   ============================================================ */
window.AlfaFileOutbox = (function () {
  const KEY = 'alfa_file_outbox_v1';
  let entries = null;
  let loading = null;
  let flushing = null;

  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function load() {
    if (entries) return Promise.resolve(entries);
    if (loading) return loading;
    loading = (window.SyncStorage && SyncStorage.getKey ? SyncStorage.getKey(KEY) : Promise.resolve(null))
      .then(function (v) { entries = Array.isArray(v) ? v : []; return entries; })
      .catch(function () { entries = []; return entries; })
      .then(function (v) { loading = null; return v; });
    return loading;
  }
  function save() {
    if (!window.SyncStorage || !SyncStorage.setKey) return Promise.resolve(false);
    return SyncStorage.setKey(KEY, entries || []).then(function (ok) {
      if (ok === false) { try { if (window.showToast) showToast('تعذر تثبيت ملف اللوغو/QR محلياً', '⚠️'); } catch (e) {} }
      return ok;
    });
  }
  function online() {
    return navigator.onLine !== false
      && !!(window.ALFA_CONFIG && ALFA_CONFIG.supabase && ALFA_CONFIG.supabase.url && ALFA_CONFIG.supabase.anonKey)
      && (!window.alfaTransportAvailable || window.alfaTransportAvailable());
  }
  function blobFromDataUrl(dataUrl, type) {
    const m = String(dataUrl || '').match(/^data:([^;,]+)?(;base64)?,(.*)$/);
    if (!m) return Promise.reject(new Error('invalid-data-url'));
    const contentType = type || m[1] || 'application/octet-stream';
    if (m[2]) {
      const raw = atob(m[3]);
      const bytes = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
      return Promise.resolve(new Blob([bytes], { type: contentType }));
    }
    return Promise.resolve(new Blob([decodeURIComponent(m[3])], { type: contentType }));
  }
  function ext(name, type) {
    const fromName = String(name || '').split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (fromName && fromName.length <= 8) return fromName;
    const fromType = String(type || '').split('/').pop().replace(/[^a-z0-9]/g, '');
    return fromType || 'png';
  }
  function upload(entry) {
    const cfg = ALFA_CONFIG.supabase;
    return blobFromDataUrl(entry.dataUrl, entry.contentType).then(function (blob) {
      const tenant = (cfg.url.match(/https?:\/\/([a-z0-9]+)\.supabase/) || [])[1] || 'tenant';
      const path = tenant + '/invoice/' + entry.kind + '_' + Date.now() + '.' + ext(entry.name, entry.contentType);
      return fetch(cfg.url + '/storage/v1/object/invoice-assets/' + path, {
        method: 'POST',
        headers: {
          apikey: cfg.anonKey,
          Authorization: 'Bearer ' + cfg.anonKey,
          'x-upsert': 'true',
          'Content-Type': entry.contentType || 'image/png',
        },
        body: blob,
      }).then(function (r) {
        if (!r.ok) return r.text().then(function (t) { throw new Error(t || ('upload-' + r.status)); });
        return cfg.url + '/storage/v1/object/public/invoice-assets/' + path;
      });
    });
  }
  function applyUploaded(entry, url) {
    const data = window.DEMO_DATA || {};
    const current = Object.assign({}, data.invoice_print_settings || {});
    const localKey = entry.kind === 'qr' ? 'qr_local_data' : 'logo_local_data';
    const remoteKey = entry.kind === 'qr' ? 'qr_image_url' : 'logo_url';
    /* لا نستبدل اختياراً أحدث بملف قديم في الطابور. */
    if (current[localKey] !== entry.dataUrl) return Promise.resolve({ stale: true });
    current[remoteKey] = url;
    delete current[localKey];
    data.invoice_print_settings = current;
    try { if (window.alfaApplyInvoicePrint) window.alfaApplyInvoicePrint(current); } catch (e) {}
    try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    if (window.SettingsSync && window.SettingsSync.saveKV) return window.SettingsSync.saveKV('invoice_print', current);
    return Promise.resolve({ local: true });
  }
  function enqueue(item) {
    if (!item || !item.dataUrl || !item.kind) return Promise.resolve({ skipped: true });
    return load().then(function () {
      const id = String(item.id || ('invoice_print:' + item.kind));
      const next = Object.assign({}, item, { id: id, at: Date.now() });
      entries = entries.filter(function (x) { return String(x.id) !== id; });
      entries.push(next);
      return save().then(function (ok) { return { queued: ok !== false, id: id }; });
    });
  }
  function flush() {
    if (flushing) return flushing;
    if (!online()) return Promise.resolve({ skipped: true, reason: 'offline' });
    flushing = load().then(function () {
      const list = entries.slice();
      return list.reduce(function (p, entry) {
        return p.then(function (result) {
          if (!online()) return result;
          return upload(entry).then(function (url) {
            return applyUploaded(entry, url).then(function () {
              entries = entries.filter(function (x) { return String(x.id) !== String(entry.id); });
              return save().then(function () { result.uploaded++; return result; });
            });
          }).catch(function () { result.failed++; return result; });
        });
      }, Promise.resolve({ uploaded: 0, failed: 0 }));
    }).then(function (result) {
      flushing = null;
      return result;
    }, function (err) {
      flushing = null;
      return { failed: 1, error: String(err && err.message || err) };
    });
    return flushing;
  }
  return { enqueue: enqueue, flush: flush, pending: function () { return load().then(function () { return clone(entries); }); } };
})();

/* ربط تلقائي: تفريغ شامل عند عودة الإنترنت. */
try {
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('online', function () {
      if (window.AlfaOutbox) AlfaOutbox.flushAll();
      if (window.AlfaFileOutbox) AlfaFileOutbox.flush();
    });
    /* استرداد الملفات المعلقة بعد الإقلاع من دون أي سحب لبيانات الجداول. */
    setTimeout(function () { if (window.AlfaFileOutbox) AlfaFileOutbox.flush(); }, 1200);
  }
} catch (e) {}
