import React from 'react'
import {connect} from 'react-redux'
import {showFocus, showOutline} from '../actions'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'
import IntroModal from './intro-modal'

const mapDispatchToProps = {
  showOutline,
  showFocus,
}

const mapStateToProps = (state) => ({
  view: state.view,
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render () {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light sticky-top bg-faded">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                ZoneList
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem divider />
                <DropdownItem divider />
                <DropdownItem divider />
                <DropdownItem onClick={this.props.showOutline}>
                  <i className="fa fa-indent" aria-hidden="true"/> Outline
                </DropdownItem>
                <DropdownItem onClick={this.props.showFocus}>
                  <i className="fa fa-crosshairs" aria-hidden="true"/> Focus
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>v0.0.2-chocolate-teapot</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <IntroModal/>
          </li>
        </ul>
      </nav>
    )
  }
}
