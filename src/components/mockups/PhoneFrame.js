import React, { useId } from "react";

// Black titanium phone, drawn in SVG; the screenshot fills the screen area.
const FRAME = { light: "#55555a", mid: "#2c2c30", dark: "#141416" };

function PhoneFrame({ src, label }) {
  const uid = "ph" + useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg className="mk-phone" viewBox="-6 -6 442 912" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${uid}-fr`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={FRAME.dark} />
          <stop offset=".05" stopColor={FRAME.light} />
          <stop offset=".5" stopColor={FRAME.mid} />
          <stop offset=".95" stopColor={FRAME.light} />
          <stop offset="1" stopColor={FRAME.dark} />
        </linearGradient>
        <linearGradient id={`${uid}-gl`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".16" />
          <stop offset=".42" stopColor="#fff" stopOpacity=".04" />
          <stop offset=".421" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-sc`}>
          <rect x="18" y="18" width="394" height="864" rx="52" />
        </clipPath>
      </defs>
      <g fill={`url(#${uid}-fr)`}>
        <rect x="-4" y="178" width="8" height="34" rx="3" />
        <rect x="-4" y="238" width="8" height="64" rx="3" />
        <rect x="-4" y="316" width="8" height="64" rx="3" />
        <rect x="426" y="262" width="8" height="104" rx="3" />
      </g>
      <rect width="430" height="900" rx="68" fill={`url(#${uid}-fr)`} />
      <rect x="1.5" y="1.5" width="427" height="897" rx="66.5" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="1.5" />
      <rect x="6" y="6" width="418" height="888" rx="62" fill="#050506" />
      <rect x="18" y="18" width="394" height="864" rx="52" fill="#fff" />
      <image href={src} x="18" y="18" width="394" height="864" preserveAspectRatio="xMidYMin slice" clipPath={`url(#${uid}-sc)`} />
      <rect x="157" y="31" width="116" height="34" rx="17" fill="#000" />
      <circle cx="253" cy="48" r="7" fill="#0c1422" />
      <circle cx="253" cy="48" r="3" fill="#27466b" opacity=".85" />
      <rect x="18" y="18" width="394" height="864" rx="52" fill={`url(#${uid}-gl)`} />
    </svg>
  );
}

export default PhoneFrame;
