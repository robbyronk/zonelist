import {createSelector} from 'reselect'
import {concat, every, filter, find, flatMap, includes} from 'lodash'

const items = state => state.items

export const rootTask = createSelector(
  items,
  items => find(items, 'root')
)

const listOrder = (items, parent = 'root', level = 0) =>
  concat([{...items[parent], level}], flatMap(items[parent].children, c => listOrder(items, c, level + 1)))

export const listOrderSelector = createSelector(
  items,
  rootTask,
  (items, rootTask) => listOrder(items, rootTask.id)
)

export const toDoTasks = createSelector(
  items,
  listOrderSelector,
  (items, order) => filter(
    order,
    i => every(i.children, c => items[c].status === 'done') && !includes(['inProgress', 'waiting', 'done'], i.status))
)

const statusSelector = status => createSelector(
  listOrderSelector,
  items => filter(items, i => i.status === status)
)

export const inProgressLane = statusSelector('inProgress')
export const waitingLane = statusSelector('waiting')
export const doneLane = statusSelector('done')
