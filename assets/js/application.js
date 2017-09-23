import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import configureStore, {sagaMiddleware} from "./store";
import Root from "./root";
import rootSaga from "./sagas";

if (process.env.NODE_ENV === 'production') {
  Raven.config('https://4b8dc207376b44d3a8dd047e56cf03e3@sentry.io/221104').install()
}

const store = configureStore();
sagaMiddleware.run(rootSaga)

const target = document.getElementById('main_container');
const node = <Root store={store}/>;

ReactDOM.render(node, target);
