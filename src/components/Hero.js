import React from "react";
import avatar from "../images/avatar_1.png";
import TypewriterHeader from "./TypewritterHeader";
import "./css/Hero.css";

function Hero() {
  return (
    <div className="hero">      
      <img src={avatar} />
      <div>
        <h2><TypewriterHeader text="Hello! I’m Leandro" /></h2>
        <p>I design <span>user-centered</span> software that streamlines processes and enhances usability for industrial solutions.</p>
      </div>
    </div>
  );
}

export default Hero;