import React from 'react'

export default class BoardItem extends React.Component {
  render() {
    const title = 'something to do'
    return (
      <div className="board-item">
        <span className="board-item-title">{title}</span>
      </div>
    )
  }
}
