import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomeSeller from "../pages/Seller/home/HomeSeller";
const Sidebar = lazy(() => import("../components/Sidebar/Sidebar"));
const NotFound = lazy(() => import("../pages/Error/404NotFound"));
const NewOrder = lazy(() => import("../pages/Seller/order/first/NewOrder"));
const SecondOrderCod = lazy(() =>
  import("../pages/Seller/order/second/SecondOrderCod")
);
const Monitoring = lazy(() => import("../pages/Seller/monitoring/Monitoring"));
const CekTarif = lazy(() => import("../pages/Seller/tools/CekTarif"));
const KodePos = lazy(() => import("../pages/Seller/tools/KodePos"));

const ProtectedRoutes = () => {
  const routeser = [
    {
      key: 1,
      exact: true,
      path: "/dashboard/home",
      name: "Dashboard",
      component: <HomeSeller />,
    },
    {
      key: 2,
      exact: true,
      path: "/dashboard",
      name: "Dashboard",
      component: <Sidebar />,
    },
    {
      key: 3,
      exact: true,
      path: "/dashboard/pengiriman/newOrder",
      name: "New order",
      component: <NewOrder />,
    },
    {
      key: 4,
      exact: true,
      path: "/dashboard/pengiriman/secondOrder",
      name: "Second order",
      component: <SecondOrderCod />,
    },
    {
      key: 10,
      exact: true,
      path: "/dashboard/pengiriman/monitoring",
      name: "Second order",
      component: <Monitoring />,
    },
    {
      key: 50,
      exact: true,
      path: "/dashboard/tools/cektarif",
      name: "Cek Tarif",
      component: <CekTarif />,
    },
    {
      key: 49,
      exact: true,
      path: "/dashboard/tools/kodepos",
      name: "Kode Pos",
      component: <KodePos />,
    },
    {
      key: 99,
      exact: true,
      path: "/",
      name: "404 NotFound",
      component: <NotFound />,
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

export default ProtectedRoutes;
