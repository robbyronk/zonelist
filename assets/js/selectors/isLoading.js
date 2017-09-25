import {createSelector} from "reselect";
import {isEmpty} from 'lodash'

const tasks = state => state.items

export const isLoading = createSelector(
  tasks,
  items => isEmpty(items)
)
