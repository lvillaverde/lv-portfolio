import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "../utils/SplitText";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import "./css/About.css";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const titleRef = useRef();
  const gridRef = useRef();

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    if (titleRef.current) {
      const units = titleRef.current.querySelectorAll(".split-text-unit");
      gsap.from(units, {
        clipPath: "inset(0 0 100% 0)",
        y: 20,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".service-item");
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  return (
    <div className="about base-section" id="about">
      <div className="content">
        <h3>
          <SplitText ref={titleRef} type="words">My Services</SplitText>
        </h3>
        <div className="services-box" ref={gridRef}>
          <div className="service-item design-systems">
            <div className="service-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="6" y="6" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="26" y="6" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="6" y="26" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="26" y="26" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="30" y1="14" x2="38" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="10" y1="34" x2="18" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M30 30L38 38M38 30L30 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h4>Design Systems</h4>
            <p>A look into the process behind redesigning an existing interface, where in just one month we optimized usability, improved the visual language, and adapted an existing Design System to meet new needs.</p>
          </div>
          <div className="service-item ui-design">
            <div className="service-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="6" y="8" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="6" y1="36" x2="42" y2="36" stroke="currentColor" strokeWidth="2"/>
                <rect x="18" y="36" width="12" height="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="24" cy="22" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h4>UI Design</h4>
            <p>A comprehensive exploration of user interface design, focusing on creating intuitive and visually appealing layouts that enhance user experience.</p>
          </div>
          <div className="service-item ux-design">
            <div className="service-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="24" cy="20" r="12" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M16 32C16 28 19.6 25 24 25C28.4 25 32 28 32 32" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="24" cy="18" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M12 40L24 44L36 40" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <h4>UX Design</h4>
            <p>A deep dive into user experience design, emphasizing the importance of user research, prototyping, and usability testing in creating effective and enjoyable digital products.</p>
          </div>
          <div className="service-item consulting">
            <div className="service-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 12H40V32C40 33.1 39.1 34 38 34H10C8.9 34 8 33.1 8 32V12Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M14 20H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 24H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 28H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18 34V40" stroke="currentColor" strokeWidth="2"/>
                <path d="M30 34V40" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 40H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h4>Consulting</h4>
            <p>A collaborative approach to problem-solving, where we work together to identify challenges, explore solutions, and implement strategies that drive success.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
