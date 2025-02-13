import {Switch, Route, Redirect} from 'react-router-dom'
import {useEffect} from 'react'

import Home from './components/Home'
import About from './components/About'
import StatePage from './components/StatePage'
import Vaccination from './components/Vaccination'
import {NotFound} from './components/UnsuccessPage'
import './App.css'

const App = () => {
  useEffect(() => {
    document.title = 'Covid19 Dashboard'
  }, [])
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/state/:stateCode" component={StatePage} />
      <Route exact path="/vaccination/:stateName" component={Vaccination} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default App
