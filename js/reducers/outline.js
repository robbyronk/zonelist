import ActionTypes from '../actions'
import update from 'immutability-helper';

const initialState = {
  selectedItem: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.SELECT_TASK:
      return update(state, {selectedItem: {$set: action.id}})
    // TODO will need to unselect tasks sometimes?
    // case ActionTypes.UNSELECT_TASK:
    //   return update(state, {selectedItem: {$set: null}})

    default:
      return state;
  }
}
