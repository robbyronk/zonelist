const initialState = null

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'NEW_ITEM':
      return action.item.id
    case 'INDENT_ITEM':
      return action.id

    default:
      return state;
  }
}