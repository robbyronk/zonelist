import update from 'immutability-helper';

const initialState = {}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'OPEN_IMPORT_MODAL':
      return update(state, {importing: {$set: true}})
    case 'CLOSE_IMPORT_MODAL':
      return update(state, {importing: {$set: false}})
    case 'SET_ITEMS':
      return update(state, {importing: {$set: false}})
    case 'OPEN_EXPORT_MODAL':
      return update(state, {exporting: {$set: true}})
    case 'CLOSE_EXPORT_MODAL':
      return update(state, {exporting: {$set: false}})
    case 'SHOW_BOARD':
      return update(state, {board: {$set: true}})
    case 'HIDE_BOARD':
      return update(state, {board: {$set: false}})

    default:
      return state;
  }
}
