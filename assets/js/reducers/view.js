import ActionTypes from '../actions'

const initialState = 'outline'

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.HIDE_BOARD:
      return 'old-outline'
    case ActionTypes.SHOW_BOARD:
      return 'old-focus'
    case ActionTypes.SHOW_OUTLINE:
      return 'outline'
    case ActionTypes.SHOW_FOCUS:
      return 'focus'

    default:
      return state;
  }
}
