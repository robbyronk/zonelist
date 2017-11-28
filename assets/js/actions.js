const ActionTypes = {
  UPDATE_TASK: 'UPDATE_TASK',
  UPDATE_TITLE: 'UPDATE_TITLE',
  NEW_ITEM_AFTER: 'NEW_ITEM_AFTER',
  NEW_ITEM: 'NEW_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INDENT_ITEM: 'INDENT_ITEM',
  UNINDENT_ITEM: 'UNINDENT_ITEM',
  MOVE_ITEM: 'MOVE_ITEM',
  MOVE_ITEM_BEFORE: 'MOVE_ITEM_BEFORE',
  SET_ITEMS: 'SET_ITEMS',
  SET_STATUS: 'SET_STATUS',
  HIDE_INTRO: 'HIDE_INTRO',
  SHOW_OUTLINE: 'SHOW_OUTLINE',
  SHOW_FOCUS: 'SHOW_FOCUS',
  SELECT_TASK: 'SELECT_TASK',
  UNSELECT_TASK: 'UNSELECT_TASK',
  START_SESSION: 'START_SESSION',
};

export default ActionTypes;

export const updateTask = task => ( {type: ActionTypes.UPDATE_TASK, task} )

export const updateTitle = (id, newTitle) => ( {type: ActionTypes.UPDATE_TITLE, id, newTitle} )

export const newItemAfter = id => ( {type: ActionTypes.NEW_ITEM_AFTER, id} )

export const removeItem = (id, fromPeer = false) => ( {type: ActionTypes.REMOVE_ITEM, fromPeer, id} )

export const indentItem = (id, fromPeer = false) => ( {type: ActionTypes.INDENT_ITEM, fromPeer, id} )

export const unindentItem = (id, fromPeer = false) => ( {type: ActionTypes.UNINDENT_ITEM, fromPeer, id} )

export const moveItem = (id, afterId, parent) => ( {type: ActionTypes.MOVE_ITEM, id, afterId, parent} )

export const moveItemBefore = (moveId, targetId) => ( {type: ActionTypes.MOVE_ITEM_BEFORE, moveId, targetId})

export const setItems = items => ( {type: ActionTypes.SET_ITEMS, items} )

export const setStatus = (id, status) => ( {type: ActionTypes.SET_STATUS, id, status} )

export const showFocus = () => ( {type: ActionTypes.SHOW_FOCUS} )

export const showOutline = () => ( {type: ActionTypes.SHOW_OUTLINE} )

export const hideIntro = () => ( {type: ActionTypes.HIDE_INTRO} )

export const selectTask = id => ( {type: ActionTypes.SELECT_TASK, id} )

export const unselectTask = () => ( {type: ActionTypes.UNSELECT_TASK} )

export const startSession = session => ( {type: ActionTypes.START_SESSION, session} )
