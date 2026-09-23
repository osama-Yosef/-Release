import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductFilters } from "@/components/product-filters";
import { ProductGrid, ProductGridSkeleton } from "@/components/product-grid";
import { browseProducts, getCategories } from "@/lib/data/products";
import type { SortOption } from "@/lib/types";

export const metadata: Metadata = {
  title: "المنتجات",
  description: "تصفح كل مكاوي البخار وأجهزة البخار وقطع الغيار والإكسسوارات المتاحة في معرض مكوجي.",
  alternates: { canonical: "/products" },
};

const SORTS: SortOption[] = ["newest", "price_asc", "price_desc", "name"];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const sort = SORTS.includes(params.sort as SortOption) ? (params.sort as SortOption) : "newest";

  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-on-dark sm:text-3xl">المنتجات</h1>
        <p className="mt-2 text-on-dark-muted">كل مكاوي البخار، أجهزة البخار، قطع الغيار والإكسسوارات في مكان واحد.</p>
      </header>

      <ProductFilters categories={categories} />

      <div className="mt-8">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsResults
            search={params.q}
            categoryId={params.category}
            sort={sort}
            availableOnly={params.available === "1"}
          />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductsResults({
  search,
  categoryId,
  sort,
  availableOnly,
}: {
  search?: string;
  categoryId?: string;
  sort: SortOption;
  availableOnly: boolean;
}) {
  const products = await browseProducts({ search, categoryId, sort, availableOnly, limit: 24 });
  return (
    <ProductGrid
      products={products}
      emptyMessage={search ? `مفيش نتائج لـ "${search}"` : "لا توجد منتجات مطابقة حاليًا."}
    />
  );
}
