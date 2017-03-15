import {takeLatest, takeEvery} from "redux-saga";
import {push} from "react-router-redux";
import {fork, call, put} from "redux-saga/effects";
import Constants from "../constants";
import {Socket} from "phoenix";
import Actions from "../actions/sessions";
import {httpPost, httpGet, httpDelete} from "../utils";

function* signIn(action) {
  const data = {
    session: {
      email: action.email,
      password: action.password,
    },
  };

  try {
    const session = yield httpPost('/api/v1/sessions', data)
    localStorage.setItem('phoenixAuthToken', session.jwt);
    yield put(Actions.setCurrentUser(data.user))
    yield put(push('/'))
  } catch (e) {
    const errorJSON = yield e.response.json()
    yield put({
      type: Constants.SESSIONS_ERROR,
      error: errorJSON.error,
    })
  }
}

function* signOut(action) {
  try {
    const endedSession = yield httpDelete('/api/v1/sessions')
    localStorage.removeItem('phoenixAuthToken')
    yield put({type: Constants.USER_SIGNED_OUT,})
    yield put(push('/sign_in'))
  } catch (e) {
    console.log(e)
  }
}

function* getCurrentUser() {
  try {
    const data = yield call(httpGet, '/api/v1/current_user')
    yield put(Actions.setCurrentUser(data))
  } catch (e) {
    console.log(e);
    yield put(push('/sign_in'));
  }
}

function* setCurrentUser(action) {
  const socket = new Socket('/socket', {
    params: {token: localStorage.getItem('phoenixAuthToken')},
    logger: (kind, msg, data) => {
      // console.log(`${kind}: ${msg}`, data);
    },
  });

  socket.connect();

  const user = action.user

  const channel = socket.channel(`users:${user.id}`);

  yield put(Actions.setSocket(socket, channel))
}

export default function* sessionSagas() {
  yield fork(takeLatest, Constants.USER_SIGNING_IN, signIn)
  yield fork(takeLatest, Constants.USER_SIGNING_OUT, signOut)
  yield fork(takeLatest, Constants.GET_CURRENT_USER, getCurrentUser)
  yield fork(takeEvery, Constants.SET_CURRENT_USER, setCurrentUser)
}