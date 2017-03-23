import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import {browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import configureStore, {sagaMiddleware} from "./store";
import Root from "./containers/root";
import rootSaga from "./sagas";

import '../css/application.scss'

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(rootSaga)

const target = document.getElementById('main_container');
const node = <Root routerHistory={history} store={store}/>;

ReactDOM.render(node, target);