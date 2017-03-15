import sessionSagas from "./session";
import registrationsSagas from "./registrations";
import items from "./items";
import {fork} from "redux-saga/effects";

export default function* rootSaga() {
  yield fork(sessionSagas)
  yield fork(registrationsSagas)
  yield fork(items)
}