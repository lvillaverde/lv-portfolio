import './css/StudyCaseDetail.css';
import BeforeScreens from '../assets/study-cases/nextchange/before-screens.png'
import DashboardsDrafs from '../assets/study-cases/nextchange/dashboard-drafts.jpg';
import MapsDrafs from '../assets/study-cases/nextchange/map-draft.jpg';
import AlertsDrafs from '../assets/study-cases/nextchange/notification-wireframe.jpg';
import DashboardBefore from '../assets/study-cases/nextchange/dashboard-before.png';
import DashboardAfter from '../assets/study-cases/nextchange/dashboard-after.png';
import MapBefore from '../assets/study-cases/nextchange/map.jpg';
import MapAfter from '../assets/study-cases/nextchange/map-after.png';
import AlertsBefore from '../assets/study-cases/nextchange/alerts-before.png';
import AlertsAfter from '../assets/study-cases/nextchange/alerts-after.png';
import Footer from './Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function StudyCaseDetailNextchange({ studyCase }) {
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  };
  return (
    <>
      <div className="study-case-detail">
        <div className="content">
          <div className="section study-case-header"> {/* Header */}
            <div className="section-content">
              <h1>One Month, Big Changes: UX, UI and Design System Optimization</h1>
              <p>A look into the process behind redesigning an existing interface, where in just one month we optimized usability, improved the visual language, and adapted an existing Design System to meet new needs.</p>
            </div>
          </div>
          <div className="section gray-section"> {/* Intro */}
            <div className="section-content">
              <p>The app had been built without a designer, and it showed—every screen felt a bit different. So we stepped in and adapted a <strong>Design System</strong> to bring order and style to the interface. <strong>Quick research</strong> helped us identify areas we could improve.</p>
              <div className="summary-table">
                <div className="row">
                  <div className="col title">Client</div>
                  <div className="col">An energy infrastructure company based in the United States called NextChange (name changed due to NDA agreement).</div>
                </div>
                <div className="row">
                  <div className="col title">Team</div>
                  <div className="col">3 Developers, 1 Tester, 2 Product Designers</div>
                </div>
                <div className="row">
                  <div className="col title">Role</div>
                  <div className="col">Product Designer</div>
                </div>
                <div className="row">
                  <div className="col title">Duration</div>
                  <div className="col">4 weeks</div>
                </div>
                <div className="row">
                  <div className="col title">Frontend<br />Tecnology</div>
                  <div className="col">Blazor</div>
                </div>

              </div>
            </div>
          </div>
          <div className="section"> {/* The client */}
            <div className="section-content">
              <span>Context</span>
              <h2>The client and the system</h2>
              <p>NextChange is a company in the energy infrastructure field. They offer products like power lines, solar panels, wind turbines, and manage several apps used both internally and by clients.</p>
              <p>As part of their innovation process, they decided to build an app that sends <strong>real-time weather alerts in specific areas</strong>, helping them take preventive action before extreme conditions damage their infrastructure. This app was named NextChange.</p>
              <p>To build the MVP, they put together a team of developers and testers to validate the idea before scaling it up with more features.</p>
              <p>By the time development was about <strong>75% complete</strong>, it became clear that the UI and overall experience needed a specialist—someone to bring <strong>visual consistency</strong> to the components and improve some of the less intuitive flows. That’s when I joined the team.</p>
            </div>
          </div>
          <div className="section"> {/* The system */}
            <div className="section-content">
              <h2>Goals and challenges</h2>
              <p>In the first meetings, the client was upfront: consistency between components and user flows hadn’t been a focus during development. Buttons, for example, varied in style and color across screens, and the overall look felt <strong>“cold and unappealing,”</strong> in their own words.</p>
              <p>Given that, the goals were clear: first, to create a Design System that brought visual harmony to the product; and second, to improve the app’s usability.</p>
              <p><strong>The main challenge? Time.</strong> Due to budget constraints, I was brought in for just 4 weeks, so we had to keep the process short and focused.</p>
              <p>Fortunately, there was a good starting point—the interface had been built using the MudBlazor component library, which meant we could work on top of an existing structure instead of building everything from scratch.</p>
              <img src={BeforeScreens} alt="The app looks like this." />
            </div>
          </div>
          <div className="section gray-section"> {/* Roadmap */}
            <div className="section-content">
              <span>Planning</span>
              <h2>The roadmap</h2>
              <p>To make the most of the 4-week timeframe, we created a weekly roadmap with clear milestones and a structured, fast-paced approach.</p>
              <div className="summary-table">
                <div className="row">
                  <div className="col title">Week 1</div>
                  <div className="col">
                    <ul>
                      <li>Run user tests on the existing app.</li>
                      <li>Conduct a heuristic evaluation to identify areas for improvement.</li>
                      <li>Review brand guidelines and create initial component sketches.</li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col title">Week 2</div>
                  <div className="col">
                    <ul>
                      <li>Build the first part of the Design System (visual and interaction foundations).</li>
                      <li>Validate the foundations with the client.</li>
                      <li>Design wireframes with the proposed UI changes and get team feedback.</li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col title">Week 3</div>
                  <div className="col">
                    <ul>
                      <li>Create the second part of the Design System.</li>
                      <li>Start designing high-fidelity prototypes.</li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col title">Week 4</div>
                  <div className="col">
                    <ul>
                      <li>Finalize the high-fidelity prototypes.</li>
                      <li>Iterate and refine based on feedback.</li>
                      <li>Final delivery.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p>Being a two-designers team allowed us to split tasks and move forward in parallel. We held daily check-ins to stay aligned and give each other constant feedback.</p>
            </div>
          </div>
          <div className="section"> {/* Research */}
            <div className="section-content">
              <span>Research</span>
              <h2>User testing</h2>
              <p>Since the product was nearly finished, we had enough working material to <strong>quickly run usability tests</strong>. Given the time constraints, we invited 4 people to participate in the sessions.</p>
              <p>Our main goal was to identify issues related to navigation, information clarity, and overall system use.</p>
              <p>After the sessions, we were able to spot several pain points and collect valuable suggestions directly from users. We focused mainly on the two core features of the app: the dashboard and the maps.</p>
            </div>
          </div>
          <div className="section postits"> {/* Postits */}
            <div className="section-content">
              <div className="column-grid-2">
                <div className="col">
                  <h2>Dashboard Section</h2>
                  <div className="info-grid">
                    <Slider {...settings} className="problem-solution-slider">
                      <div className="card">
                        <div className="problem">
                          <div className="problem-content">
                            <h3>Problem</h3>
                            <p>The interface shows how many locations are affected, but it doesn’t allow users to see which ones directly. To find out, they have to explore another module, like the “Map” section.</p>
                          </div>
                        </div>
                        <div className="solution">
                          <h3>Solution</h3>
                          <p>Add a “View locations” button or display a dropdown with the names of the affected locations directly within each card. This would allow users to access key information without having to switch modules.</p>
                        </div>
                      </div>
                      <div className="card">
                        <div className="problem">
                          <div className="problem-content">
                            <h3>Problem</h3>
                            <p>All the panels use the same color, which makes it hard to visually prioritize. It’s not immediately clear which day has the highest risk level.</p>
                          </div>
                        </div>
                        <div className="solution">
                          <h3>Solution</h3>
                          <p>Use color codes (red, orange, yellow) on the card borders or icons to represent each day’s overall risk level. This would help users quickly identify priorities at a glance.</p>
                        </div>
                      </div>
                      <div className="card">
                        <div className="problem">
                          <div className="problem-content">
                            <h3>Problem</h3>
                            <p>Users don’t understand what triggers an “Elevated Alert” or “High Alert.” There’s no context about the conditions behind it.</p>
                          </div>
                        </div>
                        <div className="solution">
                          <h3>Solution</h3>
                          <p>Add an option to view the specific conditions or rules that trigger each type of alert. This would help users interpret the risk more accurately and calibrate settings as needed.</p>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
                <div className="col padding-top">
                  <h2>Maps Section</h2>
                  <div className="info-grid">
                    <Slider {...settings} className="problem-solution-slider">
                      <div className="card">
                        <div className="problem">
                          <div className="problem-content">
                            <h3>Problem</h3>
                            <p>Red and yellow points, as well as lines on the map, lack a clear legend explaining their meaning. It’s unclear whether they indicate fire intensity, alert level, wind direction, or something else.</p>
                          </div>
                        </div>
                        <div className="solution">
                          <h3>Solution</h3>
                          <p>Add a floating or side legend—ideally interactive—to help users quickly interpret the colors and symbols shown on the map.</p>
                        </div>
                      </div>
                      <div className="card">
                        <div className="problem">
                          <div className="problem-content">
                            <h3>Problem</h3>
                            <p>While city names are visible on the map, there’s no way to directly search for a specific location or facility. This can slow down access to critical areas.</p>
                          </div>
                        </div>
                        <div className="solution">
                          <h3>Solution</h3>
                          <p>Add a search bar that allows users to look up locations by name, coordinates, or key infrastructure (e.g., a substation). This would speed up navigation within the map.</p>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="section"> {/* Heuristics */}
            <div className="section-content">
              <p>Also, we carried out a <strong>heuristic evaluation</strong> using Nielsen’s 10 heuristics. The results gave us valuable insights, some of which matched what we discovered during the usability tests.</p>
            </div>
          </div>
          <div className="section postits"> {/* Postits */}
            <div className="section-content">
              <div className="column-grid-2">
                <div className="col">
                  <div className="info-grid">
                    <Slider {...settings} className="problem-solution-slider">
                      <div className="card">
                        <div className="problem">
                          <div className="problem-content">
                            <h3>Problem</h3>
                            <p>On the map view, some icons—such as those for alerts and weather conditions—aren’t clearly defined or explained, making them hard to interpret.</p>
                          </div>
                        </div>
                        <div className="solution">
                          <h3>Solution</h3>
                          <p>Add legends or tooltips that clearly indicate what each icon represents.</p>
                        </div>
                      </div>
                      <div className="card">
                        <div className="problem">
                          <div className="problem-content">
                            <h3>Problem</h3>
                            <p>Information is presented in visually similar blocks without clear differentiation, which can lead to cognitive overload for users.</p>
                          </div>
                        </div>
                        <div className="solution">
                          <h3>Solution</h3>
                          <p>Use subtle variations in text size, font weight, and color to establish clear visual hierarchies and make content easier to scan.</p>
                        </div>
                      </div>
                      <div className="card">
                        <div className="problem">
                          <div className="problem-content">
                            <h3>Problem</h3>
                            <p>The items in the side menu aren’t grouped intuitively by function, making navigation more difficult.</p>
                          </div>
                        </div>
                        <div className="solution">
                          <h3>Solution</h3>
                          <p>Add headings or visual separators to group related options and improve the menu’s overall structure and clarity</p>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="section gray-section"> {/* Prototypes */}
            <div className="section-content">
              <span>Prototyping</span>
              <h2>Let’s roll up our sleeves!</h2>
              <p>With all the insights gathered, we had enough feedback to start improving the interface.</p>
              <p>On one hand, we began exploring visual references to guide us while customizing the MudBlazor components. Using the Design System variables, we applied the brand’s colors and typography to give the interface a look and feel aligned with its identity.</p>
              <p>At the same time, we started <strong>sketching</strong> out improvements based on the issues we had identified. We created several <strong>drafts</strong>, validating each one with the client, which allowed us to iterate quickly and narrow down the best solutions to move forward with.</p>
            </div>
          </div>
          <div className="section gray-section"> {/* Drafts */}
            <div className="section-content">
              <Slider {...settings} className="drafts-slider">
                <div>
                  <h2>Dashboard Section</h2>
                  <img src={DashboardsDrafs} alt="Drafts of the dashboard" />
                </div>
                <div>
                  <h2>Maps Section</h2>
                  <img src={MapsDrafs} alt="Drafts of the dashboard" />
                </div>
                <div>
                  <h2>Alerts Cration</h2>
                  <img src={AlertsDrafs} alt="Drafts of the dashboard" />
                </div>
              </Slider>
            </div>
          </div>
          <div className="section"> {/* Before and after */}
            <div className="section-content">
              <p>Once we felt the sketches were in a good place, we ran a few tests with the new UI proposal. In this stage, we used <strong>Figma</strong> and opened comment threads directly with the client, which allowed us to quickly refine the design through collaborative feedback.</p>
              <p>After finalizing those adjustments, we focused on creating a smooth <strong>handoff</strong> to make implementation as efficient as possible. We structured all the screens using <strong>auto-layout</strong>, integrated components from the customized MudBlazor Design System, and created <strong>custom components</strong> where needed.</p>
              <p>You can check out the final result in the Figma files:</p>
              <ul className="content-list">
                <li><a href="https://www.figma.com/design/Od5cJ0PrWgrOv0kvYU66xI/NetxChange---Design-System?node-id=9019-4064&t=KzuRTwItovq4mvAN-1" target="_blank" rel="noreferrer">Link to the Design System</a></li>
                <li><a href="https://www.figma.com/design/gvGN5wEvs7lyOApb31h2qa/NextChange?node-id=11-4013&t=R8IQnFq7wx9fL2S4-1" target="_blank" rel="noreferrer">Link to the App Design</a></li>
                <li><a href="https://www.figma.com/proto/gvGN5wEvs7lyOApb31h2qa/NextChange?page-id=11%3A4013&node-id=68-4824&viewport=727%2C2716%2C0.16&t=IJeEZfduEHMLSg7i-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=68%3A4824" rel="noreferrer">Link to the Interactive Prototype</a></li>
              </ul>
              <p>Below, you’ll also find a few mockups showcasing the final design.</p>
              <Slider {...settings} className="before-after-slider">
                <div>
                  <img src={DashboardBefore} alt="Dashboard Before" />
                  <p className="epigraph">Dashboard Screen Before</p>
                </div>
                <div>
                  <img src={DashboardAfter} alt="Dashboard After" />
                  <p className="epigraph">Dashboard Screen After</p>
                </div>
                <div>
                  <img src={MapBefore} alt="Maps Before" />
                  <p className="epigraph">Maps Screen Before</p>
                </div>
                <div>
                  <img src={MapAfter} alt="Maps After" />
                  <p className="epigraph">Maps Screen After</p>
                </div>
                <div>
                  <img src={AlertsBefore} alt="Alerts Before" />
                  <p className="epigraph">Alerts Screen Before</p>
                </div>
                <div>
                  <img src={AlertsAfter} alt="Alerts After" />
                  <p className="epigraph">Alerts Screen After</p>
                </div>
              </Slider>
              <p>That marked the end of my involvement in the project—with a very happy client and a result we were all proud of, especially considering the short timeframe.</p>
            </div>
          </div>
          <div className="section gray-section"> {/* Conclusion */}
            <div className="section-content">
              <span>Conclusion</span>
              <h2>Key learnings</h2>
              <p><strong>Staying organized</strong> is crucial—especially when time is tight. Planning ahead and breaking down tasks strategically allowed us to move forward knowing exactly how much time we had for each step.</p>
              <p>Constant <strong>communication</strong> with both the team and the client was another key factor. Our daily meetings kept everyone aligned, and the client’s commitment to providing almost instant feedback helped the process flow smoothly.</p>
              <p>Lastly, one of the biggest lessons in projects like this: <strong>flexibility</strong>. Knowing when to focus, prioritize, and use only the essential tools to deliver a project on time and within budget is an invaluable skill when resources are limited.</p>
              <p>That’s how I wrapped up my involvement in this project—with a very happy client and a strong result delivered in record time.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StudyCaseDetailNextchange;