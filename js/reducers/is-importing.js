const initialState = false

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'OPEN_IMPORT_MODAL':
      return true
    case 'CLOSE_IMPORT_MODAL':
      return false

    default:
      return state;
  }
}
