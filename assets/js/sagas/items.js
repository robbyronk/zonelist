import {delay, takeEvery} from "redux-saga";
import {call, cancel, fork, put, take} from "redux-saga/effects";

import ActionTypes, {setItems} from '../actions'
import {apiDeleteTask, apiGetTasks, apiPatchTask, apiPostTask} from "../api";

export function* fetchTasks() {
  const tasks = yield call(apiGetTasks)
  yield put(setItems(tasks))
}

function* handleUpdateTitle({id, newTitle}) {
  yield call(delay, 1000)
  yield call(apiPatchTask, id, {task: {title: newTitle}})
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
  yield call(apiPatchTask, id, {task: {status}})
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

export default function* sagas() {
  yield fork(watchTaskUpdates)
  yield fork(takeEvery, ActionTypes.NEW_ITEM_AFTER, createTask)
  yield fork(takeEvery, ActionTypes.REMOVE_ITEM, removeTask)
  yield fork(takeEvery, ActionTypes.SET_STATUS, setStatus)
  yield fork(takeEvery, ActionTypes.START_SESSION, fetchTasks)
}
