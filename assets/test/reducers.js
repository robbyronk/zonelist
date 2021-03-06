import 'babel-polyfill'
import expect from 'expect'
import reducers, {isChild} from '../js/reducers/items'
import {moveItemAfter} from "../js/actions";

describe('reducers', () => {
  it('simple update title test', () => {
    const state = reducers({ '1': {id: '1', title: 'yeah, it\'s too slow', children: ['3', '2']}, '2': { id: '2', title: 'does this work?', children: [1490480702289, 1490481712012, 1490482801181, 1490482806604]}, '3': {id: '3', title: 'three', children: ['4', 'item_2', 1490480425470]}, '4': {id: '4', title: 'any better?', children: []}, item_2: {id: 'item_2', title: 'starting to get any better?', children: []}, '1490480425470': {id: 1490480425470, title: 'hows this', children: []}, '1490480702289': {id: 1490480702289, title: 'that\'s working well', children: []}, '1490481712012': {id: 1490481712012, title: 'are we fast yet?', children: []}, '1490482801181': {id: 1490482801181, title: 'is this better?', children: []}, '1490482806604': {id: 1490482806604, title: 'hows this?', children: []}}, {type: 'UPDATE_TITLE', id: '3', newTitle: 'thre'})
    expect(state).toEqual({ '1': {id: '1', title: 'yeah, it\'s too slow', children: ['3', '2']}, '2': { id: '2', title: 'does this work?', children: [1490480702289, 1490481712012, 1490482801181, 1490482806604]}, '3': {id: '3', title: 'thre', children: ['4', 'item_2', 1490480425470]}, '4': {id: '4', title: 'any better?', children: []}, item_2: {id: 'item_2', title: 'starting to get any better?', children: []}, '1490480425470': {id: 1490480425470, title: 'hows this', children: []}, '1490480702289': {id: 1490480702289, title: 'that\'s working well', children: []}, '1490481712012': {id: 1490481712012, title: 'are we fast yet?', children: []}, '1490482801181': {id: 1490482801181, title: 'is this better?', children: []}, '1490482806604': {id: 1490482806604, title: 'hows this?', children: []}})
  })

  it('simple new item test', () => {
    const state = reducers({ '1': {id: '1', title: 'yeah, it\'s too slow', children: ['3', '2']}, '2': { id: '2', title: 'does this work?', children: [1490480702289, 1490481712012, 1490482801181, 1490482806604]}, '3': {id: '3', title: 'thre', children: ['4', 'item_2', 1490480425470]}, '4': {id: '4', title: 'any better?', children: []}, item_2: {id: 'item_2', title: 'starting to get any better?', children: []}, '1490480425470': {id: 1490480425470, title: 'hows this', children: []}, '1490480702289': {id: 1490480702289, title: 'that\'s working well', children: []}, '1490481712012': {id: 1490481712012, title: 'are we fast yet?', children: []}, '1490482801181': {id: 1490482801181, title: 'is this better?', children: []}, '1490482806604': {id: 1490482806604, title: 'hows this?', children: []}}, {type: 'NEW_ITEM', item: {id: 1490495951713, title: '', children: []}, afterId: 1490482806604})
    expect(state).toEqual({ '1': {id: '1', title: 'yeah, it\'s too slow', children: ['3', '2']}, '2': { id: '2', title: 'does this work?', children: [1490480702289, 1490481712012, 1490482801181, 1490482806604, 1490495951713]}, '3': {id: '3', title: 'thre', children: ['4', 'item_2', 1490480425470]}, '4': {id: '4', title: 'any better?', children: []}, item_2: {id: 'item_2', title: 'starting to get any better?', children: []}, '1490480425470': {id: 1490480425470, title: 'hows this', children: []}, '1490480702289': {id: 1490480702289, title: 'that\'s working well', children: []}, '1490481712012': {id: 1490481712012, title: 'are we fast yet?', children: []}, '1490482801181': {id: 1490482801181, title: 'is this better?', children: []}, '1490482806604': {id: 1490482806604, title: 'hows this?', children: []}, '1490495951713': {id: 1490495951713, title: '', children: []}})
  })

  it('another simple new item test', () => {
    const state = reducers({ '1': {id: '1', title: 'yeah, it\'s too slow', children: ['3', '2']}, '2': { id: '2', title: 'does this work?', children: [1490480702289, 1490481712012, 1490482801181, 1490482806604]}, '3': {id: '3', title: 'thre', children: ['4', 'item_2', 1490480425470]}, '4': {id: '4', title: 'any better?', children: []}, item_2: {id: 'item_2', title: 'starting to get any better?', children: []}, '1490480425470': {id: 1490480425470, title: 'hows this', children: []}, '1490480702289': {id: 1490480702289, title: 'that\'s working well', children: []}, '1490481712012': {id: 1490481712012, title: 'are we fast yet?', children: []}, '1490482801181': {id: 1490482801181, title: 'is this better?', children: []}, '1490482806604': {id: 1490482806604, title: 'hows this?', children: []}}, {type: 'NEW_ITEM', item: {id: 1490496520554, title: '', children: []}, afterId: 1490480702289})
    expect(state).toEqual({ '1': {id: '1', title: 'yeah, it\'s too slow', children: ['3', '2']}, '2': { id: '2', title: 'does this work?', children: [1490480702289, 1490496520554, 1490481712012, 1490482801181, 1490482806604]}, '3': {id: '3', title: 'thre', children: ['4', 'item_2', 1490480425470]}, '4': {id: '4', title: 'any better?', children: []}, item_2: {id: 'item_2', title: 'starting to get any better?', children: []}, '1490480425470': {id: 1490480425470, title: 'hows this', children: []}, '1490480702289': {id: 1490480702289, title: 'that\'s working well', children: []}, '1490481712012': {id: 1490481712012, title: 'are we fast yet?', children: []}, '1490482801181': {id: 1490482801181, title: 'is this better?', children: []}, '1490482806604': {id: 1490482806604, title: 'hows this?', children: []}, '1490496520554': {id: 1490496520554, title: '', children: []}})
  })

  it('and another simple new item test', () => {
    const state = reducers({ '1': {id: '1', title: 'yeah, it\'s too slow', children: ['3', '2']}, '2': { id: '2', title: 'does this work?', children: [1490480702289, 1490481712012, 1490482801181, 1490482806604]}, '3': {id: '3', title: 'thre', children: ['4', 'item_2', 1490480425470]}, '4': {id: '4', title: 'any better?', children: []}, item_2: {id: 'item_2', title: 'starting to get any better?', children: []}, '1490480425470': {id: 1490480425470, title: 'hows this', children: []}, '1490480702289': {id: 1490480702289, title: 'that\'s working well', children: []}, '1490481712012': {id: 1490481712012, title: 'are we fast yet?', children: []}, '1490482801181': {id: 1490482801181, title: 'is this better?', children: []}, '1490482806604': {id: 1490482806604, title: 'hows this?', children: []}}, {type: 'NEW_ITEM', item: {id: 1490496556884, title: '', children: []}, afterId: '3'})
    expect(state).toEqual({ '1': {id: '1', title: 'yeah, it\'s too slow', children: ['3', 1490496556884, '2']}, '2': { id: '2', title: 'does this work?', children: [1490480702289, 1490481712012, 1490482801181, 1490482806604]}, '3': {id: '3', title: 'thre', children: ['4', 'item_2', 1490480425470]}, '4': {id: '4', title: 'any better?', children: []}, item_2: {id: 'item_2', title: 'starting to get any better?', children: []}, '1490480425470': {id: 1490480425470, title: 'hows this', children: []}, '1490480702289': {id: 1490480702289, title: 'that\'s working well', children: []}, '1490481712012': {id: 1490481712012, title: 'are we fast yet?', children: []}, '1490482801181': {id: 1490482801181, title: 'is this better?', children: []}, '1490482806604': {id: 1490482806604, title: 'hows this?', children: []}, '1490496556884': {id: 1490496556884, title: '', children: []}})
  })

  it('should not remove items', () => {
    const prevState = { '1': {id: '1', title: 'yeah, it\'s too slow', children: [1490481712012, '2', '3']}, '2': {id: '2', title: 'does this work?', children: [1490480702289, 1490482801181, 1490482806604]}, '3': {id: '3', title: 'thre', children: ['4', 1490496556884, 'item_2', 1490480425470]}, '4': {id: '4', title: 'any better?', children: []}, item_2: {id: 'item_2', title: 'starting to get any better?', children: []}, '1490480425470': {id: 1490480425470, title: 'hows this', children: []}, '1490480702289': {id: 1490480702289, title: 'that\'s working well', children: []}, '1490481712012': {id: 1490481712012, title: 'are we fast yet?', children: []}, '1490482801181': {id: 1490482801181, title: 'is this better?', children: []}, '1490482806604': {id: 1490482806604, title: 'hows this?', children: []}, '1490496556884': {id: 1490496556884, title: '', children: []}}
    const state = reducers(prevState, {type: 'MOVE_ITEM', id: '2', afterId: '1', parent: null})
    expect(state).toEqual(prevState)
  })

  it('simple move item test', () => {
    const state = reducers({ '1': {id: '1', title: 'one', children: ['2', '3']}, '2': {id: '2', title: 'two', children: []}, '3': {id: '3', title: 'three', children: ['4', '5']}, '4': {id: '4', title: 'four', children: []}, '5': {id: '5', title: 'five', children: []}}, {type: 'MOVE_ITEM', id: '4', afterId: null, parent: '1'})
    expect(state).toEqual({ '1': {id: '1', title: 'one', children: ['4', '2', '3']}, '2': {id: '2', title: 'two', children: []}, '3': {id: '3', title: 'three', children: ['5']}, '4': {id: '4', title: 'four', children: []}, '5': {id: '5', title: 'five', children: []}})
  })

  it('simple unindent test', () => {
    const state = reducers({ '2': {id: '2', title: 'two', children: []}, '3': {id: '3', title: 'three', children: ['4', '5']}, '4': {id: '4', title: 'four', children: []}, '5': {id: '5', title: 'five', children: []}, root: {id: 'root', title: 'one', children: ['2', '3']}}, {type: 'UNINDENT_ITEM', id: '4'})
    expect(state).toEqual({ '2': {id: '2', title: 'two', children: []}, '3': {id: '3', title: 'three', children: []}, '4': {id: '4', title: 'four', children: ['5']}, '5': {id: '5', title: 'five', children: []}, root: {id: 'root', title: 'one', children: ['2', '3', '4']}})
  })

  it('should delete', () => {
    let state;
    state = reducers({'1': {title: 'Your Zone', status: 'toDo', root: true, id: 1, children: [2, 3, 7]}, '2': {title: 'Make an outline', status: 'done', root: false, id: 2, children: []}, '3': {title: 'Focus on one task at a time', status: 'done', root: false, id: 3, children: []}, '7': {title: 'Testing', status: null, root: false, id: 7, children: []}}, {type: 'REMOVE_ITEM', fromPeer: true, id: 7});
    expect(state).toEqual({'1': {title: 'Your Zone', status: 'toDo', root: true, id: 1, children: [2, 3]}, '2': {title: 'Make an outline', status: 'done', root: false, id: 2, children: []}, '3': {title: 'Focus on one task at a time', status: 'done', root: false, id: 3, children: []},});
  });

  it('should move before', () => {
    let state;
    state = reducers({
      '1': {title: 'Your Zone', status: 'toDo', root: true, id: 1, children: [2, 77, 76, 21, 60, 22]},
      '2': {title: 'Make an outline', status: 'done', root: false, id: 2, children: [18, 3]},
      '3': {title: 'Focus on one task at a time', status: 'toDo', root: false, id: 3, children: [28, 74, 75]},
      '18': {title: 'aohuhuhunth', status: 'done', root: false, id: 18, children: []},
      '21': {title: 'a', status: 'toDo', root: false, id: 21, children: []},
      '22': {
        title: 'what if this is pretty long is it still readable',
        status: 'waiting',
        root: false,
        id: 22,
        children: []
      },
      '28': {title: 'aoeu wow', status: 'waiting', root: false, id: 28, children: []},
      '60': {title: null, status: null, root: false, id: 60, children: []},
      '74': {title: 'is there anything weird?', status: null, root: false, id: 74, children: []},
      '75': {title: null, status: null, root: false, id: 75, children: []},
      '76': {title: null, status: null, root: false, id: 76, children: []},
      '77': {title: 'aoeu', status: null, root: false, id: 77, children: []}
    }, {type: 'MOVE_ITEM_BEFORE', moveId: 21, targetId: 76});
    expect(state).toEqual({
      '1': {title: 'Your Zone', status: 'toDo', root: true, id: 1, children: [2, 77, 21, 76, 60, 22]},
      '2': {title: 'Make an outline', status: 'done', root: false, id: 2, children: [18, 3]},
      '3': {title: 'Focus on one task at a time', status: 'toDo', root: false, id: 3, children: [28, 74, 75]},
      '18': {title: 'aohuhuhunth', status: 'done', root: false, id: 18, children: []},
      '21': {title: 'a', status: 'toDo', root: false, id: 21, children: []},
      '22': {
        title: 'what if this is pretty long is it still readable',
        status: 'waiting',
        root: false,
        id: 22,
        children: []
      },
      '28': {title: 'aoeu wow', status: 'waiting', root: false, id: 28, children: []},
      '60': {title: null, status: null, root: false, id: 60, children: []},
      '74': {title: 'is there anything weird?', status: null, root: false, id: 74, children: []},
      '75': {title: null, status: null, root: false, id: 75, children: []},
      '76': {title: null, status: null, root: false, id: 76, children: []},
      '77': {title: 'aoeu', status: null, root: false, id: 77, children: []}
    });
  })
  it('should move after', () => {
    const prevState = {
      '1': {id: '1', children: ['2', '3']},
      '2': {id: '2', children: []},
      '3': {id: '3', children: ['4', '5']},
      '4': {id: '4', children: []},
      '5': {id: '5', children: []},
    }
    const action = moveItemAfter('5', '2');
    const nextState = {
      '1': {id: '1', children: ['2', '5', '3']},
      '2': {id: '2', children: []},
      '3': {id: '3', children: ['4']},
      '4': {id: '4', children: []},
      '5': {id: '5', children: []},
    }
    expect(reducers(prevState, action)).toEqual(nextState);
  });
})

describe('items reducers utils', () => {
  it('should find child', () => {
    let state = {
      '1': {id: '1', children: ['2', '3']},
      '2': {id: '2', children: []},
      '3': {id: '3', children: ['4', '5']},
      '4': {id: '4', children: []},
      '5': {id: '5', children: []},
    }
    expect(isChild(state, '1', '5')).toEqual(true)
    expect(isChild(state, '1', '3')).toEqual(true)
    expect(isChild(state, '5', '1')).toEqual(false)
    expect(isChild(state, '3', '1')).toEqual(false)
  })
})
