import { ProductCard } from "@/components/product-card";
import { EmptyState } from "@/components/empty-state";
import type { Product } from "@/lib/types";

export function ProductGrid({ products, emptyMessage }: { products: Product[]; emptyMessage?: string }) {
  if (products.length === 0) {
    return <EmptyState message={emptyMessage ?? "لا توجد منتجات مطابقة حاليًا."} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4" aria-busy="true" aria-label="جارٍ تحميل المنتجات">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-[var(--radius-card)] bg-paper/10">
          <div className="aspect-[4/3] w-full animate-pulse bg-paper/15" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-4/5 animate-pulse rounded bg-paper/15" />
            <div className="h-4 w-2/5 animate-pulse rounded bg-paper/15" />
          </div>
        </div>
      ))}
    </div>
  );
}
