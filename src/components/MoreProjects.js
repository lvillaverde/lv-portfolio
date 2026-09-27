import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "../utils/SplitText";
import prefersReducedMotion from "../utils/prefersReducedMotion";
import './css/MoreProjects.css';
import LaptopFrame from "./mockups/LaptopFrame";
import LesInvoices from "../assets/more-projects/les/screens/invoices.jpg";
import LesPayments from "../assets/more-projects/les/screens/payments.jpg";
import LesSites from "../assets/more-projects/les/screens/sites.jpg";
import { RuggedFront, RuggedBack } from "./mockups/RuggedFrame";
import IpakHome from "../assets/more-projects/mobile/screens/home.jpg";
import IpakLogin from "../assets/more-projects/mobile/screens/login.jpg";
import IpakInOut from "../assets/more-projects/mobile/screens/inout.jpg";
import IpakDamages from "../assets/more-projects/mobile/screens/damages.jpg";
import IpakMoves from "../assets/more-projects/mobile/screens/moves.jpg";
import DentalMasHome from "../assets/more-projects/dentalmas/screens/home.jpg";
import DentalMasAbout from "../assets/more-projects/dentalmas/screens/about.jpg";
import DentalMasServices from "../assets/more-projects/dentalmas/screens/services.jpg";
import GDLPCover from "../assets/more-projects/libro/crops/cover.webp";
import GDLPProposals from "../assets/more-projects/libro/crops/proposals.webp";
import GDLPSpread from "../assets/more-projects/libro/crops/spread.webp";
import TechneyLogo from "../assets/more-projects/techney/logo-cover.webp";
import TechneyProposals from "../assets/more-projects/techney/proposals.png";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "Web App Design for International Shipping Payments",
    tags: ["Web App", "Payments"],
    accent: "#3d6fc4", // tints the mockup stage
    // media entries are either an image URL or { device, src, label } for a vector mockup
    media: [
      { device: "laptop", src: LesInvoices, label: "Invoices list with expanded invoice details" },
      { device: "laptop", src: LesPayments, label: "Payments table with status badges" },
      { device: "laptop", src: LesSites, label: "Empty state for sites with an Add Site action" },
    ],
    description: "A comprehensive web application designed to streamline international shipping payment processes. This project focused on creating an intuitive user experience for financial transactions in the logistics industry."
  },
  {
    id: 2,
    title: "UX/UI for a Barcode Scanning App to Track Shipping Containers",
    tags: ["Mobile App", "Logistics"],
    accent: "#2f6db0",
    media: [
      { device: "rugged-duo", src: IpakHome, label: "iPAK Mobile home menu on a rugged scanner, with the back of the device" },
      {
        device: "rugged-group",
        screens: [
          { src: IpakLogin, label: "iPAK Mobile log in" },
          { src: IpakInOut, label: "In/Out: scanned vehicle ready to confirm" },
          { src: IpakDamages, label: "Load damages: select damaged positions on the vehicle" },
        ],
      },
      { device: "rugged-duo", src: IpakMoves, label: "Moves: relocate an item to an area, row and bay" },
    ],
    description: "Mobile application interface designed for efficient barcode scanning and container tracking. The solution prioritizes speed and accuracy in logistics operations while maintaining a clean, user-friendly interface."
  },
  {
    id: 3,
    title: "Designing a Modern Website for a Healthcare Provider",
    tags: ["Website", "Healthcare"],
    accent: "#00a79d",
    media: [
      { device: "laptop", src: DentalMasHome, label: "Dentalmas home hero with the Reservá tu turno call to action" },
      { device: "laptop", src: DentalMasAbout, label: "About section: more than 10 years caring for your health" },
      { device: "laptop", src: DentalMasServices, label: "Services: implants, periodontics, orthodontics and cosmetic dentistry" },
    ],
    description: "Modern website design for a healthcare provider. The design emphasizes clear information architecture and professional aesthetics."
  },
  {
    id: 4,
    title: "Cover and Layout Design for a Literary Project",
    tags: ["Editorial Design", "Graphic Design"],
    accent: "#5cbf4f",
    media: [
      { device: "print", src: GDLPCover, label: "La guerra de las palabras: final cover with a word-cloud hand grenade" },
      { device: "print", src: GDLPProposals, label: "Four cover proposals explored for the book" },
      { device: "print", src: GDLPSpread, label: "Open cover showing the back, spine and front" },
    ],
    description: "Complete editorial design for a literary project including cover design and internal layout. The project combined typography, visual hierarchy, and artistic elements to enhance the reading experience."
  },
  {
    id: 5,
    title: "Visual Identity for a Tech Company",
    tags: ["Logo Design", "Branding"],
    accent: "#0a8fd6",
    media: [
      { device: "logo", src: TechneyLogo, label: "Techney logo: a faceted blue star with the wordmark" },
      TechneyProposals,
    ],
    description: "Comprehensive visual identity design for a technology company. The project included logo creation, brand guidelines, and application across various digital and print materials."
  }
];

// One media item: a vector device mockup on a stage, or a plain image
function ProjectMedia({ item, title, index, accent }) {
  const alt = `${title} - ${index + 1}`;
  const device = typeof item === "string" ? null : item.device;
  if (device) {
    let content = null;
    if (device === "print" || device === "logo") {
      content = <img className="mk-print" src={item.src} alt={item.label || alt} loading="lazy" />;
    } else if (device === "laptop") {
      content = <LaptopFrame src={item.src} label={item.label || alt} />;
    } else if (device === "rugged-duo") {
      content = (
        <div className="mk-duo">
          <div className="mk-duo-back"><RuggedBack label="Back of the rugged scanner" /></div>
          <div className="mk-duo-front"><RuggedFront src={item.src} label={item.label || alt} /></div>
        </div>
      );
    } else if (device === "rugged-group") {
      content = (
        <div className="mk-group">
          {item.screens.map((s, i) => (
            <div className="mk-group-item" key={i}><RuggedFront src={s.src} label={s.label} /></div>
          ))}
        </div>
      );
    }
    return (
      <div className="mockup-stage" style={accent ? { "--stage-accent": accent } : undefined}>
        <div className={`mockup-device is-${device}`}>{content}</div>
      </div>
    );
  }
  const src = typeof item === "string" ? item : item.src;
  return <img src={src} alt={alt} loading="lazy" />;
}

function ProjectModal({ project, onClose }) {
  const [current, setCurrent] = useState(0);
  const touchX = useRef(null);
  const count = project.media.length;

  const go = useCallback((dir) => setCurrent((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-label={project.title} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="modal-body">
          <div
            className="modal-image-area"
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={onTouchEnd}
          >
            <div className="modal-slide">
              <ProjectMedia item={project.media[current]} title={project.title} index={current} accent={project.accent} />
            </div>
            {count > 1 && (
              <>
                <button className="modal-arrow prev" onClick={() => go(-1)} aria-label="Previous image">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
                </button>
                <button className="modal-arrow next" onClick={() => go(1)} aria-label="Next image">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                </button>
                <div className="modal-image-nav">
                  {project.media.map((_, i) => (
                    <button
                      key={i}
                      className={`modal-dot ${i === current ? "active" : ""}`}
                      onClick={() => setCurrent(i)}
                      aria-label={`View image ${i + 1}`}
                      aria-current={i === current}
                    />
                  ))}
                  <span className="modal-count">{current + 1} / {count}</span>
                </div>
              </>
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
  const titleRef = useRef();
  const gridRef = useRef();

  const openModal = (project) => setSelectedProject(project);
  const closeModal = useCallback(() => setSelectedProject(null), []);

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
                  <ProjectMedia item={project.media[0]} title={project.title} index={0} accent={project.accent} />
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

      {/* keyed by project so the carousel always starts at the first image */}
      {selectedProject && (
        <ProjectModal key={selectedProject.id} project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
}

export default MoreProjects;
