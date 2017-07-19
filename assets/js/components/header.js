import React from 'react'
import {connect} from 'react-redux'
import {hideBoard, openExportModal, openImportModal, reset, showBoard, showFocus, showOutline} from '../actions'
import ImportModal from './import-modal'
import ExportModal from './export-modal'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import IntroModal from './intro-modal'

const mapDispatchToProps = {
  openExportModal,
  openImportModal,
  reset,
  showBoard,
  hideBoard,
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
                <DropdownItem onClick={this.props.openExportModal}>
                  <i className="fa fa-download" aria-hidden="true"/> Export Code
                </DropdownItem>
                <DropdownItem onClick={this.props.openImportModal}>
                  <i className="fa fa-upload" aria-hidden="true"/> Import Code
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>v0.0.2-chocolate-teapot</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <ImportModal/>
            <ExportModal/>
            <IntroModal/>
          </li>
        </ul>
      </nav>
    )
  }
}
