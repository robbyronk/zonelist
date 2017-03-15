import React, {PropTypes} from "react";


export default class ItemTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title
    }
    this._handleChange = this._handleChange.bind(this)
    this._onBlurUpdate = this._onBlurUpdate.bind(this)
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

  componentWillReceiveProps(nextProps) {
    this.setState({title: nextProps.title});
  }

  _handleChange(e) {
    this.setState({title: e.target.value});
  }

  _onBlurUpdate(e) {
    if (this.state.title !== e.target.value) {
      this.props.update(e.target.value)
    }
  }

  _onBackspace(e) {
    if (this.state.title === '') {
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
    this.props.update(e.target.value)
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
    console.log(e.key, e.keyCode, e.altKey, e.ctrlKey, e.shiftKey, e.metaKey, e.which, e.charCode, e.location)
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
    console.log(e.key, e.keyCode, e.altKey, e.ctrlKey, e.shiftKey, e.metaKey, e.which, e.charCode, e.location)
    switch (e.key) {
      case 'Enter':
        this._onEnter(e)
        return
    }
  }

  render() {
    return (
      <input
        type="text"
        onBlur={this._onBlurUpdate}
        onChange={this._handleChange}
        onKeyDown={this._onKeyDown}
        onKeyPress={this._onKeyPress}
        ref={input => this.textInput = input}
        value={this.state.title || ''}
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
  update: React.PropTypes.func.isRequired,
}