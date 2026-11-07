/* ================================================================
   utils.js — الدوال المساعدة المشتركة — alfaprosys
   يُحمَّل في كل صفحة بعد config.js وقبل ملف الصفحة.
   ================================================================ */

/* ── تعقيم HTML (حماية XSS) ── */
window.e = window.escapeHtml = function(v) {
  return String(v ?? '').replace(/[&<>'"]/g, c =>
    ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c]));
};

/* ── تنسيق الأرقام ── */
window.fmtNum = function(n) {
  return Number(n || 0).toLocaleString('en-US');
};
window.fmt = function(n) {
  return fmtNum(n) + ' ل.س';
};

/* ترتيب التصنيفات ثابت في categories.sort_order (١..٨)، بينما ترتيب
   الصنف داخل تصنيفه في item_order. في «السندويشات والغربي» نثبت أيضاً
   كتلة العائلة بصرياً، حتى لا تفصل إضافة جديدة عن كريسبي/مكسيكي المرتبط بها
   إذا كانت لقطة جهاز قديمة أو كان الصنف أُضيف حديثاً. */
let _alfaWesternOrderCache = { list: null, familyRank: null };
const _alfaVariantRank = { 'عادي': 0, 'سمون': 1, 'دبل': 2, 'سمون دبل': 3, 'شراك': 4 };
const _alfaMealRank = { 'سمون': 0, 'عربي': 1, 'قطع': 10, 'طاولة': 11, 'سياخ': 12 };
function _alfaWesternFamily(item) {
  let family = String((item && (item.family || item.option_name || item.base_name || item.name)) || '').replace(/\s+/g, ' ').trim();
  family = family.replace(/\s+وجبة$/, '').replace(/^وجبة\s+/, '');
  return family;
}
function _alfaWesternSortKey(item, list) {
  const fallback = Number(item && (item.item_order != null ? item.item_order : item.sort_order)) || 0;
  const categoryName = String((item && item.category_name) || '');
  const isWestern = /غربي/.test(categoryName) || String(item && item.category_id || '') === 'f5c2853a-feb2-4744-bed3-d37fb7bfd532';
  if (!isWestern) return fallback;
  if (_alfaWesternOrderCache.list !== list) {
    const first = {};
    (list || []).forEach(function (row) {
      const rowCat = String((row && row.category_name) || '');
      const rowWestern = /غربي/.test(rowCat) || String(row && row.category_id || '') === 'f5c2853a-feb2-4744-bed3-d37fb7bfd532';
      if (!rowWestern) return;
      const fam = _alfaWesternFamily(row);
      const ord = Number(row && (row.item_order != null ? row.item_order : row.sort_order)) || 0;
      if (fam && (first[fam] == null || ord < first[fam])) first[fam] = ord;
    });
    const familyRank = {};
    Object.keys(first).sort(function (a, b) { return first[a] - first[b] || a.localeCompare(b, 'ar'); })
      .forEach(function (fam, idx) { familyRank[fam] = idx; });
    _alfaWesternOrderCache = { list: list, familyRank: familyRank };
  }
  const family = _alfaWesternFamily(item);
  const base = String((item && (item.base_name || item.name)) || '').replace(/\s+/g, ' ').trim();
  const variant = String((item && (item.variant_clean || item.variant)) || '').replace(/\s+/g, ' ').trim();
  const isMeal = /^وجبة(?:\s|$)/.test(base) || /(?:^|\s)وجبة$/.test(base);
  const isCheese = !isMeal && /وجبنة|مع جبنة|بالجبنة|جبنة/.test(base);
  const block = isMeal ? 2 : (isCheese ? 1 : 0);
  const ranks = isMeal ? _alfaMealRank : _alfaVariantRank;
  const variantRank = Object.prototype.hasOwnProperty.call(ranks, variant) ? ranks[variant] : 20;
  const familyRank = _alfaWesternOrderCache.familyRank[family] == null ? 999 : _alfaWesternOrderCache.familyRank[family];
  return familyRank * 100000 + block * 10000 + variantRank * 100 + fallback;
}
window.alfaItemOrder = function(item) {
  const list = (window.DEMO_DATA && window.DEMO_DATA.items) || [];
  return _alfaWesternSortKey(item, list);
};
window.alfaCategoryOrder = function(category, item) {
  return Number((category && category.sort_order) || (item && item.category_order) || 0);
};

/* ── Toast إشعار ── */
window.showToast = function(msg, icon) {
  icon = icon || '✅';
  const t = document.getElementById('toast');
  if (!t) return;
  t.innerHTML = '<span>' + icon + '</span><span>' + e(msg) + '</span>';
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(function() { t.classList.remove('show'); }, 2200);
};

/* ── مرجع البيانات ── */
Object.defineProperty(window, 'DATA', {
  get: function() { return window.DEMO_DATA; },
  configurable: true,
});

/* ================================================================
   قوائم البيع — إخفاء غير المتوفر
   ----------------------------------------------------------------
   availableItems(catId?) : الأصناف المتاحة فقط (is_available !== false)
   sellableCategories()   : التصنيفات النشطة التي تحتوي صنفاً متاحاً
                            واحداً على الأقل، مرتّبة حسب sort_order.

   ملاحظة: شاشة «إدارة الأصناف» لا تستخدم هاتين الدالتين عمداً —
   يجب أن ترى كل الأصناف والتصنيفات لتتمكّن من إعادة تفعيلها.
   ================================================================ */
window.isMenuItemAvailable = function (item) {
  /* عقد الواجهة هو القيمة المنطقية الصريحة فقط: is_available === false.
     أي قيمة أخرى تبقى متاحة كما يحددها مصدر البيانات. */
  return !!item && item.is_available !== false;
};

window.availableItems = function (catId) {
  const list = (window.DEMO_DATA && window.DEMO_DATA.items) || [];
  return list.filter(function (i) {
    return window.isMenuItemAvailable(i) && (catId == null || i.category_id === catId);
  });
};

window.sellableCategories = function () {
  const cats = (window.DEMO_DATA && window.DEMO_DATA.categories) || [];
  return cats
    .filter(function (c) {
      return c && c.is_active && window.availableItems(c.id).length > 0;
    })
    .sort(function (a, b) { return (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0); });
};

/* ================================================================
   alfaAutoRefresh(fn)
   ----------------------------------------------------------------
   يعيد تشغيل fn بعد اكتمال اللقطة المحلية أو بعد bootstrap السحابي الأول.
   لا يوجد polling ولا سحب متكرر؛ الرفع تلقائي من المحلي إلى السحابة،
   ومراجعة اختلافات الأسعار تظهر مرة واحدة عند الجلب الأول فقط.
   ================================================================ */
window.alfaAutoRefresh = function (fn) {
  if (typeof fn !== 'function') return;
  var run = function () { try { fn(); } catch (err) { console.error('[alfaAutoRefresh]', err); } };
  try {
    window.addEventListener('alfa:cloud-ready', run);
    window.addEventListener('alfa:auto-sync-applied', run);
  } catch (e) {}
  try {
    if (window.__ALFA_BG_P && typeof window.__ALFA_BG_P.then === 'function') {
      window.__ALFA_BG_P.then(run).catch(function () {});
    }
  } catch (e) {}
};

/* توافق برمجي قديم فقط: لا يوجد زر يستدعي هذه الدالة الآن. إذا استدعاها
   جزء قديم صراحةً فهي تطلب دورة المزامنة الآمنة، ولا تطبق جلباً خاماً. */
window.alfaExplicitCloudRefresh = function () {
  if (window.AlfaAutoSync && window.AlfaAutoSync.pull) return AlfaAutoSync.pull('explicit-legacy');
  return Promise.resolve({ skipped: true, reason: 'auto-sync-not-ready' });
};

/* أزيل زر «تحديث السحابة»: الجلب السحابي يتم مرة واحدة عند bootstrap،
   وبعدها الرفع من المحلي تلقائي. تظهر مراجعة واحدة فقط عند اختلاف أول جلب. */
(function installExplicitCloudRefresh() {
  /* intentionally empty — kept as a named compatibility hook */
})();

/* ── نوع الطلب الموحّد ──
   السحابة تخزّن طاولات باسم dinein، بينما شاشات عدة تقارنها بـ 'table'
   فتظهر «طاولة: 0 ل.س» رغم وجود طلبات طاولات فعلية. مصدر واحد للتحويل. */
window.alfaOrderType = function (inv) {
  const t = String((inv && inv.type) || '').toLowerCase();
  if (inv && (inv.is_online || inv.source === 'online' || inv.online_order_id || inv.source_order_id)) return 'online';
  if (t === 'delivery' || Number(inv && inv.service_delivery) > 0) return 'delivery';
  if (t === 'dinein' || t === 'dine_in' || t === 'table' || Number(inv && inv.service_table) > 0) return 'table';
  return 'takeaway';
};
window.alfaOrderTypeLabel = function (inv) {
  const k = window.alfaOrderType(inv);
  return k === 'table' ? '🍽️ طاولة' : k === 'delivery' ? '🛵 توصيل' : k === 'online' ? '🌐 أونلاين' : '🥡 سفري';
};

/* ── رمز السحب الترويجي: 8 أرقام ──
   مصدر واحد لتوليده (شاشة البيع + إعادة المحاولة عند التضارب)،
   حتى لا تُوزَّع خوارزميتان مختلفتان على ملفين. */
window.alfaNewDrawCode = function () {
  var a = new Uint32Array(1);
  if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a);
  else a[0] = Math.floor(Math.random() * 0xFFFFFFFF);
  return String(a[0] % 100000000).padStart(8, '0');
};

/* ================================================================
   alfaLiveInput — حافظ التركيز عند إعادة الرسم
   ----------------------------------------------------------------
   المشكلة: شاشات عدة ترسم نفسها بالكامل (innerHTML) عند كل ضغطة
   مفتاح، فيُدمَّر حقل الإدخال ويُعاد بناؤه من الصفر. النتيجة على
   الجوال: يُفقد التركيز فتُغلق لوحة المفاتيح بعد كل حرف، ويقفز
   المؤشّر إلى آخر النص.

   الاستخدام في القالب:
     <input id="invSearchInput" oninput="alfaLiveInput(this, function(v){ searchQuery = v; }, render)">

   تعيد الدالة التركيز وموضع المؤشّر (ونطاق التحديد) بعد الرسم.
   ================================================================ */
window.alfaLiveInput = function (el, apply, rerender) {
  if (!el) return;
  var id = el.id;
  var s = null, e2 = null;
  try { s = el.selectionStart; e2 = el.selectionEnd; } catch (err) {}

  try { apply(el.value); } catch (err) { console.error('[alfaLiveInput] apply', err); }
  try { rerender(); }     catch (err) { console.error('[alfaLiveInput] render', err); }

  var restore = function () {
    var next = id ? document.getElementById(id) : null;
    if (!next || typeof next.focus !== 'function') return;
    /* preventScroll: لا تُزحزح الصفحة أثناء فتح لوحة المفاتيح */
    try { next.focus({ preventScroll: true }); }
    catch (err) { try { next.focus(); } catch (err2) {} }
    if (next.setSelectionRange && s != null) {
      try { next.setSelectionRange(s, e2 == null ? s : e2); } catch (err) {}
    }
  };
  if (typeof requestAnimationFrame === 'function') requestAnimationFrame(restore);
  else setTimeout(restore, 0);
};

/* ================================================================
   التكلفة الموحّدة — مصدر واحد للحقيقة (نسخة عن منطق costs.js)
   ----------------------------------------------------------------
   alfaItemCost(item)    : تكلفة صنف (يدوية إن وُجدت، وإلا من الوصفات)
   alfaInvoiceCost(inv)  : تكلفة فاتورة = Σ (تكلفة الصنف × الكمية)
   ================================================================ */
window.alfaItemCost = function (item) {
  if (!item) return 0;
  if (item.cost_mode === 'manual' && Number(item.cost_manual) > 0) return Number(item.cost_manual) || 0;
  var total = 0;
  (((window.DEMO_DATA || {}).inventory) || []).forEach(function (inv) {
    (inv.recipe || []).forEach(function (line) {
      if (line && line.item_id === item.id) {
        total += (Number(inv.cost_per_unit) || 0) * (Number(line.qty) || 0);
      }
    });
  });
  return total;
};

window.alfaInvoiceCost = function (inv) {
  var lines = (inv && inv.items) || [];
  if (!lines.length) return 0;
  var byId = {};
  (((window.DEMO_DATA || {}).items) || []).forEach(function (it) { byId[String(it.id)] = it; });
  return lines.reduce(function (sum, line) {
    var it = byId[String(line.id)] || byId[String(line.item_id)] || null;
    return sum + (window.alfaItemCost(it) * (Number(line.qty) || 0));
  }, 0);
};

/* عدد الأصناف والتصنيفات المخفية (للتشخيص من كونسول المتصفح) */
window.hiddenMenuStats = function () {
  const items = (window.DEMO_DATA && window.DEMO_DATA.items) || [];
  const cats  = (window.DEMO_DATA && window.DEMO_DATA.categories) || [];
  return {
    items_total: items.length,
    items_hidden: items.filter(function (i) { return i && i.is_available === false; }).length,
    cats_total: cats.filter(function (c) { return c && c.is_active; }).length,
    cats_hidden: cats.filter(function (c) {
      return c && c.is_active && window.availableItems(c.id).length === 0;
    }).map(function (c) { return c.name; }),
  };
};



// إخفاء القائمة الجانبية إذا كان العرض داخل نافذة منبثقة (iframe)
(function() {
  if (new URLSearchParams(window.location.search).get('embed') === '1' || window.name === 'mgrIframe') {
    document.documentElement.classList.add('is-embedded-view');
    const style = document.createElement('style');
    style.innerHTML = `
      .is-embedded-view .mgr-sidebar,
      .is-embedded-view .mgr-fab,
      .is-embedded-view .mgr-mobile-nav,
      .is-embedded-view .mgr-nav-scrim,
      .is-embedded-view .mgr-side-toggle { display: none !important; }
      .is-embedded-view .mgr-content-panel { margin-right: 0 !important; width: 100% !important; padding: 15px !important; }
      .is-embedded-view .mgr-layout { display: block !important; }
    `;
    document.head.appendChild(style);
  }
})();

/* ================================================================
   هوية الكاشير + تصنيف التقارير + حالة التحصيل
   ----------------------------------------------------------------
   هذه الدوال لا تغيّر الطباعة؛ هي طبقة بيانات مشتركة للشاشات والتقارير.
   ================================================================ */
(function () {
  const profiles = {
    cashier_morning: { key: 'cashier_morning', label: 'الكاشير الصباحي', shift: 'morning' },
    cashier_evening: { key: 'cashier_evening', label: 'الكاشير المسائي', shift: 'evening' },
    cashier:         { key: 'cashier',         label: 'الكاشير',          shift: '' },
    manager:         { key: 'manager',         label: 'الإدارة',          shift: '' },
  };
  window.ALFA_CASHIER_PROFILES = profiles;
  function sessionValue(key) {
    try { return sessionStorage.getItem(key) || ''; } catch (e) { return ''; }
  }
  function data() { return window.DEMO_DATA || {}; }
  function currentKey() {
    return sessionValue('alfaprosys_cashier_key') || sessionValue('alfaprosys_role') || 'cashier';
  }
  function profile(key) { return profiles[String(key || currentKey())] || profiles.cashier; }
  window.alfaCurrentCashierKey = currentKey;
  window.alfaCurrentCashierProfile = function () { return profile(currentKey()); };
  window.alfaCurrentCashierName = function () {
    const p = profile(currentKey());
    const s = data().cashierSession || {};
    return p && p.shift ? p.label : (s.cashier_name || p.label || 'الكاشير');
  };
  window.alfaCurrentShiftKind = function () { return profile(currentKey()).shift || ''; };
  window.alfaShiftKeyFor = function (row) {
    row = row || data().cashierSession || {};
    return String(row.shift_key || row.shift_id || row.issued_shift_key ||
      ((row.cashier_key || currentKey()) + ':' + (row.date || (window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10)))));
  };
  window.alfaCurrentShiftKey = function () {
    const s = data().cashierSession || {};
    return String(s.shift_key || s.shift_id || (currentKey() + ':' + (window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10))));
  };
  window.alfaInvoiceNumberMatches = function (inv, query) {
    const q = String(query == null ? '' : query).trim();
    if (!inv || !q) return false;
    return [inv.id, inv.no, inv.print_no, window.invNoLabel && invNoLabel(inv)]
      .filter(function (v) { return v != null; })
      .some(function (v) { return String(v) === q; });
  };
  window.alfaInvoicePaymentStatus = function (inv) {
    if (!inv) return 'unpaid';
    if (inv.payment_status === 'paid' || inv.payment_status === 'unpaid') return inv.payment_status;
    if (inv.paid === true) return 'paid';
    if (inv.paid === false) return 'unpaid';
    if (inv.pay_type === 'deferred') return 'unpaid';
    /* الدفع الجزئي يبقى غير مكتمل، لكن المبلغ المدفوع منه لا يُهمل؛
       alfaInvoiceAccounting أدناه يعيده كمبلغ محصل فعلياً. */
    if (inv.pay_type === 'partial' && Number((inv.discount_detail || {}).partial_amount || 0) < Number(inv.total || 0)) return 'unpaid';
    return 'paid';
  };
  window.alfaInvoiceIsServiceLine = function (line) {
    if (!line) return true;
    if (line.is_service) return true;
    const id = String(line.id || line.item_id || '');
    if (/^service_(table|delivery|hall)$/.test(id)) return true;
    return /^خدمة\s/.test(String(line.name || '').trim());
  };
  window.alfaInvoiceItemMeta = function (line) {
    const id = line && (line.item_id || line.id);
    const items = data().items || [];
    const found = items.find(function (it) { return it && String(it.id) === String(id); });
    const name = String((line && line.name) || (found && (found.name || found.option_name)) || id || 'أخرى');
    const family = String((found && (found.family || found.option_name || found.category_name)) || (line && (line.family || line.category_name)) || 'أخرى').trim() || 'أخرى';
    const category = String((found && (found.category_name || found.category || found.family)) || family).trim() || 'أخرى';
    return { id: String(id || name), name: name, family: family, category: category, item: found || null };
  };
  window.alfaInvoicePaymentEntries = function (inv) {
    if (!inv) return [];
    if (Array.isArray(inv.payment_history) && inv.payment_history.length) return inv.payment_history.slice();
    const status = window.alfaInvoicePaymentStatus(inv);
    const total = Number(inv.total) || 0;
    const partialAmount = Number((inv.discount_detail || {}).partial_amount || 0);
    /* الفاتورة الجزئية لا تملك دائماً payment_history في البيانات القديمة؛
       partial_amount هو الدفعة الحقيقية التي يجب أن تدخل الصندوق. */
    if (inv.pay_type === 'partial' && partialAmount > 0) {
      return [{
        id: 'legacy-partial-' + String(inv.id || inv.no || ''),
        status: 'paid', amount: Math.min(partialAmount, total),
        cashier: inv.paid_by || inv.cashier || '',
        cashier_key: inv.paid_by_key || inv.cashier_key || '',
        shift_key: inv.paid_shift_key || inv.issued_shift_key || '',
        at: inv.paid_at || inv.created_at || '',
      }];
    }
    if (status !== 'paid') return [];
    return [{
      id: 'legacy-' + String(inv.id || inv.no || ''),
      status: 'paid', amount: total,
      cashier: inv.paid_by || inv.cashier || '',
      cashier_key: inv.paid_by_key || inv.cashier_key || '',
      shift_key: inv.paid_shift_key || inv.issued_shift_key || '',
      at: inv.paid_at || inv.created_at || '',
    }];
  };
  window.alfaInvoiceAccounting = function (inv) {
    const total = Math.max(0, Number(inv && inv.total) || 0);
    const cancelled = !!(inv && inv.status === 'cancelled');
    const status = window.alfaInvoicePaymentStatus(inv);
    const entries = cancelled ? [] : window.alfaInvoicePaymentEntries(inv);
    const paidAmount = Math.min(total, entries.reduce(function (sum, p) {
      return p && p.status === 'paid' ? sum + Math.max(0, Number(p.amount) || 0) : sum;
    }, 0));
    const isIssued = !!inv && ['printed', 'modified', 'cancelled'].indexOf(String(inv.status || '')) >= 0;
    return {
      total: total,
      cancelled: cancelled,
      issued: isIssued,
      status: status,
      paid: status === 'paid' && paidAmount >= total,
      paid_amount: paidAmount,
      recognized: paidAmount,
      unpaid_amount: cancelled ? 0 : Math.max(0, total - paidAmount),
      partially_paid: !cancelled && paidAmount > 0 && paidAmount < total,
      entries: entries,
    };
  };
  window.alfaInvoiceShiftKind = function (inv) {
    const raw = String((inv && (inv.shift_kind || inv.cashier_key || inv.issued_shift_key || inv.cashier)) || '').toLowerCase();
    if (/morning|صباح|1111/.test(raw)) return 'morning';
    if (/evening|مساء|2222/.test(raw)) return 'evening';
    return 'unknown';
  };
  window.alfaInvoiceShiftKey = function (inv) {
    if (!inv) return '';
    return String(inv.issued_shift_key || inv.shift_key ||
      ((inv.cashier_key || '') + ':' + String(inv.date || inv.created_at || '').slice(0, 10)) || '');
  };
  window.alfaInvoiceCollectedForShift = function (inv, shiftKey) {
    const wanted = String(shiftKey || '');
    return window.alfaInvoicePaymentEntries(inv).reduce(function (sum, p) {
      if (p.status !== 'paid') return sum;
      if (wanted && String(p.shift_key || '') !== wanted) return sum;
      return sum + (Number(p.amount) || 0);
    }, 0);
  };
  window.alfaInvoiceCollectedBy = function (inv, cashierKey) {
    const wanted = String(cashierKey || '');
    return window.alfaInvoicePaymentEntries(inv).reduce(function (sum, p) {
      if (p.status !== 'paid') return sum;
      if (wanted && String(p.cashier_key || '') !== wanted) return sum;
      return sum + (Number(p.amount) || 0);
    }, 0);
  };

  /* لا يوجد عمود وردية في جدول expenditures السحابي. نُبقي النص القديم
     كما هو ونضيف حاملاً نصياً آمناً داخل note، فيُحفظ ضمن العمود المعروف
     فقط، بينما يبقى shift_key حقلاً محلياً صريحاً بعد فك الحامل. */
  const EXP_MARK = '__ALFA_EXP_META__';
  window.alfaShiftPaymentValue = function (shift, key, mode) {
    const pay = (shift && shift.by_payment) || {};
    const value = pay[key];
    if (value == null) return 0;
    if (typeof value === 'number') return Number(value) || 0;
    if (typeof value === 'object') {
      if (mode === 'debt') return Number(value.debt != null ? value.debt : value.total) || 0;
      if (mode === 'paid') return Number(value.paid != null ? value.paid : value.total) || 0;
      return Number(value.total != null ? value.total : (value.paid != null ? value.paid : 0)) || 0;
    }
    return Number(value) || 0;
  };
  window.alfaExpenseMeta = function (expense) {
    const x = expense || {};
    const direct = {
      shift_key: x.shift_key || '',
      cashier_key: x.cashier_key || '',
      shift_kind: x.shift_kind || '',
    };
    if (direct.shift_key || direct.cashier_key || direct.shift_kind) return direct;
    const raw = String(x.note || '');
    const at = raw.indexOf(EXP_MARK);
    if (at < 0) return direct;
    const encoded = raw.slice(at + EXP_MARK.length).trim();
    try {
      const parsed = JSON.parse(decodeURIComponent(encoded));
      return {
        shift_key: parsed.shift_key || '',
        cashier_key: parsed.cashier_key || '',
        shift_kind: parsed.shift_kind || '',
      };
    } catch (e) { return direct; }
  };
  window.alfaExpenseNoteText = function (expense) {
    const raw = String((expense && expense.note) || '');
    const at = raw.indexOf(EXP_MARK);
    return (at < 0 ? raw : raw.slice(0, at)).replace(/\s+$/, '');
  };
  window.alfaExpenseNoteWithMeta = function (text, meta) {
    const clean = String(text || '').replace(/\s+$/, '');
    const m = meta || {};
    const payload = encodeURIComponent(JSON.stringify({
      shift_key: m.shift_key || '', cashier_key: m.cashier_key || '', shift_kind: m.shift_kind || '',
    }));
    return clean + (clean ? '\\n' : '') + EXP_MARK + payload;
  };
  window.alfaExpenseShiftKey = function (expense) {
    return String((window.alfaExpenseMeta(expense) || {}).shift_key || '');
  };
  window.alfaExpenseMatchesShift = function (expense, shiftKey, date, shiftKind, cashierKey) {
    const meta = window.alfaExpenseMeta(expense);
    const wanted = String(shiftKey || '');
    if (meta.shift_key) return !wanted || meta.shift_key === wanted;
    /* المصروفات القديمة بلا حامل تُعرض مرة واحدة في يومها، ولا تُنسخ
       إلى ورديتين. عند وجود كاشير/نوع محفوظ نستخدمه كقيد إضافي. */
    if (date && String(expense && expense.date || '').slice(0, 10) !== String(date).slice(0, 10)) return false;
    if (meta.cashier_key && cashierKey && meta.cashier_key !== cashierKey) return false;
    if (meta.shift_kind && shiftKind && meta.shift_kind !== shiftKind) return false;
    return true;
  };
})();
