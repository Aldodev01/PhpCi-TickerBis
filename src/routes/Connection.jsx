import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const M_Home = lazy(() => import("../pages/Mobile/Client/Home/M_Home"));
const M_CekTarif = lazy(() =>
  import("../pages/Mobile/Client/Tools/M_CekTarif")
);

const NotFound = lazy(() => import("../pages//Error/404NotFound"));
const SharedLabel = lazy(() => import("../components/Connection/SharedLabel"));

const ConnectionRoutes = () => {
  const routeser = [
    {
      key: 1,
      exact: true,
      path: "/shared-label/:idUser/:awb",
      name: "Order History",
      component: <SharedLabel />,
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
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Suspense>
  );
};

export default ConnectionRoutes;
