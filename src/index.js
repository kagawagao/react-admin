import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import store from 'store'
import { Provider } from 'react-redux'
// import App from './app'
import 'styles/index.less'

const mountNode = document.getElementById('app')

const render = () => {
  const App = require('app')
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    mountNode
  )
}

if (module.hot) {
  module.hot.accept('app', render)
}

render()
