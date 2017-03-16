import items from "./items";
import {fork} from "redux-saga/effects";

export default function* rootSaga() {
  yield fork(items)
}