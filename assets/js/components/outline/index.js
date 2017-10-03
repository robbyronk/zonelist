import React from 'react'
import {connect} from 'react-redux'
import RootTaskTitle from './root'
import TaskTitle from './task-title'
import {listOrderSelector} from '../../selectors/board'
import {get, tail} from 'lodash'
import {indentItem, newItemAfter, unindentItem} from '../../actions'

function Outline({tasks, selectedTask, unindentItem, indentItem, newItemAfter}) {
  return (
    <div className="container">
      <div className="row mt-1">
        <div className="col-12">
          <RootTaskTitle/>
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
    tasks: listOrderSelector(state),
    selectedTask: get(state.items, state.outline.selectedItem, {})
  }
}

export default connect(mapStateToProps, {unindentItem, indentItem, newItemAfter})(Outline)
