/* ================================================================
   stock.js — خصم/عكس المخزون حسب وصفة الصنف — alfaprosys
   الوصفة تُبنى من قواعد الاستهلاك، ثم تُحفظ داخل recipe في مادة المطعم.
   لا نخصم من مواد «مستودع - ...» مباشرة؛ التحويل إلى المطعم هو الذي
   يجعل الرصيد قابلاً للبيع والخصم.
   ================================================================ */
(function () {
  function today() {
    return window.businessDay ? businessDay() : new Date().toISOString().slice(0, 10);
  }
  function logId() {
    return 'il_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  }
  function data() { return window.DEMO_DATA || {}; }
  function stockCfg() { return (window.ALFA_CONFIG && window.ALFA_CONFIG.stock) || {}; }
  function textOf(it) {
    return [it && it.name, it && it.base_name, it && it.variant, it && it.variant_clean,
      it && it.option_name, it && it.family].filter(Boolean).join(' ')
      .replace(/\s+/g, ' ').trim();
  }
  function categoryOf(it) { return String((it && it.category_name) || '').trim(); }
  function isWarehouseMaterial(m) { return /^مستودع\s*-/.test(String((m && m.category) || '')); }
  function isUsableMaterial(m) {
    /* الصفوف القديمة ذات trackable=false لا تدخل الرصيد الحقيقي، ولا نعيد
       تفعيلها تلقائياً؛ هذا يمنع خصم الخبز مرتين من صفوف تجريبية مكررة. */
    return !!m && !isWarehouseMaterial(m) && m.trackable !== false;
  }
  function lineId(line) {
    if (!line || line.offer_disc) return null;
    const raw = line.id || line.item_id;
    if (raw && String(raw).indexOf('offerdisc_') !== 0) return String(raw);
    const found = (data().items || []).find(function (i) {
      return i && (i.name === line.name || i.base_name === line.name);
    });
    return found ? String(found.id) : null;
  }
  function itemIs(item, pattern) { return pattern.test(textOf(item)); }
  function isShawarma(item) { return /الشاورما/.test(categoryOf(item)); }
  function isWestern(item) { return /السندويشات\s*والغربي/.test(categoryOf(item)); }
  function isBeverage(item) {
    return /المشروبات\s*الباردة|مشروبات\s*باردة|العصائر\s*والكوكتيلات/.test(categoryOf(item));
  }
  function isPlate(item) { return isShawarma(item) && /صحن/.test(textOf(item)); }
  function isMeal(item) { return /وجبة/.test(textOf(item)); }
  function isBurger(item) { return /برغر/.test(textOf(item)); }
  function isBroasted(item) {
    /* «المشوي» يشترك في التصنيف مع البروستد لكنه لا يأخذ علبة بروستد. */
    return /بروستد/.test(textOf(item)) && !/سمك/.test(textOf(item));
  }
  function isDouble(item) { return /دبل/.test(textOf(item)); }
  function isSandwich(item) {
    return (isShawarma(item) || isWestern(item)) && !isMeal(item) && !isPlate(item);
  }
  function plateCount(item) {
    const t = textOf(item);
    const m = t.match(/(\d+)\s*سندويش/);
    if (m) return Number(m[1]) || 1;
    if (/سندويشتين|اثنتين/.test(t)) return 2;
    return 1;
  }
  function add(map, id, qty) {
    if (!id || !qty) return;
    map[id] = (map[id] || 0) + Number(qty);
  }
  function recipeFromMap(map) {
    return Object.keys(map).map(function (id) {
      return { item_id: id, qty: +Number(map[id]).toFixed(4) };
    }).filter(function (x) { return x.qty !== 0; });
  }

  /* ── قواعد اللحم للشاورما كما اعتمدها المستخدم ── */
  function shawarmaMeatGrams(item) {
    if (!isShawarma(item)) return 0;
    const t = textOf(item);
    const sz = Object.assign({ خرطوشة: 45, صغير: 75, وسط: 85, كبير: 100, 'وجبة دبل': 100, إيطالي: 150 }, stockCfg().sizes || {});
    if (/بالكيلو/.test(t)) return 0;
    if (/خرطوشة/.test(t)) return Number(sz.خرطوشة) || 45;
    if (/إيطالي/.test(t)) return Number(sz.إيطالي || 150) || 150;
    if (/دبل/.test(t)) return Number(sz['وجبة دبل'] || 100) || 100;
    if (/وجبة/.test(t)) return Number(sz.صغير || 75) || 75;
    if (/صحن/.test(t)) return (Number(sz.وسط) || 85) * plateCount(item);
    if (/صغير/.test(t)) return Number(sz.صغير) || 75;
    if (/كبير/.test(t)) return Number(sz.كبير) || 100;
    /* الوسط، السمون، الشراك، ووجبة الشاورما العادية/الشراك */
    if (/وسط|سمون|شراك|عادي|وجبة/.test(t)) return Number(sz.وسط) || 85;
    return 0;
  }

  /* ── بناء خريطة الاستهلاك لكل صنف ── */
  function consumptionRules() {
    const rules = [];
    (data().items || []).forEach(function (item) {
      if (!item || !item.id) return;
      const t = textOf(item);
      const shawarma = isShawarma(item);
      const western = isWestern(item);
      const beverage = isBeverage(item);
      if (!shawarma && !western && !beverage) return;
      if (/بالكيلو/.test(t)) return;
      if (beverage) {
        rules.push({
          id: String(item.id), label: item.name || t, text: t,
          shawarma: false, western: false, beverage: true, meal: false,
          plate: false, burger: false, broasted: false, sandwich: false,
          meat_grams: 0, bread: null, bread_qty: 0, plate_count: 0,
        });
        return;
      }

      const plate = isPlate(item);
      const meal = isMeal(item);
      const burger = isBurger(item);
      const double = isDouble(item);
      let bread = 'regular';
      if (/إيطالي/.test(t)) bread = 'italian';
      else if (/سمون/.test(t)) bread = 'samoun';
      else if (/شراك/.test(t)) bread = 'shraak';
      else if (burger) bread = 'burger';

      /* رغيف واحد حسب النوع؛ الدبل: عادي = رغيفان، شراك = 1.5،
         والسمون يبقى رغيفاً حسب الصنف. الصحن العربي يستخدم العادي. */
      let breadQty = 1;
      if (double && bread === 'regular') breadQty = 2;
      else if (double && bread === 'shraak') breadQty = 1.5;
      else if (/إيطالي/.test(t)) breadQty = 1;
      else if (plate) breadQty = plateCount(item);

      rules.push({
        id: String(item.id),
        label: item.name || t,
        text: t,
        shawarma: shawarma,
        western: western,
        meal: meal,
        plate: plate,
        burger: burger,
        broasted: false,
        sandwich: isSandwich(item),
        meat_grams: shawarmaMeatGrams(item),
        bread: bread,
        bread_qty: breadQty,
        plate_count: plate ? plateCount(item) : 0,
      });
    });

    /* البروستد منفصل عن وصفات السندويشات الغربية؛ يحتاج مواد التعبئة
       المحددة لكل وجبة، ولا نضيف له وصفة لحم من عندنا. */
    (data().items || []).forEach(function (item) {
      if (!item || !item.id || !isBroasted(item)) return;
      const t = textOf(item);
      rules.push({
        id: String(item.id), label: item.name || t, text: t,
        shawarma: false, western: false, meal: true, plate: false,
        burger: false, broasted: true, sandwich: false, meat_grams: 0,
        bread: null, bread_qty: 0, plate_count: 0,
      });
    });
    return rules;
  }

  function chooseMaterial(predicate) {
    const list = (data().inventory || []).filter(isUsableMaterial).filter(predicate);
    if (!list.length) return null;
    /* نفضّل الصف الذي يحمل وحدة/اسم المادة الأساسي، ثم الأكبر رصيداً؛
       هذا يمنع صفوف النقل القديمة ذات نفس الاسم من مضاعفة الخصم. */
    return list.slice().sort(function (a, b) {
      const score = function (m) {
        let n = 0;
        if (m.trackable === true) n += 10;
        if (Number(m.qty) > 0) n += 2;
        if (m.unit === 'ربطة' || m.unit === 'علبة' || m.unit === 'زرف' || m.unit === 'صحن') n += 1;
        if (/\(فارغة\)/.test(m.name || '')) n += 3;
        return n;
      };
      return score(b) - score(a);
    })[0];
  }
  function exactOr(patterns) {
    return function (m) {
      const n = String(m.name || '');
      return patterns.some(function (p) { return p instanceof RegExp ? p.test(n) : n === p; });
    };
  }
  function materialTargets() {
    const cfg = stockCfg();
    return {
      meat: chooseMaterial(function (m) { return /سيخ\s*شاورما|لحم\s*شاورما/.test(String(m.name || '')); }),
      regularBread: chooseMaterial(exactOr([cfg.breads && cfg.breads.find(x => x.kind === 'regular')?.name || 'خبز سياحي'])),
      shraakBread: chooseMaterial(exactOr([cfg.breads && cfg.breads.find(x => x.kind === 'shraak')?.name || 'خبز صاج / شراك'])),
      samounBread: chooseMaterial(function (m) {
        return /^سمون\s*شاورما/.test(String(m.name || ''));
      }),
      italianBread: chooseMaterial(exactOr([cfg.italianBread?.name || 'خبز إيطالي'])),
      burgerBread: chooseMaterial(exactOr([cfg.burgerBread?.name || 'خبز برغر'])),
      sandwichBox: chooseMaterial(exactOr(['علب سندويش فلين'])),
      burgerBox: chooseMaterial(exactOr(['علب برغر فلين'])),
      cheddar: chooseMaterial(exactOr(['جبنة تشيدر مربعات'])),
      kashkawan: chooseMaterial(function (m) {
        return /جبنة\s*قشقوان/.test(String(m.name || ''));
      }),
      sauce: chooseMaterial(exactOr(['علب صوص (فارغة)', 'علب صوص'])), 
      pickle: chooseMaterial(exactOr(['علب سرفيس مخلل'])),
      mayo: chooseMaterial(exactOr(['علب مايونيز (فارغة)', 'علب مايونيز'])),
      ketchup: chooseMaterial(exactOr(['زرف كتشب صغير'])),
      hot: chooseMaterial(exactOr(['زرف حاد صغير'])),
      pomegranate: chooseMaterial(exactOr(['زرف دبس رمان صغير'])),
      serviceCut: chooseMaterial(exactOr(['علب سرفيس مقطع'])),
      broastedBox: chooseMaterial(exactOr(['علب بروستد'])),
      plateSmall: chooseMaterial(exactOr(['صحن عربي صغير'])),
      plateMedium: chooseMaterial(exactOr(['صحن عربي وسط'])),
      plateLarge: chooseMaterial(exactOr(['صحن عربي كبير'])),
      drumsticks: chooseMaterial(exactOr(['دبوس دجاج'])),
    };
  }
  function unitsPerBundle(m, fallback) {
    return String(m && m.unit || '').indexOf('ربطة') >= 0
      ? (Number(m.loaves_per_bundle || fallback || 1) || 1) : 1;
  }

  function ensureRecipes() {
    const inv = data().inventory || [];
    if (!inv.length) return false;
    const rules = consumptionRules();
    const targets = materialTargets();
    const changedMats = [];
    let changed = false;
    const byId = {};
    rules.forEach(function (r) { byId[r.id] = r; });
    function setRec(material, map) {
      if (!material || !isUsableMaterial(material)) return;
      const rec = recipeFromMap(map || {});
      if (JSON.stringify(rec) !== JSON.stringify(material.recipe || [])) {
        material.recipe = rec;
        changed = true;
        changedMats.push(material);
      }
      material.trackable = true;
    }
    function mapForMaterial(material, fn) {
      const map = {};
      rules.forEach(function (r) { const q = fn(r); if (q) add(map, r.id, q); });
      return map;
    }
    function clearOtherMaterials(predicate, keep) {
      inv.filter(function (m) {
        return isUsableMaterial(m) && predicate(m) && (!keep || String(m.id) !== String(keep.id));
      }).forEach(function (m) { setRec(m, {}); });
    }
    /* الصفوف المرحّلة المكررة لا يجوز أن تحمل وصفة بالتوازي مع صف الرصيد
       المعتمد، وإلا خُصم البيع مرتين من مادتين تحملان الاسم نفسه. */
    clearOtherMaterials(function (m) { return /دبوس\s*دجاج/.test(String(m.name || '')); }, targets.drumsticks);
    clearOtherMaterials(function (m) { return /^علب\s*مايونيز/.test(String(m.name || '')); }, targets.mayo);
    clearOtherMaterials(function (m) { return /^خبز\s*صاج\s*\/\s*شراك$/.test(String(m.name || '')); }, targets.shraakBread);
    clearOtherMaterials(function (m) { return /^سمون\s*شاورما/.test(String(m.name || '')); }, targets.samounBread);

    /* 0) المشروبات المعبأة: يُخصم منها صنف واحد لكل بيع عندما توجد
       مادة مطعم قابلة للتتبع بالاسم نفسه. لا ننشئ مادة ناقصة تلقائياً. */
    rules.filter(function (r) { return r.beverage; }).forEach(function (r) {
      const mat = chooseMaterial(function (m) {
        return String(m.name || '').trim() === String(r.label || '').trim();
      });
      if (mat) {
        setRec(mat, mapForMaterial(mat, function (x) {
          return x.beverage && String(x.label || '').trim() === String(r.label || '').trim() ? 1 : 0;
        }));
      }
    });

    /* 1) لحم الشاورما: المادة تُستخدم إن أُضيفت إلى المخزون لاحقاً.
       لا ننشئ مادة أو كمية من عندنا إذا لم تكن موجودة. */
    if (targets.meat) {
      const gramsPerUnit = /^غ/.test(String(targets.meat.unit || '')) ? 1 : 0.001;
      setRec(targets.meat, mapForMaterial(targets.meat, function (r) {
        return r.meat_grams ? r.meat_grams * gramsPerUnit : 0;
      }));
    }

    /* 2) الخبز: bundle يحفظ بوحدة الربطة، بينما القاعدة نفسها بالرغيف. */
    [
      { mat: targets.regularBread, kind: 'regular', fallback: 12 },
      { mat: targets.shraakBread, kind: 'shraak', fallback: 100 },
      { mat: targets.samounBread, kind: 'samoun', fallback: 4 },
      { mat: targets.italianBread, kind: 'italian', fallback: 2 },
      { mat: targets.burgerBread, kind: 'burger', fallback: 6 },
    ].forEach(function (b) {
      if (!b.mat) return;
      const bundle = unitsPerBundle(b.mat, b.fallback);
      setRec(b.mat, mapForMaterial(b.mat, function (r) {
        if (r.bread !== b.kind) return 0;
        return (Number(r.bread_qty) || 0) / bundle;
      }));
    });

    /* 3) الصحون: 2 سندويشة = صغير؛ 5 = كبير + صغير؛ 6 أو 7 = كبير + وسط.
       لا نخترع مقاساً للـ3 والـ4 قبل تحديده. */
    setRec(targets.plateSmall, mapForMaterial(targets.plateSmall, function (r) {
      return r.plate && (r.plate_count === 2 || r.plate_count === 5) ? 1 : 0;
    }));
    setRec(targets.plateMedium, mapForMaterial(targets.plateMedium, function (r) {
      return r.plate && (r.plate_count === 6 || r.plate_count === 7) ? 1 : 0;
    }));
    setRec(targets.plateLarge, mapForMaterial(targets.plateLarge, function (r) {
      return r.plate && (r.plate_count === 5 || r.plate_count === 6 || r.plate_count === 7) ? 1 : 0;
    }));

    /* 4) خدمة الوجبة/الصحن: علبتا صوص + علبة مخلل + علبة مايونيز
       + زرف كتشب. البروستد له حزمة مستقلة أدناه حتى لا تتكرر المواد. */
    const serviceRules = rules.filter(function (r) { return (r.meal || r.plate) && !r.broasted; });
    function serviceMap(field) {
      const map = {};
      serviceRules.forEach(function (r) { add(map, r.id, field(r)); });
      return map;
    }
    setRec(targets.sauce, serviceMap(function () { return 2; }));
    setRec(targets.pickle, serviceMap(function () { return 1; }));
    setRec(targets.mayo, serviceMap(function () { return 1; }));
    setRec(targets.ketchup, serviceMap(function () { return 1; }));

    /* 5) الغربي غير الفاهيتا والبرغر = قطعتا جبنة.
       أصناف القشقوان لا تُخلط مع التشيدر؛ تُربط بمادة القشقوان إن أُدخلت. */
    setRec(targets.cheddar, mapForMaterial(targets.cheddar, function (r) {
      return r.western && !/فاهيتا|برغر|قشقوان/.test(r.text) ? 2 : 0;
    }));
    setRec(targets.kashkawan, mapForMaterial(targets.kashkawan, function (r) {
      return r.western && /قشقوان/.test(r.text) && !/فاهيتا|برغر/.test(r.text) ? 2 : 0;
    }));

    /* 6) السندويشة المفردة: علبة فلين + حاد + دبس رمان + كتشب.
       البرغر له علبة برغر فقط، والوجبات لها حزمة الخدمة أعلاه. */
    const singleRules = rules.filter(function (r) {
      return r.sandwich && !r.burger && !/بطاطا|جبنة|مرتديلا/.test(r.text);
    });
    function singleMap(field) {
      const map = {};
      singleRules.forEach(function (r) { add(map, r.id, field(r)); });
      return map;
    }
    setRec(targets.sandwichBox, singleMap(function () { return 1; }));
    setRec(targets.hot, singleMap(function () { return 1; }));
    setRec(targets.pomegranate, singleMap(function () { return 1; }));
    setRec(targets.ketchup, (function () {
      /* لا نُسقط زرف الكتشب الخاص بالوجبات؛ نضيف المفردات فقط إلى
         نفس الوصفة مع حزمة الخدمة، إن وُجد صنف مفرد. */
      const map = {};
      serviceRules.forEach(function (r) { add(map, r.id, 1); });
      singleRules.forEach(function (r) { add(map, r.id, 1); });
      return map;
    })());
    setRec(targets.burgerBox, mapForMaterial(targets.burgerBox, function (r) {
      return r.burger ? 1 : 0;
    }));

    /* 7) البروستد: علبة بروستد + مايونيز + علبتا صوص + سرفيس مقطع. */
    const broastRules = rules.filter(function (r) { return r.broasted; });
    function broastMap(qty) {
      const map = {};
      broastRules.forEach(function (r) { add(map, r.id, qty); });
      return map;
    }
    setRec(targets.broastedBox, broastMap(1));
    setRec(targets.mayo, (function () {
      const map = {};
      broastRules.forEach(function (r) { add(map, r.id, 1); });
      /* المايو serviceRules غير البروستد يبقى أيضاً في الوصفة. */
      serviceRules.forEach(function (r) { add(map, r.id, 1); });
      return map;
    })());
    setRec(targets.sauce, (function () {
      const map = {};
      broastRules.forEach(function (r) { add(map, r.id, 2); });
      serviceRules.forEach(function (r) { add(map, r.id, 2); });
      return map;
    })());
    setRec(targets.serviceCut, broastMap(1));

    /* 8) وجبة دبوس = خمس دبابيس، كما كانت قاعدة الدبابيس المعتمدة؛
       لا نضيف كمية فروج/دجاج جديدة لأن المستخدم لم يحددها هنا. */
    if (targets.drumsticks) {
      const map = {};
      rules.filter(function (r) { return r.broasted && /دبوس/.test(r.text); })
        .forEach(function (r) { add(map, r.id, 5); });
      setRec(targets.drumsticks, map);
    }

    if (changedMats.length && window.InventorySync) {
      if (InventorySync.commitMats) InventorySync.commitMats(changedMats);
      else if (InventorySync.pushSoon) InventorySync.pushSoon();
    }
    return changed;
  }

  function neededMap(cartItems) {
    const inv = data().inventory || [];
    const trackable = inv.filter(function (x) {
      return isUsableMaterial(x) && x.trackable && Array.isArray(x.recipe) && x.recipe.length;
    });
    const needed = {};
    (cartItems || []).forEach(function (line) {
      if (line.offer_disc || !line.qty) return;
      const lid = lineId(line);
      if (!lid) return;
      trackable.forEach(function (invItem) {
        invItem.recipe.forEach(function (rec) {
          if (String(rec.item_id) === String(lid)) {
            needed[invItem.id] = (needed[invItem.id] || 0) + (Number(rec.qty) || 0) * Number(line.qty || 0);
          }
        });
      });
    });
    return needed;
  }
  function apply(cartItems, direction) {
    /* direction: -1 خصم مبيعات، +1 عكس/إلغاء */
    if (!cartItems || !cartItems.length) return;
    const D = data();
    const inv = D.inventory || [];
    ensureRecipes();
    const needed = neededMap(cartItems);
    const keys = Object.keys(needed);
    if (!keys.length) return;
    const day = today();
    const sign = direction < 0 ? -1 : 1;
    const type = sign < 0 ? 'out' : 'in';
    const note = sign < 0 ? 'مبيعات POS — خصم استهلاك الوصفة' : 'عكس مبيعات — إعادة استهلاك الوصفة';

    keys.forEach(function (invId) {
      const idx = inv.findIndex(function (x) { return String(x.id) === String(invId); });
      if (idx < 0) return;
      const totalQty = Number(needed[invId]) || 0;
      if (!totalQty) return;
      if (sign < 0) inv[idx].qty = Math.max(0, (Number(inv[idx].qty) || 0) - totalQty);
      else inv[idx].qty = (Number(inv[idx].qty) || 0) + totalQty;
      inv[idx].log = inv[idx].log || [];
      inv[idx].log.unshift({ id: logId(), date: day, type: type, qty: totalQty,
        note: note, auto: true });
      if (sign < 0 && Number(inv[idx].qty) <= (Number(inv[idx].min_qty) || 0) && window.showToast) {
        setTimeout(function () {
          showToast('⚠️ ' + inv[idx].name + ': المخزون وصل للحد الأدنى (' + inv[idx].qty + ' ' + inv[idx].unit + ')', '📦');
        }, 500);
      }
    });
    D.inventory = inv;
    if (window.alfaPersist) window.alfaPersist();
    if (window.InventorySync) InventorySync.pushSoon();
  }

  window.Stock = {
    ensureRecipes: ensureRecipes,
    sandwichMap: consumptionRules,
    deduct: function (lines) { apply(lines, -1); },
    restore: function (lines) { apply(lines, +1); },
    delta: function (line, qtySigned) {
      if (!line || !qtySigned) return;
      const row = { id: lineId(line) || line.id, name: line.name, qty: Math.abs(qtySigned) };
      if (qtySigned > 0) apply([row], -1);
      else apply([row], +1);
    },
  };
  window.deductStockForSale = function (lines) { window.Stock.deduct(lines); };

  (window.alfaStart || function (fn) { fn(); })(function () { ensureRecipes(); });
  window.restoreStockForSale = function (lines) { window.Stock.restore(lines); };
})();
