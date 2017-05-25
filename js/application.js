import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import configureStore, {sagaMiddleware} from "./store";
import Root from "./containers/root";
import rootSaga from "./sagas";

import '../css/application.scss'

const store = configureStore();
sagaMiddleware.run(rootSaga)

const target = document.getElementById('main_container');
const node = <Root store={store}/>;

ReactDOM.render(node, target);
