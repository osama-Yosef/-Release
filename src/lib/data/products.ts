import "server-only";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { MOCK_CATEGORIES, MOCK_IMAGES, MOCK_PRODUCTS } from "@/lib/mock/products";
import { normalizeArabic } from "@/lib/search/normalize-arabic";
import { idFromSlug } from "@/lib/slug";
import type { BrowseParams, Category, Product, ProductImage } from "@/lib/types";

const useMock =
  process.env.NEXT_PUBLIC_USE_MOCK_CATALOG === "true" || !isSupabaseConfigured;

interface ProductsPublicRow {
  id: string;
  sku: string;
  barcode: string | null;
  category_id: string | null;
  name: string;
  description: string | null;
  specs: Record<string, string> | null;
  selling_price: number;
  is_active: boolean;
  created_at: string;
  is_available: boolean;
  primary_image_url: string | null;
  is_featured: boolean;
  featured_sort: number | null;
}

function mapProduct(row: ProductsPublicRow): Product {
  return {
    id: row.id,
    sku: row.sku,
    barcode: row.barcode,
    categoryId: row.category_id,
    name: row.name,
    description: row.description,
    specs: row.specs ?? {},
    sellingPrice: Number(row.selling_price),
    isActive: row.is_active,
    createdAt: row.created_at,
    isAvailable: row.is_available,
    primaryImageUrl: row.primary_image_url,
    isFeatured: row.is_featured,
    featuredSort: row.featured_sort,
  };
}

function mockMatches(product: Product, term: string): boolean {
  const key = normalizeArabic(
    [product.name, product.sku, product.description ?? "", ...Object.values(product.specs)].join(" "),
  );
  return key.includes(term);
}

export async function browseProducts(params: BrowseParams = {}): Promise<Product[]> {
  const limit = Math.min(Math.max(params.limit ?? 12, 1), 24);
  const offset = Math.max(params.offset ?? 0, 0);

  if (useMock || !supabase) {
    const term = normalizeArabic(params.search ?? "");
    let items = MOCK_PRODUCTS.filter((p) => p.isActive);
    if (term) items = items.filter((p) => mockMatches(p, term));
    if (params.categoryId) items = items.filter((p) => p.categoryId === params.categoryId);
    if (params.availableOnly) items = items.filter((p) => p.isAvailable);
    if (params.minPrice != null) items = items.filter((p) => p.sellingPrice >= params.minPrice!);
    if (params.maxPrice != null) items = items.filter((p) => p.sellingPrice <= params.maxPrice!);

    const sort = params.sort ?? "newest";
    items = [...items].sort((a, b) => {
      if (sort === "price_asc") return a.sellingPrice - b.sellingPrice;
      if (sort === "price_desc") return b.sellingPrice - a.sellingPrice;
      if (sort === "name") return a.name.localeCompare(b.name, "ar");
      return (b.featuredSort ?? 99) - (a.featuredSort ?? 99);
    });
    return items.slice(offset, offset + limit);
  }

  const { data, error } = await supabase.rpc("rpc_public_browse_products", {
    p_search: params.search || null,
    p_category_id: params.categoryId || null,
    p_min_price: params.minPrice ?? null,
    p_max_price: params.maxPrice ?? null,
    p_available_only: params.availableOnly ?? false,
    p_sort: params.sort ?? "newest",
    p_limit: limit,
    p_offset: offset,
  });
  if (error) {
    console.error("browseProducts failed", error.message);
    return [];
  }
  return (data as ProductsPublicRow[]).map(mapProduct);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  if (useMock || !supabase) {
    return MOCK_PRODUCTS.filter((p) => p.isActive && p.isFeatured)
      .sort((a, b) => (a.featuredSort ?? 99) - (b.featuredSort ?? 99))
      .slice(0, limit);
  }
  const { data, error } = await supabase.rpc("rpc_public_browse_products", {
    p_search: null,
    p_category_id: null,
    p_min_price: null,
    p_max_price: null,
    p_available_only: false,
    p_sort: "newest",
    p_limit: limit,
    p_offset: 0,
  });
  if (error) {
    console.error("getFeaturedProducts failed", error.message);
    return [];
  }
  return (data as ProductsPublicRow[]).map(mapProduct).filter((p) => p.isFeatured);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const prefix = idFromSlug(slug);
  if (!prefix) return null;

  if (useMock || !supabase) {
    const found = MOCK_PRODUCTS.find((p) => p.isActive && p.id.slice(0, 8) === prefix);
    return found ?? null;
  }

  const { data, error } = await supabase.rpc("rpc_public_get_product_by_id_prefix", {
    p_prefix: prefix,
  });
  if (error) {
    console.error("getProductBySlug failed", error.message);
    return null;
  }
  const row = (data as ProductsPublicRow[])[0];
  return row ? mapProduct(row) : null;
}

/** Exact-id lookup (e.g. from a `?product=<uuid>` link) — unlike
 * getProductBySlug, this doesn't need the slug's id-prefix trick. */
export async function getProductById(id: string): Promise<Product | null> {
  if (useMock || !supabase) {
    const found = MOCK_PRODUCTS.find((p) => p.isActive && p.id === id);
    return found ?? null;
  }

  const { data, error } = await supabase.rpc("rpc_public_get_product", { p_id: id });
  if (error) {
    console.error("getProductById failed", error.message);
    return null;
  }
  const row = (data as ProductsPublicRow[])[0];
  return row ? mapProduct(row) : null;
}

export async function getProductImages(productId: string): Promise<ProductImage[]> {
  if (useMock || !supabase) {
    return MOCK_IMAGES[productId] ?? [];
  }
  const { data, error } = await supabase.rpc("rpc_public_get_product_images", {
    p_product_id: productId,
  });
  if (error) {
    console.error("getProductImages failed", error.message);
    return [];
  }
  return (data as { image_url: string; sort_order: number; is_primary: boolean }[]).map((r) => ({
    imageUrl: r.image_url,
    sortOrder: r.sort_order,
    isPrimary: r.is_primary,
  }));
}

export async function getCategories(): Promise<Category[]> {
  if (useMock || !supabase) {
    return [...MOCK_CATEGORIES].sort((a, b) => a.sortOrder - b.sortOrder);
  }
  const { data, error } = await supabase.rpc("rpc_public_list_categories");
  if (error) {
    console.error("getCategories failed", error.message);
    return [];
  }
  return (data as { id: string; parent_id: string | null; name: string; image_url: string | null; sort_order: number }[]).map(
    (r) => ({
      id: r.id,
      parentId: r.parent_id,
      name: r.name,
      imageUrl: r.image_url,
      sortOrder: r.sort_order,
    }),
  );
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const items = await browseProducts({ categoryId: product.categoryId ?? undefined, limit: limit + 1 });
  return items.filter((p) => p.id !== product.id).slice(0, limit);
}

/** All searchable text for a product — used to build the search suggestions list. */
export function searchableText(product: Product): string {
  return [product.name, product.sku, product.description ?? "", ...Object.values(product.specs)].join(" ");
}

export const isUsingMockCatalog = useMock;
