import React from 'react'
import Tree from './Tree'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

@DragDropContext(HTML5Backend)
export default class ZoneList extends React.Component {
  render() {
    return (
      <div className='list'>
        <Tree
          ids={['root']}
          parent={null}
        />
      </div>
    )
  }
}