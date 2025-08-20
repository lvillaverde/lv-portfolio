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
  const orbitRef = useRef();
  const orbitDotRef = useRef();
  const orbitReverseRef = useRef();
  const orbitDotReverseRef = useRef();

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".profile-picture", {
      scale: 0.1,
      opacity: 0,
      duration: 1.3,
      ease: "expo.out"
    })
    tl.from(".title", {
      y: 50,
      opacity: 0,
      duration: 1.3,
      ease: "power2.out",
      delay: -1,
    })
    tl.from(".information", {
      y: -50,
      opacity: 0,
      duration: 1.3,
      ease: "power2.out",
      delay: -1,
    })

    // Orbit animations with random start positions
    if (orbitRef.current && orbitDotRef.current && orbitReverseRef.current && orbitDotReverseRef.current) {
      
      // Function to create a single cycle with random start
      const createSingleCycle = () => {
        // Generate random starting position (0-360 degrees) for each cycle
        const randomStart = Math.random() * 360;
        const meetingPoint = randomStart + 180; // They meet at opposite point
        
        const cycleTL = gsap.timeline();
        
        // Set initial state - both dots start visible at random position
        cycleTL.set([orbitDotRef.current, orbitDotReverseRef.current], {
          width: "12px",
          height: "12px",
          opacity: 1
        });
        
        // Reset orbit positions to random start
        cycleTL.set(orbitRef.current, { rotation: randomStart });
        cycleTL.set(orbitReverseRef.current, { rotation: randomStart });
        
        // Phase 1: 4s de órbita hasta el encuentro
        const orbitPhase = gsap.timeline();
        
        orbitPhase.to(orbitRef.current, {
          rotation: meetingPoint,
          duration: 8,
          ease: "circ.out"
        }, 0);
        
        orbitPhase.to(orbitReverseRef.current, {
          rotation: randomStart - 180,
          duration: 8,
          ease: "circ.out"
        }, 0);
        
        // Remove pulsing effect - orbit-dots stay stable during orbit
        // orbitPhase.to([orbitDotRef.current, orbitDotReverseRef.current], {
        //   scale: 1.15,
        //   opacity: 0.9,
        //   duration: 1,
        //   ease: "power2.inOut",
        //   repeat: 3,
        //   yoyo: true
        // }, 0);
        
        cycleTL.add(orbitPhase);
        
        // Phase 2: Encuentro - detenimiento
        const pauseTL = gsap.timeline();
        pauseTL.to([orbitDotRef.current, orbitDotReverseRef.current], {
          width: "12px",
          height: "12px",
          opacity: 1,
          duration: 0,
          ease: "power2.out"
        });
        pauseTL.to({}, { duration: 0 });
        
        cycleTL.add(pauseTL);
        
        // Phase 3: Explosión
        const explosionTL = gsap.timeline();
        explosionTL.to(orbitDotRef.current, {
          width: "0px",
          height: "0px",
          opacity: 0,
          duration: 0.15,
          force3D: true
        }, 0);
        explosionTL.to(orbitDotReverseRef.current, {
          width: "34px", // 12px * 2.8
          height: "34px",
          marginTop: "-17px", // Center vertically: -(34px/2)
          marginLeft: "-17px", // Center horizontally: -(34px/2)
          opacity: 1,
          filter: "blur(5px)",
          duration: 0.4,
          force3D: true
        }, 0);
        explosionTL.to(orbitDotReverseRef.current, {
          width: "38px", // 12px * 3.2
          height: "38px",
          marginTop: "-19px", // Center vertically: -(38px/2)
          marginLeft: "-19px", // Center horizontally: -(38px/2)
          opacity: 0,
          duration: 0.6,
          force3D: true
        }, 0.4);
        
        cycleTL.add(explosionTL);
        
        // Reset positions and sizes after explosion
        cycleTL.set([orbitDotRef.current, orbitDotReverseRef.current], {
          width: "12px",
          height: "12px",
          marginTop: "-6px", // Reset to center: -(12px/2)
          marginLeft: "-6px", // Reset to center: -(12px/2)
          opacity: 0,
          filter: "blur(0px)"
        });
        
        // Phase 4: Pause before next cycle
        cycleTL.to({}, { duration: 1 });
        
        // When cycle completes, start a new one with different random position
        cycleTL.call(() => {
          createSingleCycle();
        });
        
        return cycleTL;
      };
      
      // Start the first cycle
      createSingleCycle();
    }

    let resetTimeout;

    // Parallax circles animation
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      clearTimeout(resetTimeout);

      // Remove profile-picture parallax - only animate orbits and circle-front
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          x: xPos * -6,
          y: yPos * -6,
          duration: 1.8,
          ease: "power2.out"
        });
      }

      if (orbitReverseRef.current) {
        gsap.to(orbitReverseRef.current, {
          x: xPos * 4,
          y: yPos * 4,
          duration: 1.8,
          ease: "power2.out"
        });
      }

      gsap.to(".circle-front", {
        x: xPos * 8,
        y: yPos * 8,
        duration: 1.8,
        ease: "power2.out"
      });

      resetTimeout = setTimeout(() => {
        // Remove profile-picture reset - keep it static

        if (orbitRef.current) {
          gsap.to(orbitRef.current, {
            x: 0,
            y: 0,
            duration: 2,
            ease: "power2.out"
          });
        }

        if (orbitReverseRef.current) {
          gsap.to(orbitReverseRef.current, {
            x: 0,
            y: 0,
            duration: 2,
            ease: "power2.out"
          });
        }

        gsap.to(".circle-front", {
          x: 0,
          y: 0,
          duration: 2,
          ease: "power2.out"
        });
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resetTimeout);
    };
  }, { scope: hero });

  return (
    <div ref={heroRef}>
      <div className="hero" ref={hero}>
        <div className="profile-picture-container">
          <div className="floating-circles" ref={circlesRef}>
            <div className="circle circle-2">
              <div className="orbit" ref={orbitRef}>
                <div className="orbit-dot" ref={orbitDotRef}></div>
              </div>
              <div className="orbit orbit-reverse" ref={orbitReverseRef}>
                <div className="orbit-dot orbit-dot-reverse" ref={orbitDotReverseRef}></div>
              </div>
            </div>
          </div>
          <img className="profile-picture" src={avatar} alt="hi!" />
          <div className="floating-circles front-layer">
            <div className="circle circle-front"></div>
          </div>
        </div>
        <div className="info-container">
          <h2 className="title static">Hello!<br /> I'm Leandro</h2>
          <h2 className="title typewriter"><TypewriterHeader text="Hello! I'm Leandro" /></h2>
          <div className="information">
            <p className="paragraph">I'm a Product Designer with 15+ years of experience creating <span>efficient, elegant, and user-centered</span> solutions.</p>
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