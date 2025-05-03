import React from "react";
import avatar from "../images/avatar_1.png";
import scrollIcon from "../assets/icons/double-down.svg"
import TypewriterHeader from "./TypewritterHeader";
import "./css/Hero.css";

function Hero() {
  return (
    <div className="hero">      
      <img className="profile-picture" src={avatar} alt="hi!" />
      <div>
        <h2><TypewriterHeader text="Hello! I’m Leandro" /></h2>
        <p>I design <span>user-centered</span> software that streamlines processes and enhances usability for industrial solutions.</p>
      </div>
      <div class="cta">
        <img src={scrollIcon} alt="#" />
        <p>Scroll to explore</p>
        <img src={scrollIcon} alt="#" />
      </div>
    </div>
  );
}

export default Hero;