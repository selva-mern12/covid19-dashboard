import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'
import CovidContext from '../../Context/CovidContext'
import CommonCaseDetails from '../CommonCaseDetails'
import {LoadingView, FailureView} from '../UnsuccessPage'
import StateChart from '../StateChart'
import {LineCharts} from '../PieCharts'
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
    dateWiseCases: {},
  }

  componentDidMount() {
    this.getStateDistrictsAndDateWise()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    const {params} = match
    const currentStateCode = params.stateCode
    const previousStateCode = prevProps.match.params.stateCode

    if (currentStateCode !== previousStateCode) {
      this.getStateDistrictsAndDateWise()
    }
  }

  getStateDistrictsAndDateWise = async () => {
    this.setState({statePageStatus: pageStatus.loading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const stateAllDataResponse = await fetch(
      'https://apis.ccbp.in/covid19-state-wise-data',
    )
    const dateWiseResponse = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`,
    )
    if (stateAllDataResponse.ok && dateWiseResponse.ok) {
      const allState = await stateAllDataResponse.json()
      const stateData = allState[stateCode]
      const districtConfirmed = stateData?.districts
        ? Object.entries(stateData.districts).map(([district, data]) => ({
            districtName: district,
            confirmed: data.total.confirmed,
          }))
        : []
      const dateWiseData = await dateWiseResponse.json()
      const dateWiseCases = dateWiseData[stateCode].dates
      const stateDatesCase = Object.entries(dateWiseCases).reduce(
        (acc, [key, value]) => {
          const changeDate = new Date(key)
          const formatDate = `${changeDate.getDate()} ${changeDate.toLocaleString(
            'default',
            {month: 'short'},
          )}\n${changeDate.getFullYear()}`
          acc.confirmed.push({date: formatDate, cases: value.total.confirmed})
          acc['Total Active'].push({
            date: formatDate,
            cases:
              value.total.confirmed -
              (value.total.deceased + value.total.recovered),
          })
          acc.recovered.push({date: formatDate, cases: value.total.recovered})
          acc.deceased.push({date: formatDate, cases: value.total.deceased})
          acc.teste.push({date: formatDate, cases: value.total.tested})

          return acc
        },
        {
          confirmed: [],
          'Total Active': [],
          recovered: [],
          deceased: [],
          teste: [],
        },
      )

      this.setState({
        stateFullDetails: stateData,
        statePageStatus: pageStatus.success,
        districtConfirmed,
        stateCode,
        dateWiseCases: stateDatesCase,
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
      districtConfirmed,
      caseChart,
      statePageStatus,
      dateWiseCases,
    } = this.state

    const stateName = statesList?.find(state => state.state_code === stateCode)
      ?.state_name
    const {confirmed, deceased, recovered, tested} = stateFullDetails?.total
      ? stateFullDetails.total
      : {}
    const active = confirmed - (deceased + recovered)
    const caseDetails = {confirmed, deceased, recovered, active}
    const {population} = stateFullDetails?.meta ? stateFullDetails.meta : {}
    const dateWiseCasesColors = {
      confirmed: '#FF073A',
      'Total Active': '#007BFF',
      recovered: '#27A243',
      deceased: '#6C757D',
      teste: '#9673B9',
    }

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
            <div testid="lineChartsContainer">
              <h1 className="top-district">Top Districts</h1>
              <div className="districtwise-confirmed">
                <ul
                  className="confirmed-district-list"
                  testid="topDistrictsUnorderedList"
                >
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
            <ul testid="lineChartsContainer">
              {Object.entries(dateWiseCases).map(([key, value]) => (
                <LineCharts
                  topic={key}
                  dateCaseDetails={value}
                  color={dateWiseCasesColors[key]}
                />
              ))}
            </ul>
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
