import React from 'react'
import {connect} from 'react-redux'
import TaskContext from './task-context'
import {setStatus} from '../../actions'

function FocusChoice({id, setStatus}) {
  return (
    <button className="my-3 btn btn-info btn-block text-left focus-choice"
            onClick={() => setStatus(id, 'inProgress')}>
      <TaskContext id={id}/>
    </button>
  )
}

export default connect(null, {setStatus})(FocusChoice)
