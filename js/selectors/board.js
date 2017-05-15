// todo write selector for each lane
import {createSelector} from 'reselect'
import {every,filter} from 'lodash'
// to do - items which have only done children (or no children)
// in progress - items with the status of in progress
// waiting - items with the status of in progress
// done - items with the status of done

const items = state => state.items

export const toDoLane = createSelector(
  items,
  items => filter(items, i => every(i.children, c => items[c].status === 'done'))
)

const statusSelector = status => createSelector(
  items,
  items => filter(items, i => i.status === status)
)

export const inProgressLane = statusSelector('inProgress')
export const waitingLane = statusSelector('waiting')
export const doneLane = statusSelector('done')
