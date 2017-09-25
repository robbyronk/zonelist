import React from 'react'
import {connect} from 'react-redux'
import {inProgressTasks} from '../selectors/board'
import StatusIcon from './status-icon'
import ItemContext from './item-context'
import {head} from 'lodash'
import {setStatus} from '../actions'

const mapStateToProps = state => ({
    inProgress: inProgressTasks(state),
  }
)

@connect(mapStateToProps, {setStatus})
export default class MainFocus extends React.Component {

  render() {
    const id = head(this.props.inProgress).id
    const setStatus = this.props.setStatus
    return (
      <div>
        <h2><StatusIcon status={'inProgress'}/> Main Focus</h2>
        <ItemContext item={id}/>
        <div className="row">
          <div className="col-4">
            <button
              className="btn btn-block"
              onClick={() => setStatus(id, 'toDo')}>
              <StatusIcon status={'toDo'}/> Unmark as Main Focus
            </button>
          </div>
          <div className="col-4">
            <button
              className="btn btn-block"
              onClick={() => setStatus(id, 'waiting')}>
              <StatusIcon status={'waiting'}/> Snooze This Task
            </button>
          </div>
          <div className="col-4">
            <button
              className="btn btn-block"
              onClick={() => setStatus(id, 'done')}>
              <StatusIcon status={'done'}/> Mark as Complete
            </button>
          </div>
        </div>
      </div>
    )
  }
}
