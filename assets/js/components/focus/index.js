import React from 'react'
import {connect} from 'react-redux'
import MainFocus from './main-focus'
import FocusChooser from './focus-chooser'
import {inProgressTasks} from '../../selectors/board'

function Focus({inProgress}) {
  if(inProgress.length) {
    return (<MainFocus/>)
  }
  return ( <FocusChooser/> )
}

const mapStateToProps = state => ({
    inProgress: inProgressTasks(state),
  }
)

export default connect(mapStateToProps)(Focus)
