import React from 'react'
import {setStatus} from '../../actions'
import {head} from 'lodash'
import {inProgressLane} from '../../selectors/board'
import {connect} from 'react-redux'
import TaskContext from './task-context'

function MainFocus({task, setStatus}) {
  const {id} = task
  return (
    <div className="container">
      <div className="alert alert-success text-center" role="alert">
        <h3><i className="fa fa-crosshairs"/> Main Focus</h3>
      </div>
      <div className="row mb-1">
        <div className="col-12">
          <TaskContext id={id}/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 flex-sm-last mb-1">
          <button className="btn btn-block btn-success" onClick={() => setStatus(id, 'done')}>
            <i className="fa fa-check"/> Finished!
          </button>
        </div>
        <div className="col-sm-3 mb-1">
          <button className="btn btn-block btn-warning" onClick={() => setStatus(id, 'waiting')}>
            <i className="fa fa-clock-o"/> Snooze
          </button>
        </div>
        <div className="col-sm-3 flex-sm-first mb-1">
          <button className="btn btn-block" onClick={() => setStatus(id, 'toDo')}>
            <i className="fa fa-undo"/> Un-focus
          </button>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
    task: head(inProgressLane(state)),
  }
)

export default connect(mapStateToProps, {setStatus})(MainFocus)
