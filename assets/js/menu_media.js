/* ================================================================
   menu_media.js — رفع صور أصناف المنيو إلى Supabase Storage
   يحتاج إلى bucket عام باسم menu-assets (راجع supabase_menu_assets.sql)
   ================================================================ */
(function () {
  'use strict';

  const BUCKET = 'menu-assets';
  const MAX_BYTES = 5 * 1024 * 1024;
  const MAX_EDGE = 1400;

  function cfg() {
    return (window.ALFA_CONFIG && window.ALFA_CONFIG.supabase) || {};
  }

  function newId() {
    try {
      if (window.crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    } catch (e) {}
    return 'img_' + Date.now() + '_' + Math.random().toString(16).slice(2);
  }

  function setStatus(id, text, error) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text || '';
    el.style.color = error ? '#b42318' : '#137333';
  }

  function readImage(file) {
    return new Promise(function (resolve, reject) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = function () {
        try {
          const scale = Math.min(1, MAX_EDGE / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round((img.naturalWidth || 1) * scale));
          canvas.height = Math.max(1, Math.round((img.naturalHeight || 1) * scale));
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('canvas-not-supported');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(function (blob) {
            URL.revokeObjectURL(url);
            if (!blob) return reject(new Error('image-compress-failed'));
            resolve(blob);
          }, 'image/webp', 0.86);
        } catch (err) {
          URL.revokeObjectURL(url);
          reject(err);
        }
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error('invalid-image'));
      };
      img.src = url;
    });
  }

  function upload(file, objectId) {
    const s = cfg();
    if (!s.url || !s.anonKey) return Promise.reject(new Error('supabase-not-configured'));
    const safeId = String(objectId || newId()).replace(/[^a-zA-Z0-9_-]/g, '_');
    const path = 'items/' + safeId + '/' + Date.now() + '.webp';
    return readImage(file).then(function (blob) {
      return fetch(String(s.url).replace(/\/$/, '') + '/storage/v1/object/' + BUCKET + '/' + path, {
        method: 'POST',
        headers: {
          apikey: s.anonKey,
          Authorization: 'Bearer ' + s.anonKey,
          'x-upsert': 'true',
          'cache-control': '31536000',
          'Content-Type': 'image/webp',
        },
        body: blob,
      }).then(function (res) {
        return res.text().then(function (text) {
          if (!res.ok) {
            let detail = text;
            try { detail = (JSON.parse(text).message || JSON.parse(text).error || text); } catch (e) {}
            throw new Error('storage-' + res.status + ': ' + String(detail).slice(0, 180));
          }
          return String(s.url).replace(/\/$/, '') + '/storage/v1/object/public/' + BUCKET + '/' + path;
        });
      });
    });
  }

  window.handleMenuImageFile = function (input, urlId, statusId, previewId) {
    const file = input && input.files && input.files[0];
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|gif)$/i.test(file.type || '')) {
      input.value = '';
      setStatus(statusId, 'اختر صورة JPG أو PNG أو WEBP فقط', true);
      return;
    }
    if (file.size > MAX_BYTES) {
      input.value = '';
      setStatus(statusId, 'حجم الصورة أكبر من 5 ميغابايت', true);
      return;
    }

    const objectId = input.dataset.itemId || newId();
    input.dataset.uploading = '1';
    setStatus(statusId, 'جاري ضغط ورفع الصورة…', false);
    upload(file, objectId).then(function (url) {
      const urlInput = document.getElementById(urlId);
      if (urlInput) urlInput.value = url;
      const preview = document.getElementById(previewId);
      if (preview) {
        preview.src = url;
        preview.style.display = 'block';
      }
      input.dataset.uploading = '0';
      setStatus(statusId, 'تم رفع الصورة وربط الرابط ✅', false);
    }).catch(function (err) {
      input.dataset.uploading = '0';
      const msg = String(err && err.message || err);
      const hint = msg.indexOf('storage-') === 0
        ? ' — طبّق ملف supabase_menu_assets.sql أولاً'
        : '';
      setStatus(statusId, 'تعذر رفع الصورة' + hint, true);
      try { if (window.showToast) showToast('تعذر رفع صورة الصنف' + hint, '⚠️'); } catch (e) {}
    });
  };

  window.menuImageUploadBusy = function (id) {
    const el = document.getElementById(id);
    return !!(el && el.dataset.uploading === '1');
  };
})();
