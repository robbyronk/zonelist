import {createStore, applyMiddleware, compose} from "redux";
import createLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

export const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, composeEnhancers(
    applyMiddleware(sagaMiddleware, loggerMiddleware),
  ));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;

      store.replaceReducer(nextReducer);
    })
  }

  return store
}
