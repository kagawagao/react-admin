import React, { Component, PropTypes } from 'react'
import { hashHistory as history, Router } from 'react-router'
import { Provider } from 'react-redux'

export default class App extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}
