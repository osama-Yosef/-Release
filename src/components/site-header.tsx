"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, CloseIcon } from "@/components/icons";

const NAV = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/about", label: "عن مكوجي" },
  { href: "/app", label: "التطبيق" },
  { href: "/contact", label: "تواصل معنا" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line/70 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Image src="/brand/mokoji_mark.png" alt="" width={32} height={32} className="h-8 w-8" priority />
          <span className="text-lg font-bold text-on-dark">مكوجي</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-gold" : "text-on-dark-muted hover:text-on-dark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 md:block">
          <Link
            href="/app"
            className="rounded-sm bg-gold px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
          >
            تحميل التطبيق
          </Link>
        </div>

        <button
          type="button"
          className="text-on-dark md:hidden"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink-line/70 bg-ink-950 px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-sm px-3 py-2.5 text-sm font-medium ${
                    pathname === item.href ? "text-gold" : "text-on-dark-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/app"
                onClick={() => setOpen(false)}
                className="block rounded-sm bg-gold px-3 py-2.5 text-center text-sm font-semibold text-ink-950"
              >
                تحميل التطبيق
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
