import React from "react";
import Header from './header'
import {connect} from 'react-redux'
import ZoneBoard from './board'
import ZoneList from './list'

@connect(state => ({view: state.view}))
export default class MainLayout extends React.Component {
  render() {
    return (
      <div className="container">
        <Header/>
        {this.props.view === 'focus' ? <ZoneBoard/> : <ZoneList/>}
      </div>
    );
  }
}
