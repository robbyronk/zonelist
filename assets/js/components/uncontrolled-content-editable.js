import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class UncontrolledContentEditable extends React.Component {
  // take text on initialisation
  constructor(props) {
    super(props)
    this.state = {
      initialText: this.props.text
    }
  }

  // need this for when a new item is created
  componentDidMount() {
    if (this.props.editable) {
      this.textInput.focus()
    }
  }

  // update initial text if the control is becoming editable
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable && !this.props.editable) {
      this.setState({
        initialText: nextProps.text
      });
    }
  }

  // update the dom if the control is becoming not editable
  componentWillUpdate(nextProps) {
    if (!nextProps.editable && this.props.editable) {
      this.textInput.innerHTML = (this.state.initialText);
    }
  }

  // need this for putting focus into the contenteditable on click
  componentDidUpdate(prevProps) {
    if (!prevProps.editable && this.props.editable) {
      this.textInput.focus()
    }
  }

  // if the text content becomes empty, set it to empty string, run onChange
  handleChange = (e) => {
    if (!e.target.textContent.trim().length) {
      e.target.innerHTML = '';
    }

    this.props.onChange(e);
  }

  keyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.onEnter(e)
    }
  }

  keyDown = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        this.props.onShiftTab(e)
      } else {
        this.props.onTab(e)
      }
    }
  }

  render() {
    // render state (presumably from props) when editible
    const html = (this.props.editable ?
        this.state.initialText :
        this.props.text
    );

    return (
      <div
        ref={input => this.textInput = input}
        className={classnames(
          'flex-grow',
          'item-title',
          this.props.className,
        )}
        onInput={this.handleChange}
        onKeyPress={this.keyPress}
        onKeyDown={this.keyDown}
        onBlur={this.handleChange}
        onClick={this.props.onClick}
        contentEditable={this.props.editable}
        dangerouslySetInnerHTML={{__html: html}}/>
    );
  }
}

UncontrolledContentEditable.propTypes = {
  component: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  onTab: PropTypes.func,
  onShiftTab: PropTypes.func,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editable: PropTypes.bool,
  className: PropTypes.string,
}

UncontrolledContentEditable.defaultProps = {
  component: ReactDOM.div,
  editable: false
}

export default UncontrolledContentEditable
