import './css/StudyCaseDetail.css';

/* import QuoteIcon from '../assets/icons/quote.svg'; */
import LeanUXFLow from '../assets/study-cases/mesirve/lean-ux-flow.svg';
import LeanUXCanvas from '../assets/study-cases/mesirve/ux-lean-canvas.png';
import Wireframes1 from '../assets/study-cases/mesirve/wireframes-1.png';
import Wireframes2 from '../assets/study-cases/mesirve/wireframes-2.png';
import Wireframes3 from '../assets/study-cases/mesirve/wireframes-3.png';
import Wireframes4 from '../assets/study-cases/mesirve/wireframes-4.png';
import Wireframes5 from '../assets/study-cases/mesirve/wireframes-5.png';
import Wireframes6 from '../assets/study-cases/mesirve/wireframes-6.png';
import Moodboard from '../assets/study-cases/mesirve/moodboard.png';
import BrandMascot from '../assets/study-cases/mesirve/brand-mascot.png';
import Shopper1 from '../assets/study-cases/mesirve/shopper-1.png';
import Shopper2 from '../assets/study-cases/mesirve/shopper-2.png';
import Shopper3 from '../assets/study-cases/mesirve/shopper-3.png';
import Shopper4 from '../assets/study-cases/mesirve/shopper-4.png';
import Shopper5 from '../assets/study-cases/mesirve/shopper-5.png';
import Shopper6 from '../assets/study-cases/mesirve/shopper-6.png';
import Shopper7 from '../assets/study-cases/mesirve/shopper-7.png';
import Shop1 from '../assets/study-cases/mesirve/shop-1.png';
import Shop2 from '../assets/study-cases/mesirve/shop-2.png';
import Shop3 from '../assets/study-cases/mesirve/shop-3.png';
import Shop4 from '../assets/study-cases/mesirve/shop-4.png';
import Shop5 from '../assets/study-cases/mesirve/shop-5.png';
import Shop6 from '../assets/study-cases/mesirve/shop-6.png';
import QuoteIcon from '../assets/icons/quote.svg';
import Header from './Header';
import Footer from './Footer';
import MoreStudyCases from './MoreStudyCases';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function StudyCaseDetailMeSirve({ studyCase }) {
    useEffect(() => {
        gsap.fromTo(
            ".study-case-detail",
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );

        gsap.utils.toArray(".section").forEach((section) => {
            if (!section.classList.contains("study-case-header")) {
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        });
    }, []);

    var settingsHifi = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <>
            <Header />
            <div className="study-case-detail edden-study-case">
                <div className="content">
                    <div className="section study-case-header mesirve"> {/* Header */}
                        <div className="section-content">
                            <h1>From Hypothesis to Product: A Lean UX Journey in the Argentine Market</h1>
                            <p>How we created Me Sirve (Spanish for 'it works for me' or 'it's worth it'), an app designed for the Argentine market that connects local shops and buyers with nearby deals.</p>
                        </div>
                    </div>
                    <div className="section gray-section"> {/* Intro */}
                        <div className="section-content">
                            <p>Argentina is a country with an unstable economy, shaped by decades of recurring crises that have deeply impacted people’s purchasing power. In this scenario, many have learned to make the most of their daily shopping, constantly looking for <strong>ways to save or invest</strong> more wisely.</p>
                            <p>It’s common for shoppers to visit multiple stores to find specific deals — a process that takes time, energy, and planning.</p>
                            <p>In response to this, a group of friends and former collaborators and I set out to create an app that makes it easier for people to discover local store promotions. Our goal was twofold: to help everyday shoppers <strong>save time and money</strong>, and to support small businesses in promoting their deals more effectively — and for free.</p>
                            <h2>The Team</h2>
                            <div className="summary-table">
                                <div className="row">
                                    <div className="col title">Team</div>
                                    <div className="col">2 Developers, 1 Tester, 1 Business Analyst, 1 Product Designer (me)</div>
                                </div>
                                <div className="row">
                                    <div className="col title">Role</div>
                                    <div className="col">Product Designer</div>
                                </div>
                                <div className="row">
                                    <div className="col title">Duration</div>
                                    <div className="col">6 Months</div>
                                </div>
                                <div className="row">
                                    <div className="col title">Frontend<br />Tecnology</div>
                                    <div className="col">Flutter</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="section"> {/* Methodology */}
                        <div className="section-content">
                            <h2>Methodology</h2>
                            <p>In this case, knowing that we had no time to waste and wanted to move forward as quickly as possible, I chose <strong>Lean UX</strong> as the product design methodology. This approach focuses on creating real value for users, prioritizing the product itself over documentation.</p>
                            <p>In short, the process involves forming hypotheses, building an MVP, gathering feedback, measuring success or failure, and iterating. This way, the product is built on a solid foundation, with each feature tested and validated along the way.</p>
                            <img src={LeanUXFLow} alt="Lean UX Flow" className="lean-ux-flow" />
                        </div>
                    </div>
                    <div className="section"> {/* 1. Think */}
                        <div className="section-content">
                            <span>1. Think</span>
                            <h2>Thinking as team</h2>
                            <p>To kick things off, we ran a workshop where we created a Lean UX Canvas. This tool allowed us to quickly map out key hypotheses and define the most important areas of the product. It was essential to <strong>align</strong> everyone’s ideas, assumptions, and perspectives from the very beginning.</p>
                            <a href="https://www.figma.com/board/6pG9nf4V7TyrbjBcmovI68/Me-Sirve-Lean-UX-Canvas?node-id=0-1&t=4Hr9fBpeEaNRZopC-1" target="_blank" rel="noopener noreferrer">
                                <img src={LeanUXCanvas} alt="Lean UX Canvas" className="lean-ux-canvas" />
                            </a>
                            <p>We agreed to conduct a few interviews with local shop owners in Bariloche (Río Negro, Argentina)—where one of our team members lives—as well as with people from our personal networks, to better understand their perspective on the type of app we were envisioning.</p>
                            <p>The feedback was positive: most shop owners liked the idea of <strong>a free tool to help promote their deals</strong>, as they often struggle to compete with large supermarket chains. On the other hand, potential “buyer” users told us they frequently find out about deals too late—so they felt this app could be <strong>genuinely useful</strong>.</p>

                        </div>
                    </div>
                    <div className="section gray-section"> {/* 2. Make */}
                        <div className="section-content">
                            <span>2. Make</span>
                            <h2>Building the MVP</h2>
                            <p>After the initial analysis, we concluded that we needed to develop two separate apps: one for merchants to <strong>upload their deals</strong>, and another —the main one— for users to <strong>easily discover</strong> those offers.</p>
                            <p>With that definition in place, we kicked off the interface design process.</p>
                            <br />
                            <h2>First Steps with the Interface</h2>
                            <p>The first step was to design <strong>wireframes</strong> for each section of the apps. We worked together as a team to review and refine them until we reached a version that gave us a clear first look at what our app could become.</p>
                            <Slider {...settingsHifi} className="hifi-slider">
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Wireframes1} className="styled-img" alt="Wireframes v1" />
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Wireframes2} className="styled-img" alt="Wireframes v2" />
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Wireframes3} className="styled-img" alt="Wireframes v3" />
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Wireframes4} className="styled-img" alt="Wireframes v4" />
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Wireframes5} className="styled-img" alt="Wireframes v4" />
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Wireframes6} className="styled-img" alt="Wireframes v4" />
                                    </div>
                                </div>
                            </Slider>
                            <p>Next, we quickly moved on to building a <strong>moodboard</strong> to inspire the visual style we wanted for the app. We gathered screenshots and images showcasing color palettes, typography, layouts, icons, and other visual elements to help us shape a unique and consistent identity.</p>
                            <img src={Moodboard} alt="Moodboard" className="styled-img middle-size-img" />
                            <p>Since this is our own product, I took charge of the <strong>brand design</strong>. The logo is inspired by the typefaces commonly used in Argentine street markets—giving it a bold, informal, and approachable vibe. Along with defining the color palette and typography, I also created a mascot we named “Tuki” 🙂.</p>
                            <img src={BrandMascot} alt="Brand Mascot" className="styled-img middle-size-img" />
                            <p>We then moved on to the <strong>high-fidelity design</strong> of the screens for both apps, building on the wireframes we had previously created. During this phase, we added visual details, fine-tuned components, and made the first round of adjustments to bring the product closer to its final form.</p>

                            <h2>Shoppers App</h2>
                            <Slider {...settingsHifi} className="hifi-slider mesirve-slider">
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shopper1} alt="Login Page Screen" />
                                        <p className="epigraph">Login Page</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shopper2} alt="Home Page Screen" />
                                        <p className="epigraph">Main screen showcasing different types of deals</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shopper3} alt="Saved Deals Page" />
                                        <p className="epigraph">Saved Deals Page</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shopper4} alt="Explore Page" />
                                        <p className="epigraph">Explore screen displaying your location and local shops offering deals</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shopper5} alt="Shop Deals" />
                                        <p className="epigraph">Tapping a map marker shows the deals available at that store</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shopper6} alt="Deal Detail" />
                                        <p className="epigraph">Detailed view of the selected deal</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shopper7} alt="Settings Page" />
                                        <p className="epigraph">Settings page</p>
                                    </div>
                                </div>
                            </Slider>
                            <h2>Store Owner App</h2>
                            <Slider {...settingsHifi} className="hifi-slider mesirve-slider">
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shop1} alt="Login Page Screen" />
                                        <p className="epigraph">Login Page</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shop2} alt="Home Page Screen" />
                                        <p className="epigraph">Store Owner Dashboard</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shop3} alt="Legal Name Empty State" />
                                        <p className="epigraph">Legal Name Empty State</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shop4} alt="Branches Empty State" />
                                        <p className="epigraph">Branches Empty State</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shop5} alt="Deals Empty State" />
                                        <p className="epigraph">Deals Empty State</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="hifi-slider-container">
                                        <img src={Shop6} alt="Deals dashboard" />
                                        <p className="epigraph">Deals dashboard</p>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className="section"> {/* 3. Check */}
                        <div className="section-content">
                            <span>3. Check</span>
                            <h2>Rolling Out the First Version</h2>
                            <p>The app has already been developed and we’re currently in the <strong>implementation phase</strong>. We faced a few infrastructure challenges along the way, but we expect to begin our first testing phase by August 2025.</p>
                            <p>For this initial rollout, we’ll focus on Bariloche (Río Negro, Argentina), where we’ve already partnered with 20 local stores. These special partners will provide us with <strong>valuable insights</strong> into how they use the app in real-life scenarios and how they present it to their customers. In return, they'll receive exclusive benefits once we move to a paid or subscription-based model.</p>
                            <p>We also have a sales team that will visit local shops to introduce the app and invite them to join the platform.</p>
                            <p>Once we have a good number of deals available, we’ll launch a small social media campaign targeting the same area to boost awareness and user acquisition. In this phase, we’ll closely monitor the following metrics:</p>
                            <ul className="content-list">
                                <li>Download rate</li>
                                <li>Number of published products</li>
                                <li>Percentage of saved deals</li>
                                <li>Ratings and reviews</li>
                                <li>Direct feedback from shop owners</li>
                            </ul>
                        </div>
                    </div>
                    <div className="section gray-section"> {/* 4. Learn and repeat */}
                        <div className="section-content">
                            <span>4. Learn and repeat</span>
                            <h2>Bringing Ideas to Life</h2>
                            <p>We’re excited to start gathering real-world feedback to keep improving the app with each iteration. Our goal is to <strong>refine the experience</strong> and make it increasingly useful and valuable. And if the results don’t meet expectations, we’re ready to revisit our assumptions and adapt—whether it’s the app itself or our mindset—so we can move forward with greater clarity.</p>
                            <div className="quote-container">
                                <div className="quote-layout">
                                    <div className="quote">
                                        <div className="first-qoute"><img src={QuoteIcon} alt="Quote starts" /></div>
                                        <div className="quote-content">
                                            <p>Fail fast, learn faster.</p>
                                            <br />
                                            <p className="author">— Jared Spool</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section"> {/* Conclusion */}
                        <div className="section-content">
                            <h2>Conclusion</h2>
                            <br />
                            <p>Lean UX proved to be the perfect methodology for <strong>moving fast</strong> while staying focused. It fit seamlessly with our Agile team, where developers and testers were ready to iterate quickly. Although I had used this approach in previous projects, revisiting tools like the Lean UX Canvas reminded me of their real value—something often underestimated.</p>
                            <p>Working on a product that I co-own brought an entirely different level of responsibility. Every decision required extra care, and the challenge went beyond design—it tested my technical skills, persistence, product vision, and creativity.</p>
                            <p><strong>Stay tuned for more updates!</strong></p>
                        </div>
                    </div>
                    <div className="section"> {/* More Study Cases */}
                        <div className="section-content">
                            <h2>More Study Cases</h2>
                            <MoreStudyCases currentCaseId="mesirve" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default StudyCaseDetailMeSirve;