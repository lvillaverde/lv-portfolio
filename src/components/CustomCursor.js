import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import "./css/CustomCursor.css";

function CustomCursor() {
  const cursorRef = useRef();
  const dotRef = useRef();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    cursor.style.display = "block";
    dot.style.display = "block";

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
      });
    };

    const grow = () => {
      gsap.to(cursor, { scale: 1.8, borderColor: "rgba(229,9,125,0.5)", duration: 0.3 });
    };
    const shrink = () => {
      gsap.to(cursor, { scale: 1, borderColor: "rgba(255,255,255,0.3)", duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button, [role='button'], .magnetic-btn");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    const observer = new MutationObserver(() => {
      const freshInteractives = document.querySelectorAll("a, button, [role='button'], .magnetic-btn");
      freshInteractives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}

export default CustomCursor;
