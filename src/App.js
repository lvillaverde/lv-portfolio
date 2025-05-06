import React, { useRef } from 'react';
import './App.css';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import gsap from "gsap";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const heroRef = useRef();
  const aboutRef = useRef();

  useGSAP(() => {
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom center-=200",
        scrub: 3, // Hace que la animación sea suave al hacer scroll
        markers: true, // Muestra los marcadores de inicio y fin (opcional)
      },
      opacity: 0, // Cambia la opacidad a 0
    });
  }, []);

  useGSAP(() => {
    gsap.to(aboutRef.current, {
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top center-=200",
        end: "top top",
        scrub: 3, // Hace que la animación sea suave al hacer scroll
        markers: true, // Muestra los marcadores de inicio y fin (opcional)
      },
      opacity: 1, // Cambia la opacidad a 0
    });
  }, []);

  const handleScrollToAbout = () => {
    const timeline = gsap.timeline();

    // Fade out Hero
    timeline.to(heroRef.current, {
      onComplete: () => {
        // Scroll to About section
        gsap.to(window, {
          scrollTo: aboutRef.current,
          duration: 1,
          ease: "power2.out",
        });
      },
    });
  };

  return (
    <>
      <Header />
      <Hero ref={heroRef} onCtaClick={handleScrollToAbout} />
      <div ref={aboutRef} style={{ opacity: 0 }}>
        <About />
      </div>      
    </>
  );
}

export default App;