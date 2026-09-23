const formatter = new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 });

export function Price({ value, className }: { value: number; className?: string }) {
  return (
    <span className={`font-tech tabular-nums ${className ?? ""}`}>
      {formatter.format(value)}
      <span className="text-[0.7em] opacity-70"> ج.م</span>
    </span>
  );
}

/** Styled for use on the light "paper" product surfaces (cards, buy box). */
export function AvailabilityBadge({ available }: { available: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-2 py-0.5 text-xs font-tech ${
        available ? "bg-teal-700/10 text-teal-700" : "bg-black/5 text-on-light-muted"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${available ? "bg-teal-700" : "bg-on-light-muted"}`} />
      {available ? "متوفر" : "غير متوفر حاليًا"}
    </span>
  );
}

/** Same as AvailabilityBadge but styled for the dark "ink" surfaces. */
export function AvailabilityBadgeOnDark({ available }: { available: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 py-1 text-xs font-tech ${
        available ? "bg-teal-600/20 text-teal" : "bg-ink-600/40 text-on-dark-muted"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${available ? "bg-teal" : "bg-on-dark-muted"}`} />
      {available ? "متوفر" : "غير متوفر حاليًا"}
    </span>
  );
}
