import { ProductGridSkeleton } from "@/components/product-grid";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 h-8 w-40 animate-pulse rounded bg-paper/10" />
      <div className="h-16 animate-pulse rounded-[var(--radius-card)] bg-paper/10" />
      <div className="mt-8">
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
