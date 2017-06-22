import React from 'react'
import {connect} from 'react-redux'
import RootTaskTitle from './root'
import TaskTitle from './task-title'
import {listOrderSelector} from '../../selectors/board'
import {tail} from 'lodash'

function Outline({tasks}) {
  return (
    <div className="container">
      <div className="row mt-1">
        <div className="col-12">
          <RootTaskTitle id="root"/>
        </div>
      </div>
      {tail(tasks).map(t => (
        <div key={t.id} className="row">
          <div className="col-12">
            <TaskTitle task={t}/>
          </div>
        </div>
      ))}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tasks: listOrderSelector(state)
  }
}

export default connect(mapStateToProps)(Outline)
