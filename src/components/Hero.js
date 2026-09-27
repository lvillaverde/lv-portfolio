import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import avatar from "../images/avatar_1.png";
import scrollIcon from "../assets/icons/double-down.svg";
import mapPointer from "../assets/icons/map-pointer.svg";
import Linkedin from "../assets/icons/linkedin.svg";
import Download from "../assets/icons/download.svg";
import email from "../assets/icons/mail.svg";
import cvFile from "../assets/cv/CV-Leandro-Villaverde.docx";
import SplitText from "../utils/SplitText";
import MagneticButton from "../utils/MagneticButton";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import HeroBackground from "./HeroBackground";
import "./css/Hero.css";

function Hero(props, heroRef) {
  const hero = useRef();
  const headingRef = useRef();
  const subHeadingRef = useRef();
  const paragraphRef = useRef();
  const buttonsRef = useRef();
  const infoRef = useRef();
  const ctaRef = useRef();
  const focusRef = useRef();

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-shader-bg", {
      opacity: 0,
      duration: 2,
      ease: "power2.inOut",
    }, 0);

    tl.from(".profile-picture", {
      scale: 0.9,
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
    }, 0);

    if (headingRef.current) {
      const headingUnits = headingRef.current.querySelectorAll(".split-text-unit");
      tl.from(headingUnits, {
        y: "100%",
        opacity: 0,
        duration: 0.9,
        stagger: 0.03,
        ease: "power3.out",
      }, 0.3);
    }

    if (subHeadingRef.current) {
      const subUnits = subHeadingRef.current.querySelectorAll(".split-text-unit");
      tl.from(subUnits, {
        y: "100%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.out",
      }, 0.5);
    }

    if (paragraphRef.current) {
      const paraUnits = paragraphRef.current.querySelectorAll(".split-text-unit");
      tl.from(paraUnits, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.015,
        ease: "power2.out",
      }, 0.7);
    }

    if (buttonsRef.current) {
      tl.from(buttonsRef.current.children, {
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      }, 0.9);
    }

    if (infoRef.current) {
      tl.from(infoRef.current.children, {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      }, 1.0);
    }

    if (ctaRef.current) {
      tl.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 1.1);

      gsap.to(ctaRef.current.querySelectorAll("img"), {
        y: 4,
        duration: 0.8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    return () => tl.kill();
  }, { scope: hero });

  return (
    <div ref={heroRef}>
      <div className="hero" ref={hero}>
        <HeroBackground focusRef={focusRef} />

        <div className="hero-content-row">
          <div className="hero-text-col">
            <div className="hero-heading-row">
              <h1 className="hero-main-heading">
                <SplitText ref={headingRef} type="chars">Hello!</SplitText>
                <br />
                <span className="hero-name-row">
                  <SplitText ref={subHeadingRef} type="chars" className="hero-name-line">I'm Leandro</SplitText>
                  <img className="profile-picture" src={avatar} alt="" aria-hidden="true" />
                </span>
              </h1>
            </div>
            <div className="hero-paragraph">
              <SplitText ref={paragraphRef} type="words">
                Product Designer with 15+ years of experience, focused on enterprise software, SaaS solutions, and data-informed design.
              </SplitText>
            </div>
            <div className="hero-buttons" ref={buttonsRef}>
              <MagneticButton strength={0.25}>
                <a href="https://www.linkedin.com/in/lvillaverde/" target="_blank" rel="noreferrer" className="hero-btn">
                  Linkedin
                  <div className="arrow-button">
                    <img src={Linkedin} alt="Linkedin" />
                  </div>
                </a>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <a href={cvFile} download="CV-Leandro-Villaverde.docx" rel="noreferrer" className="hero-btn">
                  Download CV
                  <div className="arrow-button">
                    <img src={Download} alt="Download CV" />
                  </div>
                </a>
              </MagneticButton>
            </div>
            <div className="hero-info-row" ref={infoRef}>
              <div className="info-item">
                <img src={mapPointer} alt="Location" />
                <p>Montevideo, Uruguay</p>
              </div>
              <div className="info-item">
                <img src={email} alt="Email" />
                <a href="mailto:lhvillaverde@gmail.com"><p>lhvillaverde@gmail.com</p></a>
              </div>
            </div>
          </div>
          {/* Empty on purpose: the background animation frames its main beats here */}
          <div className="hero-anim-focus" ref={focusRef} aria-hidden="true" />
        </div>

        <button className="cta" ref={ctaRef} onClick={props.onCtaClick}>
          <img src={scrollIcon} alt="" />
          <p>Scroll to explore</p>
          <img src={scrollIcon} alt="" />
        </button>
      </div>
    </div>
  );
}

export default React.forwardRef(Hero);
