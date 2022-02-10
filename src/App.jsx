import "./App.less";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Public from "./routes/Public";
import CostumerService from "./components/CostumerService/CostumerService";
import { UserContext } from "./context/UserContextProvider";
import { UserAgenCheck } from "./utils/device/Device";
import { UserActivity } from "./utils/Activity/UserActive";
import PublicMobile from "./routes/PublicMobileRoutes";
import M_Menubar from "./components/mobile/MenuBar/Menubar";
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

  return (
    <>
      {UserAgenCheck ? <Mobile /> : <Dekstop />}
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
