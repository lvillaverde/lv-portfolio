import React, { useRef, useEffect } from 'react';
import '../App.css';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import gsap from "gsap";
import LenisContext from '../utils/LenisContext';
import useLenis from '../utils/useLenis';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import AboutMe from './AboutMe';
import StudyCases from './StudyCases';
import MoreProjects from './MoreProjects';
import Footer from './Footer';
import GrainOverlay from './GrainOverlay';
import BackgroundGradient from './BackgroundGradient';
import "./css/Theme.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Home() {
  const heroRef = useRef();
  const lenisRef = useLenis();

  useGSAP(() => {
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
  }, []);

  const handleScrollToNext = () => {
    const target = document.getElementById("about");
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2 });
    } else {
      gsap.to(window, { scrollTo: target, duration: 1, ease: "power2.out" });
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const cleanHash = hash.replace("/#", "").replace("#", "");
      const target = document.getElementById(cleanHash);
      if (target) {
        setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(target, { duration: 1.2 });
          } else {
            gsap.to(window, { scrollTo: target, duration: 1, ease: "power2.out" });
          }
        }, 100);
      }
    }
  }, [lenisRef]);

  return (
    <LenisContext.Provider value={lenisRef}>
      <GrainOverlay />
      <BackgroundGradient />
      <Header />
      <div id="hero" ref={heroRef}>
        <Hero onCtaClick={handleScrollToNext} />
      </div>
      <div id="about">
        <AboutMe />
      </div>
      <StudyCases />
      <div id="services">
        <About />
      </div>
      <MoreProjects />
      <Footer isHome={true} />
    </LenisContext.Provider>
  );
}

export default Home;
