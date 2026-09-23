import Link from "next/link";
import { ProductImage } from "@/components/product-image";
import { Price, AvailabilityBadge } from "@/components/price";
import { DownloadIcon } from "@/components/icons";
import type { Product } from "@/lib/types";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const href = `/app?product=${product.id}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-paper text-on-light ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]"
    >
      <div className="relative aspect-[4/3] w-full border-b border-black/5">
        <ProductImage
          src={product.primaryImageUrl}
          alt={product.name}
          className="h-full w-full"
          priority={priority}
        />
        {product.isFeatured && (
          <span className="absolute right-3 top-3 rounded-sm bg-gold px-2 py-0.5 text-xs font-semibold text-ink-950">
            مميز
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-semibold leading-snug">{product.name}</h3>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Price value={product.sellingPrice} className="text-lg text-teal-700" />
          <AvailabilityBadge available={product.isAvailable} />
        </div>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700">
          <DownloadIcon className="h-4 w-4" />
          ثبّت التطبيق واطلبه
        </span>
      </div>
    </Link>
  );
}
