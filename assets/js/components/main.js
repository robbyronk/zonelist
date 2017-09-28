import React from "react";
import Header from './header'
import {connect} from 'react-redux'
import Outline from './outline'
import Focus from './focus/index'
import Footer from './footer'
import {isLoading} from "../selectors/isLoading";

// todo use react router

@connect(state => ({isLoading: isLoading(state),view: state.view}))
export default class MainLayout extends React.Component {
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
      <div style={{height: '100vh'}} className="d-flex flex-column">
        <Header/>
        <div style={{flex: '1', overflow: 'auto'}}>
          {this._component(this.props.view)}
        </div>
        <Footer/>
      </div>
    );
  }
}
