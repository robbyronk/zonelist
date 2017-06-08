import React from 'react'
import {connect} from 'react-redux'
import {head, tail} from 'lodash'
import {makeGetContext} from '../selectors/items'

const makeMapStateToProps = () => {
  const getContext = makeGetContext()
  const mapStateToProps = (state, ownProps) => ({
      context: getContext(state, ownProps)
    }
  )
return mapStateToProps
}

@connect(makeMapStateToProps)
export default class ItemContext extends React.Component {
  renderContext(context) {
    const item = head(context)
    if(context.length === 1) {
      return (
        <div className="main-focus-tree">
          <h4>{item.title}</h4>
        </div>
      )
    }

    return (
      <div className="main-focus-tree">
        <span>{item.title}</span>
        {this.renderContext(tail(context))}
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
