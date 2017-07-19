import React, {PropTypes} from "react";
import {Provider} from "react-redux";
import MainLayout from './components/main'

const Root = ({store}) => {

  return (
    <Provider store={store}>
      <MainLayout/>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root;
