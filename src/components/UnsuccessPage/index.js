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

export const LoadingView = () => (
  <div className="loading">
    <Loading type="Oval" color="#007BFF" />
  </div>
)
