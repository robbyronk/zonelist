import React from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import BoardLane from '../../components/board-lane'

@DragDropContext(HTML5Backend)
export default class ZoneBoard extends React.Component {
  render() {
    const todo = [
      {title: 'first'},
      {title: 'second'},
      {title: 'third'},
      {title: 'fourth'},
    ]
    const inProgress = [
      {title: 'in the works'},
    ]
    const waiting = [
      {title: 'wait on this'},
      {title: 'wait on this too'},
    ]
    const done = [
      {title: 'done with this'},
      {title: 'done with this too'},
    ]


    return (
      <div className='row'>
        <BoardLane items={todo} title="To Do" icon="list-alt"/>
        <BoardLane items={inProgress} title="In Progress" icon="crosshairs"/>
        <BoardLane items={waiting} title="Waiting" icon="clock-o"/>
        <BoardLane items={done} title="Done" icon="check"/>
      </div>
    )
  }
}
