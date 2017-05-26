import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {setStatus} from '../actions'
import StatusIcon from './status-icon'

var mapDispatchToProps = {
  setStatus
}
@connect(null, mapDispatchToProps)
export default class BoardItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  btn = (status) => (
    <div className="col-4">
      <button className="btn btn-block btn-sm"
              onClick={() => this.props.setStatus(this.props.item.id, status)}>
        <StatusIcon status={status}/>
      </button>
    </div>
  )

  render() {
    const {item} = this.props
    const status = item.status || 'toDo'
    return (
      <div className={classNames('board-item', status)}>
        <div className="board-item-title">{item.title}</div>
        <div className="row">
          {status === 'toDo' ? null : this.btn('toDo')}
          {status === 'inProgress' ? null : this.btn('inProgress')}
          {status === 'waiting' ? null : this.btn('waiting')}
          {status === 'done' ? null : this.btn('done')}
        </div>
      </div>
    )
  }
}
