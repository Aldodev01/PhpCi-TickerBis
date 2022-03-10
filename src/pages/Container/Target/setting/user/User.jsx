import {
  Button,
  message,
  Space,
  Table,
  Tooltip,
  Drawer,
  Popconfirm,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { UserDelete, UserGet } from "../../../../../api/USER";
import { UserContext } from "../../../../../context/UserContextProvider";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logoin from "../../../../../assets/lib/imezi-logo.svg";
import UserSetting from "../../../../../components/MyForm/UserSetting";
import UserCreate from "../../../../../components/MyForm/CreateUser";
import { BsFillPersonPlusFill } from "react-icons/bs";

const User = () => {
  const [dataTable, setDataTable] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [drawerNeed, setDrawerNeed] = useState({
    drawer: false,
    data: null,
  });
  const [drawerNeed2, setDrawerNeed2] = useState({
    drawer: false,
    data: null,
  });
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    page: 0,
    size: 30,
  });

  useEffect(() => {
    if (user.idUser) {
      GettingUser();
    }
  }, [user]);

  const GettingUser = () => {
    UserGet(user.idUser, payload.page, payload.size)
      .then((res) => {
        setDataTable(res.data.content);
      })
      .catch((error) => {
        message.error("Ocurrió un error en el servidor al iniciar sesión");
      });
  };

  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      render: (t, r, i) => {
        return <span>{t}</span>;
      },
    },
    { title: "No Telpon", dataIndex: "nohp", key: "nohp" },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "x",
      key: "x",
      render: (t, r, i) => (
        <Space>
          <Tooltip title="Edit User" color={"#5e34aa"}>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setDrawerNeed({
                  ...drawerNeed,
                  drawer: !drawerNeed.drawer,
                  data: r,
                });
              }}
            >
              <FaUserEdit />
            </Button>
          </Tooltip>

          <Tooltip title="Hapus User" color={"#ed0678"}>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                UserDelete(user.idUser, r.id)
                  .then((res) => {
                    console.log(res);
                    message.success("Success");
                    GettingUser();
                  })
                  .catch((error) => {
                    message.error(
                      "Ocurrió un error en el servidor al iniciar sesión"
                    );
                  });
              }}
              onCancel={() => {
                message.info("Canceled");
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" size="large">
                <AiOutlineUserDelete />
              </Button>
            </Popconfirm>
            ,
          </Tooltip>
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record) => (
    <p style={{ margin: 0 }}>{record.kodeBank}</p>
  );

  const rowExpandable = (record) => record.name !== "Not Expandable";

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setDrawerNeed2({
            ...drawerNeed2,
            drawer: !drawerNeed2.drawer,
          });
        }}
      >
        <Space>
          <BsFillPersonPlusFill style={{ fontSize: 20 }} /> Tambah User
        </Space>
      </Button>
      <br />
      <br />

      <Table
        columns={columns}
        bordered
        expandable={{
          expandedRowRender,
          rowExpandable,
        }}
        dataSource={dataTable}
      />

      <Drawer
        title={
          <Space>
            <img src={logoin} /> <p style={{ marginTop: 20 }}>Edit User</p>
          </Space>
        }
        placement="right"
        onClose={() => {
          setDrawerNeed({
            ...drawerNeed,
            drawer: !drawerNeed.drawer,
          });
        }}
        visible={drawerNeed.drawer}
      >
        <UserSetting action={{ drawerNeed, setDrawerNeed }} get={GettingUser} />
      </Drawer>
      <Drawer
        title={
          <Space>
            <img src={logoin} /> <p style={{ marginTop: 20 }}>User Create</p>
          </Space>
        }
        placement="right"
        width={500}
        onClose={() => {
          setDrawerNeed2({
            ...drawerNeed2,
            drawer: !drawerNeed2.drawer,
          });
        }}
        visible={drawerNeed2.drawer}
      >
        <UserCreate
          action={{ drawerNeed2, setDrawerNeed2 }}
          get={GettingUser}
        />
      </Drawer>
    </div>
  );
};

export default User;
