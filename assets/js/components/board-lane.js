import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import BoardItem from './board-item'
import StatusIcon from './status-icon'

export default class BoardLane extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="col-3">
        <h2><StatusIcon status={this.props.status}/> {this.props.title}</h2>
        {this.props.items.map(i => <BoardItem key={i.title} item={i}/>)}
      </div>
    )
  }
}
