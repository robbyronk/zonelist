import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {get} from "lodash"
import {updateTitle} from "../actions";

class ItemTitle extends React.Component {
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
    // todo mapDispatchToProps
    this.props.dispatch(updateTitle(this.props.id, value))
  }

  _onBackspace(e) {
    if (this.props.title === '') {
      console.log('removing item')
      if (this.props.removeItem) {
        this.props.removeItem()
      }
    }
  }

  _onCtrlAltEnter(e) {
    console.log('creating item before')
    if (this.props.newItemBefore) {
      this.props.newItemBefore()
    }
  }

  _onEnter(e) {
    if (this.props.newItemAfter) {
      this.props.newItemAfter()
    }
  }

  _onTab = (e) => {
    console.log('tabbing')
    e.preventDefault()
    if (this.props.indentItem) {
      this.props.indentItem()
    }
  }

  _onShiftTab = (e) => {
    e.preventDefault()
    if (this.props.unindentItem) {
      this.props.unindentItem()
    }
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
      <input
        className="item-title"
        type="text"
        onChange={this._handleChange}
        onKeyDown={this._onKeyDown}
        onKeyPress={this._onKeyPress}
        ref={input => this.textInput = input}
        value={this.props.title}
      />
    )
  }
}

ItemTitle.propTypes = {
  unindentItem: React.PropTypes.func.isRequired,
  indentItem: React.PropTypes.func.isRequired,
  newItemAfter: React.PropTypes.func.isRequired,
  newItemBefore: React.PropTypes.func,
  removeItem: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  title: get(state, `items.${ownProps.id}.title`)
})

export default connect(mapStateToProps)(ItemTitle)
