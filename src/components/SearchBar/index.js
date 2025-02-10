import {useState} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import CovidContext from '../../Context/CovidContext'
import './index.css'

const SearchBar = () => {
  const [userSearch, setUsersearch] = useState('')
  const [isShowSearchBar, setisShowSearchBar] = useState(false)

  return (
    <CovidContext.Consumer>
      {value => {
        const {statesList} = value
        console.log('States List:', statesList)
        const filterStateList = statesList.filter(state =>
          state.state_name.toLowerCase().includes(userSearch.toLowerCase()),
        )
        console.log('Filtered List:', filterStateList)
        return (
          <div
            onMouseLeave={
              userSearch === '' ? () => setisShowSearchBar(false) : undefined
            }
          >
            <div
              className="search-container"
              style={
                isShowSearchBar
                  ? {borderBottom: 'none', borderRadius: '5px 5px 0px 0px'}
                  : undefined
              }
            >
              <BsSearch className="search-icon" />
              <input
                className="search-input"
                type="search"
                value={userSearch}
                onChange={event => setUsersearch(event.target.value)}
                onMouseMove={() => setisShowSearchBar(true)}
                placeholder="Enter the State..."
              />
            </div>
            {isShowSearchBar && (
              <ul
                className="search-bar-container"
                testid="searchResultsUnorderedList"
              >
                {filterStateList.map(state => (
                  <li
                    key={state.state_code}
                    className="search-bar-list"
                    onClick={() => setUsersearch(state.state_name)}
                  >
                    <p>{state.state_name}</p>
                    <Link
                      to={`/state/${state.state_code}`}
                      className="state-code"
                    >
                      <p>{state.state_code}</p>
                      <BiChevronRightSquare
                        size={17}
                        testid={`moveTo-${state.state_code}`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      }}
    </CovidContext.Consumer>
  )
}

export default SearchBar
