import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const SignToken = lazy(() =>
  import("../pages/Container/Auth/SignToken/SignToken")
);
const Signin = lazy(() => import("../pages/Container/Auth/Signin/Signin"));
const Signup = lazy(() => import("../pages/Container/Auth/Signup/Signup"));

const Public = () => {
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
      path: "/1qazxsw23edcvfr45tgbnhy67ujmki89olp",
      name: "Sign Token",
      component: <SignToken />,
    },
    {
      key: 3,
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

export default Public;
