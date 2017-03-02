import React, { PropTypes } from 'react'
import { Route } from 'react-router'

export default class RouteAsync extends React.Component {
  static propTypes = {
    getComponent: PropTypes.func.isRequired,
    computedMatch: PropTypes.object,
    match: PropTypes.object,
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
          console.error(e)
          throw new Error(e)
        })
    }
  }

  render () {
    const { computedMatch, match } = this.props
    const { url } = computedMatch || match || {}
    const { component } = this.state
    const path = url ? url + this.props.path : this.props.path

    return (
      <Route {...this.props} path={path} render={(props) => {
        if (component === undefined) {
          this.getComponent()
        }
        return component ? React.createElement(component, props) : null
      }} />
    )
  }
}
