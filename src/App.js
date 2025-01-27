import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import StatePage from './components/StatePage'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateCode/" component={StatePage} />
  </Switch>
)

export default App

// import MyPieChart from './components/Sample'
// import Vaccination from './components/Vaccination'
//  <Route exact path="/vaccination" component={Vaccination} />

// const App = () => <MyPieChart />

// export default App
