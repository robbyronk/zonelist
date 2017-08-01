import update from 'immutability-helper';
import ActionTypes from '../actions'

const initialState = {}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.START_SESSION:
      return action.session
    case ActionTypes.END_SESSION:
      return initialState
    case ActionTypes.RESET:
      return initialState

    default:
      return state;
  }
}
