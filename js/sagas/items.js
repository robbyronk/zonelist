import {takeLatest, takeEvery} from "redux-saga";
import {push} from "react-router-redux";
import {fork, put} from "redux-saga/effects";
import {Socket} from "phoenix";
import uniqueId from 'lodash/uniqueId'
import Actions from "../actions/sessions";
import {httpPost, httpGet, httpDelete} from "../utils";


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