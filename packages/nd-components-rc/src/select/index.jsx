import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Icon from '../icon'
import 'nd-components-style/lib/select.css'

const prefix = 'nd-select'

export default class Select extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    multi: PropTypes.bool,
    placeholder: PropTypes.string
  }

  constructor (props) {
    super(props)
    let value = props.value
    if (props.multi && !Array.isArray(props.value)) {
      value = [props.value]
    }
    this.state = {
      visible: false,
      value
    }
    this.getLabels = this.getLabels.bind(this)
    this.getLabelFromChild = this.getLabelFromChild.bind(this)
    this.getLabelFromProps = this.getLabelFromProps.bind(this)
    this.handleSelectClick = this.handleSelectClick.bind(this)
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.handleSelectBlur = this.handleSelectBlur.bind(this)
    this.adjustPosition = this.adjustPosition.bind(this)
    this.removeValue = this.removeValue.bind(this)
  }

  handleSelectBlur () {
    this.setState({
      visible: false
    })
  }

  handleSelectClick () {
    if (!this.state.visible) {
      this.adjustPosition()
    }
    this.setState({
      visible: !this.state.visible
    })
  }

  handleOptionClick (e) {
    const { value } = e.currentTarget
    let _value = value
    if (this.props.multi) {
      e.stopPropagation()
      if (this.state.value) {
        if (!Array.isArray(this.state.value)) {
          _value = [this.state.value]
        } else {
          _value = [ ...this.state.value ]
        }
        var set = new Set(_value)
        if (set.has(value)) {
          set.delete(value)
        } else {
          set.add(value)
        }
        _value = Array.from(set)
      } else {
        _value = [value]
      }
    }
    this.setState({
      value: _value
    }, this.adjustPosition)
  }

  removeValue (e) {
    e.stopPropagation()
    const { value } = e.target.dataset
    this.setState({
      value: this.state.value.filter(val => this.data[val] !== this.data[value])
    }, this.adjustPosition)
  }

  adjustPosition () {
    const el = ReactDOM.findDOMNode(this)
    const optContainer = this.optionsContainer
    const offsetHeight = el.offsetHeight
    optContainer.style.left = 0
    const rect = el.getBoundingClientRect()
    if ((window.innerHeight - rect.bottom) > 250) {
      optContainer.style.top = `${offsetHeight}px`
      optContainer.style.bottom = ''
    } else {
      optContainer.style.top = ''
      optContainer.style.bottom = `${offsetHeight}px`
    }
  }

  getLabels (children) {
    const data = {}
    let childArr = children
    if (!Array.isArray(childArr)) {
      childArr = [childArr]
    }

    childArr.map(child => {
      const label = this.getLabelFromChild(child)
      const { value = label } = child.props
      data[value] = label
    })

    this.data = data
    return data
  }

  getLabelFromChild (child) {
    if (Array.isArray(child)) {
      throw new TypeError('Invalid Child in Option')
    }
    const { props = {} } = child
    if (props.label) {
      return props.label
    } else {
      return this.getLabelFromProps(props)
    }
  }

  getLabelFromProps (props) {
    const { children } = props
    if (typeof children === 'string') {
      return children
    } else {
      return this.getLabelFromChild(children)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  componentDidMount () {
    const optionsContainer = this.optionsContainer
    optionsContainer.style.visibility = 'hidden'
    optionsContainer.style.display = 'block'
    const computedStyle = getComputedStyle(optionsContainer)
    const width = computedStyle.width
    const el = ReactDOM.findDOMNode(this)
    el.style.width = width
    optionsContainer.style.display = ''
    optionsContainer.style.visibility = ''
  }

  render () {
    const { children, className, defaultValue, disabled, placeholder, multi, ...others } = this.props

    delete others.value

    const { visible, containerStyle } = this.state

    const realChildren = React.Children.map(children, child => React.cloneElement(child, {
      onClick: this.handleOptionClick,
      selected: multi && Array.isArray(this.state.value) ? this.state.value.indexOf(child.props.value) !== -1 : this.state.value === child.props.value
    }))

    const classNames = classnames([prefix, className, {
      [`${prefix}-visible`]: visible,
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-multi`]: multi
    }])
    const data = this.getLabels(children)
    let _value = this.state.value || defaultValue || ''

    return (
      <div
        {...others}
        className={classNames}
        onClick={this.handleSelectClick}
        onBlur={this.handleSelectBlur}
        tabIndex="0">
        {_value ? (
          <div className={classnames([`${prefix}-content`, `${prefix}-value`])}>{
            multi ? (
              <ul className={`${prefix}-value-multi`}>
                {_value.map((val, index) => (
                  <li key={`${val}-${index}`}>
                    <span>{data[val]}</span>
                    <Icon data-value={val} icon="close" className={`${prefix}-value-remove`} onClick={this.removeValue} />
                  </li>
                ))}
              </ul>
            ) : data[_value]
          }</div>
        ) : (
          <div className={classnames([`${prefix}-content`, `${prefix}-placeholder`])}>{placeholder}</div>
        )}
        <Icon icon="angle-down" className={`${prefix}-icon`} />
        <div
          ref={div => { this.optionsContainer = div }}
          className={classnames([`${prefix}-container`, {
            [`${prefix}-container-visible`]: visible,
            [`${prefix}-container-hidden`]: !visible
          }])}
          style={containerStyle}>
          <ul className={`${prefix}-options`}>
            {realChildren}
          </ul>
        </div>
      </div>
    )
  }
}

export class Option extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    value: PropTypes.any.isRequired,
    label: PropTypes.any,
    selected: PropTypes.bool
  }

  render () {
    const { children, className, value, label, selected, ...others } = this.props

    const classNames = classnames([`${prefix}-option`, className, {
      [`${prefix}-option-selected`]: selected
    }])
    return (
      <li {...others} className={classNames} value={value} label={label}>
        <span>{children}</span>
        {selected ? <Icon icon="check" className={`${prefix}-option-selected-icon`} /> : null}
      </li>
    )
  }
}
