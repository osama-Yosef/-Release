/**
 * Mirrors the database's `search_key()` SQL function (see
 * supabase/migrations/0034_catalog_browse.sql in the app repo) so client-side
 * suggestion filtering agrees with what the server-side RPC will match.
 * Folds hamza forms and ta-marbuta, strips tatweel and harakat, lowercases.
 */
export function normalizeArabic(input: string | null | undefined): string {
  if (!input) return "";
  return input
    .toLowerCase()
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ـ/g, "")
    .replace(/[ً-ْ]/g, "")
    .trim();
}
