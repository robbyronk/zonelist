import React from 'react'
import classnames from 'classnames'
import {DropTarget} from 'react-dnd';
import {connect} from 'react-redux'

import TaskTitle from './task-title'
import {moveItemBefore} from "../../actions";

const target = {
  canDrop(props, monitor) {
    console.log(monitor.getClientOffset()) // mouse location
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
  hover(props, monitor, component) {
    console.log('hover', component)
    console.log(component.node.getBoundingClientRect()); // location of this drop zone
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Task extends React.Component {
  render() {
    const {task, connectDropTarget, isOver} = this.props;
    return connectDropTarget(
      <div
        ref={node => (this.node = node)}
        className={classnames("col-12", {'is-over': isOver})}>
        <TaskTitle task={task}/>
      </div>
    )
  }
}


const DropTask = DropTarget('task', target, collect)(Task);
export default connect()(DropTask);
