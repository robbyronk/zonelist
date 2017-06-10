import React, {Component, PropTypes} from 'react'
import {setStatus} from '../actions'
import {connect} from 'react-redux'
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'

import StatusIcon from './status-icon'

@connect(null, {setStatus})
export default class ItemStatusDropdown extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  click(status) {
    this.setState({
      dropdownOpen: false
    })
    this.props.setStatus(this.props.item.id, status)
  }

  render() {
    const {item} = this.props
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle>
          <StatusIcon status={item.status}/>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.click('toDo')}>
            <StatusIcon status={'toDo'}/> To Do
          </DropdownItem>
          <DropdownItem onClick={() => this.click('inProgress')}>
            <StatusIcon status={'inProgress'}/> Main Focus
          </DropdownItem>
          <DropdownItem onClick={() => this.click('waiting')}>
            <StatusIcon status={'waiting'}/> Snooze
          </DropdownItem>
          <DropdownItem onClick={() => this.click('done')}>
            <StatusIcon status={'done'}/> Done
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>

    )
  }
}
