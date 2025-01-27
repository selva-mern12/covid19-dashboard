import {Link} from 'react-router-dom'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

export const Header = () => (
  <div className="header-container">
    <h1 className="header-heading">
      COVID19<span className="header-india">INDIA</span>
    </h1>
    <nav className="nav-container">
      <Link to="/" className="nav-link">
        Home
      </Link>

      <Link to="/about" className="nav-link">
        About
      </Link>
    </nav>
  </div>
)

export const Footer = () => (
  <div className="footer-container">
    <h1 className="header-heading">
      COVID19<span className="header-india">INDIA</span>
    </h1>
    <p className="home-footer">
      we stand with everyone fighting on the front lines
    </p>
    <div className="app-logo-container">
      <VscGithubAlt />
      <FiInstagram />
      <FaTwitter />
    </div>
  </div>
)

// {vaccination && (
//   <Link to="/vaccination" className="nav-link">
//     Vaccination
//   </Link>
// )}
