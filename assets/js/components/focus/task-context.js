import React from 'react'
import {connect} from 'react-redux'
import {head, tail} from 'lodash'
import {makeGetContext} from '../../selectors/items'

const makeMapStateToProps = () => {
  const getContext = makeGetContext()
  const mapStateToProps = (state, ownProps) => ({
      context: getContext(state, ownProps)
    }
  )
  return mapStateToProps
}

@connect(makeMapStateToProps)
export default class TaskContext extends React.Component {
  _renderContext(context) {
    if (context.length === 0) {
      return
    }
    const task = head(context)
    if(context.length === 1) {
      return (
        <div className="main-focus-tree">
          <span>{task.title}</span>
        </div>
      )
    }

    return (
      <div className="main-focus-tree">
        <span className="text-muted">{task.title}</span>
        {this._renderContext(tail(context))}
      </div>
    )
  }

  renderContext(context) {
    // renders the top task with no left margin
    const task = head(context)
    return (
      <div>
        <span className="text-muted">{task.title}</span>
        {this._renderContext(tail(context))}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderContext(this.props.context)}
      </div>
    )
  }
}
