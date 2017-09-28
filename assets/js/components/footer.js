import React from 'react'
import {connect} from 'react-redux'
import {showFocus, showOutline} from '../actions'

const Footer = ({view, showFocus, showOutline}) => {
  const outlineMode = (
    <span onClick={showFocus}> Outline Mode <i className="fa fa-toggle-on fa-lg fa-rotate-180 text-primary"/> Focus Mode </span> )
  const focusMode = (
    <span onClick={showOutline}> Outline Mode <i className="fa fa-toggle-on fa-lg text-success"/> Focus Mode </span> )
  return (
    <footer className="footer bg-faded">
      <div className="row justify-content-center">
        <div className="col-md-auto">
          {view === 'outline' ? outlineMode : null}
          {view === 'focus' ? focusMode : null}
        </div>
      </div>
    </footer>
  )
}

export default connect(state => ({view: state.view}), {showOutline, showFocus})(Footer)
