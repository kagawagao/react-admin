import React, { PropTypes } from 'react'
import classnames from 'classnames'

const prefix = 'nd-menu'

const modes = ['horizontal', 'vertical', 'inline']

export default class Menu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    mode: PropTypes.oneOf(modes)
  }
  render () {
    const { className, children, ...others } = this.props
    const classNames = classnames([className, `${prefix}`])
    return (
      <ul {...others} className={classNames}>
        {children}
      </ul>
    )
  }
}

export class MenuItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
  }

  render () {
    const { className, children, ...others } = this.props
    const classNames = classnames([className, `${prefix}-item`])
    return (
      <li {...others} className={classNames}>
        {children}
      </li>
    )
  }
}
