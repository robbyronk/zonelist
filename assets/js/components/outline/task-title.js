import React from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import classnames from 'classnames'

import {indentItem, newItemAfter, removeItem, selectTask, unindentItem, unselectTask, updateTitle} from '../../actions'
import ItemStatusDropdown from "../item-status-dropdown";
import UncontrolledContentEditable from "../uncontrolled-content-editable";

class TaskTitle extends React.Component {
  _handleChange = (e) => {
    const {target: {textContent: value }} = e
    console.log(e, e.target.textContent)
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
        <ItemStatusDropdown {...this.props} style={iconStyle}/>
        <UncontrolledContentEditable
          className={classnames(
            {'first-level-title': task.level === 1},
            {'text-success': task.status === 'done'},
            {'text-warning': task.status === 'inProgress'},
            {'text-muted': task.status === 'waiting'},
          )}
          editable={this.props.task.id === this.props.selected}
          text={task.title || ''}
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
  newItemBefore: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  focus: state.focus,
  selected: state.outline.selectedItem
})

const actions = {indentItem, newItemAfter, removeItem, unindentItem, updateTitle, selectTask, unselectTask};
export default connect(mapStateToProps, actions)(TaskTitle)
