import React from 'react'

export default function ListItemToolbar(props) {
  return (
    <div className="item-toolbar">
      <button className="btn btn-sm mx-2">
        <i className="fa fa-level-up" aria-hidden="true"/>
      </button>
      <button className="btn btn-sm mx-2">
        <i className="fa fa-level-down" aria-hidden="true"/>
      </button>
      <button className="btn btn-sm mx-2">
        <i className="fa fa-arrow-up" aria-hidden="true"/>
      </button>
      <button className="btn btn-sm mx-2">
        <i className="fa fa-arrow-down" aria-hidden="true"/>
      </button>
      <button className="btn btn-sm mx-2">
        <i className="fa fa-plus" aria-hidden="true"/>
      </button>
      <button className="btn btn-sm right">
        <i className="fa fa-trash" aria-hidden="true"/>
      </button>
    </div>
  )
}
