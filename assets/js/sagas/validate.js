import {call, select, take} from "redux-saga/effects";
import {includes, isEqual, keyBy} from "lodash";
import diff from 'deep-diff'

import {apiGetTasks} from "../api";
import {itemsSelector} from "../selectors/items";
import ActionTypes from "../actions";

const ignore = [
  ActionTypes.UPDATE_TITLE,
  ActionTypes.UNSELECT_TASK,
  ActionTypes.SET_STATUS,
]

export default function* validate() {
  let oldItems = yield select(itemsSelector)
  while (true) {
    let action = yield take('*')
    let newItems = yield select(itemsSelector)
    if (!includes(ignore, action.type) && !isEqual(oldItems, newItems)) {
      console.log('validate: checking items on server', action.type)
      let serverItems = yield call(apiGetTasks)
      serverItems = keyBy(serverItems, 'id')
      if (!isEqual(newItems, serverItems)) {
        // todo send the action type to sentry
        console.error('validate', action.type, diff(newItems, serverItems))
      }
      oldItems = newItems
    }
  }
}
