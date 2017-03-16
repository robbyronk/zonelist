import {Route} from "react-router";
import React from "react";
import MainLayout from "../layouts/main";
import ZoneList from "../views/zones/list";

export default function configRoutes(store) {
  return (
    <Route component={MainLayout}>
      <Route path="/" component={ZoneList}>
      </Route>
    </Route>
  );
}
