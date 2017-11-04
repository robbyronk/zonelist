import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class UncontrolledContentEditable extends React.Component {
  // take text on initialisation
  constructor(props) {
    super(props)
    this.state = {
      initialText: this.props.text
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
      this.getDOMNode().innerHTML = (this.state.initialText);
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
    console.log(e.key, e.shiftKey)
    if (e.key === 'Enter') {
      this.props.onEnter(e)
      return
    }
  }

  render() {
    // render state (presumably from props) when editible
    var html = (this.props.editable ?
      this.state.initialText :
      this.props.text
    );

    return (
      <div onInput={this.handleChange}
           onKeyPress={this.keyPress}
                            onBlur={this.handleChange}
                            contentEditable={this.props.editable}
                            dangerouslySetInnerHTML={{__html: html}}/>
    );
  }
}

UncontrolledContentEditable.propTypes = {
  component: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editable: PropTypes.bool
}

UncontrolledContentEditable.defaultProps = {
  component: ReactDOM.div,
  editable: false
}

export default UncontrolledContentEditable
