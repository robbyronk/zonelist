import React, {Component, PropTypes} from 'react'

export default class BoardItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="board-item">
        <span className="board-item-title">{this.props.item.title}</span>
      </div>
    )
  }
}
