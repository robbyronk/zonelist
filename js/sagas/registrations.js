import {takeLatest, takeEvery} from "redux-saga";
import {push} from "react-router-redux";
import {fork, put} from "redux-saga/effects";
import Constants from "../constants";
import {Socket} from "phoenix";
import Actions from "../actions/sessions";
import {httpPost, httpGet, httpDelete} from "../utils";

function *registerUser(action) {
  try {
    const registeredUser = yield httpPost('/api/v1/registrations', {user: action.user})
    localStorage.setItem('phoenixAuthToken', registeredUser.jwt)
    yield put(Actions.setCurrentUser(registeredUser.user))
    yield put(push('/'))
  } catch (e) {
    console.log(e)
    yield put({
      type: Constants.REGISTRATIONS_ERROR,
      errors: [{
        'tbd': 'tbd'
      }],
    })
  }
}

export default function* registrationsSagas() {
  yield fork(takeLatest, Constants.USER_REGISTERING, registerUser)
}