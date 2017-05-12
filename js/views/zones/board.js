import React from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

@DragDropContext(HTML5Backend)
export default class ZoneBoard extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className="col-3">
          <h2><i className="fa fa-list-alt" aria-hidden="true"/> todo</h2>
          <div className="board-item">
            <span className="board-item-title"> something to do </span>
          </div>
          <div className="board-item">
            <span className="board-item-title"> something to do </span>
          </div>
          <div className="board-item">
            <span className="board-item-title"> something to do </span>
          </div>
        </div>
        <div className="col-3">
          <h2><i className="fa fa-crosshairs" aria-hidden="true"/> doing</h2>
          <div className="board-item">
            <span className="board-item-title"> something to do </span>
          </div>
        </div>
        <div className="col-3">
          <h2><i className="fa fa-clock-o" aria-hidden="true"/> waiting</h2>
          <div className="board-item">
            <span className="board-item-title"> something to do </span>
          </div>
          <div className="board-item">
            <span className="board-item-title"> something to do </span>
          </div>
        </div>
        <div className="col-3">
          <h2><i className="fa fa-check" aria-hidden="true"/> done</h2>
          <div className="board-item">
            <span className="board-item-title"> something to do </span>
          </div>
          <div className="board-item">
            <span className="board-item-title"> something to do </span>
          </div>
          <div className="board-item">
            <span className="board-item-title"> something to do </span>
          </div>
        </div>
      </div>
    )
  }
}
