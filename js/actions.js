export function updateTitle(id, newTitle) {
  return {
    type: 'UPDATE_TITLE',
    id,
    newTitle,
  }
}

export function newItemAfter(id) {
  return {
    type: 'NEW_ITEM_AFTER',
    id
  }
}

export function removeItem(id) {
  return {
    type: 'REMOVE_ITEM',
    id
  }
}

export function indentItem(id) {
  return {
    type: 'INDENT_ITEM',
    id
  }
}

export function unindentItem(id) {
  return {
    type: 'UNINDENT_ITEM',
    id
  }
}
