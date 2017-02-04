// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_PLUS = 'COUNTER_PLUS'
export const COUNTER_MINUS = 'COUNTER_MINUS'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function plus (value = 1) {
  return {
    type: COUNTER_PLUS,
    payload: value
  }
}

export function minus (value = 1) {
  return {
    type: COUNTER_MINUS,
    payload: value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().count
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  plus,
  minus,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_PLUS]: (state, action) => state + action.payload,
  [COUNTER_MINUS]: (state, action) => state - action.payload,
  [COUNTER_DOUBLE_ASYNC]: (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
