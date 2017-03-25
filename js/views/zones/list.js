import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {setDocumentTitle} from "../../utils";
import Tree from '../../components/Tree'
import {DragDropContext}    from 'react-dnd';
import HTML5Backend         from 'react-dnd-html5-backend';

import {indentItem, removeItem, unindentItem, updateTitle} from '../../actions'

// basic actions:
// change the title,
// move an item (to parent, sibling above),
// delete an item,
// create a new item anywhere

const transformItems = function (items, id) {
  const item = items[id];
  return Object.assign({}, item, {children: item.children.map(c => transformItems(items, c))})
}


@DragDropContext(HTML5Backend)

class ZoneList extends React.Component {
  state = {
    tree: [
      transformItems(this.props.items, '1')
    ]
  }

  constructor(props) {
    super(props)

    this._removeItem = this._removeItem.bind(this)
    this.finalMove = this.finalMove.bind(this)
    this.moveItem = this.moveItem.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) {
      return
    }
    this.setState(
      {
        tree: [
          transformItems(nextProps.items, '1')
        ]
      }
    )

  }

  _removeItem(id) {
    this.props.dispatch(removeItem(id))
  }

  _indentItem = (id) => {
    this.props.dispatch(indentItem(id))
  }

  _unindentItem = (id) => {
    this.props.dispatch(unindentItem(id))
  }

  finalMove(id, parentId, newIndex) {
    const find = (id, items, parent = null) => {
      let afterId = null
      for(const node of items) {
        if (node.id === id) {
          return { id, afterId, parent }
        }
        if (node.children && node.children.length) {
          const result = find(id, node.children, node.id)
          if (result) {
            return result
          }
        }
        afterId = node.id
      }

      return null
    }

    this.props.dispatch({type: 'MOVE_ITEM', ...find(id, this.state.tree)})
  }

  moveItem(id, afterId, nodeId) {
    if (id == afterId) return

    let {tree} = this.state

    const removeNode = (id, items) => {
      for (const node of items) {
        if (node.id == id) {
          items.splice(items.indexOf(node), 1)
          return
        }

        if (node.children && node.children.length) {
          removeNode(id, node.children)
        }
      }
    }

    const item = {...this.findItem(id, tree)}
    if (!item.id) {
      return
    }

    const dest = nodeId ? this.findItem(nodeId, tree).children : tree

    if (!afterId) {
      removeNode(id, tree)
      dest.push(item)
    } else {
      const index = dest.indexOf(dest.filter(v => v.id == afterId).shift())
      removeNode(id, tree)
      dest.splice(index, 0, item)
    }

    this.setState({tree})
  }

  findItem(id, items) {
    for (const node of items) {
      if (node.id == id) return node
      if (node.children && node.children.length) {
        const result = this.findItem(id, node.children)
        if (result) {
          return result
        }
      }
    }

    return false
  }

  render() {
    const {tree} = this.state
    const {focus} = this.props

    return (
      <div className='view-container list'>
        <Tree
          parent={null}
          items={tree}
          focus={focus}
          indentItem={this._indentItem}
          unindentItem={this._unindentItem}
          removeItem={this._removeItem}
          move={this.moveItem.bind(this)}
          find={this.findItem.bind(this)}
          finalMove={this.finalMove}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    items: state.items,
    focus: state.focus,
  }
);

export default connect(mapStateToProps)(ZoneList);
