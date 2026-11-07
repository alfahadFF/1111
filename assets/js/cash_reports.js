/* ================================================================
   cash_reports.js — الوردية والصندوق — alfaprosys
   مشتركة: كاشير (فتح/إغلاق) + مدير (تقارير + أرشيف)
   ================================================================ */

const DATA     = window.DEMO_DATA;
let session    = DATA.cashierSession   || {};
let invoices   = DATA.invoices         || [];
let expenses   = DATA.expenditures || DATA.expenditures_list || [];
let shiftsHist = DATA.shifts_history   || [];

/* ── الدور ── */
const ROLE = (function () {
  const s = sessionStorage.getItem('alfaprosys_role');
  if (s) return s;
  const ref = document.referrer || '';
  if (ref.includes('pos.html') || ref.includes('cashier')) return 'cashier';
  return 'manager';
})();

/* ── أدوات ── */
function nowTime() {
  return new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
}
function nowDate() {
  return new Date().toLocaleDateString('ar-EG', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}
function reportCashierKey() { return window.alfaCurrentCashierKey ? alfaCurrentCashierKey() : 'cashier'; }
function reportIsManager() { return ROLE === 'manager'; }
function reportInScope(inv) {
  if (reportIsManager()) return true;
  if (!inv) return false;
  if (inv.cashier_key) return String(inv.cashier_key) === String(reportCashierKey());
  if (session.shift_key && inv.issued_shift_key) return String(inv.issued_shift_key) === String(session.shift_key);
  if (session.cashier_name && inv.cashier) return String(session.cashier_name) === String(inv.cashier);
  return true; /* بيانات قديمة بلا هوية وردية */
}
function reportCollected(inv) {
  const entries = window.alfaInvoicePaymentEntries ? alfaInvoicePaymentEntries(inv) : [];
  const wanted = String(session.shift_key || '');
  const day = window.businessDay ? businessDay() : new Date().toISOString().slice(0,10);
  return entries.reduce(function (sum, p) {
    if (p.status !== 'paid') return sum;
    if (reportIsManager()) {
      if (p.at && String(p.at).slice(0,10) !== day) return sum;
    } else if (wanted && String(p.shift_key || '') !== wanted) return sum;
    return sum + (Number(p.amount) || 0);
  }, 0);
}
function reportAccounting(inv) {
  return window.alfaInvoiceAccounting ? alfaInvoiceAccounting(inv) : {
    total: Number(inv && inv.total) || 0,
    cancelled: inv && inv.status === 'cancelled',
    issued: ['printed','modified','cancelled'].indexOf(String(inv && inv.status || '')) >= 0,
    paid_amount: reportCollected(inv), recognized: reportCollected(inv),
    unpaid_amount: inv && inv.status === 'cancelled' ? 0 : Number(inv && inv.total) || 0,
    partially_paid: false,
  };
}
function reportExpenseRows(day) {
  const list = expenses || DATA.expenditures || DATA.expenditures_list || [];
  const key = String(session.shift_key || (window.alfaCurrentShiftKey ? alfaCurrentShiftKey() : ''));
  const kind = String(session.shift_kind || (window.alfaCurrentShiftKind ? alfaCurrentShiftKind() : ''));
  const cashier = reportCashierKey();
  return list.filter(function (x) {
    if (String(x.date || '').slice(0,10) !== String(day).slice(0,10)) return false;
    if (reportIsManager()) return true;
    return window.alfaExpenseMatchesShift
      ? alfaExpenseMatchesShift(x, key, day, kind, cashier)
      : true;
  });
}
function reportExpenseTotal(day) {
  return reportExpenseRows(day).reduce(function (sum, x) { return sum + (Number(x.amount) || 0); }, 0);
}
/* ================================================================
   التنقل
   ================================================================ */
const MGR_NAV = window.AlfaNav.MGR_NAV;
const CURRENT = 'cash_reports';
const navLink = window.AlfaNav.linker(CURRENT);
let navOpen = false;

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
   الحالة
   ================================================================ */
let crView       = 'current';   // current | history | zreport
let histOpenId   = null;
let zreportId    = null;         // null = الوردية الحالية
let histSearch   = '';

/* ================================================================
   البناء الرئيسي
   ================================================================ */
function renderApp() {
  document.getElementById('crApp').innerHTML = `
    <div class="mgr-layout">
      <nav class="mgr-sidebar" id="mgrSidebar">
        <button class="mgr-side-toggle"
          onclick="document.getElementById('mgrSidebar').classList.toggle('expanded')">☰</button>
        <div class="mgr-side-logo"><strong>α</strong><span>alfaprosys</span></div>
        <div class="mgr-side-nav">${MGR_NAV.map(n => navLink(n)).join('')}</div>
        <div class="mgr-side-spacer"></div>
        <a class="mgr-side-link danger" href="index.html" onclick="sessionStorage.removeItem('alfaprosys_role');sessionStorage.removeItem('alfaprosys_cashier_key')" title="خروج">
          <span class="mgr-side-ic">🚪</span><span class="mgr-side-lb">خروج</span>
        </a>
      </nav>
      <div class="mgr-content-panel">
        <div id="crContent"></div>
      </div>
    </div>
    <div class="mgr-nav-scrim" id="mgrNavScrim" onclick="closeNav()"></div>
    <button class="mgr-fab" onclick="toggleNav()">☰</button>
    <nav class="mgr-mobile-nav" id="mgrMobileNav">
      <div class="mgr-mobile-nav-head">
        <strong>قائمة الإدارة</strong>
        <button onclick="closeNav()">✕</button>
      </div>
      <div class="mgr-mobile-nav-grid">
        ${MGR_NAV.map(n => navLink(n, true)).join('')}
        <a class="mgr-mobile-nav-link danger" href="index.html" onclick="sessionStorage.removeItem('alfaprosys_role');sessionStorage.removeItem('alfaprosys_cashier_key')">
          <span>🚪</span><small>خروج</small>
        </a>
      </div>
    </nav>

    <!-- مودال إغلاق الوردية -->
    <div class="cr-modal-scrim" id="crModalScrim" onclick="closeCrModal()"></div>
    <div class="cr-modal" id="crModal" role="dialog">
      <div class="cr-modal-head">
        <span id="crModalTitle">إغلاق الوردية</span>
        <button onclick="closeCrModal()">✕</button>
      </div>
      <div class="cr-modal-body" id="crModalBody"></div>
    </div>
  `;
  renderContent();
}

/* ================================================================
   المحتوى الرئيسي
   ================================================================ */
function renderContent() {
  const reportDay = window.businessDay ? businessDay() : new Date().toISOString().slice(0,10);
  /* كل الفواتير المُصدرة تدخل العدادات، بما فيها الملغاة وغير المدفوعة؛
     مبلغ المبيعات نفسه يُشتق من التحصيل الفعلي فقط. */
  const scopedInv     = invoices.filter(i => {
    const d = String(i.date || i.created_at || '').slice(0, 10);
    return reportInScope(i) && d === reportDay &&
      ['printed', 'modified', 'cancelled'].indexOf(String(i.status || '')) >= 0;
  });
  const printedInv    = scopedInv;
  const accounted     = printedInv.map(function (i) { return { inv: i, a: reportAccounting(i) }; });
  const totalSales    = accounted.reduce((s, x) => s + (x.a.recognized || 0), 0);
  /* النقد في الدرج = أحداث التحصيل الفعلية فقط؛ المصروفات من الوردية
     الحالية وحدها، لا من كل مصروفات النظام. */
  const byCash        = printedInv.reduce((s, i) => s + reportCollected(i), 0);
  const byDeferred    = accounted.reduce((s, x) => s + (x.a.unpaid_amount || 0), 0);
  const byPartial     = accounted.reduce((s, x) => s + (x.inv.pay_type === 'partial' ? (x.a.paid_amount || 0) : 0), 0);
  /* النوع الموحّد: السحابة تخزّن الطاولات كـ dinein لا table */
  const byTable       = accounted.filter(x => alfaOrderType(x.inv) === 'table').reduce((s,x) => s+(x.a.recognized || 0), 0);
  const byTakeaway    = accounted.filter(x => alfaOrderType(x.inv) === 'takeaway').reduce((s,x) => s+(x.a.recognized || 0), 0);
  const byDelivery    = accounted.filter(x => alfaOrderType(x.inv) === 'delivery').reduce((s,x) => s+(x.a.recognized || 0), 0);
  const totalExp      = reportExpenseTotal(reportDay);
  const cashInDrawer  = (session.opening_cash || 0) + byCash - totalExp;
  const cancelled     = printedInv.filter(i => i.status === 'cancelled').length;
  const unpaidCount    = accounted.filter(x => !x.a.cancelled && (x.a.unpaid_amount || 0) > 0).length;
  const invoiceCount   = printedInv.length;

  document.getElementById('crContent').innerHTML = `

    <!-- رأس الصفحة -->
    <div class="mgr-page-header">
      <div>
        <div class="mgr-page-brand">alfaprosys</div>
        <div class="mgr-page-title">🔒 الوردية والصندوق</div>
      </div>
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);">${nowDate()}</div>
    </div>

    <!-- تابز الرئيسية -->
    <div class="cr-tabs">
      <button class="cr-tab ${crView==='current'  ? 'active':''}" onclick="setView('current')">🟢 الوردية الحالية</button>
      <button class="cr-tab ${crView==='history'  ? 'active':''}" onclick="setView('history')">📋 الأرشيف</button>
      <button class="cr-tab ${crView==='zreport'  ? 'active':''}" onclick="setView('zreport')">📊 Z-Report</button>
    </div>

    <!-- محتوى التاب -->
    <div id="crTabContent">
      ${crView === 'current'  ? renderCurrentShift(totalSales, byCash, byDeferred, byPartial, byTable, byTakeaway, byDelivery, totalExp, cashInDrawer, cancelled, invoiceCount, unpaidCount) : ''}
      ${crView === 'history'  ? renderHistory() : ''}
      ${crView === 'zreport'  ? renderZReport(zreportId, totalSales, byCash, byDeferred, byPartial, byTable, byTakeaway, byDelivery, totalExp, cashInDrawer, invoiceCount, cancelled) : ''}
    </div>
  `;
}

/* ================================================================
   تاب 1: الوردية الحالية
   ================================================================ */
function renderCurrentShift(totalSales, byCash, byDeferred, byPartial, byTable, byTakeaway, byDelivery, totalExp, cashInDrawer, cancelled, invoiceCount, unpaidCount) {
  const isOpen   = session.shift_open;
  const cashOpen = session.cashbox_open;

  return `
    <!-- حالة الوردية -->
    <div class="cr-status-row">
      <div class="cr-status-card ${isOpen ? 'open' : 'closed'}">
        <div class="cr-status-icon">${isOpen ? '🟢' : '🔴'}</div>
        <div class="cr-status-info">
          <div class="cr-status-label">الوردية</div>
          <div class="cr-status-val">${isOpen ? 'مفتوحة' : 'مغلقة'}</div>
          <div class="cr-status-sub">
            ${isOpen ? 'فُتحت: ' + e(session.shift_opened_at || '') : 'لم تُفتح بعد'}
          </div>
        </div>
        <button class="cr-toggle-btn ${isOpen ? 'danger' : 'primary'}"
          onclick="${isOpen ? 'confirmCloseShift()' : 'openShift()'}">
          ${isOpen ? '🔒 إغلاق' : '🔓 فتح'}
        </button>
      </div>

      <div class="cr-status-card ${cashOpen ? 'open' : 'closed'}">
        <div class="cr-status-icon">${cashOpen ? '💵' : '🔐'}</div>
        <div class="cr-status-info">
          <div class="cr-status-label">الصندوق</div>
          <div class="cr-status-val">${cashOpen ? 'مفتوح' : 'مغلق'}</div>
          <div class="cr-status-sub">
            ${cashOpen ? 'افتتاح: ' + fmtNum(session.opening_cash || 0) + ' ل.س' : 'يحتاج مبلغ افتتاح'}
          </div>
        </div>
        <button class="cr-toggle-btn ${cashOpen ? 'danger' : 'primary'}"
          onclick="${cashOpen ? 'closeCashbox()' : 'openCashboxModal()'}">
          ${cashOpen ? '🔒 إغلاق' : '🔓 فتح'}
        </button>
      </div>
    </div>

    <!-- ملخص اليوم -->
    <div class="mgr-stats-grid" style="margin-bottom:12px;">
      <div class="mgr-stat-card blue">
        <div class="mgr-stat-lbl">إجمالي المبيعات</div>
        <div class="mgr-stat-val">${fmtNum(totalSales)}</div>
        <div class="mgr-stat-sub">ل.س</div>
      </div>
      <div class="mgr-stat-card">
        <div class="mgr-stat-lbl">عدد الفواتير</div>
        <div class="mgr-stat-val">${fmtNum(invoiceCount)}</div>
        <div class="mgr-stat-sub">${cancelled ? cancelled + ' ملغاة' : 'لا إلغاءات'}${unpaidCount ? ' · ' + unpaidCount + ' غير محصلة' : ''}</div>
      </div>
      <div class="mgr-stat-card red">
        <div class="mgr-stat-lbl">الصادرات</div>
        <div class="mgr-stat-val">${fmtNum(totalExp)}</div>
        <div class="mgr-stat-sub">ل.س</div>
      </div>
      <div class="mgr-stat-card ${cashInDrawer < 0 ? 'red' : 'green'}">
        <div class="mgr-stat-lbl">كاش الدرج المتوقع</div>
        <div class="mgr-stat-val">${fmtNum(Math.max(0, cashInDrawer))}</div>
        <div class="mgr-stat-sub">ل.س</div>
      </div>
    </div>

    <!-- تفاصيل المبيعات -->
    <div class="mgr-card" style="margin-bottom:12px;">
      <div class="mgr-card-title" style="margin-bottom:12px;">💳 تفاصيل المبيعات</div>

      <div class="cr-detail-section-title">حسب طريقة الدفع</div>
      <div class="cr-detail-grid">
        <div class="cr-detail-cell green">
          <div class="cr-detail-val">${fmtNum(byCash)}</div>
          <div class="cr-detail-lbl">💵 كاش</div>
        </div>
        <div class="cr-detail-cell gold">
          <div class="cr-detail-val">${fmtNum(byDeferred)}</div>
          <div class="cr-detail-lbl">📋 غير محصل</div>
        </div>
        <div class="cr-detail-cell blue">
          <div class="cr-detail-val">${fmtNum(byPartial)}</div>
          <div class="cr-detail-lbl">🔀 جزئي</div>
        </div>
      </div>

      <div class="cr-detail-section-title" style="margin-top:10px;">حسب نوع الخدمة</div>
      <div class="cr-detail-grid">
        <div class="cr-detail-cell">
          <div class="cr-detail-val">${fmtNum(byTable)}</div>
          <div class="cr-detail-lbl">🍽️ طاولة</div>
        </div>
        <div class="cr-detail-cell">
          <div class="cr-detail-val">${fmtNum(byTakeaway)}</div>
          <div class="cr-detail-lbl">🥡 سفري</div>
        </div>
        <div class="cr-detail-cell">
          <div class="cr-detail-val">${fmtNum(byDelivery)}</div>
          <div class="cr-detail-lbl">🛵 توصيل</div>
        </div>
      </div>
    </div>

    <!-- معلومات الكاشير -->
    <div class="mgr-card">
      <div class="mgr-card-title" style="margin-bottom:10px;">👤 معلومات الكاشير</div>
      <div class="cr-cashier-row">
        <span>الكاشير الحالي</span><strong>${e(session.cashier_name || '—')}</strong>
      </div>
      <div class="cr-cashier-row">
        <span>افتتاح الصندوق</span><strong>${fmtNum(session.opening_cash || 0)} ل.س</strong>
      </div>
      <div class="cr-cashier-row">
        <span>وقت فتح الوردية</span><strong>${e(session.shift_opened_at || '—')}</strong>
      </div>
    </div>
  `;
}

/* ================================================================
   تاب 2: الأرشيف
   ================================================================ */
function renderHistory() {
  let list = shiftsHist;
  if (histSearch) {
    const q = histSearch.toLowerCase();
    list = list.filter(s =>
      s.cashier?.toLowerCase().includes(q) ||
      s.date?.includes(q) ||
      s.notes?.toLowerCase().includes(q)
    );
  }

  return `
    <!-- بحث -->
    <div class="cust-search-bar" style="margin-bottom:12px;">
      <span>🔍</span>
      <input type="text" inputmode="search" placeholder="ابحث بالتاريخ أو الكاشير..."
        value="${e(histSearch)}" oninput="onHistSearch(this.value)" />
      <button onclick="clearHistSearch()"
        style="display:${histSearch ? '' : 'none'};">✕</button>
    </div>

    ${!list.length ? `<div class="cr-empty">لا توجد ورديات مطابقة</div>` : `
    <div class="mgr-card" style="padding:0;overflow:hidden;">
      ${list.map(s => renderHistRow(s)).join('')}
    </div>`}
  `;
}

function renderHistRow(s) {
  const isOpen = histOpenId === s.id;
  const net    = (s.closing_cash || 0);
  return `
    <div class="cr-hist-row ${isOpen ? 'open' : ''}" id="hrow_${e(s.id)}">
      <div class="cr-hist-main" onclick="toggleHistRow('${e(s.id)}')">
        <div class="cr-hist-date-col">
          <div class="cr-hist-date">${e(s.date)}</div>
          <div class="cr-hist-time">${e(s.opened_at)} — ${e(s.closed_at)}</div>
        </div>
        <div class="cr-hist-info">
          <div class="cr-hist-cashier">👤 ${e(s.cashier)}</div>
          <div class="cr-hist-stats">
            <span>${s.invoices_count} فاتورة</span>
            <span>${fmtNum(s.sales_total)} ل.س</span>
          </div>
        </div>
        <div class="cr-hist-chevron ${isOpen ? 'open' : ''}">›</div>
      </div>

      <div class="cr-hist-detail ${isOpen ? 'open' : ''}">
        <div class="cr-hist-detail-inner">

          <!-- إحصائيات -->
          <div class="cr-detail-grid" style="margin-bottom:10px;">
            <div class="cr-detail-cell blue">
              <div class="cr-detail-val">${fmtNum(s.sales_total)}</div>
              <div class="cr-detail-lbl">إجمالي المبيعات</div>
            </div>
            <div class="cr-detail-cell red">
              <div class="cr-detail-val">${fmtNum(s.expenditures)}</div>
              <div class="cr-detail-lbl">الصادرات</div>
            </div>
            <div class="cr-detail-cell green">
              <div class="cr-detail-val">${fmtNum(s.closing_cash)}</div>
              <div class="cr-detail-lbl">كاش الإغلاق</div>
            </div>
          </div>

          <!-- تفصيل الدفع -->
          <div class="cr-detail-section-title">حسب طريقة الدفع</div>
          <div class="cr-detail-grid" style="margin-bottom:10px;">
            <div class="cr-detail-cell green">
              <div class="cr-detail-val">${fmtNum(window.alfaShiftPaymentValue ? alfaShiftPaymentValue(s, 'cash') : s.by_payment?.cash)}</div>
              <div class="cr-detail-lbl">💵 كاش</div>
            </div>
            <div class="cr-detail-cell gold">
              <div class="cr-detail-val">${fmtNum(window.alfaShiftPaymentValue ? alfaShiftPaymentValue(s, 'deferred') : s.by_payment?.deferred)}</div>
              <div class="cr-detail-lbl">📋 ذمة</div>
            </div>
            <div class="cr-detail-cell blue">
              <div class="cr-detail-val">${fmtNum(window.alfaShiftPaymentValue ? alfaShiftPaymentValue(s, 'partial') : s.by_payment?.partial)}</div>
              <div class="cr-detail-lbl">🔀 جزئي</div>
            </div>
          </div>

          <!-- تفصيل الخدمة -->
          <div class="cr-detail-section-title">حسب نوع الخدمة</div>
          <div class="cr-detail-grid" style="margin-bottom:10px;">
            <div class="cr-detail-cell">
              <div class="cr-detail-val">${fmtNum(s.by_type?.table)}</div>
              <div class="cr-detail-lbl">🍽️ طاولة</div>
            </div>
            <div class="cr-detail-cell">
              <div class="cr-detail-val">${fmtNum(s.by_type?.takeaway)}</div>
              <div class="cr-detail-lbl">🥡 سفري</div>
            </div>
            <div class="cr-detail-cell">
              <div class="cr-detail-val">${fmtNum(s.by_type?.delivery)}</div>
              <div class="cr-detail-lbl">🛵 توصيل</div>
            </div>
          </div>

          <!-- معلومات الإغلاق -->
          <div class="cr-info-rows">
            <div class="cr-info-row"><span>فتحها</span><strong>${e(s.cashier || '—')}${s.opened_at ? ' · ' + e(s.opened_at) : ''}</strong></div>
            <div class="cr-info-row"><span>افتتاح الصندوق</span><strong>${fmtNum(s.opening_cash)} ل.س</strong></div>
            <div class="cr-info-row"><span>المتوقع بالدرج</span><strong>${fmtNum((s.opening_cash || 0) + (window.alfaShiftPaymentValue ? alfaShiftPaymentValue(s, 'cash') : Number(s.by_payment?.cash) || 0) - (s.expenditures || 0))} ل.س</strong></div>
            <div class="cr-info-row"><span>الموجود فعلياً</span><strong>${fmtNum(s.closing_cash || 0)} ل.س</strong></div>
            <div class="cr-info-row"><span>الفرق</span><strong style="color:${(s.closing_cash || 0) - ((s.opening_cash || 0) + (window.alfaShiftPaymentValue ? alfaShiftPaymentValue(s, 'cash') : Number(s.by_payment?.cash) || 0) - (s.expenditures || 0)) === 0 ? 'var(--tint-sage,#2e7d5b)' : 'var(--clay-deep,#b91c1c)'};">${(() => { const d = (s.closing_cash || 0) - ((s.opening_cash || 0) + (window.alfaShiftPaymentValue ? alfaShiftPaymentValue(s, 'cash') : Number(s.by_payment?.cash) || 0) - (s.expenditures || 0)); return (d > 0 ? '+' + fmtNum(d) : d < 0 ? '−' + fmtNum(Math.abs(d)) : '✓ 0') + ' ل.س'; })()}</strong></div>
            <div class="cr-info-row"><span>فواتير ملغاة</span><strong>${s.cancelled_count || 0}</strong></div>
            <div class="cr-info-row"><span>أُغلق بواسطة</span><strong>${e(s.closed_by || '—')}</strong></div>
            ${s.notes ? `<div class="cr-info-row"><span>ملاحظات</span><strong>${e(s.notes)}</strong></div>` : ''}
          </div>

          <button class="cr-zreport-btn" onclick="viewZReport('${e(s.id)}')">
            📊 عرض Z-Report لهذه الوردية
          </button>
        </div>
      </div>
    </div>`;
}

/* ================================================================
   تاب 3: Z-Report
   ================================================================ */
/* ================================================================
   تسوية سيخ الشاورما والخبز — تُدرج في Z-Report الوردية الحالية
   عدد كل نوع مباع × غراماته = المستهلك من وزن السيخ المُدخل
   ================================================================ */
function zReportSalesInvoices(shiftId) {
  const shift = shiftId ? shiftsHist.find(x => String(x.id) === String(shiftId)) : null;
  const day = shift ? String(shift.date || '').slice(0, 10)
    : (window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10));
  return (invoices || []).filter(function (inv) {
    if (String(inv.date || inv.created_at || '').slice(0, 10) !== day) return false;
    if (['printed', 'modified'].indexOf(String(inv.status || '')) < 0) return false;
    if (!shift) return reportInScope(inv);
    const shiftKey = String(shift.shift_key || '');
    if (shiftKey && (String(inv.issued_shift_key || '') === shiftKey || String(inv.shift_key || '') === shiftKey)) return true;
    if (shift.cashier_key && String(inv.cashier_key || '') === String(shift.cashier_key)) return true;
    if (shift.cashier && String(inv.cashier || '') === String(shift.cashier)) return true;
    /* الفواتير القديمة التي لا تحمل هوية الوردية تُنسب إلى تاريخ التقرير. */
    return !inv.cashier_key && !inv.issued_shift_key && !inv.shift_key;
  });
}

function finalSalesBreakdownHtml(shiftId) {
  const byCategory = {};
  zReportSalesInvoices(shiftId).forEach(function (inv) {
    (inv.items || []).forEach(function (line) {
      if (window.alfaInvoiceIsServiceLine && alfaInvoiceIsServiceLine(line)) return;
      const meta = window.alfaInvoiceItemMeta ? alfaInvoiceItemMeta(line) : null;
      const itemId = (meta && meta.id) || line.item_id || line.id || line.name || 'other';
      const itemName = (meta && meta.name) || line.name || itemId;
      const category = (meta && (meta.category || meta.category_name)) || line.category_name || 'أخرى';
      const qty = Number(line.qty) || 1;
      const revenue = Number(line.total) || (Number(line.price) || 0) * qty;
      if (!byCategory[category]) byCategory[category] = { name: category, qty: 0, revenue: 0, items: {} };
      const cat = byCategory[category];
      if (!cat.items[itemId]) cat.items[itemId] = { name: itemName, qty: 0, revenue: 0 };
      cat.qty += qty;
      cat.revenue += revenue;
      cat.items[itemId].qty += qty;
      cat.items[itemId].revenue += revenue;
    });
  });
  const categories = Object.values(byCategory).sort((a, b) => b.revenue - a.revenue);
  if (!categories.length) return '';
  return `
      <div class="cr-zreport-section">
        <div class="cr-zreport-section-title">📊 الأصناف المباعة حسب التصنيف</div>
        ${categories.map(function (cat) {
          const items = Object.values(cat.items).sort((a, b) => b.qty - a.qty);
          return `
            <div class="cr-zline" style="font-weight:900;border-bottom:1px solid var(--line,#e5e7eb);">
              <span>🏷️ ${e(cat.name)} — ${fmtNum(cat.qty)} صنف</span>
              <strong>${fmtNum(cat.revenue)} ل.س</strong>
            </div>
            ${items.map(function (it) { return `
              <div class="cr-zline" style="padding-right:18px;font-size:12px;">
                <span>• ${e(it.name)}</span>
                <strong>${fmtNum(it.qty)} × ${fmtNum(it.revenue)} ل.س</strong>
              </div>`; }).join('')}`;
        }).join('')}
      </div>`;
}

/* ────────────────────────────────────────────────────────────────
   تسوية سيخ الشاورما والخبز — من نفس فواتير التقرير
   ──────────────────────────────────────────────────────────────── */
function shawarmaSettlementHtml(shiftId) {
  if (shiftId) return '';   // تفاصيل الأصناف العامة تغطي الأرشيف؛ التسوية الحالية مرتبطة برصيد السيخ
  const cfg = (window.ALFA_CONFIG && window.ALFA_CONFIG.stock) || {};
  const D = window.DEMO_DATA || {};
  const rules = (window.Stock && Stock.sandwichMap)
    ? Stock.sandwichMap().filter(r => r.shawarma && !r.broasted)
    : [];
  if (!rules.length) return '';
  const printed = zReportSalesInvoices(null);
  const rows = rules.map(function (r) {
    let count = 0;
    printed.forEach(function (inv) { (inv.items || []).forEach(function (line) {
      const id = line.item_id || line.id;
      if (String(id) === String(r.id)) count += Number(line.qty) || 0;
    }); });
    const grams = Number(r.meat_grams) || 0;
    const units = r.plate ? (Number(r.plate_count) || 1) : (/دبل/.test(r.text || '') ? 2 : 1);
    const breadQty = Number(r.bread_qty) || 0;
    return { label: r.label, count, grams, totalG: count * grams, totalSand: count * units,
      bread: r.bread, breadQty, totalBread: count * breadQty };
  });
  const totalSand  = rows.reduce((s, r) => s + r.totalSand, 0);
  const totalG     = rows.reduce((s, r) => s + r.totalG, 0);
  const consumedKg = totalG / 1000;
  const normalLoaves = rows.filter(r => r.bread !== 'samoun').reduce((s, r) => s + r.totalBread, 0);
  const samounLoaves = rows.filter(r => r.bread === 'samoun').reduce((s, r) => s + r.totalBread, 0);
  const bb = cfg.burgerBread;
  let burgerLoaves = 0;
  if (bb) printed.forEach(inv => (inv.items || []).forEach(function (line) {
    const it = (D.items || []).find(x => x.id === (line.item_id || line.id));
    if (it && (it.name || '').indexOf(bb.matchName || 'برغر') >= 0) burgerLoaves += (Number(line.qty) || 0) * (bb.loaves || 1);
  }));
  const dk = cfg.drumsticks;
  let drumCount = 0;
  if (dk) printed.forEach(inv => (inv.items || []).forEach(function (line) {
    const it = (D.items || []).find(x => x.id === (line.item_id || line.id));
    if (it && (it.category_name || '').indexOf(dk.category || 'البروستد') >= 0 && (it.variant || '').indexOf(dk.matchVariant || 'دبوس') >= 0) drumCount += (Number(line.qty) || 0) * (dk.qty || 5);
  }));
  const mat  = (D.inventory || []).filter(m => m.name && m.name.indexOf(cfg.skewerMaterial || 'سيخ شاورما') >= 0)[0];
  const day  = window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10);
  const dailyEntries = mat ? (mat.log || []).filter(l => String(l.date || '').slice(0, 10) === day && /^تثبيت وزن سيخ الشاورما لليوم:/.test(String(l.note || ''))) : [];
  const dailyEntry = dailyEntries.slice().sort((a, b) => String(b.id || '').localeCompare(String(a.id || '')))[0];
  const entryMatch = dailyEntry && String(dailyEntry.note || '').match(/:\s*([0-9٠-٩.,]+)/);
  const entered = mat ? (entryMatch
    ? Number(String(entryMatch[1]).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(',', '.')) || 0
    : (mat.log || []).filter(l => l.type === 'in' && l.date === day && !l.auto).reduce((s, l) => s + (Number(l.qty) || 0), 0)) : 0;
  const balance = mat ? (Number(mat.qty) || 0) : 0;
  const active = rows.filter(r => r.count > 0);

  return `
      <div class="cr-zreport-section">
        <div class="cr-zreport-section-title">🍢 تسوية سيخ الشاورما والخبز</div>
        ${(active.length ? active : rows).map(r => `<div class="cr-zline"><span>${e(r.label)}: ${fmtNum(r.count)} × ${fmtNum(r.grams)} غ</span><strong>${fmtNum(r.totalG)} غ</strong></div>`).join('')}
        <div class="cr-zline total"><span>السندويشات / اللحم المستهلك</span><strong>${fmtNum(totalSand)} سندويشة · ${consumedKg.toFixed(2)} كغ</strong></div>
        ${mat ? `
        <div class="cr-zline"><span>وزن السيخ المُدخل اليوم</span><strong>${entered.toFixed(2)} كغ</strong></div>
        <div class="cr-zline"><span>− المستهلك من المبيعات</span><strong class="red">− ${consumedKg.toFixed(2)} كغ</strong></div>
        <div class="cr-zline total"><span>الرصيد الفعلي للسيخ</span><strong>${balance.toFixed(2)} كغ</strong></div>`
        : `<div class="cr-zline"><span>⚠️ لا يوجد وزن سيخ مُدخل بعد — استخدم «تجهيز سيخ» في شاشة المخزون</span><strong>—</strong></div>`}
        ${(cfg.breads || []).map(b => `<div class="cr-zline"><span>🫓 ${e(b.name)}</span><strong>${fmtNum(normalLoaves * (b.loaves || 1))} رغيف${b.bundle ? ' (' + (normalLoaves * b.loaves / b.bundle).toFixed(2) + ' ربطة)' : ''}</strong></div>`).join('')}
        ${cfg.burgerBread ? `<div class="cr-zline"><span>🍔 ${e(cfg.burgerBread.name)}</span><strong>${fmtNum(burgerLoaves)} رغيف${cfg.burgerBread.bundle ? ' (' + (burgerLoaves / cfg.burgerBread.bundle).toFixed(2) + ' ربطة)' : ''}</strong></div>` : ''}
        ${cfg.drumsticks ? `<div class="cr-zline"><span>🍗 ${e(cfg.drumsticks.material)}</span><strong>${fmtNum(drumCount)} حبة</strong></div>` : ''}
        ${cfg.samounBread ? `<div class="cr-zline"><span>🥖 ${e(cfg.samounBread.name)}</span><strong>${fmtNum(samounLoaves * (cfg.samounBread.loaves || 1))} رغيف${cfg.samounBread.bundle ? ' (' + (samounLoaves * cfg.samounBread.loaves / cfg.samounBread.bundle).toFixed(2) + ' ربطة)' : ''}</strong></div>` : ''}
      </div>
`;
}

function renderZReport(shiftId, totalSales, byCash, byDeferred, byPartial, byTable, byTakeaway, byDelivery, totalExp, cashInDrawer, invCount, cancelled) {
  // إذا كان من الأرشيف
  const s = shiftId ? shiftsHist.find(x => x.id === shiftId) : null;

  const date      = s ? e(s.date)         : nowDate();
  const cashier   = s ? e(s.cashier)      : e(session.cashier_name || '—');
  const openedAt  = s ? e(s.opened_at)    : e(session.shift_opened_at || '—');
  const closedAt  = s ? e(s.closed_at)    : '—';
  const openCash  = s ? s.opening_cash    : (session.opening_cash || 0);
  const sales     = s ? s.sales_total     : totalSales;
  const expAmt    = s ? s.expenditures    : totalExp;
  const closing   = s ? s.closing_cash    : cashInDrawer;
  const invCnt    = s ? s.invoices_count  : invCount;
  const cancelCnt = s ? s.cancelled_count : cancelled;
  const payC      = s ? (window.alfaShiftPaymentValue ? alfaShiftPaymentValue(s, 'cash') : Number(s.by_payment?.cash) || 0) : byCash;
  const payD      = s ? (window.alfaShiftPaymentValue ? alfaShiftPaymentValue(s, 'deferred') : Number(s.by_payment?.deferred) || 0) : byDeferred;
  const payP      = s ? (window.alfaShiftPaymentValue ? alfaShiftPaymentValue(s, 'partial') : Number(s.by_payment?.partial) || 0) : byPartial;
  const typeT     = s ? s.by_type.table    : byTable;
  const typeTk    = s ? s.by_type.takeaway : byTakeaway;
  const typeDl    = s ? s.by_type.delivery : byDelivery;

  return `
    ${shiftId ? `
    <button class="cr-back-btn" onclick="setView('history')">← العودة للأرشيف</button>` : ''}

    <div class="cr-zreport" id="zreportPrint">

      <!-- رأس التقرير -->
      <div class="cr-zreport-head">
        <div class="cr-zreport-logo">α alfaprosys</div>
        <div class="cr-zreport-title">تقرير إغلاق الوردية — Z-Report</div>
        <div class="cr-zreport-meta">
          <span>📅 ${date}</span>
          <span>👤 ${cashier}</span>
        </div>
        <div class="cr-zreport-meta">
          <span>🔓 ${openedAt}</span>
          <span>🔒 ${closedAt}</span>
        </div>
      </div>

      <!-- الصندوق -->
      <div class="cr-zreport-section">
        <div class="cr-zreport-section-title">💵 حركة الصندوق</div>
        <div class="cr-zline"><span>افتتاح الصندوق</span><strong>${fmtNum(openCash)} ل.س</strong></div>
        <div class="cr-zline"><span>+ إجمالي المبيعات</span><strong class="green">+ ${fmtNum(sales)} ل.س</strong></div>
        <div class="cr-zline"><span>− الصادرات</span><strong class="red">− ${fmtNum(expAmt)} ل.س</strong></div>
        <div class="cr-zline total"><span>كاش الدرج المتوقع</span><strong>${fmtNum(closing)} ل.س</strong></div>
      </div>

      <!-- المبيعات -->
      <div class="cr-zreport-section">
        <div class="cr-zreport-section-title">🧾 المبيعات</div>
        <div class="cr-zline"><span>إجمالي المبيعات</span><strong>${fmtNum(sales)} ل.س</strong></div>
        <div class="cr-zline"><span>عدد الفواتير</span><strong>${invCnt}</strong></div>
        <div class="cr-zline"><span>فواتير ملغاة</span><strong>${cancelCnt}</strong></div>
      </div>

      <!-- تفصيل الدفع -->
      <div class="cr-zreport-section">
        <div class="cr-zreport-section-title">💳 حسب طريقة الدفع</div>
        <div class="cr-zline"><span>💵 كاش</span><strong>${fmtNum(payC)} ل.س</strong></div>
        <div class="cr-zline"><span>📋 ذمة / آجل</span><strong>${fmtNum(payD)} ل.س</strong></div>
        <div class="cr-zline"><span>🔀 دفع جزئي</span><strong>${fmtNum(payP)} ل.س</strong></div>
        <div class="cr-zline total"><span>المجموع</span><strong>${fmtNum(payC + payD + payP)} ل.س</strong></div>
      </div>

      <!-- تفصيل الخدمة -->
      <div class="cr-zreport-section">
        <div class="cr-zreport-section-title">🍽️ حسب نوع الخدمة</div>
        <div class="cr-zline"><span>🍽️ طاولة</span><strong>${fmtNum(typeT)} ل.س</strong></div>
        <div class="cr-zline"><span>🥡 سفري</span><strong>${fmtNum(typeTk)} ل.س</strong></div>
        <div class="cr-zline"><span>🛵 توصيل</span><strong>${fmtNum(typeDl)} ل.س</strong></div>
      </div>

      ${finalSalesBreakdownHtml(shiftId)}
      ${shawarmaSettlementHtml(shiftId)}

      <!-- توقيع -->
      <div class="cr-zreport-footer">
        <div class="cr-sign-box"><div class="cr-sign-line"></div><div>توقيع الكاشير</div></div>
        <div class="cr-sign-box"><div class="cr-sign-line"></div><div>توقيع المدير</div></div>
      </div>
    </div>

    <!-- أزرار طباعة -->
    <button class="cr-print-btn" onclick="window.print()">🖨️ طباعة Z-Report</button>
  `;
}

/* ================================================================
   فتح / إغلاق الوردية والصندوق
   ================================================================ */
function openShift() {
  const key = window.alfaCurrentCashierKey ? alfaCurrentCashierKey() : 'cashier';
  const kind = window.alfaCurrentShiftKind ? alfaCurrentShiftKind() : '';
  const day = window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10);
  session.shift_open      = true;
  session.shift_opened_at = new Date().toISOString();
  session.cashier_key     = session.cashier_key || key;
  session.shift_kind      = session.shift_kind || kind;
  session.shift_key       = session.shift_key || (key + ':' + day + ':' + Date.now());
  session.cashier_name    = session.cashier_name || (window.alfaCurrentCashierName ? alfaCurrentCashierName() : 'الكاشير');
  DATA.cashierSession = session;
  if (window.alfaPersist) window.alfaPersist();
  if (window.SessionSync && SessionSync.pushSoon) SessionSync.pushSoon();
  showToast('تم فتح الوردية', '🔓');
  renderContent();
}

function openCashboxModal() {
  document.getElementById('crModalTitle').textContent = '💵 فتح الصندوق';
  document.getElementById('crModalBody').innerHTML = `
    <p class="cr-modal-desc">أدخل مبلغ الافتتاح الموجود في الدرج</p>
    <label class="cr-modal-label">مبلغ الافتتاح (ل.س)
      <div style="display:flex;gap:6px;align-items:center;margin-top:6px;">
        <input id="openingCashInput" class="cr-modal-input" type="number"
          inputmode="numeric" placeholder="مثال: 500000"
          value="${session.opening_cash || ''}" style="flex:1;" />
        <span class="emp-currency-badge">ل.س</span>
      </div>
    </label>
    <button class="cr-modal-confirm primary" onclick="confirmOpenCashbox()">🔓 فتح الصندوق</button>
  `;
  openCrModal();
  setTimeout(() => document.getElementById('openingCashInput')?.focus(), 60);
}
function confirmOpenCashbox() {
  const v = Number(document.getElementById('openingCashInput')?.value || 0);
  session.opening_cash    = v;
  session.cashbox_open    = true;
  session.cashbox_opened_at = nowTime();
  DATA.cashierSession = session;
  if (window.alfaPersist) window.alfaPersist();
  if (window.SessionSync && SessionSync.pushSoon) SessionSync.pushSoon();
  closeCrModal();
  showToast('تم فتح الصندوق بمبلغ ' + fmtNum(v) + ' ل.س', '💵');
  renderContent();
}
function closeCashbox() {
  session.cashbox_open = false;
  DATA.cashierSession  = session;
  if (window.alfaPersist) window.alfaPersist();
  if (window.SessionSync && SessionSync.pushSoon) SessionSync.pushSoon();
  showToast('تم إغلاق الصندوق', '🔐');
  renderContent();
}

function confirmCloseShift() {
  const reportDay = window.businessDay ? businessDay() : new Date().toISOString().slice(0,10);
  const printedInv = invoices.filter(i => {
    const d = String(i.date || i.created_at || '').slice(0, 10);
    return reportInScope(i) && d === reportDay
      && ['printed', 'modified', 'cancelled'].indexOf(String(i.status || '')) >= 0;
  });
  const accounted = printedInv.map(i => ({ inv: i, a: reportAccounting(i) }));
  const totalSales = accounted.reduce((s, x) => s + (x.a.recognized || 0), 0);
  const byCash     = printedInv.reduce((s, i) => s + reportCollected(i), 0);
  const totalExp   = reportExpenseTotal(reportDay);
  const cashInDrw  = (session.opening_cash || 0) + byCash - totalExp;
  const cancelled  = printedInv.filter(i => i.status === 'cancelled').length;
  const unpaid     = accounted.filter(x => !x.a.cancelled && (x.a.unpaid_amount || 0) > 0).length;

  document.getElementById('crModalTitle').textContent = '🔒 تأكيد إغلاق الوردية';
  document.getElementById('crModalBody').innerHTML = `
    <div class="cr-close-summary">
      <div class="cr-zline"><span>إجمالي المحصل فعلياً</span><strong>${fmtNum(totalSales)} ل.س</strong></div>
      <div class="cr-zline"><span>عدد الفواتير</span><strong>${fmtNum(printedInv.length)}</strong></div>
      <div class="cr-zline"><span>ملغاة / غير محصلة</span><strong>${fmtNum(cancelled)} / ${fmtNum(unpaid)}</strong></div>
      <div class="cr-zline"><span>مصروفات هذه الوردية</span><strong>${fmtNum(totalExp)} ل.س</strong></div>
      <div class="cr-zline total"><span>كاش الدرج المتوقع</span><strong>${fmtNum(cashInDrw)} ل.س</strong></div>
    </div>
    <label class="cr-modal-label" style="margin-top:10px;">ملاحظات الإغلاق (اختياري)
      <input id="closeNotes" class="cr-modal-input" type="text"
        placeholder="أي ملاحظات..." style="margin-top:6px;" />
    </label>
    <button class="cr-modal-confirm danger" onclick="closeShift()">🔒 إغلاق الوردية نهائياً</button>
  `;
  openCrModal();
}
function closeShift() {
  const notes      = document.getElementById('closeNotes')?.value?.trim() || '';
  const reportDay = window.businessDay ? businessDay() : new Date().toISOString().slice(0,10);
  const printedInv = invoices.filter(i => {
    const d = String(i.date || i.created_at || '').slice(0, 10);
    return reportInScope(i) && d === reportDay
      && ['printed', 'modified', 'cancelled'].indexOf(String(i.status || '')) >= 0;
  });
  const accounted = printedInv.map(i => ({ inv: i, a: reportAccounting(i) }));
  const totalSales = accounted.reduce((s, x) => s + (x.a.recognized || 0), 0);
  const byCash     = printedInv.reduce((s, i) => s + reportCollected(i), 0);
  const byDeferred = accounted.reduce((s, x) => s + (x.a.unpaid_amount || 0), 0);
  const byPartial  = accounted.reduce((s, x) => s + (x.inv.pay_type === 'partial' ? (x.a.paid_amount || 0) : 0), 0);
  const byTable    = accounted.filter(x => alfaOrderType(x.inv) === 'table').reduce((s,x) => s+(x.a.recognized || 0), 0);
  const byTakeaway = accounted.filter(x => alfaOrderType(x.inv) === 'takeaway').reduce((s,x) => s+(x.a.recognized || 0), 0);
  const byDelivery = accounted.filter(x => alfaOrderType(x.inv) === 'delivery').reduce((s,x) => s+(x.a.recognized || 0), 0);
  const totalExp   = reportExpenseTotal(reportDay);
  const cashInDrw  = (session.opening_cash || 0) + byCash - totalExp;
  const cancelled  = printedInv.filter(i => i.status === 'cancelled').length;
  const unpaidTotal = accounted.reduce((s, x) => s + (x.a.unpaid_amount || 0), 0);

  /* أضف للأرشيف. كل المبالغ هنا مشتقة من الفواتير/التحصيلات،
     بينما _alfa_shift و_unpaid_total داخل JSON المعروف by_payment فقط. */
  const newEntry = {
    id: 'shift_' + Date.now(),
    date: reportDay,
    cashier: session.cashier_name || '—',
    cashier_key: session.cashier_key || reportCashierKey(),
    shift_key: session.shift_key || (window.alfaCurrentShiftKey ? alfaCurrentShiftKey() : ''),
    shift_kind: session.shift_kind || (window.alfaCurrentShiftKind ? alfaCurrentShiftKind() : ''),
    opened_at: session.shift_opened_at || '—',
    closed_at: nowTime(),
    opening_cash: session.opening_cash || 0,
    sales_total: totalSales,
    invoices_count: printedInv.length,
    cancelled_count: cancelled,
    by_type:    { table: byTable, takeaway: byTakeaway, delivery: byDelivery, online: 0 },
    by_payment: { cash: byCash, deferred: byDeferred, partial: byPartial,
      _unpaid_total: unpaidTotal, _alfa_shift: { cashier_key: session.cashier_key || reportCashierKey(), shift_key: session.shift_key || '', shift_kind: session.shift_kind || '' } },
    expenditures: totalExp,
    closing_cash: cashInDrw,
    notes: notes,
    closed_by: ROLE === 'manager' ? 'المدير' : session.cashier_name || '—'
  };
  shiftsHist.unshift(newEntry);
  DATA.shifts_history = shiftsHist;

  /* أرسل سجل الإغلاق باستخدام أعمدة shifts المعروفة فقط، ولا تمسح
     المصروفات المحلية: ارتباطها محفوظ في note لكل بند. */
  if (window.alfaPersist) window.alfaPersist();
  if (window.SessionSync && SessionSync.pushClose) SessionSync.pushClose(newEntry);

  // أعد ضبط الجلسة
  session.shift_open      = false;
  session.cashbox_open    = false;
  session.shift_opened_at = '';
  session.shift_key       = '';
  session.opening_cash    = 0;
  DATA.cashierSession = session;
  if (window.alfaPersist) window.alfaPersist();
  if (window.SessionSync && SessionSync.pushSoon) SessionSync.pushSoon();

  closeCrModal();
  showToast('تم إغلاق الوردية وحفظ التقرير', '🔒');
  crView = 'history';
  renderContent();
}

/* ================================================================
   التنقل بين التابز والأرشيف
   ================================================================ */
function setView(v) {
  crView = v;
  zreportId = null;
  renderContent();
}
function toggleHistRow(id) {
  histOpenId = histOpenId === id ? null : id;
  document.getElementById('crTabContent').innerHTML =
    crView === 'history' ? renderHistory() : '';
}
function onHistSearch(val) {
  histSearch = val.trim().toLowerCase();
  document.getElementById('crTabContent').innerHTML = renderHistory();
}
function clearHistSearch() {
  histSearch = '';
  document.getElementById('crTabContent').innerHTML = renderHistory();
}
function viewZReport(shiftId) {
  zreportId = shiftId;
  crView    = 'zreport';
  renderContent();
}

/* ================================================================
   مودال
   ================================================================ */
function openCrModal() {
  document.getElementById('crModalScrim')?.classList.add('show');
  document.getElementById('crModal')?.classList.add('show');
}
function closeCrModal() {
  document.getElementById('crModalScrim')?.classList.remove('show');
  document.getElementById('crModal')?.classList.remove('show');
}

/* ══ إعادة ربط البيانات (بعد الإقلاع وبعد كل سحب من السحابة) ══
   الشاشة كانت تلتقط المراجع مرة واحدة ولا تستمع لحدث alfa:cloud-ready،
   فتظهر أرقام البذرة المحلية بدل ما سُحب من قاعدة البيانات. */
function crRebind() {
  session    = DATA.cashierSession || {};
  invoices   = DATA.invoices       || [];
  /* expenditures هو المفتاح المعتمد؛ expenditures_list مرادف قديم */
  expenses   = DATA.expenditures || DATA.expenditures_list || [];
  shiftsHist = DATA.shifts_history || [];
}

/* ── تشغيل ── */
(window.alfaStart||function(fn){fn();})(function () {
  crRebind();
  renderApp();
});

/* تحديث عند اكتمال السحب فقط (بلا مؤقت دوري): الشاشة تحتوي مودال
   إغلاق الوردية، وإعادة رسم دورية قد تُفقد المدير ما أدخله. */
window.alfaAutoRefresh(function () {
  crRebind();
  if (document.getElementById('crModal')?.classList.contains('show')) return; // لا تُفسد المودال
  renderContent();
});

