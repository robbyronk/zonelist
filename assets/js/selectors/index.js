import {get} from 'lodash'

export const sessionId = state => get(state, 'session.session')
