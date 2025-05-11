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
        end: "bottom center",
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
      <SkillBand />
    </>
  );
}

export default App;