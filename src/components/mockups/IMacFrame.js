import React, { useId } from "react";

// Aluminium all-in-one desktop, drawn in SVG. `.mk-power` is the "screen off" layer
// the entrance animation fades out; at rest it is invisible.
function IMacFrame({ src, label }) {
  const uid = "im" + useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg className="mk-imac-svg" viewBox="-10 0 1020 900" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${uid}-al`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6e7eb" />
          <stop offset="1" stopColor="#b6b8be" />
        </linearGradient>
        <linearGradient id={`${uid}-st`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9fa1a8" />
          <stop offset=".5" stopColor="#e2e3e7" />
          <stop offset="1" stopColor="#9a9ca3" />
        </linearGradient>
        <linearGradient id={`${uid}-gl`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".14" />
          <stop offset=".38" stopColor="#fff" stopOpacity=".03" />
          <stop offset=".381" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <rect x="22" y="22" width="956" height="578" rx="4" />
        </clipPath>
      </defs>
      <ellipse cx="500" cy="878" rx="270" ry="14" fill="#000" opacity=".35" />
      <path d="M404 718 H596 L630 866 H370 Z" fill={`url(#${uid}-st)`} />
      <rect x="340" y="860" width="320" height="13" rx="6" fill="#c7c9ce" />
      <path d="M0 622 H1000 V690 A30 30 0 0 1 970 720 H30 A30 30 0 0 1 0 690 Z" fill={`url(#${uid}-al)`} />
      <path d="M30 0 H970 A30 30 0 0 1 1000 30 V622 H0 V30 A30 30 0 0 1 30 0 Z" fill="#0b0b0d" />
      <path d="M30 1.5 H970 A28.5 28.5 0 0 1 998.5 30" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.5" />
      <circle cx="500" cy="11" r="3.5" fill="#1b1f27" />
      <g clipPath={`url(#${uid}-clip)`}>
        <image className="mk-screen" href={src} x="22" y="22" width="956" height="578" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect className="mk-power" x="22" y="22" width="956" height="578" rx="4" fill="#050506" />
      <rect x="22" y="22" width="956" height="578" rx="4" fill={`url(#${uid}-gl)`} />
    </svg>
  );
}

export default IMacFrame;
