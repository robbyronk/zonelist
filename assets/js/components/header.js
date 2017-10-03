import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'

import {indentItem, newItemAfter, removeItem, setStatus, showFocus, showOutline, unindentItem} from '../actions'
import {selectedTask} from "../selectors/items";
import StatusIcon from "./status-icon";

const SetStatusDropdownItem = connect(
  createStructuredSelector({selectedTask}),
  {setStatus}
)(
  ({status, setStatus, title, selectedTask}) => {
    if (!selectedTask.id) {
      return null
    }
    return (
      <DropdownItem onClick={() => setStatus(selectedTask.id, status)}>
        <StatusIcon status={status}/> {title}
      </DropdownItem>
    );
  }
)

const Menu = connect(
  createStructuredSelector({selectedTask}),
  {showOutline, showFocus, setStatus}
)(
  ({open, toggle, showOutline, showFocus, setStatus}) => (
    <li className="nav-item mr-1">
      <Dropdown isOpen={open} toggle={toggle}>
        <DropdownToggle caret>
          <i className="fa fa-bars"/>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={showOutline}>
            <i className="fa fa-list" aria-hidden="true"/> Outline
          </DropdownItem>
          <DropdownItem onClick={showFocus}>
            <i className="fa fa-crosshairs" aria-hidden="true"/> Focus
          </DropdownItem>
          <DropdownItem divider/>
          <SetStatusDropdownItem title="To Do" status="toDo"/>
          <SetStatusDropdownItem title="Main Focus" status="inProgress"/>
          <SetStatusDropdownItem title="Snooze" status="waiting"/>
          <SetStatusDropdownItem title="Done" status="done"/>
        </DropdownMenu>
      </Dropdown>
    </li>
  )
)

const IndentOutdent = connect(
  createStructuredSelector({selectedTask}),
  {unindentItem, indentItem}
)(
  ({selectedTask, unindentItem, indentItem}) => {
    if (!selectedTask.id) {
      return null
    }
    return (
      <li className="nav-item mr-1">
        <Button onClick={() => unindentItem(selectedTask.id)}>
          <i className="fa fa-outdent"/>
          <span className="hidden-sm-down"> Unindent</span>
        </Button>
        <Button onClick={() => indentItem(selectedTask.id)}>
          <i className="fa fa-indent"/>
          <span className="hidden-sm-down"> Indent</span>
        </Button>
      </li>
    );
  }
);

const AddTask = connect(
  createStructuredSelector({selectedTask}),
  {newItemAfter}
)(
  ({selectedTask, newItemAfter}) => {
    if (!selectedTask.id) {
      return null
    }
    return (
      <li className="nav-item mr-1">
        <Button onClick={() => newItemAfter(selectedTask.id)}>
          <i className="fa fa-plus"/>
          <span className="hidden-sm-down"> New Task</span>
        </Button>
      </li>
    );
  }
);

const DeleteTask = connect(
  createStructuredSelector({selectedTask}),
  {removeItem}
)(
  ({selectedTask, removeItem}) => {
    if (!selectedTask.id) {
      return null
    }
    return (
      <li className="nav-item ml-auto">
        <Button onClick={() => removeItem(selectedTask.id)}>
          <i className="fa fa-trash"/>
          <span className="hidden-sm-down"> Delete Task</span>
        </Button>
      </li>
    );
  }
);

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => this.setState({dropdownOpen: !this.state.dropdownOpen})

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light sticky-top bg-faded">
        <ul className="navbar-nav flex-row">
          <Menu open={this.state.dropdownOpen} toggle={this.toggle}/>
          {this.state.dropdownOpen ? null : <IndentOutdent/>}
          {this.state.dropdownOpen ? null : <AddTask/>}
          {this.state.dropdownOpen ? null : <DeleteTask/>}
        </ul>
      </nav>
    )
  }
}
