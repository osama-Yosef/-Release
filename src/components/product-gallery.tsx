"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product-image";
import type { ProductImage as ProductImageType } from "@/lib/types";

export function ProductGallery({
  images,
  fallback,
  name,
}: {
  images: ProductImageType[];
  fallback: string | null;
  name: string;
}) {
  const gallery = images.length > 0 ? images.map((i) => i.imageUrl) : fallback ? [fallback] : [];
  const [active, setActive] = useState(0);
  const current = gallery[active] ?? null;

  return (
    <div>
      <div className="aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-paper">
        <ProductImage src={current} alt={name} className="h-full w-full" priority sizes="(min-width: 1024px) 40vw, 90vw" />
      </div>
      {gallery.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`صورة ${i + 1}`}
              aria-current={i === active}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-sm ring-2 transition ${
                i === active ? "ring-gold" : "ring-transparent"
              }`}
            >
              <ProductImage src={src} alt="" className="h-full w-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
