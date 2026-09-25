import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import prefersReducedMotion from "./prefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const presets = {
  fadeUp: { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } },
  fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
  blurIn: { from: { opacity: 0, filter: "blur(8px)" }, to: { opacity: 1, filter: "blur(0px)" } },
  clipReveal: {
    from: { clipPath: "inset(0 0 100% 0)", y: 20 },
    to: { clipPath: "inset(0 0 0% 0)", y: 0 },
  },
};

export default function ScrollReveal({
  children,
  animation = "fadeUp",
  duration = 0.8,
  stagger = 0,
  delay = 0,
  start = "top 85%",
  className = "",
  style = {},
  as: Tag = "div",
}) {
  const ref = useRef();

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const preset = presets[animation] || presets.fadeUp;
    const targets = stagger
      ? ref.current.children
      : ref.current;

    gsap.fromTo(targets, preset.from, {
      ...preset.to,
      duration,
      stagger: stagger || 0,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: ref });

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
