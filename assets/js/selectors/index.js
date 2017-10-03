import {get} from 'lodash'
import {createSelector} from 'reselect'

export const sessionId = state => get(state, 'session.session')

export const view = state => get(state, 'view')

export const tasks = state => get(state, 'items')

export const selectedId = state => get(state, 'outline.selectedItem')
