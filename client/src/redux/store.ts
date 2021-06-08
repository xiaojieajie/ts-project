import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import { IRootState, rootReducer } from './reducers/RootReducer'
import thunk, { ThunkMiddleware } from 'redux-thunk'


export default createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger))
