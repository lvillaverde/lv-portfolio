import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./css/StudyCase.css";
import NextchangeThumbnail from "../assets/study-cases/nextchange/thumbnail.png";
import EddenThumbnail from "../assets/study-cases/edden/thumbnail.jpg";
import MeSirveThumbnail from "../assets/study-cases/mesirve/thumbnail.png";
import studyCasesData from "../data/studyCases.json";

gsap.registerPlugin(ScrollTrigger);

// Mapear las imágenes importadas con los datos del JSON
const imageMap = {
    "/src/assets/study-cases/mesirve/thumbnail.png": MeSirveThumbnail,
    "/src/assets/study-cases/nextchange/thumbnail.png": NextchangeThumbnail,
    "/src/assets/study-cases/edden/thumbnail.jpg": EddenThumbnail
};

// Procesar los datos del JSON para incluir las imágenes correctas
const studyCases = studyCasesData.map(studyCase => ({
    ...studyCase,
    image: {
        ...studyCase.image,
        src: imageMap[studyCase.image.src] || studyCase.image.src
    }
}));

function StudyCase() {
    const containerRef = useRef();

    useGSAP(() => {
        // Selecciona todos los divs .study-case dentro del contenedor
        gsap.utils.toArray(containerRef.current.querySelectorAll(".study-case")).forEach((el) => {
            gsap.from(el, {
                y: 100,
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