import React from 'react'
import {connect} from 'react-redux'
import {toDoLane} from '../selectors/board'
import StatusIcon from './status-icon'
import ItemContext from './item-context'
import {setStatus} from '../actions'


const FocusChoice = connect(
  null,
  {
    setStatus
  }
)(({id, setStatus}) => (
  <div className="row">
    <div className="col-12">
      <ItemContext item={id}/>
    </div>
    <button className="btn" onClick={() => setStatus(id, 'inProgress')}>
      <StatusIcon status={'inProgress'}/> Mark as Main Focus
    </button>
  </div>
))

const mapStateToProps = state => ({
    toDo: toDoLane(state),
  }
)

@connect(mapStateToProps)
export default class ChooseFocus extends React.Component {

  render() {
    return (
      <div>
        <h2><StatusIcon status={'inProgress'}/> What would you like to Focus on?</h2>
        { this.props.toDo.map(x => (<FocusChoice key={x.id} id={x.id}/>)) }
      </div>
    )
  }
}
