import React from "react";
import PhoneFrame from "./PhoneFrame";
import IMacFrame from "./IMacFrame";
import "../css/StudyCaseMockups.css";

import meSirveLogin from "../../assets/study-cases/mesirve/mockups/login.jpg";
import meSirveHome from "../../assets/study-cases/mesirve/mockups/home.jpg";
import meSirveMap from "../../assets/study-cases/mesirve/mockups/map.jpg";
import eddenMetrics from "../../assets/study-cases/edden/mockups/metrics.jpg";
import eddenLive from "../../assets/study-cases/edden/mockups/live.jpg";
import eddenStudents from "../../assets/study-cases/edden/mockups/students.jpg";
import eddenClass from "../../assets/study-cases/edden/mockups/class.jpg";
import nextChangeMap from "../../assets/study-cases/nextchange/mockups/map.jpg";

const Icon = {
  rain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M7 15a4 4 0 1 1 1.2-7.8A5 5 0 0 1 17.5 9 3 3 0 0 1 17 15Z" />
      <path d="M9 18l-1 2M13 18l-1 2M17 18l-1 2" />
    </svg>
  ),
  wind: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M3 9h11a3 3 0 1 0-3-3" />
      <path d="M3 15h15a3 3 0 1 1-3 3" />
    </svg>
  ),
  heat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  lpm: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z" />
    </svg>
  ),
  maps: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4Zm0 2.2 6 2.5v11.1l-6-2.5V6.2Z" />
    </svg>
  ),
};

const LEGEND = [
  { label: "Rain", color: "#0d47a1", icon: Icon.rain },
  { label: "Wind", color: "#1e88e5", icon: Icon.wind },
  { label: "Heat", color: "#f9a825", icon: Icon.heat },
  { label: "LPM", color: "#fb8c00", icon: Icon.lpm },
];

// MeSirve: three phones fanned out from the card's bottom edge
function FanVisual() {
  return (
    <div className="mk-visual mk-fan">
      <span className="mk-glow" aria-hidden="true" />
      <div className="mk-slot mk-l">
        <div className="mk-anim"><PhoneFrame src={meSirveLogin} label="MeSirve log in screen" /></div>
      </div>
      <div className="mk-slot mk-r">
        <div className="mk-anim"><PhoneFrame src={meSirveMap} label="MeSirve map of nearby deals" /></div>
      </div>
      <div className="mk-slot mk-c">
        <div className="mk-anim"><PhoneFrame src={meSirveHome} label="MeSirve home with deals near you" /></div>
      </div>
    </div>
  );
}

// Edden: tilted two-column grid of four phones bleeding past the card edges
function GridVisual() {
  return (
    <div className="mk-visual mk-grid">
      <div className="mk-tilt">
        <div className="mk-tilt-rot">
          <div className="mk-col mk-col1">
            <div className="mk-cell"><PhoneFrame src={eddenMetrics} label="Edden class metrics" /></div>
            <div className="mk-cell"><PhoneFrame src={eddenStudents} label="Edden live engagement by student" /></div>
          </div>
          <div className="mk-col mk-col2">
            <div className="mk-cell"><PhoneFrame src={eddenLive} label="Edden live synchronous engagement" /></div>
            <div className="mk-cell"><PhoneFrame src={eddenClass} label="Edden class summary" /></div>
          </div>
        </div>
      </div>
      <span className="mk-fade" aria-hidden="true" />
    </div>
  );
}

// NextChange: desktop with two design-system components lifted off the screen
function DeskVisual() {
  return (
    <div className="mk-visual mk-desk">
      <div className="mk-imac">
        <IMacFrame src={nextChangeMap} label="NextChange maps dashboard on a desktop screen" />
      </div>
      <div className="mk-chip mk-chip-nav" aria-hidden="true">{Icon.maps}Maps</div>
      <div className="mk-chip mk-chip-legend" aria-hidden="true">
        {LEGEND.map((item) => (
          <div key={item.label}>
            <i style={{ background: item.color }}>{item.icon}</i>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

const VISUALS = { mesirve: FanVisual, edden: GridVisual, nextchange: DeskVisual };

function StudyCaseVisual({ id, image }) {
  const Visual = VISUALS[id];
  if (Visual) return <Visual />;
  return (
    <div className="image-background">
      <img src={image.src} alt={image.alt} loading="lazy" />
    </div>
  );
}

export default StudyCaseVisual;
