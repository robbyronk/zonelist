import React from 'react'
import {connect} from 'react-redux'
import {toDoTasks} from '../selectors/board'
import StatusIcon from './status-icon'
import ItemContext from './item-context'
import {setStatus} from '../actions'

@connect(null, {setStatus})
class FocusChoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }
  }

  render() {
    const {id, setStatus} = this.props
    return (
      <div className="row focus-choice"
           onMouseEnter={() => this.setState({hover: true})}
           onMouseLeave={() => this.setState({hover: false})}>
        <div className="col-2">
          {
            this.state.hover
              ? (
              <button className="btn btn-block" onClick={() => setStatus(id, 'inProgress')}>
                <StatusIcon status={'inProgress'}/><br/> Mark as <br/> Main Focus
              </button>
            )
              : null
          }
        </div>
        <div className="col-10">
          <ItemContext item={id}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    toDo: toDoTasks(state),
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
