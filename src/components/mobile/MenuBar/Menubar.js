import React, { FC, useContext, useState } from "react";
import { ActionSheet, NavBar, TabBar } from "antd-mobile";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  MemoryRouter as Router,
  useNavigate,
} from "react-router-dom";
import "./Menubar.less";
import { MenuMobile } from "../../../context/MenuMobileProvider";
import { UserContext } from "../../../context/UserContextProvider";
import MobileRoutes from "../../../routes/MobileRoutes";
const M_Menubar = () => {
  const [menuMobile, SetMenuMobile] = useContext(MenuMobile);
  const [user, setUser] = useContext(UserContext);
  const [visible, setVisible] = useState({
    visible: false,
    value: 0,
  });

  const navigate = useNavigate();

  const setRouteActive = (value) => {
    console.log("asdasd", menuMobile[value - 1]?.submenu);
    if (menuMobile[value - 1]?.submenu) {
      setVisible({ ...visible, visible: true, value: value - 1 });
    } else {
      navigate(menuMobile[value - 1]?.link);
    }
  };

  return (
    <>
      <div className="flex-start w100">
        <p>asdas</p>
        <MobileRoutes />
        <TabBar
          className="m-menubar"
          onChange={(value) => setRouteActive(value)}
        >
          {menuMobile.map((item) => (
            <TabBar.Item
              key={item.id}
              icon={item.icon}
              title={item.text}
              badge={item.badge}
            />
          ))}
        </TabBar>
        <ActionSheet
          visible={visible.visible}
          extra={menuMobile[visible.value]?.text}
          actions={menuMobile[visible.value]?.submenu}
          onClose={() =>
            setVisible({
              ...visible,
              visible: false,
            })
          }
        />
      </div>
    </>
  );
};

export default M_Menubar;
