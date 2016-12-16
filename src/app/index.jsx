import React, { PropTypes } from 'react'
// import { Match } from 'react-router'

const App = ({ pathname, ...args }) => {
  console.log(pathname)
  console.log(args)
  return (
    <div>App</div>
  )
}

App.propTypes = {
  pathname: PropTypes.string
}

export default App
