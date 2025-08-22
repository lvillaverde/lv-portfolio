import React, { useRef, useEffect } from 'react';
import '../App.css';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import gsap from "gsap";
import Header from './Header';
import Hero from './Hero';
import About from './About';
import SkillBand from "./SkillBand";
import StudyCases from './StudyCases';
import MoreProjects from './MoreProjects';
import Footer from './Footer';
import "./css/Theme.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Home() {
  const heroRef = useRef();
  const aboutRef = useRef();
  const skillBandRef = useRef();
  const moreProjectsRef = useRef();

  // Centralizar animaciones
  useGSAP(() => {
    // Animación de fade out y blur para Hero
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "center top",
        end: "bottom center",
        scrub: 1,
      },
      opacity: 0,
      filter: "blur(5px)",
    });

    // Animación de fade in y fade out para About en una sola timeline con rangos separados
    gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        // markers: true // Úsalo para ajustar visualmente
      }
    })
      .to(aboutRef.current, { opacity: 1, duration: 0.2, ease: "none" }, 0) // fade in en la primera mitad
      .to(aboutRef.current, { opacity: 0, duration: 0.2, ease: "none" }, 0.5); // fade out en la segunda mitad

    gsap.to(skillBandRef.current, {
      scrollTrigger: {
        trigger: skillBandRef.current,
        start: "top center", // Ajustado para que la opacidad comience a cambiar más tarde
        end: "top top",
        scrub: 1,
      },
      opacity: 1,
    });

    // Animación de fade in y fade out para MoreProjects igual que About
    gsap.timeline({
      scrollTrigger: {
        trigger: moreProjectsRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    })
      .to(moreProjectsRef.current, { opacity: 1, duration: 0.2, ease: "none" }, 0) // fade in en la primera mitad
      .to(moreProjectsRef.current, { opacity: 0, duration: 0.2, ease: "none" }, 0.5); // fade out en la segunda mitad
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

  // Scroll automático al cargar con hash en la URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      let target = null;
      if (hash === "#hero") target = document.getElementById("hero");
      if (hash === "#about") target = document.getElementById("about");
      if (hash === "#skillband") target = document.getElementById("skillband");
      if (target) {
        gsap.to(window, {
          scrollTo: target,
          duration: 1,
          ease: "power2.out"
        });
      }
    }
  }, []);

  return (
    <>
      <Header />
      <div id="hero" ref={heroRef}>
        <Hero onCtaClick={handleScrollToAbout} />
      </div>
      <StudyCases />
      <div id="about" ref={aboutRef} style={{ opacity: 0, minHeight: "100vh" }}>
        <About />
      </div>      
      <div ref={moreProjectsRef} style={{ opacity: 0 }}>
        <MoreProjects />
      </div> {/*}
      <div id="skillband" ref={skillBandRef} style={{ opacity: 0, width: "calc(100vw - 20px)", overflow: "hidden" }}>
        <SkillBand />
      </div> */}
      <Footer isHome={true} />
    </>
  );
}

export default Home;