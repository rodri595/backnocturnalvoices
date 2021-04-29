import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
//Utilities
import NRoute from "./components/utilities/NormalRoute";
import LiveMap from "./pages/livemap/LiveMap";
import Archive from "./pages/archive/Archive";

const App = () => {
  return (
    <Router>
      <Switch>
        <NRoute path="/" component={LiveMap} exact />
        <NRoute path="/archive" component={Archive} exact />
      </Switch>
    </Router>
  );
};

export default App;
