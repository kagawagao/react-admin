import React, { PropTypes } from 'react'
import { Match } from 'react-router'

export default class MatchAsync extends React.Component {
  static propTypes = {
    getComponent: PropTypes.func,
    pathname: PropTypes.string,
    pattern: PropTypes.string.isRequired
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
    const { pathname } = this.props
    const { component } = this.state

    const pattern = pathname ? pathname + this.props.pattern : this.props.pattern

    return (
      <Match {...this.props} pattern={pattern} render={(props) => {
        if (component === undefined) {
          this.getComponent()
        }
        return component ? React.createElement(component, props) : null
      }} />
    )
  }
}
