import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import "./css/StudyCase.css";
import NextchangeThumbnail from "../assets/study-cases/nextchange/thumbnail.png";
import EddenThumbnail from "../assets/study-cases/edden/thumbnail.png";
import MeSirveThumbnail from "../assets/study-cases/mesirve/thumbnail.png";
import ReadIcon from "../assets/icons/read-icon-accent.svg";
import MagneticButton from "../utils/MagneticButton";
import StudyCaseVisual from "./mockups/StudyCaseVisual";
import studyCasesData from "../data/studyCases.json";

gsap.registerPlugin(ScrollTrigger);

const imageMap = {
  "/src/assets/study-cases/mesirve/thumbnail.png": MeSirveThumbnail,
  "/src/assets/study-cases/nextchange/thumbnail.png": NextchangeThumbnail,
  "/src/assets/study-cases/edden/thumbnail.png": EddenThumbnail,
};

const studyCases = studyCasesData.map((studyCase) => ({
  ...studyCase,
  image: {
    ...studyCase.image,
    src: imageMap[studyCase.image.src] || studyCase.image.src,
  },
}));

function StudyCase() {
  const containerRef = useRef();

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    gsap.utils
      .toArray(containerRef.current.querySelectorAll(".study-case"))
      .forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(el, { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });

        const number = el.querySelector(".study-case-number");
        if (number) {
          tl.from(number, { opacity: 0, scale: 0.8, duration: 0.5, ease: "power2.out" }, 0.1);
        }

        const title = el.querySelector("h4");
        if (title) {
          tl.from(title, { y: 25, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.15);
        }

        const tags = el.querySelectorAll(".tag");
        if (tags.length) {
          tl.from(tags, { opacity: 0, y: 10, stagger: 0.04, duration: 0.4, ease: "power2.out" }, 0.25);
        }

        const desc = el.querySelector("p");
        if (desc) {
          tl.from(desc, { opacity: 0, y: 15, duration: 0.5, ease: "power2.out" }, 0.3);
        }

        const btn = el.querySelector(".btn");
        if (btn) {
          tl.from(btn, { x: -20, opacity: 0, duration: 0.5, ease: "power3.out" }, 0.4);
        }

        const visual = el.querySelector(".mk-visual");
        const q = (sel) => visual.querySelectorAll(sel);

        if (visual?.classList.contains("mk-fan")) {
          tl.from(q(".mk-glow"), { autoAlpha: 0, duration: 1.2, ease: "power2.out" }, 0.2);
          tl.from(q(".mk-c .mk-anim"), { y: 160, autoAlpha: 0, duration: 0.9, ease: "expo.out" }, 0.15);
          tl.from(q(".mk-l .mk-anim, .mk-r .mk-anim"), {
            y: 140, rotation: 0, autoAlpha: 0, stagger: 0.07, duration: 0.9, ease: "expo.out",
          }, 0.35);
        } else if (visual?.classList.contains("mk-grid")) {
          tl.from(q(".mk-tilt-rot"), { rotation: -6, scale: 1.1, autoAlpha: 0, duration: 1.3, ease: "expo.out" }, 0.05);
          tl.from(q(".mk-col1"), { y: "+=190", duration: 1.2, ease: "expo.out" }, 0.12);
          tl.from(q(".mk-col2"), { y: "-=200", duration: 1.2, ease: "expo.out" }, 0.24);
        } else if (visual?.classList.contains("mk-desk")) {
          tl.from(q(".mk-imac"), { y: 140, autoAlpha: 0, duration: 1.1, ease: "expo.out" }, 0.1);
          tl.fromTo(q(".mk-power"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.9, ease: "power1.inOut" }, 0.55);
          tl.from(q(".mk-screen"), { scale: 1.04, transformOrigin: "50% 50%", duration: 1.2, ease: "expo.out" }, 0.55);
          tl.from(q(".mk-chip"), {
            x: (i) => [220, 160][i], y: (i) => [60, -120][i], scale: 0.5, rotation: 0, autoAlpha: 0,
            stagger: 0.12, duration: 0.9, ease: "back.out(1.4)",
          }, 1);
        } else {
          const imgWrapper = el.querySelector(".image-background");
          if (imgWrapper) {
            tl.from(imgWrapper, { scale: 1.05, opacity: 0, duration: 0.8, ease: "power2.out" }, 0.1);
          }
        }
      });
  }, []);

  return (
    <div className="study-cases-list" ref={containerRef}>
      {studyCases.map((studyCaseData, idx) => (
        <div
          className={`study-case ${studyCaseData.id} ${idx % 2 !== 0 ? "reverse" : ""}`}
          key={idx}
        >
          <span className="study-case-number" aria-hidden="true">
            {String(idx + 1).padStart(2, "0")}
          </span>
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
            <MagneticButton strength={0.25}>
              <Link to={studyCaseData.url} className="btn">
                {studyCaseData.buttonText}
                <div className="arrow-icon-container">
                  <img src={ReadIcon} alt="Read More" className="read-icon" />
                </div>
              </Link>
            </MagneticButton>
          </div>
          <StudyCaseVisual
            id={studyCaseData.id}
            image={{ src: studyCaseData.image.src, alt: studyCaseData.title }}
          />
        </div>
      ))}
    </div>
  );
}

export default StudyCase;
