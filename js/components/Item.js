import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {get} from 'lodash'
import {DragSource, DropTarget} from 'react-dnd'
import Tree from './Tree'
import ItemTitle from './itemTitle'
import {moveItem} from '../actions'

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      parent: props.parent,
    }
  },

  isDragging(props, monitor) {
    return props.id === monitor.getItem().id
  }
}

const target = {
  canDrop() {
    return false
  },

  hover(props, monitor) {
    const {id: draggedId} = monitor.getItem()
    const {id: overId} = props

    if (draggedId === overId || draggedId === props.parent) return
    if (!monitor.isOver({shallow: true})) return

    props.move(draggedId, overId, props.parent)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    item: get(state, `items.${ownProps.id}`),
    children: get(state, `items.${ownProps.id}.children`)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    move: (id, afterId, parent) => dispatch(moveItem(id, afterId, parent))
  }
}

@connect(mapStateToProps, mapDispatchToProps)
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
  };

  render() {
    const {
      connectDropTarget, connectDragPreview, connectDragSource, isDragging,
      item: {id, title, children}
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
          ids={children}
        />
      </div>
    ))
  }
}
