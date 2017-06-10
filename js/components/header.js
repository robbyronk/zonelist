import React from 'react'
import {connect} from 'react-redux'
import {reset, openImportModal, openExportModal, showBoard, hideBoard} from '../actions'
import ImportModal from './import-modal'
import ExportModal from './export-modal'
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import IntroModal from './intro-modal'

const mapDispatchToProps = {
  openExportModal,
  openImportModal,
  reset,
  showBoard,
  hideBoard,
}

const mapStateToProps = (state) => ({
  view: state.view,
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
              <i className="fa fa-download" aria-hidden="true"/> Save
              / <i className="fa fa-upload" aria-hidden="true"/> Load
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.props.openExportModal}>
                <i className="fa fa-download" aria-hidden="true"/> Save Out
              </DropdownItem>
              <DropdownItem onClick={this.props.openImportModal}>
                <i className="fa fa-upload" aria-hidden="true"/> Load In
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <ImportModal/>
          <ExportModal/>
          <IntroModal/>
        </div>
        <div className="col-6">
          version 0.0.1-inflatable-dart-board
        </div>
        <div className="col-6 text-right">
          {
            this.props.view === 'focus'
              ? <button className="btn" onClick={this.props.hideBoard}>
              <i className="fa fa-indent" aria-hidden="true"/> Make a Plan
            </button>
              : <button className="btn" onClick={this.props.showBoard}>
              <i className="fa fa-align-left fa-rotate-90" aria-hidden="true"/> Get Focused
            </button>
          }
        </div>
      </div>
    )
  }
}
