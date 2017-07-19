import ActionTypes from '../actions'

const initialState = null

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.NEW_ITEM:
      return action.item.id
    case ActionTypes.INDENT_ITEM:
      return action.id

    default:
      return state;
  }
}
