import React from "react";
import Header from './header'
import {connect} from 'react-redux'
import ZoneBoard from '../views/zones/board'
import ZoneList from '../views/zones/list'

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
