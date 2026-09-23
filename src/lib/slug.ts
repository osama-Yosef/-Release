import { normalizeArabic } from "@/lib/search/normalize-arabic";

/**
 * There is no `slug` column on `products` (see supabase/README.md) — this
 * derives a stable, readable slug from the name plus a short id suffix, so
 * a renamed product keeps a working (if now-stale-looking) URL rather than
 * breaking it, and two products with the same name never collide.
 */
export function productSlug(name: string, id: string): string {
  const base = normalizeArabic(name)
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}-${id.slice(0, 8)}`;
}

export function idFromSlug(slug: string): string | null {
  const match = slug.match(/-([0-9a-f]{8})$/i);
  return match ? match[1] : null;
}
