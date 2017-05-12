// @flow
import { createAction, handleActions } from 'redux-actions'
import { injectReducer } from 'store/reducers'
import store from 'store'

// constans
export const ADD_ITEM = 'ADD_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'

// actions
export const addItem = createAction(ADD_ITEM, (todo: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todo)
    }, 1000)
  })
})

export const deleteItem = createAction(DELETE_ITEM)

export const actions = {
  addItem,
  deleteItem
}

// initial state
const initialState = []

// reducers
export const reducer = handleActions({
  [ADD_ITEM]: (state, { payload: todo }) => {
    state.push({
      id: `${Date.now()}`,
      todo
    })
    return [ ...state ]
  },

  [DELETE_ITEM]: (state, { payload: id }) => state.filter(todo => todo.id !== id)
}, initialState)

// inject it
injectReducer(store, {
  key: 'todos',
  reducer
})
