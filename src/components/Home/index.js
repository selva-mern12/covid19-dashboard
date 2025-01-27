import {Component} from 'react'
import {Header, Footer} from '../HeaderFooter'
import SearchBar from '../SearchBar'
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
  }

  componentDidMount() {
    this.getStatecaseDetails()
  }

  getStatecaseDetails = async () => {
    this.setState({homeStatus: pageStatus.loading})
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    if (response.ok) {
      const stateCases = await response.json()
      console.log(stateCases)
      this.setState({
        stateCasesDetails: stateCases,
        homeStatus: pageStatus.success,
      })
    } else {
      this.setState({homeStatus: pageStatus.failure})
    }
  }

  renderHomePage = () => {
    const {stateCasesDetails, homeStatus} = this.state
    switch (homeStatus) {
      case pageStatus.loading:
        return <LoadingView />
      case pageStatus.failure:
        return <FailureView />
      case pageStatus.success:
        return <StateCaseItem stateCasesDetails={stateCasesDetails} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-container">
          <SearchBar />
          <div className="case-group">
            <div className="confirmed case-container">
              <p className="case-head">Confirmed</p>
              <img
                src="https://i.ibb.co/9Vgx5NB/check-mark-1.png"
                alt="check-mark"
                className="case-img"
              />
              <p className="case-count">34285612</p>
            </div>
            <div className="active case-container">
              <p className="case-head">Active</p>
              <img
                src="https://i.ibb.co/qknm8f0/protection-1.png"
                alt="protection-1"
                className="case-img"
              />
              <p className="case-count">165803</p>
            </div>
            <div className="recovered case-container">
              <p className="case-head">Recoverd</p>
              <img
                src="https://i.ibb.co/rHB47jp/recovered-1.png"
                alt="recovered-1"
                className="case-img"
              />
              <p className="case-count">33661339</p>
            </div>
            <div className="deceased case-container">
              <p className="case-head">Deceased</p>
              <img
                src="https://i.ibb.co/rQr5jjc/breathing-1.png"
                alt="breathing-1"
                className="case-img"
              />
              <p className="case-count">458470</p>
            </div>
          </div>
          <div className="home-page">{this.renderHomePage()}</div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
