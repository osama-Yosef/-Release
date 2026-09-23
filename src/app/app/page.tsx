import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { AppQrCode } from "@/components/qr-code";
import { appDownload, siteConfig } from "@/lib/config/site";
import { getProductById } from "@/lib/data/products";
import { ProductImage } from "@/components/product-image";
import { Price, AvailabilityBadgeOnDark } from "@/components/price";
import { DownloadIcon, SearchIcon, IronIcon, WrenchIcon, CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "تحميل تطبيق مكوجي",
  description: "حمّل تطبيق مكوجي وتصفح المنتجات، اطلب، وتابع الصيانة من موبايلك.",
  alternates: { canonical: "/app" },
};

const FEATURES = [
  { icon: SearchIcon, title: "تصفح المنتجات", body: "كل مكاوي البخار والمنتجات المتاحة في مكان واحد." },
  { icon: IronIcon, title: "تفاصيل كاملة", body: "صور، مواصفات، سعر، وتوافر لكل منتج قبل ما تطلب." },
  { icon: CheckIcon, title: "سلة وطلبات", body: "أضف للسلة، اطلب، وتابع حالة طلبك أول بأول." },
  { icon: WrenchIcon, title: "طلب صيانة", body: "لو جهازك محتاج صيانة، اطلب الخدمة من نفس التطبيق." },
];

export default async function AppDownloadPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productId } = await searchParams;
  const product = productId ? await getProductById(productId) : null;
  const qrTarget = `${siteConfig.url}/app`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="تطبيق مكوجي" title="المعرض في إيدك" align="center" />

      {product && (
        <div className="mx-auto mt-8 flex max-w-xl items-center gap-4 rounded-[var(--radius-card)] border border-gold/40 bg-ink-900 p-4">
          <ProductImage src={product.primaryImageUrl} alt={product.name} className="h-16 w-16 shrink-0 rounded-sm" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-on-dark-muted">عشان تطلب المنتج ده لازم تثبتي تطبيق مكوجي الأول</p>
            <p className="truncate font-semibold text-on-dark">{product.name}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <Price value={product.sellingPrice} className="text-teal" />
            <AvailabilityBadgeOnDark available={product.isAvailable} />
          </div>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-[260px]">
          <div className="metal-sheen rounded-[2.5rem] border-4 border-ink-700 bg-ink-950 p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
            <div className="flex h-[480px] flex-col items-center justify-center rounded-[1.8rem] bg-gradient-to-b from-paper to-paper-dim">
              <Image src="/brand/mokoji_logo.png" alt="مكوجي" width={140} height={80} className="h-auto w-32" />
              <p className="mt-3 text-xs font-medium text-on-light-muted">مكاوي البخار — منتجات وصيانة</p>
            </div>
          </div>
        </div>

        <div>
          <p className="max-w-md leading-relaxed text-on-dark-muted">
            مع تطبيق مكوجي تقدر تتصفح المنتجات، تشوف تفاصيلها، تضيفها للسلة، تطلب، تتابع حالة طلبك، وتطلب
            صيانة لجهازك لو محتاج — كل ده من موبايلك.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <div>
                  <p className="text-sm font-semibold text-on-dark">{f.title}</p>
                  <p className="text-xs text-on-dark-muted">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <DownloadCta />
            <div className="flex flex-col items-center gap-1.5 sm:items-start">
              <AppQrCode value={qrTarget} size={120} />
              <span className="text-xs text-on-dark-muted">امسح الكود من موبايلك</span>
            </div>
          </div>

          {(appDownload.version || appDownload.releaseDate) && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-1 font-tech text-xs text-on-dark-muted">
              {appDownload.version && (
                <div className="flex gap-1.5">
                  <dt>آخر إصدار:</dt>
                  <dd className="text-on-dark">v{appDownload.version}</dd>
                </div>
              )}
              {appDownload.releaseDate && (
                <div className="flex gap-1.5">
                  <dt>متاح للتحميل من:</dt>
                  <dd className="text-on-dark">{appDownload.releaseDate}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}

function DownloadCta() {
  if (appDownload.playStoreUrl) {
    return (
      <a
        href={appDownload.playStoreUrl}
        className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
      >
        <DownloadIcon className="h-4 w-4" />
        تحميل من Google Play
      </a>
    );
  }
  if (appDownload.apkUrl) {
    return (
      <a
        href={appDownload.apkUrl}
        className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
      >
        <DownloadIcon className="h-4 w-4" />
        تحميل ملف APK
      </a>
    );
  }
  return (
    <span className="inline-flex items-center justify-center gap-2 rounded-sm border border-ink-line px-6 py-3.5 text-sm font-semibold text-on-dark-muted">
      رابط التحميل هيتوفر قريبًا
    </span>
  );
}
