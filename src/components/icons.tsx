type IconProps = { className?: string };

/** Small hand-drawn line-icon set — kept intentionally narrow so every icon
 * on the site shares the same stroke weight and corner rhythm. */

export function IronIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 34c0-9 6-17 16-17h10a6 6 0 0 1 6 6v3c0 5.5-4.5 10-10 10H12a4 4 0 0 1-4-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M18 17v-4a3 3 0 0 1 3-3h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="34" cy="27" r="1.6" fill="currentColor" />
      <path d="M12 34h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function SteamIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 10c2 2-2 4 0 6M24 8c2 2-2 4 0 6M32 10c2 2-2 4 0 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 34c0-7 5.5-13 14-13h6a5 5 0 0 1 5 5v2c0 4.4-3.6 8-8 8H14a4 4 0 0 1-4-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3v12m0 0 4.5-4.5M12 15 7.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 17v2a2.5 2.5 0 0 0 2.5 2.5h10a2.5 2.5 0 0 0 2.5-2.5v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WrenchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14.7 6.3a4 4 0 0 0-5.4 4.8L4 16.4V20h3.6l5.3-5.3a4 4 0 0 0 4.8-5.4l-2.8 2.8-2-2 2.8-2.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.4 8.6c.3-.6.6-.6.9-.6h.6c.2 0 .5 0 .7.5.2.6.7 1.8.8 2 .1.2.1.4 0 .6-.1.2-.2.3-.4.5-.2.2-.4.4-.2.7.2.4 1 1.5 2.1 2.4 1.4 1.2 2 1.3 2.3 1.2.3-.1.7-.8.9-1 .2-.2.4-.2.6-.1.2.1 1.6.7 1.9.9.3.1.5.2.5.4.1.4 0 1.2-.3 1.6-.5.6-1.6 1-2.4 1-2.4 0-5.6-2.4-6.4-3.1C8.1 14.8 6.5 12.7 6.5 10.3c0-.8.4-1.2.5-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.5 4h2.3l1.2 3.6-1.8 1.5a11 11 0 0 0 5.7 5.7l1.5-1.8 3.6 1.2v2.3c0 1.1-.9 2-2 1.9-6.5-.4-11.6-5.5-12-12-.1-1.1.8-2 1.9-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AlertIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4 2 20h20L12 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 10v4.5M12 17.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
