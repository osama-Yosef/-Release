import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="قانوني" title="سياسة الخصوصية" />
      <div className="mt-6 space-y-5 leading-relaxed text-on-dark-muted">
        <p>
          هذا الموقع مخصص لعرض منتجات مكوجي فقط — التصفح والبحث عن المنتجات لا يتطلب إنشاء حساب أو إدخال أي
          بيانات شخصية.
        </p>
        <p>
          عند استخدام خاصية البحث، لا يتم تخزين عبارات البحث بشكل دائم أو ربطها بهويتك؛ يُستخدم عنوان IP
          مؤقتًا فقط لمنع إساءة استخدام خاصية البحث (حد أقصى لعدد الطلبات في الدقيقة)، ولا يُحتفظ به بعد ذلك.
        </p>
        <p>
          أي بيانات شخصية تخص الحساب أو الطلبات أو الدفع أو الصيانة — مثل الاسم أو رقم الهاتف أو العنوان —
          تُجمع وتُعالج فقط داخل تطبيق مكوجي نفسه، وليس من خلال هذا الموقع.
        </p>
        <p>لا يستخدم هذا الموقع ملفات تعريف ارتباط (cookies) للتتبع أو الإعلانات.</p>
      </div>
    </div>
  );
}
