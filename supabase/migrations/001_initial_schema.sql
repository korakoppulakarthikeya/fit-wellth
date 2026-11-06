-- FitWellth initial schema. Run in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  price numeric(10,2) not null check (price >= 0),
  size text,
  tag text,
  description text,
  image text,
  ingredients jsonb not null default '[]'::jsonb,
  available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ingredients (
  id text primary key,
  name text not null,
  unit text not null default 'g',
  kcal numeric not null default 0,
  protein numeric not null default 0,
  carbs numeric not null default 0,
  fat numeric not null default 0,
  fibre numeric not null default 0,
  sugar numeric not null default 0,
  saturated_fat numeric not null default 0,
  added_sugar numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.recipes (
  id text primary key,
  product_id text not null references public.products(id) on delete cascade,
  servings numeric not null default 1 check (servings > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id text not null references public.recipes(id) on delete cascade,
  ingredient_id text not null references public.ingredients(id),
  quantity numeric not null check (quantity >= 0),
  unique(recipe_id, ingredient_id)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  customer_phone text,
  status text not null default 'pending',
  total numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0)
);

alter table public.products enable row level security;
alter table public.ingredients enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.reviews enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public customers can read available catalogue and recipe data.
create policy "Public can read available products" on public.products
for select using (available = true);
create policy "Public can read ingredients" on public.ingredients
for select using (true);
create policy "Public can read recipes" on public.recipes
for select using (true);
create policy "Public can read recipe ingredients" on public.recipe_ingredients
for select using (true);
create policy "Public can read approved reviews" on public.reviews
for select using (approved = true);
-- Public review submissions are unapproved until an admin moderates them.
create policy "Anyone can submit a review" on public.reviews
for insert with check (approved = false);

-- Admin policies. Create a profile row with role='admin' for the authenticated admin user.
create policy "Admins manage products" on public.products
for all to authenticated
using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Admins manage ingredients" on public.ingredients
for all to authenticated
using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Admins manage recipes" on public.recipes
for all to authenticated
using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Admins manage recipe ingredients" on public.recipe_ingredients
for all to authenticated
using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Admins manage reviews" on public.reviews
for all to authenticated
using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
