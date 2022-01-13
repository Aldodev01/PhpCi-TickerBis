import "./App.less";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./pages/Auth/Signup/Signup";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import HomeSeller from "./pages/Seller/home/HomeSeller";
import Order from "./pages/Seller/order/Order";

const SignIn = lazy(() => import("./pages/Auth/Signin/Signin"));
function App() {
  return (
    <>
      <Sidebar />
      {/* <ProtectedRoutes /> */}
      {/* <Suspense fallback={null}>
        <Routes>
          <Route path="/signUp" element={<Sidebar />} />
          <Route path="/dashboard" element={<HomeSeller />} />
          <Route path="/" element={<Order />} />
        </Routes>
      </Suspense> */}
    </>
  );
}

export default App;

// <Suspense fallback={null}>
//   <Routes>
//     <Route path="/signUp" element={<Sidebar />} />
//     <Route path="/dashboard" element={<Dashboard />} />
//     <Route path="/" element={<SignIn />} />
//   </Routes>
// </Suspense>
