/**
 * トップページのイラスト。
 * 実家と大きな木、手をつないで歩く親子で「次の世代へ、想いをつなぐ」を表す。
 * 色はサイトの配色(pine / terracotta / cream)に合わせている。
 */
export default function HeroIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 480 360"
      className={className}
      role="img"
      aria-label="実家の前を、手をつないで歩く親子のイラスト"
    >
      {/* 空 */}
      <rect x="0" y="0" width="480" height="360" rx="28" fill="#F3ECDF" />
      <circle cx="380" cy="82" r="36" fill="#EDBE97" opacity="0.8" />
      <circle cx="380" cy="82" r="52" fill="#EDBE97" opacity="0.18" />

      {/* 雲 */}
      <g fill="#FBF8F2">
        <ellipse cx="110" cy="72" rx="42" ry="14" />
        <ellipse cx="134" cy="62" rx="26" ry="14" />
        <ellipse cx="270" cy="48" rx="30" ry="10" />
        <ellipse cx="288" cy="41" rx="18" ry="10" />
      </g>

      {/* 鳥 */}
      <g fill="none" stroke="#3F5D52" strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <path d="M196 92 q6 -6 12 0 q6 -6 12 0" />
        <path d="M226 110 q4 -4 8 0 q4 -4 8 0" />
      </g>

      {/* 丘 */}
      <path d="M0 238 C 90 196, 190 206, 280 222 S 430 212, 480 196 L 480 360 L 0 360 Z" fill="#CBD6C4" />
      <path d="M0 278 C 110 246, 230 250, 330 268 S 450 262, 480 252 L 480 360 L 0 360 Z" fill="#A9BFA6" />

      {/* 大きな木 */}
      <rect x="352" y="196" width="12" height="62" rx="4" fill="#8B6B4E" />
      <circle cx="358" cy="178" r="40" fill="#3F5D52" />
      <circle cx="332" cy="196" r="26" fill="#557566" />
      <circle cx="386" cy="192" r="28" fill="#557566" />
      <circle cx="362" cy="152" r="22" fill="#6E8F7A" />
      {/* 木の実 */}
      <g fill="#C1694F">
        <circle cx="340" cy="170" r="3.5" />
        <circle cx="372" cy="186" r="3.5" />
        <circle cx="356" cy="202" r="3.5" />
        <circle cx="384" cy="166" r="3.5" />
      </g>

      {/* 実家 */}
      <rect x="236" y="120" width="12" height="26" fill="#A2543D" />
      <rect x="150" y="168" width="118" height="84" rx="3" fill="#FBF8F2" stroke="#3F5D52" strokeWidth="2.5" />
      <path d="M138 172 L 209 118 L 280 172 Z" fill="#C1694F" stroke="#A2543D" strokeWidth="2.5" strokeLinejoin="round" />
      {/* 窓 */}
      <g fill="#F6D9A8" stroke="#3F5D52" strokeWidth="2">
        <rect x="166" y="186" width="28" height="24" rx="2" />
        <rect x="226" y="186" width="28" height="24" rx="2" />
      </g>
      <g stroke="#3F5D52" strokeWidth="1.5">
        <line x1="180" y1="186" x2="180" y2="210" />
        <line x1="240" y1="186" x2="240" y2="210" />
      </g>
      {/* 玄関 */}
      <rect x="198" y="212" width="22" height="40" rx="2" fill="#A2543D" />
      <circle cx="215" cy="233" r="1.8" fill="#F6D9A8" />

      {/* 小道 */}
      <path d="M198 252 L 220 252 C 232 290, 250 318, 262 360 L 150 360 C 170 318, 190 290, 198 252 Z" fill="#EBE2D0" />

      {/* 花 */}
      <g>
        <circle cx="120" cy="286" r="4" fill="#C1694F" />
        <circle cx="136" cy="298" r="3.5" fill="#EDBE97" />
        <circle cx="96" cy="300" r="3.5" fill="#FBF8F2" />
        <circle cx="300" cy="300" r="4" fill="#EDBE97" />
        <circle cx="318" cy="290" r="3.5" fill="#C1694F" />
        <circle cx="420" cy="296" r="4" fill="#FBF8F2" />
        <circle cx="60" cy="276" r="3.5" fill="#EDBE97" />
      </g>

      {/* 親(杖をついた高齢の親) */}
      <g>
        <line x1="166" y1="296" x2="160" y2="336" stroke="#8B6B4E" strokeWidth="3" strokeLinecap="round" />
        <rect x="172" y="276" width="26" height="46" rx="12" fill="#557566" />
        <rect x="175" y="318" width="8" height="18" rx="4" fill="#3A332C" />
        <rect x="187" y="318" width="8" height="18" rx="4" fill="#3A332C" />
        <circle cx="185" cy="264" r="12" fill="#F1D3B8" />
        <path d="M173 262 a12 12 0 0 1 24 0 q-4 -6 -12 -6 q-8 0 -12 6 z" fill="#D9D2C5" />
        <line x1="174" y1="290" x2="166" y2="298" stroke="#557566" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* 子(親の手を引く) */}
      <g>
        <rect x="226" y="268" width="26" height="54" rx="12" fill="#C1694F" />
        <rect x="229" y="318" width="8" height="20" rx="4" fill="#3A332C" />
        <rect x="241" y="318" width="8" height="20" rx="4" fill="#3A332C" />
        <circle cx="239" cy="254" r="12" fill="#F1D3B8" />
        <path d="M227 252 a12 12 0 0 1 24 0 q-6 -4 -12 -4 q-6 0 -12 4 z" fill="#3A332C" />
      </g>

      {/* つないだ手 */}
      <path d="M196 290 Q 212 300, 228 288" fill="none" stroke="#F1D3B8" strokeWidth="6" strokeLinecap="round" />

      {/* ふたりの上のハート */}
      <path
        d="M290 226 c -5 -7 -15 -3 -13 4 c 2 6 13 12 13 12 c 0 0 11 -6 13 -12 c 2 -7 -8 -11 -13 -4 z"
        fill="#C1694F"
        opacity="0.9"
      />
    </svg>
  );
}
