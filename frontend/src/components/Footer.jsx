import { Link } from 'react-router-dom';
import './styles/footer.css';
const Footer = () => {
  return (
    <footer>
      <h3>Application created by Group 1</h3>
      <Link to="/privacy-policy">Privacy Policy</Link>
    </footer>
  );
};

export default Footer;
