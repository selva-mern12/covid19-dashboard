import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import StatePage from './components/StatePage'
import Vaccination from './components/Vaccination'
import {NotFound} from './components/UnsuccessPage'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateCode/" component={StatePage} />
    <Route exact path="/vaccination/:stateName" component={Vaccination} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App

// import VaccinationLineChart from './components/PieCharts'

// const App = () => <VaccinationLineChart />

// export default App
