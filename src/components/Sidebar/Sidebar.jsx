import React, { useContext, useState, useEffect } from "react";
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
  Select,
  AutoComplete,
  message,
  Statistic,
  Tooltip,
} from "antd";
import "./Sidebar.less";
import logoin from "../../assets/lib/imezi-logo.svg";
import { MdNotificationsActive } from "react-icons/md";
import ProtectedRoutes from "../../routes/ProtectedRoutes";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../context/MenuContextProvider";
import { UserContext } from "../../context/UserContextProvider";
import { IoLogOutSharp } from "react-icons/io5";
import { AuthGetAccount } from "../../api/AUTH_API";
import { useQuery } from "react-query";
import CostumerService from "../CostumerService/CostumerService";

const Sidebar = () => {
  const [menu, SetMenu] = useContext(MenuContext);
  const [user, setUser] = useContext(UserContext);
  const deadline = Date.now() + 1000 * 60 * 60 * 1 * 1 + 1000 * 30;
  navigator.getBattery().then((battery) => console.log(battery));
  console.log(navigator.connection);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { Header, Content, Footer, Sider } = Layout;
  const { Countdown } = Statistic;
  const { SubMenu } = Menu;
  const { Option } = Select;

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onFinish = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const renderTitle = (title) => (
    <span>
      {title}
      <a
        style={{
          float: "right",
        }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );

  const renderItem = (title, count) => ({
    value: title,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <span>{count}</span>
      </div>
    ),
  });
  const options = [
    {
      label: renderTitle("Libraries"),
      options: [
        renderItem("Aldodevv", 10000),
        renderItem("Aldodevv UI", 10600),
      ],
    },
    {
      label: renderTitle("Solutions"),
      options: [
        renderItem("Aldodevv UI FAQ", 60100),
        renderItem("Aldodevv FAQ", 30010),
      ],
    },
    {
      label: renderTitle("Articles"),
      options: [renderItem("Aldodevv design language", 100000)],
    },
  ];

  const signOut = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const result = AuthGetAccount()
      .then((res) => {
        setUser({
          role: res.data.user[0].name,
          username: res.data.user[0].nama,
          email: res.data.user[0].email,
          validDate: res.data.validateAt,
          idUser: res.data.id,
          photo: res.data.fotoSelfie,
        });
      })
      .catch((err) => {
        message.error("Ocurrió un error en el servidor al iniciar sesión");
        localStorage.clear();
        navigate("/");
      });
  }, []);

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
        <div className="sidebar_menu_wrapper">
          <Image
            src="https://cs3.jne.co.id/assets/images/logo_jne_api_white.png"
            preview={false}
            style={{
              width: collapsed ? "80px" : "120px",
              height: collapsed ? "45px" : "65px",
              padding: 10,
              marginTop: 10,
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
            className="sidebar-logout"
            size="large"
            style={{
              width: "50%",
              height: 60,
            }}
            onClick={signOut}
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
            <img src={logoin} width={120} style={{ marginLeft: 40 }} alt="" />{" "}
            <h3>BISNIS</h3>
          </Space>
          <div className="sidebar-head">
            <Tooltip
              title="Sign In Ulang jika Waktu sudah Habis"
              color={"#ed0678"}
            >
              <Countdown
                title="Waktumu tinggal"
                value={deadline}
                onFinish={onFinish}
              />
            </Tooltip>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Pilih Ekspedisi"
              size="large"
              defaultValue={"JNE"}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="JNE">JNE</Option>
            </Select>
            <AutoComplete
              dropdownClassName="certain-category-search-dropdown"
              dropdownMatchSelectWidth={500}
              options={options}
            >
              <Input.Search
                placeholder="input search text"
                enterButton
                size="large"
                className="sidebar-search"
              />
            </AutoComplete>
            <Space>
              <MdNotificationsActive className="sidebar-notif" />
              <div className="sidebar-profile">
                <p style={{ marginTop: 10, marginRight: 10 }}>
                  {user.username}
                </p>
                <Avatar
                  src={
                    <Image
                      src={"https://joeschmoe.io/api/v1/random"}
                      style={{ width: 32 }}
                    />
                  }
                />
              </div>
            </Space>
          </div>
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
          <br />
          <br />
          <br />
          <h1
            style={{
              fontSize: 10,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "gray",
            }}
          >
            Copyright ©️ Aldodevv 2022 Reserved
          </h1>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
