-- إعداد ترتيب المنيو ورفع صور الأصناف
-- يُنفّذ مرة واحدة من Supabase SQL Editor بصلاحية مالك قاعدة البيانات.
-- التطبيق يعمل بالـ fallback القديم إلى أن تُطبّق هذه migration.

begin;

/* رقم التصنيف الرئيسي ثابت 1..8، وترتيب الصنف مستقل داخله. */
alter table public.items
  add column if not exists category_order integer,
  add column if not exists item_order integer;

with ranked as (
  select
    i.id,
    c.sort_order as category_order,
    row_number() over (
      partition by i.category_id
      order by coalesce(i.sort_order, 0), i.created_at nulls last, i.id
    )::integer as item_order
  from public.items i
  /* بعض النسخ القديمة تجعل categories.id نصاً وitems.category_id UUID؛
     المقارنة كنص تعمل مع النوعين دون خطأ 42883. */
  left join public.categories c on c.id::text = i.category_id::text
)
update public.items i
set
  category_order = r.category_order,
  item_order = r.item_order
from ranked r
where i.id = r.id;

create index if not exists items_category_order_idx
  on public.items (category_order, item_order);

/* bucket الصور العامة للمنيو. */
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'menu-assets',
  'menu-assets',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update set
  name = excluded.name,
  public = true,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

/* القراءة العامة مطلوبة لأن image_url يُحفظ كرابط public في items.image_url. */
drop policy if exists "menu_assets_public_read" on storage.objects;
create policy "menu_assets_public_read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'menu-assets');

/* الواجهة الحالية تعتمد على anon key بعد دخول المدير المحلي. */
drop policy if exists "menu_assets_upload" on storage.objects;
create policy "menu_assets_upload"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'menu-assets');

drop policy if exists "menu_assets_update" on storage.objects;
create policy "menu_assets_update"
on storage.objects for update
to anon, authenticated
using (bucket_id = 'menu-assets')
with check (bucket_id = 'menu-assets');

drop policy if exists "menu_assets_delete" on storage.objects;
create policy "menu_assets_delete"
on storage.objects for delete
to anon, authenticated
using (bucket_id = 'menu-assets');

commit;
