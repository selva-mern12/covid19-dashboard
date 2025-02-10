import {Component} from 'react'
import {FaHome} from 'react-icons/fa'
import {PieCharts} from '../PieCharts'
import Header from '../Header'
import Footer from '../Footer'
import {LoadingView, FailureView} from '../UnsuccessPage'

import './index.css'

const pageStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Vaccination extends Component {
  state = {
    statesList: [],
    selectedState: '',
    districtsList: [],
    selectedDistrict: '',
    vaccinationData: {},
    vaccinationPageStatus: pageStatus.initial,
  }

  componentDidMount() {
    this.getStateAndVaccinationDetails()
  }

  getDistrictList = async () => {
    const {selectedState, statesList} = this.state
    const stateNo = statesList?.find?.(
      state => state.stateName === selectedState,
    )?.stateId
    const districtResponse = await fetch(
      `https://apis.ccbp.in/covid19-districts-data/${stateNo}`,
    )
    if (districtResponse.ok) {
      const districtData = await districtResponse.json()

      const updatedDistrictData = districtData?.districts?.map(district => ({
        districtId: district.district_id,
        districtName: district.district_name,
      }))

      this.setState({
        districtsList: updatedDistrictData,
      })
    }
  }

  getStateAndVaccinationDetails = async () => {
    this.setState({vaccinationPageStatus: pageStatus.loading})
    const {match} = this.props
    const {params} = match
    const {stateName} = params
    const stateResponse = await fetch('https://apis.ccbp.in/covid19-state-ids')
    const vaccinationResponse = await fetch(
      'https://apis.ccbp.in/covid19-vaccination-data',
    )
    if (stateResponse.ok && vaccinationResponse.ok) {
      const stateData = await stateResponse.json()
      const vaccinationData = await vaccinationResponse.json()
      const updatedStateData = stateData?.states?.map(state => ({
        stateId: state.state_id,
        stateName: state.state_name,
      }))

      this.setState(
        {
          statesList: updatedStateData,
          selectedState: stateName,
          vaccinationData,
          vaccinationPageStatus: pageStatus.success,
        },
        () => this.getDistrictList(),
      )
    } else {
      this.setState({vaccinationPageStatus: pageStatus.failure})
    }
  }

  handleSelectStateChange = event => {
    const {history} = this.props
    this.setState(
      {selectedState: event.target.value, selectedDistrict: ''},
      () => this.getDistrictList(),
    )
    history.push(`/vaccination/${event.target.value}`)
  }

  handleSelectDistrictChange = event =>
    this.setState({selectedDistrict: event.target.value})

  renderVaccinePage = () => {
    const {match} = this.props
    const {params} = match
    const {stateName} = params
    const {
      statesList,
      selectedState,
      districtsList,
      selectedDistrict,
      vaccinationData,
      vaccinationPageStatus,
    } = this.state
    const vaccinationByGender = vaccinationData?.topBlock?.vaccination
      ? Object.entries(vaccinationData.topBlock.vaccination)
          .filter(([key]) => ['male', 'female', 'others'].includes(key))
          .map(([key, value]) => ({name: key, vaccine: value}))
      : []
    const vaccinationByGenderColor = {
      male: '#F54394',
      female: '#5A8DEE',
      others: '#FF9800',
    }
    const vaccinationByDose = vaccinationData?.topBlock?.vaccination
      ? Object.entries(vaccinationData.topBlock.vaccination)
          .filter(([key]) => ['covishield', 'covaxin', 'sputnik'].includes(key))
          .map(([key, value]) => ({name: key, vaccine: value}))
      : []
    const vaccinationByDoseColor = {
      covishield: '#007CC3',
      covaxin: '#7AC142',
      sputnik: '#FF9800',
    }
    const vaccinationByAge = vaccinationData?.vaccinationByAge
      ? Object.entries(vaccinationData.vaccinationByAge)
          .filter(([key]) => key !== 'total')
          .map(([key, value]) => ({
            name: key.replace('vac_', '').replace('_', '-'),
            vaccine: value,
          }))
      : []
    const vaccinationByAgeColor = {
      '12-14': '#FF5733',
      '15-17': '#33FF57',
      '18-45': '#337BFF',
      '45-60': '#FF33A1',
      'above-60': '#86198F',
    }

    switch (vaccinationPageStatus) {
      case pageStatus.loading:
        return <LoadingView dataTestId="stateDetailsLoader" />
      case pageStatus.success:
        return (
          <div className="vaccination-main-container">
            <h1 className="vaccination-heading">
              <FaHome /> {stateName}
            </h1>
            <div className="state-district-drop-down">
              <select
                value={selectedState}
                onChange={this.handleSelectStateChange}
                className="state-district-menu"
              >
                {Array.isArray(statesList) &&
                  statesList.map(state => (
                    <option key={state.stateId} value={state.stateName}>
                      {state.stateName}
                    </option>
                  ))}
              </select>
              <select
                value={selectedDistrict}
                onChange={this.handleSelectDistrictChange}
                className="state-district-menu"
              >
                <option value="" disabled>
                  Select a district
                </option>
                {Array.isArray(districtsList) &&
                  districtsList.map(district => (
                    <option
                      key={district.districtId}
                      value={district.districtName}
                    >
                      {district.districtName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="site-dose-main-container">
              <div className="site-dose-container">
                <img
                  src="https://i.postimg.cc/Qxt6Rkck/Group-7476.png"
                  alt="vaccination"
                  className="site-dose-img"
                />
                <div className="site-dose-inner-container">
                  <p className="site-dose-title">Site Conducting Vaccination</p>
                  <p className="site-dose-total">
                    {vaccinationData?.sessionSiteData?.total_sites}
                  </p>
                  <div className="site-dose-category-container">
                    <div className="categories">
                      <p className="site-dose-category">Government</p>
                      <p className="site-dose-count">
                        {vaccinationData?.sessionSiteData?.govt_sites}
                      </p>
                    </div>
                    <div className="categories">
                      <p className="site-dose-category">Private</p>
                      <p className="site-dose-count">
                        {vaccinationData?.sessionSiteData?.pvt_sites}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="site-dose-container">
                <img
                  src="https://i.postimg.cc/pLSw-dVD7/Group-7475.png"
                  alt="dose"
                  className="site-dose-img"
                />
                <div className="site-dose-inner-container">
                  <p className="site-dose-title">Total Vaccination Doses</p>
                  <p className="site-dose-total">
                    {vaccinationData?.topBlock?.vaccination?.tot_dose_1 +
                      vaccinationData?.topBlock?.vaccination?.tot_dose_2}
                  </p>
                  <div className="site-dose-category-container">
                    <div className="categories">
                      <p className="site-dose-category">Dose 1</p>
                      <p className="site-dose-count">
                        {vaccinationData?.topBlock?.vaccination?.tot_dose_1}
                      </p>
                    </div>
                    <div className="categories">
                      <p className="site-dose-category">Dose 2</p>
                      <p className="site-dose-count">
                        {vaccinationData?.topBlock?.vaccination?.tot_dose_2}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="piechart-container">
              <div className="piechart">
                <PieCharts
                  data={vaccinationByGender}
                  colors={vaccinationByGenderColor}
                />
                <PieCharts
                  data={vaccinationByDose}
                  colors={vaccinationByDoseColor}
                />
              </div>
              <div className="piechart">
                <PieCharts
                  data={vaccinationByAge}
                  colors={vaccinationByAgeColor}
                  ageVaccine
                />
              </div>
            </div>
            <Footer />
          </div>
        )
      case pageStatus.failure:
        return <FailureView />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="vaccination-bg-container">
        <Header vaccinationPage />
        <div>{this.renderVaccinePage()}</div>
      </div>
    )
  }
}

export default Vaccination
