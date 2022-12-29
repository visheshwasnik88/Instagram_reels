import React, { Component, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  //console.log(Component) //feed
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        //props=>location,history
        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
}

export default PrivateRoute;
