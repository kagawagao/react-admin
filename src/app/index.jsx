import React from 'react'
import { HashRouter as Router, Match } from 'react-router'
import routes from './routes'

const App = () => {
  return (
    <Router>
      <div className="app">
        {routes.map((route, index) => {
          return (
            <Match {...route} key={index} />
          )
        })}
      </div>
    </Router>
  )
}

export default App
