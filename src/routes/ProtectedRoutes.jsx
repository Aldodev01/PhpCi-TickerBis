import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
/**
 * Pages Group Dashboard
 * ==========================================================
 * @description:
 */
const HomeSeller = lazy(() =>
  import("../pages/Container/Target/home/HomeSeller")
);

/**
 * Pages Group Order
 * ==========================================================
 * @description:
 */
const NewOrder = lazy(() =>
  import("../pages/Container/Target/Contract/order/first/NewOrder")
);
const SecondOrderCod = lazy(() =>
  import("../pages/Container/Target/Contract/order/second/SecondOrderCod")
);
const SecondOrderNonCod = lazy(() =>
  import("../pages/Container/Target/Contract/order/second/SecondOrderNonCod")
);
const ThridOrder = lazy(() =>
  import("../pages/Container/Target/Contract/order/third/ThirdOrder")
);
/**
 * Pages Group OrderHistory
 * ==========================================================
 * @description:
 */
const OrderHistory = lazy(() =>
  import("../pages/Container/Target/Contract/orderHistory/OrderHistory")
);
const DetailHistory = lazy(() =>
  import("../pages/Container/Target/Contract/orderHistory/DetailHistory")
);
const TrackingHistory = lazy(() =>
  import("../pages/Container/Target/Contract/orderHistory/TrackingHistory")
);

const Sidebar = lazy(() => import("../components/Sidebar/Sidebar"));
const NotFound = lazy(() => import("../pages/Error/404NotFound"));

const Monitoring = lazy(() =>
  import("../pages/Container/Target/Contract/monitoring/Monitoring")
);
const CekTarif = lazy(() => import("../pages/Container/Target/tools/CekTarif"));
const KodePos = lazy(() => import("../pages/Container/Target/tools/KodePos"));
const Settlement = lazy(() =>
  import("../pages/Container/Target/finance/settlement/Settlement")
);
const DetailSettlement = lazy(() =>
  import("../pages/Container/Target/finance/settlement/DetailSettlement")
);
const Invoice = lazy(() =>
  import("../pages/Container/Target/finance/invoice/Invoice")
);
const Settings = lazy(() =>
  import("../pages/Container/Target/setting/Settings")
);

const ProtectedRoutes = () => {
  const routeser = [
    {
      key: 1,
      exact: true,
      path: "/",
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
      path: "/dashboard/pengiriman/secondOrder/COD",
      name: "Second order COD",
      component: <SecondOrderCod />,
    },
    {
      key: 5,
      exact: true,
      path: "/dashboard/pengiriman/secondOrder/NONCOD",
      name: "Second order NON COD",
      component: <SecondOrderNonCod />,
    },
    {
      key: 6,
      exact: true,
      path: "/dashboard/pengiriman/thirdOrder",
      name: "Third Order",
      component: <ThridOrder />,
    },
    {
      key: 7,
      exact: true,
      path: "/dashboard/pengiriman/history",
      name: "Order History",
      component: <OrderHistory />,
    },
    {
      key: 8,
      exact: true,
      path: "/dashboard/pengiriman/detail-history/:id",
      name: "Detail History",
      component: <DetailHistory />,
    },
    {
      key: 9,
      exact: true,
      path: "/dashboard/pengiriman/history/tracking/:expedisi/:awb",
      name: "Order History",
      component: <TrackingHistory />,
    },
    {
      key: 19,
      exact: true,
      path: "/dashboard/pengiriman/monitoring",
      name: " Monitoring",
      component: <Monitoring />,
    },
    {
      key: 20,
      exact: true,
      path: "/dashboard/finance/settlement",
      name: "Finance Settlement",
      component: <Settlement />,
    },
    {
      key: 21,
      exact: true,
      path: "/dashboard/finance/detail-settlement/:id",
      name: "Finance Settlement",
      component: <DetailSettlement />,
    },
    {
      key: 22,
      exact: true,
      path: "/dashboard/finance/invoice",
      name: "Finance Invoice",
      component: <Invoice />,
    },
    {
      key: 40,
      exact: true,
      path: "/dashboard/setting",
      name: " Your Setting",
      component: <Settings />,
    },
    {
      key: 41,
      exact: true,
      path: "/dashboard/setting/:jenis",
      name: " Your Setting",
      component: <Settings />,
    },
    {
      key: 59,
      exact: true,
      path: "/dashboard/tools/kodepos",
      name: "Kode Pos",
      component: <KodePos />,
    },
    {
      key: 60,
      exact: true,
      path: "/dashboard/tools/cektarif",
      name: "Cek Tarif",
      component: <CekTarif />,
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

export default ProtectedRoutes;
