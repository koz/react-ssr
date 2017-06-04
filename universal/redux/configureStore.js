import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux'
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux'

import reducer from './reducers'

export default (history, initialState) => {
  const routerMiddlewareWithHistory = routerMiddleware(history)
  //eslint-disable-next-line
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const middlewares = applyMiddleware(routerMiddlewareWithHistory)

  const store = createStore(combineReducers({
    todo: reducer,
    router: routerReducer,
  }), {
    ...initialState,
  }, composeEnhancers(middlewares))

  return store
}
