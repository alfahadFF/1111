const DATA = window.DEMO_DATA;
const ROLES = DATA.roles;
let currentRole = null;
let pendingRole = null;
let currentPin = '';

function renderLogin() {
  const grid = document.getElementById('roleGrid');
  grid.innerHTML = Object.keys(ROLES).map(key => {
    const role = ROLES[key];
    return `
      <button class="role-card" type="button" onclick="requestPin('${key}')" aria-label="الدخول كـ ${escapeHtml(role.label)}">
        <div class="role-icon">${role.icon}</div>
        <div class="role-title">${escapeHtml(role.label)}</div>
        <div class="role-desc">${escapeHtml(role.desc)}</div>
      </button>
    `;
  }).join('');
}

function requestPin(roleKey) {
  pendingRole = roleKey;
  currentPin = '';
  document.getElementById('pinDisplay').textContent = '';
  document.getElementById('pinTitle').textContent = `الرمز السري لـ ${ROLES[roleKey].label}`;
  document.getElementById('pinModal').style.display = 'flex';
}

function pinPress(num) {
  if (currentPin.length < 4) {
    currentPin += num;
    document.getElementById('pinDisplay').textContent = '*'.repeat(currentPin.length);
  }
  if (currentPin.length === 4) {
    verifyPin();
  }
}

function pinClear() {
  currentPin = '';
  document.getElementById('pinDisplay').textContent = '';
}

function pinCancel() {
  document.getElementById('pinModal').style.display = 'none';
  pendingRole = null;
  currentPin = '';
}

function verifyPin() {
  const role = pendingRole;
  const pin = currentPin;
  fetch('/__auth/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: role, pin: pin }),
    cache: 'no-store',
  }).then(function (res) {
    return res.text().then(function (raw) {
      let data = {};
      try { data = raw ? JSON.parse(raw) : {}; } catch (e) {}

      if (res.status === 401) {
        const error = new Error('invalid credentials');
        error.code = 'invalid-pin';
        throw error;
      }
      if (!res.ok || !data.authenticated) {
        const error = new Error('authentication service unavailable');
        error.code = 'auth-server';
        error.status = res.status;
        throw error;
      }
      return data;
    });
  }).then(function () {
    document.getElementById('pinModal').style.display = 'none';
    login(role);
  }).catch(function (error) {
    let message = 'تعذر الوصول إلى الخادم المحلي. شغّل offline_server.js ثم افتح النظام من عنوانه، ولا تفتح index.html كملف مباشر';
    let icon = '⚠️';
    if (error && error.code === 'invalid-pin') {
      message = 'الرمز السري غير صحيح للحساب المختار';
      icon = '❌';
    } else if (error && error.code === 'auth-server') {
      message = error.status === 404
        ? 'الخادم المحلي الحالي لا يملك مسار تسجيل الدخول؛ أعد تشغيل offline_server.js من مجلد النظام'
        : 'تعذر إتمام تسجيل الدخول من الخادم المحلي؛ أعد تشغيل offline_server.js';
    }
    showToast(message, icon);
    pinClear();
  });
}

function login(roleKey) {
  currentRole = roleKey;
  sessionStorage.setItem('alfaprosys_role', roleKey);
  if (String(roleKey).indexOf('cashier') === 0) sessionStorage.setItem('alfaprosys_cashier_key', roleKey);
  else sessionStorage.removeItem('alfaprosys_cashier_key');

  if (String(roleKey).indexOf('cashier') === 0) {
    showToast('جاري فتح شاشة البيع', ROLES[roleKey]?.icon || '🧾');
    setTimeout(() => { window.location.href = 'pos.html?alfa_build=173'; }, 350);
    return;
  }

  if (roleKey === 'manager') {
    showToast(`تم الدخول كـ ${ROLES[roleKey].label}`, ROLES[roleKey].icon);
    setTimeout(() => { window.location.href = 'dashboard.html?alfa_build=173'; }, 350);
    return;
  }
}

function logout() {
  currentRole = null;
  sessionStorage.removeItem('alfaprosys_role');
  sessionStorage.removeItem('alfaprosys_cashier_key');
  fetch('/__auth/logout', { method: 'POST', credentials: 'same-origin', cache: 'no-store' }).catch(function () {});
  document.getElementById('appShell').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  showToast('تم تسجيل الخروج بنجاح', '🚪');
}

(window.alfaStart||function(fn){fn();})(renderLogin);