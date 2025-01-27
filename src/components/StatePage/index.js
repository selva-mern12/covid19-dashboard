import {Component} from 'react'

import {Header, Footer} from '../HeaderFooter'
import CovidContext from '../../Context/CovidContext'
import CommonCaseDetails from '../CommonCaseDetails'
import {LoadingView, FailureView} from '../UnsuccessPage'
import StateChart from '../StateChart'
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
    districtConfirmed: [],
    caseChart: 'confirmed',
  }

  componentDidMount() {
    this.getStateAndDistricts()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    const {params} = match
    const currentStateCode = params.stateCode
    const previousStateCode = prevProps.match.params.stateCode

    if (currentStateCode !== previousStateCode) {
      this.getStateAndDistricts()
    }
  }

  getStateAndDistricts = async () => {
    this.setState({statePageStatus: pageStatus.loading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    if (response.ok) {
      const allState = await response.json()
      const stateData = allState[stateCode]
      const districtConfirmed = stateData?.districts
        ? Object.entries(stateData.districts).map(([district, data]) => ({
            districtName: district,
            confirmed: data.total.confirmed,
          }))
        : [] // If stateData.districts doesn't exist, return an empty array

      console.log(districtConfirmed)
      this.setState({
        stateFullDetails: stateData,
        statePageStatus: pageStatus.success,
        districtConfirmed,
        stateCode,
      })
    } else {
      this.setState({statePageStatus: pageStatus.failure})
      console.log(`Error Msg: ${response.error_msg}`)
    }
  }

  getCase = data => this.setState({caseChart: data})

  renderStatePage = ({statesList}) => {
    const {stateFullDetails, stateCode, districtConfirmed, caseChart} =
      this.state
    const stateName = statesList?.find(state => state.state_code === stateCode)
      ?.state_name
    console.log(stateName)
    const {confirmed, deceased, recovered, tested} = stateFullDetails?.total
      ? stateFullDetails.total
      : {}
    const caseDetails = {confirmed, deceased, recovered}
    const {population} = stateFullDetails?.meta ? stateFullDetails.meta : {}
    const {statePageStatus} = this.state
    switch (statePageStatus) {
      case pageStatus.loading:
        return <LoadingView />
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
                <p className="tested">{tested}</p>
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
                <p className="map-head">{tested}</p>
                <p className="map-para">(AS of 29 March per source)</p>
              </div>
            </div>
            <div>
              <h3 className="top-district">Top Districts</h3>
              <div className="districtwise-confirmed">
                <ul className="confirmed-district-list">
                  {districtConfirmed.map(district => (
                    <li className="confirmed-district">
                      <p className="confirmed-list">
                        {district.confirmed === undefined
                          ? 0
                          : district.confirmed}
                      </p>
                      <p className="district-list">{district.districtName}</p>{' '}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <StateChart caseChart={caseChart} />
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
          return (
            <div className="statepage-bg-container">
              <Header vaccination />
              <div>{this.renderStatePage({statesList})}</div>
            </div>
          )
        }}
      </CovidContext.Consumer>
    )
  }
}

export default StatePage
