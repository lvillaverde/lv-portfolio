import React, { useRef } from 'react';
import './App.css';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import gsap from "gsap";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import SkillBand from "./components/SkillBand";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const heroRef = useRef();
  const aboutRef = useRef();
  const skillBandRef = useRef();

  // Centralizar animaciones
  useGSAP(() => {
    // Animación de fade out para Hero
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom center",
        scrub: 1,
      },
      opacity: 0,
    });

    // Animación de fade in para About
    gsap.to(aboutRef.current, {
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top center",
        end: "center center",
        scrub: 1,        
        duration: 0.2,
      },
      opacity: 1,
    });

    // Animación de fade out para About
    gsap.to(aboutRef.current, {
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        duration: 0.2,
      },
      opacity: 0,
    }); 

    gsap.to(skillBandRef.current, {
      scrollTrigger: {
        trigger: skillBandRef.current,
        start: "top center", // Ajustado para que la opacidad comience a cambiar más tarde
        end: "top top",
        scrub: 1,
      },
      opacity: 1,
    });
  }, []);

  // Manejar el scroll al presionar el botón .cta
  const handleScrollToAbout = () => {
    gsap.to(window, {
      scrollTo: aboutRef.current,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(heroRef.current, {
      opacity: 0,
      duration: 1,
    });
  };

  return (
    <>
      <Header />
      <Hero ref={heroRef} onCtaClick={handleScrollToAbout} />
      <div ref={aboutRef} style={{ opacity: 0 }}>
        <About />
      </div>
      <div ref={skillBandRef} style={{ opacity: 0, width: "calc(100vw - 20px)", overflow: "hidden" }}>
        <SkillBand />
      </div>
    </>
  );
}

export default App;