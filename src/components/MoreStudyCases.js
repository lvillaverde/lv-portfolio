import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./css/MoreStudyCases.css";
import NextchangeThumbnail from "../assets/study-cases/nextchange/thumbnail.png";
import EddenThumbnail from "../assets/study-cases/edden/thumbnail.png";
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
const allStudyCases = studyCasesData.map(studyCase => ({
    ...studyCase,
    image: {
        ...studyCase.image,
        src: imageMap[studyCase.image.src] || studyCase.image.src
    }
}));

function MoreStudyCases({ currentCaseId }) {
    const containerRef = useRef();

    // Filtrar el study case actual usando el ID y tomar solo 2
    const otherStudyCases = allStudyCases
        .filter(studyCase => studyCase.id !== currentCaseId)
        .slice(0, 2);

    useGSAP(() => {
        gsap.utils.toArray(containerRef.current.querySelectorAll(".more-study-case")).forEach((el, index) => {
            gsap.from(el, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, []);

    return (
        <div className="more-study-cases" ref={containerRef}>
            <div className="more-study-cases-grid">
                {otherStudyCases.map((studyCaseData) => (
                    <div className="more-study-case" key={studyCaseData.id}>
                        <Link to={studyCaseData.url} className="img-link">
                            <img src={studyCaseData.image.src} alt={studyCaseData.image.alt} />
                        </Link>
                        <div className="description">
                            <Link to={studyCaseData.url}>
                                <h3>{studyCaseData.title}</h3>
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
        </div>
    );
}

export default MoreStudyCases;
