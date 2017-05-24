import {Route} from "react-router";
import React from "react";
import MainLayout from "./layouts/main";
import ZoneList from "./views/zones/list";
import ZoneBoard from "./views/zones/board"

export default function configRoutes(store) {
  return (
    <Route path="/zonelist" component={MainLayout}>
      <Route path="/" component={ZoneList}/>
      <Route path="/board" component={ZoneBoard}/>
    </Route>
  );
}
