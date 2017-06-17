import React from 'react'
import {connect} from 'react-redux'
import {indentItem, newItemAfter, removeItem, unindentItem} from '../actions'

function ListItemToolbar({unindentItem, indentItem, newItemAfter, removeItem, id}) {
  return (
    <div className="item-toolbar">
      <button className="btn btn-sm mx-2"
              onClick={() => unindentItem(id)}>
        <i className="fa fa-level-up" aria-hidden="true"/>
      </button>
      <button className="btn btn-sm mx-2"
              onClick={() => indentItem(id)}>
        <i className="fa fa-level-down" aria-hidden="true"/>
      </button>
      {/*<button className="btn btn-sm mx-2">*/}
        {/*<i className="fa fa-arrow-up" aria-hidden="true"/>*/}
      {/*</button>*/}
      {/*<button className="btn btn-sm mx-2">*/}
        {/*<i className="fa fa-arrow-down" aria-hidden="true"/>*/}
      {/*</button>*/}
      <button className="btn btn-sm mx-2"
              onClick={() => newItemAfter(id)}>
        <i className="fa fa-plus" aria-hidden="true"/>
      </button>
      <button className="btn btn-sm right"
              onClick={() => removeItem(id)}>
        <i className="fa fa-trash" aria-hidden="true"/>
      </button>
    </div>
  )
}

export default connect(null, {unindentItem, indentItem, newItemAfter, removeItem})(ListItemToolbar)
