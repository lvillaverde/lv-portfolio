import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./css/StudyCase.css";
import NextchangeThumbnail from "../assets/study-cases/nextchange/thumbnail.png";
import EddenThumbnail from "../assets/study-cases/edden/thumbnail.jpg";
import MeSirveThumbnail from "../assets/study-cases/mesirve/thumbnail.png";

gsap.registerPlugin(ScrollTrigger);

// Array con la información de 3 study cases
const studyCases = [
    {
        image: {
            src: MeSirveThumbnail,
            alt: "Study Case 3"
        },
        title: "From Hypothesis to Product: A Lean UX Journey in the Argentine Market",
        tags: ["Mobile", "Lean UX", "Brand Design"],
        description: "How we created Me Sirve, an app designed for the Argentine market that connects local shops and buyers with nearby deals.",
        buttonText: "View More",
        url: '/From-Hypothesis-to-Product-A-Lean-UX-Journey-in-the-Argentine-Market'
    },
    {
        image: {
            src: NextchangeThumbnail,
            alt: "Study Case 1"
        },
        title: "One Month, Big Changes: UX, UI and Design System Optimization",
        tags: ["User Testing", "Design System", "Prototyping"],
        description: "A look into the process behind redesigning an existing interface, where in just one month we optimized usability, improved the visual language, and adapted an existing Design System to meet new needs.",
        buttonText: "View More",
        url: '/One-Month-Big-Changes-Ux-Ui-And-Design-System'
    },
    {
        image: {
            src: EddenThumbnail,
            alt: "Design Thinking in Action: Creating a SaaS EdTech App"
        },
        title: "Design Thinking in Action: Creating a SaaS EdTech App",
        tags: ["Design Thinking", "Research", "UI Design"],
        description: "A step-by-step look at how we used Design Thinking to build an intuitive and impactful SaaS application for the education sector.",
        buttonText: "View More",
        url: '/Design-Thinking-in-Action-Creating-a-SaaS-EdTech-App'
    }
];

function StudyCase() {
    const containerRef = useRef();

    useGSAP(() => {
        // Selecciona todos los divs .study-case dentro del contenedor
        gsap.utils.toArray(containerRef.current.querySelectorAll(".study-case")).forEach((el) => {
            gsap.from(el, {
                x: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "top 60%",
                    toggleActions: "play none none reverse"
                    // markers: true // Descomenta para depurar
                }
            });
        });
    }, []);

    return (
        <div className="study-cases-list" ref={containerRef}>
            {studyCases.map((studyCaseData, idx) => (
                <div className="study-case" key={idx}>
                    <Link to={studyCaseData.url} className="img-link"><img src={studyCaseData.image.src} alt={studyCaseData.image.alt} /></Link>
                    <div className="description">
                        <Link to={studyCaseData.url}>
                            <h4>{studyCaseData.title}</h4>
                        </Link>
                        <div className="tags">
                            {studyCaseData.tags.map((tag, tagIdx) => (
                                <span className="tag" key={tagIdx}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p>{studyCaseData.description}</p>
                        <Link to={studyCaseData.url} className="btn">{studyCaseData.buttonText}</Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StudyCase;