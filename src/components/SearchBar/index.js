import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import CovidContext from '../../Context/CovidContext'
import './index.css'

class SearchBar extends Component {
  state = {userSearch: ''}

  render() {
    const {userSearch} = this.state
    return (
      <CovidContext.Consumer>
        {value => {
          const {statesList} = value
          const filterStateList = statesList.filter(state =>
            state.state_name.toLowerCase().includes(userSearch.toLowerCase()),
          )
          return (
            <div>
              <div
                className="search-container"
                style={
                  userSearch !== ''
                    ? {borderBottom: 'none', borderRadius: '5px 5px 0px 0px'}
                    : undefined
                }
              >
                <BsSearch className="search-icon" />
                <input
                  className="search-input"
                  type="search"
                  value={userSearch}
                  onChange={event =>
                    this.setState({userSearch: event.target.value})
                  }
                  placeholder="Enter the State..."
                />
              </div>
              {userSearch !== '' && (
                <ul
                  className="search-bar-container"
                  testid="searchResultsUnorderedList"
                >
                  {filterStateList.map(state => (
                    <Link
                      to={`/state/${state.state_code}`}
                      className="nav-link"
                    >
                      <li
                        key={state.state_code}
                        className="search-bar-list"
                        onClick={() =>
                          this.setState({userSearch: state.state_name})
                        }
                      >
                        <p>{state.state_name}</p>
                        <div className="state-code">
                          <p>{state.state_code}</p>
                          <BiChevronRightSquare
                            size={17}
                            testid={`moveTo-${state.state_code}`}
                          />
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </CovidContext.Consumer>
    )
  }
}

export default SearchBar
