import { applyMiddleware, compose, createStore } from 'redux'
import promise from 'redux-promise'
import createHistory from 'history/createHashHistory'
import makeRootReducer from './reducers'
import { updateLocation } from './location'

export const history = createHistory()

// middlewares
const middlewares = [promise]

// initialState
const initialState = {}

// enhancers
const enhancers = []

let composeEnhancers = compose

// use redux chrome extension in development
if (__DEV__) {
  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension
  }
}

const store = createStore(
  makeRootReducer(),
  initialState,
  composeEnhancers(
    applyMiddleware(...middlewares),
    ...enhancers
  )
)

store.asyncReducers = {}

// To unsubscribe, invoke `store.unsubscribeHistory()` anytime
store.unsubscribeHistory = history.listen(updateLocation(store))

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const { makeRootReducer } = require('./reducers')
    store.replaceReducer(makeRootReducer(store.asyncReducers))
  })
}

export default store
