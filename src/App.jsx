import "./App.less";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Public from "./routes/Public";
import CostumerService from "./components/CostumerService/CostumerService";
import { UserAgenCheck } from "./utils/device/Device";
import PublicMobile from "./routes/PublicMobileRoutes";
import M_Menubar from "./components/mobile/MenuBar/Menubar";
import ConnectionRoutes from "./routes/Connection";
function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(sessionStorage.getItem("authorization"));
  }, []);

  function Dekstop() {
    if (token) {
      return (
        <>
          <CostumerService />
          <Sidebar />
        </>
      );
    } else {
      return <Public />;
    }

    return;
  }

  function Mobile() {
    if (token) {
      return <M_Menubar />;
    } else {
      return <PublicMobile />;
    }

    return;
  }

  function UserAgent() {
    if (UserAgenCheck) {
      return <Mobile />;
    } else {
      return <Dekstop />;
    }

    return;
  }

  function WithoutDashboard() {
    const pathname = window.location.pathname;
    let checkIt = pathname.includes("shared-label");

    if (checkIt == true) {
      return <ConnectionRoutes />;
    } else {
      return <UserAgent />;
    }

    return;
  }

  return (
    <>
      {/* <UserAgent /> */}
      <WithoutDashboard />
      {/* <Dekstop /> */}
      {/* {token ? (
        <>
          <CostumerService />
          <Sidebar />
        </>
      ) : (
        <Public />
      )} */}
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
