import React, { Component, PropTypes } from 'react'
import { hashHistory as history, Router, Route } from 'react-router'
import { Provider } from 'react-redux'
import Home from './home'

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

    console.log(routes)

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Home} />
        </Router>
      </Provider>
    )
  }
}
