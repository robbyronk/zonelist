import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {get} from "lodash"
import {selectTask, updateTitle} from '../../actions'

class RootTaskTitle extends React.Component {
  _onEnter = (e) => {
    this.textInput.blur()
  }

  _onKeyPress = (e) => {
    switch (e.key) {
      case 'Enter':
        this._onEnter(e)
        return
    }
  }

  render() {
    return (
      <input
        className="root-task-title"
        type="text"
        onChange={({target: {value}}) => this.props.updateTitle(this.props.id, value)}
        onFocus={() => this.props.selectTask(null)}
        onKeyDown={this._onKeyDown}
        onKeyPress={this._onKeyPress}
        ref={input => this.textInput = input}
        value={this.props.title}
      />
    )
  }
}

RootTaskTitle.propTypes = {
  newItemBefore: React.PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  title: get(state, `items.${ownProps.id}.title`),
})

export default connect(mapStateToProps, {updateTitle, selectTask})(RootTaskTitle)
