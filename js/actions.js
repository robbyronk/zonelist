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

export function moveItem(id, afterId, parent) {
  return {
    type: 'MOVE_ITEM',
    id,
    afterId,
    parent
  }
}

export function reset() {
  return {
    type: 'RESET'
  }
}

export function openImportModal() {
  return {
    type: 'OPEN_IMPORT_MODAL'
  }
}

export function closeImportModal() {
  return {
    type: 'CLOSE_IMPORT_MODAL'
  }
}

export function openExportModal() {
  return {
    type: 'OPEN_EXPORT_MODAL'
  }
}

export function closeExportModal() {
  return {
    type: 'CLOSE_EXPORT_MODAL'
  }
}

export function setItems(items) {
  return {
    type: 'SET_ITEMS',
    items
  }
}
