import React, { useRef, useEffect } from "react";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import createDevicesAnimation from "../utils/devicesAnimation";

function HeroBackground({ focusRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext("2d")) return;
    return createDevicesAnimation(canvas, {
      reduced: prefersReducedMotion(),
      focusEl: focusRef ? focusRef.current : null,
    });
  }, [focusRef]);

  return (
    <>
      <canvas ref={canvasRef} className="hero-shader-bg" aria-hidden="true" />
      <div className="hero-bg-scrim" aria-hidden="true" />
    </>
  );
}

export default HeroBackground;
