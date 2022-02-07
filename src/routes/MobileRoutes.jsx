import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("../pages/Mobile/Home/Home"));
const NotFound = lazy(() => import("../pages//Error/404NotFound"));

const MobileRoutes = () => {
  const routeser = [
    {
      key: 1,
      exact: true,
      path: "/",
      name: "Dashboard",
      component: <Home />,
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
        <Route path="/404" element={<NotFound />} />
        {/* <Route path="*" exact={true} element={<NotFound />} /> */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      {/* <Suspense fallback={null}>
        <Routes>
          <Route path="/signUp" element={<Sidebar />} />
          <Route path="/dashboard" element={<HomeSeller />} />
          <Route path="/" element={<Order />} />
        </Routes>
      </Suspense> */}
    </Suspense>
  );
};

export default MobileRoutes;
