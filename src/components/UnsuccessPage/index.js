import {Link} from 'react-router-dom'

import Loading from 'react-loader-spinner'

export const FailureView = () => (
  <div>
    <img src="https://i.ibb.co/5WVt1qL/Group-7484.png" alt="failure view" />
    <h1>Page Not Found</h1>
    <p>
      we’re sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
  </div>
)

export const LoadingView = ({dataTestId}) => (
  <div className="loading" testid={dataTestId}>
    <Loading type="Oval" color="#007BFF" />
  </div>
)

export const NotFound = () => (
  <div>
    <img
      src="https://i.ibb.co/6mBT5bz/Screenshot-2025-01-28-032650.png"
      alt="not-found-pic"
    />
    <h1>PAGE NOT FOUND</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button">Home</button>
    </Link>
  </div>
)
