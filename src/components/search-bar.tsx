"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchIcon, CloseIcon } from "@/components/icons";
import { ProductImage } from "@/components/product-image";
import { Price, AvailabilityBadge } from "@/components/price";
import type { Product } from "@/lib/types";

type Suggestion = Product & { categoryName: string | null };

export function SearchBar({
  variant = "hero",
  placeholder = "دور على اسم منتج… مكواة بخار، 2200، قطع غيار",
}: {
  variant?: "hero" | "compact";
  placeholder?: string;
}) {
  const router = useRouter();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 1) return;
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
        const data = await res.json();
        setResults(data.products ?? []);
        setOpen(true);
        setActiveIndex(-1);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goToSearchPage() {
    const term = query.trim();
    router.push(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        router.push(`/app?product=${results[activeIndex].id}`);
        setOpen(false);
      } else {
        goToSearchPage();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const isHero = variant === "hero";

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center gap-3 rounded-sm border transition-colors ${
          isHero
            ? "border-ink-line bg-ink-900/80 px-5 py-4 focus-within:border-gold"
            : "border-black/10 bg-paper px-4 py-2.5 focus-within:border-teal-600"
        }`}
      >
        <SearchIcon className={`h-5 w-5 shrink-0 ${isHero ? "text-on-dark-muted" : "text-on-light-muted"}`} />
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (value.trim().length < 1) {
              setResults([]);
              setOpen(false);
              setLoading(false);
            } else {
              setLoading(true);
            }
          }}
          onKeyDown={onKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className={`w-full bg-transparent outline-none placeholder:text-sm ${
            isHero ? "text-on-dark placeholder:text-on-dark-muted" : "text-on-light placeholder:text-on-light-muted"
          }`}
        />
        {query && (
          <button
            type="button"
            aria-label="مسح البحث"
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(false);
            }}
            className={isHero ? "text-on-dark-muted" : "text-on-light-muted"}
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-sm border border-black/10 bg-paper shadow-2xl"
        >
          {loading && <div className="px-4 py-3 text-sm text-on-light-muted">جارٍ البحث…</div>}
          {!loading && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-on-light-muted">مفيش نتائج لـ &quot;{query}&quot;</div>
          )}
          {!loading &&
            results.map((product, i) => (
              <Link
                key={product.id}
                href={`/app?product=${product.id}`}
                role="option"
                aria-selected={i === activeIndex}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 border-b border-black/5 px-4 py-2.5 last:border-0 hover:bg-black/[0.03] ${
                  i === activeIndex ? "bg-black/[0.04]" : ""
                }`}
              >
                <ProductImage src={product.primaryImageUrl} alt={product.name} className="h-12 w-12 shrink-0 rounded-sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-on-light">{product.name}</p>
                  <p className="truncate text-xs text-on-light-muted">{product.categoryName}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Price value={product.sellingPrice} className="text-sm text-teal-700" />
                  <AvailabilityBadge available={product.isAvailable} />
                </div>
              </Link>
            ))}
          {!loading && (
            <button
              type="button"
              onClick={goToSearchPage}
              className="w-full bg-black/[0.02] px-4 py-2.5 text-start text-sm font-medium text-teal-700 hover:bg-black/[0.04]"
            >
              عرض كل النتائج لـ &quot;{query}&quot; ←
            </button>
          )}
        </div>
      )}
    </div>
  );
}
