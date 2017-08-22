import {takeEvery, delay} from "redux-saga";
import {fork, put, call, take, cancel} from "redux-saga/effects";
import ActionTypes, {setItems} from '../actions'

function getTasks() {
  return fetch(
    '/api/tasks',
    {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      },
    }
  )
    .then(response => response.json())
    .then(responseJson => responseJson.data)
    .catch(e => e)
}

function* fetchTasks() {
  const tasks = yield call(getTasks)
  yield put(setItems(tasks))
}

function patchTask(id, data) {
  return fetch(
    `/api/tasks/${id}`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      },
      method: 'PATCH',
      body: JSON.stringify(data)
    }
  )
    .then(response => response.json())
    .catch(e => e)
}

function postTask(data) {
  return fetch(
    '/api/tasks',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      },
      method: 'POST',
      body: JSON.stringify(data)
    }
  )
    .then(response => response.json())
    .then(json => json.data)
    .catch(e => e)
}

function deleteTask(id) {
  return fetch(
    `/api/tasks/${id}`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      },
      method: 'DELETE',
    }
  )
    .catch(e => e)
}

function putTaskTitle({id, newTitle}) {
  const data = {task: {title: newTitle}}
  return patchTask(id, data);
}

function* handleUpdateTitle(action) {
  yield call(delay, 1000)
  yield call(putTaskTitle, action)
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
  yield call(patchTask, id, {task: {status}})
}

function* createTask({id: afterId}) {
  const task = yield call(postTask, {task: {afterId}})
  yield put({type: ActionTypes.NEW_ITEM, item: task, afterId})
}

function* removeTask({id}) {
  yield call(deleteTask, id)
}

export default function* sagas() {
  yield fork(watchTaskUpdates)
  yield fork(takeEvery, ActionTypes.NEW_ITEM_AFTER, createTask)
  yield fork(takeEvery, ActionTypes.REMOVE_ITEM, removeTask)
  yield fork(takeEvery, ActionTypes.SET_STATUS, setStatus)
  yield fork(takeEvery, ActionTypes.START_SESSION, fetchTasks)
}
