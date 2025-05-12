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
        <div className="skill-band" ref={skillBandRef}>
            <img
                className="background-img"
                src={backImg}
                alt="#"
            />
            <div className="skill-band-content">
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
                    <h3>Diseño centrado en las personas</h3>
                    <p>Siempre pienso en el usuario. Escucho, observo y diseño soluciones que realmente les funcionan.</p>
                </div>
            </div>
            <div className="skill-band-content">
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
                    <h3>Diseño centrado en las personas</h3>
                    <p>Siempre pienso en el usuario. Escucho, observo y diseño soluciones que realmente les funcionan.</p>
                </div>
            </div>
            <div className="skill-band-content">
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
                    <h3>Diseño centrado en las personas</h3>
                    <p>Siempre pienso en el usuario. Escucho, observo y diseño soluciones que realmente les funcionan.</p>
                </div>
            </div>
        </div>
    );
}

export default SkillBand;