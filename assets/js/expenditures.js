
window.parseLocalNum = function(val) {
  if (!val && val !== 0) return NaN;
  const str = String(val).replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/,/g, '').replace(/\s/g, '');
  return parseFloat(str);
};


window.setExpType = setExpType;
window.submitExpense = submitExpense;
window.updateEmpJob = updateEmpJob;
window.onEmpNameInput = onEmpNameInput;
window.chooseEmpSuggestion = chooseEmpSuggestion;
window.hideEmpSuggestions = hideEmpSuggestions;
window.deletePurchase = deletePurchase;
window.deleteExpense = deleteExpense;
window.openModal = openModal;
window.closeModal = closeModal;
window.togglePanel = togglePanel;


window.onPurCatChange = onPurCatChange;
window.onPurItemChange = onPurItemChange;
window.onPurNewItemInput = onPurNewItemInput;
window.calcUnitCost = calcUnitCost;
window.submitPurchase = submitPurchase;
/* ================================================================
   expenditures.js — الصادرات (مصاريف + مشتريات) — alfaprosys
   ================================================================ */

const DATA = window.DEMO_DATA;
/* بعض نماذج المصروفات تبني قوائمها من window.DATA؛ const وحده لا يعرّف
   خاصية على window في المتصفح، لذلك نربطها صراحةً بمصدر الكاش المحلي. */
window.DATA = DATA;

/* ── أدوات ── */
function nowTime() {
  return new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
}
/* ── التنقل المشترك ── */
const MGR_NAV = window.AlfaNav.MGR_NAV;
const CURRENT = 'expenditures';
const navLink = window.AlfaNav.linker(CURRENT);

/* ================================================================
   البيانات — تخزين مؤقت في الذاكرة (لاحقاً Supabase)
   ================================================================ */

let currentMaterialTree = [];

/* أصناف جاهزة للمشتريات؛ تبقى خانة «مادة جديدة» متاحة للإدخال اليدوي. */
const PURCHASE_CATALOGS = {
  vegetables: ['ملفوف', 'جزر', 'بصل', 'ليمون', 'بندورة', 'خيار', 'خس', 'فلفل حلو', 'نعنع', 'ثوم مقشر', 'بطاطا مقشرة'],
  fruits: ['موز', 'منغا', 'برتقال', 'افوكادو', 'رمان', 'فريز', 'توت'],
  dairy: ['لبن', 'حليب'],
  cleaning: ['منظفات'],
  pickles: ['مخلل خيار كامل', 'مخلل خيار مفروم', 'مخلل لفت', 'مخلل مشكل'],
  mutabbaq: ['خبز مطبق كبير', 'خبز مطبق صغير'],
};
const PRODUCE_CATALOG = {
  vegetables: PURCHASE_CATALOGS.vegetables,
  fruits: PURCHASE_CATALOGS.fruits,
};
const PRODUCE_OPTIONS = [...PRODUCE_CATALOG.vegetables, ...PRODUCE_CATALOG.fruits];
const PURCHASE_CATALOG_OPTIONS = Object.values(PURCHASE_CATALOGS).flat();

function normalizePurchaseText(value) {
  return String(value || '')
    .replace(/[إأآ]/g, 'ا')
    .replace(/[ًٌٍَُِّْـ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
function purchaseMutabbaqType(item) {
  const text = normalizePurchaseText(item);
  if (/مطبق/.test(text)) {
    if (/كبير/.test(text)) return 'large';
    if (/صغير/.test(text)) return 'small';
    return 'mutabbaq';
  }
  const catVal = document.getElementById('purCatSel')?.value || '';
  const categoryName = catVal === 'new'
    ? (document.getElementById('purNewCatInput')?.value || '')
    : (currentMaterialTree[parseInt(catVal)]?.name || '');
  return /مطبق شاورما/.test(categoryName) && text ? 'mutabbaq' : '';
}
function purchaseProduceType(item) {
  const text = normalizePurchaseText(item);
  const matched = PRODUCE_OPTIONS.find(option => {
    const name = normalizePurchaseText(option);
    return text === name || text.includes(name);
  });
  if (matched) return matched;
  const catVal = document.getElementById('purCatSel')?.value || '';
  const categoryName = catVal === 'new'
    ? (document.getElementById('purNewCatInput')?.value || '')
    : (currentMaterialTree[parseInt(catVal)]?.name || '');
  return isProduceCategory(categoryName) && text ? 'manual_produce' : '';
}
function isProduceCategory(name) {
  return /خضار|خضروات|فواكه|فاكهة/.test(String(name || ''));
}
function catalogOptionsForCategory(name) {
  const text = String(name || '');
  if (/(?:فواكه|فاكهة)/.test(text) && /خضار|خضروات/.test(text)) return PRODUCE_OPTIONS;
  if (/فواكه|فاكهة/.test(text)) return PRODUCE_CATALOG.fruits;
  if (/خضار|خضروات/.test(text)) return PRODUCE_CATALOG.vegetables;
  if (/ألبان|لبن|حليب/.test(text)) return PURCHASE_CATALOGS.dairy;
  if (/منظفات|تنظيف/.test(text)) return PURCHASE_CATALOGS.cleaning;
  if (/مخلل|مخللات/.test(text)) return PURCHASE_CATALOGS.pickles;
  if (/مطبق شاورما/.test(text)) return PURCHASE_CATALOGS.mutabbaq;
  return [];
}

function getMaterialTree() {
  const inv = (window.DATA && window.DATA.inventory) ? window.DATA.inventory : [];
  const pur = (window.DATA && window.DATA.material_purchases) ? window.DATA.material_purchases : [];
  
  const map = {};
  const knownIcons = { 'خضار':'🍅', 'خضروات':'🥬', 'فواكه':'🍎', 'فاكهة':'🍎', 'ألبان':'🥛', 'لبن':'🥛', 'حليب':'🥛', 'منظفات':'🧴', 'مخلل':'🫙', 'مخللات':'🫙', 'مطبق شاورما':'🥙', 'لحوم':'🥩', 'دواجن':'🥩', 'مخبوزات':'🥖', 'بهارات':'🧂', 'تغليف':'📦', 'زيوت':'🧀' };

  inv.forEach(i => {
    let c = i.category || 'عام';
    if (!map[c]) map[c] = { name: c, icon: '📦', items: new Set() };
    if (i.name && i.trackable !== false) map[c].items.add(i.name);
  });

  pur.forEach(p => {
    let c = p.category || p.cat || 'عام';
    if (!map[c]) map[c] = { name: c, icon: '📦', items: new Set() };
    if (p.item) map[c].items.add(p.item);
  });

  const arr = Object.values(map).map(m => {
    for (let k in knownIcons) if (m.name.includes(k)) m.icon = knownIcons[k];
    const items = Array.from(m.items);
    catalogOptionsForCategory(m.name).forEach(option => {
      const normalized = normalizePurchaseText(option);
      if (!items.some(existing => normalizePurchaseText(existing) === normalized)) items.push(option);
    });
    return { name: m.name, icon: m.icon, items };
  });

  if (arr.length === 0) arr.push({ name: 'عام', icon: '📦', items: [] });
  if (!arr.some(category => /خضار|خضروات/.test(category.name))) {
    arr.push({ name: 'خضار', icon: '🥬', items: [...PRODUCE_CATALOG.vegetables] });
  }
  if (!arr.some(category => /فواكه|فاكهة/.test(category.name))) {
    arr.push({ name: 'فواكه', icon: '🍎', items: [...PRODUCE_CATALOG.fruits] });
  }
  if (!arr.some(category => /ألبان|لبن|حليب/.test(category.name))) {
    arr.push({ name: 'ألبان', icon: '🥛', items: [...PURCHASE_CATALOGS.dairy] });
  }
  if (!arr.some(category => /منظفات|تنظيف/.test(category.name))) {
    arr.push({ name: 'منظفات', icon: '🧴', items: [...PURCHASE_CATALOGS.cleaning] });
  }
  if (!arr.some(category => /مخلل|مخللات/.test(category.name))) {
    arr.push({ name: 'مخللات', icon: '🫙', items: [...PURCHASE_CATALOGS.pickles] });
  }
  if (!arr.some(category => /مطبق شاورما/.test(category.name))) {
    arr.push({ name: 'مطبق شاورما', icon: '🥙', items: [...PURCHASE_CATALOGS.mutabbaq] });
  }

  return arr;
}


const EMPLOYEES = DATA.employees || [];

const EXP_TYPES = [
  { key:'salary',      label:'رواتب وسلف',    icon:'👤' },
  { key:'fuel',        label:'محروقات',        icon:'⛽' },
  { key:'maintenance', label:'صيانة',          icon:'🔧' },
  { key:'bills',       label:'فواتير',         icon:'📄' },
  { key:'other',       label:'أخرى',           icon:'📌' },
];

let purchases = [];
let expenses = [];

function todayDate() {
  return window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10);
}
function persistExp() {
  DATA.expenditures = expenses.slice();
  DATA.expenditures_list = expenses.slice();
  DATA.material_purchases = purchases.slice();
  if (window.ExpenditureSync && window.ExpenditureSync.push) return window.ExpenditureSync.push();
  return Promise.resolve({ local: true });
}

/* ── حالة UI ── */
let activePanel  = null;  // null | 'purchases' | 'expenses'
let activeModal  = null;  // null | 'addPurchase' | 'addExpense'
let navOpen      = false;

/* ── temp state للنماذج ── */
let purCatIdx   = 0;
let purItemVal  = '';
let expTypeKey  = 'salary';

/* ================================================================
   البناء الرئيسي
   ================================================================ */
function renderApp() {
  document.getElementById('expApp').innerHTML = `
    <div class="mgr-layout">

      <!-- Sidebar ديسكتوب -->
      <nav class="mgr-sidebar" id="mgrSidebar">
        <button class="mgr-side-toggle" onclick="document.getElementById('mgrSidebar').classList.toggle('expanded')">☰</button>
        <div class="mgr-side-logo"><strong>α</strong><span>alfaprosys</span></div>
        <div class="mgr-side-nav">${MGR_NAV.map(n => navLink(n)).join('')}</div>
        <div class="mgr-side-spacer"></div>
        <a class="mgr-side-link danger" href="index.html" onclick="sessionStorage.removeItem('alfaprosys_role')" title="خروج">
          <span class="mgr-side-ic">🚪</span><span class="mgr-side-lb">خروج</span>
        </a>
      </nav>

      <!-- المحتوى -->
      <div class="mgr-content-panel">
        <div id="expContent"></div>
      </div>
    </div>

    <!-- Scrim -->
    <div class="mgr-nav-scrim" id="mgrNavScrim" onclick="closeNav()"></div>

    <!-- FAB -->
    <button class="mgr-fab" onclick="toggleNav()">☰</button>

    <!-- Mobile Nav -->
    <nav class="mgr-mobile-nav" id="mgrMobileNav">
      <div class="mgr-mobile-nav-head">
        <strong>قائمة الإدارة</strong>
        <button onclick="closeNav()">✕</button>
      </div>
      <div class="mgr-mobile-nav-grid">
        ${MGR_NAV.map(n => navLink(n, true)).join('')}
        <a class="mgr-mobile-nav-link danger" href="index.html" onclick="sessionStorage.removeItem('alfaprosys_role')">
          <span>🚪</span><small>خروج</small>
        </a>
      </div>
    </nav>

    <!-- مودال إضافة مشتريات -->
    <div class="exp-modal-scrim" id="purModalScrim" onclick="closeModal('purchase')"></div>
    <div class="exp-modal" id="purModal" role="dialog">
      <div class="exp-modal-head">
        <span>🛒 تسجيل مشتريات مواد أولية</span>
        <button onclick="closeModal('purchase')">✕</button>
      </div>
      <div class="exp-modal-body" id="purModalBody"></div>
    </div>

    <!-- مودال إضافة مصاريف -->
    <div class="exp-modal-scrim" id="expModalScrim" onclick="closeModal('expense')"></div>
    <div class="exp-modal" id="expModal" role="dialog">
      <div class="exp-modal-head">
        <span>💸 تسجيل مصروف</span>
        <button onclick="closeModal('expense')">✕</button>
      </div>
      <div class="exp-modal-body" id="expModalBody"></div>
    </div>
  `;

  renderContent();
}

/* قراءة صريحة للبيانات البعيدة — لا تعيق الإقلاع ولا تستبدل اللقطة تلقائياً. */
async function refreshExpendituresFromCloud(){
  if (!window.ExpenditureSync || !ExpenditureSync.pull) return showToast('تحديث المصاريف غير متاح حالياً', '⚠️');
  const btn = document.getElementById('expCloudRefresh');
  if (btn) { btn.disabled = true; btn.textContent = '↻ جارٍ التحديث…'; }
  try {
    const result = await ExpenditureSync.pull();
    rebindExpenditureFromData();
    showToast(result && result.skipped ? 'أُبقيت اللقطة المحلية' : 'تم تحديث المصاريف والمشتريات صراحةً', result && result.skipped ? 'ℹ️' : '✅');
  } catch (err) { showToast('تعذر تحديث المصاريف: ' + String(err && err.message || err), '⚠️'); }
  finally { const b = document.getElementById('expCloudRefresh'); if (b) { b.disabled = false; b.textContent = '↻ تحديث السحابة'; } }
}
window.refreshExpendituresFromCloud = refreshExpendituresFromCloud;

/* ================================================================
   المحتوى الرئيسي
   ================================================================ */
function renderContent() {
  const purTotal = purchases.reduce((s,p) => s + p.total, 0);
  const expTotal = expenses.reduce((s,x) => s + x.amount, 0);
  const grandTotal = purTotal + expTotal;

  document.getElementById('expContent').innerHTML = `

    <!-- رأس الصفحة -->
    <div class="mgr-page-header">
      <div>
        <div class="mgr-page-brand">alfaprosys</div>
        <div class="mgr-page-title">💸 الصادرات — مصاريف ومشتريات</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">
        <div class="exp-total-badge">${fmtNum(grandTotal)} <span>ل.س</span></div>
      </div>
    </div>

    <!-- ══ اللوحتان الرئيسيتان ══ -->
    <div class="exp-panels">

      <!-- لوحة المشتريات -->
      <div class="exp-panel ${activePanel==='purchases'?'open':''}" id="purPanel">
        <div class="exp-panel-head" onclick="togglePanel('purchases')">
          <div class="exp-panel-icon-wrap purchases" style="display:none;"></div>
          <div class="exp-panel-info">
            <div class="exp-panel-label">مشتريات المواد الأولية</div>
            <div class="exp-panel-amount">${fmtNum(purTotal)} <span>ل.س</span></div>
            <div class="exp-panel-sub">${purchases.length} حركة شراء اليوم</div>
          </div>
          <div class="exp-panel-actions">
            <button class="exp-add-btn" onclick="event.stopPropagation(); openModal('purchase')">
              + إضافة
            </button>
            <span class="exp-panel-arrow ${activePanel==='purchases'?'open':''}">›</span>
          </div>
        </div>

        <!-- تفاصيل المشتريات -->
        <div class="exp-panel-body">
          ${purchases.length === 0
            ? `<div class="exp-empty">لا توجد مشتريات مسجلة</div>`
            : purchases.map((p, idx) => `
              <div class="exp-item-row">
                <div class="exp-item-main">
                  <div class="exp-item-title">${e(p.item)}</div>
                  <div class="exp-item-sub">
                    <span class="exp-item-cat">${e(p.cat)}</span>
                    
                    <span>
                      ${p.unit === 'بالكيلو' ? `الوزن: ${p.weight} كغ` : `الكمية: ${p.packages} ${e(p.unit)} ${p.weight > 0 ? '• '+p.weight+' كغ' : ''}`}
                    </span>
                    <span style="color:var(--fahad-navy); font-weight:800;">
                      ${p.price_per_loaf ? `سعر الرغيف: ${fmtNum(p.price_per_loaf)} | سعر الربطة: ${fmtNum(p.unitCost)}` 
                       : p.price_per_piece ? `سعر ${p.unit === 'بالكيلو' ? 'الكغ' : 'الـ'+e(p.unit)}: ${fmtNum(p.unitCost)} | تقدير القطعة: ${fmtNum(p.price_per_piece)}`
                       : `سعر ${p.unit === 'بالكيلو' ? 'الكغ' : 'الـ'+e(p.unit)}: ${fmtNum(p.unitCost)}`}
                    </span>

                    <span>${e(p.time)}</span>
                  </div>
                </div>
                <div class="exp-item-right">
                  <span class="exp-item-amount">${fmtNum(p.total)}</span>
                  <button class="exp-del-btn" onclick="deletePurchase(${idx})" title="حذف">✕</button>
                </div>
              </div>
            `).join('')}
          <div class="exp-panel-footer">
            <span>الإجمالي</span>
            <strong>${fmtNum(purTotal)}</strong>
          </div>
        </div>
      </div>

      <!-- لوحة المصاريف -->
      <div class="exp-panel ${activePanel==='expenses'?'open':''}" id="expPanel">
        <div class="exp-panel-head" onclick="togglePanel('expenses')">
          <div class="exp-panel-icon-wrap expenses">💸</div>
          <div class="exp-panel-info">
            <div class="exp-panel-label">المصاريف التشغيلية</div>
            <div class="exp-panel-amount">${fmtNum(expTotal)} <span>ل.س</span></div>
            <div class="exp-panel-sub">${expenses.length} سند مصروف اليوم</div>
          </div>
          <div class="exp-panel-actions">
            <button class="exp-add-btn expenses" onclick="event.stopPropagation(); openModal('expense')">
              + إضافة
            </button>
            <span class="exp-panel-arrow ${activePanel==='expenses'?'open':''}">›</span>
          </div>
        </div>

        <!-- تفاصيل المصاريف -->
        <div class="exp-panel-body">
          ${expenses.length === 0
            ? `<div class="exp-empty">لا توجد مصاريف مسجلة</div>`
            : expenses.map((x, idx) => `
              <div class="exp-item-row">
                <div class="exp-item-icon">${x.icon || '💸'}</div>
                <div class="exp-item-main">
                  <div class="exp-item-title">${e(x.title)}</div>
                  <div class="exp-item-sub">
                    <span class="exp-item-cat">${e(x.type)}</span>
                    <span>${e(x.time)}</span>
                  </div>
                </div>
                <div class="exp-item-right">
                  <span class="exp-item-amount expenses">${fmtNum(x.amount)}</span>
                  <button class="exp-del-btn" onclick="deleteExpense(${idx})" title="حذف">✕</button>
                </div>
              </div>
            `).join('')}
          <div class="exp-panel-footer">
            <span>الإجمالي</span>
            <strong>${fmtNum(expTotal)}</strong>
          </div>
        </div>
      </div>

    </div><!-- /exp-panels -->

    <!-- ══ ملخص الصادرات ══ -->
    <div class="exp-summary-card">
      <div class="exp-summary-title">📊 ملخص الصادرات اليوم</div>
      <div class="exp-summary-rows">
        <div class="exp-summary-row">
          <span>🛒 مشتريات المواد</span>
          <strong class="blue">${fmtNum(purTotal)}</strong>
        </div>
        <div class="exp-summary-row">
          <span>💸 مصاريف تشغيل</span>
          <strong class="red">${fmtNum(expTotal)}</strong>
        </div>
        <div class="exp-summary-row total-row">
          <span>إجمالي الصادرات</span>
          <strong>${fmtNum(grandTotal)}</strong>
        </div>
      </div>
    </div>
  `;
}

/* ================================================================
   toggle اللوحات
   ================================================================ */
function togglePanel(key) {
  activePanel = activePanel === key ? null : key;
  renderContent();
  if (activePanel) {
    setTimeout(() => {
      const el = document.getElementById(activePanel === 'purchases' ? 'purPanel' : 'expPanel');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

/* ================================================================
   حذف
   ================================================================ */
function deletePurchase(idx) {
  if (!confirm(`حذف: ${purchases[idx]?.item}؟`)) return;
  const doomed = purchases[idx] && purchases[idx].id;
  purchases.splice(idx, 1);
  const remove = doomed != null && window.ExpenditureSync && ExpenditureSync.removePur
    ? ExpenditureSync.removePur(doomed)
    : (doomed != null && window.AlfaOutbox ? AlfaOutbox.commitDelete('purchases', doomed) : Promise.resolve());
  Promise.resolve(remove).then(function () { return persistExp(); }).catch(function () {});
  renderContent();
  showToast('تم حذف حركة الشراء', '🗑️');
}
function deleteExpense(idx) {
  if (!confirm(`حذف: ${expenses[idx]?.title}؟`)) return;
  const doomed = expenses[idx] && expenses[idx].id;
  expenses.splice(idx, 1);
  const remove = doomed != null && window.ExpenditureSync && ExpenditureSync.removeExp
    ? ExpenditureSync.removeExp(doomed)
    : (doomed != null && window.AlfaOutbox ? AlfaOutbox.commitDelete('expenditures', doomed) : Promise.resolve());
  Promise.resolve(remove).then(function () { return persistExp(); }).catch(function () {});
  renderContent();
  showToast('تم حذف المصروف', '🗑️');
}

/* ================================================================
   فتح / إغلاق المودال
   ================================================================ */
function openModal(type) {
  if (type === 'purchase') {
    buildPurchaseForm();
    document.getElementById('purModalScrim').classList.add('show');
    document.getElementById('purModal').classList.add('show');
  } else {
    buildExpenseForm();
    document.getElementById('expModalScrim').classList.add('show');
    document.getElementById('expModal').classList.add('show');
  }
}
function closeModal(type) {
  if (type === 'purchase') {
    document.getElementById('purModalScrim').classList.remove('show');
    document.getElementById('purModal').classList.remove('show');
  } else {
    document.getElementById('expModalScrim').classList.remove('show');
    document.getElementById('expModal').classList.remove('show');
  }
}

/* ================================================================
   نموذج المشتريات
   ================================================================ */
function buildPurchaseForm() {
  currentMaterialTree = getMaterialTree();
  if (purCatIdx >= currentMaterialTree.length) purCatIdx = 0;
  const cat = currentMaterialTree[purCatIdx];
  document.getElementById('purModalBody').innerHTML = `
    <!-- 1. التصنيف -->
    <div class="mgr-form-group">
      <label>التصنيف الرئيسي</label>
      <select id="purCatSel" onchange="onPurCatChange(this.value)">
        ${currentMaterialTree.map((c,i) => `
          <option value="${i}" ${i===purCatIdx?'selected':''}>${c.icon} ${e(c.name)}</option>
        `).join('')}
        <option value="new">➕ تصنيف جديد...</option>
      </select>
    </div>
    <div class="mgr-form-group" id="purNewCatRow" style="display:none;">
      <label>اسم التصنيف الجديد</label>
      <input type="text" id="purNewCatInput" placeholder="مثال: ألبان ومنتجات">
    </div>

    <!-- 2. المادة -->
    <div class="mgr-form-group">
      <label>اسم المادة</label>
      <select id="purItemSel" onchange="onPurItemChange(this.value)">
        ${cat.items.map(it => `<option value="${e(it)}">${e(it)}</option>`).join('')}
        <option value="new">➕ مادة جديدة...</option>
      </select>
    </div>
    <div class="mgr-form-group" id="purNewItemRow" style="display:none;">
      <label>اسم المادة الجديدة</label>
      <input type="text" id="purNewItemInput" placeholder="مثال: بطاطا سبونتا" oninput="onPurNewItemInput(this.value)">
    </div>

    <!-- الحقول الديناميكية حسب المادة -->
    <div id="purDynamicFields"></div>

    <!-- حساب سعر الوحدة -->
    <div class="pur-unit-cost-box" id="purUnitCostBox">
      <div class="pur-unit-cost-label">النتيجة التفصيلية والتكلفة</div>
      <div class="pur-unit-cost-val" id="purUnitCostVal">— ل.س</div>
      <div class="pur-unit-cost-formula" id="purUnitCostFormula">أدخل القيم المطلوبة للاحتساب</div>
    </div>

    <button class="mgr-btn navy block" onclick="submitPurchase()" style="width:100%;margin-top:4px;">
      ✅ ترحيل إلى كشف المشتريات
    </button>
  `;

  // تهيئة الحقول الديناميكية أول مرة
  onPurItemChange(document.getElementById('purItemSel').value);
}


function onPurCatChange(val) {
  const newCatRow  = document.getElementById('purNewCatRow');
  const itemSel    = document.getElementById('purItemSel');
  if (val === 'new') {
    newCatRow.style.display = 'block';
    itemSel.innerHTML = `<option value="new">➕ مادة جديدة...</option>`;
    document.getElementById('purNewItemRow').style.display = 'block';
  } else {
    newCatRow.style.display = 'none';
    purCatIdx = parseInt(val);
    const cat = currentMaterialTree[purCatIdx];
    
    const allItems = cat ? cat.items : [];

    itemSel.innerHTML = allItems.map(it => `<option value="${e(it)}">${e(it)}</option>`).join('')
      + `<option value="new">➕ مادة جديدة...</option>`;
    document.getElementById('purNewItemRow').style.display = 'none';
  }
  onPurItemChange(itemSel.value);
}



function onPurItemChange(val) {
  const newItemRow = document.getElementById('purNewItemRow');
  if (newItemRow) newItemRow.style.display = val === 'new' ? 'block' : 'none';
  
  const dyn = document.getElementById('purDynamicFields');
  if (!dyn) return;

  const item = (val === 'new' ? (document.getElementById('purNewItemInput')?.value || '') : val);

  // Unified Form
  dyn.innerHTML = `
    <div class="mgr-form-row2">
      <div class="mgr-form-group">
        <label>نوع الشراء</label>
        <select id="purUnitSel" onchange="calcUnitCost()">
          <option value="بالكيلو">بالكيلو</option>
          <option value="ربطة">ربطة</option>
          <option value="صندوق">صندوق</option>
          <option value="علبة">علبة</option>
          <option value="شوال">شوال</option>
          <option value="كرتون">كرتون</option>
          <option value="قطعة">قطعة</option>
          <option value="عدد">عدد</option>
        </select>
      </div>
      <div class="mgr-form-group">
        <label id="purQtyLabel">الكمية (العدد)</label>
        <input type="text" id="purQty" value="1" inputmode="decimal" oninput="calcUnitCost()">
      </div>
    </div>
    <div class="mgr-form-row2">
      <div class="mgr-form-group">
        <label id="purWeightLabel">الوزن الكلي (إن وجد/كغ)</label>
        <input type="text" id="purWeight" placeholder="مثال: 5" inputmode="decimal" oninput="calcUnitCost()">
      </div>
      <div class="mgr-form-group">
        <label>السعر الكلي المدفوع (ل.س)</label>
        <input type="text" id="purTotalPrice" placeholder="0" inputmode="numeric" oninput="calcUnitCost()">
      </div>
    </div>
    <div id="purHint" style="font-size:12px; color:var(--text-muted); margin-bottom:8px; display:none;"></div>
  `;

  const unitSel = document.getElementById('purUnitSel');
  const hint = document.getElementById('purHint');
  const qtyLabel = document.getElementById('purQtyLabel');
  const weightLabel = document.getElementById('purWeightLabel');
  const mutabbaqType = purchaseMutabbaqType(item);
  const produceType = purchaseProduceType(item);
  
  if (mutabbaqType) {
    unitSel.value = 'ربطة';
    if (qtyLabel) qtyLabel.textContent = 'عدد ربطات المطبق';
    if (weightLabel) weightLabel.textContent = 'الكمية الكلية (اختياري)';
    hint.innerHTML = '* كل ربطة خبز مطبق = 12 رغيف عادي + 6 أرغفة شراك، ويُحفظ كصنف واحد ضمن تصنيف مطبق شاورما';
    hint.style.display = 'block';
  } else if (produceType) {
    unitSel.value = 'صندوق';
    if (qtyLabel) qtyLabel.textContent = 'عدد الصناديق / الشوال / الكرتون / الربطة';
    if (weightLabel) weightLabel.textContent = 'الكمية الكلية (كغ)';
    hint.innerHTML = '* اختر نوع العبوة، ثم أدخل عدد العبوات والكمية الكلية بالكيلو لحساب سعر الكيلو والسعر المفرد';
    hint.style.display = 'block';
  } else if (item.includes('سياحي')) {
    unitSel.value = 'ربطة';
    hint.innerHTML = '* الربطة توازي 12 رغيف';
    hint.style.display = 'block';
  } else if (item.includes('سمون')) {
    unitSel.value = 'ربطة';
    hint.innerHTML = '* الربطة توازي 4 أرغفة';
    hint.style.display = 'block';
  } else if (item.includes('خبز برغر')) {
    unitSel.value = 'ربطة';
    hint.innerHTML = '* الربطة توازي 6 أرغفة';
    hint.style.display = 'block';
  } else if (item.includes('صاج') || item.includes('شراك')) {
    unitSel.value = 'ربطة';
    hint.innerHTML = '* الربطة / الشدة توازي 100 رغيف';
    hint.style.display = 'block';
  } else if (item.includes('لحم برغر')) {
    unitSel.value = 'بالكيلو';
    hint.innerHTML = '* الكيلو يعطي تقريباً 14 قطعة برغر (70غ للقطعة)';
    hint.style.display = 'block';
  } else if (item.includes('بروستد') || item.includes('دجاج كامل')) {
    unitSel.value = 'عدد';
    hint.innerHTML = '* يرجى إدخال عدد الدجاج والوزن الكلي لتقدير التكلفة';
    hint.style.display = 'block';
  } else if (item.includes('دبوس')) {
    unitSel.value = 'بالكيلو';
    hint.innerHTML = '* الكيلو يعطي تقريباً 7-8 قطع';
    hint.style.display = 'block';
  } else {
    unitSel.value = 'بالكيلو';
  }

  calcUnitCost();
}

function onPurNewItemInput(value) {
  // عند كتابة اسم خضار/فاكهة يدوياً، نُظهر نفس الحقول المرتبطة فوراً.
  if (document.getElementById('purItemSel')?.value === 'new') onPurItemChange('new');
}

function calcUnitCost() {
  const valEl = document.getElementById('purUnitCostVal');
  const frmEl = document.getElementById('purUnitCostFormula');
  if (!valEl) return;

  const total = parseLocalNum(document.getElementById('purTotalPrice')?.value) || 0;
  if (!total) {
    valEl.textContent = '— ل.س';
    frmEl.textContent = 'أدخل السعر الإجمالي للاحتساب';
    return;
  }

  const itemSel = document.getElementById('purItemSel')?.value || '';
  const item = (itemSel === 'new' ? (document.getElementById('purNewItemInput')?.value || '') : itemSel);
  
  const unit = document.getElementById('purUnitSel')?.value || 'بالكيلو';
  const qty = parseLocalNum(document.getElementById('purQty')?.value) || 1;
  const weight = parseLocalNum(document.getElementById('purWeight')?.value) || 0;
  
  let html = '';
  let detail = '';

  // المطبق يُعامل كربطة واحدة تحتوي مكوناتها داخلياً، لا كصفين منفصلين.
  const mutabbaqType = purchaseMutabbaqType(item);
  if (mutabbaqType) {
    html += `${fmtNum(Math.round(total / qty))} ل.س لكل ربطة<br>`;
    detail = `الإجمالي: ${qty} ربطة مطبق = ${fmtNum(Math.round(qty * 12))} رغيف عادي + ${fmtNum(Math.round(qty * 6))} شراك`;
  }
  // الخضار والفواكه: حساب سعر الكيلو وسعر العبوة معاً عند توفر الحقلين
  else {
    const produceType = purchaseProduceType(item);
    if (produceType) {
      if (weight > 0) html += `${fmtNum(Math.round(total / weight))} ل.س / كغ<br>`;
    if (qty > 0) html += `<span style="font-size:13px;color:var(--text-muted);">~${fmtNum(Math.round(total / qty))} ل.س لكل ${unit}</span>`;
    detail = `الكمية الكلية: ${weight > 0 ? weight + ' كغ' : 'غير مدخلة'} | العبوات: ${qty} ${unit}`;
  }
  // Bread calculations
  else if (item.includes('سياحي') || item.includes('سمون') || item.includes('خبز برغر') || item.includes('صاج') || item.includes('شراك')) {
    let loavesPerUnit = 12;
    if (item.includes('سمون')) loavesPerUnit = 4;
    else if (item.includes('خبز برغر')) loavesPerUnit = 6;
    else if (item.includes('صاج') || item.includes('شراك')) loavesPerUnit = 100;
    
    const pricePerUnit = Math.round(total / qty);
    html += `${fmtNum(pricePerUnit)} ل.س لكل ${unit}<br>`;
    
    if (unit === 'ربطة' || unit === 'شوال') {
      const totalLoaves = qty * loavesPerUnit;
      const pricePerLoaf = Number((total / totalLoaves).toFixed(2));
      html += `<span style="font-size:13px;color:var(--text-muted);">~${fmtNum(pricePerLoaf)} ل.س للرغيف الواحد</span>`;
      detail = `الإجمالي: ${totalLoaves} رغيف (${qty} ${unit} × ${loavesPerUnit})`;
    } else {
      detail = `الكمية: ${qty} ${unit}`;
    }
  } 
  // Burger Meat
  else if (item.includes('لحم برغر')) {
    if (weight > 0) {
      const pricePerKg = Math.round(total / weight);
      const estPieces = Math.round(weight * (1000 / 70)); // ~14.28 pieces per kg
      const pricePerPiece = Math.round(total / estPieces);
      html += `${fmtNum(pricePerKg)} ل.س / كغ<br>`;
      html += `<span style="font-size:13px;color:var(--text-muted);">~${fmtNum(pricePerPiece)} ل.س لقطعة البرغر (70غ)</span>`;
      detail = `الوزن: ${weight} كغ | تقدير: ${estPieces} قطعة`;
    } else {
      const pricePerUnit = Math.round(total / qty);
      html = `${fmtNum(pricePerUnit)} ل.س لكل ${unit}`;
      detail = `الكمية: ${qty} ${unit} (أدخل الوزن لتقدير عدد القطع)`;
    }
  }
  // Chicken / Broasted
  else if (item.includes('بروستد') || item.includes('دجاج كامل')) {
    if (weight > 0) html += `${fmtNum(Math.round(total/weight))} ل.س / كغ <br>`;
    if (qty > 0) html += `<span style="font-size:13px;color:var(--text-muted);">${fmtNum(Math.round(total/qty))} ل.س / دجاجة</span>`;
    detail = `العدد: ${qty} | الوزن: ${weight} كغ`;
  }
  // Pin (Drumsticks)
  else if (item.includes('دبوس')) {
    if (weight > 0) {
      const pricePerKg = Math.round(total / weight);
      const estPieces = Math.round(weight * 7.5);
      const pricePerPiece = Math.round(total / estPieces);
      html += `${fmtNum(pricePerKg)} ل.س / كغ<br>`;
      html += `<span style="font-size:13px;color:var(--text-muted);">~${fmtNum(pricePerPiece)} ل.س للقطعة</span>`;
      detail = `الوزن: ${weight} كغ | تقدير: ${estPieces} قطعة`;
    } else {
      const pricePerUnit = Math.round(total / qty);
      html = `${fmtNum(pricePerUnit)} ل.س لكل ${unit}`;
      detail = `الكمية: ${qty} ${unit} (أدخل الوزن لتقدير عدد القطع)`;
    }
  }
  // Default
  else {
    if (weight > 0) {
      const rate = Math.round(total / weight);
      html = `${fmtNum(rate)} ل.س / كغ`;
      detail = `${fmtNum(total)} ÷ ${weight} كغ = ${fmtNum(rate)}`;
    } else {
      const rate = Math.round(total / qty);
      html = `${fmtNum(rate)} ل.س / ${unit}`;
      detail = `${fmtNum(total)} ÷ ${qty} ${unit} = ${fmtNum(rate)}`;
    }
  }
  }

  valEl.innerHTML = `<div style="font-size:14px; line-height:1.4;">${html}</div>`;
  frmEl.textContent = detail;
}

function submitPurchase() {
  const catVal  = document.getElementById('purCatSel').value;
  const itemVal = document.getElementById('purItemSel').value;
  let total   = parseLocalNum(document.getElementById('purTotalPrice')?.value) || 0;
  
  let cat  = catVal  === 'new' ? document.getElementById('purNewCatInput').value.trim()  : currentMaterialTree[parseInt(catVal)]?.name || '';
  let item = itemVal === 'new' ? document.getElementById('purNewItemInput').value.trim() : itemVal;

  if (!item) { showToast('أدخل اسم المادة', '⚠️'); return; }
  if (!total || total <= 0) { showToast('أدخل السعر الكلي المدفوع', '⚠️'); return; }

  let weight = parseLocalNum(document.getElementById('purWeight')?.value) || 0;
  let qty = parseLocalNum(document.getElementById('purQty')?.value) || 1;
  let unit = document.getElementById('purUnitSel')?.value || 'بالكيلو';
  
  let unitCost = total;
  let price_per_loaf = null;
  let price_per_piece = null;
  const mutabbaqType = purchaseMutabbaqType(item);
  const produceType = purchaseProduceType(item);

  // الحسابات الذكية لحفظها في قاعدة البيانات
  if (mutabbaqType) {
    unit = 'ربطة';
    unitCost = Math.round(total / qty);
  }
  else if (produceType) {
    unitCost = Math.round(total / (weight > 0 ? weight : qty));
  }
  else if (item.includes('سياحي') || item.includes('سمون') || item.includes('خبز برغر') || item.includes('صاج') || item.includes('شراك')) {
    unitCost = Math.round(total / qty);
    
    let loavesPerUnit = 12;
    if (item.includes('سمون')) loavesPerUnit = 4;
    else if (item.includes('خبز برغر')) loavesPerUnit = 6;
    else if (item.includes('صاج') || item.includes('شراك')) loavesPerUnit = 100;
    
    const totalLoaves = qty * loavesPerUnit;
    price_per_loaf = Number((total / totalLoaves).toFixed(2));
  } 
  else if (item.includes('لحم برغر')) {
    if (weight > 0) {
      unitCost = Math.round(total / weight);
      const estPieces = weight * (1000 / 70); // 70g per piece
      price_per_piece = Math.round(total / estPieces);
    } else {
      unitCost = Math.round(total / qty);
    }
  }
  else if (item.includes('دبوس')) {
    if (weight > 0) {
      unitCost = Math.round(total / weight);
      const estPieces = weight * 7.5;
      price_per_piece = Math.round(total / estPieces);
    } else {
      unitCost = Math.round(total / qty);
    }
  }
  else if (item.includes('بروستد') || item.includes('دجاج كامل')) {
    // If weight is given, unitCost is per kg, otherwise per chicken
    if (weight > 0) {
      unitCost = Math.round(total / weight);
      price_per_piece = Math.round(total / qty); // Cost per chicken
    } else {
      unitCost = Math.round(total / qty);
    }
  }
  else {
    // Default fallback
    if (weight > 0) {
      unitCost = Math.round(total / weight);
    } else {
      unitCost = Math.round(total / qty);
    }
  }

  const purchaseRecord = {
    id: Date.now(), item, cat, unit, packages: qty,
    weight: weight, unitCost, total,
    time: nowTime(), date: todayDate()
  };
  
  if (price_per_loaf !== null) purchaseRecord.price_per_loaf = price_per_loaf;
  if (price_per_piece !== null) purchaseRecord.price_per_piece = price_per_piece;

  purchases.unshift(purchaseRecord);
  persistExp();

  // --- مزامنة المخزون (تلقائياً) ---
  if (window.DATA && window.DATA.inventory) {
    let invItems = window.DATA.inventory;
    let existingInv = invItems.find(i => i.name === item);
    
    const isMutabbaq = !!mutabbaqType;
    const isProduce = !!produceType;
    let addedQty = isMutabbaq ? qty : (weight > 0 ? weight : qty);
    let invUnit = isMutabbaq ? 'ربطة' : (weight > 0 ? 'كغ' : unit);
    if(!isMutabbaq && !isProduce && (item.includes('سياحي') || item.includes('سمون') || item.includes('برغر') || item.includes('صاج'))) invUnit = 'ربطة';

    if (existingInv) {
      // Add quantity to existing inventory
      existingInv.qty = (existingInv.qty || 0) + addedQty;
      existingInv.cost_per_unit = unitCost;
      if (isMutabbaq) {
        existingInv.unit = 'ربطة';
        existingInv.loaves_per_bundle = 18;
      } else if (isProduce) {
        existingInv.unit = invUnit;
      }
      if (!existingInv.log) existingInv.log = [];
      existingInv.log.unshift({
        id: Date.now(), type: 'in', qty: addedQty, cost: unitCost,
        note: 'شراء فاتورة', by: 'المدير', date: todayDate(), time: nowTime()
      });
    } else {
      // Create new inventory item
      const newInv = {
        id: 'inv_' + Date.now(),
        name: item,
        category: cat,
        unit: invUnit,
        qty: addedQty,
        min_qty: 10,
        cost_per_unit: unitCost,
        trackable: true,
        log: [{
          id: Date.now(), type: 'in', qty: addedQty, cost: unitCost,
          note: 'شراء أولي', by: 'المدير', date: todayDate(), time: nowTime()
        }]
      };
      if (isMutabbaq) newInv.loaves_per_bundle = 18;
      invItems.push(newInv);
    }
    // force update
    window.DATA.inventory = [...invItems];
    if (window.InventorySync && window.InventorySync.push) window.InventorySync.push();
  }


  closeModal('purchase');
  activePanel = 'purchases';
  renderContent();
  showToast(`تم تسجيل شراء: ${item}`, '✅');
}


/* ================================================================
   نموذج المصاريف
   ================================================================ */
function buildExpenseForm() {
  document.getElementById('expModalBody').innerHTML = `

    <!-- نوع المصروف -->
    <div class="exp-type-grid">
      ${EXP_TYPES.map(t => `
        <button class="exp-type-btn ${expTypeKey===t.key?'active':''}"
          onclick="setExpType('${t.key}')">
          <span>${t.icon}</span>
          <small>${e(t.label)}</small>
        </button>
      `).join('')}
    </div>

    <!-- الحقول الديناميكية -->
    <div id="expDynamicFields"></div>

    <!-- المبلغ -->
    <div class="mgr-form-group">
      <label>المبلغ المدفوع (ل.س)</label>
      <input type="text" id="expAmount" placeholder="0" inputmode="numeric">
    </div>

    <button class="mgr-btn primary block" onclick="submitExpense()" style="width:100%;">
      ✅ قيد المصروف في الصندوق
    </button>
  `;

  renderExpDynamic();
}

function setExpType(key) {
  expTypeKey = key;
  // تحديث أزرار النوع فقط بدون إعادة بناء كامل
  document.querySelectorAll('.exp-type-btn').forEach(b => {
    const isActive = b.querySelector('small')?.textContent === EXP_TYPES.find(t=>t.key===key)?.label;
    b.classList.toggle('active', EXP_TYPES.findIndex(t=>t.key===key) === [...document.querySelectorAll('.exp-type-btn')].indexOf(b));
  });
  // أسهل: نعيد render الحقول الديناميكية فقط
  document.querySelectorAll('.exp-type-btn').forEach((b,i) => {
    b.classList.toggle('active', EXP_TYPES[i]?.key === key);
  });
  renderExpDynamic();
}

function renderExpDynamic() {
  const box = document.getElementById('expDynamicFields');
  if (!box) return;
  switch (expTypeKey) {
    case 'salary':
      box.innerHTML = `
        <div class="mgr-form-group">
          <label>اسم الموظف / المستفيد <span style="color:var(--clay-deep,#b91c1c);">(إدخال يدوي)</span></label>
          <div class="exp-employee-autocomplete">
            <input type="text" id="expEmpName"
              placeholder="اكتب اسم الموظف أو المستفيد" autocomplete="off"
              onfocus="onEmpNameInput(this.value)"
              oninput="onEmpNameInput(this.value)"
              onblur="setTimeout(hideEmpSuggestions, 160)">
            <div id="expEmpSuggestions" class="exp-employee-suggestions" role="listbox"></div>
          </div>
        </div>
        <div class="mgr-form-group">
          <label>الوظيفة / المهنة (اختياري)</label>
          <input type="text" id="expEmpJob" placeholder="مثال: كاشير أو طباخ"
            oninput="this.dataset.manual='1'">
        </div>
        <div class="mgr-form-group">
          <label>نوع السند</label>
          <select id="expSalaryKind">
            <option>سلفة على الراتب</option>
            <option>راتب أسبوعي / شهري</option>
            <option>مكافأة إنجاز</option>
          </select>
        </div>`;
      break;
    case 'fuel':
      box.innerHTML = `
        <div class="mgr-form-group">
          <label>بند المحروقات</label>
          <select id="expFuelSel">
            <option>مازوت للمولدة</option>
            <option>جرة غاز للقلايات</option>
            <option>بنزين دراجات التوصيل</option>
          </select>
        </div>`;
      break;
    case 'maintenance':
      box.innerHTML = `
        <div class="mgr-form-group">
          <label>الجهاز / بيان الصيانة</label>
          <input type="text" id="expMaintInput" placeholder="مثال: إصلاح قلاية الدجاج">
        </div>`;
      break;
    case 'bills':
      box.innerHTML = `
        <div class="mgr-form-group">
          <label>نوع الفاتورة</label>
          <select id="expBillSel">
            <option>فاتورة الكهرباء</option>
            <option>فاتورة المياه</option>
            <option>اشتراك إنترنت</option>
            <option>إيجار</option>
          </select>
        </div>`;
      break;
    default:
      box.innerHTML = `
        <div class="mgr-form-group">
          <label>بيان المصروف</label>
          <input type="text" id="expOtherInput" placeholder="اكتب تفاصيل المصروف">
        </div>`;
  }
}

function hideEmpSuggestions() {
  const box = document.getElementById('expEmpSuggestions');
  if (!box) return;
  box.innerHTML = '';
  box.style.display = 'none';
}

function onEmpNameInput(value) {
  const box = document.getElementById('expEmpSuggestions');
  if (!box) return;
  const query = String(value || '').trim().toLowerCase();
  const matches = EMPLOYEES.filter(emp => {
    const name = String(emp.name || '').toLowerCase();
    return !query || name.includes(query);
  }).slice(0, 8);
  if (!matches.length) return hideEmpSuggestions();
  box.innerHTML = matches.map(emp => `
    <button type="button" class="exp-employee-suggestion" role="option"
      onclick="chooseEmpSuggestion('${e(emp.id)}')">
      <strong>${e(emp.name)}</strong>
      ${emp.job || emp.role ? `<small>${e(emp.job || emp.role)}</small>` : ''}
    </button>`).join('');
  box.style.display = 'block';
}

function chooseEmpSuggestion(empId) {
  const emp = EMPLOYEES.find(item => String(item.id) === String(empId));
  const name = document.getElementById('expEmpName');
  const job = document.getElementById('expEmpJob');
  if (!emp || !name) return;
  name.value = emp.name || '';
  name.dataset.employeeId = emp.id || '';
  if (job && job.dataset.manual !== '1') job.value = emp.job || emp.role || '';
  hideEmpSuggestions();
}

function updateEmpJob(empId) {
  const emp = EMPLOYEES.find(e => e.id === empId);
  if (emp && document.getElementById('expEmpJob')) document.getElementById('expEmpJob').value = emp.job || emp.role || '';
}

function submitExpense() {
  const amount = parseLocalNum(document.getElementById('expAmount')?.value);
  if (!amount || amount <= 0) { showToast('أدخل المبلغ', '⚠️'); return; }

  const typeObj = EXP_TYPES.find(t => t.key === expTypeKey);
  let title = '';
  let employeeId = null;
  let note = '';

  switch (expTypeKey) {
    case 'salary': {
      const employeeName = (document.getElementById('expEmpName')?.value || '').trim();
      const employeeJob = (document.getElementById('expEmpJob')?.value || '').trim();
      if (!employeeName) { showToast('اكتب اسم الموظف أو المستفيد', '⚠️'); return; }
      const emp = EMPLOYEES.find(item => String(item.id) === employeeName || String(item.name || '') === employeeName);
      employeeId = emp ? emp.id : null;
      const kind = document.getElementById('expSalaryKind')?.value || 'سلفة';
      const shownJob = employeeJob || emp?.job || emp?.role || '';
      title = `${kind} — ${employeeName}${shownJob ? ' (' + shownJob + ')' : ''}`;
      note = shownJob ? `${kind} — ${shownJob}` : kind;
      break;
    }
    case 'fuel':
      title = document.getElementById('expFuelSel')?.value || 'محروقات';
      note = title;
      break;
    case 'maintenance':
      title = document.getElementById('expMaintInput')?.value || 'صيانة معدات';
      note = title;
      break;
    case 'bills':
      title = document.getElementById('expBillSel')?.value || 'فاتورة';
      note = title;
      break;
    default:
      title = document.getElementById('expOtherInput')?.value || 'مصروف عام';
      note = title;
  }

  const shiftSession = DATA.cashierSession || {};
  const shiftKey = window.alfaCurrentShiftKey
    ? alfaCurrentShiftKey()
    : (shiftSession.shift_key || '');
  const cashierKey = window.alfaCurrentCashierKey
    ? alfaCurrentCashierKey()
    : (shiftSession.cashier_key || '');
  const shiftKind = shiftSession.shift_kind
    || (window.alfaCurrentShiftKind ? alfaCurrentShiftKind() : '');
  const expenseNote = window.alfaExpenseNoteWithMeta
    ? alfaExpenseNoteWithMeta(note, { shift_key: shiftKey, cashier_key: cashierKey, shift_kind: shiftKind })
    : note;

  expenses.unshift({
    id: Date.now(),
    type: typeObj?.label || 'أخرى',
    category: expTypeKey,
    employee: employeeId,
    employee_name: expTypeKey === 'salary'
      ? (document.getElementById('expEmpName')?.value || '').trim()
      : null,
    /* note يبقى عموداً معروفاً للسحابة؛ مفاتيح الربط محلية ومضمّنة
       داخله بواسطة الحامل النصي الآمن. */
    note: expenseNote,
    shift_key: shiftKey,
    cashier_key: cashierKey,
    shift_kind: shiftKind,
    icon: typeObj?.icon || '💸',
    title, amount,
    time: nowTime(),
    date: todayDate()
  });
  persistExp();

  closeModal('expense');
  activePanel = 'expenses';
  renderContent();
  showToast(`تم تسجيل: ${title}`, '✅');
}

/* ================================================================
   nav
   ================================================================ */
function toggleNav() {
  navOpen = !navOpen;
  document.getElementById('mgrMobileNav')?.classList.toggle('expanded', navOpen);
  document.getElementById('mgrNavScrim')?.classList.toggle('show', navOpen);
}
function closeNav() {
  navOpen = false;
  document.getElementById('mgrMobileNav')?.classList.remove('expanded');
  document.getElementById('mgrNavScrim')?.classList.remove('show');
}

/* نعيد ربط المصاريف والمشتريات من المصدر المحلي بعد اكتمال
   قراءة IndexedDB والصندوق الصادر؛ لا ننتظر قاعدة البيانات عند الإقلاع. */
function rebindExpenditureFromData() {
  purchases = (DATA.material_purchases || []).slice();
  expenses = (DATA.expenditures || []).slice();
  if (document.getElementById('expApp')) renderApp();
}
try {
  window.addEventListener('alfa:expenditure-updated', rebindExpenditureFromData);
  window.addEventListener('alfa:auto-sync-applied', rebindExpenditureFromData);
  window.addEventListener('alfa:cloud-ready', rebindExpenditureFromData);
} catch (e) {}

/* ── تشغيل ── */
(window.alfaStart||function(fn){fn();})(function () {
  rebindExpenditureFromData();
});
