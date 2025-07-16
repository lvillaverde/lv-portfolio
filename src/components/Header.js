import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Menu from "./Menu";
import "../variables.css";
import "./css/Header.css";

function Header() {
    const menu = useRef(); // referencia al DOM

    useEffect(() => {
        gsap.fromTo(
          menu.current,
          { opacity: 0 }, // estado inicial
          {
            opacity: 1,
            duration: 0.7,
            ease: "elastic",
          }
        );
      }, []);

    return (
        <header className="header" ref={menu}>
            <div className="header-container">
                <a href="/" ><h1>Leandro<span> Villaverde</span></h1></a>
                <Menu />
            </div>
        </header>
    );
}

export default Header;