import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="قانوني" title="الشروط والأحكام" />
      <div className="mt-6 space-y-5 leading-relaxed text-on-dark-muted">
        <p>
          هذا الموقع منصة تعريفية لعرض منتجات مكوجي — الأسعار والتوافر الظاهرين هنا مأخوذين من نفس بيانات
          تطبيق مكوجي، وقد يتغيران دون إشعار مسبق.
        </p>
        <p>لا يمكن إتمام أي عملية شراء أو دفع من خلال هذا الموقع مباشرة؛ الطلب والدفع يتمّان فقط من داخل تطبيق مكوجي.</p>
        <p>باستخدامك هذا الموقع، أنت توافق على استخدامه للأغراض التعريفية المشروعة فقط دون محاولة إساءة استخدام خاصية البحث أو الوصول غير المصرّح به لأي بيانات.</p>
      </div>
    </div>
  );
}
