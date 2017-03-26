import React from "react";
import Header from './header'

export default class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}
