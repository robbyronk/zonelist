import React from 'react'
import classnames from 'classnames'
import {DropTarget} from 'react-dnd';
import {connect} from 'react-redux'

import TaskTitle from './task-title'
import {moveItemAfter, moveItemBefore} from "../../actions";

const target = {
  drop(props, monitor) {
    return props.task
  },
  hover(props, monitor, component) {
    const {taskId: draggedTaskId} = monitor.getItem()
    const targetId = props.task.id;
    if (targetId === draggedTaskId) {
      return
    }

    const {y: mouseY} = monitor.getClientOffset();
    const dropZone = component.node.getBoundingClientRect();
    const componentMiddle = (dropZone.top + dropZone.bottom) / 2;
    if (mouseY < componentMiddle) {
      props.dispatch(moveItemBefore(draggedTaskId, targetId))
    } else {
      props.dispatch(moveItemAfter(draggedTaskId, targetId))
    }
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
