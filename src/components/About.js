import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "../utils/SplitText";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import { DesignSystemsIcon, UIDesignIcon, UXDesignIcon, ConsultingIcon } from "./ServiceIcons";
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
              <DesignSystemsIcon />
            </div>
            <h4>Design Systems</h4>
            <p>A look into the process behind redesigning an existing interface, where in just one month we optimized usability, improved the visual language, and adapted an existing Design System to meet new needs.</p>
          </div>
          <div className="service-item ui-design">
            <div className="service-icon">
              <UIDesignIcon />
            </div>
            <h4>UI Design</h4>
            <p>A comprehensive exploration of user interface design, focusing on creating intuitive and visually appealing layouts that enhance user experience.</p>
          </div>
          <div className="service-item ux-design">
            <div className="service-icon">
              <UXDesignIcon />
            </div>
            <h4>UX Design</h4>
            <p>A deep dive into user experience design, emphasizing the importance of user research, prototyping, and usability testing in creating effective and enjoyable digital products.</p>
          </div>
          <div className="service-item consulting">
            <div className="service-icon">
              <ConsultingIcon />
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
