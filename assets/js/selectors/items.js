import {createSelector} from 'reselect'
import {map} from 'lodash'
import findContext from './findContext'

const tasks = state => state.items;

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
