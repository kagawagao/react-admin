import Promise from 'core-js/es6/promise'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import store, { history } from 'store'
import { Provider } from 'react-redux'
// import App from './app'
import 'nd-components-style/lib/reset.css'
import 'styles/index.less'

if (!window.Promise) {
  window.Promise = Promise
}

const mountNode = document.getElementById('app')

const render = () => {
  const App = require('app')
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    mountNode
  )
}

if (module.hot) {
  module.hot.accept('app', render)
}

render()
