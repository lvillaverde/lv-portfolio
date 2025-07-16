import "./css/StudyCase.css";
import NextchangeThumbnail from "../assets/study-cases/nextchange/thumbnail.png";
import EddenThumbnail from "../assets/study-cases/edden/thumbnail.jpg";
import MeSirveThumbnail from "../assets/study-cases/mesirve/thumbnail.png";

// Array con la información de 3 study cases
const studyCases = [
        {
        image: {
            src: MeSirveThumbnail,
            alt: "Study Case 3"
        },
        title: "From Hypothesis to Product: A Lean UX Journey in the Argentine Market",
        tags: ["Mobile", "Lean UX", "Brand Design"],
        description: "How we created Me Sirve, an app designed for the Argentine market that connects local shops and buyers with nearby deals.",
        buttonText: "View More",
        url: '/From-Hypothesis-to-Product-A-Lean-UX-Journey-in-the-Argentine-Market'
    },
    {
        image: {
            src: NextchangeThumbnail,
            alt: "Study Case 1"
        },
        title: "One Month, Big Changes: UX, UI and Design System Optimization",
        tags: ["User Testing", "Design System", "Prototyping"],
        description: "A look into the process behind redesigning an existing interface, where in just one month we optimized usability, improved the visual language, and adapted an existing Design System to meet new needs.",
        buttonText: "View More",
        url: '/One-Month-Big-Changes-Ux-Ui-And-Design-System'
    },
    {
        image: {
            src: EddenThumbnail,
            alt: "Design Thinking in Action: Creating a SaaS EdTech App"
        },
        title: "Design Thinking in Action: Creating a SaaS EdTech App",
        tags: ["Design Thinking", "Research", "UI Design"],
        description: "A step-by-step look at how we used Design Thinking to build an intuitive and impactful SaaS application for the education sector.",
        buttonText: "View More",
        url: '/Design-Thinking-in-Action-Creating-a-SaaS-EdTech-App'
    }
];

function StudyCase() {
    return (
        <div className="study-cases-list">
            {studyCases.map((studyCaseData, idx) => (
                <div className="study-case" key={idx}>
                    <img src={studyCaseData.image.src} alt={studyCaseData.image.alt} />
                    <div className="description">
                        <h4>{studyCaseData.title}</h4>
                        <div className="tags">
                            {studyCaseData.tags.map((tag, tagIdx) => (
                                <span className="tag" key={tagIdx}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p>{studyCaseData.description}</p>
                        <a href={studyCaseData.url} className="btn">{studyCaseData.buttonText}</a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StudyCase;