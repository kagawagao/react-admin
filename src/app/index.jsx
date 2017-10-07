import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'
import RouteAsync from 'components/route-async'
import routes from './routes'

const App = ({ history }) => {
  return (
    <Router history={history} key="router">
      <div className="app">
        {routes.map((route, index) => {
          return (
            <RouteAsync {...route} key={index} />
          )
        })}
      </div>
    </Router>
  )
}

if (__DEV__) {
  App.propTypes = {
    history: PropTypes.object.isRequired
  }
}

export default App
