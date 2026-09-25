import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "../utils/SplitText";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import "./css/StudyCases.css";
import StudyCase from "./StudeCase";

gsap.registerPlugin(ScrollTrigger);

function StudyCases() {
  const titleRef = useRef();
  const sectionRef = useRef();

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
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  return (
    <div className="study-cases base-section" id="study-cases" ref={sectionRef}>
      <div className="content">
        <h3>
          <SplitText ref={titleRef} type="words">Study Cases</SplitText>
        </h3>
        <StudyCase />
      </div>
    </div>
  );
}

export default StudyCases;
