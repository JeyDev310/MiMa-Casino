import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [sagaMiddleware, thunk]

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))
sagaMiddleware.run(rootSaga)

export default store