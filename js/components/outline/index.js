import React from 'react'
import {connect} from 'react-redux'
import RootTaskTitle from './root'
import TaskTitle from './task-title'

function Outline(props) {
  return (
    <div className="container">
      <div className="row mt-1">
        <div className="col-12">
          <RootTaskTitle id="root"/>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <TaskTitle id="1496557380761"/>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <span className="bar main-focus second-level"/>
          Small Task
        </div>
      </div>
    </div>
  )
}

export default Outline
// export default connect(null, {actions})(Outline)
