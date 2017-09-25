import {call, select, take} from "redux-saga/effects";
import {includes, isEqual, keyBy} from "lodash";
import diff from 'deep-diff'

import {apiGetTasks} from "../api";
import {tasksSelector} from "../selectors/items";
import ActionTypes from "../actions";

const ignore = [
  ActionTypes.UPDATE_TITLE,
  ActionTypes.UNSELECT_TASK,
  ActionTypes.SET_STATUS,
]

export default function* validate() {
  let oldTasks = yield select(tasksSelector)
  while (true) {
    let action = yield take('*')
    let newTasks = yield select(tasksSelector)
    if (!includes(ignore, action.type) && !isEqual(oldTasks, newTasks)) {
      console.log('validate: checking tasks on server', action.type)
      let serverTasks = yield call(apiGetTasks)
      serverTasks = keyBy(serverTasks, 'id')
      if (!isEqual(newTasks, serverTasks)) {
        // todo send the action type to sentry
        console.error('validate', action.type, diff(newTasks, serverTasks))
      }
      oldTasks = newTasks
    }
  }
}
