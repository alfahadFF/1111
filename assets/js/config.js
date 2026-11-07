/* ============================================================
   config.js — إعدادات التشغيل — alfaprosys
   ============================================================ */
window.ALFA_CONFIG = {
  // trial  = نسخة تجريبية (ما قبل الربط)
  // prod   = عميل حقيقي
  mode: 'prod',
  /* لا تُفعّل بيانات التطوير في حزمة العميل. */
  allowDemoData: false,

  /* ── التشغيل المحلي أولاً ───────────────────────────────────────
     عند فتح التطبيق من خادم محلي (localhost أو عنوان LAN خاص)،
     تبقى طلبات البيانات على الخادم المحلي. الخادم يحفظ محلياً
     ويرفع إلى السحابة عند عودة الإنترنت. لا يغيّر هذا إعداد خدمة
     الترقيم المحلية أو QZ Tray. */
  offline: {
    localFirst: true,
    serverPort: 3030,
    cloudFlushIntervalMs: 15000,
    /* عناوين الجهازين في offline-network.conf — لا تُكرر هنا. */
  },

  /* ── هوية المطعم (افتراضيات فقط) ──
     المصدر الحي: مفتاح invoice_print في جدول settings (سحابة).
     تُحدَّث عبر alfaApplyInvoicePrint بعد السحب — بلا localStorage. */
  restaurantName: 'عالم الفواكه',
  branding: { name: 'عالم الفواكه', address: 'قسيم الحريري', phone: '0983831671' },

  // فعّلها عند ربط Supabase لتبدأ المزامنة
  syncEnabled: true,

  // تُعبَّأ لاحقًا عند الربط بقواعد البيانات
  // 1) url + anonKey من لوحة Supabase → Project Settings → API
  // 2) mode: 'prod'
  // 3) syncEnabled: true
  // راجع DATA_MODEL.md لأسماء المجموعات والحقول كما هي في التطبيق
  supabase: {
    url: 'https://xqsbyosxzfqqzzgwppyk.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxc2J5b3N4emZxcXp6Z3dwcHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNzc3OTgsImV4cCI6MjEwMjc1Mzc5OH0.mlsG5y0W2ZVVL0TxviMr0dCXJBh0KDz1W8tIZMcdQXk',
  },

  // مصدر الطلبات الأونلاين:
  //  - اترك endpoint فارغًا للوضع التجريبي (بيانات محلية).
  //  - أو ضع رابط دالة orders.js (Netlify) لسحب الطلبات من Google Sheet،
  //    أو لاحقًا اجعل remote.js يسحبها من جدول DB مخصص.
  onlineOrders: { endpoint: '', pin: '' },

  /* ══════════════════════════════════════════════════════════════
     خدمة الترقيم المحلية (اختيارية — تعمل بلا إنترنت)
     ──────────────────────────────────────────────────────────────
     مطلب الإدارة: التعداد ١، ٢، ٣… بلا أصفار وبلا قفزات، ويستمر
     صاعداً حتى لو صدر من جهازين. لازمُه أن يكون الرقم من مرجع
     مشترك — والسحابة وحدها لا تكفي إن انقطع الإنترنت.

     إن أردت الترقيم مستمراً حتى بلا إنترنت:
       ١) شغّل tools/numbering-server.js على جهاز داخل المطعم
       ٢) اكتب عنوانه هنا
     مثال: lanUrl: 'http://192.168.1.235:8787/next'

     اتركه فارغاً ⇒ الرقم من السحابة فقط، وإن تعذّر الاتصال يُوقف
     إصدار الفاتورة بدل إصدار رقم مكرّر أو ذي قفزة.
     ══════════════════════════════════════════════════════════════ */
  numbering: { lanUrl: 'http://192.168.137.1:8787' },

  // الطباعة الحرارية عبر QZ Tray
  // ثبّت QZ Tray على جهاز الكاشير واترك أسماء الطابعات كما هي إن كانت نفس الأجهزة
  /* ── معادلات الاستهلاك التلقائي (ينفّذها assets/js/stock.js) ──
     كل صنف شاورما مُعبَّر بعدد السندويشات وحجمها، فيُخصم لحم السيخ
     والخبز تلقائياً عند كل بيع، ذاتي الشفاء على كل الأجهزة.
     عدّل الأرقام هنا فقط ولا تلمس المعادلات يدوياً. */
  stock: {
    category: 'الشاورما',
    skewerMaterial: 'سيخ شاورما',
    /* حجم حصة البروتين. الدبل يضاعف البروتين فقط؛ كمية الخبز تُحسب
       صراحة في bread_qty داخل stock.js. */
    /* غرام اللحم لكل سندويشة/وجبة حسب جدول الاستهلاك المعتمد. */
    sizes: { خرطوشة: 45, صغير: 75, وسط: 85, كبير: 100, 'وجبة دبل': 100, إيطالي: 150 },
    rules: [
      { variant: 'خرطوشة', size: 'خرطوشة' },
      { variant: 'صغير', size: 'صغير' },
      { variant: 'وسط', size: 'وسط' },
      { variant: 'كبير', size: 'كبير' },
      { variant: 'صحن', size: 'وسط' },
      { variant: 'عادي', size: 'وسط' },
      { variant: 'دبل', size: 'وجبة دبل' },
      { variant: 'سمون', size: 'وسط' },
      { variant: 'شراك', size: 'وسط' },
      { variant: 'إيطالي', size: 'وسط' },
    ],
    /* kind=regular: الخبز العادي، kind=shraak: الشراك. */
    breads: [
      { name: 'خبز صاج / شراك', kind: 'shraak', loaves: 1 },
      { name: 'خبز سياحي', kind: 'regular', loaves: 1, bundle: 12 },
    ],
    italianBread: { name: 'خبز إيطالي', kind: 'italian', loaves: 1 },
    samounBread: { name: 'سمون شاورما', kind: 'samoun', loaves: 1, bundle: 4 },
    /* رغيف البرغر ثابت في العادي والدبل؛ الدبل لا يكرر الخبز. */
    burgerBread: { name: 'خبز برغر', loaves: 1, bundle: 6, matchName: 'برغر' },
    /* تُستخدم هذه الأسماء إن كانت مواد البروتين موجودة في المخزون؛ لا تُنشئ
       مادة جديدة من تلقاء نفسها. */
    burgerMeat: { material: 'لحم برغر', matchName: 'برغر', unitQty: 1 },
    burgerChicken: { material: 'دجاج برغر', matchName: 'برغر دجاج', unitQty: 1 },
    drumsticks: { material: 'دبوس دجاج', category: 'البروستد', matchVariant: 'دبوس', qty: 5 },
  },

  thermal: {
    printerCashier: 'RONGTA 80mm 2',              // طابعة الكاشير (الاسم المحلي على الجهاز الرئيسي)
    printerKitchen: 'RONGTA 80mm Series Printer', // طابعة المطبخ (الاسم المحلي على الجهاز الرئيسي)

    /* أسماء المشاركة على الشبكة (ويندوز يفرض غالباً بلا فراغات).
       النظام يفضّل مسار الشبكة (UNC / «على …») ثم المحلي تلقائياً — بلا اختيار يدوي. */
    /* أسماء بديلة كما تظهر في ويندوز/QZ — المحلي + المشاركة (على SERVER) + اسم المشاركة بلا فراغات */
    printerCashierAliases: [
      'RONGTA 80mm 2 على SERVER',
      'RONGTA 80mm 2 on SERVER',
      '\\SERVER\\RONGTA 80mm 2',
      '\\SERVER\\RONGTA80mm2',
      'RONGTA80mm2',
    ],
    printerKitchenAliases: [
      'RONGTA 80mm Series Printer على SERVER',
      'RONGTA 80mm Series Printer on SERVER',
      '\\SERVER\\RONGTA 80mm Series Printer',
      '\\SERVER\\RONGTA80mm1',
      'RONGTA80mm1',
      'RONGTA 80mm Series Printer',
    ],

    /* مسار الطباعة:
       auto = localhost (الجهاز الرئيسي) محلي مباشر، وأي عنوان LAN (الجهاز الفرعي)
              شبكة إلى QZ على الجهاز الرئيسي.
       يمكن تثبيت local أو network يدوياً عند الحاجة، لكن auto هو إعداد التشغيل المعتاد. */
    printRoute: 'auto',

    /* عنوان QZ على الجهاز الرئيسي — يستخدمه الجهاز الفرعي فقط.
       لا يجرب الجهاز الرئيسي هذا العنوان؛ يتصل بـ localhost مباشرة.
       يمكن حفظ عنوان بديل محلياً عبر alfaprosys_qz_host عند تبدل الشبكة. */
    qzHosts: ['192.168.137.1', '192.168.1.235'],

    /* ── المقاسات ──
       widthMm      = عرض قالب الفاتورة نفسه (محتوى الإيصال)
       paperWidthMm = عرض الورق الفيزيائي الذي تُطبع عليه
       ⇒ القالب 72 مم يتمركز داخل ورق 79.2 مم (هامش ~3.6 مم لكل طرف)
       إن كانت طابعتك تقصّ الأطراف اجعل paperWidthMm = 72

       ⚠️ مهم — طول الورق والسحب الزائد:
       الطباعة عبر QZ (الأساسية) تطبع بطول الفاتورة نفسه + feedMm — بلا فراغ.
       أما حوار المتصفح الاحتياطي (عند غياب QZ) فيستخدم مقاس ورق تعريف
       الطابعة في ويندوز. لتجنب السحب الزائد هناك:
       إعدادات الطباعة في ويندوز ← الطابعة RONGTA ← Printing Preferences
       ← Paper Size = RP80:Roll (وليس 100mm/120mm/210mm). */
     widthMm: 72,
     paperWidthMm: 79.2,

  /* الاسم في ترويسة الإيصال — الافتراضي من الجذر أعلاه، والإعدادات المحلية تتقدم عليه */
  restaurantName: 'عالم الفواكه',

     /* الطول الثابت للفاتورة (مم) — الفاتورة المعتمدة طولها 15سم (150مم)
        مهما كان المحتوى؛ فإن تجاوزه المحتوى (فاتورة طويلة) تتمدد تلقائياً.
        اجعله 0 لإلغاء الطول الثابت. */
     minHeightMm: 150,

    /* خطوط الإيصال — مقاسات الفاتورة المعتمدة (صورة 9/3/2026) كما هي.
       عدّل أي رقم هنا إن أراد صاحب المطعم تغييراً:
       title اسم المطعم · sub العنوان/الهاتف · noLabel «رقم الطلب:» · no الرقم
       date سطر التاريخ · cust سطر الزبون · th رؤوس الأعمدة · td خلايا الجدول
       note الملاحظات · sum المجاميع · thanks سطر الشكر */
    fonts: { title: 20, sub: 14, address: 14, noLabel: 26, no: 26, date: 14, cust: 12.5,
             th: 9.5, td: 12, name: 11, note: 14, itemNote: 11, sum: 12.5, thanks: 16 },
    addressLine: '',     // سطر العنوان المستقل في الترويسة
    showLogo: true,      // إظهار اللوغو من عدمه — اختياري للعميل
    showQr:   true,      // إظهار صورة QR من عدمها
    feedMm: 3,           // مساحة السحب بعد آخر سطر (كانت 8 مم)

    /* عروض أعمدة جدول الأصناف — نسبة مئوية من عرض الجدول (المجموع 100).
       كل رقم مقيس على ورق ٧١ مم ليتّسع في سطر واحد:
         الكمية ٨٫٧ مم ← «10.00»      السعر/الإجمالي ١٢.٧ مم ← «125,000»
         الملاحظة ١٤.٨ مم ← «بدون بصل»   واسم المادة للبقية (يلتفّ على أسطر).
       عرض الجدول نفسه ثابت لا يتغيّر. عدّل الأرقام كما تشاء — المجموع 100. */
    cols: { name: 26.5, qty: 13.5, price: 19, total: 19, note: 22 },

    autoAfterSale: true, // طباعة تلقائية بعد كل عملية بيع (كاشير + مطبخ)
    kitchenCopy: true,   // إرسال نسخة للمطبخ تلقائياً (عبر QZ فقط — انظر thermal.js)

    // ── أمان QZ Tray ──
    // qzCert: الشهادة العامة فقط (Public Certificate) — آمن وضعه هنا
    qzCert: `-----BEGIN CERTIFICATE-----
MIIDETCCAfmgAwIBAgIUbsjhLKI129JTyx3v92BqNMBoqcUwDQYJKoZIhvcNAQEL
BQAwGDEWMBQGA1UEAwwNYWxmYXByb3N5cy1xejAeFw0yNjA5MDUyMjU2NTNaFw0z
NjA5MDIyMjU2NTNaMBgxFjAUBgNVBAMMDWFsZmFwcm9zeXMtcXowggEiMA0GCSqG
SIb3DQEBAQUAA4IBDwAwggEKAoIBAQCt5tJOB9bbAk9kctEfjFCcv9HBqT4iLxH4
iaRHXN1SDXJ6xF3ygAuwrGunSHOMgA7dJkUgCycERbFhAH02MCTyHW5WEyWPDPK2
Q1vTi/kcLFT2h3t0D/fxoQvydsvZPC1Ff4FFkw0rHI99CjFuJ4tdZQ1NXZdkvJBj
p9DW1WeW+sjHCFsXczgFEbh50ZkC9/wxol6ddhzkn6ORnxMVDuyNeF3hX0ThJx3c
0jT17BB0SpHPMzfu3yBGa02A//68wZYPFJwDe1n2+ZtyMk0Da3odH7AwGLa4r8Ln
YeU6iGsdjfRuuyygDAQSuCFPKjIekuWDdV2nvoV2D8IV8yta2fFhAgMBAAGjUzBR
MB0GA1UdDgQWBBRY+hcDKb+9jGKv/q97CVi4mkAxDDAfBgNVHSMEGDAWgBRY+hcD
Kb+9jGKv/q97CVi4mkAxDDAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUA
A4IBAQBrOnLMeVRh86jHzCK6m5zi63kWe/XjoXPTE+7m4obXHXvE2t3Ozo47zQJo
GIWSQQtBl9XArzJq/S9MAe+1LsacGlDNxP8zv/zylooVcWsJ9AOr+KoD87AwI6aB
k6z5jjphM+oOUtcbiDPWWrSOUGCXvhjM5RaqhMuNw+38hvKWncJnGiX9APXQuANh
gYV/klMzloxkWCwXHu4ChtusgR4AHoMTsBQBraBsvS4wjJAEu2UprdW5bk4Eo4gg
+5bzw7NmC6A1yGReQYw0IifADMwNGXEnkEpcBjleol16/pK7Rnb/HaStDslxx27m
ct0NdzgIQRWJFfJ77QECqub1eU4S
-----END CERTIFICATE-----`,

    // qzSecret: سر مشترك يُرسَل لـ Netlify Function sign.js للتحقق من المُرسِل
    //   ضع نفس القيمة في متغير بيئة Netlify: QZ_SIGN_SECRET
    //   تحذير: هذا ليس سراً حقيقياً (مرئي بالمتصفح) — هو حاجز بسيط فقط
    //   الحماية الحقيقية = المفتاح الخاص على Netlify (QZ_PRIVATE_KEY)
    qzSecret: '', // ← ضع نفس القيمة يلي حطيتها بمتغير QZ_SIGN_SECRET على Netlify
  },
};

/* هوية + تصميم الفاتورة — مصدر الحقيقة السحابة (DEMO_DATA بعد السحب).
   لا localStorage كمصدر دائم: النظام سحابي/هجين. تُطبَّق القيم عند
   وصول invoice_print / branding من SettingsSync، وأيضاً هنا إن كانت
   البيانات محمّلة مسبقاً في الذاكرة. */
window.alfaApplyInvoicePrint = function (p) {
  try {
    if (!p || typeof p !== 'object') return;
    const t = window.ALFA_CONFIG.thermal = window.ALFA_CONFIG.thermal || {};
    if (p.restaurant_name) {
      t.restaurantName = p.restaurant_name;
      window.ALFA_CONFIG.restaurantName = p.restaurant_name;
    }
    t.brandingDescription = p.description_line != null ? p.description_line : (t.brandingDescription || '');
    t.addressLine = p.address_line != null ? p.address_line : (t.addressLine || '');
    if (p.logo_url != null) t.logoUrl = p.logo_url;
    if (p.qr_image_url != null) t.qrImageUrl = p.qr_image_url;
    t.showLogo = p.show_logo !== false;
    t.showQr = p.show_qr !== false;
    t.showDrawCode = !!p.show_draw_code;
    t.footerTitle = p.footer_title != null ? p.footer_title : (t.footerTitle || '');
    t.thankYou = p.thank_you != null ? p.thank_you : (t.thankYou || 'شكرا لزيارتكم');
    if (p.font_family) t.fontFamily = p.font_family;
    if (p.logo_max_mm != null) t.logoMaxMm = Number(p.logo_max_mm) || 22;
    if (p.qr_size_mm != null) t.qrSizeMm = Number(p.qr_size_mm) || 25;
    t.show = {
      name: p.show_name !== false,
      description: p.show_description !== false,
      address: p.show_address !== false,
      orderNo: p.show_order_no !== false,
      date: p.show_date !== false,
      customer: p.show_customer !== false,
      orderNotes: p.show_order_notes !== false,
      footerTitle: p.show_footer_title !== false,
      thankYou: p.show_thank_you !== false,
      logo: p.show_logo !== false,
      qr: p.show_qr !== false,
      drawCode: !!p.show_draw_code,
    };
    const base = t.fonts || {};
    const it = Number(p.items_font_size) || base.td || 12;
    const thSz = (p.items_header_font_size != null && p.items_header_font_size !== '')
      ? Number(p.items_header_font_size) : (base.th != null ? base.th : Math.max(7, it - 2.5));
    const nameSz = (p.items_name_font_size != null && p.items_name_font_size !== '')
      ? Number(p.items_name_font_size) : (base.name != null ? base.name : Math.max(7, it - 1));
    const itemNoteSz = (p.items_note_font_size != null && p.items_note_font_size !== '')
      ? Number(p.items_note_font_size) : (base.itemNote != null ? base.itemNote : Math.max(7, it - 1));
    t.fonts = Object.assign({}, base, {
      title: Number(p.restaurant_name_font_size) || base.title || 20,
      sub: Number(p.description_font_size) || base.sub || 14,
      address: Number(p.address_font_size) || base.address || 14,
      no: Number(p.order_number_font_size) || base.no || 26,
      noLabel: Number(p.order_number_font_size) || base.noLabel || 26,
      date: Number(p.order_date_font_size) || base.date || 14,
      cust: Number(p.customer_data_font_size) || base.cust || 12.5,
      note: Number(p.order_notes_font_size) || base.note || 14, /* ملاحظات الطلب فوق الجدول */
      thanks: Number(p.thank_you_font_size) || base.thanks || 16,
      footerTitle: Number(p.footer_title_font_size) || base.footerTitle || base.sub || 14,
      sum: Number(p.sum_font_size) || base.sum || 12.5,
      td: it,
      th: thSz || 9.5,
      name: nameSz || 11,
      itemNote: itemNoteSz || 11, /* ملاحظات الصنف داخل الجدول */
    });
    window.ALFA_CONFIG.branding = Object.assign({}, window.ALFA_CONFIG.branding || {}, {
      name: p.restaurant_name || (window.ALFA_CONFIG.branding && window.ALFA_CONFIG.branding.name) || '',
      address: p.address_line || p.description_line || (window.ALFA_CONFIG.branding && window.ALFA_CONFIG.branding.address) || '',
      phone: p.phone || (window.ALFA_CONFIG.branding && window.ALFA_CONFIG.branding.phone) || '',
      footer: p.thank_you || (window.ALFA_CONFIG.branding && window.ALFA_CONFIG.branding.footer) || '',
    });
  } catch (e) {}
};
try {
  const __cloudPrint = (window.DEMO_DATA && window.DEMO_DATA.invoice_print_settings) || null;
  const __cloudBrand = (window.DEMO_DATA && window.DEMO_DATA.branding) || null;
  if (__cloudBrand && __cloudBrand.name) {
    window.ALFA_CONFIG.branding = Object.assign({}, window.ALFA_CONFIG.branding || {}, __cloudBrand);
    window.ALFA_CONFIG.restaurantName = __cloudBrand.name;
    window.ALFA_CONFIG.thermal.restaurantName = __cloudBrand.name;
  }
  if (__cloudPrint && typeof __cloudPrint === 'object') {
    window.alfaApplyInvoicePrint(__cloudPrint);
  }
} catch (e) {}


// ── نظام الحماية والصلاحيات ──
(function() {
  const savedRole = sessionStorage.getItem('alfaprosys_role');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const PUBLIC_PAGES = ['track.html'];
  const host = String(window.location.hostname || '').toLowerCase();
  const privateIpv4 = /^(10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[0-1])\.)/.test(host);
  const localServerMode = window.location.protocol !== 'file:' &&
    (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost') || privateIpv4);

  /* تسجيل الخروج يجب أن يمسح جلسة الخادم، لا sessionStorage فقط. */
  document.addEventListener('click', function(ev) {
    const link = ev.target && ev.target.closest ? ev.target.closest('a[href="index.html"]') : null;
    if (!link) return;
    try { sessionStorage.removeItem('alfaprosys_role'); } catch (e) {}
    try {
      if (navigator.sendBeacon) navigator.sendBeacon('/__auth/logout', new Blob([], { type: 'application/json' }));
      else fetch('/__auth/logout', { method: 'POST', credentials: 'same-origin', keepalive: true });
    } catch (e) {}
  }, true);

  if (PUBLIC_PAGES.indexOf(path) >= 0) return;

  const cashierAllowed = [
    'pos.html','pos2.html','invoices.html','cashier_session.html','kitchen.html',
    'queue.html','tables.html','online_orders.html','delivery.html',
    'edit_invoice.html','customers.html'
  ];

  function applyRole(role) {
    const isCashier = role === 'cashier' || String(role || '').indexOf('cashier_') === 0;
    if (path === 'index.html' || path === '') {
      if (role === 'manager') window.location.replace('dashboard.html');
      else if (isCashier) window.location.replace('pos.html');
      return;
    }
    if (!role) {
      window.location.replace('index.html');
      return;
    }
    if (isCashier && !cashierAllowed.includes(path)) {
      alert('ليس لديك صلاحية للوصول إلى هذه الشاشة');
      window.location.replace('pos.html');
    }
  }

  if (localServerMode) {
    /* الخادم يتحقق من الجلسة عند توفرها، لكن الانتقال بين الشاشات لا
       يفقد جلسة المتصفح إذا تعذر طلب /__auth/session مؤقتاً. هكذا يبقى
       السلوك القديم سلساً، بينما يؤدي «خروج» الصريح إلى إزالة savedRole
       وإرجاع المستخدم فعلاً إلى شاشة الدخول. */
    fetch('/__auth/session', { credentials: 'same-origin', cache: 'no-store' })
      .then(function(res) { return res.ok ? res.json() : Promise.reject(new Error('auth endpoint')); })
      .then(function(s) { applyRole(s && s.authenticated ? s.role : savedRole); })
      .catch(function() { applyRole(savedRole); });
    return;
  }

  /* النسخة المنشورة/التجريبية القديمة: لا يوجد فيها الخادم المحلي. */
  applyRole(savedRole);
})();
