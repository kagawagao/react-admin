import React from 'react'
import { BrowserRouter as Router } from 'react-router'
// import { HashRouter as Router } from 'react-router'
import MatchAsync from 'components/match-async'
import routes from './routes'

const App = () => {
  return (
    <Router>
      <div className="app">
        {routes.map((route, index) => {
          return (
            <MatchAsync {...route} key={index} />
          )
        })}
      </div>
    </Router>
  )
}

export default App
