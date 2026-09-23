import type { Metadata } from "next";
import { contact } from "@/lib/config/site";
import { SectionHeading } from "@/components/section-heading";
import { PhoneIcon, WhatsappIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "طرق التواصل مع فريق مكوجي.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const hasAnyChannel = contact.phone || contact.whatsapp || contact.email;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="تواصل معنا" title="ابقَ على تواصل" />

      <p className="mt-6 leading-relaxed text-on-dark-muted">
        لو عندك سؤال عن منتج أو التطبيق، أو محتاج مساعدة في طلب أو صيانة، تقدر تتواصل معانا من خلال:
      </p>

      {hasAnyChannel ? (
        <div className="mt-8 flex flex-col gap-4">
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-3 rounded-[var(--radius-card)] border border-ink-line/70 bg-ink-900 p-4 transition hover:border-teal"
            >
              <PhoneIcon className="h-5 w-5 text-teal" />
              <div>
                <p className="text-sm font-semibold text-on-dark">اتصل بنا</p>
                <p className="font-tech text-sm text-on-dark-muted" dir="ltr">
                  {contact.phone}
                </p>
              </div>
            </a>
          )}
          {contact.whatsapp && (
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-3 rounded-[var(--radius-card)] border border-ink-line/70 bg-ink-900 p-4 transition hover:border-teal"
            >
              <WhatsappIcon className="h-5 w-5 text-teal" />
              <div>
                <p className="text-sm font-semibold text-on-dark">واتساب</p>
                <p className="font-tech text-sm text-on-dark-muted" dir="ltr">
                  {contact.whatsapp}
                </p>
              </div>
            </a>
          )}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 rounded-[var(--radius-card)] border border-ink-line/70 bg-ink-900 p-4 transition hover:border-teal"
            >
              <div>
                <p className="text-sm font-semibold text-on-dark">البريد الإلكتروني</p>
                <p className="font-tech text-sm text-on-dark-muted" dir="ltr">
                  {contact.email}
                </p>
              </div>
            </a>
          )}
        </div>
      ) : (
        <p className="mt-8 rounded-[var(--radius-card)] border border-ink-line/70 bg-ink-900 p-4 text-sm text-on-dark-muted">
          بيانات التواصل هتتوفر هنا قريبًا. في الوقت الحالي، تقدر تطلب صيانة أو تتابع طلبك من داخل تطبيق مكوجي.
        </p>
      )}
    </div>
  );
}
