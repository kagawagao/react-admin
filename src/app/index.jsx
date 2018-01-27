import React from 'react'
import PropTypes from 'prop-types'
import { Router, Switch } from 'react-router'
import AsyncRoute from 'components/async-route'
import routes from './routes'

const App = ({ history }) => (
  <Router history={history} key="router">
    <Switch>
      {routes.map(route => <AsyncRoute {...route} key={route.path} />)}
    </Switch>
  </Router>
)

if (__DEV__) {
  App.propTypes = {
    history: PropTypes.object.isRequired
  }
}

export default App
