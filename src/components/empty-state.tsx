import { AlertIcon } from "@/components/icons";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-ink-line/60 bg-ink-900/60 px-6 py-16 text-center">
      <AlertIcon className="h-8 w-8 text-on-dark-muted" />
      <p className="text-on-dark-muted">{message}</p>
    </div>
  );
}

export function ErrorState({
  message = "تعذر تحميل المنتجات حاليًا.",
  retryHref,
}: {
  message?: string;
  retryHref?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-ink-line/60 bg-ink-900/60 px-6 py-16 text-center">
      <AlertIcon className="h-8 w-8 text-gold" />
      <p className="text-on-dark-muted">{message}</p>
      {retryHref && (
        <a
          href={retryHref}
          className="rounded-sm bg-teal-600 px-4 py-2 text-sm font-medium text-paper transition hover:bg-teal-700"
        >
          إعادة المحاولة
        </a>
      )}
    </div>
  );
}
