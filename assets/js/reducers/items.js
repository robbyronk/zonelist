import update from 'immutability-helper';
import find from 'lodash/find'
import includes from 'lodash/includes'
import uniqueId from 'lodash/uniqueId'
import omit from 'lodash/omit'
import without from 'lodash/without'
import mapValues from 'lodash/mapValues'
import {get, isEmpty, some, isPlainObject, trimStart, isArray, every, keyBy} from 'lodash'
import ActionTypes from '../actions'
import {rootTask} from "../selectors/board";

const initialState = {
}

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

function newItemAfter(state, action) {
  const {afterId, item} = action
  if (state[afterId].root) {
    return newItemUnder(state, {underId: afterId, item})
  }
  const parent = findParent(state, afterId)
  const insertIndex = parent.children.indexOf(afterId) + 1 // +1 to put it after `afterId`
  return update(state, {
    [item.id]: {$set: action.item},
    [parent.id]: {children: {$splice: [[insertIndex, 0, item.id]]}}
  })
}

function newItemUnder(state, action) {
  const {underId, item} = action
  return update(state, {
    [item.id]: {$set: action.item},
    [underId]: {children: {$splice: [[0, 0, item.id]]}}
  })
}

function removeItem(state, action) {
  const {id} = action

  // hack
  const root = rootTask({items: state})
  if(root.children.length === 1 && id === root.children[0]) {
    return update(state, {
      [id]: {
        title: {$set: ''},
        children: {$set: []},
      }
    })
  }

  return mapValues(omit(state, [id]), item => Object.assign({}, item, {children: without(item.children, id)}))
}

function moveItem(state, {id, afterId, parent}) {
  if (state[id].root) {
    return state
  }
  if(!parent || isChild(id, parent)) {
    return state
  }
  const targetChildren = get(state, `${parent}.children`, [])
  if(targetChildren[targetChildren.indexOf(afterId) + 1] === id) return state
  return mapValues(state, item => {
    const withoutId = without(item.children, id);
    if (item.id === parent) {
      const afterIndex = withoutId.indexOf(afterId)
      const firstSlice = withoutId.slice(0, afterIndex + 1);
      const secondSlice = withoutId.slice(afterIndex + 1);
      return {...item, children: [...firstSlice, id, ...secondSlice]}
    }
    return {...item, children: withoutId}
  })
}

function indentItem(state, {id}) {
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
    return moveItem(state, {id, afterId, parent})
  }
  return state
}

function unindentItem(state, {id}) {
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
  return moveItem(newState, {
    id,
    afterId: parent.id,
    parent: findParent(state, parent.id).id
  })
}

function setItems(state, {items}) {
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
      return indentItem(state, action)
    case ActionTypes.UNINDENT_ITEM:
      return unindentItem(state, action)
    case ActionTypes.UPDATE_TITLE:
      return updateTitle(state, action)
    case ActionTypes.NEW_ITEM:
      return newItemAfter(state, action)
    case ActionTypes.REMOVE_ITEM:
      return removeItem(state, action)
    case ActionTypes.MOVE_ITEM:
      return moveItem(state, action)
    case ActionTypes.RESET:
      return initialState
    case ActionTypes.SET_ITEMS:
      return setItems(state, action)
    case ActionTypes.SET_STATUS:
      return setStatus(state, action)
    case ActionTypes.UPDATE_TASK:
      return update(state, {[action.task.id]: {$merge: action.task}})
    default:
      return state;
  }
}
