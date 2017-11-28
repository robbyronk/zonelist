import update from 'immutability-helper';
import find from 'lodash/find'
import includes from 'lodash/includes'
import omit from 'lodash/omit'
import without from 'lodash/without'
import mapValues from 'lodash/mapValues'
import {every, get, isArray, isEmpty, isEqual, isPlainObject, keyBy, some, trimStart} from 'lodash'
import ActionTypes from '../actions'

const initialState = {
}

const insertAt = (index, insert, arr) => ([...arr.slice(0, index), insert, ...arr.slice(index)])

function findParent(items, id) {
  return find(items, i => includes(i.children, id))
}

export function isChild(items, parentId, childId) {
  const children = get(items, `${parentId}.children`, [])
  if(isEmpty(children)) return false
  if(includes(children, childId)) return true
  return some(children, (c) => isChild(items, c, childId))
}

function updateTitle(state, {id, newTitle}) {
  return update(state, {[id]: {title: {$set: trimStart(newTitle)}}})
}

function newTaskAfter(state, action) {
  const {afterId, item} = action
  if (state[afterId].root) {
    return newTaskUnder(state, {underId: afterId, item})
  }
  const parent = findParent(state, afterId)
  const insertIndex = parent.children.indexOf(afterId) + 1 // +1 to put it after `afterId`
  return update(state, {
    [item.id]: {$set: item},
    [parent.id]: {children: {$splice: [[insertIndex, 0, item.id]]}}
  })
}

function newTaskUnder(state, action) {
  const {underId, item} = action
  return update(state, {
    [item.id]: {$set: item},
    [underId]: {children: {$splice: [[0, 0, item.id]]}}
  })
}

function removeTask(state, {id}) {
  return mapValues(omit(state, [id]), task => Object.assign({}, task, {children: without(task.children, id)}))
}

function moveTask(state, {id, afterId, parent}) {
  if (state[id].root) {
    return state
  }
  if(!parent || isChild(id, parent)) {
    return state
  }
  const targetChildren = get(state, `${parent}.children`, [])
  if(targetChildren[targetChildren.indexOf(afterId) + 1] === id) return state
  return mapValues(state, task => {
    const withoutId = without(task.children, id);
    if (task.id === parent) {
      const afterIndex = withoutId.indexOf(afterId)
      const firstSlice = withoutId.slice(0, afterIndex + 1);
      const secondSlice = withoutId.slice(afterIndex + 1);
      return {...task, children: [...firstSlice, id, ...secondSlice]}
    }
    return {...task, children: withoutId}
  })
}

function moveTaskBefore(state, {moveId, targetId}) {
  console.log('moveTaskBefore args', {moveId, targetId})
  if (moveId === targetId) {
    return state
  }
  if (state[targetId].root || state[moveId].root) {
    return state
  }
  const targetParent = findParent(state, targetId)
  const moveParent = findParent(state, moveId)
  if (!targetParent || !moveParent) {
    return state
  }

  if (isEqual(targetParent, moveParent)) {
    const newChildren = without(moveParent.children, moveId)
    const newTargetIndex = newChildren.indexOf(targetId);
    return update(state, {[targetParent.id]: {children: {$set: insertAt(newTargetIndex, moveId, newChildren)}}})
  }

  return update(
    state,
    {
      [targetParent.id]: {
        children: {$splice: [
          [targetParent.children.indexOf(targetId), 0, moveId]
        ]}
      },
      [moveParent.id]: {
        children: {$apply: children => without(children, moveId)}
      }
    }
  )

}

function indentTask(state, {id}) {
  if (state[id].root) {
    return state
  }
  const {children} = findParent(state, id)
  if(!children) {
    return state
  }
  const index = children.indexOf(id)
  if (index !== 0) {
    const parent = children[index - 1]
    const afterId = state[parent].children.slice(-1)[0]
    return moveTask(state, {id, afterId, parent})
  }
  return state
}

function unindentTask(state, {id}) {
  const parent = findParent(state, id)
  if (parent.root) {
    return state
  }
  const {children} = parent
  const indexId = children.indexOf(id)
  const obj = state[id];
  const newState = {
    ...state,
    [parent.id]: {...parent, children: children.slice(0, indexId)},
    [id]: {...obj, children: [...obj.children, ...children.slice(indexId + 1)]}
  }
  return moveTask(newState, {
    id,
    afterId: parent.id,
    parent: findParent(state, parent.id).id
  })
}

function setTasks(state, {items}) {
  // todo check items and make sure that it's correct
  if(isPlainObject(items)) {
    return items
  }
  if (isArray(items) && every(items, isPlainObject)) {
    return keyBy(items, 'id')
  }
  return state
}


function setStatus(state, {id, status}) {
  return update(state, {[id]: {status: {$set: status}}})
}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.INDENT_ITEM:
      return indentTask(state, action)
    case ActionTypes.UNINDENT_ITEM:
      return unindentTask(state, action)
    case ActionTypes.UPDATE_TITLE:
      return updateTitle(state, action)
    case ActionTypes.NEW_ITEM:
      return newTaskAfter(state, action)
    case ActionTypes.REMOVE_ITEM:
      return removeTask(state, action)
    case ActionTypes.MOVE_ITEM:
      return moveTask(state, action)
    case ActionTypes.MOVE_ITEM_BEFORE:
      return moveTaskBefore(state, action)
    case ActionTypes.RESET:
      return initialState
    case ActionTypes.SET_ITEMS:
      return setTasks(state, action)
    case ActionTypes.SET_STATUS:
      return setStatus(state, action)
    case ActionTypes.UPDATE_TASK:
      return update(state, {[action.task.id]: {$merge: action.task}})
    default:
      return state;
  }
}
