const DATA = window.DEMO_DATA;

/* حالة وسم تحصيل الفواتير من شاشة الكاشير — مستقلة عن الطباعة */
let cashierPaymentInvoiceNo = '';

let activeCategoryId = null;
let sandwichPage = 0;
function isSandwichCategory(){ const c=(DATA.categories||[]).find(x=>x.id===activeCategoryId); return !!(c && /سندويش|ساندويتش|sandwich/i.test(String(c.name||''))); }
let activeFamily = null;
const POS_MODES = [
  { id: 'buttons',  label: 'أزرر' },
  { id: 'direct',   label: 'مباشر' },
  { id: 'dropdown', label: 'منسدل' },
  /* نمط الأزرار السريعة: مربع ملاحظات واقتراحات + أزرار بعمودين */
  { id: 'quick',    label: 'أزرار سريعة' },
];
/* شاشة البيع تعتمد النمط السريع فقط — لا يوجد تبديل لأنماط الأزرار. */
let displayMode = 'quick';
let searchOpen = false;
let searchTerm = '';
let orderType = 'takeaway';
/* الخدمات سطور عادية داخل الفاتورة، وليست اختياراً لطاولة فعلية.
   خدمة التوصيل تبقى قادرة على جعل الطلب «توصيل» كي يظهر في شاشة التوصيل،
   أما خدمة الطاولة/الصالة فلا تحوّل الطلب إلى «dinein» ولا تطلب صالة أو رقماً.
   الصالة والطاولة اختياريتان فقط إن أراد الكاشير تسجيلهما. */
let serviceTypeAuto = false;
function applyServiceOrderType(preferred) {
  const hasDelivery = !!serviceSelected.delivery;
  const hasTable = !!serviceSelected.table;
  if (preferred === 'delivery' && hasDelivery) {
    orderType = 'delivery'; serviceTypeAuto = true; return;
  }
  if (hasDelivery) {
    orderType = 'delivery'; serviceTypeAuto = true; return;
  }
  if (hasTable || serviceSelected.hall) {
    /* خدمة الطاولة/الصالة لا تعني وجود طاولة جلوس. لا نغيّر نوع الطلب
       من سفري إلى dinein، ولا نُجبر الكاشير على اختيار صالة أو طاولة. */
    if (serviceTypeAuto && (orderType === 'dinein' || orderType === 'delivery')) orderType = 'takeaway';
    serviceTypeAuto = true;
    return;
  }
  if (serviceTypeAuto) {
    orderType = 'takeaway'; serviceTypeAuto = false;
  }
}
function onlinePendingCount(){ return (DATA.online_orders||[]).filter(o=>o.status==='new').length; }
let selectedTable = '';
let selectedHall = 'صالة داخلية';
let deliveryInfo = { name: '', phone: '', address: '' };
let orderNotes = '';
function isWeightItem(it){
  if (!it) return false;
  /* بعض الأصناف الحية تُسمّى «شاورما بالكيلو»، وأخرى «كيلو سمك طاولة»؛
     لذلك لا نعتمد على ترتيب ثابت للكلمات ولا على name وحده. */
  const text = [it.name, it.base_name, it.variant, it.variant_clean, it.family, it.option_name]
    .filter(Boolean).join(' ').toLocaleLowerCase();
  return /(كيلو|كغ|kg)/i.test(text) && /(شاورما|سمك|shawarma|fish)/i.test(text);
}
function parseDeliveryText(text) {
  const raw = String(text || '').trim();
  const m = raw.match(/(?:\+?\d[\d\s-]{6,}\d)/);
  /* لا نورّث هاتفاً أو عنواناً من زبون سابق: إن لم يكتب الكاشير رقماً في
     هذا السطر فالحقل فارغ، لا بيانات آخر زبون. التوريث هنا كان يجعل
     كل زبون جديد يرث هاتف و عنوان من سبقه بمجرد كتابة اسمه فقط. */
  if (!m) return { name: raw, phone: '', address: '' };
  const phone = m[0].replace(/[\s-]/g, '');
  const before = raw.slice(0, m.index).trim();
  const after = raw.slice(m.index + m[0].length).trim();
  return { name: before, phone: phone, address: after };
}
/* البحث عن زبون محفوظ — يُستدعى فقط بفعل صريح من الكاشير (زر ✦)،
   لا تلقائياً أثناء الكتابة. */
function findDeliveryCustomer(text) {
  const q = String(text || '').trim().toLowerCase();
  if (q.length < 2) return null;
  const digits = q.replace(/\D/g, '');
  return (DATA.customers || []).find(c => {
    const n  = String(c.name  || '').trim().toLowerCase();
    const ph = String(c.phone || '').replace(/\D/g, '');
    return (n && (n === q || n.startsWith(q)))
        || (digits.length >= 5 && ph.endsWith(digits));
  }) || null;
}
let calcOpen = false;
let calcPaid = '';
let directAuxModal = null;
let posEmbed = null;
let pendingItemId = null;

/* ── العقود ── */
let selectedContractId = null;

/* 📌 سقف الذمة: معلومات ائتمان عميل العقد */
function contractCreditInfo(conId){
  const c = (window.DEMO_DATA.contracts||[]).find(x => x.id === conId);
  if (!c) return null;
  const cust = ((window.DEMO_DATA.customers)||[]).find(u => u.id === c.customer_id);
  const unpaid = (c.installments||[]).filter(i=>!i.paid).reduce((s,i)=>s+(i.amount||0),0);
  const limit = (cust && cust.credit_limit) || 0;
  const balance = cust && cust.credit_balance != null ? cust.credit_balance : unpaid;
  const nextDue = (cust && cust.next_due_date)
    || ((c.installments||[]).find(i=>!i.paid)||{}).due_date || '';
  return { con: c, cust, limit, balance, avail: limit - balance, nextDue, unpaid };
}
function creditState(info, orderTotal){
  if (!info || !info.limit) return null;
  const after = info.balance + orderTotal;
  return { after, over: after > info.limit, near: after >= info.limit * 0.8 && after <= info.limit };
}
let contractSearchTerm = '';

/* ── طريقة الدفع ── */
let payMethod     = 'cash';          // cash | wallet | deferred (partial مؤجل)
let walletRef     = '';              // رقم عملية المحفظة
let partialAmount = '';              // المبلغ المدفوع جزئياً
let deferredMode  = 'manual';        // manual | contract  (عند اختيار آجل)
let deferredName  = '';
let deferredPhone = '';
let deferredAddr  = '';

/* ── الإدخال الصوتي ── */
let voiceActive   = false;
let voiceRecog    = null;
let pendingNoteItemId = null;
/* pos: آخر صنف أُضيف للسلة = هدف «ملاحظات الصنف» السريعة */
let lastAddedId = null;
/* pos: مربع الكتابة السريعة مخصص للملاحظات فقط؛ لا يحوّل النص إلى بحث. */
let quickFilter = '';
/* فلتر العائلة السريع: محصور بالسندويشات/الغربي والبطاطا. */
let quickFamilyFilter = '';
const QUICK_ITALIAN_FILTER = '__italian__';
/* pos: سجل الكتابات السابقة — خيارات سريعة تحت المربع */
const NOTE_HIST_KEY = 'alfaprosys_note_hist';
let noteHist = null;
let qtyEditId = null;   // تعديل الكمية بالنقر على خانة العدد
let qtyEditBuf = '';
const NOTE_SUGGESTIONS = ['ملح خفيف','بدون ملح','حار زيادة','بدون حار','ثوم زيادة','بدون ثوم','بدون خس','خس زيادة','بدون مخلل','مخلل زيادة','بدون فطر','بطاطا زيادة','صوص زيادة','مايونيز زيادة','بدون مايونيز'];
let cart = [];

/* ── آخر فاتورة صدرت: تبقى معروضة في أعلى لوحة الفاتورة بعد الطباعة ──
   كان كل شيء يختفي فور الطباعة، فإن سلّم الكاشير الوصل للزبون نسي قيمته.
   تُحفظ في الجهاز فتبقى حتى بعد إغلاق الصفحة، وتُستبدل مع الفاتورة التالية. */
const LAST_SALE_KEY = 'alfaprosys_last_sale';
let lastSale = null;
try { lastSale = JSON.parse(localStorage.getItem(LAST_SALE_KEY) || 'null'); } catch (e) { lastSale = null; }
function saveLastSale(label, total, type) {
  lastSale = { label: String(label || ''), total: Number(total) || 0, type: type || '', at: Date.now() };
  try { localStorage.setItem(LAST_SALE_KEY, JSON.stringify(lastSale)); } catch (e) {}
}
function clearLastSale() { lastSale = null; try { localStorage.removeItem(LAST_SALE_KEY); } catch (e) {} }
function timeHM(ts) {
  try { const d = new Date(ts); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); } catch (e) { return ''; }
}

/* ── خدمات الطلب (طاولة / توصيل) — قيم اختيارية تُضاف فوق الصافي ── */
let orderServices = { table: 0, delivery: 0, hall: 0 };
let serviceSelected = { table: false, delivery: false, hall: false };
/* ملاحظات الخدمات نفسها، حتى تتعامل معها شاشة البيع كسطور أصناف كاملة. */
let serviceNotes = { table: '', delivery: '', hall: '' };
let servicesOpen = false;
function serviceKeyFromId(id) {
  if (id === 'service_table') return 'table';
  if (id === 'service_delivery') return 'delivery';
  if (id === 'service_hall') return 'hall';
  return '';
}
function selectedServiceKey() {
  const key = serviceKeyFromId(directSelectedId);
  return key && serviceSelected[key] ? key : '';
}
function serviceRowForId(id) {
  const key = serviceKeyFromId(id);
  if (!key || !serviceSelected[key]) return null;
  const defs = { table: 'خدمة طاولة', delivery: 'خدمة توصيل', hall: 'خدمة صالة' };
  return { id: 'service_' + key, name: defs[key], qty: 1, price: Number(orderServices[key]) || 0, note: String(serviceNotes[key] || ''), is_service: true };
}
function servicesTotal() {
  return (Number(orderServices.table) || 0)
    + (Number(orderServices.delivery) || 0)
    + (Number(orderServices.hall) || 0);
}
const QUICK_SERVICE_DEFS = [
  { key: 'delivery', id: 'service_delivery', icon: '🛵', name: 'خدمة توصيل', bg: '#F6C453', bd: '#D99A00' },
  { key: 'table', id: 'service_table', icon: '🍽️', name: 'خدمة طاولة', bg: '#8DC9F3', bd: '#3B82C4' },
  { key: 'hall', id: 'service_hall', icon: '🛋️', name: 'خدمة صالة', bg: '#92D7A0', bd: '#3F9A59' },
];
function quickServiceDef(key) { return QUICK_SERVICE_DEFS.find(s => s.key === key) || null; }
function hasOrderLines() {
  return cart.length > 0 || Object.keys(serviceSelected).some(k => !!serviceSelected[k]);
}
function grandWithServices(sub, disc) {
  return Math.max(0, sub - disc) + servicesTotal();
}

/* ── ألوان عائلات قسم السندويشات والغربي (لون مميز لكل عائلة) ── */
const FAMILY_COLORS = [
  { bg: '#FEF3C7', bd: '#D97706' },  // كهرماني
  { bg: '#DBEAFE', bd: '#2563EB' },  // أزرق
  { bg: '#DCFCE7', bd: '#16A34A' },  // أخضر
  { bg: '#FCE7F3', bd: '#DB2777' },  // وردي
  { bg: '#EDE9FE', bd: '#7C3AED' },  // بنفسجي
  { bg: '#FFEDD5', bd: '#EA580C' },  // برتقالي
  { bg: '#D1FAE5', bd: '#059669' },  // زمردي
  { bg: '#E0F2FE', bd: '#0284C7' },  // سماوي
  { bg: '#FAE8FF', bd: '#A21CAF' },  // فوشي
  { bg: '#FEF9C3', bd: '#CA8A04' },  // أصفر
  { bg: '#FFE4E6', bd: '#E11D48' },  // أحمر وردي
  { bg: '#CCFBF1', bd: '#0D9488' },  // فيروزي
  { bg: '#E0E7FF', bd: '#4F46E5' },  // نيلي
  { bg: '#ECFCCB', bd: '#65A30D' },  // ليموني
  { bg: '#F3E8FF', bd: '#9333EA' },  // أرجواني
  { bg: '#E2E8F0', bd: '#475569' },  // رمادي مزرق
];
let _westCatCache = null;
function westernCatIds() {
  if (!_westCatCache) {
    _westCatCache = new Set((DATA.categories || [])
      .filter(c => c.id === 'cat_western' || /غربي/.test(String(c.name || '')))
      .map(c => c.id));
  }
  return _westCatCache;
}
/* العائلة الأساسية: المتغيرات تُعامل كعائلتها الأم (طلب العميل):
   «كريسبي وجبنة» = كريسبي، «شيش مع جبنة» = شيش، وكل البرغر = برغر */
function baseFamily(fam) {
  const s = String(fam || '').trim();
  if (!s) return s;
  if (s === 'برغر' || s.indexOf('برغر ') === 0) return 'برغر';
  const m = s.match(/^(.*?)\s+(?:وجبنة|مع جبنة|بالجبنة|جبنة)$/);
  if (m && m[1].trim()) return m[1].trim();
  return s;
}
function westernBaseFamilies() {
  const ids = westernCatIds();
  const fams = [];
  (DATA.items || []).forEach(i => {
    if (!ids.has(i.category_id)) return;
    const b = baseFamily(i.family) || i.family;
    if (b && !fams.includes(b)) fams.push(b);
  });
  return fams.sort((a, b) => String(a).localeCompare(String(b), 'ar'));
}
function familyColor(fam) {
  const base = baseFamily(fam) || fam;
  const fams = westernBaseFamilies();
  let idx = fams.indexOf(base);
  if (idx < 0) { /* احتياط: توزيع ثابت بالهاش */
    const s = String(base || '');
    idx = 0;
    for (let k = 0; k < s.length; k++) idx = (idx * 31 + s.charCodeAt(k)) >>> 0;
    idx %= FAMILY_COLORS.length;
  }
  return FAMILY_COLORS[idx % FAMILY_COLORS.length];
}
function isWesternItem(it) { return !!(it && westernCatIds().has(it.category_id)); }
function famCardStyle(fam, isActive) {
  if (isActive) return '';
  const c = familyColor(fam);
  return `background:linear-gradient(180deg,#ffffff,${c.bg});border:2px solid ${c.bd};color:#0f172a;`;
}
function famTitleStyle(fam) {
  const c = familyColor(fam);
  return `color:${c.bd};border-inline-start:5px solid ${c.bd};padding-inline-start:8px;`;
}
function famItemStyle(it) {
  if (!isWesternItem(it)) return '';
  const c = familyColor(it.family);
  return `background:linear-gradient(180deg,#ffffff,${c.bg});border:2px solid ${c.bd};box-shadow:0 2px 8px ${c.bd}44;`;
}

/* ألوان quick صلبة فعلياً: اللون يغطي كامل مساحة الزر، بلا تدرج
   أو rgba أو opacity. الدرجات فاتحة/متوسطة حتى تبقى القراءة واضحة
   ولا تتحول أزرار الأصناف إلى ألوان داكنة. */
const QUICK_SOLID_COLORS = [
  { bg: '#F6C453', bd: '#D99A00' }, { bg: '#8DC9F3', bd: '#3B82C4' },
  { bg: '#92D7A0', bd: '#3F9A59' }, { bg: '#F3A7C3', bd: '#C94F7C' },
  { bg: '#C2A6E8', bd: '#7B4BB2' }, { bg: '#7DD3C7', bd: '#268F86' },
  { bg: '#F4E36C', bd: '#B89A00' }, { bg: '#B8C4CF', bd: '#667789' },
  { bg: '#7FD1F5', bd: '#2587B5' }, { bg: '#D2B6EE', bd: '#8050A8' },
];
function quickItemStyle(it) {
  const key = String((it && (it.family || it.category_id)) || (it && it.id) || 'item');
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  const c = QUICK_SOLID_COLORS[hash % QUICK_SOLID_COLORS.length];
  return `background:${c.bg} !important;background-color:${c.bg} !important;background-image:none !important;border:2px solid ${c.bd};color:#1e293b;`;
}
/* الخصم تلقائي بالكامل من إعدادات المدير — لا تدخل للكاشير */

/* ── بطاقات القسم الأيمن: الأكثر طلباً / العروض / الخصومات ── */
let cardsVisible = true;
let cardsModalTab = null; // null = مغلقة | 'top' = الأكثر طلباً | 'offers' = العروض (نمط مباشر فقط)
try { cardsVisible = localStorage.getItem('alfaprosys_cards') !== 'hidden'; } catch (e) {}
function todayStr() { const d = new Date(); const p = n => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
function menuIsLive() {
  const id = String((DATA.items && DATA.items[0] && DATA.items[0].id) || '');
  return /^[0-9a-f]{8}-/i.test(id);
}
function offerHasOnlyAvailableItems(o) {
  const lines = (o && o.items) || [];
  if (!lines.length) return false;
  return lines.every(line => {
    const item = (DATA.items || []).find(i => i.id === line.item_id);
    /* لا نعرض عرضاً ناقصاً: مكوّن موقوف/محذوف يعني أن العرض نفسه
       غير صالح للبيع، بدلاً من إظهار اسم أو إضافة جزء من العرض فقط. */
    return !!item && isMenuItemAvailable(item);
  });
}
function activeOffers() {
  const live = menuIsLive();
  return (DATA.offers || []).filter(o => {
    if (live && /^ofr_/.test(String(o.id || ''))) return false;
    return o.active !== false
      && (!o.expires_at || o.expires_at >= todayStr())
      && offerHasOnlyAvailableItems(o);
  });
}
function topSoldItems(n = 3) {
  const score = {};
  (DATA.items || []).forEach(i => { score[i.id] = { item: i, n: (i.order_count || 0) + (i.is_pinned_popular ? 50 : 0) }; });
  (DATA.invoices || []).forEach(inv => (inv.items || []).forEach(it => {
    if (score[it.id]) score[it.id].n += (it.qty || 0) * 10;   // كل بيع فعلي أثقل من العدّاد
  }));
  return Object.values(score)
    .filter(x => isMenuItemAvailable(x.item))
    .sort((a, b) => b.n - a.n)
    .slice(0, n)
    .map(x => x.item);
}
function itemNet(itemOrCartRow) {
  const gross = Number(itemOrCartRow.price) || 0;
  const id = itemOrCartRow.id;
  const r = itemDiscRule(id);
  return r ? Math.round(gross * (1 - r.pct / 100)) : gross;
}
function rowWeightGrams(row) {
  const g = Number(row && row.weight_grams) || 0;
  return g > 0 ? Math.round(g) : 0;
}
function rowWeightLabel(row) {
  const g = rowWeightGrams(row);
  return g ? String(row.weight_label || `${g} غرام`) : '';
}
function rowGrossAmount(row) {
  const g = rowWeightGrams(row);
  return g ? Math.round((Number(row.price) || 0) * g / 1000) : (Number(row.price) || 0) * (Number(row.qty) || 0);
}
function rowDisplayPrice(row) {
  const g = rowWeightGrams(row);
  return g ? Math.round((Number(row.price) || 0) * g / 1000) : (Number(row.price) || 0);
}
function rowInvoiceNameHtml(row) {
  const weight = rowWeightLabel(row);
  const live = (DATA.items || []).find(function (it) { return it && String(it.id) === String(row && row.id); });
  const label = live ? saleItemName(live) : collapsePosLabel(row && row.name);
  return `${escapeHtml(label)}${weight ? ` <span class="item-weight-label">(${escapeHtml(weight)})</span>` : ''}`;
}
function rowInvoiceQtyText(row) {
  return rowWeightLabel(row) || fmtNum(row.qty);
}
let heldOrders = [];
let heldSeq = 1;

/* ── النمط المباشر (تنسيق مطوّر بأسلوب برامج المحاسبة) ── */
let directSelectedId = null;   // الصف المحدد في جدول الفاتورة
let quickWeightItemId = null;  // صنف الكيلو المحدد في لوحة النمط السريع
let padMode = 'qty';           // qty | note
let padBuf = '';

/* إعداد مستقل لعدد أزرار الأصناف في الصفحة؛ الأكثر طلباً يبقى ثابتاً (16). */
const ITEM_PAGE_SIZES = [16, 20];
let itemPageSize = 20;
try {
  const savedPageSize = Number(localStorage.getItem('alfaprosys_item_page_size'));
  if (ITEM_PAGE_SIZES.includes(savedPageSize)) itemPageSize = savedPageSize;
} catch (e) {}

/* أوزان الاختيار: من 50 غ حتى 1500 غ، بزيادة ثابتة مقدارها 50 غ. */
const WEIGHT_OPTIONS = Array.from({length: 30}, (_, i) => (i + 1) * 50);

function renderItemPageSizeButton() {
  return `<button class="ot-btn ot-big item-page-size-btn" type="button" data-action="toggle-item-page-size" title="عدد أزرار الأصناف في الصفحة — اضغط للتبديل بين 16 و20">🔢 ${itemPageSize} زر</button>`;
}
function toggleItemPageSize() {
  itemPageSize = itemPageSize === 16 ? 20 : 16;
  sandwichPage = 0;
  try { localStorage.setItem('alfaprosys_item_page_size', String(itemPageSize)); } catch (e) {}
  closeCashierNav();
  showToast(`عدد أزرار الأصناف في الصفحة: ${itemPageSize}`, '🔢');
  renderPOS();
}

/* ── عرض العملة: الزر يبدّل العرض فقط (÷100) — البيانات تبقى بالعملة القديمة ── */
let currencyNew = false;
try { currencyNew = localStorage.getItem('alfaprosys_currency') === 'new'; } catch (e) {}
function fmtCur(n) { return fmtNum(currencyNew ? (Number(n || 0) / 100) : n); }
function toggleCurrency() {
  currencyNew = !currencyNew;
  try { localStorage.setItem('alfaprosys_currency', currencyNew ? 'new' : 'old'); } catch (e) {}
  closeCashierNav();
  showToast(currencyNew ? 'العرض بالعملة الجديدة (بدون صفرين)' : 'العرض بالعملة القديمة', '💱');
  renderPOS();
}
/* ── مسودة الفاتورة: حفظ تلقائي + استعادة بعد أي انقطاع + حارس الخروج ── */
const DRAFT_KEY = 'alfaprosys_pos_draft';
const POS_BUILD = 'b72';   /* نسخة كود الكاشير — النقر يحدد السطر ولا يفتح الملاحظات */
let leaveModalOpen = false;
let leaveTargetUrl = null;
function saveDraft() {
  try {
    if (!hasOrderLines() && !heldOrders.length) { localStorage.removeItem(DRAFT_KEY); return; }
    localStorage.setItem(DRAFT_KEY, JSON.stringify({
      cart, heldOrders, orderType, serviceTypeAuto, selectedHall, selectedTable, deliveryInfo, payMethod, orderServices, serviceSelected, serviceNotes, orderNotes, savedAt: Date.now(),
    }));
  } catch (e) {}
}
function restoreDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return false;
    const d = JSON.parse(raw);
    if (!d) { localStorage.removeItem(DRAFT_KEY); return false; }
    const draftHasServices = d.serviceSelected && Object.keys(d.serviceSelected).some(k => !!d.serviceSelected[k]);
    if (!(d.cart || []).length && !(d.heldOrders || []).length && !draftHasServices) { localStorage.removeItem(DRAFT_KEY); return false; }
    cart = d.cart || [];
    heldOrders = d.heldOrders || [];
    heldSeq = heldOrders.reduce((m, h) => Math.max(m, Number(h.id) || 0), 0) + 1;
    if (d.orderType) orderType = d.orderType;
    if (d.selectedHall) selectedHall = d.selectedHall;
    if (d.selectedTable) selectedTable = d.selectedTable;
    if (d.deliveryInfo) deliveryInfo = d.deliveryInfo;
    if (d.payMethod) payMethod = d.payMethod === 'partial' ? 'deferred' : d.payMethod;
    if (d.orderServices) orderServices = { table: Number(d.orderServices.table) || 0, delivery: Number(d.orderServices.delivery) || 0, hall: Number(d.orderServices.hall) || 0 };
    if (d.serviceSelected) serviceSelected = { table: !!d.serviceSelected.table, delivery: !!d.serviceSelected.delivery, hall: !!d.serviceSelected.hall };
    else serviceSelected = { table: orderServices.table > 0, delivery: orderServices.delivery > 0, hall: orderServices.hall > 0 };
    if (d.serviceNotes) serviceNotes = { table: String(d.serviceNotes.table || ''), delivery: String(d.serviceNotes.delivery || ''), hall: String(d.serviceNotes.hall || '') };
    else serviceNotes = { table: '', delivery: '', hall: '' };
    serviceTypeAuto = d.serviceTypeAuto === true;
    applyServiceOrderType();
    if (d.orderNotes != null) orderNotes = String(d.orderNotes || '');
    return true;
  } catch (e) { return false; }
}
function posDirty() { return !!(hasOrderLines() || heldOrders.length); }
function openPosScreen(url, title) {
  /* الأونلاين يجب أن يفتح داخل شاشة البيع دائماً حتى تطبع الطلبات من نفس مسار POS. */
  if (String(url || '').indexOf('online_orders.html') >= 0) {
    posEmbed = { url, title: title || url };
    return renderPOS();
  }
  if (displayMode === 'direct') {
    /* ════════════════════════════════════════════════════════
       الإطار (iframe) مستند مستقل بنافذته وبياناته الخاصة:
       يعيد تحميل التطبيق من الصفر، فتظهر الشاشة فارغة حتى
       يكتمل سحبها — وتُظهر «جديدة ٠» إن بطؤ الاتصال، بينما
       شاشة البيع ترى الطلبات فعلاً (ولذلك يومض الزر ولا يظهر
       شيء عند فتحه).
       إن كانت الفاتورة فارغة فالانتقال المباشر أوثق وأسرع.
       ════════════════════════════════════════════════════════ */
    if (!cart.length) return guardLeave(url);
    posEmbed = { url, title: title || url };
    return renderPOS();
  }
  return guardLeave(url);
}
function closePosEmbed() { posEmbed = null; renderPOS(); }
function renderPosEmbed() {
  if (!posEmbed) return '';
  return `
    <div class="d-embed-scrim" data-action="close-pos-embed"></div>
    <div class="d-embed-modal" role="dialog" aria-label="${escapeHtml(posEmbed.title)}">
      <div class="d-embed-head"><strong>${escapeHtml(posEmbed.title)}</strong><button type="button" data-action="close-pos-embed">✕</button></div>
      <iframe class="d-embed-frame" src="${escapeHtml(posEmbed.url)}" title="${escapeHtml(posEmbed.title)}" onload="wireEmbedData(this)"></iframe>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════
   تمرير البيانات الجاهزة إلى الشاشة المدمجة
   ──────────────────────────────────────────────────────────────
   الإطار مستند مستقل يعيد سحب بياناته من الصفر، فتظهر شاشة
   الطلبات فارغة («جديدة ٠») رغم أن نقطة البيع ترى الطلبات فعلاً
   (ولذلك يومض الزر). نحقن ما لدينا ونطلب إعادة الرسم فوراً.
   ══════════════════════════════════════════════════════════════ */
function wireEmbedData(fr) {
  try {
    var w = fr.contentWindow;
    if (!w || !w.DEMO_DATA) return;
    var mine = DATA.online_orders || [];
    var local = w.DEMO_DATA.online_orders || [];
    /* ادمج مع حفظ ترحيل الحالة (done/rejected لا يعود new) */
    if (window.alfaMergeOnlineOrders) {
      w.DEMO_DATA.online_orders = window.alfaMergeOnlineOrders(local, mine);
    } else {
      var byId = {};
      local.forEach(function (o) { if (o && o.id) byId[String(o.id)] = o; });
      mine.forEach(function (o) {
        if (!o || !o.id) return;
        var id = String(o.id), cur = byId[id];
        if (!cur) { byId[id] = o; return; }
        if ((cur.status === 'done' || cur.status === 'rejected') && o.status === 'new') return;
        if ((o.status === 'done' || o.status === 'rejected') && cur.status === 'new') { byId[id] = o; return; }
        byId[id] = Object.assign({}, cur, o);
      });
      w.DEMO_DATA.online_orders = Object.keys(byId).map(function (k) { return byId[k]; });
    }
    if (w.__ooRender) { try { w.__ooRender(); } catch (e) {} }
  } catch (e) { /* نطاق مختلف origin — نتجاهل */ }
}
window.wireEmbedData = wireEmbedData;

function guardLeave(url) {
  if (!posDirty()) { window.location.href = url; return; }
  leaveTargetUrl = url;
  leaveModalOpen = true;
  renderPOS();
}
function closeLeaveModal() { leaveModalOpen = false; leaveTargetUrl = null; renderPOS(); }
function confirmLeave() {
  const u = leaveTargetUrl;
  leaveModalOpen = false;
  leaveTargetUrl = null;
  if (u) window.location.href = u;
}
function renderLeaveModal() {
  if (!leaveModalOpen) return '';
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0) - discountParts().total;
  const held = heldOrders.length;
  return `
    <div class="leave-scrim show" data-action="close-leave"></div>
    <div class="leave-modal open" role="alertdialog" aria-label="تحذير خروج">
      <div class="leave-icon">⚠️</div>
      <div class="leave-title">توجد فاتورة غير مكتملة</div>
      <div class="leave-info">
        ${cart.length ? `${fmtNum(cart.reduce((s, x) => s + x.qty, 0))} صنف · الإجمالي ${fmtCur(Math.max(0, total))} ل.س` : ''}
        ${cart.length && held ? '<br>' : ''}
        ${held ? `📌 و${fmtNum(held)} طلب معلّق لم يُحفظ` : ''}
      </div>
      <div class="leave-note">المسودة محفوظة تلقائياً وستُستعاد عند العودة — لكن الخروج الآن يوقف الطلب الجاري</div>
      <div class="leave-actions">
        <button class="leave-stay" type="button" data-action="close-leave">البقاء ومتابعة الطلب</button>
        <button class="leave-go" type="button" data-action="confirm-leave">متابعة الخروج</button>
      </div>
    </div>`;
}
/* حارس الروابط داخل الشاشة (خريطة الطاولات، الأونلاين...) */
document.addEventListener('click', function (e) {
  const a = e.target.closest && e.target.closest('a[href]');
  if (!a || !posDirty()) return;
  const href = a.getAttribute('href') || '';
  if (!/\.html(\?|$)/.test(href) || href.startsWith('http')) return;
  e.preventDefault();
  leaveTargetUrl = href;
  leaveModalOpen = true;
  renderPOS();
});
/* حوار المتصفح الأصلي عند التحديث أو الإغلاق */
window.addEventListener('beforeunload', function (e) {
  saveDraft();
  if (posDirty()) { e.preventDefault(); e.returnValue = ''; }
});
window.addEventListener('pagehide', saveDraft);

/* ── الخصم التلقائي من إعدادات المدير ──
   - خصم صنف: يُطبق تلقائياً متى وُجد الصنف في الفاتورة (ونسبته تظهر بجانبه)
   - خصم الفاتورة: نسبة واحدة من الإدارة تُطبق تلقائياً على كل فاتورة */
function discSettings(){
  const d = DATA.discount_settings = DATA.discount_settings || {};
  if (d.invoice_pct == null) d.invoice_pct = (d.invoice && d.invoice.percents && d.invoice.percents.length) ? 0 : 0;
  d.items = d.items || [];
  if (menuIsLive()) d.items = d.items.filter(r => !/^item_/.test(String(r.item_id || '')));
  return d;
}
function invDiscPct(){ return Number(discSettings().invoice_pct) || 0; }
function itemDiscRule(id){ return (discSettings().items||[]).find(r => r.item_id === id) || null; }
function discountParts(){
  const sub = cart.reduce((s, x) => s + x.price * x.qty, 0);   // يشمل سطر خصم العرض (سالب)
  let offerNet = 0, itemPart = 0;
  cart.forEach(c => {
    if (c.offer_id) { offerNet += c.price * c.qty; return; }   // العروض بسعر نهائي — لا خصومات فوقها
    const r = itemDiscRule(c.id);
    if (r) itemPart += Math.round(c.price * c.qty * r.pct / 100);
  });
  const base = Math.max(0, sub - offerNet - itemPart);          // نسبة الفاتورة على غير العروض فقط
  const invPart = Math.round(base * invDiscPct() / 100);
  return { sub, offerNet, itemPart, invPart, total: itemPart + invPart };
}
function cartDiscountLines(){ return cart.filter(c => !c.locked && itemDiscRule(c.id)); }
function uniq(arr) { return [...new Set(arr.filter(Boolean))]; }
function bySort(a,b){ return (window.alfaItemOrder ? alfaItemOrder(a) : (a.sort_order || 0)) - (window.alfaItemOrder ? alfaItemOrder(b) : (b.sort_order || 0)); }
function backToLogin() {
  try { sessionStorage.removeItem('alfaprosys_role'); } catch (e) {}
  const go = function () { window.location.replace('index.html?alfa_build=173'); };
  /* pos.html لا يملك appShell الخاص بصفحة الدخول؛ لذلك لا نستدعي
     logout() من app.js. نمسح جلسة الخادم صراحةً ثم ننتقل للدخول. */
  if (window.location.protocol === 'file:' || typeof fetch !== 'function') return go();
  let settled = false;
  const finish = function () { if (settled) return; settled = true; go(); };
  try {
    fetch('/__auth/logout', { method: 'POST', credentials: 'same-origin', cache: 'no-store', keepalive: true })
      .catch(function () {})
      .then(finish);
    setTimeout(finish, 1500);
  } catch (e) { finish(); }
}

/* ── الباركود: الماسح يتصرف كلوحة مفاتيح (أرقام ثم Enter) ── */
let barcodeBuf = '';
let barcodeTimer = null;
function lookupBarcode(code) {
  const code_ = String(code || '').trim();
  if (!code_) return;
  const item = DATA.items.find(i => i.barcode === code_ && isMenuItemAvailable(i));
  if (item) {
    addToCart(item.id, 1);
    showToast(isWeightItem(item) ? `اختر وزن: ${saleItemName(item)}` : `أُضيف: ${saleItemName(item)}`, isWeightItem(item) ? '⚖️' : '📷');
  } else showToast('باركود غير معروف: ' + code_, '⚠️');
}
document.addEventListener('keydown', function (e) {
  // حقل الباركود: Enter = بحث وإضافة مباشرة
  const bInput = e.target && e.target.id === 'barcodeInput';
  if (bInput && e.key === 'Enter') {
    e.preventDefault();
    lookupBarcode(e.target.value);
    e.target.value = '';
    return;
  }
  const t = e.target;
  if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
  if (/^\d$/.test(e.key)) {
    barcodeBuf += e.key;
    clearTimeout(barcodeTimer);
    barcodeTimer = setTimeout(function () { barcodeBuf = ''; }, 220);
  } else if (e.key === 'Enter' && barcodeBuf.length >= 4) {
    lookupBarcode(barcodeBuf);
    barcodeBuf = '';
  } else if (e.key.length === 1) {
    barcodeBuf = '';
  }
});

/* رقم الفاتورة القادم (نظام الترقيم اليومي: يبدأ 001 ويتجدد 8 صباحاً) */
function nextInvoiceLabel() {
  /* نظرة فقط — رقم الطباعة المستمر القادم بلا أصفار بادئة */
  if (window.nextPrintNo) return String(window.nextPrintNo(true));
  if (window.nextDailyNo && window.displayInvoiceNo) return window.displayInvoiceNo(window.nextDailyNo(true));
  return '1';
}
function posModeLabel() {
  const m = POS_MODES.find(x => x.id === displayMode);
  return m ? m.label : 'أزرر';
}

function catItems(catId = activeCategoryId) {
  if (!catId) return [];
  return availableItems(catId).sort(bySort);
}
function families() {
  return uniq(catItems().map(i => i.family));
}
function finalItems() {
  let list = availableItems();
  if (searchTerm.trim()) {
    const q = searchTerm.trim().toLowerCase();
    return list.filter(i => `${i.category_name} ${i.family} ${i.option_name} ${i.variant} ${i.name}`.toLowerCase().includes(q)).sort(bySort);
  }
  if (displayMode === 'quick' && quickFamilyFilter) return quickFamilyItems(quickFamilyFilter);
  if (displayMode === 'direct' && activeCategoryId) return catItems();
  if (!activeCategoryId || !activeFamily) return [];
  return catItems().filter(i => i.family === activeFamily).sort(bySort);
}
function getActiveCategory() {
  return DATA.categories.find(c => c.id === activeCategoryId);
}
function familyLabel(family) {
  // طلب المستخدم: ضمن الشاورما، زر "شاورما" يظهر باسم أوضح
  if (activeCategoryId === 'cat_shawarma' && family === 'شاورما') return 'وجبات وسندويشات';
  return family;
}

/* ── فلاتر العائلات السريعة تحت زر «خدمات» ──
   لا نستخدم قائمة عامة للمنيو: المصدر هنا تصنيف «السندويشات والغربي»
   وتصنيف «بطاطا» فقط. baseFamily يجمع «كريسبي» مع «كريسبي وجبنة»
   و«المكسيكي» مع «المكسيكي وجبنة» كما يطلب تصميم شاشة البيع. */
function quickFilterCategoryKind(item) {
  if (!item) return '';
  if (isWesternItem(item) || /سندويشات?\s*و?\s*الغربي/.test(String(item.category_name || ''))) return 'western';
  const potatoIds = new Set((DATA.categories || [])
    .filter(c => /بطاطا/.test(String(c.name || '')))
    .map(c => String(c.id)));
  if (potatoIds.has(String(item.category_id)) || /بطاطا/.test(String(item.category_name || ''))) return 'potato';
  return '';
}
/* ألوان مستقلة لكل زر فلترة، وليست درجة واحدة لكل تصنيف. */
const QUICK_FILTER_COLORS = [
  { bg: '#FDE68A', bd: '#B45309' }, { bg: '#BFDBFE', bd: '#1D4ED8' },
  { bg: '#BBF7D0', bd: '#15803D' }, { bg: '#FBCFE8', bd: '#BE185D' },
  { bg: '#DDD6FE', bd: '#6D28D9' }, { bg: '#FED7AA', bd: '#C2410C' },
  { bg: '#A7F3D0', bd: '#047857' }, { bg: '#BAE6FD', bd: '#0369A1' },
  { bg: '#E9D5FF', bd: '#7E22CE' }, { bg: '#FEF08A', bd: '#A16207' },
  { bg: '#FECDD3', bd: '#BE123C' }, { bg: '#99F6E4', bd: '#0F766E' },
  { bg: '#C7D2FE', bd: '#4338CA' }, { bg: '#D9F99D', bd: '#4D7C0F' },
];
function quickFamilyRoot(item) {
  const kind = quickFilterCategoryKind(item);
  const raw = String(item && item.family || '').trim();
  if (!raw) return '';
  /* كريسبي برغر، مع أو بدون جبنة/وجبة، زر واحد فقط. نعتمد على اسم
     الصنف أيضاً لأن بعض السجلات القديمة تحمل family=برغر. */
  const searchable = [item.base_name, item.name, item.family, item.option_name]
    .filter(Boolean).join(' ');
  if (kind === 'western' && /كريسبي\s+برغر/.test(searchable)) return 'كريسبي برغر';
  if (kind === 'potato' && /^بطاطا(?:\s|$)/.test(raw)) return 'بطاطا';
  return baseFamily(raw) || raw;
}
function isQuickItalianItem(item) {
  if (!isMenuItemAvailable(item)) return false;
  return String(item && (item.variant_clean || item.variant) || '').trim() === 'إيطالي';
}
function quickItalianItems() {
  return (DATA.items || []).filter(isQuickItalianItem).sort(bySort);
}
function quickFamilyFilterDefs() {
  const defs = [];
  const seen = new Set();
  (DATA.items || []).slice().sort(bySort).forEach(function (item) {
    if (!isMenuItemAvailable(item)) return;
    const kind = quickFilterCategoryKind(item);
    if (!kind) return;
    const family = quickFamilyRoot(item);
    if (!family || seen.has(family)) return;
    seen.add(family);
    defs.push({ family, kind });
  });
  /* السندويشات/الغربي أولاً ثم البطاطا، وتُعرض الأزرار في عمودين
     داخل صندوق الفلاتر حتى تبقى القراءة واضحة داخل العمود الضيق. */
  const ordered = defs.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'western' ? -1 : 1));
  if (quickItalianItems().length) ordered.push({ family: QUICK_ITALIAN_FILTER, kind: 'italian' });
  return ordered;
}
function quickFamilyItems(family) {
  const root = String(family || quickFamilyFilter || '').trim();
  if (!root) return [];
  if (root === QUICK_ITALIAN_FILTER) return quickItalianItems();
  return (DATA.items || []).filter(function (item) {
    return isMenuItemAvailable(item) && quickFilterCategoryKind(item) && quickFamilyRoot(item) === root;
  }).sort(bySort);
}
function renderQuickFamilyFilters() {
  const defs = quickFamilyFilterDefs();
  if (!defs.length) return '';
  return `<section class="quick-family-filter-box" aria-label="فلاتر السندويشات والغربي والبطاطا والإيطالي">
    <div class="quick-family-filter-grid">
      ${defs.map(function (d, index) {
        const on = quickFamilyFilter === d.family;
        const isItalian = d.family === QUICK_ITALIAN_FILTER;
        const color = QUICK_FILTER_COLORS[index % QUICK_FILTER_COLORS.length];
        const label = isItalian ? 'إيطالي' : d.family;
        const title = isItalian
          ? 'عرض كل الوجبات الإيطالية المتاحة'
          : d.family === 'كريسبي'
            ? 'عرض الكريسبي والكريسبي وجبنة'
            : d.family === 'مكسيكي'
              ? 'عرض المكسيكي والمكسيكي وجبنة'
              : d.family === 'كريسبي برغر'
                ? 'عرض كريسبي برغر وكريسبي برغر وجبنة'
                : 'عرض كل أصناف ' + d.family;
        return `<button type="button" class="quick-family-filter-btn ${d.kind} ${on ? 'active' : ''}" data-action="quick-family-filter" data-value="${escapeHtml(d.family)}" title="${escapeHtml(title)}" style="--qf-bg:${color.bg};--qf-bd:${color.bd};">${escapeHtml(label)}</button>`;
      }).join('')}
    </div>
  </section>`;
}
/* تطبيع نصوص شاشة البيع فقط — لا يغيّر السعر أو المعرّف أو أي حقل مخزني.
   يعالج أيضاً السجلات القديمة التي كررت كلمة أو عبارة كاملة داخل الاسم. */
function collapsePosLabel(value) {
  let text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  const same = (a, b) => String(a || '').toLocaleLowerCase() === String(b || '').toLocaleLowerCase();
  /* «سمون دبل سمون دبل» و«دبل دبل» — نختزل عبارة مكررة متجاورة. */
  let words = text.split(' ');
  let changed = true;
  while (changed && words.length > 1) {
    changed = false;
    if (words.length % 2 === 0) {
      const half = words.length / 2;
      let repeated = true;
      for (let i = 0; i < half; i++) {
        if (!same(words[i], words[i + half])) { repeated = false; break; }
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
function itemButtonParts(item) {
  item = item || {};
  const cleanLabel = collapsePosLabel;
  const variant = cleanLabel(item.variant_clean || String(item.variant || '').replace(/ - |-/g, ' '));
  const fullName = cleanLabel(item.name);
  const stripVariantSuffix = (name, v) => {
    const n = cleanLabel(name), lowerN = n.toLocaleLowerCase(), lowerV = cleanLabel(v).toLocaleLowerCase();
    if (!n || !lowerV) return n;
    if (lowerN === lowerV) return '';
    return lowerN.endsWith(' ' + lowerV) ? n.slice(0, n.length - v.length - 1).trim() : n;
  };
  const nameHead = stripVariantSuffix(fullName, variant);
  /* base_name يفترض أن يكون بلا متغير، لكن بعض اللقطات القديمة حفظته
     مركباً؛ نجرّده بالطريقة نفسها قبل تركيب زر البيع. */
  const baseRaw = cleanLabel(item.base_name);
  const base = stripVariantSuffix(baseRaw, variant) || nameHead;
  const family = cleanLabel(item.family);
  const option = cleanLabel(item.option_name);
  /* الأولوية لاسم الصنف الأساسي؛ وعند السحب من السحابة لا يوجد دائماً
     base_name، لذلك نستخرج الأساس من name قبل إضافة المتغير. */
  let head = base || family || option;
  if (!base && option && family && option !== family) head = cleanLabel(`${family} ${option}`);
  if (!head) head = cleanLabel(item.category_name);

  /* بعض السجلات تحمل المتغير كاملاً، مثل «سمون دبل» أو «شراك دبل»،
     مع وجود «سمون» أو «شراك» في الاسم الأساسي. لا نعرض الجزء المشترك مرتين. */
  const trimRepeatedPrefix = (headText, variantText) => {
    const h = cleanLabel(headText), v = cleanLabel(variantText);
    if (!h || !v) return v;
    const hn = h.toLocaleLowerCase(), vn = v.toLocaleLowerCase();
    if (hn === vn) return '';
    if (vn.indexOf(hn + ' ') === 0) return v.slice(h.length).trim();
    return v;
  };
  const norm = value => cleanLabel(value).toLocaleLowerCase();
  const sameAs = value => norm(value) === norm(head);
  const variantAlreadyInHead = variant && (sameAs(variant) || norm(head).endsWith(' ' + norm(variant)));
  const variantSub = (variant && !sameAs(variant) && !variantAlreadyInHead && variant !== family && variant !== option) ? variant : '';
  const sub = trimRepeatedPrefix(head, variantSub);
  const title = cleanLabel([head, sub].filter(Boolean).join(' ')) || fullName || cleanLabel(item.category_name) || '';
  return { head: cleanLabel(head || title), sub: cleanLabel(sub), title };
}
function itemButtonTitle(item) {
  return itemButtonParts(item).title;
}
/* الاسم الذي يدخل سطر الفاتورة: نفس تطبيع زر البيع، مع إبقاء الاسم
   الصحيح للصنف والمتغير دون المساس بالسعر أو المعرّفات. */
function saleItemName(item) {
  if (!item) return '';
  const display = itemButtonTitle(item);
  return collapsePosLabel(display || item.name || item.base_name || '');
}

function cashierMenuRefreshButton() {
  return '<button class="pos-menu-refresh" type="button" data-action="open-menu-refresh" title="تحديث الأصناف والأسعار الآن">↻ تحديث القائمة</button>';
}

function renderPOS() {
  _westCatCache = null;
  /* إن أصبح التصنيف المختار بلا أصناف متاحة (أو أُوقف) نعود لعرض الكل،
     وإلا بقي الكاشير عالقاً على تصنيف فارغ */
  if (activeCategoryId && !sellableCategories().some(c => c.id === activeCategoryId)) {
    activeCategoryId = null;
    activeFamily = null;
  }

  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const count = cart.reduce((s, x) => s + x.qty, 0);
  const items = finalItems();

  if (displayMode === 'direct') return renderDirectPOS(total, count);
  if (displayMode === 'quick') return renderQuickPOS(total, count);   /* نمط الأزرار السريعة */

  document.getElementById('posApp').innerHTML = `
    <div class="pos-shell">
      ${shiftBanner()}
      ${window.AlfaCloud && AlfaCloud.html ? AlfaCloud.html() : ''}
      <div class="cashier-layout clean-pos-layout">
        <nav class="cashier-sidebar" id="cashierSidebar" aria-label="قائمة الكاشير">
          <button class="side-toggle" type="button" data-action="toggle-nav">☰</button>
          <div class="side-logo"><strong>α</strong><span>alfaprosys</span></div>
          ${renderCashierSideLinks()}
        </nav>

        ${renderCardsRail()}

        <section class="pos-menu-panel clean-menu-panel">
          <header class="pos-work-header">
            <div>
              <div class="pos-brand">alfaprosys</div>
              <div class="pos-subtitle">فاتورة جديدة — شاشة البيع</div>
            </div>
            <div class="pos-head-tools">
              ${cashierMenuRefreshButton()}
              ${window.NetBadge ? NetBadge.html('netBadgePos') : ''}
              ${currencyNew ? '<span class="cur-new-chip" title="العرض بالعملة الجديدة">ل.س جديدة</span>' : ''}
              <input id="barcodeInput" class="barcode-input" type="text" inputmode="numeric" autocomplete="off"
                     placeholder="📷 باركود / كود" title="امسح الباركود أو اكتب الكود ثم Enter" data-action="barcode-enter">
              <div class="invoice-mini-badge">${nextInvoiceLabel()}</div>
            </div>
          </header>

          <div class="order-type-bar">
            ${DATA.orderTypes.map(t => `
              <button class="ot-btn ${orderType===t.id?'active':''}" type="button" data-action="order-type" data-value="${escapeHtml(t.id)}">
                ${t.icon} ${t.label}
              </button>
            `).join('')}
            <button class="ot-btn" type="button" data-action="tables" title="تسجيل الطاولة اختياري">🗺️ الطاولات (اختياري)</button>
            <a class="ot-btn online-ot-btn" href="online_orders.html" title="الطلبات الأونلاين الواردة">
              🛵 أونلاين${onlinePendingCount() ? ` <span class="online-pending-badge">${onlinePendingCount()}</span>` : ''}
            </a>
            ${renderItemPageSizeButton()}
          </div>
          ${orderType === 'dinein' ? `<div class="hall-strip">${['صالة خارجية','صالة داخلية','صالة العائلات'].map(h => `<button class="hall-chip ${selectedHall===h?'selected':''}" type="button" data-action="hall" data-value="${escapeHtml(h)}">${escapeHtml(h)}</button>`).join('')}${selectedTable ? `<button class="hall-chip table-chip" type="button" data-action="hall" data-value="${escapeHtml(selectedHall)}" title="اضغط لتغيير الطاولة">🪑 ${escapeHtml(selectedTable)} ✎</button>` : ''}</div>` : ''}
          ${orderType === 'delivery' ? renderDeliveryFields() : ''}
          ${orderType === 'contract' ? renderContractPanel() : ''}

          <div id="menuFlow">${orderType !== 'contract' ? (searchTerm.trim() || searchOpen ? renderSearchArea(items) : (displayMode === 'buttons' ? renderButtonFlow(items) : displayMode === 'direct' ? renderDirectFlow(items) : renderDropdownFlow(items))) : ''}</div>
        </section>

        <aside class="bill-panel clean-bill-panel" id="billPanel">
          ${renderBillPanel(total, count)}
        </aside>
      </div>
      <div class="mobile-nav-scrim" id="mobileNavScrim" data-action="close-nav"></div>
      <button class="mobile-fab" id="mobileNavFab" type="button" data-action="toggle-nav">☰</button>
      <nav class="mobile-cashier-nav" id="mobileCashierNav"><div class="mobile-nav-head"><strong>قائمة الكاشير</strong><button type="button" data-action="close-nav">✕</button></div><div class="mobile-nav-grid">${renderMobileCashierLinks()}</div></nav>
      ${renderQtyModal()}
      ${renderNoteModal()}
      ${renderServicesModal()}
      ${renderCalcModal(grandWithServices(total, discountParts().total))}
      ${renderLeaveModal()}
    </div>`;

  bindPOSActions();
  saveDraft();
  if (window.NetBadge) NetBadge.bind();
  if (searchOpen && !pendingItemId && !pendingNoteItemId && !calcOpen) setTimeout(() => document.getElementById('posSearchInput')?.focus(), 0);
  if (calcOpen) setTimeout(() => document.getElementById('calcPaidInput')?.focus(), 0);
}

/* ================================================================
   النمط المباشر — تنسيق مطوّر بأسلوب برامج المحاسبة:
   شريط عمليات ضيق مكدس على الجانب + جدول فاتورة (حقول فارغة)
   واختيار الأصناف تحته + عمود أيمن: التصنيفات ولوحة إدخال كالحاسبة
   ================================================================ */
function renderDirectPOS(total, count) {
  const cats = sellableCategories();
  const items = finalItems();
  document.getElementById('posApp').innerHTML = `
    <div class="pos-shell">
      ${shiftBanner()}
      <div class="direct-pos">

        <header class="d-topbar">
          <button class="d-burger" type="button" data-action="toggle-nav" title="قائمة الكاشير">☰</button>
          <div class="d-brand"><strong>alfaprosys</strong></div>
          <input id="barcodeInput" class="barcode-input" type="text" inputmode="numeric" autocomplete="off"
                 placeholder="📷 باركود" title="امسح أو اكتب الكود ثم Enter" data-action="barcode-enter">
          ${cashierMenuRefreshButton()}
          ${window.NetBadge ? NetBadge.html('netBadgePos') : ''}
          ${currencyNew ? '<span class="cur-new-chip" title="العرض بالعملة الجديدة">ل.س جديدة</span>' : ''}
          <div class="invoice-mini-badge">فاتورة ${nextInvoiceLabel()}</div>
          <span class="build-chip" title="نسخة كود الكاشير">${POS_BUILD}</span>
        </header>

        <div class="d-body">
          <section class="d-main" aria-label="الفاتورة والأصناف">
            ${renderLastSaleBar()}
            <div class="d-invwrap" id="menuInvoice">${renderDirectInvoice(total, count)}</div>
            <div class="d-items" id="menuItems">${renderDirectItemsArea(items)}</div>
            <div class="d-paybar" id="menuPaybar"><button class="d-print-btn" type="button" data-action="submit-order" ${!hasOrderLines()?'disabled':''}>🖨️ طباعة</button><button class="d-calc-btn" type="button" data-action="open-calc" ${!hasOrderLines()?'disabled':''}>🧮 حاسبة الباقي</button>${renderPaySection()}</div>
          </section>

          <aside class="d-mid" aria-label="نوع الطلب والتصنيفات">
            <div class="d-otbar">
              ${DATA.orderTypes.map(t => `<button class="ot-btn ${orderType===t.id?'active':''}" type="button" data-action="order-type" data-value="${escapeHtml(t.id)}">${t.icon} ${t.label}</button>`).join('')}
              <button class="ot-btn" type="button" data-action="tables">🗺️ الطاولات</button>
              ${orderType === 'dinein' ? `<button class="ot-btn hall-indicator${selectedTable?' picked':''}" type="button" data-action="hall" data-value="${escapeHtml(selectedHall||'')}" title="تسجيل الصالة والطاولة اختياري">${selectedHall ? '🏛️ ' + escapeHtml(selectedHall) : '🏛️ الصالة (اختياري)'}${selectedTable ? ' · 🪑 ' + escapeHtml(selectedTable) : ''}</button>` : ''}
            </div>
            <div class="d-cats" aria-label="التصنيفات الرئيسية">
              ${cats.map(c => `<button class="d-cat ${activeCategoryId===c.id?'active':''}" type="button" data-action="category" data-value="${escapeHtml(c.id)}"><span>${c.icon}</span>${escapeHtml(c.name)}</button>`).join('')}
              <button class="d-cat svc-dcat" type="button" data-action="open-services"><span>🛎️</span>خدمات${svcBadgeHtml()}</button>
            </div>
            <div class="d-note-actions" style="display:flex;gap:6px;padding:8px 4px;flex-wrap:wrap;">
              <button class="d-note-btn" type="button" data-action="order-note" style="flex:1;min-width:120px;padding:10px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;cursor:pointer;font-weight:700;">📝 ملاحظات الطلب</button>
              <button class="d-note-btn" type="button" data-action="selected-note" style="flex:1;min-width:120px;padding:10px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;cursor:pointer;font-weight:700;">🍽️ ملاحظات الصنف</button>
              <button class="d-note-btn" type="button" data-action="emergency-price" style="flex:1;min-width:120px;padding:10px;border:1px solid #d97706;border-radius:8px;background:#fff7ed;color:#9a3412;cursor:pointer;font-weight:700;">💰 سعر طارئ</button>

            </div>
          </aside>

          <aside class="d-ops" aria-label="العمليات">
            ${renderDirectOps()}
          </aside>
        </div>

        ${renderCardsModal()}
      ${renderDirectAuxModal()}
      ${renderPosEmbed()}

      <div class="mobile-nav-scrim" id="mobileNavScrim" data-action="close-nav"></div>
      <button class="mobile-fab" id="mobileNavFab" type="button" data-action="toggle-nav">☰</button>
      <nav class="mobile-cashier-nav" id="mobileCashierNav"><div class="mobile-nav-head"><strong>قائمة الكاشير</strong><button type="button" data-action="close-nav">✕</button></div><div class="mobile-nav-grid">${renderMobileCashierLinks()}</div></nav>

      </div>

      ${renderQtyModal()}
      ${renderNoteModal()}
      ${renderServicesModal()}
      ${renderCalcModal(grandWithServices(total, discountParts().total))}
      ${renderLeaveModal()}
    </div>`;

  bindPOSActions();
  saveDraft();
  if (window.NetBadge) NetBadge.bind();
}


function renderDirectAuxModal() {
  if (!directAuxModal || (displayMode !== 'direct' && !(displayMode === 'quick' && ['discount','order-note','emergency-price','services'].includes(directAuxModal)))) return '';
  const title = directAuxModal === 'hall' ? 'اختيار الصالة'
    : directAuxModal === 'delivery' ? 'بيانات التوصيل'
    : directAuxModal === 'contract' ? 'اختيار العقد'
    : directAuxModal === 'services' ? 'خدمات الطلب'
    : 'حسم الفاتورة';
  let body = '';
  if (directAuxModal === 'hall') {
    const hallTables = selectedHall ? (DATA.tables || []).map(t => {
      const busy = (DATA.invoices || []).some(i => i.type === 'dinein' && i.status === 'open' && i.hall === selectedHall && i.table_label === t);
      return `<button class="d-aux-item ${busy?'busy':''}" type="button" data-action="table-pick" data-value="${escapeHtml(t)}" ${busy?'disabled':''}><strong>${escapeHtml(t)}</strong><small>${busy?'مشغولة':'شاغرة'}</small></button>`;
    }).join('') : '';
    body = `<div class="d-aux-halls">${['صالة خارجية','صالة داخلية','صالة العائلات'].map(h =>
      `<button class="hall-chip ${selectedHall===h?'selected':''}" type="button" data-action="hall" data-value="${escapeHtml(h)}">${escapeHtml(h)}</button>`
    ).join('')}</div>
    <div class="d-aux-hint">الصالة الحالية: <b>${escapeHtml(selectedHall || '—')}</b></div>
    ${selectedHall ? `<div class="d-aux-hint">تسجيل طاولة (اختياري):</div><div class="d-aux-list">${hallTables || '<div>لا توجد طاولات معرفة</div>'}</div>` : ''}`;
  } else if (directAuxModal === 'delivery') {
    body = renderDeliveryFields() + `<button class="d-aux-done" type="button" data-action="close-direct-aux">تم</button>`;
  } else if (directAuxModal === 'contract') {
    const contracts = (window.DEMO_DATA.contracts || []).filter(c => c.status === 'active');
    body = contracts.length
      ? `<div class="d-aux-list">${contracts.map(c => `<button type="button" class="d-aux-item ${selectedContractId===c.id?'on':''}" data-action="contract-pick" data-id="${escapeHtml(c.id)}"><strong>${escapeHtml(c.client_name)}</strong>${c.company ? `<small>${escapeHtml(c.company)}</small>` : ''}</button>`).join('')}</div>`
      : '<div class="d-aux-hint">لا توجد عقود نشطة</div>';
  } else if (directAuxModal === 'discount') {
    const dp = discountParts();
    const pct = invDiscPct();
    body = `<div class="d-aux-hint">خصم الأصناف: <b>${fmtCur(dp.itemPart)}</b> — خصم الفاتورة: <b>${fmtNum(pct)}%</b> (${fmtCur(dp.invPart)})</div>
      <div class="d-aux-disc-grid">${[0,5,10,15,20].map(n => `<button type="button" class="d-aux-pct ${pct===n?'on':''}" data-action="set-inv-disc" data-value="${n}">${n}%</button>`).join('')}</div>
      <div class="d-aux-custom"><input id="dAuxDisc" type="number" min="0" max="100" inputmode="numeric" value="${pct}" placeholder="%"><button type="button" data-action="set-inv-disc" data-value="">تطبيق</button></div>`;
  } else if (directAuxModal === 'order-note') {
    const known = [...new Set((DATA.invoices || []).map(x => String(x.notes || '').trim()).filter(Boolean))].slice(0, 20);
    body = `<div class="d-aux-hint">اكتب جزءًا من الملاحظة وستظهر الاقتراحات السابقة تلقائيًا</div>
      <input id="orderNoteInput" class="note-modal-text" list="orderNoteSuggestions" value="${escapeHtml(orderNotes)}" placeholder="ملاحظة الطلب العامة" autocomplete="off">
      <datalist id="orderNoteSuggestions">${known.map(n => `<option value="${escapeHtml(n)}"></option>`).join('')}</datalist>
      <div style="display:flex;gap:8px;margin-top:10px;"><button type="button" class="d-aux-done" style="flex:1" data-action="order-note-save">حفظ</button><button type="button" class="d-aux-done" style="flex:1" data-action="close-direct-aux">إلغاء</button></div>`;
  } else if (directAuxModal === 'weight-edit') {
    const wr=cart.find(x=>x.id===directSelectedId);
    body=`<div class="d-aux-hint">${escapeHtml(wr?wr.name:'')} — السعر محسوب لكل كيلو</div><input id="weightGrams" type="number" min="1" step="1" inputmode="numeric" value="${wr&&wr.weight_grams||500}" placeholder="الوزن بالجرام" style="width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:9px;font-size:18px;text-align:center"><div style="display:flex;gap:8px;margin-top:12px"><button class="d-aux-done" style="flex:1" data-action="weight-save">موافقة</button><button class="d-aux-done" style="flex:1" data-action="close-direct-aux">إلغاء</button></div>`;
  } else if (directAuxModal === 'emergency-price') {
    const rr = cart.find(x => x.id === directSelectedId && !x.locked);
    const sk = selectedServiceKey();
    const serviceNames = { table: 'خدمة طاولة', delivery: 'خدمة توصيل', hall: 'خدمة صالة' };
    const selectedName = rr ? rr.name : (sk ? serviceNames[sk] : '');
    const selectedPrice = rr ? Number(rr.price) || 0 : (sk ? Number(orderServices[sk]) || 0 : 0);
    body = `<div class="d-aux-hint">${escapeHtml(selectedName)}</div><input id="emergencyPriceInput" type="number" min="0" inputmode="numeric" value="${selectedPrice}" style="width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:9px;font-size:18px;text-align:center;"><div style="display:flex;gap:8px;margin-top:12px;"><button type="button" class="d-aux-done" style="flex:1" data-action="emergency-price-save">موافقة</button><button type="button" class="d-aux-done" style="flex:1" data-action="close-direct-aux">إلغاء</button></div>`;
  } else if (directAuxModal === 'services') {
    const st = Number(orderServices.table) || 0;
    const sd = Number(orderServices.delivery) || 0;
    const sh = Number(orderServices.hall) || 0;
    body = `<div class="d-aux-hint">اختر الخدمة ثم أدخل قيمتها الحالية — لا تُنشأ أسعار تلقائياً</div>
      <div style="display:flex;gap:8px;margin:8px 0;flex-wrap:wrap;"><button type="button" class="d-aux-item" data-action="service-select" data-service="table">🍽️ خدمة طاولة</button><button type="button" class="d-aux-item" data-action="service-select" data-service="delivery">🛵 خدمة توصيل</button>${displayMode === 'quick' ? '<button type="button" class="d-aux-item" data-action="service-select" data-service="hall">🛋️ خدمة صالة</button>' : ''}</div>
      <div class="d-aux-custom"><span style="font-weight:800;white-space:nowrap;align-self:center;">🍽️ طاولة</span><input id="svcTable" type="number" min="0" inputmode="numeric" value="${st}" placeholder="0"></div>
      <div class="d-aux-custom"><span style="font-weight:800;white-space:nowrap;align-self:center;">🛵 توصيل</span><input id="svcDelivery" type="number" min="0" inputmode="numeric" value="${sd}" placeholder="0"></div>
      ${displayMode === 'quick' ? `<div class="d-aux-custom"><span style="font-weight:800;white-space:nowrap;align-self:center;">🛋️ صالة</span><input id="svcHall" type="number" min="0" inputmode="numeric" value="${sh}" placeholder="0"></div>` : ''}
      <div style="display:flex;gap:8px;margin-top:10px;"><button type="button" class="d-aux-done" style="flex:1;" data-action="save-services">✔ حفظ</button><button type="button" class="d-aux-done" style="flex:1;filter:grayscale(1);" data-action="clear-services">تصفير</button></div>`;
  }
  return `
    <div class="d-aux-scrim" data-action="close-direct-aux"></div>
    <div class="d-aux-modal" role="dialog" aria-label="${title}">
      <div class="d-aux-head"><strong>${title}</strong><button type="button" data-action="close-direct-aux">✕</button></div>
      ${body}
    </div>`;
}

function renderDirectOps() {
  const B = (a, ic, lb, extra = '') =>
    `<button class="dop-btn ${extra}" type="button" data-action="${a}" title="${lb}"><span>${ic}</span><small>${lb}</small></button>`;
  return `
    ${B('open-popular-modal', '⭐', 'الأكثر')}
    ${B('open-offers-modal', '🎟️', 'العروض')}
    ${B('open-direct-disc', '💸', 'الحسم')}
    ${B('toggle-search', '🔍', 'بحث')}
    ${B('hold-order', '📌', 'تعليق')}
    ${B('d-del-row', '🗑️', 'حذف')}
    ${B('clear-cart', '♻️', 'تفريغ')}
    <div class="quick-secondary-ops side-secondary-ops" aria-label="اختيارات إضافية للبيع">
      <button class="ot-btn online-ot-btn ot-big" type="button" data-action="online-orders">🛵 أونلاين${onlinePendingCount() ? ` <span class="online-pending-badge">${onlinePendingCount()}</span>` : ''}</button>
      ${renderItemPageSizeButton()}
    </div>
    ${B('delivery-screen', '🛵', 'توصيل')}
    ${B('invoices', '🧾', 'فواتير')}
    ${B('kitchen', '🍳', 'مطبخ')}
    ${B('tables', '🗺️', 'طاولات')}
    ${B('toggle-currency', '💱', currencyNew ? 'قديم' : 'جديد', currencyNew ? 'dop-on' : '')}`;
}

function renderCashierPaymentControls() {
  const q = escapeHtml(cashierPaymentInvoiceNo || '');
  return `<div class="cashier-payment-controls" aria-label="وسم حالة دفع الفاتورة">
    <input class="cashier-payment-invoice" type="text" inputmode="numeric" dir="ltr"
      data-action="cashier-invoice-no" value="${q}" placeholder="رقم الفاتورة" aria-label="رقم الفاتورة">
    <button class="cashier-payment-btn paid" type="button" data-action="cashier-paid">✓ مدفوع</button>
    <button class="cashier-payment-btn unpaid" type="button" data-action="cashier-unpaid">× غير مدفوع</button>
  </div>`;
}

function currentPaymentCashier() {
  return (window.alfaCurrentCashierName && alfaCurrentCashierName())
    || (DATA.cashierSession && DATA.cashierSession.cashier_name) || 'الكاشير';
}
function currentPaymentCashierKey() {
  return (window.alfaCurrentCashierKey && alfaCurrentCashierKey()) || 'cashier';
}
function currentPaymentShiftKey() {
  const s = DATA.cashierSession || {};
  if (s.shift_open && s.shift_key) return String(s.shift_key);
  return (currentPaymentCashierKey() + ':' + (window.businessDay ? businessDay() : ''));
}
function markInvoicePayment(status) {
  const raw = String(cashierPaymentInvoiceNo || document.querySelector('[data-action="cashier-invoice-no"]')?.value || '').trim();
  if (!raw) return showToast('اكتب رقم الفاتورة أولاً', '⚠️');
  const list = DATA.invoices || [];
  const inv = list.find(function (x) { return window.alfaInvoiceNumberMatches ? alfaInvoiceNumberMatches(x, raw) : String(x.no) === raw; });
  if (!inv) return showToast('لم يتم العثور على الفاتورة بهذا الرقم', '⚠️');
  if (inv.status === 'cancelled') return showToast('لا يمكن تحصيل فاتورة ملغاة', '⚠️');
  const name = currentPaymentCashier();
  const key = currentPaymentCashierKey();
  const shift = currentPaymentShiftKey();
  const previousStatus = window.alfaInvoicePaymentStatus ? alfaInvoicePaymentStatus(inv) : 'unpaid';
  /* الحالة المختارة هي الحقيقة الحالية: عند تحويل مدفوعة إلى غير مدفوعة
     لا نترك حدث الدفع القديم ليُحسب في إغلاق الصندوق. وعند التحصيل اللاحق
     يبدأ سجل التحصيل من الحدث الجديد. */
  if (status === 'unpaid' || previousStatus !== 'unpaid') inv.payment_history = [];
  else inv.payment_history = Array.isArray(inv.payment_history) ? inv.payment_history : [];
  inv.payment_history.push({
    id: 'pay_evt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    status: status,
    amount: status === 'paid' ? (Number(inv.total) || 0) : 0,
    cashier: name,
    cashier_key: key,
    shift_key: shift,
    at: new Date().toISOString(),
  });
  inv.payment_status = status;
  inv.paid = status === 'paid';
  if (status === 'paid') {
    inv.paid_by = name; inv.paid_by_key = key; inv.paid_shift_key = shift; inv.paid_at = new Date().toISOString();
  } else {
    inv.paid_by = ''; inv.paid_by_key = ''; inv.paid_shift_key = ''; inv.paid_at = '';
  }
  if (window.InvoiceSync && InvoiceSync.pushSoon) InvoiceSync.pushSoon(inv);
  if (window.alfaPersist) window.alfaPersist();
  cashierPaymentInvoiceNo = '';
  showToast(`الفاتورة ${window.invNoLabel ? invNoLabel(inv) : raw}: ${status === 'paid' ? 'مدفوعة' : 'غير مدفوعة'}`, status === 'paid' ? '✅' : '⏳');
  renderPOS();
}

function renderQuickPaybar() {
  return `<div class="d-paybar" id="menuPaybar">
              <button class="d-print-btn" type="button" data-action="submit-order" ${!hasOrderLines()?'disabled':''}>🖨️ طباعة</button>
              <button class="d-calc-btn" type="button" data-action="open-calc" ${!hasOrderLines()?'disabled':''}>🧮 الحاسبة</button>
              <button class="quick-emergency-btn" type="button" data-action="emergency-price" ${!hasOrderLines()?'disabled':''}>💰 سعر طارئ</button>
              ${renderPaySection()}
              ${renderCashierPaymentControls()}
              <div class="quick-bottom-notes" aria-label="أزرار الملاحظات">
                <button class="quick-note-action quick-note-last" type="button" data-action="quick-note-item">🍽️ ملاحظة آخر صنف</button>
                <button class="quick-note-action quick-note-selected" type="button" data-action="selected-note">🎯 ملاحظة الصنف</button>
                <button class="quick-note-action quick-note-order" type="button" data-action="quick-note-order">📝 ملاحظات الطلب</button>
              </div>
            </div>`;
}

function renderQuickPOS(total, count) {
  padMode = 'qty';
  const cats = sellableCategories();
  const items = finalItems();
  document.getElementById('posApp').innerHTML = `
    <div class="pos-shell">
      ${shiftBanner()}
      <div class="direct-pos quick-pos">

        <header class="d-topbar">
          <button class="d-burger" type="button" data-action="toggle-nav" title="قائمة الكاشير">☰</button>
          <div class="d-brand"><strong>alfaprosys</strong></div>
          ${cashierMenuRefreshButton()}
          ${window.NetBadge ? NetBadge.html('netBadgePos') : ''}
          ${currencyNew ? '<span class="cur-new-chip" title="العرض بالعملة الجديدة">ل.س جديدة</span>' : ''}
          <div class="invoice-mini-badge">فاتورة ${nextInvoiceLabel()}</div>
          <div class="invoice-mini-badge ot-chip" title="نوع الطلب الحالي — الافتراضي دائماً «سفري»">${currentOrderTypeChip()}</div>
          <span class="build-chip" title="نسخة كود الكاشير">${POS_BUILD}</span>
        </header>

        <div class="d-body">
          <section class="d-main" aria-label="الفاتورة والأصناف">
            ${renderLastSaleBar()}
            <div class="d-invwrap" id="menuInvoice">${renderDirectInvoice(total, count)}</div>
            <div class="d-items" id="menuItems">${orderType === 'contract' ? renderContractPanel() : renderDirectItemsArea(items)}</div>
          </section>

          <aside class="d-mid" aria-label="نوع الطلب والتصنيفات">

            ${(orderType === 'dinein' || serviceSelected.delivery) ? `<div class="d-otbar">
              ${orderType === 'dinein' ? `<button class="ot-btn ot-big hall-indicator${selectedTable?' picked':''}" type="button" data-action="hall" data-value="${escapeHtml(selectedHall||'')}" title="تسجيل الصالة والطاولة اختياري">${selectedHall ? '🏛️ ' + escapeHtml(selectedHall) : '🏛️ الصالة (اختياري)'}${selectedTable ? ' · 🪑 ' + escapeHtml(selectedTable) : ''}</button>` : ''}
              ${serviceSelected.delivery ? '<span class="ot-btn ot-big delivery-live-badge" title="أُضيفت خدمة التوصيل — هذا الطلب توصيل">🛵 توصيل</span>' : ''}
            </div>` : ''}
            <div class="d-cats" aria-label="التصنيفات الرئيسية">
              ${cats.map(c => `<button class="d-cat ${activeCategoryId===c.id?'active':''}" type="button" data-action="category" data-value="${escapeHtml(c.id)}"><span>${c.icon}</span>${escapeHtml(c.name)}</button>`).join('')}
              <button class="d-cat svc-dcat ${servicesOpen ? 'active' : ''}" type="button" data-action="open-services"><span>🛎️</span>خدمات${svcBadgeHtml()}</button>
              ${renderQuickFamilyFilters()}
            </div>
            ${renderQuickPager()}
          </aside>

          <aside class="d-ops" aria-label="العمليات">
            ${renderQuickOps()}
          </aside>
        </div>

        ${renderQuickPaybar()}

        ${renderCardsModal()}
      ${renderDirectAuxModal()}
      ${renderPosEmbed()}

      <div class="mobile-nav-scrim" id="mobileNavScrim" data-action="close-nav"></div>
      <button class="mobile-fab" id="mobileNavFab" type="button" data-action="toggle-nav">☰</button>
      <nav class="mobile-cashier-nav" id="mobileCashierNav"><div class="mobile-nav-head"><strong>قائمة الكاشير</strong><button type="button" data-action="close-nav">✕</button></div><div class="mobile-nav-grid">${renderQuickCashierLinks()}</div></nav>

      </div>

      ${renderQtyModal()}
      ${renderNoteModal()}
      ${renderServicesModal()}
      ${renderCalcModal(grandWithServices(total, discountParts().total))}
      ${renderLeaveModal()}
    </div>`;

  bindPOSActions();
  saveDraft();
  if (window.NetBadge) NetBadge.bind();
  updateQuickFilterBadge();
  focusQuickNote();
}

function renderQuickQtyInput(value, placeholder, disabled) {
  return `<div class="quick-qty-input-row">
    <input id="quickQtyInput" class="quick-qty-text-input" type="number" inputmode="numeric" step="1" min="1" value="${value == null ? '' : escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" aria-label="تعديل الكمية أو الوزن" ${disabled ? 'disabled' : ''}>
    <button class="quick-qty-apply" type="button" data-action="quick-qty-input-apply" ${disabled ? 'disabled' : ''}>تعديل الكمية</button>
  </div>`;
}
function applyQuickQtyInput() {
  const input = document.getElementById('quickQtyInput');
  const row = cart.find(c => c.id === directSelectedId);
  if (!row) return showToast('حدد سطراً من الفاتورة أولاً', '⚠️');
  if (row.locked) return showToast('🔒 هذا الصنف جزء من عرض ثابت', '⚠️');
  const raw = Number(input && input.value);
  if (!Number.isFinite(raw) || raw <= 0) return showToast('اكتب رقماً صحيحاً أولاً', '⚠️');
  if (isWeightItem(row)) {
    const grams = Math.round(raw);
    if (grams < 50 || grams > 5000) return showToast('الوزن يجب أن يكون بين 50 و5000 غرام', '⚠️');
    row.weight_grams = grams;
    row.qty = grams / 1000;
    row.weight_label = grams + ' غرام';
    quickWeightItemId = row.id;
    showToast(`تم تعديل الوزن إلى ${grams} غرام`, '⚖️');
  } else {
    const qty = Math.floor(raw);
    if (qty < 1 || qty > 999) return showToast('الكمية يجب أن تكون بين 1 و999', '⚠️');
    row.qty = qty;
    quickWeightItemId = null;
    showToast(`تم تعديل الكمية إلى ${qty}`, '🔢');
  }
  return renderPOS();
}
function renderQuickQtyPad() {
  const selectedRow = cart.find(c => c.id === directSelectedId);
  const selectedWeightItem = quickWeightItemId ? DATA.items.find(i => i.id === quickWeightItemId) : null;
  const weightRow = selectedWeightItem
    ? (selectedRow && selectedRow.id === selectedWeightItem.id ? selectedRow : cart.find(c => c.id === selectedWeightItem.id && !c.locked))
    : (selectedRow && isWeightItem(selectedRow) ? selectedRow : null);
  const weightItem = selectedWeightItem || (weightRow ? DATA.items.find(i => i.id === weightRow.id) : null);

  if (weightItem && isWeightItem(weightItem)) {
    const currentWeight = rowWeightGrams(weightRow);
    return `
    <section class="quick-qty-pad quick-weight-pad" aria-label="أزرار أوزان من 50 إلى 1500 غرام وحقل إدخال حتى 5000 غرام">
      <div class="quick-qty-head">الوزن للصنف: <b>${escapeHtml(saleItemName(weightItem))}</b></div>
      ${renderQuickQtyInput(currentWeight || '', 'الوزن بالجرام حتى 5000', !weightRow)}
      <div class="dpad-display" id="dpadDisplay">${currentWeight ? `${fmtNum(currentWeight)} غرام` : 'اختر الوزن'}</div>
      <div class="dpad-keys quick-qty-keys">${WEIGHT_OPTIONS.map(g => `<button class="dpad-key" type="button" data-action="quick-weight-pick" data-value="${g}">${g}</button>`).join('')}</div>
      <div class="quick-qty-hint">الأزرار من 50 إلى 1500 غرام — ويمكن كتابة وزن حتى 5000 غرام في الحقل</div>
    </section>`;
  }

  const nums = Array.from({length: 25}, (_, i) => i + 1);
  return `
    <section class="quick-qty-pad" aria-label="لوحة أرقام الكمية من 1 إلى 25">
      <div class="quick-qty-head">${selectedRow ? `الكمية للصنف: <b>${escapeHtml(selectedRow.name)}</b>` : 'حدد صنفاً من الفاتورة أولاً'}</div>
      ${renderQuickQtyInput(selectedRow ? Math.max(1, Number(selectedRow.qty) || 1) : '', 'الكمية', !selectedRow || selectedRow.locked)}
      <div class="dpad-display" id="dpadDisplay">${selectedRow ? fmtNum(selectedRow.qty) : '—'}</div>
      <div class="dpad-keys quick-qty-keys">${nums.map(n => `<button class="dpad-key" type="button" data-action="quick-qty-pick" data-value="${n}">${n}</button>`).join('')}</div>
      <div class="quick-qty-hint">انقر رقماً من 1 إلى 25 لتطبيق الكمية مباشرة</div>
    </section>`;
}

function renderQuickOps() {
  const B = (a, ic, lb, extra = '') =>
    `<button class="dop-btn ${extra}" type="button" data-action="${a}" title="${lb}"><span>${ic}</span><small>${lb}</small></button>`;
  /* أزرار العمود الأساسية؛ مربع الكتابة أدناه للملاحظات فقط، والبحث
     له مسار صريح مستقل من زر «بحث» عند الحاجة. */
  return `
    <div class="dops-grid quick-four-ops">
      ${B('delivery-screen', '🛵', 'توصيل')}
      ${B('clear-cart', '♻️', 'تفريغ')}
      ${B('d-del-row', '🗑️', 'حذف')}
      ${B('hold-order', '📌', 'تعليق')}
    </div>
    <div class="quick-secondary-ops" aria-label="اختيارات إضافية للبيع">
      <button class="ot-btn online-ot-btn ot-big" type="button" data-action="online-orders">🛵 أونلاين${onlinePendingCount() ? ` <span class="online-pending-badge">${onlinePendingCount()}</span>` : ''}</button>
      ${renderItemPageSizeButton()}
    </div>
    ${renderQuickQtyPad()}
    <div class="quick-note-box">
      <div class="qn-head"><span class="qn-target" id="qnTarget">${quickNoteTargetLabel()}</span><span class="qn-filter" id="qnFilter"></span></div>
      <input id="quickNoteInput" class="quick-note-input" type="text" dir="rtl" lang="ar" autocomplete="off"
             placeholder="اكتب ملاحظة ثم اختر زر الملاحظات…" value="${escapeHtml(quickNoteText())}" data-action="quick-note-input">
      <div class="qn-suggest" id="qnSuggest" hidden></div>
    </div>`;
}

function renderDirectInvoice(total, count) {
  const dp0 = discountParts();
  const disc = dp0.total;
  /* الأصناف المخفوضة تُعرض صافية في صفوفها، وخصم الفاتورة يظهر في التذييل */
  const serviceCartRows = ['table', 'delivery', 'hall'].map(k => serviceRowForId('service_' + k)).filter(Boolean);
  const rows = cart.concat(serviceCartRows).map((c, idx) => `
    <div class="dinv-row ${directSelectedId===c.id?'selected':''}">
      <span class="dinv-c dinv-n">${idx + 1}</span>
      <span class="dinv-c dinv-name ${c.offer_id ? 'dinv-offer-row' : ''}" data-action="d-select-row" data-id="${escapeHtml(c.id)}" onclick="event.stopPropagation();directSelectedId='${escapeHtml(c.id)}';renderPOS();" title="حدد السطر فقط — الملاحظات من زر الملاحظة">${c.offer_id && !c.offer_disc ? '🎟️ ' : ''}${rowInvoiceNameHtml(c)}${!c.locked && itemDiscRule(c.id) ? ` <span class="item-disc-badge">−${fmtNum(itemDiscRule(c.id).pct)}%</span>` : ''}</span>
      <span class="dinv-c dinv-price ${c.is_service ? 'service-price-cell' : ''}" ${c.is_service ? `data-action="service-select-row" data-id="${escapeHtml(c.id)}" title="حدد الخدمة ثم استخدم زر السعر الطارئ"` : ''}>${itemDiscRule(c.id) ? `<s>${fmtCur(rowDisplayPrice(c))}</s>` : fmtCur(rowDisplayPrice(c))}</span>
      <span class="dinv-c dinv-qty qty-controls">${c.locked ? '🔒' : rowWeightLabel(c) ? `<span class="qty-quick-display weight-display" title="الوزن — اضغط الصف لتعديله">${escapeHtml(rowInvoiceQtyText(c))}</span>` : displayMode === 'quick' ? `<span class="qty-quick-display" title="حدد الصف ثم استخدم لوحة الكمية">${fmtNum(c.qty)}</span>` : `<button type="button" data-action="qty-dec" data-id="${escapeHtml(c.id)}">−</button><input class="qty-inline" type="number" min="1" value="${c.qty}" data-action="qty-input" data-id="${escapeHtml(c.id)}"><button type="button" data-action="qty-inc" data-id="${escapeHtml(c.id)}">+</button>`}</span>
      <span class="dinv-c dinv-disc">${c.offer_disc ? 'خصم عرض' : c.is_free ? '🎁 مجاني' : (c.locked ? 'عرض' : (itemDiscRule(c.id) ? `−${fmtNum(itemDiscRule(c.id).pct)}%` : '—'))}</span>
      <span class="dinv-c dinv-total">${c.locked ? fmtCur(c.price) : fmtCur(itemNet(c) * c.qty)}</span>
      <span class="dinv-c dinv-note ${c.note ? '' : 'muted'} ${c.is_service ? 'service-note-cell' : ''}" title="${c.is_service ? 'استخدم زر ملاحظة الصنف لإضافة ملاحظة للخدمة' : 'استخدم زر ملاحظة الصنف'}">${c.note ? escapeHtml(c.note) : '—'}</span>
      <button class="dinv-del" type="button" data-action="${c.is_service ? 'remove-service' : 'remove-item'}" data-id="${escapeHtml(c.id)}" title="حذف ${c.is_service ? 'الخدمة' : 'الصنف'}">✕</button>
    </div>`).join('');

  const TOTAL_ROWS = 7;
  const occupiedRows = cart.length + serviceCartRows.length;
  const extra = [];
  for (let i = occupiedRows; i < TOTAL_ROWS; i++) {
    extra.push(`<div class="dinv-row empty"><span class="dinv-c dinv-n">${i + 1}</span><span class="dinv-c dinv-name"></span><span class="dinv-c dinv-price"></span><span class="dinv-c dinv-qty"></span><span class="dinv-c dinv-disc"></span><span class="dinv-c dinv-total"></span><span class="dinv-c dinv-note"></span><span class="dinv-c"></span></div>`);
  }
  const net = grandWithServices(total, disc);

  return `
    <div class="dinv-banner">
      <div class="dinv-banner-lbl">الإجمالي</div>
      <div class="dinv-banner-amt">${fmtCur(net)}<small>${fmtNum(count)} صنف</small></div>
    </div>
    ${servicesTotal() ? `<div class="dinv-svc-strip">🛎️ خدمات: ${[(Number(orderServices.table) || 0) ? 'طاولة ' + fmtCur(orderServices.table) : '', (Number(orderServices.delivery) || 0) ? 'توصيل ' + fmtCur(orderServices.delivery) : '', (Number(orderServices.hall) || 0) ? 'صالة ' + fmtCur(orderServices.hall) : ''].filter(Boolean).join(' + ')} <b>(+${fmtCur(servicesTotal())})</b></div>` : ''}
    ${renderOrderNoteEditor()}
    ${renderHeldPanel()}
    <div class="dinv-head">
      <span class="dinv-n">#</span><span>اسم المادة</span><span class="dinv-price">السعر</span><span class="dinv-qty">الكمية</span><span class="dinv-disc">الحسم</span><span class="dinv-total">الإجمالي</span><span class="dinv-note">ملاحظة</span><span></span>
    </div>
    <div class="dinv-rows">${rows}${extra.join('')}</div>`;
}

function renderQuickItemsArea(items) {
  if (!activeCategoryId && !quickFamilyFilter) return '<div class="d-items-hint">👆 اختر تصنيفاً أو فلترًا سريعاً لعرض الأصناف</div>';
  const list = quickFamilyFilter ? quickFamilyItems(quickFamilyFilter) : catItems();
  if (!list.length) return '<div class="d-items-hint">لا أصناف في هذا الاختيار</div>';

  /* السابق/التالي خارج شبكة الأصناف وتحت أزرار التصنيفات. كل صفحة تعرض
     العدد المختار من الأصناف كاملة؛ أزرار التنقل لا تحجز خانات من شبكة الأصناف. */
  const pageSize = itemPageSize;
  const pageCount = Math.ceil(list.length / pageSize);
  if (sandwichPage >= pageCount) sandwichPage = Math.max(0, pageCount - 1);
  const visible = list.slice(sandwichPage * pageSize, sandwichPage * pageSize + pageSize);
  return `<div class="quick-items-stage"><div class="quick-item-grid">${renderItemButtons(visible, null, true)}</div></div>`;
}

function renderQuickPager() {
  if (displayMode !== 'quick' || servicesOpen || quickFilter || searchOpen || searchTerm.trim() || (!activeCategoryId && !quickFamilyFilter)) return '';
  const list = quickFamilyFilter ? quickFamilyItems(quickFamilyFilter) : catItems();
  const pageSize = itemPageSize;
  const pageCount = Math.ceil(list.length / pageSize);
  if (pageCount <= 1) return '';
  if (sandwichPage >= pageCount) sandwichPage = Math.max(0, pageCount - 1);
  return `<div class="quick-category-pager" aria-label="تنقل صفحات الأصناف">
    <button type="button" data-action="sandwich-prev" ${sandwichPage===0?'disabled':''}>‹ السابق</button>
    <span>صفحة ${sandwichPage + 1} من ${pageCount}</span>
    <button type="button" data-action="sandwich-next" ${sandwichPage>=pageCount-1?'disabled':''}>التالي ›</button>
  </div>`;
}

function renderQuickServicesItems() {
  const buttons = QUICK_SERVICE_DEFS.map(s => {
    const selected = !!serviceSelected[s.key];
    const price = Number(orderServices[s.key]) || 0;
    return `<button class="item-btn quick-service-btn${selected ? ' selected' : ''}" type="button" data-action="quick-service-toggle" data-service="${s.key}"
      style="background:${s.bg} !important;background-color:${s.bg} !important;border:2px solid ${s.bd};color:#1e293b;background-image:none !important;">
      ${selected ? '<span class="item-qty-badge">✓</span>' : ''}
      <div class="item-name"><span class="item-name-main">${s.icon} ${s.name}</span></div>
      <div class="item-price">${price ? fmtCur(price) : 'السعر الحالي: 0'}</div>
    </button>`;
  }).join('');
  return `<div class="quick-items-stage quick-services-stage">
    <div class="quick-services-head"><strong>🛎️ الخدمات</strong><span>اختر خدمة لإضافتها كسطر في الفاتورة بالسعر الحالي</span></div>
    <div class="quick-item-grid quick-services-grid">${buttons}</div>
    <button class="quick-services-editor" type="button" data-action="open-services-editor">✎ ضبط القيمة الحالية للخدمة</button>
  </div>`;
}

function renderDirectItemsArea(items) {
  if (displayMode === 'quick' && servicesOpen) return renderQuickServicesItems();
  if (orderType === 'contract' && !selectedContractId) {
    return '<div class="d-items-hint">اختر عقداً من زر «عقود» لتظهر الأصناف</div>';
  }
  /* quickFilter legacy state لا يُملأ من مربع الملاحظات؛ يبقى هذا المسار
     متوافقاً مع أحداث/نسخ قديمة فقط، وليس بحثاً أثناء الكتابة. */
  const filtering = (displayMode === 'quick') && quickFilter;
  if (!filtering && (searchTerm.trim() || searchOpen)) return renderSearchArea(items);
  if (filtering) {
    /* نرسم كل الأصناف ونخفي غير المطابق بكلاس qn-off — الحرف التالي يخفي/يبيّن
       بلا إعادة بناء DOM، فلا تومض الشاشة ولا يفرغ المربع */
    const all = availableItems().sort(bySort);
    quickLoose = !all.some(quickStrict);        /* ما فيش صنف يبدأ بالحرف ⇒ نبحث بالاحتواء */
    const n0 = all.filter(quickMatch).length;
    const strip = `<div class="d-filter-strip"><span id="qnFilterText">🔍 «${escapeHtml(quickFilter)}» · ${n0} صنف ${quickModeWord()} «${escapeHtml(quickFilter)}»</span><button type="button" data-action="clear-quick-filter" title="إلغاء التصفية">✕</button></div>`;
    const empty = `<div class="d-filter-empty" id="qnFilterEmpty"${n0 ? ' hidden' : ''}>🔍 لا صنف ${quickModeWord()} «${escapeHtml(quickFilter)}» — جرّب حرفاً آخر، أو تابع الكتابة (٣ حروف أو أكثر) فتصير ملاحظة</div>`;
    return strip + empty + `<div class="d-menu-grid qn-filter-grid" id="qnFilterGrid"${n0 ? '' : ' hidden'}>${renderItemButtons(all, quickMatch, true)}</div>`;
  }
  /* النمط الأخير يضع زري السابق/التالي داخل شبكة أزرار الأصناف نفسها. */
  if (displayMode === 'quick' && !searchTerm.trim() && !searchOpen) return renderQuickItemsArea(items);
  /* لا تصنيف مختار = لا أصناف إطلاقاً (طلب العميل: منع العرض العشوائي الكامل) */
  if (!activeCategoryId) return '<div class="d-items-hint">👆 اختر تصنيفاً لعرض الأصناف</div>';
  const list = catItems();
  if (!list.length) return '<div class="d-items-hint">لا أصناف في هذا التصنيف</div>';
  return `<div class="d-menu-grid">${renderItemButtons(list)}</div>`;
}

function renderDirectPad() {
  const sel = cart.find(c => c.id === directSelectedId);
  const keys = ['1','2','3','4','5','6','7','8','9','.','0','⌫'];
  return `
    <div class="dpad">
      <div class="dpad-head">${sel ? `الهدف: <b>${escapeHtml(sel.name)}</b>` : 'اختر صنفاً من جدول الفاتورة'}</div>
      <div class="dpad-modes">
        <button class="dpad-mode ${padMode==='qty'?'on':''}" type="button" data-action="d-pad-mode" data-value="qty">الكمية</button>
        <button class="dpad-mode ${padMode==='note'?'on':''}" type="button" data-action="d-pad-mode" data-value="note">ملاحظة</button>
      </div>
      ${padMode === 'note'
        ? `<div class="dpad-note-row">${voiceMicBtn('pad-note', true)}<input id="dPadInput" class="dpad-input" type="text" dir="rtl" lang="ar" autocomplete="off" placeholder="اكتب أو انطق الملاحظة" value="${escapeHtml(padBuf)}"></div>`
        : `<div class="dpad-display" id="dpadDisplay">${padBuf || (sel ? fmtNum(sel.qty) : '0')}</div>`}
      <div class="dpad-keys">${keys.map(k => `<button class="dpad-key" type="button" data-action="d-pad-key" data-value="${k}">${k}</button>`).join('')}</div>
      <div class="dpad-note-chips">${NOTE_SUGGESTIONS.slice(0, 8).map(n => `<button class="dpad-chip" type="button" data-action="d-note-chip" data-value="${escapeHtml(n)}">${escapeHtml(n)}</button>`).join('')}</div>
      <div class="dpad-actions">
        <button class="dpad-apply" type="button" data-action="d-pad-apply">تطبيق ${padMode==='qty'?'الكمية':'الملاحظة'}</button>
        <button class="dpad-clear" type="button" data-action="d-pad-key" data-value="C">مسح</button>
      </div>
    </div>`;
}

/* إضافة مباشرة بلا نافذة كمية في هذا النمط */
function directWeightAdd(item) {
  const ex = cart.find(c => c.id === item.id && !c.locked);
  if (ex) {
    const current = rowWeightGrams(ex) || Math.round((Number(ex.qty) || 0) * 1000);
    const grams = current + 1000;
    ex.weight_grams = grams;
    ex.qty = grams / 1000;
    ex.weight_label = grams + ' غرام';
  } else {
    /* النقر الأول = كيلوغرام كامل، ثم يستطيع الكاشير استبداله من اللوحة. */
    cart.push({ id: item.id, name: saleItemName(item), price: item.price, qty: 1, weight_grams: 1000, weight_label: '1000 غرام', note: '' });
  }
  quickWeightItemId = item.id;
  directSelectedId = item.id;
  lastAddedId = item.id;
  padBuf = '';
  showToast(`${saleItemName(item)} — أُضيف 1 كغ`, '⚖️');
  return renderPOS();
}
function directItemAdd(id) {
  const item = DATA.items.find(i => i.id === id);
  if (!isMenuItemAvailable(item)) return showToast('الصنف غير متاح حالياً', '⚠️');
  if (isWeightItem(item)) return directWeightAdd(item);
  quickWeightItemId = null;
  const ex = cart.find(c => c.id === id && !c.locked);
  if (ex) ex.qty += 1; else cart.push({ id: item.id, name: saleItemName(item), price: item.price, qty: 1, note: '' });
  directSelectedId = id;
  if (displayMode === 'quick') padBuf = '';
  lastAddedId = id;                 /* هدف ملاحظات الصنف السريعة */
  if (!updateCartPanel([id])) renderPOS();
  focusQuickNote();                 /* المؤشر لمربع الكتابة فوراً */
}
/* تحديث موضعي لشاشة اللوحة (بلا إعادة بناء) — false تعني تعذّر فيُستدعى renderPOS */
function updateDPadDisplay() {
  try {
    if (padMode === 'note') {
      const inp = document.getElementById('dPadInput');
      if (!inp) return false;
      inp.value = padBuf;
      return true;
    }
    const el = document.getElementById('dpadDisplay');
    if (!el) return false;
    const sel = cart.find(c => c.id === directSelectedId);
    el.textContent = padBuf || (sel ? fmtNum(sel.qty) : '0');
    return true;
  } catch (e) { return false; }
}
function updateQEditDisplay() {
  try {
    const el = document.getElementById('qeditDisplay');
    if (!el) return false;
    el.textContent = qtyEditBuf === '' ? '—' : qtyEditBuf;
    return true;
  } catch (e) { return false; }
}
function dPadKey(k) {
  if (k === 'C') padBuf = '';
  else if (k === '⌫') padBuf = padBuf.slice(0, -1);
  else padBuf += k;
  if (!updateDPadDisplay()) renderPOS();
}
function quickQtyPick(value) {
  const row = cart.find(c => c.id === directSelectedId);
  const q = Math.round(Number(value));
  if (!row) return showToast('حدد صنفاً من الفاتورة أولاً', '⚠️');
  if (row.locked) return showToast('🔒 العرض ثابت — يمكن الإضافة عليه فقط', '⚠️');
  if (isWeightItem(row)) return showToast('اختر الوزن من لوحة الأوزان', '⚖️');
  if (!Number.isFinite(q) || q < 1 || q > 25) return;
  row.qty = q;
  padBuf = '';
  if (!updateCartPanel([row.id])) renderPOS();
  showToast(`${row.name} × ${fmtNum(q)}`, '✅');
}
function quickWeightPick(value) {
  const g = Math.round(Number(value));
  if (!WEIGHT_OPTIONS.includes(g)) return;
  const id = quickWeightItemId || directSelectedId;
  const item = DATA.items.find(i => i.id === id);
  if (!isMenuItemAvailable(item) || !isWeightItem(item)) return showToast('حدد صنفاً يباع بالكيلو أولاً', '⚠️');
  const row = cart.find(c => c.id === id && !c.locked);
  if (row) {
    row.weight_grams = g;
    row.qty = g / 1000;
    row.weight_label = g + ' غرام';
  } else {
    cart.push({ id: item.id, name: saleItemName(item), price: item.price, qty: g / 1000, weight_grams: g, weight_label: g + ' غرام', note: '' });
  }
  quickWeightItemId = id;
  directSelectedId = id;
  lastAddedId = id;
  padBuf = '';
  showToast(`${saleItemName(item)} — ${g} غرام`, '⚖️');
  renderPOS();
}
function dPadApply() {
  const row = cart.find(c => c.id === directSelectedId);
  if (!row) return showToast('اختر صنفاً من جدول الفاتورة أولاً', '⚠️');
  if (row.locked) return showToast('🔒 العرض ثابت — يمكن الإضافة عليه فقط', '⚠️');
  if (padMode === 'qty') {
    if (isWeightItem(row)) return showToast('استخدم لوحة الأوزان لتعديل هذا الصنف', '⚖️');
    const q = Math.round(Number(padBuf));
    if (!q || q <= 0) {
      if (padBuf.trim() === '' ) return showToast('أدخل الكمية من اللوحة', '⚠️');
      removeFromCart(row.id); padBuf = ''; return;
    }
    row.qty = q; padBuf = ''; updateDPadDisplay(); if (!updateCartPanel([row.id])) renderPOS();
    return showToast(`${row.name} × ${fmtNum(q)}`, '✅');
  }
  const t = padBuf.trim();
  if (!t) return showToast('اكتب الملاحظة أولاً', '⚠️');
  row.note = row.note ? row.note + '، ' + t : t;
  padBuf = ''; updateDPadDisplay(); if (!updateCartPanel([row.id])) renderPOS();
  showToast('أُضيفت الملاحظة', '📝');
}
function dNoteChip(txt) {
  const row = cart.find(c => c.id === directSelectedId);
  if (!row) return showToast('اختر صنفاً من جدول الفاتورة أولاً', '⚠️');
  row.note = row.note ? row.note + '، ' + txt : txt;
  if (!updateCartPanel([row.id])) renderPOS();
  showToast(`ملاحظة: ${txt}`, '📝');
}

/* ================================================================
   بطاقات القسم الأيمن — الأكثر طلباً / العروض / الخصومات
   (تبويب جانبي على الجوال، وإظهار/إخفاء من قائمة الكاشير)
   ================================================================ */
function offerIncludes(o) {
  return (o.items || []).map(line => {
    const it = (DATA.items || []).find(i => i.id === line.item_id);
    if (!it) return '';
    return `${line.free ? '🎁 ' : ''}${saleItemName(it)}${line.qty > 1 ? ' ×' + fmtNum(line.qty) : ''}`;
  }).filter(Boolean).join(' + ');
}
function orderOffer(ofrId) {
  /* التفكيك الفوري: كل مكون بصف مستقل (المجاني بسعر 0) + سطر خصم العرض
     → المخزون والتقارير والتكاليف تقرأ أصنافاً عادية، والعرض سعرُه محفوظ */
  const o = activeOffers().find(x => x.id === ofrId);
  if (!o) return;
  if (cart.find(c => c.offer_id === o.id)) return showToast('العرض موجود في الفاتورة أصلاً', 'ℹ️');
  const lines = (o.items || []).map(l => {
    const it = (DATA.items || []).find(i => i.id === l.item_id);
    if (!it) return null;
    return {
      id: it.id, offer_id: o.id, name: saleItemName(it),
      price: l.free ? 0 : (it.price || 0),   // المقدَّم مجاناً = 0 إيراد
      qty: l.qty, note: '', locked: true, is_free: !!l.free,
    };
  }).filter(Boolean);
  if (!lines.length) return;
  const gross = lines.reduce((t, l) => t + l.price * l.qty, 0);
  const target = Math.max(0, Number(o.price) || 0);
  const diff = Math.round(gross - target);
  cart.push(...lines);
  if (diff > 0) {
    cart.push({ id: 'offerdisc_' + o.id, offer_id: o.id, offer_disc: true,
      name: 'خصم العرض: ' + o.title, price: -diff, qty: 1, note: '', locked: true });
  }
  directSelectedId = lines[0].id;
  showToast('أُضيف العرض للفاتورة — يمكن الإضافة عليه', '🎟️');
  renderPOS();
}
function renderCardsRail() {
  if (!cardsVisible) return '';
  const top = topSoldItems(3);
  const offers = activeOffers();
  const rules = (discSettings().items || [])
    .map(r => ({ rule: r, item: (DATA.items || []).find(i => i.id === r.item_id) }))
    .filter(x => isMenuItemAvailable(x.item));

  const topHtml = top.length ? top.map(i => `
    <button class="cr-item" type="button" data-action="open-qty" data-id="${escapeHtml(i.id)}" title="إضافة للفاتورة">
      <span class="cr-item-name">${escapeHtml(itemButtonTitle(i))}</span>
      <span class="cr-item-price">${itemDiscRule(i.id) ? `<s>${fmtCur(i.price)}</s> <b>${fmtCur(itemNet(i))}</b>` : fmtCur(i.price)}</span>
    </button>`).join('') : '<div class="cr-empty">لا مبيعات بعد</div>';

  const offersHtml = offers.length ? offers.map(o => `
    <div class="cr-offer">
      <div class="cr-offer-title">🎟️ ${escapeHtml(o.title)}</div>
      <div class="cr-offer-inc">${escapeHtml(offerIncludes(o))}</div>
      <div class="cr-offer-foot">
        <span class="cr-offer-price">${fmtCur(o.price)} ل.س</span>
        <button class="cr-offer-btn" type="button" data-action="order-offer" data-value="${escapeHtml(o.id)}">اطلب العرض</button>
      </div>
    </div>`).join('') : '<div class="cr-empty">لا توجد عروض حالياً</div>';

  const discHtml = rules.length ? rules.map(({ rule, item }) => `
    <button class="cr-item" type="button" data-action="open-qty" data-id="${escapeHtml(item.id)}" title="إضافة للفاتورة">
      <span class="cr-item-name">${escapeHtml(itemButtonTitle(item))}</span>
      <span class="cr-item-price"><s>${fmtCur(item.price)}</s> <b>${fmtCur(itemNet(item))}</b> <i class="cr-pct">−${fmtNum(rule.pct)}%</i></span>
    </button>`).join('') : '<div class="cr-empty">لا خصومات على أصناف حالياً</div>';

  return `
    <button class="cards-tab" type="button" data-action="toggle-cards-drawer" title="البطاقات">🎟️</button>
    <aside class="cards-rail" id="cardsRail" aria-label="البطاقات">
      <div class="cr-card">
        <div class="cr-card-title">⭐ الأكثر طلباً</div>
        ${topHtml}
      </div>
      <div class="cr-card">
        <div class="cr-card-title">🎟️ العروض</div>
        ${offersHtml}
      </div>
      <div class="cr-card">
        <div class="cr-card-title">💸 خصومات حالية</div>
        ${discHtml}
      </div>
    </aside>`;
}
/* ── نافذة الأكثر طلباً / العروض — النمط المباشر فقط (تظهر كنافذة فوق الشاشة نفسها) ── */
function renderCardsModal() {
  if (!['direct','quick'].includes(displayMode) || !cardsModalTab) return '';
  const isTop = cardsModalTab === 'top';
  return `
    <div class="cards-modal-scrim" data-action="close-cards-modal"></div>
    <div class="cards-modal" role="dialog" aria-label="${isTop ? 'الأكثر طلباً' : 'العروض'}">
      <div class="cards-modal-head">
        <div class="cm-tabs">
          <button type="button" class="cm-tab ${isTop ? 'active' : ''}" data-action="cards-modal-tab" data-value="top">⭐ الأكثر طلباً</button>
          <button type="button" class="cm-tab ${!isTop ? 'active' : ''}" data-action="cards-modal-tab" data-value="offers">🎟️ العروض</button>
        </div>
        <button type="button" class="cm-close" data-action="close-cards-modal">✕</button>
      </div>
      <div class="cards-modal-body">
        ${isTop ? renderCardsModalTop() : renderCardsModalOffers()}
      </div>
    </div>`;
}
function cardImgOrIcon(url, icon) {
  return url ? `<img src="${escapeHtml(url)}" alt="" loading="lazy">` : `<span>${icon}</span>`;
}
function renderCardsModalTop() {
  const items = topSoldItems(16);
  if (!items.length) return '<div class="cr-empty">لا مبيعات بعد</div>';
  const addAction = displayMode === 'quick' ? 'quick-item-add' : 'open-qty';
  return `<div class="cm-grid">${items.map(i => `
    <button type="button" class="cm-card" data-action="${addAction}" data-id="${escapeHtml(i.id)}">
      <div class="cm-card-img">${cardImgOrIcon(i.image_url, '🍽️')}</div>
      <div class="cm-card-name">${escapeHtml(itemButtonTitle(i))}</div>
      <div class="cm-card-price">${itemDiscRule(i.id) ? `<s>${fmtCur(i.price)}</s> ${fmtCur(itemNet(i))}` : fmtCur(i.price)} ل.س</div>
    </button>`).join('')}</div>`;
}
function renderCardsModalOffers() {
  const offers = activeOffers();
  if (!offers.length) return '<div class="cr-empty">لا توجد عروض حالياً</div>';
  return `<div class="cm-grid">${offers.map(o => `
    <button type="button" class="cm-card cm-card-offer" data-action="order-offer-modal" data-value="${escapeHtml(o.id)}">
      <div class="cm-card-img">${cardImgOrIcon(o.image_url, '🎟️')}</div>
      <div class="cm-card-name">${escapeHtml(o.title)}</div>
      <div class="cm-card-sub">${escapeHtml(offerIncludes(o))}</div>
      <div class="cm-card-price">${fmtCur(o.price)} ل.س</div>
    </button>`).join('')}</div>`;
}
function openPopularModal() { cardsModalTab = 'top'; renderPOS(); }
function openOffersModal() { cardsModalTab = 'offers'; renderPOS(); }
function closeCardsModal() { cardsModalTab = null; renderPOS(); }

function toggleCardsVisible() {
  cardsVisible = !cardsVisible;
  try { localStorage.setItem('alfaprosys_cards', cardsVisible ? 'visible' : 'hidden'); } catch (e) {}
  closeCashierNav();
  showToast(cardsVisible ? 'البطاقات ظاهرة' : 'البطاقات مخفية', cardsVisible ? '🎁' : '🙈');
  renderPOS();
}
function toggleCardsDrawer() {
  document.getElementById('cardsRail')?.classList.toggle('open');
}

function renderDeliveryFields() {
  const combined = [deliveryInfo.name, deliveryInfo.phone, deliveryInfo.address].filter(Boolean).join(' ');
  return `<div class="delivery-card"><div class="delivery-card-title">🛵 بيانات التوصيل</div><div class="delivery-fields"><div class="delivery-field-row"><input type="text" list="deliveryCustomerSuggestions" data-action="delivery-combined" value="${escapeHtml(combined)}" placeholder="اكتب اسم العميل أو الهاتف ثم أكمل"><datalist id="deliveryCustomerSuggestions">${(DATA.customers||[]).slice(0,200).map(c=>`<option value="${escapeHtml([c.name,c.phone,c.address].filter(Boolean).join(' '))}"></option>`).join('')}${delivHistOptions('combined').map(v=>`<option value="${escapeHtml(v)}"></option>`).join('')}</datalist><button type="button" class="delivery-smart-btn" data-action="smart-delivery-fill" title="إكمال من سجل الزبائن (اختياري)">✦</button></div></div></div>`;
}

/* ================================================================
   🔖 لوحة العقود (إضافة جديدة)
   ================================================================ */
function renderContractPanel() {
  const contracts = (window.DEMO_DATA.contracts || []).filter(c => c.status === 'active');

  /* بحث داخل العقود */
  const filtered = contractSearchTerm.trim()
    ? contracts.filter(c =>
        `${c.client_name} ${c.company}`.toLowerCase().includes(contractSearchTerm.toLowerCase()))
    : contracts;

  const selected = contracts.find(c => c.id === selectedContractId);

  /* بطاقة العقد المختار */
  const selectedCard = selected ? `
    <div class="con-selected-card">
      <div class="con-sel-head">
        <div>
          <strong>${escapeHtml(selected.client_name)}</strong>
          ${selected.company ? `<span class="con-sel-company">${escapeHtml(selected.company)}</span>` : ''}
        </div>
        <button type="button" class="con-sel-clear" data-action="contract-clear">✕</button>
      </div>
      <div class="con-sel-meta">
        <span>📅 ${escapeHtml(selected.start_date)} ← ${escapeHtml(selected.end_date)}</span>
        <span>🕐 ${escapeHtml(selected.delivery_time || '—')}</span>
        <span>${selected.payment_method === 'installments' ? '💳 دفعات' : '💵 نقدي'}</span>
      </div>
      ${selected.notes ? `<div class="con-sel-note">📝 ${escapeHtml(selected.notes)}</div>` : ''}
    </div>` : '';

  /* قائمة العقود للاختيار */
  const listItems = filtered.map(c => `
    <button type="button"
      class="con-list-item ${c.id === selectedContractId ? 'selected' : ''}"
      data-action="contract-pick" data-id="${escapeHtml(c.id)}">
      <span class="con-list-icon">📋</span>
      <span class="con-list-info">
        <strong>${escapeHtml(c.client_name)}</strong>
        ${c.company ? `<small>${escapeHtml(c.company)}</small>` : ''}
      </span>
      <span class="con-list-type">${{ daily:'يومي', weekly:'أسبوعي', monthly:'شهري', custom:'مخصص' }[c.contract_type] || ''}</span>
    </button>`).join('');

  /* أصناف العقد المختار */
  const contractItems = selected ? `
    <div class="con-items-section">
      <div class="con-items-title">📦 أصناف العقد</div>
      <div class="con-items-grid">
        ${(selected.items || []).filter(it => {
          const liveItem = (DATA.items || []).find(m => m.id === it.item_id);
          return !liveItem || isMenuItemAvailable(liveItem);
        }).map(it => {
          const inCart = cart.find(c => c.id === it.item_id);
          return `<button type="button"
            class="con-item-btn ${inCart ? 'in-cart' : ''}"
            data-action="contract-add-item"
            data-item-id="${escapeHtml(it.item_id)}"
            data-name="${escapeHtml((DATA.items || []).find(function (m) { return m.id === it.item_id; }) ? saleItemName((DATA.items || []).find(function (m) { return m.id === it.item_id; })) : collapsePosLabel(it.name))}"
            data-price="${it.price}"
            data-qty="${it.qty}">
            ${inCart ? `<span class="item-qty-badge">${inCart.qty}</span>` : ''}
            <div class="item-name">${escapeHtml((DATA.items || []).find(function (m) { return m.id === it.item_id; }) ? saleItemName((DATA.items || []).find(function (m) { return m.id === it.item_id; })) : collapsePosLabel(it.name))}</div>
            <div class="con-item-meta">
              <span>الكمية: ${it.qty}</span>
              <span>${fmtCur(it.price)} ل.س</span>
            </div>
          </button>`;
        }).join('')}
      </div>
    </div>` : '';

  return `
    <div class="contract-panel">
      <div class="contract-panel-title">📋 اختر عقد العميل</div>

      <div class="con-search-row">
        <input type="search" dir="rtl"
          class="con-search-input"
          id="conSearchInput"
          placeholder="ابحث باسم العميل أو الشركة..."
          value="${escapeHtml(contractSearchTerm)}"
          data-action="contract-search"
          autocomplete="off">
        ${contractSearchTerm ? `<button type="button" class="con-search-clear" data-action="contract-search-clear">×</button>` : ''}
      </div>

      ${!contracts.length ? `<div class="con-empty">لا توجد عقود نشطة</div>` : ''}

      <div class="con-list">
        ${listItems || `<div class="con-empty">لا نتائج</div>`}
      </div>

      ${selectedCard}
      ${contractItems}
    </div>`;
}

/* ================================================================
   🎤 زر الإدخال الصوتي (إضافة جديدة)
   ================================================================ */
/* لوحة سقف الذمة الحية (آجل ← عقد) */
function deferredCreditPanel(){
  if (!selectedContractId) return '';
  const info = contractCreditInfo(selectedContractId);
  if (!info) return '';
  const t = Math.max(0, cart.reduce((s,x)=>s+x.price*x.qty,0) - discountParts().total);
  const st = creditState(info, t);
  if (!st) return '';
  const cls = st.over ? 'cr-over' : st.near ? 'cr-near' : 'cr-ok';
  const msg = st.over
    ? '🔴 تحذير: هذه الفاتورة تتجاوز سقف الذمة — أبلغ الإدارة قبل إتمام البيع'
    : st.near ? '🟡 الذمة تقترب من السقف' : '🟢 ضمن السقف';
  return `
    <div class="credit-panel ${cls}">
      <div class="credit-row"><span>الذمة الحالية</span><b>${fmtCur(info.balance)} ل.س</b></div>
      <div class="credit-row"><span>سقف العقد</span><b>${fmtCur(info.limit)} ل.س</b></div>
      <div class="credit-row"><span>بعد هذه الفاتورة (${fmtCur(t)})</span><b>${fmtCur(st.after)} ل.س</b></div>
      ${info.nextDue ? `<div class="credit-row"><span>أقرب استحقاق</span><b>${info.nextDue}</b></div>` : ''}
      <div class="credit-msg">${msg}</div>
    </div>`;
}

/* voiceMicBtn(target) — زر مايك لأي حقل (يكشف الهيدفون ويخفت بلا إنترنت) */
let voiceMicName = '';   // اسم جهاز الإدخال (هيدفون إن وُجد)
async function detectMicDevice() {
  try {
    const devs = await (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices());
    if (!devs) return;
    const ins = devs.filter(d => d.kind === 'audioinput');
    const external = ins.find(d => d.label && !/default|internal|array|built[- ]?in/i.test(d.label));
    voiceMicName = external ? external.label.slice(0, 24)
      : (ins.length > 1 ? 'مايك خارجي 🎧' : 'مايك الجهاز 🎤');
  } catch (e) { voiceMicName = ''; }
  updateVoiceUI();
}
function micIcon() { return /هيدفون|head|USB|خارجي/i.test(voiceMicName) ? '🎧' : '🎤'; }
function voiceOffline() { return navigator.onLine === false; }
const VOICE_TARGET_LABELS = {
  'search': 'البحث عن صنف', 'delivery-name': 'اسم العميل', 'delivery-phone': 'هاتف العميل',
  'delivery-address': 'عنوان العميل', 'note-modal': 'ملاحظة الصنف', 'pad-note': 'ملاحظة',
  'def-name': 'اسم العميل', 'def-phone': 'هاتف العميل', 'def-addr': 'العنوان',
};
function voiceMicBtn(target, big = false) {
  if (!(window.SpeechRecognition || window.webkitSpeechRecognition)) return '';
  const active = voiceActive && voiceTarget === target;
  const off = voiceOffline();
  return `<button type="button"
    class="voice-mic-btn ${active ? 'voice-active' : ''} ${big ? 'voice-big' : ''} ${off ? 'voice-net-off' : ''}"
    data-action="voice-start"
    data-voice-target="${target}"
    title="${off ? 'الإدخال الصوتي يحتاج إنترنت مؤقتاً' : (active ? 'إيقاف الاستماع' : 'إدخال صوتي' + (voiceMicName ? ' · ' + voiceMicName : ''))}">
    ${active ? '<span class="mic-live"></span>' : micIcon()}
  </button>`;
}
/* شارة «أستمع…» أثناء التسجيل */
function voiceStatusChip() {
  if (!voiceActive) return '';
  const lbl = VOICE_TARGET_LABELS[voiceTarget] || 'إدخال';
  return `<div class="voice-chip"><span class="voice-chip-dot"></span> أستمع… <b>${escapeHtml(lbl)}</b> ${micIcon()}</div>`;
}

/* للتوافق مع استخدام renderVoiceBtn في شريط البحث */
function renderVoiceBtn() { return voiceMicBtn('search'); }

/* target: 'search' | 'delivery-name' | 'delivery-phone' | 'delivery-address' */
let voiceTarget = 'search';

function startVoice(target = 'search') {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return showToast('المتصفح لا يدعم الإدخال الصوتي', '⚠️');
  if (voiceOffline()) return showToast('الإدخال الصوتي يحتاج إنترنت مؤقتاً — كل شيء آخر يعمل دون اتصال', '📴');
  if (!voiceMicName) detectMicDevice();
  if (voiceRecog) { try { voiceRecog.stop(); } catch(e){} }

  voiceTarget = target;
  voiceRecog  = new SR();
  voiceRecog.lang            = 'ar';   /* فصحى قريبة — الأسماء والأرقام والمناطق */
  voiceRecog.interimResults  = true;
  voiceRecog.continuous      = false;

  voiceRecog.onstart = () => { voiceActive = true; updateVoiceBtnState(); };
  voiceRecog.onend   = () => { voiceActive = false; updateVoiceBtnState(); };
  voiceRecog.onerror = (ev) => {
    voiceActive = false;
    updateVoiceBtnState();
    if (ev.error !== 'no-speech') showToast('خطأ في الإدخال الصوتي: ' + ev.error, '⚠️');
  };
  voiceRecog.onresult = (ev) => {
    let transcript = '';
    for (let i = ev.resultIndex; i < ev.results.length; i++) {
      transcript += ev.results[i][0].transcript;
    }
    applyVoiceTranscript(transcript);
  };

  voiceRecog.start();
}

function stopVoice() {
  try { voiceRecog?.stop(); } catch(e){}
  voiceActive = false;
  updateVoiceBtnState();
}

/* ── معالجة صوتية ذكية: أرقام منطوقة + مطابقة عملاء التوصيل ── */
const AR_DIGIT_WORDS = { 'صفر':0,'واحد':1,'اثنين':2,'اثنان':2,'تلاتة':3,'ثلاثة':3,'اربعة':4,'أربعة':4,'خمسة':5,'ستة':6,'سنة':6,'سبعة':7,'سبع':7,'ثمانية':8,'ثمنية':8,'تسعة':9,'تسع':9 };
function cleanPhoneVoice(text) {
  let out = '';
  String(text).split(/[\s،,.\-]+/).forEach(p => {
    const en = p.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    if (/^\d+$/.test(en)) out += en;
    else if (AR_DIGIT_WORDS[p] != null) out += String(AR_DIGIT_WORDS[p]);
    else {
      const key = p.replace(/^و/, '');
      if (AR_DIGIT_WORDS[key] != null) out += String(AR_DIGIT_WORDS[key]);
    }
  });
  return out.replace(/\D/g, '');
}
function normAr(t) { return String(t || '').replace(/[أإآ]/g, 'ا'); }
function matchDeliveryCustomerByAddress(text) {
  const t = normAr(text);
  let best = null;
  (DATA.customers || []).forEach(c => {
    const words = normAr(c.address).split(/[\s،\-]+/).filter(w => w.replace(/[^\u0600-\u06FF]/g, '').length >= 4);
    if (words.some(w => t.includes(w))) best = c;
  });
  return best;
}
function matchDeliveryCustomerByPhone(digits) {
  if (!digits || digits.length < 7) return null;
  const tail = digits.slice(-7);
  return (DATA.customers || []).find(c => String(c.phone || '').endsWith(tail)) || null;
}

/* تطبيق النص الصوتي على الحقل المستهدف */
function applyVoiceTranscript(text) {
  if (voiceTarget === 'search') {
    searchTerm       = text;
    searchOpen       = true;
    activeCategoryId = null;
    activeFamily     = null;
    updateSearchResultsOnly();
    const inp = document.getElementById('posSearchInput');
    if (inp) inp.value = text;

  } else if (voiceTarget === 'delivery-name') {
    deliveryInfo.name = text;
    const el = document.querySelector('[data-field="name"]');
    if (el) el.value = text;

  } else if (voiceTarget === 'delivery-phone') {
    /* أرقام منطوقة أو مكتوبة + مطابقة عميل موجود */
    const digits = cleanPhoneVoice(text);
    deliveryInfo.phone = digits;
    const el = document.querySelector('[data-field="phone"]');
    if (el) el.value = digits;
    const pm = matchDeliveryCustomerByPhone(digits);
    if (pm) {
      if (!deliveryInfo.name) { deliveryInfo.name = pm.name; const ne = document.querySelector('[data-field="name"]'); if (ne) ne.value = pm.name; }
      if (!deliveryInfo.address) { deliveryInfo.address = pm.address; const ae = document.querySelector('[data-field="address"]'); if (ae) ae.value = pm.address || ''; }
      showToast(`عميل معروف: ${pm.name} — مُلئت بياناته تلقائياً`, '🎧');
    }

  } else if (voiceTarget === 'delivery-address') {
    const cm = matchDeliveryCustomerByAddress(text);
    if (cm) {
      deliveryInfo.address = cm.address;
      if (!deliveryInfo.name) { deliveryInfo.name = cm.name; const ne = document.querySelector('[data-field="name"]'); if (ne) ne.value = cm.name; }
      if (!deliveryInfo.phone) { deliveryInfo.phone = cm.phone; const pe = document.querySelector('[data-field="phone"]'); if (pe) pe.value = cm.phone || ''; }
      showToast(`طابقنا العنوان مع العميل: ${cm.name}`, '🎧');
      renderPOS();
    } else {
      deliveryInfo.address = text;
      const el = document.querySelector('[data-field="address"]');
      if (el) el.value = text;
    }

  } else if (voiceTarget === 'note-modal') {
    const ta = document.getElementById('noteModalText');
    if (ta) {
      const cur = ta.value.trim();
      ta.value = cur ? cur + '، ' + text.trim() : text.trim();
      ta.focus();
    }
  } else if (voiceTarget === 'pad-note') {
    padBuf = (padBuf ? padBuf + ' ' : '') + text.trim();
    const pi = document.getElementById('dPadInput');
    if (pi) pi.value = padBuf;
  } else if (voiceTarget === 'def-name') {
    deferredName = text;
    const el = document.querySelector('[data-action="pay-def-name"]');
    if (el) el.value = text;

  } else if (voiceTarget === 'def-phone') {
    const digits = text.replace(/[^\d٠-٩]/g,'')
      .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    deferredPhone = digits;
    const el = document.querySelector('[data-action="pay-def-phone"]');
    if (el) el.value = digits;

  } else if (voiceTarget === 'def-addr') {
    deferredAddr = text;
    const el = document.querySelector('[data-action="pay-def-addr"]');
    if (el) el.value = text;
  }
}

/* تحديث حالة أزرار المايك بدون إعادة رسم كاملة */
function updateVoiceBtnState() { updateVoiceUI(); }
function updateVoiceUI() {
  document.querySelectorAll('.voice-mic-btn').forEach(btn => {
    const t = btn.dataset.voiceTarget;
    const active = voiceActive && voiceTarget === t;
    const off = voiceOffline();
    btn.classList.toggle('voice-active', active);
    btn.classList.toggle('voice-net-off', off);
    btn.innerHTML = active ? '<span class="mic-live"></span>' : micIcon();
    btn.title = off ? 'الإدخال الصوتي يحتاج إنترنت مؤقتاً'
      : (active ? 'إيقاف الاستماع' : 'إدخال صوتي' + (voiceMicName ? ' · ' + voiceMicName : ''));
  });
  document.querySelectorAll('.voice-chip').forEach(c => c.remove());
  if (voiceActive) {
    const hosts = document.querySelector('.d-topbar') || document.querySelector('.pos-work-header');
    if (hosts) hosts.insertAdjacentHTML('beforeend', voiceStatusChip());
  }
}
window.addEventListener('online', updateVoiceUI);
window.addEventListener('offline', updateVoiceUI);
if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
  try { navigator.mediaDevices.addEventListener('devicechange', detectMicDevice); } catch (e) {}
}

/* ================================================================
   💳 قسم طريقة الدفع (فوق زر الطباعة)
   ================================================================ */
function renderPaySection() {
  const methods = [
    { id:'cash',     icon:'💵', label:'كاش'    },
    { id:'wallet',   icon:'📲', label:'محفظة'  },
    { id:'deferred', icon:'📒', label:'آجل'    },
  ];

  const btns = methods.map(m => `
    <button type="button"
      class="pay-method-btn ${payMethod===m.id?'pay-active':''}"
      data-action="pay-method" data-value="${m.id}">
      <span class="pay-icon">${m.icon}</span>
      <span class="pay-label">${m.label}</span>
    </button>`).join('');

  /* الحقول الإضافية حسب النوع */
  let extra = '';

  if (payMethod === 'wallet') {
    extra = `
      <div class="pay-extra">
        <label class="pay-extra-label">رقم عملية التحويل</label>
        <input type="text" inputmode="numeric"
          class="pay-extra-input"
          data-action="pay-wallet-ref"
          value="${escapeHtml(walletRef)}"
          placeholder="أدخل رقم العملية...">
      </div>`;

  } else if (payMethod === 'partial') {
    const total = cart.reduce((s,x)=>s+x.price*x.qty, 0);
    const paid  = Number(partialAmount) || 0;
    const rem   = grandWithServices(total, discountParts().total) - paid;
    extra = `
      <div class="pay-extra">
        <label class="pay-extra-label">المبلغ المدفوع الآن</label>
        <input type="number" inputmode="numeric"
          class="pay-extra-input"
          data-action="pay-partial-amount"
          value="${escapeHtml(partialAmount)}"
          placeholder="أدخل المبلغ...">
        ${paid > 0 ? `<div class="pay-partial-rem ${rem>0?'rem-due':'rem-ok'}">
          ${rem>0 ? `المتبقي: ${fmtCur(rem)} ل.س` : `✅ المبلغ كافٍ`}
        </div>` : ''}
      </div>`;

  } else if (payMethod === 'deferred') {
    /* اختيار: عقد أو إدخال يدوي */
    const contracts = (window.DEMO_DATA.contracts||[]).filter(c=>c.status==='active');
    const modeBtns = `
      <div class="pay-deferred-modes">
        <button type="button"
          class="pay-def-mode-btn ${deferredMode==='contract'?'pay-def-active':''}"
          data-action="pay-deferred-mode" data-value="contract">📋 عقد</button>
        <button type="button"
          class="pay-def-mode-btn ${deferredMode==='manual'?'pay-def-active':''}"
          data-action="pay-deferred-mode" data-value="manual">✏️ بيانات يدوية</button>
      </div>`;

    if (deferredMode === 'contract') {
      const opts = contracts.map(c =>
        `<option value="${escapeHtml(c.id)}" ${selectedContractId===c.id?'selected':''}>
          ${escapeHtml(c.client_name)}${c.company?' — '+escapeHtml(c.company):''}
        </option>`).join('');
      extra = `<div class="pay-extra">
        ${modeBtns}
        <label class="pay-extra-label">اختر العقد</label>
        <select class="pay-extra-select" data-action="pay-deferred-contract">
          <option value="">— اختر عقداً —</option>${opts}
        </select>
        ${deferredCreditPanel()}
      </div>`;
    } else {
      extra = `<div class="pay-extra">
        ${modeBtns}
        <label class="pay-extra-label">بيانات العميل</label>
        <div class="pay-def-fields">
          <div class="delivery-field-row">
            <input type="text" class="pay-extra-input" data-action="pay-def-name" list="payDefNameHist"
              value="${escapeHtml(deferredName)}" placeholder="اسم العميل">
            ${voiceMicBtn('def-name')}
          </div>
          <div class="delivery-field-row">
            <input type="tel" inputmode="tel" class="pay-extra-input" data-action="pay-def-phone" list="payDefPhoneHist"
              value="${escapeHtml(deferredPhone)}" placeholder="رقم الهاتف">
            ${voiceMicBtn('def-phone')}
          </div>
          <div class="delivery-field-row">
            <input type="text" class="pay-extra-input" data-action="pay-def-addr" list="payDefAddrHist"
              value="${escapeHtml(deferredAddr)}" placeholder="العنوان (اختياري)">
            ${voiceMicBtn('def-addr')}
          </div>
        </div>
        ${defHistDatalists()}
      </div>`;
    }
  }

  return `
    <div class="pay-section">
      <div class="pay-section-title">💳 طريقة الدفع</div>
      <div class="pay-methods-row">${btns}</div>
      ${extra}
    </div>`;
}

function renderCalcModal(total) {
  if (!calcOpen) return '';
  const res = calcResult(total, calcPaid);
  return `
    <div class="calc-modal-scrim" data-action="close-calc"></div>
    <div class="calc-modal" role="dialog" aria-label="حاسبة الباقي">
      <div class="calc-modal-head">
        <strong>🧮 حاسبة الباقي</strong>
        <button type="button" data-action="close-calc">✕</button>
      </div>
      <div class="calc-total-row"><span>قيمة الفاتورة</span><strong>${fmt(total)}</strong></div>
      <input id="calcPaidInput" class="calc-paid-input" type="number" inputmode="numeric" value="${escapeHtml(calcPaid)}" placeholder="المبلغ المدفوع">
      <div id="calcResultBox" class="calc-result ${res.className}">${escapeHtml(res.text)}</div>
      <button class="calc-print-btn" type="button" data-action="calc-print">🖨️ طباعة الفاتورة</button>
    </div>
  `;
}

function calcResult(total, paidValue) {
  if (!paidValue) return { className: 'neutral', text: '0 ل.س' };
  const paid = Number(paidValue || 0) * (currencyNew ? 100 : 1); // الإدخال بعملة العرض الحالية
  const diff = paid - total;
  if (diff >= 0) return { className: 'change', text: `الباقي: ${fmt(diff)}` };
  return { className: 'due', text: `المتبقي: -${fmt(Math.abs(diff))}` };
}
function updateCalcResult() {
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0) - discountParts().total;
  const res = calcResult(total, calcPaid);
  const box = document.getElementById('calcResultBox');
  if (!box) return;
  box.className = `calc-result ${res.className}`;
  box.textContent = res.text;
}

function renderSelectionBar() {
  const cat = getActiveCategory();
  if (!cat && !activeFamily) return '';
  const parts = [];
  if (cat) parts.push(`<button type="button" data-action="go-level" data-level="category">${cat.icon} ${escapeHtml(cat.name)}</button>`);
  if (activeFamily) parts.push(`<button type="button" data-action="go-level" data-level="family">${escapeHtml(familyLabel(activeFamily))}</button>`);
  return `<div class="selection-bar"><button class="back-step-btn" type="button" data-action="back-step">‹ الرئيسية</button><div class="selection-pills">${parts.join('')}</div></div>`;
}

function renderMainCategoryGrid() {
  const cats = sellableCategories();
  return `<div class="single-stage"><div class="main-category-grid primary-only-grid">${cats.map(c => `<button class="main-category-card" type="button" data-action="category" data-value="${escapeHtml(c.id)}"><span>${c.icon}</span><strong>${escapeHtml(c.name)}</strong></button>`).join('')}<button class="main-category-card search-category-card" type="button" data-action="toggle-search"><span>🔎</span><strong>بحث</strong></button>${renderServicesCatCard()}</div></div>`;
}

/* ── زر الخدمات: شارة المبلغ + البطاقة + النافذة ── */
function svcBadgeHtml() {
  const t = servicesTotal();
  return t > 0 ? `<span class="svc-badge">+${fmtCur(t)}</span>` : '';
}
function renderServicesCatCard() {
  return `<button class="main-category-card services-category-card" type="button" data-action="open-services"><span>🛎️</span><strong>خدمات</strong>${svcBadgeHtml()}</button>`;
}
function renderServicesModal() {
  /* quick يعرض الخدمات داخل شبكة الأصناف؛ محرر القيمة يُفتح صراحةً فقط. */
  if (!servicesOpen || displayMode === 'direct' || displayMode === 'quick') return '';
  const t = Number(orderServices.table) || 0;
  const d = Number(orderServices.delivery) || 0;
  const h = Number(orderServices.hall) || 0;
  /* النمط السريع يعرض الخدمات كتصنيف فرعي: لا نضع سعراً جديداً من عندنا،
     بل نقرأ القيمة الحالية/التي يدخلها الكاشير كما كان الحال للطاولة والتوصيل. */
  const serviceHint = displayMode === 'quick'
    ? 'اختر خدمة فرعية ثم أدخل قيمتها من الإعداد/القيمة الحالية — لا تُنشأ أسعار تلقائياً.'
    : 'اترك القيمة 0 عند عدم وجود خدمة — تُضاف الخدمات فوق صافي الفاتورة';
  const serviceCards = displayMode === 'quick' ? `<div class="svc-subservices">
        <button type="button" class="svc-sub-card ${serviceSelected.delivery ? 'selected' : ''}" data-action="service-select" data-service="delivery"><span>🛵</span><b>خدمة توصيل</b><small>${d ? fmtCur(d) : 'بدون قيمة'}</small></button>
        <button type="button" class="svc-sub-card ${serviceSelected.table ? 'selected' : ''}" data-action="service-select" data-service="table"><span>🍽️</span><b>خدمة طاولة</b><small>${t ? fmtCur(t) : 'بدون قيمة'}</small></button>
        <button type="button" class="svc-sub-card ${serviceSelected.hall ? 'selected' : ''}" data-action="service-select" data-service="hall"><span>🛋️</span><b>خدمة صالة</b><small>${h ? fmtCur(h) : 'بدون قيمة'}</small></button>
      </div>` : '';
  return `
    <div class="svc-scrim" data-action="close-services"></div>
    <div class="svc-modal" role="dialog" aria-label="خدمات الطلب">
      <div class="svc-head"><strong>🛎️ خدمات الطلب</strong><button type="button" data-action="close-services">✕</button></div>
      <div class="svc-hint">${serviceHint}</div>
      ${serviceCards}
      <label class="svc-row"><span>🍽️ خدمة طاولة</span><input id="svcTable" type="number" min="0" inputmode="numeric" value="${t}" placeholder="0"></label>
      <label class="svc-row"><span>🛵 خدمة توصيل</span><input id="svcDelivery" type="number" min="0" inputmode="numeric" value="${d}" placeholder="0"></label>
      ${displayMode === 'quick' ? `<label class="svc-row"><span>🛋️ خدمة صالة</span><input id="svcHall" type="number" min="0" inputmode="numeric" value="${h}" placeholder="0"></label>` : ''}
      <div class="svc-actions">
        <button type="button" class="svc-save" data-action="save-services">✔ حفظ</button>
        <button type="button" class="svc-clear" data-action="clear-services">تصفير</button>
      </div>
    </div>`;
}
function readServicesInputs() {
  const t = document.getElementById('svcTable');
  const d = document.getElementById('svcDelivery');
  const h = document.getElementById('svcHall');
  orderServices.table = Math.max(0, Math.round(Number(t && t.value) || 0));
  orderServices.delivery = Math.max(0, Math.round(Number(d && d.value) || 0));
  if (h) orderServices.hall = Math.max(0, Math.round(Number(h.value) || 0));
  /* إدخال قيمة مباشرة يعد اختياراً للخدمة، أما الصفر بعد الضغط على بطاقة
     الخدمة فيبقى صفاً صفرياً إلى أن يضغط الكاشير «تصفير». */
  if (orderServices.table > 0) serviceSelected.table = true;
  if (orderServices.delivery > 0) serviceSelected.delivery = true;
  if (h && orderServices.hall > 0) serviceSelected.hall = true;
  applyServiceOrderType();
}
function openServices() {
  if (displayMode === 'direct') directAuxModal = 'services';
  else if (displayMode === 'quick') {
    servicesOpen = !servicesOpen;
    if (servicesOpen) { activeCategoryId = null; activeFamily = null; quickFilter = ''; quickFamilyFilter = ''; }
  } else servicesOpen = true;
  renderPOS();
}
function closeServices() {
  servicesOpen = false;
  if (displayMode === 'direct') directAuxModal = null;
  renderPOS();
}
function toggleQuickService(key) {
  if (displayMode !== 'quick') return;
  const def = quickServiceDef(key);
  if (!def) return;
  serviceSelected[key] = !serviceSelected[key];
  /* لا نضع سعراً جديداً: السطر يقرأ orderServices[key] الحالي، حتى لو كان
     صفراً. إلغاء الزر يزيل السطر من الفاتورة الحالية فقط. */
  if (!serviceSelected[key]) { orderServices[key] = 0; serviceNotes[key] = ''; }
  applyServiceOrderType(key);
  renderPOS();
}
function saveServices() {
  readServicesInputs();
  servicesOpen = false;
  if (displayMode === 'direct' || displayMode === 'quick') directAuxModal = null;
  renderPOS();
  const t = servicesTotal();
  showToast(t > 0 ? `خدمات الطلب: ${fmtCur(t)}` : 'لا خدمات على هذا الطلب', t > 0 ? '🛎️' : 'ℹ️');
}
function clearServices() {
  orderServices = { table: 0, delivery: 0, hall: 0 };
  serviceSelected = { table: false, delivery: false, hall: false };
  serviceNotes = { table: '', delivery: '', hall: '' };
  applyServiceOrderType();
  renderPOS();
}

function renderButtonFlow(items) {
  const fams = activeCategoryId ? families() : [];

  // المطلوب: تصنيف رئيسي -> تصنيف فرعي -> الأصناف مباشرة
  if (!activeCategoryId) return renderMainCategoryGrid();
  if (!activeFamily) {
    const westFam = activeCategoryId && westernCatIds().has(activeCategoryId);
    return `${renderSelectionBar()}<div class="single-stage"><div class="family-grid no-horizontal-scroll">${fams.map(f => `<button class="family-card" type="button" data-action="family" data-value="${escapeHtml(f)}"${westFam ? ` style="${famCardStyle(f, false)}"` : ''}>${escapeHtml(familyLabel(f))}</button>`).join('')}</div></div>`;
  }
  return `${renderSelectionBar()}<div class="item-grid final-items-grid">${renderItemButtons(items)}</div>`;
}

/* ── النمط الثالث: «مباشر» ──
   التصنيفات الرئيسية كأزرار كما في النمط الرئيسي،
   وعند اختيار تصنيف تظهر كل أصنافه مباشرة مقسّمة بعناوين فرعية — دون خطوة اختيار فرعي. */
function renderDirectFlow() {
  if (!activeCategoryId) return renderMainCategoryGrid();
  const all = catItems();
  const fams = uniq(all.map(i => i.family));
  const westDirect = activeCategoryId && westernCatIds().has(activeCategoryId);
  return `${renderSelectionBar()}<div class="direct-flow">${fams.map(f => `
    <section class="direct-family">
      <h3 class="direct-family-title"${westDirect ? ` style="${famTitleStyle(f)}"` : ''}>${escapeHtml(familyLabel(f))}</h3>
      <div class="item-grid final-items-grid direct-items-grid">${renderItemButtons(all.filter(i => i.family === f))}</div>
    </section>`).join('')}
  </div>`;
}

function renderDropdownFlow(items) {
  const cats = sellableCategories();
  const fams = activeCategoryId ? families() : [];
  return `
    <div class="dynamic-picker-card compact-picker">
      <div class="dynamic-grid two-level-grid">
        <label><span>الرئيسي</span><select data-action="select-category"><option value="">اختر...</option>${cats.map(c => `<option value="${escapeHtml(c.id)}" ${activeCategoryId===c.id?'selected':''}>${escapeHtml(c.icon+' '+c.name)}</option>`).join('')}</select></label>
        <label><span>الفرعي</span><select data-action="select-family" ${!activeCategoryId?'disabled':''}><option value="">اختر...</option>${fams.map(f => `<option value="${escapeHtml(f)}" ${activeFamily===f?'selected':''}>${escapeHtml(familyLabel(f))}</option>`).join('')}</select></label>
      </div>
      <button class="svc-mini-btn" type="button" data-action="open-services">🛎️ خدمات ${svcBadgeHtml()}</button>
    </div>
    ${activeFamily ? `<div class="item-grid final-items-grid">${renderItemButtons(items)}</div>` : `<div class="guide-box">اختر التصنيف ثم الفرعي لإظهار الأصناف.</div>`}
  `;
}

function renderSearchArea(items) {
  return `<div class="search-area"><div class="selection-bar search-selection-bar"><button class="back-step-btn" type="button" data-action="clear-search">‹ الرئيسية</button><input class="pos-search-input always-search" id="posSearchInput" type="search" dir="rtl" lang="ar" autocomplete="off" value="${escapeHtml(searchTerm)}" placeholder="ابحث عن صنف...">${renderVoiceBtn()}<button class="clear-search-btn inline-clear" type="button" data-action="clear-search-text">×</button></div><div id="searchResultsBox">${renderSearchResultsContent(items)}</div></div>`;
}

function renderSearchResultsContent(items) {
  return searchTerm.trim()
    ? `<div class="item-grid final-items-grid">${renderItemButtons(items)}</div>`
    : `<div class="guide-box search-guide">اكتب اسم الصنف للبحث السريع</div>`;
}
function renderSearchResults(items) { return renderSearchArea(items); }
function renderItemButtons(items, showFn, noPager) {   /* showFn: false = يُخفى بكلاس qn-off · noPager: بلا تقسيم صفحات */
  if (!items.length) return `<div class="empty-items">لا توجد أصناف ضمن هذا الاختيار</div>`;
  const _paged = !noPager && (isSandwichCategory() || items.length > itemPageSize);
  const paged = _paged ? items.slice(sandwichPage*itemPageSize, sandwichPage*itemPageSize+itemPageSize) : items;
  const pager = _paged && items.length > itemPageSize ? `<div class="items-pager"><button type="button" data-action="sandwich-prev" ${sandwichPage===0?'disabled':''}>→ السابق</button><span>صفحة ${sandwichPage+1} من ${Math.ceil(items.length/itemPageSize)}</span><button type="button" data-action="sandwich-next" ${sandwichPage>=Math.ceil(items.length/itemPageSize)-1?'disabled':''}>التالي ←</button></div>` : '';
  return paged.map(item => {
    const _off = showFn ? !showFn(item) : false;
    const inCart = cart.find(c => c.id === item.id);
    const drule = itemDiscRule(item.id);
    const weightPriceSuffix = isWeightItem(item) ? ' / كغ' : '';
    const priceHtml = drule
      ? `<div class="item-price"><s>${fmtCur(item.price)}${weightPriceSuffix}</s> <b>${fmtCur(itemNet(item))}${weightPriceSuffix}</b></div>`
      : `<div class="item-price">${fmtCur(item.price)}${weightPriceSuffix}</div>`;
    const itemBadge = inCart ? (rowWeightLabel(inCart) || fmtNum(inCart.qty)) : '';
    const parts = itemButtonParts(item);
    const nameHtml = parts.sub
      ? `<span class="item-name-main">${escapeHtml(parts.head)}</span><span class="item-name-sub">${escapeHtml(parts.sub)}</span>`
      : `<span class="item-name-main">${escapeHtml(parts.head)}</span>`;
    const westIt = isWesternItem(item);
    const quickIt = displayMode === 'quick';
    const itemStyle = quickIt ? quickItemStyle(item) : (westIt ? famItemStyle(item) : '');
    const itemAction = quickIt ? 'quick-item-add' : 'open-qty';
    return `<button class="item-btn${_off ? ' qn-off' : ''}" type="button" data-action="${itemAction}" data-id="${escapeHtml(item.id)}"${itemStyle ? ` style="${itemStyle}"` : ''}>${itemBadge ? `<span class="item-qty-badge">${escapeHtml(itemBadge)}</span>` : ''}${drule ? `<span class="item-disc-badge" title="خصم ${fmtNum(drule.pct)}%">−${fmtNum(drule.pct)}%</span>` : ''}<div class="item-name">${nameHtml}</div>${priceHtml}</button>`;
  }).join('') + pager;
}

function renderQtyModal() {
  if (!pendingItemId) return '';
  const item = DATA.items.find(i => i.id === pendingItemId);
  if (!isMenuItemAvailable(item)) return '';
  const nums = Array.from({length:25}, (_,i)=>i+1);
  const weightItem = isWeightItem(item);
  return `
    <div class="qty-modal-scrim" data-action="close-qty"></div>
    <div class="qty-modal" role="dialog" aria-label="تحديد الكمية">
      <div class="qty-modal-head">
        <div>
          <strong>${escapeHtml(itemButtonTitle(item))}</strong>
          <span>${fmtCur(item.price)} ${weightItem ? 'للكيلو' : 'للوحدة'}</span>
        </div>
        <button type="button" data-action="close-qty">✕</button>
      </div>
      ${weightItem ? `<div class="qedit-tabs"><b>الكمية</b><b class="active">الأوزان</b></div><div class="qty-number-grid weight-keys">${WEIGHT_OPTIONS.map(g => `<button type="button" data-action="weight-add" data-value="${g}">${g}</button>`).join('')}</div><div class="quick-qty-hint">اختر الوزن قبل إضافة الصنف إلى الفاتورة</div>` : `<div class="qty-number-grid">${nums.map(n => `<button type="button" data-action="qty-pick" data-value="${n}">${n}</button>`).join('')}</div><div class="qty-custom-row">
        <input id="customQtyInput" type="number" inputmode="numeric" min="26" placeholder="كمية أكبر من 25">
        <button type="button" data-action="qty-custom">إضافة</button>
      </div>`}
    </div>
  `;
}

function openQtyModal(id) {
  const item = DATA.items.find(i => i.id === id);
  if (!isMenuItemAvailable(item)) return showToast('الصنف غير متاح حالياً', '⚠️');
  const lockedRow = cart.find(c => c.id === id && c.locked);
  if (lockedRow) return showToast('🔒 العرض ثابت — يمكن الإضافة عليه فقط','⚠️');
  document.activeElement?.blur?.();
  pendingItemId = id;
  renderPOS();
}
function closeQtyModal() {
  pendingItemId = null;
  renderPOS();
}
function confirmQty(qty) {
  if (!pendingItemId || !qty || qty <= 0) return;
  addToCart(pendingItemId, qty);
  pendingItemId = null;
  dropModalNodes();
  focusQuickNote();
}
function confirmCustomQty() {
  const input = document.getElementById('customQtyInput');
  const qty = Number(input?.value || 0);
  if (!qty || qty <= 0) return showToast('أدخل كمية صحيحة', '⚠️');
  confirmQty(qty);
}

function renderNoteModal() {
  if (!pendingNoteItemId) return '';
  const row = cart.find(c => c.id === pendingNoteItemId);
  const serviceKey = serviceKeyFromId(pendingNoteItemId);
  const serviceRow = serviceKey ? serviceRowForId(pendingNoteItemId) : null;
  const target = row || serviceRow;
  if (!target) return '';
  const current = row ? String(row.note || '') : String(serviceNotes[serviceKey] || '');
  return `
    <div class="note-modal-scrim" data-action="close-note"></div>
    <div class="note-modal" role="dialog" aria-label="ملاحظات الصنف">
      <div class="note-modal-head">
        <div>
          <strong>${escapeHtml(target.name)}</strong>
          <span>${target.is_service ? 'ملاحظة الخدمة' : 'اختر ملاحظة أو أكثر'} — أو قلها بصوتك</span>
        </div>
        <div class="note-head-tools">
          ${voiceMicBtn('note-modal', true)}
          <button type="button" data-action="close-note">✕</button>
        </div>
      </div>
      <div class="note-suggestions-grid">
        ${learnedNoteSuggestions(target.id).map(n => `<button type="button" class="note-suggestion ${noteHas(current,n) ? 'selected' : ''}" data-action="note-toggle" data-value="${escapeHtml(n)}">${escapeHtml(n)}</button>`).join('')}
      </div>
      <textarea id="noteModalText" class="note-modal-text" placeholder="أو اكتب ملاحظة خاصة...">${escapeHtml(current)}</textarea>
      <button class="note-save-btn" type="button" data-action="note-save">حفظ الملاحظات</button>
    </div>
  `;
}
function noteParts(text) {
  return String(text || '').split('،').map(x => x.trim()).filter(Boolean);
}
function noteHas(text, note) {
  return noteParts(text).includes(note);
}
function learnedNoteSuggestions(itemId) {
  const out = [];
  const seen = new Set();
  const add = v => { const t=String(v||'').trim(); if(t && !seen.has(t)){seen.add(t);out.push(t);} };
  NOTE_SUGGESTIONS.forEach(add);
  (DATA.invoices || []).forEach(inv => (inv.items || []).forEach(it => {
    if (!itemId || it.id === itemId) noteParts(it.note).forEach(add);
  }));
  return out.slice(0, 24);
}
function openNoteModal(id) {
  directSelectedId = id;
  const lr = cart.find(c => c.id === id && c.locked);
  if (lr) return showToast('🔒 لا ملاحظات على العرض — أضف أصنافاً عادية إن أردت','⚠️');
  if (!cart.some(c => c.id === id) && !serviceRowForId(id)) return showToast('حدد صنفاً أو خدمة أولاً','⚠️');
  pendingNoteItemId = id;
  renderPOS();
}
function closeNoteModal() {
  pendingNoteItemId = null;
  renderPOS();
}
function toggleNoteSuggestion(note) {
  const row = cart.find(c => c.id === pendingNoteItemId);
  const serviceKey = serviceKeyFromId(pendingNoteItemId);
  if (!row && !serviceRowForId(pendingNoteItemId)) return;
  let parts = noteParts(row ? row.note : serviceNotes[serviceKey]);
  if (parts.includes(note)) parts = parts.filter(x => x !== note);
  else parts.push(note);
  if (row) row.note = parts.join('، ');
  else serviceNotes[serviceKey] = parts.join('، ');
  renderPOS();
}
function saveNoteModal() {
  const row = cart.find(c => c.id === pendingNoteItemId);
  const serviceKey = serviceKeyFromId(pendingNoteItemId);
  const inputNote = document.getElementById('noteModalText')?.value.trim() || '';
  if (row) {
    row.note = inputNote;
    noteHistAdd(row.note);
  } else if (serviceKey && serviceRowForId(pendingNoteItemId)) {
    serviceNotes[serviceKey] = inputNote;
    noteHistAdd(inputNote);
  }
  const changedId = pendingNoteItemId;
  pendingNoteItemId = null;
  if (row && !updateCartPanel([changedId])) renderPOS();
  else renderPOS();
  dropModalNodes();
}

/* ── تعديل الكمية بالنقر على خانة العدد (نفس آلية الملاحظات) ── */
function openQtyEdit(id) {
  const row = cart.find(c => c.id === id);
  if (!row) return;
  if (row.locked) return showToast('🔒 العرض ثابت — يمكن الإضافة عليه فقط', '⚠️');
  qtyEditId = id;
  qtyEditBuf = '';
  renderPOS();
}
function closeQtyEdit() {
  qtyEditId = null;
  qtyEditBuf = '';
  renderPOS();
}
function qtyEditKey(v) {
  if (v === 'C') qtyEditBuf = '';
  else if (v === '⌫') qtyEditBuf = qtyEditBuf.slice(0, -1);
  else if (/^[0-9]$/.test(v || '') && qtyEditBuf.length < 3) qtyEditBuf += v;
  if (!updateQEditDisplay()) renderPOS();
}
function applyQtyEdit() {
  const row = cart.find(c => c.id === qtyEditId);
  const buf = qtyEditBuf;
  qtyEditId = null;
  qtyEditBuf = '';
  if (!row || buf === '') { dropModalNodes(); return; }   // لا تغيير = إغلاق فقط بلا أي بناء
  const q = Math.floor(Number(buf));
  if (!Number.isFinite(q) || q <= 0) {
    cart = cart.filter(c => c.id !== row.id);
    showToast(`حُذف «${row.name}» من الفاتورة`, '🗑️');
  } else {
    row.qty = Math.min(999, q);
    showToast(`الكمية الجديدة: ${fmtNum(row.qty)}`, '🔢');
  }
  if (!updateCartPanel([row.id])) renderPOS();
  dropModalNodes();
}
function renderQtyEditModal() {
  if (!qtyEditId) return '';
  const row = cart.find(c => c.id === qtyEditId);
  if (!row) return '';
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', 'C'];
  return `
    <div class="qedit-scrim" data-action="qty-edit-close"></div>
    <div class="qedit-modal" role="dialog" aria-label="تعديل الكمية">
      <div class="qedit-head"><strong>🔢 تعديل الكمية</strong><button type="button" data-action="qty-edit-close">✕</button></div>
      <div class="qedit-item">${escapeHtml(row.name)}</div>
      ${isWeightItem(row) ? `<div class="qedit-tabs"><b>الكمية</b><b class="active">الأوزان</b></div><div class="qedit-keys weight-keys">${WEIGHT_OPTIONS.map(g => `<button type="button" class="qedit-key" data-action="weight-pick" data-value="${g}">${g}</button>`).join('')}</div>` : `<div class="qedit-display"><small>القديمة: ${fmtNum(row.qty)}</small><b id="qeditDisplay">${qtyEditBuf === '' ? '—' : escapeHtml(qtyEditBuf)}</b></div><div class="qedit-keys">${keys.map(k => `<button type="button" class="qedit-key${k === 'C' ? ' danger' : ''}" data-action="qty-edit-key" data-value="${k}">${k}</button>`).join('')}</div>`}
      <div class="qedit-hint">${isWeightItem(row) ? 'اختيار الوزن الجديد يستبدل الوزن السابق' : 'الرقم الجديد يستبدل القديم · 0 = حذف السطر · فارغ = إلغاء'}</div>
      <div class="svc-actions">
        <button type="button" class="svc-save" data-action="qty-edit-apply">✔ تطبيق</button>
        <button type="button" class="svc-clear" data-action="qty-edit-close">إلغاء</button>
      </div>
    </div>`;
}

function renderCashierSideLinks() {
  return `
    <button class="side-link active" type="button"><span class="side-ic">🧾</span><span class="side-lb">فاتورة جديدة</span></button>
    <button class="side-link" type="button" data-action="open-menu-refresh"><span class="side-ic">↻</span><span class="side-lb">تحديث القائمة</span></button>
    <button class="side-link" type="button" data-action="invoices"><span class="side-ic">🧾</span><span class="side-lb">الفواتير</span></button>
    <button class="side-link" type="button" data-action="session"><span class="side-ic">🕘</span><span class="side-lb">الوردية والصندوق</span></button>
    <button class="side-link" type="button" data-action="kitchen"><span class="side-ic">🍳</span><span class="side-lb">شاشة المطبخ</span></button>
    <button class="side-link" type="button" data-action="queue"><span class="side-ic">🔔</span><span class="side-lb">شاشة النداء</span></button>
    <button class="side-link" type="button" data-action="tables"><span class="side-ic">🗺️</span><span class="side-lb">خريطة الطاولات</span></button>

    <button class="side-link ${currencyNew ? 'active-soft' : ''}" type="button" data-action="toggle-currency"><span class="side-ic">💱</span><span class="side-lb">${currencyNew ? 'عرض العملة القديمة' : 'عرض العملة الجديدة'}</span></button>
    <button class="side-link ${cardsVisible ? '' : 'active-soft'}" type="button" data-action="toggle-cards"><span class="side-ic">🎁</span><span class="side-lb">${cardsVisible ? 'إخفاء البطاقات' : 'إظهار البطاقات'}</span></button>
    <button class="side-link" type="button" data-action="customers"><span class="side-ic">👥</span><span class="side-lb">العملاء</span></button>
    <div class="side-spacer"></div><button class="side-link danger" type="button" data-action="logout"><span class="side-ic">🚪</span><span class="side-lb">خروج</span></button>`;
}
function renderMobileCashierLinks() {
  return `
    <button class="mobile-nav-link active" type="button" data-action="close-nav"><span>🧾</span><small>فاتورة جديدة</small></button>
    <button class="mobile-nav-link" type="button" data-action="open-menu-refresh"><span>↻</span><small>تحديث القائمة</small></button>
    <button class="mobile-nav-link" type="button" data-action="invoices"><span>🧾</span><small>الفواتير</small></button>
    <button class="mobile-nav-link" type="button" data-action="session"><span>🕘</span><small>الوردية والصندوق</small></button>
    <button class="mobile-nav-link" type="button" data-action="kitchen"><span>🍳</span><small>المطبخ</small></button>
    <button class="mobile-nav-link" type="button" data-action="queue"><span>🔔</span><small>النداء</small></button>
    <button class="mobile-nav-link" type="button" data-action="tables"><span>🗺️</span><small>الطاولات</small></button>

    <button class="mobile-nav-link ${currencyNew ? 'active' : ''}" type="button" data-action="toggle-currency"><span>💱</span><small>${currencyNew ? 'العملة القديمة' : 'العملة الجديدة'}</small></button>
    <button class="mobile-nav-link" type="button" data-action="toggle-cards"><span>🎁</span><small>${cardsVisible ? 'إخفاء البطاقات' : 'إظهار البطاقات'}</small></button>
    <button class="mobile-nav-link" type="button" data-action="customers"><span>👥</span><small>العملاء</small></button>
    <button class="mobile-nav-link danger" type="button" data-action="logout"><span>🚪</span><small>خروج</small></button>`;
}

function renderQuickCashierLinks() {
  return `
    <button class="mobile-nav-link active" type="button" data-action="close-nav"><span>🧾</span><small>فاتورة جديدة</small></button>
    <button class="mobile-nav-link" type="button" data-action="open-menu-refresh"><span>↻</span><small>تحديث القائمة</small></button>
    <button class="mobile-nav-link" type="button" data-action="toggle-search"><span>🔍</span><small>بحث</small></button>
    <button class="mobile-nav-link" type="button" data-action="open-popular-modal"><span>⭐</span><small>الأكثر طلباً</small></button>
    <button class="mobile-nav-link" type="button" data-action="open-offers-modal"><span>🎟️</span><small>العروض</small></button>
    <button class="mobile-nav-link" type="button" data-action="open-direct-disc"><span>💸</span><small>الحسم</small></button>
    <button class="mobile-nav-link" type="button" data-action="emergency-price"><span>💰</span><small>سعر طارئ</small></button>
    <button class="mobile-nav-link" type="button" data-action="delivery-screen"><span>🛵</span><small>التوصيل</small></button>
    <button class="mobile-nav-link" type="button" data-action="invoices"><span>🧾</span><small>الفواتير</small></button>
    <button class="mobile-nav-link" type="button" data-action="session"><span>🕘</span><small>الوردية والصندوق</small></button>
    <button class="mobile-nav-link" type="button" data-action="kitchen"><span>🍳</span><small>المطبخ</small></button>
    <button class="mobile-nav-link" type="button" data-action="queue"><span>🔔</span><small>النداء</small></button>
    <button class="mobile-nav-link" type="button" data-action="tables"><span>🗺️</span><small>الطاولات</small></button>
    <button class="mobile-nav-link" type="button" data-action="order-type" data-value="contract"><span>📋</span><small>العقود</small></button>
    <button class="mobile-nav-link ${currencyNew ? 'active' : ''}" type="button" data-action="toggle-currency"><span>💱</span><small>${currencyNew ? 'العملة القديمة' : 'العملة الجديدة'}</small></button>
    <button class="mobile-nav-link" type="button" data-action="toggle-cards"><span>🎁</span><small>${cardsVisible ? 'إخفاء البطاقات' : 'إظهار البطاقات'}</small></button>
    <button class="mobile-nav-link" type="button" data-action="customers"><span>👥</span><small>العملاء</small></button>
    <button class="mobile-nav-link danger" type="button" data-action="logout"><span>🚪</span><small>خروج</small></button>`;
}

function closeMenuRefreshDialog() {
  const box = document.getElementById('posMenuRefreshDialog');
  if (box) box.remove();
}
function openMenuRefreshDialog() {
  closeMenuRefreshDialog();
  const box = document.createElement('div');
  box.id = 'posMenuRefreshDialog';
  box.dir = 'rtl';
  box.innerHTML = `
    <div class="pos-refresh-scrim"></div>
    <div class="pos-refresh-card" role="dialog" aria-modal="true" aria-label="تحديث القائمة">
      <div class="pos-refresh-head"><strong>↻ تحديث أصناف وأسعار الكاشير</strong><button type="button" data-pos-refresh="close">✕</button></div>
      <p>التحديث المحلي يقرأ آخر نسخة مثبتة على الخادم المحلي. الخيار السحابي يرفع المعلّقات أولاً ثم يجلب من السحابة، ولا يكتب فوق تعديل محلي غير مرفوع.</p>
      <div class="pos-refresh-actions">
        <button type="button" class="pos-refresh-local" data-pos-refresh="local">▣ تحديث محلي فقط</button>
        <button type="button" class="pos-refresh-cloud" data-pos-refresh="cloud">☁️ تحديث محلي + السحابة</button>
        <button type="button" class="pos-refresh-stay" data-pos-refresh="close">إلغاء</button>
      </div>
      <div class="pos-refresh-status" aria-live="polite"></div>
    </div>`;
  document.body.appendChild(box);
  box.querySelectorAll('[data-pos-refresh="close"]').forEach(b => b.addEventListener('click', closeMenuRefreshDialog));
  box.querySelector('[data-pos-refresh="local"]').addEventListener('click', () => refreshPOSMenu('local'));
  box.querySelector('[data-pos-refresh="cloud"]').addEventListener('click', () => refreshPOSMenu('cloud'));
}
async function refreshPOSMenu(mode) {
  const box = document.getElementById('posMenuRefreshDialog');
  const status = box && box.querySelector('.pos-refresh-status');
  const buttons = box ? box.querySelectorAll('button') : [];
  buttons.forEach(b => { b.disabled = true; });
  if (status) status.textContent = mode === 'cloud' ? 'جاري تثبيت المعلّقات ثم انتظار السحابة…' : 'جاري قراءة الخادم المحلي…';
  try {
    if (!window.AlfaManualSync) throw new Error('محرك التحديث غير متاح');
    const result = mode === 'cloud'
      ? await AlfaManualSync.refreshCloudMenu()
      : await AlfaManualSync.refreshLocalMenu();
    closeMenuRefreshDialog();
    if (result && result.cloud === false) {
      const reason = result.failed ? 'يوجد رفع فاشل' : result.pending ? 'يوجد رفع معلّق' : 'السحابة غير متاحة';
      showToast('أُبقيت النسخة المحلية — ' + reason + '، ولن تُستبدل بنسخة قديمة', result.failed ? '⚠️' : '⏳');
    } else if (result && (result.skipped || result.error)) {
      showToast('أُبقيت النسخة المحلية — ' + String(result.error || result.reason || 'تعذر التحديث'), 'ℹ️');
    } else {
      showToast(mode === 'cloud' ? 'تم تحديث الكاشير من المحلي والسحابة ✅' : 'تم تحديث الكاشير من الخادم المحلي ✅', mode === 'cloud' ? '☁️' : '▣');
    }
    try { renderPOS(); } catch (e) {}
  } catch (e) {
    if (status) status.textContent = 'تعذر التحديث: ' + String(e && e.message || e);
    buttons.forEach(b => { b.disabled = false; });
    showToast('تعذر تحديث القائمة — بقيت البيانات المحلية', '⚠️');
  }
}

function bindPOSActions() {
  document.querySelectorAll('[data-action]').forEach(el => {
    const action = el.dataset.action;
    if (el.tagName === 'SELECT') el.addEventListener('change', () => handleAction(action, el.value, el));
    else if (el.tagName === 'TEXTAREA') {
      if (action === 'note-open') el.addEventListener('click', () => handleAction(action, el.value, el));
      else if (action === 'order-note-inline') {
        const syncOrderNote = () => { orderNotes = String(el.value || '').trim(); saveDraft(); };
        el.addEventListener('input', syncOrderNote);
        el.addEventListener('change', syncOrderNote);
      }
      else el.addEventListener('change', () => handleAction(action, el.value, el));
    }
    else if (el.tagName === 'INPUT') {
      const liveActions = ['delivery-field','delivery-combined','pay-wallet-ref','pay-partial-amount','pay-def-name','pay-def-phone','pay-def-addr'];
      if (liveActions.includes(action)) el.addEventListener('input', () => handleAction(action, el.value, el));
      else el.addEventListener('input', () => handleAction(action, el.value, el));
    }
    else el.addEventListener('click', (ev) => {
      /* خانة العدد داخل صف الفاتورة: امنع الفقاعة لمعالج الصف (d-select-row)
         الذي يفتح نافذة الملاحظات — وإلا ظهرت الملاحظات بدل لوحة الكمية */
      if (action === 'qty-edit') ev.stopPropagation();
      handleAction(action, el.dataset.value, el, ev);
    });
  });
  document.getElementById('posSearchInput')?.addEventListener('input', e => { searchTerm = e.target.value; updateSearchResultsOnly(); });
  /* مربع الكتابة السريعة للملاحظات فقط: Enter لا يفتح بحثاً ولا يصفّي
     الأصناف. الحفظ يتم صراحةً من أزرار «ملاحظة الصنف/الطلب». */
  const _qn = document.getElementById('quickNoteInput');
  if (_qn) _qn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); updateQuickSuggest(); }
  });
  const _qqi = document.getElementById('quickQtyInput');
  if (_qqi) _qqi.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.target.disabled) { e.preventDefault(); handleAction('quick-qty-input-apply', '', _qqi); }
  });
  document.getElementById('conSearchInput')?.addEventListener('input', e => { contractSearchTerm = e.target.value; updateContractList(); });
  document.getElementById('calcPaidInput')?.addEventListener('input', e => { calcPaid = e.target.value; updateCalcResult(); });
}

function findCustomerByPhone(phone) {
  const ph = String(phone || '').replace(/\D/g, '');
  if (ph.length < 5) return null;
  return (DATA.customers || []).find(c => {
    const cp = String(c.phone || '').replace(/\D/g, '');
    return cp && (cp === ph || cp.endsWith(ph) || ph.endsWith(cp));
  }) || null;
}
function autoFillDeferred(phone) {
  const c = findCustomerByPhone(phone);
  if (!c) return;
  deferredName = c.name || '';
  deferredPhone = c.phone || phone;
  deferredAddr = c.address || '';
  const nameEl = document.querySelector('[data-action="pay-def-name"]');
  const addrEl = document.querySelector('[data-action="pay-def-addr"]');
  if (nameEl) nameEl.value = deferredName;
  if (addrEl) addrEl.value = deferredAddr;
}
function autoFillPartial(phone) {
  const c = findCustomerByPhone(phone);
  if (!c) return;
  partialName = c.name || '';
  partialPhone = c.phone || phone;
  const nameEl = document.querySelector('[data-action="pay-partial-name"]');
  if (nameEl) nameEl.value = partialName;
}

function handleAction(action, value, el, ev) {
  switch(action) {
    case 'clear-last-sale': clearLastSale(); return renderPOS();
    case 'cashier-invoice-no': cashierPaymentInvoiceNo = String(el && el.value || ''); return;
    case 'cashier-paid': return markInvoicePayment('paid');
    case 'cashier-unpaid': return markInvoicePayment('unpaid');
    case 'open-menu-refresh': return openMenuRefreshDialog();
    case 'toggle-nav': return toggleCashierNav();
    case 'close-nav': return closeCashierNav();
    case 'toggle-search': return toggleSearch();
    case 'clear-search': return clearSearch();
    case 'clear-search-text': searchTerm=''; return updateSearchInputAndResults();
    case 'quick-item-add': {
      if (displayMode !== 'quick') return;
      /* صنف الوزن يُضاف فوراً ككيلوغرام واحد؛ لوحة الأوزان للتعديل اللاحق فقط. */
      return directItemAdd(el.dataset.id);
    }
    case 'quick-qty-pick':
      if (displayMode !== 'quick') return;
      return quickQtyPick(value);
    case 'quick-qty-input-apply':
      if (displayMode !== 'quick') return;
      return applyQuickQtyInput();
    case 'quick-weight-pick':
      if (displayMode !== 'quick') return;
      return quickWeightPick(value);
    case 'toggle-item-page-size': return toggleItemPageSize();
    case 'quick-search-submit': {
      /* توافق مع أي حدث قديم: Enter في مربع الملاحظة لا يبحث ولا يرشح. */
      if (displayMode !== 'quick') return;
      quickFilter = '';
      updateQuickFilterBadge();
      updateQuickSuggest();
      focusQuickNote();
      return;
    }
    case 'toggle-mode': return toggleDisplayMode();
    case 'toggle-currency': return toggleCurrency();
    case 'toggle-cards': return toggleCardsVisible();
    case 'close-leave':  return closeLeaveModal();
    case 'confirm-leave': return confirmLeave();
    case 'toggle-cards-drawer': return toggleCardsDrawer();
    case 'order-offer': return orderOffer(value);
    case 'order-offer-modal': orderOffer(value); return;
    case 'open-popular-modal': return openPopularModal();
    case 'open-offers-modal': return openOffersModal();
    case 'close-cards-modal': return closeCardsModal();
    case 'cards-modal-tab': cardsModalTab = value; return renderPOS();
    case 'order-type':
      orderType = value;
      serviceTypeAuto = false;
      if (value !== 'contract') { selectedContractId = null; contractSearchTerm = ''; }
      if (displayMode === 'direct') {
        if (value === 'dinein') directAuxModal = 'hall';
        else if (value === 'delivery') directAuxModal = 'delivery';
        else if (value === 'contract') directAuxModal = 'contract';
        else directAuxModal = null;
      }
      return renderPOS();
    case 'hall':
      selectedHall = value; selectedTable = '';
      if (displayMode === 'direct') directAuxModal = 'hall';
      return renderPOS();
    case 'table-pick':
      selectedTable = value; orderType = 'dinein'; serviceTypeAuto = false; directAuxModal = null;
      return renderPOS();
    case 'close-direct-aux':
      directAuxModal = null;
      return renderPOS();
    case 'open-services': return openServices();
    case 'order-note': case 'quick-note-order': {
      /* نص بمربع الكتابة ⇒ ملاحظات الطلب فوراً. فارغ ⇒ النافذة القديمة */
      const _t = quickNoteText();
      if (_t) { orderNotes = _t; noteHistAdd(_t); clearQuickNote(); showToast('📝 تم تثبيت ملاحظات الطلب', '✅'); return renderPOS(); }
      directAuxModal = 'order-note'; return renderPOS();
    }
    case 'order-note-save': { const x=document.getElementById('orderNoteInput'); orderNotes=(x&&x.value||'').trim(); noteHistAdd(orderNotes); directAuxModal=null; return renderPOS(); }
    case 'order-note-pick': { const x=document.getElementById('orderNoteInput'); if(x) x.value=value; return; }
    case 'selected-note': {
      /* نص + تحديد صف من الفاتورة ⇒ يذهب للصنف المحدد، لا لآخر صنف أضيف */
      const _t = quickNoteText();
      if (_t) return quickAttachItemNote(_t, true);
      if (!directSelectedId) return showToast('حدد صنفًا أولًا','⚠️');
      return openNoteModal(directSelectedId);
    }
    case 'quick-note-item': {
      /* نص + زر «ملاحظة آخر صنف» ⇒ يذهب لآخر صنف أضيف */
      const _t = quickNoteText();
      if (_t) return quickAttachItemNote(_t, false);
      const _last = quickNoteTargetId(false);
      if (!_last) return showToast('أضف صنفاً أولاً','⚠️');
      return openNoteModal(_last);
    }
    case 'quick-note-input': {
      /* كل طول للنص يبقى ملاحظة/اقتراحاً فقط؛ لا تُلمس قائمة الأصناف
         أثناء الكتابة ولا عند الضغط على Enter. */
      if (displayMode !== 'quick') return;
      if (quickFilter) {
        quickFilter = '';
        updateQuickFilterBadge();
      }
      updateQuickSuggest();
      return;
    }
    case 'quick-note-suggest': {
      /* نقرة اقتراح من الكتابات السابقة ⇒ يُكتب بالمربع ويبقى المؤشر فيه */
      const _el = quickNoteEl();
      if (_el) _el.value = value || '';
      updateQuickSuggest();
      focusQuickNote();
      return;
    }
    case 'clear-quick-filter': {
      quickFilter = '';
      const _el = quickNoteEl(); if (_el) _el.value = '';
      updateQuickFilterBadge();
      updateQuickSuggest();
      if (!updateItemsAreaOnly()) renderPOS();
      focusQuickNote();
      return;
    }
    case 'weight-edit': { const r=cart.find(x=>x.id===directSelectedId); if(!r||!isWeightItem(r)) return showToast('حدد صنفًا يباع بالكيلو','⚠️'); directAuxModal='weight-edit'; return renderPOS(); }
    case 'weight-save': { const r=cart.find(x=>x.id===directSelectedId); const g=Number(document.getElementById('weightGrams')?.value); if(!r||!isWeightItem(r)||!Number.isFinite(g)||g<=0) return showToast('أدخل وزنًا صحيحًا','⚠️'); r.weight_grams=Math.round(g); r.qty=r.weight_grams/1000; r.weight_label=r.weight_grams+' غرام'; directAuxModal=null; return renderPOS(); }
    case 'emergency-price': {
      const r = cart.find(x => x.id === directSelectedId && !x.locked);
      const sk = selectedServiceKey();
      if (!r && !sk) return showToast('حدد صنفًا أو خدمة أولًا','⚠️');
      directAuxModal = 'emergency-price'; return renderPOS();
    }
    case 'emergency-price-save': {
      const r = cart.find(x => x.id === directSelectedId && !x.locked);
      const sk = selectedServiceKey();
      const input = document.getElementById('emergencyPriceInput');
      const price = Math.round(Number(input && input.value));
      if (!Number.isFinite(price) || price < 0 || (!r && !sk)) return showToast('أدخل قيمة صحيحة','⚠️');
      if (r) {
        const original = Number(r.original_price != null ? r.original_price : r.price) || 0;
        r.original_price = original; r.price = price; r.price_override = true; r.override_reason = '';
        if (window.AlfaAudit && AlfaAudit.log) AlfaAudit.log('invoices','تعديل سعر طارئ',`${r.name}: ${original} → ${price}`,(DATA.cashierSession&&DATA.cashierSession.cashier_name)||'الكاشير');
      } else {
        const original = Number(orderServices[sk]) || 0;
        orderServices[sk] = price;
        serviceSelected[sk] = true;
        applyServiceOrderType(sk);
        if (window.AlfaAudit && AlfaAudit.log) AlfaAudit.log('invoices','تعديل سعر طارئ',`${quickServiceDef(sk)?.name || sk}: ${original} → ${price}`,(DATA.cashierSession&&DATA.cashierSession.cashier_name)||'الكاشير');
      }
      directAuxModal = null; showToast('تم تعديل السعر لهذه الفاتورة فقط','💰'); return renderPOS();
    }
    case 'open-services-editor':
      if (displayMode !== 'quick') return;
      servicesOpen = false; directAuxModal = 'services'; return renderPOS();
    case 'quick-service-toggle': return toggleQuickService(el.dataset.service);
    case 'close-services': return closeServices();
    case 'service-select': {
      const k=el.dataset.service;
      if (!['table','delivery','hall'].includes(k)) return;
      if (displayMode === 'quick') return toggleQuickService(k);
      serviceSelected[k]=true;
      applyServiceOrderType(k);
      const id=k==='table'?'svcTable':k==='delivery'?'svcDelivery':'svcHall';
      const x=document.getElementById(id); if(x){x.focus();x.select();}
      renderPOS(); return;
    }
    case 'save-services': return saveServices();
    case 'clear-services': return clearServices();
    case 'qty-edit': return openQtyEdit(el.dataset.id);
    case 'qty-inc': { const r=cart.find(x=>x.id===el.dataset.id&&!x.locked); if(r){ if(isWeightItem(r)) return showToast('استخدم لوحة الأوزان لتعديل هذا الصنف','⚖️'); r.qty++; renderPOS(); } return; }
    case 'qty-dec': { const r=cart.find(x=>x.id===el.dataset.id&&!x.locked); if(r){ if(isWeightItem(r)) return showToast('استخدم لوحة الأوزان لتعديل هذا الصنف','⚖️'); r.qty=Math.max(1,r.qty-1); renderPOS(); } return; }
    case 'qty-input': { const r=cart.find(x=>x.id===el.dataset.id&&!x.locked); const q=Math.max(1,Number(el.value)||1); if(r){ if(isWeightItem(r)) return showToast('استخدم لوحة الأوزان لتعديل هذا الصنف','⚖️'); r.qty=q; renderPOS(); } return; }
    case 'weight-add': {
      const g = Math.round(Number(value));
      const it = DATA.items.find(x => x.id === pendingItemId);
      if (!isMenuItemAvailable(it)) return showToast('الصنف غير متاح حالياً', '⚠️');
      if (!isWeightItem(it) || !WEIGHT_OPTIONS.includes(g)) return;
      /* إذا كان السطر موجوداً، فهذا تعديل للوزن: يستبدل السابق ولا يراكمه. */
      const row = cart.find(x => x.id === it.id && !x.locked);
      if (row) {
        row.weight_grams = g;
        row.qty = g / 1000;
        row.weight_label = g + ' غرام';
      } else {
        cart.push({ id: it.id, name: saleItemName(it), price: it.price, qty: g / 1000, weight_grams: g, weight_label: g + ' غرام', note: '' });
      }
      directSelectedId = it.id;
      lastAddedId = it.id;
      pendingItemId = null;
      return renderPOS();
    }
    case 'weight-pick': {
      const r = cart.find(x => x.id === qtyEditId);
      const g = Math.round(Number(value));
      if (r && isWeightItem(r) && WEIGHT_OPTIONS.includes(g)) {
        r.weight_grams = g;
        r.qty = g / 1000;
        r.weight_label = g + ' غرام';
        qtyEditId = null;
        qtyEditBuf = '';
        return renderPOS();
      }
      return;
    }
    case 'qty-edit-key': return qtyEditKey(value);
    case 'qty-edit-apply': return applyQtyEdit();
    case 'qty-edit-close': return closeQtyEdit();
    case 'open-direct-disc':
      directAuxModal = 'discount';
      return renderPOS();
    case 'set-inv-disc': {
      const raw = (value === '' || value == null)
        ? (document.getElementById('dAuxDisc') && document.getElementById('dAuxDisc').value)
        : value;
      const pct = Math.max(0, Math.min(100, Number(raw)));
      discSettings().invoice_pct = Number.isFinite(pct) ? pct : 0;
      if (displayMode === 'direct' || displayMode === 'quick') directAuxModal = null;
      return renderPOS();
    }
    case 'delivery-field': deliveryInfo[el.dataset.field] = el.value; return;
    /* ما يكتبه الكاشير هو الحقيقة: نحلّل النص ونحفظه كما كُتب، دون أي
       ملء تلقائي. الإكمال من سجل الزبائن صار فعلاً صريحاً بزر «✦».
       السبب: الملء التلقائي أثناء الكتابة كان (1) يستبدل بيانات زبون
       جديد ببيانات زبون محفوظ يحمل نفس الاسم، و(2) يعيد كتابة الحقل مع
       كل حرف فيقفز مؤشر الكتابة ويصير الاسم غير قابل للتحرير أو الحذف. */
    case 'delivery-combined': {
      const p = parseDeliveryText(el.value);
      deliveryInfo.name = p.name; deliveryInfo.phone = p.phone; deliveryInfo.address = p.address;
      return;
    }
    case 'smart-delivery-fill': {
      const inp = document.querySelector('[data-action="delivery-combined"]');
      const hit = findDeliveryCustomer(inp ? inp.value : (deliveryInfo.name || ''));
      if (!hit) { showToast('لا يوجد زبون محفوظ بهذا الاسم أو الرقم','⚠️'); return; }
      deliveryInfo.name    = hit.name    || deliveryInfo.name;
      deliveryInfo.phone   = hit.phone   || deliveryInfo.phone;
      deliveryInfo.address = hit.address || deliveryInfo.address;
      showToast('تم الإكمال من سجل الزبائن','✦');
      return renderPOS();
    }
    case 'open-calc': calcOpen = true; return renderPOS();
    case 'close-calc': calcOpen = false; calcPaid = ''; return renderPOS();
    case 'category': sandwichPage=0; return selectMainCategory(value);
    case 'quick-family-filter': {
      const family = String(value || '').trim();
      if (!family) return;
      quickFamilyFilter = quickFamilyFilter === family ? '' : family;
      quickFilter = '';
      searchOpen = false;
      searchTerm = '';
      servicesOpen = false;
      activeCategoryId = null;
      activeFamily = null;
      sandwichPage = 0;
      return renderPOS();
    }
    case 'sandwich-prev': sandwichPage=Math.max(0,sandwichPage-1); return renderPOS();
    case 'sandwich-next': sandwichPage++; return renderPOS();
    case 'family': return selectFamily(value);
    case 'select-category': return selectMainCategory(value);
    case 'select-family': return selectFamily(value);
    case 'open-qty': return openQtyModal(el.dataset.id);
    case 'remove-item': return removeFromCart(el.dataset.id);
    case 'remove-service': { const k = el.dataset.id === 'service_table' ? 'table' : el.dataset.id === 'service_delivery' ? 'delivery' : 'hall'; serviceSelected[k] = false; orderServices[k] = 0; serviceNotes[k] = ''; if (directSelectedId === el.dataset.id) directSelectedId = null; applyServiceOrderType(k); return renderPOS(); }
    case 'note-open': {
      directSelectedId = el.dataset.id;
      /* حتى إن وُجد حقل ملاحظة قديم على سطر خدمة، لا يفتح نافذة
         بالنقر عليه؛ فتح الملاحظات محصور بأزرار الملاحظات. */
      if (serviceKeyFromId(el.dataset.id)) return renderPOS();
      return openNoteModal(el.dataset.id);
    }
    case 'note-toggle': return toggleNoteSuggestion(value);
    case 'note-save': return saveNoteModal();
    case 'close-note': return closeNoteModal();
    case 'note': return updateItemNote(el.dataset.id, el.value);
    case 'qty-pick': return confirmQty(Number(value));
    case 'qty-custom': return confirmCustomQty();
    case 'close-qty': return closeQtyModal();
    case 'qty': return changeQty(el.dataset.id, Number(el.dataset.delta));
    case 'clear-cart': return clearCart();
    case 'hold-order':   return holdCurrentOrder();
    case 'resume-held':  return resumeHeld(value);
    case 'submit-order': return submitOrder();
    case 'calc-print': return submitOrder();
    case 'logout': return backToLogin();
    case 'customers': return guardLeave('customers.html');
    case 'invoices':      return openPosScreen('invoices.html', 'الفواتير');
    case 'open-invoices': return openPosScreen('invoices.html', 'الفواتير');
    case 'edit-invoice':  return window.location.href = 'invoices.html';
    case 'session': return guardLeave('cashier_session.html');
    case 'kitchen': return openPosScreen('kitchen.html', 'شاشة المطبخ');
    case 'queue':   return openPosScreen('queue.html', 'شاشة النداء');
    case 'tables':
      if (!cart.length) return openPosScreen('tables.html', 'خريطة الطاولات');
      orderType = 'dinein'; directAuxModal = 'hall'; return renderPOS();

case 'online-orders': return openPosScreen('online_orders.html', 'الطلبات الأونلاين');
    /* ── شاشة العميل ──
       الوسائط محلية (قرار المرحلة): تُخزَّن على الجهاز الذي تُضاف عليه.
       لذا إن كانت شاشة الزبون جهازاً مستقلاً، يجب فتح هذه الصفحة عليه
       لا على جهاز الكاشير، وإلا أُضيفت الوسائط هنا ولم تظهر هناك. */
    case 'delivery-screen': return openPosScreen('delivery.html', 'شاشة التوصيل');
    case 'close-pos-embed': return closePosEmbed();
    case 'placeholder': closeCashierNav(); return showToast(`سنضيف ${el.dataset.msg} لاحقًا`, el.dataset.icon || 'ℹ️');
    case 'back-step': return backStep();
    case 'service-select-row': {
      directSelectedId = el.dataset.id;
      return renderPOS();
    }
    case 'd-select-row': {
      directSelectedId = el.dataset.id;
      const selectedInvoiceRow = cart.find(c => c.id === el.dataset.id);
      if (displayMode === 'quick' && selectedInvoiceRow && isWeightItem(selectedInvoiceRow)) quickWeightItemId = selectedInvoiceRow.id;
      /* النقر على اسم الصنف يحدد السطر فقط. تعديل الكمية يبقى من
         الجهة اليمنى، أما الملاحظات فتُفتح حصراً من أزرار الملاحظات. */
      if (ev && ev.clientX != null && el.getBoundingClientRect) {
        const r = el.getBoundingClientRect();
        if ((ev.clientX - r.left) >= r.width / 2) {
          const _row = cart.find(c => c.id === el.dataset.id);
          if (_row) {
            if (_row.locked) return showToast('🔒 العرض ثابت — يمكن الإضافة عليه فقط', '⚠️');
            return openQtyEdit(el.dataset.id);
          }
        }
      }
      return renderPOS();
    }
    case 'd-del-row': {
      const row = cart.find(c => c.id === directSelectedId);
      if (!row) return showToast('اختر الصف المطلوب حذفه من الجدول', '⚠️');
      return removeFromCart(row.id);
    }
    case 'd-pad-mode': padMode = value; padBuf = ''; return renderPOS();
    case 'd-pad-key':  return dPadKey(value);
    case 'd-pad-apply': return dPadApply();
    case 'd-note-chip': return dNoteChip(value);
    case 'go-level': return goLevel(el.dataset.level);
    /* ── العقود ── */
    case 'contract-pick':    return pickContract(el.dataset.id);
    case 'contract-clear':   selectedContractId = null; contractSearchTerm = ''; return renderPOS();
    case 'contract-search':  contractSearchTerm = el.value; return updateContractList();
    case 'contract-search-clear': contractSearchTerm = ''; return renderPOS();
    case 'contract-add-item': return contractAddItem(el);
    /* ── طريقة الدفع ── */
    case 'pay-method':
      payMethod = value;
      if (value !== 'deferred') { deferredName=''; deferredPhone=''; deferredAddr=''; }
      return renderPOS();
    case 'pay-wallet-ref':       walletRef = el.value; return;
    case 'pay-partial-amount':   partialAmount = el.value; updatePayPartialDisplay(); return;
    case 'pay-deferred-mode':    deferredMode = value; return renderPOS();
    case 'pay-deferred-contract': selectedContractId = el.value; return renderPOS();
    case 'pay-def-name':         deferredName  = el.value; return;
    case 'pay-def-phone':        deferredPhone = el.value; autoFillDeferred(el.value); return;
    case 'pay-def-addr':         deferredAddr  = el.value; return;
    /* ── الإدخال الصوتي ── */
    case 'voice-toggle': return voiceActive ? stopVoice() : startVoice('search');
    case 'voice-start':
      if (voiceActive && voiceTarget === el.dataset.voiceTarget) return stopVoice();
      return startVoice(el.dataset.voiceTarget);
  }
}

function updateSearchResultsOnly() {
  const box = document.getElementById('searchResultsBox');
  if (!box) return;
  box.innerHTML = renderSearchResultsContent(finalItems());
  // نعيد ربط أزرار الأصناف الناتجة فقط بدون إعادة رسم حقل البحث، حتى لا تختفي لوحة المفاتيح
  box.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', () => handleAction(el.dataset.action, el.dataset.value, el));
  });
}
/* ربط محصور بحاويات جديدة فقط (نمط updateSearchResultsOnly) —
   الربط العام هنا كان سيضاعف المستمعات على الأزرار الباقية */
function bindMenuAreaActions(box) {
  box.querySelectorAll('[data-action]').forEach(el => {
    const action = el.dataset.action;
    if (el.tagName === 'SELECT') el.addEventListener('change', () => handleAction(action, el.value, el));
    else el.addEventListener('click', (ev) => handleAction(action, el.dataset.value, el, ev));
  });
  box.querySelector('#posSearchInput')?.addEventListener('input', e => { searchTerm = e.target.value; updateSearchResultsOnly(); });
}
/* تحديث موضعي لمنطقة الأصناف عند التنقل (تصنيف/عائلة/رجوع/مسح بحث) —
   يعيد false فيُستدعى renderPOS الكامل */
function updateMenuArea() {
  try {
    if (activeCategoryId && !sellableCategories().some(c => c.id === activeCategoryId)) return false;
    const items = finalItems();
    if (displayMode === 'direct') {
      const cats = document.querySelectorAll('.d-cat[data-action="category"]');
      if (!cats.length) return false;
      cats.forEach(b => b.classList.toggle('active', b.dataset.value === activeCategoryId));
      const area = document.getElementById('menuItems');
      if (!area) return false;
      area.innerHTML = renderDirectItemsArea(items);
      bindMenuAreaActions(area);
    } else {
      const area = document.getElementById('menuFlow');
      if (!area) return false;
      area.innerHTML = orderType !== 'contract'
        ? (searchTerm.trim() || searchOpen ? renderSearchArea(items)
          : (displayMode === 'buttons' ? renderButtonFlow(items) : displayMode === 'direct' ? renderDirectFlow(items) : renderDropdownFlow(items)))
        : '';
      bindMenuAreaActions(area);
    }
    return true;
  } catch (e) { return false; }
}
/* شريط «آخر فاتورة»: يبقى ظاهراً أعلى الفاتورة بعد الطباعة ومسح السلة،
   فإن سلّم الكاشير الوصل للزبون لم ينسَ قيمته. يُستبدل مع البيع التالي،
   ويُحفظ في الجهاز فيبقى حتى بعد إغلاق الصفحة. */
function renderLastSaleBar() {
  if (!lastSale) return '';
  return `
          <div class="last-sale-bar" style="margin:0 0 8px;padding:7px 10px;border-radius:12px;background:#0b2942;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:8px;box-shadow:0 2px 8px rgba(0,0,0,.18);">
            <div style="line-height:1.2;">
              <div style="font-size:11px;opacity:.75;">آخر فاتورة مُسلَّمة</div>
              <div style="font-size:13px;font-weight:700;white-space:nowrap;">#${escapeHtml(String(lastSale.label || ''))}${lastSale.at ? ' · ' + timeHM(lastSale.at) : ''}</div>
            </div>
            <div style="font-size:23px;font-weight:900;white-space:nowrap;">${fmtCur(lastSale.total)}</div>
            <button type="button" data-action="clear-last-sale" title="إخفاء" aria-label="إخفاء آخر فاتورة" style="background:transparent;border:0;color:#fff;opacity:.6;font-size:15px;cursor:pointer;padding:2px 4px;">✕</button>
          </div>`;
}

function renderOrderNoteEditor() {
  return `
          <section class="order-note-editor" aria-label="ملاحظة الطلب للتحقق">
            <div class="order-note-editor-head">
              <strong>📝 ملاحظة الطلب</strong>
              <span>تظهر هنا للتحقق قبل الطباعة ويمكن تعديلها مباشرة</span>
            </div>
            <textarea class="order-note-inline" rows="2" data-action="order-note-inline"
              aria-label="ملاحظة الطلب العامة" placeholder="لا توجد ملاحظة للطلب — اكتبها هنا">${escapeHtml(orderNotes || '')}</textarea>
          </section>`;
}

function renderBillPanel(total, count) {
  /* شريط «آخر فاتورة»: يظهر أعلى الفاتورة بعد أول عملية بيع، ويبقى ظاهراً
     بعد الطباعة ومسح السلة حتى يعرف الكاشير قيمة ما سلّمه للزبون. */
  return `
          ${renderLastSaleBar()}
          <div class="bill-head">
            <div><h2>🧾 فاتورة ${nextInvoiceLabel()}</h2><p>${orderType==='dinein' ? escapeHtml(selectedHall) : orderType==='takeaway' ? 'خارجي' : 'توصيل'}</p></div>
            
          </div>
          ${renderOrderNoteEditor()}
          <div class="bill-list">
            ${cart.length === 0 ? `<div class="empty-cart">الفاتورة فارغة<br>اختر الأصناف من القائمة</div>` : cart.map(c => `
              <div class="bill-item-card">
                <div class="bill-item-top">
                  <div class="bill-info"><strong><span class="bill-item-title ${c.offer_id ? 'dinv-offer-row' : ''}">${c.offer_id ? '🎟️ ' : ''}${rowInvoiceNameHtml(c)}</span>${!c.locked && itemDiscRule(c.id) ? `<span class="item-disc-badge" title="خصم إداري تلقائي">−${fmtNum(itemDiscRule(c.id).pct)}%</span>` : ''}</strong></div>
                  <div class="bill-qty-badge qty-tap" data-action="qty-edit" data-id="${escapeHtml(c.id)}" title="اضغط لتعديل الكمية">${c.locked ? '🔒' : escapeHtml(rowInvoiceQtyText(c))}</div>
                  <div class="bill-line-total">${c.locked ? fmtCur(c.price) : (itemDiscRule(c.id) ? `<s>${fmtCur(rowGrossAmount(c))}</s> <b>${fmtCur(itemNet(c) * c.qty)}</b>` : fmtCur(rowGrossAmount(c)))}</div>
                  <button class="remove-item-btn" type="button" data-action="remove-item" data-id="${c.id}" aria-label="إزالة الصنف">x</button>
                </div>
                <textarea class="item-note-input" readonly data-action="note-open" data-id="${c.id}" placeholder="ملاحظات: ثوم زيادة، بدون حار، بطاطا زيادة...">${escapeHtml(c.note || '')}</textarea>
              </div>`).join('')}
          </div>
          <div class="bill-total-box"><span>المجموع (${count})</span><strong>${fmtCur(total)}</strong></div>
          ${(function(){ const dp = discountParts(); const st = servicesTotal(); const grand = grandWithServices(total, dp.total);
            let h = dp.total ? `<div class="bill-discount-line">💸 خصم تلقائي${dp.itemPart && dp.invPart ? ' (أصناف + فاتورة ' + fmtNum(invDiscPct()) + '%)' : dp.itemPart ? ' أصناف' : ' فاتورة ' + fmtNum(invDiscPct()) + '%'}: -${fmtCur(dp.total)}${st ? '' : ` → الإجمالي ${fmtCur(grand)}`}</div>` : '';
            if (st) h += `<div class="bill-services-line">🛎️ خدمات ${[(Number(orderServices.table)||0) ? 'طاولة ' + fmtCur(orderServices.table) : '', (Number(orderServices.delivery)||0) ? 'توصيل ' + fmtCur(orderServices.delivery) : '', (Number(orderServices.hall)||0) ? 'صالة ' + fmtCur(orderServices.hall) : ''].filter(Boolean).join(' + ')} → الإجمالي ${fmtCur(grand)}</div>`;
            return h; })()}
          <div class="bill-actions">
            <button class="calc-btn" type="button" data-action="hold-order">⏸️ تعليق</button>
          </div>
          ${renderHeldPanel()}
          ${renderPaySection()}
          <div class="bill-actions"><button class="calc-btn" type="button" data-action="open-calc" ${!hasOrderLines()?'disabled':''}>🧮 الحاسبة</button><button class="print-btn" type="button" data-action="submit-order" ${!hasOrderLines()?'disabled':''}>🖨️ طباعة الفاتورة</button></div>
`;
}
/* ربط محصور بلوحة الفاتورة الجديدة (مرآة bindPOSActions: SELECT/TEXTAREA/INPUT/click + منع فقاعة qty-edit) */
function bindPanelActions(box) {
  box.querySelectorAll('[data-action]').forEach(el => {
    const action = el.dataset.action;
    if (el.tagName === 'SELECT') el.addEventListener('change', () => handleAction(action, el.value, el));
    else if (el.tagName === 'TEXTAREA') {
      if (action === 'note-open') el.addEventListener('click', () => handleAction(action, el.value, el));
      else if (action === 'order-note-inline') {
        const syncOrderNote = () => { orderNotes = String(el.value || '').trim(); saveDraft(); };
        el.addEventListener('input', syncOrderNote);
        el.addEventListener('change', syncOrderNote);
      }
      else el.addEventListener('change', () => handleAction(action, el.value, el));
    }
    else if (el.tagName === 'INPUT') el.addEventListener('input', () => handleAction(action, el.value, el));
    else el.addEventListener('click', (ev) => {
      if (action === 'qty-edit') ev.stopPropagation();
      handleAction(action, el.dataset.value, el, ev);
    });
  });
}
/* إزالة نوافذ الكمية/الملاحظات بعد التطبيق الموضعي (آمنة دوماً: لا شيء = لا عمل) */
function dropModalNodes() {
  try {
    document.querySelector('.qty-modal')?.remove();
    document.querySelector('.qty-modal-scrim')?.remove();
    document.querySelector('.note-modal')?.remove();
    document.querySelector('.note-modal-scrim')?.remove();
    document.querySelector('.qedit-modal')?.remove();
    document.querySelector('.qedit-scrim')?.remove();
  } catch (e) {}
}
/* شارة كمية الصنف على زر القائمة: تحديث/إنشاء/إزالة — false لأي شذوذ */
function updateItemBadge(id) {
  try {
    const q = (typeof CSS !== 'undefined' && CSS.escape) ? CSS.escape(String(id)) : String(id).replace(/["\\]/g, '\\$&');
    let okAll = true;
    document.querySelectorAll('.item-btn[data-id="' + q + '"]').forEach(b => {
      try {
        const row = cart.find(c => String(c.id) === String(id));
        let badge = b.querySelector('.item-qty-badge');
        if (row) {
          if (!badge) { badge = document.createElement('span'); badge.className = 'item-qty-badge'; b.prepend(badge); }
          badge.textContent = rowWeightLabel(row) || fmtNum(row.qty);
        } else if (badge) badge.remove();
      } catch (e) { okAll = false; }
    });
    return okAll;
  } catch (e) { return false; }
}
/* تحديث موضعي للوحة الفاتورة + الشارات + الحفظ — false تعني البناء الكامل */
function updateCartPanel(changedIds) {
  try {
    const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
    const count = cart.reduce((s, x) => s + x.qty, 0);
    if (displayMode === 'direct') {
      const inv = document.getElementById('menuInvoice');
      const pay = document.getElementById('menuPaybar');
      if (!inv || !pay) return false;
      inv.innerHTML = renderDirectInvoice(total, count);
      pay.innerHTML = `${renderPaySection()}<button class="d-print-btn" type="button" data-action="submit-order" ${!hasOrderLines()?'disabled':''}>🖨️ طباعة</button>`;
      bindPanelActions(inv);
      bindPanelActions(pay);
      const dh = document.querySelector('.dpad-head');
      if (dh) { const sel = cart.find(c => c.id === directSelectedId); dh.innerHTML = sel ? `الهدف: <b>${escapeHtml(sel.name)}</b>` : 'اختر صنفاً من جدول الفاتورة'; }
    } else if (displayMode === 'quick') {
      const inv = document.getElementById('menuInvoice');
      const pay = document.getElementById('menuPaybar');
      if (!inv || !pay) return false;
      /* لا نعيد بناء عمود الأصناف/مربع الكتابة عند كل نقرة؛ لذلك تعمل
         النقرة الثلاثية على الصنف نفسه بلا فقدان أي نقرة أو تركيز. */
      inv.innerHTML = renderDirectInvoice(total, count);
      pay.outerHTML = renderQuickPaybar();
      bindPanelActions(inv);
      bindPanelActions(document.getElementById('menuPaybar'));
      const target = document.getElementById('qnTarget');
      if (target) target.innerHTML = quickNoteTargetLabel();
    } else {
      const panel = document.getElementById('billPanel');
      if (!panel) return false;
      panel.innerHTML = renderBillPanel(total, count);
      bindPanelActions(panel);
    }
    for (const id of (changedIds || [])) { if (!updateItemBadge(id)) return false; }
    saveDraft();
    return true;
  } catch (e) { return false; }
}
function updateSearchInputAndResults() {
  const input = document.getElementById('posSearchInput');
  if (input) input.value = '';
  updateSearchResultsOnly();
  input?.focus();
}

function toggleCashierNav(){ document.getElementById('cashierSidebar')?.classList.toggle('expanded'); document.getElementById('mobileCashierNav')?.classList.toggle('expanded'); document.getElementById('mobileNavScrim')?.classList.toggle('show'); }
function closeCashierNav(){ document.getElementById('cashierSidebar')?.classList.remove('expanded'); document.getElementById('mobileCashierNav')?.classList.remove('expanded'); document.getElementById('mobileNavScrim')?.classList.remove('show'); }
function toggleDisplayMode(){
  const idx = POS_MODES.findIndex(m => m.id === displayMode);
  displayMode = POS_MODES[(idx + 1) % POS_MODES.length].id;
  try { localStorage.setItem('alfaprosys_pos_mode', displayMode); } catch (e) {}
  closeCashierNav(); renderPOS();
}
function toggleSearch(){
  /* البحث الصريح له نافذة/حقل مستقل؛ لا نعيد استخدام مربع الملاحظات. */
  quickFilter = '';
  servicesOpen = false;
  searchOpen = !searchOpen;
  if (!searchOpen) searchTerm = '';
  renderPOS();
  if (searchOpen) setTimeout(() => document.getElementById('posSearchInput')?.focus(), 0);
  else if (displayMode === 'quick') setTimeout(() => quickNoteEl()?.focus(), 0);
}
function clearSearch(){ quickFilter=''; quickFamilyFilter=''; searchTerm=''; searchOpen=false; servicesOpen=false; activeCategoryId=null; activeFamily=null; if (!updateMenuArea()) renderPOS(); }
function selectMainCategory(id){
  quickFilter='';
  quickFamilyFilter='';
  servicesOpen = false;
  activeCategoryId=id||null;
  activeFamily=null;
  searchTerm='';
  if (activeCategoryId) {
    const fams = families();
    if (fams.length === 1) activeFamily = fams[0];
  }
  if (!updateMenuArea()) renderPOS();
}
function selectFamily(f){ activeFamily=f||null; if (!updateMenuArea()) renderPOS(); }
function backStep(){
  servicesOpen = false;
  quickFamilyFilter = '';
  activeCategoryId = null;
  activeFamily = null;
  searchTerm = '';
  if (!updateMenuArea()) renderPOS();
}
function goLevel(level){
  if (level === 'category') activeFamily=null;
  if (!updateMenuArea()) renderPOS();
}
function addToCart(id, qty=1){
  const item=DATA.items.find(i=>i.id===id);
  if(!isMenuItemAvailable(item)) return showToast('الصنف غير متاح حالياً', '⚠️');
  /* أي استدعاء عام للصنف المباع بالكيلو يمر أولاً باختيار الوزن،
     حتى لا يتحول qty الافتراضي 1 إلى كيلوغرام كامل. */
  if (isWeightItem(item)) return openQtyModal(id);
  const ex=cart.find(c=>c.id===id && !c.locked);
  if(ex) ex.qty += qty;
  else cart.push({id:item.id,name:saleItemName(item),price:item.price,qty,note:''});
  lastAddedId = id;
  if (displayMode === 'quick') directSelectedId = id;
  if (displayMode === 'quick') quickWeightItemId = null;
  if (!updateCartPanel([id])) renderPOS();
  focusQuickNote();
}
/* ══════════════════════════════════════════════════════════════════
   نمط الأزرار السريعة — دوال مساعدة
   ══════════════════════════════════════════════════════════════════ */
function quickNoteEl() { return document.getElementById('quickNoteInput'); }
function quickNoteText() { const el = quickNoteEl(); return el ? String(el.value || '').trim() : ''; }
function clearQuickNote() {
  const el = quickNoteEl(); if (el) el.value = '';
  /* legacy guard: old state can never filter the menu from this field. */
  if (quickFilter) { quickFilter = ''; updateQuickFilterBadge(); }
  updateQuickSuggest();
}
function focusQuickNote() {
  if (displayMode !== 'quick') return;            /* نمط سريع: يشتغل بالنمط السريع فقط */
  if (pendingItemId || pendingNoteItemId || calcOpen || searchOpen || directAuxModal || posEmbed) return;
  setTimeout(function () {
    const el = quickNoteEl();
    if (el && document.activeElement !== el) { try { el.focus(); } catch (e) {} }
  }, 0);
}
function quickNoteTargetId(preferSelected) {
  const isService = id => !!serviceRowForId(id);
  if (preferSelected && directSelectedId && (cart.some(c => c.id === directSelectedId) || isService(directSelectedId))) return directSelectedId;
  if (lastAddedId && cart.some(c => c.id === lastAddedId)) return lastAddedId;
  if (directSelectedId && (cart.some(c => c.id === directSelectedId) || isService(directSelectedId))) return directSelectedId;
  return cart.length ? cart[cart.length - 1].id : (serviceSelected.table ? 'service_table' : serviceSelected.delivery ? 'service_delivery' : serviceSelected.hall ? 'service_hall' : null);
}
function quickNoteTargetLabel() {
  const id = quickNoteTargetId();
  const row = id ? (cart.find(c => c.id === id) || serviceRowForId(id)) : null;
  return row ? 'الهدف: ' + escapeHtml(row.name) : '— لا صنف بعد';
}
function quickAttachItemNote(txt, preferSelected) {
  const id = quickNoteTargetId(!!preferSelected);
  if (!id) return showToast('أضف صنفاً أولاً', '⚠️');
  const row = cart.find(c => c.id === id);
  const serviceKey = serviceKeyFromId(id);
  const serviceRow = serviceKey ? serviceRowForId(id) : null;
  if (!row && !serviceRow) return showToast('الصنف أو الخدمة غير موجودة', '⚠️');
  if (row && row.locked) return showToast('🔒 هذا الصنف جزء من عرض ثابت', '⚠️');
  if (row) row.note = txt;
  else serviceNotes[serviceKey] = txt;
  noteHistAdd(txt);                         /* نمط سريع: تتذكّر للمرات القادمة */
  clearQuickNote();
  showToast('🍽️ «' + txt + '» ⇒ ' + (row || serviceRow).name, '✅');
  if (row && !updateCartPanel([id])) renderPOS();
  else renderPOS();
  focusQuickNote();
  return true;
}
/* ── توافق داخلي قديم للتصفية — غير مرتبط بمربع الملاحظات الحالي ── */
function normArQ(s) {
  return String(s == null ? '' : s)
    .replace(/[\u064B-\u0652\u0670\u0640]/g, '')      /* تشكيل + تطويل */
    .replace(/[أإآٱ]/g, 'ا').replace(/[ىئ]/g, 'ي')
    .replace(/ؤ/g, 'و').replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ').trim().toLowerCase();   /* والحروف اللاتينية أيضاً */
}
/* ── سجل بيانات العملاء/التوصيل السابقة: اقتراحات جاهزة ── */
const DELIV_HIST_KEY = 'alfaprosys_delivery_hist';
let delivHist = null;
function delivHistLoad() {
  if (delivHist) return delivHist;
  try {
    const a = JSON.parse(localStorage.getItem(DELIV_HIST_KEY) || '[]');
    delivHist = Array.isArray(a) ? a.filter(x => x && typeof x === 'object') : [];
  } catch (e) { delivHist = []; }
  return delivHist;
}
function delivHistSave() {
  try { localStorage.setItem(DELIV_HIST_KEY, JSON.stringify(delivHist.slice(0, 40))); } catch (e) {}
}
function delivHistAdd(name, phone, address) {
  const n = String(name || '').trim();
  if (!n) return;
  const p = String(phone || '').trim(), a = String(address || '').trim();
  const h = delivHistLoad();
  const i = h.findIndex(x => x.name === n && x.phone === p);
  if (i > -1) h.splice(i, 1);
  h.unshift({ name: n, phone: p, address: a });
  delivHistSave();
}
/* kind: 'combined' | 'name' | 'phone' | 'addr' */
function delivHistOptions(kind) {
  const seen = {}, out = [];
  for (const x of delivHistLoad()) {
    const v = kind === 'combined' ? [x.name, x.phone, x.address].filter(Boolean).join(' ')
      : kind === 'name' ? x.name : kind === 'phone' ? x.phone : x.address;
    if (!v || seen[v]) continue;
    seen[v] = 1; out.push(v);
    if (out.length >= 20) break;
  }
  return out;
}
function defHistDatalists() {
  return `<datalist id="payDefNameHist">${delivHistOptions('name').map(v => `<option value="${escapeHtml(v)}"></option>`).join('')}</datalist>`
       + `<datalist id="payDefPhoneHist">${delivHistOptions('phone').map(v => `<option value="${escapeHtml(v)}"></option>`).join('')}</datalist>`
       + `<datalist id="payDefAddrHist">${delivHistOptions('addr').map(v => `<option value="${escapeHtml(v)}"></option>`).join('')}</datalist>`;
}

/* ── سجل الكتابات السابقة: خيارات جاهزة تحت المربع ── */
function noteHistLoad() {
  if (noteHist) return noteHist;
  try {
    const a = JSON.parse(localStorage.getItem(NOTE_HIST_KEY) || '[]');
    noteHist = Array.isArray(a) ? a.filter(x => typeof x === 'string') : [];
  } catch (e) { noteHist = []; }
  return noteHist;
}
function noteHistSave() {
  try { localStorage.setItem(NOTE_HIST_KEY, JSON.stringify(noteHist.slice(0, 80))); } catch (e) {}
}
function noteHistAdd(txt) {
  const t = String(txt || '').trim();
  if (t.length < 2) return;
  const h = noteHistLoad();
  const i = h.indexOf(t);
  if (i > -1) h.splice(i, 1);
  h.unshift(t);
  noteHistSave();
}
function noteHistSuggest(q) {
  const t = normArQ(q);
  if (t.length < 3) return [];               /* الاقتراحات تحتاج ثلاثة أحرف؛ لا علاقة لها بفلترة الأصناف */
  const starts = [], has = [];
  for (const n of noteHistLoad()) {
    const nn = normArQ(n);
    if (nn.startsWith(t)) starts.push(n);
    else if (nn.includes(t)) has.push(n);
    if (starts.length >= 6) break;
  }
  return starts.concat(has).slice(0, 6);
}
function updateQuickSuggest() {
  const box = document.getElementById('qnSuggest');
  if (!box) return;
  const list = (displayMode === 'quick') ? noteHistSuggest(quickNoteText()) : [];
  if (!list.length) { box.hidden = true; box.innerHTML = ''; return; }
  box.hidden = false;
  box.innerHTML = '<div class="qn-sug-head">📜 من كتاباتك السابقة</div>' +
    list.map(n => `<button type="button" class="qn-sug" data-action="quick-note-suggest" data-value="${escapeHtml(n)}">${escapeHtml(n)}</button>`).join('');
  bindPanelActions(box);
}
/* أسماء الصنف بأشكالها المختلفة — نطابق على أيها */
function quickNames(item) {
  return [itemButtonParts(item).head, itemButtonParts(item).sub, itemButtonParts(item).title,
          item.name, item.base_name, item.family, item.option_name, item.category_name]
         .map(normArQ).filter(Boolean);
}
/* «يبدأ بـ» هو الأصل */
function quickStrict(item) {
  const f = normArQ(quickFilter);
  if (!f) return true;
  return quickNames(item).some(x => x.startsWith(f));
}
/* ولا صنف يبدأ بالحرف ⇒ «يحتوي» (مثلاً «مشروب سودة» مع حرف «س») */
let quickLoose = false;
function quickMatch(item) {
  if (!quickLoose) return quickStrict(item);
  const f = normArQ(quickFilter);
  if (!f) return true;
  return quickNames(item).some(x => x.includes(f));
}
/* كلمة الوضع для الشريط: «تبدأ بـ» أو «تحتوي» */
function quickModeWord() { return quickLoose ? 'تحتوي' : 'تبدأ بـ'; }
function updateItemsAreaOnly() {
  try {
    const area = document.getElementById('menuItems');
    if (!area) return false;
    const _sc = area.scrollTop || 0;      /* نحافظ على موضع التمرير — لا قفزة */
    area.innerHTML = renderDirectItemsArea(finalItems());
    bindPanelActions(area);
    area.scrollTop = _sc;
    return true;
  } catch (e) { return false; }
}
/* تصفية حيّة: تخفي/تبيّن الأزرار القائمة بلا إعادة بناء — لا وميض */
function applyQuickFilterLive() {
  try {
    const grid = document.getElementById('qnFilterGrid');
    if (!grid) return false;
    const btns = grid.querySelectorAll('.item-btn[data-id]');
    if (!btns.length) return false;
    const byId = {};
    for (const it of DATA.items) byId[it.id] = it;
    /* نفس منطق الرسم: «يبدأ بـ» ثم «يحتوي» */
    let strictCnt = 0;
    btns.forEach(function (b) { const it = byId[b.dataset.id]; if (it && quickStrict(it)) strictCnt++; });
    quickLoose = (strictCnt === 0);
    let cnt = 0;
    btns.forEach(function (b) {
      const it = byId[b.dataset.id];
      const ok = !quickFilter || !!(it && quickMatch(it));
      b.classList.toggle('qn-off', !ok);
      if (ok) cnt++;
    });
    const t = document.getElementById('qnFilterText');
    if (t) t.textContent = '🔍 «' + quickFilter + '» · ' + cnt + ' صنف ' + quickModeWord() + ' «' + quickFilter + '»';
    grid.hidden = (cnt === 0);
    let empty = document.getElementById('qnFilterEmpty');
    if (cnt === 0 && !empty) {
      empty = document.createElement('div');
      empty.id = 'qnFilterEmpty'; empty.className = 'd-filter-empty';
      grid.parentNode.appendChild(empty);
    }
    if (empty) {
      empty.hidden = cnt > 0;
      if (cnt === 0) empty.textContent = '🔍 لا صنف ' + quickModeWord() + ' «' + quickFilter + '» — جرّب حرفاً آخر، أو تابع الكتابة (٣ حروف أو أكثر) فتصير ملاحظة';
    }
    return true;
  } catch (e) { return false; }
}
function updateQuickFilterBadge() {
  const b = document.getElementById('qnFilter');
  if (b) b.textContent = quickFilter ? '\u200F' + quickFilter : '';
}
function currentOrderTypeChip() {
  if (orderType === 'dinein') return selectedTable ? '🍽️ ' + selectedTable : '🍽️ طاولة';
  if (orderType === 'contract') {
    const c = selectedContractId ? (DATA.contracts || []).find(x => x.id === selectedContractId) : null;
    return c ? '📋 ' + (c.client_name || 'عقد') : '📋 عقد';
  }
  if (serviceSelected.delivery) return '🛵 توصيل';
  if (serviceSelected.table) return '🍽️ خدمة طاولة';
  if (serviceSelected.hall) return '🛋️ خدمة صالة';
  return '🥡 سفري';
}

function removeFromCart(id){
  const row = cart.find(c=>c.id===id);
  if (row && row.locked) { const ids = cart.filter(c => c.offer_id === row.offer_id).map(c => c.id); cart = cart.filter(c => c.offer_id !== row.offer_id); showToast('أُلغي العرض كاملاً','🚫'); if (!updateCartPanel(ids)) renderPOS(); return; }
  cart=cart.filter(c=>c.id!==id);
  if (pendingNoteItemId===id) pendingNoteItemId=null;
  if (quickWeightItemId===id) quickWeightItemId=null;
  if (directSelectedId===id) directSelectedId=null;
  if (!updateCartPanel([id])) renderPOS(); dropModalNodes();
}
function updateItemNote(id,note){
  const row = cart.find(c => c.id === id);
  if (row && !row.locked) row.note = note;
  else {
    const key = serviceKeyFromId(id);
    if (key && serviceRowForId(id)) serviceNotes[key] = String(note || '');
  }
}
function changeQty(id,d){ const row=cart.find(c=>c.id===id); if(!row) return; if(row.locked) return showToast('🔒 العرض ثابت — يمكن الإضافة عليه فقط','⚠️'); if(isWeightItem(row)) return showToast('استخدم لوحة الأوزان لتعديل هذا الصنف','⚖️'); row.qty+=d; if(row.qty<=0) cart=cart.filter(c=>c.id!==id); if (!updateCartPanel([id])) renderPOS(); }
function clearCart(){ cart=[]; directSelectedId=null; quickWeightItemId=null; orderNotes = ''; orderServices = { table: 0, delivery: 0, hall: 0 }; serviceSelected = { table: false, delivery: false, hall: false }; serviceNotes = { table: '', delivery: '', hall: '' }; applyServiceOrderType(); renderPOS(); }
function requireShiftOn(){
  /* السحابة أولاً (pos_rules) — ثم مرآة localStorage التي يحدّثها السحب */
  try {
    const r = (window.DEMO_DATA && DEMO_DATA.pos_rules) || null;
    if (r && r.require_shift != null) return !!r.require_shift;
  } catch (e) {}
  return localStorage.getItem('alfaprosys_require_shift') === '1';
}
function shiftClosedBlocked(){ return requireShiftOn() && !(DATA.cashierSession && DATA.cashierSession.shift_open); }
function shiftBanner(){
  if (!shiftClosedBlocked()) return '';
  return `<div class="shift-block-banner">🚫 <b>الوردية مغلقة — البيع موقوف</b> <a href="cashier_session.html">فتح الوردية الآن ↩</a></div>`;
}

async function submitOrder(){
  if(!hasOrderLines()){ showToast('السلة فارغة','⚠️'); return; }
  if (shiftClosedBlocked()) { showToast('ممنوع البيع — افتح الوردية أولاً', '🚫'); return; }
  /* الصالة والطاولة معلومات اختيارية فقط؛ لا تمنعان طباعة أي فاتورة،
     وخصوصاً فواتير المطعم الشعبي وخدمات الطاولة كسطر عادي. */
  const total = cart.reduce((s,x)=>s+x.price*x.qty,0);
  const dp    = discountParts();
  const disc  = dp.total;
  const svcT  = Math.max(0, Math.round(Number(orderServices.table) || 0));
  const svcD  = Math.max(0, Math.round(Number(orderServices.delivery) || 0));
  const svcH  = Math.max(0, Math.round(Number(orderServices.hall) || 0));
  const grand = Math.max(0, total - disc) + svcT + svcD + svcH;

  /* 🔴 تحذير سقف الذمة: آجل بعقد، أو طلب بنوع «عقد» */
  const _creditConId = (payMethod==='deferred' && deferredMode==='contract' && selectedContractId)
    || (orderType==='contract' && selectedContractId) || null;
  if (_creditConId) {
    const _ci = contractCreditInfo(_creditConId);
    const _cs = creditState(_ci, grand);
    if (_cs && _cs.over) {
      const _wmsg = `🔴 تحذير: تجاوز سقف ذمة ${_ci.con.client_name} — الذمة ستصبح ${fmtCur(_cs.after)} والسقف ${fmtCur(_ci.limit)} ل.س`;
      setTimeout(() => showToast(_wmsg, '⚠️'), 1900);   /* بعد توست الفاتورة ليراه الكاشير */
    }
  }
  const now   = new Date();
  /* رمز سحب مستقل: 8 أرقام عشوائية، ولا علاقة له برقم الفاتورة.
     المولّد المشترك في utils.js — نفسه الذي تستخدمه إعادة المحاولة عند
     تضارب الرمز مع جهاز آخر في السحابة. */
  const newDrawCode = window.alfaNewDrawCode || function () {
    const a = new Uint32Array(1);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a);
    else a[0] = Math.floor(Math.random() * 0xFFFFFFFF);
    return String(a[0] % 100000000).padStart(8, '0');
  };
  let drawCode = newDrawCode();
  const usedDrawCodes = new Set((DATA.invoices || []).map(x => String(x.draw_code || '')).filter(Boolean));
  /* سقف محاولات: يمنع حلقة لا نهائية إن امتلأت المساحة نظرياً */
  for (let _g = 0; usedDrawCodes.has(drawCode) && _g < 200; _g++) drawCode = newDrawCode();
  /* ══════════════════════════════════════════════════════════════
     الرقم الموحّد هو نفسه رقم الطباعة
     ──────────────────────────────────────────────────────────────
     كان رقم الطباعة (print_no) يُحسب محلياً: max+1 من فواتير هذا
     الجهاز وحده. جهازان يعملان في اليوم نفسه يصلان إلى الرقم نفسه
     فيطبع كلٌّ منهما فاتورة به — ولا شيء يمنع التكرار لأن عمود
     print_no غير موجود أصلاً في قاعدة البيانات ليُكشف التكرار.
     الآن: الرقم المحجوز من الخادم (تسلسل موحّد مستمر) هو رقم الطباعة،
     وإن تعذّر الاتصال نتراجع لشريحة الجهاز مع تنبيه الكاشير.
     ══════════════════════════════════════════════════════════════ */
  const _res = window.reserveInvoiceNoDetailed
    ? await window.reserveInvoiceNoDetailed()
    : { no: null, source: 'none' };
  const invNo = Number(_res.no) || 0;

  /* لا مرجع مشترك ⇒ لا رقم. إصدار رقم من الجهاز نفسه يعني إمّا تكراراً
     (نفس الرقم من جهازين) وإمّا قفزاً (١٠٠١/٢٠٠١…)، وكلاهما مرفوض
     من الإدارة. نُبلغ الكاشير بوضوح ولا نُصدر رقماً مزوّراً. */
  if (!invNo) {
    showToast('تعذّر ترقيم الفاتورة — لا اتصال بالخادم ولا بخدمة الترقيم', '🚫');
    return;
  }
  if (_res.source === 'lan' && window.showToast) {
    try { showToast('رُقِّمت الفاتورة من خدمة الترقيم المحلية (لا إنترنت)', '🏠'); } catch (e) {}
  }
  const invDate = window.businessDay ? businessDay() : '';
  const issuedCashierName = currentPaymentCashier();
  const issuedCashierKey = currentPaymentCashierKey();
  const issuedShiftKey = currentPaymentShiftKey();
  const initialPaid = payMethod !== 'deferred'
    && !(payMethod === 'partial' && (Number(partialAmount) || 0) < grand);
  const invoiceType = serviceSelected.delivery ? 'delivery'
    : serviceSelected.table ? 'table' : orderType;
  const initialPaymentEvent = initialPaid ? [{
    id: 'pay_evt_' + Date.now() + '_initial', status: 'paid', amount: grand,
    cashier: issuedCashierName, cashier_key: issuedCashierKey,
    shift_key: issuedShiftKey, at: now.toISOString(),
  }] : [];
  const inv = {
    // تم حجز invNo أعلاه؛ لا تستدعِ nextInvoiceId هنا حتى لا يُحجز رقم ثانٍ.
    id: window.nextInvoiceId ? nextInvoiceId(invNo) : (invDate + '-' + String(invNo).padStart(3, '0')),
    no: invNo,
    print_no: invNo,
    draw_code: drawCode,
    invoice_cycle: (function(){ try { return localStorage.getItem('alfaprosys_invoice_cycle_' + invDate) || 'legacy'; } catch(e){ return 'legacy'; } })(),
    date: invDate,
    type: invoiceType,
    hall: orderType==='dinein' ? selectedHall : '',
    table_label: orderType==='dinein' ? selectedTable : '',
    customer_name: invoiceType==='delivery' ? deliveryInfo.name : '',
    phone: invoiceType==='delivery' ? deliveryInfo.phone : '',
    customer_address: invoiceType==='delivery' ? deliveryInfo.address : '',
    /* معلومات التوصيل تُنشأ مع الفاتورة: بذلك يصبح رابط تتبع الزبون ذا
       معنى فور الإصدار، وتستطيع شاشة التوصيل تحديث الحالة لاحقاً
       (إسناد ← في الطريق ← تم التوصيل). سابقاً كان الحقل يبدأ null
       فتبقى حالة الطلب «قيد الاستلام» للأبد ولا تتقدم خطوة واحدة. */
    delivery_info: orderType === 'delivery' ? {
      status: 'pending',
      name:    deliveryInfo.name    || '',
      phone:   deliveryInfo.phone   || '',
      address: deliveryInfo.address || '',
      fee: 0, agent_id: '', agent_name: '', agent_type: '',
      assigned_at: '', delivered_at: '', customer_feedback: '',
    } : null,
    cashier: issuedCashierName,
    cashier_key: issuedCashierKey,
    issued_shift_key: issuedShiftKey,
    shift_kind: (window.alfaCurrentShiftKind && alfaCurrentShiftKind()) || '',
    /* حالة التحصيل مستقلة عن حالة إصدار/طباعة الفاتورة. */
    payment_status: initialPaid ? 'paid' : 'unpaid',
    paid: initialPaid,
    paid_by: initialPaid ? issuedCashierName : '',
    paid_by_key: initialPaid ? issuedCashierKey : '',
    paid_shift_key: initialPaid ? issuedShiftKey : '',
    paid_at: initialPaid ? now.toISOString() : '',
    payment_history: initialPaymentEvent,
    /* سياسة المطعم: لا توجد فاتورة «مفتوحة/نشطة». أي فاتورة تُصدر تُغلق
       فوراً بحالة «مطبوعة» — الدفع يتم مباشرة عند الطلب. الإضافات اللاحقة
       لا تتم بفتح فاتورة تبقى نشطة أياماً، بل من شاشة «تعديل الفاتورة»
       فتتحول حالتها إلى «معدّلة» ليظهر الأثر في التقارير. */
    status: 'printed',
    kitchen_status: 'new',
    stock_applied: true,
    pay_type: payMethod,
    discount: disc,
    discount_detail: {
      invoice_pct: invDiscPct(),
      items: cartDiscountLines().map(c => { const r = itemDiscRule(c.id); return { id: c.id, name: c.name, pct: r.pct, amount: Math.round(rowGrossAmount(c)*r.pct/100) }; }),
      service_table: svcT,
      service_delivery: svcD,
      service_hall: svcH,
    },
    service_table: svcT,
    service_delivery: svcD,
    service_hall: svcH,
    service_fee: svcT + svcD + svcH,
    total: grand,
    time: now.toTimeString().slice(0,5),
    created_at: now.toISOString(),
    notes: orderNotes || '',
    is_online: false,
    items: cart.map(c=>({
      id:c.id, name:c.name,
      /* الوزن هو المصدر الصريح لكمية صنف الكيلو عند الحفظ؛ qty يبقى بالكيلو. */
      qty: rowWeightGrams(c) ? rowWeightGrams(c) / 1000 : c.qty,
      price:c.price,
      total: rowWeightGrams(c) ? (Number(c.price)||0) * rowWeightGrams(c) / 1000 : c.price*c.qty,
      note:c.note||'',
      offer_id: c.offer_id || null,      // ربط كل بند بعرضه (فارغ للأصناف العادية)
      is_free:  !!c.is_free,             // المقدَّم مجاناً: يخصم مخزوناً بلا إيراد
      offer_disc: !!c.offer_disc,        // سطر خصم العرض (مالي فقط — لا يظهر للمطبخ)
      original_price: c.original_price || null,
      price_override: !!c.price_override,
      override_reason: c.override_reason || '',
      weight_grams: c.weight_grams || null,
      weight_label: c.weight_label || ''
    })).concat((serviceSelected.table ? [{id:'service_table', name:'خدمة طاولة', qty:1, price:svcT, total:svcT, note:serviceNotes.table || '', is_service:true}] : []), (serviceSelected.delivery ? [{id:'service_delivery', name:'خدمة توصيل', qty:1, price:svcD, total:svcD, note:serviceNotes.delivery || '', is_service:true}] : []), (serviceSelected.hall ? [{id:'service_hall', name:'خدمة صالة', qty:1, price:svcH, total:svcH, note:serviceNotes.hall || '', is_service:true}] : [])), 
  };
  if(orderType==='takeaway' || orderType==='delivery') inv.queue_no = inv.print_no || invNo; // الدور = رقم الطباعة الظاهر
  DATA.invoices = [inv, ...(DATA.invoices||[])];
  /* حفظ الفاتورة في صندوق محلي دائم قبل أي طباعة؛ فشل الطابعة لا يجوز
     أن يحوّل عملية مالية صحيحة إلى فاتورة مفقودة. */
  const _invoiceLocalCommit = window.InvoiceSync
    ? InvoiceSync.pushSoon(inv)
    : Promise.resolve({ skipped: true });
  // ── إنشاء/تحديث العميل تلقائياً + ترحيل الذمم والدفعات ──
  if (inv.customer_name || inv.phone) {
    const ph = String(inv.phone || '').trim();
    let cust = ph ? (DATA.customers || []).find(c => String(c.phone || '').trim() === ph) : null;
    const invTotal = inv.total || 0;
    if (!cust && (inv.customer_name || ph)) {
      cust = {
        id: 'cus_' + String(Date.now()).slice(-8),
        name: inv.customer_name || '',
        phone: ph,
        whatsapp: ph,
        address: orderType === 'delivery' ? (deliveryInfo.address || '') : (payMethod === 'deferred' ? (deferredAddr || '') : ''),
        type: orderType === 'delivery' ? 'delivery' : 'regular',
        notes: '',
        credit_limit: 0,
        credit_balance: 0,
        next_due_date: '',
        payments: [],
      };
      DATA.customers = [cust, ...(DATA.customers || [])];
      inv.is_new_customer = true;
    }
    if (cust) {
      const today = inv.date || new Date().toISOString().slice(0, 10);
      cust.payments = cust.payments || [];
      cust.credit_balance = Number(cust.credit_balance) || 0;
      if (payMethod === 'deferred' && invTotal > 0) {
        cust.credit_balance += invTotal;
        cust.payments.unshift({
          id: 'pay_' + String(Date.now()).slice(-6),
          date: today, amount: -invTotal, invoice_total: invTotal,
          note: 'فاتورة آجل #' + inv.id, invoice_id: inv.id, type: 'deferred',
        });
        if (!cust.next_due_date) {
          const due = new Date(); due.setDate(due.getDate() + 30);
          cust.next_due_date = due.toISOString().slice(0, 10);
        }
      }
      if (payMethod === 'partial' && invTotal > 0) {
        const paid = Number(partialAmount) || 0;
        const remaining = Math.max(0, invTotal - paid);
        if (paid > 0) {
          cust.payments.unshift({
            id: 'pay_' + String(Date.now()).slice(-6),
            date: today, amount: paid, invoice_total: invTotal,
            note: 'دفعة جزئية — فاتورة #' + inv.id, invoice_id: inv.id, type: 'partial',
          });
        }
        if (remaining > 0) {
          cust.credit_balance += remaining;
          if (!cust.next_due_date) {
            const due = new Date(); due.setDate(due.getDate() + 15);
            cust.next_due_date = due.toISOString().slice(0, 10);
          }
        }
      }
      if (window.AlfaDB && AlfaDB.upsert) AlfaDB.upsert('customers', cust);
      if (window.CustomerSync) CustomerSync.pushSoon();
    }
  }
  // ربط المخزون تلقائياً: خصم المكونات حسب الوصفة
  if (window.deductStockForSale) deductStockForSale(inv.items);
  const _lbl = (inv && inv.print_no != null && window.displayInvoiceNo)
    ? displayInvoiceNo(inv.print_no, inv)
    : (window.displayInvoiceNo ? displayInvoiceNo(invNo, inv)
    : (window.padNo ? padNo(invNo) : String(invNo)));
  /* يبقى الإجمالي معروضاً في أعلى الفاتورة بعد الطباعة */
  saveLastSale(_lbl, grand, orderType);
  showToast(orderType==='takeaway' || orderType==='delivery'
    ? `فاتورة ${_lbl} · دورك ${_lbl} → المطبخ`
    : `فاتورة ${_lbl} → المطبخ`,'🍳');
  /* تنظيف بيانات الطلب بعد كل إصدار: بدون هذا يرث الزبون التالي اسمَ وهاتفَ
     وعنوانَ الزبون السابق، فتصدر كل فواتير التوصيل باسم واحد مهما اختلف
     الزبائن — وتبقى الطاولة مختارة بعد أن صارت فاتورتها مغلقة. */
  cart=[];
  orderServices = { table: 0, delivery: 0, hall: 0 };
  serviceNotes = { table: '', delivery: '', hall: '' };
  /* نتذكّر بيانات هذا العميل لاقتراحها في الفواتير القادمة */
  delivHistAdd(deliveryInfo.name, deliveryInfo.phone, deliveryInfo.address);
  delivHistAdd(deferredName, deferredPhone, deferredAddr);
  deliveryInfo  = { name: '', phone: '', address: '' };
  orderNotes    = '';
  selectedTable = '';
  if (displayMode === 'quick') {
    /* النمط السريع: كل فاتورة تبدأ «سفري» وبلا خدمات مورّثة */
    serviceSelected = { table: false, delivery: false, hall: false };
    serviceTypeAuto = false;
    orderType = 'takeaway';
    selectedHall = 'صالة داخلية';
    lastAddedId = null;
    quickFilter = '';
    directSelectedId = null;
  }
  renderPOS();

  /* نقطة التزام واضحة: البيانات المحلية أولاً، والطباعة ثانياً.
     إذا فشل IndexedDB أو صندوق الصادر نتوقف ونبلغ الكاشير بدلاً من
     طباعة رقم لا يمكن استعادته لاحقاً. */
  const _durable = [];
  if (_invoiceLocalCommit && typeof _invoiceLocalCommit.then === 'function') _durable.push(_invoiceLocalCommit);
  if (window.alfaPersist) _durable.push(Promise.resolve(window.alfaPersist()));
  const _saved = await Promise.allSettled(_durable);
  const _saveFailed = _saved.some(function (r) {
    return r.status === 'rejected' || (r.value && r.value.failed) || r.value === false;
  });
  if (_saveFailed) {
    showToast('تعذر تثبيت الفاتورة محلياً — لم تتم الطباعة، راجع التخزين المحلي', '🚫');
    return;
  }

  // طباعة حرارية تلقائية (كاشير + مطبخ) — قابلة للإطفاء من config.js
  try {
    const _th = window.ALFA_CONFIG && window.ALFA_CONFIG.thermal || {};
    if (window.ThermalPrint && _th.autoAfterSale !== false) ThermalPrint.afterSale(inv);
  } catch (e) {}
}


/* ── طباعة أونلاين من نفس مسار شاشة البيع ── */
window.addEventListener('message', function (ev) {
  const m = ev && ev.data;
  if (!m || m.type !== 'ALFA_PRINT_ONLINE_INVOICE') return;
  const reply = function (payload) {
    try {
      if (ev.source && ev.source.postMessage) {
        ev.source.postMessage(Object.assign({ type:'ALFA_ONLINE_PRINT_RESULT', requestId:m.requestId }, payload || {}), ev.origin || '*');
      }
    } catch (e) {}
  };
  try {
    let inv = m.invoice || null;
    if (!inv && m.invoiceId) inv = (DATA.invoices || []).find(i => String(i.id) === String(m.invoiceId));
    if (!inv) return reply({ ok:false, error:'invoice-not-found-in-pos' });

    const list = DATA.invoices || [];
    const ix = list.findIndex(i => String(i.id) === String(inv.id));
    if (ix >= 0) list[ix] = Object.assign({}, list[ix], inv);
    else DATA.invoices = [inv].concat(list);

    const _th = (window.ALFA_CONFIG && window.ALFA_CONFIG.thermal) || {};
    if (!window.ThermalPrint || _th.autoAfterSale === false) return reply({ ok:false, error:'thermal-disabled' });

    console.info('[POS] طباعة فاتورة أونلاين من مسار البيع:', inv.id);
    Promise.resolve(ThermalPrint.afterSale(inv))
      .then(function () { reply({ ok:true }); })
      .catch(function (e) { reply({ ok:false, error:String((e && e.message) || e) }); });
  } catch (e) {
    reply({ ok:false, error:String((e && e.message) || e) });
  }
});

/* ── تعليق / استئناف الطلبات ── */
function holdCurrentOrder(){
  if(!hasOrderLines()){ showToast('لا يوجد طلب لتعليقه','⚠️'); return; }
  heldOrders.push({ id:heldSeq++, at:new Date().toTimeString().slice(0,5), cart:cart.slice(), type:orderType, notes: orderNotes || '', services:{ table: Number(orderServices.table) || 0, delivery: Number(orderServices.delivery) || 0, hall: Number(orderServices.hall) || 0 }, serviceNotes: { table: serviceNotes.table || '', delivery: serviceNotes.delivery || '', hall: serviceNotes.hall || '' } });
  cart=[]; orderNotes = ''; orderServices = { table: 0, delivery: 0, hall: 0 }; serviceSelected = { table: false, delivery: false, hall: false }; serviceNotes = { table: '', delivery: '', hall: '' }; renderPOS();
  showToast('تم تعليق الطلب','⏸️');
}
function renderHeldPanel(){
  if(!heldOrders.length) return '';
  return `<div class="held-strip">${heldOrders.map(h=>`
    <button class="held-chip" type="button" data-action="resume-held" data-value="${h.id}">
      ⏸️ #${h.id} · ${h.cart.length} صنف · ${h.at}${h.notes ? ' 📝' : ''}${(h.services && ((Number(h.services.table) || 0) + (Number(h.services.delivery) || 0) + (Number(h.services.hall) || 0)) > 0) ? ' 🛎️' : ''}
    </button>`).join('')}</div>`;
}
function resumeHeld(id){
  const h = heldOrders.find(x=>x.id==id); if(!h) return;
  if(hasOrderLines()) holdCurrentOrder();   // علّق الحالي قبل الاستئناف، حتى لو كانت قيمة الخدمة صفراً
  cart = h.cart.slice();
  if (h.type) orderType = h.type;
  orderNotes = String(h.notes || '');
  orderServices = { table: Number(h.services && h.services.table) || 0, delivery: Number(h.services && h.services.delivery) || 0, hall: Number(h.services && h.services.hall) || 0 };
  serviceSelected = { table: orderServices.table > 0, delivery: orderServices.delivery > 0, hall: orderServices.hall > 0 };
  serviceNotes = { table: String(h.serviceNotes && h.serviceNotes.table || ''), delivery: String(h.serviceNotes && h.serviceNotes.delivery || ''), hall: String(h.serviceNotes && h.serviceNotes.hall || '') };
  heldOrders = heldOrders.filter(x=>x.id!=id);
  renderPOS();
  showToast('تم استئناف الطلب','▶️');
}

/* ── الخصم ── */

/* ================================================================
   منطق العقود (إضافة جديدة)
   ================================================================ */
function pickContract(id) {
  selectedContractId = id;
  const con = (window.DEMO_DATA.contracts || []).find(c => c.id === id);
  if (!con) return renderPOS();
  /* أضف أصناف العقد إلى السلة تلقائياً بكمياتها */
  cart = [];
  orderServices = { table: 0, delivery: 0, hall: 0 };
  serviceSelected = { table: false, delivery: false, hall: false };
  serviceNotes = { table: '', delivery: '', hall: '' };
  (con.items || []).forEach(it => {
    const liveItem = (DATA.items || []).find(m => m.id === it.item_id);
    if (liveItem && !isMenuItemAvailable(liveItem)) return;
    cart.push({
      id:    it.item_id,
      name:  liveItem ? saleItemName(liveItem) : collapsePosLabel(it.name),
      price: it.price,
      qty:   it.qty,
      note:  it.note || ''
    });
  });
  if (displayMode === 'direct') directAuxModal = null;
  renderPOS();
}

function contractAddItem(el) {
  const itemId = el.dataset.itemId;
  const liveItem = (DATA.items || []).find(m => m.id === itemId);
  if (liveItem && !isMenuItemAvailable(liveItem)) return showToast('الصنف غير متاح حالياً', '⚠️');
  const name   = collapsePosLabel(el.dataset.name);
  const price  = Number(el.dataset.price);
  const qty    = Number(el.dataset.qty) || 1;
  const ex = cart.find(c => c.id === itemId);
  if (ex) {
    ex.qty += qty;
  } else {
    cart.push({ id: itemId, name, price, qty, note: '' });
  }
  renderPOS();
}

function updatePayPartialDisplay() {
  const total = cart.reduce((s,x)=>s+x.price*x.qty,0);
  const paid  = (Number(partialAmount) || 0) * (currencyNew ? 100 : 1); // إدخال بعملة العرض
  const rem   = total - paid;
  let remEl = document.querySelector('.pay-partial-rem');
  if (!remEl && paid > 0) { renderPOS(); return; }
  if (!remEl) return;
  remEl.className = `pay-partial-rem ${rem>0?'rem-due':'rem-ok'}`;
  remEl.textContent = rem>0 ? `المتبقي: ${fmtCur(rem)} ل.س` : '✅ المبلغ كافٍ';
}

function updateContractList() {
  /* تحديث قائمة العقود فقط بدون إعادة رسم كاملة */
  const contracts = (window.DEMO_DATA.contracts || []).filter(c => c.status === 'active');
  const filtered  = contractSearchTerm.trim()
    ? contracts.filter(c =>
        `${c.client_name} ${c.company}`.toLowerCase().includes(contractSearchTerm.toLowerCase()))
    : contracts;

  const listEl = document.querySelector('.con-list');
  if (!listEl) return;

  listEl.innerHTML = filtered.map(c => `
    <button type="button"
      class="con-list-item ${c.id === selectedContractId ? 'selected' : ''}"
      data-action="contract-pick" data-id="${escapeHtml(c.id)}">
      <span class="con-list-icon">📋</span>
      <span class="con-list-info">
        <strong>${escapeHtml(c.client_name)}</strong>
        ${c.company ? `<small>${escapeHtml(c.company)}</small>` : ''}
      </span>
      <span class="con-list-type">${{ daily:'يومي', weekly:'أسبوعي', monthly:'شهري', custom:'مخصص' }[c.contract_type] || ''}</span>
    </button>`).join('') || `<div class="con-empty">لا نتائج</div>`;

  /* أعد ربط الأزرار */
  listEl.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => handleAction(btn.dataset.action, btn.dataset.value, btn));
  });
}

/* السحب الخلفي اكتمل: تحديث واحد يعرض البيانات الطازجة (يُتجاهل أثناء الكتابة) */
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('alfa:cloud-ready', function () {
    try {
      /* طبّق تصميم الفاتورة من السحابة قبل أي طباعة على الكاشير */
      const ip = (window.DEMO_DATA && DEMO_DATA.invoice_print_settings) || null;
      if (ip && window.alfaApplyInvoicePrint) window.alfaApplyInvoicePrint(ip);
      const pr = (window.DEMO_DATA && DEMO_DATA.pos_rules) || null;
      if (pr && pr.require_shift != null) {
        try { localStorage.setItem('alfaprosys_require_shift', pr.require_shift ? '1' : '0'); } catch (e2) {}
      }
      const a = document.activeElement;
      if (a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA')) return;
      renderPOS();
    } catch (e) {}
  });
  /* يتغير التوفر محلياً من شاشة إدارة المنيو/الصندوق، لذلك تعيد شاشة
     البيع بناء قائمة التصنيفات والأصناف فور وصول الإشعار، وتعيد renderPOS
     بدوره التصنيف النشط إلى «الكل» إن أصبح فارغاً أو موقوفاً. */
  window.addEventListener('alfa:menu-updated', function () {
    try { renderPOS(); } catch (e) {}
  });
}

(window.alfaStart||function(fn){fn();})(function () {
  const _draftRestored = restoreDraft();
  if (window.__splash) window.__splash.set(75, 'جاري تجهيز القائمة...');
  try {
    const _p = new URLSearchParams(location.search);
    if (_p.get('table')) {
      orderType = 'dinein';
      if (_p.get('hall')) selectedHall = _p.get('hall');
      selectedTable = _p.get('table');
      setTimeout(() => showToast(`طلب جديد على ${selectedTable} — ${selectedHall}`, '🗺️'), 400);
    }
  } catch (err) {}
  if (_draftRestored) setTimeout(() => showToast('استُعيدت مسودة الفاتورة الأخيرة', '🔄'), 350);
  /* لا تترك شاشة الإقلاع فوق الواجهة إذا حدث خطأ رسم عابر أثناء
     التحميل الاحتياطي؛ الجاهزية/المزامنة تستمر في الخلفية ويعيد حدثها
     الرسم عند اكتمال البيانات. */
  try {
    renderPOS();
  } catch (e) {
    console.error(e);
    const app = document.getElementById('posApp');
    if (app && !app.innerHTML) app.innerHTML = '<div class="d-items-hint">تعذر رسم شاشة البيع — أعد المحاولة من زر تحديث القائمة</div>';
  } finally {
    if (window.__splash) window.__splash.done();
  }
  if (window.Notify) Notify.init();
  /* الطباعة تتصل عند البيع فقط: الرئيسي محلي مباشرة، والفرعي عبر الشبكة.
     لا يوجد warmup أو استكشاف طابعات في بداية الشاشة، ولا pull دوري؛
     الطلبات الواردة تُقرأ بتحديث صريح من زر السحابة عند الحاجة. */
});
