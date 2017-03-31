import React from 'react'
import {connect} from 'react-redux'
import {reset} from '../actions'

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset())
})

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
          <button className="btn btn-block">Import</button>
        </div>
        <div className="col-3">
          <button className="btn btn-block">Export</button>
        </div>
      </div>
    )
  }
}
