import React, { useRef } from 'react';
import './App.css';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';


function App() {
  const heroRef = useRef();
  console.log('tengo la referencia de: ' + heroRef);

  useGSAP(() => {

    gsap.from(heroRef.current, {
      opacity: 0,
      duration: 2,
    });

  },);

  return (
    <>
      <Header />
      <Hero ref={heroRef} />
      <About />
    </>
  );
}

export default App;