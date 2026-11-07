/* ================================================================
   sales.js — مبيعات اليوم — alfaprosys
   ================================================================ */

const DATA = window.DEMO_DATA;

/* ── أدوات ── */
/* ── التنقل المشترك ── */
const MGR_NAV = window.AlfaNav.MGR_NAV;
const CURRENT_PAGE = 'sales';
const navLink = window.AlfaNav.linker(CURRENT_PAGE);

/* ── حالة الشاشة ── */
let salesFilter  = 'all';
let salesShiftFilter = 'all';
let salesSection = 'list';

function salesInvoiceShift(inv) {
  const key = String((inv && (inv.cashier_key || inv.issued_shift_key || inv.shift_kind)) || '').toLowerCase();
  const name = String((inv && (inv.cashier || '')) || '');
  if (/morning|صباح|1111/.test(key + ' ' + name)) return 'morning';
  if (/evening|مساء|2222/.test(key + ' ' + name)) return 'evening';
  return 'unknown';
}
function salesShiftLabel(key) {
  return key === 'morning' ? 'الكاشير الصباحي' : key === 'evening' ? 'الكاشير المسائي' : 'غير محدد';
}
let navOpen      = false;

/* ================================================================
   البناء الرئيسي
   ================================================================ */
function renderApp() {
  document.getElementById('salesApp').innerHTML = `
    <div class="mgr-layout">

      <!-- Sidebar — ديسكتوب -->
      <nav class="mgr-sidebar" id="mgrSidebar">
        <button class="mgr-side-toggle" type="button" onclick="toggleSidebar()">☰</button>
        <div class="mgr-side-logo">
          <strong>α</strong><span>alfaprosys</span>
        </div>
        <div class="mgr-side-nav">
          ${MGR_NAV.map(n => navLink(n)).join('')}
        </div>
        <div class="mgr-side-spacer"></div>
        <a class="mgr-side-link danger" href="index.html" onclick="sessionStorage.removeItem('alfaprosys_role');sessionStorage.removeItem('alfaprosys_cashier_key')" title="خروج">
          <span class="mgr-side-ic">🚪</span>
          <span class="mgr-side-lb">خروج</span>
        </a>
      </nav>

      <!-- المحتوى -->
      <div class="mgr-content-panel">
        <div id="salesContent"></div>
      </div>

    </div>

    <!-- Scrim -->
    <div class="mgr-nav-scrim" id="mgrNavScrim" onclick="closeNav()"></div>

    <!-- FAB -->
    <button class="mgr-fab" type="button" onclick="toggleNav()">☰</button>

    <!-- Mobile Nav -->
    <nav class="mgr-mobile-nav" id="mgrMobileNav">
      <div class="mgr-mobile-nav-head">
        <strong>قائمة الإدارة</strong>
        <button type="button" onclick="closeNav()">✕</button>
      </div>
      <div class="mgr-mobile-nav-grid">
        ${MGR_NAV.map(n => navLink(n, true)).join('')}
        <a class="mgr-mobile-nav-link danger" href="index.html" onclick="sessionStorage.removeItem('alfaprosys_role');sessionStorage.removeItem('alfaprosys_cashier_key')">
          <span>🚪</span><small>خروج</small>
        </a>
      </div>
    </nav>

    <!-- مودال تفاصيل الفاتورة -->
    <div class="sales-modal-scrim" id="invModalScrim" onclick="closeInvModal()"></div>
    <div class="sales-modal" id="invModal" role="dialog" aria-label="تفاصيل الفاتورة">
      <div class="sales-modal-head" id="invModalHead"></div>
      <div class="sales-modal-body" id="invModalBody"></div>
    </div>
  `;

  renderSalesContent();
}

function toggleSidebar() {
  document.getElementById('mgrSidebar')?.classList.toggle('expanded');
}
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

/* ================================================================
   المحتوى الرئيسي للشاشة
   ================================================================ */
function renderSalesContent() {
  const el  = document.getElementById('salesContent');
  /* ── المدى الزمني (اختياري): فارغ = كل الفواتير ──
     كانت الشاشة تجمع كل الفواتير تحت عنوان «مبيعات اليوم»، فيضمّ الرقم
     أياماً سابقة بلا أي تصفية. صار المدى صريحاً يتحكّم به المستخدم. */
  const _inv  = DATA.invoices || [];
  const dFrom = (document.getElementById('salesDateFrom')?.value || '').trim();
  const dTo   = (document.getElementById('salesDateTo')?.value   || '').trim();
  const dateFiltered = (dFrom || dTo)
    ? _inv.filter(i => { const d = String(i.date || '').slice(0, 10);
                         return (!dFrom || d >= dFrom) && (!dTo || d <= dTo); })
    : _inv;
  const all = salesShiftFilter === 'all'
    ? dateFiltered
    : dateFiltered.filter(i => salesInvoiceShift(i) === salesShiftFilter);
  const shiftCounts = {
    morning: dateFiltered.filter(i => salesInvoiceShift(i) === 'morning').length,
    evening: dateFiltered.filter(i => salesInvoiceShift(i) === 'evening').length,
    all: dateFiltered.length,
  };

  /* ── حسابات ── */
  const printed   = all.filter(i => i.status === 'printed');
  const open      = all.filter(i => i.status === 'open');
  const cancelled = all.filter(i => i.status === 'cancelled');
  const active    = [...printed, ...open];

  const totalSales = printed.reduce((s,i)  => s + (i.total||0), 0);
  const totalOpen  = open.reduce((s,i)     => s + (i.total||0), 0);
  const avgInvoice = printed.length ? Math.round(totalSales / printed.length) : 0;

  /* ── أنواع الطلبات ── */
  const cntTable    = active.filter(i => alfaOrderType(i)==='table').length;
  const cntTakeaway = active.filter(i => alfaOrderType(i)==='takeaway').length;
  const cntDelivery = active.filter(i => alfaOrderType(i)==='delivery').length;

  const revTable    = active.filter(i=>alfaOrderType(i)==='table').reduce((s,i)=>s+(i.total||0),0);
  const revTakeaway = active.filter(i=>alfaOrderType(i)==='takeaway').reduce((s,i)=>s+(i.total||0),0);
  const revDelivery = active.filter(i=>alfaOrderType(i)==='delivery').reduce((s,i)=>s+(i.total||0),0);

  /* ── طرق الدفع ── */
  const cntCash     = printed.filter(i => i.pay_type==='cash').length;
  const cntPartial  = printed.filter(i => i.pay_type==='partial').length;
  const cntDeferred = printed.filter(i => i.pay_type==='deferred').length;
  const cntWallet   = printed.filter(i => i.pay_type==='wallet').length;

  const revCash     = printed.filter(i=>i.pay_type==='cash').reduce((s,i)=>s+(i.total||0),0);
  const revDeferred = printed.filter(i=>i.pay_type==='deferred').reduce((s,i)=>s+(i.total||0),0);

  /* ── عملاء جدد ── */
  const newCustomers = all.filter(i => i.is_new_customer).length;

  /* ── أكثر 3 أصناف طلباً ── */
  const itemMap = {};
  active.forEach(inv => {
    (inv.items||[]).forEach(it => {
      if (window.alfaInvoiceIsServiceLine && alfaInvoiceIsServiceLine(it)) return;
      const meta = window.alfaInvoiceItemMeta ? alfaInvoiceItemMeta(it) : { name: it.name, family: 'أخرى' };
      const itemKey = meta.id || it.id || it.name;
      if (!itemMap[itemKey]) itemMap[itemKey] = { name: meta.name || it.name, family: meta.family || 'أخرى', qty: 0, revenue: 0 };
      itemMap[itemKey].qty     += (Number(it.qty)||0);
      itemMap[itemKey].revenue += (Number(it.total) || (Number(it.price)||0)*(Number(it.qty)||0));
    });
  });
  const topItems = Object.values(itemMap).sort((a,b) => b.qty - a.qty).slice(0,3);

  /* ── تفصيل المبيعات حسب التصنيف ── */
  const catMap = {};
  active.forEach(inv => {
    (inv.items||[]).forEach(it => {
      if (window.alfaInvoiceIsServiceLine && alfaInvoiceIsServiceLine(it)) return;
      const meta = window.alfaInvoiceItemMeta ? alfaInvoiceItemMeta(it) : { id: it.id, name: it.name, category: (it && it.category_name) || 'أخرى' };
      const catId = meta.category || meta.category_name || (it && it.category_name) || 'other';
      const catName = meta.category || meta.category_name || (it && it.category_name) || 'أخرى';
      if (!catMap[catId]) catMap[catId] = { name: catName, qty: 0, revenue: 0, items: {} };
      const qty = Number(it.qty) || 0;
      const revenue = Number(it.total) || (Number(it.price)||0) * qty;
      catMap[catId].qty     += qty;
      catMap[catId].revenue += revenue;
      const itemKey = meta.id || it.id || it.name;
      if (!catMap[catId].items[itemKey])
        catMap[catId].items[itemKey] = { name: meta.name || it.name, qty: 0, revenue: 0 };
      catMap[catId].items[itemKey].qty     += qty;
      catMap[catId].items[itemKey].revenue += revenue;
    });
  });
  const catList = Object.values(catMap).sort((a,b) => b.revenue - a.revenue);

  /* ── فلتر الفواتير ── */
  const filtered =
    salesFilter === 'all'      ? all :
    salesFilter === 'open'     ? open :
    salesFilter === 'printed'  ? printed :
    salesFilter === 'cancelled'? cancelled :
    salesFilter === 'cash'     ? printed.filter(i=>i.pay_type==='cash') :
    salesFilter === 'partial'  ? printed.filter(i=>i.pay_type==='partial') :
    salesFilter === 'deferred' ? printed.filter(i=>i.pay_type==='deferred') :
    salesFilter === 'wallet'   ? printed.filter(i=>i.pay_type==='wallet') :
    all.filter(i => alfaOrderType(i) === salesFilter);

  el.innerHTML = `

    <!-- ══ رأس الصفحة ══ -->
    <div class="mgr-page-header">
      <div>
        <div class="mgr-page-brand">alfaprosys</div>
        <div class="mgr-page-title">🧾 ${
          (dFrom || dTo) ? 'المبيعات — من ' + e(dFrom || '…') + ' إلى ' + e(dTo || '…')
                         : 'كل المبيعات'
        }</div>
      </div>
      <div class="sales-date-filter">
        <label>من <input type="date" id="salesDateFrom" value="${e(dFrom)}" onchange="renderSalesContent()"></label>
        <label>إلى <input type="date" id="salesDateTo" value="${e(dTo)}" onchange="renderSalesContent()"></label>
        <button type="button" class="sales-date-btn" onclick="setSalesToday()">اليوم</button>
        ${(dFrom || dTo) ? '<button type="button" class="sales-date-btn" onclick="clearSalesDates()">الكل</button>' : ''}
      </div>
      <div class="sales-shift-filter" aria-label="فلترة فواتير الكاشير">
        <span>وردية الكاشير:</span>
        <button type="button" class="sales-shift-btn ${salesShiftFilter==='morning'?'active':''}" onclick="setShiftFilter('morning')">🌅 فواتير الكاشير الصباحي <b>${shiftCounts.morning}</b></button>
        <button type="button" class="sales-shift-btn ${salesShiftFilter==='evening'?'active':''}" onclick="setShiftFilter('evening')">🌙 فواتير الكاشير المسائي <b>${shiftCounts.evening}</b></button>
        <button type="button" class="sales-shift-btn ${salesShiftFilter==='all'?'active':''}" onclick="setShiftFilter('all')">🗂️ كل الفواتير <b>${shiftCounts.all}</b></button>
      </div>
      <div class="sales-header-date" id="salesDate"></div>
    </div>

    <!-- ══ إحصائيات رئيسية ══ -->
    <div class="mgr-stats-grid">
      <div class="mgr-stat-card blue">
        <div class="mgr-stat-lbl">إجمالي المبيعات</div>
        <div class="mgr-stat-val">${fmtNum(totalSales)}</div>
        <div class="mgr-stat-sub">ل.س — فواتير مطبوعة</div>
      </div>
      <div class="mgr-stat-card">
        <div class="mgr-stat-lbl">فواتير مطبوعة</div>
        <div class="mgr-stat-val">${printed.length}</div>
        <div class="mgr-stat-sub">متوسط ${fmtNum(avgInvoice)} ل.س</div>
      </div>
      <div class="mgr-stat-card gold">
        <div class="mgr-stat-lbl">فواتير مفتوحة</div>
        <div class="mgr-stat-val">${open.length}</div>
        <div class="mgr-stat-sub">${fmtNum(totalOpen)} ل.س مؤقتة</div>
      </div>
      <div class="mgr-stat-card red">
        <div class="mgr-stat-lbl">ملغاة</div>
        <div class="mgr-stat-val">${cancelled.length}</div>
        <div class="mgr-stat-sub">فاتورة</div>
      </div>
    </div>

    <!-- ══ شريط التفاصيل السريعة ══ -->
    <div class="sales-details-strip">

      <!-- أنواع الطلبات -->
      <div class="sales-detail-card">
        <div class="sales-detail-title">🍽️ أنواع الطلبات</div>
        <div class="sales-detail-rows">
          <div class="sales-detail-row" onclick="setFilter('table')">
            <span>🍽️ صالة</span>
            <span class="sd-right"><strong>${cntTable}</strong><em>${fmtNum(revTable)}</em></span>
          </div>
          <div class="sales-detail-row" onclick="setFilter('takeaway')">
            <span>🥡 سفري</span>
            <span class="sd-right"><strong>${cntTakeaway}</strong><em>${fmtNum(revTakeaway)}</em></span>
          </div>
          <div class="sales-detail-row" onclick="setFilter('delivery')">
            <span>🛵 توصيل</span>
            <span class="sd-right"><strong>${cntDelivery}</strong><em>${fmtNum(revDelivery)}</em></span>
          </div>
        </div>
      </div>

      <!-- طرق الدفع -->
      <div class="sales-detail-card">
        <div class="sales-detail-title">💵 طرق الدفع</div>
        <div class="sales-detail-rows">
          <div class="sales-detail-row" onclick="setFilter('cash')">
            <span>💵 نقدي</span>
            <span class="sd-right"><strong>${cntCash}</strong><em>${fmtNum(revCash)}</em></span>
          </div>
          <div class="sales-detail-row" onclick="setFilter('partial')">
            <span>⚡ جزئي</span>
            <span class="sd-right"><strong>${cntPartial}</strong><em>—</em></span>
          </div>
          <div class="sales-detail-row" onclick="setFilter('deferred')">
            <span>📋 آجل</span>
            <span class="sd-right"><strong>${cntDeferred}</strong><em>${fmtNum(revDeferred)}</em></span>
          </div>
          <div class="sales-detail-row" onclick="setFilter('wallet')">
            <span>📲 محفظة</span>
            <span class="sd-right"><strong>${cntWallet}</strong><em>—</em></span>
          </div>
        </div>
      </div>

      <!-- عملاء جدد -->
      <div class="sales-detail-card">
        <div class="sales-detail-title">👤 عملاء جدد</div>
        <div class="sales-new-customers">
          <div class="sales-new-val">${newCustomers}</div>
          <div class="sales-new-lbl">عميل جديد اليوم</div>
        </div>
        <div class="sales-detail-divider"></div>
        <div class="sales-detail-rows">
          <div class="sales-detail-row" onclick="setFilter('delivery')">
            <span>🛵 توصيل</span>
            <span class="sd-right"><strong>${all.filter(i=>i.is_new_customer&&i.type==='delivery').length}</strong></span>
          </div>
          <div class="sales-detail-row" onclick="setFilter('table')">
            <span>🍽️ صالة</span>
            <span class="sd-right"><strong>${all.filter(i=>i.is_new_customer&&alfaOrderType(i)==='table').length}</strong></span>
          </div>
        </div>
      </div>

      <!-- أكثر 3 أصناف طلباً -->
      <div class="sales-detail-card">
        <div class="sales-detail-title">🔥 الأكثر طلباً اليوم</div>
        <div class="sales-detail-rows">
          ${topItems.length === 0
            ? `<div class="sales-empty-mini">لا بيانات</div>`
            : topItems.map((it, idx) => `
              <div class="sales-detail-row top-item-row">
                <span class="top-item-name">
                  <span class="top-rank top-rank-${idx+1}">${idx+1}</span>
                  ${e(it.name)}
                </span>
                <span class="sd-right"><strong>${it.qty}</strong><em>${fmtNum(it.revenue)}</em></span>
              </div>
            `).join('')}
        </div>
      </div>

    </div><!-- /sales-details-strip -->

    <!-- ══ تبديل العرض ══ -->
    <div class="sales-view-tabs">
      <button class="sales-view-tab ${salesSection==='list'?'active':''}"
        onclick="setSection('list')">📋 قائمة الفواتير</button>
      <button class="sales-view-tab ${salesSection==='breakdown'?'active':''}"
        onclick="setSection('breakdown')">📦 تفصيل المبيعات</button>
    </div>

    <!-- ══ المحتوى حسب التبويب ══ -->
    <div id="salesTab">
      ${salesSection === 'list'
        ? buildInvoiceList(all, filtered, printed, open, cancelled)
        : buildBreakdown(catList)}
    </div>
  `;

  // التاريخ
  document.getElementById('salesDate').textContent =
    new Date().toLocaleDateString('ar-EG', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

/* ── أزرار المدى الزمني ── */
function setSalesToday(){
  const d = window.businessDay ? businessDay() : new Date().toISOString().slice(0,10);
  const f = document.getElementById('salesDateFrom');
  const t = document.getElementById('salesDateTo');
  if (f) f.value = d;
  if (t) t.value = d;
  renderSalesContent();
}
function clearSalesDates(){
  const f = document.getElementById('salesDateFrom');
  const t = document.getElementById('salesDateTo');
  if (f) f.value = '';
  if (t) t.value = '';
  renderSalesContent();
}

/* ================================================================
   قائمة الفواتير
   ================================================================ */
function buildInvoiceList(all, filtered, printed, open, cancelled) {
  const PAY = { cash:'نقدي', partial:'جزئي', deferred:'آجل', wallet:'محفظة' };

  const filters = [
    { key:'all',       label:'الكل',      count: all.length },
    { key:'printed',   label:'مطبوعة',    count: printed.length },
    { key:'open',      label:'مفتوحة',    count: open.length },
    { key:'table',     label:'🍽️ طاولة',  count: all.filter(i=>alfaOrderType(i)==='table').length },
    { key:'takeaway',  label:'🥡 سفري',   count: all.filter(i=>alfaOrderType(i)==='takeaway').length },
    { key:'delivery',  label:'🛵 توصيل',  count: all.filter(i=>alfaOrderType(i)==='delivery').length },
    { key:'cash',      label:'💵 نقدي',   count: printed.filter(i=>i.pay_type==='cash').length },
    { key:'partial',   label:'⚡ جزئي',   count: printed.filter(i=>i.pay_type==='partial').length },
    { key:'deferred',  label:'📋 آجل',    count: printed.filter(i=>i.pay_type==='deferred').length },
    { key:'wallet',    label:'📲 محفظة',  count: printed.filter(i=>i.pay_type==='wallet').length },
    { key:'cancelled', label:'ملغاة',     count: cancelled.length },
  ];

  return `
    <!-- شريط الفلاتر -->
    <div class="sales-filter-bar">
      ${filters.map(f => `
        <button class="sales-filter-btn ${salesFilter===f.key?'active':''}"
          type="button" onclick="setFilter('${f.key}')">
          ${e(f.label)}<span>${f.count}</span>
        </button>
      `).join('')}
    </div>

    <!-- الجدول -->
    <div class="mgr-card sales-table-card">
      <div class="sales-list-head">
        <span>الفاتورة</span>
        <span>النوع</span>
        <span class="col-ref">الصالة / العميل</span>
        <span class="col-cashier">الكاشير</span>
        <span class="col-time">الوقت</span>
        <span>الإجمالي</span>
        <span>الحالة</span>
      </div>

      ${filtered.length === 0
        ? `<div class="mgr-empty"><div class="mgr-empty-icon">🧾</div>لا توجد فواتير بهذا الفلتر</div>`
        : filtered.map(inv => `
          <div class="sales-list-row" onclick="openInvModal('${e(inv.id)}')"
            role="button" tabindex="0">
            <span class="sales-inv-id">${e(window.invNoLabel ? invNoLabel(inv) : (inv.id || ''))}</span>
            <span>
              <span class="mgr-badge ${alfaOrderType(inv)==='table'?'blue':alfaOrderType(inv)==='delivery'?'gold':'muted'}">
                ${alfaOrderTypeLabel(inv)}
              </span>
            </span>
            <span class="col-ref sales-ref">
              ${e(inv.customer_name || inv.table_label || inv.hall || '—')}
            </span>
            <span class="col-cashier sales-sub">${e(inv.cashier||'—')}</span>
            <span class="col-time sales-sub">${e(inv.time)}</span>
            <span class="sales-total">${fmtNum(inv.total)}</span>
            <span class="sales-status-col">
              <span class="mgr-badge ${inv.status==='open'?'green':inv.status==='cancelled'?'red':'muted'}">
                ${inv.status==='open'?'مفتوحة':inv.status==='cancelled'?'ملغاة':'مطبوعة'}
              </span>
              ${inv.pay_type
                ? `<span class="mgr-badge navy pay-badge">${PAY[inv.pay_type]||''}</span>`
                : ''}
              <span class="mgr-badge ${window.alfaInvoicePaymentStatus && alfaInvoicePaymentStatus(inv)==='paid' ? 'green' : 'gold'} pay-badge">${window.alfaInvoicePaymentStatus && alfaInvoicePaymentStatus(inv)==='paid' ? 'مدفوع' : 'غير مدفوع'}</span>
            </span>
          </div>
        `).join('')}
    </div>
  `;
}

/* ================================================================
   تفصيل المبيعات
   ================================================================ */
function buildBreakdown(catList) {
  if (catList.length === 0) return `
    <div class="mgr-card">
      <div class="mgr-empty"><div class="mgr-empty-icon">📦</div>لا توجد مبيعات بعد</div>
    </div>
  `;

  const grandQty = catList.reduce((s,c) => s + c.qty, 0);
  const grandRev = catList.reduce((s,c) => s + c.revenue, 0);

  return `
    <!-- إجمالي تفصيلي -->
    <div class="breakdown-grand-total">
      <span>إجمالي الأصناف المباعة</span>
      <span><strong>${grandQty}</strong> طلب &nbsp;|&nbsp; <strong>${fmtNum(grandRev)}</strong> ل.س</span>
    </div>

    ${catList.map(cat => {
      const itemList = Object.values(cat.items).sort((a,b) => b.qty - a.qty);
      const maxQty   = itemList[0]?.qty || 1;
      const pct      = grandRev ? Math.round((cat.revenue/grandRev)*100) : 0;

      return `
        <div class="mgr-card breakdown-cat-card">
          <!-- رأس التصنيف -->
          <div class="breakdown-cat-head">
            <div>
              <div class="breakdown-cat-name">${e(cat.name)}</div>
              <div class="breakdown-cat-sub">${cat.qty} طلب • ${pct}% من الإيراد</div>
            </div>
            <div class="breakdown-cat-rev">${fmtNum(cat.revenue)}<span>ل.س</span></div>
          </div>

          <!-- شريط نسبة التصنيف -->
          <div class="breakdown-cat-bar-wrap">
            <div class="breakdown-cat-bar" style="width:${pct}%"></div>
          </div>

          <!-- الأصناف -->
          <div class="breakdown-items">
            ${itemList.map(it => {
              const itemPct = maxQty ? Math.round((it.qty/maxQty)*100) : 0;
              return `
                <div class="breakdown-item-row">
                  <div class="breakdown-item-info">
                    <span class="breakdown-item-name">${e(it.name)}</span>
                    <div class="breakdown-bar-wrap">
                      <div class="breakdown-bar" style="width:${itemPct}%"></div>
                    </div>
                  </div>
                  <div class="breakdown-item-nums">
                    <span class="breakdown-item-qty">${it.qty} طلب</span>
                    <span class="breakdown-item-rev">${fmtNum(it.revenue)} ل.س</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;
}

/* ================================================================
   مودال تفاصيل الفاتورة
   ================================================================ */
function openInvModal(id) {
  const inv = (DATA.invoices||[]).find(i => i.id === id);
  if (!inv) return;

  const PAY      = { cash:'نقدي', partial:'جزئي', deferred:'آجل', wallet:'محفظة' };
  const _t = alfaOrderType(inv);
  const typeIcon = _t==='table'?'🍽️':_t==='delivery'?'🛵':'🥡';
  const typeLabel= _t==='table'
    ? `طاولة — ${e(inv.table_label||inv.hall)}`
    : _t==='delivery' ? 'توصيل' : 'سفري';

  const statusClass = inv.status==='open'?'green':inv.status==='cancelled'?'red':inv.status==='modified'?'gold':'muted';
  const statusLabel = inv.status==='open'?'مفتوحة':inv.status==='cancelled'?'ملغاة':inv.status==='modified'?'معدّلة':'مغلقة';

  document.getElementById('invModalHead').innerHTML = `
    <div class="inv-modal-title">
      <span class="inv-modal-id">${e(inv.id)}</span>
      <span class="mgr-badge ${statusClass}">${statusLabel}</span>
      ${inv.pay_type ? `<span class="mgr-badge navy">${PAY[inv.pay_type]||''}</span>` : ''}
    </div>
    <button type="button" onclick="closeInvModal()" class="inv-modal-close">✕</button>
  `;

  document.getElementById('invModalBody').innerHTML = `
    <!-- رأس الفاتورة -->
    <div class="inv-receipt-head">
      <div class="inv-receipt-brand">alfaprosys — مطعم</div>
      <div class="inv-receipt-row">
        <span>${typeIcon} ${typeLabel}</span>
        <span>${e(inv.time)}</span>
      </div>
      ${inv.customer_name ? `
        <div class="inv-receipt-row">
          <span>👤 ${e(inv.customer_name)}</span>
          ${inv.phone ? `<span dir="ltr">${e(inv.phone)}</span>` : ''}
        </div>` : ''}
      ${inv.cashier ? `
        <div class="inv-receipt-row">
          <span>🧾 الكاشير: ${e(inv.cashier)}</span>
        </div>` : ''}
      ${inv.is_new_customer ? `
        <div class="inv-new-customer-badge">⭐ عميل جديد</div>` : ''}
    </div>

    <!-- الأصناف -->
    <div class="inv-items-list">
      ${(inv.items||[]).map(it => `
        <div class="inv-item-row">
          <div class="inv-item-info">
            <span class="inv-item-name">${e(it.name)}</span>
            ${it.note ? `<span class="inv-item-note">📝 ${e(it.note)}</span>` : ''}
          </div>
          <div class="inv-item-nums">
            <span class="inv-item-qty">×${it.qty}</span>
            <span class="inv-item-total">${fmtNum(it.total)}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- الإجمالي -->
    <div class="inv-receipt-total">
      <span>المجموع الإجمالي</span>
      <strong>${fmt(inv.total)}</strong>
    </div>

    ${inv.cancel_reason ? `
      <div class="inv-cancel-note">⚠️ سبب الإلغاء: ${e(inv.cancel_reason)}</div>
    ` : ''}

    <!-- أزرار -->
    <div class="mgr-btn-row inv-modal-actions">
      <button class="mgr-btn outline sm" onclick="printSalesInvoice('${e(inv.id)}')">
        🖨️ إعادة طباعة
      </button>
      ${inv.status !== 'cancelled' ? `
        <button class="mgr-btn danger sm" onclick="showToast('إلغاء بصلاحية المدير — قيد البناء','⚠️')">
          ⚠️ إلغاء بصلاحية
        </button>` : ''}
    </div>
  `;

  document.getElementById('invModalScrim').classList.add('show');
  document.getElementById('invModal').classList.add('show');
}

function closeInvModal() {
  document.getElementById('invModalScrim').classList.remove('show');
  document.getElementById('invModal').classList.remove('show');
}

/* طباعة إعادة الفاتورة من شاشة المبيعات — الكاشير فقط.
   نستخدم قالب الطباعة الحالي كما هو، ونرسل الناتج عبر printHtml
   حتى لا تُطبع نسخة مطبخ ولا يُفتح درج النقود من شاشة التقارير. */
function salesPrintWithConnectTimeout(fn, ms) {
  return Promise.race([
    Promise.resolve().then(fn).catch(function () { return false; }),
    new Promise(function (resolve) { setTimeout(function () { resolve(false); }, ms || 5000); }),
  ]);
}
function printSalesInvoice(id) {
  const inv = (DATA.invoices || []).find(function (x) { return String(x.id) === String(id); });
  if (!inv) return showToast('لم يتم العثور على الفاتورة', '⚠️');
  if (!window.ThermalPrint || typeof ThermalPrint.receiptHtml !== 'function'
      || typeof ThermalPrint.printHtml !== 'function') {
    return showToast('خدمة الطباعة غير متاحة', '⚠️');
  }
  const modified = (inv.modifications && inv.modifications.length > 0) || inv.status === 'modified';
  let html;
  try {
    html = ThermalPrint.receiptHtml(inv, { modifiedMark: modified });
  } catch (err) {
    return showToast('تعذر تجهيز الفاتورة للطباعة', '⚠️');
  }
  salesPrintWithConnectTimeout(function () {
    return ThermalPrint.connect ? ThermalPrint.connect() : false;
  }, 5000)
    .then(function () {
      return ThermalPrint.printHtml(html, { kitchen: false, allowFallback: true });
    })
    .then(function () { showToast('تم إرسال الفاتورة إلى طابعة الكاشير', '🖨️'); })
    .catch(function (err) {
      showToast('تعذرت طباعة الفاتورة: ' + ((err && err.message) || err), '⚠️');
    });
}

/* ================================================================
   تغيير الفلتر / التبويب
   ================================================================ */
function setShiftFilter(key) {
  salesShiftFilter = key === 'morning' || key === 'evening' ? key : 'all';
  renderSalesContent();
}
function setFilter(key) {
  salesFilter  = key;
  salesSection = 'list';
  renderSalesContent();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function setSection(sec) {
  salesSection = sec;
  renderSalesContent();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── تشغيل ── */
(window.alfaStart||function(fn){fn();})(renderApp);

/* ══ إعادة الربط بعد السحب من السحابة ══
   الشاشة تقرأ DATA.invoices عند كل رسم، لكنها لم تكن تعيد الرسم بعد
   أن يستبدل السحب المصفوفة — فتظهر المبيعات القديمة حتى تحديث يدوي. */
window.alfaAutoRefresh(function () {
  if (salesSection === 'list') renderSalesContent(); else renderApp();
}, 30000);
