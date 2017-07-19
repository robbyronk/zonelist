import React from 'react'
import {connect} from 'react-redux'
import MainFocus from './main-focus'
import FocusChooser from './focus-chooser'
import {inProgressLane} from '../../selectors/board'

function Focus({inProgress}) {
  if(inProgress.length) {
    return (<MainFocus/>)
  }
  return ( <FocusChooser/> )
}

const mapStateToProps = state => ({
    inProgress: inProgressLane(state),
  }
)

export default connect(mapStateToProps)(Focus)
