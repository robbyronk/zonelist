import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {indentItem, newItemAfter, removeItem, selectTask, unindentItem, unselectTask, updateTitle} from '../../actions'
import classnames from 'classnames'

class TaskTitle extends React.Component {
  constructor(props) {
    super(props)
    this._handleChange = this._handleChange.bind(this)
    this._onBackspace = this._onBackspace.bind(this)
    this._onCtrlAltEnter = this._onCtrlAltEnter.bind(this)
    this._onEnter = this._onEnter.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }

  componentDidMount() {
    if (this.props.task.id === this.props.focus) {
      this.textInput.focus();
    }
    this.textInput.style.height = 'auto'
    this.textInput.style.height = this.textInput.scrollHeight + 'px'
  }

  componentDidUpdate() {
    this.textInput.style.height = 'auto'
    this.textInput.style.height = this.textInput.scrollHeight + 'px'
  }

  _handleChange({target: {value}}) {
    this.props.updateTitle(this.props.task.id, value)
  }

  _onBackspace(e) {
  }

  _onCtrlAltEnter(e) {
    console.log('creating item before')
    if (this.props.newItemBefore) {
      this.props.newItemBefore()
    }
  }

  _onEnter(e) {
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

  _onKeyDown(e) {
    // console.log(e.key, e.keyCode, e.altKey, e.ctrlKey, e.shiftKey, e.metaKey, e.which, e.charCode, e.location)
    switch (e.key) {
      case 'Enter':
        if (e.altKey && e.ctrlKey) {
          this._onCtrlAltEnter(e)
        }
        return
      case 'Backspace':
        this._onBackspace(e)
        return
      case 'Tab':
        if (e.shiftKey) {
          this._onShiftTab(e)
        } else {
          this._onTab(e)
        }
        return
    }

  }

  _onKeyPress(e) {
    // console.log(e.key, e.keyCode, e.altKey, e.ctrlKey, e.shiftKey, e.metaKey, e.which, e.charCode, e.location)
    switch (e.key) {
      case 'Enter':
        this._onEnter(e)
        return
    }
  }

  render() {
    const {task} = this.props
    const status = task.status || 'toDo'
    let barStyle = {
      marginLeft: task.level * 1 + 'em'
    }
    if (this.props.selected === task.id) {
      barStyle = {
        width: (task.level * 1 + 0.25) + 'em'
      }
    }
    return (
      <div className="d-flex">
        <span className={classnames('bar', status)} style={barStyle}/>
        <textarea
          rows={1}
          className="item-title flex-grow"
          type="text"
          onChange={this._handleChange}
          onKeyDown={this._onKeyDown}
          onKeyPress={this._onKeyPress}
          onFocus={() => this.props.selectTask(task.id)}
          onBlur={() => this.props.unselectTask()}
          ref={input => this.textInput = input}
          value={task.title}
        />
      </div>
    )
  }
}

TaskTitle.propTypes = {
  newItemBefore: React.PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  focus: state.focus,
  selected: state.outline.selectedItem
})

export default connect(mapStateToProps, {indentItem, newItemAfter, removeItem, unindentItem, updateTitle, selectTask, unselectTask})(TaskTitle)
