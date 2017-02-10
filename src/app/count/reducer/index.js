// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_PLUS = 'COUNTER_PLUS'
export const COUNTER_MINUS = 'COUNTER_MINUS'

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

export const actions = {
  plus,
  minus
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_PLUS]: (state, action) => state + action.payload,
  [COUNTER_MINUS]: (state, action) => state - action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
