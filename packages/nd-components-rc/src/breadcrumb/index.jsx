import React, { PropTypes } from 'react'
import classnames from 'classnames'
import 'nd-components-style/lib/breadcrumb.css'

const prefix = 'nd-breadcrumb'

export default class Breadcrumb extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    separator: PropTypes.string,
    onClick: PropTypes.func
  }

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    const { index } = e.currentTarget.dataset
    const { separator = '/' } = this.props
    if (typeof this.props.onClick === 'function' && e.target.innerText !== separator) {
      this.props.onClick(e, parseInt(index))
    }
  }

  render () {
    const { className, children, separator = '/', ...others } = this.props
    const classNames = classnames([prefix, className])
    let elements = children
    if (!Array.isArray(children)) {
      elements = [children]
    }
    return (
      <div className={classNames} {...others}>
        {elements.map((element, index) => (
          <span key={`${prefix}-item-${index}`} data-index={index} onClick={this.handleClick}>
            {element}
            {index !== elements.length - 1 ? (<span className={`${prefix}-sep`}>{separator}</span>) : null}
          </span>
        ))}
      </div>
    )
  }
}

export class BreadcrumbItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  }

  constructor () {
    super()
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick (e) {
    const { onClick } = this.props
    if (onClick && typeof onClick === 'function') {
      onClick(e)
    }
  }

  render () {
    const { className, children, ...others } = this.props
    const classNames = classnames([`${prefix}-item`, className])
    return <span {...others} onClick={this.handleItemClick} className={classNames}>{children}</span>
  }
}
