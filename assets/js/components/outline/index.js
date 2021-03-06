import React from 'react'
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import RootTaskTitle from './root'
import Task from './task'
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
      <ReactCSSTransitionGroup component={'div'} transitionName={'example'} transitionEnterTimeout={200} transitionLeaveTimeout={200}>
        <div className="row">
          {tail(tasks).map(t => <Task key={t.id} task={t} />)}
        </div>
      </ReactCSSTransitionGroup>
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
