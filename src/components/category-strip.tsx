import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { SteamIcon } from "@/components/icons";
import type { Category } from "@/lib/types";

export function CategoryStrip({ categories }: { categories: Category[] }) {
  const top = categories.filter((c) => !c.parentId);
  if (top.length === 0) return null;

  return (
    <section className="bg-ink-900 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="التصنيفات" title="تصفح حسب النوع" />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {top.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-ink-line/70 bg-ink-800 px-4 py-6 text-center transition hover:border-gold/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-700 text-teal transition group-hover:text-gold">
                <SteamIcon className="h-6 w-6" />
              </span>
              <span className="text-sm font-medium text-on-dark">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
