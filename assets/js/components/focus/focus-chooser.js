import React from 'react'
import {connect} from 'react-redux'
import FocusChoice from './focus-choice'
import {toDoTasks} from '../../selectors/board'

function FocusChooser({toDo}) {
  return (
    <div className="container focus-chooser">
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
})

export default connect(mapStateToProps)(FocusChooser)
