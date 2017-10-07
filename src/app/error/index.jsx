import React from 'react'
import PropTypes from 'prop-types'
import RouteAsync from 'components/route-async'
import routes from './routes'

const Error = ({ match }) => {
  return (
    <div>
      {routes.map((route, index) => <RouteAsync {...route} match={match} key={index} />)}
    </div>
  )
}

if (__DEV__) {
  Error.propTypes = {
    match: PropTypes.object.isRequired
  }
}
export default Error
