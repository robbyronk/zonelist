import {takeEvery} from "redux-saga";
import {fork, put, call} from "redux-saga/effects";
import ActionTypes, {setItems} from '../actions'


function *createNewItem(action) {
  const afterId = action.id
  const item = {
    id: (new Date().getTime()),
    title: '',
    children: [],
    status: 'toDo'
  }
  yield put({type: ActionTypes.NEW_ITEM, item, afterId})
}

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

export default function* sagas() {
  yield fork(takeEvery, ActionTypes.NEW_ITEM_AFTER, createNewItem)
  yield fork(takeEvery, ActionTypes.START_SESSION, fetchTasks)
}
