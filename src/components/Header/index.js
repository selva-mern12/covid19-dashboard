import {Link} from 'react-router-dom'
import './index.css'

const Header = ({vaccination, stateName, vaccinationPage}) => (
  <div className="header-container">
    <Link to="/" className="nav-link">
      <h1 className="header-heading">
        COVID19<span className="header-india">INDIA</span>
      </h1>
    </Link>
    <nav className="nav-container">
      <Link to="/" className="nav-link">
        Home
      </Link>
      {vaccination && (
        <Link to={`/vaccination/${stateName}`} className="nav-link">
          Vaccination
        </Link>
      )}
      {vaccinationPage && <p className="nav-link">Vaccination</p>}
      <Link to="/about" className="nav-link">
        About
      </Link>
    </nav>
  </div>
)

export default Header
