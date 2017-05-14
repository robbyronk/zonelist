import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import BoardItem from './board-item'

export default class BoardLane extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="col-3">
        <h2><i className={classNames('fa', `fa-${this.props.icon}`)} aria-hidden="true"/> {this.props.title}</h2>
        {this.props.items.map(i => <BoardItem key={i.title} item={i}/>)}
      </div>
    )
  }
}
