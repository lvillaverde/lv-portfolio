import React from 'react';
import './css/MoreProjects.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LesCover from "../assets/more-projects/les/cover.png";
import MobileCover from "../assets/more-projects/mobile/cover.png";
import DentalMasCover from "../assets/more-projects/dentalmas/cover.png";
import LaGuerraDeLasPalabras from "../assets/more-projects/libro/cover.png";
import Techney from "../assets/more-projects/techney/cover.png";
import ReadIcon from "../assets/icons/read-icon.svg";
import ReadIconAccent from "../assets/icons/read-icon-accent.svg";
import BackIconAccent from "../assets/icons/back-icon-accent.svg";

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
  var MoreProjectsSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className="more-projects">
      <div className="container">
        <h3>More Projects</h3>
        <Slider {...MoreProjectsSettings} className="more-projects-slider">
          <div>
            <div className="more-projects-container">
              <div className="project-image">
                <div className="image-wrapper">
                  <img src={LesCover} alt="Login Page Screen" />
                </div>
                <div className="row">
                  <div className="arrow-button">
                    <img src={ReadIcon} alt="Read More" />
                  </div>
                </div>
              </div>
              <div className="tag-container">
                <span className="tag">
                  Web App
                </span>
                <span className="tag">
                  Payments
                </span>
              </div>
              <h4 className="epigraph">Web App Design for International Shipping Payments</h4>
            </div>
          </div>
          <div>
            <div className="more-projects-container">
              <div className="project-image">
                <div className="image-wrapper">
                  <img src={MobileCover} alt="Login Page Screen" />
                </div>
                <div className="row">
                  <div className="arrow-button">
                    <img src={ReadIcon} alt="Read More" />
                  </div>
                </div>
              </div>
              <div className="tag-container">
                <span className="tag">
                  Mobile App
                </span>
                <span className="tag">
                  Logistics
                </span>
              </div>
              <h4 className="epigraph">UX/UI for a Barcode Scanning App to Track Shipping Containers</h4>
            </div>
          </div>
          <div>
            <div className="more-projects-container">
              <div className="project-image">
                <div className="image-wrapper">
                  <img src={DentalMasCover} alt="Login Page Screen" />
                </div>
                <div className="row">
                  <div className="arrow-button">
                    <img src={ReadIcon} alt="Read More" />
                  </div>
                </div>
              </div>
              <div className="tag-container">
                <span className="tag">
                  Website
                </span>
                <span className="tag">
                  Healthcare
                </span>
              </div>
              <h4 className="epigraph">Designing a Modern Website for a Healthcare Provider</h4>
            </div>
          </div>
          <div>
            <div className="more-projects-container">
              <div className="project-image">
                <div className="image-wrapper">
                  <img src={LaGuerraDeLasPalabras} alt="Login Page Screen" />
                </div>
                <div className="row">
                  <div className="arrow-button">
                    <img src={ReadIcon} alt="Read More" />
                  </div>
                </div>
              </div>
              <div className="tag-container">
                <span className="tag">
                  Editorial Design
                </span>
                <span className="tag">
                  Graphic Design
                </span>
              </div>
              <h4 className="epigraph">Cover and Layout Design for a Literary Project</h4>
            </div>
          </div>
          <div>
            <div className="more-projects-container">
              <div className="project-image">
                <div className="image-wrapper">
                  <img src={Techney} alt="Login Page Screen" />
                </div>
                <div className="row">
                  <div className="arrow-button">
                    <img src={ReadIcon} alt="Read More" />
                  </div>
                </div>
              </div>
              <div className="tag-container">
                <span className="tag">
                  Logo Design
                </span>
                <span className="tag">
                  Branding
                </span>
              </div>
              <h4 className="epigraph">Visual Identity for a Tech Company</h4>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default MoreProjects;
