import {createSelector} from 'reselect'
import {find, includes, map} from 'lodash'
import findContext from './findContext'

const items = state => state.items

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
