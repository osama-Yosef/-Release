/**
 * Art-directed studio composition (spotlight + pedestal + line-drawn iron),
 * not a claimed product photograph — see spec §2/§27: no fabricated "real"
 * imagery, and no generic 3D-sphere/laptop hero either. Once real showroom
 * photography exists, swap this for an <Image> in the same slot in hero.tsx.
 */
export function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
      <svg viewBox="0 0 600 600" className="h-full w-full" role="img" aria-label="تصوير تعريفي لمكواة بخار مكوجي داخل معرض">
        <defs>
          <radialGradient id="spot" cx="50%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#e4b83f" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#67a9b2" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0a1216" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pedestal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f2e35" />
            <stop offset="100%" stopColor="#0a1216" />
          </linearGradient>
          <linearGradient id="ironBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a5c6c" />
            <stop offset="45%" stopColor="#244a61" />
            <stop offset="100%" stopColor="#122631" />
          </linearGradient>
          <linearGradient id="ironSole" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e4b83f" />
            <stop offset="100%" stopColor="#a87f22" />
          </linearGradient>
        </defs>

        <circle cx="300" cy="260" r="260" fill="url(#spot)" />

        {/* pedestal */}
        <ellipse cx="300" cy="470" rx="190" ry="18" fill="#000" opacity="0.35" />
        <path d="M120 470 L160 380 H440 L480 470 Z" fill="url(#pedestal)" stroke="#2c414a" strokeWidth="1.5" />
        <rect x="150" y="372" width="300" height="10" rx="2" fill="#2c414a" />

        {/* iron body */}
        <g transform="translate(150,150)">
          <path
            d="M20 190C20 130 70 80 160 80H230C260 80 280 100 280 130V150C280 195 245 230 200 230H50C33 230 20 213 20 196Z"
            fill="url(#ironBody)"
            stroke="#67a9b2"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <path d="M60 230 L245 230 L255 245 L50 245 Z" fill="url(#ironSole)" />
          <path d="M120 80 V45C120 32 130 22 143 22H165" stroke="#9db3ba" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="150" y="6" width="60" height="20" rx="10" fill="#172329" stroke="#67a9b2" strokeOpacity="0.4" />
          <circle cx="235" cy="160" r="5" fill="#e4b83f" />
          <circle cx="235" cy="180" r="5" fill="#e4b83f" opacity="0.6" />

          {/* steam */}
          <g className="mokoji-steam" stroke="#f4f9fa" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M100 20c8 8-8 16 0 24" />
            <path d="M130 6c8 8-8 16 0 24" />
            <path d="M160 -6c8 8-8 16 0 24" transform="translate(0,20)" />
          </g>
        </g>
      </svg>

      <style>{`
        @keyframes mokoji-rise {
          0% { transform: translateY(6px); opacity: 0.35; }
          50% { transform: translateY(-4px); opacity: 0.85; }
          100% { transform: translateY(6px); opacity: 0.35; }
        }
        .mokoji-steam path {
          animation: mokoji-rise 3.2s ease-in-out infinite;
          transform-origin: center;
        }
        .mokoji-steam path:nth-child(2) { animation-delay: 0.6s; }
        .mokoji-steam path:nth-child(3) { animation-delay: 1.2s; }
        @media (prefers-reduced-motion: reduce) {
          .mokoji-steam path { animation: none; }
        }
      `}</style>
    </div>
  );
}
