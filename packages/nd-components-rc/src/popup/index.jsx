import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class Popup extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }
  constructor () {
    super()
    this.mountNode = this.mountNode.bind(this)
  }

  mountNode () {
    const { className, children, ...props } = this.props
    if (!this.el) {
      const el = document.createElement('div')
      el.style.position = 'absolute'
      el.style.top = 0
      el.style.left = 0
      document.body.append(el)
      this.el = el
    }

    ReactDOM.render((
      <div {...props} className={className}>
        {children}
      </div>
    ), this.el)
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this.el)
    document.body.removeChild(this.el)
    this.el = null
  }

  render () {
    this.mountNode()
    return null
  }
}
