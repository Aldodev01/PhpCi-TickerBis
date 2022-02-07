import { Button, message, Space, Table, Tooltip, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { UserGet } from "../../../../../api/USER";
import { UserContext } from "../../../../../context/UserContextProvider";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logoin from "../../../../../assets/lib/imezi-logo.svg";
import UserSetting from "../../../../../components/editForm/UserSetting";

const User = () => {
  const [dataTable, setDataTable] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [drawerNeed, setDrawerNeed] = useState({
    drawer: false,
    data: null,
  });
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    page: 0,
    size: 30,
  });

  useEffect(() => {
    UserGet(user.idUser, payload.page, payload.size)
      .then((res) => {
        console.log(res.data.content);
        setDataTable(res.data.content);
      })
      .catch((error) => {
        message.error("Ocurrió un error en el servidor al iniciar sesión");
      });
  }, []);

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
          <Tooltip
            title="Edit User"
            color={"#5e34aa"}
            onClick={() => {
              setDrawerNeed({
                ...drawerNeed,
                drawer: !drawerNeed.drawer,
                data: r,
              });
            }}
          >
            <Button type="primary" size="large">
              <FaUserEdit />
            </Button>
          </Tooltip>
          <Tooltip title="Hapus User" color={"#ed0678"}>
            <Button type="danger" size="large">
              <AiOutlineUserDelete />
            </Button>
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
        <UserSetting action={{ drawerNeed, setDrawerNeed }} />
      </Drawer>
    </div>
  );
};

export default User;
