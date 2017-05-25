import React from 'react'
import {connect} from 'react-redux'
import {reset, openImportModal, openExportModal, showBoard, hideBoard} from '../actions'
import ImportModal from '../components/import-modal'
import ExportModal from '../components/export-modal'

const mapDispatchToProps = {
  openExportModal,
  openImportModal,
  reset,
  showBoard,
  hideBoard,
}

@connect(null, mapDispatchToProps)
export default class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-3">
          <h1>ZoneList</h1>
        </div>
        <div className="col-3">
          <button className="btn btn-block btn-danger" onClick={this.props.reset}>Reset</button>
        </div>
        <div className="col-3">
          <button className="btn btn-block" onClick={this.props.openImportModal}>Import</button>
          <ImportModal/>
        </div>
        <div className="col-3">
          <button className="btn btn-block" onClick={this.props.openExportModal}>Export</button>
          <ExportModal/>
        </div>
        <div className="col-6">
          version 0.0.0-submarine-screendoor
        </div>
        <div className="col-3">
          <button className="btn btn-block" onClick={this.props.hideBoard}>Show List</button>
        </div>
        <div className="col-3">
          <button className="btn btn-block" onClick={this.props.showBoard}>Show Board</button>
        </div>
      </div>
    )
  }
}
