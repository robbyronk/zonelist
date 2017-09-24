import {createSelector} from 'reselect'
import {map} from 'lodash'
import findContext from './findContext'

const items = state => state.items;

export const itemsSelector = createSelector(
  items,
  i => i
)

const idFromProps = (state, props) => props.id
const itemFromProps = (state, props) => props.item

export const makeGetContext = () => (
  createSelector(
    [items, idFromProps],
    (items, target) => map(findContext(items, target), id => items[id])
  )
)

export const makeOldGetContext = () => (
  createSelector(
    [items, itemFromProps],
    (items, target) => map(findContext(items, target), id => items[id])
  )
)
