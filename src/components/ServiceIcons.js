import React from "react";

// Service icons: 48px grid, 2px round strokes, outline only (color via currentColor).
// Hover motion lives in css/About.css and is driven by `.service-item:hover`.
// `var(--icon-bg)` fills shapes that must hide what's behind them.

const S = { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

const Svg = ({ className, children }) => (
  <svg className={`svc-icon ${className}`} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {children}
  </svg>
);

// Three layers of a system: patterns (grid), components (switch), tokens (swatch)
export function DesignSystemsIcon() {
  return (
    <Svg className="svc-ds">
      <g className="pat" fill="currentColor">
        <rect x="5.5" y="3.8" width="4.4" height="4.4" rx="1" />
        <rect className="p2" x="11.7" y="3.8" width="4.4" height="4.4" rx="1" />
        <rect x="5.5" y="10" width="4.4" height="4.4" rx="1" />
        <rect x="11.7" y="10" width="4.4" height="4.4" rx="1" />
      </g>
      <rect className="sw-track" x="4.8" y="20.5" width="12" height="7" rx="3.5" {...S} />
      <circle className="sw-knob" cx="8.3" cy="24" r="2" fill="currentColor" />
      <circle cx="10.8" cy="38.6" r="4.6" {...S} />
      <circle className="tok-fill" cx="10.8" cy="38.6" r="4.6" fill="currentColor" />
      <path className="ln ln1" d="M23 9.1 H40" {...S} />
      <path className="ln ln2" d="M23 24 H43" {...S} />
      <path className="ln ln3" d="M23 38.6 H35" {...S} />
    </Svg>
  );
}

// A layout being drawn with a cursor, with design-tool selection handles
export function UIDesignIcon() {
  return (
    <Svg className="svc-ui">
      <rect className="hd" x="6" y="6" width="36" height="7" rx="2" {...S} />
      <rect className="col" x="6" y="17" width="12" height="21" rx="2" {...S} />
      <rect className="blk" x="22" y="17" width="18" height="17" rx="2" {...S} />
      <g className="hdl" fill="var(--icon-bg)" stroke="currentColor" strokeWidth="1.4">
        <rect x="20.3" y="15.3" width="3.4" height="3.4" rx=".5" />
        <rect x="38.3" y="15.3" width="3.4" height="3.4" rx=".5" />
        <rect x="20.3" y="32.3" width="3.4" height="3.4" rx=".5" />
      </g>
      <g className="cursor">
        <path d="M40 34 L40 43 L42.4 40.8 L44.2 44.4 L46 43.5 L44.2 40 L47.4 39.7 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="var(--icon-bg)" />
      </g>
    </Svg>
  );
}

// The user at the centre, with product pieces orbiting around them
export function UXDesignIcon() {
  return (
    <Svg className="svc-ux">
      <circle className="halo" cx="24" cy="26" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle className="ring" cx="24" cy="24" r="17" {...S} strokeDasharray="0.1 4.2" />
      <g className="orbit">
        <rect x="20.5" y="3.5" width="7" height="6" rx="1.6" {...S} fill="var(--icon-bg)" />
        <circle cx="38.7" cy="32.5" r="3.2" {...S} fill="var(--icon-bg)" />
        <path d="M9.3 28.8 L13 32.5 L9.3 36.2 L5.6 32.5 Z" {...S} fill="var(--icon-bg)" />
      </g>
      <g className="user">
        <circle className="head" cx="24" cy="20.5" r="4.3" {...S} />
        <path d="M16.5 33.5 a7.5 6.8 0 0 1 15 0" {...S} />
      </g>
    </Svg>
  );
}

// A question and an answer: conversation that ends in a solution
export function ConsultingIcon() {
  return (
    <Svg className="svc-co">
      <path className="b1" d="M9 7 H25 A5 5 0 0 1 30 12 V20 A5 5 0 0 1 25 25 H15 L8 30 V25 A5 5 0 0 1 4 20 V12 A5 5 0 0 1 9 7 Z" {...S} />
      <circle className="dot d1" cx="11.5" cy="16" r="1.6" fill="currentColor" />
      <circle className="dot d2" cx="17" cy="16" r="1.6" fill="currentColor" />
      <circle className="dot d3" cx="22.5" cy="16" r="1.6" fill="currentColor" />
      <g className="b2">
        <path d="M23 21 H39 A5 5 0 0 1 44 26 V32 A5 5 0 0 1 39 37 H38 V43 L32 37 H23 A5 5 0 0 1 18 32 V26 A5 5 0 0 1 23 21 Z" {...S} fill="var(--icon-bg)" />
        <path className="check" d="M25.5 29.5 L29 33 L36.5 25.5" {...S} pathLength="100" />
      </g>
    </Svg>
  );
}
