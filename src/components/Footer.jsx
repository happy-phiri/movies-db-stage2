import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="social-icons">
        <FontAwesomeIcon icon={faFacebook} size="2xl" className="fav-icon" />
        <FontAwesomeIcon icon={faTwitter} size="2xl" className="fav-icon" />
        <FontAwesomeIcon icon={faInstagram} size="2xl" className="fav-icon" />
      </div>
    </footer>
  );
};

export default Footer;
