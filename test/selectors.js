import 'babel-polyfill'
import expect from 'expect'
import {listOrder, listOrderSelector} from '../js/selectors/board'

describe('selectors', () => {
  it('should keep the list order', () => {
    const items = {
      'root': {id: 'root', children: ['2', '3']},
      '2': {id: '2', children: []},
      '3': {id: '3', children: ['5', '4']},
      '4': {id: '4', children: []},
      '5': {id: '5', children: []},
    }
    const order = [
      items['root'],
      items['2'],
      items['3'],
      items['5'],
      items['4'],
    ]

    expect(listOrder(items)).toEqual(order)
  })

  it('list order selector', () => {
    const items = {
      'root': {id: 'root', children: [2, 3]},
      '2': {id: '2', children: []},
      '3': {id: '3', children: ['5', '4']},
      '4': {id: '4', children: []},
      '5': {id: '5', children: []},
    }
    const order = [
      items['root'],
      items['2'],
      items['3'],
      items['5'],
      items['4'],
    ]

    expect(listOrderSelector({items})).toEqual(order)
  })
})
