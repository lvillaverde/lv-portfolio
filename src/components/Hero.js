import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import avatar from "../images/avatar_1.png";
import scrollIcon from "../assets/icons/double-down.svg"
import TypewriterHeader from "./TypewritterHeader";
import "./css/Hero.css";



function Hero({ onCtaClick }, heroRef) {
  const hero = useRef();

  useGSAP(() => {

    let tl = gsap.timeline();
    tl.from(
      ".profile-picture",
      {
        scale: 0.1,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out"
      }
    )
    tl.from(
      ".title",
      {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "power2.out",
        delay: -1,
      },
    )
    tl.from(
      ".paragraph",
      {
        y: -50,
        opacity: 0,
        duration: 1.3,
        ease: "power2.out",
        delay: -1,
      },
    )
    ;
  }, { scope: hero });

  /* https://www.techietalent.net/ ver el diseño del hero */

  return (
    <div ref={heroRef}>
      <div className="hero" ref={hero}>
        <img className="profile-picture" src={avatar} alt="hi!" />
        <div>
          <h2 className="title"><TypewriterHeader text="👋 Hello! I’m Leandro" /></h2>
          <p className="paragraph">I'm a Specialist Product Designer with 15+ years of experience creating <span>efficient, elegant, and user-centered</span> solutions.</p>
        </div>
        <button className="cta" onClick={onCtaClick}>
          <img src={scrollIcon} alt="#" />
          <p>Scroll to explore</p>
          <img src={scrollIcon} alt="#" />
        </button>
      </div>
    </div>
  );
}

export default React.forwardRef(Hero);