import React, { useRef } from "react";
import "./css/SkillBand.css";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import backImg from "../assets/skill-bands/background.svg";
import midImg1 from "../assets/skill-bands/middleImg1.svg";
import frontImg1 from "../assets/skill-bands/frontImg1.svg";

gsap.registerPlugin(ScrollTrigger);

function SkillBand() {
    const skillBandRef = useRef(null);
    const backgroundRef = useRef(null);
    const midImgRef = useRef(null);
    const frontImgRef = useRef(null);

    useGSAP(() => {
        const background = backgroundRef.current;
        const midImg = midImgRef.current;
        const frontImg = frontImgRef.current;

        // Parallax effect for each image
        gsap.timeline({
            scrollTrigger: {
                trigger: skillBandRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        })
            .fromTo(background, { x: -50, opacity: 0.6 }, { x: 0, opacity: 1, duration: 1 })
            .fromTo(midImg, { x: 50, opacity: 0.6 }, { x: 0, opacity: 1, duration: 1 }, "<")
            .fromTo(frontImg, { x: 100, opacity: 0.6 }, { x: 0, opacity: 1, duration: 1 }, "<");

        // Mousemove effect for each image
        const handleMouseMove = (event) => {
            const { clientX } = event;
            const centerX = window.innerWidth / 2;

            const offsetX = (clientX - centerX) / 50; // Adjust sensitivity

            gsap.to(background, { x: offsetX * 0.5, duration: 0.3 });
            gsap.to(midImg, { x: offsetX * 0.7, duration: 0.3 });
            gsap.to(frontImg, { x: offsetX, duration: 0.3 });
        };

        // Attach mousemove event to the band
        skillBandRef.current.addEventListener("mousemove", handleMouseMove);

        // Cleanup function to remove the event listener
        ScrollTrigger.create({
            trigger: skillBandRef.current,
            start: "top bottom",
            end: "bottom top",
            onLeave: () => skillBandRef.current.removeEventListener("mousemove", handleMouseMove),
            onEnterBack: () => skillBandRef.current.addEventListener("mousemove", handleMouseMove),
        });
    }, []);

    return (
        <div className="skill-band" ref={skillBandRef}>
            <img
                className="background-img"
                src={backImg}
                alt="#"
                ref={backgroundRef}
            />
            <div className="skill-band-content">
                <div className="pictures">
                    <img
                        src={midImg1}
                        className="mid-img1"
                        alt="#"
                        ref={midImgRef}
                    />
                    <img
                        src={frontImg1}
                        className="front-img1"
                        alt="#"
                        ref={frontImgRef}  
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