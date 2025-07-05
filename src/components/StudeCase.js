import "./css/StudyCase.css";
import NextchangeThumbnail from "../assets/study-cases/nextchange/thumbnail.png";

// Array con la información de 3 study cases
const studyCases = [
    {
        image: {
            src: NextchangeThumbnail,
            alt: "Study Case 1"
        },
        title: "One Month, Big Changes: UX, UI and Design System Optimization",
        tags: ["UX Research", "Design System", "Prototyping"],
        description: "A look into the process behind redesigning an existing interface, where in just one month we optimized usability, improved the visual language, and adapted an existing Design System to meet new needs.",
        buttonText: "View More",
        url: '/study-case/one-month-big-changes-ux-ui-and-design-system'
    },
    {
        image: {
            src: "https://via.placeholder.com/150x150.png?text=Case+2",
            alt: "Study Case 2"
        },
        title: "E-commerce Redesign: Conversion & Accessibility",
        tags: ["UI Design", "Accessibility", "A/B Testing"],
        description: "Redesign of an e-commerce platform focused on increasing conversion rates and improving accessibility for all users.",
        buttonText: "See Details",
        url: '/study-case/one-month-big-changes-ux-ui-and-design-system'
    },
    {
        image: {
            src: "https://via.placeholder.com/150x150.png?text=Case+3",
            alt: "Study Case 3"
        },
        title: "Mobile App: Onboarding Experience Overhaul",
        tags: ["Mobile UX", "User Onboarding", "Animation"],
        description: "Revamped the onboarding flow of a mobile app, using animation and micro-interactions to boost user retention.",
        buttonText: "Explore",
        url: '/study-case/one-month-big-changes-ux-ui-and-design-system'
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