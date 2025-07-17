import React from "react";
import "./css/Footer.css";

function Footer({ isHome }) {
  const link = isHome ? "#hero" : "/#hero";
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Thanks for reading</h2>
        <a href={link} style={{ textDecoration: "none" }}>
          <h3>—Let's keep in touch.</h3>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
