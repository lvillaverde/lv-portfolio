import "./css/Menu.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import MenuHamburger from "../assets/icons/hamburguer-menu.svg";

const menuItems = [
    { name: "About Me", link: "#about" },
    // { name: "My Process", link: "#process" },
    { name: "Study Cases", link: "#study-cases" },
    // { name: "Snapshots", link: "#snapshots" },
    // { name: "Contact", link: "#contact" }
];

function Menu() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const mobileMenuRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSectionClick = (sectionId, index) => {
        setActiveIndex(index);
        setMobileOpen(false);
        
        if (location.pathname !== "/") {
            // Si no estamos en la página principal, navegar primero a home
            navigate("/");
            // Hacer scroll a la sección después de un pequeño delay para que cargue la página
            setTimeout(() => {
                const element = document.getElementById(sectionId.replace("#", ""));
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        } else {
            // Si ya estamos en home, hacer scroll directo
            const element = document.getElementById(sectionId.replace("#", ""));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            // Solo activar el scroll tracking si estamos en la página principal
            if (location.pathname !== "/") {
                setActiveIndex(null);
                return;
            }
            
            let found = false;
            menuItems.forEach((item, idx) => {
                if (item.link.startsWith("#")) {
                    const id = item.link.replace("#", "");
                    const section = document.getElementById(id);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        if (rect.top <= window.innerHeight * 0.3 && rect.bottom > window.innerHeight * 0.3 && !found) {
                            setActiveIndex(idx);
                            found = true;
                        }
                    }
                }
            });
            if (!found) setActiveIndex(null);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        if (!mobileOpen) return;
        const handleClickOutside = (e) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                setMobileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [mobileOpen]);

    return (
        <nav className="menu" >
            <ul className="desktop-menu">
                {menuItems.map((item, index) => (
                    <li className={`menu-item${activeIndex === index ? " active" : ""}`} key={index}>
                        {item.link.startsWith("#") ? (
                            <button
                                className="menu-link"
                                onClick={() => handleSectionClick(item.link, index)}
                            >
                                {item.name}
                            </button>
                        ) : (
                            <Link to={item.link}>
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
            <button className="menu-hamburger" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
                <img src={MenuHamburger} alt="Menu" />
            </button>
            {mobileOpen && (
                <div className="mobile-menu-overlay">
                    <div className="mobile-menu" ref={mobileMenuRef}>
                        <ul>
                            {menuItems.map((item, index) => (
                                <li className={`menu-item${activeIndex === index ? " active" : ""}`} key={index}>
                                    {item.link.startsWith("#") ? (
                                        <button
                                            className="menu-link"
                                            onClick={() => handleSectionClick(item.link, index)}
                                        >
                                            {item.name}
                                        </button>
                                    ) : (
                                        <Link to={item.link}>
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Menu;