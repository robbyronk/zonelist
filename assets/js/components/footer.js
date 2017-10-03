import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {showFocus, showOutline} from '../actions'

const Footer = ({view, showFocus, showOutline}) => {
  const iconClassName = classnames(
    'fa', 'fa-toggle-on', 'fa-lg',
    {
      'fa-rotate-180': view === 'outline',
      'text-primary': view === 'outline',
      'text-success': view === 'focus',
    }
  );
  const style = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
  }
  return (
    <footer style={style} className="footer bg-faded d-flex flex-row justify-content-center">
      <div onClick={view === 'outline' ? showFocus : showOutline}>
        Outline Mode <i className={iconClassName}/> Focus Mode
      </div>
    </footer>
  )
}

export default connect(state => ({view: state.view}), {showOutline, showFocus})(Footer)
