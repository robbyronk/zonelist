import React from 'react'
import {connect} from 'react-redux'
import {reset, openImportModal, openExportModal, showBoard, hideBoard} from '../actions'
import ImportModal from '../components/import-modal'
import ExportModal from '../components/export-modal'
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'

const mapDispatchToProps = {
  openExportModal,
  openImportModal,
  reset,
  showBoard,
  hideBoard,
}

const mapStateToProps = (state) => ({
  isBoard: state.is.board
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-3">
          <h1>ZoneList</h1>
        </div>
        <div className="col-9 text-right">
          <UncontrolledDropdown>
            <DropdownToggle>
              Import / Export
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.props.openImportModal}>Import</DropdownItem>
              <DropdownItem onClick={this.props.openExportModal}>Export</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem header>Careful!</DropdownItem>
              <DropdownItem header>Reset will erase everything!</DropdownItem>
              <DropdownItem onClick={this.props.reset}>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <ImportModal/>
          <ExportModal/>
        </div>
        <div className="col-6">
          version 0.0.0-submarine-screendoor
        </div>
        <div className="col-6 text-right">
          {
            this.props.isBoard
              ? <button className="btn" onClick={this.props.hideBoard}>Show List</button>
              : <button className="btn" onClick={this.props.showBoard}>Show Board</button>
          }
        </div>
      </div>
    )
  }
}
