import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./css/StudyCases.css";
import StudyCase from "./StudeCase";

gsap.registerPlugin(ScrollTrigger);

function StudyCases() {
    const titleRef = useRef();
    const sectionRef = useRef();

    useGSAP(() => {
        gsap.from(titleRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
                // markers: true // Descomenta para depurar
            }
        });

        // Animación de fade in y fade out para la sección completa igual que About y MoreProjects
        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                end: "bottom 15%",
                scrub: 1,
            }
        })
            .to(sectionRef.current, { opacity: 1, duration: 0.2, ease: "none" }, 0) // fade in en la primera mitad
            .to(sectionRef.current, { opacity: 0, duration: 0.2, ease: "none" }, 0.5); // fade out en la segunda mitad
    }, []);

    return (
        <div className="study-cases base-section" id="study-cases" ref={sectionRef} style={{ opacity: 0 }}>
            <div className="content">
                <h3 ref={titleRef}>Study Cases</h3>
                <StudyCase />
            </div>
        </div>
    );
}

export default StudyCases;