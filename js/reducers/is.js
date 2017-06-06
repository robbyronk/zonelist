import update from 'immutability-helper';
import ActionTypes from '../actions'

const initialState = {}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.OPEN_IMPORT_MODAL:
      return update(state, {importing: {$set: true}})
    case ActionTypes.CLOSE_IMPORT_MODAL:
      return update(state, {importing: {$set: false}})
    case ActionTypes.SET_ITEMS:
      return update(state, {importing: {$set: false}})
    case ActionTypes.OPEN_EXPORT_MODAL:
      return update(state, {exporting: {$set: true}})
    case ActionTypes.CLOSE_EXPORT_MODAL:
      return update(state, {exporting: {$set: false}})
    case ActionTypes.HIDE_INTRO:
      return update(state, {introduced: {$set: true}})

    default:
      return state;
  }
}
