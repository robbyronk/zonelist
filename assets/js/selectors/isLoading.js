import {createSelector} from "reselect";
import {isEmpty} from 'lodash'

const items = state => state.items

export const isLoading = createSelector(
  items,
  items => isEmpty(items)
)
