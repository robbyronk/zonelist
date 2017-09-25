import {Socket} from 'phoenix';

import {eventChannel, takeLatest} from "redux-saga";
import {call, fork, put, select, take} from "redux-saga/effects";

import ActionTypes, {indentItem, removeItem, unindentItem, updateTask} from '../actions'
import {fetchTasks} from "./items";
import {sessionId} from "../selectors/index";

function createEventChannel(phoenixChannel, phoenixEventName) {
  return eventChannel(emit => {
    const doEmit = payload => emit({payload})

    phoenixChannel.on(phoenixEventName, doEmit);

    return () => phoenixChannel.off(phoenixEventName, doEmit);
  });
}

function *watchTaskCreate(phoenixChannel){
  const channel = createEventChannel(phoenixChannel, 'task_create')
  while (true) {
    yield take(channel)
    yield call(fetchTasks)
  }
}

function *watchTaskUpdate(phoenixChannel){
  const channel = createEventChannel(phoenixChannel, 'task_update')
  while (true) {
    const event = yield take(channel)
    const mySessionId = yield select(sessionId)
    if (mySessionId !== event.payload.sessionId) {
      yield put(updateTask(event.payload));
    }
  }
}

function *watchTaskIndent(phoenixChannel){
  const channel = createEventChannel(phoenixChannel, 'task_indent')
  while (true) {
    const event = yield take(channel)
    const mySessionId = yield select(sessionId)
    if (mySessionId !== event.payload.sessionId) {
      yield put(indentItem(event.payload.id, true));
    }
  }
}

function *watchTaskUnindent(phoenixChannel){
  const channel = createEventChannel(phoenixChannel, 'task_unindent')
  while (true) {
    const event = yield take(channel)
    const mySessionId = yield select(sessionId)
    if (mySessionId !== event.payload.sessionId) {
      yield put(unindentItem(event.payload.id, true));
    }
  }
}

function *watchTaskDelete(phoenixChannel){
  const channel = createEventChannel(phoenixChannel, 'task_delete')
  while (true) {
    const event = yield take(channel)
    yield put(removeItem(event.payload.id, true));
  }
}

function* startSocket(action) {
  const {session} = action;

  const socket = new Socket('/socket', {
    params: {token: localStorage.getItem('id_token')},
    logger: (kind, msg, data) => {
      console.log(`${kind}: ${msg}`, data)
    },
  });
  socket.connect();
  const phoenixChannel = socket.channel(`users:${session.user}`, {})
  phoenixChannel.join();

  yield fork(watchTaskCreate, phoenixChannel)
  yield fork(watchTaskUpdate, phoenixChannel)
  yield fork(watchTaskDelete, phoenixChannel)
  yield fork(watchTaskIndent, phoenixChannel)
  yield fork(watchTaskUnindent, phoenixChannel)
}

export default function* getWatcher() {
  yield fork(takeLatest, ActionTypes.START_SESSION, startSocket);
}
