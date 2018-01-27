import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import store, { history } from 'store'
import { Provider } from 'react-redux'
import 'styles/index.less'

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
