import React, {Component, PropTypes} from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import Tree from './Tree'
import ItemTitle from './itemTitle'

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      parent: props.parent,
      items: props.item.children
    }
  },

  isDragging(props, monitor) {
    return props.id == monitor.getItem().id
  }
}

const target = {
  canDrop() {
    return false
  },

  hover(props, monitor) {
    const {id: draggedId} = monitor.getItem()
    const {id: overId} = props

    if (draggedId == overId || draggedId == props.parent) return
    if (!monitor.isOver({shallow: true})) return

    props.move(draggedId, overId, props.parent)
  }
}

@DropTarget('ITEM', target, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('ITEM', source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class Item extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
    parent: PropTypes.any,
    item: PropTypes.object,
    move: PropTypes.func.isRequired,
    find: PropTypes.func.isRequired,
  };

  render() {
    const {
      connectDropTarget, connectDragPreview, connectDragSource, isDragging,
      item: {id, title, children}, parent, move, find
    } = this.props

    const style = {
      background: 'white',
      border: '1px solid #ccc',
      padding: '1em',
      marginBottom: -1
    }
    const draggingStyle = {
      opacity: 0.5,
      ...style
    }

    return connectDropTarget(connectDragPreview(
      <div>
        <div style={isDragging ? draggingStyle : style}>
        {connectDragSource(<span className="drag-source">&#x21D5;</span>)}
          <ItemTitle
            id={id}
          />
        </div>

        <Tree
          parent={id}
          items={children}
          move={move}
          finalMove={this.props.finalMove}
          find={find}
        />
      </div>
    ))
  }
}
