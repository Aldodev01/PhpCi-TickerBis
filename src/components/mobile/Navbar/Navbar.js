import { Avatar, Image, Space } from "antd";
import { NavBar, Toast } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";
import logoin from "../../../assets/lib/imezi-logo.svg";
import { FcPrevious } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";
import "./Navbar.less";

const Navbar = ({ children, closeOrBack = false, stateModal }) => {
  const navigate = useNavigate();
  const back = () => {
    Toast.show({
      content: "Kembali ke Page Sebelumnya",
      duration: 1000,
    });
    navigate(-1);
  };
  const close = () => {};

  return (
    <div className="m-navbar flex-between w100">
      <Space>
        {closeOrBack ? (
          <IoCloseSharp
            style={{ fontSize: 30, marginTop: 10, color: "#ed0678" }}
            onClick={close}
          />
        ) : (
          <FcPrevious style={{ fontSize: 25, marginTop: 10 }} onClick={back} />
        )}

        <img src={logoin} alt="logo" style={{ width: 85 }} />
      </Space>
      <Space>
        {children}
        <Avatar
          size={"large"}
          src={
            <img
              src={"https://joeschmoe.io/api/v1/random"}
              style={{ width: 32, marginTop: 10 }}
            />
          }
        />
      </Space>
    </div>
  );
};

export default Navbar;
