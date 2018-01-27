import React from 'react'
import { Switch } from 'react-router'
import PropTypes from 'prop-types'
import AsyncRoute from 'components/async-route'
import routes from './routes'

const Error = ({ match }) => (
  <Switch>
    {routes.map(route => <AsyncRoute {...route} path={`${match.path}${route.path}`} key={route.path} />)}
  </Switch>
)

if (__DEV__) {
  Error.propTypes = {
    match: PropTypes.object.isRequired
  }
}
export default Error
