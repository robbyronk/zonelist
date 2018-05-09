import {delay, takeEvery, takeLatest} from "redux-saga";
import {call, cancel, fork, put, race, select, take} from "redux-saga/effects";

import ActionTypes, {setItems} from '../actions'
import {
  apiDeleteTask,
  apiGetTasks,
  apiIndentTask,
  apiMoveTaskAfter,
  apiMoveTaskBefore,
  apiPatchTask,
  apiPostTask,
  apiUnindentTask,
} from "../api";
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

function* watchTaskMoves() {
  let isDragging = true;
  let lastMove = null;
  while (isDragging) {
    const {finish, move} = yield race({
      finish: take(ActionTypes.FINISH_DRAG),
      move: take([ActionTypes.MOVE_ITEM_BEFORE, ActionTypes.MOVE_ITEM_AFTER]),
    })
    if (finish && lastMove) {
      const mySessionId = yield select(sessionId)
      if (lastMove.type === ActionTypes.MOVE_ITEM_BEFORE) {
        yield call(apiMoveTaskBefore, lastMove.moveId, lastMove.targetId, {sessionId: mySessionId})
      }
      if (lastMove.type === ActionTypes.MOVE_ITEM_AFTER) {
        yield call(apiMoveTaskAfter, lastMove.moveId, lastMove.targetId, {sessionId: mySessionId})
      }
      return;
    }
    lastMove = move
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
  yield fork(takeLatest, ActionTypes.START_DRAG, watchTaskMoves)
}
