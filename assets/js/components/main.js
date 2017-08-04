import React from "react";
import Header from './header'
import {connect} from 'react-redux'
import ZoneList from './list'
import FocusList from './focus'
import Outline from './outline'
import Focus from './focus/index'
import Footer from './footer'
import {isLoading} from "../selectors/isLoading";

@connect(state => ({isLoading: isLoading(state),view: state.view}))
export default class MainLayout extends React.Component {
  _component = (view) => {
    switch (view) {
      case 'old-outline':
        return (<ZoneList/>)
      case 'old-focus':
        return (<FocusList/>)
      case 'focus':
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
      <div className="container">
        <Header/>
        {this._component(this.props.view)}
        <Footer/>
      </div>
    );
  }
}
