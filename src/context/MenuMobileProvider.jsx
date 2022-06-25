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
export const MenuMobile = createContext();

const MenuMobileProvider = ({ children }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState({
    visible: false,
    value: 0,
  });

  const [menuMobile, setMenuMobile] = useState([
    {
      id: 1,
      text: "Dashboard",
      icon: (
        <AiFillSlackCircle
          style={{ fontSize: 20 }}
          // onClick={() => {
          //   navigate("/");
          // }}
        />
      ),
      link: "/",
    },
    {
      id: 2,
      text: "Pengiriman",
      icon: (
        <ImTruck
          style={{ fontSize: 20 }}
          // onClick={() => {
          //   navigate("/mobile/pengiriman");
          // }}
        />
      ),
      link: "/mobile/pengiriman",
      submenu: [
        {
          id: 99,
          text: "Pengiriman Baru",
          link: "/mobile/pengiriman/newOrder",
          disabled: false,
          onClick: async () => {
            navigate("/mobile/pengiriman/newOrder");
          },
        },
        {
          id: 98,
          text: "Order History",
          link: "/mobile/pengiriman/history",
          disabled: false,
          onClick: async () => {
            navigate("/mobile/pengiriman/history");
          },
        },
        {
          id: 97,
          text: "Monitoring",
          link: "/mobile/pengiriman/monitoring",
          disabled: false,
          onClick: async () => {
            navigate("/mobile/pengiriman/monitoring");
          },
        },
      ],
    },
    {
      id: 3,
      text: "Finance",
      icon: (
        <SiWebmoney
          style={{ fontSize: 20 }}
          // onClick={() => {
          //   navigate("/mobile/finance");
          // }}
        />
      ),
      link: "/mobile/finance",
      submenu: [
        {
          id: 96,
          text: "Settlement",
          link: "/mobile/finance/settlement",
          disabled: false,
          onClick: async () => {
            navigate("/mobile/finance/settlement");
          },
        },
        {
          id: 95,
          text: "Invoice",
          link: "/mobile/finance/invoice",
          disabled: false,
          onClick: async () => {
            navigate("/mobile/finance/invoice");
          },
        },
      ],
    },
    // {
    //   id: 4,
    //   text: "Tiket",
    //   icon: (
    //     <AiFillCreditCard
    //       style={{ fontSize: 20 }}
    //       onClick={() => {
    //         navigate("/mobile/tiket");
    //       }}
    //     />
    //   ),
    //   link: "/mobile/tiket",
    // },
    {
      id: 4,
      text: "Setting",
      icon: (
        <FaUsersCog
          style={{ fontSize: 20 }}
          // onClick={() => {
          //   navigate("/mobile/setting");
          // }}
        />
      ),
      link: "/mobile/setting",
    },
    {
      id: 5,
      text: "Tools",
      icon: (
        <VscTools
          style={{ fontSize: 20 }}
          // onClick={() => {
          //   navigate("/mobile/tools");
          // }}
        />
      ),
      link: "/mobile/tools",
      submenu: [
        {
          id: 94,
          text: "Cek Tarif",
          link: "/mobile/tools/cektarif",
          disabled: false,
          onClick: () => {
            navigate("/mobile/tools/cektarif");
          },
        },
        {
          id: 93,
          text: "Kode Pos",
          link: "/mobile/tools/kodepos",
          disabled: false,
          onClick: () => {
            navigate("/mobile/tools/kodepos");
          },
        },
      ],
    },
  ]);

  return (
    <MenuMobile.Provider
      value={[menuMobile, setMenuMobile, visible, setVisible]}
    >
      {children}
    </MenuMobile.Provider>
  );
};

export default MenuMobileProvider;
