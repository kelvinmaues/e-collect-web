import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// pages
import Home from "./pages/Home";
import CreateStation from "./pages/CreateStation";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route component={CreateStation} path="/create-station" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
