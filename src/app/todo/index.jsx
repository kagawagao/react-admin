import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from './reducer'

@connect(state => ({
  todos: state.todos
}), dispatch => (bindActionCreators(actions, dispatch)))
export default class Todo extends React.Component {
  static propTypes = {
    todos: PropTypes.array,
    addItem: PropTypes.func,
    deleteItem: PropTypes.func
  }

  addTodo = () => {
    this.props.addItem(`a${Date.now()}`)
  }

  deleteTodo = (e) => {
    const { id } = e.target.dataset
    this.props.deleteItem(id)
  }

  render () {
    const { todos = [] } = this.props
    return (
      <div className="todos-views">
        <h1>Todos</h1>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <span>{todo.todo}</span>
              <button onClick={this.deleteTodo} data-id={todo.id}>Delete</button>
            </li>
          ))}
        </ul>
        <button onClick={this.addTodo}>Add</button>
      </div>
    )
  }
}
