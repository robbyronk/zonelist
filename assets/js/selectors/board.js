import {createSelector} from 'reselect'
import {concat, every, filter, find, flatMap, includes} from 'lodash'

const tasks = state => state.items

export const rootTask = createSelector(
  tasks,
  tasks => find(tasks, 'root')
)

const listOrder = (tasks, parent = 'root', level = 0) =>
  concat([{...tasks[parent], level}], flatMap(tasks[parent].children, c => listOrder(tasks, c, level + 1)))

export const listOrderSelector = createSelector(
  tasks,
  rootTask,
  (tasks, rootTask) => listOrder(tasks, rootTask.id)
)

export const toDoTasks = createSelector(
  tasks,
  listOrderSelector,
  (tasks, order) => filter(
    order,
    i => every(i.children, c => tasks[c].status === 'done') && !includes(['inProgress', 'waiting', 'done'], i.status))
)

export const inProgressTasks = createSelector(
  listOrderSelector,
  tasks => filter(tasks, {status: 'inProgress'})
)
