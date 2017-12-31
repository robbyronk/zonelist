import ActionTypes from '../actions'

const initialState = {}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.START_DRAG:
      return {...state, dragging: action.id}
    case ActionTypes.FINISH_DRAG:
      return {...state, dragging: null}
    case ActionTypes.RESET:
      return initialState

    default:
      return state;
  }
}
