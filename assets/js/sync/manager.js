/* ============================================================
   sync/manager.js — مزامنة شاشات المدير مع Supabase
   الكاشير يبقى على InvoiceSync / CustomerSync / SessionSync
   ============================================================ */
(function () {
  const sb = window.AlfaSB;
  function on() {
    return !!(sb && sb.enabled && sb.enabled()
      && (!window.alfaTransportAvailable || window.alfaTransportAvailable()));
  }
  function D() { return window.DEMO_DATA || {}; }
  function day() {
    return window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10);
  }
  function toast(msg) {
    try { if (window.showToast) showToast(String(msg).slice(0, 140), '⚠️'); } catch (e) {}
  }
  function timerSoon(holder, fn, ms) {
    if (!on()) return;
    clearTimeout(holder.t);
    holder.t = setTimeout(function () {
      fn().catch(function (e) { toast(e && e.message || e); });
    }, ms || 700);
  }
  /* لا توجد مزامنة كاملة تحذف ما لا يظهر في اللقطة المحلية؛ كل حذف
     صريح يمر من صندوق العمليات. */
  function delIds(table, ids) {
    if (!on()) return Promise.reject(new Error('offline'));
    ids = (ids || []).map(function (id) { return String(id); });
    if (!ids.length) return Promise.resolve();
    const num = ids.every(function (id) { return /^[0-9]+$/.test(id); });
    const list = ids.map(function (id) { return num ? id : '"' + id.replace(/"/g, '') + '"'; }).join(',');
    return sb.delFilter(table, '?id=in.(' + list + ')');
  }

  /* ---------- موظفون ---------- */
  window.EmployeeSync = (function () {
    const hold = {};
    function row(e) {
      return {
        id: String(e.id),
        name: e.name || '',
        age: e.age == null || e.age === '' ? null : Number(e.age),
        role: e.role || null,
        shift: e.shift || null,
        shift_start: e.shift_start || null,
        shift_end: e.shift_end || null,
        salary_type: e.salary_type || 'monthly',
        salary_amount: Number(e.salary_amount) || 0,
        hire_date: e.hire_date || null,
        phone: e.phone || null,
        notes: e.notes || null,
        salary_log: Array.isArray(e.salary_log) ? e.salary_log : [],
        deductions_log: Array.isArray(e.deductions_log) ? e.deductions_log : [],
      };
    }
    function pull() {
      if (!on()) return Promise.resolve({ skipped: true });
      return sb.get('employees', '?select=*&order=name.asc').then(function (remote) {
        return window.alfaAdoptRemoteRows('employees', remote, function (rows) { D().employees = rows; })
          .then(function (state) { return state.authoritative ? { pulled: true, n: state.n } : { skipped: true, reason: 'local-snapshot-preserved' }; });
      }).catch(function (e) { return { skipped: true, error: String(e && e.message || e) }; });
    }
    function push() {
      if (!on()) return Promise.resolve({ skipped: true });
      const list = (D().employees || []).map(row);
      return sb.upsert('employees', list, 'id')
        .then(function () { return { pushed: true, n: list.length }; });
    }
    /* ── صندوق صادر الموظفين ── */
    function pushRows(rows) {
      if (!on()) return Promise.reject(new Error('offline'));
      const list = (rows || []).map(row);
      if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
      return sb.upsert('employees', list, 'id').then(function () { return { pushed: true, n: list.length }; });
    }
    function delRows(ids) { return delIds('employees', ids); }
    function applyBox(b) {
      if (!window.AlfaOutbox) return;
      D().employees = AlfaOutbox.mergeLists(D().employees, b);
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
    if (window.AlfaOutbox) AlfaOutbox.register('employees', { pushRows: pushRows, delRows: delRows });
    function commitAll() {
      if (window.AlfaOutbox) AlfaOutbox.commitRows('employees', D().employees || []);
    }
    function pushCommitted() {
      if (!window.AlfaOutbox) return push();
      commitAll();
      return AlfaOutbox.flush('employees');
    }
    function pullGuarded() {
      if (!window.AlfaOutbox) return pull();
      return AlfaOutbox.guarded('employees', pull, applyBox)();
    }
    return {
      pull: pullGuarded, push: pushCommitted,
      pushSoon: function () { if (!window.AlfaOutbox) { timerSoon(hold, push); return; } commitAll(); },
      remove: function (id) {
        if (!on() || !id) return Promise.resolve({ skipped: true });
        if (window.AlfaOutbox) return AlfaOutbox.commitDelete('employees', id);
        return sb.del('employees', [id]).catch(function () {});
      },
    };
  })();

  /* ---------- موردون ---------- */
  window.SupplierSync = (function () {
    const hold = {};
    function row(s) {
      return {
        id: String(s.id),
        name: s.name || '',
        phone: s.phone || null,
        materials: s.materials || null,
        notes: s.notes || null,
      };
    }
    function pull() {
      if (!on()) return Promise.resolve({ skipped: true });
      return sb.get('suppliers', '?select=*&order=name.asc').then(function (remote) {
        return window.alfaAdoptRemoteRows('suppliers', remote, function (rows) { D().suppliers = rows; })
          .then(function (state) { return state.authoritative ? { pulled: true, n: state.n } : { skipped: true, reason: 'local-snapshot-preserved' }; });
      }).catch(function (e) { return { skipped: true, error: String(e && e.message || e) }; });
    }
    function push() {
      if (!on()) return Promise.resolve({ skipped: true });
      const list = (D().suppliers || []).map(row);
      return sb.upsert('suppliers', list, 'id')
        .then(function () { return { pushed: true, n: list.length }; });
    }
    /* ── صندوق صادر المورّدين ── */
    function pushRows(rows) {
      if (!on()) return Promise.reject(new Error('offline'));
      const list = (rows || []).map(row);
      if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
      return sb.upsert('suppliers', list, 'id').then(function () { return { pushed: true, n: list.length }; });
    }
    function delRows(ids) { return delIds('suppliers', ids); }
    function applyBox(b) {
      if (!window.AlfaOutbox) return;
      D().suppliers = AlfaOutbox.mergeLists(D().suppliers, b);
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
    if (window.AlfaOutbox) AlfaOutbox.register('suppliers', { pushRows: pushRows, delRows: delRows });
    function commitAll() {
      if (window.AlfaOutbox) AlfaOutbox.commitRows('suppliers', D().suppliers || []);
    }
    function pushCommitted() {
      if (!window.AlfaOutbox) return push();
      commitAll();
      return AlfaOutbox.flush('suppliers');
    }
    function pullGuarded() {
      if (!window.AlfaOutbox) return pull();
      return AlfaOutbox.guarded('suppliers', pull, applyBox)();
    }
    return {
      pull: pullGuarded, push: pushCommitted,
      pushSoon: function () { if (!window.AlfaOutbox) { timerSoon(hold, push); return; } commitAll(); },
      remove: function (id) {
        if (!on() || !id) return Promise.resolve({ skipped: true });
        if (window.AlfaOutbox) return AlfaOutbox.commitDelete('suppliers', id);
        return sb.del('suppliers', [id]).catch(function () {});
      },
    };
  })();

  /* ---------- مخزون: inventory_materials + inventory_log ---------- */
  window.InventorySync = (function () {
    const hold = {};
    function toMat(m) {
      return {
        id: String(m.id),
        name: m.name || '',
        category: m.category || null,
        unit: m.unit || 'قطعة',
        qty: Number(m.qty) || 0,
        min_qty: Number(m.min_qty) || 0,
        reorder_qty: m.reorder_qty == null || m.reorder_qty === '' ? null : Number(m.reorder_qty),
        cost_per_unit: Number(m.cost_per_unit) || 0,
        trackable: !!m.trackable,
        loaves_per_bundle: m.loaves_per_bundle == null || m.loaves_per_bundle === '' ? null : Number(m.loaves_per_bundle),
        recipe: Array.isArray(m.recipe) ? m.recipe : [],
        supplier_name: m.supplier_name || null,
      };
    }
    function toLog(mid, l) {
      return {
        id: String(l.id),
        material_id: String(mid),
        date: l.date || day(),
        type: l.type || 'in',
        qty: Number(l.qty) || 0,
        note: l.note || null,
        cost: l.cost == null || l.cost === '' ? null : Number(l.cost),
        supplier_id: l.supplier_id || null,
        auto: !!l.auto,
        supplier_name: l.supplier_name || null,
        by: l.by || null,
        time: l.time || null,
      };
    }
    function syncRawLocal(list) {
      const rows = Array.isArray(list) ? list : [];
      D().inventory_materials = rows.map(toMat);
      D().inventory_log = rows.reduce(function (out, material) {
        return out.concat((material.log || []).map(function (log) { return toLog(material.id, log); }));
      }, []);
    }
    function fromMat(m, logs) {
      return {
        id: String(m.id),
        name: m.name || '',
        category: m.category || '',
        unit: m.unit || 'قطعة',
        qty: Number(m.qty) || 0,
        min_qty: Number(m.min_qty) || 0,
        reorder_qty: m.reorder_qty == null ? 0 : Number(m.reorder_qty),
        cost_per_unit: Number(m.cost_per_unit) || 0,
        trackable: !!m.trackable,
        loaves_per_bundle: m.loaves_per_bundle,
        recipe: Array.isArray(m.recipe) ? m.recipe : [],
        supplier_name: m.supplier_name || '',
        log: (logs || []).map(function (l) {
          return {
            id: String(l.id),
            date: l.date,
            type: l.type,
            qty: Number(l.qty) || 0,
            note: l.note || '',
            cost: l.cost,
            supplier_id: l.supplier_id || null,
            auto: !!l.auto,
            supplier_name: l.supplier_name || '',
            by: l.by || '',
            time: l.time || '',
          };
        }),
      };
    }
    function pull() {
      if (!on()) return Promise.resolve({ skipped: true });
      return Promise.all([
        sb.get('inventory_materials', '?select=*'),
        sb.get('inventory_log', '?select=*'),
      ]).then(function (pair) {
        /* قاعدة البيانات هي المصدر الفعلي للمخزون؛ لا نحذف صفوفاً من
           Supabase اعتماداً على شكل المعرّف، لأن مواداً مرحّلة قد تحمل
           معرفات قديمة لكنها تشغيلية فعلاً. */
        const mats = pair[0] || [];
        const logs = pair[1] || [];
        const apply = function () {
          const by = {};
          logs.forEach(function (l) {
            const k = String(l.material_id);
            (by[k] || (by[k] = [])).push(l);
          });
          D().inventory = mats.map(function (m) { return fromMat(m, by[String(m.id)] || []); });
          D().inventory_materials = mats;
          D().inventory_log = logs;
          try { window.dispatchEvent(new Event('alfa:inventory-updated')); } catch (e) {}
          return { pulled: true, n: mats.length };
        };
        const afterLegacyCleanup = function () {
          if (!mats.length && !logs.length && ((D().inventory_materials || []).length || (D().inventory_log || []).length || (D().inventory || []).length)) {
            return { skipped: true, reason: 'local-snapshot-preserved' };
          }
          if (!mats.length && !logs.length && window.AlfaSB && AlfaSB.localTableInitialized) {
            return Promise.all([
              AlfaSB.localTableInitialized('inventory_materials'),
              AlfaSB.localTableInitialized('inventory_log'),
            ]).then(function (states) {
              return states.every(Boolean) ? apply() : { skipped: true, reason: 'local-snapshot-preserved' };
            });
          }
          return apply();
        };
        return afterLegacyCleanup();
      }).catch(function (e) { return { skipped: true, error: String(e && e.message || e) }; });
    }
    function pushOne(m) {
      if (!m || !m.id) return Promise.resolve();
      const logs = (m.log || []).map(function (l) { return toLog(m.id, l); });
      /* سجل المادة يعاد بناؤه بطريقة قابلة لإعادة التنفيذ: حذف الحركات
         القديمة يسبق الإدراج، وأي retry يعيد النتيجة نفسها دون duplicate. */
      return sb.upsert('inventory_materials', [toMat(m)], 'id')
        .then(function () { return sb.delFilter('inventory_log', '?material_id=eq.' + encodeURIComponent(m.id)); })
        .then(function () { return sb.insert('inventory_log', logs); });
    }
    function pruneOrphanLogs(list) {
      const keep = {};
      (list || []).forEach(function (m) { if (m && m.id != null) keep[String(m.id)] = true; });
      return sb.get('inventory_log', '?select=id,material_id').then(function (rows) {
        const orphanIds = (rows || []).filter(function (r) {
          return !keep[String(r && r.material_id)] && r && r.id != null;
        }).map(function (r) { return r.id; });
        return delIds('inventory_log', orphanIds);
      });
    }
    function push() {
      if (!on()) return Promise.resolve({ skipped: true });
      const list = D().inventory || [];
      syncRawLocal(list);
      return list.reduce(function (p, m) { return p.then(function () { return pushOne(m); }); }, Promise.resolve())
        .then(function () { return pruneOrphanLogs(list); })
        .then(function () { return { pushed: true, n: list.length }; });
    }
    function removeRaw(id) {
      return sb.delFilter('inventory_log', '?material_id=eq.' + encodeURIComponent(id))
        .then(function () { return sb.del('inventory_materials', [id]); });
    }
    function remove(id) {
      if (!on() || !id) return Promise.resolve({ skipped: true });
      if (window.AlfaOutbox) return AlfaOutbox.commitDelete('inventory', id);
      return removeRaw(id).catch(function () {});
    }
    /* التزام مواد محددة فقط (تستخدمه stock.js بعد كل بيع بدل الرفع الكامل) */
    function commitMats(mats) {
      syncRawLocal(D().inventory || []);
      if (!window.AlfaOutbox) { timerSoon(hold, push, 900); return Promise.resolve({ legacy: true }); }
      return AlfaOutbox.commitRows('inventory', mats || []);
    }
    /* ── صندوق صادر المخزون ── */
    function pushRows(rows) {
      if (!on()) return Promise.reject(new Error('offline'));
      return (rows || []).reduce(function (p, m) { return p.then(function () { return pushOne(m); }); }, Promise.resolve())
        .then(function () { return { pushed: true, n: (rows || []).length }; });
    }
    function delRows(ids) {
      if (!on()) return Promise.reject(new Error('offline'));
      return (ids || []).reduce(function (p, id) { return p.then(function () { return removeRaw(id); }); }, Promise.resolve());
    }
    function applyBox(b) {
      if (!window.AlfaOutbox) return;
      D().inventory = AlfaOutbox.mergeLists(D().inventory, b);
      syncRawLocal(D().inventory);
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
    if (window.AlfaOutbox) AlfaOutbox.register('inventory', { pushRows: pushRows, delRows: delRows });
    function commitAll() {
      const list = D().inventory || [];
      syncRawLocal(list);
      if (!window.AlfaOutbox) return Promise.resolve({ local: true });
      return AlfaOutbox.commitRows('inventory', list);
    }
    function pushCommitted() {
      if (!window.AlfaOutbox) return push();
      return commitAll().then(function () { return AlfaOutbox.flush('inventory'); });
    }
    function pullGuarded() {
      if (!window.AlfaOutbox) return pull();
      return AlfaOutbox.guarded('inventory', pull, applyBox)();
    }
    return { pull: pullGuarded, push: pushCommitted, pushOne: pushOne, commitMats: commitMats,
      pushSoon: function () { if (!window.AlfaOutbox) { timerSoon(hold, push, 900); return; } commitAll(); },
      remove: remove };
  })();

  /* ---------- عقود (الرفع؛ السحب عبر PosSync) ---------- */
  window.ContractSync = (function () {
    const hold = {};
    function toCon(c) {
      return {
        id: String(c.id),
        client_name: c.client_name || '',
        company: c.company || null,
        customer_id: c.customer_id || null,
        contract_type: c.contract_type || 'monthly',
        start_date: c.start_date || null,
        end_date: c.end_date || null,
        status: c.status || 'active',
        delivery_time: c.delivery_time || null,
        payment_method: c.payment_method || 'cash',
        items: c.items || [],
        notes: c.notes || null,
        total_value: Number(c.total_value) || 0,
        has_delivery: !!c.has_delivery,
        daily_meals: c.daily_meals ? Number(c.daily_meals) : null,
        daily_cap: c.daily_cap ? Number(c.daily_cap) : null,
      };
    }
    function pushOne(c) {
      if (!c || !c.id) return Promise.resolve();
      const inst = (c.installments || []).filter(function (i) { return i && i.due_date; }).map(function (i) {
        return {
          id: String(i.id || ('ci_' + c.id + '_' + i.due_date)),
          contract_id: String(c.id),
          due_date: i.due_date,
          amount: Number(i.amount) || 0,
          paid: !!i.paid,
          paid_date: i.paid_date || null,
        };
      });
      return sb.upsert('contracts', [toCon(c)], 'id')
        .then(function () { return sb.delFilter('contract_installments', '?contract_id=eq.' + encodeURIComponent(c.id)); })
        .then(function () { return sb.insert('contract_installments', inst); });
    }
    function push() {
      if (!on()) return Promise.resolve({ skipped: true });
      const list = D().contracts || [];
      return list.reduce(function (p, c) { return p.then(function () { return pushOne(c); }); }, Promise.resolve())
        .then(function () { return { pushed: true, n: list.length }; });
    }
    function removeRaw(id) {
      return sb.delFilter('contract_installments', '?contract_id=eq.' + encodeURIComponent(id))
        .then(function () { return sb.del('contracts', [id]); });
    }
    function remove(id) {
      if (!on() || !id) return Promise.resolve({ skipped: true });
      if (window.AlfaOutbox) return AlfaOutbox.commitDelete('contracts', id);
      return removeRaw(id).catch(function () {});
    }
    /* ── صندوق صادر العقود (السحب عبر PosSync — محروس هناك) ── */
    function pushRows(rows) {
      if (!on()) return Promise.reject(new Error('offline'));
      return (rows || []).reduce(function (p, c) { return p.then(function () { return pushOne(c); }); }, Promise.resolve())
        .then(function () { return { pushed: true, n: (rows || []).length }; });
    }
    function delRows(ids) {
      if (!on()) return Promise.reject(new Error('offline'));
      return (ids || []).reduce(function (p, id) { return p.then(function () { return removeRaw(id); }); }, Promise.resolve());
    }
    if (window.AlfaOutbox) AlfaOutbox.register('contracts', { pushRows: pushRows, delRows: delRows });
    function commitAll() {
      if (window.AlfaOutbox) AlfaOutbox.commitRows('contracts', D().contracts || []);
    }
    function pushCommitted() {
      if (!window.AlfaOutbox) return push();
      commitAll();
      return AlfaOutbox.flush('contracts');
    }
    return { push: pushCommitted, pushOne: pushOne,
      pushSoon: function () { if (!window.AlfaOutbox) { timerSoon(hold, push); return; } commitAll(); },
      remove: remove };
  })();

  /* ---------- مصاريف + مشتريات مواد ---------- */
  window.ExpenditureSync = (function () {
    const hold = {};
    function toExp(x) {
      /* shift_key/cashier_key/shift_kind محلية فقط. يحمل الربط داخل note
         عبر alfaExpenseNoteWithMeta، الذي لا يضيف أي عمود إلى Supabase. */
      var source = x || {};
      var meta = window.alfaExpenseMeta ? window.alfaExpenseMeta(source) : {
        shift_key: source.shift_key || '', cashier_key: source.cashier_key || '', shift_kind: source.shift_kind || '',
      };
      var note = source.note || '';
      if (window.alfaExpenseNoteWithMeta && (meta.shift_key || meta.cashier_key || meta.shift_kind)
          && String(note).indexOf('__ALFA_EXP_META__') < 0) {
        note = window.alfaExpenseNoteWithMeta(note, meta);
      }
      return {
        id: Number(source.id) || Date.now(),
        date: source.date || day(),
        category: source.category || source.type || null,
        amount: Number(source.amount) || 0,
        note: note || null,
        employee: source.employee || null,
        type: source.type || null,
        icon: source.icon || null,
        title: source.title || null,
        time: source.time || null,
      };
    }
    function fromExp(r) {
      var row = Object.assign({}, r || {});
      var meta = window.alfaExpenseMeta ? window.alfaExpenseMeta(row) : {};
      row.shift_key = meta.shift_key || '';
      row.cashier_key = meta.cashier_key || '';
      row.shift_kind = meta.shift_kind || '';
      return row;
    }
    function toPur(p) {
      return {
        id: Number(p.id) || Date.now(),
        date: p.date || day(),
        item: p.item || '',
        cat: p.cat || null,
        unit: p.unit || null,
        packages: Number(p.packages) || 1,
        weight: p.weight == null ? null : Number(p.weight),
        unit_cost: Number(p.unit_cost != null ? p.unit_cost : p.unitCost) || 0,
        total: Number(p.total) || 0,
        time: p.time || null,
        price_per_loaf: p.price_per_loaf != null ? Number(p.price_per_loaf) : null,
        price_per_piece: p.price_per_piece != null ? Number(p.price_per_piece) : null,
      };
    }
    function fromPur(r) {
      return {
        id: r.id,
        date: r.date,
        item: r.item,
        cat: r.cat,
        unit: r.unit,
        packages: Number(r.packages) || 1,
        weight: Number(r.weight) || 0,
        unitCost: Number(r.unit_cost) || 0,
        total: Number(r.total) || 0,
        time: r.time || '',
        price_per_loaf: r.price_per_loaf != null ? Number(r.price_per_loaf) : null,
        price_per_piece: r.price_per_piece != null ? Number(r.price_per_piece) : null,
      };
    }
    function pull() {
      if (!on()) return Promise.resolve({ skipped: true });
      return Promise.all([
        sb.get('expenditures', '?select=*&order=id.desc'),
        sb.get('material_purchases', '?select=*&order=id.desc'),
      ]).then(function (pair) {
        const exps = pair[0] || [];
        const purchases = pair[1] || [];
        const apply = function () {
          D().expenditures = exps.map(fromExp);
          D().expenditures_list = D().expenditures;
          D().material_purchases = purchases.map(fromPur);
          try { window.dispatchEvent(new Event('alfa:expenditure-updated')); } catch (e) {}
          return { pulled: true, exp: exps.length, pur: purchases.length };
        };
        if (!exps.length && !purchases.length && ((D().expenditures || []).length || (D().material_purchases || []).length)) {
          return { skipped: true, reason: 'local-snapshot-preserved' };
        }
        if (!exps.length && !purchases.length && window.AlfaSB && AlfaSB.localTableInitialized) {
          return Promise.all([
            AlfaSB.localTableInitialized('expenditures'),
            AlfaSB.localTableInitialized('material_purchases'),
          ]).then(function (states) {
            return states.every(Boolean) ? apply() : { skipped: true, reason: 'local-snapshot-preserved' };
          });
        }
        return apply();
      }).catch(function (e) { return { skipped: true, error: String(e && e.message || e) }; });
    }
    function push() {
      if (!on()) return Promise.resolve({ skipped: true });
      const exps = (D().expenditures || []).map(toExp);
      const purs = (D().material_purchases || []).map(toPur);
      return sb.upsert('expenditures', exps, 'id')
        .then(function () { return sb.upsert('material_purchases', purs, 'id'); })
        .then(function () { return { pushed: true, exp: exps.length, pur: purs.length }; });
    }
    /* ── صندوقا المصاريف ومشتريات المواد ── */
    function pushExpRows(rows) {
      if (!on()) return Promise.reject(new Error('offline'));
      const list = (rows || []).map(toExp);
      if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
      return sb.upsert('expenditures', list, 'id').then(function () { return { pushed: true, n: list.length }; });
    }
    function pushPurRows(rows) {
      if (!on()) return Promise.reject(new Error('offline'));
      const list = (rows || []).map(toPur);
      if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
      return sb.upsert('material_purchases', list, 'id').then(function () { return { pushed: true, n: list.length }; });
    }
    function applyExpBox(b) {
      if (!window.AlfaOutbox) return;
      D().expenditures = AlfaOutbox.mergeLists(D().expenditures, (b || []).map(fromExp));
      D().expenditures_list = D().expenditures;
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
    function applyPurBox(b) {
      if (!window.AlfaOutbox) return;
      D().material_purchases = AlfaOutbox.mergeLists(D().material_purchases, b);
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
    if (window.AlfaOutbox) {
      AlfaOutbox.register('expenditures', { pushRows: pushExpRows, delRows: function (ids) { return delIds('expenditures', ids); } });
      AlfaOutbox.register('purchases', { pushRows: pushPurRows, delRows: function (ids) { return delIds('material_purchases', ids); } });
    }
    function commitAll() {
      if (!window.AlfaOutbox) return Promise.resolve({ local: true });
      return Promise.all([
        AlfaOutbox.commitRows('expenditures', D().expenditures || []),
        AlfaOutbox.commitRows('purchases', D().material_purchases || []),
      ]);
    }
    function pushCommitted() {
      if (!window.AlfaOutbox) return push();
      return commitAll().then(function () {
        return Promise.all([AlfaOutbox.flush('expenditures'), AlfaOutbox.flush('purchases')]);
      });
    }
    function pullGuarded() {
      if (!window.AlfaOutbox) return pull();
      return AlfaOutbox.guarded('purchases', AlfaOutbox.guarded('expenditures', pull, applyExpBox), applyPurBox)();
    }
    return { pull: pullGuarded, push: pushCommitted,
      pushSoon: function () { if (!window.AlfaOutbox) { timerSoon(hold, push); return; } commitAll(); },
      removeExp: function (id) {
        if (!on() || id == null) return Promise.resolve({ skipped: true });
        if (window.AlfaOutbox) return AlfaOutbox.commitDelete('expenditures', id);
        return delIds('expenditures', [id]).catch(function () {});
      },
      removePur: function (id) {
        if (!on() || id == null) return Promise.resolve({ skipped: true });
        if (window.AlfaOutbox) return AlfaOutbox.commitDelete('purchases', id);
        return delIds('material_purchases', [id]).catch(function () {});
      } };
  })();

  /* ---------- سجل التدقيق ---------- */
  window.AuditSync = (function () {
    const hold = {};
    function row(l) {
      return {
        id: Number(l.id),
        at: l.at || null,
        module: l.module || null,
        action: l.action || '',
        detail: l.detail || null,
        who: l.who || null,
      };
    }
    function pull() {
      if (!on()) return Promise.resolve({ skipped: true });
      return sb.get('audit_log', '?select=*&order=id.desc').then(function (remote) {
        return window.alfaAdoptRemoteRows('audit_log', remote, function (rows) {
          D().audit_log = rows;
          var max = 0;
          rows.forEach(function (r) { if (Number(r.id) > max) max = Number(r.id); });
          window.__auditSeq = max + 1;
        }).then(function (state) { return state.authoritative ? { pulled: true, n: state.n } : { skipped: true, reason: 'local-snapshot-preserved' }; });
      }).catch(function (e) { return { skipped: true, error: String(e && e.message || e) }; });
    }
    function pushOne(l) {
      if (!on() || !l) return Promise.resolve({ skipped: true });
      /* كان يبتلع كل الأخطاء بصمت — الآن التزام مضمون */
      if (window.AlfaOutbox) return AlfaOutbox.commitOne('audit', l);
      return sb.upsert('audit_log', [row(l)], 'id').catch(function () {});
    }
    function push() {
      if (!on()) return Promise.resolve({ skipped: true });
      const list = (D().audit_log || []).map(row);
      if (!list.length) return Promise.resolve({ skipped: true });
      return sb.upsert('audit_log', list, 'id').then(function () { return { pushed: true, n: list.length }; });
    }
    /* ── صندوق صادر التدقيق ── */
    function pushRows(rows) {
      if (!on()) return Promise.reject(new Error('offline'));
      const list = (rows || []).map(row);
      if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
      return sb.upsert('audit_log', list, 'id').then(function () { return { pushed: true, n: list.length }; });
    }
    function applyBox(b) {
      if (!window.AlfaOutbox) return;
      D().audit_log = AlfaOutbox.mergeLists(D().audit_log, b);
      var max = 0;
      (D().audit_log || []).forEach(function (r) { if (Number(r.id) > max) max = Number(r.id); });
      window.__auditSeq = max + 1;
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
    if (window.AlfaOutbox) AlfaOutbox.register('audit', { pushRows: pushRows, delRows: function () { return Promise.resolve(); } });
    function commitAll() {
      if (window.AlfaOutbox) AlfaOutbox.commitRows('audit', D().audit_log || []);
    }
    function pushCommitted() {
      if (!window.AlfaOutbox) return push();
      commitAll();
      return AlfaOutbox.flush('audit');
    }
    function pullGuarded() {
      if (!window.AlfaOutbox) return pull();
      return AlfaOutbox.guarded('audit', pull, applyBox)();
    }
    return { pull: pullGuarded, push: pushCommitted, pushOne: pushOne,
      pushSoon: function () { if (!window.AlfaOutbox) { timerSoon(hold, push, 400); return; } commitAll(); } };
  })();

  /* ---------- إعدادات + عروض + ولاء ---------- */
  window.SettingsSync = (function () {
    const hold = {};
    function pull() {
      if (!on()) return Promise.resolve({ skipped: true });
      return Promise.all([
        sb.get('settings', '?select=key,value&key=in.(price,loyalty,discount,invoice_print,branding,profit_pct,online_orders_cfg,pos_rules)').catch(function () { return []; }),
        sb.get('loyalty_ledger', '?select=*&order=id.desc').catch(function () { return []; }),
      ]).then(function (pack) {
        (pack[0] || []).forEach(function (r) {
          if (r.key === 'price' && r.value) D().price_settings = r.value;
          if (r.key === 'loyalty' && r.value) D().loyalty = r.value;
          if (r.key === 'discount' && r.value) {
            D().discount_settings = {
              invoice_pct: Number(r.value.invoice_pct) || 0,
              items: r.value.items || [],
            };
          }
          if (r.key === 'invoice_print' && r.value) {
            D().invoice_print_settings = r.value;
            try { if (window.alfaApplyInvoicePrint) window.alfaApplyInvoicePrint(r.value); } catch (e) {}
          }
          if (r.key === 'branding' && r.value) D().branding = r.value;
          /* نسبة الربح المستهدفة للأصناف — يضبطها العميل من شاشة التكاليف */
          if (r.key === 'profit_pct' && r.value) D().profit_pct = r.value;
          if (r.key === 'online_orders_cfg' && r.value) D().online_orders_cfg = r.value;
          if (r.key === 'pos_rules' && r.value) {
            D().pos_rules = r.value;
            try {
              if (r.value.require_shift != null) {
                localStorage.setItem('alfaprosys_require_shift', r.value.require_shift ? '1' : '0');
              }
            } catch (e) {}
          }
        });
        const ledger = pack[1] || [];
        const applyLedger = function () {
          D().loyalty_ledger = ledger;
          var max = 0;
          ledger.forEach(function (r) { if (Number(r.id) > max) max = Number(r.id); });
          window.__loySeq = max + 1;
          return { pulled: true };
        };
        if (!ledger.length && (D().loyalty_ledger || []).length) {
          return { skipped: true, reason: 'local-snapshot-preserved' };
        }
        if (!ledger.length && window.AlfaSB && AlfaSB.localTableInitialized) {
          return AlfaSB.localTableInitialized('loyalty_ledger').then(function (authoritative) {
            return authoritative ? applyLedger() : { skipped: true, reason: 'local-snapshot-preserved' };
          });
        }
        return applyLedger();
      }).catch(function (e) { return { skipped: true, error: String(e && e.message || e) }; });
    }
    function pushOffers() {
      const offers = D().offers || [];
      const heads = offers.map(function (o) {
        return {
          id: String(o.id),
          title: o.title || '',
          price: Number(o.price) || 0,
          active: o.active !== false,
          expires_at: o.expires_at || null,
        };
      });
      return sb.upsert('offers', heads, 'id')
        .then(function () {
          return offers.reduce(function (p, o) {
            return p.then(function () {
              return sb.delFilter('offer_items', '?offer_id=eq.' + encodeURIComponent(o.id));
            });
          }, Promise.resolve());
        })
        .then(function () {
          const lines = [];
          offers.forEach(function (o) {
            (o.items || []).forEach(function (it) {
              if (!it || !it.item_id) return;
              lines.push({
                offer_id: String(o.id),
                item_id: it.item_id,
                qty: Number(it.qty) || 1,
                free: !!it.free,
              });
            });
          });
          return sb.insert('offer_items', lines).catch(function () {});
        });
    }
    function push() {
      if (!on()) return Promise.resolve({ skipped: true });
      const rows = [
        { key: 'discount', value: D().discount_settings || { invoice_pct: 0, items: [] } },
        { key: 'price', value: D().price_settings || {} },
        { key: 'loyalty', value: D().loyalty || {} },
        { key: 'profit_pct', value: D().profit_pct || { default: 0, items: {} } },
        { key: 'online_orders_cfg', value: D().online_orders_cfg || { endpoint: '', pin: '' } },
        { key: 'pos_rules', value: D().pos_rules || { require_shift: false } },
      ];
      /* invoice_print / branding تُرفع عبر saveKV عند الحفظ من مودال التصميم */
      if (D().invoice_print_settings) rows.push({ key: 'invoice_print', value: D().invoice_print_settings });
      if (D().branding) rows.push({ key: 'branding', value: D().branding });
      return sb.upsert('settings', rows, 'key')
        .then(function () { return pushOffers(); })
        .then(function () { return { pushed: true }; });
    }
    /* رفع عرض واحد (رأس + سطور) — تُستخدم من الصندوق */
    function pushOffer(o) {
      if (!o || !o.id) return Promise.resolve();
      const head = {
        id: String(o.id),
        title: o.title || '',
        price: Number(o.price) || 0,
        active: o.active !== false,
        expires_at: o.expires_at || null,
      };
      const lines = (o.items || []).filter(function (it) { return it && it.item_id; }).map(function (it) {
        return { offer_id: String(o.id), item_id: it.item_id, qty: Number(it.qty) || 1, free: !!it.free };
      });
      return sb.upsert('offers', [head], 'id')
        .then(function () { return sb.delFilter('offer_items', '?offer_id=eq.' + encodeURIComponent(o.id)); })
        .then(function () { return sb.insert('offer_items', lines).catch(function () {}); });
    }
    function delOfferRaw(id) {
      return sb.delFilter('offer_items', '?offer_id=eq.' + encodeURIComponent(id))
        .then(function () { return sb.del('offers', [id]); });
    }
    /* ── صندوقا مفاتيح الإعدادات والعروض ── */
    function cloudKeyRow(r) {
      if (!r || !r.key) return null;
      let value = r.value;
      try { value = JSON.parse(JSON.stringify(value == null ? {} : value)); } catch (e) {}
      /* data URLs لا تخرج إلى جدول settings؛ تبقى في صندوق الملفات حتى
         تُرفع إلى Storage، بينما الرابط العام فقط هو الذي يعبر السحابة. */
      if (value && typeof value === 'object') {
        delete value.logo_local_data;
        delete value.qr_local_data;
      }
      return { key: r.key, value: value };
    }
    function pushKeyRows(rows) {
      if (!on()) return Promise.reject(new Error('offline'));
      const list = (rows || []).map(cloudKeyRow).filter(Boolean);
      if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
      return sb.upsert('settings', list, 'key').then(function () { return { pushed: true, n: list.length }; });
    }
    function pushOfferRows(rows) {
      if (!on()) return Promise.reject(new Error('offline'));
      return (rows || []).reduce(function (p, o) { return p.then(function () { return pushOffer(o); }); }, Promise.resolve())
        .then(function () { return { pushed: true, n: (rows || []).length }; });
    }
    function delOfferRows(ids) {
      if (!on()) return Promise.reject(new Error('offline'));
      return (ids || []).reduce(function (p, id) { return p.then(function () { return delOfferRaw(id); }); }, Promise.resolve());
    }
    function applySettingsBox(b) {
      const rows = (b && b.rows) || {};
      if (rows['discount']) D().discount_settings = rows['discount'].value;
      if (rows['price']) D().price_settings = rows['price'].value;
      if (rows['loyalty']) D().loyalty = rows['loyalty'].value;
      if (rows['invoice_print']) {
        D().invoice_print_settings = rows['invoice_print'].value;
        try { if (window.alfaApplyInvoicePrint) window.alfaApplyInvoicePrint(rows['invoice_print'].value); } catch (e) {}
      }
      if (rows['branding']) D().branding = rows['branding'].value;
      if (rows['pos_rules']) {
        D().pos_rules = rows['pos_rules'].value;
        try {
          if (rows['pos_rules'].value && rows['pos_rules'].value.require_shift != null) {
            localStorage.setItem('alfaprosys_require_shift', rows['pos_rules'].value.require_shift ? '1' : '0');
          }
        } catch (e) {}
      }
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
    function applyOffersBox(b) {
      if (!window.AlfaOutbox) return;
      D().offers = AlfaOutbox.mergeLists(D().offers, b);
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
    function applyLedgerBox(b) {
      if (!window.AlfaOutbox) return;
      D().loyalty_ledger = AlfaOutbox.mergeLists(D().loyalty_ledger, b);
      var max = 0;
      (D().loyalty_ledger || []).forEach(function (r) { if (Number(r.id) > max) max = Number(r.id); });
      window.__loySeq = max + 1;
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
    if (window.AlfaOutbox) {
      AlfaOutbox.register('settings', { pushRows: pushKeyRows, delRows: function () { return Promise.resolve(); } });
      AlfaOutbox.register('offers', { pushRows: pushOfferRows, delRows: delOfferRows });
    }
    function commitAll() {
      if (!window.AlfaOutbox) return;
      const pack = [
        { key: 'discount', value: D().discount_settings || { invoice_pct: 0, items: [] } },
        { key: 'price', value: D().price_settings || {} },
        { key: 'loyalty', value: D().loyalty || {} },
        { key: 'pos_rules', value: D().pos_rules || { require_shift: false } },
      ];
      if (D().invoice_print_settings) pack.push({ key: 'invoice_print', value: D().invoice_print_settings });
      if (D().branding) pack.push({ key: 'branding', value: D().branding });
      AlfaOutbox.commitRows('settings', pack);
      AlfaOutbox.commitRows('offers', D().offers || []);
    }
    function pushCommitted() {
      if (!window.AlfaOutbox) return push();
      commitAll();
      return Promise.all([AlfaOutbox.flush('settings'), AlfaOutbox.flush('offers')]);
    }
    function pullGuarded() {
      if (!window.AlfaOutbox) return pull();
      const g = window.AlfaOutbox.guarded;
      return g('loyalty_ledger', g('settings', pull, applySettingsBox), applyLedgerBox)();
    }
    /* حفظ مفتاح/قيمة: محلياً أولاً دائماً، ثم رفع عبر صندوق settings.
       هذا هو المسار نفسه أونلاين وأوفلاين؛ لا تضيع إعدادات التصميم أو
       قواعد الوردية إذا فشل طلب الشبكة بعد أن كان المتصفح يعلن online. */
    function applyKVLocal(key, value) {
      if (key === 'invoice_print') {
        D().invoice_print_settings = value;
        try { if (window.alfaApplyInvoicePrint) window.alfaApplyInvoicePrint(value); } catch (e) {}
      }
      if (key === 'branding') D().branding = value;
      if (key === 'pos_rules') {
        D().pos_rules = value;
        try {
          if (value && value.require_shift != null) {
            localStorage.setItem('alfaprosys_require_shift', value.require_shift ? '1' : '0');
          }
        } catch (e) {}
      }
      if (key === 'price') D().price_settings = value;
      try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    }
    function saveKV(key, value) {
      const row = { key: key, value: value };
      applyKVLocal(key, value);
      if (window.AlfaOutbox) {
        return AlfaOutbox.commitRows('settings', [row]).then(function (committed) {
          /* لا نربط استجابة الزر بزمن الشبكة: التقييد المحلي اكتمل،
             والرفع يعمل في الخلفية ويُعاد عند الفشل. */
          if (on()) AlfaOutbox.flush('settings').catch(function () {});
          return { local: true, pending: true, committed: committed };
        });
      }
      if (!on()) return Promise.resolve({ local: true, pending: true });
      return sb.upsert('settings', [row], 'key').then(function () { return { pushed: true }; });
    }
    return { pull: pullGuarded, push: pushCommitted, saveKV: saveKV,
      pushSoon: function () { if (!window.AlfaOutbox) { timerSoon(hold, push); return; } commitAll(); },
      removeOffer: function (id) {
        if (!on() || !id) return Promise.resolve({ skipped: true });
        if (window.AlfaOutbox) return AlfaOutbox.commitDelete('offers', id);
        return delOfferRaw(id).catch(function () {});
      } };
  })();

  window.LoyaltySync = (function () {
    function row(l) {
      return {
        id: Number(l.id),
        customer_id: l.customer_id || null,
        at: l.at || null,
        type: l.type || null,
        pts: Number(l.pts) || 0,
        note: l.note || null,
        by: l.by || null,
      };
    }
    function pushOne(l) {
      if (!on() || !l) return Promise.resolve({ skipped: true });
      /* كان يبتلع كل الأخطاء بصمت — الآن التزام مضمون */
      if (window.AlfaOutbox) return AlfaOutbox.commitOne('loyalty_ledger', l);
      return sb.upsert('loyalty_ledger', [row(l)], 'id').catch(function () {});
    }
    /* ── صندوق صادر دفتر الولاء ── */
    function pushRows(rows) {
      if (!on()) return Promise.reject(new Error('offline'));
      const list = (rows || []).map(row);
      if (!list.length) return Promise.resolve({ pushed: true, n: 0 });
      return sb.upsert('loyalty_ledger', list, 'id').then(function () { return { pushed: true, n: list.length }; });
    }
    if (window.AlfaOutbox) AlfaOutbox.register('loyalty_ledger', { pushRows: pushRows, delRows: function () { return Promise.resolve(); } });
    return { pushOne: pushOne };
  })();

  /* ---------- طاولات: سحب الأسماء فقط ---------- */
  window.TableSync = (function () {
    function pull() {
      if (!on()) return Promise.resolve({ skipped: true });
      return sb.get('dining_tables', '?select=label,sort_order,is_active&is_active=eq.true&order=sort_order.asc').then(function (rows) {
        const seen = {};
        const labels = [];
        (rows || []).forEach(function (r) {
          if (r.label && !seen[r.label]) { seen[r.label] = 1; labels.push(r.label); }
        });
        if (labels.length) D().tables = labels;
        return { pulled: true, n: labels.length };
      }).catch(function (e) { return { skipped: true, error: String(e && e.message || e) }; });
    }
    return { pull: pull };
  })();

  /* ---------- سحب موحّد لشاشات المدير ---------- */
  window.ManagerSync = {
    pull: function () {
      if (!on()) return Promise.resolve({ skipped: true });
      const jobs = [];
      if (window.EmployeeSync) jobs.push(EmployeeSync.pull());
      if (window.SupplierSync) jobs.push(SupplierSync.pull());
      if (window.InventorySync) jobs.push(InventorySync.pull());
      if (window.ExpenditureSync) jobs.push(ExpenditureSync.pull());
      if (window.AuditSync) jobs.push(AuditSync.pull());
      if (window.SettingsSync) jobs.push(SettingsSync.pull());
      if (window.TableSync) jobs.push(TableSync.pull());
      return Promise.all(jobs).then(function () { return { pulled: true }; });
    },
    push: function () {
      if (!on()) return Promise.resolve({ skipped: true });
      const jobs = [];
      if (window.EmployeeSync) jobs.push(EmployeeSync.push());
      if (window.SupplierSync) jobs.push(SupplierSync.push());
      if (window.InventorySync) jobs.push(InventorySync.push());
      if (window.ContractSync) jobs.push(ContractSync.push());
      if (window.ExpenditureSync) jobs.push(ExpenditureSync.push());
      if (window.AuditSync) jobs.push(AuditSync.push());
      if (window.SettingsSync) jobs.push(SettingsSync.push());
      return Promise.all(jobs).then(function () { return { pushed: true }; });
    },
  };
})();
