const ActionTypes = {
  UPDATE_TITLE: 'UPDATE_TITLE',
  NEW_ITEM_AFTER: 'NEW_ITEM_AFTER',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INDENT_ITEM: 'INDENT_ITEM',
  UNINDENT_ITEM: 'UNINDENT_ITEM',
  MOVE_ITEM: 'MOVE_ITEM',
  RESET: 'RESET',
  OPEN_IMPORT_MODAL: 'OPEN_IMPORT_MODAL',
  CLOSE_IMPORT_MODAL: 'CLOSE_IMPORT_MODAL',
  OPEN_EXPORT_MODAL: 'OPEN_EXPORT_MODAL',
  CLOSE_EXPORT_MODAL: 'CLOSE_EXPORT_MODAL',
  SET_ITEMS: 'SET_ITEMS',
  SET_STATUS: 'SET_STATUS',
  SHOW_BOARD: 'SHOW_BOARD',
  HIDE_BOARD: 'HIDE_BOARD',
  HIDE_INTRO: 'HIDE_INTRO',
};

export default ActionTypes;

export function updateTitle(id, newTitle) {
  return {
    type: ActionTypes.UPDATE_TITLE,
    id,
    newTitle,
  }
}

export function newItemAfter(id) {
  return {
    type: ActionTypes.NEW_ITEM_AFTER,
    id
  }
}

export function removeItem(id) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    id
  }
}

export function indentItem(id) {
  return {
    type: ActionTypes.INDENT_ITEM,
    id
  }
}

export function unindentItem(id) {
  return {
    type: ActionTypes.UNINDENT_ITEM,
    id
  }
}

export function moveItem(id, afterId, parent) {
  return {
    type: ActionTypes.MOVE_ITEM,
    id,
    afterId,
    parent
  }
}

export function reset() {
  return {
    type: ActionTypes.RESET
  }
}

export function openImportModal() {
  return {
    type: ActionTypes.OPEN_IMPORT_MODAL
  }
}

export function closeImportModal() {
  return {
    type: ActionTypes.CLOSE_IMPORT_MODAL
  }
}

export function openExportModal() {
  return {
    type: ActionTypes.OPEN_EXPORT_MODAL
  }
}

export function closeExportModal() {
  return {
    type: ActionTypes.CLOSE_EXPORT_MODAL
  }
}

export function setItems(items) {
  return {
    type: ActionTypes.SET_ITEMS,
    items
  }
}

export function setStatus(id, status) {
  return {
    type: ActionTypes.SET_STATUS,
    id,
    status
  }
}

export function showBoard() {
  return {
    type: ActionTypes.SHOW_BOARD,
  }
}

export function hideBoard() {
  return {
    type: ActionTypes.HIDE_BOARD,
  }
}

export function hideIntro() {
  return {
    type: ActionTypes.HIDE_INTRO,
  }
}
