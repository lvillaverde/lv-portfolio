import "./css/Footer.css";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { HashLink } from "react-router-hash-link";

gsap.registerPlugin(ScrollToPlugin);

function Footer({ isHome }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Thanks for reading</h2>
        <HashLink
          smooth
          to="/#hero"
        >
          <h3>—Let's keep in touch.</h3>
        </HashLink>
      </div>
    </footer>
  );
}

export default Footer;
