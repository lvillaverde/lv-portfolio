// src/components/Typewriter.js
import React, { useRef, useEffect } from "react";
import "./css/TypewritterHeader.css";

const TypewriterHeader = ({ text }) => {
    const textRef = useRef();
  
    useEffect(() => {
      let currentText = "";
      let i = 0;
  
      const interval = setInterval(() => {
        currentText += text[i];
        textRef.current.textContent = currentText;
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 100);
  
      return () => clearInterval(interval);
    }, [text]); // 👈 MUY IMPORTANTE: poner text como dependencia
  
    return (
      <span
        ref={textRef}
        className="typing-cursor"
        style={{ whiteSpace: "pre" }}
      />
    );
  };
  

export default TypewriterHeader;
