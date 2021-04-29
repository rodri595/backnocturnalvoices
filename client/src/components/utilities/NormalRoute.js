import React from "react";
import { Route } from "react-router-dom";

const NormalRoute = ({ component: MyCustomComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        return <MyCustomComponent {...props} />;
      }}
    />
  );
};

export default NormalRoute;
