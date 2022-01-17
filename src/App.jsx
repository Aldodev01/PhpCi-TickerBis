import "./App.less";
import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./pages/Auth/Signup/Signup";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import HomeSeller from "./pages/Seller/home/HomeSeller";
import Order from "./pages/Seller/order/Order";
import Public from "./routes/Public";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("authorization"));
  }, []);
  return (
    <>
      {token ? <Sidebar /> : <Public />}
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
