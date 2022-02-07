import React from "react";
import { Menu, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { GiEgyptianProfile } from "react-icons/gi";
import { FaCcMastercard } from "react-icons/fa";
import { ImQuill } from "react-icons/im";
import { SiDatabricks } from "react-icons/si";
import { CgUserlane } from "react-icons/cg";
import Profile from "./profile/Profile";
import Rekening from "./rekening/Rekening";
import Address from "./address/Address";
import DataCostumer from "./data/DataCostumer";
import User from "./user/User";
import SettingDefault from "./SettingDefault";
const Settings = () => {
  const { SubMenu } = Menu;
  const { jenis } = useParams();
  const navigate = useNavigate();
  const ItemMenu = [
    {
      key: "profile",
      title: "Profile",
      icon: <GiEgyptianProfile style={{ fontSize: "1.5rem", marginTop: 15 }} />,
      link: "profile",
    },
    {
      key: "rekening",
      title: "Rekening",
      icon: <FaCcMastercard style={{ fontSize: "1.5rem", marginTop: 15 }} />,
      link: "rekening",
    },
    {
      key: "alamatPickup",
      title: "Alamat Pickup",
      icon: <ImQuill style={{ fontSize: "1.5rem", marginTop: 15 }} />,
      link: "alamat-pickup",
    },
    {
      key: "dataCostumer",
      title: "Data Costumer",
      icon: <SiDatabricks style={{ fontSize: "1.5rem", marginTop: 15 }} />,
      link: "data-costumer",
    },
    {
      key: "user",
      title: "User",
      icon: <CgUserlane style={{ fontSize: "1.5rem", marginTop: 15 }} />,
      link: "user",
    },
  ];

  const ResultJenis = () => {
    switch (jenis) {
      case ":profile":
        return <Profile />;
      case ":rekening":
        return <Rekening />;
      case ":alamat-pickup":
        return <Address />;
      case ":data-costumer":
        return <DataCostumer />;
      case ":user":
        return <User />;
      default:
        return <SettingDefault />;
    }
  };

  return (
    <div>
      <Menu
        mode="horizontal"
        style={{
          width: "100%",
        }}
      >
        {ItemMenu.map((item) => {
          return (
            <Menu.Item
              style={{
                fontSize: "1.1rem",
              }}
              key={item.key}
              onClick={() => {
                navigate(`/dashboard/setting/:${item.link}`);
              }}
            >
              <Space>
                {item.icon} <span>{item.title}</span>
              </Space>
            </Menu.Item>
          );
        })}
      </Menu>
      <br />
      <br />

      <ResultJenis />
    </div>
  );
};

export default Settings;
