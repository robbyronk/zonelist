import {takeEvery} from "redux-saga";
import {fork, put} from "redux-saga/effects";
import ActionTypes from '../actions'


function *createNewItem(action) {
  const afterId = action.id
  const item = {
    id: (new Date().getTime()),
    title: '',
    children: [],
  }
  yield put({type: ActionTypes.NEW_ITEM, item, afterId})
}

export default function* sagas() {
  yield fork(takeEvery, ActionTypes.NEW_ITEM_AFTER, createNewItem)
}
