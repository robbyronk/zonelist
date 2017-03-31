import React from 'react'
import {connect} from 'react-redux'
import {reset,openImportModal} from '../actions'
import ImportModal from '../components/import-modal'

const mapDispatchToProps = {
  openImportModal,
  reset,
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
          <button className="btn btn-block">Export</button>
        </div>
      </div>
    )
  }
}
