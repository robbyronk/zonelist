import React from 'react'
import {removeItem, setStatus} from '../actions'
import {connect} from 'react-redux'
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import classnames from 'classnames'

import StatusIcon from './status-icon'

const Item = ({name, status, click, task}) => {
  if ((task.status || 'toDo') === status) {
    return null
  }
  return (
    <DropdownItem onClick={() => click(status)}>
      <StatusIcon status={status}/> {name}
    </DropdownItem>
  )
}

const ItemStatusDropdown = ({task, click, className, removeItem}) => (
  <UncontrolledDropdown>
    <DropdownToggle className={classnames(className, 'mr-1')} tag="span">
      <StatusIcon status={task.status}/>
    </DropdownToggle>
    <DropdownMenu>
      <Item name="To Do" status={'toDo'} {...{task, click}}/>
      <Item name="Main Focus" status={'inProgress'} {...{task, click}}/>
      <Item name="Snooze" status={'waiting'} {...{task, click}}/>
      <Item name="Done" status={'done'} {...{task, click}}/>
      {/*<DropdownItem divider/>*/}
      {/*<DropdownItem onClick={() => removeItem()}>*/}
      {/*<i className="fa fa-trash"/> Delete*/}
      {/*</DropdownItem>*/}
    </DropdownMenu>
  </UncontrolledDropdown>
)

const mapDispatchToProps = (dispatch, props) => ({
  click: status => dispatch(setStatus(props.task.id, status)),
  removeItem: () => dispatch(removeItem(props.task.id))
})


export default connect(null, mapDispatchToProps)(ItemStatusDropdown)
