import React from 'react'
import Tree from '../../components/Tree'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

@DragDropContext(HTML5Backend)
export default class ZoneList extends React.Component {
  render() {
    return (
      <div className='view-container list'>
        <Tree
          ids={['1']}
          parent={null}
        />
      </div>
    )
  }
}
