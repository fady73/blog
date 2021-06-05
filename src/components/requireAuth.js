import React from "react";
import { Redirect, Route } from "react-router-dom";

export const REDIRECT_IF_GUEST = "redirect_if_guest";
export const REDIRECT_IF_AUTHENTICATED = "redirect_if_authenticated";

const RequireAuth = ({
  component: Component,
  redirectCheck,
  authProps,
  ...rest
}) => {
  if (redirectCheck === REDIRECT_IF_AUTHENTICATED) {
    return (
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("isAuthenticated") === "false" ||
          localStorage.getItem("isAuthenticated") !==
            authProps.auth.isAuthenticated.toString() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  } else if (
    redirectCheck === REDIRECT_IF_GUEST &&
    localStorage.getItem("isAuthenticated") === "true"
  ) {
    return (
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("isAuthenticated") === "true" &&
          localStorage.getItem("isAuthenticated") ===
            authProps.auth.isAuthenticated.toString() && (
            <Component {...props} />
          )
        }
      />
    );
  } else if (
    redirectCheck === REDIRECT_IF_GUEST &&
    localStorage.getItem("isAuthenticated") === "false"
  ) {
    return (
      <Redirect
        to={{
          pathname: "/users/login",
        }}
      />
    );
  }
};

export default RequireAuth;
