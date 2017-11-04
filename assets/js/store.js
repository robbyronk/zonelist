import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";

export const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewares = [sagaMiddleware]

  // if (process.env.NODE_ENV !== 'production') {
  //   const createLogger = require('redux-logger').createLogger
  //
  //   const loggerMiddleware = createLogger({
  //     level: 'info',
  //     collapsed: true,
  //     duration: true,
  //   });
  //
  //   middlewares.push(loggerMiddleware);
  // }

  const store = createStore(reducers, composeEnhancers(
    applyMiddleware(...middlewares),
  ));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;

      store.replaceReducer(nextReducer);
    })
  }

  return store
}
