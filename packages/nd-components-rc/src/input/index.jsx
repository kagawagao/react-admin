import React, { PropTypes } from 'react'
import classnames from 'classnames'
import 'nd-components-style/lib/input.css'

const prefix = 'nd-input'

export default class Input extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    addons: PropTypes.shape({
      before: PropTypes.node,
      after: PropTypes.node
    })
  }

  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e)
    }
  }

  render () {
    const { className, addons = {}, ...others } = this.props
    const classNames = classnames([className, prefix, {
      [`${prefix}-large`]: others.large,
      [`${prefix}-small`]: others.small,
      [`${prefix}-error`]: others.error
    }])

    delete others.large
    delete others.small
    delete others.error
    const input = <input {...others} className={classNames} onChange={this.handleChange} />
    const { before, after } = addons
    if (before || after) {
      return (
        <span className={`${prefix}-wrapper`}>
          {before ? <span className={`${prefix}-before`}>{before}</span> : null}
          {input}
          {after ? <span className={`${prefix}-after`}>{after}</span> : null}
        </span>
      )
    } else {
      return input
    }
  }
}

// TODO: Input Group
export class InputGroup extends React.Component {
  render () {
    return (
      <div>Input Group</div>
    )
  }
}
