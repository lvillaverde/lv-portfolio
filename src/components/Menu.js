import "./css/Menu.css";
import { gsap } from "gsap";
import React, { useState, useEffect } from "react";
import MenuHamburger from "../assets/icons/hamburguer-menu.svg"; // Importa el componente de menú hamburguesa si lo tienes

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
    const mobileMenuRef = React.useRef();

    useEffect(() => {
        const handleScroll = () => {
            let found = false;
            menuItems.forEach((item, idx) => {
                if (item.link.startsWith("#")) {
                    const id = item.link.replace("#", "");
                    const section = document.getElementById(id);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        // Considera activa si la sección está al menos parcialmente visible
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
        handleScroll(); // Inicial
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

    // Si estamos en la home, escucha cambios de hash y haz scroll animado
    useEffect(() => {
        if (window.location.pathname === "/") {
            const handleHashScroll = () => {
                const hash = window.location.hash;
                if (hash.startsWith("#")) {
                    const id = hash.replace("#", "");
                    const section = document.getElementById(id);
                    if (section) {
                        gsap.to("body", { opacity: 0, duration: 0.25, onComplete: () => {
                            section.scrollIntoView({ behavior: "auto" });
                            gsap.to("body", { opacity: 1, duration: 0.25 });
                        }});
                    }
                }
            };
            window.addEventListener("hashchange", handleHashScroll);
            // Si ya hay hash al cargar, ejecuta scroll
            handleHashScroll();
            return () => window.removeEventListener("hashchange", handleHashScroll);
        }
    }, []);

    // Scroll suave al hacer click en el menú
    const handleMenuClick = (e, link, index) => {
        if (link.startsWith("#")) {
            e.preventDefault();
            setActiveIndex(index);
            setMobileOpen(false);
            const id = link.replace("#", "");
            if (window.location.pathname !== "/") {
                // Navega a la home con el hash
                window.location.href = `/${link}`;
            } else {
                // Cambia el hash para disparar el efecto
                window.location.hash = link;
            }
        }
    };

    return (
        <nav className="menu" >
            <ul className="desktop-menu">
                {menuItems.map((item, index) => (
                    <li className={`menu-item${activeIndex === index ? " active" : ""}`} key={index}>
                        <a
                            href={item.link}
                            onClick={e => handleMenuClick(e, item.link, index)}
                        >
                            {item.name}
                        </a>
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
                                    <a
                                        href={item.link}
                                        onClick={e => handleMenuClick(e, item.link, index)}
                                    >
                                        {item.name}
                                    </a>
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