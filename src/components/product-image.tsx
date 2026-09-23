import Image from "next/image";
import { IronIcon } from "@/components/icons";

export function ProductImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-paper to-paper-dim ${className ?? ""}`}
        role="img"
        aria-label={alt}
      >
        <IronIcon className="h-1/3 w-1/3 text-on-light-muted/40" />
      </div>
    );
  }

  // The wrapper is always `position: relative` so the `fill` image below has
  // something to anchor to — pass sizing classes (h-full w-full, h-12 w-12,
  // etc.) via `className`, never a `position` utility, or the two collide
  // and the wrapper silently collapses to zero height.
  return (
    <div className={`relative overflow-hidden bg-paper ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"}
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}
