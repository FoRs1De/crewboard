import { Link } from 'react-router-dom';
import './styles/footer.css';
const Footer = () => {
  return (
    <div className="container-footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h1>Crewboard</h1>
        </div>
        <div className="footer-links">
          <div className="footer-links1">
            <Link className="footer-link" to="/vacancies">
              Vacancies
            </Link>
            <Link className="footer-link" to="/companies">
              Companies
            </Link>
            <Link className="footer-link" to="/seamen">
              Seamen
            </Link>
          </div>
          <div className="footer-links2">
            <Link className="footer-link" to="/seamen">
              Link1
            </Link>
            <Link className="footer-link" to="/contact">
              Contact
            </Link>
            <Link className="footer-link" to="/sitemap">
              Site map
            </Link>
          </div>
          <div className="footer-links3">
            <Link className="footer-link" to="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="footer-link" to="/terms-of-use">
              Terms of use
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Site from seaman for seamen and companies © Crewboard 2023 </p>
      </div>
    </div>
  );
};

export default Footer;
