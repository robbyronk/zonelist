import React from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'
import {inProgressLane, toDoLane} from '../selectors/board'
import MainFocus from './main-focus'
import ChooseFocus from './choose-focus'

const mapStateToProps = state => ({
    toDo: toDoLane(state),
    inProgress: inProgressLane(state),
  }
)

@connect(mapStateToProps)
@DragDropContext(HTML5Backend)
export default class FocusList extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className="col-12">
          {
            this.props.inProgress.length ? <MainFocus/> : <ChooseFocus/>
          }
        </div>
      </div>
    )
  }
}
