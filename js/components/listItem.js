import React, {PropTypes} from "react";
import {DragSource} from 'react-dnd'
import ItemTitle from './itemTitle'

const draggingStyle = {
  opacity: 0.5,
  border: '3px black dashed'
}

class ListItem extends React.Component {
  constructor(props) {
    super(props)

    this._removeItem = this._removeItem.bind(this)
    this._updateTitle = this._updateTitle.bind(this)
    this._newItemAfter = this._newItemAfter.bind(this)
  }

  _renderChildren(children) {
    if (children) {
      return (
        <div className="list-item-children">
          {children.map(child => <DnDListItem
            key={child.id}
            listItem={child}
            newItemAfter={this.props.newItemAfter}
            removeItem={this.props.removeItem}
            updateTitle={this.props.updateTitle}
          />)}
        </div>
      )
    }
  }

  _updateTitle(newTitle) {
    this.props.updateTitle(this.props.listItem.id, newTitle)
  }

  _newItemAfter() {
    this.props.newItemAfter(this.props.listItem.id)
  }

  _removeItem() {
    this.props.removeItem(this.props.listItem.id)
  }


  render() {
    const {isDragging, connectDragSource, connectDragPreview, connectDropTarget} = this.props
    const { title, children } = this.props.listItem
    return (
      connectDragPreview(
        <div className="list-item" style={isDragging ? draggingStyle : {}}>
          {connectDragSource(<span>drag</span>)}
          <ItemTitle
            title={title}
            update={this._updateTitle}
            newItemAfter={this._newItemAfter}
            removeItem={this._removeItem}
          />
          {this._renderChildren(children)}
        </div>
      )
    )
  }
}

ListItem.propTypes = {
  listItem: React.PropTypes.object,
  newItemAfter: React.PropTypes.func,
  updateTitle: React.PropTypes.func,
}

const itemSource = {
  beginDrag(props) {
    return props.listItem
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    console.log('endDrop', item, dropResult)
  },

  isDragging(props, monitor) {
    return monitor.getItem().id === props.listItem.id
  }
}

const itemCollect = function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

const DnDListItem = DragSource('item', itemSource, itemCollect)(ListItem)

export default DnDListItem