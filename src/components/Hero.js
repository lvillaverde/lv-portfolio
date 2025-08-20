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
import TypewriterHeader from "./TypewritterHeader";
import "./css/Hero.css";



function Hero(props, heroRef) {
  const hero = useRef();
  const circlesRef = useRef();

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
      ".information",
      {
        y: -50,
        opacity: 0,
        duration: 1.3,
        ease: "power2.out",
        delay: -1,
      },
    )

    let resetTimeout;

    // Parallax circles animation
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize mouse position (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      // Clear existing timeout
      clearTimeout(resetTimeout);

      // Animate profile picture with subtle movement
      gsap.to(".profile-picture", {
        x: xPos * 4,
        y: yPos * 4,
        duration: 1.8,
        ease: "power2.out"
      });

      // Animate only circle-2
      gsap.to(".circle-2", {
        x: xPos * -8,
        y: yPos * -8,
        duration: 1.8,
        ease: "power2.out"
      });

      // Animate circle-front (above avatar)
      gsap.to(".circle-front", {
        x: xPos * 8,
        y: yPos * 8,
        duration: 1.8,
        ease: "power2.out"
      });

      // Set timeout to reset positions after 3 seconds of inactivity
      resetTimeout = setTimeout(() => {
        gsap.to(".profile-picture", {
          x: 0,
          y: 0,
          duration: 2,
          ease: "power2.out"
        });

        gsap.to(".circle-2", {
          x: 0,
          y: 0,
          duration: 2,
          ease: "power2.out"
        });

        gsap.to(".circle-front", {
          x: 0,
          y: 0,
          duration: 2,
          ease: "power2.out"
        });
      }, 1500);
    };

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resetTimeout);
    };
  }, { scope: hero });

  /* https://www.techietalent.net/ ver el diseño del hero */

  return (
    <div ref={heroRef}>
      <div className="hero" ref={hero}>
        <div className="profile-picture-container">
          <div className="floating-circles" ref={circlesRef}>
            <div className="circle circle-2"></div>
          </div>
          <img className="profile-picture" src={avatar} alt="hi!" />
          <div className="floating-circles front-layer">
            <div className="circle circle-front"></div>
          </div>
        </div>
        <div className="info-container">
          <h2 className="title static">Hello!<br /> I’m Leandro</h2>
          <h2 className="title typewriter"><TypewriterHeader text="Hello! I’m Leandro" /></h2>
          <div className="information">
            <p className="paragraph">Product Designer with 15+ years of experience, focused on enterprise software, SaaS solutions, and data-informed design.</p>
            <div className="contact">
              <div className="buttons-row">
                <a href="https://www.linkedin.com/in/lvillaverde/" target="_blank" rel="noreferrer">
                  Linkedin
                  <div className="arrow-button">                    
                    <img src={Linkedin} alt="Linkedin" />
                  </div>
                </a>
                <a href={cvFile} download="CV-Leandro-Villaverde.docx" rel="noreferrer">
                  Download CV
                  <div className="arrow-button">
                    <img src={Download} alt="Download CV" />
                  </div>
                </a>
              </div>
              <div className="info-row">
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
          </div>

        </div>
        <button className="cta" onClick={props.onCtaClick}>
          <img src={scrollIcon} alt="#" />
          <p>Scroll to explore</p>
          <img src={scrollIcon} alt="#" />
        </button>
      </div>
    </div>
  );
}

export default React.forwardRef(Hero);