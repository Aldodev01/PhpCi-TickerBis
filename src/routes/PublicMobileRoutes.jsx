import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Signin = lazy(() => import("../pages/Mobile/Auth/SignIn"));
const Signup = lazy(() => import("../pages/Mobile/Auth/SignIn"));

const PublicMobile = () => {
  const routeser = [
    {
      key: 1,
      exact: true,
      path: "/signup",
      name: "Sign Up",
      component: <Signup />,
    },
    {
      key: 2,
      exact: true,
      path: "/",
      name: "Sign In",
      component: <Signin />,
    },
  ];
  return (
    <Suspense fallback={null} key={1}>
      <Routes>
        {routeser.map((e) => {
          return (
            <Route
              key={e.key}
              path={e.path}
              exact={e.exact}
              element={e.component}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default PublicMobile;
