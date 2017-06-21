import React from "react";
import Header from './header'
import {connect} from 'react-redux'
import ZoneList from './list'
import FocusList from './focus'
import Outline from './outline'
import Focus from './focus/index'

@connect(state => ({view: state.view}))
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
    return (
      <div className="container">
        <Header/>
        {this._component(this.props.view)}
      </div>
    );
  }
}
