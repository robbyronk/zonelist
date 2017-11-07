import React from "react";
import {connect} from 'react-redux'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Header from './header'
import Outline from './outline'
import Focus from './focus/index'
import Footer from './footer'
import {isLoading} from "../selectors/isLoading";

// todo use react router

class MainLayout extends React.Component {
  _component = (view) => {
    if (view === 'focus') {
      return (<Focus/>)
    }
    return (<Outline/>)
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center my-5">
          <i className="fa fa-spinner fa-spin fa-5x"/>
        </div>
      )
    }
    return (
      <div>
        <Header/>
        <div style={{height: 'calc(100vh - 114px)', overflow: 'auto'}}>
          <div style={{marginBottom: '50px'}}>
            {this._component(this.props.view)}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapState = state => ({isLoading: isLoading(state), view: state.view})

const connected = connect(mapState)(MainLayout)

const contexted = DragDropContext(HTML5Backend)(connected)

export default contexted
