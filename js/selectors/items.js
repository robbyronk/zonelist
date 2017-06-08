import {createSelector} from 'reselect'
import {find, includes, map} from 'lodash'
import findContext from './findContext'

const items = state => state.items

const itemFromProps = (state, props) => props.item

export const makeGetContext = () => (
  createSelector(
    [items, itemFromProps],
    (items, target) => map(findContext(items, target), id => items[id])
  )
)
