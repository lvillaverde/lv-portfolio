import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "../utils/SplitText";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import photo from "../images/about-photo.jpg";
import "./css/AboutMe.css";

gsap.registerPlugin(ScrollTrigger);

const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

// Claude mark: twelve tapered rays around a centre
const claudeRays = (() => {
  let d = "";
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + (i % 2) * 0.08, L = i % 3 === 0 ? 11 : i % 3 === 1 ? 9 : 10, w = 0.32;
    const pt = (ang, r) => `${(12 + Math.cos(ang) * r).toFixed(2)} ${(12 + Math.sin(ang) * r).toFixed(2)}`;
    d += `M${pt(a + w, 2.2)}L${pt(a, L)}L${pt(a - w, 2.2)}Z`;
  }
  return d;
})();

const ICONS = [
  { label: "Figma", el: (
    <svg viewBox="0 0 24 36">
      <path d="M6 36a6 6 0 0 0 6-6v-6H6a6 6 0 0 0 0 12Z" fill="#0ACF83" />
      <path d="M0 18a6 6 0 0 1 6-6h6v12H6a6 6 0 0 1-6-6Z" fill="#A259FF" />
      <path d="M0 6a6 6 0 0 1 6-6h6v12H6A6 6 0 0 1 0 6Z" fill="#F24E1E" />
      <path d="M12 0h6a6 6 0 0 1 0 12h-6Z" fill="#FF7262" />
      <path d="M24 18a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" fill="#1ABCFE" />
    </svg>
  ) },
  { label: "Claude", el: (
    <svg viewBox="0 0 24 24"><path d={claudeRays} fill="#D97757" /><circle cx="12" cy="12" r="2.6" fill="#D97757" /></svg>
  ) },
  { label: "Design systems", el: (
    <svg viewBox="0 0 24 24" {...S}><path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" /></svg>
  ) },
  { label: "Vector", el: (
    <svg viewBox="0 0 24 24" {...S}><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.6 7.6" /><circle cx="11" cy="11" r="2" /></svg>
  ) },
  { label: "Prototype", el: (
    <svg viewBox="0 0 24 24" {...S}><path d="M4 3l7 17 2.5-7.5L21 10z" /></svg>
  ) },
  { label: "Color", el: (
    <svg viewBox="0 0 24 24" {...S}><circle cx="13.5" cy="6.5" r="1.5" /><circle cx="17.5" cy="10.5" r="1.5" /><circle cx="8.5" cy="7.5" r="1.5" /><circle cx="6.5" cy="12.5" r="1.5" /><path d="M12 2a10 10 0 0 0 0 20c1 0 1.6-.8 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7H16a6 6 0 0 0 6-6c0-4.9-4.5-8.4-10-8.4z" /></svg>
  ) },
];

const CARDS = [
  { title: "How I work", icon: (
    <svg viewBox="0 0 24 24" {...S}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
  ), body: (
    <>I'm passionate about turning complex ideas into <mark>simple, functional, and engaging experiences</mark>. I enjoy collaborating with teams and being involved in every stage of the process—from research to final design. I'm adaptable, a fast learner, and always strive to find the right balance between aesthetics, technology, and real human needs.</>
  ) },
  { title: "Curious about tech", icon: (
    <svg viewBox="0 0 24 24" {...S}><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 21h8M9 9l-2 2 2 2M15 9l2 2-2 2" /></svg>
  ), body: (
    <>I love <mark>technology</mark> and I'm deeply curious—this drives me to study and understand the tools and technologies that bring my designs to life.</>
  ) },
  { title: "Off the screen", icon: (
    <svg viewBox="0 0 24 24" {...S}><path d="M12 22c0-6 0-10 1-13" /><path d="M13 9c-2-3-6-4-9-2 3 0 6 1 9 2z" /><path d="M13 9c2-3 6-4 8-2-3 0-5 1-8 2z" /><path d="M13 9c0-3-2-6-5-6 2 1 4 4 5 6z" /></svg>
  ), body: (
    <>Outside of work, I enjoy barbecues, dogs, traveling, and constantly exploring new tools. There's always something new to <mark>learn</mark>.</>
  ) },
];

// Orbit geometry, in units of a 760-wide reference stage (scaled to the real stage width)
const ORBIT_R = 300;
const ORBIT_OPEN = 0.407;   // ellipse height / width: front pass runs just under the chin
const SWEEP = 300;          // degrees turned while the section crosses the viewport

function AboutMe() {
  const sectionRef = useRef();
  const stageRef = useRef();
  const titleRef = useRef();

  useGSAP(() => {
    const section = sectionRef.current, stage = stageRef.current;
    const sats = gsap.utils.toArray(".about-me-sat", section);
    const clamp = gsap.utils.clamp(0, 1);
    const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);

    // place every icon on the tilted orbit for a scroll progress p (0 → 1)
    const render = (p) => {
      const k = stage.clientWidth / 760, appear = ease((p - 0.05) / 0.3);
      sats.forEach((el, i) => {
        const ang = ((i * 360) / sats.length + p * SWEEP) * (Math.PI / 180);
        const depth = Math.sin(ang);                               // +1 in front, −1 behind the photo
        const r = ORBIT_R * k;
        gsap.set(el, {
          x: Math.cos(ang) * r * appear,
          y: depth * r * ORBIT_OPEN * appear,
          scale: (0.7 + 0.3 * appear) * (0.78 + 0.32 * (depth + 1) / 2),
          opacity: appear * (0.45 + 0.55 * (depth + 1) / 2),
          zIndex: depth > 0 ? 3 : 1,
        });
      });
    };

    if (prefersReducedMotion()) {
      render(0.45);
      const onResize = () => render(0.45);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // the orbit only moves while the user scrolls: progress follows the section through the viewport
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });
    render(st.progress);

    if (titleRef.current) {
      gsap.from(titleRef.current.querySelectorAll(".split-text-unit"), {
        clipPath: "inset(0 0 100% 0)", y: 20, duration: 0.8, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });
    }
    gsap.from(section.querySelectorAll(".about-me-quote, .about-me-card"), {
      opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
    });
  }, { scope: sectionRef });

  return (
    <section className="about-me base-section" ref={sectionRef} aria-labelledby="about-me-title">
      <div className="about-me-content">
        <div className="about-me-top">
          <div className="about-me-visual">
            <div className="about-me-stage" ref={stageRef}>
              {/* back half of the orbit runs behind the photo, front half over it */}
              <span className="about-me-ring back" aria-hidden="true" />
              <img className="about-me-photo" src={photo} alt="Leandro Villaverde" loading="lazy" width="560" height="560" />
              <span className="about-me-ring front" aria-hidden="true" />
              <ul className="about-me-orbit" aria-label="Tools I work with">
                {ICONS.map((icon) => (
                  <li key={icon.label} className="about-me-sat" title={icon.label}>
                    <span className="about-me-sat-icon" aria-hidden="true">{icon.el}</span>
                    <span className="visually-hidden">{icon.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="about-me-head">
            <h3 id="about-me-title">
              <SplitText ref={titleRef} type="words">About me</SplitText>
            </h3>
            <p className="about-me-quote">Design is my way of understanding and improving the world — one screen at a time.</p>
          </div>
        </div>
        <div className="about-me-cards">
          {CARDS.map((card) => (
            <article className="about-me-card" key={card.title}>
              <span className="about-me-card-icon" aria-hidden="true">{card.icon}</span>
              <h4>{card.title}</h4>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
