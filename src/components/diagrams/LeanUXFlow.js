import React from "react";

const STEPS = ["Think", "Make", "Check", "Learn", "Repeat"];

// Lean UX cycle: a row of steps on desktop, a column on mobile.
function LeanUXFlow() {
  return (
    <ol className="lean-flow" aria-label="Lean UX cycle">
      {STEPS.map((step, idx) => (
        <li key={step} className="lean-flow-step">
          <div className="lean-flow-box">
            <span className="lean-flow-index">{String(idx + 1).padStart(2, "0")}</span>
            <span className="lean-flow-label">{step}</span>
          </div>
          {idx < STEPS.length - 1 && (
            <svg className="lean-flow-arrow" viewBox="0 0 24 12" aria-hidden="true">
              <path d="M0 6h21M17 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
}

export default LeanUXFlow;
