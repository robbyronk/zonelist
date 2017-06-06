import ActionTypes from '../actions'

const initialState = 'outline'

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.HIDE_BOARD:
      return 'outline'
    case ActionTypes.SHOW_BOARD:
      return 'focus'

    default:
      return state;
  }
}
