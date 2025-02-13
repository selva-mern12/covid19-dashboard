import {Link} from 'react-router-dom'
import './index.css'

const Header = ({vaccination, stateName, vaccinationPage}) => (
  <div className="header-container">
    <Link to="/" className="nav-link">
      <h1 className="header-heading">
        COVID19<span className="header-india">INDIA</span>
      </h1>
    </Link>
    <ul className="nav-container">
      <li>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      {vaccination && (
        <li>
          <Link to={`/vaccination/${stateName}`} className="nav-link">
            Vaccination
          </Link>
        </li>
      )}
      {vaccinationPage && <li className="nav-link">Vaccination</li>}
      <li>
        <Link to="/about" className="nav-link">
          About
        </Link>
      </li>
    </ul>
  </div>
)

export default Header
