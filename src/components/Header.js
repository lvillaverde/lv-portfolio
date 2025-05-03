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
          { opacity: 0, y: 20 }, // estado inicial
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }, []);

    return (
        <header className="header" ref={menu}>
            <div>
                <h1>Leandro<span>Villaverde</span></h1>
                <Menu />
            </div>
        </header>
    );
}

export default Header;