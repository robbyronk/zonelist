import {delay, takeEvery} from "redux-saga";
import {call, cancel, fork, put, select, take} from "redux-saga/effects";

import ActionTypes, {setItems} from '../actions'
import {apiDeleteTask, apiGetTasks, apiIndentTask, apiPatchTask, apiPostTask, apiUnindentTask} from "../api";
import {sessionId} from "../selectors/index";

export function* fetchTasks() {
  const tasks = yield call(apiGetTasks)
  yield put(setItems(tasks))
}

function* handleUpdateTitle({id, newTitle}) {
  yield call(delay, 1000)
  const mySessionId = yield select(sessionId)
  yield call(apiPatchTask, id, {sessionId: mySessionId, task: {title: newTitle}})
}

function* watchTaskUpdates() {
  let runningTasks = []
  while (true) {
    const action = yield take(ActionTypes.UPDATE_TITLE)
    if (runningTasks[action.id]) {
      yield cancel(runningTasks[action.id])
    }
    runningTasks[action.id] = yield fork(handleUpdateTitle, action)
  }
}

function* setStatus({id, status}) {
  const mySessionId = yield select(sessionId)
  yield call(apiPatchTask, id, {sessionId: mySessionId, task: {status}})
}

function* createTask({id: afterId}) {
  const task = yield call(apiPostTask, {task: {afterId}})
  yield put({type: ActionTypes.NEW_ITEM, item: task, afterId})
}

function* removeTask({id, fromPeer}) {
  if (!fromPeer) {
    yield call(apiDeleteTask, id)
  }
}

function* indentTask({id, fromPeer}) {
  if (!fromPeer) {
    const mySessionId = yield select(sessionId)
    yield call(apiIndentTask, id, {sessionId: mySessionId})
  }
}

function* unindentTask({id, fromPeer}) {
  if (!fromPeer) {
    const mySessionId = yield select(sessionId)
    yield call(apiUnindentTask, id, {sessionId: mySessionId})
  }
}

export default function* sagas() {
  yield fork(watchTaskUpdates)
  yield fork(takeEvery, ActionTypes.NEW_ITEM_AFTER, createTask)
  yield fork(takeEvery, ActionTypes.REMOVE_ITEM, removeTask)
  yield fork(takeEvery, ActionTypes.SET_STATUS, setStatus)
  yield fork(takeEvery, ActionTypes.START_SESSION, fetchTasks)
  yield fork(takeEvery, ActionTypes.INDENT_ITEM, indentTask)
  yield fork(takeEvery, ActionTypes.UNINDENT_ITEM, unindentTask)
}
