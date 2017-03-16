import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

class Header extends React.Component {
  render() {
    return (
      <header className="main-header">
        <nav>
          <ul>
            <li>
              Home
            </li>
          </ul>
        </nav>
        <Link to='/'>
          <span className='logo'/>
        </Link>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  header: state.header,
});

export default connect(mapStateToProps)(Header);
