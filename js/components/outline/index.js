import React from 'react'
import {connect} from 'react-redux'
import RootTaskTitle from './root'
import TaskTitle from './task-title'
import {listOrderSelector} from '../../selectors/board'
import {tail, get} from 'lodash'
import {indentItem, newItemAfter, unindentItem} from '../../actions'
import classnames from 'classnames'
import ItemStatusDropdown from '../item-status-dropdown'
import {UncontrolledAlert} from 'reactstrap'

function Outline({tasks, selectedTask, unindentItem, indentItem, newItemAfter}) {
  return (
    <div className="container outline">
      <UncontrolledAlert color="info">
        Make an outline out of your plan here. Break your big challenges into tiny tasks.
      </UncontrolledAlert>
      <div className={classnames('row sticky-top sub-menu bg-faded d-flex justify-content-around', {'invisible': !selectedTask.id})}>
        <button className="btn" onClick={() => unindentItem(selectedTask.id)}>
          <i className="fa fa-outdent"/>
          <span className="hidden-sm-down"> Outdent</span>
        </button>
        <button className="btn nav-item" onClick={() => indentItem(selectedTask.id)}>
          <i className="fa fa-indent"/>
          <span className="hidden-sm-down"> Indent</span>
        </button>
        <button className="btn nav-item" onClick={() => newItemAfter(selectedTask.id)}>
          <i className="fa fa-plus"/>
          <span className="hidden-sm-down"> New Task</span>
        </button>
        {/*<button className="btn nav-item">*/}
          {/*<i className="fa fa-code-fork fa-flip-vertical"/>*/}
          {/*<span className="hidden-sm-down">New Sub Task</span>*/}
        {/*</button>*/}
        <ItemStatusDropdown
          className={classnames('btn', {
            'btn-info': selectedTask.status === 'toDo' || selectedTask.status === undefined,
            'btn-warning': selectedTask.status === 'waiting',
            'btn-success': selectedTask.status === 'inProgress' || selectedTask.status === 'done'
          })}
          item={selectedTask}/>
      </div>
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
    tasks: listOrderSelector(state),
    selectedTask: get(state.items, state.outline.selectedItem, {})
  }
}

export default connect(mapStateToProps, {unindentItem, indentItem, newItemAfter})(Outline)
