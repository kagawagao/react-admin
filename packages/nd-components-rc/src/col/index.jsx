import React, { PropTypes } from 'react'
import classnames from 'classnames'
import 'nd-components-style/lib/columns.css'

export default class Col extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    span: PropTypes.number,
    offset: PropTypes.number,
    className: PropTypes.string
  }

  render () {
    const { span, offset, children, className } = this.props
    const classNames = classnames([className, {
      [`nd-cols-span-${span}`]: span,
      [`nd-cols-offset-${offset}`]: offset
    }])
    return (
      <div className={classNames}>
        {children}
      </div>
    )
  }
}
