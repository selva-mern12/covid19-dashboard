import {useState} from 'react'
import {Link} from 'react-router-dom'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import CovidContext from '../../Context/CovidContext'
import './index.css'

const StateCaseItem = props => {
  const {stateCasesDetails} = props
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
              <li key="states/ut">
                <p className="state-ut">
                  States/UT{' '}
                  <button
                    testid="ascendingSort"
                    className="sort-button"
                    type="button"
                    onClick={() => setSortState(true)}
                  >
                    <FcGenericSortingAsc style={{paddingTop: '5'}} />
                  </button>{' '}
                  <button
                    testid="descendingSort"
                    className="sort-button"
                    type="button"
                    onClick={() => setSortState(false)}
                  >
                    <FcGenericSortingDesc style={{paddingTop: '5'}} />
                  </button>
                </p>
              </li>
              <li className="table-head" key="confirmed">
                <p>Confirmed</p>
              </li>
              <li className="table-head" key="active">
                <p>Active</p>
              </li>
              <li className="table-head" key="recovered">
                <p>Recovered</p>
              </li>
              <li className="table-head" key="deceased">
                <p>Deceased</p>
              </li>
              <li className="table-head" key="population">
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
                  <li
                    className="table-body"
                    key={state.state_code}
                    testid="stateDetailsLoader"
                  >
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
