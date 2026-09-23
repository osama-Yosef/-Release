import { Hero } from "@/components/hero";
import { CategoryStrip } from "@/components/category-strip";
import { HowItWorks } from "@/components/how-it-works";
import { AppShowcase } from "@/components/app-showcase";
import { MaintenanceSection } from "@/components/maintenance-section";
import { DownloadSection } from "@/components/download-section";
import { SectionHeading } from "@/components/section-heading";
import { ProductGrid } from "@/components/product-grid";
import { getCategories, getFeaturedProducts } from "@/lib/data/products";
import Link from "next/link";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([getFeaturedProducts(8), getCategories()]);

  return (
    <>
      <Hero />

      <section className="bg-ink-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="مختارات" title="منتجات مميزة" />
            <Link href="/products" className="text-sm font-medium text-teal hover:text-gold">
              كل المنتجات ←
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={featured} emptyMessage="هنضيف منتجات مميزة قريبًا." />
          </div>
        </div>
      </section>

      <CategoryStrip categories={categories} />
      <HowItWorks />
      <AppShowcase />
      <MaintenanceSection />
      <DownloadSection />
    </>
  );
}
