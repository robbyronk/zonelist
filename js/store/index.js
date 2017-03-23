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

  const store = createStore(reducers, composeEnhancers(
    applyMiddleware(sagaMiddleware, reduxRouterMiddleware, loggerMiddleware),
    persistState('items')
  ));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default;

      store.replaceReducer(nextReducer);
    })
  }

  return store
}