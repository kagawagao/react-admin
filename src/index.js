import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import createStore from 'store'
import routes from 'routes'
import App from 'app'
import 'styles/index.less'

// initial store
const store = createStore({})

const mountNode = document.getElementById('app')

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App store={store} routes={routes} />
    </AppContainer>,
    mountNode
  )
}

if (module.hot) {
  module.hot.accept('app', () => {
    const NextApp = require('app')
    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} routes={routes} />
      </AppContainer>,
      mountNode
    )
  })
}

render()
