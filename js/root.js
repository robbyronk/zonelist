import React, {PropTypes} from "react";
import {Provider} from "react-redux";
import MainLayout from './components/main'

const propTypes = {
  store: PropTypes.object.isRequired
};

const Root = ({store}) => {

  return (
    <Provider store={store}>
      <MainLayout/>
    </Provider>
  );
};

Root.propTypes = propTypes;
export default Root;
