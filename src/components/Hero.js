import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import avatar from "../images/avatar_1.png";
import scrollIcon from "../assets/icons/double-down.svg"
import TypewriterHeader from "./TypewritterHeader";
import "./css/Hero.css";



function Hero(props, heroRef) {
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



  return (
    <div className="hero" ref={heroRef}>
      <div ref={hero}>
        <img className="profile-picture" src={avatar} alt="hi!" />
        <div>
          <h2 className="title"><TypewriterHeader text="Hello! I’m Leandro" /></h2>
          <p className="paragraph">I design <span>user-centered</span> software that streamlines processes and enhances usability for industrial solutions.</p>
        </div>
        <div className="cta">
          <img src={scrollIcon} alt="#" />
          <p>Scroll to explore</p>
          <img src={scrollIcon} alt="#" />
        </div>
      </div>
    </div>
  );
}

export default React.forwardRef(Hero);