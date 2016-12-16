import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import createStore from 'store'
import routes from 'routes'
import { HashRouter as Router, Match } from 'react-router'
import { Provider } from 'react-redux'
import 'styles/index.less'

// initial store
const store = createStore({})

const mountNode = document.getElementById('app')

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <div>
            {routes.map((route, index) => (
              <Match {...route} key={index} />
            ))}
          </div>
        </Router>
      </Provider>
    </AppContainer>,
    mountNode
  )
}

if (module.hot) {
  module.hot.accept('app', render)
  module.hot.accept('routes', render)
}

render()
