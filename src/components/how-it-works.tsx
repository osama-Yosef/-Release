import { SectionHeading } from "@/components/section-heading";
import { SearchIcon, IronIcon, DownloadIcon, WrenchIcon } from "@/components/icons";

const STEPS = [
  { icon: SearchIcon, title: "دور على المنتج", body: "استخدم البحث أو تصفح التصنيفات لحد ما تلاقي اللي محتاجه." },
  { icon: IronIcon, title: "شوف التفاصيل", body: "الصور والمواصفات والسعر والتوافر كله قدامك قبل ما تقرر." },
  { icon: DownloadIcon, title: "اطلب من التطبيق", body: "حمّل تطبيق مكوجي وكمّل طلبك من على موبايلك في دقائق." },
  { icon: WrenchIcon, title: "تابع الصيانة لو محتاج", body: "لو عندك جهاز محتاج صيانة، اطلب الخدمة من نفس التطبيق." },
];

export function HowItWorks() {
  return (
    <section className="bg-ink-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="خطوة بخطوة" title="إزاي تطلب من مكوجي" align="center" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative rounded-[var(--radius-card)] border border-ink-line/70 bg-ink-900 p-6">
              <span className="font-tech text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
              <step.icon className="mt-3 h-8 w-8 text-teal" />
              <h3 className="mt-4 font-semibold text-on-dark">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
