import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import SearchBar from '../SearchBar'
import CommonCaseDetails from '../CommonCaseDetails'
import StateCaseItem from '../StateCasesItem'
import {LoadingView, FailureView} from '../UnsuccessPage'
import './index.css'

const pageStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    stateCasesDetails: {},
    homeStatus: pageStatus.initial,
    totalConfirmed: 0,
    totalActive: 0,
    totalRecovered: 0,
    totalDeceased: 0,
  }

  componentDidMount() {
    this.getStatecaseDetails()
  }

  calculateTotalCases = stateCases => {
    let totalConfirmed = 0
    let totalActive = 0
    let totalRecovered = 0
    let totalDeceased = 0

    Object.values(stateCases).forEach(state => {
      totalConfirmed += state.total?.confirmed || 0
      totalRecovered += state.total?.recovered || 0
      totalDeceased += state.total?.deceased || 0
      totalActive +=
        (state.total?.confirmed || 0) -
        ((state.total?.recovered || 0) + (state.total?.deceased || 0))
    })

    return {totalConfirmed, totalActive, totalRecovered, totalDeceased}
  }

  getStatecaseDetails = async () => {
    this.setState({homeStatus: pageStatus.loading})
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    if (response.ok) {
      const stateCases = await response.json()
      const totals = this.calculateTotalCases(stateCases)
      this.setState({
        stateCasesDetails: stateCases,
        homeStatus: pageStatus.success,
        ...totals,
      })
    } else {
      this.setState({homeStatus: pageStatus.failure})
    }
  }

  renderHomePage = () => {
    const {
      stateCasesDetails,
      homeStatus,
      totalConfirmed,
      totalActive,
      totalRecovered,
      totalDeceased,
    } = this.state
    const caseDetails = {
      confirmed: totalConfirmed,
      active: totalActive,
      recovered: totalRecovered,
      deceased: totalDeceased,
    }
    switch (homeStatus) {
      case pageStatus.loading:
        return <LoadingView dataTestId="homeRouteLoader" />
      case pageStatus.failure:
        return <FailureView />
      case pageStatus.success:
        return (
          <div className="home-container">
            <SearchBar />
            <CommonCaseDetails caseDetails={caseDetails} country />
            <StateCaseItem stateCasesDetails={stateCasesDetails} />
            <Footer />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-page">{this.renderHomePage()}</div>
      </div>
    )
  }
}

export default Home

// <div className="case-group">
//   <div
//     className="confirmed case-container"
//     testid="countryWideConfirmedCases"
//   >
//     <p className="case-head">Confirmed</p>
//     <img
//       src="https://i.ibb.co/9Vgx5NB/check-mark-1.png"
//       alt="country wide confirmed cases pic"
//       className="case-img"
//     />
//     <p className="case-count">{totalConfirmed}</p>
//   </div>
//   {/* Active Cases */}
//   <div
//     className="active case-container"
//     testid="countryWideActiveCases"
//   >
//     <p className="case-head">Active</p>
//     <img
//       src="https://i.ibb.co/qknm8f0/protection-1.png"
//       alt="country wide active cases pic"
//       className="case-img"
//     />
//     <p className="case-count">{totalActive}</p>
//   </div>
//   {/* Recovered Cases */}
//   <div
//     className="recovered case-container"
//     testid="countryWideRecoveredCases"
//   >
//     <p className="case-head">Recovered</p>
//     <img
//       src="https://i.ibb.co/rHB47jp/recovered-1.png"
//       alt="country wide recovered cases pic"
//       className="case-img"
//     />
//     <p className="case-count">{totalRecovered}</p>
//   </div>
//   {/* Deceased Cases */}
//   <div
//     className="deceased case-container"
//     testid="countryWideDeceasedCases"
//   >
//     <p className="case-head">Deceased</p>
//     <img
//       src="https://i.ibb.co/rQr5jjc/breathing-1.png"
//       alt="country wide deceased cases pic"
//       className="case-img"
//     />
//     <p className="case-count">{totalDeceased}</p>
//   </div>
// </div>
