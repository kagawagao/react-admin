import React, { PropTypes } from 'react'
import MatchAsync from 'components/match-async'
import routes from './routes'

const Error = ({ pathname }) => {
  return (
    <div>
      {routes.map((route, index) => <MatchAsync {...route} pathname={pathname} key={index} />)}
    </div>
  )
}

if (__DEV__) {
  Error.propTypes = {
    pathname: PropTypes.string.isRequired
  }
}
export default Error
