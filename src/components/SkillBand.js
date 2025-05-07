import "./css/SkillBand.css";
import backImg1 from "../assets/skill-bands/backImg1.svg";
import midImg1 from "../assets/skill-bands/middleImg1.svg";
import frontImg1 from "../assets/skill-bands/frontImg1.svg";

const bands = [
    { frontImg: frontImg1, midImg: midImg1, backImg: backImg1, title: "Titulo", description: "Descripcion" }
];

function SkillBand() {

    return (
        bands.map((item, index) => (
        <div className="skill-band" key={index}>
            <img className="background-img" src={item.backImg} alt="#" />
            <div className="skill-band-content">
                <div className="pictures">
                    <img src={item.midImg} alt="#" />
                    <img src={item.frontImg} alt="#" />
                </div>
                <div className="text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            </div>
        </div>
        ))
    )
}

export default SkillBand;