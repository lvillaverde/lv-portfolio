import './css/StudyCaseDetail.css';
import Header from './Header';
import QuoteIcon from '../assets/icons/quote.svg';
import FrustratedProfessor from '../assets/study-cases/edden/sad-professor.jpg';
import UserPersona from '../assets/study-cases/edden/user-persona.png';
import EmpathyMap from '../assets/study-cases/edden/empathy-map.png';
import Velocimeter from '../assets/study-cases/edden/velocimeter.jpg';
import UserFlow from '../assets/study-cases/edden/user-flow.jpg';
import WireframesV1 from '../assets/study-cases/edden/wireframes-v1.png';
import WireframesV2 from '../assets/study-cases/edden/wireframes-v2.png';
import WireframesV3 from '../assets/study-cases/edden/wireframes-v3.png';
import WireframesV4 from '../assets/study-cases/edden/wireframes-v4.png';
import Hifi1 from '../assets/study-cases/edden/hifi1.png';
import Hifi2 from '../assets/study-cases/edden/hifi2.png';
import Hifi3 from '../assets/study-cases/edden/hifi3.png';
import Hifi4 from '../assets/study-cases/edden/hifi4.png';
import Hifi5 from '../assets/study-cases/edden/hifi5.png';
import Hifi6 from '../assets/study-cases/edden/hifi6.png';
import Hifi7 from '../assets/study-cases/edden/hifi7.png';
import Hifi8 from '../assets/study-cases/edden/hifi8.png';
import Hifi9 from '../assets/study-cases/edden/hifi9.png';
import Hifi10 from '../assets/study-cases/edden/hifi10.png';
import Hifi11 from '../assets/study-cases/edden/hifi11.png';
import Hifi12 from '../assets/study-cases/edden/hifi12.png';
import Hifi13 from '../assets/study-cases/edden/hifi13.png';
import DesignSystem from '../assets/study-cases/edden/design-system.png';
import AppWorking from '../assets/study-cases/edden/app-working.jpg';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function StudyCaseDetailEdden({ studyCase }) {
    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false
    };
    var settingsHifi = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    };
    return (
        <>
            <Header />
            <div className="study-case-detail edden-study-case">
                <div className="content">
                    <div className="section study-case-header edden"> {/* Header */}
                        <div className="section-content">
                            <h1>Design Thinking in Action: Creating a SaaS EdTech App</h1>
                            <p>A step-by-step look at how we used Design Thinking to build an intuitive and impactful SaaS application for the education sector.</p>
                        </div>
                    </div>
                    <div className="section gray-section"> {/* Intro */}
                        <div className="section-content">
                            <p>During the pandemic, virtual environments became part of daily life, and many activities that used to be mostly in-person, like teaching, had to quickly <strong>adapt to an online format</strong>. At the same time, this shift offered a glimpse into the future—a change that was bound to happen sooner or later.</p>
                            <p>Meanwhile, <strong>machine learning and artificial intelligence</strong> tools were starting to gain traction, providing cost-effective solutions for traditionally complex processes.</p>
                            <p>In this context, Edinove (name changed due to NDA agreements) decided to create Edden, a platform designed for teachers, students, and administrative staff to offer modern solutions to the challenges of this new reality.</p>
                            <div className="image-description">
                                <img src={FrustratedProfessor} className="styled-img" alt="Frustrated professor" />
                            </div>
                            <h2>The Team</h2>
                            <div className="summary-table">
                                <div className="row">
                                    <div className="col title">Client</div>
                                    <div className="col">An Ed-Tech company based in the United States called Edinove (name changed due to NDA agreement).</div>
                                </div>
                                <div className="row">
                                    <div className="col title">Team</div>
                                    <div className="col">4 Developers, 2 Testers, 1 Business Analyst, 1 Product Designer (me)</div>
                                </div>
                                <div className="row">
                                    <div className="col title">Role</div>
                                    <div className="col">UX/UI Designer</div>
                                </div>
                                <div className="row">
                                    <div className="col title">Duration</div>
                                    <div className="col">18 Months</div>
                                </div>
                                <div className="row">
                                    <div className="col title">Frontend<br />Tecnology</div>
                                    <div className="col">React</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="section"> {/* Goals */}
                        <div className="section-content">
                            <h2>Goals and Challenges</h2>
                            <p>The overall purpose of the application was to <strong>provide real-time and asynchronous metrics</strong> to teachers, students, and administrators, helping reduce the uncertainty caused by virtual learning and its lack of close human connections that everyone had been used to.</p>
                            <p>For our team, the challenge was to design and develop an application that met this goal within a one-year timeframe, using the tools available at that time (2021).</p>
                            <p>To tackle this challenge, we decided to apply the <strong>Design Thinking methodology</strong>, integrating various techniques at each stage of the process.</p>
                            <p>In this case study, we’ll focus on the first iteration, where we worked specifically with the <strong>teacher profile</strong>, as our client wanted to prioritize features for this user group.</p>
                        </div>
                    </div>
                    <div className="section"> {/* 1. Research */}
                        <div className="section-content">
                            <span>1. Research and discovery</span>
                            <h2>Understanding our Users</h2>
                            <p>We started the process by conducting <strong>interviews</strong> with teachers from universities and academic institutes. Through open-ended questions and meaningful conversations, we gained a deeper understanding of their feelings and frustrations. For example:</p>

                            <Slider {...settings} className="quote-slider">
                                <div className="quote-container">
                                    <div className="quote-layout">
                                        <div className="quote">
                                            <div className="first-qoute"><img src={QuoteIcon} alt="Quote starts" /></div>
                                            <div className="quote-content">
                                                <p>During virtual classes, I often feel emotionally disconnected from my students. I worry that I can’t build the strong relationships I used to have in in-person classes.</p>
                                                <p className="author">— High school language teacher.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quote-container">
                                    <div className="quote-layout">
                                        <div className="quote">
                                            <div className="first-qoute"><img src={QuoteIcon} alt="Quote starts" /></div>
                                            <div className="quote-content">
                                                <p>It frustrates me not to get instant visual feedback about students’ understanding or interest. Before, I just had to look at their faces, but now I have to guess or keep asking, and that takes up a lot of my time and energy.</p>
                                                <p className="author">— High school science teacher.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quote-container">
                                    <div className="quote-layout">
                                        <div className="quote">
                                            <div className="first-qoute"><img src={QuoteIcon} alt="Quote starts" /></div>
                                            <div className="quote-content">
                                                <p>“In virtual settings, it’s much harder to notice the subtle signs from students who might need extra emotional or academic support. I worry that I won’t be able to step in on time.”</p>
                                                <p className="author">— University art professor.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                            <p>We also <strong>observed</strong> several online classes from different universities to take notes on the procedures and dynamics that teachers use during their lessons.</p>

                        </div>
                    </div>
                    <div className="section gray-section"> {/* 2. Define */}
                        <div className="section-content">
                            <span>2. Define</span>
                            <h2>User Personas and Empathy Maps</h2>
                            <p>The insights we gathered during the research phase were key to understanding <strong>who our users were</strong> and what their frustrations looked like. They also helped us identify the different <strong>user profiles</strong> within our audience.</p>
                            <p>This allowed us, in later stages, to design with a clear idea of who we were creating for and to adapt our solutions to their real needs.</p>
                            <p>Here, I introduce you to Martha, perhaps the most representative of our target users:</p>
                            <img className="middle-size-img" src={UserPersona} alt="User Persona" />
                            <p>To gain deeper insight into our users’ perspectives, we created empathy maps. Below is Martha’s empathy map:</p>
                            <img className="middle-size-img" src={EmpathyMap} alt="Martha's empathy map" />
                            <h2>Problem statements</h2>
                            <p>The next step was to create problem statements to summarize which problems we were solving and for whom. Below, I share one problem identified for each user:</p>
                            <Slider {...settings} className="quote-slider">
                                <div className="quote-container">
                                    <div className="quote-layout">
                                        <div className="quote">
                                            <div className="first-qoute"><img src={QuoteIcon} alt="Quote starts" /></div>
                                            <div className="quote-content">
                                                <p>Martha <strong>is an</strong> experienced teacher with limited tech skills <strong>who needs</strong> needs a simple tool to monitor her students’ real-time attention <strong>because</strong> she currently feels frustrated and unsure about the effectiveness of her virtual classes.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quote-container">
                                    <div className="quote-layout">
                                        <div className="quote">
                                            <div className="first-qoute"><img src={QuoteIcon} alt="Quote starts" /></div>
                                            <div className="quote-content">
                                                <p>Alexander <strong>is a</strong> young teacher focused on emotional empathy <strong>who needs</strong> tools to reduce the frustration caused by virtual classes <strong>due to</strong> the lack of real eye contact with his students.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quote-container">
                                    <div className="quote-layout">
                                        <div className="quote">
                                            <div className="first-qoute"><img src={QuoteIcon} alt="Quote starts" /></div>
                                            <div className="quote-content">
                                                <p>Caroline <strong>is a</strong> tech-savvy and innovative teacher <strong>who needs</strong> a quick and visual way to identify which students need more attention during virtual classes <strong>because</strong> the current lack of immediate feedback makes it hard to personalize her teaching.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className="section"> {/* 3. Ideation */}
                        <div className="section-content">
                            <span>3. Ideation</span>
                            <h2>Time to Create</h2>
                            <p>With the information we gathered and analyzed, it became clear that what our users needed most was <strong>information</strong>.</p>
                            <p>During the ideation stage, I worked alongside analysts, developers, and the PO to come up with solutions to tackle these problems.</p>
                            <p>Our dynamic was straightforward: we met twice a week to <strong>brainstorm</strong> ideas and validate the technical feasibility of each proposal.</p>
                            <br />
                            <h2>Brainstorming and the pivot idea</h2>
                            <p>At the beginning, through brainstorming sessions, we listed all the <strong>metrics</strong> that would be useful for teachers and discussed how we could collect them. During this process, we came up with what would become the key functionality: combining different metrics and parameters into a single metric called <strong>Engagement</strong>.</p>
                            <p>This metric would be calculated by combining factors such as participation (both via chat and verbally), survey responses, connection time, emoji reactions, and more. Additionally, in a second phase, leveraging the power of machine learning, we implemented an algorithm that estimated student engagement based on their facial expressions and vocal cues.</p>
                            <div className="image-description">
                                <img src={Velocimeter} alt="Speedometer" />
                                <p className="epigraph">We were inspired by a speedometer to measure live class engagement.</p>
                            </div>
                            <h2>User Flow</h2>
                            <p>With a clear idea of the metrics we wanted to offer, it was time to define the user’s information and navigation flows.</p>
                            <p>I worked collaboratively with the team, and we agreed that teachers would have three main views: <strong>overall course</strong> metrics, metrics for a <strong>specific class</strong>, and <strong>real-time</strong> metrics for the live class (when it was in session).</p>
                            <img src={UserFlow} className="styled-img" alt="User Flow" />
                            <p className="epigraph">Last version for the user-flow for the instructor profile.</p>
                        </div>
                    </div>
                    <div className="section gray-section"> {/* 4. Prototypes */}
                        <div className="section-content">
                            <span>4. Prototypes</span>
                            <h2>Bringing Ideas to Life</h2>
                            <p>We had already defined the solution we wanted to build. The next step was to <strong>shape it</strong> and validate it with the people who matter most: its future users.</p>
                            <p>We started with <strong>wireframes</strong>, organizing and structuring the information. We ran multiple tests and iterations until we arrived at the proposal that worked best.</p>
                        </div>
                    </div>
                    <div className="section gray-section"> {/* Prototypes sliders */}
                        <div className="section-content">
                            <h2>Live Class Wireframes Evolution</h2>
                            <br />
                            <Slider {...settingsHifi} className="hifi-slider">
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={WireframesV1} className="styled-img" alt="Wireframes v1" />
                                        <p className="epigraph">Version 1</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={WireframesV2} className="styled-img" alt="Wireframes v2" />
                                        <p className="epigraph">Version 2</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={WireframesV3} className="styled-img" alt="Wireframes v3" />
                                        <p className="epigraph">Version 3</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={WireframesV4} className="styled-img" alt="Wireframes v4" />
                                        <p className="epigraph">Final version</p>
                                    </div>
                                </div>

                            </Slider>
                            <p>The wireframes allowed us to quickly iterate on the structure of the interface. Once the usability decisions were validated, we moved on to high-fidelity prototypes to analyze the final experience before starting development:</p>
                            <br />
                            <Slider {...settingsHifi} className="hifi-slider">
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi1} alt="High-fidelity prototype 1" />
                                        <p className="epigraph">Login Page</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi2} alt="High-fidelity prototype 2" />
                                        <p className="epigraph">Courses List Page (Dark Mode)</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi3} alt="High-fidelity prototype 3" />
                                        <p className="epigraph">Course Metrics Page</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi4} alt="High-fidelity prototype 4" />
                                        <p className="epigraph">Synchronous Engagement Detail</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi6} alt="High-fidelity prototype 6" />
                                        <p className="epigraph">Course Page, Students Table</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi7} alt="High-fidelity prototype 7" />
                                        <p className="epigraph">Class Metrics Page (Dark Mode)</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi8} alt="High-fidelity prototype 8" />
                                        <p className="epigraph">Synchronous Engagement Detail (Dark Mode)</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi10} alt="High-fidelity prototype 10" />
                                        <p className="epigraph">Real Time Metrics Page</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi11} alt="High-fidelity prototype 11" />
                                        <p className="epigraph">Real Time Students Metrics Page</p>
                                    </div>
                                </div>
                            </Slider>
                            <p>The interface is fully responsive; here’s how it looks on mobile devices.</p>
                            <Slider {...settingsHifi} className="hifi-slider">
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi5} alt="High-fidelity prototype 5" />
                                        <p className="epigraph">Course Metrics Page, Mobile Version</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi9} alt="High-fidelity prototype 9" />
                                        <p className="epigraph">Class Metrics Page, Mobile Version (Dark Mode)</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi12} alt="High-fidelity prototype 12" />
                                        <p className="epigraph">Real Time Metrics Page, Mobile Version (Dark Mode)</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Hifi13} alt="High-fidelity prototype 13" />
                                        <p className="epigraph">Real Time Students Metrics Page Page, Mobile Version (Dark Mode)</p>
                                    </div>
                                </div>
                            </Slider>
                            <p>On the other hand, we created a <strong>Design System</strong> to ensure the app’s scalability and to optimize time and resources through component reuse.</p>
                            <div>
                                <img src={DesignSystem} alt="Design System" />
                                <p className="epigraph">Here are some components of the Design System we created for this project</p>
                            </div>
                        </div>
                    </div>
                    <div className="section"> {/* 5. Test */}
                        <div className="section-content">
                            <span>5. Testing</span>
                            <h2>Validating the Impact</h2>
                            <p>The testing phase was carried out mostly <strong>in parallel</strong> with prototyping. We worked with 5 teachers from the client’s staff, which allowed us to refine and <strong>iterate</strong> the designs until we achieved polished interfaces.</p>
                            <p>With the app running in a pilot group of around 40 users, we conducted a survey that, along with positive feedback on the Synchronous Engagement metric, provided us with the following results:</p>
                            <div className="metrics-container">
                                <div className="metric-col">
                                    <div className="metric">
                                        <h3>9.1</h3>
                                        <p>NPS Score</p>
                                    </div>
                                </div>
                                <div className="metric-col">
                                    <div className="metric">
                                        <h3>87%</h3>
                                        <p>of teachers felt their<br />online teaching improved</p>
                                    </div>
                                </div>
                                <div className="metric-col">
                                    <div className="metric">
                                        <h3>79%</h3>
                                        <p>annual subscription<br />renewal rate</p>
                                    </div>
                                </div>
                            </div>
                            <div className="image-description">
                                <img src={AppWorking} className="styled-img" alt="App working" />
                            </div>
                        </div>
                    </div>
                    <div className="section gray-section"> {/* Conclusion */}
                        <div className="section-content">
                            <span>Conclusion and key takeaways</span>
                            <h2>What we Learned</h2>
                            <p>Applying Design Thinking doesn't mean following a rigid structure. On the contrary, it's a methodology that allows for <strong>flexibility and adaptation</strong> based on the project's context. In our case, we blended phases like Testing with Prototyping, and even Definition with Prototyping. When time allows, it’s even more valuable to move back and forth between stages to refine the details.</p>
                            <p>Another important takeaway (or rather, a confirmation) was the value of working with <strong>real users</strong> and consulting them actively. This helps us move away from biases and assumptions, and truly embrace user-centered design.</p>
                            <p>Finally, the experience of having the <strong>entire team</strong> contribute with ideas, feedback, and perspectives was incredibly enriching. It helped us stay open-minded, improve decision-making, and deliver a much stronger product.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudyCaseDetailEdden;