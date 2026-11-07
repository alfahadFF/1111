/* ================================================================
   invoices.js — شاشة الفواتير الموحّدة — alfaprosys
   تجمع: الفواتير المفتوحة + المعلقة + المنتهية + الملغية
   مع إمكانية التعديل الكاملة من نفس الشاشة
   ================================================================ */

const DATA    = window.DEMO_DATA;
let invoices  = DATA.invoices || [];

/* ── حالة الشاشة ── */
let selectedId       = '';        // الفاتورة المختارة
/* في هذا المطعم تُغلق الفاتورة وتُدفع مباشرة؛ عرض السجل الكامل هو الافتراضي.
   يمكن للمستخدم تضييق القائمة لاحقاً إلى مفتوحة/معلقة/منتهية/ملغية. */
let filterStatus     = '';  // active | open | pending | printed | cancelled | ''
let searchQuery      = '';
/* شاشة الكاشير = فواتير يوم العمل فقط، من الأقدم إلى الأحدث. */
const cashierTodayOnly = true;
let addMode          = false;
let activeCategoryId = null;
let activeFamily     = null;
let pendingItemId    = null;
let editLogs         = [];

/* ── نافذة الإلغاء ── */
let cancelModalOpen   = false;
let cancelReason      = '';
let cancelReasonCustom= '';
let cancelPrepared    = true;
let cancelItemsState  = {};

/* ── نافذة تأكيد مخصصة (بديل confirm المتصفح) ── */
let confirmModal = { open: false, title: '', msg: '', onConfirm: null, danger: false };
function showConfirm(msg, callback, opts) {
  confirmModal = {
    open: true,
    title: (opts && opts.title) || 'تأكيد',
    msg: msg,
    onConfirm: callback,
    danger: !!(opts && opts.danger),
  };
  render();
}
function closeConfirm() { confirmModal.open = false; confirmModal.onConfirm = null; render(); }
function doConfirm() {
  var cb = confirmModal.onConfirm;
  confirmModal.open = false; confirmModal.onConfirm = null;
  render();
  if (cb) cb();
}

/* ── نافذة التعليق ── */
let pendingModalOpen  = false;
let pendingReason     = '';

/* ── نوافذ تعديل الملاحظات والسعر ── */
let itemNoteModal = { open: false, idx: -1 };
let invoiceNoteModal = { open: false };
let itemPriceModal = { open: false, idx: -1 };

/* ── أدوات ── */
function goPOS(){ location.href = 'pos.html'; }
function bySort(a,b){ return (window.alfaItemOrder ? alfaItemOrder(a) : (a.sort_order||0))-(window.alfaItemOrder ? alfaItemOrder(b) : (b.sort_order||0)); }
function uniq(arr){ return [...new Set(arr.filter(Boolean))]; }
function nowTime(){ return new Date().toLocaleTimeString('ar-EG',{hour:'2-digit',minute:'2-digit'}); }
function selectedInvoice(){ return invoices.find(i => i.id === selectedId); }
function serviceKeyForInvoiceItem(it) {
  if (!it) return '';
  if (it.id === 'service_table') return 'table';
  if (it.id === 'service_delivery') return 'delivery';
  if (it.id === 'service_hall') return 'hall';
  const n = String(it.name || '');
  if (it.is_service && /طاولة/.test(n)) return 'table';
  if (it.is_service && /توصيل/.test(n)) return 'delivery';
  if (it.is_service && /صالة/.test(n)) return 'hall';
  return '';
}
function syncServiceFields(inv) {
  const serviceLines = (inv.items || []).filter(it => !!serviceKeyForInvoiceItem(it));
  if (!serviceLines.length) return;
  const totals = { table: 0, delivery: 0, hall: 0 };
  serviceLines.forEach(it => { totals[serviceKeyForInvoiceItem(it)] += Number(it.total || 0); });
  inv.service_table = totals.table;
  inv.service_delivery = totals.delivery;
  inv.service_hall = totals.hall;
  inv.service_fee = totals.table + totals.delivery + totals.hall;
}
function recalc(inv){
  if (!inv) return 0;
  /* الفاتورة الجديدة تحمل سطر خدمة + حقول service_* للتوافق القديم؛
     نستخدم السطر مرة واحدة، ونستخدم الحقول فقط للفواتير القديمة التي
     لا تحتوي أسطر خدمات. */
  syncServiceFields(inv);
  const items = inv.items || [];
  const itemTotal = items
    .filter(it => !serviceKeyForInvoiceItem(it))
    .reduce((s, x) => s + Number(x.total || 0), 0);
  const serviceLines = items.filter(it => !!serviceKeyForInvoiceItem(it));
  const topServiceTotal = (Number(inv.service_table) || 0) + (Number(inv.service_delivery) || 0) + (Number(inv.service_hall) || 0);
  const serviceTotal = serviceLines.length
    ? serviceLines.reduce((s, x) => s + Number(x.total || 0), 0)
    : (topServiceTotal || Number(inv.service_fee) || 0);
  inv.total = Math.max(0, itemTotal + serviceTotal - (Number(inv.discount) || 0));
  return inv.total;
}

/* 🛵 فواتير الأونلاين: قراءة فقط + حذف فقط (الطلب 13) */
function isOnlineInv(inv){
  if (!inv) return false;
  if (inv.source === 'online' || inv.online_order_id) return true;
  return ((window.DEMO_DATA && DEMO_DATA.online_orders) || []).some(o => o.invoice_id === inv.id);
}
function invToast(msg){
  let t = document.getElementById('invToast');
  if (!t) { t = document.createElement('div'); t.id = 'invToast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._tm); t._tm = setTimeout(() => t.classList.remove('show'), 2300);
}
function deleteOnlineInvoice(){
  const inv = selectedInvoice();
  if (!inv || !isOnlineInv(inv)) return;
  showConfirm(`حذف فاتورة الأونلاين ${invNoLabel(inv)} نهائياً؟\nلا يمكن التراجع عن الحذف.`, function(){
    const ord = (DATA.online_orders || []).find(o => o.invoice_id === inv.id);
    if (ord) ord.invoice_id = null;
    if (inv.stock_applied && window.Stock) { Stock.restore(inv.items); inv.stock_applied = false; }
    invoices = invoices.filter(i => i.id !== inv.id);
    DATA.invoices = invoices;
    if (window.InvoiceSync) InvoiceSync.remove(inv.id);
    selectedId = ''; addMode = false;
    render();
    window.AlfaAudit && AlfaAudit.log('online', 'حذف فاتورة أونلاين نهائياً', `${inv.id} (${fmtNum(inv.total)} ل.س)`, 'مستخدم الفواتير');
    invToast('🗑️ حُذفت فاتورة الأونلاين نهائياً');
  }, { title: '🗑️ حذف نهائي', danger: true });
}

/* ── حالات الفاتورة ── */
const STATUS = {
  open:      { label:'مفتوحة',  icon:'🟢', cls:'st-open'      },
  pending:   { label:'معلقة',   icon:'⏸️', cls:'st-pending'   },
  printed:   { label:'منتهية',  icon:'✅', cls:'st-printed'   },
  modified:  { label:'معدّلة',  icon:'✏️', cls:'st-modified'  },
  cancelled: { label:'ملغية',   icon:'🔴', cls:'st-cancelled' },
};
function stInfo(s){ return STATUS[s] || { label:s||'—', icon:'⚪', cls:'st-unknown' }; }
function stBadge(s){
  const st = stInfo(s);
  return `<span class="inv-badge ${st.cls}">${st.icon} ${st.label}</span>`;
}
function paymentBadge(inv){
  const paid = window.alfaInvoicePaymentStatus ? alfaInvoicePaymentStatus(inv) === 'paid' : inv.pay_type !== 'deferred';
  return `<span class="inv-payment-badge ${paid ? 'paid' : 'unpaid'}">${paid ? '✓ مدفوع' : '⏳ غير مدفوع'}</span>`;
}
function paymentCollectorText(inv){
  const entries = window.alfaInvoicePaymentEntries ? alfaInvoicePaymentEntries(inv) : [];
  const last = entries.length ? entries[entries.length - 1] : null;
  if (!last || last.status !== 'paid') return 'لم يُحصّل بعد';
  return [last.cashier, last.shift_key].filter(Boolean).join(' · ') || 'مسجّل';
}

/* ── فلترة الفواتير ── */
function invoiceDateKey(inv) {
  return String(inv && (inv.date || inv.created_at || '') || '').slice(0, 10);
}
function invoiceChronology(inv) {
  const d = invoiceDateKey(inv);
  const t = String(inv && (inv.time || '') || '00:00');
  const no = Number(inv && (inv.no || inv.print_no) || 0);
  return `${d} ${t}`.padEnd(20, '0') + String(no).padStart(10, '0');
}
function invoiceBelongsToCurrentCashier(inv) {
  const key = window.alfaCurrentCashierKey ? alfaCurrentCashierKey() : '';
  if (!key || key === 'manager') return true;
  if (inv && inv.cashier_key) return String(inv.cashier_key) === String(key);
  const sessionName = DATA.cashierSession && DATA.cashierSession.cashier_name;
  if (sessionName && sessionName !== 'الكاشير' && inv && inv.cashier && inv.cashier_key == null) return String(inv.cashier) === String(sessionName);
  return true; /* السجلات القديمة بلا مفتاح تبقى مرئية في يومها */
}
function filteredInvoices(){
  let list = [...invoices];
  if (cashierTodayOnly) {
    const today = window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10);
    list = list.filter(i => invoiceDateKey(i) === today && invoiceBelongsToCurrentCashier(i));
  }

  /* فلتر الحالة */
  if(filterStatus === 'active'){
    list = list.filter(i => i.status === 'open' || i.status === 'pending' || i.status === 'modified');
  } else if(filterStatus){
    list = list.filter(i => i.status === filterStatus);
  }

  /* فلتر البحث */
  if(searchQuery.trim()){
    const q = searchQuery.trim().toLowerCase();
    list = list.filter(i =>
      `${invNoLabel(i)} ${i.customer_name||''} ${i.phone||''} ${i.hall||''} ${i.type||''} ${i.status||''}`
      .toLowerCase().includes(q));
  }

  /* الأقدم أولاً: التاريخ ثم وقت الإصدار ثم رقم الفاتورة */
  list.sort((a, b) => invoiceChronology(a).localeCompare(invoiceChronology(b), 'en'));
  return list;
}

/* ── القائمة ── */
function catItems(){ if(!activeCategoryId) return []; return DATA.items.filter(i=>i.category_id===activeCategoryId&&i.is_available!==false).sort(bySort); }
function families(){ return uniq(catItems().map(i=>i.family)); }
function finalItems(){ if(!activeCategoryId||!activeFamily) return []; return catItems().filter(i=>i.family===activeFamily).sort(bySort); }
function itemTitle(item){
  const v = item.variant_clean || String(item.variant||'').replace(/ - |-/g,' ').trim();
  if(item.option_name && item.option_name!==item.family) return `${item.option_name} ${v}`.trim();
  return v || item.name;
}
function famLabel(f){ return f==='شاورما'&&activeCategoryId==='cat_shawarma'?'وجبات وسندويشات':f; }

/* ================================================================
   الرسم الرئيسي
   ================================================================ */
function render(){
  const list = filteredInvoices();
  const inv  = selectedInvoice();
  const countBase = cashierTodayOnly
    ? invoices.filter(i => invoiceDateKey(i) === (window.businessDay ? businessDay() : new Date().toISOString().slice(0,10)) && invoiceBelongsToCurrentCashier(i))
    : invoices;
  const counts = {
    active:    countBase.filter(i=>i.status==='open'||i.status==='pending'||i.status==='modified').length,
    open:      countBase.filter(i=>i.status==='open').length,
    pending:   countBase.filter(i=>i.status==='pending').length,
    printed:   countBase.filter(i=>i.status==='printed').length,
    modified:  countBase.filter(i=>i.status==='modified').length,
    cancelled: countBase.filter(i=>i.status==='cancelled').length,
  };

  document.getElementById('invoicesApp').innerHTML = `
    <div class="inv-shell">

      <!-- Topbar -->
      <header class="inv-topbar">
        <button class="inv-back-btn" onclick="goPOS()">‹ البيع</button>
        <div class="inv-topbar-title">
          <span>🧾</span>
          <span>الفواتير</span>
          ${selectedId && inv ? stBadge(inv.status) : ''}
        </div>
        ${selectedId ? `
          <button class="inv-topbar-list-btn" onclick="clearSelection()">📋 القائمة</button>
        ` : `<div></div>`}
      </header>

      <!-- محتوى -->
      <div class="inv-body ${selectedId ? 'inv-body-detail' : 'inv-body-list'}">

        <!-- ════ عرض القائمة ════ -->
        ${!selectedId ? `

          <div class="inv-day-scope">📅 فواتير يوم العمل: <strong>${e(window.businessDay ? businessDay() : new Date().toISOString().slice(0,10))}</strong> · مرتبة من الأقدم إلى الأحدث</div>

          <!-- فلاتر الحالة -->
          <div class="inv-filters">
            ${[
              { key:'active',    label:`نشطة`,      icon:'⚡', count: counts.active    },
              { key:'open',      label:`مفتوحة`,    icon:'🟢', count: counts.open      },
              { key:'pending',   label:`معلقة`,     icon:'⏸️', count: counts.pending   },
              { key:'printed',   label:`منتهية`,    icon:'✅', count: counts.printed   },
              { key:'modified',  label:`معدّلة`,    icon:'✏️', count: counts.modified  },
              { key:'cancelled', label:`ملغية`,     icon:'🔴', count: counts.cancelled },
              { key:'',          label:`الكل`,      icon:'🗂️', count: countBase.length  },
            ].map(f => `
              <button class="inv-filter-btn ${filterStatus===f.key?'active':''}"
                onclick="setFilter('${f.key}')">
                ${f.icon} ${f.label}
                <span class="inv-filter-count">${f.count}</span>
              </button>`).join('')}
          </div>

          <!-- شريط البحث -->
          <div class="inv-search-bar">
            <input type="search" dir="rtl"
              id="invSearchInput"
              class="inv-search-input"
              placeholder="رقم فاتورة / اسم عميل / صالة..."
              value="${e(searchQuery)}"
              autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
              enterkeyhint="search" inputmode="search"
              oninput="alfaLiveInput(this, function(v){ searchQuery = v; }, render)">
            ${searchQuery ? `<button class="inv-search-clear" onclick="searchQuery=''; render()">×</button>` : ''}
          </div>

          <!-- قائمة الفواتير -->
          <div class="inv-list">
            ${list.length ? list.map(renderInvRow).join('') : `
              <div class="inv-empty">
                <span>📭</span>
                <p>لا توجد فواتير في هذه الفئة</p>
              </div>`}
          </div>

        ` : `

          <!-- ════ عرض التفاصيل ════ -->
          ${inv ? renderDetail(inv) : `<div class="inv-empty"><span>⚠️</span><p>الفاتورة غير موجودة</p></div>`}

        `}

      </div>

      <!-- مودالات -->
      ${renderQtyModal()}
      ${itemNoteModal.open ? renderItemNoteModal() : ''}
      ${invoiceNoteModal.open ? renderInvoiceNoteModal() : ''}
      ${itemPriceModal.open ? renderItemPriceModal() : ''}
      ${cancelModalOpen ? renderCancelModal() : ''}
      ${pendingModalOpen ? renderPendingModal() : ''}
      ${confirmModal.open ? renderConfirmModal() : ''}

    </div>`;
}

/* ── صف الفاتورة في القائمة ── */
function renderInvRow(inv){
  const typeLabel = invoicesTypeLabel(inv);
  return `
    <button class="inv-row" onclick="selectInv('${e(inv.id)}')">
      <div class="inv-row-start">
        <div class="inv-row-id">${e(invNoLabel(inv))}</div>
        <div class="inv-row-sub">
          ${e(inv.hall || inv.customer_name || typeLabel)}
          ${inv.time ? `· ${e(inv.time)}` : ''}
        </div>
      </div>
      <div class="inv-row-end">
        ${isOnlineInv(inv) ? '<span class="inv-online-badge">🛵 أونلاين</span>' : ''}
        ${paymentBadge(inv)}
        ${stBadge(inv.status)}
        <div class="inv-row-total">${fmtNum(inv.total)} <small>ل.س</small></div>
      </div>
    </button>`;
}

/* ================================================================
   بيانات الفاتورة الكاملة — عرض الشاشة فقط، دون تغيير الطباعة
   ================================================================ */
function invoicesTypeLabel(inv){
  if (isOnlineInv(inv) || (inv && inv.is_online)) return 'أونلاين';
  if (inv && (Number(inv.service_delivery) > 0 || (inv.items || []).some(x => serviceKeyForInvoiceItem(x) === 'delivery'))) return 'توصيل';
  if (inv && (Number(inv.service_table) > 0 || (inv.items || []).some(x => serviceKeyForInvoiceItem(x) === 'table'))) return 'طاولة';
  return ({ table:'طاولة', dinein:'طاولة', takeaway:'سفري', delivery:'توصيل', contract:'عقد' })[String(inv && inv.type || '').toLowerCase()] || (inv && inv.type) || '—';
}
function invoicesPayLabel(pay){
  return ({ cash:'نقدي', deferred:'آجل', partial:'جزئي', card:'بطاقة', transfer:'تحويل' })[String(pay || '').toLowerCase()] || pay || '—';
}
function renderInvoicesInfo(inv, canModify){
  const delivery = inv.delivery_info && typeof inv.delivery_info === 'object' ? inv.delivery_info : {};
  const address = inv.address || delivery.address || '';
  const invoiceNote = String(inv.notes || inv.order_notes || inv.customer_notes || '').trim();
  const date = String(inv.date || inv.created_at || '').slice(0, 10);
  const cells = [
    ['الاسم', inv.customer_name],
    ['الهاتف', inv.phone],
    ['النوع', invoicesTypeLabel(inv)],
    ['المكان / الطاولة', inv.hall || inv.table_label],
    ['التاريخ', date],
    ['الوقت', inv.time],
    ['الكاشير المُصدر', inv.cashier],
    ['وردية الإصدار', inv.issued_shift_key || inv.shift_kind],
    ['طريقة الدفع', invoicesPayLabel(inv.pay_type)],
    ['حالة التحصيل', (window.alfaInvoicePaymentStatus && alfaInvoicePaymentStatus(inv) === 'paid') ? 'مدفوع' : 'غير مدفوع'],
    ['الكاشير المُحصّل', paymentCollectorText(inv)],
    ['العنوان', address],
  ].filter(function (x) { return x[1] != null && String(x[1]).trim() !== ''; });
  return `<div class="inv-invoice-info">
    <div class="inv-invoice-info-title">📋 بيانات الفاتورة</div>
    <div class="inv-invoice-info-grid">${cells.map(function (x) {
      return `<div class="inv-invoice-info-cell"><span>${e(x[0])}</span><strong>${e(x[1])}</strong></div>`;
    }).join('')}</div>
    ${invoiceNote ? `<div class="inv-invoice-note"><b>📝 ملاحظات الفاتورة</b><div>${e(invoiceNote)}</div>${canModify ? `<button class="inv-inline-edit-note" onclick="openInvoiceNoteModal()">✏️ تعديل الملاحظة</button>` : ''}</div>` : (canModify ? `<div class="inv-invoice-note"><b>📝 ملاحظات الفاتورة</b><div>لا توجد ملاحظة</div><button class="inv-inline-edit-note" onclick="openInvoiceNoteModal()">➕ إضافة ملاحظة</button></div>` : '')}
    ${Number(inv.discount) > 0 ? `<div class="inv-invoice-info-foot">الخصم: <strong>${fmtNum(inv.discount)} ل.س</strong></div>` : ''}
  </div>`;
}

/* ================================================================
   صفحة تفاصيل الفاتورة
   ================================================================ */
function renderDetail(inv){
  recalc(inv);
  const online     = isOnlineInv(inv);
  const canEdit    = !online && (inv.status === 'open' || inv.status === 'pending');
  const canModify  = !online && (inv.status === 'open' || inv.status === 'pending' || inv.status === 'printed' || inv.status === 'modified');
  const isPending  = inv.status === 'pending';
  const isOpen     = inv.status === 'open';
  const isModified = inv.status === 'modified';
  const typeLabel  = invoicesTypeLabel(inv);

  return `
    <!-- رأس التفاصيل -->
    <div class="inv-detail-head">
      <div class="inv-detail-meta">
        <div class="inv-detail-id">🧾 ${e(invNoLabel(inv))} ${online ? '<span class="inv-online-badge">🛵 أونلاين</span>' : ''}</div>
        <div class="inv-detail-info">
          ${e(inv.hall || inv.customer_name || typeLabel)}
          ${inv.time ? `· ${e(inv.time)}` : ''}
          ${inv.cashier ? `· ${e(inv.cashier)}` : ''}
        </div>
      </div>
      ${stBadge(inv.status)}
    </div>

    <!-- ملاحظة الحالة -->
    ${isPending && inv.pending_reason ? `
      <div class="inv-status-note inv-note-pending">⏸️ <strong>معلقة:</strong> ${e(inv.pending_reason)}</div>` : ''}
    ${inv.status==='cancelled' && inv.cancel_reason ? `
      <div class="inv-status-note inv-note-cancelled">🔴 <strong>سبب الإلغاء:</strong> ${e(inv.cancel_reason)}</div>` : ''}
    ${online ? `
      <div class="inv-status-note inv-note-online">🛵 <strong>فاتورة من طلب أونلاين</strong> — قراءة فقط: لا تعديل ولا إلغاء، ويمكن حذفها نهائياً فحسب</div>` : ''}
    <div class="inv-payment-state ${window.alfaInvoicePaymentStatus && alfaInvoicePaymentStatus(inv) === 'paid' ? 'paid' : 'unpaid'}">
      ${paymentBadge(inv)} <span>الإصدار يبقى في وردية ${e(inv.issued_shift_key || inv.shift_kind || 'الإصدار')} · التحصيل: ${e(paymentCollectorText(inv))}</span>
    </div>

    ${renderInvoicesInfo(inv, canModify)}

    <!-- شريط الإجراءات -->
    <div class="inv-act-bar">
      ${online ? `
        <button class="inv-act" onclick="printEditNotice('${e(invNoLabel(inv))}')">🖨️ طباعة</button>
        <button class="inv-act inv-act-del-btn" onclick="deleteOnlineInvoice()">🗑️ حذف نهائي</button>` : `
        ${canModify ? `
          <button class="inv-act ${addMode?'inv-act-active':''}" onclick="toggleAddMode()">
            ${addMode ? '✖ إغلاق' : '➕ إضافة'}
          </button>
          <button class="inv-act" onclick="printEditNotice('${e(invNoLabel(inv))}')">🖨️ طباعة</button>
          <button class="inv-act" onclick="openInvoiceNoteModal()">📝 ملاحظة الطلب</button>
        ` : ''}
        ${(inv.status === 'printed' || isModified) && !online ? `
          <button class="inv-act" style="background:#fef3c7;border-color:#f59e0b;color:#92400e;" onclick="printKitchenModification('${e(inv.id)}')">🍳 إشعار المطبخ</button>
        ` : ''}
        ${isOpen ? `
          <button class="inv-act inv-act-pending-btn" onclick="openPendingModal()">⏸️ تعليق</button>` : ''}
        ${isPending ? `
          <button class="inv-act inv-act-reopen-btn" onclick="reopenInvoice()">🟢 فتح</button>` : ''}
        ${canModify ? `
          <button class="inv-act inv-act-cancel-btn" onclick="openCancelModal()">🔴 إلغاء</button>` : ''}`}
    </div>

    <!-- أصناف الفاتورة -->
    <div class="inv-items-list">
      ${(inv.items||[]).map((it,idx) => `
        <div class="inv-item ${!canModify?'inv-item-locked':''}">
          <div class="inv-item-main">
            <div class="inv-item-name">${e(it.name)}</div>
            <div class="inv-item-qty">× ${fmtNum(it.qty)}</div>
            <div class="inv-item-total">${fmtNum(it.total)}</div>
          </div>
          ${canModify ? `
            <div class="inv-item-actions">
              <button onclick="decreaseItem(${idx})">− 1</button>
              <button onclick="replaceItem(${idx})">استبدال</button>
              <button onclick="openItemNoteModal(${idx})">📝 الملاحظة</button>
              <button onclick="openItemPriceModal(${idx})">💰 السعر</button>
              <button class="danger" onclick="removeItem(${idx})">حذف</button>
            </div>` : ''}
          ${it.note ? `<div class="inv-item-note"><b>📝 ملاحظة الصنف:</b> ${e(it.note)}</div>` : ''}
        </div>`).join('') || `<div class="inv-empty-items">لا توجد أصناف</div>`}
    </div>

    <!-- الإجمالي -->
    ${((Number(inv.service_table) || 0) + (Number(inv.service_delivery) || 0) + (Number(inv.service_hall) || 0) > 0) ? `<div class="inv-svc-lines">${(Number(inv.service_table) || 0) ? `<div class="inv-svc-row"><span>🍽️ خدمة طاولة</span><strong>${fmtNum(inv.service_table)} ل.س</strong></div>` : ''}${(Number(inv.service_delivery) || 0) ? `<div class="inv-svc-row"><span>🛵 خدمة توصيل</span><strong>${fmtNum(inv.service_delivery)} ل.س</strong></div>` : ''}${(Number(inv.service_hall) || 0) ? `<div class="inv-svc-row"><span>🛋️ خدمة صالة</span><strong>${fmtNum(inv.service_hall)} ل.س</strong></div>` : ''}</div>` : ''}
    <div class="inv-total-bar">
      <span>إجمالي الفاتورة</span>
      <strong>${fmtNum(inv.total)} ل.س</strong>
    </div>

    <!-- لوحة الإضافة -->
    ${addMode && canModify ? renderAddPanel() : ''}

    <!-- سجل التعديلات -->
    ${editLogs.filter(l=>l.invoice_id===inv.id).length ? `
      <div class="inv-log">
        <div class="inv-log-title">📋 سجل التعديلات</div>
        ${editLogs.filter(l=>l.invoice_id===inv.id).slice().reverse().map(l => `
          <div class="inv-log-row">
            <span>${e(l.text)}</span>
            <small>${e(l.time)}</small>
          </div>`).join('')}
      </div>` : ''}
  `;
}

/* ================================================================
   لوحة إضافة الأصناف
   ================================================================ */
function renderAddPanel(){
  const cats  = sellableCategories();
  const fams  = activeCategoryId ? families() : [];
  const items = finalItems();

  if(!activeCategoryId) return `
    <div class="inv-add-panel">
      <div class="inv-add-title">➕ اختر التصنيف</div>
      <div class="inv-add-grid">
        ${cats.map(c=>`<button onclick="selCat('${e(c.id)}')"><span>${c.icon}</span>${e(c.name)}</button>`).join('')}
      </div>
    </div>`;

  if(!activeFamily) return `
    <div class="inv-add-panel">
      <div class="inv-add-nav"><button onclick="resetPicker()">‹ التصنيفات</button></div>
      <div class="inv-add-grid">
        ${fams.map(f=>`<button onclick="selFam('${e(f)}')">${e(famLabel(f))}</button>`).join('')}
      </div>
    </div>`;

  return `
    <div class="inv-add-panel">
      <div class="inv-add-nav"><button onclick="activeFamily=null; render()">‹ رجوع</button></div>
      <div class="inv-add-grid items">
        ${items.map(i=>`<button onclick="openQty('${e(i.id)}')">
          <span class="add-item-name">${e(itemTitle(i))}</span>
          <span class="add-item-price">${fmtNum(i.price)}</span>
        </button>`).join('')}
      </div>
    </div>`;
}

/* ================================================================
   نافذة الكمية
   ================================================================ */
function renderQtyModal(){
  if(!pendingItemId) return '';
  const item = DATA.items.find(i=>i.id===pendingItemId);
  if(!item) return '';
  return `
    <div class="inv-scrim" onclick="closeQty()"></div>
    <div class="inv-modal">
      <div class="inv-modal-head">
        <div><strong>${e(itemTitle(item))}</strong><span>${fmtNum(item.price)} ل.س</span></div>
        <button onclick="closeQty()">✕</button>
      </div>
      <div class="inv-qty-grid">
        ${Array.from({length:20},(_,i)=>i+1).map(n=>`<button onclick="addItem(${n})">${n}</button>`).join('')}
      </div>
      <div class="inv-qty-custom">
        <input id="qtyInput" type="number" inputmode="numeric" placeholder="كمية أخرى...">
        <button onclick="addCustomQty()">إضافة</button>
      </div>
    </div>`;
}

/* ================================================================
   نوافذ تعديل الملاحظات والسعر — تعديل الشاشة فقط
   ================================================================ */
function renderItemNoteModal() {
  const inv = selectedInvoice();
  const it = inv && inv.items ? inv.items[itemNoteModal.idx] : null;
  if (!it) return '';
  return `
    <div class="inv-scrim" onclick="closeItemNoteModal()"></div>
    <div class="inv-modal inv-modal-action">
      <div class="inv-modal-head">
        <strong>📝 ملاحظة الصنف</strong>
        <button onclick="closeItemNoteModal()">✕</button>
      </div>
      <div class="inv-modal-body">
        <div class="inv-modal-hint"><b>${e(it.name || 'الصنف')}</b></div>
        <textarea id="invoiceItemNoteInput" class="inv-reason-input" rows="4" placeholder="اكتب ملاحظة الصنف..." style="resize:vertical;min-height:92px;">${e(it.note || '')}</textarea>
      </div>
      <div class="inv-modal-foot">
        <button class="inv-modal-btn secondary" onclick="closeItemNoteModal()">إلغاء</button>
        <button class="inv-modal-btn pending" onclick="saveItemNoteModal()">💾 حفظ</button>
      </div>
    </div>`;
}

function renderInvoiceNoteModal() {
  const inv = selectedInvoice();
  if (!inv) return '';
  const current = String(inv.notes || inv.order_notes || inv.customer_notes || '');
  return `
    <div class="inv-scrim" onclick="closeInvoiceNoteModal()"></div>
    <div class="inv-modal inv-modal-action">
      <div class="inv-modal-head">
        <strong>📝 ملاحظة الطلب / الفاتورة</strong>
        <button onclick="closeInvoiceNoteModal()">✕</button>
      </div>
      <div class="inv-modal-body">
        <div class="inv-modal-hint">تُحفظ هذه الملاحظة مع الفاتورة وتظهر في شاشة التوصيل عند وجودها.</div>
        <textarea id="invoiceNoteInput" class="inv-reason-input" rows="5" placeholder="اكتب ملاحظة الطلب..." style="resize:vertical;min-height:110px;">${e(current)}</textarea>
      </div>
      <div class="inv-modal-foot">
        <button class="inv-modal-btn secondary" onclick="closeInvoiceNoteModal()">إلغاء</button>
        <button class="inv-modal-btn pending" onclick="saveInvoiceNoteModal()">💾 حفظ</button>
      </div>
    </div>`;
}

function renderItemPriceModal() {
  const inv = selectedInvoice();
  const it = inv && inv.items ? inv.items[itemPriceModal.idx] : null;
  if (!it) return '';
  return `
    <div class="inv-scrim" onclick="closeItemPriceModal()"></div>
    <div class="inv-modal inv-modal-action">
      <div class="inv-modal-head">
        <strong>💰 تعديل سعر الصنف</strong>
        <button onclick="closeItemPriceModal()">✕</button>
      </div>
      <div class="inv-modal-body">
        <div class="inv-modal-hint"><b>${e(it.name || 'الصنف')}</b> · الكمية ${fmtNum(it.qty)}</div>
        <input id="invoiceItemPriceInput" class="inv-reason-input" type="number" min="0" step="1" inputmode="numeric" value="${Number(it.price) || 0}" placeholder="السعر" style="font-size:1.05rem;text-align:center;">
      </div>
      <div class="inv-modal-foot">
        <button class="inv-modal-btn secondary" onclick="closeItemPriceModal()">إلغاء</button>
        <button class="inv-modal-btn pending" onclick="saveItemPriceModal()">💾 حفظ السعر</button>
      </div>
    </div>`;
}

/* ================================================================
   نافذة الإلغاء
   ================================================================ */
const CANCEL_REASONS = [
  'طلب العميل الإلغاء','لم يرد على الهاتف','خطأ في الطلب',
  'انتهى المخزون','تأخر في التحضير','مشكلة في الدفع','زبون لم يحضر'
];

function renderCancelModal(){
  const inv = selectedInvoice();
  const hasDebt = inv && (inv.pay_type === 'deferred' || inv.pay_type === 'partial');
  const stats = getCancelStats();
  return `
    <div class="inv-scrim" onclick="closeCancelModal()"></div>
    <div class="inv-modal inv-modal-action" style="max-height:90vh;overflow-y:auto;">
      <div class="inv-modal-head danger-head">
        <strong>🔴 إلغاء الفاتورة ${inv ? invNoLabel(inv) : ''}</strong>
        <button onclick="closeCancelModal()">✕</button>
      </div>
      <div class="inv-modal-body">
        <!-- تصنيف الأصناف: محضّر vs قابل للإرجاع -->
        <div style="margin-bottom:14px;padding:12px;background:#fef2f2;border-radius:10px;border:1.5px solid #fca5a5;">
          <div style="font-weight:700;margin-bottom:10px;">📦 هل تم تحضير الفاتورة؟</div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">
            <button class="inv-reason-btn ${cancelPrepared ? 'selected' : ''}" style="flex:1;font-size:11px;"
              onclick="setCancelPreparation('prepared')">🍳 تم التحضير</button>
            <button class="inv-reason-btn ${!cancelPrepared ? 'selected' : ''}" style="flex:1;font-size:11px;"
              onclick="setCancelPreparation('unprepared')">↩️ لم يتم التحضير</button>
          </div>
          <div style="font-size:11px;color:#7f1d1d;margin-bottom:10px;line-height:1.7;">
            عند اختيار «تم التحضير» تبقى المواد الغذائية المستهلكة خسارة، وتعود المشروبات والمواد القابلة للإرجاع تلقائياً حسب المنطق الحالي.
            وعند اختيار «لم يتم التحضير» تُعاد مواد الفاتورة للمخزون.
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${(inv.items || []).map(it => {
              const key = it.id || it.name;
              const st = cancelItemsState[key] || 'prepared';
              const isRet = st === 'returnable';
              return `
                <div class="canc-item ${isRet ? 'returnable' : 'prepared'}" onclick="toggleCancelItem('${e(key)}')">
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:12px;">${e(it.name)}</div>
                    <div style="font-size:11px;opacity:0.8;">${it.qty}× — ${fmtNum(it.total)} ل.س</div>
                  </div>
                  <div class="canc-badge ${isRet ? 'ret' : 'prep'}">${isRet ? '✅ يُرجع' : '🍳 مستهلك'}</div>
                </div>`;
            }).join('')}
          </div>
          <div style="margin-top:10px;display:flex;gap:8px;font-size:11px;">
            <div style="flex:1;padding:6px;background:#fee2e2;border-radius:6px;text-align:center;">
              <div style="font-weight:700;color:#991b1b;">${stats.prepared.length} صنف</div>
              <div style="color:#7f1d1d;">مستهلك (خسارة ${fmtNum(stats.preparedTotal)})</div>
            </div>
            <div style="flex:1;padding:6px;background:#d1fae5;border-radius:6px;text-align:center;">
              <div style="font-weight:700;color:#065f46;">${stats.returnable.length} صنف</div>
              <div style="color:#064e3b;">يُرجع للمخزون (${fmtNum(stats.returnableTotal)})</div>
            </div>
          </div>
        </div>

        ${hasDebt ? `
        <div style="margin-bottom:12px;padding:10px;background:#eff6ff;border-radius:10px;border:1.5px solid #93c5fd;font-size:12px;">
          📒 <strong>هذه الفاتورة عليها ذمة</strong> — سيتم خصم المبلغ من ذمة العميل تلقائياً
        </div>` : ''}

        <p class="inv-modal-hint">اختر سبب الإلغاء أو أدخله يدوياً</p>
        <div class="inv-reasons-grid">
          ${CANCEL_REASONS.map(r=>`
            <button class="inv-reason-btn ${cancelReason===r?'selected':''}"
              onclick="selectCancelReason('${e(r)}')">${e(r)}</button>`).join('')}
        </div>
        <input type="text" class="inv-reason-input"
          placeholder="أو اكتب سبباً آخر..."
          value="${e(cancelReasonCustom)}"
          oninput="cancelReasonCustom=this.value; cancelReason=this.value;">
      </div>
      <div class="inv-modal-foot">
        <button class="inv-modal-btn secondary" onclick="closeCancelModal()">تراجع</button>
        <button class="inv-modal-btn danger" onclick="confirmCancel()"
          ${(!cancelReason&&!cancelReasonCustom)?'disabled':''}>🔴 تأكيد الإلغاء</button>
      </div>
    </div>`;
}

/* ================================================================
   نافذة التعليق
   ================================================================ */
const PENDING_REASONS = ['العميل يفكر في الطلب','انتظار موافقة','العميل خرج مؤقتاً','طلب تأجيل التحضير'];

function renderPendingModal(){
  return `
    <div class="inv-scrim" onclick="closePendingModal()"></div>
    <div class="inv-modal inv-modal-action">
      <div class="inv-modal-head pending-head">
        <strong>⏸️ تعليق الفاتورة</strong>
        <button onclick="closePendingModal()">✕</button>
      </div>
      <div class="inv-modal-body">
        <p class="inv-modal-hint">ما سبب التعليق؟ (اختياري)</p>
        <div class="inv-reasons-grid">
          ${PENDING_REASONS.map(r=>`
            <button class="inv-reason-btn ${pendingReason===r?'selected':''}"
              onclick="pendingReason='${e(r)}'; render()">${e(r)}</button>`).join('')}
        </div>
        <input type="text" class="inv-reason-input"
          placeholder="أو اكتب سبباً..."
          value="${e(pendingReason)}"
          oninput="pendingReason=this.value;">
      </div>
      <div class="inv-modal-foot">
        <button class="inv-modal-btn secondary" onclick="closePendingModal()">تراجع</button>
        <button class="inv-modal-btn pending" onclick="confirmPending()">⏸️ تعليق</button>
      </div>
    </div>`;
}

function renderConfirmModal(){
  return `
    <div class="inv-scrim" onclick="closeConfirm()"></div>
    <div class="inv-modal" style="width:min(360px,92vw);">
      <div class="inv-modal-head ${confirmModal.danger ? 'danger-head' : ''}">
        <strong>${e(confirmModal.title)}</strong>
        <button onclick="closeConfirm()">✕</button>
      </div>
      <div class="inv-modal-body" style="padding:18px 16px;">
        <p style="font-size:14px;line-height:1.7;color:var(--fahad-navy);white-space:pre-line;">${e(confirmModal.msg)}</p>
      </div>
      <div class="inv-modal-foot">
        <button class="inv-modal-btn secondary" onclick="closeConfirm()">تراجع</button>
        <button class="inv-modal-btn ${confirmModal.danger ? 'danger' : 'pending'}" onclick="doConfirm()">تأكيد</button>
      </div>
    </div>`;
}

/* ================================================================
   منطق الإجراءات
   ================================================================ */
function setFilter(s)    { filterStatus=s; searchQuery=''; render(); }
function selectInv(id)   { selectedId=id; addMode=false; activeCategoryId=null; activeFamily=null; render(); }
function clearSelection(){ selectedId=''; addMode=false; activeCategoryId=null; activeFamily=null; render(); }
function toggleAddMode() { addMode=!addMode; activeCategoryId=null; activeFamily=null; render(); }
function selCat(id)      { activeCategoryId=id; activeFamily=null; const fs=families(); if(fs.length===1) activeFamily=fs[0]; render(); }
function selFam(f)       { activeFamily=f; render(); }
function resetPicker()   { activeCategoryId=null; activeFamily=null; render(); }
function openQty(id)     { pendingItemId=id; render(); }
function closeQty()      { pendingItemId=null; render(); }
function addCustomQty()  { const q=Number(document.getElementById('qtyInput')?.value||0); if(q>0) addItem(q); }

/* ── تحويل الفاتورة المطبوعة إلى معدّلة ── */
function markAsModified(inv) {
  if (inv.status === 'printed') {
    inv.status = 'modified';
    inv.modified_at = new Date().toISOString();
    inv.modifications = [];
    editLogs.push({ invoice_id:inv.id, text:`✏️ بدء التعديل على الفاتورة المطبوعة`, time:nowTime() });
  }
  return inv;
}

function logModification(inv, type, detail) {
  if (!inv.modifications) inv.modifications = [];
  inv.modifications.push({ type, detail, time: new Date().toISOString() });
}
function invoiceCanModify(inv) {
  return !!(inv && !isOnlineInv(inv) && ['open', 'pending', 'printed', 'modified'].includes(inv.status));
}
function persistInvoiceChange(inv) {
  if (window.AlfaDB && AlfaDB.upsert) AlfaDB.upsert('invoices', inv);
  if (window.InvoiceSync) InvoiceSync.pushSoon(inv);
  if (window.alfaPersist) window.alfaPersist();
}
function recordInvoiceEdit(inv, type, detail, text) {
  if (inv.status === 'printed') markAsModified(inv);
  logModification(inv, type, detail);
  editLogs.push({ invoice_id: inv.id, text: text || detail, time: nowTime() });
  const labels = { item_note: 'تعديل ملاحظة صنف', order_note: 'تعديل ملاحظة الفاتورة', price: 'تعديل سعر صنف' };
  window.AlfaAudit && AlfaAudit.log('invoices', labels[type] || 'تعديل فاتورة', `${inv.id}: ${detail}`, 'مستخدم الفواتير');
  persistInvoiceChange(inv);
}

function openItemNoteModal(idx) {
  const inv = selectedInvoice();
  if (!invoiceCanModify(inv) || !inv.items || !inv.items[idx]) return showToast('لا يمكن تعديل هذه الفاتورة', '⚠️');
  itemNoteModal = { open: true, idx: idx };
  render();
}
function closeItemNoteModal() { itemNoteModal = { open: false, idx: -1 }; render(); }
function saveItemNoteModal() {
  const inv = selectedInvoice();
  const idx = itemNoteModal.idx;
  const it = inv && inv.items ? inv.items[idx] : null;
  if (!invoiceCanModify(inv) || !it) return closeItemNoteModal();
  const input = document.getElementById('invoiceItemNoteInput');
  const next = String(input && input.value || '').trim();
  const previous = String(it.note || '').trim();
  if (next !== previous) {
    it.note = next;
    recalc(inv);
    recordInvoiceEdit(inv, 'item_note', `${it.name}: ${previous || 'بدون ملاحظة'} → ${next || 'حذف الملاحظة'}`, `📝 ملاحظة الصنف: ${it.name}`);
  }
  itemNoteModal = { open: false, idx: -1 };
  render();
}

function openInvoiceNoteModal() {
  const inv = selectedInvoice();
  if (!invoiceCanModify(inv)) return showToast('لا يمكن تعديل هذه الفاتورة', '⚠️');
  invoiceNoteModal = { open: true };
  render();
}
function closeInvoiceNoteModal() { invoiceNoteModal = { open: false }; render(); }
function saveInvoiceNoteModal() {
  const inv = selectedInvoice();
  if (!invoiceCanModify(inv)) return closeInvoiceNoteModal();
  const input = document.getElementById('invoiceNoteInput');
  const next = String(input && input.value || '').trim();
  const previous = String(inv.notes || inv.order_notes || inv.customer_notes || '').trim();
  if (next !== previous) {
    inv.notes = next;
    if (Object.prototype.hasOwnProperty.call(inv, 'order_notes')) inv.order_notes = next;
    recalc(inv);
    recordInvoiceEdit(inv, 'order_note', `${previous || 'بدون ملاحظة'} → ${next || 'حذف الملاحظة'}`, '📝 تعديل ملاحظة الطلب/الفاتورة');
  }
  invoiceNoteModal = { open: false };
  render();
}

function openItemPriceModal(idx) {
  const inv = selectedInvoice();
  if (!invoiceCanModify(inv) || !inv.items || !inv.items[idx]) return showToast('لا يمكن تعديل هذه الفاتورة', '⚠️');
  itemPriceModal = { open: true, idx: idx };
  render();
}
function closeItemPriceModal() { itemPriceModal = { open: false, idx: -1 }; render(); }
function saveItemPriceModal() {
  const inv = selectedInvoice();
  const idx = itemPriceModal.idx;
  const it = inv && inv.items ? inv.items[idx] : null;
  if (!invoiceCanModify(inv) || !it) return closeItemPriceModal();
  const input = document.getElementById('invoiceItemPriceInput');
  const price = Number(input && input.value);
  if (!Number.isFinite(price) || price < 0) return showToast('أدخل سعراً صحيحاً', '⚠️');
  const oldPrice = Number(it.price) || 0;
  if (price !== oldPrice) {
    const qty = Number(it.qty) || 0;
    it.original_price = it.original_price != null ? it.original_price : oldPrice;
    it.price = price;
    it.total = Number((price * qty).toFixed(2));
    it.price_override = true;
    it.override_reason = 'تعديل السعر من شاشة الفواتير';
    recalc(inv);
    recordInvoiceEdit(inv, 'price', `${it.name}: ${oldPrice} → ${price}`, `💰 تعديل سعر ${it.name}: ${oldPrice} → ${price}`);
  }
  itemPriceModal = { open: false, idx: -1 };
  render();
}

function addItem(qty){
  const inv  = selectedInvoice();
  const item = DATA.items.find(i=>i.id===pendingItemId);
  if(!inv||!item) return;
  const title = itemTitle(item);
  const name  = item.option_name&&item.option_name!==item.family ? title : `${item.family} ${title}`.trim();
  const line = { id:item.id, name, qty, price:item.price, total:item.price*qty, note:'', added_now:true };
  inv.items.push(line);
  recalc(inv);
  if (inv.stock_applied && window.Stock) Stock.deduct([line]);
  if (inv.status === 'printed') markAsModified(inv);
  logModification(inv, 'add', `${qty}× ${title}`);
  editLogs.push({ invoice_id:inv.id, text:`➕ إضافة ${qty}× ${title}`, time:nowTime() });
  window.AlfaAudit && AlfaAudit.log('invoices', 'إضافة صنف لفاتورة', `${inv.id}: +${qty}× ${title}`, 'مستخدم الفواتير');
  pendingItemId=null;
  /* ── ترحيل: محلي + Supabase ── */
  if (window.AlfaDB && AlfaDB.upsert) AlfaDB.upsert('invoices', inv);
  if (window.InvoiceSync) InvoiceSync.pushSoon(inv);
  if (window.alfaPersist) window.alfaPersist();
  render();
}

function decreaseItem(idx){
  const inv=selectedInvoice(); if(!inv) return;
  const it=inv.items[idx]; if(!it) return;
  const oldQty=Number(it.qty||0);
  if(oldQty<=1) return removeItem(idx);
  const unit=Number(it.total||0)/oldQty;
  it.qty=oldQty-1; it.total=Math.round(unit*it.qty);
  recalc(inv);
  if (inv.stock_applied && window.Stock) Stock.delta(it, -1);
  if (inv.status === 'printed') markAsModified(inv);
  logModification(inv, 'decrease', `−1 من ${it.name} (الكمية الجديدة: ${it.qty})`);
  editLogs.push({ invoice_id:inv.id, text:`➖ إنقاص 1 من ${it.name}`, time:nowTime() });
  window.AlfaAudit && AlfaAudit.log('invoices', 'إنقاص كمية', `${inv.id}: −1 من ${it.name}`, 'مستخدم الفواتير');
  /* ── ترحيل: محلي + Supabase ── */
  if (window.AlfaDB && AlfaDB.upsert) AlfaDB.upsert('invoices', inv);
  if (window.InvoiceSync) InvoiceSync.pushSoon(inv);
  if (window.alfaPersist) window.alfaPersist();
  render();
}

function removeItem(idx){
  const inv=selectedInvoice(); if(!inv) return;
  const it=inv.items[idx];
  showConfirm(`حذف الصنف من الفاتورة؟\n${it?.name||''}`, function(){
    if (inv.stock_applied && window.Stock) Stock.restore([it]);
    const removedName = it?.name || 'صنف';
    const removedQty  = it?.qty || 0;
    const removedServiceKey = serviceKeyForInvoiceItem(it);
    if (removedServiceKey) {
      inv['service_' + removedServiceKey] = 0;
      inv.service_fee = (Number(inv.service_table) || 0) + (Number(inv.service_delivery) || 0) + (Number(inv.service_hall) || 0);
    }
    inv.items.splice(idx,1); recalc(inv);
    if (inv.status === 'printed') markAsModified(inv);
    logModification(inv, 'remove', `${removedQty}× ${removedName}`);
    editLogs.push({ invoice_id:inv.id, text:`🗑️ حذف ${removedName}`, time:nowTime() });
    window.AlfaAudit && AlfaAudit.log('invoices', 'حذف صنف من فاتورة', `${inv.id}: ${removedName}`, 'مستخدم الفواتير');
    if (window.AlfaDB && AlfaDB.upsert) AlfaDB.upsert('invoices', inv);
    if (window.InvoiceSync) InvoiceSync.pushSoon(inv);
    if (window.alfaPersist) window.alfaPersist();
    render();
  }, { title: '🗑️ حذف صنف', danger: true });
}

function replaceItem(idx){
  const inv=selectedInvoice(); if(!inv) return;
  const it=inv.items[idx]; if(!it) return;
  showConfirm(`سيُحذف: ${it.name}\nثم اختر البديل من القائمة.`, function(){
    if (inv.stock_applied && window.Stock) Stock.restore([it]);
    const removedName = it.name;
    const removedServiceKey = serviceKeyForInvoiceItem(it);
    if (removedServiceKey) {
      inv['service_' + removedServiceKey] = 0;
      inv.service_fee = (Number(inv.service_table) || 0) + (Number(inv.service_delivery) || 0) + (Number(inv.service_hall) || 0);
    }
    inv.items.splice(idx,1); recalc(inv);
    if (inv.status === 'printed') markAsModified(inv);
    logModification(inv, 'replace', `حُذف: ${removedName} ← بانتظار البديل`);
    editLogs.push({ invoice_id:inv.id, text:`↔️ استبدال ${removedName}`, time:nowTime() });
    window.AlfaAudit && AlfaAudit.log('invoices', 'استبدال صنف', `${inv.id}: ${removedName}`, 'مستخدم الفواتير');
    if (window.AlfaDB && AlfaDB.upsert) AlfaDB.upsert('invoices', inv);
    if (window.InvoiceSync) InvoiceSync.pushSoon(inv);
    if (window.alfaPersist) window.alfaPersist();
    addMode=true; activeCategoryId=null; activeFamily=null; render();
  }, { title: '🔄 استبدال صنف' });
}

/* ── إلغاء ── */
function openCancelModal()  {
  cancelModalOpen=true; cancelReason=''; cancelReasonCustom='';
  cancelPrepared = true;
  initCancelItems();
  render();
}
function closeCancelModal() { cancelModalOpen=false; render(); }
function selectCancelReason(r){ cancelReason=r; cancelReasonCustom=''; render(); }
function setCancelPreparation(state) {
  const inv = selectedInvoice();
  cancelPrepared = state === 'prepared';
  if (cancelPrepared) {
    /* الحالة الافتراضية الحالية: الطعام المحضّر خسارة،
       والمشروبات/المواد القابلة للإرجاع تعود تلقائياً. */
    initCancelItems();
  } else {
    /* لم يتم التحضير: لا نغيّر حساب الإلغاء؛ نضع كل أسطر الفاتورة
       في مسار الإرجاع الحالي حتى لا تبقى مواد غير محضّرة مخصومة. */
    cancelItemsState = {};
    (inv && inv.items || []).forEach(function (it) {
      cancelItemsState[it.id || it.name] = 'returnable';
    });
  }
  render();
}

/* ── تصنيف تلقائي للأصناف: أيها قابل للإرجاع وأيها مستهلك ── */
const RETURNABLE_CATEGORIES = new Set([
  'cat_drinks',   // المشروبات الباردة — بيبسي، عيران، ماء → جاهزة للإرجاع
]);
const RETURNABLE_KEYWORDS = [
  'كتشب', 'كاتشب', 'مايونيز', 'مايونيز', 'ثوم', 'طحينة', 'حار', 'مستردة', 'خردل',
  'بيبسي', 'كولا', 'عيران', 'ماء', 'ميرندا', 'سفن', 'فانتا', 'ريد بول', 'شاي معلب',
  'عصير معلب', 'عصير طازج', 'لبن', 'حليب',
  'مناديل', 'كيس', 'كأس', 'صحن', 'ملعقة', 'شوكة',
  'خل', 'زيت', 'ملح', 'فلفل', 'ليمون',
];
function isItemReturnable(invItem) {
  /* 1) فحص بالفئة */
  const menuItem = (DATA.items || []).find(i => i.id === invItem.id);
  if (menuItem && RETURNABLE_CATEGORIES.has(menuItem.category_id)) return true;
  /* 2) فحص بالكلمات المفتاحية في الاسم */
  const name = (invItem.name || '').toLowerCase();
  return RETURNABLE_KEYWORDS.some(kw => name.includes(kw));
}
function initCancelItems() {
  const inv = selectedInvoice();
  cancelItemsState = {};
  if (!inv || !inv.items) return;
  inv.items.forEach(it => {
    cancelItemsState[it.id || it.name] = isItemReturnable(it) ? 'returnable' : 'prepared';
  });
}
function toggleCancelItem(key) {
  cancelItemsState[key] = cancelItemsState[key] === 'prepared' ? 'returnable' : 'prepared';
  render();
}
function setAllCancelItems(state) {
  Object.keys(cancelItemsState).forEach(k => { cancelItemsState[k] = state; });
  render();
}
function getCancelStats() {
  const inv = selectedInvoice();
  if (!inv || !inv.items) return { returnable: [], prepared: [], returnableTotal: 0, preparedTotal: 0 };
  const returnable = [], prepared = [];
  inv.items.forEach(it => {
    const key = it.id || it.name;
    const st = cancelItemsState[key] || 'prepared';
    if (st === 'returnable') returnable.push(it);
    else prepared.push(it);
  });
  const returnableTotal = returnable.reduce((s, it) => s + (it.total || 0), 0);
  const preparedTotal = prepared.reduce((s, it) => s + (it.total || 0), 0);
  return { returnable, prepared, returnableTotal, preparedTotal };
}
function confirmCancel(){
  const inv=selectedInvoice(); if(!inv) return;
  const reason=cancelReasonCustom.trim()||cancelReason;
  if(!reason) return;
  inv.status='cancelled';
  inv.cancelled_at = new Date().toISOString();

  /* ── تصنيف الأصناف: محضّر vs قابل للإرجاع ── */
  const stats = getCancelStats();
  const hasReturnable = stats.returnable.length > 0;
  const hasPrepared   = stats.prepared.length > 0;
  inv.cancel_items = {};
  (inv.items || []).forEach(it => {
    const key = it.id || it.name;
    inv.cancel_items[key] = cancelItemsState[key] || 'prepared';
  });
  /* نخزن الحالة داخل الحقل المعروف cancel_items، بلا إضافة عمود جديد
     أو تغيير مخطط المزامنة. */
  inv.cancel_items.__invoice_preparation = cancelPrepared ? 'prepared' : 'unprepared';
  const lossItems = stats.prepared.map(it => `${it.qty}× ${it.name}`).join(', ');
  const retItems  = stats.returnable.map(it => `${it.qty}× ${it.name}`).join(', ');
  const preparationLabel = cancelPrepared ? 'تم التحضير' : 'لم يتم التحضير';
  inv.cancel_reason = reason
    + ` | حالة التحضير: ${preparationLabel}`
    + (hasPrepared   ? ` | مواد مستهلكة (خسارة): ${lossItems}` : '')
    + (hasReturnable ? ` | مواد مُرجعة للمخزون: ${retItems}` : '');

  /* ── المخزون: إرجاع الأصناف القابلة للإرجاع فقط ── */
  if (inv.stock_applied && window.Stock) {
    if (hasReturnable) {
      /* إرجاع الأصناف القابلة للإرجاع للمخزون */
      Stock.restore(stats.returnable);
    }
    if (!hasPrepared) {
      /* لا مواد مستهلكة → تم إرجاع الكل */
      inv.stock_applied = false;
    } else if (hasReturnable) {
      /* إرجاع جزئي → نحتفظ بالعلامة لأن بعضها ما زال مخصوماً */
    }
    /* المواد المحضرة تبقى مخصومة = خسارة — تُسجّل في سجل المخزون */
    if (hasPrepared && window.DEMO_DATA) {
      const day = window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10);
      const inv_items = DEMO_DATA.inventory || [];
      const trackable = inv_items.filter(x => x.trackable && Array.isArray(x.recipe) && x.recipe.length);
      stats.prepared.forEach(it => {
        /* البحث في inventory items عن المواد التي تستهلك هذا الصنف */
        trackable.forEach(invItem => {
          invItem.recipe.forEach(rec => {
            if (rec.item_id === it.id) {
              invItem.log = invItem.log || [];
              invItem.log.unshift({
                id: 'il_' + Date.now() + '_' + Math.random().toString(36).slice(2,4),
                date: day, type: 'waste', qty: rec.qty * it.qty,
                note: `خسارة إلغاء فاتورة #${inv.id} — ${it.name} (${reason})`, auto: true,
              });
            }
          });
        });
      });
    }
  }

  /* ── الذمة: خصم قيمة الفاتورة من ذمة العميل ── */
  const invTotal = inv.total || 0;
  const ph = String(inv.phone || '').trim();
  if (invTotal > 0 && (inv.pay_type === 'deferred' || inv.pay_type === 'partial')) {
    const cust = ph
      ? (DATA.customers || []).find(c => String(c.phone || '').trim() === ph)
      : null;
    if (cust) {
      const cancelledDebt = inv.pay_type === 'deferred' ? invTotal : Math.max(0, invTotal - (inv.discount_detail && inv.discount_detail.partial_amount || 0));
      cust.credit_balance = Math.max(0, (cust.credit_balance || 0) - cancelledDebt);
      cust.payments = cust.payments || [];
      cust.payments.unshift({
        id: 'pay_' + String(Date.now()).slice(-6),
        date: inv.date || new Date().toISOString().slice(0, 10),
        amount: cancelledDebt,
        note: 'إلغاء فاتورة #' + inv.id + ' — ' + reason,
        invoice_id: inv.id,
        type: 'cancel_refund',
      });
      if (window.CustomerSync) CustomerSync.pushSoon();
    }
  }

  /* ── الترحيل والتدقيق ── */
  if (window.InvoiceSync) InvoiceSync.pushSoon(inv);
  const summary = `${inv.id} (${fmtNum(inv.total)} ل.س) — السبب: ${reason} — حالة التحضير: ${preparationLabel}`
    + (hasPrepared   ? ` — خسارة مواد: ${lossItems}` : '')
    + (hasReturnable ? ` — أُرجع للمخزون: ${retItems}` : '');
  window.AlfaAudit && AlfaAudit.log('invoices', 'إلغاء فاتورة', summary, 'مستخدم الفواتير');
  editLogs.push({ invoice_id:inv.id,
    text:`🔴 إلغاء: ${reason} — حالة التحضير: ${preparationLabel} — ${hasPrepared ? 'خسارة: '+lossItems : ''} ${hasReturnable ? 'استرجاع: '+retItems : ''}`.trim(),
    time:nowTime() });
  /* ── حفظ البيانات: محلي + Supabase ── */
  if (window.AlfaDB && AlfaDB.upsert) AlfaDB.upsert('invoices', inv);
  if (window.InvoiceSync) InvoiceSync.pushSoon(inv);
  if (window.alfaPersist) window.alfaPersist();
  cancelModalOpen=false; render();
}

/* ── تعليق ── */
function openPendingModal()  { pendingModalOpen=true; pendingReason=''; render(); }
function closePendingModal() { pendingModalOpen=false; render(); }
function confirmPending(){
  const inv=selectedInvoice(); if(!inv) return;
  inv.status='pending'; inv.pending_reason=pendingReason||'تعليق';
  if (window.InvoiceSync) InvoiceSync.pushSoon(inv);
  editLogs.push({ invoice_id:inv.id, text:`⏸️ تعليق: ${inv.pending_reason}`, time:nowTime() });
  pendingModalOpen=false; render();
}
function reopenInvoice(){
  const inv=selectedInvoice(); if(!inv) return;
  inv.status='open'; inv.pending_reason='';
  if (window.InvoiceSync) InvoiceSync.pushSoon(inv);
  editLogs.push({ invoice_id:inv.id, text:'🟢 إعادة فتح', time:nowTime() });
  window.AlfaAudit && AlfaAudit.log('invoices', 'إعادة فتح فاتورة', inv.id, 'مستخدم الفواتير');
  render();
}

/* مهلة للاتصال: حين لا يكون QZ Tray مُشغّلاً قد يبقى وعد connect()
   معلّقاً، فلا تصل الطباعة أبداً. بعد المهلة نتابع إلى print() الذي
   يفتح حوار طباعة المتصفح تلقائياً. */
function withConnectTimeout(fn, ms) {
  return Promise.race([
    Promise.resolve().then(fn).catch(function(){ return false; }),
    new Promise(function(res){ setTimeout(function(){ res(false); }, ms || 5000); }),
  ]);
}

function printEditNotice(id){
  const inv = invoices.find(x => x.id === id) || invoices.find(x => String(invNoLabel(x)) === String(id));
  if (!inv) return showToast('لم يتم العثور على الفاتورة','⚠️');
  if (!window.ThermalPrint || !ThermalPrint.print) return showToast('خدمة الطباعة غير متاحة','⚠️');
  /* نفس مسار الطباعة القديم: عند تعذر QZ يُسمح بحوار طباعة المتصفح.
     تبقى نسخة المطبخ موجودة كما طلب المستخدم. */
  const isMod = (inv.modifications && inv.modifications.length > 0) || inv.status === 'modified';
  withConnectTimeout(function(){ return ThermalPrint.connect ? ThermalPrint.connect() : false; })
    .then(function(){
      return ThermalPrint.print(inv, { modifiedMark: isMod });
    })
    .then(function(){
      return ThermalPrint.print(inv, { kitchen: true, modifiedMark: isMod });
    })
    .catch(function(e){ showToast('تعذرت طباعة الفاتورة على الكاشير والمطبخ: ' + ((e && e.message) || e), '⚠️'); });
}

/* ── طباعة إشعار التعديل للمطبخ ── */
function printKitchenModification(invId) {
  const inv = invoices.find(i => i.id === invId);
  if (!inv) return;
  const mods = inv.modifications || [];
  if (!mods.length) {
    showConfirm('لا توجد تعديلات جديدة بعد.\nهل تريد طباعة الفاتورة المحدّثة كاملة؟', function(){
      printEditNotice(invId);
    }, { title: '🖨️ طباعة' });
    return;
  }
  const typeIcons = { add: '🟢', decrease: '🔶', remove: '🔴', replace: '🔄' };
  const typeLabels = { add: 'أُضيف', decrease: 'نُقِص', remove: 'حُذف', replace: 'استبدال' };
  const now = new Date();
  const timeStr = now.toTimeString().slice(0,5);
  const dateStr = now.toISOString().slice(0,10);

  const html = `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8">
<title>إشعار تعديل — ${inv.id}</title>
<style>
@page{size:80mm auto;margin:0;}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Courier New',monospace;width:72mm;margin:0 auto;padding:4mm;font-size:12px;color:#000;}
.hdr{text-align:center;border-bottom:2px dashed #000;padding-bottom:6px;margin-bottom:8px;}
.hdr h2{font-size:16px;letter-spacing:1px;}
.hdr .sub{font-size:11px;color:#333;margin-top:2px;}
.warn{background:#000;color:#fff;text-align:center;padding:4px;font-weight:bold;font-size:14px;margin:6px 0;}
.inv-info{display:flex;justify-content:space-between;font-size:11px;margin-bottom:8px;}
.mod-list{border-top:1px dashed #000;padding-top:6px;}
.mod-item{padding:4px 0;border-bottom:1px dotted #999;font-size:12px;display:flex;gap:4px;align-items:flex-start;}
.mod-icon{flex-shrink:0;width:20px;text-align:center;}
.mod-text{flex:1;}
.footer{margin-top:10px;border-top:2px dashed #000;padding-top:6px;text-align:center;font-size:10px;}
.total{font-weight:bold;font-size:13px;text-align:center;margin:8px 0;padding:4px;border:1px solid #000;}
.items-now{margin-top:8px;border-top:1px dashed #000;padding-top:6px;}
.items-now h3{font-size:12px;margin-bottom:4px;}
.item-row{display:flex;justify-content:space-between;font-size:11px;padding:2px 0;}
</style></head><body>
<div class="hdr">
  <h2>⚠️ إشعار تعديل</h2>
  <div class="sub">فاتورة #${inv.id} — ${dateStr} ${timeStr}</div>
</div>
<div class="warn">🔔 انتبه — تعديلات على طلب مطبوع</div>
<div class="inv-info">
  <span>${inv.hall || inv.customer_name || ''}</span>
  <span>${inv.type === 'dinein' ? '🍽️ طاولة' : inv.type === 'takeaway' ? '🥡 سفري' : inv.type === 'delivery' ? '🛵 توصيل' : ''}</span>
</div>
<div class="mod-list">
  ${mods.map(m => `
    <div class="mod-item">
      <span class="mod-icon">${typeIcons[m.type] || '•'}</span>
      <span class="mod-text"><strong>${typeLabels[m.type] || m.type}:</strong> ${m.detail}</span>
    </div>`).join('')}
</div>
<div class="items-now">
  <h3>📋 الأصناف الحالية:</h3>
  ${(inv.items||[]).map(it => `
    <div class="item-row">
      <span>${it.name}</span>
      <span>×${it.qty}</span>
    </div>`).join('') || '<div class="item-row"><span>لا أصناف</span></div>'}
</div>
<div class="total">الإجمالي: ${Number(inv.total||0).toLocaleString('ar-EG')} ل.س</div>
<div class="footer">
  ⏰ ${timeStr} — يرجى التعديل فوراً<br>
  ${mods.length} تعديل على هذه الفاتورة
</div>
</body></html>`;

  /* نفس عطَل printEditNotice: isActive() يبدأ false في هذه الشاشة
     فلم يكن الإشعار يُطبع أبداً. الآن: اتصال ثم طباعة، وحوار المتصفح
     بديلاً عند تعذّر QZ. */
  if (!window.ThermalPrint || !ThermalPrint.printModification) {
    showToast('خدمة الطباعة غير متاحة', '⚠️');
    return;
  }
  withConnectTimeout(function(){ return ThermalPrint.connect ? ThermalPrint.connect() : false; })
    .then(function(){ return ThermalPrint.printModification(inv); })
    .catch(function(e){ showToast('تعذرت طباعة إشعار المطبخ: ' + ((e && e.message) || e), '⚠️'); });

  /* مسح التعديلات بعد الطباعة (ستُجمع تعديلات جديدة) */
  inv.modifications = [];
  inv.last_kitchen_print = new Date().toISOString();
  editLogs.push({ invoice_id:inv.id, text:`🍳 طُبِع إشعار تعديل للمطبخ (${mods.length} تعديل)`, time:nowTime() });
  window.AlfaAudit && AlfaAudit.log('invoices', 'طباعة إشعار تعديل للمطبخ', `${inv.id}: ${mods.length} تعديل`, 'مستخدم الفواتير');
  /* ── ترحيل: محلي + Supabase ── */
  if (window.AlfaDB && AlfaDB.upsert) AlfaDB.upsert('invoices', inv);
  if (window.InvoiceSync) InvoiceSync.pushSoon(inv);
  if (window.alfaPersist) window.alfaPersist();
  render();
}

function applyInvoicePrintDesign(){
  try {
    const ip = (window.DEMO_DATA && DEMO_DATA.invoice_print_settings) || null;
    if (ip && window.alfaApplyInvoicePrint) window.alfaApplyInvoicePrint(ip);
  } catch (e) {}
}
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('alfa:cloud-ready', function () {
    applyInvoicePrintDesign();
  });
}

(window.alfaStart||function(fn){fn();})(function () {
  applyInvoicePrintDesign();
  invoices = DATA.invoices || [];
  render();
});
try {
  window.addEventListener('alfa:cloud-ready', function () { invoices = DATA.invoices || []; render(); });
  window.addEventListener('alfa:invoice-updated', function () { invoices = DATA.invoices || []; render(); });
} catch (e) {}
if (window.alfaAutoRefresh) window.alfaAutoRefresh(function () { invoices = DATA.invoices || []; render(); }, 30000);

