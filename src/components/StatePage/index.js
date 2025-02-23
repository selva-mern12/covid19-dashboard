import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'
import CovidContext from '../../Context/CovidContext'
import CommonCaseDetails from '../CommonCaseDetails'
import {LoadingView, FailureView} from '../UnsuccessPage'
import StateChart from '../StateChart'
import LineCharts from '../LineChart'
import Map from '../Map'

import './index.css'

const pageStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class StatePage extends Component {
  state = {
    stateCode: '',
    stateFullDetails: {},
    statePageStatus: pageStatus.initial,
    districtCaseDetails: [],
    caseChart: 'confirmed',
  }

  componentDidMount() {
    this.getStateDateWise()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    const {params} = match
    const currentStateCode = params.stateCode
    const previousStateCode = prevProps.match.params.stateCode

    if (currentStateCode !== previousStateCode) {
      this.getStateDateWise()
    }
  }

  getStateDateWise = async () => {
    this.setState({statePageStatus: pageStatus.loading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const stateAllDataResponse = await fetch(
      'https://apis.ccbp.in/covid19-state-wise-data',
    )
    if (stateAllDataResponse.ok) {
      const allState = await stateAllDataResponse.json()
      const stateData = allState[stateCode]
      const districtCaseDetails = stateData?.districts
        ? Object.entries(stateData.districts).map(([district, data]) => ({
            districtName: district,
            confirmed: data.total.confirmed,
            recovered: data.total.recovered,
            deceased: data.total.deceased,
            active:
              data.total.confirmed -
              (data.total.deceased + data.total.recovered),
          }))
        : []
      console.log(districtCaseDetails)

      this.setState({
        stateFullDetails: stateData,
        statePageStatus: pageStatus.success,
        districtCaseDetails,
        stateCode,
      })
    } else {
      this.setState({statePageStatus: pageStatus.failure})
    }
  }

  getCase = data => this.setState({caseChart: data})

  renderStatePage = ({statesList}) => {
    const {
      stateFullDetails,
      stateCode,
      districtCaseDetails,
      caseChart,
      statePageStatus,
    } = this.state
    districtCaseDetails.sort((a, b) => b[caseChart] - a[caseChart])
    const stateName = statesList?.find(state => state.state_code === stateCode)
      ?.state_name
    const {confirmed, deceased, recovered, tested} = stateFullDetails?.total
      ? stateFullDetails.total
      : {}
    const active = confirmed - (deceased + recovered)
    const caseDetails = {confirmed, deceased, recovered, active}
    const {population} = stateFullDetails?.meta ? stateFullDetails.meta : {}

    switch (statePageStatus) {
      case pageStatus.loading:
        return <LoadingView dataTestId="stateDetailsLoader" />
      case pageStatus.failure:
        return <FailureView />
      case pageStatus.success:
        return (
          <div className="state-main-page">
            <div className="state-heading-container">
              <div className="state-head-container">
                <h1 className="state-head">{stateName}</h1>
                <p className="last-update">Last update on march 28th 2021.</p>
              </div>
              <div className="state-tested-container">
                <p className="tested-head">Tested</p>
                <p className="tested" testid="totalTestedCases">
                  {tested}
                </p>
              </div>
            </div>
            <CommonCaseDetails
              caseDetails={caseDetails}
              getCase={this.getCase}
              caseChart={caseChart}
            />
            <div className="map-area">
              <Map stateCode={stateCode} />
              <div className="state-details">
                <p className="map-head">NCP report</p>
                <p className="map-para">Population</p>
                <p className="map-head">{population}</p>
                <p className="map-para">Tested</p>
                <p className="map-para">(AS of 29 March per source)</p>
              </div>
            </div>
            <div testid="lineChartsContainer">
              <h1 className="top-district" testid="Top Districts">
                Top Districts
              </h1>
              <div className="districtwise-confirmed">
                <ul
                  className="confirmed-district-list"
                  testid="topDistrictsUnorderedList"
                >
                  {districtCaseDetails.map(district => (
                    <li
                      className="confirmed-district"
                      key={district.districtName}
                    >
                      <p className="confirmed-list">
                        {district[caseChart] ? district[caseChart] : 0}
                      </p>
                      <p className="district-list">{district.districtName}</p>{' '}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="state-chart-container">
                <StateChart caseChart={caseChart} />
              </div>
              <LineCharts />
            </div>
            <Footer />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <CovidContext.Consumer>
        {value => {
          const {statesList} = value
          const {stateCode} = this.state
          const stateName = statesList?.find(
            state => state.state_code === stateCode,
          )?.state_name

          return (
            <div className="statepage-bg-container">
              <Header vaccination stateName={stateName} />
              <div>{this.renderStatePage({statesList})}</div>
            </div>
          )
        }}
      </CovidContext.Consumer>
    )
  }
}

export default StatePage

// <p className="map-head">{tested}</p>
