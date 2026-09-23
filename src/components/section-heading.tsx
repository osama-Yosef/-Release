export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
  align?: "start" | "center";
}) {
  const muted = tone === "dark" ? "text-on-dark-muted" : "text-on-light-muted";
  const strong = tone === "dark" ? "text-on-dark" : "text-on-light";

  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="font-tech text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      )}
      <h2 className={`mt-2 text-2xl font-bold sm:text-3xl ${strong}`}>{title}</h2>
      {description && <p className={`mt-3 text-base leading-relaxed ${muted}`}>{description}</p>}
    </div>
  );
}
