import React, { PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from 'store'
import { injectReducer } from 'store/reducers'
import reducer, { actions } from './reducer'

// inject reducer async
injectReducer(store, { key: 'count', reducer })

@connect(state => ({
  count: state.count
}), dispatch => ({
  ...bindActionCreators(actions, dispatch)
}))
export default class Counter extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    plus: PropTypes.func,
    minus: PropTypes.func,
    doubleAsync: PropTypes.func
  }

  @autobind
  plus () {
    this.props.plus(1)
  }

  @autobind
  minus () {
    this.props.minus(1)
  }

  render () {
    return (
      <div>
        <div>Count: {this.props.count}</div>
        <button onClick={this.plus}>+</button>
        <button onClick={this.minus}>-</button>
      </div>
    )
  }
}
