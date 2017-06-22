import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {get} from "lodash"
import {indentItem, newItemAfter, removeItem, unindentItem, updateTitle} from '../../actions'

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
    if (this.props.id === this.props.focus) {
      this.textInput.focus();
    }
  }

  _handleChange({target: {value}}) {
    this.props.updateTitle(this.props.id, value)
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
    if (this.props.newItemAfter) {
      this.props.newItemAfter(this.props.id)
    }
  }

  _onTab = (e) => {
    e.preventDefault()
    this.props.indentItem(this.props.id)
  }

  _onShiftTab = (e) => {
    e.preventDefault()
    this.props.unindentItem(this.props.id)
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
    return (
      <div>
        <span className="bar to-do"/>
        <input
          className="item-title"
          type="text"
          onChange={this._handleChange}
          onKeyDown={this._onKeyDown}
          onKeyPress={this._onKeyPress}
          ref={input => this.textInput = input}
          value={this.props.title}
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
  title: get(state, `items.${ownProps.id}.title`),
})

export default connect(mapStateToProps, {indentItem, newItemAfter, removeItem, unindentItem, updateTitle})(TaskTitle)