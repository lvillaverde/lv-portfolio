import React, { useState, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "../utils/SplitText";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import './css/MoreProjects.css';
import LesCover from "../assets/more-projects/les/cover.png";
import LesSites from "../assets/more-projects/les/sites.png";
import LesInvoices from "../assets/more-projects/les/invoices.png";
import MobileCover from "../assets/more-projects/mobile/cover.png";
import MobileScreens from "../assets/more-projects/mobile/Screens.png";
import DentalMasCover from "../assets/more-projects/dentalmas/cover.png";
import DentalMasSecond from "../assets/more-projects/dentalmas/second-screen.png";
import DentalMasServices from "../assets/more-projects/dentalmas/services.png";
import LaGuerraDeLasPalabras from "../assets/more-projects/libro/cover.png";
import GDLPProposals from "../assets/more-projects/libro/proposals.png";
import GDLPBack from "../assets/more-projects/libro/back-cover.png";
import Techney from "../assets/more-projects/techney/cover.png";
import TechneyProposals from "../assets/more-projects/techney/proposals.png";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "Web App Design for International Shipping Payments",
    tags: ["Web App", "Payments"],
    cover: LesCover,
    images: [LesCover, LesSites, LesInvoices],
    description: "A comprehensive web application designed to streamline international shipping payment processes. This project focused on creating an intuitive user experience for financial transactions in the logistics industry."
  },
  {
    id: 2,
    title: "UX/UI for a Barcode Scanning App to Track Shipping Containers",
    tags: ["Mobile App", "Logistics"],
    cover: MobileCover,
    images: [MobileCover, MobileScreens],
    description: "Mobile application interface designed for efficient barcode scanning and container tracking. The solution prioritizes speed and accuracy in logistics operations while maintaining a clean, user-friendly interface."
  },
  {
    id: 3,
    title: "Designing a Modern Website for a Healthcare Provider",
    tags: ["Website", "Healthcare"],
    cover: DentalMasCover,
    images: [DentalMasCover, DentalMasSecond, DentalMasServices],
    description: "Modern website design for a healthcare provider. The design emphasizes clear information architecture and professional aesthetics."
  },
  {
    id: 4,
    title: "Cover and Layout Design for a Literary Project",
    tags: ["Editorial Design", "Graphic Design"],
    cover: LaGuerraDeLasPalabras,
    images: [LaGuerraDeLasPalabras, GDLPProposals, GDLPBack],
    description: "Complete editorial design for a literary project including cover design and internal layout. The project combined typography, visual hierarchy, and artistic elements to enhance the reading experience."
  },
  {
    id: 5,
    title: "Visual Identity for a Tech Company",
    tags: ["Logo Design", "Branding"],
    cover: Techney,
    images: [Techney, TechneyProposals],
    description: "Comprehensive visual identity design for a technology company. The project included logo creation, brand guidelines, and application across various digital and print materials."
  }
];

function ProjectModal({ project, isOpen, onClose }) {
  const [currentImg, setCurrentImg] = useState(0);

  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <div className="modal-body">
          <div className="modal-image-area">
            <img src={project.images[currentImg]} alt={`${project.title} - ${currentImg + 1}`} />
            {project.images.length > 1 && (
              <div className="modal-image-nav">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    className={`modal-dot ${i === currentImg ? "active" : ""}`}
                    onClick={() => setCurrentImg(i)}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="modal-info">
            <div className="modal-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoreProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const titleRef = useRef();
  const gridRef = useRef();

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    if (titleRef.current) {
      const units = titleRef.current.querySelectorAll(".split-text-unit");
      gsap.from(units, {
        clipPath: "inset(0 0 100% 0)",
        y: 20,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".more-projects-card");
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  return (
    <div className="more-projects" id="more-projects">
      <div className="container">
        <h3>
          <SplitText ref={titleRef} type="words">More Projects</SplitText>
        </h3>
        <div className="more-projects-grid" ref={gridRef}>
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="more-projects-card"
              onClick={() => openModal(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openModal(project)}
            >
              <div className="project-image">
                <div className="image-wrapper">
                  <img src={project.cover} alt={project.title} loading="lazy" />
                </div>
              </div>
              <div className="tag-container">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <h4>{project.title}</h4>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default MoreProjects;
