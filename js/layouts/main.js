import React from "react";
import Header from './header'

export default class MainLayout extends React.Component {
  render() {
    return (
      <div className="container">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}
