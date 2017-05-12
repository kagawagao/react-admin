import React, { PropTypes } from 'react'
import classnames from 'classnames'
import 'nd-components-style/lib/iconfont.css'

const prefix = 'nd-icon'

export default class Icon extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    icon: PropTypes.string
  }

  render () {
    const { className, children, icon, ...others } = this.props
    const classNames = classnames([prefix, className, `${prefix}-${icon}`])
    return <i {...others} className={classNames} title={icon}>{children}</i>
  }
}
