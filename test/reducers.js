import 'babel-polyfill'
import expect from 'expect';
import reducers from '../js/reducers';
import {isChild} from '../js/reducers/items'

describe('reducers', () => {
  it('simple update title test', () => {
    let state;
    state = reducers({routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:null,items:{'1':{id:'1',title:'yeah, it\'s too slow',children:['3','2']},'2':{id:'2',title:'does this work?',children:[1490480702289,1490481712012,1490482801181,1490482806604]},'3':{id:'3',title:'three',children:['4','item_2',1490480425470]},'4':{id:'4',title:'any better?',children:[]},item_2:{id:'item_2',title:'starting to get any better?',children:[]},'1490480425470':{id:1490480425470,title:'hows this',children:[]},'1490480702289':{id:1490480702289,title:'that\'s working well',children:[]},'1490481712012':{id:1490481712012,title:'are we fast yet?',children:[]},'1490482801181':{id:1490482801181,title:'is this better?',children:[]},'1490482806604':{id:1490482806604,title:'hows this?',children:[]}}}, {type:'UPDATE_TITLE',id:'3',newTitle:'thre'});
    expect(state).toEqual({routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:null,items:{'1':{id:'1',title:'yeah, it\'s too slow',children:['3','2']},'2':{id:'2',title:'does this work?',children:[1490480702289,1490481712012,1490482801181,1490482806604]},'3':{id:'3',title:'thre',children:['4','item_2',1490480425470]},'4':{id:'4',title:'any better?',children:[]},item_2:{id:'item_2',title:'starting to get any better?',children:[]},'1490480425470':{id:1490480425470,title:'hows this',children:[]},'1490480702289':{id:1490480702289,title:'that\'s working well',children:[]},'1490481712012':{id:1490481712012,title:'are we fast yet?',children:[]},'1490482801181':{id:1490482801181,title:'is this better?',children:[]},'1490482806604':{id:1490482806604,title:'hows this?',children:[]}}});
  });

  it('simple new item test', () => {
    let state;
    state = reducers({routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:null,items:{'1':{id:'1',title:'yeah, it\'s too slow',children:['3','2']},'2':{id:'2',title:'does this work?',children:[1490480702289,1490481712012,1490482801181,1490482806604]},'3':{id:'3',title:'thre',children:['4','item_2',1490480425470]},'4':{id:'4',title:'any better?',children:[]},item_2:{id:'item_2',title:'starting to get any better?',children:[]},'1490480425470':{id:1490480425470,title:'hows this',children:[]},'1490480702289':{id:1490480702289,title:'that\'s working well',children:[]},'1490481712012':{id:1490481712012,title:'are we fast yet?',children:[]},'1490482801181':{id:1490482801181,title:'is this better?',children:[]},'1490482806604':{id:1490482806604,title:'hows this?',children:[]}}}, {type:'NEW_ITEM',item:{id:1490495951713,title:'',children:[]},afterId:1490482806604});
    expect(state).toEqual({routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:1490495951713,items:{'1':{id:'1',title:'yeah, it\'s too slow',children:['3','2']},'2':{id:'2',title:'does this work?',children:[1490480702289,1490481712012,1490482801181,1490482806604,1490495951713]},'3':{id:'3',title:'thre',children:['4','item_2',1490480425470]},'4':{id:'4',title:'any better?',children:[]},item_2:{id:'item_2',title:'starting to get any better?',children:[]},'1490480425470':{id:1490480425470,title:'hows this',children:[]},'1490480702289':{id:1490480702289,title:'that\'s working well',children:[]},'1490481712012':{id:1490481712012,title:'are we fast yet?',children:[]},'1490482801181':{id:1490482801181,title:'is this better?',children:[]},'1490482806604':{id:1490482806604,title:'hows this?',children:[]},'1490495951713':{id:1490495951713,title:'',children:[]}}});
  });

  it('another simple new item test', () => {
    let state;
    state = reducers({routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:1490495951713,items:{'1':{id:'1',title:'yeah, it\'s too slow',children:['3','2']},'2':{id:'2',title:'does this work?',children:[1490480702289,1490481712012,1490482801181,1490482806604]},'3':{id:'3',title:'thre',children:['4','item_2',1490480425470]},'4':{id:'4',title:'any better?',children:[]},item_2:{id:'item_2',title:'starting to get any better?',children:[]},'1490480425470':{id:1490480425470,title:'hows this',children:[]},'1490480702289':{id:1490480702289,title:'that\'s working well',children:[]},'1490481712012':{id:1490481712012,title:'are we fast yet?',children:[]},'1490482801181':{id:1490482801181,title:'is this better?',children:[]},'1490482806604':{id:1490482806604,title:'hows this?',children:[]}}}, {type:'NEW_ITEM',item:{id:1490496520554,title:'',children:[]},afterId:1490480702289});
    expect(state).toEqual({routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:1490496520554,items:{'1':{id:'1',title:'yeah, it\'s too slow',children:['3','2']},'2':{id:'2',title:'does this work?',children:[1490480702289,1490496520554,1490481712012,1490482801181,1490482806604]},'3':{id:'3',title:'thre',children:['4','item_2',1490480425470]},'4':{id:'4',title:'any better?',children:[]},item_2:{id:'item_2',title:'starting to get any better?',children:[]},'1490480425470':{id:1490480425470,title:'hows this',children:[]},'1490480702289':{id:1490480702289,title:'that\'s working well',children:[]},'1490481712012':{id:1490481712012,title:'are we fast yet?',children:[]},'1490482801181':{id:1490482801181,title:'is this better?',children:[]},'1490482806604':{id:1490482806604,title:'hows this?',children:[]},'1490496520554':{id:1490496520554,title:'',children:[]}}});
  });

  it('and another simple new item test', () => {
    let state;
    state = reducers({routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:1490496520554,items:{'1':{id:'1',title:'yeah, it\'s too slow',children:['3','2']},'2':{id:'2',title:'does this work?',children:[1490480702289,1490481712012,1490482801181,1490482806604]},'3':{id:'3',title:'thre',children:['4','item_2',1490480425470]},'4':{id:'4',title:'any better?',children:[]},item_2:{id:'item_2',title:'starting to get any better?',children:[]},'1490480425470':{id:1490480425470,title:'hows this',children:[]},'1490480702289':{id:1490480702289,title:'that\'s working well',children:[]},'1490481712012':{id:1490481712012,title:'are we fast yet?',children:[]},'1490482801181':{id:1490482801181,title:'is this better?',children:[]},'1490482806604':{id:1490482806604,title:'hows this?',children:[]}}}, {type:'NEW_ITEM',item:{id:1490496556884,title:'',children:[]},afterId:'3'});
    expect(state).toEqual({routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:1490496556884,items:{'1':{id:'1',title:'yeah, it\'s too slow',children:['3',1490496556884,'2']},'2':{id:'2',title:'does this work?',children:[1490480702289,1490481712012,1490482801181,1490482806604]},'3':{id:'3',title:'thre',children:['4','item_2',1490480425470]},'4':{id:'4',title:'any better?',children:[]},item_2:{id:'item_2',title:'starting to get any better?',children:[]},'1490480425470':{id:1490480425470,title:'hows this',children:[]},'1490480702289':{id:1490480702289,title:'that\'s working well',children:[]},'1490481712012':{id:1490481712012,title:'are we fast yet?',children:[]},'1490482801181':{id:1490482801181,title:'is this better?',children:[]},'1490482806604':{id:1490482806604,title:'hows this?',children:[]},'1490496556884':{id:1490496556884,title:'',children:[]}}});
  });

  it('should not remove items', () => {
    let state;
    const prevState = {routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:null,items:{'1':{id:'1',title:'yeah, it\'s too slow',children:[1490481712012,'2','3']},'2':{id:'2',title:'does this work?',children:[1490480702289,1490482801181,1490482806604]},'3':{id:'3',title:'thre',children:['4',1490496556884,'item_2',1490480425470]},'4':{id:'4',title:'any better?',children:[]},item_2:{id:'item_2',title:'starting to get any better?',children:[]},'1490480425470':{id:1490480425470,title:'hows this',children:[]},'1490480702289':{id:1490480702289,title:'that\'s working well',children:[]},'1490481712012':{id:1490481712012,title:'are we fast yet?',children:[]},'1490482801181':{id:1490482801181,title:'is this better?',children:[]},'1490482806604':{id:1490482806604,title:'hows this?',children:[]},'1490496556884':{id:1490496556884,title:'',children:[]}}}
    state = reducers(prevState, {type:'MOVE_ITEM',id:'2',afterId:'1',parent:null});
    expect(state).toEqual(prevState);
  });

  it('simple move item test', () => {
    let state;
    state = reducers({routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:null,items:{'1':{id:'1',title:'one',children:['2','3']},'2':{id:'2',title:'two',children:[]},'3':{id:'3',title:'three',children:['4','5']},'4':{id:'4',title:'four',children:[]},'5':{id:'5',title:'five',children:[]}}}, {type:'MOVE_ITEM',id:'4',afterId:null,parent:'1'});
    expect(state).toEqual({routing:{locationBeforeTransitions:{pathname:'/',search:'',hash:'',state:null,action:'POP',key:'183jhd',query:{},$searchBase:{search:'',searchBase:''}}},focus:null,items:{'1':{id:'1',title:'one',children:['4','2','3']},'2':{id:'2',title:'two',children:[]},'3':{id:'3',title:'three',children:['5']},'4':{id:'4',title:'four',children:[]},'5':{id:'5',title:'five',children:[]}}});
  });
});

describe('items reducers utils', () => {
  it('should find child', () => {
    let state = {
      '1': { id: '1', children: ['2', '3']},
      '2': { id: '2', children: []},
      '3': { id: '3', children: ['4', '5']},
      '4': { id: '4', children: []},
      '5': { id: '5', children: []},
    };
    expect(isChild(state, '1', '5')).toEqual(true)
    expect(isChild(state, '1', '3')).toEqual(true)
    expect(isChild(state, '5', '1')).toEqual(false)
    expect(isChild(state, '3', '1')).toEqual(false)
  })
})
