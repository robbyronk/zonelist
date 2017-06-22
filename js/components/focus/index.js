import React from 'react'
import {connect} from 'react-redux'
import FocusChoice from './focus-choice'

function Focus(props) {
  const test = {
    'id': 1498036656624,
    'title': 'Make component for the new focus mode',
    'children': []
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <FocusChoice id={test.id}/>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info">
            <div className="tree"><span>Big Project</span>
              <div className="tree"><span>Task Two</span>
                <div className="tree"><h4>Smaller Task</h4></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info">
            <div className="tree"><span>Big Project</span>
              <div className="tree"><span>Task Two</span>
                <div className="tree"><h4>Smaller Task</h4></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info">
            <div className="tree"><span>Big Project</span>
              <div className="tree"><span>Task Two</span>
                <div className="tree"><h4>Smaller Task</h4></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info">
            <div className="tree"><span>Big Project</span>
              <div className="tree"><span>Task Two</span>
                <div className="tree"><h4>Smaller Task</h4></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Focus
// export default connect(null, {actions})(Focus)
