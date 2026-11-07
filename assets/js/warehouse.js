/* ================================================================
   warehouse.js — جرد المستودع وتحويلاته
   يعتمد على نفس جدول inventory_materials المعروف، مع category تبدأ بـ «مستودع».
   صفوف المستودع trackable:false حتى لا تدخل في خصم مبيعات المطعم.
   ================================================================ */
(function () {
  const DATA = window.DEMO_DATA || {};
  const CURRENT = 'warehouse';
  const MGR_NAV = window.AlfaNav ? window.AlfaNav.MGR_NAV : [];
  const navLink = window.AlfaNav ? window.AlfaNav.linker(CURRENT) : function () { return ''; };
  let searchTerm = '';
  let groupFilter = 'all';
  const WAREHOUSE_GROUPS = [
    'تعبئة وتغليف',
    'مستهلكات ونظافة',
    'غذائيات وزيوت وصوصات',
  ];
  const WAREHOUSE_UNITS = ['علبة', 'صحن', 'كرتونة', 'طرد', 'كيس', 'ربطة', 'رول', 'قطعة', 'كأس', 'كغ', 'لتر', 'زرف', 'بيدون', 'تنكة'];
  const WAREHOUSE_CATALOG = {
    'تعبئة وتغليف': ['علب سرفيس مخلل', 'علب سرفيس مقطع', 'صحن بطاطا صغير فلين', 'صحن بطاطا كبير فلين', 'علب وجبات عربي', 'علب سندويش فلين', 'علب برغر فلين', 'صحن عربي صغير', 'صحن عربي وسط', 'صحن عربي كبير', 'علب صوص', 'كاسات كوكتيل', 'كراتين بروستد', 'علب مايونيز', 'شلمونات كوكتيل', 'ورق سندويش', 'سولوفان', 'رول كاشير'],
    'مستهلكات ونظافة': ['محارم', 'كفوف', 'أكياس مقاس ٤٥', 'أكياس مقاس ٥٥', 'ورق تنشيف', 'أكياس قمامة', 'مريول'],
    'غذائيات وزيوت وصوصات': ['خل', 'كتشب كبير زرف', 'زرف كتشب صغير', 'فطر مطربان', 'ذرة', 'زيت صويا', 'زرف دبس رمان صغير', 'زرف حاد صغير', 'خردل', 'باربيكيو', 'جبنة تشيدر'],
  };
  let warehouseModalGroup = WAREHOUSE_GROUPS[0];

  function escW(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }
  function numW(value) {
    const n = Number(value || 0);
    return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.00$/, '');
  }
  function inventoryRows() {
    return (DATA.inventory || []).filter(function (row) {
      return row && (/^مستودع(?:\s|$)/.test(String(row.category || '')) || String(row.id || '').indexOf('wh_') === 0);
    });
  }
  function groupName(row) {
    const category = String(row.category || 'مستودع');
    return category.replace(/^مستودع\s*-?\s*/, '') || 'عام';
  }
  function movementTotals(row) {
    const logs = Array.isArray(row.log) ? row.log : [];
    return logs.reduce(function (out, log) {
      const qty = Number(log && log.qty) || 0;
      if (log && log.type === 'in') out.opening += qty;
      if (log && log.type === 'out') out.out += qty;
      return out;
    }, { opening: 0, out: 0 });
  }
  function visibleRows() {
    let rows = inventoryRows();
    if (groupFilter !== 'all') rows = rows.filter(row => groupName(row) === groupFilter);
    if (searchTerm) rows = rows.filter(row => String(row.name || '').toLowerCase().includes(searchTerm));
    return rows;
  }

  function renderApp() {
    const root = document.getElementById('warehouseApp');
    if (!root) return;
    root.innerHTML = `
      <div class="mgr-layout">
        <nav class="mgr-sidebar" id="mgrSidebar">
          <button class="mgr-side-toggle" onclick="document.getElementById('mgrSidebar').classList.toggle('expanded')">☰</button>
          <div class="mgr-side-logo"><strong>α</strong><span>alfaprosys</span></div>
          <div class="mgr-side-nav">${MGR_NAV.map(n => navLink(n)).join('')}</div>
          <div class="mgr-side-spacer"></div>
          <a class="mgr-side-link danger" href="index.html" onclick="sessionStorage.removeItem('alfaprosys_role');sessionStorage.removeItem('alfaprosys_cashier_key')">
            <span class="mgr-side-ic">🚪</span><span class="mgr-side-lb">خروج</span>
          </a>
        </nav>
        <div class="mgr-content-panel"><div id="warehouseContent"></div></div>
      </div>
      <div class="mgr-nav-scrim" id="mgrNavScrim" onclick="closeWarehouseNav()"></div>
      <button class="mgr-fab" onclick="toggleWarehouseNav()">☰</button>
      <nav class="mgr-mobile-nav" id="mgrMobileNav">
        <div class="mgr-mobile-nav-head"><strong>قائمة الإدارة</strong><button onclick="closeWarehouseNav()">✕</button></div>
        <div class="mgr-mobile-nav-grid">
          ${MGR_NAV.map(n => navLink(n, true)).join('')}
          <a class="mgr-mobile-nav-link danger" href="index.html" onclick="sessionStorage.removeItem('alfaprosys_role')"><span>🚪</span><small>خروج</small></a>
        </div>
      </nav>
      <div class="inv-modal-scrim" id="warehouseModalScrim" onclick="closeWarehouseAdd()"></div>
      <div class="inv-modal" id="warehouseModal" role="dialog" aria-label="إضافة مادة إلى المستودع">
        <div class="inv-modal-head"><span>إضافة مادة جديدة للمستودع</span><button onclick="closeWarehouseAdd()">✕</button></div>
        <div class="inv-modal-body" id="warehouseModalBody"></div>
      </div>
    `;
    renderContent();
  }

  function renderContent() {
    const rows = visibleRows();
    const all = inventoryRows();
    const groups = ['all'].concat(Array.from(new Set(all.map(groupName))));
    const opening = all.reduce((sum, row) => sum + movementTotals(row).opening, 0);
    const transferred = all.reduce((sum, row) => sum + movementTotals(row).out, 0);
    const currentUnits = all.reduce((sum, row) => sum + (Number(row.qty) || 0), 0);

    document.getElementById('warehouseContent').innerHTML = `
      <div class="mgr-page-header">
        <div>
          <div class="mgr-page-brand">alfaprosys</div>
          <div class="mgr-page-title">🏬 جرد المستودع</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <button class="mgr-btn gold sm" onclick="openWarehouseAdd()">+ مادة جديدة للمستودع</button>
          <a class="mgr-btn navy sm" href="inventory.html" onclick="if(window.AlfaNav && window.AlfaNav.navigate) window.AlfaNav.navigate(event, 'inventory.html')">📦 مخزون المطعم</a>
        </div>
      </div>

      <div class="inv-alert-strip" style="background:#eff6ff;border-color:#bfdbfe;color:#1e3a8a;">
        <span>ℹ️ هذه أرصدة المستودع بعد تحويل الكميات المسجلة إلى مخزون المطعم.</span>
        <span>لا تدخل صفوف المستودع في خصم مبيعات المطعم.</span>
      </div>

      <div class="mgr-stats-grid" style="margin-bottom:12px;">
        <div class="mgr-stat-card blue"><div class="mgr-stat-lbl">مواد المستودع</div><div class="mgr-stat-val">${all.length}</div><div class="mgr-stat-sub">مادة/صنف</div></div>
        <div class="mgr-stat-card gold"><div class="mgr-stat-lbl">الجرد قبل التحويل</div><div class="mgr-stat-val">${numW(opening)}</div><div class="mgr-stat-sub">بحسب وحدات الأصناف</div></div>
        <div class="mgr-stat-card red"><div class="mgr-stat-lbl">المحوّل للمطعم</div><div class="mgr-stat-val">${numW(transferred)}</div><div class="mgr-stat-sub">حركة صرف</div></div>
        <div class="mgr-stat-card green"><div class="mgr-stat-lbl">المتبقي بالمستودع</div><div class="mgr-stat-val">${numW(currentUnits)}</div><div class="mgr-stat-sub">الرصيد الحالي</div></div>
      </div>

      <div class="inv-cat-strip">
        ${groups.map(group => `<button class="inv-cat-chip ${groupFilter === group ? 'active' : ''}" onclick="setWarehouseGroup('${escW(group)}')">${group === 'all' ? '🏬 الكل' : escW(group)}<span>${group === 'all' ? all.length : all.filter(row => groupName(row) === group).length}</span></button>`).join('')}
      </div>
      <div class="cust-search-bar" style="margin-bottom:12px;">
        <span>🔍</span><input type="text" inputmode="search" placeholder="ابحث باسم مادة المستودع..." value="${escW(searchTerm)}" oninput="searchWarehouse(this.value)"><button onclick="clearWarehouseSearch()" style="display:${searchTerm ? '' : 'none'};">✕</button>
      </div>

      ${rows.length ? `<div class="mgr-card" style="padding:0;overflow:hidden;">
        <div style="overflow:auto;">
          <table style="width:100%;border-collapse:collapse;min-width:720px;">
            <thead><tr style="background:#f8fafc;color:#475569;font-size:12px;">
              <th style="padding:12px;text-align:right;">المادة</th><th style="padding:12px;text-align:center;">الجرد قبل التحويل</th><th style="padding:12px;text-align:center;">المحوّل للمطعم</th><th style="padding:12px;text-align:center;">المتبقي</th><th style="padding:12px;text-align:center;">الوحدة</th>
            </tr></thead>
            <tbody>${rows.map(row => {
              const totals = movementTotals(row);
              return `<tr style="border-top:1px solid #e5e7eb;">
                <td style="padding:11px 12px;font-weight:800;">${escW(row.name)}<small style="display:block;color:#64748b;font-weight:500;">${escW(groupName(row))}</small></td>
                <td style="padding:11px 12px;text-align:center;">${numW(totals.opening)}</td>
                <td style="padding:11px 12px;text-align:center;color:#b45309;">${numW(totals.out)}</td>
                <td style="padding:11px 12px;text-align:center;font-weight:900;color:#047857;">${numW(row.qty)}</td>
                <td style="padding:11px 12px;text-align:center;color:#475569;">${escW(row.unit || '—')}</td>
              </tr>`;
            }).join('')}</tbody>
          </table>
        </div>
      </div>` : '<div class="inv-empty">لا توجد مواد مطابقة</div>'}

      <div class="mgr-card" style="margin-top:12px;background:#fffbeb;border:1px dashed #f59e0b;">
        <div class="mgr-card-title">🧾 ملاحظات التحويل</div>
        <div style="margin-top:8px;color:#78350f;font-size:13px;line-height:1.8;">تم اعتماد تحويلات المطعم من جرد المستودع بتاريخ 2026-11-02، مع الحفاظ على سجل الجرد وحركات الصرف والإضافة دون أسعار.</div>
      </div>
    `;
  }

  function parseWarehouseNum(value) {
    const normalized = String(value == null ? '' : value)
      .replace(/[٠-٩]/g, digit => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
      .replace(/,/g, '').replace(/\s/g, '');
    return Number.parseFloat(normalized);
  }
  function warehouseCategory(group) {
    return `مستودع - ${group}`;
  }
  function suggestedWarehouseUnit(name) {
    const text = String(name || '');
    if (/صحن/.test(text)) return 'صحن';
    if (/كأس/.test(text)) return 'كأس';
    if (/كرتون/.test(text)) return 'كرتونة';
    if (/رول|سولوفان/.test(text)) return 'رول';
    if (/ربطة/.test(text)) return 'ربطة';
    if (/كغ|أكياس مقاس/.test(text)) return 'كغ';
    if (/لتر/.test(text)) return 'لتر';
    if (/زرف/.test(text)) return 'زرف';
    if (/بيدون|خل|باربيكيو|خردل/.test(text)) return 'بيدون';
    if (/كيس/.test(text)) return 'كيس';
    if (/مريول/.test(text)) return 'قطعة';
    if (/تنكة/.test(text)) return 'تنكة';
    return 'علبة';
  }
  function warehouseCatalogOptions(group) {
    return (WAREHOUSE_CATALOG[group] || []).map(name => `<option value="${escW(name)}">${escW(name)}</option>`).join('');
  }
  function renderWarehouseForm() {
    const body = document.getElementById('warehouseModalBody');
    if (!body) return;
    const group = warehouseModalGroup;
    body.innerHTML = `
      <div class="mgr-form-group">
        <label>تصنيف مادة المستودع</label>
        <select id="whGroup" onchange="onWarehouseGroupChange(this.value)">
          ${WAREHOUSE_GROUPS.map(g => `<option value="${escW(g)}" ${g === group ? 'selected' : ''}>${escW(g)}</option>`).join('')}
        </select>
        <small style="display:block;margin-top:5px;color:var(--text-muted);">هذا النموذج للمستودع فقط، ولا يحتوي خضروات أو خبز.</small>
      </div>
      <div class="mgr-form-group">
        <label>المادة</label>
        <select id="whCatalog" onchange="onWarehouseCatalogChange(this.value)">
          <option value="">اختر من أصناف جرد المستودع...</option>
          ${warehouseCatalogOptions(group)}
          <option value="__new">مادة جديدة يدوياً</option>
        </select>
        <input id="whNewName" type="text" placeholder="اسم مادة المستودع الجديدة" style="display:none;margin-top:8px;" />
      </div>
      <div class="mgr-form-row2">
        <div class="mgr-form-group">
          <label>الوحدة</label>
          <select id="whUnit">${WAREHOUSE_UNITS.map(unit => `<option value="${escW(unit)}">${escW(unit)}</option>`).join('')}</select>
        </div>
        <div class="mgr-form-group">
          <label>الكمية الداخلة</label>
          <input id="whQty" type="text" inputmode="decimal" placeholder="مثال: 100" />
        </div>
      </div>
      <div class="mgr-form-group">
        <label>ملاحظة الجرد أو التوريد <span style="font-weight:500;color:var(--text-muted);">(اختياري)</span></label>
        <input id="whNote" type="text" placeholder="مثال: جرد جديد للمستودع" />
      </div>
      <div style="margin-top:10px;padding:10px;border-radius:10px;background:#eff6ff;color:#1e3a8a;font-size:12px;line-height:1.7;">سيُحفظ الصنف ضمن المستودع بوحدة مستقلة، دون سعر، ولن يدخل في خصم مبيعات المطعم.</div>
      <button class="inv-modal-confirm green" onclick="saveWarehouseNew()">💾 حفظ مادة المستودع</button>
    `;
    const unit = document.getElementById('whUnit');
    if (unit) unit.value = suggestedWarehouseUnit('');
  }
  function existingWarehouseRow(name, group) {
    return (DATA.inventory || []).find(row => row && row.name === name && row.category === warehouseCategory(group));
  }
  window.openWarehouseAdd = function () {
    warehouseModalGroup = WAREHOUSE_GROUPS[0];
    renderWarehouseForm();
    document.getElementById('warehouseModalScrim')?.classList.add('show');
    document.getElementById('warehouseModal')?.classList.add('show');
  };
  window.closeWarehouseAdd = function () {
    document.getElementById('warehouseModalScrim')?.classList.remove('show');
    document.getElementById('warehouseModal')?.classList.remove('show');
  };
  window.onWarehouseGroupChange = function (value) {
    warehouseModalGroup = WAREHOUSE_GROUPS.includes(value) ? value : WAREHOUSE_GROUPS[0];
    renderWarehouseForm();
  };
  window.onWarehouseCatalogChange = function (value) {
    const custom = value === '__new';
    const nameInput = document.getElementById('whNewName');
    const unit = document.getElementById('whUnit');
    if (nameInput) {
      nameInput.style.display = custom ? '' : 'none';
      if (custom) nameInput.focus();
    }
    if (!custom && unit) {
      const existing = existingWarehouseRow(value, warehouseModalGroup);
      unit.value = existing?.unit || suggestedWarehouseUnit(value);
    }
  };
  window.saveWarehouseNew = function () {
    const selected = document.getElementById('whCatalog')?.value || '';
    const name = selected === '__new' ? (document.getElementById('whNewName')?.value || '').trim() : selected.trim();
    const group = document.getElementById('whGroup')?.value || warehouseModalGroup;
    const unit = document.getElementById('whUnit')?.value || 'علبة';
    const qty = parseWarehouseNum(document.getElementById('whQty')?.value);
    const note = (document.getElementById('whNote')?.value || '').trim() || 'إضافة مادة إلى المستودع';
    if (!name) { window.showToast?.('اختر مادة أو أدخل اسماً جديداً', '⚠️'); return; }
    if (!Number.isFinite(qty) || qty <= 0) { window.showToast?.('أدخل كمية صحيحة للمستودع', '⚠️'); return; }
    const isPotatoPlate = /صحن\s+بطاطا/.test(name) && /فلين/.test(name);
    if (/خبز|خضار|خضروات|فواكه|فاكهة|طماطم|بندورة|بصل|جزر|خيار|ملفوف|ليمون|خس|فلفل|نعنع/.test(name) || (/بطاطا/.test(name) && !isPotatoPlate)) {
      window.showToast?.('هذا النموذج لا يقبل الخضروات أو الخبز', '⚠️'); return;
    }
    const category = warehouseCategory(group);
    const rows = DATA.inventory || (DATA.inventory = []);
    let row = rows.find(item => item && item.name === name && item.category === category);
    const log = {
      id: `whlog_add_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      material_id: '', date: (window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10)),
      type: 'in', qty, note, cost: null, supplier_id: null, auto: false,
      supplier_name: null, by: 'المدير', time: '',
    };
    if (!row) {
      row = newRowForWarehouse(name, category, unit, qty);
      rows.push(row);
    } else {
      if (row.unit && row.unit !== unit) {
        window.showToast?.(`المادة موجودة بوحدة ${row.unit} — استخدم نفس الوحدة`, '⚠️'); return;
      }
      row.qty = (Number(row.qty) || 0) + qty;
      row.trackable = false;
      row.category = category;
    }
    log.material_id = String(row.id);
    row.log = Array.isArray(row.log) ? row.log : [];
    row.log.unshift(log);
    DATA.inventory = rows;
    DATA.inventory_materials = JSON.parse(JSON.stringify(rows));
    DATA.inventory_log = Array.isArray(DATA.inventory_log) ? DATA.inventory_log : [];
    DATA.inventory_log.unshift(log);
    try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
    const sync = window.InventorySync && InventorySync.push ? InventorySync.push() : Promise.resolve();
    Promise.resolve(sync).then(function () {
      closeWarehouseAdd();
      renderApp();
      window.showToast?.(`تمت إضافة ${numW(qty)} ${unit} إلى المستودع`, '✅');
    }).catch(function () {
      closeWarehouseAdd();
      renderApp();
      window.showToast?.('تم الحفظ محلياً، وتعذرت المزامنة السحابية مؤقتاً', '⚠️');
    });
  };
  function newRowForWarehouse(name, category, unit, qty) {
    return {
      id: `wh_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name, category, unit, qty: Number(qty), min_qty: 0, reorder_qty: 0,
      cost_per_unit: 0, trackable: false, loaves_per_bundle: null,
      recipe: [], supplier_name: '', log: [],
    };
  }

  window.toggleWarehouseNav = function () {
    document.getElementById('mgrMobileNav')?.classList.toggle('expanded');
    document.getElementById('mgrNavScrim')?.classList.toggle('show');
  };
  window.closeWarehouseNav = function () {
    document.getElementById('mgrMobileNav')?.classList.remove('expanded');
    document.getElementById('mgrNavScrim')?.classList.remove('show');
  };
  window.setWarehouseGroup = function (value) { groupFilter = value; renderContent(); };
  window.searchWarehouse = function (value) { searchTerm = String(value || '').toLowerCase(); renderContent(); };
  window.clearWarehouseSearch = function () { searchTerm = ''; renderContent(); };

  function refresh() {
    if (document.getElementById('warehouseApp')) renderApp();
  }
  try {
    window.addEventListener('alfa:inventory-updated', refresh);
    window.addEventListener('alfa:cloud-ready', refresh);
  } catch (e) {}

  (window.alfaStart || function (fn) { fn(); })(function () {
    renderApp();
  });
})();
