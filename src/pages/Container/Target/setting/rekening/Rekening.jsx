import { message, Switch, Table, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AkunEditRekening, AkunGetRekening } from "../../../../../api/AKUN";
import { UserContext } from "../../../../../context/UserContextProvider";

const Rekening = () => {
  const [user, setUser] = useContext(UserContext);
  const [dataAccount, setDataAccount] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  useEffect(() => {
    if (user.idUser) {
      getFirstData();
    }
  }, [user]);

  const getFirstData = () => {
    AkunGetRekening(user.idUser)
      .then((res) => {
        setDataAccount(res.data);
        let newDataTable = [];
        res.data.content.map((e, i) =>
          newDataTable.push({
            ...e,
            key: i,
          })
        );
        setDataTable(newDataTable);
      })
      .catch((error) => {
        message.info("Ocurrió un error en el servidor al iniciar sesión");
      });
  };

  const columns = [
    {
      title: "Status",
      dataIndex: "enabled",
      key: "enabled",
      render: (t, r, i) => {
        return <span>{t ? "SUDAH TERVERIFIKASI" : "BELUM TERVERIFIKASI"}</span>;
      },
    },
    { title: "Nama Bank", dataIndex: "namaBank", key: "namaBank" },
    {
      title: "Nama Pemilik Rekening",
      dataIndex: "namaRekening",
      key: "namaRekening",
    },
    {
      title: "Nomor Rekening",
      dataIndex: "noRekening",
      key: "noRekening",
    },
    {
      title: "Action",
      dataIndex: "x",
      key: "x",
      render: (t, r, i) => (
        <div>
          <Tooltip title="Setel Rekening Sebagai Default">
            <Switch
              checked={r.isDefault}
              onChange={(e) => {
                AkunEditRekening(user.idUser, r.id, e)
                  .then((res) => {
                    setDataTable((oldData) => {
                      const newData = [...oldData];
                      newData[i].isDefault = !oldData[i].isDefault;
                      return newData;
                    });
                    getFirstData();
                  })
                  .catch((err) => {
                    message.error(
                      "Ocurrió un error en el servidor al iniciar sesión"
                    );
                  });
                getFirstData();
              }}
            />
          </Tooltip>
        </div>
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
      ,
    </div>
  );
};

export default Rekening;
