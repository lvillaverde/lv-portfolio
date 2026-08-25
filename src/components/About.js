import "./css/About.css";
import designSystems from "../assets/icons/design-systems.svg"

function About() {
    return (
        <>
            <div className="about base-section" id="about">
                <div className="content">
                    <h3>My Services</h3>
                    <div className="services-box">
                        <div className="service-item design-systems">
                            <img src={designSystems} alt="Design Systems" />
                            <h4>Design Systems</h4>
                            <p>A look into the process behind redesigning an existing interface, where in just one month we optimized usability, improved the visual language, and adapted an existing Design System to meet new needs.</p>
                        </div>
                        <div className="service-item ui-design">
                            <h4>UI Design</h4>
                            <p>A comprehensive exploration of user interface design, focusing on creating intuitive and visually appealing layouts that enhance user experience.</p>
                        </div>
                        <div className="service-item ux-design">
                            <h4>UX Design</h4>
                            <p>A deep dive into user experience design, emphasizing the importance of user research, prototyping, and usability testing in creating effective and enjoyable digital products.</p>
                        </div>
                        <div className="service-item consulting">
                            <h4>Consulting</h4>
                            <p>A collaborative approach to problem-solving, where we work together to identify challenges, explore solutions, and implement strategies that drive success.</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default About;