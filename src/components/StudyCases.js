import "./css/StudyCases.css";
import StudyCase from "./StudeCase";

function StudyCases() {
    return (
        <div className="study-cases base-section">
            <div className="content">
                <h3>Study Cases</h3>
                <StudyCase />
                <StudyCase />
                <StudyCase />
            </div>
        </div>
    );
}

export default StudyCases;