import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Menu from "./Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../variables.css";
import "./css/Header.css";

function Header() {
    const menu = useRef(); // referencia al DOM
    const navigate = useNavigate();
    const location = useLocation();

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

    const handleHomeClick = (e) => {
        e.preventDefault();
        if (location.pathname === "/") {
            // Si ya estamos en home, solo hacer scroll al top
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // Si estamos en otra página, navegar a home
            navigate("/");
        }
    };

    return (
        <header className="header" ref={menu}>
            <div className="header-container">
                <a href="/" onClick={handleHomeClick}><h1>Leandro<span> Villaverde</span></h1></a>
                <Menu />
            </div>
        </header>
    );
}

export default Header;