import React from 'react'
import {connect} from 'react-redux'

function Outline(props) {
  return (
    <div className="container">
      <div className="row mt-1">
        <div className="col-12">
          <h2>Big Project</h2>
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
