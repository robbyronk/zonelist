import items from "./items";
import auth from './auth'
import socket from './socket'
import {fork} from "redux-saga/effects";

export default function* rootSaga() {
  yield fork(items)
  yield fork(auth)
  yield fork(socket)
}
