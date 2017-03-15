import {createStore, applyMiddleware, compose} from "redux";
import {routerMiddleware} from "react-router-redux";
import createLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import persistState from 'redux-localstorage'
import reducers from "../reducers";

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

export const sagaMiddleware = createSagaMiddleware()

export default function configureStore(browserHistory) {
  const reduxRouterMiddleware = routerMiddleware(browserHistory)

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(reducers, composeEnhancers(
    applyMiddleware(sagaMiddleware, reduxRouterMiddleware, loggerMiddleware),
    persistState('items')
  ))
}