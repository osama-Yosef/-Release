/** Mirrors the `products_public` row shape returned by every rpc_public_* function. */
export interface Product {
  id: string;
  sku: string;
  barcode: string | null;
  categoryId: string | null;
  name: string;
  description: string | null;
  specs: Record<string, string>;
  sellingPrice: number;
  isActive: boolean;
  createdAt: string;
  isAvailable: boolean;
  primaryImageUrl: string | null;
  isFeatured: boolean;
  featuredSort: number | null;
}

export interface ProductImage {
  imageUrl: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Category {
  id: string;
  parentId: string | null;
  name: string;
  imageUrl: string | null;
  sortOrder: number;
}

export type SortOption = "newest" | "price_asc" | "price_desc" | "name";

export interface BrowseParams {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  availableOnly?: boolean;
  sort?: SortOption;
  limit?: number;
  offset?: number;
}
