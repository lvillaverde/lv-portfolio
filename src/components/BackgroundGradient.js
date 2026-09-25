import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import prefersReducedMotion from "../utils/prefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function BackgroundGradient() {
  const ref = useRef();

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    gsap.to(ref.current, {
      "--gx": "25%",
      "--gy": "85%",
      "--mx": "75%",
      "--my": "15%",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        "--gx": "75%",
        "--gy": "15%",
        "--mx": "25%",
        "--my": "85%",
        background: `
          radial-gradient(ellipse 700px 700px at var(--gx) var(--gy), var(--green-a06) 0%, transparent 70%),
          radial-gradient(ellipse 500px 500px at var(--mx) var(--my), var(--magenta-a03) 0%, transparent 70%)
        `,
      }}
    />
  );
}

export default BackgroundGradient;
