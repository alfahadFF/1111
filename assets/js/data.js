// تعريفات بنية محلية فقط. بيانات التشغيل الفعلية تأتي من قاعدة البيانات
// أو من لقطة Local-first حقيقية، ولا توجد سجلات تشغيلية تجريبية مضمّنة.

window.DEMO_DATA = {
  "roles": {
    "cashier_morning": {
      "label": "الكاشير الصباحي",
      "icon": "🌅",
      "desc": "نقطة البيع ووردية الصباح"
    },
    "cashier_evening": {
      "label": "الكاشير المسائي",
      "icon": "🌙",
      "desc": "نقطة البيع ووردية المساء"
    },
    "manager": {
      "label": "الإدارة",
      "icon": "👑",
      "desc": "المبيعات، الورديات، والتقارير"
    }
  },
  "categories": [],
  "orderTypes": [
    {
      "id": "dinein",
      "label": "طاولة",
      "icon": "🍽️"
    },
    {
      "id": "takeaway",
      "label": "سفري",
      "icon": "🥡"
    },
    {
      "id": "delivery",
      "label": "توصيل",
      "icon": "🛵"
    },
    {
      "id": "contract",
      "label": "عقود",
      "icon": "📋"
    }
  ],
  "tables": []
};

/* مصدر المنيو الثابت المضمّن — يُحمّل قبل دورة IndexedDB/Outbox حتى لا تبدأ
   الإدارة أو الكاشير بقوائم فارغة أثناء إعادة فتح التبويبات. */
/* ================================================================
   لقطة محلية فعلية للمنيو — جُلبت من Supabase في 2026-10-13T22:40:40.802Z
   لا تنتظر الواجهة الشبكة لعرضها؛ تُستخدم كأول مصدر محلي، ثم تُحفظ
   اللقطات اللاحقة والتعديلات المحلية في IndexedDB/local-store. تحديثها
   من قاعدة البيانات إجراء تجهيز مقصود، وليس pull وقت التشغيل.
   ================================================================ */
window.ALFA_LOCAL_CATALOG_SNAPSHOT = {
  "fetched_at": "2026-10-22T11:49:56.726Z",
  "categories": [
    {
      "id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "name": "الشاورما",
      "icon": "🌯",
      "sort_order": 1,
      "is_active": true
    },
    {
      "id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "name": "السندويشات والغربي",
      "icon": "🍔",
      "sort_order": 2,
      "is_active": true
    },
    {
      "id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "name": "بطاطا",
      "icon": "🥔",
      "sort_order": 3,
      "is_active": true
    },
    {
      "id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "name": "البروستد والمشوي",
      "icon": "🍗",
      "sort_order": 4,
      "is_active": true
    },
    {
      "id": "fa5608ff-c163-43d6-8276-f695645e74d3",
      "name": "البيتزا",
      "icon": "🍕",
      "sort_order": 5,
      "is_active": true
    },
    {
      "id": "b51bb297-85e3-4837-b2b1-7c3c275f7dfc",
      "name": "المقبلات والإضافات",
      "icon": "🥗",
      "sort_order": 6,
      "is_active": true
    },
    {
      "id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "name": "العصائر والكوكتيلات",
      "icon": "🍹",
      "sort_order": 7,
      "is_active": true
    },
    {
      "id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "name": "المشروبات الباردة",
      "icon": "🥤",
      "sort_order": 8,
      "is_active": true
    }
  ],
  "items": [
    {
      "id": "1c274a61-f903-4b13-8042-a85193b47dbb",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "صحن شاورما عربي",
      "family": "شاورما عربي",
      "option_name": "شاورما عربي",
      "variant": "سندويشتين",
      "variant_clean": "سندويشتين",
      "name": "صحن شاورما عربي سندويشتين",
      "price": 60000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 1,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/f_auto,q_auto,w_600/v1786851676/file_00000000b7f481fd9db9c0eb618e907c_bjneja.png",
      "barcode": null,
      "price_new": 600,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 1
    },
    {
      "id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "صحن شاورما عربي",
      "family": "شاورما عربي",
      "option_name": "شاورما عربي",
      "variant": "3سندويشات",
      "variant_clean": "3سندويشات",
      "name": "صحن شاورما عربي 3سندويشات",
      "price": 90000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 2,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851676/file_00000000b7f481fd9db9c0eb618e907c_bjneja.png",
      "barcode": null,
      "price_new": 900,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 2
    },
    {
      "id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "صحن شاورما عربي",
      "family": "شاورما عربي",
      "option_name": "شاورما عربي",
      "variant": "4 سندويشات",
      "variant_clean": "4 سندويشات",
      "name": "صحن شاورما عربي 4 سندويشات",
      "price": 120000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 3,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851676/file_00000000b7f481fd9db9c0eb618e907c_bjneja.png",
      "barcode": null,
      "price_new": 1200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 3
    },
    {
      "id": "206e75a6-66ba-465d-84a1-20a680c39148",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "صحن شاورما عربي",
      "family": "شاورما عربي",
      "option_name": "شاورما عربي",
      "variant": "5 سندويشات",
      "variant_clean": "5 سندويشات",
      "name": "صحن شاورما عربي 5 سندويشات",
      "price": 150000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 4,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851676/file_00000000b7f481fd9db9c0eb618e907c_bjneja.png",
      "barcode": null,
      "price_new": 1500,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 4
    },
    {
      "id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "صحن شاورما عربي",
      "family": "شاورما عربي",
      "option_name": "شاورما عربي",
      "variant": "6 سندويشات",
      "variant_clean": "6 سندويشات",
      "name": "صحن شاورما عربي 6 سندويشات",
      "price": 180000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 5,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851676/file_00000000b7f481fd9db9c0eb618e907c_bjneja.png",
      "barcode": null,
      "price_new": 1800,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 5
    },
    {
      "id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "صحن شاورما عربي",
      "family": "شاورما عربي",
      "option_name": "شاورما عربي",
      "variant": "7 سندويشات",
      "variant_clean": "7 سندويشات",
      "name": "صحن شاورما عربي 7 سندويشات",
      "price": 210000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 6,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851676/file_00000000b7f481fd9db9c0eb618e907c_bjneja.png",
      "barcode": null,
      "price_new": 2100,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 6
    },
    {
      "id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "وجبة شاورما",
      "family": "شاورما",
      "option_name": "شاورما",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "وجبة شاورما عادي",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 7,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851819/1786848341326_va0wmv.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 7
    },
    {
      "id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "وجبة شاورما",
      "family": "شاورما",
      "option_name": "شاورما",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "وجبة شاورما دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 8,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851819/1786848341326_va0wmv.png",
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 8
    },
    {
      "id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "شاورما",
      "family": "شاورما",
      "option_name": "شاورما",
      "variant": "كبير",
      "variant_clean": "كبير",
      "name": "شاورما كبير",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 9,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851819/1786848341326_va0wmv.png",
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 9
    },
    {
      "id": "340b7751-2645-4635-9085-697fe1443253",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "شاورما",
      "family": "شاورما",
      "option_name": "شاورما",
      "variant": "وسط",
      "variant_clean": "وسط",
      "name": "شاورما وسط",
      "price": 25000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 10,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851819/1786848341326_va0wmv.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 10
    },
    {
      "id": "d261b574-02a4-4b36-872f-2f6b90264601",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "شاورما",
      "family": "شاورما",
      "option_name": "شاورما",
      "variant": "صغير",
      "variant_clean": "صغير",
      "name": "شاورما صغير",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 11,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851819/1786848341326_va0wmv.png",
      "barcode": null,
      "price_new": 250,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 11
    },
    {
      "id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "شاورما",
      "family": "شاورما",
      "option_name": "شاورما",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "شاورما سمون",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 12,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851819/1786848341326_va0wmv.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 12
    },
    {
      "id": "56bca255-2bb8-4dbd-9311-37f291269f30",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "شاورما",
      "family": "شاورما",
      "option_name": "شاورما",
      "variant": "خرطوشة",
      "variant_clean": "خرطوشة",
      "name": "شاورما خرطوشة",
      "price": 12000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 13,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851819/1786848341326_va0wmv.png",
      "barcode": null,
      "price_new": 120,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 13
    },
    {
      "id": "b2a37582-a099-4ecb-b526-09e3755c1713",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "شاورما",
      "family": "شاورما",
      "option_name": "شاورما",
      "variant": "بالكيلو",
      "variant_clean": "بالكيلو",
      "name": "شاورما بالكيلو",
      "price": 200000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 14,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851819/1786848341326_va0wmv.png",
      "barcode": null,
      "price_new": 2000,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 14
    },
    {
      "id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "شاورما شراك",
      "family": "شاورما شراك",
      "option_name": "شاورما شراك",
      "variant": "صغير",
      "variant_clean": "صغير",
      "name": "شاورما شراك صغير",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 16,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 16
    },
    {
      "id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "شاورما شراك",
      "family": "شاورما شراك",
      "option_name": "شاورما شراك",
      "variant": "وسط",
      "variant_clean": "وسط",
      "name": "شاورما شراك وسط",
      "price": 25000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 17,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 17
    },
    {
      "id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "شاورما شراك",
      "family": "شاورما شراك",
      "option_name": "شاورما شراك",
      "variant": "كبير",
      "variant_clean": "كبير",
      "name": "شاورما شراك كبير",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 18,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 18
    },
    {
      "id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "وجبة شاورما شراك",
      "family": "شاورما شراك",
      "option_name": "شاورما شراك",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة شاورما شراك",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 19,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 19
    },
    {
      "id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "وجبة شاورما شراك",
      "family": "شاورما شراك",
      "option_name": "شاورما شراك",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "وجبة شاورما شراك دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 20,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 20
    },
    {
      "id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "كريسبي عادي",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 1,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 260,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 1
    },
    {
      "id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "كريسبي سمون",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 2,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 280,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 2
    },
    {
      "id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "كريسبي دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 3,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 3
    },
    {
      "id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "كريسبي سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 4,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 4
    },
    {
      "id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "كريسبي شراك",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 5,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 5
    },
    {
      "id": "6c1296bd-7565-4b54-b289-dd9a7f63ec51",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة تشيدر",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "كريسبي وجبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 6,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 6
    },
    {
      "id": "50ff822d-4142-4daa-864d-3e207f1550eb",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة تشيدر",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "كريسبي وجبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 7,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 7
    },
    {
      "id": "fb1d3d99-37e6-4c39-a1cf-89764ec67374",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "كريسبي وجبنة دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 8,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 8
    },
    {
      "id": "5b8e5bf7-fc59-4d62-b990-ba98c9e97df8",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "كريسبي وجبنة سمون دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 9,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 9
    },
    {
      "id": "bf046416-428f-4b8f-bb0c-95e77934adc2",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "كريسبي وجبنة شراك",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 10,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 10
    },
    {
      "id": "76432160-c0d2-4ef4-b595-623a02e6076f",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة كريسبي سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 11,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 11
    },
    {
      "id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي وجبنة",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة كريسبي وجبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 12,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 12
    },
    {
      "id": "81cf9777-c58d-417b-935e-e0753f20de02",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "عربي",
      "variant_clean": "عربي",
      "name": "وجبة كريسبي عربي",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 13,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 13
    },
    {
      "id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "قطع",
      "variant_clean": "قطع",
      "name": "وجبة كريسبي قطع",
      "price": 75000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 14,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 750,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 14
    },
    {
      "id": "6fc76390-d161-47ef-9888-2a9734af8789",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "طاولة",
      "variant_clean": "طاولة",
      "name": "وجبة كريسبي طاولة",
      "price": 80000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 15,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 800,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 15
    },
    {
      "id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي وجبنة عربي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة كريسبي وجبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 16,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 16
    },
    {
      "id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "مكسيكي عادي",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 20,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851635/1786848811465_nekxng.png",
      "barcode": null,
      "price_new": 260,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 20
    },
    {
      "id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "مكسيكي سمون",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 21,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851635/1786848811465_nekxng.png",
      "barcode": null,
      "price_new": 280,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 21
    },
    {
      "id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "مكسيكي دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 22,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851635/1786848811465_nekxng.png",
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 22
    },
    {
      "id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "مكسيكي سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 23,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 23
    },
    {
      "id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "مكسيكي شراك",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 24,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 24
    },
    {
      "id": "3331df36-3180-4e80-ae61-a6f2fbca679a",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة تشيدر",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "مكسيكي وجبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 25,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 25
    },
    {
      "id": "2d751f9e-fc79-4693-b104-f792f5252da8",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة تشيدر",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "مكسيكي وجبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 26,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 26
    },
    {
      "id": "1c5cef3b-e008-4273-8ace-c2ee219ecfad",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "مكسيكي وجبنة دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 27,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851635/1786848811465_nekxng.png",
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 27
    },
    {
      "id": "004658cc-14f4-4bad-b7e5-19d851ebfbeb",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "مكسيكي وجبنة سمون دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 28,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 28
    },
    {
      "id": "73241ca1-369c-423f-bd9f-4802643fc386",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "مكسيكي وجبنة شراك",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 29,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 29
    },
    {
      "id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة مكسيكي سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 30,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851635/1786848811465_nekxng.png",
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 30
    },
    {
      "id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة مكسيكي وجبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 31,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 31
    },
    {
      "id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة مكسيكي عربي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة مكسيكي عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 32,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 32
    },
    {
      "id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة مكسيكي وجبنة عربي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة مكسيكي وجبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 33,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 33
    },
    {
      "id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر عادي",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 37,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 260,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 37
    },
    {
      "id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر سمون",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 38,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 280,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 38
    },
    {
      "id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "زنجر دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 39,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 39
    },
    {
      "id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "زنجر سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 40,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 40
    },
    {
      "id": "78122d88-a28e-408c-af31-601c0835c5bd",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "زنجر شراك",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 41,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 41
    },
    {
      "id": "141ca984-861e-4c00-af4f-c9e002d6ee32",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة تشيدر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر وجبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 42,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 42
    },
    {
      "id": "1d9c4f7c-870d-4aa1-bc86-d10ea9ba944e",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة تشيدر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر وجبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 43,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 43
    },
    {
      "id": "34cdc32e-f7bb-4852-a17f-536028f8b3c6",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "زنجر وجبنة دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 44,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 44
    },
    {
      "id": "c18ad915-8650-49fe-af6a-807b8c0f1cc6",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "زنجر وجبنة سمون دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 45,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 45
    },
    {
      "id": "5c4fe9bd-4b1d-410b-a344-ec99f92093cd",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "زنجر وجبنة شراك",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 46,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 46
    },
    {
      "id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة زنجر سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 47,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 47
    },
    {
      "id": "72b8d925-6205-4ec7-a532-9298e3c78119",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر وجبنة",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة زنجر وجبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 48,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 48
    },
    {
      "id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "قطع",
      "variant_clean": "قطع",
      "name": "وجبة زنجر قطع",
      "price": 75000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 49,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 750,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 49
    },
    {
      "id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر عربي",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة زنجر عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 50,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 50
    },
    {
      "id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر وجبنة عربي",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة زنجر وجبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 51,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 51
    },
    {
      "id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "فاهيتا عادي",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 55,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851631/1786849028939_z2q4wy.png",
      "barcode": null,
      "price_new": 260,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 55
    },
    {
      "id": "56b462d4-5582-4132-b18a-b8730b8809ab",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "فاهيتا سمون",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 56,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851631/1786849028939_z2q4wy.png",
      "barcode": null,
      "price_new": 280,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 56
    },
    {
      "id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "فاهيتا دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 57,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851631/1786849028939_z2q4wy.png",
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 57
    },
    {
      "id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "فاهيتا سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 58,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 58
    },
    {
      "id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "فاهيتا شراك",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 59,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 59
    },
    {
      "id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة فاهيتا سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 60,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851631/1786849028939_z2q4wy.png",
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 60
    },
    {
      "id": "687faedb-241f-4b71-b35f-5370b38ba798",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة فاهيتا عربي",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة فاهيتا عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 61,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 61
    },
    {
      "id": "b377a33e-61d1-4fd6-8900-e436e79e9d7b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "برغر جبنة",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "برغر جبنة عادي",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 64,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851603/1786849110463_ecddfw.png",
      "barcode": null,
      "price_new": 280,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 64
    },
    {
      "id": "ebed9d49-e023-4a4a-a84d-53e295994bec",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "برغر بيض",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "برغر بيض عادي",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 65,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851603/1786849110463_ecddfw.png",
      "barcode": null,
      "price_new": 280,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 65
    },
    {
      "id": "30828f36-3bac-4d00-a8a1-038463507198",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "برغر بيض وجبنة",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "برغر بيض وجبنة عادي",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 66,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851603/1786849110463_ecddfw.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 66
    },
    {
      "id": "97a09273-432c-4698-87e0-f579945f0cb7",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "برغر دجاج",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "برغر دجاج عادي",
      "price": 27000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 67,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851603/1786849110463_ecddfw.png",
      "barcode": null,
      "price_new": 270,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 67
    },
    {
      "id": "76fb4ad7-70f9-4b5b-8349-325ee9524421",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "برغر",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "برغر عادي",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 68,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851603/1786849110463_ecddfw.png",
      "barcode": null,
      "price_new": 280,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 68
    },
    {
      "id": "94e48a79-cfea-4956-a99d-7c601a7202ff",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "برغر",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "برغر دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 69,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851603/1786849110463_ecddfw.png",
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 69
    },
    {
      "id": "6edadfe5-8cea-44a5-951a-4d911aee7083",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي برغر",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "كريسبي برغر عادي",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 73,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 73
    },
    {
      "id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة برغر دجاج",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "وجبة برغر دجاج عادي",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 70,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851603/1786849110463_ecddfw.png",
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 70
    },
    {
      "id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "سكالوب عادي",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 77,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 260,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 77
    },
    {
      "id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "سكالوب سمون",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 78,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 280,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 78
    },
    {
      "id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "سكالوب دبل",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 79,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 79
    },
    {
      "id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "سكالوب سمون دبل",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 80,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 80
    },
    {
      "id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "سكالوب شراك",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 81,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 81
    },
    {
      "id": "547aaf5a-8b8b-43b2-8533-f587a14063ab",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة تشيدر",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "سكالوب وجبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 82,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 82
    },
    {
      "id": "f2c641ba-c482-4374-a1e5-5af052818f2d",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة تشيدر",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "سكالوب وجبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 83,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 83
    },
    {
      "id": "cfa4523d-af83-4468-9975-1711293ec8b6",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "سكالوب وجبنة دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 84,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 84
    },
    {
      "id": "e18e45ba-a894-463a-a2d6-99f4777dcf32",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "سكالوب وجبنة سمون دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 85,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 85
    },
    {
      "id": "f5928837-b481-4c73-9da5-4dc6f1b2af2c",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "سكالوب وجبنة شراك",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 86,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 86
    },
    {
      "id": "baec0b76-987e-4397-999c-37f1efc09302",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة سكالوب سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 87,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 87
    },
    {
      "id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سكالوب وجبنة",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة سكالوب وجبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 88,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 88
    },
    {
      "id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "قطع",
      "variant_clean": "قطع",
      "name": "وجبة سكالوب قطع",
      "price": 75000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 89,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 89
    },
    {
      "id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سكالوب عربي",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة سكالوب عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 90,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 90
    },
    {
      "id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سكالوب وجبنة عربي",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة سكالوب وجبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 91,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 91
    },
    {
      "id": "2804b934-14d2-49b8-a686-c50517bded98",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "شيش عادي",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 95,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 260,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 95
    },
    {
      "id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "شيش سمون",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 96,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 280,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 96
    },
    {
      "id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "شيش دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 97,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 97
    },
    {
      "id": "89e26048-c58c-47b1-8429-488901fc64a4",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "شيش سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 98,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 98
    },
    {
      "id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "شيش شراك",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 99,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 99
    },
    {
      "id": "a626725f-6033-4436-97be-90db615651b1",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة تشيدر",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "شيش مع جبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 100,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 100
    },
    {
      "id": "dc5ed328-1921-49fa-a90e-8d25ae651cb4",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة تشيدر",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "شيش مع جبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 101,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 101
    },
    {
      "id": "5d815330-9cff-4b06-8601-6e9f798dbb4b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "شيش مع جبنة دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 102,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 102
    },
    {
      "id": "cd20538c-d1c7-4c5e-ae3b-72fd32bbc7b5",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "شيش مع جبنة سمون دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 103,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 103
    },
    {
      "id": "b4f97451-546c-4617-ba5c-ed6a60a431b0",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "شيش مع جبنة شراك",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 104,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 104
    },
    {
      "id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة شيش مع جبنة",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة شيش مع جبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 105,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 105
    },
    {
      "id": "de16917f-07c3-48b9-8127-f48450b915fe",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "عربي",
      "variant_clean": "عربي",
      "name": "وجبة شيش عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 106,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 106
    },
    {
      "id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سياخ",
      "variant_clean": "سياخ",
      "name": "وجبة شيش سياخ",
      "price": 75000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 107,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 750,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 107
    },
    {
      "id": "319436a6-da45-4a5c-997c-b79191b1c21d",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة شيش مع جبنة عربي",
      "family": "شيش",
      "option_name": "شيش",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة شيش مع جبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 108,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 108
    },
    {
      "id": "4e750558-e273-44cd-a007-0fd366a31afa",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سوبريم",
      "family": "سوبريم",
      "option_name": "سوبريم",
      "variant": "٣ قطع",
      "variant_clean": "٣ قطع",
      "name": "وجبة سوبريم ٣ قطع",
      "price": 0,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 112,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 112
    },
    {
      "id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سوبريم",
      "family": "سوبريم",
      "option_name": "سوبريم",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "سوبريم عادي",
      "price": 0,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 113,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 113
    },
    {
      "id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سوبريم",
      "family": "سوبريم",
      "option_name": "سوبريم",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "سوبريم دبل",
      "price": 0,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 114,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 114
    },
    {
      "id": "c114d178-fab3-42ca-a014-8520c2b50601",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سوبريم",
      "family": "سوبريم",
      "option_name": "سوبريم",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "سوبريم سمون",
      "price": 0,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 115,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 115
    },
    {
      "id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سوبريم",
      "family": "سوبريم",
      "option_name": "سوبريم",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة سوبريم سمون",
      "price": 0,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 116,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 116
    },
    {
      "id": "630bcaa1-cc28-4d54-afe9-39753c772044",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر مكسيكي عادي",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 118,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 118
    },
    {
      "id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر مكسيكي سمون",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 119,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 119
    },
    {
      "id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "زنجر مكسيكي دبل",
      "price": 38000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 120,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 120
    },
    {
      "id": "48942aa3-7dc3-463b-9641-215d827db190",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "زنجر مكسيكي سمون دبل",
      "price": 38000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 121,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 121
    },
    {
      "id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "زنجر مكسيكي شراك",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 122,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 122
    },
    {
      "id": "bfd844ba-2b4c-4077-902a-83e054baa864",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة تشيدر",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر مكسيكي وجبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 123,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 123
    },
    {
      "id": "eb1b3c13-e647-49fa-a544-c67f4870679d",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة تشيدر",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر مكسيكي وجبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 124,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 124
    },
    {
      "id": "cc586903-ddec-45ec-904c-6de6877bb9e1",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "زنجر مكسيكي وجبنة دبل",
      "price": 42000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 125,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 125
    },
    {
      "id": "ff8bc8c1-dc12-44b1-8cc7-e2e2c9dbd9a9",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "زنجر مكسيكي وجبنة سمون دبل",
      "price": 42000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 126,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 126
    },
    {
      "id": "9e2da0e1-9cd8-44a6-a0e7-7ec4c1f5b60c",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "زنجر مكسيكي وجبنة شراك",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 127,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 127
    },
    {
      "id": "7df83160-116b-4413-97d1-81990495bfc9",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة زنجر مكسيكي وجبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 128,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 128
    },
    {
      "id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "عربي",
      "variant_clean": "عربي",
      "name": "وجبة زنجر مكسيكي عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 129,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 129
    },
    {
      "id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر مكسيكي وجبنة عربي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة زنجر مكسيكي وجبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 130,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 130
    },
    {
      "id": "ae04b651-bd96-4785-b0ef-539380d2b488",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي برغر",
      "family": "كريسبي برغر",
      "option_name": "كريسبي برغر",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "كريسبي برغر دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 74,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 74
    },
    {
      "id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي برغر",
      "family": "برغر",
      "option_name": "برغر",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة كريسبي برغر",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 75,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 75
    },
    {
      "id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي برغر",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "وجبة كريسبي برغر دبل",
      "price": 50000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 76,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 76
    },
    {
      "id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة برغر لحم",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "وجبة برغر لحم دبل",
      "price": 50000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 72,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 72
    },
    {
      "id": "47a7f7df-bc7d-4a5d-beae-5024c5c09525",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا",
      "family": "بطاطا",
      "option_name": "بطاطا",
      "variant": "صحن 15000",
      "variant_clean": "صحن 15000",
      "name": "بطاطا صحن 15000",
      "price": 15000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 1,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 1
    },
    {
      "id": "f9326488-cd6a-4772-90f8-84211014a47f",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا",
      "family": "بطاطا",
      "option_name": "بطاطا",
      "variant": "صحن 20000",
      "variant_clean": "صحن 20000",
      "name": "بطاطا صحن 20000",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 2,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 2
    },
    {
      "id": "8c480e60-8121-4f24-a13f-dc4ea3ee81ff",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا",
      "family": "بطاطا",
      "option_name": "بطاطا",
      "variant": "صحن - صغير",
      "variant_clean": "صحن - صغير",
      "name": "بطاطا صحن - صغير",
      "price": 25000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 3,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851717/1786849663233_cm9ksm.png",
      "barcode": null,
      "price_new": 200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 3
    },
    {
      "id": "e9031007-2158-4e41-9b1b-fe7095124a8c",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا",
      "family": "بطاطا",
      "option_name": "بطاطا",
      "variant": "صحن - كبير",
      "variant_clean": "صحن - كبير",
      "name": "بطاطا صحن - كبير",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 4,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851717/1786849663233_cm9ksm.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 4
    },
    {
      "id": "90c8e9dc-b35b-4424-8fad-99f135bbedaa",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا",
      "family": "بطاطا",
      "option_name": "بطاطا",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "بطاطا دبل",
      "price": 16000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 5,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 150,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 5
    },
    {
      "id": "0fbba7da-9766-4567-9ecd-9e1d1499332b",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا",
      "family": "بطاطا",
      "option_name": "بطاطا",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "بطاطا عادي",
      "price": 12000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 6,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 110,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 6
    },
    {
      "id": "55d1f6de-7ef5-4d6b-ae0d-27d58be05931",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا",
      "family": "بطاطا",
      "option_name": "بطاطا",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "بطاطا سمون",
      "price": 15000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 7,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 140,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 7
    },
    {
      "id": "b2f50578-a479-4f9b-a373-e91b31fd7429",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا",
      "family": "بطاطا",
      "option_name": "بطاطا",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "بطاطا سمون دبل",
      "price": 17000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 8,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 150,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 8
    },
    {
      "id": "cadc6a9f-559d-4005-b045-7f440b0961a9",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا وجبنة",
      "family": "بطاطا وجبنة",
      "option_name": "بطاطا وجبنة",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "بطاطا وجبنة عادي",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 9,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 180,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 9
    },
    {
      "id": "de9ce839-ca5f-40d9-8c39-0423251b827e",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا وجبنة",
      "family": "بطاطا وجبنة",
      "option_name": "بطاطا وجبنة",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "بطاطا وجبنة سمون",
      "price": 22000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 10,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 10
    },
    {
      "id": "dba8cfb2-9ff3-4a2f-9894-c4a677bdb517",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا وجبنة",
      "family": "بطاطا وجبنة",
      "option_name": "بطاطا وجبنة",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "بطاطا وجبنة دبل",
      "price": 25000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 11,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 250,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 11
    },
    {
      "id": "bfee5c3f-199d-4f02-a3d6-3d85ba685684",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا ومرتديلا",
      "family": "بطاطا ومرتديلا",
      "option_name": "بطاطا ومرتديلا",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "بطاطا ومرتديلا عادي",
      "price": 15000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 12,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 140,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 12
    },
    {
      "id": "32fc1c74-d95d-445a-999c-3fc3c1eeed96",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا ومرتديلا",
      "family": "بطاطا ومرتديلا",
      "option_name": "بطاطا ومرتديلا",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "بطاطا ومرتديلا سمون",
      "price": 17000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 13,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 13
    },
    {
      "id": "aeb23c9a-5173-402e-af2f-41c7ef35ca25",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "مرتديلا",
      "family": "مرتديلا",
      "option_name": "مرتديلا",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "مرتديلا عادي",
      "price": 13000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 14,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 130,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 14
    },
    {
      "id": "b07a5c86-5934-45f9-ae6d-0e61c3796f4e",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "مرتديلا",
      "family": "مرتديلا",
      "option_name": "مرتديلا",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "مرتديلا سمون",
      "price": 15000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 15,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 150,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 15
    },
    {
      "id": "5d557dac-28b8-4f0a-a3ad-226dc15b7049",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "مرتديلا",
      "family": "مرتديلا",
      "option_name": "مرتديلا",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "مرتديلا دبل",
      "price": 18000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 16,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 180,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 16
    },
    {
      "id": "a96a80b2-4e26-44f9-bce9-ee4de825c697",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "جبنة",
      "family": "جبنة",
      "option_name": "جبنة",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "جبنة عادي",
      "price": 15000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 17,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851692/1786849425519_zkfzfi.png",
      "barcode": null,
      "price_new": 150,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 17
    },
    {
      "id": "52f35a84-ce80-4b0c-a44c-6168b1219622",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "جبنة",
      "family": "جبنة",
      "option_name": "جبنة",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "جبنة سمون",
      "price": 15000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 18,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851692/1786849425519_zkfzfi.png",
      "barcode": null,
      "price_new": 150,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 18
    },
    {
      "id": "3658cccd-c6d6-4be5-964f-871c64bad4b7",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "سودة",
      "family": "سودة",
      "option_name": "سودة",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "سودة عادي",
      "price": 26000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 19,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851610/1786849182593_thyga6.png",
      "barcode": null,
      "price_new": 260,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 19
    },
    {
      "id": "a0af045d-cd98-42cd-867f-2c78aa4d8a2e",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "سودة",
      "family": "سودة",
      "option_name": "سودة",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "سودة سمون",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 20,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851610/1786849182593_thyga6.png",
      "barcode": null,
      "price_new": 280,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 20
    },
    {
      "id": "3514f3e3-29ff-4390-9f5b-4f8d52154580",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "سودة",
      "family": "سودة",
      "option_name": "سودة",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "سودة سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 21,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851610/1786849182593_thyga6.png",
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 21
    },
    {
      "id": "58823e01-b906-4bc2-b678-d9e208443f94",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا شراك",
      "family": "بطاطا شراك",
      "option_name": "بطاطا شراك",
      "variant": null,
      "variant_clean": null,
      "name": "بطاطا شراك",
      "price": 12000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 22,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 22
    },
    {
      "id": "c354e482-94cb-41b7-815e-48a63842dc7b",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "بطاطا ومرتديلا",
      "family": "بطاطا ومرتديلا",
      "option_name": "بطاطا ومرتديلا",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "بطاطا ومرتديلا دبل",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 23,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 23
    },
    {
      "id": "8b8b4f58-644a-4fdb-a892-784099deae4b",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "مرتديلا وجبنة",
      "family": "مرتديلا وجبنة",
      "option_name": "مرتديلا وجبنة",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "مرتديلا وجبنة عادي",
      "price": 17000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 24,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 24
    },
    {
      "id": "a41298fd-970c-4a27-8b29-4f02aabe5dbe",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "مرتديلا وجبنة",
      "family": "مرتديلا وجبنة",
      "option_name": "مرتديلا وجبنة",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "مرتديلا وجبنة سمون",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 25,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 25
    },
    {
      "id": "0dc5d933-25a3-4b72-ba70-ad5abdc4950b",
      "category_id": "7e8f9ae0-a3c5-4a47-8a24-f06c7c77e34c",
      "category_name": "بطاطا",
      "base_name": "سودة",
      "family": "سودة",
      "option_name": "سودة",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "سودة دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 26,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 3,
      "item_order": 26
    },
    {
      "id": "1ed629ff-844a-433a-960e-0fab9bb71934",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "فروج بروستد",
      "family": "بروستد",
      "option_name": "بروستد",
      "variant": "بروستد",
      "variant_clean": "بروستد",
      "name": "فروج بروستد",
      "price": 145000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 1,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851631/1786848629859_b1oo1f.png",
      "barcode": null,
      "price_new": 1450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 1
    },
    {
      "id": "e829859d-2397-45f4-81a3-48290ef9650f",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "نص فروج بروستد",
      "family": "بروستد",
      "option_name": "بروستد",
      "variant": null,
      "variant_clean": null,
      "name": "نص فروج بروستد",
      "price": 80000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 2,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851631/1786848629859_b1oo1f.png",
      "barcode": null,
      "price_new": 800,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 2
    },
    {
      "id": "12b34a0b-f7b8-445b-8ecf-cebabeec4a26",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "فروج بروستد طاولة",
      "family": "بروستد",
      "option_name": "بروستد",
      "variant": null,
      "variant_clean": null,
      "name": "فروج بروستد طاولة",
      "price": 160000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 3,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851631/1786848629859_b1oo1f.png",
      "barcode": null,
      "price_new": 1600,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 3
    },
    {
      "id": "5478fbb0-5cdb-4aa6-89c5-41a89873cb78",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "فروج ونص بروستد",
      "family": "بروستد",
      "option_name": "بروستد",
      "variant": null,
      "variant_clean": null,
      "name": "فروج ونص بروستد",
      "price": 225000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 4,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 4
    },
    {
      "id": "e6481b4b-87c3-4079-a995-7edac7f3861e",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "نص فروج بروستد طاولة",
      "family": "بروستد",
      "option_name": "بروستد",
      "variant": null,
      "variant_clean": null,
      "name": "نص فروج بروستد طاولة",
      "price": 90000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 4,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851631/1786848629859_b1oo1f.png",
      "barcode": null,
      "price_new": 900,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 4
    },
    {
      "id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "وجبة بروستد",
      "family": "بروستد",
      "option_name": "بروستد",
      "variant": "دبوس",
      "variant_clean": "دبوس",
      "name": "وجبة بروستد دبوس",
      "price": 75000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 5,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851631/1786848629859_b1oo1f.png",
      "barcode": null,
      "price_new": 750,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 5
    },
    {
      "id": "31a84b92-7ec3-4292-8eb4-8070e1f97f11",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "وجبة بروستد",
      "family": "بروستد",
      "option_name": "بروستد",
      "variant": "جناح",
      "variant_clean": "جناح",
      "name": "وجبة بروستد جناح",
      "price": 55000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 6,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851631/1786848629859_b1oo1f.png",
      "barcode": null,
      "price_new": 550,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 6
    },
    {
      "id": "a8412360-38e8-4c19-9606-2e632a728192",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "سمك",
      "family": "سمك",
      "option_name": "سمك",
      "variant": "كيلو",
      "variant_clean": "كيلو",
      "name": "سمك كيلو",
      "price": 120000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 7,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851657/1786848709364_op5lwx.png",
      "barcode": null,
      "price_new": 1100,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 7
    },
    {
      "id": "0224bcf2-716c-44a8-b22a-c9d7fc36cdd3",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "وجبة سمك",
      "family": "سمك",
      "option_name": "سمك",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة سمك",
      "price": 50000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 8,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851657/1786848709364_op5lwx.png",
      "barcode": null,
      "price_new": 500,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 8
    },
    {
      "id": "747b1420-93cc-4559-88e2-b9ce4c0a8204",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "دجاج",
      "family": "دجاج",
      "option_name": "دجاج",
      "variant": "مشوي - دجاجة كاملة",
      "variant_clean": "مشوي - دجاجة كاملة",
      "name": "دجاج مشوي - دجاجة كاملة",
      "price": 100000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 9,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851649/1786849258602_iqsvtb.png",
      "barcode": null,
      "price_new": 1000,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 9
    },
    {
      "id": "a728baba-79f6-42fc-89ef-c5416f31eb22",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "وجبة سمك طاولة",
      "family": "وجبة سمك طاولة",
      "option_name": "وجبة سمك طاولة",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة سمك طاولة",
      "price": 50000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 10,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 10
    },
    {
      "id": "096f721b-87d5-4ec2-9804-eab85c1c9182",
      "category_id": "f3bd4a27-5d75-45a3-beaf-1c27ec3cbafd",
      "category_name": "البروستد والمشوي",
      "base_name": "كيلو سمك طاولة",
      "family": "كيلو سمك طاولة",
      "option_name": "كيلو سمك طاولة",
      "variant": null,
      "variant_clean": null,
      "name": "كيلو سمك طاولة",
      "price": 120000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 11,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 4,
      "item_order": 11
    },
    {
      "id": "09ce9a1d-f7d5-44e4-a30a-af96c8a71e05",
      "category_id": "fa5608ff-c163-43d6-8276-f695645e74d3",
      "category_name": "البيتزا",
      "base_name": "بيتزا",
      "family": "بيتزا",
      "option_name": "بيتزا",
      "variant": "صغير",
      "variant_clean": "صغير",
      "name": "بيتزا صغير",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 1,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851690/1786849819107_thljtx.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 5,
      "item_order": 1
    },
    {
      "id": "9f1e7f4a-efb4-4829-b8b0-ea7926e910db",
      "category_id": "fa5608ff-c163-43d6-8276-f695645e74d3",
      "category_name": "البيتزا",
      "base_name": "بيتزا",
      "family": "بيتزا",
      "option_name": "بيتزا",
      "variant": "وسط",
      "variant_clean": "وسط",
      "name": "بيتزا وسط",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 2,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851690/1786849819107_thljtx.png",
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 5,
      "item_order": 2
    },
    {
      "id": "5a13fb02-3173-45a0-a2ca-8d4cb3385acf",
      "category_id": "fa5608ff-c163-43d6-8276-f695645e74d3",
      "category_name": "البيتزا",
      "base_name": "بيتزا",
      "family": "بيتزا",
      "option_name": "بيتزا",
      "variant": "كبير",
      "variant_clean": "كبير",
      "name": "بيتزا كبير",
      "price": 60000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 3,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851690/1786849819107_thljtx.png",
      "barcode": null,
      "price_new": 600,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 5,
      "item_order": 3
    },
    {
      "id": "806a0bf8-24ed-4959-a465-73e3d806c4a0",
      "category_id": "fa5608ff-c163-43d6-8276-f695645e74d3",
      "category_name": "البيتزا",
      "base_name": "بيتزا",
      "family": "بيتزا",
      "option_name": "بيتزا",
      "variant": "عائلي",
      "variant_clean": "عائلي",
      "name": "بيتزا عائلي",
      "price": 80000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 4,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851690/1786849819107_thljtx.png",
      "barcode": null,
      "price_new": 800,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 5,
      "item_order": 4
    },
    {
      "id": "b99c7243-ac9f-4cd3-9f95-76bd2c3eb5a8",
      "category_id": "b51bb297-85e3-4837-b2b1-7c3c275f7dfc",
      "category_name": "المقبلات والإضافات",
      "base_name": "سلطة سويسرية",
      "family": "سلطة سويسرية",
      "option_name": "سلطة سويسرية",
      "variant": "صحن",
      "variant_clean": "صحن",
      "name": "سلطة سويسرية صحن",
      "price": 10000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 1,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851659/1786849918621_kgl04b.png",
      "barcode": null,
      "price_new": 100,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 6,
      "item_order": 1
    },
    {
      "id": "c9e94b16-2733-4a2b-8db7-5dbb150b7978",
      "category_id": "b51bb297-85e3-4837-b2b1-7c3c275f7dfc",
      "category_name": "المقبلات والإضافات",
      "base_name": "كتشب",
      "family": "كتشب",
      "option_name": "كتشب",
      "variant": "علبة",
      "variant_clean": "علبة",
      "name": "كتشب علبة",
      "price": 2000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 2,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851677/1786850099642_jh6p7i.png",
      "barcode": null,
      "price_new": 20,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 6,
      "item_order": 2
    },
    {
      "id": "ac721cd9-eadb-457c-88bd-e689e39a4bb6",
      "category_id": "b51bb297-85e3-4837-b2b1-7c3c275f7dfc",
      "category_name": "المقبلات والإضافات",
      "base_name": "مايونيز",
      "family": "مايونيز",
      "option_name": "مايونيز",
      "variant": "علبة",
      "variant_clean": "علبة",
      "name": "مايونيز علبة",
      "price": 5000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 3,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851685/1786850151922_ls27fa.png",
      "barcode": null,
      "price_new": 50,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 6,
      "item_order": 3
    },
    {
      "id": "22f29add-6db2-448b-92e6-b3c6aaa43228",
      "category_id": "b51bb297-85e3-4837-b2b1-7c3c275f7dfc",
      "category_name": "المقبلات والإضافات",
      "base_name": "مخلل",
      "family": "مخلل",
      "option_name": "مخلل",
      "variant": "سرفيس",
      "variant_clean": "سرفيس",
      "name": "مخلل سرفيس",
      "price": 5000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 4,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851736/1786850275324_oszk6f.png",
      "barcode": null,
      "price_new": 50,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 6,
      "item_order": 4
    },
    {
      "id": "71340958-9418-4ce8-a5aa-f35dfc16eeaa",
      "category_id": "b51bb297-85e3-4837-b2b1-7c3c275f7dfc",
      "category_name": "المقبلات والإضافات",
      "base_name": "صوص جبنة",
      "family": "صوص جبنة",
      "option_name": "صوص جبنة",
      "variant": "علبة",
      "variant_clean": "علبة",
      "name": "صوص جبنة علبة",
      "price": 2000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 5,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851742/1786850376248_liyxid.png",
      "barcode": null,
      "price_new": 20,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 6,
      "item_order": 5
    },
    {
      "id": "c74d0d15-6195-405b-86f2-e2421e3d06b6",
      "category_id": "b51bb297-85e3-4837-b2b1-7c3c275f7dfc",
      "category_name": "المقبلات والإضافات",
      "base_name": "صوص",
      "family": "صوص",
      "option_name": "صوص",
      "variant": "علبة",
      "variant_clean": "علبة",
      "name": "صوص علبة",
      "price": 2000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 6,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786854186/1786854070742_zfxsiz.png",
      "barcode": null,
      "price_new": 20,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 6,
      "item_order": 6
    },
    {
      "id": "7abe85fc-9329-4a6a-b723-09fbdd96e841",
      "category_id": "b51bb297-85e3-4837-b2b1-7c3c275f7dfc",
      "category_name": "المقبلات والإضافات",
      "base_name": "خبز",
      "family": "خبز",
      "option_name": "خبز",
      "variant": "ربطة",
      "variant_clean": "ربطة",
      "name": "خبز ربطة",
      "price": 15000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 7,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851746/1786850529375_cipoa5.png",
      "barcode": null,
      "price_new": 130,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 6,
      "item_order": 7
    },
    {
      "id": "f6ccf1de-6077-47c8-a194-21f3819422af",
      "category_id": "b51bb297-85e3-4837-b2b1-7c3c275f7dfc",
      "category_name": "المقبلات والإضافات",
      "base_name": "صوص حار",
      "family": "صوص",
      "option_name": "صوص",
      "variant": null,
      "variant_clean": null,
      "name": "صوص حار",
      "price": 2000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 8,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 6,
      "item_order": 8
    },
    {
      "id": "75bf936e-00b1-4e23-95ec-1cd42ae5900d",
      "category_id": "b51bb297-85e3-4837-b2b1-7c3c275f7dfc",
      "category_name": "المقبلات والإضافات",
      "base_name": "باربيكيو",
      "family": "باربكيو",
      "option_name": "باربكيو",
      "variant": null,
      "variant_clean": null,
      "name": "باربيكيو",
      "price": 2000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 9,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 6,
      "item_order": 9
    },
    {
      "id": "effe0906-eb8a-4e4a-9119-95fb127f0dba",
      "category_id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "category_name": "العصائر والكوكتيلات",
      "base_name": "كوكتيل",
      "family": "عصير",
      "option_name": "عصير",
      "variant": "حليب وموز",
      "variant_clean": "حليب وموز",
      "name": "كوكتيل حليب وموز",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 1,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851786/1786850604304_r2licw.png",
      "barcode": null,
      "price_new": 200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 7,
      "item_order": 1
    },
    {
      "id": "40e4fb81-c147-4b39-bf4e-553a67ea4cac",
      "category_id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "category_name": "العصائر والكوكتيلات",
      "base_name": "كوكتيل",
      "family": "عصير",
      "option_name": "عصير",
      "variant": "فريز",
      "variant_clean": "فريز",
      "name": "كوكتيل فريز",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 2,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851786/1786850604304_r2licw.png",
      "barcode": null,
      "price_new": 200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 7,
      "item_order": 2
    },
    {
      "id": "cc2a9173-c278-406a-9478-708d0aa32e44",
      "category_id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "category_name": "العصائر والكوكتيلات",
      "base_name": "كوكتيل",
      "family": "عصير",
      "option_name": "عصير",
      "variant": "فواكه",
      "variant_clean": "فواكه",
      "name": "كوكتيل فواكه",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 3,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851786/1786850604304_r2licw.png",
      "barcode": null,
      "price_new": 200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 7,
      "item_order": 3
    },
    {
      "id": "680d011c-0aff-4b87-bcf9-72e6d36f9662",
      "category_id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "category_name": "العصائر والكوكتيلات",
      "base_name": "كوكتيل",
      "family": "عصير",
      "option_name": "عصير",
      "variant": "حليب وفريز",
      "variant_clean": "حليب وفريز",
      "name": "كوكتيل حليب وفريز",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 4,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851786/1786850604304_r2licw.png",
      "barcode": null,
      "price_new": 200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 7,
      "item_order": 4
    },
    {
      "id": "e069e9ba-3811-4223-a7c5-87792a9771e1",
      "category_id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "category_name": "العصائر والكوكتيلات",
      "base_name": "كوكتيل",
      "family": "عصير",
      "option_name": "عصير",
      "variant": "افوكادو",
      "variant_clean": "افوكادو",
      "name": "كوكتيل افوكادو",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 5,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851786/1786850604304_r2licw.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 7,
      "item_order": 5
    },
    {
      "id": "72039205-3843-424b-970b-651be0c5704d",
      "category_id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "category_name": "العصائر والكوكتيلات",
      "base_name": "كوكتيل",
      "family": "عصير",
      "option_name": "عصير",
      "variant": "توت",
      "variant_clean": "توت",
      "name": "كوكتيل توت",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 6,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851786/1786850604304_r2licw.png",
      "barcode": null,
      "price_new": 200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 7,
      "item_order": 6
    },
    {
      "id": "a78c049a-0784-496b-b384-28629255c530",
      "category_id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "category_name": "العصائر والكوكتيلات",
      "base_name": "كوكتيل",
      "family": "عصير",
      "option_name": "عصير",
      "variant": "موز وحليب وفريز",
      "variant_clean": "موز وحليب وفريز",
      "name": "كوكتيل موز وحليب وفريز",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 7,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851786/1786850604304_r2licw.png",
      "barcode": null,
      "price_new": 200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 7,
      "item_order": 7
    },
    {
      "id": "ee8a3049-6f80-417b-b7e3-1a87df75ea33",
      "category_id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "category_name": "العصائر والكوكتيلات",
      "base_name": "كوكتيل",
      "family": "عصير",
      "option_name": "عصير",
      "variant": "برتقال",
      "variant_clean": "برتقال",
      "name": "كوكتيل برتقال",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 8,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851786/1786850604304_r2licw.png",
      "barcode": null,
      "price_new": 200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 7,
      "item_order": 8
    },
    {
      "id": "08ad4a2e-fb74-4833-aed0-3e4a08220410",
      "category_id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "category_name": "العصائر والكوكتيلات",
      "base_name": "كوكتيل",
      "family": "عصير",
      "option_name": "عصير",
      "variant": "منغا",
      "variant_clean": "منغا",
      "name": "كوكتيل منغا",
      "price": 20000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 9,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851786/1786850604304_r2licw.png",
      "barcode": null,
      "price_new": 200,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 7,
      "item_order": 9
    },
    {
      "id": "1c392083-c134-4d9e-9f40-433bdf37318c",
      "category_id": "468505c1-be21-4cd3-a9da-d3c06d38611b",
      "category_name": "العصائر والكوكتيلات",
      "base_name": "كوكتيل",
      "family": "عصير",
      "option_name": "عصير",
      "variant": "لتر ونصف",
      "variant_clean": "لتر ونصف",
      "name": "كوكتيل لتر ونصف",
      "price": 85000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 10,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851786/1786850604304_r2licw.png",
      "barcode": null,
      "price_new": 850,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 7,
      "item_order": 10
    },
    {
      "id": "f5a1a4ae-1e92-444d-97bf-dc97c9b2d1e1",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "بيبسي",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "عائلي",
      "variant_clean": "عائلي",
      "name": "بيبسي عائلي",
      "price": 18000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 1,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851771/1786850975672_aj1hs6.png",
      "barcode": null,
      "price_new": 180,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 1
    },
    {
      "id": "a5fc42fd-7270-4e62-9bb7-023adb4588c6",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "بيبسي",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "لتر",
      "variant_clean": "لتر",
      "name": "بيبسي لتر",
      "price": 11000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 2,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851771/1786850975672_aj1hs6.png",
      "barcode": null,
      "price_new": 110,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 2
    },
    {
      "id": "02abc517-de76-43d5-a90c-9b4731afb743",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "بيبسي",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "تنك",
      "variant_clean": "تنك",
      "name": "بيبسي تنك",
      "price": 8000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 3,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851771/1786850975672_aj1hs6.png",
      "barcode": null,
      "price_new": 80,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 3
    },
    {
      "id": "01a45bdc-61ce-4a4c-99f1-f566a54fa4d1",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "سفن",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "عائلي",
      "variant_clean": "عائلي",
      "name": "سفن عائلي",
      "price": 18000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 4,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851771/1786850975672_aj1hs6.png",
      "barcode": null,
      "price_new": 180,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 4
    },
    {
      "id": "0ecd3a39-6244-459c-a003-3d99a2d8170b",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "سفن",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "لتر",
      "variant_clean": "لتر",
      "name": "سفن لتر",
      "price": 11000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 5,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851771/1786850975672_aj1hs6.png",
      "barcode": null,
      "price_new": 110,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 5
    },
    {
      "id": "6fed7549-8a71-47d2-be50-76b251664be2",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "سفن",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "تنك",
      "variant_clean": "تنك",
      "name": "سفن تنك",
      "price": 8000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 6,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851771/1786850975672_aj1hs6.png",
      "barcode": null,
      "price_new": 80,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 6
    },
    {
      "id": "d27dfacb-6858-42a0-b509-20e329aa59ec",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "base_name": "عيران",
      "name": "عيران",
      "price": 5000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 7,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/v1786851771/1786850975672_aj1hs6.png",
      "barcode": null,
      "price_new": 50,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 7
    },
    {
      "id": "f334745a-adcc-4f84-ac45-0339d3e1ff58",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "مكسي",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "جوال",
      "variant_clean": "جوال",
      "name": "مكسي جوال",
      "price": 5000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 8,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851771/1786850975672_aj1hs6.png",
      "barcode": null,
      "price_new": 50,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 8
    },
    {
      "id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "كريسبي شراك دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 17,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 17
    },
    {
      "id": "942ef54b-78c0-5694-b04c-b74c34097839",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "كريسبي وجبنة شراك دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 18,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 18
    },
    {
      "id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "مكسيكي شراك دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 34,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 34
    },
    {
      "id": "0f4d7634-6aa5-5c68-ba6c-02734a4d31b9",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "مكسيكي وجبنة شراك دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 35,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 35
    },
    {
      "id": "41c32d3d-8824-53bc-960a-a214f7e75361",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "زنجر شراك دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 52,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 52
    },
    {
      "id": "0b6b153f-ee5a-5f82-8d5e-8b57d184976b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "زنجر وجبنة شراك دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 53,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 53
    },
    {
      "id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "فاهيتا شراك دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 62,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 62
    },
    {
      "id": "536342e0-5590-5447-ba42-503e71390c56",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "سكالوب شراك دبل",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 92,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 92
    },
    {
      "id": "ecb49390-e4e5-51f8-bdcb-20cdb0cff5b7",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "سكالوب وجبنة شراك دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 93,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 93
    },
    {
      "id": "3a904ed5-851d-5334-8508-4a48de843258",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "شيش شراك دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 109,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 109
    },
    {
      "id": "79c845fb-dd10-5d4a-8139-7d67a53a9aab",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "شيش مع جبنة شراك دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 110,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 110
    },
    {
      "id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "زنجر مكسيكي شراك دبل",
      "price": 38000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 131,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 131
    },
    {
      "id": "74a98a9f-c576-5f96-99c9-d6543da31e13",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "زنجر مكسيكي وجبنة شراك دبل",
      "price": 42000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 132,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 132
    },
    {
      "id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "وجبة شاورما",
      "family": "شاورما",
      "option_name": "شاورما",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة شاورما إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 22,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 22
    },
    {
      "id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة كريسبي إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 19,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 19
    },
    {
      "id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة مكسيكي إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 36,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 36
    },
    {
      "id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة زنجر إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 54,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 54
    },
    {
      "id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة فاهيتا إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 63,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 63
    },
    {
      "id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة سكالوب إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 94,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 94
    },
    {
      "id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة شيش إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 111,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 111
    },
    {
      "id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة زنجر مكسيكي إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 133,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 133
    },
    {
      "id": "7616d4c1-749d-545e-9653-2498c2015ff3",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "كوكا كولا",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "عائلي",
      "variant_clean": "عائلي",
      "name": "كوكا كولا عائلي",
      "price": 18000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 9,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 180,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 9
    },
    {
      "id": "4e2a001c-739b-554a-8916-def3fdadaead",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "كوكا كولا",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "لتر",
      "variant_clean": "لتر",
      "name": "كوكا كولا لتر",
      "price": 11000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 10,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 110,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 10
    },
    {
      "id": "6465fe78-fa09-5640-9adf-7bdbb549ecfe",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "كوكا كولا",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "تنك",
      "variant_clean": "تنك",
      "name": "كوكا كولا تنك",
      "price": 8000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 11,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 80,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 11
    },
    {
      "id": "c2b20f27-044b-5693-b710-f71532fd07af",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سوبريم",
      "family": "سوبريم",
      "option_name": "سوبريم",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة سوبريم إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 117,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 117
    },
    {
      "id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة برغر لحم",
      "family": "برغر",
      "option_name": "برغر",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة برغر لحم",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 71,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 71
    },
    {
      "id": "2e2d5cf3-af5f-4b94-b7c8-8ecda1cc0756",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة قشقوان",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "كريسبي وجبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 134,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 134
    },
    {
      "id": "bc314a86-c7b4-4b49-8030-71563ed0af9f",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة قشقوان",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "كريسبي وجبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 135,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 135
    },
    {
      "id": "de23f386-edab-4b8f-8586-3aeb9656d08c",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة قشقوان",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "مكسيكي وجبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 136,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 136
    },
    {
      "id": "decbacc8-c03f-4db2-8ff9-08ffdffc4283",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة قشقوان",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "مكسيكي وجبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 137,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 137
    },
    {
      "id": "4c86d012-d39e-495e-9a07-84f31d69fdfd",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة قشقوان",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر وجبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 138,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 138
    },
    {
      "id": "a6dcb81f-161d-4986-9e86-18432df912cc",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة قشقوان",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر وجبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 139,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 139
    },
    {
      "id": "ffa49a86-8a8e-4b17-8afc-d43e25b88a89",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة قشقوان",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "سكالوب وجبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 140,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 140
    },
    {
      "id": "daf90cc9-d749-4058-a7b7-3a3fd384174b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة قشقوان",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "سكالوب وجبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 141,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 141
    },
    {
      "id": "c7195f93-f7d2-428f-b86f-3a735ec78ae4",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة قشقوان",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "شيش مع جبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 142,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 142
    },
    {
      "id": "0755f9cb-b66e-4cd6-bad2-827f5a64944e",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة قشقوان",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "شيش مع جبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 143,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 143
    },
    {
      "id": "f8630e06-a800-4a00-9dea-8fcba3e75306",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة قشقوان",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر مكسيكي وجبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 144,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 144
    },
    {
      "id": "ff7365c7-719b-4ed1-b924-1c3b2797e0de",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة قشقوان",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر مكسيكي وجبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 145,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 145
    }
  ]
};

/* هذا baseline محلي أولي، وليس cloud-pull. اللقطة الكاملة تُقرأ فوراً،
   ثم تُطبّق فوقها snapshot التخزين المحلي وMenuOutbox إن وجدت. */
(function () {
  const c = window.ALFA_LOCAL_CATALOG_SNAPSHOT;
  if (!c || !Array.isArray(c.categories) || !Array.isArray(c.items)) return;
  window.DEMO_DATA.categories = JSON.parse(JSON.stringify(c.categories));
  window.DEMO_DATA.items = JSON.parse(JSON.stringify(c.items));
})();

/* بيانات التشغيل المشتركة تُقرأ من IndexedDB أو من المصدر الحقيقي؛ لا توجد سجلات مضمّنة. */
window.DEMO_DATA.customers = window.DEMO_DATA.customers || [];
window.DEMO_DATA.invoices = window.DEMO_DATA.invoices || [];

window.DEMO_DATA.cashierSession = window.DEMO_DATA.cashierSession || {
  shift_open: false,
  cashbox_open: false,
  shift_opened_at: '',
  cashbox_opened_at: '',
  opening_cash: 0,
  current_cash: 0,
  cashier_name: 'الكاشير'
};

/* ── المصاريف ومشتريات المواد ──
   يبدأان من اللقطة الفعلية المضمّنة، لا من REST وقت التشغيل. */
window.DEMO_DATA.expenditures        = window.DEMO_DATA.expenditures        || [];
window.DEMO_DATA.expenditures_list   = window.DEMO_DATA.expenditures_list   || window.DEMO_DATA.expenditures;
window.DEMO_DATA.material_purchases  = window.DEMO_DATA.material_purchases  || [];

/* الموظفون يُقرأون من قاعدة البيانات أو اللقطة المحلية الحقيقية فقط. */
window.DEMO_DATA.employees = window.DEMO_DATA.employees || [];

/* ================================================================
   سجل الورديات التاريخي
   ================================================================ */
window.DEMO_DATA.shifts_history = window.DEMO_DATA.shifts_history || [];

/* ================================================================
   المخزون — inventory
   ================================================================
   تبدأ هذه القوائم فارغة، ثم تُملأ من اللقطة الحقيقية أو من قاعدة البيانات.
   ================================================================ */
window.DEMO_DATA.inventory = window.DEMO_DATA.inventory || [];
window.DEMO_DATA.inventory_materials = window.DEMO_DATA.inventory_materials || [];
window.DEMO_DATA.inventory_log = window.DEMO_DATA.inventory_log || [];

/* العقود تُقرأ من قاعدة البيانات أو اللقطة المحلية الحقيقية فقط. */
window.DEMO_DATA.contracts = window.DEMO_DATA.contracts || [];

/* الطلبات الأونلاين تُقرأ من قاعدة البيانات أو اللقطة المحلية الحقيقية فقط. */
window.DEMO_DATA.online_orders = window.DEMO_DATA.online_orders || [];

/* العروض تُقرأ من قاعدة البيانات أو اللقطة المحلية الحقيقية فقط. */
window.DEMO_DATA.offers = window.DEMO_DATA.offers || [];

/* إعدادات الخصم تُقرأ من قاعدة البيانات؛ البداية محايدة بلا سجلات خصم. */
window.DEMO_DATA.discount_settings = window.DEMO_DATA.discount_settings || {
  invoice_pct: 0,
  items: [],
};

/* إعدادات الأسعار تبدأ من اللقطة المحلية إن وُجدت؛ السحابة قناة مزامنة
   اختيارية وليست شرطاً لعرض السعر أو حفظه. لا نضع سعراً افتراضياً جديداً. */
window.DEMO_DATA.price_settings = window.DEMO_DATA.price_settings || {};

/* ================================================================
   طبقة العمل دون اتصال (Offline-first) — IndexedDB
   - تسترجع AlfaProSysDB فوق اللقطة المحلية المضمّنة (مع هجرة localStorage).
   - تلتقط الكتابات العلوية عبر Proxy → حفظ + صندوق صادر.
   - تحفظ عند الإخفاء/المغادرة والنقر (يلتقط التعديلات المتداخلة).
   - الصفحات تبدأ عبر window.alfaStart بعد القراءة المحلية، أو بمصدر baseline
     مضمّن قصير المهلة إذا علقت القراءة؛ لا تنتظر الشبكة.
   ================================================================ */
(function () {
  if (window.__ALFA_OFFLINE_BOOTED) return;
  window.__ALFA_OFFLINE_BOOTED = true;

  const base = window.DEMO_DATA;
  /* نضع لقطة المنيو المضمّنة في الذاكرة فوراً، قبل أي انتظار لـ IndexedDB
     أو للشبكة. هذا هو خط الأساس الذي تستطيع شاشة البيع الرسم منه إذا تأخر
     محرك الجاهزية؛ ولا يُستبدل فوق لقطة محلية لاحقة لأن finish() يعيد اختيار
     أكبر مصدر كامل ثم يطبّق المعلّقات. */
  const embeddedBootCatalog = window.ALFA_LOCAL_CATALOG_SNAPSHOT || {};
  if ((!Array.isArray(base.items) || !base.items.length)
      && Array.isArray(embeddedBootCatalog.items) && embeddedBootCatalog.items.length) {
    base.items = embeddedBootCatalog.items.map(function (row) {
      return JSON.parse(JSON.stringify(row));
    });
  }
  if ((!Array.isArray(base.categories) || !base.categories.length)
      && Array.isArray(embeddedBootCatalog.categories) && embeddedBootCatalog.categories.length) {
    base.categories = embeddedBootCatalog.categories.map(function (row) {
      return JSON.parse(JSON.stringify(row));
    });
  }
  /* لا نفرّغ المصدر المحلي عند وجود إعدادات السحابة. التشغيل أونلاين
     وأوفلاين يبدأ من البيانات المضمّنة ثم من اللقطة المحفوظة محلياً؛
     الشبكة ممرّ رفع لاحق وليست شرطاً للرسم أو التهيئة. */
  window.__ALFA_MERGING = true;

  let saveTimer = null;
  function persistNow() {
    if (window.__ALFA_MERGING) return Promise.resolve({ skipped: true, reason: 'merging' });
    if (!window.SyncStorage || !window.SyncStorage.save) return Promise.resolve({ saved: false, reason: 'no-storage' });
    return Promise.resolve(window.SyncStorage.save(base)).then(function (ok) {
      return ok === false ? { saved: false, reason: 'storage-failed' } : { saved: true };
    }).catch(function (e) {
      return { saved: false, reason: String(e && e.message || e) };
    });
  }
  function persistSoon() {
    if (window.__ALFA_MERGING) return;
    clearTimeout(saveTimer);
    /* الكتابة المتأخرة تقلل عمليات IndexedDB، أما الحفظ الصريح فيستدعي
       alfaPersist مباشرة ولا ينتظر المؤقت. */
    saveTimer = setTimeout(function () { persistNow(); }, 250);
  }
  window.alfaPersist = persistNow;

  /* Proxy عميق: تعديل DATA.items[0].price أو push داخل أي قائمة يجب أن
     يثبت اللقطة المحلية أيضاً، لا أن يقتصر الالتقاط على DATA.items = ... .
     نخزّن القيم الخام داخل IndexedDB حتى لا تدخل Proxy إلى structured clone. */
  const proxyCache = new WeakMap();
  const rawCache = new WeakMap();
  function unwrap(value) {
    return value && typeof value === 'object' && rawCache.has(value) ? rawCache.get(value) : value;
  }
  function reactive(value) {
    if (!value || typeof value !== 'object') return value;
    if (proxyCache.has(value)) return proxyCache.get(value);
    const proxy = new Proxy(value, {
      get(target, key, receiver) {
        return reactive(Reflect.get(target, key, receiver));
      },
      set(target, key, next, receiver) {
        const raw = unwrap(next);
        const changed = target[key] !== raw;
        const ok = Reflect.set(target, key, raw, receiver);
        if (ok && changed) persistSoon();
        return ok;
      },
      deleteProperty(target, key) {
        const existed = Object.prototype.hasOwnProperty.call(target, key);
        const ok = Reflect.deleteProperty(target, key);
        if (ok && existed) persistSoon();
        return ok;
      },
    });
    proxyCache.set(value, proxy);
    rawCache.set(proxy, value);
    return proxy;
  }
  window.DEMO_DATA = reactive(base);

  if (typeof window.addEventListener === 'function') {
    window.addEventListener('beforeunload', persistNow);
    window.addEventListener('pagehide', persistNow);
    window.addEventListener('online', function () { if (window.SyncRemote) window.SyncRemote.flush(); });
  }
  if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') persistNow();
    });
    document.addEventListener('click', persistSoon, true);
    document.addEventListener('change', persistSoon, true);
  }

  window.resetLocalData = function () {
    window.__ALFA_MERGING = true;
    const p = (window.SyncStorage && window.SyncStorage.clear) ? window.SyncStorage.clear() : Promise.resolve();
    Promise.resolve(p).then(function () {
      if (window.SyncQueue) window.SyncQueue.clear();
      location.reload();
    });
  };

  /* إزالة آثار السجلات التجريبية القديمة من اللقطة المحلية فقط.
     لا نستخدم أي fallback تجريبي جديد؛ هذه هجرة لمرة واحدة حتى لا تعود
     سجلات النسخ السابقة إلى الشاشة أو إلى صندوق الرفع. */
  function legacyId(key, id) {
    id = String(id == null ? '' : id);
    const exact = {
      customers: ['cus_001', 'cus_002', 'cus_003', 'cus_004', 'cus_005'],
      employees: ['emp_001', 'emp_002', 'emp_003', 'emp_004'],
      suppliers: ['sup_001', 'sup_002', 'sup_003'],
      contracts: ['con_001', 'con_002'],
      delivery_agents: ['drv_001', 'drv_002', 'drv_003', 'drv_004'],
      online_orders: ['ON-101', 'ON-102', 'ON-103'],
      offers: ['ofr_001', 'ofr_002', 'ofr_003'],
    };
    if ((exact[key] || []).indexOf(id) >= 0) return true;
    if (key === 'categories') return /^cat_[a-z0-9_]+$/i.test(id);
    if (key === 'items') return /^item_\d{3,}$/.test(id);
    return false;
  }
  function legacyRow(key, row) {
    row = row && typeof row === 'object' ? row : { id: row };
    if (row.__alfa_demo_seed === true || legacyId(key, row.id)) return true;
    if (key === 'invoices' && /^\d{4}-\d{2}-\d{2}-00\d$/.test(String(row.id || ''))
        && Array.isArray(row.items)
        && ['محمود عثمان', 'سارة منصور'].indexOf(String(row.cashier || '')) >= 0
        && row.items.some(function (line) { return /^item_\d{3,}$/.test(String(line && line.id || '')); })) return true;
    if (key === 'loyalty_ledger' && String(row.id) === '1' && String(row.customer_id) === 'cus_002') return true;
    if (key === 'audit' || key === 'audit_log') {
      return (String(row.id) === '1' && String(row.module) === 'invoices' && String(row.action) === 'إلغاء فاتورة')
        || (String(row.id) === '2' && String(row.module) === 'settings' && String(row.action) === 'تغيير أسعار جماعي');
    }
    if (key === 'settings' && row.key === 'discount' && row.value && Array.isArray(row.value.items)) {
      return row.value.items.some(function (x) { return /^item_\d{3,}$/.test(String(x && x.item_id || '')); });
    }
    if (key === 'settings' && row.key === 'loyalty' && row.value && Array.isArray(row.value.rewards)) {
      return row.value.rewards.some(function (x) { return /^rwd_00[1-3]$/.test(String(x && x.id || '')); });
    }
    return false;
  }
  function purgeLegacyLocalData(data) {
    if (!data || typeof data !== 'object') return data;
    const keys = [
      'categories', 'items', 'customers', 'invoices', 'employees', 'suppliers',
      'contracts', 'online_orders', 'offers', 'delivery_agents', 'loyalty_ledger', 'audit_log',
    ];
    keys.forEach(function (key) {
      if (Array.isArray(data[key])) {
        data[key] = data[key].filter(function (row) { return !legacyRow(key, row); });
        data[key].forEach(function (row) { if (row && row.__alfa_demo_seed) delete row.__alfa_demo_seed; });
      }
    });
    if (data.discount_settings && Array.isArray(data.discount_settings.items)) {
      data.discount_settings.items = data.discount_settings.items.filter(function (x) {
        return !/^item_\d{3,}$/.test(String(x && x.item_id || ''));
      });
    }
    if (data.loyalty && Array.isArray(data.loyalty.rewards)) {
      data.loyalty.rewards = data.loyalty.rewards.filter(function (x) {
        return !/^rwd_00[1-3]$/.test(String(x && x.id || ''));
      });
    }
    return data;
  }
  function purgeLegacyOutboxes() {
    const tasks = [];
    if (window.AlfaOutbox && window.AlfaOutbox.prune) {
      ['customers', 'invoices', 'employees', 'suppliers', 'contracts', 'expenditures',
        'purchases', 'audit', 'loyalty_ledger', 'offers', 'online_orders', 'agents'].forEach(function (name) {
        tasks.push(AlfaOutbox.prune(name, function (row) {
          return legacyRow(name === 'agents' ? 'delivery_agents' : name === 'purchases' ? 'material_purchases' : name, row);
        }));
      });
    }
    if (window.MenuOutbox && window.MenuOutbox.prune) {
      tasks.push(MenuOutbox.prune(function (row, kind) {
        return legacyRow(kind === 'cat' ? 'categories' : 'items', row);
      }));
    }
    return Promise.all(tasks).catch(function () {});
  }

  // 5.5) مساعدات الترقيم اليومي المشتركة (الدور = رقم الفاتورة)
  /* اليوم الإداري: يبدأ 05:00 فجراً وينتهي 05:00 فجر اليوم التالي.
     ─────────────────────────────────────────────────────────────
     كان الطرح 8 ساعات، فصار كل بيع بين منتصف الليل والثامنة صباحاً
     يُسجَّل بتاريخ اليوم السابق — فيبدو للمستخدم أن فواتيره اختفت.
     هذا صحيح لجهة الترقيم (يوم العمل يحكم تسلسل الأرقام) لكنه خاطئ
     لجهة التاريخ المعروض. بالتدوير عند الخامسة يطابق التاريخ المخزَّن
     التاريخ الفعلي لكل بيع بعد الخامسة صباحاً، ويبقى الترقيم محكوماً
     بيوم العمل: بيعات السهر قبل الخامسة تُكمل يومها السابق كما ينبغي. */
  window.businessDay = function (d) {
    const t = d ? new Date(d) : new Date();
    const s = new Date(t.getTime() - 5 * 3600e3);
    const p = function (n) { return String(n).padStart(2, '0'); };
    return s.getFullYear() + '-' + p(s.getMonth() + 1) + '-' + p(s.getDate());
  };
  /* padNo: حشو عام للرقم كما هو (يُستخدم في معرّف الفاتورة id عند الحاجة).
     للعرض والطباعة: displayInvoiceNo بلا أصفار. padNo يبقى لمعرّف id الداخلي فقط. */
  window.padNo = function (n) { return String(Number(n || 0)).padStart(3, '0'); };

  /* ══════════════════════════════════════════════════════════════
     عرض/طباعة = رقم يومي مستمر بلا أصفار بادئة (1، 2، 3…) عبر كل الأجهزة.
     لا نُسقط الشريحة بـ % 1000 وإلا جهاز2 (no=1001) يطبع 001 كجهاز1.

     التمييز عند الرفع (offline): قيمة no في الشريحة
       جهاز1: 1..999 · جهاز2: 1001..1999 …
     عند الاتصال: تسلسل موحّد max+1 من كل فواتير اليوم (بلا قفز للشريحة).
     print_no اختياري على الفاتورة = الرقم الظاهر إن وُجد.
     ══════════════════════════════════════════════════════════════ */
  window.invoiceSeqNo = function (n) {
    return Number(n) || 0;
  };
  /* الرقم الظاهر: print_no إن وُجد، وإلا ترتيب مستمر من no بدون modulo */
  /* عرض/طباعة: رقم طبيعي بلا أصفار بادئة (طلب العميل): 1، 2، 15… لا 001 */
  /* الأرقام اللاتينية (1 2 3) حصراً في رقم الفاتورة — لا ١٢٣.
     بعض متصفحات الأندرويد تُنتج أرقاماً هندية من String() إن كانت
     لغة الجهاز عربية، فنُطبّعها هنا صراحةً. */
  window.alfaLatinDigits = function (v) {
    return String(v == null ? '' : v)
      .replace(/[\u0660-\u0669]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); })
      .replace(/[\u06F0-\u06F9]/g, function (d) { return String(d.charCodeAt(0) - 0x06F0); });
  };
  window.displayInvoiceNo = function (n, inv) {
    if (inv && inv.print_no != null && Number(inv.print_no) > 0) {
      return window.alfaLatinDigits(Number(inv.print_no));
    }
    n = Number(n) || 0;
    if (n <= 0) return '0';
    return window.alfaLatinDigits(n);
  };
  window.invoiceNo = function (inv) {
    if (!inv) return '';
    if (inv.print_no != null && Number(inv.print_no) > 0) return window.displayInvoiceNo(inv.print_no, inv);
    if (inv.no != null) return window.displayInvoiceNo(inv.no, inv);
    const m = /(\d+)\s*$/.exec(String(inv.id || ''));
    return m ? window.displayInvoiceNo(+m[1], inv) : '—';
  };

  /* ══════════════════════════════════════════════════════════════
     رقم الطباعة الظاهر — متسلسل عبر كل الأجهزة (مطلب العميل):
     لو تعطل الجهاز 1 واشتغل 2 → يكمل 007 بعد 006 ولا يبدأ من 001.
     المصدر: أعلى print_no (أو no إن كان تسلسلاً يومياً < شريحة) من
     فواتير اليوم المسحوبة من السحابة + المحلي + حجز localStorage.
     ══════════════════════════════════════════════════════════════ */
  window.nextPrintNo = function (peek) {
    const today = window.businessDay ? window.businessDay() : '';
    let maxP = 0;
    function consider(inv) {
      if (!inv) return;
      const d = inv.date || (inv.created_at && window.businessDay ? window.businessDay(inv.created_at) : null);
      if (today && d && d !== today) return;
      const p = Number(inv.print_no) || 0;
      if (p > maxP) maxP = p;
      const n = Number(inv.no) || 0;
      /* no اليومي المتصل (1..999 عادة، أو أي تسلسل موحّد دون شريحة) */
      if (!p && n > 0 && n < 1000 && n > maxP) maxP = n;
      /* شريحة أوفلاين 1001+ بلا print_no: لا تُستخدم وحدها كرقم ظاهر */
    }
    (window.DEMO_DATA && DEMO_DATA.invoices || []).forEach(consider);
    (window.DEMO_DATA && DEMO_DATA.online_orders || []).forEach(consider);
    let reserved = 0;
    try { reserved = Number(localStorage.getItem('alfaprosys_print_no_' + today) || 0) || 0; } catch (e) {}
    if (reserved > maxP) maxP = reserved;
    const next = maxP + 1;
    if (!peek) {
      try { localStorage.setItem('alfaprosys_print_no_' + today, String(next)); } catch (e) {}
    }
    return next;
  };
  window.invNoLabel = function (inv) {
    return window.invoiceNo ? window.invoiceNo(inv) : String((inv && inv.id) || '');
  };
  /*
   * حجز الرقم محلياً قبل إنشاء الفاتورة.
   * السبب: حساب max + 1 وحده يعيد الرقم نفسه عند فتح نافذتين أو عند العمل
   * دون اتصال ثم إعادة تحميل البيانات. الحجز محفوظ في localStorage ويستمر
   * بعد الإغلاق، بينما تبقى الفاتورة نفسها في الطابور حتى تُرفع لاحقاً.
   * الترقيم الموحد بين أجهزة متعددة يحتاج قيداً/دالة ذرية في قاعدة البيانات.
   */
  /* ══════════════════════════════════════════════════════════════
     ترقيم آمن لعدة أجهزة تعمل أوفلاين
     ──────────────────────────────────────────────────────────────
     المشكلة: جهازان يعملان أوفلاين في اليوم نفسه يحسب كلٌّ منهما
     max+1 من بياناته المحلية، فيُنتجان الرقم نفسه. وعند الرفع
     يرفض القيد الفريد invoices_date_no_key (date,no) الفاتورة
     الثانية فتضيع نهائياً.

     الحل: لكل جهاز «شريحة» ثابتة من الأرقام لا تتقاطع مع غيرها،
     فيبقى الرقم فريداً حتى لو لم يتصل الجهازان بالسحابة إطلاقاً.
     الشريحة تُحفظ في localStorage وتبقى ثابتة للجهاز.
     ══════════════════════════════════════════════════════════════ */
  /* why: عمود no عدد صحيح، فـ«01» و«001» و«1ب» كلها إما تصادم أو مرفوضة.
     التمييز بين الأجهزة عند الرفع فقط (قيمة no في القاعدة):
       الجهاز ١ → 1..999    الجهاز ٢ → 1001..1999    الجهاز ٣ → 2001..2999
     عند الاتصال الترقيم موحّد ومستمر؛ أوفلاين تُستخدم الشرائح لمنع تصادم الرفع.
     الطباعة: displayInvoiceNo / print_no مستمر بلا أصفار بادئة. */
  window.ALFA_SLOT_SPAN = 1000;  // سعة شريحة الجهاز الواحد في اليوم
  window.ALFA_SLOT_MAX  = 9;     // عدد الأجهزة المدعومة

  /* بصمة ثابتة للجهاز — تُولَّد مرة واحدة وتُحفظ.
     السبب: الشريحة كانت تُختار من «فواتير اليوم المحلية» فقط، فجهازان
     جديدان لا يرى أحدهما فواتير الآخر يختاران الشريحة ٠ معاً ويُنتجان
     الأرقام نفسها حتماً. الآن تُشتق الشريحة المبدئية من بصمة الجهاز
     فيتوزّع الأجهزة على الشرائح بدل أن تتزاحم على الأولى. */
  window.alfaDeviceId = function () {
    try {
      let id = localStorage.getItem('alfaprosys_device_id');
      if (!id) {
        id = (window.crypto && crypto.randomUUID)
          ? crypto.randomUUID()
          : ('d' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10));
        localStorage.setItem('alfaprosys_device_id', id);
      }
      return id;
    } catch (e) { return 'd0'; }
  };

  window.alfaDeviceSlot = function () {
    try {
      let s = localStorage.getItem('alfaprosys_device_slot');
      if (s === null) {
        /* شريحة لا تحتوي فواتير اليوم (أي لم يستخدمها جهاز آخر) */
        const today = window.businessDay();
        const taken = {};
        (window.DEMO_DATA.invoices || []).forEach(function (i) {
          if ((i.date || '') !== today) return;
          taken[Math.floor((Number(i.no) || 0) / window.ALFA_SLOT_SPAN)] = true;
        });
        /* نقطة البداية من بصمة الجهاز، ثم أول شريحة خالية بعدها */
        let h = 0; const id = window.alfaDeviceId();
        for (let k = 0; k < id.length; k++) h = (h * 31 + id.charCodeAt(k)) >>> 0;
        const start = h % window.ALFA_SLOT_MAX;
        s = null;
        for (let k = 0; k < window.ALFA_SLOT_MAX; k++) {
          const cand = (start + k) % window.ALFA_SLOT_MAX;
          if (!taken[cand]) { s = String(cand); break; }
        }
        if (s === null) s = String(start);
        localStorage.setItem('alfaprosys_device_slot', s);
      }
      return Math.max(0, Math.min(window.ALFA_SLOT_MAX - 1, Number(s) || 0));
    } catch (e) { return 0; }
  };

  /* peek=true: يحسب الرقم التالي دون حجزه — للعرض فقط.
     السبب: شاشة البيع كانت تعرض «رقم الفاتورة القادمة» باستدعاء
     nextDailyNo()، فيُستهلك رقم عند كل رسم للشاشة وتنشأ فجوات
     في الترقيم ويُنفَد نطاق الجهاز بسرعة. */
  window.nextDailyNo = function (peek) {
    const today = window.businessDay();
    const key = 'alfaprosys_invoice_reservation_' + today;
    let reserved = 0, cycle = '';
    try { reserved = Number(localStorage.getItem(key) || 0) || 0; cycle = localStorage.getItem('alfaprosys_invoice_cycle_' + today) || ''; } catch (e) {}
    let max = reserved;
    let maxAll = 0;
    let maxInSlot = 0;
    const span = window.ALFA_SLOT_SPAN;
    const base = (window.alfaDeviceSlot ? window.alfaDeviceSlot() : 0) * span;
    const online = navigator.onLine !== false && window.AlfaSB && AlfaSB.enabled && AlfaSB.enabled();

    (window.DEMO_DATA.invoices || []).forEach(function (i) {
      const d = i.date || (i.created_at ? window.businessDay(i.created_at) : null);
      if (d !== today) return;
      const n = Number(i.no) || 0;
      if (n > maxAll) maxAll = n;
      if ((!cycle || i.invoice_cycle === cycle) && n > max) max = n;
      if (n >= base + 1 && n < base + span && n > maxInSlot) maxInSlot = n;
    });
    (window.DEMO_DATA.online_orders || []).forEach(function (o) {
      if (o.date !== today) return;
      const n = Number(o.no) || 0;
      if (n > maxAll) maxAll = n;
      if (n > max) max = n;
      if (n >= base + 1 && n < base + span && n > maxInSlot) maxInSlot = n;
    });

    let next;
    if (online) {
      /* متصل: تسلسل يومي موحّد مستمر لكل الأجهزة (1،2،3…) — التمييز عند الرفع ليس ضرورياً */
      next = Math.max(maxAll, reserved) + 1;
      /* تجنّب القفز داخل شريحة جهاز أوفلاين أخرى إن وُجدت أرقام شرائح فقط:
         إن كانت كل الأرقام < 1000 نتابع؛ إن وُجدت شرائح نأخذ maxAll+1 أيضاً (فريد) */
    } else {
      /* أوفلاين: شريحة الجهاز حتى لا يتصادم (date,no) عند الرفع لاحقاً.
         كان الحساب يتجاهل الحجز المحفوظ ويعتمد على maxInSlot وحده
         (أرقام الفواتير الموجودة فعلاً) — فإن لم تُحفظ الفاتورة في
         القائمة لأي سبب أُعيد الرقم نفسه للفاتورة التالية. الآن
         الحجز (max) داخل الحساب فيتقدّم التسلسل دائماً. */
      next = Math.max(maxInSlot, base, max) + 1;
      if (next < base + 1) next = base + 1;
      if (next >= base + span) next = Math.max(maxAll + 1, base + 1);
    }
    if (!peek) { try { localStorage.setItem(key, String(next)); } catch (e) {} }
    return next;
  };
  /* رقم بديل لفاتورة رُفضت لأن (date,no) مأخوذ — يُستخدم عند تضارب
     جهازين أوفلاين. يختار رقماً بعد كل الأرقام المعروفة، وداخل شريحة
     الجهاز إن أمكن، ثم يحجزه حتى لا يتكرر مع الفاتورة التالية. */
  window.alfaFreshInvoiceNo = function () {
    const today = window.businessDay();
    let maxAll = 0;
    (window.DEMO_DATA.invoices || []).forEach(function (i) {
      if ((i.date || '') !== today) return;
      const n = Number(i.no) || 0; if (n > maxAll) maxAll = n;
    });
    const span = window.ALFA_SLOT_SPAN;
    const base = (window.alfaDeviceSlot ? window.alfaDeviceSlot() : 0) * span;
    const fresh = Math.max(maxAll + 1, base + 1);
    try { localStorage.setItem('alfaprosys_invoice_reservation_' + today, String(fresh)); } catch (e) {}
    return fresh;
  };

  window.resetInvoiceNumbering = function () {
    const day = window.businessDay();
    const start = function (cycle) {
      try { localStorage.setItem('alfaprosys_invoice_cycle_' + day, cycle); localStorage.setItem('alfaprosys_invoice_reservation_' + day, '0'); } catch (e) {}
      return cycle;
    };
    if (window.AlfaSB && AlfaSB.enabled && AlfaSB.enabled() && AlfaSB.rpc) return AlfaSB.rpc('start_invoice_cycle', { p_business_day: day, p_created_by: (window.DEMO_DATA.cashierSession && window.DEMO_DATA.cashierSession.cashier_name) || 'المدير' }).then(function(c){ return start(Array.isArray(c)?c[0]:c); });
    return Promise.resolve(start('local-' + Date.now()));
  };
  /* ══════════════════════════════════════════════════════════════
     حجز الرقم — مرجع مشترك واحد أو لا رقم
     ──────────────────────────────────────────────────────────────
     مطلب الإدارة (نهائي): التعداد ١، ٢، ٣… بلا أصفار بادئة وبلا
     قفزات، ويستمر صاعداً حتى لو صدر من جهازين في اليوم نفسه.

     لازمُ هذا المطلب: لا يجوز لأي جهاز أن يُصدر رقماً من عنده.
     فالترقيم المحلي ينتج إمّا قفزاً (شريحة ١٠٠١/٢٠٠١…) وإمّا
     تكراراً (رقمين متطابقين من جهازين) — وكلاهما مرفوض.

     لذلك: الرقم من مرجع مشترك حصراً
       ١) خادم السحابة  (Supabase — يعطي تسلسلاً ذرياً موحداً)
       ٢) خدمة ترقيم محلية على شبكة المطعم (إن ضُبطت في config.js)
       ٣) وإلا: لا رقم — ويُبلَّغ الكاشير بدل إصدار رقم خاطئ.
     ══════════════════════════════════════════════════════════════ */
  window.RESERVE_TIMEOUT_MS = 5000;
  window.LAN_TIMEOUT_MS     = 2500;
  window.alfaLastInvoiceNoSource = 'server';

  function rememberReservation(today, n) {
    try { localStorage.setItem('alfaprosys_invoice_reservation_' + today, String(n)); } catch (e) {}
  }

  /* ٢) خدمة ترقيم محلية على شبكة المطعم — تعمل بلا إنترنت */
  /* ٢) خدمة ترقيم محلية على شبكة المطعم — تعمل بلا إنترنت.
        إن لم يُضبط numbering.lanUrl صراحةً، نجرّب الأجهزة المذكورة
        أصلاً في thermal.qzHosts (هي أجهزة المطعم التي تحمل الطابعات)
        على المنفذ 8787 — فلا يحتاج صاحب المطعم إلى إعداد إضافي. */
  function lanBaseUrls() {
    const out = [];
    const cfg = window.ALFA_CONFIG || {};
    const direct = (cfg.numbering && cfg.numbering.lanUrl) || '';
    if (direct) {
      let b = String(direct).trim().replace(/\/+$/, '').replace(/\/next$/i, '');
      if (/^https?:\/\//i.test(b)) out.push(b);
      else if (b) out.push('http://' + b + ':8787');
      return out;
    }
    const hosts = (cfg.thermal && (cfg.thermal.qzHosts || cfg.thermal.qzHost)) || [];
    (Array.isArray(hosts) ? hosts : [hosts]).forEach(function (h) {
      h = String(h || '').trim();
      if (!h) return;
      if (/^https?:\/\//i.test(h)) { out.push(h.replace(/\/+$/, '')); return; }
      out.push('http://' + h + ':8787');
    });
    return out;
  }

  function lanCandidateUrls() {
    return lanBaseUrls().map(function (b) { return b + '/next'; });
  }

  function fetchLanNo(url, today) {
    const ctl = (window.AbortController) ? new AbortController() : null;
    const timer = setTimeout(function () { if (ctl) ctl.abort(); }, window.LAN_TIMEOUT_MS);
    const sep = url.indexOf('?') >= 0 ? '&' : '?';
    /* &_= يُلغي تخزين المتصفح للرد: بدونه كان يُعاد الرقم نفسه
       خمس مرات لأن الطلب متطابق تماماً في كل مرة. */
    return fetch(url + sep + 'day=' + encodeURIComponent(today) + '&_=' + Date.now(),
                 { cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('lan-http')); })
      .then(function (j) {
        const n = Number(j && (j.no != null ? j.no : j.next));
        if (!n) return Promise.reject(new Error('lan-bad'));
        return n;
      })
      .then(function (n) { clearTimeout(timer); return n; },
            function (e) { clearTimeout(timer); return Promise.reject(e); });
  }

  /* /set على الخدمة المحلية: يرفع العدّاد إلى رقم محدّد ويردّ النتيجة */
  function fetchLanSet(base, today, no) {
    const ctl = (window.AbortController) ? new AbortController() : null;
    const timer = setTimeout(function () { if (ctl) ctl.abort(); }, window.LAN_TIMEOUT_MS);
    const url = base + '/set?day=' + encodeURIComponent(today) + '&no=' + encodeURIComponent(no) + '&_=' + Date.now();
    return fetch(url, { cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('lan-http')); })
      .then(function (j) {
        const n = Number(j && (j.no != null ? j.no : j.next));
        return n || no;
      })
      .then(function (n) { clearTimeout(timer); return n; },
            function (e) { clearTimeout(timer); return Promise.reject(e); });
  }

  /* مزامنة بالخلف: كل رقم تصدره السحابة نرفع إليه عدّاد الخدمة المحلية.
     فلو انقطع الإنترنت في منتصف اليوم تكمل الخدمة المحلية من حيث
     توقّفت السحابة، ولا يُصدر أيّ رقم مكرّر. فشل المزامنة لا يوقف البيع. */
  function lanSyncToServer(today, no) {
    if (!no) return;
    lanBaseUrls().forEach(function (base) {
      try { fetchLanSet(base, today, no).catch(function () {}); } catch (e) {}
    });
  }

  function lastIssuedNo(today) {
    try { return Number(localStorage.getItem('alfaprosys_invoice_reservation_' + today)) || 0; }
    catch (e) { return 0; }
  }

  /* أرضية أمان: إن أعادت الخدمة رقماً أصغر من آخر رقم أصدره هذا الجهاز
     اليوم (لم تصلها المزامنة)، نرفع عدّادها إلى ما بعده. */
  function lanApplyFloor(today, n) {
    const last = lastIssuedNo(today);
    if (!last || n > last) return n;
    const bases = lanBaseUrls();
    if (!bases.length) return n;
    return bases.reduce(function (chain, base) {
      return chain.catch(function () { return fetchLanSet(base, today, last + 1); });
    }, Promise.reject(new Error('start'))).catch(function () { return n; });
  }

  function lanReserve(today) {
    const urls = lanCandidateUrls();
    if (!urls.length) return Promise.reject(new Error('no-lan'));
    return urls.reduce(function (chain, url) {
      return chain.catch(function () { return fetchLanNo(url, today); });
    }, Promise.reject(new Error('start')))
      .then(function (n) { return lanApplyFloor(today, n); });
  }

  /* حجز رقم من السحابة — احتياط فقط حين تتعذّر الخدمة المحلية.
     فشلها أو غيابها لا يوقف البيع: نرجع null فيكمل المسار. */
  function cloudReserveNo(today) {
    let ok = false;
    try {
      ok = navigator.onLine !== false && window.AlfaSB && AlfaSB.enabled && AlfaSB.enabled() && AlfaSB.rpc;
    } catch (e) { ok = false; }
    if (!ok) return Promise.resolve(null);

    let cycle = ''; try { cycle = localStorage.getItem('alfaprosys_invoice_cycle_' + today) || ''; } catch (e) {}
    const call = AlfaSB.rpc(cycle ? 'reserve_cycle_invoice_no' : 'reserve_invoice_no',
                            cycle ? { p_cycle_id: cycle } : { p_business_day: today });
    const deadline = new Promise(function (_, rej) {
      setTimeout(function () { rej(new Error('reserve-timeout')); }, window.RESERVE_TIMEOUT_MS);
    });
    return Promise.race([call, deadline])
      .then(function (n) {
        n = Number(Array.isArray(n) ? n[0] : n);
        if (!n) return null;
        rememberReservation(today, n);
        /* نرفع عدّاد الخدمة المحلية إلى هذا الرقم، فلو رجعت الخدمة
           لا تُعيد أرقاماً أصدرتها السحابة. */
        lanSyncToServer(today, n);
        return n;
      })
      .catch(function () { return null; });
  }

  window.reserveInvoiceNoDetailed = function () {
    const today = window.businessDay();

    /* ══════════════════════════════════════════════════════════
       ١) خدمة الترقيم المحلية — المصدر الأساس (على جهاز واحد فقط).
          تعداد واحد ⇒ لا قفزات ولا تكرار. وتردّ خلال ~١٠ مللي ثانية
          فتجيب الرقم بلا انتظار، حتى والإنترنت مقطوع.

          (كانت السحابة أولاً: فتنتظر ٥ ثوانٍ كل فاتورة بالميدان،
           وكل رقم تُصدره السحابة يقفز بعدّاد الخدمة عبر /set
           فيترك فجوة بحجم الفرق — وهذا سبب القفزات ~٦٠.)
       ══════════════════════════════════════════════════════════ */
    return lanReserve(today).then(function (n) {
      rememberReservation(today, n);
      window.alfaLastInvoiceNoSource = 'lan';
      return { no: n, source: 'lan' };
    }).catch(function () {
      /* ٢) تعذّرت الخدمة المحلية (مطفيّة أو غير مُعدّة) — السحابة */
      return cloudReserveNo(today).then(function (n) {
        if (n) { window.alfaLastInvoiceNoSource = 'server'; return { no: n, source: 'server' }; }
        window.alfaLastInvoiceNoSource = 'none';
        return { no: null, source: 'none' };
      });
    });
  };

  window.reserveInvoiceNo = function () {
    return window.reserveInvoiceNoDetailed().then(function (r) { return r.no; });
  };
  window.nextInvoiceId = function (n) {
    const today = window.businessDay(); let cycle = '';
    try { cycle = localStorage.getItem('alfaprosys_invoice_cycle_' + today) || ''; } catch (e) {}
    const num = Number(n != null ? n : (window.nextDailyNo ? window.nextDailyNo() : 0)) || 0;
    /* المعرّف يحتفظ بـ no الكامل (للتمييز عند الرفع) — العرض الثلاثي منفصل */
    const tag = String(num).padStart(Math.max(3, String(num).length), '0');
    return today + (cycle ? '-' + String(cycle).slice(-6) : '') + '-' + tag;
  };

  window.NetBadge = {
    html(id) {
      return `<button type="button" class="net-badge" id="${id || 'netBadge'}" title="حالة الاتصال"></button>`;
    },
    refresh() {
      const render = function (local) {
        document.querySelectorAll('.net-badge').forEach(el => {
          const browserOn = navigator.onLine !== false;
          /* تعديلات المنيو المعلقة (الصندوق الصادر) تُحتسب ضمن المنتظر. */
          const menuPend = (window.MenuOutbox && MenuOutbox.hasPending) ? (MenuOutbox.hasPending() ? 1 : 0) : 0;
          const outboxPend = (window.AlfaOutbox && AlfaOutbox.pendingCount) ? AlfaOutbox.pendingCount() : 0;
          const localPend = local && Number(local.pendingCloudOperations || 0) || 0;
          const localFailed = local && Number(local.failedCloudOperations || 0) || 0;
          const pend = (window.SyncQueue ? SyncQueue.count() : 0) + menuPend + outboxPend + localPend;
          const localMode = !!(window.ALFA_CONFIG && ALFA_CONFIG.offline && ALFA_CONFIG.offline.localFirst !== false);
          const label = localMode && local
            ? (localFailed ? 'محلي · يحتاج مراجعة' : (localPend ? 'محلي · بانتظار الرفع' : 'محلي · متزامن'))
            : (browserOn ? 'متصل' : 'دون اتصال');
          el.className = 'net-badge ' + (localMode && local ? 'net-local' : (browserOn ? 'net-on' : 'net-off'));
          el.innerHTML = `<span class="net-dot"></span><span>${label}</span>` +
            (pend ? `<span class="net-pend">${pend}⏳</span>` : '') +
            (localFailed ? `<span class="net-failed">${localFailed}⛔</span>` : '');
          el.title = localMode && local
            ? (localFailed
                ? `${localFailed} عملية مرفوضة نهائياً — راجع cloud-outbox-failed.ndjson`
                : (localPend ? `${localPend} عملية محلية بانتظار الإنترنت — محفوظة ولن تضيع` : 'الخادم المحلي يعمل — لا حاجة للإنترنت أثناء العمل'))
            : (browserOn
              ? ((menuPend || outboxPend) ? 'تعديلات معلقة — ستُرفع تلقائياً'
                  : (pend ? `${pend} عملية بانتظار المزامنة` : 'متصل — كل العمليات متزامنة'))
              : `العمل دون اتصال شغّال${(menuPend || outboxPend) ? ' · تعديلات معلقة' : ''}${pend ? ` · ${pend} عملية في الطابور` : ''}`);
        });
      };
      render(null);
      if (window.AlfaSB && AlfaSB.localStatus) AlfaSB.localStatus().then(render);
    },
    bind() {
      if (window.__NETBADGE_BOUND) { this.refresh(); return; }
      window.__NETBADGE_BOUND = true;
      window.addEventListener('online', () => this.refresh());
      window.addEventListener('offline', () => this.refresh());
      setInterval(() => this.refresh(), 15000);
      document.addEventListener('click', ev => {
        const b = ev.target.closest && ev.target.closest('.net-badge');
        if (!b) return;
        const pend = window.SyncQueue ? SyncQueue.count() : 0;
        const localMode = !!(window.ALFA_CONFIG && ALFA_CONFIG.offline && ALFA_CONFIG.offline.localFirst !== false);
        if (localMode && window.AlfaSB && AlfaSB.localStatus) {
          fetch('/__sync', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (s) {
            alert(s && s.failedCloudOperations
              ? `الخادم المحلي يعمل — توجد ${s.failedCloudOperations} عملية مرفوضة نهائياً. راجع cloud-outbox-failed.ndjson.`
              : (s && s.pendingCloudOperations
                ? `الخادم المحلي يعمل — بقيت ${s.pendingCloudOperations} عملية بانتظار الإنترنت.`
                : 'الخادم المحلي يعمل — لا توجد عمليات معلقة حالياً.'));
            NetBadge.refresh();
          }).catch(function () { alert('تعذر الوصول إلى الخادم المحلي.'); });
          return;
        }
        if (navigator.onLine === false) { alert('النظام يعمل دون اتصال — الطلبات تُحفظ محلياً وترفع عند عودة الإنترنت.'); return; }
        if (window.SyncRemote) SyncRemote.flush().then(r => {
          if (r && r.skipped) alert(`العمليات المحفوظة محلياً: ${pend}\nسيبدأ الرفع الفعلي تلقائياً بعد ربط قاعدة البيانات.`);
          else { if (window.SyncQueue) SyncQueue.clear(); this.refresh(); }
        });
      });
      this.refresh();
    },
  };

  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      try {
        if (/e2b\.app$/i.test(location.hostname)) {
          navigator.serviceWorker.getRegistrations().then(function (rs) {
            rs.forEach(function (r) { r.unregister(); });
          });
          return;
        }
      } catch (e) {}
      navigator.serviceWorker.register('sw.js?alfa_build=163', { updateViaCache: 'none' }).catch(() => {});
      /* ══════════════════════════════════════════════════════════
         تنبيه «نسخة جديدة متاحة»
         ──────────────────────────────────────────────────────────
         العامل يثبّت النسخة الجديدة في الخلفية، لكن التبويب
         المفتوح يظل يشغّل الكود القديم في الذاكرة ولا شيء يتغيّر
         ولا أحد يُخبر المستخدم — فيبدو «الإصلاح لم يعمل». هذا
         الشريط يطلب منه إعادة التحميل.
         ══════════════════════════════════════════════════════════ */
      try {
        navigator.serviceWorker.addEventListener('controllerchange', function () {
          if (window.__alfaSwReloading) return;
          alfaShowUpdateBar();
        });
        navigator.serviceWorker.getRegistration().then(function (reg) {
          if (!reg) return;
          reg.addEventListener('updatefound', function () {
            var nw = reg.installing; if (!nw) return;
            nw.addEventListener('statechange', function () {
              if (nw.state === 'installed' && navigator.serviceWorker.controller) alfaShowUpdateBar();
            });
          });
        }).catch(function () {});
      } catch (e) {}
    });

  /* شريط عائم يخبر المستخدم بوجود نسخة أحدث */
  function alfaShowUpdateBar() {
    if (document.getElementById('alfaUpdateBar')) return;
    var b = document.createElement('div');
    b.id = 'alfaUpdateBar';
    b.innerHTML = '🔄 نسخة جديدة من النظام متاحة — اضغط للتحديث';
    b.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;' +
      'background:#0b2942;color:#fff;border:2px solid #fbbf24;border-radius:12px;' +
      'padding:14px 16px;font-weight:800;font-size:14px;text-align:center;cursor:pointer;' +
      'box-shadow:0 6px 20px rgba(0,0,0,.45);font-family:Tahoma,Arial,sans-serif';
    b.onclick = function () {
      window.__alfaSwReloading = true;
      b.textContent = '⏳ جارٍ التحديث…';
      try {
        if (navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage('SKIP_WAITING');
      } catch (e) {}
      setTimeout(function () { location.reload(true); }, 400);
    };
    document.body.appendChild(b);
  }
  }

  let readyResolve;
  window.__ALFA_READY_P = new Promise(function (r) { readyResolve = r; });
  /* الجاهزية تحمي ترتيب البيانات، لكنها لا يجوز أن تحوّل overlay الإقلاع
     إلى قفل دائم. إذا علقت قراءة IndexedDB/الخادم المحلي، تُحرَّر الصفحة
     بعد مهلة قصيرة من المصدر المضمّن، بينما تبقى دورة المزامنة في الخلفية
     وتستمر alfa:cloud-ready عند اكتمالها. لا نلغي الفحص ولا نعتبر المهلة
     نجاحاً سحابياً؛ هي مسار رسم احتياطي فقط. */
  const ALFA_UI_FALLBACK_MS = 1800;
  window.alfaStart = function (fn) {
    let started = false;
    let domReadyBound = false;
    function invoke() {
      if (started) return;
      const run = function () {
        if (started) return;
        started = true;
        try { fn(); } catch (e) { console.error(e); }
      };
      if (document.readyState === 'loading') {
        if (domReadyBound) return;
        domReadyBound = true;
        document.addEventListener('DOMContentLoaded', run, { once: true });
      } else {
        run();
      }
    }
    window.__ALFA_READY_P.then(function () {
      window.__ALFA_READY_RELEASE = 'local-ready';
      invoke();
    }, function () {
      window.__ALFA_READY_RELEASE = 'local-ready-error';
      invoke();
    });
    setTimeout(function () {
      if (started) return;
      window.__ALFA_READY_RELEASE = 'ui-timeout-local-data';
      invoke();
    }, ALFA_UI_FALLBACK_MS);
  };

  let finished = false;
  function finish(saved, queue, lastGoodMenu) {
    if (finished) return;
    finished = true;
    if (window.__splash) window.__splash.set(45, 'جاري تحميل البيانات...');
    window.__ALFA_MERGING = true;
    const embeddedCatalog = window.ALFA_LOCAL_CATALOG_SNAPSHOT || {};
    const requiredRoles = JSON.parse(JSON.stringify(base.roles || {}));
    const savedItems = saved && Array.isArray(saved.items) ? saved.items : [];
    const savedCats = saved && Array.isArray(saved.categories) ? saved.categories : [];
    const goodItems = lastGoodMenu && Array.isArray(lastGoodMenu.items) ? lastGoodMenu.items : [];
    const goodCats = lastGoodMenu && Array.isArray(lastGoodMenu.cats) ? lastGoodMenu.cats : [];
    /* لا نسمح للّقطة المحفوظة الفارغة/الناقصة أن تمحو baseline كاملاً.
       ننسخ بقية البيانات المحفوظة، أما catalog فتُختار من أكبر مصدر كامل
       (التخزين، آخر لقطة ناجحة، أو data.js)، ثم تُدمج فوقه الصفوف المحلية.
       هكذا لا تبدأ إعادة فتح التبويب من صفر حتى لو توقفت الكتابة في منتصف
       إقلاع سابق أو بقي صندوق منيو معلقاً. */
    if (saved && typeof saved === 'object') {
      purgeLegacyLocalData(saved);
      for (const k of Object.keys(saved)) {
        if (k !== 'items' && k !== 'categories' && k !== 'roles') base[k] = saved[k];
      }
    }
    /* roles تعريف واجهة الدخول، وليس لقطة تشغيلية. لا نسمح للّقطة
       القديمة التي تحتوي «كاشير» واحداً أن تعيد الشاشة إلى الحساب السابق. */
    base.roles = requiredRoles;
    const embeddedItems = Array.isArray(embeddedCatalog.items) ? embeddedCatalog.items : [];
    const embeddedCats = Array.isArray(embeddedCatalog.categories) ? embeddedCatalog.categories : [];
    const catalogCandidates = [];
    if (savedItems.length && savedCats.length) {
      catalogCandidates.push({ items: savedItems, cats: savedCats, at: Number(saved.__alfa_storage_saved_at) || 0 });
    }
    if (goodItems.length && goodCats.length) {
      catalogCandidates.push({ items: goodItems, cats: goodCats, at: Number(lastGoodMenu.at) || 0 });
    }
    if (embeddedItems.length && embeddedCats.length) {
      catalogCandidates.push({ items: embeddedItems, cats: embeddedCats, at: 0 });
    }
    catalogCandidates.sort(function (a, b) {
      return (b.items.length - a.items.length)
        || (b.cats.length - a.cats.length)
        || (b.at - a.at);
    });
    const chosenCatalog = catalogCandidates[0] || { items: [], cats: [] };
    function mergeCatalogRows(seed, overlay) {
      const out = (Array.isArray(seed) ? seed : []).map(function (row) {
        return JSON.parse(JSON.stringify(row));
      });
      const byId = {};
      out.forEach(function (row) {
        if (row && row.id != null) byId[String(row.id)] = row;
      });
      (Array.isArray(overlay) ? overlay : []).forEach(function (row) {
        if (!row || row.id == null) return;
        const id = String(row.id);
        const copy = JSON.parse(JSON.stringify(row));
        if (byId[id]) Object.assign(byId[id], copy);
        else { byId[id] = copy; out.push(copy); }
      });
      return out;
    }
    base.items = mergeCatalogRows(chosenCatalog.items, savedItems);
    base.categories = mergeCatalogRows(chosenCatalog.cats, savedCats);
    if (lastGoodMenu && chosenCatalog.items === goodItems) {
      base.__alfa_catalog_snapshot_at = Number(lastGoodMenu.at) || Date.now();
    }
    /* الأجهزة التي لديها لقطة محلية قديمة لا تُجبر على pull جديد بعد
       bootstrap. لذلك نمرر فقط أصناف المنيو المضافة في هذا الإصدار،
       دون استبدال تعديلات المستخدم أو إعادة بقية السحابة بصمت. */
    const catalogPatch = window.ALFA_LOCAL_CATALOG_PATCH;
    const patchVersion = catalogPatch && String(catalogPatch.version || '');
    const patchVersions = (base.__alfa_catalog_patch_versions && typeof base.__alfa_catalog_patch_versions === 'object')
      ? base.__alfa_catalog_patch_versions : {};
    if (catalogPatch && patchVersion && !patchVersions[patchVersion]) {
      if (Array.isArray(catalogPatch.items)) {
        const currentIds = {};
        (Array.isArray(base.items) ? base.items : []).forEach(function (row) {
          if (row && row.id != null) currentIds[String(row.id)] = true;
        });
        const additions = catalogPatch.items
          .filter(function (row) { return row && row.id != null && !currentIds[String(row.id)]; })
          .map(function (row) { return JSON.parse(JSON.stringify(row)); });
        if (additions.length) base.items = (Array.isArray(base.items) ? base.items : []).concat(additions);
      }
      const updates = {};
      (Array.isArray(catalogPatch.updates) ? catalogPatch.updates : []).forEach(function (row) {
        if (row && row.id != null) updates[String(row.id)] = row;
      });
      if (Object.keys(updates).length) {
        base.items = (Array.isArray(base.items) ? base.items : []).map(function (row) {
          const update = row && updates[String(row.id)];
          return update ? Object.assign({}, row, update) : row;
        });
      }
      /* الحذف الصريح جزء من patch الإصدار حتى لا تعيد الأجهزة التي
         لديها snapshot/IndexedDB قديمة أصنافاً حُذفت من المنيو. */
      const deletedPatchIds = new Set((Array.isArray(catalogPatch.deleted_items)
        ? catalogPatch.deleted_items : []).map(function (id) { return String(id); }));
      if (deletedPatchIds.size) {
        base.items = (Array.isArray(base.items) ? base.items : []).filter(function (row) {
          return row && !deletedPatchIds.has(String(row.id));
        });
      }
      patchVersions[patchVersion] = Date.now();
      base.__alfa_catalog_patch_versions = patchVersions;
    }
    base.__alfa_catalog_initialized = true;
    if (!lastGoodMenu && embeddedCatalog
        && Array.isArray(base.items) && base.items.length
        && Array.isArray(base.categories) && base.categories.length) {
      try {
        if (window.SyncStorage && SyncStorage.setKey) {
          SyncStorage.setKey('menu_last_good_v1', {
            items: JSON.parse(JSON.stringify(base.items)),
            cats: JSON.parse(JSON.stringify(base.categories)),
            at: Date.now(),
          });
        }
      } catch (e) {}
    }

    const embeddedBusiness = window.ALFA_LOCAL_BUSINESS_SNAPSHOT;
    const savedHasBusiness = !!(saved && saved.__alfa_business_initialized === true);
    if (embeddedBusiness && !savedHasBusiness) {
      base.inventory = JSON.parse(JSON.stringify(embeddedBusiness.inventory || []));
      base.inventory_materials = JSON.parse(JSON.stringify(embeddedBusiness.inventory_materials || []));
      base.inventory_log = JSON.parse(JSON.stringify(embeddedBusiness.inventory_log || []));
      base.expenditures = JSON.parse(JSON.stringify(embeddedBusiness.expenditures || []));
      base.expenditures_list = base.expenditures;
      base.material_purchases = JSON.parse(JSON.stringify(embeddedBusiness.material_purchases || []));
    }
    base.__alfa_business_initialized = true;
    purgeLegacyLocalData(base);
    const safeQueue = (queue || []).filter(function (op) {
      return !(op && legacyRow(op.table || '', op.row || { id: op.row_id }));
    });
    if (window.SyncQueue && window.SyncQueue.hydrate) window.SyncQueue.hydrate(safeQueue);
    if (window.SyncStorage && window.SyncStorage.saveQueue && safeQueue.length !== (queue || []).length) {
      window.SyncStorage.saveQueue(safeQueue);
    }

    /* طبّق ما كُتب محلياً وبقي في الصندوق الدائم قبل تحرير الشاشات.
       هذه قراءة IndexedDB فقط، وليست pull من قاعدة البيانات. */
    function mergeArrayBox(name, key) {
      if (!window.AlfaOutbox || !AlfaOutbox.snapshot || !AlfaOutbox.mergeLists) return;
      const box = AlfaOutbox.snapshot(name);
      if (!box || (!Object.keys(box.rows || {}).length && !(box.dels || []).length)) return;
      base[key] = AlfaOutbox.mergeLists(Array.isArray(base[key]) ? base[key] : [], box);
    }
    function mergeMenuBox() {
      if (!window.MenuOutbox || !MenuOutbox.snapshot) return;
      const box = MenuOutbox.snapshot();
      if (!box) return;
      const merge = function (list, rows, dels) {
        const deleted = {};
        (dels || []).forEach(function (id) { deleted[String(id)] = true; });
        const byId = {};
        (rows || []).forEach(function (row) { if (row && row.id != null) byId[String(row.id)] = row; });
        const seen = {};
        const out = (list || []).filter(function (row) {
          const id = String(row && row.id != null ? row.id : '');
          if (deleted[id]) return false;
          if (byId[id]) { seen[id] = true; return false; }
          return true;
        });
        Object.keys(byId).forEach(function (id) { if (!deleted[id] && !seen[id]) out.push(byId[id]); });
        return out;
      };
      base.categories = merge(base.categories, box.cats, box.delCats);
      base.items = merge(base.items, box.items, box.delItems);
    }
    function applyPendingLocal() {
      mergeMenuBox();
      [
        ['customers', 'customers'], ['invoices', 'invoices'],
        ['employees', 'employees'], ['suppliers', 'suppliers'],
        ['inventory', 'inventory'], ['contracts', 'contracts'],
        ['expenditures', 'expenditures'], ['purchases', 'material_purchases'],
        ['audit', 'audit_log'], ['loyalty_ledger', 'loyalty_ledger'],
        ['offers', 'offers'], ['shifts', 'shifts_history'],
        ['online_orders', 'online_orders'], ['agents', 'delivery_agents'],
      ].forEach(function (pair) { mergeArrayBox(pair[0], pair[1]); });
      base.expenditures_list = base.expenditures || [];
    }

    /* حاجز أخير قبل تحرير الشاشة: حتى لو أعاد مسار محلي قديم أو صندوق
       معلق لقطة فارغة بعد القراءة، لا نسمح أبداً أن تصبح ذاكرة المنيو
       صفراً ما دام أحد المصادر الكاملة (data.js، lastGood، أو outbox)
       يحتوي 202/8. هذا ليس Cloud Pull ولا يمسح الحذف الصريح. */
    function ensureCompleteMenuBeforeReady() {
      const embedded = window.ALFA_LOCAL_CATALOG_SNAPSHOT || {};
      const embeddedItems = Array.isArray(embedded.items) ? embedded.items : [];
      const embeddedCats = Array.isArray(embedded.categories) ? embedded.categories : [];
      const currentItems = Array.isArray(base.items) ? base.items : [];
      const currentCats = Array.isArray(base.categories) ? base.categories : [];
      const goodItems = lastGoodMenu && Array.isArray(lastGoodMenu.items) ? lastGoodMenu.items : [];
      const goodCats = lastGoodMenu && Array.isArray(lastGoodMenu.cats) ? lastGoodMenu.cats : [];
      const box = window.MenuOutbox && MenuOutbox.snapshot ? MenuOutbox.snapshot() : null;
      const boxItems = box && Array.isArray(box.items) ? box.items : [];
      const boxCats = box && Array.isArray(box.cats) ? box.cats : [];
      const candidates = [
        { items: currentItems, cats: currentCats, at: 4 },
        { items: boxItems, cats: boxCats, at: 3 },
        { items: goodItems, cats: goodCats, at: 2 },
        { items: embeddedItems, cats: embeddedCats, at: 1 },
      ].filter(function (x) { return x.items.length && x.cats.length; });
      candidates.sort(function (a, b) {
        return (b.items.length - a.items.length)
          || (b.cats.length - a.cats.length)
          || (b.at - a.at);
      });
      const best = candidates[0];
      if (!best) return;
      const cloneRows = function (rows) {
        return (Array.isArray(rows) ? rows : []).map(function (row) {
          return JSON.parse(JSON.stringify(row));
        });
      };
      const mergeRows = function (seed, overlay) {
        const out = cloneRows(seed);
        const byId = {};
        out.forEach(function (row) { if (row && row.id != null) byId[String(row.id)] = row; });
        (Array.isArray(overlay) ? overlay : []).forEach(function (row) {
          if (!row || row.id == null) return;
          const id = String(row.id);
          const copy = JSON.parse(JSON.stringify(row));
          if (byId[id]) Object.assign(byId[id], copy);
          else { byId[id] = copy; out.push(copy); }
        });
        return out;
      };
      const seedItems = (currentItems.length === best.items.length && currentCats.length === best.cats.length)
        ? currentItems : best.items;
      const seedCats = (currentItems.length === best.items.length && currentCats.length === best.cats.length)
        ? currentCats : best.cats;
      let items = mergeRows(seedItems, boxItems);
      let cats = mergeRows(seedCats, boxCats);
      const deletedItems = new Set((box && box.delItems || []).map(function (id) { return String(id); }));
      /* لا تسمح لقطة Outbox قديمة بإعادة صنف حُذف في patch الحالي. */
      (Array.isArray(catalogPatch && catalogPatch.deleted_items) ? catalogPatch.deleted_items : [])
        .forEach(function (id) { deletedItems.add(String(id)); });
      const deletedCats = new Set((box && box.delCats || []).map(function (id) { return String(id); }));
      cats = cats.filter(function (row) { return row && !deletedCats.has(String(row.id)); });
      items = items.filter(function (row) {
        return row && !deletedItems.has(String(row.id))
          && !deletedCats.has(String(row.category_id));
      });
      base.items = items;
      base.categories = cats;
    }

    /* عند تشغيل الصفحة من localhost أو عنوان LAN، الخادم المحلي هو مصدر
       المنيو الفعلي. كانت الصفحة تستعيد لقطة IndexedDB القديمة وتعرضها
       فوق local-store من دون قراءة items المحلية عند الإقلاع؛ لذلك كان
       الخادم يحمل 99 بينما الإدارة والكاشير يعرضان 2000. نقرأ المنيو
       المحلية مرة واحدة قبل تحرير الشاشة، ثم نعيد تطبيق صندوق المتصفح
       فوقها حتى لا يُستبدل تعديل أحدث لم يصل إلى الخادم بعد. */
    function pullLocalMenuAtStartup() {
      try {
        const localMode = !!(window.AlfaSB && AlfaSB.localMode && AlfaSB.localMode());
        if (!localMode || !window.MenuSync || !MenuSync.pull) return Promise.resolve({ skipped: true, reason: 'not-local-mode' });
        const pull = Promise.resolve(MenuSync.pull({ localOnly: true })).catch(function (e) {
          return { skipped: true, reason: String(e && e.message || e) };
        });
        return Promise.race([
          pull,
          new Promise(function (resolve) {
            setTimeout(function () {
              resolve({ skipped: true, reason: 'local-menu-pull-timeout' });
            }, 2200);
          }),
        ]);
      } catch (e) {
        return Promise.resolve({ skipped: true, reason: String(e && e.message || e) });
      }
    }

    /* تهيئة الصناديق قبل محاولة رفع المعلّقات فقط. */
    const localOutboxWork = Promise.all([
      (window.AlfaOutbox && AlfaOutbox.hydrateAll) ? AlfaOutbox.hydrateAll() : Promise.resolve(),
      (window.MenuOutbox && MenuOutbox.hydrate) ? MenuOutbox.hydrate() : Promise.resolve(),
    ]).then(function () {
      return purgeLegacyOutboxes();
    }).catch(function () {});
    /* IndexedDB قد يظل pending في تبويب أُغلق أثناء ترقية قاعدة البيانات.
       لا نوقف واجهة البيع بسببه؛ العمل الأصلي يستمر، لكن بوابة الإقلاع
       تتابع بعد 2.2 ثانية من baseline المحلي المضمّن. */
    const localOutboxReady = Promise.race([
      localOutboxWork,
      new Promise(function (resolve) {
        setTimeout(function () {
          window.__ALFA_READY_RELEASE = window.__ALFA_READY_RELEASE || 'outbox-timeout';
          resolve({ skipped: true, reason: 'local-outbox-timeout' });
        }, 2200);
      }),
    ]);

    let __bgResolve = function () {};
    window.__ALFA_BG_P = new Promise(function (r) { __bgResolve = r; });
    const bgDone = function () {
      try {
        const ip = base.invoice_print_settings || (window.DEMO_DATA && DEMO_DATA.invoice_print_settings);
        if (ip && window.alfaApplyInvoicePrint) window.alfaApplyInvoicePrint(ip);
        const pr = base.pos_rules || (window.DEMO_DATA && DEMO_DATA.pos_rules);
        if (pr && pr.require_shift != null) {
          try { localStorage.setItem('alfaprosys_require_shift', pr.require_shift ? '1' : '0'); } catch (e2) {}
        }
      } catch (e) {}
      __bgResolve();
      try { window.dispatchEvent(new Event('alfa:cloud-ready')); } catch (e) {}
    };

    /* الرسم يفتح بعد اكتمال القراءة المحلية فقط. بعده يبدأ الرفع أولاً
       ثم الجلب الآلي المحروس بنسخة قبلية؛ لا يوجد polling متكرر. */
    localOutboxReady.then(function () {
      applyPendingLocal();
      purgeLegacyLocalData(base);
      return pullLocalMenuAtStartup().then(function () {
        /* إذا كان هناك تعديل متصفح معلّق أحدث من local-store، يبقى هو
           الفائز بعد قراءة الخادم المحلي. */
        applyPendingLocal();
        purgeLegacyLocalData(base);
        ensureCompleteMenuBeforeReady();
        window.__ALFA_MERGING = false;
        try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
        readyResolve();
        /* المزامنة الثنائية الآلية تبدأ بعد تثبيت اللقطة المحلية؛ الجلب
           يمر عبر AlfaAutoSync ويحفظ نسخة قبلية قبل أي تغيير محلي. */
        try { if (window.AlfaAutoSync && window.AlfaAutoSync.start) window.AlfaAutoSync.start(); } catch (e) {}
        setTimeout(function () {
          const available = !window.alfaTransportAvailable || window.alfaTransportAvailable();
          if (!available) {
            if (window.AlfaCloud) window.AlfaCloud.menu = { state: 'local', error: 'يعمل من المصدر المحلي — بدون اتصال' };
            bgDone();
            return;
          }
          const upload = (window.SyncRemote && window.SyncRemote.flush)
            ? window.SyncRemote.flush()
            : Promise.resolve({ skipped: true, reason: 'no-upload-engine' });
          Promise.resolve(upload).catch(function () { return null; }).then(function () {
            try { if (window.alfaPersist) window.alfaPersist(); } catch (e) {}
            if (window.AlfaCloud) window.AlfaCloud.menu = { state: 'local', items: (base.items || []).length, cats: (base.categories || []).length };
            bgDone();
          });
        }, 0);
      });
    });
  }

  const loadData = (window.SyncStorage && window.SyncStorage.load)
    ? Promise.resolve(window.SyncStorage.load())
    : Promise.resolve(null);
  const loadQ = (window.SyncStorage && window.SyncStorage.loadQueue)
    ? Promise.resolve(window.SyncStorage.loadQueue())
    : Promise.resolve([]);
  const loadGoodMenu = (window.SyncStorage && window.SyncStorage.getKey)
    ? Promise.resolve(window.SyncStorage.getKey('menu_last_good_v1'))
    : Promise.resolve(null);
  const hang = setTimeout(function () { finish(null, [], null); }, 4000);
  Promise.all([loadData, loadQ, loadGoodMenu]).then(function (res) {
    clearTimeout(hang);
    finish(res[0], res[1], res[2]);
  }).catch(function () {
    clearTimeout(hang);
    finish(null, [], null);
  });
})();

/* الموردون يُقرأون من قاعدة البيانات أو اللقطة المحلية الحقيقية فقط. */
window.DEMO_DATA.suppliers = window.DEMO_DATA.suppliers || [];

/* سجل التعديلات الموحد (audit) — يكتب فيه كل النظام عبر AlfaAudit.log */
window.DEMO_DATA.audit_log = window.DEMO_DATA.audit_log || [];
window.__auditSeq = (window.DEMO_DATA.audit_log.reduce((m, l) => Math.max(m, l.id), 0) || 0) + 1;
window.AlfaAudit = {
  log(module, action, detail, who) {
    try {
      const d = new Date();
      const row = {
        id: window.__auditSeq++,
        at: d.toISOString().slice(0, 10) + 'T' + d.toTimeString().slice(0, 5),
        module, action, detail: String(detail || ''), who: who || 'المستخدم',
      };
      window.DEMO_DATA.audit_log.unshift(row);
      if (window.AuditSync && AuditSync.pushOne) AuditSync.pushOne(row);
    } catch (e) {}
  },
};

/* 🎁 الولاء — نقاط ومستويات ومكافآت (تبويب داخل شاشة العملاء) */
window.DEMO_DATA.loyalty = window.DEMO_DATA.loyalty || {
  pointsPer1000: 1,
  rewards: [],
};
window.DEMO_DATA.loyalty_ledger = window.DEMO_DATA.loyalty_ledger || [];
window.__loySeq = ((window.DEMO_DATA.loyalty_ledger.reduce((m,l)=>Math.max(m,l.id),0))||0) + 1;
window.Loyalty = {
  earned(c) {
    const ph = String(c.phone || '').trim();
    if (!ph) return 0;
    const rate = window.DEMO_DATA.loyalty.pointsPer1000 || 1;
    const spent = (window.DEMO_DATA.invoices || [])
      .filter(i => i.status !== 'cancelled' && String(i.phone || '').trim() === ph)
      .reduce((s, i) => s + (i.total || 0), 0);
    return Math.floor(spent / 1000 * rate);
  },
  points(c) {
    const led = (window.DEMO_DATA.loyalty_ledger || []).filter(l => l.customer_id === c.id);
    const delta = led.reduce((s, l) =>
      l.type === 'manual_add' ? s + l.pts : (l.type === 'manual_sub' || l.type === 'redeem') ? s - l.pts : s, 0);
    return Math.max(0, this.earned(c) + delta);
  },
  level(pts) {
    if (pts >= 500) return { key: 'gold',   icon: '🥇', label: 'ذهبي', cls: 'loy-gold' };
    if (pts >= 100) return { key: 'silver', icon: '🥈', label: 'فضي',  cls: 'loy-silver' };
    return { key: 'bronze', icon: '🥉', label: 'برونزي', cls: 'loy-bronze' };
  },
  add(customerId, type, pts, note) {
    const row = {
      id: window.__loySeq++, customer_id: customerId,
      at: new Date().toISOString().slice(0,10) + 'T' + new Date().toTimeString().slice(0,5),
      type, pts: Math.abs(Number(pts) || 0), note: note || '', by: 'المدير',
    };
    window.DEMO_DATA.loyalty_ledger.unshift(row);
    if (window.LoyaltySync && LoyaltySync.pushOne) LoyaltySync.pushOne(row);
  },
};

/* ================================================================
   بيانات التوصيل — عمال وشركات
   ================================================================ */
window.DEMO_DATA.delivery_agents = window.DEMO_DATA.delivery_agents || [];

/* حقل delivery_info يُضاف على كل فاتورة توصيل عند الإسناد:
   { agent_id, agent_name, status, fee, assigned_at, delivered_at, customer_feedback } */

/* إضافة منيو الإصدار الحالي للأجهزة التي لديها لقطة bootstrap قديمة.
   تُدمج بالمعرّف فقط؛ لا تستبدل اللقطة المحلية ولا تُطلق pull جديداً. */
window.ALFA_LOCAL_CATALOG_PATCH = {
  "version": "menu-cheese-types-2026-11-02",
  "items": [
    {
      "id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "كريسبي سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 4,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 4
    },
    {
      "id": "5b8e5bf7-fc59-4d62-b990-ba98c9e97df8",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "كريسبي وجبنة سمون دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 9,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 9
    },
    {
      "id": "bf046416-428f-4b8f-bb0c-95e77934adc2",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "كريسبي وجبنة شراك",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 10,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 10
    },
    {
      "id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي وجبنة",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة كريسبي وجبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 12,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 12
    },
    {
      "id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي وجبنة عربي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة كريسبي وجبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 16,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 16
    },
    {
      "id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "مكسيكي سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 23,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 23
    },
    {
      "id": "3331df36-3180-4e80-ae61-a6f2fbca679a",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "مكسيكي وجبنة عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 25,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 25
    },
    {
      "id": "2d751f9e-fc79-4693-b104-f792f5252da8",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "مكسيكي وجبنة سمون",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 26,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 26
    },
    {
      "id": "004658cc-14f4-4bad-b7e5-19d851ebfbeb",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "مكسيكي وجبنة سمون دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 28,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 28
    },
    {
      "id": "73241ca1-369c-423f-bd9f-4802643fc386",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "مكسيكي وجبنة شراك",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 29,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 29
    },
    {
      "id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة مكسيكي وجبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 31,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 31
    },
    {
      "id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة مكسيكي وجبنة عربي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة مكسيكي وجبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 33,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 33
    },
    {
      "id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "زنجر سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 40,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 40
    },
    {
      "id": "c18ad915-8650-49fe-af6a-807b8c0f1cc6",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "زنجر وجبنة سمون دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 45,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 45
    },
    {
      "id": "5c4fe9bd-4b1d-410b-a344-ec99f92093cd",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "زنجر وجبنة شراك",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 46,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 46
    },
    {
      "id": "72b8d925-6205-4ec7-a532-9298e3c78119",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر وجبنة",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة زنجر وجبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 48,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 48
    },
    {
      "id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر وجبنة عربي",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة زنجر وجبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 51,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 51
    },
    {
      "id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "فاهيتا سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 58,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 58
    },
    {
      "id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "سكالوب سمون دبل",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 80,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 80
    },
    {
      "id": "e18e45ba-a894-463a-a2d6-99f4777dcf32",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "سكالوب وجبنة سمون دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 85,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 85
    },
    {
      "id": "f5928837-b481-4c73-9da5-4dc6f1b2af2c",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "سكالوب وجبنة شراك",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 86,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 86
    },
    {
      "id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سكالوب وجبنة",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة سكالوب وجبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 88,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 88
    },
    {
      "id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سكالوب وجبنة عربي",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة سكالوب وجبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 91,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 91
    },
    {
      "id": "89e26048-c58c-47b1-8429-488901fc64a4",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "شيش سمون دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 98,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 98
    },
    {
      "id": "cd20538c-d1c7-4c5e-ae3b-72fd32bbc7b5",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "شيش مع جبنة سمون دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 103,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 103
    },
    {
      "id": "b4f97451-546c-4617-ba5c-ed6a60a431b0",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "شيش مع جبنة شراك",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 104,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 104
    },
    {
      "id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة شيش مع جبنة",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة شيش مع جبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 105,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 105
    },
    {
      "id": "319436a6-da45-4a5c-997c-b79191b1c21d",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة شيش مع جبنة عربي",
      "family": "شيش",
      "option_name": "شيش",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة شيش مع جبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 108,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 108
    },
    {
      "id": "48942aa3-7dc3-463b-9641-215d827db190",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "زنجر مكسيكي سمون دبل",
      "price": 38000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 121,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 121
    },
    {
      "id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "زنجر مكسيكي شراك",
      "price": 28000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 122,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 122
    },
    {
      "id": "bfd844ba-2b4c-4077-902a-83e054baa864",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر مكسيكي وجبنة عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 123,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 123
    },
    {
      "id": "eb1b3c13-e647-49fa-a544-c67f4870679d",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر مكسيكي وجبنة سمون",
      "price": 34000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 124,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 124
    },
    {
      "id": "cc586903-ddec-45ec-904c-6de6877bb9e1",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "دبل",
      "variant_clean": "دبل",
      "name": "زنجر مكسيكي وجبنة دبل",
      "price": 42000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 125,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 125
    },
    {
      "id": "ff8bc8c1-dc12-44b1-8cc7-e2e2c9dbd9a9",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون دبل",
      "variant_clean": "سمون دبل",
      "name": "زنجر مكسيكي وجبنة سمون دبل",
      "price": 42000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 126,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 126
    },
    {
      "id": "9e2da0e1-9cd8-44a6-a0e7-7ec4c1f5b60c",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "شراك",
      "variant_clean": "شراك",
      "name": "زنجر مكسيكي وجبنة شراك",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 127,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 127
    },
    {
      "id": "7df83160-116b-4413-97d1-81990495bfc9",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "وجبة زنجر مكسيكي وجبنة سمون",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 128,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 128
    },
    {
      "id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر مكسيكي وجبنة عربي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة زنجر مكسيكي وجبنة عربي",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 130,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 130
    },
    {
      "id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "كريسبي شراك دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 17,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 17
    },
    {
      "id": "942ef54b-78c0-5694-b04c-b74c34097839",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "كريسبي وجبنة شراك دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 18,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 18
    },
    {
      "id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "مكسيكي شراك دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 34,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 34
    },
    {
      "id": "0f4d7634-6aa5-5c68-ba6c-02734a4d31b9",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "مكسيكي وجبنة شراك دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 35,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 35
    },
    {
      "id": "41c32d3d-8824-53bc-960a-a214f7e75361",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "زنجر شراك دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 52,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 52
    },
    {
      "id": "0b6b153f-ee5a-5f82-8d5e-8b57d184976b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "زنجر وجبنة شراك دبل",
      "price": 40000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 53,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 400,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 53
    },
    {
      "id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "فاهيتا شراك دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 62,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 62
    },
    {
      "id": "536342e0-5590-5447-ba42-503e71390c56",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "سكالوب شراك دبل",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 92,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 92
    },
    {
      "id": "ecb49390-e4e5-51f8-bdcb-20cdb0cff5b7",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "سكالوب وجبنة شراك دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 93,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 93
    },
    {
      "id": "3a904ed5-851d-5334-8508-4a48de843258",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "شيش شراك دبل",
      "price": 36000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 109,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 360,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 109
    },
    {
      "id": "79c845fb-dd10-5d4a-8139-7d67a53a9aab",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "شيش مع جبنة شراك دبل",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 110,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 110
    },
    {
      "id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "زنجر مكسيكي شراك دبل",
      "price": 38000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 131,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 131
    },
    {
      "id": "74a98a9f-c576-5f96-99c9-d6543da31e13",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "شراك دبل",
      "variant_clean": "شراك دبل",
      "name": "زنجر مكسيكي وجبنة شراك دبل",
      "price": 42000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 132,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": null,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 132
    },
    {
      "id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
      "category_id": "e93643c4-f01d-44a6-86e6-b7186443216d",
      "category_name": "الشاورما",
      "base_name": "وجبة شاورما",
      "family": "شاورما",
      "option_name": "شاورما",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة شاورما إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 22,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 1,
      "item_order": 22
    },
    {
      "id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة كريسبي",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة كريسبي إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 19,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 19
    },
    {
      "id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة مكسيكي",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة مكسيكي إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 36,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 36
    },
    {
      "id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة زنجر إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 54,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 54
    },
    {
      "id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة فاهيتا",
      "family": "فاهيتا",
      "option_name": "فاهيتا",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة فاهيتا إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 63,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 63
    },
    {
      "id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سكالوب",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة سكالوب إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 94,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 94
    },
    {
      "id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة شيش",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة شيش إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 111,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 111
    },
    {
      "id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة زنجر مكسيكي",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة زنجر مكسيكي إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 133,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 133
    },
    {
      "id": "7616d4c1-749d-545e-9653-2498c2015ff3",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "كوكا كولا",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "عائلي",
      "variant_clean": "عائلي",
      "name": "كوكا كولا عائلي",
      "price": 18000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 9,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 180,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 9
    },
    {
      "id": "4e2a001c-739b-554a-8916-def3fdadaead",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "كوكا كولا",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "لتر",
      "variant_clean": "لتر",
      "name": "كوكا كولا لتر",
      "price": 11000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 10,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 110,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 10
    },
    {
      "id": "6465fe78-fa09-5640-9adf-7bdbb549ecfe",
      "category_id": "2cda42ab-9980-4171-afa1-0afe0e06fcad",
      "category_name": "المشروبات الباردة",
      "base_name": "كوكا كولا",
      "family": "مشروبات باردة",
      "option_name": "مشروبات باردة",
      "variant": "تنك",
      "variant_clean": "تنك",
      "name": "كوكا كولا تنك",
      "price": 8000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 11,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 80,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 8,
      "item_order": 11
    },
    {
      "id": "c2b20f27-044b-5693-b710-f71532fd07af",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة سوبريم",
      "family": "سوبريم",
      "option_name": "سوبريم",
      "variant": "إيطالي",
      "variant_clean": "إيطالي",
      "name": "وجبة سوبريم إيطالي",
      "price": 65000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": false,
      "sort_order": 117,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 650,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 117
    },
    {
      "id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "وجبة برغر لحم",
      "family": "برغر",
      "option_name": "برغر",
      "variant": null,
      "variant_clean": null,
      "name": "وجبة برغر لحم",
      "price": 45000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 71,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 450,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 71
    },
    {
      "id": "2e2d5cf3-af5f-4b94-b7c8-8ecda1cc0756",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة قشقوان",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "كريسبي وجبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 134,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 134
    },
    {
      "id": "bc314a86-c7b4-4b49-8030-71563ed0af9f",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة قشقوان",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "كريسبي وجبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 135,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 135
    },
    {
      "id": "de23f386-edab-4b8f-8586-3aeb9656d08c",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة قشقوان",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "مكسيكي وجبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 136,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 136
    },
    {
      "id": "decbacc8-c03f-4db2-8ff9-08ffdffc4283",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة قشقوان",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "مكسيكي وجبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 137,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 137
    },
    {
      "id": "4c86d012-d39e-495e-9a07-84f31d69fdfd",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة قشقوان",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر وجبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 138,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 138
    },
    {
      "id": "a6dcb81f-161d-4986-9e86-18432df912cc",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة قشقوان",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر وجبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 139,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 139
    },
    {
      "id": "ffa49a86-8a8e-4b17-8afc-d43e25b88a89",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة قشقوان",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "سكالوب وجبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 140,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 140
    },
    {
      "id": "daf90cc9-d749-4058-a7b7-3a3fd384174b",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة قشقوان",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "سكالوب وجبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 141,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 141
    },
    {
      "id": "c7195f93-f7d2-428f-b86f-3a735ec78ae4",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة قشقوان",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "شيش مع جبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 142,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 142
    },
    {
      "id": "0755f9cb-b66e-4cd6-bad2-827f5a64944e",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة قشقوان",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "شيش مع جبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 143,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 143
    },
    {
      "id": "f8630e06-a800-4a00-9dea-8fcba3e75306",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة قشقوان",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر مكسيكي وجبنة قشقوان عادي",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 144,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 144
    },
    {
      "id": "ff7365c7-719b-4ed1-b924-1c3b2797e0de",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة قشقوان",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر مكسيكي وجبنة قشقوان سمون",
      "price": 35000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 145,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 350,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 145
    }
  ],
  "updates": [
    {
      "id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
      "item_order": 1,
      "sort_order": 1,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
      "item_order": 2,
      "sort_order": 2,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
      "item_order": 3,
      "sort_order": 3,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
      "item_order": 4,
      "sort_order": 4,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
      "item_order": 5,
      "sort_order": 5,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "6c1296bd-7565-4b54-b289-dd9a7f63ec51",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة تشيدر",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "كريسبي وجبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 6,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 6
    },
    {
      "id": "50ff822d-4142-4daa-864d-3e207f1550eb",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "كريسبي وجبنة تشيدر",
      "family": "كريسبي",
      "option_name": "كريسبي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "كريسبي وجبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 7,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851618/1786848438058_xtho7f.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 7
    },
    {
      "id": "fb1d3d99-37e6-4c39-a1cf-89764ec67374",
      "item_order": 8,
      "sort_order": 8,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "5b8e5bf7-fc59-4d62-b990-ba98c9e97df8",
      "item_order": 9,
      "sort_order": 9,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "bf046416-428f-4b8f-bb0c-95e77934adc2",
      "item_order": 10,
      "sort_order": 10,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "76432160-c0d2-4ef4-b595-623a02e6076f",
      "item_order": 11,
      "sort_order": 11,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
      "item_order": 12,
      "sort_order": 12,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "81cf9777-c58d-417b-935e-e0753f20de02",
      "item_order": 13,
      "sort_order": 13,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
      "item_order": 14,
      "sort_order": 14,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "6fc76390-d161-47ef-9888-2a9734af8789",
      "item_order": 15,
      "sort_order": 15,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
      "item_order": 16,
      "sort_order": 16,
      "family": "كريسبي",
      "option_name": "كريسبي"
    },
    {
      "id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
      "item_order": 20,
      "sort_order": 20,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
      "item_order": 21,
      "sort_order": 21,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
      "item_order": 22,
      "sort_order": 22,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
      "item_order": 23,
      "sort_order": 23,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
      "item_order": 24,
      "sort_order": 24,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "3331df36-3180-4e80-ae61-a6f2fbca679a",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة تشيدر",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "مكسيكي وجبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 25,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 25
    },
    {
      "id": "2d751f9e-fc79-4693-b104-f792f5252da8",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "مكسيكي وجبنة تشيدر",
      "family": "مكسيكي",
      "option_name": "مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "مكسيكي وجبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 26,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 26
    },
    {
      "id": "1c5cef3b-e008-4273-8ace-c2ee219ecfad",
      "item_order": 27,
      "sort_order": 27,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "004658cc-14f4-4bad-b7e5-19d851ebfbeb",
      "item_order": 28,
      "sort_order": 28,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "73241ca1-369c-423f-bd9f-4802643fc386",
      "item_order": 29,
      "sort_order": 29,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
      "item_order": 30,
      "sort_order": 30,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
      "item_order": 31,
      "sort_order": 31,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
      "item_order": 32,
      "sort_order": 32,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
      "item_order": 33,
      "sort_order": 33,
      "family": "مكسيكي",
      "option_name": "مكسيكي"
    },
    {
      "id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
      "item_order": 37,
      "sort_order": 37,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
      "item_order": 38,
      "sort_order": 38,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
      "item_order": 39,
      "sort_order": 39,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
      "item_order": 40,
      "sort_order": 40,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "78122d88-a28e-408c-af31-601c0835c5bd",
      "item_order": 41,
      "sort_order": 41,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "141ca984-861e-4c00-af4f-c9e002d6ee32",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة تشيدر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر وجبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 42,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 42
    },
    {
      "id": "1d9c4f7c-870d-4aa1-bc86-d10ea9ba944e",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر وجبنة تشيدر",
      "family": "زنجر",
      "option_name": "زنجر",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر وجبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 43,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851609/1786848947494_fpbz8v.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 43
    },
    {
      "id": "34cdc32e-f7bb-4852-a17f-536028f8b3c6",
      "item_order": 44,
      "sort_order": 44,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "c18ad915-8650-49fe-af6a-807b8c0f1cc6",
      "item_order": 45,
      "sort_order": 45,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "5c4fe9bd-4b1d-410b-a344-ec99f92093cd",
      "item_order": 46,
      "sort_order": 46,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
      "item_order": 47,
      "sort_order": 47,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "72b8d925-6205-4ec7-a532-9298e3c78119",
      "item_order": 48,
      "sort_order": 48,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
      "item_order": 49,
      "sort_order": 49,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
      "item_order": 50,
      "sort_order": 50,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
      "item_order": 51,
      "sort_order": 51,
      "family": "زنجر",
      "option_name": "زنجر"
    },
    {
      "id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
      "item_order": 55,
      "sort_order": 55,
      "family": "فاهيتا",
      "option_name": "فاهيتا"
    },
    {
      "id": "56b462d4-5582-4132-b18a-b8730b8809ab",
      "item_order": 56,
      "sort_order": 56,
      "family": "فاهيتا",
      "option_name": "فاهيتا"
    },
    {
      "id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
      "item_order": 57,
      "sort_order": 57,
      "family": "فاهيتا",
      "option_name": "فاهيتا"
    },
    {
      "id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
      "item_order": 58,
      "sort_order": 58,
      "family": "فاهيتا",
      "option_name": "فاهيتا"
    },
    {
      "id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
      "item_order": 59,
      "sort_order": 59,
      "family": "فاهيتا",
      "option_name": "فاهيتا"
    },
    {
      "id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
      "item_order": 60,
      "sort_order": 60,
      "family": "فاهيتا",
      "option_name": "فاهيتا"
    },
    {
      "id": "687faedb-241f-4b71-b35f-5370b38ba798",
      "item_order": 61,
      "sort_order": 61,
      "family": "فاهيتا",
      "option_name": "فاهيتا"
    },
    {
      "id": "b377a33e-61d1-4fd6-8900-e436e79e9d7b",
      "item_order": 64,
      "sort_order": 64
    },
    {
      "id": "ebed9d49-e023-4a4a-a84d-53e295994bec",
      "item_order": 65,
      "sort_order": 65
    },
    {
      "id": "30828f36-3bac-4d00-a8a1-038463507198",
      "item_order": 66,
      "sort_order": 66
    },
    {
      "id": "97a09273-432c-4698-87e0-f579945f0cb7",
      "item_order": 67,
      "sort_order": 67
    },
    {
      "id": "76fb4ad7-70f9-4b5b-8349-325ee9524421",
      "item_order": 68,
      "sort_order": 68
    },
    {
      "id": "94e48a79-cfea-4956-a99d-7c601a7202ff",
      "item_order": 69,
      "sort_order": 69
    },
    {
      "id": "6edadfe5-8cea-44a5-951a-4d911aee7083",
      "item_order": 73,
      "sort_order": 73
    },
    {
      "id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
      "item_order": 70,
      "sort_order": 70
    },
    {
      "id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
      "item_order": 77,
      "sort_order": 77,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
      "item_order": 78,
      "sort_order": 78,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
      "item_order": 79,
      "sort_order": 79,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
      "item_order": 80,
      "sort_order": 80,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
      "item_order": 81,
      "sort_order": 81,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "547aaf5a-8b8b-43b2-8533-f587a14063ab",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة تشيدر",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "سكالوب وجبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 82,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 82
    },
    {
      "id": "f2c641ba-c482-4374-a1e5-5af052818f2d",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "سكالوب وجبنة تشيدر",
      "family": "سكالوب",
      "option_name": "سكالوب",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "سكالوب وجبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 83,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851669/1786849528515_rei2rx.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 83
    },
    {
      "id": "cfa4523d-af83-4468-9975-1711293ec8b6",
      "item_order": 84,
      "sort_order": 84,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "e18e45ba-a894-463a-a2d6-99f4777dcf32",
      "item_order": 85,
      "sort_order": 85,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "f5928837-b481-4c73-9da5-4dc6f1b2af2c",
      "item_order": 86,
      "sort_order": 86,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "baec0b76-987e-4397-999c-37f1efc09302",
      "item_order": 87,
      "sort_order": 87,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
      "item_order": 88,
      "sort_order": 88,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
      "item_order": 89,
      "sort_order": 89,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
      "item_order": 90,
      "sort_order": 90,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
      "item_order": 91,
      "sort_order": 91,
      "family": "سكالوب",
      "option_name": "سكالوب"
    },
    {
      "id": "2804b934-14d2-49b8-a686-c50517bded98",
      "item_order": 95,
      "sort_order": 95,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
      "item_order": 96,
      "sort_order": 96,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
      "item_order": 97,
      "sort_order": 97,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "89e26048-c58c-47b1-8429-488901fc64a4",
      "item_order": 98,
      "sort_order": 98,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
      "item_order": 99,
      "sort_order": 99,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "a626725f-6033-4436-97be-90db615651b1",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة تشيدر",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "شيش مع جبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 100,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 100
    },
    {
      "id": "dc5ed328-1921-49fa-a90e-8d25ae651cb4",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "شيش مع جبنة تشيدر",
      "family": "شيش",
      "option_name": "شيش",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "شيش مع جبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 101,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": "https://res.cloudinary.com/dvzg70krq/image/upload/f_auto,q_auto,w_600/v1786851686/1786849602535_lfy7tt.png",
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 101
    },
    {
      "id": "5d815330-9cff-4b06-8601-6e9f798dbb4b",
      "item_order": 102,
      "sort_order": 102,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "cd20538c-d1c7-4c5e-ae3b-72fd32bbc7b5",
      "item_order": 103,
      "sort_order": 103,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "b4f97451-546c-4617-ba5c-ed6a60a431b0",
      "item_order": 104,
      "sort_order": 104,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
      "item_order": 105,
      "sort_order": 105,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "de16917f-07c3-48b9-8127-f48450b915fe",
      "item_order": 106,
      "sort_order": 106,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
      "item_order": 107,
      "sort_order": 107,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "319436a6-da45-4a5c-997c-b79191b1c21d",
      "item_order": 108,
      "sort_order": 108,
      "family": "شيش",
      "option_name": "شيش"
    },
    {
      "id": "4e750558-e273-44cd-a007-0fd366a31afa",
      "item_order": 112,
      "sort_order": 112
    },
    {
      "id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
      "item_order": 113,
      "sort_order": 113
    },
    {
      "id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
      "item_order": 114,
      "sort_order": 114
    },
    {
      "id": "c114d178-fab3-42ca-a014-8520c2b50601",
      "item_order": 115,
      "sort_order": 115
    },
    {
      "id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
      "item_order": 116,
      "sort_order": 116
    },
    {
      "id": "630bcaa1-cc28-4d54-afe9-39753c772044",
      "item_order": 118,
      "sort_order": 118,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي"
    },
    {
      "id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
      "item_order": 119,
      "sort_order": 119,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي"
    },
    {
      "id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
      "item_order": 120,
      "sort_order": 120,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي"
    },
    {
      "id": "48942aa3-7dc3-463b-9641-215d827db190",
      "item_order": 121,
      "sort_order": 121,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي"
    },
    {
      "id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
      "item_order": 122,
      "sort_order": 122,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي"
    },
    {
      "id": "bfd844ba-2b4c-4077-902a-83e054baa864",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة تشيدر",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "عادي",
      "variant_clean": "عادي",
      "name": "زنجر مكسيكي وجبنة تشيدر عادي",
      "price": 30000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 123,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 300,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 123
    },
    {
      "id": "eb1b3c13-e647-49fa-a544-c67f4870679d",
      "category_id": "f5c2853a-feb2-4744-bed3-d37fb7bfd532",
      "category_name": "السندويشات والغربي",
      "base_name": "زنجر مكسيكي وجبنة تشيدر",
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "variant": "سمون",
      "variant_clean": "سمون",
      "name": "زنجر مكسيكي وجبنة تشيدر سمون",
      "price": 32000,
      "cost_mode": "manual",
      "cost_manual": 0,
      "is_available": true,
      "sort_order": 124,
      "order_count": 0,
      "is_pinned_popular": false,
      "image_url": null,
      "barcode": null,
      "price_new": 320,
      "price_usd": null,
      "discount_pct": 0,
      "online_discount_pct": 0,
      "category_order": 2,
      "item_order": 124
    },
    {
      "id": "cc586903-ddec-45ec-904c-6de6877bb9e1",
      "item_order": 125,
      "sort_order": 125,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي"
    },
    {
      "id": "ff8bc8c1-dc12-44b1-8cc7-e2e2c9dbd9a9",
      "item_order": 126,
      "sort_order": 126,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي"
    },
    {
      "id": "9e2da0e1-9cd8-44a6-a0e7-7ec4c1f5b60c",
      "item_order": 127,
      "sort_order": 127,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي"
    },
    {
      "id": "7df83160-116b-4413-97d1-81990495bfc9",
      "item_order": 128,
      "sort_order": 128,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي"
    },
    {
      "id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
      "item_order": 129,
      "sort_order": 129,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي",
      "name": "وجبة زنجر مكسيكي"
    },
    {
      "id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
      "item_order": 130,
      "sort_order": 130,
      "family": "زنجر مكسيكي",
      "option_name": "زنجر مكسيكي"
    },
    {
      "id": "ae04b651-bd96-4785-b0ef-539380d2b488",
      "item_order": 74,
      "sort_order": 74
    },
    {
      "id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
      "item_order": 75,
      "sort_order": 75,
      "name": "وجبة كريسبي برغر",
      "family": "برغر",
      "option_name": "برغر"
    },
    {
      "id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
      "item_order": 76,
      "sort_order": 76,
      "name": "وجبة كريسبي برغر",
      "family": "برغر",
      "option_name": "برغر"
    },
    {
      "id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
      "item_order": 72,
      "sort_order": 72,
      "name": "وجبة برغر لحم",
      "family": "برغر",
      "option_name": "برغر",
      "variant": "دبل",
      "variant_clean": "دبل"
    },
    {
      "id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
      "item_order": 17,
      "sort_order": 17
    },
    {
      "id": "942ef54b-78c0-5694-b04c-b74c34097839",
      "item_order": 18,
      "sort_order": 18
    },
    {
      "id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
      "item_order": 19,
      "sort_order": 19
    },
    {
      "id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
      "item_order": 34,
      "sort_order": 34
    },
    {
      "id": "0f4d7634-6aa5-5c68-ba6c-02734a4d31b9",
      "item_order": 35,
      "sort_order": 35
    },
    {
      "id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
      "item_order": 36,
      "sort_order": 36
    },
    {
      "id": "41c32d3d-8824-53bc-960a-a214f7e75361",
      "item_order": 52,
      "sort_order": 52
    },
    {
      "id": "0b6b153f-ee5a-5f82-8d5e-8b57d184976b",
      "item_order": 53,
      "sort_order": 53
    },
    {
      "id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
      "item_order": 54,
      "sort_order": 54
    },
    {
      "id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
      "item_order": 62,
      "sort_order": 62
    },
    {
      "id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
      "item_order": 63,
      "sort_order": 63
    },
    {
      "id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
      "item_order": 71,
      "sort_order": 71
    },
    {
      "id": "536342e0-5590-5447-ba42-503e71390c56",
      "item_order": 92,
      "sort_order": 92
    },
    {
      "id": "ecb49390-e4e5-51f8-bdcb-20cdb0cff5b7",
      "item_order": 93,
      "sort_order": 93
    },
    {
      "id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
      "item_order": 94,
      "sort_order": 94
    },
    {
      "id": "3a904ed5-851d-5334-8508-4a48de843258",
      "item_order": 109,
      "sort_order": 109
    },
    {
      "id": "79c845fb-dd10-5d4a-8139-7d67a53a9aab",
      "item_order": 110,
      "sort_order": 110
    },
    {
      "id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
      "item_order": 111,
      "sort_order": 111
    },
    {
      "id": "c2b20f27-044b-5693-b710-f71532fd07af",
      "item_order": 117,
      "sort_order": 117
    },
    {
      "id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
      "item_order": 131,
      "sort_order": 131
    },
    {
      "id": "74a98a9f-c576-5f96-99c9-d6543da31e13",
      "item_order": 132,
      "sort_order": 132
    },
    {
      "id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
      "item_order": 133,
      "sort_order": 133
    },
    {
      "id": "e829859d-2397-45f4-81a3-48290ef9650f",
      "variant": null,
      "variant_clean": null,
      "name": "نص فروج بروستد"
    },
    {
      "id": "12b34a0b-f7b8-445b-8ecf-cebabeec4a26",
      "variant": null,
      "variant_clean": null,
      "name": "فروج بروستد طاولة"
    },
    {
      "id": "e6481b4b-87c3-4079-a995-7edac7f3861e",
      "variant": null,
      "variant_clean": null,
      "name": "نص فروج بروستد طاولة"
    }
  ],
  "deleted_items": [
    "dde75111-04eb-4701-aed1-21c96fef97d6",
    "fd389b40-bd4f-4ea8-b098-4cc55f176641",
    "eb7a47aa-efa8-4257-827c-528058ef2865"
  ]
};

/* ================================================================
   لقطة محلية فعلية للتشغيل — جُلبت من Supabase في 2026-09-29T07:50:10.467Z
   تشمل المخزون والجرد وحركات inventory_log والمصاريف ومشتريات المواد.
   لا تُستخدم كطلب شبكي؛ تُثبت محلياً قبل بدء أي شاشة.
   ================================================================ */
window.ALFA_LOCAL_BUSINESS_SNAPSHOT = {
  "fetched_at": "2026-09-29T07:50:10.467Z",
  "inventory_materials": [
    {
      "id": "inv_mig_1788608280413_4",
      "name": "سمون شاورما كبير",
      "category": "مخبوزات",
      "unit": "ربطة",
      "qty": 10.25,
      "min_qty": 10,
      "reorder_qty": 0,
      "cost_per_unit": 13333,
      "trackable": true,
      "loaves_per_bundle": 4,
      "recipe": [
        {
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
          "qty": 0.25
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 0.25
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 0.25
        },
        {
          "item_id": "50ff822d-4142-4daa-864d-3e207f1550eb",
          "qty": 0.25
        },
        {
          "item_id": "5b8e5bf7-fc59-4d62-b990-ba98c9e97df8",
          "qty": 0.25
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 0.25
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 0.25
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 0.25
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 0.25
        },
        {
          "item_id": "2d751f9e-fc79-4693-b104-f792f5252da8",
          "qty": 0.25
        },
        {
          "item_id": "004658cc-14f4-4bad-b7e5-19d851ebfbeb",
          "qty": 0.25
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 0.25
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 0.25
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 0.25
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 0.25
        },
        {
          "item_id": "1d9c4f7c-870d-4aa1-bc86-d10ea9ba944e",
          "qty": 0.25
        },
        {
          "item_id": "c18ad915-8650-49fe-af6a-807b8c0f1cc6",
          "qty": 0.25
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 0.25
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 0.25
        },
        {
          "item_id": "56b462d4-5582-4132-b18a-b8730b8809ab",
          "qty": 0.25
        },
        {
          "item_id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
          "qty": 0.25
        },
        {
          "item_id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
          "qty": 0.25
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 0.25
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 0.25
        },
        {
          "item_id": "f2c641ba-c482-4374-a1e5-5af052818f2d",
          "qty": 0.25
        },
        {
          "item_id": "e18e45ba-a894-463a-a2d6-99f4777dcf32",
          "qty": 0.25
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 0.25
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 0.25
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 0.25
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 0.25
        },
        {
          "item_id": "dc5ed328-1921-49fa-a90e-8d25ae651cb4",
          "qty": 0.25
        },
        {
          "item_id": "cd20538c-d1c7-4c5e-ae3b-72fd32bbc7b5",
          "qty": 0.25
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 0.25
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 0.25
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 0.25
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 0.25
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 0.25
        },
        {
          "item_id": "eb1b3c13-e647-49fa-a544-c67f4870679d",
          "qty": 0.25
        },
        {
          "item_id": "ff8bc8c1-dc12-44b1-8cc7-e2e2c9dbd9a9",
          "qty": 0.25
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 0.25
        },
        {
          "item_id": "bc314a86-c7b4-4b49-8030-71563ed0af9f",
          "qty": 0.25
        },
        {
          "item_id": "decbacc8-c03f-4db2-8ff9-08ffdffc4283",
          "qty": 0.25
        },
        {
          "item_id": "a6dcb81f-161d-4986-9e86-18432df912cc",
          "qty": 0.25
        },
        {
          "item_id": "daf90cc9-d749-4058-a7b7-3a3fd384174b",
          "qty": 0.25
        },
        {
          "item_id": "0755f9cb-b66e-4cd6-bad2-827f5a64944e",
          "qty": 0.25
        },
        {
          "item_id": "ff7365c7-719b-4ed1-b924-1c3b2797e0de",
          "qty": 0.25
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_a_samoun",
          "material_id": "inv_mig_1788608280413_4",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -4.75,
          "note": "جرد فعلي: سمون 41 خبزة = 10.25 ربطة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "inv_mig_1788608280413_1",
      "name": "خبز صاج / شراك",
      "category": "مخبوزات",
      "unit": "عدد",
      "qty": 0,
      "min_qty": 10,
      "reorder_qty": 0,
      "cost_per_unit": 1000,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "qty": 1,
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30"
        },
        {
          "qty": 1,
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601"
        },
        {
          "qty": 1,
          "item_id": "340b7751-2645-4635-9085-697fe1443253"
        },
        {
          "qty": 1,
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b"
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "il_1788901800084_k2va",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 14,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788901767837_rme8",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788898680351_x3w4",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788897374781_ehip",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 24,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788887433319_lmfx",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 2,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788887027330_dumt",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 56,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788887018911_gdtm",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 25,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788886670779_1kn1",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788886655356_owjh",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788818369556_b77e",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788817815000_7yq1",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788817202290_vovg",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788815918259_ajfc",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 6,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788815885428_hslf",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788815826907_9sec",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788814312362_867u",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 2,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788814177478_nxtg",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 3,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788813840373_l96z",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 2,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788812952379_q5i9",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788812666889_x9am",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788812116428_abaq",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788812066902_adt8",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788811446145_l8ob",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788810943541_evor",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 2,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788810902338_o7yg",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788809213416_cshf",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 2,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788808301375_srg6",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 6,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788806888054_0dd2",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788806672786_gdh4",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "1788608285314",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-04",
          "type": "in",
          "qty": 100,
          "note": "مشتريات سابقة",
          "cost": 1000,
          "supplier_id": null,
          "by": "المدير",
          "auto": false,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "inv_003",
      "name": "خبز صاج / شراك",
      "category": "مخبوزات",
      "unit": "ربطة",
      "qty": 0.45,
      "min_qty": 3,
      "reorder_qty": 0,
      "cost_per_unit": 8000,
      "trackable": true,
      "loaves_per_bundle": 100,
      "recipe": [
        {
          "item_id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
          "qty": 0.01
        },
        {
          "item_id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
          "qty": 0.01
        },
        {
          "item_id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
          "qty": 0.01
        },
        {
          "item_id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
          "qty": 0.01
        },
        {
          "item_id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
          "qty": 0.015
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 0.01
        },
        {
          "item_id": "bf046416-428f-4b8f-bb0c-95e77934adc2",
          "qty": 0.01
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 0.01
        },
        {
          "item_id": "73241ca1-369c-423f-bd9f-4802643fc386",
          "qty": 0.01
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 0.01
        },
        {
          "item_id": "5c4fe9bd-4b1d-410b-a344-ec99f92093cd",
          "qty": 0.01
        },
        {
          "item_id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
          "qty": 0.01
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 0.01
        },
        {
          "item_id": "f5928837-b481-4c73-9da5-4dc6f1b2af2c",
          "qty": 0.01
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 0.01
        },
        {
          "item_id": "b4f97451-546c-4617-ba5c-ed6a60a431b0",
          "qty": 0.01
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 0.01
        },
        {
          "item_id": "9e2da0e1-9cd8-44a6-a0e7-7ec4c1f5b60c",
          "qty": 0.01
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 0.015
        },
        {
          "item_id": "942ef54b-78c0-5694-b04c-b74c34097839",
          "qty": 0.015
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 0.015
        },
        {
          "item_id": "0f4d7634-6aa5-5c68-ba6c-02734a4d31b9",
          "qty": 0.015
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 0.015
        },
        {
          "item_id": "0b6b153f-ee5a-5f82-8d5e-8b57d184976b",
          "qty": 0.015
        },
        {
          "item_id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
          "qty": 0.015
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 0.015
        },
        {
          "item_id": "ecb49390-e4e5-51f8-bdcb-20cdb0cff5b7",
          "qty": 0.015
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 0.015
        },
        {
          "item_id": "79c845fb-dd10-5d4a-8139-7d67a53a9aab",
          "qty": 0.015
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 0.015
        },
        {
          "item_id": "74a98a9f-c576-5f96-99c9-d6543da31e13",
          "qty": 0.015
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_a_shraak",
          "material_id": "inv_003",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": 0.45,
          "note": "جرد فعلي: خبز شراك 45 رغيف = 0.45 ربطة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "il_1788901800084_u3qy",
          "material_id": "inv_003",
          "date": "2026-09-08",
          "type": "out",
          "qty": 1.4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788901767837_x5oh",
          "material_id": "inv_003",
          "date": "2026-09-08",
          "type": "out",
          "qty": 0.4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "inv_mig_1788608280413_5",
      "name": "خبز سياحي",
      "category": "مخبوزات",
      "unit": "ربطة",
      "qty": 25,
      "min_qty": 10,
      "reorder_qty": 0,
      "cost_per_unit": 10000,
      "trackable": true,
      "loaves_per_bundle": 12,
      "recipe": [
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 0.1667
        },
        {
          "item_id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
          "qty": 0.25
        },
        {
          "item_id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
          "qty": 0.3333
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 0.4167
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 0.5
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 0.5833
        },
        {
          "item_id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
          "qty": 0.0833
        },
        {
          "item_id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
          "qty": 0.1667
        },
        {
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
          "qty": 0.0833
        },
        {
          "item_id": "340b7751-2645-4635-9085-697fe1443253",
          "qty": 0.0833
        },
        {
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601",
          "qty": 0.0833
        },
        {
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30",
          "qty": 0.0833
        },
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 0.0833
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 0.1667
        },
        {
          "item_id": "6c1296bd-7565-4b54-b289-dd9a7f63ec51",
          "qty": 0.0833
        },
        {
          "item_id": "fb1d3d99-37e6-4c39-a1cf-89764ec67374",
          "qty": 0.1667
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 0.0833
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 0.0833
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 0.0833
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 0.0833
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 0.0833
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 0.1667
        },
        {
          "item_id": "3331df36-3180-4e80-ae61-a6f2fbca679a",
          "qty": 0.0833
        },
        {
          "item_id": "1c5cef3b-e008-4273-8ace-c2ee219ecfad",
          "qty": 0.1667
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 0.0833
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 0.0833
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 0.0833
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 0.1667
        },
        {
          "item_id": "141ca984-861e-4c00-af4f-c9e002d6ee32",
          "qty": 0.0833
        },
        {
          "item_id": "34cdc32e-f7bb-4852-a17f-536028f8b3c6",
          "qty": 0.1667
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 0.0833
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 0.0833
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 0.0833
        },
        {
          "item_id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
          "qty": 0.0833
        },
        {
          "item_id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
          "qty": 0.1667
        },
        {
          "item_id": "687faedb-241f-4b71-b35f-5370b38ba798",
          "qty": 0.0833
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 0.0833
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 0.1667
        },
        {
          "item_id": "547aaf5a-8b8b-43b2-8533-f587a14063ab",
          "qty": 0.0833
        },
        {
          "item_id": "cfa4523d-af83-4468-9975-1711293ec8b6",
          "qty": 0.1667
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 0.0833
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 0.0833
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 0.0833
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 0.0833
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 0.1667
        },
        {
          "item_id": "a626725f-6033-4436-97be-90db615651b1",
          "qty": 0.0833
        },
        {
          "item_id": "5d815330-9cff-4b06-8601-6e9f798dbb4b",
          "qty": 0.1667
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 0.0833
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 0.0833
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 0.0833
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 0.0833
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 0.0833
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 0.1667
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 0.0833
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 0.1667
        },
        {
          "item_id": "bfd844ba-2b4c-4077-902a-83e054baa864",
          "qty": 0.0833
        },
        {
          "item_id": "cc586903-ddec-45ec-904c-6de6877bb9e1",
          "qty": 0.1667
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 0.0833
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 0.0833
        },
        {
          "item_id": "2e2d5cf3-af5f-4b94-b7c8-8ecda1cc0756",
          "qty": 0.0833
        },
        {
          "item_id": "de23f386-edab-4b8f-8586-3aeb9656d08c",
          "qty": 0.0833
        },
        {
          "item_id": "4c86d012-d39e-495e-9a07-84f31d69fdfd",
          "qty": 0.0833
        },
        {
          "item_id": "ffa49a86-8a8e-4b17-8afc-d43e25b88a89",
          "qty": 0.0833
        },
        {
          "item_id": "c7195f93-f7d2-428f-b86f-3a735ec78ae4",
          "qty": 0.0833
        },
        {
          "item_id": "f8630e06-a800-4a00-9dea-8fcba3e75306",
          "qty": 0.0833
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_a_tourist",
          "material_id": "inv_mig_1788608280413_5",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": 23.16,
          "note": "جرد فعلي: خبز سياحي 25 ربطة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "il_1788901800084_zod5",
          "material_id": "inv_mig_1788608280413_5",
          "date": "2026-09-08",
          "type": "out",
          "qty": 1.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788901767837_ig59",
          "material_id": "inv_mig_1788608280413_5",
          "date": "2026-09-08",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "inv_drum_001",
      "name": "دبوس دجاج",
      "category": "دواجن",
      "unit": "حبة",
      "qty": 0,
      "min_qty": 20,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "il_1793476484900_5s0l",
          "material_id": "inv_drum_001",
          "date": "2026-10-31",
          "type": "out",
          "qty": 5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793381680489_umuj",
          "material_id": "inv_drum_001",
          "date": "2026-10-30",
          "type": "out",
          "qty": 5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793367974222_jcb9",
          "material_id": "inv_drum_001",
          "date": "2026-10-30",
          "type": "out",
          "qty": 5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793361433847_5qgh",
          "material_id": "inv_drum_001",
          "date": "2026-10-30",
          "type": "out",
          "qty": 10,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793350961818_c80m",
          "material_id": "inv_drum_001",
          "date": "2026-10-30",
          "type": "out",
          "qty": 5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788898740185_c2t0",
          "material_id": "inv_drum_001",
          "date": "2026-09-08",
          "type": "out",
          "qty": 10,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "inv_004",
      "name": "سمون شاورما كبير",
      "category": "مخبوزات",
      "unit": "قطعة",
      "qty": 0,
      "min_qty": 20,
      "reorder_qty": 0,
      "cost_per_unit": 1500,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "qty": 1,
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e"
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_a_samoun_demo",
          "material_id": "inv_004",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -60,
          "note": "إخراج رصيد تجريبي قديم من السمون قبل الجرد",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "il_007b",
          "material_id": "inv_004",
          "date": "2026-08-29",
          "type": "out",
          "qty": 22,
          "note": "مبيعات - تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_007",
          "material_id": "inv_004",
          "date": "2026-08-29",
          "type": "in",
          "qty": 100,
          "note": "توريد",
          "cost": 1500,
          "supplier_id": null,
          "by": null,
          "auto": false,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "inv_mig_1788608280413_2",
      "name": "خبز برغر",
      "category": "مخبوزات",
      "unit": "ربطة",
      "qty": 4.1666666667,
      "min_qty": 10,
      "reorder_qty": 0,
      "cost_per_unit": 32500,
      "trackable": true,
      "loaves_per_bundle": 6,
      "recipe": [
        {
          "item_id": "b377a33e-61d1-4fd6-8900-e436e79e9d7b",
          "qty": 0.1667
        },
        {
          "item_id": "ebed9d49-e023-4a4a-a84d-53e295994bec",
          "qty": 0.1667
        },
        {
          "item_id": "30828f36-3bac-4d00-a8a1-038463507198",
          "qty": 0.1667
        },
        {
          "item_id": "97a09273-432c-4698-87e0-f579945f0cb7",
          "qty": 0.1667
        },
        {
          "item_id": "76fb4ad7-70f9-4b5b-8349-325ee9524421",
          "qty": 0.1667
        },
        {
          "item_id": "94e48a79-cfea-4956-a99d-7c601a7202ff",
          "qty": 0.1667
        },
        {
          "item_id": "6edadfe5-8cea-44a5-951a-4d911aee7083",
          "qty": 0.1667
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 0.1667
        },
        {
          "item_id": "ae04b651-bd96-4785-b0ef-539380d2b488",
          "qty": 0.1667
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 0.1667
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 0.1667
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 0.1667
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 0.1667
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_a_burger",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": 3.9966666667,
          "note": "جرد فعلي: 25 رغيف خبز برغر = 4.1667 ربطة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "il_1793482511800_9bfo",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793480668892_jefj",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793480048353_kjtt",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793478786120_e909",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793478226641_6onv",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793476874186_jj38",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793475871315_by",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "waste",
          "qty": 0.17,
          "note": "خسارة إلغاء فاتورة #2026-10-31-326 — كريسبي برغر دبل (طلب العميل الإلغاء)",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793475829488_uy6y",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793475778302_kq76",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793475767656_rzpx",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "in",
          "qty": 0.33,
          "note": "عكس مبيعات — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793475741441_tcq8",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793474774754_o2lg",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793474058194_t5mo",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793473386662_y9r5",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.83,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793472783742_m1bi",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793469874112_96mj",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793469007351_9co9",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793468102943_w62q",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793466490168_nh7t",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.67,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793464600056_u91m",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793462748425_fyvb",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793462351285_ntna",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793462145578_d6el",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793461333358_cyiy",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793459938100_tq2r",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793458119381_e2ns",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793455649785_azbs",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793452831739_hvhs",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793452008989_eqqs",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793446780240_z0k8",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793446139484_8kpq",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793436995770_lmm4",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793392606477_2cyt",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793392202140_3gij",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793391553824_90tx",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793390672670_fyas",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793389873377_eqpp",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793388750804_u86t",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793387616207_47ev",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793385449031_2wzl",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.67,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793380523569_dqog",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793379972517_l6wx",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793378946177_7jd3",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793370158052_3qe4",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793370015091_grji",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793369255669_3zqc",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 1.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793367974222_sxr4",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793354468214_1dtu",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793314206180_cz1z",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-29",
          "type": "out",
          "qty": 1.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793313855921_5skz",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-29",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793313631691_zceo",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-29",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "stock_20261102_oil",
      "name": "زيت",
      "category": "زيوت",
      "unit": "كغ",
      "qty": 32,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_oil",
          "material_id": "stock_20261102_oil",
          "date": "2026-11-02",
          "type": "in",
          "qty": 32,
          "note": "إضافة رصيد: زيت 16 كغ × 2",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_flour",
      "name": "طحين",
      "category": "مواد غذائية",
      "unit": "كغ",
      "qty": 50,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_flour",
          "material_id": "stock_20261102_flour",
          "date": "2026-11-02",
          "type": "in",
          "qty": 50,
          "note": "إضافة رصيد: طحين 25 كغ × 2",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_starch",
      "name": "نشا",
      "category": "مواد غذائية",
      "unit": "شوال",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_starch",
          "material_id": "stock_20261102_starch",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2,
          "note": "إضافة رصيد: نشا 2 شوال",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_pepsi_liter",
      "name": "بيبسي لتر",
      "category": "مشروبات",
      "unit": "حبة",
      "qty": 42,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "a5fc42fd-7270-4e62-9bb7-023adb4588c6",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_pepsi_liter",
          "material_id": "stock_20261102_pepsi_liter",
          "date": "2026-11-02",
          "type": "in",
          "qty": 42,
          "note": "إضافة رصيد: بيبسي لتر 7 طرد × 6",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_pepsi_family",
      "name": "بيبسي عائلي",
      "category": "مشروبات",
      "unit": "حبة",
      "qty": 36,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "f5a1a4ae-1e92-444d-97bf-dc97c9b2d1e1",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_pepsi_family",
          "material_id": "stock_20261102_pepsi_family",
          "date": "2026-11-02",
          "type": "in",
          "qty": 36,
          "note": "إضافة رصيد: بيبسي عائلي 6 طرد × 6",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_ghee",
      "name": "سمنة الاصيل",
      "category": "مواد غذائية",
      "unit": "كغ",
      "qty": 4,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_ghee",
          "material_id": "stock_20261102_ghee",
          "date": "2026-11-02",
          "type": "in",
          "qty": 4,
          "note": "إضافة رصيد: سمنة الاصيل 4 كغ",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_salt",
      "name": "ملح مونة",
      "category": "مواد غذائية",
      "unit": "كغ",
      "qty": 2.5,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_salt",
          "material_id": "stock_20261102_salt",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2.5,
          "note": "إضافة رصيد: ملح مونة 2.5 كغ",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_ketchup_can",
      "name": "كاتشب بيدون",
      "category": "صوصات",
      "unit": "بيدون",
      "qty": 10,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_ketchup_can",
          "material_id": "stock_20261102_ketchup_can",
          "date": "2026-11-02",
          "type": "in",
          "qty": 10,
          "note": "إضافة رصيد: 10 كتشب بيدون",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_pomegranate",
      "name": "دبس رمان",
      "category": "صوصات",
      "unit": "كغ",
      "qty": 4,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_pomegranate",
          "material_id": "stock_20261102_pomegranate",
          "date": "2026-11-02",
          "type": "in",
          "qty": 4,
          "note": "إضافة رصيد: دبس رمان 4 كغ",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_ayran",
      "name": "عيران",
      "category": "مشروبات",
      "unit": "حبة",
      "qty": 180,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "d27dfacb-6858-42a0-b509-20e329aa59ec",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_ayran",
          "material_id": "stock_20261102_ayran",
          "date": "2026-11-02",
          "type": "in",
          "qty": 180,
          "note": "إضافة رصيد: عيران 6 صناديق × 30",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_broasted",
      "name": "فروج بروستد",
      "category": "دواجن",
      "unit": "فروج",
      "qty": 77.5,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_broasted",
          "material_id": "stock_20261102_broasted",
          "date": "2026-11-02",
          "type": "in",
          "qty": 77.5,
          "note": "تعديل رصيد البروستد إلى 77.5 فروج",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_006",
      "name": "دبوس دجاج",
      "category": "دواجن",
      "unit": "قطعة",
      "qty": 30,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
          "qty": 5
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_drumsticks",
          "material_id": "rest_006",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": 18,
          "note": "تعديل رصيد الدبابيس إلى 30 قطعة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_italian_bread",
      "name": "خبز إيطالي",
      "category": "مخبوزات",
      "unit": "ربطة",
      "qty": 3.5,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": 2,
      "recipe": [
        {
          "item_id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
          "qty": 0.5
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 0.5
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 0.5
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 0.5
        },
        {
          "item_id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
          "qty": 0.5
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 0.5
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 0.5
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 0.5
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 0.5
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_i_italian",
          "material_id": "stock_20261102_italian_bread",
          "date": "2026-11-02",
          "type": "in",
          "qty": 3.5,
          "note": "جرد فعلي: 7 أرغفة إيطالي = 3.5 ربطات",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_large_tourist",
      "name": "مطبق شاورما كبير - سياحي",
      "category": "مطبق شاورما",
      "unit": "رغيف",
      "qty": 0,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_old_large_t",
          "material_id": "stock_20261102_mutabbaq_large_tourist",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -16,
          "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق كبير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "stocklog_20261102_i_mut_large_t",
          "material_id": "stock_20261102_mutabbaq_large_tourist",
          "date": "2026-11-02",
          "type": "in",
          "qty": 16,
          "note": "جرد فعلي: مطبق شاورما كبير - 16 رغيف سياحي",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_large_shraak",
      "name": "مطبق شاورما كبير - شراك",
      "category": "مطبق شاورما",
      "unit": "رغيف",
      "qty": 0,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_old_large_s",
          "material_id": "stock_20261102_mutabbaq_large_shraak",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -8,
          "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق كبير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "stocklog_20261102_i_mut_large_s",
          "material_id": "stock_20261102_mutabbaq_large_shraak",
          "date": "2026-11-02",
          "type": "in",
          "qty": 8,
          "note": "جرد فعلي: مطبق شاورما كبير - 8 أرغفة شراك",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_small_tourist",
      "name": "مطبق شاورما صغير - سياحي",
      "category": "مطبق شاورما",
      "unit": "رغيف",
      "qty": 0,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_old_small_t",
          "material_id": "stock_20261102_mutabbaq_small_tourist",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -24,
          "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق صغير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "stocklog_20261102_i_mut_small_t",
          "material_id": "stock_20261102_mutabbaq_small_tourist",
          "date": "2026-11-02",
          "type": "in",
          "qty": 24,
          "note": "جرد فعلي: مطبق شاورما صغير - ربطتان × 12 سياحي",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_small_shraak",
      "name": "مطبق شاورما صغير - شراك",
      "category": "مطبق شاورما",
      "unit": "رغيف",
      "qty": 0,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_old_small_s",
          "material_id": "stock_20261102_mutabbaq_small_shraak",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -12,
          "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق صغير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "stocklog_20261102_i_mut_small_s",
          "material_id": "stock_20261102_mutabbaq_small_shraak",
          "date": "2026-11-02",
          "type": "in",
          "qty": 12,
          "note": "جرد فعلي: مطبق شاورما صغير - ربطتان × 6 شراك",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_large_product",
      "name": "خبز مطبق كبير",
      "category": "مطبق شاورما",
      "unit": "ربطة",
      "qty": 1.3333333333,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": 18,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_large_product",
          "material_id": "stock_20261102_mutabbaq_large_product",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1.3333333333,
          "note": "جرد فعلي: خبز مطبق كبير = 16 عادي + 8 شراك = 1.333 ربطة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_small_product",
      "name": "خبز مطبق صغير",
      "category": "مطبق شاورما",
      "unit": "ربطة",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": 18,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_small_product",
          "material_id": "stock_20261102_mutabbaq_small_product",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2,
          "note": "جرد فعلي: خبز مطبق صغير = ربطتان",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_028",
      "name": "صحن عربي كبير",
      "category": "تعبئة وتغليف",
      "unit": "صحن",
      "qty": 29,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 1
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 1
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_029",
      "name": "صحن عربي وسط",
      "category": "تعبئة وتغليف",
      "unit": "صحن",
      "qty": 43,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 1
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_030",
      "name": "صحن عربي صغير",
      "category": "تعبئة وتغليف",
      "unit": "صحن",
      "qty": 58,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 1
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_001",
      "name": "جبنة تشيدر مربعات",
      "category": "مواد غذائية",
      "unit": "قطعة",
      "qty": 722,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 2
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 2
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 2
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 2
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 2
        },
        {
          "item_id": "6c1296bd-7565-4b54-b289-dd9a7f63ec51",
          "qty": 2
        },
        {
          "item_id": "50ff822d-4142-4daa-864d-3e207f1550eb",
          "qty": 2
        },
        {
          "item_id": "fb1d3d99-37e6-4c39-a1cf-89764ec67374",
          "qty": 2
        },
        {
          "item_id": "5b8e5bf7-fc59-4d62-b990-ba98c9e97df8",
          "qty": 2
        },
        {
          "item_id": "bf046416-428f-4b8f-bb0c-95e77934adc2",
          "qty": 2
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 2
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 2
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 2
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 2
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 2
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 2
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 2
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 2
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 2
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 2
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 2
        },
        {
          "item_id": "3331df36-3180-4e80-ae61-a6f2fbca679a",
          "qty": 2
        },
        {
          "item_id": "2d751f9e-fc79-4693-b104-f792f5252da8",
          "qty": 2
        },
        {
          "item_id": "1c5cef3b-e008-4273-8ace-c2ee219ecfad",
          "qty": 2
        },
        {
          "item_id": "004658cc-14f4-4bad-b7e5-19d851ebfbeb",
          "qty": 2
        },
        {
          "item_id": "73241ca1-369c-423f-bd9f-4802643fc386",
          "qty": 2
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 2
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 2
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 2
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 2
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 2
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 2
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 2
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 2
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 2
        },
        {
          "item_id": "141ca984-861e-4c00-af4f-c9e002d6ee32",
          "qty": 2
        },
        {
          "item_id": "1d9c4f7c-870d-4aa1-bc86-d10ea9ba944e",
          "qty": 2
        },
        {
          "item_id": "34cdc32e-f7bb-4852-a17f-536028f8b3c6",
          "qty": 2
        },
        {
          "item_id": "c18ad915-8650-49fe-af6a-807b8c0f1cc6",
          "qty": 2
        },
        {
          "item_id": "5c4fe9bd-4b1d-410b-a344-ec99f92093cd",
          "qty": 2
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 2
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 2
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 2
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 2
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 2
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 2
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 2
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 2
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 2
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 2
        },
        {
          "item_id": "547aaf5a-8b8b-43b2-8533-f587a14063ab",
          "qty": 2
        },
        {
          "item_id": "f2c641ba-c482-4374-a1e5-5af052818f2d",
          "qty": 2
        },
        {
          "item_id": "cfa4523d-af83-4468-9975-1711293ec8b6",
          "qty": 2
        },
        {
          "item_id": "e18e45ba-a894-463a-a2d6-99f4777dcf32",
          "qty": 2
        },
        {
          "item_id": "f5928837-b481-4c73-9da5-4dc6f1b2af2c",
          "qty": 2
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 2
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 2
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 2
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 2
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 2
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 2
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 2
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 2
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 2
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 2
        },
        {
          "item_id": "a626725f-6033-4436-97be-90db615651b1",
          "qty": 2
        },
        {
          "item_id": "dc5ed328-1921-49fa-a90e-8d25ae651cb4",
          "qty": 2
        },
        {
          "item_id": "5d815330-9cff-4b06-8601-6e9f798dbb4b",
          "qty": 2
        },
        {
          "item_id": "cd20538c-d1c7-4c5e-ae3b-72fd32bbc7b5",
          "qty": 2
        },
        {
          "item_id": "b4f97451-546c-4617-ba5c-ed6a60a431b0",
          "qty": 2
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 2
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 2
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 2
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 2
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 2
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 2
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 2
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 2
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 2
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 2
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 2
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 2
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 2
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 2
        },
        {
          "item_id": "bfd844ba-2b4c-4077-902a-83e054baa864",
          "qty": 2
        },
        {
          "item_id": "eb1b3c13-e647-49fa-a544-c67f4870679d",
          "qty": 2
        },
        {
          "item_id": "cc586903-ddec-45ec-904c-6de6877bb9e1",
          "qty": 2
        },
        {
          "item_id": "ff8bc8c1-dc12-44b1-8cc7-e2e2c9dbd9a9",
          "qty": 2
        },
        {
          "item_id": "9e2da0e1-9cd8-44a6-a0e7-7ec4c1f5b60c",
          "qty": 2
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 2
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 2
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 2
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 2
        },
        {
          "item_id": "942ef54b-78c0-5694-b04c-b74c34097839",
          "qty": 2
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 2
        },
        {
          "item_id": "0f4d7634-6aa5-5c68-ba6c-02734a4d31b9",
          "qty": 2
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 2
        },
        {
          "item_id": "0b6b153f-ee5a-5f82-8d5e-8b57d184976b",
          "qty": 2
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 2
        },
        {
          "item_id": "ecb49390-e4e5-51f8-bdcb-20cdb0cff5b7",
          "qty": 2
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 2
        },
        {
          "item_id": "79c845fb-dd10-5d4a-8139-7d67a53a9aab",
          "qty": 2
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 2
        },
        {
          "item_id": "74a98a9f-c576-5f96-99c9-d6543da31e13",
          "qty": 2
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 2
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 2
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 2
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 2
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 2
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 2
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 2
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_010",
      "name": "زرف كتشب صغير",
      "category": "صوصات",
      "unit": "زرف",
      "qty": 780,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 1
        },
        {
          "item_id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
          "qty": 1
        },
        {
          "item_id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
          "qty": 1
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 1
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 1
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 1
        },
        {
          "item_id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
          "qty": 1
        },
        {
          "item_id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
          "qty": 1
        },
        {
          "item_id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
          "qty": 1
        },
        {
          "item_id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
          "qty": 1
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 1
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 1
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 1
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 1
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 1
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 1
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 1
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 1
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 1
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 1
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 1
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 1
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 1
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 1
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 1
        },
        {
          "item_id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
          "qty": 1
        },
        {
          "item_id": "687faedb-241f-4b71-b35f-5370b38ba798",
          "qty": 1
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 1
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 1
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 1
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 1
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 1
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 1
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 1
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 1
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 1
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 1
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 1
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 1
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 1
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 1
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 1
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 1
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 1
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 1
        },
        {
          "item_id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
          "qty": 1
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 1
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 1
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 1
        },
        {
          "item_id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
          "qty": 1
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 1
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 1
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 1
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 1
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 1
        },
        {
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
          "qty": 1
        },
        {
          "item_id": "340b7751-2645-4635-9085-697fe1443253",
          "qty": 1
        },
        {
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601",
          "qty": 1
        },
        {
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
          "qty": 1
        },
        {
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30",
          "qty": 1
        },
        {
          "item_id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
          "qty": 1
        },
        {
          "item_id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
          "qty": 1
        },
        {
          "item_id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
          "qty": 1
        },
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 1
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 1
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 1
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 1
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 1
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 1
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 1
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 1
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 1
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 1
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 1
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 1
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 1
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 1
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 1
        },
        {
          "item_id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
          "qty": 1
        },
        {
          "item_id": "56b462d4-5582-4132-b18a-b8730b8809ab",
          "qty": 1
        },
        {
          "item_id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
          "qty": 1
        },
        {
          "item_id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
          "qty": 1
        },
        {
          "item_id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
          "qty": 1
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 1
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 1
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 1
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 1
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 1
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 1
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 1
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 1
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 1
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 1
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 1
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 1
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 1
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 1
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 1
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 1
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 1
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 1
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 1
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 1
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 1
        },
        {
          "item_id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
          "qty": 1
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 1
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 1
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_ketchup_small_sachets",
          "material_id": "rest_010",
          "date": "2026-11-02",
          "type": "in",
          "qty": 500,
          "note": "تحويل من المستودع إلى مخزون المطعم — زرف كتشب صغير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_011",
      "name": "زرف دبس رمان صغير",
      "category": "صوصات",
      "unit": "زرف",
      "qty": 455,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
          "qty": 1
        },
        {
          "item_id": "340b7751-2645-4635-9085-697fe1443253",
          "qty": 1
        },
        {
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601",
          "qty": 1
        },
        {
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
          "qty": 1
        },
        {
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30",
          "qty": 1
        },
        {
          "item_id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
          "qty": 1
        },
        {
          "item_id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
          "qty": 1
        },
        {
          "item_id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
          "qty": 1
        },
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 1
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 1
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 1
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 1
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 1
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 1
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 1
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 1
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 1
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 1
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 1
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 1
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 1
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 1
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 1
        },
        {
          "item_id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
          "qty": 1
        },
        {
          "item_id": "56b462d4-5582-4132-b18a-b8730b8809ab",
          "qty": 1
        },
        {
          "item_id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
          "qty": 1
        },
        {
          "item_id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
          "qty": 1
        },
        {
          "item_id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
          "qty": 1
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 1
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 1
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 1
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 1
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 1
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 1
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 1
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 1
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 1
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 1
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 1
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 1
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 1
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 1
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 1
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 1
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 1
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 1
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 1
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 1
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 1
        },
        {
          "item_id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
          "qty": 1
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 1
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 1
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_032",
      "name": "علب سندويش فلين",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 360,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
          "qty": 1
        },
        {
          "item_id": "340b7751-2645-4635-9085-697fe1443253",
          "qty": 1
        },
        {
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601",
          "qty": 1
        },
        {
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
          "qty": 1
        },
        {
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30",
          "qty": 1
        },
        {
          "item_id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
          "qty": 1
        },
        {
          "item_id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
          "qty": 1
        },
        {
          "item_id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
          "qty": 1
        },
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 1
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 1
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 1
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 1
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 1
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 1
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 1
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 1
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 1
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 1
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 1
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 1
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 1
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 1
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 1
        },
        {
          "item_id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
          "qty": 1
        },
        {
          "item_id": "56b462d4-5582-4132-b18a-b8730b8809ab",
          "qty": 1
        },
        {
          "item_id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
          "qty": 1
        },
        {
          "item_id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
          "qty": 1
        },
        {
          "item_id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
          "qty": 1
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 1
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 1
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 1
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 1
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 1
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 1
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 1
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 1
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 1
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 1
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 1
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 1
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 1
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 1
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 1
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 1
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 1
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 1
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 1
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 1
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 1
        },
        {
          "item_id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
          "qty": 1
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 1
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 1
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_sandwich_boxes",
          "material_id": "rest_032",
          "date": "2026-11-02",
          "type": "in",
          "qty": 200,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب سندويش فلين",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_035",
      "name": "علب مايونيز (فارغة)",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 280,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1ed629ff-844a-433a-960e-0fab9bb71934",
          "qty": 1
        },
        {
          "item_id": "e829859d-2397-45f4-81a3-48290ef9650f",
          "qty": 1
        },
        {
          "item_id": "12b34a0b-f7b8-445b-8ecf-cebabeec4a26",
          "qty": 1
        },
        {
          "item_id": "5478fbb0-5cdb-4aa6-89c5-41a89873cb78",
          "qty": 1
        },
        {
          "item_id": "e6481b4b-87c3-4079-a995-7edac7f3861e",
          "qty": 1
        },
        {
          "item_id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
          "qty": 1
        },
        {
          "item_id": "31a84b92-7ec3-4292-8eb4-8070e1f97f11",
          "qty": 1
        },
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 1
        },
        {
          "item_id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
          "qty": 1
        },
        {
          "item_id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
          "qty": 1
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 1
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 1
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 1
        },
        {
          "item_id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
          "qty": 1
        },
        {
          "item_id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
          "qty": 1
        },
        {
          "item_id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
          "qty": 1
        },
        {
          "item_id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
          "qty": 1
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 1
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 1
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 1
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 1
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 1
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 1
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 1
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 1
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 1
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 1
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 1
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 1
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 1
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 1
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 1
        },
        {
          "item_id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
          "qty": 1
        },
        {
          "item_id": "687faedb-241f-4b71-b35f-5370b38ba798",
          "qty": 1
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 1
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 1
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 1
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 1
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 1
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 1
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 1
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 1
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 1
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 1
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 1
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 1
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 1
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 1
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 1
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 1
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 1
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 1
        },
        {
          "item_id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
          "qty": 1
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 1
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 1
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 1
        },
        {
          "item_id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
          "qty": 1
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 1
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 1
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 1
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 1
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_036",
      "name": "علب صوص (فارغة)",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 1300,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1ed629ff-844a-433a-960e-0fab9bb71934",
          "qty": 2
        },
        {
          "item_id": "e829859d-2397-45f4-81a3-48290ef9650f",
          "qty": 2
        },
        {
          "item_id": "12b34a0b-f7b8-445b-8ecf-cebabeec4a26",
          "qty": 2
        },
        {
          "item_id": "5478fbb0-5cdb-4aa6-89c5-41a89873cb78",
          "qty": 2
        },
        {
          "item_id": "e6481b4b-87c3-4079-a995-7edac7f3861e",
          "qty": 2
        },
        {
          "item_id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
          "qty": 2
        },
        {
          "item_id": "31a84b92-7ec3-4292-8eb4-8070e1f97f11",
          "qty": 2
        },
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 2
        },
        {
          "item_id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
          "qty": 2
        },
        {
          "item_id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
          "qty": 2
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 2
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 2
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 2
        },
        {
          "item_id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
          "qty": 2
        },
        {
          "item_id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
          "qty": 2
        },
        {
          "item_id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
          "qty": 2
        },
        {
          "item_id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
          "qty": 2
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 2
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 2
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 2
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 2
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 2
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 2
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 2
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 2
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 2
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 2
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 2
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 2
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 2
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 2
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 2
        },
        {
          "item_id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
          "qty": 2
        },
        {
          "item_id": "687faedb-241f-4b71-b35f-5370b38ba798",
          "qty": 2
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 2
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 2
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 2
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 2
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 2
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 2
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 2
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 2
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 2
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 2
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 2
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 2
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 2
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 2
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 2
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 2
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 2
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 2
        },
        {
          "item_id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
          "qty": 2
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 2
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 2
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 2
        },
        {
          "item_id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
          "qty": 2
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 2
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 2
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 2
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 2
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 2
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_sauce_boxes",
          "material_id": "rest_036",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1000,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب صوص (فارغة)",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_037",
      "name": "علب سرفيس مخلل",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 175,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 1
        },
        {
          "item_id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
          "qty": 1
        },
        {
          "item_id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
          "qty": 1
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 1
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 1
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 1
        },
        {
          "item_id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
          "qty": 1
        },
        {
          "item_id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
          "qty": 1
        },
        {
          "item_id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
          "qty": 1
        },
        {
          "item_id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
          "qty": 1
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 1
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 1
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 1
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 1
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 1
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 1
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 1
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 1
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 1
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 1
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 1
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 1
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 1
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 1
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 1
        },
        {
          "item_id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
          "qty": 1
        },
        {
          "item_id": "687faedb-241f-4b71-b35f-5370b38ba798",
          "qty": 1
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 1
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 1
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 1
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 1
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 1
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 1
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 1
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 1
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 1
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 1
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 1
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 1
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 1
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 1
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 1
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 1
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 1
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 1
        },
        {
          "item_id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
          "qty": 1
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 1
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 1
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 1
        },
        {
          "item_id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
          "qty": 1
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 1
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 1
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 1
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 1
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_sarvis_plain",
          "material_id": "rest_037",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب سرفيس مخلل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_012",
      "name": "زرف حاد صغير",
      "category": "صوصات",
      "unit": "زرف",
      "qty": 960,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
          "qty": 1
        },
        {
          "item_id": "340b7751-2645-4635-9085-697fe1443253",
          "qty": 1
        },
        {
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601",
          "qty": 1
        },
        {
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
          "qty": 1
        },
        {
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30",
          "qty": 1
        },
        {
          "item_id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
          "qty": 1
        },
        {
          "item_id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
          "qty": 1
        },
        {
          "item_id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
          "qty": 1
        },
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 1
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 1
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 1
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 1
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 1
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 1
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 1
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 1
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 1
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 1
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 1
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 1
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 1
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 1
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 1
        },
        {
          "item_id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
          "qty": 1
        },
        {
          "item_id": "56b462d4-5582-4132-b18a-b8730b8809ab",
          "qty": 1
        },
        {
          "item_id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
          "qty": 1
        },
        {
          "item_id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
          "qty": 1
        },
        {
          "item_id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
          "qty": 1
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 1
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 1
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 1
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 1
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 1
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 1
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 1
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 1
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 1
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 1
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 1
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 1
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 1
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 1
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 1
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 1
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 1
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 1
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 1
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 1
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 1
        },
        {
          "item_id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
          "qty": 1
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 1
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 1
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_hot_sachets",
          "material_id": "rest_012",
          "date": "2026-11-02",
          "type": "in",
          "qty": 500,
          "note": "تحويل من المستودع إلى مخزون المطعم — زرف حاد صغير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_sarvis_pickles",
      "name": "علب سرفيس مخلل",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 2100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_sarvis_plain",
          "material_id": "wh_20261102_sarvis_pickles",
          "date": "2026-11-02",
          "type": "out",
          "qty": 100,
          "note": "تحويل 100 علبة سرفيس عادي إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_sarvis_plain",
          "material_id": "wh_20261102_sarvis_pickles",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2200,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_sarvis_cut",
      "name": "علب سرفيس مقطع",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 450,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_sarvis_cut",
          "material_id": "wh_20261102_sarvis_cut",
          "date": "2026-11-02",
          "type": "out",
          "qty": 50,
          "note": "تحويل 50 علبة سرفيس مقطع إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_sarvis_cut",
          "material_id": "wh_20261102_sarvis_cut",
          "date": "2026-11-02",
          "type": "in",
          "qty": 500,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_fries_small",
      "name": "صحن بطاطا صغير فلين",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "صحن",
      "qty": 700,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_fries_small",
          "material_id": "wh_20261102_fries_small",
          "date": "2026-11-02",
          "type": "out",
          "qty": 100,
          "note": "تحويل 100 صحن بطاطا صغير إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_fries_small",
          "material_id": "wh_20261102_fries_small",
          "date": "2026-11-02",
          "type": "in",
          "qty": 800,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_fries_large",
      "name": "صحن بطاطا كبير فلين",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "صحن",
      "qty": 700,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_fries_large",
          "material_id": "wh_20261102_fries_large",
          "date": "2026-11-02",
          "type": "out",
          "qty": 100,
          "note": "تحويل 100 صحن بطاطا كبير إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_fries_large",
          "material_id": "wh_20261102_fries_large",
          "date": "2026-11-02",
          "type": "in",
          "qty": 800,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_arabic_meals",
      "name": "علب وجبات عربي",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 400,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_arabic_meals",
          "material_id": "wh_20261102_arabic_meals",
          "date": "2026-11-02",
          "type": "in",
          "qty": 400,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_sandwich_boxes",
      "name": "علب سندويش فلين",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 400,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_sandwich_boxes",
          "material_id": "wh_20261102_sandwich_boxes",
          "date": "2026-11-02",
          "type": "out",
          "qty": 200,
          "note": "تحويل 200 علبة سندويش إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_sandwich_boxes",
          "material_id": "wh_20261102_sandwich_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 600,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_burger_boxes",
      "name": "علب برغر فلين",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 250,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_burger_boxes",
          "material_id": "wh_20261102_burger_boxes",
          "date": "2026-11-02",
          "type": "out",
          "qty": 50,
          "note": "اعتماد «برغر 50» كـ50 علبة برغر فلين وتحويلها للمطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_burger_boxes",
          "material_id": "wh_20261102_burger_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 300,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_arabic_small",
      "name": "صحن عربي صغير",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "صحن",
      "qty": 609,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_arabic_small",
          "material_id": "wh_20261102_arabic_small",
          "date": "2026-11-02",
          "type": "in",
          "qty": 609,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_arabic_medium",
      "name": "صحن عربي وسط",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "صحن",
      "qty": 100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_arabic_medium",
          "material_id": "wh_20261102_arabic_medium",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_arabic_large",
      "name": "صحن عربي كبير",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "صحن",
      "qty": 30,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_arabic_large",
          "material_id": "wh_20261102_arabic_large",
          "date": "2026-11-02",
          "type": "in",
          "qty": 30,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_sauce_boxes",
      "name": "علب صوص",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 2000,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_sauce_boxes",
          "material_id": "wh_20261102_sauce_boxes",
          "date": "2026-11-02",
          "type": "out",
          "qty": 1000,
          "note": "تحويل 1000 علبة صوص إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_sauce_boxes",
          "material_id": "wh_20261102_sauce_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 3000,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_cocktail_cups",
      "name": "كاسات كوكتيل",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "كأس",
      "qty": 150,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_cocktail_cups",
          "material_id": "wh_20261102_cocktail_cups",
          "date": "2026-11-02",
          "type": "in",
          "qty": 150,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_broasted_boxes",
      "name": "كراتين بروستد",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "كرتونة",
      "qty": 2150,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_broasted_boxes",
          "material_id": "wh_20261102_broasted_boxes",
          "date": "2026-11-02",
          "type": "out",
          "qty": 100,
          "note": "تحويل 100 علبة بروستد إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_broasted_boxes",
          "material_id": "wh_20261102_broasted_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2250,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_mayo_boxes",
      "name": "علب مايونيز",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "طرد",
      "qty": 4,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_mayo_box",
          "material_id": "wh_20261102_mayo_boxes",
          "date": "2026-11-02",
          "type": "out",
          "qty": 1,
          "note": "تحويل طرد مايونيز واحد إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_mayo_box",
          "material_id": "wh_20261102_mayo_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 5,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_cocktail_straws",
      "name": "شلمونات كوكتيل",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "كيس",
      "qty": 19,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_cocktail_straws",
          "material_id": "wh_20261102_cocktail_straws",
          "date": "2026-11-02",
          "type": "in",
          "qty": 19,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_sandwich_paper",
      "name": "ورق سندويش",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "ربطة",
      "qty": 32,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_sandwich_paper",
          "material_id": "wh_20261102_sandwich_paper",
          "date": "2026-11-02",
          "type": "in",
          "qty": 32,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_cellophane",
      "name": "سولوفان",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "رول",
      "qty": 17,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_cellophane",
          "material_id": "wh_20261102_cellophane",
          "date": "2026-11-02",
          "type": "out",
          "qty": 1,
          "note": "تحويل رول سولوفان واحد إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_cellophane",
          "material_id": "wh_20261102_cellophane",
          "date": "2026-11-02",
          "type": "in",
          "qty": 18,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_cashier_rolls",
      "name": "رول كاشير",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "رول",
      "qty": 60,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_cashier_rolls",
          "material_id": "wh_20261102_cashier_rolls",
          "date": "2026-11-02",
          "type": "in",
          "qty": 60,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_tissues",
      "name": "محارم",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "كيس",
      "qty": 20,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_tissues",
          "material_id": "wh_20261102_tissues",
          "date": "2026-11-02",
          "type": "in",
          "qty": 20,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_gloves",
      "name": "كفوف",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "علبة",
      "qty": 13,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_gloves",
          "material_id": "wh_20261102_gloves",
          "date": "2026-11-02",
          "type": "out",
          "qty": 2,
          "note": "تحويل علبتي كفوف إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_gloves",
          "material_id": "wh_20261102_gloves",
          "date": "2026-11-02",
          "type": "in",
          "qty": 15,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_bags45",
      "name": "أكياس مقاس ٤٥",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "كغ",
      "qty": 305,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_bags45",
          "material_id": "wh_20261102_bags45",
          "date": "2026-11-02",
          "type": "out",
          "qty": 45,
          "note": "تحويل 45 كغ من أكياس مقاس 45 إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_bags45",
          "material_id": "wh_20261102_bags45",
          "date": "2026-11-02",
          "type": "in",
          "qty": 350,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_bags55",
      "name": "أكياس مقاس ٥٥",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "كغ",
      "qty": 100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_bags55",
          "material_id": "wh_20261102_bags55",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_drying_paper",
      "name": "ورق تنشيف",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "ربطة",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_drying_paper",
          "material_id": "wh_20261102_drying_paper",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_garbage_bags",
      "name": "أكياس قمامة",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "كغ",
      "qty": 40,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_garbage_bags",
          "material_id": "wh_20261102_garbage_bags",
          "date": "2026-11-02",
          "type": "in",
          "qty": 40,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_aprons",
      "name": "مريول",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "قطعة",
      "qty": 4,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_aprons",
          "material_id": "wh_20261102_aprons",
          "date": "2026-11-02",
          "type": "in",
          "qty": 4,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_vinegar",
      "name": "خل",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "لتر",
      "qty": 110,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_vinegar",
          "material_id": "wh_20261102_vinegar",
          "date": "2026-11-02",
          "type": "in",
          "qty": 110,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_ketchup_large_sachets",
      "name": "كتشب كبير زرف",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "زرف",
      "qty": 2300,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_ketchup_large_sachets",
          "material_id": "wh_20261102_ketchup_large_sachets",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2300,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_ketchup_small_sachets",
      "name": "زرف كتشب صغير",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "زرف",
      "qty": 500,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_ketchup_small_sachets",
          "material_id": "wh_20261102_ketchup_small_sachets",
          "date": "2026-11-02",
          "type": "out",
          "qty": 500,
          "note": "تحويل كرتونة زرف كتشب صغيرة = 500 زرف إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_ketchup_small_sachets",
          "material_id": "wh_20261102_ketchup_small_sachets",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1000,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_mushrooms",
      "name": "فطر مطربان",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "كغ",
      "qty": 12,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_mushrooms",
          "material_id": "wh_20261102_mushrooms",
          "date": "2026-11-02",
          "type": "in",
          "qty": 12,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_corn",
      "name": "ذرة",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "كغ",
      "qty": 9.6,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_corn",
          "material_id": "wh_20261102_corn",
          "date": "2026-11-02",
          "type": "out",
          "qty": 1.6,
          "note": "تحويل علبة ذرة واحدة = 1.6 كغ إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_corn",
          "material_id": "wh_20261102_corn",
          "date": "2026-11-02",
          "type": "in",
          "qty": 11.2,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_soy_oil",
      "name": "زيت صويا",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "كغ",
      "qty": 656,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_soy_oil",
          "material_id": "wh_20261102_soy_oil",
          "date": "2026-11-02",
          "type": "out",
          "qty": 32,
          "note": "تحويل تنكتين زيت صويا = 32 كغ إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_soy_oil",
          "material_id": "wh_20261102_soy_oil",
          "date": "2026-11-02",
          "type": "in",
          "qty": 688,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_pomegranate_sachets",
      "name": "زرف دبس رمان صغير",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "زرف",
      "qty": 500,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_pomegranate_sachets",
          "material_id": "wh_20261102_pomegranate_sachets",
          "date": "2026-11-02",
          "type": "in",
          "qty": 500,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_hot_sachets",
      "name": "زرف حاد صغير",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "زرف",
      "qty": 0,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_hot_sachets",
          "material_id": "wh_20261102_hot_sachets",
          "date": "2026-11-02",
          "type": "out",
          "qty": 500,
          "note": "تحويل كرتونة زرف حاد = 500 زرف إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_hot_sachets",
          "material_id": "wh_20261102_hot_sachets",
          "date": "2026-11-02",
          "type": "in",
          "qty": 500,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_mustard",
      "name": "خردل",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "بيدون",
      "qty": 4,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_mustard",
          "material_id": "wh_20261102_mustard",
          "date": "2026-11-02",
          "type": "in",
          "qty": 4,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_barbecue",
      "name": "باربيكيو",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "بيدون",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_barbecue",
          "material_id": "wh_20261102_barbecue",
          "date": "2026-11-02",
          "type": "out",
          "qty": 1,
          "note": "تحويل بيدون باربيكيو واحد إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_barbecue",
          "material_id": "wh_20261102_barbecue",
          "date": "2026-11-02",
          "type": "in",
          "qty": 3,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_cheddar",
      "name": "جبنة تشيدر",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "علبة",
      "qty": 3,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_cheddar",
          "material_id": "wh_20261102_cheddar",
          "date": "2026-11-02",
          "type": "in",
          "qty": 3,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_fries_small",
      "name": "صحن بطاطا صغير فلين",
      "category": "تعبئة وتغليف",
      "unit": "صحن",
      "qty": 100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_fries_small",
          "material_id": "rest_transfer_fries_small",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "تحويل من المستودع إلى مخزون المطعم — صحن بطاطا صغير فلين",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_fries_large",
      "name": "صحن بطاطا كبير فلين",
      "category": "تعبئة وتغليف",
      "unit": "صحن",
      "qty": 100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_fries_large",
          "material_id": "rest_transfer_fries_large",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "تحويل من المستودع إلى مخزون المطعم — صحن بطاطا كبير فلين",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_burger_boxes",
      "name": "علب برغر فلين",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 50,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "b377a33e-61d1-4fd6-8900-e436e79e9d7b",
          "qty": 1
        },
        {
          "item_id": "ebed9d49-e023-4a4a-a84d-53e295994bec",
          "qty": 1
        },
        {
          "item_id": "30828f36-3bac-4d00-a8a1-038463507198",
          "qty": 1
        },
        {
          "item_id": "97a09273-432c-4698-87e0-f579945f0cb7",
          "qty": 1
        },
        {
          "item_id": "76fb4ad7-70f9-4b5b-8349-325ee9524421",
          "qty": 1
        },
        {
          "item_id": "94e48a79-cfea-4956-a99d-7c601a7202ff",
          "qty": 1
        },
        {
          "item_id": "6edadfe5-8cea-44a5-951a-4d911aee7083",
          "qty": 1
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 1
        },
        {
          "item_id": "ae04b651-bd96-4785-b0ef-539380d2b488",
          "qty": 1
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 1
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 1
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 1
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_burger_boxes",
          "material_id": "rest_transfer_burger_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 50,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب برغر فلين",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_sarvis_cut",
      "name": "علب سرفيس مقطع",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 50,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1ed629ff-844a-433a-960e-0fab9bb71934",
          "qty": 1
        },
        {
          "item_id": "e829859d-2397-45f4-81a3-48290ef9650f",
          "qty": 1
        },
        {
          "item_id": "12b34a0b-f7b8-445b-8ecf-cebabeec4a26",
          "qty": 1
        },
        {
          "item_id": "5478fbb0-5cdb-4aa6-89c5-41a89873cb78",
          "qty": 1
        },
        {
          "item_id": "e6481b4b-87c3-4079-a995-7edac7f3861e",
          "qty": 1
        },
        {
          "item_id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
          "qty": 1
        },
        {
          "item_id": "31a84b92-7ec3-4292-8eb4-8070e1f97f11",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_sarvis_cut",
          "material_id": "rest_transfer_sarvis_cut",
          "date": "2026-11-02",
          "type": "in",
          "qty": 50,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب سرفيس مقطع",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_cellophane",
      "name": "رول سولوفان",
      "category": "تعبئة وتغليف",
      "unit": "رول",
      "qty": 1,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_cellophane",
          "material_id": "rest_transfer_cellophane",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1,
          "note": "تحويل من المستودع إلى مخزون المطعم — رول سولوفان",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_gloves",
      "name": "كفوف",
      "category": "نظافة ومستهلكات",
      "unit": "علبة",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_gloves",
          "material_id": "rest_transfer_gloves",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2,
          "note": "تحويل من المستودع إلى مخزون المطعم — كفوف",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_bags45",
      "name": "أكياس مقاس ٤٥",
      "category": "نظافة ومستهلكات",
      "unit": "كغ",
      "qty": 45,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_bags45",
          "material_id": "rest_transfer_bags45",
          "date": "2026-11-02",
          "type": "in",
          "qty": 45,
          "note": "تحويل من المستودع إلى مخزون المطعم — أكياس مقاس ٤٥",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_soy_oil",
      "name": "زيت صويا",
      "category": "زيوت",
      "unit": "تنكة",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_soy_oil",
          "material_id": "rest_transfer_soy_oil",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2,
          "note": "تحويل من المستودع إلى مخزون المطعم — زيت صويا",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_corn",
      "name": "ذرة",
      "category": "مواد غذائية",
      "unit": "علبة",
      "qty": 1,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_corn",
          "material_id": "rest_transfer_corn",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1,
          "note": "تحويل من المستودع إلى مخزون المطعم — ذرة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_barbecue",
      "name": "باربيكيو",
      "category": "صوصات",
      "unit": "بيدون",
      "qty": 1,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_barbecue",
          "material_id": "rest_transfer_barbecue",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1,
          "note": "تحويل من المستودع إلى مخزون المطعم — باربيكيو",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_mayo",
      "name": "علب مايونيز",
      "category": "تعبئة وتغليف",
      "unit": "طرد",
      "qty": 1,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_mayo_box",
          "material_id": "rest_transfer_mayo",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب مايونيز",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_broasted_boxes",
      "name": "علب بروستد",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1ed629ff-844a-433a-960e-0fab9bb71934",
          "qty": 1
        },
        {
          "item_id": "e829859d-2397-45f4-81a3-48290ef9650f",
          "qty": 1
        },
        {
          "item_id": "12b34a0b-f7b8-445b-8ecf-cebabeec4a26",
          "qty": 1
        },
        {
          "item_id": "5478fbb0-5cdb-4aa6-89c5-41a89873cb78",
          "qty": 1
        },
        {
          "item_id": "e6481b4b-87c3-4079-a995-7edac7f3861e",
          "qty": 1
        },
        {
          "item_id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
          "qty": 1
        },
        {
          "item_id": "31a84b92-7ec3-4292-8eb4-8070e1f97f11",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_broasted_boxes",
          "material_id": "rest_transfer_broasted_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب بروستد",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    }
  ],
  "inventory_log": [
    {
      "id": "stocklog_20261102_drumsticks",
      "material_id": "rest_006",
      "date": "2026-11-02",
      "type": "adjust",
      "qty": 18,
      "note": "تعديل رصيد الدبابيس إلى 30 قطعة",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_oil",
      "material_id": "stock_20261102_oil",
      "date": "2026-11-02",
      "type": "in",
      "qty": 32,
      "note": "إضافة رصيد: زيت 16 كغ × 2",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_flour",
      "material_id": "stock_20261102_flour",
      "date": "2026-11-02",
      "type": "in",
      "qty": 50,
      "note": "إضافة رصيد: طحين 25 كغ × 2",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_starch",
      "material_id": "stock_20261102_starch",
      "date": "2026-11-02",
      "type": "in",
      "qty": 2,
      "note": "إضافة رصيد: نشا 2 شوال",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_pepsi_liter",
      "material_id": "stock_20261102_pepsi_liter",
      "date": "2026-11-02",
      "type": "in",
      "qty": 42,
      "note": "إضافة رصيد: بيبسي لتر 7 طرد × 6",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_pepsi_family",
      "material_id": "stock_20261102_pepsi_family",
      "date": "2026-11-02",
      "type": "in",
      "qty": 36,
      "note": "إضافة رصيد: بيبسي عائلي 6 طرد × 6",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_ghee",
      "material_id": "stock_20261102_ghee",
      "date": "2026-11-02",
      "type": "in",
      "qty": 4,
      "note": "إضافة رصيد: سمنة الاصيل 4 كغ",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_salt",
      "material_id": "stock_20261102_salt",
      "date": "2026-11-02",
      "type": "in",
      "qty": 2.5,
      "note": "إضافة رصيد: ملح مونة 2.5 كغ",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_ketchup_can",
      "material_id": "stock_20261102_ketchup_can",
      "date": "2026-11-02",
      "type": "in",
      "qty": 10,
      "note": "إضافة رصيد: 10 كتشب بيدون",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_pomegranate",
      "material_id": "stock_20261102_pomegranate",
      "date": "2026-11-02",
      "type": "in",
      "qty": 4,
      "note": "إضافة رصيد: دبس رمان 4 كغ",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_ayran",
      "material_id": "stock_20261102_ayran",
      "date": "2026-11-02",
      "type": "in",
      "qty": 180,
      "note": "إضافة رصيد: عيران 6 صناديق × 30",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_broasted",
      "material_id": "stock_20261102_broasted",
      "date": "2026-11-02",
      "type": "in",
      "qty": 77.5,
      "note": "تعديل رصيد البروستد إلى 77.5 فروج",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_a_tourist",
      "material_id": "inv_mig_1788608280413_5",
      "date": "2026-11-02",
      "type": "adjust",
      "qty": 23.16,
      "note": "جرد فعلي: خبز سياحي 25 ربطة",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_a_burger",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-11-02",
      "type": "adjust",
      "qty": 3.9966666667,
      "note": "جرد فعلي: 25 رغيف خبز برغر = 4.1667 ربطة",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_a_samoun",
      "material_id": "inv_mig_1788608280413_4",
      "date": "2026-11-02",
      "type": "adjust",
      "qty": -4.75,
      "note": "جرد فعلي: سمون 41 خبزة = 10.25 ربطة",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_a_samoun_demo",
      "material_id": "inv_004",
      "date": "2026-11-02",
      "type": "adjust",
      "qty": -60,
      "note": "إخراج رصيد تجريبي قديم من السمون قبل الجرد",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_a_shraak",
      "material_id": "inv_003",
      "date": "2026-11-02",
      "type": "adjust",
      "qty": 0.45,
      "note": "جرد فعلي: خبز شراك 45 رغيف = 0.45 ربطة",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_i_italian",
      "material_id": "stock_20261102_italian_bread",
      "date": "2026-11-02",
      "type": "in",
      "qty": 3.5,
      "note": "جرد فعلي: 7 أرغفة إيطالي = 3.5 ربطات",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_i_mut_large_t",
      "material_id": "stock_20261102_mutabbaq_large_tourist",
      "date": "2026-11-02",
      "type": "in",
      "qty": 16,
      "note": "جرد فعلي: مطبق شاورما كبير - 16 رغيف سياحي",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_i_mut_large_s",
      "material_id": "stock_20261102_mutabbaq_large_shraak",
      "date": "2026-11-02",
      "type": "in",
      "qty": 8,
      "note": "جرد فعلي: مطبق شاورما كبير - 8 أرغفة شراك",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_i_mut_small_t",
      "material_id": "stock_20261102_mutabbaq_small_tourist",
      "date": "2026-11-02",
      "type": "in",
      "qty": 24,
      "note": "جرد فعلي: مطبق شاورما صغير - ربطتان × 12 سياحي",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_i_mut_small_s",
      "material_id": "stock_20261102_mutabbaq_small_shraak",
      "date": "2026-11-02",
      "type": "in",
      "qty": 12,
      "note": "جرد فعلي: مطبق شاورما صغير - ربطتان × 6 شراك",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_mut_old_large_t",
      "material_id": "stock_20261102_mutabbaq_large_tourist",
      "date": "2026-11-02",
      "type": "adjust",
      "qty": -16,
      "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق كبير",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_mut_old_large_s",
      "material_id": "stock_20261102_mutabbaq_large_shraak",
      "date": "2026-11-02",
      "type": "adjust",
      "qty": -8,
      "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق كبير",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_mut_old_small_t",
      "material_id": "stock_20261102_mutabbaq_small_tourist",
      "date": "2026-11-02",
      "type": "adjust",
      "qty": -24,
      "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق صغير",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_mut_old_small_s",
      "material_id": "stock_20261102_mutabbaq_small_shraak",
      "date": "2026-11-02",
      "type": "adjust",
      "qty": -12,
      "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق صغير",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_mut_large_product",
      "material_id": "stock_20261102_mutabbaq_large_product",
      "date": "2026-11-02",
      "type": "in",
      "qty": 1.3333333333,
      "note": "جرد فعلي: خبز مطبق كبير = 16 عادي + 8 شراك = 1.333 ربطة",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "stocklog_20261102_mut_small_product",
      "material_id": "stock_20261102_mutabbaq_small_product",
      "date": "2026-11-02",
      "type": "in",
      "qty": 2,
      "note": "جرد فعلي: خبز مطبق صغير = ربطتان",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "il_1788901800084_k2va",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-08",
      "type": "out",
      "qty": 14,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788901767837_rme8",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-08",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788898680351_x3w4",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-08",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788897374781_ehip",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-08",
      "type": "out",
      "qty": 24,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788887433319_lmfx",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-08",
      "type": "out",
      "qty": 2,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788887027330_dumt",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-08",
      "type": "out",
      "qty": 56,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788887018911_gdtm",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-08",
      "type": "out",
      "qty": 25,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788886670779_1kn1",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-08",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788886655356_owjh",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-08",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788818369556_b77e",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788817815000_7yq1",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788817202290_vovg",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788815918259_ajfc",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 6,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788815885428_hslf",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788815826907_9sec",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788814312362_867u",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 2,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788814177478_nxtg",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 3,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788813840373_l96z",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 2,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788812952379_q5i9",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788812666889_x9am",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788812116428_abaq",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788812066902_adt8",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788811446145_l8ob",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788810943541_evor",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 2,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788810902338_o7yg",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788809213416_cshf",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 2,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788808301375_srg6",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 6,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788806888054_0dd2",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788806672786_gdh4",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-07",
      "type": "out",
      "qty": 4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "1788608285314",
      "material_id": "inv_mig_1788608280413_1",
      "date": "2026-09-04",
      "type": "in",
      "qty": 100,
      "note": "مشتريات سابقة",
      "cost": 1000,
      "supplier_id": null,
      "by": "المدير",
      "auto": false,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788901800084_u3qy",
      "material_id": "inv_003",
      "date": "2026-09-08",
      "type": "out",
      "qty": 1.4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788901767837_x5oh",
      "material_id": "inv_003",
      "date": "2026-09-08",
      "type": "out",
      "qty": 0.4,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788901800084_zod5",
      "material_id": "inv_mig_1788608280413_5",
      "date": "2026-09-08",
      "type": "out",
      "qty": 1.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788901767837_ig59",
      "material_id": "inv_mig_1788608280413_5",
      "date": "2026-09-08",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_007",
      "material_id": "inv_004",
      "date": "2026-08-29",
      "type": "in",
      "qty": 100,
      "note": "توريد",
      "cost": 1500,
      "supplier_id": null,
      "by": null,
      "auto": false,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_007b",
      "material_id": "inv_004",
      "date": "2026-08-29",
      "type": "out",
      "qty": 22,
      "note": "مبيعات - تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793476484900_5s0l",
      "material_id": "inv_drum_001",
      "date": "2026-10-31",
      "type": "out",
      "qty": 5,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793381680489_umuj",
      "material_id": "inv_drum_001",
      "date": "2026-10-30",
      "type": "out",
      "qty": 5,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793367974222_jcb9",
      "material_id": "inv_drum_001",
      "date": "2026-10-30",
      "type": "out",
      "qty": 5,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793361433847_5qgh",
      "material_id": "inv_drum_001",
      "date": "2026-10-30",
      "type": "out",
      "qty": 10,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793350961818_c80m",
      "material_id": "inv_drum_001",
      "date": "2026-10-30",
      "type": "out",
      "qty": 5,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1788898740185_c2t0",
      "material_id": "inv_drum_001",
      "date": "2026-09-08",
      "type": "out",
      "qty": 10,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793482511800_9bfo",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.5,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793480668892_jefj",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793480048353_kjtt",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793478786120_e909",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793478226641_6onv",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793476874186_jj38",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793475871315_by",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "waste",
      "qty": 0.17,
      "note": "خسارة إلغاء فاتورة #2026-10-31-326 — كريسبي برغر دبل (طلب العميل الإلغاء)",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793475829488_uy6y",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793475778302_kq76",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793475767656_rzpx",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "in",
      "qty": 0.33,
      "note": "عكس مبيعات — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793475741441_tcq8",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793474774754_o2lg",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793474058194_t5mo",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793473386662_y9r5",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.83,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793472783742_m1bi",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793469874112_96mj",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793469007351_9co9",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793468102943_w62q",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793466490168_nh7t",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.67,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793464600056_u91m",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793462748425_fyvb",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793462351285_ntna",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793462145578_d6el",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793461333358_cyiy",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793459938100_tq2r",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.5,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793458119381_e2ns",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793455649785_azbs",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.5,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793452831739_hvhs",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793452008989_eqqs",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793446780240_z0k8",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793446139484_8kpq",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793436995770_lmm4",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-31",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793392606477_2cyt",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793392202140_3gij",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793391553824_90tx",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793390672670_fyas",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793389873377_eqpp",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793388750804_u86t",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793387616207_47ev",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793385449031_2wzl",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.67,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793380523569_dqog",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793379972517_l6wx",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793378946177_7jd3",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793370158052_3qe4",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.33,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793370015091_grji",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793369255669_3zqc",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 1.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793367974222_sxr4",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793354468214_1dtu",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-30",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793314206180_cz1z",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-29",
      "type": "out",
      "qty": 1.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793313855921_5skz",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-29",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "il_1793313631691_zceo",
      "material_id": "inv_mig_1788608280413_2",
      "date": "2026-10-29",
      "type": "out",
      "qty": 0.17,
      "note": "مبيعات POS — تلقائي",
      "cost": null,
      "supplier_id": null,
      "by": null,
      "auto": true,
      "supplier_name": null,
      "time": null
    },
    {
      "id": "whlog_20261102_open_sarvis_plain",
      "material_id": "wh_20261102_sarvis_pickles",
      "date": "2026-11-02",
      "type": "in",
      "qty": 2200,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_sarvis_plain",
      "material_id": "wh_20261102_sarvis_pickles",
      "date": "2026-11-02",
      "type": "out",
      "qty": 100,
      "note": "تحويل 100 علبة سرفيس عادي إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_sarvis_cut",
      "material_id": "wh_20261102_sarvis_cut",
      "date": "2026-11-02",
      "type": "in",
      "qty": 500,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_sarvis_cut",
      "material_id": "wh_20261102_sarvis_cut",
      "date": "2026-11-02",
      "type": "out",
      "qty": 50,
      "note": "تحويل 50 علبة سرفيس مقطع إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_fries_small",
      "material_id": "wh_20261102_fries_small",
      "date": "2026-11-02",
      "type": "in",
      "qty": 800,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_fries_small",
      "material_id": "wh_20261102_fries_small",
      "date": "2026-11-02",
      "type": "out",
      "qty": 100,
      "note": "تحويل 100 صحن بطاطا صغير إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_fries_large",
      "material_id": "wh_20261102_fries_large",
      "date": "2026-11-02",
      "type": "in",
      "qty": 800,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_fries_large",
      "material_id": "wh_20261102_fries_large",
      "date": "2026-11-02",
      "type": "out",
      "qty": 100,
      "note": "تحويل 100 صحن بطاطا كبير إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_arabic_meals",
      "material_id": "wh_20261102_arabic_meals",
      "date": "2026-11-02",
      "type": "in",
      "qty": 400,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_sandwich_boxes",
      "material_id": "wh_20261102_sandwich_boxes",
      "date": "2026-11-02",
      "type": "in",
      "qty": 600,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_sandwich_boxes",
      "material_id": "wh_20261102_sandwich_boxes",
      "date": "2026-11-02",
      "type": "out",
      "qty": 200,
      "note": "تحويل 200 علبة سندويش إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_burger_boxes",
      "material_id": "wh_20261102_burger_boxes",
      "date": "2026-11-02",
      "type": "in",
      "qty": 300,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_burger_boxes",
      "material_id": "wh_20261102_burger_boxes",
      "date": "2026-11-02",
      "type": "out",
      "qty": 50,
      "note": "اعتماد «برغر 50» كـ50 علبة برغر فلين وتحويلها للمطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_arabic_small",
      "material_id": "wh_20261102_arabic_small",
      "date": "2026-11-02",
      "type": "in",
      "qty": 609,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_arabic_medium",
      "material_id": "wh_20261102_arabic_medium",
      "date": "2026-11-02",
      "type": "in",
      "qty": 100,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_arabic_large",
      "material_id": "wh_20261102_arabic_large",
      "date": "2026-11-02",
      "type": "in",
      "qty": 30,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_sauce_boxes",
      "material_id": "wh_20261102_sauce_boxes",
      "date": "2026-11-02",
      "type": "in",
      "qty": 3000,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_sauce_boxes",
      "material_id": "wh_20261102_sauce_boxes",
      "date": "2026-11-02",
      "type": "out",
      "qty": 1000,
      "note": "تحويل 1000 علبة صوص إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_cocktail_cups",
      "material_id": "wh_20261102_cocktail_cups",
      "date": "2026-11-02",
      "type": "in",
      "qty": 150,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_broasted_boxes",
      "material_id": "wh_20261102_broasted_boxes",
      "date": "2026-11-02",
      "type": "in",
      "qty": 2250,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_broasted_boxes",
      "material_id": "wh_20261102_broasted_boxes",
      "date": "2026-11-02",
      "type": "out",
      "qty": 100,
      "note": "تحويل 100 علبة بروستد إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_mayo_box",
      "material_id": "wh_20261102_mayo_boxes",
      "date": "2026-11-02",
      "type": "in",
      "qty": 5,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_mayo_box",
      "material_id": "wh_20261102_mayo_boxes",
      "date": "2026-11-02",
      "type": "out",
      "qty": 1,
      "note": "تحويل طرد مايونيز واحد إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_cocktail_straws",
      "material_id": "wh_20261102_cocktail_straws",
      "date": "2026-11-02",
      "type": "in",
      "qty": 19,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_sandwich_paper",
      "material_id": "wh_20261102_sandwich_paper",
      "date": "2026-11-02",
      "type": "in",
      "qty": 32,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_cellophane",
      "material_id": "wh_20261102_cellophane",
      "date": "2026-11-02",
      "type": "in",
      "qty": 18,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_cellophane",
      "material_id": "wh_20261102_cellophane",
      "date": "2026-11-02",
      "type": "out",
      "qty": 1,
      "note": "تحويل رول سولوفان واحد إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_cashier_rolls",
      "material_id": "wh_20261102_cashier_rolls",
      "date": "2026-11-02",
      "type": "in",
      "qty": 60,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_tissues",
      "material_id": "wh_20261102_tissues",
      "date": "2026-11-02",
      "type": "in",
      "qty": 20,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_gloves",
      "material_id": "wh_20261102_gloves",
      "date": "2026-11-02",
      "type": "in",
      "qty": 15,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_gloves",
      "material_id": "wh_20261102_gloves",
      "date": "2026-11-02",
      "type": "out",
      "qty": 2,
      "note": "تحويل علبتي كفوف إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_bags45",
      "material_id": "wh_20261102_bags45",
      "date": "2026-11-02",
      "type": "in",
      "qty": 350,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_bags45",
      "material_id": "wh_20261102_bags45",
      "date": "2026-11-02",
      "type": "out",
      "qty": 45,
      "note": "تحويل 45 كغ من أكياس مقاس 45 إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_bags55",
      "material_id": "wh_20261102_bags55",
      "date": "2026-11-02",
      "type": "in",
      "qty": 100,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_drying_paper",
      "material_id": "wh_20261102_drying_paper",
      "date": "2026-11-02",
      "type": "in",
      "qty": 2,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_garbage_bags",
      "material_id": "wh_20261102_garbage_bags",
      "date": "2026-11-02",
      "type": "in",
      "qty": 40,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_aprons",
      "material_id": "wh_20261102_aprons",
      "date": "2026-11-02",
      "type": "in",
      "qty": 4,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_vinegar",
      "material_id": "wh_20261102_vinegar",
      "date": "2026-11-02",
      "type": "in",
      "qty": 110,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_ketchup_large_sachets",
      "material_id": "wh_20261102_ketchup_large_sachets",
      "date": "2026-11-02",
      "type": "in",
      "qty": 2300,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_ketchup_small_sachets",
      "material_id": "wh_20261102_ketchup_small_sachets",
      "date": "2026-11-02",
      "type": "in",
      "qty": 1000,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_ketchup_small_sachets",
      "material_id": "wh_20261102_ketchup_small_sachets",
      "date": "2026-11-02",
      "type": "out",
      "qty": 500,
      "note": "تحويل كرتونة زرف كتشب صغيرة = 500 زرف إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_mushrooms",
      "material_id": "wh_20261102_mushrooms",
      "date": "2026-11-02",
      "type": "in",
      "qty": 12,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_corn",
      "material_id": "wh_20261102_corn",
      "date": "2026-11-02",
      "type": "in",
      "qty": 11.2,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_corn",
      "material_id": "wh_20261102_corn",
      "date": "2026-11-02",
      "type": "out",
      "qty": 1.6,
      "note": "تحويل علبة ذرة واحدة = 1.6 كغ إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_soy_oil",
      "material_id": "wh_20261102_soy_oil",
      "date": "2026-11-02",
      "type": "in",
      "qty": 688,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_soy_oil",
      "material_id": "wh_20261102_soy_oil",
      "date": "2026-11-02",
      "type": "out",
      "qty": 32,
      "note": "تحويل تنكتين زيت صويا = 32 كغ إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_pomegranate_sachets",
      "material_id": "wh_20261102_pomegranate_sachets",
      "date": "2026-11-02",
      "type": "in",
      "qty": 500,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_hot_sachets",
      "material_id": "wh_20261102_hot_sachets",
      "date": "2026-11-02",
      "type": "in",
      "qty": 500,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_hot_sachets",
      "material_id": "wh_20261102_hot_sachets",
      "date": "2026-11-02",
      "type": "out",
      "qty": 500,
      "note": "تحويل كرتونة زرف حاد = 500 زرف إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_mustard",
      "material_id": "wh_20261102_mustard",
      "date": "2026-11-02",
      "type": "in",
      "qty": 4,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_barbecue",
      "material_id": "wh_20261102_barbecue",
      "date": "2026-11-02",
      "type": "in",
      "qty": 3,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_out_barbecue",
      "material_id": "wh_20261102_barbecue",
      "date": "2026-11-02",
      "type": "out",
      "qty": 1,
      "note": "تحويل بيدون باربيكيو واحد إلى المطعم",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "whlog_20261102_open_cheddar",
      "material_id": "wh_20261102_cheddar",
      "date": "2026-11-02",
      "type": "in",
      "qty": 3,
      "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_fries_small",
      "material_id": "rest_transfer_fries_small",
      "date": "2026-11-02",
      "type": "in",
      "qty": 100,
      "note": "تحويل من المستودع إلى مخزون المطعم — صحن بطاطا صغير فلين",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_fries_large",
      "material_id": "rest_transfer_fries_large",
      "date": "2026-11-02",
      "type": "in",
      "qty": 100,
      "note": "تحويل من المستودع إلى مخزون المطعم — صحن بطاطا كبير فلين",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_burger_boxes",
      "material_id": "rest_transfer_burger_boxes",
      "date": "2026-11-02",
      "type": "in",
      "qty": 50,
      "note": "تحويل من المستودع إلى مخزون المطعم — علب برغر فلين",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_sarvis_plain",
      "material_id": "rest_037",
      "date": "2026-11-02",
      "type": "in",
      "qty": 100,
      "note": "تحويل من المستودع إلى مخزون المطعم — علب سرفيس مخلل",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_sarvis_cut",
      "material_id": "rest_transfer_sarvis_cut",
      "date": "2026-11-02",
      "type": "in",
      "qty": 50,
      "note": "تحويل من المستودع إلى مخزون المطعم — علب سرفيس مقطع",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_cellophane",
      "material_id": "rest_transfer_cellophane",
      "date": "2026-11-02",
      "type": "in",
      "qty": 1,
      "note": "تحويل من المستودع إلى مخزون المطعم — رول سولوفان",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_gloves",
      "material_id": "rest_transfer_gloves",
      "date": "2026-11-02",
      "type": "in",
      "qty": 2,
      "note": "تحويل من المستودع إلى مخزون المطعم — كفوف",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_bags45",
      "material_id": "rest_transfer_bags45",
      "date": "2026-11-02",
      "type": "in",
      "qty": 45,
      "note": "تحويل من المستودع إلى مخزون المطعم — أكياس مقاس ٤٥",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_soy_oil",
      "material_id": "rest_transfer_soy_oil",
      "date": "2026-11-02",
      "type": "in",
      "qty": 2,
      "note": "تحويل من المستودع إلى مخزون المطعم — زيت صويا",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_corn",
      "material_id": "rest_transfer_corn",
      "date": "2026-11-02",
      "type": "in",
      "qty": 1,
      "note": "تحويل من المستودع إلى مخزون المطعم — ذرة",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_barbecue",
      "material_id": "rest_transfer_barbecue",
      "date": "2026-11-02",
      "type": "in",
      "qty": 1,
      "note": "تحويل من المستودع إلى مخزون المطعم — باربيكيو",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_hot_sachets",
      "material_id": "rest_012",
      "date": "2026-11-02",
      "type": "in",
      "qty": 500,
      "note": "تحويل من المستودع إلى مخزون المطعم — زرف حاد صغير",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_ketchup_small_sachets",
      "material_id": "rest_010",
      "date": "2026-11-02",
      "type": "in",
      "qty": 500,
      "note": "تحويل من المستودع إلى مخزون المطعم — زرف كتشب صغير",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_mayo_box",
      "material_id": "rest_transfer_mayo",
      "date": "2026-11-02",
      "type": "in",
      "qty": 1,
      "note": "تحويل من المستودع إلى مخزون المطعم — علب مايونيز",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_sandwich_boxes",
      "material_id": "rest_032",
      "date": "2026-11-02",
      "type": "in",
      "qty": 200,
      "note": "تحويل من المستودع إلى مخزون المطعم — علب سندويش فلين",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_sauce_boxes",
      "material_id": "rest_036",
      "date": "2026-11-02",
      "type": "in",
      "qty": 1000,
      "note": "تحويل من المستودع إلى مخزون المطعم — علب صوص (فارغة)",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    },
    {
      "id": "restlog_20261102_transfer_broasted_boxes",
      "material_id": "rest_transfer_broasted_boxes",
      "date": "2026-11-02",
      "type": "in",
      "qty": 100,
      "note": "تحويل من المستودع إلى مخزون المطعم — علب بروستد",
      "cost": null,
      "supplier_id": null,
      "auto": false,
      "supplier_name": null,
      "by": "المدير",
      "time": ""
    }
  ],
  "inventory": [
    {
      "id": "inv_mig_1788608280413_4",
      "name": "سمون شاورما كبير",
      "category": "مخبوزات",
      "unit": "ربطة",
      "qty": 10.25,
      "min_qty": 10,
      "reorder_qty": 0,
      "cost_per_unit": 13333,
      "trackable": true,
      "loaves_per_bundle": 4,
      "recipe": [
        {
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
          "qty": 0.25
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 0.25
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 0.25
        },
        {
          "item_id": "50ff822d-4142-4daa-864d-3e207f1550eb",
          "qty": 0.25
        },
        {
          "item_id": "5b8e5bf7-fc59-4d62-b990-ba98c9e97df8",
          "qty": 0.25
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 0.25
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 0.25
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 0.25
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 0.25
        },
        {
          "item_id": "2d751f9e-fc79-4693-b104-f792f5252da8",
          "qty": 0.25
        },
        {
          "item_id": "004658cc-14f4-4bad-b7e5-19d851ebfbeb",
          "qty": 0.25
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 0.25
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 0.25
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 0.25
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 0.25
        },
        {
          "item_id": "1d9c4f7c-870d-4aa1-bc86-d10ea9ba944e",
          "qty": 0.25
        },
        {
          "item_id": "c18ad915-8650-49fe-af6a-807b8c0f1cc6",
          "qty": 0.25
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 0.25
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 0.25
        },
        {
          "item_id": "56b462d4-5582-4132-b18a-b8730b8809ab",
          "qty": 0.25
        },
        {
          "item_id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
          "qty": 0.25
        },
        {
          "item_id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
          "qty": 0.25
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 0.25
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 0.25
        },
        {
          "item_id": "f2c641ba-c482-4374-a1e5-5af052818f2d",
          "qty": 0.25
        },
        {
          "item_id": "e18e45ba-a894-463a-a2d6-99f4777dcf32",
          "qty": 0.25
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 0.25
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 0.25
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 0.25
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 0.25
        },
        {
          "item_id": "dc5ed328-1921-49fa-a90e-8d25ae651cb4",
          "qty": 0.25
        },
        {
          "item_id": "cd20538c-d1c7-4c5e-ae3b-72fd32bbc7b5",
          "qty": 0.25
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 0.25
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 0.25
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 0.25
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 0.25
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 0.25
        },
        {
          "item_id": "eb1b3c13-e647-49fa-a544-c67f4870679d",
          "qty": 0.25
        },
        {
          "item_id": "ff8bc8c1-dc12-44b1-8cc7-e2e2c9dbd9a9",
          "qty": 0.25
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 0.25
        },
        {
          "item_id": "bc314a86-c7b4-4b49-8030-71563ed0af9f",
          "qty": 0.25
        },
        {
          "item_id": "decbacc8-c03f-4db2-8ff9-08ffdffc4283",
          "qty": 0.25
        },
        {
          "item_id": "a6dcb81f-161d-4986-9e86-18432df912cc",
          "qty": 0.25
        },
        {
          "item_id": "daf90cc9-d749-4058-a7b7-3a3fd384174b",
          "qty": 0.25
        },
        {
          "item_id": "0755f9cb-b66e-4cd6-bad2-827f5a64944e",
          "qty": 0.25
        },
        {
          "item_id": "ff7365c7-719b-4ed1-b924-1c3b2797e0de",
          "qty": 0.25
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_a_samoun",
          "material_id": "inv_mig_1788608280413_4",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -4.75,
          "note": "جرد فعلي: سمون 41 خبزة = 10.25 ربطة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "inv_mig_1788608280413_1",
      "name": "خبز صاج / شراك",
      "category": "مخبوزات",
      "unit": "عدد",
      "qty": 0,
      "min_qty": 10,
      "reorder_qty": 0,
      "cost_per_unit": 1000,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "qty": 1,
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30"
        },
        {
          "qty": 1,
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601"
        },
        {
          "qty": 1,
          "item_id": "340b7751-2645-4635-9085-697fe1443253"
        },
        {
          "qty": 1,
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b"
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "il_1788901800084_k2va",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 14,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788901767837_rme8",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788898680351_x3w4",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788897374781_ehip",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 24,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788887433319_lmfx",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 2,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788887027330_dumt",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 56,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788887018911_gdtm",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 25,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788886670779_1kn1",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788886655356_owjh",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-08",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788818369556_b77e",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788817815000_7yq1",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788817202290_vovg",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788815918259_ajfc",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 6,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788815885428_hslf",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788815826907_9sec",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788814312362_867u",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 2,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788814177478_nxtg",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 3,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788813840373_l96z",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 2,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788812952379_q5i9",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788812666889_x9am",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788812116428_abaq",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788812066902_adt8",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788811446145_l8ob",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788810943541_evor",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 2,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788810902338_o7yg",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788809213416_cshf",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 2,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788808301375_srg6",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 6,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788806888054_0dd2",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788806672786_gdh4",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-07",
          "type": "out",
          "qty": 4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "1788608285314",
          "material_id": "inv_mig_1788608280413_1",
          "date": "2026-09-04",
          "type": "in",
          "qty": 100,
          "note": "مشتريات سابقة",
          "cost": 1000,
          "supplier_id": null,
          "by": "المدير",
          "auto": false,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "inv_003",
      "name": "خبز صاج / شراك",
      "category": "مخبوزات",
      "unit": "ربطة",
      "qty": 0.45,
      "min_qty": 3,
      "reorder_qty": 0,
      "cost_per_unit": 8000,
      "trackable": true,
      "loaves_per_bundle": 100,
      "recipe": [
        {
          "item_id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
          "qty": 0.01
        },
        {
          "item_id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
          "qty": 0.01
        },
        {
          "item_id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
          "qty": 0.01
        },
        {
          "item_id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
          "qty": 0.01
        },
        {
          "item_id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
          "qty": 0.015
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 0.01
        },
        {
          "item_id": "bf046416-428f-4b8f-bb0c-95e77934adc2",
          "qty": 0.01
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 0.01
        },
        {
          "item_id": "73241ca1-369c-423f-bd9f-4802643fc386",
          "qty": 0.01
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 0.01
        },
        {
          "item_id": "5c4fe9bd-4b1d-410b-a344-ec99f92093cd",
          "qty": 0.01
        },
        {
          "item_id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
          "qty": 0.01
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 0.01
        },
        {
          "item_id": "f5928837-b481-4c73-9da5-4dc6f1b2af2c",
          "qty": 0.01
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 0.01
        },
        {
          "item_id": "b4f97451-546c-4617-ba5c-ed6a60a431b0",
          "qty": 0.01
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 0.01
        },
        {
          "item_id": "9e2da0e1-9cd8-44a6-a0e7-7ec4c1f5b60c",
          "qty": 0.01
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 0.015
        },
        {
          "item_id": "942ef54b-78c0-5694-b04c-b74c34097839",
          "qty": 0.015
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 0.015
        },
        {
          "item_id": "0f4d7634-6aa5-5c68-ba6c-02734a4d31b9",
          "qty": 0.015
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 0.015
        },
        {
          "item_id": "0b6b153f-ee5a-5f82-8d5e-8b57d184976b",
          "qty": 0.015
        },
        {
          "item_id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
          "qty": 0.015
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 0.015
        },
        {
          "item_id": "ecb49390-e4e5-51f8-bdcb-20cdb0cff5b7",
          "qty": 0.015
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 0.015
        },
        {
          "item_id": "79c845fb-dd10-5d4a-8139-7d67a53a9aab",
          "qty": 0.015
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 0.015
        },
        {
          "item_id": "74a98a9f-c576-5f96-99c9-d6543da31e13",
          "qty": 0.015
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_a_shraak",
          "material_id": "inv_003",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": 0.45,
          "note": "جرد فعلي: خبز شراك 45 رغيف = 0.45 ربطة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "il_1788901800084_u3qy",
          "material_id": "inv_003",
          "date": "2026-09-08",
          "type": "out",
          "qty": 1.4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788901767837_x5oh",
          "material_id": "inv_003",
          "date": "2026-09-08",
          "type": "out",
          "qty": 0.4,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "inv_mig_1788608280413_5",
      "name": "خبز سياحي",
      "category": "مخبوزات",
      "unit": "ربطة",
      "qty": 25,
      "min_qty": 10,
      "reorder_qty": 0,
      "cost_per_unit": 10000,
      "trackable": true,
      "loaves_per_bundle": 12,
      "recipe": [
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 0.1667
        },
        {
          "item_id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
          "qty": 0.25
        },
        {
          "item_id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
          "qty": 0.3333
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 0.4167
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 0.5
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 0.5833
        },
        {
          "item_id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
          "qty": 0.0833
        },
        {
          "item_id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
          "qty": 0.1667
        },
        {
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
          "qty": 0.0833
        },
        {
          "item_id": "340b7751-2645-4635-9085-697fe1443253",
          "qty": 0.0833
        },
        {
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601",
          "qty": 0.0833
        },
        {
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30",
          "qty": 0.0833
        },
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 0.0833
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 0.1667
        },
        {
          "item_id": "6c1296bd-7565-4b54-b289-dd9a7f63ec51",
          "qty": 0.0833
        },
        {
          "item_id": "fb1d3d99-37e6-4c39-a1cf-89764ec67374",
          "qty": 0.1667
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 0.0833
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 0.0833
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 0.0833
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 0.0833
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 0.0833
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 0.1667
        },
        {
          "item_id": "3331df36-3180-4e80-ae61-a6f2fbca679a",
          "qty": 0.0833
        },
        {
          "item_id": "1c5cef3b-e008-4273-8ace-c2ee219ecfad",
          "qty": 0.1667
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 0.0833
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 0.0833
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 0.0833
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 0.1667
        },
        {
          "item_id": "141ca984-861e-4c00-af4f-c9e002d6ee32",
          "qty": 0.0833
        },
        {
          "item_id": "34cdc32e-f7bb-4852-a17f-536028f8b3c6",
          "qty": 0.1667
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 0.0833
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 0.0833
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 0.0833
        },
        {
          "item_id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
          "qty": 0.0833
        },
        {
          "item_id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
          "qty": 0.1667
        },
        {
          "item_id": "687faedb-241f-4b71-b35f-5370b38ba798",
          "qty": 0.0833
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 0.0833
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 0.1667
        },
        {
          "item_id": "547aaf5a-8b8b-43b2-8533-f587a14063ab",
          "qty": 0.0833
        },
        {
          "item_id": "cfa4523d-af83-4468-9975-1711293ec8b6",
          "qty": 0.1667
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 0.0833
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 0.0833
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 0.0833
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 0.0833
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 0.1667
        },
        {
          "item_id": "a626725f-6033-4436-97be-90db615651b1",
          "qty": 0.0833
        },
        {
          "item_id": "5d815330-9cff-4b06-8601-6e9f798dbb4b",
          "qty": 0.1667
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 0.0833
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 0.0833
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 0.0833
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 0.0833
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 0.0833
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 0.1667
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 0.0833
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 0.1667
        },
        {
          "item_id": "bfd844ba-2b4c-4077-902a-83e054baa864",
          "qty": 0.0833
        },
        {
          "item_id": "cc586903-ddec-45ec-904c-6de6877bb9e1",
          "qty": 0.1667
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 0.0833
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 0.0833
        },
        {
          "item_id": "2e2d5cf3-af5f-4b94-b7c8-8ecda1cc0756",
          "qty": 0.0833
        },
        {
          "item_id": "de23f386-edab-4b8f-8586-3aeb9656d08c",
          "qty": 0.0833
        },
        {
          "item_id": "4c86d012-d39e-495e-9a07-84f31d69fdfd",
          "qty": 0.0833
        },
        {
          "item_id": "ffa49a86-8a8e-4b17-8afc-d43e25b88a89",
          "qty": 0.0833
        },
        {
          "item_id": "c7195f93-f7d2-428f-b86f-3a735ec78ae4",
          "qty": 0.0833
        },
        {
          "item_id": "f8630e06-a800-4a00-9dea-8fcba3e75306",
          "qty": 0.0833
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_a_tourist",
          "material_id": "inv_mig_1788608280413_5",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": 23.16,
          "note": "جرد فعلي: خبز سياحي 25 ربطة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "il_1788901800084_zod5",
          "material_id": "inv_mig_1788608280413_5",
          "date": "2026-09-08",
          "type": "out",
          "qty": 1.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788901767837_ig59",
          "material_id": "inv_mig_1788608280413_5",
          "date": "2026-09-08",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "inv_drum_001",
      "name": "دبوس دجاج",
      "category": "دواجن",
      "unit": "حبة",
      "qty": 0,
      "min_qty": 20,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "il_1793476484900_5s0l",
          "material_id": "inv_drum_001",
          "date": "2026-10-31",
          "type": "out",
          "qty": 5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793381680489_umuj",
          "material_id": "inv_drum_001",
          "date": "2026-10-30",
          "type": "out",
          "qty": 5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793367974222_jcb9",
          "material_id": "inv_drum_001",
          "date": "2026-10-30",
          "type": "out",
          "qty": 5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793361433847_5qgh",
          "material_id": "inv_drum_001",
          "date": "2026-10-30",
          "type": "out",
          "qty": 10,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793350961818_c80m",
          "material_id": "inv_drum_001",
          "date": "2026-10-30",
          "type": "out",
          "qty": 5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1788898740185_c2t0",
          "material_id": "inv_drum_001",
          "date": "2026-09-08",
          "type": "out",
          "qty": 10,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "inv_004",
      "name": "سمون شاورما كبير",
      "category": "مخبوزات",
      "unit": "قطعة",
      "qty": 0,
      "min_qty": 20,
      "reorder_qty": 0,
      "cost_per_unit": 1500,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "qty": 1,
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e"
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_a_samoun_demo",
          "material_id": "inv_004",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -60,
          "note": "إخراج رصيد تجريبي قديم من السمون قبل الجرد",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "il_007b",
          "material_id": "inv_004",
          "date": "2026-08-29",
          "type": "out",
          "qty": 22,
          "note": "مبيعات - تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_007",
          "material_id": "inv_004",
          "date": "2026-08-29",
          "type": "in",
          "qty": 100,
          "note": "توريد",
          "cost": 1500,
          "supplier_id": null,
          "by": null,
          "auto": false,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "inv_mig_1788608280413_2",
      "name": "خبز برغر",
      "category": "مخبوزات",
      "unit": "ربطة",
      "qty": 4.1666666667,
      "min_qty": 10,
      "reorder_qty": 0,
      "cost_per_unit": 32500,
      "trackable": true,
      "loaves_per_bundle": 6,
      "recipe": [
        {
          "item_id": "b377a33e-61d1-4fd6-8900-e436e79e9d7b",
          "qty": 0.1667
        },
        {
          "item_id": "ebed9d49-e023-4a4a-a84d-53e295994bec",
          "qty": 0.1667
        },
        {
          "item_id": "30828f36-3bac-4d00-a8a1-038463507198",
          "qty": 0.1667
        },
        {
          "item_id": "97a09273-432c-4698-87e0-f579945f0cb7",
          "qty": 0.1667
        },
        {
          "item_id": "76fb4ad7-70f9-4b5b-8349-325ee9524421",
          "qty": 0.1667
        },
        {
          "item_id": "94e48a79-cfea-4956-a99d-7c601a7202ff",
          "qty": 0.1667
        },
        {
          "item_id": "6edadfe5-8cea-44a5-951a-4d911aee7083",
          "qty": 0.1667
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 0.1667
        },
        {
          "item_id": "ae04b651-bd96-4785-b0ef-539380d2b488",
          "qty": 0.1667
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 0.1667
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 0.1667
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 0.1667
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 0.1667
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_a_burger",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": 3.9966666667,
          "note": "جرد فعلي: 25 رغيف خبز برغر = 4.1667 ربطة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "il_1793482511800_9bfo",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793480668892_jefj",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793480048353_kjtt",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793478786120_e909",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793478226641_6onv",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793476874186_jj38",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793475871315_by",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "waste",
          "qty": 0.17,
          "note": "خسارة إلغاء فاتورة #2026-10-31-326 — كريسبي برغر دبل (طلب العميل الإلغاء)",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793475829488_uy6y",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793475778302_kq76",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793475767656_rzpx",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "in",
          "qty": 0.33,
          "note": "عكس مبيعات — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793475741441_tcq8",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793474774754_o2lg",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793474058194_t5mo",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793473386662_y9r5",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.83,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793472783742_m1bi",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793469874112_96mj",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793469007351_9co9",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793468102943_w62q",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793466490168_nh7t",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.67,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793464600056_u91m",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793462748425_fyvb",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793462351285_ntna",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793462145578_d6el",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793461333358_cyiy",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793459938100_tq2r",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793458119381_e2ns",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793455649785_azbs",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.5,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793452831739_hvhs",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793452008989_eqqs",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793446780240_z0k8",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793446139484_8kpq",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793436995770_lmm4",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-31",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793392606477_2cyt",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793392202140_3gij",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793391553824_90tx",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793390672670_fyas",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793389873377_eqpp",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793388750804_u86t",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793387616207_47ev",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793385449031_2wzl",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.67,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793380523569_dqog",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793379972517_l6wx",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793378946177_7jd3",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793370158052_3qe4",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.33,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793370015091_grji",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793369255669_3zqc",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 1.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793367974222_sxr4",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793354468214_1dtu",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-30",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793314206180_cz1z",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-29",
          "type": "out",
          "qty": 1.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793313855921_5skz",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-29",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        },
        {
          "id": "il_1793313631691_zceo",
          "material_id": "inv_mig_1788608280413_2",
          "date": "2026-10-29",
          "type": "out",
          "qty": 0.17,
          "note": "مبيعات POS — تلقائي",
          "cost": null,
          "supplier_id": null,
          "by": null,
          "auto": true,
          "supplier_name": null,
          "time": null
        }
      ]
    },
    {
      "id": "stock_20261102_oil",
      "name": "زيت",
      "category": "زيوت",
      "unit": "كغ",
      "qty": 32,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_oil",
          "material_id": "stock_20261102_oil",
          "date": "2026-11-02",
          "type": "in",
          "qty": 32,
          "note": "إضافة رصيد: زيت 16 كغ × 2",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_flour",
      "name": "طحين",
      "category": "مواد غذائية",
      "unit": "كغ",
      "qty": 50,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_flour",
          "material_id": "stock_20261102_flour",
          "date": "2026-11-02",
          "type": "in",
          "qty": 50,
          "note": "إضافة رصيد: طحين 25 كغ × 2",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_starch",
      "name": "نشا",
      "category": "مواد غذائية",
      "unit": "شوال",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_starch",
          "material_id": "stock_20261102_starch",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2,
          "note": "إضافة رصيد: نشا 2 شوال",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_pepsi_liter",
      "name": "بيبسي لتر",
      "category": "مشروبات",
      "unit": "حبة",
      "qty": 42,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "a5fc42fd-7270-4e62-9bb7-023adb4588c6",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_pepsi_liter",
          "material_id": "stock_20261102_pepsi_liter",
          "date": "2026-11-02",
          "type": "in",
          "qty": 42,
          "note": "إضافة رصيد: بيبسي لتر 7 طرد × 6",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_pepsi_family",
      "name": "بيبسي عائلي",
      "category": "مشروبات",
      "unit": "حبة",
      "qty": 36,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "f5a1a4ae-1e92-444d-97bf-dc97c9b2d1e1",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_pepsi_family",
          "material_id": "stock_20261102_pepsi_family",
          "date": "2026-11-02",
          "type": "in",
          "qty": 36,
          "note": "إضافة رصيد: بيبسي عائلي 6 طرد × 6",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_ghee",
      "name": "سمنة الاصيل",
      "category": "مواد غذائية",
      "unit": "كغ",
      "qty": 4,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_ghee",
          "material_id": "stock_20261102_ghee",
          "date": "2026-11-02",
          "type": "in",
          "qty": 4,
          "note": "إضافة رصيد: سمنة الاصيل 4 كغ",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_salt",
      "name": "ملح مونة",
      "category": "مواد غذائية",
      "unit": "كغ",
      "qty": 2.5,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_salt",
          "material_id": "stock_20261102_salt",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2.5,
          "note": "إضافة رصيد: ملح مونة 2.5 كغ",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_ketchup_can",
      "name": "كاتشب بيدون",
      "category": "صوصات",
      "unit": "بيدون",
      "qty": 10,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_ketchup_can",
          "material_id": "stock_20261102_ketchup_can",
          "date": "2026-11-02",
          "type": "in",
          "qty": 10,
          "note": "إضافة رصيد: 10 كتشب بيدون",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_pomegranate",
      "name": "دبس رمان",
      "category": "صوصات",
      "unit": "كغ",
      "qty": 4,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_pomegranate",
          "material_id": "stock_20261102_pomegranate",
          "date": "2026-11-02",
          "type": "in",
          "qty": 4,
          "note": "إضافة رصيد: دبس رمان 4 كغ",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_ayran",
      "name": "عيران",
      "category": "مشروبات",
      "unit": "حبة",
      "qty": 180,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "d27dfacb-6858-42a0-b509-20e329aa59ec",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_ayran",
          "material_id": "stock_20261102_ayran",
          "date": "2026-11-02",
          "type": "in",
          "qty": 180,
          "note": "إضافة رصيد: عيران 6 صناديق × 30",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_broasted",
      "name": "فروج بروستد",
      "category": "دواجن",
      "unit": "فروج",
      "qty": 77.5,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_broasted",
          "material_id": "stock_20261102_broasted",
          "date": "2026-11-02",
          "type": "in",
          "qty": 77.5,
          "note": "تعديل رصيد البروستد إلى 77.5 فروج",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_006",
      "name": "دبوس دجاج",
      "category": "دواجن",
      "unit": "قطعة",
      "qty": 30,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
          "qty": 5
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_drumsticks",
          "material_id": "rest_006",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": 18,
          "note": "تعديل رصيد الدبابيس إلى 30 قطعة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_italian_bread",
      "name": "خبز إيطالي",
      "category": "مخبوزات",
      "unit": "ربطة",
      "qty": 3.5,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": 2,
      "recipe": [
        {
          "item_id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
          "qty": 0.5
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 0.5
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 0.5
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 0.5
        },
        {
          "item_id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
          "qty": 0.5
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 0.5
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 0.5
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 0.5
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 0.5
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_i_italian",
          "material_id": "stock_20261102_italian_bread",
          "date": "2026-11-02",
          "type": "in",
          "qty": 3.5,
          "note": "جرد فعلي: 7 أرغفة إيطالي = 3.5 ربطات",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_large_tourist",
      "name": "مطبق شاورما كبير - سياحي",
      "category": "مطبق شاورما",
      "unit": "رغيف",
      "qty": 0,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_old_large_t",
          "material_id": "stock_20261102_mutabbaq_large_tourist",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -16,
          "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق كبير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "stocklog_20261102_i_mut_large_t",
          "material_id": "stock_20261102_mutabbaq_large_tourist",
          "date": "2026-11-02",
          "type": "in",
          "qty": 16,
          "note": "جرد فعلي: مطبق شاورما كبير - 16 رغيف سياحي",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_large_shraak",
      "name": "مطبق شاورما كبير - شراك",
      "category": "مطبق شاورما",
      "unit": "رغيف",
      "qty": 0,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_old_large_s",
          "material_id": "stock_20261102_mutabbaq_large_shraak",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -8,
          "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق كبير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "stocklog_20261102_i_mut_large_s",
          "material_id": "stock_20261102_mutabbaq_large_shraak",
          "date": "2026-11-02",
          "type": "in",
          "qty": 8,
          "note": "جرد فعلي: مطبق شاورما كبير - 8 أرغفة شراك",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_small_tourist",
      "name": "مطبق شاورما صغير - سياحي",
      "category": "مطبق شاورما",
      "unit": "رغيف",
      "qty": 0,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_old_small_t",
          "material_id": "stock_20261102_mutabbaq_small_tourist",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -24,
          "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق صغير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "stocklog_20261102_i_mut_small_t",
          "material_id": "stock_20261102_mutabbaq_small_tourist",
          "date": "2026-11-02",
          "type": "in",
          "qty": 24,
          "note": "جرد فعلي: مطبق شاورما صغير - ربطتان × 12 سياحي",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_small_shraak",
      "name": "مطبق شاورما صغير - شراك",
      "category": "مطبق شاورما",
      "unit": "رغيف",
      "qty": 0,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_old_small_s",
          "material_id": "stock_20261102_mutabbaq_small_shraak",
          "date": "2026-11-02",
          "type": "adjust",
          "qty": -12,
          "note": "نقل مكوّنات الجرد إلى صنف خبز مطبق صغير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "stocklog_20261102_i_mut_small_s",
          "material_id": "stock_20261102_mutabbaq_small_shraak",
          "date": "2026-11-02",
          "type": "in",
          "qty": 12,
          "note": "جرد فعلي: مطبق شاورما صغير - ربطتان × 6 شراك",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_large_product",
      "name": "خبز مطبق كبير",
      "category": "مطبق شاورما",
      "unit": "ربطة",
      "qty": 1.3333333333,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": 18,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_large_product",
          "material_id": "stock_20261102_mutabbaq_large_product",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1.3333333333,
          "note": "جرد فعلي: خبز مطبق كبير = 16 عادي + 8 شراك = 1.333 ربطة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "stock_20261102_mutabbaq_small_product",
      "name": "خبز مطبق صغير",
      "category": "مطبق شاورما",
      "unit": "ربطة",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": 18,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "stocklog_20261102_mut_small_product",
          "material_id": "stock_20261102_mutabbaq_small_product",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2,
          "note": "جرد فعلي: خبز مطبق صغير = ربطتان",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_028",
      "name": "صحن عربي كبير",
      "category": "تعبئة وتغليف",
      "unit": "صحن",
      "qty": 29,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 1
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 1
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_029",
      "name": "صحن عربي وسط",
      "category": "تعبئة وتغليف",
      "unit": "صحن",
      "qty": 43,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 1
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_030",
      "name": "صحن عربي صغير",
      "category": "تعبئة وتغليف",
      "unit": "صحن",
      "qty": 58,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 1
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_001",
      "name": "جبنة تشيدر مربعات",
      "category": "مواد غذائية",
      "unit": "قطعة",
      "qty": 722,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 2
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 2
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 2
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 2
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 2
        },
        {
          "item_id": "6c1296bd-7565-4b54-b289-dd9a7f63ec51",
          "qty": 2
        },
        {
          "item_id": "50ff822d-4142-4daa-864d-3e207f1550eb",
          "qty": 2
        },
        {
          "item_id": "fb1d3d99-37e6-4c39-a1cf-89764ec67374",
          "qty": 2
        },
        {
          "item_id": "5b8e5bf7-fc59-4d62-b990-ba98c9e97df8",
          "qty": 2
        },
        {
          "item_id": "bf046416-428f-4b8f-bb0c-95e77934adc2",
          "qty": 2
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 2
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 2
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 2
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 2
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 2
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 2
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 2
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 2
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 2
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 2
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 2
        },
        {
          "item_id": "3331df36-3180-4e80-ae61-a6f2fbca679a",
          "qty": 2
        },
        {
          "item_id": "2d751f9e-fc79-4693-b104-f792f5252da8",
          "qty": 2
        },
        {
          "item_id": "1c5cef3b-e008-4273-8ace-c2ee219ecfad",
          "qty": 2
        },
        {
          "item_id": "004658cc-14f4-4bad-b7e5-19d851ebfbeb",
          "qty": 2
        },
        {
          "item_id": "73241ca1-369c-423f-bd9f-4802643fc386",
          "qty": 2
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 2
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 2
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 2
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 2
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 2
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 2
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 2
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 2
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 2
        },
        {
          "item_id": "141ca984-861e-4c00-af4f-c9e002d6ee32",
          "qty": 2
        },
        {
          "item_id": "1d9c4f7c-870d-4aa1-bc86-d10ea9ba944e",
          "qty": 2
        },
        {
          "item_id": "34cdc32e-f7bb-4852-a17f-536028f8b3c6",
          "qty": 2
        },
        {
          "item_id": "c18ad915-8650-49fe-af6a-807b8c0f1cc6",
          "qty": 2
        },
        {
          "item_id": "5c4fe9bd-4b1d-410b-a344-ec99f92093cd",
          "qty": 2
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 2
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 2
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 2
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 2
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 2
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 2
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 2
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 2
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 2
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 2
        },
        {
          "item_id": "547aaf5a-8b8b-43b2-8533-f587a14063ab",
          "qty": 2
        },
        {
          "item_id": "f2c641ba-c482-4374-a1e5-5af052818f2d",
          "qty": 2
        },
        {
          "item_id": "cfa4523d-af83-4468-9975-1711293ec8b6",
          "qty": 2
        },
        {
          "item_id": "e18e45ba-a894-463a-a2d6-99f4777dcf32",
          "qty": 2
        },
        {
          "item_id": "f5928837-b481-4c73-9da5-4dc6f1b2af2c",
          "qty": 2
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 2
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 2
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 2
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 2
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 2
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 2
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 2
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 2
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 2
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 2
        },
        {
          "item_id": "a626725f-6033-4436-97be-90db615651b1",
          "qty": 2
        },
        {
          "item_id": "dc5ed328-1921-49fa-a90e-8d25ae651cb4",
          "qty": 2
        },
        {
          "item_id": "5d815330-9cff-4b06-8601-6e9f798dbb4b",
          "qty": 2
        },
        {
          "item_id": "cd20538c-d1c7-4c5e-ae3b-72fd32bbc7b5",
          "qty": 2
        },
        {
          "item_id": "b4f97451-546c-4617-ba5c-ed6a60a431b0",
          "qty": 2
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 2
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 2
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 2
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 2
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 2
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 2
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 2
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 2
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 2
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 2
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 2
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 2
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 2
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 2
        },
        {
          "item_id": "bfd844ba-2b4c-4077-902a-83e054baa864",
          "qty": 2
        },
        {
          "item_id": "eb1b3c13-e647-49fa-a544-c67f4870679d",
          "qty": 2
        },
        {
          "item_id": "cc586903-ddec-45ec-904c-6de6877bb9e1",
          "qty": 2
        },
        {
          "item_id": "ff8bc8c1-dc12-44b1-8cc7-e2e2c9dbd9a9",
          "qty": 2
        },
        {
          "item_id": "9e2da0e1-9cd8-44a6-a0e7-7ec4c1f5b60c",
          "qty": 2
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 2
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 2
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 2
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 2
        },
        {
          "item_id": "942ef54b-78c0-5694-b04c-b74c34097839",
          "qty": 2
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 2
        },
        {
          "item_id": "0f4d7634-6aa5-5c68-ba6c-02734a4d31b9",
          "qty": 2
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 2
        },
        {
          "item_id": "0b6b153f-ee5a-5f82-8d5e-8b57d184976b",
          "qty": 2
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 2
        },
        {
          "item_id": "ecb49390-e4e5-51f8-bdcb-20cdb0cff5b7",
          "qty": 2
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 2
        },
        {
          "item_id": "79c845fb-dd10-5d4a-8139-7d67a53a9aab",
          "qty": 2
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 2
        },
        {
          "item_id": "74a98a9f-c576-5f96-99c9-d6543da31e13",
          "qty": 2
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 2
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 2
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 2
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 2
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 2
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 2
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 2
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_010",
      "name": "زرف كتشب صغير",
      "category": "صوصات",
      "unit": "زرف",
      "qty": 780,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 1
        },
        {
          "item_id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
          "qty": 1
        },
        {
          "item_id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
          "qty": 1
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 1
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 1
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 1
        },
        {
          "item_id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
          "qty": 1
        },
        {
          "item_id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
          "qty": 1
        },
        {
          "item_id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
          "qty": 1
        },
        {
          "item_id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
          "qty": 1
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 1
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 1
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 1
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 1
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 1
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 1
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 1
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 1
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 1
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 1
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 1
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 1
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 1
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 1
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 1
        },
        {
          "item_id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
          "qty": 1
        },
        {
          "item_id": "687faedb-241f-4b71-b35f-5370b38ba798",
          "qty": 1
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 1
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 1
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 1
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 1
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 1
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 1
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 1
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 1
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 1
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 1
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 1
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 1
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 1
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 1
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 1
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 1
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 1
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 1
        },
        {
          "item_id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
          "qty": 1
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 1
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 1
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 1
        },
        {
          "item_id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
          "qty": 1
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 1
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 1
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 1
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 1
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 1
        },
        {
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
          "qty": 1
        },
        {
          "item_id": "340b7751-2645-4635-9085-697fe1443253",
          "qty": 1
        },
        {
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601",
          "qty": 1
        },
        {
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
          "qty": 1
        },
        {
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30",
          "qty": 1
        },
        {
          "item_id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
          "qty": 1
        },
        {
          "item_id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
          "qty": 1
        },
        {
          "item_id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
          "qty": 1
        },
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 1
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 1
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 1
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 1
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 1
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 1
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 1
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 1
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 1
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 1
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 1
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 1
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 1
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 1
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 1
        },
        {
          "item_id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
          "qty": 1
        },
        {
          "item_id": "56b462d4-5582-4132-b18a-b8730b8809ab",
          "qty": 1
        },
        {
          "item_id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
          "qty": 1
        },
        {
          "item_id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
          "qty": 1
        },
        {
          "item_id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
          "qty": 1
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 1
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 1
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 1
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 1
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 1
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 1
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 1
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 1
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 1
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 1
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 1
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 1
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 1
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 1
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 1
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 1
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 1
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 1
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 1
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 1
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 1
        },
        {
          "item_id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
          "qty": 1
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 1
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 1
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_ketchup_small_sachets",
          "material_id": "rest_010",
          "date": "2026-11-02",
          "type": "in",
          "qty": 500,
          "note": "تحويل من المستودع إلى مخزون المطعم — زرف كتشب صغير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_011",
      "name": "زرف دبس رمان صغير",
      "category": "صوصات",
      "unit": "زرف",
      "qty": 455,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
          "qty": 1
        },
        {
          "item_id": "340b7751-2645-4635-9085-697fe1443253",
          "qty": 1
        },
        {
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601",
          "qty": 1
        },
        {
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
          "qty": 1
        },
        {
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30",
          "qty": 1
        },
        {
          "item_id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
          "qty": 1
        },
        {
          "item_id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
          "qty": 1
        },
        {
          "item_id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
          "qty": 1
        },
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 1
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 1
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 1
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 1
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 1
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 1
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 1
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 1
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 1
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 1
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 1
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 1
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 1
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 1
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 1
        },
        {
          "item_id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
          "qty": 1
        },
        {
          "item_id": "56b462d4-5582-4132-b18a-b8730b8809ab",
          "qty": 1
        },
        {
          "item_id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
          "qty": 1
        },
        {
          "item_id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
          "qty": 1
        },
        {
          "item_id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
          "qty": 1
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 1
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 1
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 1
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 1
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 1
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 1
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 1
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 1
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 1
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 1
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 1
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 1
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 1
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 1
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 1
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 1
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 1
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 1
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 1
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 1
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 1
        },
        {
          "item_id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
          "qty": 1
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 1
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 1
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_032",
      "name": "علب سندويش فلين",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 360,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
          "qty": 1
        },
        {
          "item_id": "340b7751-2645-4635-9085-697fe1443253",
          "qty": 1
        },
        {
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601",
          "qty": 1
        },
        {
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
          "qty": 1
        },
        {
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30",
          "qty": 1
        },
        {
          "item_id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
          "qty": 1
        },
        {
          "item_id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
          "qty": 1
        },
        {
          "item_id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
          "qty": 1
        },
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 1
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 1
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 1
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 1
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 1
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 1
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 1
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 1
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 1
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 1
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 1
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 1
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 1
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 1
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 1
        },
        {
          "item_id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
          "qty": 1
        },
        {
          "item_id": "56b462d4-5582-4132-b18a-b8730b8809ab",
          "qty": 1
        },
        {
          "item_id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
          "qty": 1
        },
        {
          "item_id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
          "qty": 1
        },
        {
          "item_id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
          "qty": 1
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 1
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 1
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 1
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 1
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 1
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 1
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 1
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 1
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 1
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 1
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 1
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 1
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 1
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 1
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 1
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 1
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 1
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 1
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 1
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 1
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 1
        },
        {
          "item_id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
          "qty": 1
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 1
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 1
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_sandwich_boxes",
          "material_id": "rest_032",
          "date": "2026-11-02",
          "type": "in",
          "qty": 200,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب سندويش فلين",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_035",
      "name": "علب مايونيز (فارغة)",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 280,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1ed629ff-844a-433a-960e-0fab9bb71934",
          "qty": 1
        },
        {
          "item_id": "e829859d-2397-45f4-81a3-48290ef9650f",
          "qty": 1
        },
        {
          "item_id": "12b34a0b-f7b8-445b-8ecf-cebabeec4a26",
          "qty": 1
        },
        {
          "item_id": "5478fbb0-5cdb-4aa6-89c5-41a89873cb78",
          "qty": 1
        },
        {
          "item_id": "e6481b4b-87c3-4079-a995-7edac7f3861e",
          "qty": 1
        },
        {
          "item_id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
          "qty": 1
        },
        {
          "item_id": "31a84b92-7ec3-4292-8eb4-8070e1f97f11",
          "qty": 1
        },
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 1
        },
        {
          "item_id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
          "qty": 1
        },
        {
          "item_id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
          "qty": 1
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 1
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 1
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 1
        },
        {
          "item_id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
          "qty": 1
        },
        {
          "item_id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
          "qty": 1
        },
        {
          "item_id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
          "qty": 1
        },
        {
          "item_id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
          "qty": 1
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 1
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 1
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 1
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 1
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 1
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 1
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 1
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 1
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 1
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 1
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 1
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 1
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 1
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 1
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 1
        },
        {
          "item_id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
          "qty": 1
        },
        {
          "item_id": "687faedb-241f-4b71-b35f-5370b38ba798",
          "qty": 1
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 1
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 1
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 1
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 1
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 1
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 1
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 1
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 1
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 1
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 1
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 1
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 1
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 1
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 1
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 1
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 1
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 1
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 1
        },
        {
          "item_id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
          "qty": 1
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 1
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 1
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 1
        },
        {
          "item_id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
          "qty": 1
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 1
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 1
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 1
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 1
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": []
    },
    {
      "id": "rest_036",
      "name": "علب صوص (فارغة)",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 1300,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1ed629ff-844a-433a-960e-0fab9bb71934",
          "qty": 2
        },
        {
          "item_id": "e829859d-2397-45f4-81a3-48290ef9650f",
          "qty": 2
        },
        {
          "item_id": "12b34a0b-f7b8-445b-8ecf-cebabeec4a26",
          "qty": 2
        },
        {
          "item_id": "5478fbb0-5cdb-4aa6-89c5-41a89873cb78",
          "qty": 2
        },
        {
          "item_id": "e6481b4b-87c3-4079-a995-7edac7f3861e",
          "qty": 2
        },
        {
          "item_id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
          "qty": 2
        },
        {
          "item_id": "31a84b92-7ec3-4292-8eb4-8070e1f97f11",
          "qty": 2
        },
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 2
        },
        {
          "item_id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
          "qty": 2
        },
        {
          "item_id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
          "qty": 2
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 2
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 2
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 2
        },
        {
          "item_id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
          "qty": 2
        },
        {
          "item_id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
          "qty": 2
        },
        {
          "item_id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
          "qty": 2
        },
        {
          "item_id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
          "qty": 2
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 2
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 2
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 2
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 2
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 2
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 2
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 2
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 2
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 2
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 2
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 2
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 2
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 2
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 2
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 2
        },
        {
          "item_id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
          "qty": 2
        },
        {
          "item_id": "687faedb-241f-4b71-b35f-5370b38ba798",
          "qty": 2
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 2
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 2
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 2
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 2
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 2
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 2
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 2
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 2
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 2
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 2
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 2
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 2
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 2
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 2
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 2
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 2
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 2
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 2
        },
        {
          "item_id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
          "qty": 2
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 2
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 2
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 2
        },
        {
          "item_id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
          "qty": 2
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 2
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 2
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 2
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 2
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 2
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_sauce_boxes",
          "material_id": "rest_036",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1000,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب صوص (فارغة)",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_037",
      "name": "علب سرفيس مخلل",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 175,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1c274a61-f903-4b13-8042-a85193b47dbb",
          "qty": 1
        },
        {
          "item_id": "4713fc40-aa7b-4f6b-be5e-881e05d57c7c",
          "qty": 1
        },
        {
          "item_id": "6cbb1eab-3c75-4ae0-9833-6ecf4aeff43f",
          "qty": 1
        },
        {
          "item_id": "206e75a6-66ba-465d-84a1-20a680c39148",
          "qty": 1
        },
        {
          "item_id": "fdfdd894-31cf-46aa-afe2-5ebfe6355a39",
          "qty": 1
        },
        {
          "item_id": "cc7050a5-3d0b-4c17-a070-a17bc56089c1",
          "qty": 1
        },
        {
          "item_id": "558d6f6c-1628-4be0-bd07-ce1569362a8c",
          "qty": 1
        },
        {
          "item_id": "db72e75b-73de-4cfb-a158-8bf3bb506064",
          "qty": 1
        },
        {
          "item_id": "a9652e31-6df6-4dcb-8482-362e6f13b384",
          "qty": 1
        },
        {
          "item_id": "b8e1fd06-8e4d-446a-ab26-5199fa4e1a87",
          "qty": 1
        },
        {
          "item_id": "76432160-c0d2-4ef4-b595-623a02e6076f",
          "qty": 1
        },
        {
          "item_id": "9c4c9e1b-8918-45b3-ab70-afd060a8c8e3",
          "qty": 1
        },
        {
          "item_id": "81cf9777-c58d-417b-935e-e0753f20de02",
          "qty": 1
        },
        {
          "item_id": "38f2e9ca-eab4-4f20-9eff-f22fc4aaf959",
          "qty": 1
        },
        {
          "item_id": "6fc76390-d161-47ef-9888-2a9734af8789",
          "qty": 1
        },
        {
          "item_id": "1da7e671-e1d1-4368-924d-e0eef4ae6340",
          "qty": 1
        },
        {
          "item_id": "68e1298f-80f2-4ec7-bfa4-39e26cd5b204",
          "qty": 1
        },
        {
          "item_id": "adca4333-d3e8-4422-9a8f-0cc8bc1cf4cd",
          "qty": 1
        },
        {
          "item_id": "94fc5453-9b0b-420f-a997-f0d9247434e2",
          "qty": 1
        },
        {
          "item_id": "0af382f0-60ff-47ab-b510-0803cf00bc3a",
          "qty": 1
        },
        {
          "item_id": "681b9919-fc98-4df2-aa8a-5ee6c9d2d8c6",
          "qty": 1
        },
        {
          "item_id": "72b8d925-6205-4ec7-a532-9298e3c78119",
          "qty": 1
        },
        {
          "item_id": "1b1813a8-9bf2-470e-91c7-ffb896e4685b",
          "qty": 1
        },
        {
          "item_id": "4ab57ef0-43d6-4b37-8493-bf057dc03b9b",
          "qty": 1
        },
        {
          "item_id": "6a0c6d84-53ed-4ddd-9176-08986cb3d1b2",
          "qty": 1
        },
        {
          "item_id": "5b6ce2ae-0c30-4977-b31c-aa5f0a9ea4f6",
          "qty": 1
        },
        {
          "item_id": "687faedb-241f-4b71-b35f-5370b38ba798",
          "qty": 1
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 1
        },
        {
          "item_id": "baec0b76-987e-4397-999c-37f1efc09302",
          "qty": 1
        },
        {
          "item_id": "0e6fa23e-fca4-4a43-93db-f7302ab46764",
          "qty": 1
        },
        {
          "item_id": "f5ac1aa7-60e6-4ed4-96f5-bd8c91b14603",
          "qty": 1
        },
        {
          "item_id": "ea7ff606-8ccf-4113-8121-7bb8a9ecc746",
          "qty": 1
        },
        {
          "item_id": "30f6f841-b838-43c4-a98e-98f9afd36b6b",
          "qty": 1
        },
        {
          "item_id": "75f52ef0-8fad-4753-b4b0-074ffda755b7",
          "qty": 1
        },
        {
          "item_id": "de16917f-07c3-48b9-8127-f48450b915fe",
          "qty": 1
        },
        {
          "item_id": "cfe944b7-85f3-4b1c-a785-c44fb7dc723e",
          "qty": 1
        },
        {
          "item_id": "319436a6-da45-4a5c-997c-b79191b1c21d",
          "qty": 1
        },
        {
          "item_id": "4e750558-e273-44cd-a007-0fd366a31afa",
          "qty": 1
        },
        {
          "item_id": "4085e93c-f758-46cb-81cb-e3a5c9197432",
          "qty": 1
        },
        {
          "item_id": "7df83160-116b-4413-97d1-81990495bfc9",
          "qty": 1
        },
        {
          "item_id": "91931b4b-0ded-45f9-9283-f48bb9f9be7f",
          "qty": 1
        },
        {
          "item_id": "b77063b8-3c75-4d50-908d-9e71b75b10f9",
          "qty": 1
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 1
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 1
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 1
        },
        {
          "item_id": "ecd5f84c-d760-555b-aefa-370431e3ea55",
          "qty": 1
        },
        {
          "item_id": "df59a059-aa04-5ba4-8869-4d30f8b0d6a0",
          "qty": 1
        },
        {
          "item_id": "6ef14e23-55eb-56b4-87d4-960ba5238522",
          "qty": 1
        },
        {
          "item_id": "4b5cd72a-4516-5d58-84f6-a9bb587375c2",
          "qty": 1
        },
        {
          "item_id": "cd1ad717-87d5-5396-9df2-a007077e9d0f",
          "qty": 1
        },
        {
          "item_id": "666f0cb3-5fad-527b-bcf9-8b2698c57378",
          "qty": 1
        },
        {
          "item_id": "5a8ec5b7-b69a-53f7-8d15-504b6918d408",
          "qty": 1
        },
        {
          "item_id": "9ac8e9a0-c7a8-51d2-b7dd-91261f43bece",
          "qty": 1
        },
        {
          "item_id": "c2b20f27-044b-5693-b710-f71532fd07af",
          "qty": 1
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_sarvis_plain",
          "material_id": "rest_037",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب سرفيس مخلل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_012",
      "name": "زرف حاد صغير",
      "category": "صوصات",
      "unit": "زرف",
      "qty": 960,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "6413462e-a638-4ed9-ae23-b5ed514bfc2b",
          "qty": 1
        },
        {
          "item_id": "340b7751-2645-4635-9085-697fe1443253",
          "qty": 1
        },
        {
          "item_id": "d261b574-02a4-4b36-872f-2f6b90264601",
          "qty": 1
        },
        {
          "item_id": "e15fa390-52f6-4ccc-a1fc-d1b858ca8e4e",
          "qty": 1
        },
        {
          "item_id": "56bca255-2bb8-4dbd-9311-37f291269f30",
          "qty": 1
        },
        {
          "item_id": "3ca97a74-f40c-49b5-936d-938a217d52bb",
          "qty": 1
        },
        {
          "item_id": "fda21a17-2de9-4ae3-b089-57ce317e5e86",
          "qty": 1
        },
        {
          "item_id": "1a7c5df9-0e04-4bb7-be2d-a83ef06e2a4e",
          "qty": 1
        },
        {
          "item_id": "fdc744a8-d817-4062-b7b1-7dd559403dd0",
          "qty": 1
        },
        {
          "item_id": "d63279b1-b9ad-4667-ab9f-cbd45a275315",
          "qty": 1
        },
        {
          "item_id": "7e7562bd-077a-4bef-b55f-fcd1cfc810e7",
          "qty": 1
        },
        {
          "item_id": "09c63a80-fafa-40d6-8a49-723ba86fe9dd",
          "qty": 1
        },
        {
          "item_id": "ae0343c8-40cf-401e-a4f6-78331ddf8254",
          "qty": 1
        },
        {
          "item_id": "0fba6fa0-7915-49f7-8d52-33a9fe204bca",
          "qty": 1
        },
        {
          "item_id": "9a5f3f39-81c0-4e15-b472-75e80c5ca77b",
          "qty": 1
        },
        {
          "item_id": "2018ff0a-6c2a-4ce8-88bb-8005062cb502",
          "qty": 1
        },
        {
          "item_id": "f6ae06d6-0dd2-427f-b140-d408472feec1",
          "qty": 1
        },
        {
          "item_id": "1da80f9a-d230-4d8d-bd52-a9499f7562b6",
          "qty": 1
        },
        {
          "item_id": "1af4735b-6723-4d6f-a5b3-e54b89d410ce",
          "qty": 1
        },
        {
          "item_id": "ea0f34d6-f0c0-4685-9587-dade5f08eae0",
          "qty": 1
        },
        {
          "item_id": "4b8251cd-1e0c-449b-a30d-ed3f028b00ce",
          "qty": 1
        },
        {
          "item_id": "5d5193d9-a450-4e00-bfea-b06f33db9db7",
          "qty": 1
        },
        {
          "item_id": "78122d88-a28e-408c-af31-601c0835c5bd",
          "qty": 1
        },
        {
          "item_id": "f2d97992-b9a4-4bc6-b967-17ef7ffc7834",
          "qty": 1
        },
        {
          "item_id": "56b462d4-5582-4132-b18a-b8730b8809ab",
          "qty": 1
        },
        {
          "item_id": "f2d94fbb-cfa0-4258-a84b-e06d97a8af31",
          "qty": 1
        },
        {
          "item_id": "9ce4396a-da57-43e8-942a-4bb5c7e58bf1",
          "qty": 1
        },
        {
          "item_id": "4a7bf50c-318d-403f-8616-022f0744e6bd",
          "qty": 1
        },
        {
          "item_id": "98013cf0-49b4-4a55-badd-3fbb7e61651f",
          "qty": 1
        },
        {
          "item_id": "682f8ac3-859f-4cd1-b3db-2028ca800945",
          "qty": 1
        },
        {
          "item_id": "bc33bdcd-c034-4ae3-a8da-6c2d55ddc6af",
          "qty": 1
        },
        {
          "item_id": "3740af1f-810d-4eb1-a7d0-c853f2091a67",
          "qty": 1
        },
        {
          "item_id": "9d3bd342-8b53-490f-b4cb-6b6f8c6153e5",
          "qty": 1
        },
        {
          "item_id": "2804b934-14d2-49b8-a686-c50517bded98",
          "qty": 1
        },
        {
          "item_id": "5bfcd062-787b-4cef-bbbd-af92881215e5",
          "qty": 1
        },
        {
          "item_id": "716932ed-ecac-4828-a3a1-4b6f6e540c95",
          "qty": 1
        },
        {
          "item_id": "89e26048-c58c-47b1-8429-488901fc64a4",
          "qty": 1
        },
        {
          "item_id": "eee042dc-4c23-45e7-8566-24fff8d39bda",
          "qty": 1
        },
        {
          "item_id": "fe8b217c-4c5c-4e10-8bdd-e160ff6bf8d7",
          "qty": 1
        },
        {
          "item_id": "35da4b0b-81c5-486b-9bbb-43dfa5d23781",
          "qty": 1
        },
        {
          "item_id": "c114d178-fab3-42ca-a014-8520c2b50601",
          "qty": 1
        },
        {
          "item_id": "630bcaa1-cc28-4d54-afe9-39753c772044",
          "qty": 1
        },
        {
          "item_id": "68eb9b8e-c723-4ae4-90ce-a2d5efee524b",
          "qty": 1
        },
        {
          "item_id": "b8ac5b01-59cf-45ac-aa72-f380184d76ae",
          "qty": 1
        },
        {
          "item_id": "48942aa3-7dc3-463b-9641-215d827db190",
          "qty": 1
        },
        {
          "item_id": "d72bf2ce-391e-4dc2-8e46-f9e772f114d3",
          "qty": 1
        },
        {
          "item_id": "020b2992-8e56-52fe-9556-724d3cfc5b82",
          "qty": 1
        },
        {
          "item_id": "e44fe229-314d-5edf-b000-95eaeef8cdca",
          "qty": 1
        },
        {
          "item_id": "41c32d3d-8824-53bc-960a-a214f7e75361",
          "qty": 1
        },
        {
          "item_id": "a3b061fe-2a0e-53b1-8ba7-fb41231b3c3e",
          "qty": 1
        },
        {
          "item_id": "536342e0-5590-5447-ba42-503e71390c56",
          "qty": 1
        },
        {
          "item_id": "3a904ed5-851d-5334-8508-4a48de843258",
          "qty": 1
        },
        {
          "item_id": "ee773860-bee0-59d5-b1d2-41c49edc5712",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_hot_sachets",
          "material_id": "rest_012",
          "date": "2026-11-02",
          "type": "in",
          "qty": 500,
          "note": "تحويل من المستودع إلى مخزون المطعم — زرف حاد صغير",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_sarvis_pickles",
      "name": "علب سرفيس مخلل",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 2100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_sarvis_plain",
          "material_id": "wh_20261102_sarvis_pickles",
          "date": "2026-11-02",
          "type": "out",
          "qty": 100,
          "note": "تحويل 100 علبة سرفيس عادي إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_sarvis_plain",
          "material_id": "wh_20261102_sarvis_pickles",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2200,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_sarvis_cut",
      "name": "علب سرفيس مقطع",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 450,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_sarvis_cut",
          "material_id": "wh_20261102_sarvis_cut",
          "date": "2026-11-02",
          "type": "out",
          "qty": 50,
          "note": "تحويل 50 علبة سرفيس مقطع إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_sarvis_cut",
          "material_id": "wh_20261102_sarvis_cut",
          "date": "2026-11-02",
          "type": "in",
          "qty": 500,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_fries_small",
      "name": "صحن بطاطا صغير فلين",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "صحن",
      "qty": 700,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_fries_small",
          "material_id": "wh_20261102_fries_small",
          "date": "2026-11-02",
          "type": "out",
          "qty": 100,
          "note": "تحويل 100 صحن بطاطا صغير إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_fries_small",
          "material_id": "wh_20261102_fries_small",
          "date": "2026-11-02",
          "type": "in",
          "qty": 800,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_fries_large",
      "name": "صحن بطاطا كبير فلين",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "صحن",
      "qty": 700,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_fries_large",
          "material_id": "wh_20261102_fries_large",
          "date": "2026-11-02",
          "type": "out",
          "qty": 100,
          "note": "تحويل 100 صحن بطاطا كبير إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_fries_large",
          "material_id": "wh_20261102_fries_large",
          "date": "2026-11-02",
          "type": "in",
          "qty": 800,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_arabic_meals",
      "name": "علب وجبات عربي",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 400,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_arabic_meals",
          "material_id": "wh_20261102_arabic_meals",
          "date": "2026-11-02",
          "type": "in",
          "qty": 400,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_sandwich_boxes",
      "name": "علب سندويش فلين",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 400,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_sandwich_boxes",
          "material_id": "wh_20261102_sandwich_boxes",
          "date": "2026-11-02",
          "type": "out",
          "qty": 200,
          "note": "تحويل 200 علبة سندويش إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_sandwich_boxes",
          "material_id": "wh_20261102_sandwich_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 600,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_burger_boxes",
      "name": "علب برغر فلين",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 250,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_burger_boxes",
          "material_id": "wh_20261102_burger_boxes",
          "date": "2026-11-02",
          "type": "out",
          "qty": 50,
          "note": "اعتماد «برغر 50» كـ50 علبة برغر فلين وتحويلها للمطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_burger_boxes",
          "material_id": "wh_20261102_burger_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 300,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_arabic_small",
      "name": "صحن عربي صغير",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "صحن",
      "qty": 609,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_arabic_small",
          "material_id": "wh_20261102_arabic_small",
          "date": "2026-11-02",
          "type": "in",
          "qty": 609,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_arabic_medium",
      "name": "صحن عربي وسط",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "صحن",
      "qty": 100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_arabic_medium",
          "material_id": "wh_20261102_arabic_medium",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_arabic_large",
      "name": "صحن عربي كبير",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "صحن",
      "qty": 30,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_arabic_large",
          "material_id": "wh_20261102_arabic_large",
          "date": "2026-11-02",
          "type": "in",
          "qty": 30,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_sauce_boxes",
      "name": "علب صوص",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "علبة",
      "qty": 2000,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_sauce_boxes",
          "material_id": "wh_20261102_sauce_boxes",
          "date": "2026-11-02",
          "type": "out",
          "qty": 1000,
          "note": "تحويل 1000 علبة صوص إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_sauce_boxes",
          "material_id": "wh_20261102_sauce_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 3000,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_cocktail_cups",
      "name": "كاسات كوكتيل",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "كأس",
      "qty": 150,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_cocktail_cups",
          "material_id": "wh_20261102_cocktail_cups",
          "date": "2026-11-02",
          "type": "in",
          "qty": 150,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_broasted_boxes",
      "name": "كراتين بروستد",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "كرتونة",
      "qty": 2150,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_broasted_boxes",
          "material_id": "wh_20261102_broasted_boxes",
          "date": "2026-11-02",
          "type": "out",
          "qty": 100,
          "note": "تحويل 100 علبة بروستد إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_broasted_boxes",
          "material_id": "wh_20261102_broasted_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2250,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_mayo_boxes",
      "name": "علب مايونيز",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "طرد",
      "qty": 4,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_mayo_box",
          "material_id": "wh_20261102_mayo_boxes",
          "date": "2026-11-02",
          "type": "out",
          "qty": 1,
          "note": "تحويل طرد مايونيز واحد إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_mayo_box",
          "material_id": "wh_20261102_mayo_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 5,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_cocktail_straws",
      "name": "شلمونات كوكتيل",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "كيس",
      "qty": 19,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_cocktail_straws",
          "material_id": "wh_20261102_cocktail_straws",
          "date": "2026-11-02",
          "type": "in",
          "qty": 19,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_sandwich_paper",
      "name": "ورق سندويش",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "ربطة",
      "qty": 32,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_sandwich_paper",
          "material_id": "wh_20261102_sandwich_paper",
          "date": "2026-11-02",
          "type": "in",
          "qty": 32,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_cellophane",
      "name": "سولوفان",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "رول",
      "qty": 17,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_cellophane",
          "material_id": "wh_20261102_cellophane",
          "date": "2026-11-02",
          "type": "out",
          "qty": 1,
          "note": "تحويل رول سولوفان واحد إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_cellophane",
          "material_id": "wh_20261102_cellophane",
          "date": "2026-11-02",
          "type": "in",
          "qty": 18,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_cashier_rolls",
      "name": "رول كاشير",
      "category": "مستودع - تعبئة وتغليف",
      "unit": "رول",
      "qty": 60,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_cashier_rolls",
          "material_id": "wh_20261102_cashier_rolls",
          "date": "2026-11-02",
          "type": "in",
          "qty": 60,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_tissues",
      "name": "محارم",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "كيس",
      "qty": 20,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_tissues",
          "material_id": "wh_20261102_tissues",
          "date": "2026-11-02",
          "type": "in",
          "qty": 20,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_gloves",
      "name": "كفوف",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "علبة",
      "qty": 13,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_gloves",
          "material_id": "wh_20261102_gloves",
          "date": "2026-11-02",
          "type": "out",
          "qty": 2,
          "note": "تحويل علبتي كفوف إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_gloves",
          "material_id": "wh_20261102_gloves",
          "date": "2026-11-02",
          "type": "in",
          "qty": 15,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_bags45",
      "name": "أكياس مقاس ٤٥",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "كغ",
      "qty": 305,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_bags45",
          "material_id": "wh_20261102_bags45",
          "date": "2026-11-02",
          "type": "out",
          "qty": 45,
          "note": "تحويل 45 كغ من أكياس مقاس 45 إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_bags45",
          "material_id": "wh_20261102_bags45",
          "date": "2026-11-02",
          "type": "in",
          "qty": 350,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_bags55",
      "name": "أكياس مقاس ٥٥",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "كغ",
      "qty": 100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_bags55",
          "material_id": "wh_20261102_bags55",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_drying_paper",
      "name": "ورق تنشيف",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "ربطة",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_drying_paper",
          "material_id": "wh_20261102_drying_paper",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_garbage_bags",
      "name": "أكياس قمامة",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "كغ",
      "qty": 40,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_garbage_bags",
          "material_id": "wh_20261102_garbage_bags",
          "date": "2026-11-02",
          "type": "in",
          "qty": 40,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_aprons",
      "name": "مريول",
      "category": "مستودع - مستهلكات ونظافة",
      "unit": "قطعة",
      "qty": 4,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_aprons",
          "material_id": "wh_20261102_aprons",
          "date": "2026-11-02",
          "type": "in",
          "qty": 4,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_vinegar",
      "name": "خل",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "لتر",
      "qty": 110,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_vinegar",
          "material_id": "wh_20261102_vinegar",
          "date": "2026-11-02",
          "type": "in",
          "qty": 110,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_ketchup_large_sachets",
      "name": "كتشب كبير زرف",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "زرف",
      "qty": 2300,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_ketchup_large_sachets",
          "material_id": "wh_20261102_ketchup_large_sachets",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2300,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_ketchup_small_sachets",
      "name": "زرف كتشب صغير",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "زرف",
      "qty": 500,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_ketchup_small_sachets",
          "material_id": "wh_20261102_ketchup_small_sachets",
          "date": "2026-11-02",
          "type": "out",
          "qty": 500,
          "note": "تحويل كرتونة زرف كتشب صغيرة = 500 زرف إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_ketchup_small_sachets",
          "material_id": "wh_20261102_ketchup_small_sachets",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1000,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_mushrooms",
      "name": "فطر مطربان",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "كغ",
      "qty": 12,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_mushrooms",
          "material_id": "wh_20261102_mushrooms",
          "date": "2026-11-02",
          "type": "in",
          "qty": 12,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_corn",
      "name": "ذرة",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "كغ",
      "qty": 9.6,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_corn",
          "material_id": "wh_20261102_corn",
          "date": "2026-11-02",
          "type": "out",
          "qty": 1.6,
          "note": "تحويل علبة ذرة واحدة = 1.6 كغ إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_corn",
          "material_id": "wh_20261102_corn",
          "date": "2026-11-02",
          "type": "in",
          "qty": 11.2,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_soy_oil",
      "name": "زيت صويا",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "كغ",
      "qty": 656,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_soy_oil",
          "material_id": "wh_20261102_soy_oil",
          "date": "2026-11-02",
          "type": "out",
          "qty": 32,
          "note": "تحويل تنكتين زيت صويا = 32 كغ إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_soy_oil",
          "material_id": "wh_20261102_soy_oil",
          "date": "2026-11-02",
          "type": "in",
          "qty": 688,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_pomegranate_sachets",
      "name": "زرف دبس رمان صغير",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "زرف",
      "qty": 500,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_pomegranate_sachets",
          "material_id": "wh_20261102_pomegranate_sachets",
          "date": "2026-11-02",
          "type": "in",
          "qty": 500,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_hot_sachets",
      "name": "زرف حاد صغير",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "زرف",
      "qty": 0,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_hot_sachets",
          "material_id": "wh_20261102_hot_sachets",
          "date": "2026-11-02",
          "type": "out",
          "qty": 500,
          "note": "تحويل كرتونة زرف حاد = 500 زرف إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_hot_sachets",
          "material_id": "wh_20261102_hot_sachets",
          "date": "2026-11-02",
          "type": "in",
          "qty": 500,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_mustard",
      "name": "خردل",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "بيدون",
      "qty": 4,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_mustard",
          "material_id": "wh_20261102_mustard",
          "date": "2026-11-02",
          "type": "in",
          "qty": 4,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_barbecue",
      "name": "باربيكيو",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "بيدون",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_out_barbecue",
          "material_id": "wh_20261102_barbecue",
          "date": "2026-11-02",
          "type": "out",
          "qty": 1,
          "note": "تحويل بيدون باربيكيو واحد إلى المطعم",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        },
        {
          "id": "whlog_20261102_open_barbecue",
          "material_id": "wh_20261102_barbecue",
          "date": "2026-11-02",
          "type": "in",
          "qty": 3,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "wh_20261102_cheddar",
      "name": "جبنة تشيدر",
      "category": "مستودع - غذائيات وزيوت وصوصات",
      "unit": "علبة",
      "qty": 3,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": false,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "whlog_20261102_open_cheddar",
          "material_id": "wh_20261102_cheddar",
          "date": "2026-11-02",
          "type": "in",
          "qty": 3,
          "note": "جرد المستودع 2026-11-02 — الرصيد قبل التحويل",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_fries_small",
      "name": "صحن بطاطا صغير فلين",
      "category": "تعبئة وتغليف",
      "unit": "صحن",
      "qty": 100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_fries_small",
          "material_id": "rest_transfer_fries_small",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "تحويل من المستودع إلى مخزون المطعم — صحن بطاطا صغير فلين",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_fries_large",
      "name": "صحن بطاطا كبير فلين",
      "category": "تعبئة وتغليف",
      "unit": "صحن",
      "qty": 100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_fries_large",
          "material_id": "rest_transfer_fries_large",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "تحويل من المستودع إلى مخزون المطعم — صحن بطاطا كبير فلين",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_burger_boxes",
      "name": "علب برغر فلين",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 50,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "b377a33e-61d1-4fd6-8900-e436e79e9d7b",
          "qty": 1
        },
        {
          "item_id": "ebed9d49-e023-4a4a-a84d-53e295994bec",
          "qty": 1
        },
        {
          "item_id": "30828f36-3bac-4d00-a8a1-038463507198",
          "qty": 1
        },
        {
          "item_id": "97a09273-432c-4698-87e0-f579945f0cb7",
          "qty": 1
        },
        {
          "item_id": "76fb4ad7-70f9-4b5b-8349-325ee9524421",
          "qty": 1
        },
        {
          "item_id": "94e48a79-cfea-4956-a99d-7c601a7202ff",
          "qty": 1
        },
        {
          "item_id": "6edadfe5-8cea-44a5-951a-4d911aee7083",
          "qty": 1
        },
        {
          "item_id": "f81b995b-2661-4997-9290-5ddf7d8a065e",
          "qty": 1
        },
        {
          "item_id": "ae04b651-bd96-4785-b0ef-539380d2b488",
          "qty": 1
        },
        {
          "item_id": "bb9f2c6a-3741-436e-a06e-1bdaac5356eb",
          "qty": 1
        },
        {
          "item_id": "e86d44ab-d8c7-4b3a-8818-82f3846f3a93",
          "qty": 1
        },
        {
          "item_id": "e3a1ad3c-25bd-45ef-abb2-ab89f6982e95",
          "qty": 1
        },
        {
          "item_id": "ceb72a87-de36-50d6-ae80-c591c9fa0ad8",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_burger_boxes",
          "material_id": "rest_transfer_burger_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 50,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب برغر فلين",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_sarvis_cut",
      "name": "علب سرفيس مقطع",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 50,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1ed629ff-844a-433a-960e-0fab9bb71934",
          "qty": 1
        },
        {
          "item_id": "e829859d-2397-45f4-81a3-48290ef9650f",
          "qty": 1
        },
        {
          "item_id": "12b34a0b-f7b8-445b-8ecf-cebabeec4a26",
          "qty": 1
        },
        {
          "item_id": "5478fbb0-5cdb-4aa6-89c5-41a89873cb78",
          "qty": 1
        },
        {
          "item_id": "e6481b4b-87c3-4079-a995-7edac7f3861e",
          "qty": 1
        },
        {
          "item_id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
          "qty": 1
        },
        {
          "item_id": "31a84b92-7ec3-4292-8eb4-8070e1f97f11",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_sarvis_cut",
          "material_id": "rest_transfer_sarvis_cut",
          "date": "2026-11-02",
          "type": "in",
          "qty": 50,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب سرفيس مقطع",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_cellophane",
      "name": "رول سولوفان",
      "category": "تعبئة وتغليف",
      "unit": "رول",
      "qty": 1,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_cellophane",
          "material_id": "rest_transfer_cellophane",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1,
          "note": "تحويل من المستودع إلى مخزون المطعم — رول سولوفان",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_gloves",
      "name": "كفوف",
      "category": "نظافة ومستهلكات",
      "unit": "علبة",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_gloves",
          "material_id": "rest_transfer_gloves",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2,
          "note": "تحويل من المستودع إلى مخزون المطعم — كفوف",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_bags45",
      "name": "أكياس مقاس ٤٥",
      "category": "نظافة ومستهلكات",
      "unit": "كغ",
      "qty": 45,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_bags45",
          "material_id": "rest_transfer_bags45",
          "date": "2026-11-02",
          "type": "in",
          "qty": 45,
          "note": "تحويل من المستودع إلى مخزون المطعم — أكياس مقاس ٤٥",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_soy_oil",
      "name": "زيت صويا",
      "category": "زيوت",
      "unit": "تنكة",
      "qty": 2,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_soy_oil",
          "material_id": "rest_transfer_soy_oil",
          "date": "2026-11-02",
          "type": "in",
          "qty": 2,
          "note": "تحويل من المستودع إلى مخزون المطعم — زيت صويا",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_corn",
      "name": "ذرة",
      "category": "مواد غذائية",
      "unit": "علبة",
      "qty": 1,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_corn",
          "material_id": "rest_transfer_corn",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1,
          "note": "تحويل من المستودع إلى مخزون المطعم — ذرة",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_barbecue",
      "name": "باربيكيو",
      "category": "صوصات",
      "unit": "بيدون",
      "qty": 1,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_barbecue",
          "material_id": "rest_transfer_barbecue",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1,
          "note": "تحويل من المستودع إلى مخزون المطعم — باربيكيو",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_mayo",
      "name": "علب مايونيز",
      "category": "تعبئة وتغليف",
      "unit": "طرد",
      "qty": 1,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_mayo_box",
          "material_id": "rest_transfer_mayo",
          "date": "2026-11-02",
          "type": "in",
          "qty": 1,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب مايونيز",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    },
    {
      "id": "rest_transfer_broasted_boxes",
      "name": "علب بروستد",
      "category": "تعبئة وتغليف",
      "unit": "علبة",
      "qty": 100,
      "min_qty": 0,
      "reorder_qty": 0,
      "cost_per_unit": 0,
      "trackable": true,
      "loaves_per_bundle": null,
      "recipe": [
        {
          "item_id": "1ed629ff-844a-433a-960e-0fab9bb71934",
          "qty": 1
        },
        {
          "item_id": "e829859d-2397-45f4-81a3-48290ef9650f",
          "qty": 1
        },
        {
          "item_id": "12b34a0b-f7b8-445b-8ecf-cebabeec4a26",
          "qty": 1
        },
        {
          "item_id": "5478fbb0-5cdb-4aa6-89c5-41a89873cb78",
          "qty": 1
        },
        {
          "item_id": "e6481b4b-87c3-4079-a995-7edac7f3861e",
          "qty": 1
        },
        {
          "item_id": "8ab0aabe-a37a-44af-bd82-504e549c2e60",
          "qty": 1
        },
        {
          "item_id": "31a84b92-7ec3-4292-8eb4-8070e1f97f11",
          "qty": 1
        }
      ],
      "supplier_name": "",
      "log": [
        {
          "id": "restlog_20261102_transfer_broasted_boxes",
          "material_id": "rest_transfer_broasted_boxes",
          "date": "2026-11-02",
          "type": "in",
          "qty": 100,
          "note": "تحويل من المستودع إلى مخزون المطعم — علب بروستد",
          "cost": null,
          "supplier_id": null,
          "auto": false,
          "supplier_name": null,
          "by": "المدير",
          "time": ""
        }
      ]
    }
  ],
  "expenditures": [],
  "material_purchases": [
    {
      "id": 1790173921591,
      "date": "2026-09-23",
      "item": "سمون شاورما كبير",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 6,
      "weight": 0,
      "unitCost": 10000,
      "total": 60000,
      "time": "٠٢:٣٢ م",
      "price_per_loaf": 2500,
      "price_per_piece": null
    },
    {
      "id": 1790173915976,
      "date": "2026-09-23",
      "item": "سمون شاورما كبير",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 6,
      "weight": 0,
      "unitCost": 10000,
      "total": 60000,
      "time": "٠٢:٣١ م",
      "price_per_loaf": 2500,
      "price_per_piece": null
    },
    {
      "id": 1790173910572,
      "date": "2026-09-23",
      "item": "سمون شاورما كبير",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 6,
      "weight": 0,
      "unitCost": 10000,
      "total": 60000,
      "time": "٠٢:٣١ م",
      "price_per_loaf": 2500,
      "price_per_piece": null
    },
    {
      "id": 1790173885855,
      "date": "2026-09-23",
      "item": "خبز سياحي",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 6,
      "weight": 0,
      "unitCost": 10000,
      "total": 60000,
      "time": "٠٢:٣١ م",
      "price_per_loaf": 833.33,
      "price_per_piece": null
    },
    {
      "id": 1790173880357,
      "date": "2026-09-23",
      "item": "سمون شاورما كبير",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 6,
      "weight": 0,
      "unitCost": 10000,
      "total": 60000,
      "time": "٠٢:٣١ م",
      "price_per_loaf": 2500,
      "price_per_piece": null
    },
    {
      "id": 1790173874992,
      "date": "2026-09-23",
      "item": "خبز صاج / شراك",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 6,
      "weight": 0,
      "unitCost": 10000,
      "total": 60000,
      "time": "٠٢:٣١ م",
      "price_per_loaf": 100,
      "price_per_piece": null
    },
    {
      "id": 1790171861546,
      "date": "2026-09-23",
      "item": "خبز صاج / شراك",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 15,
      "weight": 0,
      "unitCost": 5000,
      "total": 75000,
      "time": "٠١:٥٧ م",
      "price_per_loaf": 50,
      "price_per_piece": null
    },
    {
      "id": 1790171856450,
      "date": "2026-09-23",
      "item": "سمون شاورما كبير",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 15,
      "weight": 0,
      "unitCost": 5000,
      "total": 75000,
      "time": "٠١:٥٧ م",
      "price_per_loaf": 1250,
      "price_per_piece": null
    },
    {
      "id": 1790171851347,
      "date": "2026-09-23",
      "item": "خبز صاج / شراك",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 15,
      "weight": 0,
      "unitCost": 5000,
      "total": 75000,
      "time": "٠١:٥٧ م",
      "price_per_loaf": 50,
      "price_per_piece": null
    },
    {
      "id": 1790171847074,
      "date": "2026-09-23",
      "item": "سمون شاورما كبير",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 15,
      "weight": 0,
      "unitCost": 5000,
      "total": 75000,
      "time": "٠١:٥٧ م",
      "price_per_loaf": 1250,
      "price_per_piece": null
    },
    {
      "id": 1790171841821,
      "date": "2026-09-23",
      "item": "سمون شاورما كبير",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 15,
      "weight": 0,
      "unitCost": 5000,
      "total": 75000,
      "time": "٠١:٥٧ م",
      "price_per_loaf": 1250,
      "price_per_piece": null
    },
    {
      "id": 1790171527430,
      "date": "2026-09-23",
      "item": "خبز سياحي",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 12,
      "weight": 5,
      "unitCost": 5833,
      "total": 70000,
      "time": "٠١:٥٢ م",
      "price_per_loaf": 486.11,
      "price_per_piece": null
    },
    {
      "id": 1790171522920,
      "date": "2026-09-23",
      "item": "خبز صاج / شراك",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 12,
      "weight": 5,
      "unitCost": 5833,
      "total": 70000,
      "time": "٠١:٥٢ م",
      "price_per_loaf": 58.33,
      "price_per_piece": null
    },
    {
      "id": 1790171439276,
      "date": "2026-09-23",
      "item": "خبز صاج / شراك",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 7,
      "weight": 0,
      "unitCost": 10000,
      "total": 70000,
      "time": "٠١:٥٠ م",
      "price_per_loaf": 100,
      "price_per_piece": null
    },
    {
      "id": 1790171434806,
      "date": "2026-09-23",
      "item": "سمون شاورما كبير",
      "cat": "مخبوزات",
      "unit": "ربطة",
      "packages": 1,
      "weight": 0,
      "unitCost": 70000,
      "total": 70000,
      "time": "٠١:٥٠ م",
      "price_per_loaf": 17500,
      "price_per_piece": null
    }
  ]
};

/* تثبيت المصدر المضمّن بشكل متزامن حتى ترى ملفات الصفحات اللقطة
   أثناء تحميلها. بعد ذلك يقرر alfaStart إن كانت IndexedDB أحدث،
   ويحافظ على الحالة الفارغة المقصودة عندما يكون المستخدم قد حذف كل شيء. */
(function () {
  try {
    const d = window.DEMO_DATA;
    const c = window.ALFA_LOCAL_CATALOG_SNAPSHOT;
    const b = window.ALFA_LOCAL_BUSINESS_SNAPSHOT;
    if (d && c) {
      d.categories = JSON.parse(JSON.stringify(c.categories || []));
      d.items = JSON.parse(JSON.stringify(c.items || []));
      d.__alfa_catalog_initialized = true;
    }
    if (d && b) {
      d.inventory = JSON.parse(JSON.stringify(b.inventory || []));
      d.inventory_materials = JSON.parse(JSON.stringify(b.inventory_materials || []));
      d.inventory_log = JSON.parse(JSON.stringify(b.inventory_log || []));
      d.expenditures = JSON.parse(JSON.stringify(b.expenditures || []));
      d.expenditures_list = d.expenditures;
      d.material_purchases = JSON.parse(JSON.stringify(b.material_purchases || []));
      d.__alfa_business_initialized = true;
    }
  } catch (e) { console.warn('[Aalamsystem] embedded local snapshot install skipped:', e && e.message); }
})();
