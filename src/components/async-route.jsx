import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'

export default class AsyncRoute extends React.Component {
  static propTypes = {
    getComponent: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      component: undefined
    }
  }

  getComponent () {
    if (this.props.getComponent && typeof this.props.getComponent === 'function') {
      this.props.getComponent()
        .then(component => {
          this.setState({
            component
          })
        })
        .catch(e => {
          throw new Error(e)
        })
    }
  }

  render () {
    const { component } = this.state
    const path = this.props.path

    return (
      <Route {...this.props} path={path} render={(props) => {
        if (component === undefined) {
          this.getComponent()
        }

        return component ? React.createElement(component.default, props) : null
      }} />
    )
  }
}
