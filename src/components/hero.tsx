import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { HeroArt } from "@/components/hero-art";
import { DownloadIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="metal-sheen relative overflow-hidden border-b border-ink-line/70 bg-ink-950">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="font-tech text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            معرض مكوجي — مكاوي البخار
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.15] text-on-dark sm:text-5xl">
            مكوجي
            <span className="mt-2 block text-2xl font-bold text-teal sm:text-3xl">المعرض كله في إيدك</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-on-dark-muted">
            اكتشف أجهزة البخار والمكاوي والمنتجات المتاحة، واستخدم تطبيق مكوجي للطلب بسهولة.
          </p>

          <div className="mt-8 max-w-md">
            <SearchBar variant="hero" />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
            >
              <DownloadIcon className="h-4 w-4" />
              تحميل تطبيق مكوجي
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-sm border border-ink-line px-5 py-3 text-sm font-semibold text-on-dark transition hover:border-teal hover:text-teal"
            >
              استكشف المنتجات
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
