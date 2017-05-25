import React, {PropTypes} from "react";
import {Provider} from "react-redux";
import MainLayout from '../layouts/main'
import ZoneList from '../views/zones/list'

const propTypes = {
  store: PropTypes.object.isRequired
};

const Root = ({store}) => {

  return (
    <Provider store={store}>
      <MainLayout>
        <ZoneList/>
      </MainLayout>
    </Provider>
  );
};

Root.propTypes = propTypes;
export default Root;
