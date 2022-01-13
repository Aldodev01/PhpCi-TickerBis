import React, { useContext, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Space,
  Input,
  Avatar,
  Table,
  Tag,
  Button,
  Image,
} from "antd";
import Lottie from "react-lottie";
import "./Sidebar.less";
import logoin from "../../assets/lib/imezi-logo.svg";
import { MdNotificationsActive } from "react-icons/md";
import ProtectedRoutes from "../../routes/ProtectedRoutes";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../context/MenuContextProvider";
import { IoLogOutSharp } from "react-icons/io5";

const Sidebar = () => {
  const [menu, SetMenu] = useContext(MenuContext);
  const navigate = useNavigate();

  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="sidebar">
      <Sider
        // theme="light"
        className="sidebar_sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        onClick={onCollapse}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "20px 0px",
            alignItems: "center",
          }}
        >
          <Image
            src="https://cs3.jne.co.id/assets/images/logo_jne_api_white.png"
            preview={false}
            style={{
              width: "100%",
              height: "100%",
              maxHeight: 60,
              padding: 10,
            }}
          />
          <div className="sidebar-wrapper">
            <Menu className="sidebar_menu">
              {menu.map((e) => (
                <SubMenu
                  key={e.id}
                  title={e.title}
                  icon={e.icon}
                  className="sidebar-submenu"
                >
                  {e.submenu && (
                    <Menu.ItemGroup key={e.id} title={e.title}>
                      {e.submenu.map((a) => (
                        <Menu.Item
                          key={a.id}
                          className="sidebar-submenu-item"
                          onClick={() => {
                            navigate(a.link);
                          }}
                        >
                          {a.title}
                        </Menu.Item>
                      ))}
                    </Menu.ItemGroup>
                  )}
                </SubMenu>
              ))}
            </Menu>
          </div>
          <Button
            type="danger"
            size="large"
            style={{
              width: "70%",
              height: 70,
            }}
          >
            <IoLogOutSharp style={{ fontSize: 40, color: "white" }} />
          </Button>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>
            <img src={logoin} width={150} style={{ marginLeft: 40 }} alt="" />{" "}
            <h1>BISNIS</h1>
          </Space>
          <Space>
            <div style={{ backgroundColor: "#5e34aa" }}></div>
            <Input.Search
              placeholder="input search text"
              enterButton
              className="sidebar-search"
            />
            <Space>
              <MdNotificationsActive className="sidebar-notif" />
              <div className="sidebar-profile">
                <p style={{ marginTop: 10, marginRight: 10 }}>Aldodevv</p>
                <Avatar>A</Avatar>
              </div>
            </Space>
          </Space>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* <SellerRoutes /> */}
          <ProtectedRoutes />
          {/* <HomeSeller /> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
