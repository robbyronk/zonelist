import React from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import BoardLane from '../../components/board-lane'
import {connect} from 'react-redux'
import {doneLane, inProgressLane, toDoLane, waitingLane} from '../../selectors/board'

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
        <BoardLane items={this.props.toDo} title="To Do" icon="list-alt"/>
        <BoardLane items={this.props.inProgress} title="In Progress" icon="crosshairs"/>
        <BoardLane items={this.props.waiting} title="Waiting" icon="clock-o"/>
        <BoardLane items={this.props.done} title="Done" icon="check"/>
      </div>
    )
  }
}
