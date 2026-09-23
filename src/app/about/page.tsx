import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { SearchIcon, IronIcon, WrenchIcon, DownloadIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "عن مكوجي",
  description: "مكوجي معرض لمكاوي البخار وأجهزة البخار وقطع الغيار والإكسسوارات، مع تطبيق للطلب ومتابعة الصيانة.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: IronIcon, title: "منتجات أصلية", body: "كل جهاز بمواصفاته الحقيقية وسعره الظاهر — من غير مفاجآت." },
  { icon: SearchIcon, title: "سهولة الوصول", body: "دور، شوف التفاصيل، واطلب في خطوات بسيطة من التطبيق." },
  { icon: WrenchIcon, title: "خدمة بعد البيع", body: "لو جهازك محتاج صيانة، اطلب الخدمة من نفس التطبيق وتابع حالتها." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="عن مكوجي" title="مكوجي — مكاوي البخار ومنتجاتها" />
      <p className="mt-6 max-w-2xl leading-relaxed text-on-dark-muted">
        مكوجي معرض متخصص في مكاوي البخار وأجهزة البخار وقطع الغيار والإكسسوارات المرتبطة بيها. الموقع ده
        بيعرّفك على المنتجات المتاحة عندنا — الصور، المواصفات، الأسعار، والتوافر — أما الطلب والدفع ومتابعة
        الشحن والصيانة فبيتم كله من خلال تطبيق مكوجي.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-[var(--radius-card)] border border-ink-line/70 bg-ink-900 p-6">
            <v.icon className="h-7 w-7 text-teal" />
            <h3 className="mt-3 font-semibold text-on-dark">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/app"
          className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-600"
        >
          <DownloadIcon className="h-4 w-4" />
          تحميل تطبيق مكوجي
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-sm border border-ink-line px-5 py-3 text-sm font-semibold text-on-dark hover:border-teal hover:text-teal"
        >
          استكشف المنتجات
        </Link>
      </div>
    </div>
  );
}
