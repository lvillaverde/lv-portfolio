import React from "react";
import "./css/Footer.css";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { HashLink } from "react-router-hash-link";

gsap.registerPlugin(ScrollToPlugin);

function Footer({ isHome }) {
  const handleClick = (e) => {
    e.preventDefault();
    const hero = document.getElementById("hero");
    if (hero) {
      gsap.to(window, {
        scrollTo: hero,
        duration: 1,
        ease: "power2.out",
      });
      window.location.hash = "#hero";
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Thanks for reading</h2>
        <HashLink
          smooth
          to="/#hero"
          style={{ textDecoration: "none" }}
        >
          <h3>—Let's keep in touch.</h3>
        </HashLink>
      </div>
    </footer>
  );
}

export default Footer;
