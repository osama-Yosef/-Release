import Link from "next/link";
import { WrenchIcon, CheckIcon } from "@/components/icons";

const POINTS = ["تشخيص الأعطال", "تغيير قطع الغيار الأصلية", "متابعة حالة الطلب داخل التطبيق"];

export function MaintenanceSection() {
  return (
    <section className="bg-ink-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 rounded-[var(--radius-card)] border border-ink-line/70 bg-ink-900 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
              <WrenchIcon className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-on-dark">محتاج صيانة لجهازك؟</h2>
              <p className="mt-2 max-w-lg text-on-dark-muted leading-relaxed">
                لو عندك مكواة أو جهاز بخار محتاج صيانة، اطلب الخدمة مباشرة من تطبيق مكوجي وتابع حالة الطلب أول
                بأول.
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {POINTS.map((point) => (
                  <li key={point} className="flex items-center gap-1.5 text-sm text-on-dark-muted">
                    <CheckIcon className="h-4 w-4 text-teal" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href="/app"
            className="w-full shrink-0 rounded-sm border border-teal px-5 py-3 text-center text-sm font-semibold text-teal transition hover:bg-teal hover:text-ink-950 lg:w-auto"
          >
            اطلب صيانة من التطبيق
          </Link>
        </div>
      </div>
    </section>
  );
}
