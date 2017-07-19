import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import configureStore, {sagaMiddleware} from "./store";
import Root from "./root";
import rootSaga from "./sagas";

import '../assets/css/application.scss'

const store = configureStore();
sagaMiddleware.run(rootSaga)

const target = document.getElementById('main_container');
const node = <Root store={store}/>;

ReactDOM.render(node, target);
