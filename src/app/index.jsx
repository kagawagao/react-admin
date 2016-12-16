import React, { PropTypes } from 'react'
// import { Match } from 'react-router'

const App = ({ pathname, ...args }) => {
  console.log(pathname)
  console.log(args)
  return (
    <div>
      <h1>App</h1>
    </div>
  )
}

App.propTypes = {
  pathname: PropTypes.string
}

export default App
