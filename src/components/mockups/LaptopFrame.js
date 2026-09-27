import React, { useId } from "react";

// Laptop drawn in SVG: black-bezel lid, aluminium deck. The screen is 1000×650
// (≈ 1.54:1, the ratio of the web app captures); wider captures are cropped from the top.
function LaptopFrame({ src, label }) {
  const uid = "lp" + useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg className="mk-laptop" viewBox="-60 0 1180 770" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${uid}-al`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3e4e8" />
          <stop offset=".55" stopColor="#c3c5cb" />
          <stop offset="1" stopColor="#8e9097" />
        </linearGradient>
        <linearGradient id={`${uid}-lid`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5a5c62" />
          <stop offset=".5" stopColor="#9a9ca3" />
          <stop offset="1" stopColor="#5a5c62" />
        </linearGradient>
        <linearGradient id={`${uid}-gl`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".12" />
          <stop offset=".36" stopColor="#fff" stopOpacity=".03" />
          <stop offset=".361" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <rect x="30" y="30" width="1000" height="650" rx="4" />
        </clipPath>
      </defs>
      <ellipse cx="530" cy="752" rx="560" ry="14" fill="#000" opacity=".4" />
      {/* lid */}
      <rect x="0" y="0" width="1060" height="712" rx="30" fill={`url(#${uid}-lid)`} />
      <rect x="3" y="3" width="1054" height="709" rx="27" fill="#0b0b0d" />
      <circle cx="530" cy="16" r="4" fill="#1c212b" />
      <rect x="30" y="30" width="1000" height="650" rx="4" fill="#fff" />
      <g clipPath={`url(#${uid}-clip)`}>
        <image className="mk-screen" href={src} x="30" y="30" width="1000" height="650" preserveAspectRatio="xMidYMin slice" />
      </g>
      <rect x="30" y="30" width="1000" height="650" rx="4" fill={`url(#${uid}-gl)`} />
      {/* deck */}
      <path d="M-50 712 H1110 L1102 736 Q1098 744 1086 744 H-26 Q-38 744 -42 736 Z" fill={`url(#${uid}-al)`} />
      <path d="M-50 712 H1110" stroke="#f4f5f7" strokeWidth="2" />
      <path d="M452 712 H608 V718 Q608 722 602 722 H458 Q452 722 452 718 Z" fill="#9a9ca3" />
    </svg>
  );
}

export default LaptopFrame;
