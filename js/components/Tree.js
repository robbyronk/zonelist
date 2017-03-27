import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {get} from 'lodash'
import { DropTarget } from 'react-dnd'
import Item from './Item'
import {moveItem} from '../actions'

const target = {
  drop(props, monitor, component) {
    if(monitor.didDrop()) {
      return
    }
    props.finalMove(monitor.getItem().id)
  },

  hover(props, monitor) {
    const {id: draggedId, parent, items} = monitor.getItem()

    if (!monitor.isOver({shallow: true})) return

    if (parent == props.parent || draggedId == props.parent) return

    props.move(draggedId, props.id, props.parent)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    items: get(state, `items.${ownProps.id}.children`)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    move: (id, afterId, parent) => dispatch(moveItem(id, afterId, parent))
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@DropTarget('ITEM', target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Tree extends Component {
  static propTypes = {
    ids  : PropTypes.array.isRequired,
    parent : PropTypes.any,
  };

  render() {
    const {connectDropTarget, ids, parent} = this.props

    return connectDropTarget(
      <div style={{
        position: 'relative',
        minHeight: 10,
        paddingTop: 10,
        marginTop: -11,
        marginLeft: '2em'
      }}>
        {ids.map((id, i) => {
          return <Item
            key={id}
            id={id}
            parent={parent}
          />
        })}
      </div>
    )
  }
}
