import React, { useState } from 'react';
import './css/MoreProjects.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
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
import ReadIcon from "../assets/icons/read-icon.svg";
import ReadIconAccent from "../assets/icons/read-icon-accent.svg";
import BackIconAccent from "../assets/icons/back-icon-accent.svg";


// Datos de los proyectos
const projectsData = [
  {
    id: 1,
    title: "Web App Design for International Shipping Payments",
    tags: ["Web App", "Payments"],
    cover: LesCover,
    images: [LesCover, LesSites, LesInvoices], // Agregar más imágenes aquí cuando estén disponibles
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

// Componente Modal
function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  const modalSliderSettings = {
    dots: true,
    arrows: true,
    infinite: project.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-body">
          <div className="modal-slider">
            {project.images.length > 1 ? (
              <Slider {...modalSliderSettings} className="project-images-slider">
                {project.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`${project.title} - ${index + 1}`} />
                  </div>
                ))}
              </Slider>
            ) : (
              <img src={project.images[0]} alt={project.title} />
            )}
          </div>
          <div className="modal-info">
            <div className="modal-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
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

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <>
      <div
        className="custom-next-arrow"
        onClick={onClick}
      >
        <img src={ReadIconAccent} alt="Read More" />
      </div>
    </>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <>
      <div
        className="custom-prev-arrow"
        onClick={onClick}
      >
        <img src={BackIconAccent} alt="Read More" />
      </div>
    </>
  );
}

function MoreProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  var MoreProjectsSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  return (
    <div className="more-projects">
      <div className="container">
        <h3>More Projects</h3>
        <Slider {...MoreProjectsSettings} className="more-projects-slider">
          {projectsData.map((project) => (
            <div key={project.id}>
              <div className="more-projects-container" onClick={() => openModal(project)}>
                <div className="project-image">
                  <div className="image-wrapper">
                    <img src={project.cover} alt={project.title} />
                  </div>
                  <div className="row">
                    <div className="arrow-button">
                      <img src={ReadIcon} alt="Read More" />
                    </div>
                  </div>
                </div>
                <div className="tag-container">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="epigraph">{project.title}</h4>
              </div>
            </div>
          ))}
        </Slider>
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
