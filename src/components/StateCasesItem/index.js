import {useState} from 'react'
import {Link} from 'react-router-dom'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import CovidContext from '../../Context/CovidContext'
import './index.css'

const StateCaseItem = props => {
  const {stateCasesDetails} = props
  console.log(stateCasesDetails)
  const [sortState, setSortState] = useState(true)

  return (
    <CovidContext.Consumer>
      {value => {
        const {statesList} = value
        const sortedState = sortState
          ? [...statesList].sort()
          : [...statesList].reverse()
        return (
          <div className="state-case-table" testid="stateWiseCovidDataTable">
            <ul className="table-heading">
              <li>
                <p className="state-ut">
                  States/UT{' '}
                  <button
                    testid={sortState ? 'ascendingSort' : 'descendingSort'}
                    className="sort-button"
                    type="button"
                    onClick={() => setSortState(prevState => !prevState)}
                  >
                    {sortState ? (
                      <FcGenericSortingAsc style={{paddingTop: '5'}} />
                    ) : (
                      <FcGenericSortingDesc style={{paddingTop: '5'}} />
                    )}
                  </button>
                </p>
              </li>
              <li>
                <p>Confirmed</p>
              </li>
              <li>
                <p>Active</p>
              </li>
              <li>
                <p>Recoverd</p>
              </li>
              <li>
                <p>Deceased</p>
              </li>
              <li>
                <p>Population</p>
              </li>
            </ul>
            <hr className="hr-line" />
            <ul className="state-details">
              {sortedState.map(state => {
                const stateDetails = stateCasesDetails[state.state_code]
                const caseDetails = {
                  confirmed: '',
                  deceased: '',
                  recovered: '',
                  population: '',
                }
                if (stateDetails) {
                  caseDetails.confirmed = stateDetails.total.confirmed
                  caseDetails.deceased = stateDetails.total.deceased
                  caseDetails.recovered = stateDetails.total.recovered
                  caseDetails.population = stateDetails.meta.population
                }
                const {confirmed, deceased, recovered, population} = caseDetails

                return (
                  <li className="table-body" key={state.state_code}>
                    <Link
                      to={`/state/${state.state_code}`}
                      className="nav-link"
                    >
                      <p className="state-name">{state.state_name}</p>
                    </Link>
                    <p className="confirmed table-row">{confirmed}</p>
                    <p className="active table-row">
                      {confirmed - (deceased + recovered)}
                    </p>
                    <p className="recovered table-row">{recovered}</p>
                    <p className="deceased table-row">{deceased}</p>
                    <p className="population table-row">{population}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }}
    </CovidContext.Consumer>
  )
}

export default StateCaseItem
