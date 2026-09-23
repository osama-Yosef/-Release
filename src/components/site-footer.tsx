import Image from "next/image";
import Link from "next/link";
import { contact, siteConfig } from "@/lib/config/site";
import { PhoneIcon, WhatsappIcon } from "@/components/icons";

const columns = [
  {
    title: "الموقع",
    links: [
      { href: "/", label: "الرئيسية" },
      { href: "/products", label: "المنتجات" },
      { href: "/about", label: "عن مكوجي" },
    ],
  },
  {
    title: "التطبيق",
    links: [
      { href: "/app", label: "تحميل التطبيق" },
      { href: "/contact", label: "طلب صيانة" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { href: "/privacy", label: "سياسة الخصوصية" },
      { href: "/terms", label: "الشروط والأحكام" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-line/70 bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/brand/mokoji_mark.png" alt="" width={28} height={28} className="h-7 w-7" />
              <span className="text-lg font-bold">مكوجي</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-dark-muted">
              معرض مكاوي البخار والمنتجات المتعلقة بيها. تصفح المنتجات هنا واطلب من تطبيق مكوجي.
            </p>
            {(contact.phone || contact.whatsapp) && (
              <div className="mt-4 flex flex-col gap-2 text-sm">
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-on-dark-muted hover:text-on-dark">
                    <PhoneIcon className="h-4 w-4" /> {contact.phone}
                  </a>
                )}
                {contact.whatsapp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    className="flex items-center gap-2 text-on-dark-muted hover:text-on-dark"
                  >
                    <WhatsappIcon className="h-4 w-4" /> واتساب
                  </a>
                )}
              </div>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-on-dark">{col.title}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-on-dark-muted hover:text-on-dark">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink-line/70 pt-6 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. جميع الحقوق محفوظة.</p>
          <p>هذا الموقع للتعريف بالمنتجات — إتمام الطلب والمتابعة عن طريق تطبيق مكوجي.</p>
        </div>
      </div>
    </footer>
  );
}
