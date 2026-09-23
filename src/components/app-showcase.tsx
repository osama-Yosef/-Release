import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { SearchIcon, IronIcon, DownloadIcon, WrenchIcon, CheckIcon } from "@/components/icons";

const FEATURES = [
  { icon: SearchIcon, label: "تصفح المنتجات" },
  { icon: IronIcon, label: "تفاصيل ومواصفات كل جهاز" },
  { icon: CheckIcon, label: "إدارة السلة والطلبات" },
  { icon: WrenchIcon, label: "طلب صيانة عند الحاجة" },
];

export function AppShowcase() {
  return (
    <section className="bg-ink-900 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative mx-auto w-full max-w-[280px]">
          <div className="metal-sheen relative rounded-[2.5rem] border-4 border-ink-700 bg-ink-950 p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
            <div className="flex h-[520px] flex-col items-center justify-center rounded-[1.8rem] bg-gradient-to-b from-paper to-paper-dim">
              <Image src="/brand/mokoji_logo.png" alt="مكوجي" width={140} height={80} className="h-auto w-32" />
              <p className="mt-3 text-xs font-medium text-on-light-muted">مكاوي البخار — منتجات وصيانة</p>
            </div>
            <div className="absolute right-1/2 top-3 h-1.5 w-16 translate-x-1/2 rounded-full bg-ink-700" />
          </div>

          <div className="absolute -right-6 top-10 hidden rounded-sm border border-ink-line bg-ink-800 px-3 py-2 text-xs font-medium text-teal shadow-lg sm:flex sm:items-center sm:gap-2">
            <SearchIcon className="h-4 w-4" /> بحث فوري
          </div>
          <div className="absolute -left-8 bottom-16 hidden rounded-sm border border-ink-line bg-ink-800 px-3 py-2 text-xs font-medium text-gold shadow-lg sm:flex sm:items-center sm:gap-2">
            <WrenchIcon className="h-4 w-4" /> طلب صيانة
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="تطبيق مكوجي" title="المعرض في إيدك" />
          <p className="mt-4 max-w-md text-on-dark-muted leading-relaxed">
            من خلال تطبيق مكوجي تقدر تتصفح المنتجات، تشوف تفاصيلها، تطلب اللي محتاجه، تتابع طلباتك، وتطلب
            صيانة لو محتاج — كل ده من موبايلك.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f.label} className="flex items-center gap-2 text-sm text-on-dark">
                <f.icon className="h-5 w-5 shrink-0 text-teal" />
                {f.label}
              </li>
            ))}
          </ul>
          <Link
            href="/app"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
          >
            <DownloadIcon className="h-4 w-4" />
            تحميل تطبيق مكوجي
          </Link>
        </div>
      </div>
    </section>
  );
}
