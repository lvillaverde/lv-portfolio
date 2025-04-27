import React from "react";
import Menu from "./Menu";
import "../variables.css";
import "./css/Header.css";

function Header() {
    return (
        <header className="header">
            <div>
                <h1>Leandro<span>Villaverde</span></h1>
                <Menu />
            </div>
        </header>
    );
}

export default Header;