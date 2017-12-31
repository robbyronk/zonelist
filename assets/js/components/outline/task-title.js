import React from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import classnames from 'classnames'
import {DragSource} from 'react-dnd';

import {
  finishDrag, indentItem, newItemAfter, removeItem, selectTask, startDrag, unindentItem, unselectTask,
  updateTitle
} from '../../actions'
import ItemStatusDropdown from "../item-status-dropdown";
import UncontrolledContentEditable from "../uncontrolled-content-editable";
import {TaskPropType} from '../../prop-types'

const taskSource = {
  beginDrag(props) {
    props.startDrag(props.task.id)
    return {
      taskId: props.task.id
    };
  },
  endDrag(props, monitor) {
    props.finishDrag()
  },
  isDragging(props, monitor) {
    return props.task.id === monitor.getItem().id
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class TaskTitle extends React.Component {
  _handleChange = (e) => {
    const {target: {textContent: value }} = e
    this.props.updateTitle(this.props.task.id, value)
  }

  _onEnter = (e) => {
    e.preventDefault()
    if (this.props.newItemAfter) {
      this.props.newItemAfter(this.props.task.id)
    }
  }

  _onTab = (e) => {
    e.preventDefault()
    this.props.indentItem(this.props.task.id)
  }

  _onShiftTab = (e) => {
    e.preventDefault()
    this.props.unindentItem(this.props.task.id)
  }

  render() {
    const {task} = this.props
    let iconStyle = {
      marginLeft: task.level * 1 + 'em',
      transition: '0.1s',
    }
    return (
      <div
        className={classnames('d-flex', 'align-items-baseline', (this.props.selected === task.id ? 'selected-title' : 'title'))}>
        {this.props.connectDragSource(<div><ItemStatusDropdown {...this.props} style={iconStyle}/></div>)}
        <UncontrolledContentEditable
          className={classnames(
            {'first-level-title': task.level === 1},
            {'text-success': task.status === 'done'},
            {'text-warning': task.status === 'inProgress'},
            {'text-muted': task.status === 'waiting'},
          )}
          editable={this.props.task.id === this.props.selected}
          text={task.title}
          onChange={this._handleChange}
          onEnter={this._onEnter}
          onTab={this._onTab}
          onShiftTab={this._onShiftTab}
          onClick={() => this.props.selectTask(task.id)}
        />
      </div>
    )
  }
}

TaskTitle.propTypes = {
  task: TaskPropType.isRequired,
  newItemBefore: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  focus: state.focus,
  selected: state.outline.selectedItem
})

const DragTaskTitle = DragSource('task', taskSource, collect)(TaskTitle)

const actions = {indentItem, newItemAfter, removeItem, unindentItem, updateTitle, selectTask, unselectTask, startDrag, finishDrag};
export default connect(mapStateToProps, actions)(DragTaskTitle)
