"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { SearchIcon } from "@/components/icons";
import type { Category } from "@/lib/types";

const SORTS = [
  { value: "newest", label: "الأحدث" },
  { value: "price_asc", label: "السعر: من الأقل للأعلى" },
  { value: "price_desc", label: "السعر: من الأعلى للأقل" },
  { value: "name", label: "الاسم" },
];

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [, startTransition] = useTransition();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => router.push(`/products?${params.toString()}`));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParam("q", q);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-black/10 bg-paper p-4 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-sm border border-black/10 bg-white px-3 py-2">
        <SearchIcon className="h-4 w-4 shrink-0 text-on-light-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="دور على اسم منتج…"
          className="w-full bg-transparent text-sm text-on-light outline-none placeholder:text-on-light-muted"
        />
      </div>

      <select
        value={searchParams.get("category") ?? ""}
        onChange={(e) => updateParam("category", e.target.value)}
        className="rounded-sm border border-black/10 bg-white px-3 py-2 text-sm text-on-light"
      >
        <option value="">كل التصنيفات</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("sort") ?? "newest"}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="rounded-sm border border-black/10 bg-white px-3 py-2 text-sm text-on-light"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-2 whitespace-nowrap text-sm text-on-light">
        <input
          type="checkbox"
          checked={searchParams.get("available") === "1"}
          onChange={(e) => updateParam("available", e.target.checked ? "1" : "")}
          className="h-4 w-4 accent-teal-600"
        />
        المتوفر فقط
      </label>

      <button type="submit" className="rounded-sm bg-teal-600 px-4 py-2 text-sm font-semibold text-paper transition hover:bg-teal-700">
        بحث
      </button>
    </form>
  );
}
