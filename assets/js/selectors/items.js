import {createSelector} from 'reselect'
import {get, map} from 'lodash'
import findContext from './findContext'
import {selectedId, tasks} from "./index";

export const selectedTask = createSelector(
  tasks,
  selectedId,
  (tasks, selectedId) => get(tasks, selectedId, {})
)

export const isDragging = createSelector(
  state => get(state, 'dnd.dragging'),
  (state, props) => props.task,
  (draggingId, {id}) => draggingId === id
)

export const tasksSelector = createSelector(
  tasks,
  i => i
)

const idFromProps = (state, props) => props.id
const itemFromProps = (state, props) => props.item

export const makeGetContext = () => (
  createSelector(
    [tasks, idFromProps],
    (tasks, target) => map(findContext(tasks, target), id => tasks[id])
  )
)

export const makeOldGetContext = () => (
  createSelector(
    [tasks, itemFromProps],
    (tasks, target) => map(findContext(tasks, target), id => tasks[id])
  )
)
