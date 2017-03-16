import {takeEvery} from "redux-saga";
import {fork, put} from "redux-saga/effects";
import uniqueId from "lodash/uniqueId";


function *createNewItem(action) {
  const afterId = action.id
  const item = {
    id: uniqueId('item_'),
    title: '',
    children: [],
  }
  yield put({type: 'NEW_ITEM', item, afterId})
}

export default function* sagas() {
  yield fork(takeEvery, 'NEW_ITEM_AFTER', createNewItem)
}