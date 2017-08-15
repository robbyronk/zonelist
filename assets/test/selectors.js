import 'babel-polyfill'
import expect from 'expect'
import {listOrderSelector, rootTask} from '../js/selectors/board'
import findContext from '../js/selectors/findContext'

describe('selectors', () => {
  it('should keep the list order', () => {
    const items = {
      '1': {id: '1', children: [2, 3], root: true},
      '2': {id: '2', children: []},
      '3': {id: '3', children: ['5', '4']},
      '4': {id: '4', children: []},
      '5': {id: '5', children: []},
    }
    const order = [
      {...items['1'], level: 0},
      {...items['2'], level: 1},
      {...items['3'], level: 1},
      {...items['5'], level: 2},
      {...items['4'], level: 2},
    ]

    expect(listOrderSelector({items})).toEqual(order)
  })

  it('should find ancestry', () => {
    const items = {
      '1': {id: '1', children: ['2', '3'], root: true},
      '2': {id: '2', children: []},
      '3': {id: '3', children: ['5', '4']},
      '4': {id: '4', children: []},
      '5': {id: '5', children: []},
    }

    expect(findContext(items, '5')).toEqual(['1', '3', '5'])
  })

  it('should find the root task', () => {
    const items = {
      '1': {id: '1', children: ['2', '3'], root: true},
      '2': {id: '2', children: []},
      '3': {id: '3', children: ['5', '4']},
      '4': {id: '4', children: []},
      '5': {id: '5', children: []},
    }

    expect(rootTask({items})).toEqual(items['1'])
  })
})
