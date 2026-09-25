import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "../utils/SplitText";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import Linkedin from "../assets/icons/linkedin.svg";
import email from "../assets/icons/mail.svg";
import "./css/Footer.css";

gsap.registerPlugin(ScrollTrigger);

function Footer({ isHome }) {
  const headingRef = useRef();
  const contentRef = useRef();

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    if (headingRef.current) {
      const units = headingRef.current.querySelectorAll(".split-text-unit");
      gsap.from(units, {
        clipPath: "inset(0 0 100% 0)",
        y: 20,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  return (
    <footer className="footer" ref={contentRef}>
      <div className="footer-content">
        <div className="footer-cta">
          <h2>
            <SplitText ref={headingRef} type="words">Let's work together</SplitText>
          </h2>
          <a href="mailto:lhvillaverde@gmail.com" className="footer-email">
            lhvillaverde@gmail.com
          </a>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/lvillaverde/" target="_blank" rel="noreferrer" className="footer-social-link">
              <img src={Linkedin} alt="LinkedIn" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:lhvillaverde@gmail.com" className="footer-social-link">
              <img src={email} alt="Email" />
              <span>Email</span>
            </a>
          </div>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Leandro Villaverde</p>
          <p className="footer-credit">Designed & built by Leandro Villaverde</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
