import React from 'react'
import {connect} from 'react-redux'
import FocusChoice from './focus-choice'
import {toDoLane} from '../../selectors/board'

function FocusChooser({toDo}) {
  return (
    <div className="container">
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
    toDo: toDoLane(state),
  }
)

export default connect(mapStateToProps)(FocusChooser)
