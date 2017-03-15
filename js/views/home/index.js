import React from "react";
import {connect} from "react-redux";
import {setDocumentTitle} from "../../utils";

class HomeIndexView extends React.Component {
  componentDidMount() {
    setDocumentTitle('Home');
  }

  render() {
    return (
      <div className="view-container index">
        <p>Home page.</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  state
);

export default connect(mapStateToProps)(HomeIndexView);
