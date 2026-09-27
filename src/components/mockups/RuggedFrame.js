import React, { useId } from "react";

// Rugged handheld scanner (the device the iPAK app runs on), drawn in SVG.
// Both views share a 320×640 body. The front screen is 244×477 (≈ 0.51, the captures' ratio).

const useUid = (p) => p + useId().replace(/[^a-zA-Z0-9]/g, "");

function Body({ uid }) {
  return (
    <>
      <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#2a2a2d" />
        <stop offset=".08" stopColor="#4a4a4f" />
        <stop offset=".5" stopColor="#333337" />
        <stop offset=".92" stopColor="#4a4a4f" />
        <stop offset="1" stopColor="#2a2a2d" />
      </linearGradient>
      <linearGradient id={`${uid}-shell`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#232326" />
        <stop offset="1" stopColor="#18181a" />
      </linearGradient>
    </>
  );
}

export function RuggedFront({ src, label }) {
  const uid = useUid("rf");
  return (
    <svg className="mk-rugged" viewBox="-6 0 332 640" role="img" aria-label={label}>
      <defs>
        <Body uid={uid} />
        <clipPath id={`${uid}-clip`}>
          <rect x="38" y="58" width="244" height="477" rx="3" />
        </clipPath>
        <linearGradient id={`${uid}-gl`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".14" />
          <stop offset=".4" stopColor="#fff" stopOpacity=".03" />
          <stop offset=".401" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* side keys: volume, scan triggers (yellow), power */}
      <rect x="-5" y="128" width="8" height="46" rx="3" fill="#2f2f33" />
      <rect x="-5" y="226" width="8" height="58" rx="3" fill="#c9a227" />
      <rect x="317" y="226" width="8" height="58" rx="3" fill="#c9a227" />
      <rect x="317" y="150" width="8" height="40" rx="3" fill="#2f2f33" />
      {/* rubber rim and shell */}
      <rect width="320" height="640" rx="46" fill={`url(#${uid}-rim)`} />
      <rect x="7" y="7" width="306" height="626" rx="40" fill={`url(#${uid}-shell)`} />
      {/* glass */}
      <rect x="24" y="20" width="272" height="600" rx="28" fill="#0c0c0e" />
      <rect x="120" y="30" width="80" height="6" rx="3" fill="#232327" />
      <circle cx="232" cy="33" r="3.2" fill="#1f2530" />
      <circle cx="245" cy="33" r="3.2" fill="#1f2530" />
      <g clipPath={`url(#${uid}-clip)`}>
        <rect x="38" y="58" width="244" height="477" fill="#fff" />
        <image href={src} x="38" y="58" width="244" height="477" preserveAspectRatio="xMidYMin slice" />
      </g>
      <ellipse cx="160" cy="600" rx="7" ry="3" fill="#232327" />
      <rect x="24" y="20" width="272" height="600" rx="28" fill={`url(#${uid}-gl)`} />
    </svg>
  );
}

export function RuggedBack({ label }) {
  const uid = useUid("rb");
  return (
    <svg className="mk-rugged" viewBox="-6 0 332 640" role="img" aria-label={label}>
      <defs>
        <Body uid={uid} />
        <radialGradient id={`${uid}-lens`} cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#4a5c7a" />
          <stop offset=".5" stopColor="#1b2231" />
          <stop offset="1" stopColor="#07090d" />
        </radialGradient>
      </defs>
      <rect x="-5" y="226" width="8" height="58" rx="3" fill="#c9a227" />
      <rect x="317" y="226" width="8" height="58" rx="3" fill="#c9a227" />
      <rect width="320" height="640" rx="46" fill={`url(#${uid}-rim)`} />
      <rect x="7" y="7" width="306" height="626" rx="40" fill={`url(#${uid}-shell)`} />
      {/* scanner head with laser warning label */}
      <path d="M86 7 H234 L226 58 Q224 66 216 66 H104 Q96 66 94 58 Z" fill="#141416" />
      <rect x="106" y="16" width="108" height="38" rx="7" fill="#101012" stroke="#d4b12a" strokeWidth="2.4" />
      <path d="M122 44 L131 28 L140 44 Z" fill="none" stroke="#d4b12a" strokeWidth="2" strokeLinejoin="round" />
      <path d="M131 34 V39" stroke="#d4b12a" strokeWidth="1.8" strokeLinecap="round" />
      <g fill="#d4b12a" opacity=".7">
        <rect x="148" y="26" width="54" height="2.4" rx="1" />
        <rect x="148" y="32" width="46" height="2.4" rx="1" />
        <rect x="148" y="38" width="50" height="2.4" rx="1" />
      </g>
      {/* camera, flash, NFC */}
      <rect x="130" y="88" width="48" height="48" rx="13" fill="#0b0b0c" stroke="#38383d" strokeWidth="2" />
      <circle cx="154" cy="112" r="14" fill={`url(#${uid}-lens)`} />
      <circle cx="149" cy="106" r="3.5" fill="#fff" opacity=".25" />
      <circle cx="206" cy="108" r="7" fill="#f2efd6" />
      <rect x="146" y="150" width="16" height="16" rx="3" fill="none" stroke="#56565c" strokeWidth="1.8" />
      <path d="M150 162 V154 L158 162 V154" fill="none" stroke="#56565c" strokeWidth="1.6" strokeLinejoin="round" />
      {/* connector band: latches, pogo pins, screws */}
      <rect x="7" y="178" width="306" height="64" fill="#1c1c1f" />
      <rect x="30" y="190" width="34" height="40" rx="8" fill="#e8772e" />
      <rect x="256" y="190" width="34" height="40" rx="8" fill="#e8772e" />
      <g stroke="#b55516" strokeWidth="2" strokeLinecap="round">
        <path d="M38 202 H56 M38 210 H56 M38 218 H56" />
        <path d="M264 202 H282 M264 210 H282 M264 218 H282" />
      </g>
      <rect x="112" y="198" width="96" height="24" rx="12" fill="#0e0e10" />
      <g fill="#d4a52a">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <React.Fragment key={i}>
            <circle cx={128 + i * 13} cy="206" r="2.4" />
            <circle cx={128 + i * 13} cy="214" r="2.4" />
          </React.Fragment>
        ))}
      </g>
      <circle cx="300" cy="186" r="4" fill="#2c2c30" />
      <circle cx="300" cy="234" r="4" fill="#2c2c30" />
      {/* battery cover with regulatory marks */}
      <rect x="22" y="252" width="276" height="306" rx="16" fill="#26262a" />
      <path d="M22 262 Q22 252 32 252" fill="none" stroke="#3a3a3f" strokeWidth="1.5" />
      <g fill="#3d3d42">
        <rect x="96" y="508" width="128" height="3" rx="1.5" />
        <rect x="108" y="516" width="104" height="3" rx="1.5" />
        <rect x="118" y="528" width="84" height="8" rx="2" />
      </g>
      {/* bottom bumper */}
      <path d="M102 578 H218 L228 626 Q229 633 222 633 H98 Q91 633 92 626 Z" fill="#141416" />
      <circle cx="160" cy="606" r="6" fill="#050506" />
    </svg>
  );
}
