import React from "react";
import {connect} from "react-redux";
import {reset} from '../actions'

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset())
});

@connect(null, mapDispatchToProps)
class Header extends React.Component {
  render() {
    return (
      <header className="main-header">
        <nav>
          <ul>
            <li>
              <button onClick={this.props.reset}>Reset</button>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
