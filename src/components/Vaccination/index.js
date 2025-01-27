// import {Component} from 'react'
// import {IoMdHome} from 'react-icons/io'
// import {GiHospital, GiLoveInjection} from 'react-icons/gi'

// import {Header, Footer} from '../HeaderFooter'
// import CovidContext from '../../Context/CovidContext'
// import './index.css'

// class Vaccination extends Component {
//   state = {districtList: [], vaccinationDetails: {}}

//   componentDidMount() {
//     this.getDistrictList()
//     this.getVaccinationDetails()
//   }

//   getDistrictList = async () => {
//     const {match} = this.props
//     const {params} = match
//     const {stateCode} = params
//     const response = await fetch(`https://apis.ccbp.in/covid19-state-wise-data`)
//     const data = await response.json()
//     const stateDetail = data[stateCode]
//     const districtList = Object.keys(stateDetail.districts).map(
//       district => district,
//     )
//     this.setState({districtList})
//   }

//   getVaccinationDetails = async () => {
//     const response = await fetch(
//       'https://apis.ccbp.in/covid19-vaccination-data',
//     )
//     const data = await response.json()
//     this.setState({vaccinationDetails: data})
//   }

//   render() {
//     const {match} = this.props
//     const {params} = match
//     const {stateCode} = params
//     const {districtList, vaccinationDetails} = this.state
//     return (
//       <CovidContext.Consumer>
//         {value => {
//           const {stateList} = value

//           const stateName = stateList?.filter(
//             state => state.state_code === stateCode,
//           )?.state_name
//           const stateId = stateList?.findIndex(
//             state => state.state_code === stateCode,
//           )
//           const dose1 =
//             (vaccinationDetails?.getBeneficiariesGroupBy[stateId]
//               ?.partial_vaccinated +
//               vaccinationDetails?.getBeneficiariesGroupBy[stateId]
//                 ?.precaution_dose) /
//             2
//           const dose2 =
//             (vaccinationDetails?.getBeneficiariesGroupBy[stateId]
//               ?.totally_vaccinated +
//               vaccinationDetails?.getBeneficiariesGroupBy[stateId]
//                 ?.precaution_dose) /
//             2
//           const totalDose =
//             vaccinationDetails?.getBeneficiariesGroupBy[stateId]?.total

//           return (
//             <div>
//               <Header />
//               <div>
//                 <h1>
//                   <IoMdHome /> {` India/${stateName}`}
//                 </h1>
//                 <div>
//                   <ul>
//                     {stateList.map((state, index) => (
//                       <li key={index}>{state.state_name}</li>
//                     ))}
//                   </ul>
//                   <ul>
//                     {districtList.map((district, index) => (
//                       <li key={index}>{district}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div>
//                   <div>
//                     <GiHospital />
//                     <div>
//                       <h2>Site Conducting Vaccination</h2>
//                       <p>{vaccinationDetails.sessionSiteData.total_sites}</p>
//                       <div>
//                         <div>
//                           <h6>Government</h6>
//                           <p>{vaccinationDetails.sessionSiteData.govt_sites}</p>
//                         </div>
//                         <div>
//                           <h6>Private</h6>
//                           <p>{vaccinationDetails.sessionSiteData.pvt_sites}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <GiLoveInjection />
//                     <div>
//                       <h3>Total Vaccination Doses </h3>
//                       <p>{totalDose}</p>
//                       <div>
//                         <div>
//                           <h6>Dose 1</h6>
//                           <p>{dose1}</p>
//                         </div>
//                         <div>
//                           <h6>Dose 2</h6>
//                           <p>{dose2}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div>
//                     <h4>Vaccination Category</h4>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )
//         }}
//       </CovidContext.Consumer>
//     )
//   }
// }

// export default Vaccination
