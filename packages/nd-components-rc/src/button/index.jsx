import React, { PropTypes } from 'react'
import classnames from 'classnames'
import 'nd-components-style/lib/button.css'

const prefix = 'nd-btn'

export default class Button extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.handleBtnClick = this.handleBtnClick.bind(this)
  }

  handleBtnClick (e) {
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      this.props.onClick(e)
    }
  }

  render () {
    const { className, disabled, type, children, ...types } = this.props
    const addPrefix = (type) => `${prefix}-${type}`
    const classNames = classnames([className, prefix].concat(Object.keys(types).map(type => type && addPrefix(type))))
    return (
      <button className={classNames} disabled={disabled} type={type} onClick={this.handleBtnClick}>{children}</button>
    )
  }
}

export class ButtonGroup extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  render () {
    const { className, children, ...others } = this.props
    const classNames = classnames([className, `${prefix}-group`])
    return (
      <div className={classNames} {...others}>{children}</div>
    )
  }
}
