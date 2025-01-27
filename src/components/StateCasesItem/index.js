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
          <table className="state-case-table">
            <thead>
              <tr className="table-heading">
                <th>
                  States/UT{' '}
                  <button
                    testid="ascendingSort"
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
                </th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Recoverd</th>
                <th>Deceased</th>
                <th>Population</th>
              </tr>
            </thead>
            <hr className="hr-line" />
            <tbody>
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
                  <tr className="table-body">
                    <Link
                      to={`/state/${state.state_code}`}
                      className="nav-link"
                    >
                      <td className="state-name">{state.state_name}</td>
                    </Link>
                    <td className="confirmed">{confirmed}</td>
                    <td className="active">
                      {confirmed - (deceased + recovered)}
                    </td>
                    <td className="recovered">{recovered}</td>
                    <td className="deceased">{deceased}</td>
                    <td className="population">{population}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )
      }}
    </CovidContext.Consumer>
  )
}

export default StateCaseItem
