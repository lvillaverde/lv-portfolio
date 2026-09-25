import React, { forwardRef } from "react";

const SplitText = forwardRef(function SplitText(
  { children, type = "words", className = "", style = {} },
  ref
) {
  const text = typeof children === "string" ? children : "";

  const units =
    type === "chars"
      ? text.split("").map((ch, i) => (ch === " " ? { char: " ", key: i } : { char: ch, key: i }))
      : text.split(" ").map((word, i) => ({ char: word, key: i }));

  return (
    <span
      ref={ref}
      className={`split-text ${className}`}
      aria-label={text}
      style={style}
    >
      {units.map((unit, i) => (
        <span
          key={unit.key}
          className="split-text-mask"
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
          aria-hidden="true"
        >
          <span
            className="split-text-unit"
            data-index={i}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {unit.char}
            {type === "words" && i < units.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
});

export default SplitText;
