import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {setStatus} from '../actions'

var mapDispatchToProps = {
  setStatus
}
@connect(null, mapDispatchToProps)
export default class BoardItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="board-item">
        <span className="board-item-title">{this.props.item.title}</span>
        <button className="btn btn-block btn-sm"
                onClick={() => this.props.setStatus(this.props.item.id, 'toDo')}>Move to To Do</button>
        <button className="btn btn-block btn-sm"
                onClick={() => this.props.setStatus(this.props.item.id, 'inProgress')}>Move to In Progress</button>
        <button className="btn btn-block btn-sm"
                onClick={() => this.props.setStatus(this.props.item.id, 'waiting')}>Move to Waiting</button>
        <button className="btn btn-block btn-sm"
                onClick={() => this.props.setStatus(this.props.item.id, 'done')}>Move to Done</button>
      </div>
    )
  }
}
