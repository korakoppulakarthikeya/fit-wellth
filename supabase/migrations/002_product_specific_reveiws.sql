-- Attach each review to a product while keeping existing general reviews intact.
alter table public.reviews
add column if not exists product_id text
references public.products(id) on delete cascade;

create index if not exists reviews_product_id_created_at_idx
on public.reviews(product_id, created_at desc);
