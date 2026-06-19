export default function AstronautSVG() {
  return (
    <div className="astronaut-container" style={{ width: 120 }}>
      <svg
        viewBox="0 0 120 180"
        width="120"
        height="180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="visor-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="visor-reflection" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
          </linearGradient>
        </defs>

        <g>
          {/* Backpack */}
          <rect x="38" y="52" width="44" height="50" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
          <line x1="44" y1="60" x2="44" y2="94" stroke="#0F172A" strokeWidth="0.5" />
          <line x1="76" y1="60" x2="76" y2="94" stroke="#0F172A" strokeWidth="0.5" />
          <rect x="48" y="58" width="24" height="3" rx="1.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.4" />
          <rect x="48" y="64" width="24" height="3" rx="1.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.4" />

          {/* Torso */}
          <rect x="34" y="54" width="52" height="52" rx="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
          <rect x="44" y="62" width="32" height="20" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.6" />
          <line x1="48" y1="68" x2="62" y2="68" stroke="#0F172A" strokeWidth="0.5" />
          <line x1="48" y1="72" x2="58" y2="72" stroke="#0F172A" strokeWidth="0.5" />
          <line x1="48" y1="76" x2="72" y2="76" stroke="#0F172A" strokeWidth="0.5" />
          <circle cx="68" cy="68" r="1.5" fill="#0F172A" />
          <circle cx="72" cy="68" r="1.5" fill="#0F172A" />

          {/* Belt */}
          <rect x="36" y="100" width="48" height="8" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.7" />
          <rect x="55" y="101" width="10" height="6" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.5" />

          {/* Helmet */}
          <ellipse cx="60" cy="35" rx="24" ry="26" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.2" />
          {/* Visor */}
          <ellipse cx="60" cy="36" rx="18" ry="18" fill="url(#visor-grad)" stroke="#0F172A" strokeWidth="0.8" />
          <ellipse cx="60" cy="36" rx="18" ry="18" fill="url(#visor-reflection)" />
          <path d="M48 26 Q54 22 66 25" stroke="rgba(255,255,255,0.8)" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M36 40 Q36 55 60 55 Q84 55 84 40" stroke="#0F172A" strokeWidth="0.8" fill="none" />

          {/* Antenna */}
          <line x1="60" y1="9" x2="60" y2="16" stroke="#0F172A" strokeWidth="0.8" />
          <circle cx="60" cy="8" r="2.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.6" />
          <path d="M56 16 L60 13 L64 16" stroke="#0F172A" strokeWidth="0.6" fill="none" />

          {/* Left arm */}
          <path d="M34 62 Q20 58 10 68 Q6 74 12 80" stroke="#0F172A" strokeWidth="1" fill="#FFFFFF" strokeLinecap="round" />
          <ellipse cx="12" cy="81" rx="5" ry="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.8" />
          <path d="M24 62 Q18 64 14 72" stroke="#0F172A" strokeWidth="0.4" fill="none" />
          <circle cx="34" cy="62" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.6" />

          {/* Right arm */}
          <path d="M86 62 Q100 54 106 42 Q110 36 104 32" stroke="#0F172A" strokeWidth="1" fill="#FFFFFF" strokeLinecap="round" />
          <ellipse cx="103" cy="31" rx="5" ry="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.8" />
          <path d="M96 56 Q102 48 106 38" stroke="#0F172A" strokeWidth="0.4" fill="none" />
          <circle cx="86" cy="62" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.6" />

          {/* Left leg */}
          <path d="M46 106 Q40 126 36 142 Q34 150 38 156" stroke="#0F172A" strokeWidth="1" fill="#FFFFFF" strokeLinecap="round" />
          <path d="M38 156 Q34 160 30 162 Q28 164 32 166 Q38 168 42 164 Q44 160 40 156" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.8" />
          <circle cx="38" cy="140" r="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.5" />

          {/* Right leg */}
          <path d="M74 106 Q80 122 84 134 Q88 144 82 152" stroke="#0F172A" strokeWidth="1" fill="#FFFFFF" strokeLinecap="round" />
          <path d="M82 152 Q86 156 90 158 Q94 160 92 162 Q86 166 80 162 Q76 158 80 152" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.8" />
          <circle cx="83" cy="134" r="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.5" />

          {/* Hoses */}
          <path d="M48 50 Q42 48 40 52" stroke="#0F172A" strokeWidth="0.7" fill="none" />
          <path d="M72 50 Q78 48 80 52" stroke="#0F172A" strokeWidth="0.7" fill="none" />
        </g>
      </svg>
    </div>
  );
}
