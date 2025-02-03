import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

const Footer = () => (
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

export default Footer
