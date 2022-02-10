import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const M_Home = lazy(() => import("../pages/Mobile/Client/Home/M_Home"));
const M_CekTarif = lazy(() =>
  import("../pages/Mobile/Client/Tools/M_CekTarif")
);

const NotFound = lazy(() => import("../pages//Error/404NotFound"));

const MobileRoutes = () => {
  const routeser = [
    {
      key: 1,
      exact: true,
      path: "/",
      name: "Dashboard",
      component: <M_Home />,
    },
    {
      key: 5,
      exact: true,
      path: "/mobile/tools/cektarif",
      name: "Cek Tarif",
      component: <M_CekTarif />,
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
