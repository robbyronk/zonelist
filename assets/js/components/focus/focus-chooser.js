import React from 'react'
import {connect} from 'react-redux'
import FocusChoice from './focus-choice'
import {toDoTasks} from '../../selectors/board'
import {UncontrolledAlert} from 'reactstrap'
import StatusIcon from '../status-icon'

function FocusChooser({toDo}) {
  return (
    <div className="container focus-chooser">
      <UncontrolledAlert color="info">
        These are your smallest ready-to-go tasks. <br/>
        Choose one to be your <span style={{whiteSpace: 'nowrap'}}><StatusIcon status="inProgress"/> Main Focus.</span>
      </UncontrolledAlert>
      { toDo.map(x => (
        <div key={x.id} className="row">
          <div className="col-12">
            <FocusChoice id={x.id}/>
          </div>
        </div>
      )) }
    </div>
  )
}

const mapStateToProps = state => ({
    toDo: toDoTasks(state),
  }
)

export default connect(mapStateToProps)(FocusChooser)
