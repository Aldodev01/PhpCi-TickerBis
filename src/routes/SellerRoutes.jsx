import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const HomeSeller = lazy(() => import("../pages/Seller/home/HomeSeller"));
const Order = lazy(() => import("../pages/Seller/order/Order"));

const SellerRoutes = () => {
  const routeser = [
    {
      key: 1,
      exact: true,
      path: "/dashboard/seller/home",
      name: "Form Add Product",
      component: <HomeSeller />,
    },
    {
      key: 2,
      exact: true,
      path: "/dashboard/seller/order",
      name: "Form Add Product",
      component: <Order />,
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

export default SellerRoutes;
