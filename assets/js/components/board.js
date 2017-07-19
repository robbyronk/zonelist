import React from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import BoardLane from './board-lane'
import {connect} from 'react-redux'
import {doneLane, inProgressLane, toDoLane, waitingLane} from '../selectors/board'

const mapStateToProps = state => ({
    toDo: toDoLane(state),
    inProgress: inProgressLane(state),
    waiting: waitingLane(state),
    done: doneLane(state),
  }
)

@connect(mapStateToProps)
@DragDropContext(HTML5Backend)
export default class ZoneBoard extends React.Component {
  render() {
    return (
      <div className='row'>
        <BoardLane items={this.props.toDo} title="Up Next" status="toDo"/>
        <BoardLane items={this.props.inProgress} title="Main Focus" status="inProgress"/>
        <BoardLane items={this.props.waiting} title="On Hold" status="waiting"/>
        <BoardLane items={this.props.done} title="Finished" status="done"/>
      </div>
    )
  }
}
