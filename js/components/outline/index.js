import React from 'react'
import {connect} from 'react-redux'
import RootTaskTitle from './root'

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
          <span className="bar to-do first-level"/>
          Task
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
