import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./css/SkillBand.css";
import backImg from "../assets/skill-bands/background.svg";
import midImg1 from "../assets/skill-bands/middleImg1.svg";
import frontImg1 from "../assets/skill-bands/frontImg1.svg";
import midImg2 from "../assets/skill-bands/middleImg2.svg";
import frontImg2 from "../assets/skill-bands/frontImg2.svg";
import midImg3 from "../assets/skill-bands/middleImg3.svg";
import frontImg3 from "../assets/skill-bands/frontImg3.svg";

gsap.registerPlugin(ScrollTrigger);

function SkillBand() {
    const skillBandRef = useRef(null);

    useGSAP(() => {
        const skillBand = skillBandRef.current;
        const skillBandWidth = skillBand.scrollWidth;
        const viewportWidth = window.innerWidth;

        gsap.set(skillBand, { width: skillBandWidth }); // Ensure the container width matches its content

        ScrollTrigger.create({
            trigger: skillBand,
            start: "top top",
            end: () => `+=${skillBandWidth - viewportWidth}`,
            pin: true,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Move the skill band horizontally
                gsap.to(skillBand, {
                    x: -progress * (skillBandWidth - viewportWidth),
                    ease: "power2.out",
                });

                // Ensure distinct parallax effect for each layer
                gsap.to(".background-img", {
                    x: -progress, // Slowest movement for background
                    ease: "none",
                });

                gsap.to(".mid-img1, .mid-img2, .mid-img3", {
                    x: -progress * 300, // Moderate movement for middle images
                    ease: "none",
                });

                gsap.to(".front-img1, .front-img2, .front-img3", {
                    x: -progress * 600, // Fastest movement for front images
                    ease: "none",
                });
            },
        });

        return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }, []);

    return (
        <>

            <div className="skill-band" ref={skillBandRef}>
                <img
                    className="background-img"
                    src={backImg}
                    alt="#"
                />
                <div className="skill-band-content slide1">
                    <div className="pictures">
                        <img
                            src={midImg1}
                            className="mid-img1"
                            alt="#"
                        />
                        <img
                            src={frontImg1}
                            className="front-img1"
                            alt="#"
                        />
                    </div>
                    <div className="text">
                        <h3>Diseño centrado en <b>las personas</b></h3>
                        <p>Todo empieza por entender a quien va a usar lo que diseñamos.<br />
                        Me gusta <b>escuchar, observar</b> y hacer <b>muchas preguntas.</b><br />Ponerme en el <b>lugar del usuario</b> es clave para encontrar ideas que realmente resuelvan problemas y se sientan bien al usarlas.</p>
                    </div>
                </div>
                <div className="skill-band-content slide2">
                    <div className="pictures">
                        <img
                            src={midImg2}
                            className="mid-img2"
                            alt="#"
                        />
                        <img
                            src={frontImg2}
                            className="front-img2"
                            alt="#"
                        />
                    </div>
                    <div className="text">
                        <h3><b>Adaptarse</b> es parte del diseño</h3>
                        <p>Cada proyecto es <b>distinto</b>: hay tiempos, tecnologías, equipos y prioridades que cambian todo el panorama.<br />
                        Me gusta entender bien el <b>contexto</b> para saber cómo puedo aportar mejor.<br />Tengo facilidad para adaptarme a distintos roles, industrias y <b>formas de trabajo.</b></p>
                    </div>
                </div>
                <div className="skill-band-content slide3">
                    <div className="pictures">
                        <img
                            src={midImg3}
                            className="mid-img3"
                            alt="#"
                        />
                        <img
                            src={frontImg3}
                            className="front-img3"
                            alt="#"
                        />
                    </div>
                    <div className="text">
                        <h3>Del diseño al código, sin perder la esencia</h3>
                        <p>Trabajo con herramientas de prototipado como <b>Figma</b> y ayudo a armar <b>Design Systems</b> que sean útiles para el equipo.<br />También tengo conocimientos de <b>HTML, CSS, JavaScript y React</b>, lo que me permite acompañar de cerca la implementación.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SkillBand;