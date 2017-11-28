import React from 'react'
import classnames from 'classnames'
import {DropTarget} from 'react-dnd';
import {connect} from 'react-redux'

import TaskTitle from './task-title'
import {moveItemBefore} from "../../actions";

const target = {
  canDrop(props, monitor) {
    const {taskId: draggedTaskId} = monitor.getItem()
    const targetId = props.task.id;
    if (targetId === draggedTaskId) {
      return false
    }
    props.dispatch(moveItemBefore(draggedTaskId, targetId))
    return true
  },
  drop(props, monitor) {
    const {taskId: draggedTaskId} = monitor.getItem()
    console.log('dropped', draggedTaskId, 'on', props.task.id)
    return props.task
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const Task = ({task, connectDropTarget, isOver}) => (
  connectDropTarget(
    <div className={classnames("col-12", {'is-over': isOver})}>
      <TaskTitle task={task}/>
    </div>
  ))


const DropTask = DropTarget('task', target, collect)(Task);
export default connect()(DropTask);
