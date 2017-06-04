import {createSelector} from 'reselect'
import {every, filter, includes} from 'lodash'

const items = state => state.items

export const toDoLane = createSelector(
  items,
  items => filter(
    items,
    i => every(i.children, c => items[c].status === 'done') && !includes(['inProgress', 'waiting', 'done'], i.status))
)

const statusSelector = status => createSelector(
  items,
  items => filter(items, i => i.status === status)
)

export const inProgressLane = statusSelector('inProgress')
export const waitingLane = statusSelector('waiting')
export const doneLane = statusSelector('done')
