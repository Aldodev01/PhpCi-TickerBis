import {
  FcStatistics,
  FcElectronics,
  FcOnlineSupport,
  FcPaid,
  FcMms,
  FcSettings,
  FcDeployment,
} from "react-icons/fc";
import { Popconfirm, Popover, Space, Menu } from "antd";
import { BiCategory } from "react-icons/bi";
import React, { createContext, useState } from "react";
import { AiOutlineDropbox, AiFillSlackCircle } from "react-icons/ai";
import { ImTruck } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { SiWebmoney } from "react-icons/si";
import { AiFillCreditCard } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { VscTools } from "react-icons/vsc";
export const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [menu, setMenu] = useState([
    {
      id: 1,
      title: "Dashboard",
      icon: (
        <AiFillSlackCircle
          style={{ fontSize: 35 }}
          onClick={() => {
            navigate("/");
          }}
        />
      ),
      link: "/",
    },
    {
      id: 2,
      title: "Pengiriman",
      icon: (
        <ImTruck
          style={{ fontSize: 30 }}
          onClick={() => {
            navigate("/dashboard/pengiriman");
          }}
        />
      ),
      link: "/dashboard/pengiriman",
      submenu: [
        {
          id: 99,
          title: "Pengiriman Baru",
          link: "/dashboard/pengiriman/newOrder",
        },
        {
          id: 98,
          title: "Order History",
          link: "/dashboard/pengiriman/history",
        },
        {
          id: 97,
          title: "Monitoring",
          link: "/dashboard/pengiriman/monitoring",
        },
      ],
    },
    {
      id: 3,
      title: "Finance",
      icon: (
        <SiWebmoney
          style={{ fontSize: 30 }}
          onClick={() => {
            navigate("/dashboard/finance");
          }}
        />
      ),
      link: "/dashboard/finance",
      submenu: [
        {
          id: 96,
          title: "Settlement",
          link: "/dashboard/finance/settlement",
        },
        {
          id: 95,
          title: "Invoice",
          link: "/dashboard/finance/invoice",
        },
      ],
    },
    {
      id: 4,
      title: "Tiket",
      icon: (
        <AiFillCreditCard
          style={{ fontSize: 30 }}
          onClick={() => {
            navigate("/dashboard/tiket");
          }}
        />
      ),
      link: "/dashboard/tiket",
    },
    {
      id: 5,
      title: "Setting",
      icon: (
        <FaUsersCog
          style={{ fontSize: 30 }}
          onClick={() => {
            navigate("/dashboard/setting");
          }}
        />
      ),
      link: "/dashboard/setting",
    },
    {
      id: 6,
      title: "Tools",
      icon: (
        <VscTools
          style={{ fontSize: 30 }}
          onClick={() => {
            navigate("/dashboard/tools");
          }}
        />
      ),
      link: "/dashboard/tools",
      submenu: [
        {
          id: 94,
          title: "Cek Tarif",
          link: "/dashboard/tools/cektarif",
        },
        {
          id: 93,
          title: "Kode Pos",
          link: "/dashboard/tools/kodepos",
        },
      ],
    },
  ]);

  return (
    <MenuContext.Provider value={[menu, setMenu]}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
