import {fork} from "redux-saga/effects";

import items from "./items";
import auth from './auth'
import socket from './socket'
import validate from "./validate";

export default function* rootSaga() {
  yield fork(items)
  yield fork(auth)
  yield fork(socket)
  yield fork(validate)
}
