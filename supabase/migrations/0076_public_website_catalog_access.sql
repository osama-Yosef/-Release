-- ============================================================================
-- 0076_public_website_catalog_access.sql
--
-- Purpose: let the anonymous `anon` role (the public marketing website,
-- unauthenticated) browse the PUBLISHED catalogue only. Nothing in this file
-- changes an existing policy, grant, or view — it only adds four new,
-- narrowly-scoped SECURITY DEFINER RPCs, mirroring the pattern this codebase
-- already uses for `rpc_browse_products` (0034) and `products_public` (0009+).
--
-- Why RPCs instead of `grant select ... to anon` on `products_public` /
-- `product_categories` / `product_images` directly:
--   * `products_public.selling_price` calls `private.fn_effective_price(uuid)`,
--     which is currently `grant execute ... to authenticated` only (0061). A
--     plain view does not carry its own privileges into a function call in
--     its SELECT list — the QUERYING role needs EXECUTE. Granting anon SELECT
--     on the view directly would either error out or force widening that
--     function grant too. Routing through a SECURITY DEFINER function avoids
--     that: the function runs as its owner, which already has EXECUTE.
--   * `product_categories` and `product_images` are admin-writable tables
--     with existing `for all to authenticated using (is_admin())` policies.
--     Adding a bare `anon` SELECT grant on the *table* is a wider, harder to
--     reason about surface than a read-only function that returns exactly
--     the columns a website needs and nothing else.
--   * Every RPC re-applies the same visibility rule already used elsewhere
--     in this schema (`is_active and not is_service`), so a product hidden
--     or unpublished in the app is hidden on the website too, automatically.
--
-- This migration is purely additive: it creates 4 new functions and grants
-- EXECUTE on them to `anon` (and `authenticated`, so a logged-in customer
-- browsing the website also works). It does not touch RLS, does not modify
-- `rpc_browse_products`, `products_public`, or any table policy, and is safe
-- to run independently of `0075_reset_for_launch.sql`.
--
-- How to apply: paste into the Supabase SQL editor for this project, or copy
-- this file into the app repo's own `supabase/migrations/` and run
-- `supabase db push`. Either way, review it first — it is the first place in
-- this schema that grants anything to `anon`.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Browse/search — paginated, same search-key normalisation as the app
--    (Arabic diacritics/hamza-forms folded, LIKE metacharacters escaped).
--    Bounds are intentionally tighter than the internal rpc_browse_products
--    (limit <= 24, offset <= 2000): this is a showroom site, not a back
--    office tool, and tighter bounds cut the cost of casual scraping.
-- ----------------------------------------------------------------------------
create or replace function public.rpc_public_browse_products(
  p_search text default null,
  p_category_id uuid default null,
  p_min_price numeric default null,
  p_max_price numeric default null,
  p_available_only boolean default false,
  p_sort text default 'newest',
  p_limit int default 12,
  p_offset int default 0
)
returns setof public.products_public
language plpgsql stable security definer set search_path = '' as $$
declare
  v_term text;
  v_sort text := coalesce(p_sort, 'newest');
begin
  if v_sort not in ('newest', 'price_asc', 'price_desc', 'name') then
    raise exception 'INVALID_SORT';
  end if;
  if p_limit is null or p_limit < 1 or p_limit > 24
     or p_offset is null or p_offset < 0 or p_offset > 2000 then
    raise exception 'INVALID_PAGE';
  end if;
  if (p_min_price is not null and p_min_price < 0)
     or (p_max_price is not null and p_max_price < 0)
     or (p_min_price is not null and p_max_price is not null and p_min_price > p_max_price) then
    raise exception 'INVALID_PRICE_RANGE';
  end if;
  if p_search is not null and length(p_search) > 100 then
    raise exception 'INPUT_TOO_LONG';
  end if;

  v_term := nullif(btrim(public.search_key(p_search)), '');
  if v_term is not null then
    v_term := '%' || replace(replace(replace(v_term, '\', '\\'), '%', '\%'), '_', '\_') || '%';
  end if;

  return query
  with recursive cats as (
    select c.id from public.product_categories c where c.id = p_category_id
    union
    select c.id from public.product_categories c join cats on c.parent_id = cats.id
  ),
  page as (
    select
      p.id, p.sku, p.barcode, p.category_id, p.name, p.description, p.specs,
      private.fn_effective_price(p.id)::numeric(12,2) as selling_price,
      p.is_active, p.created_at,
      coalesce((
        select sum(ws.quantity) from public.warehouse_stock ws where ws.product_id = p.id
      ), 0) > 0 as is_available,
      p.is_featured, p.featured_sort
    from public.products p
    where p.is_active
      and not p.is_service
      and (p_category_id is null or p.category_id in (select id from cats))
      and (p_min_price is null or p.selling_price >= p_min_price)
      and (p_max_price is null or p.selling_price <= p_max_price)
      and (v_term is null or public.search_key(p.name || ' ' || p.sku) like v_term)
  )
  select
    pg.id, pg.sku, pg.barcode, pg.category_id, pg.name, pg.description, pg.specs,
    pg.selling_price, pg.is_active, pg.created_at, pg.is_available,
    (
      select pi.image_url from public.product_images pi
      where pi.product_id = pg.id
      order by pi.is_primary desc, pi.sort_order asc
      limit 1
    ) as primary_image_url,
    pg.is_featured, pg.featured_sort
  from page pg
  where not coalesce(p_available_only, false) or pg.is_available
  order by
    case when v_sort = 'price_asc' then pg.selling_price end asc,
    case when v_sort = 'price_desc' then pg.selling_price end desc,
    case when v_sort = 'name' then pg.name end asc,
    case when v_sort = 'newest' then pg.created_at end desc,
    pg.id
  limit p_limit offset p_offset;
end;
$$;

-- ----------------------------------------------------------------------------
-- 2. Single product by id (product detail page). Returns nothing for a
--    hidden/unpublished/service product or an id that doesn't exist — the
--    website must treat an empty result as a normal 404, not an error.
-- ----------------------------------------------------------------------------
create or replace function public.rpc_public_get_product(p_id uuid)
returns setof public.products_public
language sql stable security definer set search_path = '' as $$
  select * from public.products_public where id = p_id;
$$;

-- ----------------------------------------------------------------------------
-- 2b. Same lookup, but by the short id-prefix the website encodes into its
--     product URLs (there is no `slug` column on `products` today — see
--     supabase/README.md in the website repo). Requires a plausible id
--     prefix (hex only, 6-36 chars) so it can't be abused as an open text
--     scan; returns at most one row.
-- ----------------------------------------------------------------------------
create or replace function public.rpc_public_get_product_by_id_prefix(p_prefix text)
returns setof public.products_public
language plpgsql stable security definer set search_path = '' as $$
begin
  if p_prefix is null or p_prefix !~ '^[0-9a-fA-F]{6,36}$' then
    raise exception 'INVALID_ID';
  end if;

  return query
  select * from public.products_public
  where id::text like (lower(p_prefix) || '%')
  limit 1;
end;
$$;

-- ----------------------------------------------------------------------------
-- 3. Active categories, for navigation/filtering. No description column
--    exists on product_categories today, so none is returned.
-- ----------------------------------------------------------------------------
create or replace function public.rpc_public_list_categories()
returns table (
  id uuid,
  parent_id uuid,
  name text,
  image_url text,
  sort_order int
)
language sql stable security definer set search_path = '' as $$
  select c.id, c.parent_id, c.name, c.image_url, c.sort_order
  from public.product_categories c
  where c.is_active
  order by c.sort_order, c.name;
$$;

-- ----------------------------------------------------------------------------
-- 4. Full image gallery for one product (product detail page). product_images
--    has no publish flag of its own, so visibility is gated by the parent
--    product still being published (via products_public).
-- ----------------------------------------------------------------------------
create or replace function public.rpc_public_get_product_images(p_product_id uuid)
returns table (
  image_url text,
  sort_order int,
  is_primary boolean
)
language sql stable security definer set search_path = '' as $$
  select pi.image_url, pi.sort_order, pi.is_primary
  from public.product_images pi
  where pi.product_id = p_product_id
    and exists (select 1 from public.products_public pp where pp.id = p_product_id)
  order by pi.is_primary desc, pi.sort_order asc;
$$;

-- ----------------------------------------------------------------------------
-- 5. Grants — the only place in this migration that touches privileges.
--    Default privileges in this schema already revoke EXECUTE on new
--    functions from anon/authenticated (0029), so each grant below is
--    required, not redundant.
-- ----------------------------------------------------------------------------
grant execute on function public.rpc_public_browse_products(text, uuid, numeric, numeric, boolean, text, int, int)
  to anon, authenticated;
grant execute on function public.rpc_public_get_product(uuid)
  to anon, authenticated;
grant execute on function public.rpc_public_get_product_by_id_prefix(text)
  to anon, authenticated;
grant execute on function public.rpc_public_list_categories()
  to anon, authenticated;
grant execute on function public.rpc_public_get_product_images(uuid)
  to anon, authenticated;
