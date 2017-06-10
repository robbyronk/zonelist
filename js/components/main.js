import React from "react";
import Header from './header'
import {connect} from 'react-redux'
import ZoneList from './list'
import FocusList from './focus'

@connect(state => ({view: state.view}))
export default class MainLayout extends React.Component {
  render() {
    return (
      <div className="container">
        <Header/>
        {this.props.view === 'focus' ? <FocusList/> : <ZoneList/>}
      </div>
    );
  }
}
