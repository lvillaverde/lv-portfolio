import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./css/StudyCases.css";
import StudyCase from "./StudeCase";

gsap.registerPlugin(ScrollTrigger);

function StudyCases() {
    const titleRef = useRef();

    useGSAP(() => {
        gsap.from(titleRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: titleRef.current,
                //start: "top 80%",
                toggleActions: "play none none reverse"
                // markers: true // Descomenta para depurar
            }
        });
    }, []);

    return (
        <div className="study-cases base-section" id="study-cases">
            <div className="content">
                <h3 ref={titleRef}>Study Cases</h3>
                <StudyCase />
            </div>
        </div>
    );
}

export default StudyCases;