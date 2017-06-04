import React from "react";
import Header from './header'
import {connect} from 'react-redux'
import ZoneBoard from './board'
import ZoneList from './list'

@connect(state => ({board: state.is.board}))
export default class MainLayout extends React.Component {
  render() {
    return (
      <div className="container">
        <Header/>
        {this.props.board ? <ZoneBoard/> : <ZoneList/>}
      </div>
    );
  }
}
