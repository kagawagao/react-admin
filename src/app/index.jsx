import React from 'react'
import { Router } from 'react-router'
import createHashHistory from 'history/createHashHistory'
// import createBrowserHistory from 'history/createBrowserHistory'
import RouteAsync from 'components/route-async'
import routes from './routes'

const history = createHashHistory()

const App = () => {
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

export default App
