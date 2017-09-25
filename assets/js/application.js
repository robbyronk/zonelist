import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Raven from 'raven-js'
import configureStore, {sagaMiddleware} from "./store";
import rootSaga from "./sagas";
import {Provider} from "react-redux";
import MainLayout from './components/main'


if (process.env.NODE_ENV === 'production') {
  Raven.config('https://4b8dc207376b44d3a8dd047e56cf03e3@sentry.io/221104').install()
}

const store = configureStore();
sagaMiddleware.run(rootSaga).done.catch((e) => {
  console.error(e.message)
  if (process.env.NODE_ENV === 'production') {
    Raven.captureException(e)
    alert('Sorry, we hit a fatal error. Restarting...')
    location.reload();
  }
})

ReactDOM.render(
  <Provider store={store}>
    <MainLayout/>
  </Provider>,
  document.getElementById('main_container')
);
