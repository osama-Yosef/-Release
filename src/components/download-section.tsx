import Link from "next/link";
import { appDownload, siteConfig } from "@/lib/config/site";
import { AppQrCode } from "@/components/qr-code";
import { DownloadIcon } from "@/components/icons";

export function DownloadSection() {
  const qrTarget = `${siteConfig.url}/app`;

  return (
    <section className="metal-sheen bg-ink-900 py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        <p className="font-tech text-xs font-semibold uppercase tracking-[0.25em] text-gold">حمّل التطبيق</p>
        <h2 className="max-w-xl text-2xl font-bold text-on-dark sm:text-3xl">المعرض في إيدك، في أي وقت</h2>
        <p className="max-w-lg text-on-dark-muted leading-relaxed">
          امسح الكود بكاميرا موبايلك أو دوس تحميل التطبيق، وابدأ تتصفح وتطلب من مكوجي دلوقتي.
        </p>

        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <AppQrCode value={qrTarget} />
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
            >
              <DownloadIcon className="h-4 w-4" />
              تحميل تطبيق مكوجي
            </Link>
            {appDownload.version && (
              <span className="font-tech text-xs text-on-dark-muted">آخر إصدار: v{appDownload.version}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
