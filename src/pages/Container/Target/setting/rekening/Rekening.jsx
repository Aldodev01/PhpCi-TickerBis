import {
  message,
  Switch,
  Table,
  Tooltip,
  Button,
  Modal,
  Space,
  Popconfirm,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  AkunDeleteRekening,
  AkunEditRekening,
  AkunGetRekening,
} from "../../../../../api/AKUN";
import CreditCard from "../../../../../components/CreditCard/CreditCard";
import { UserContext } from "../../../../../context/UserContextProvider";
import AddRekening from "./AddRekening";
import { MdDeleteSweep } from "react-icons/md";
import { BsPlusSquareFill } from "react-icons/bs";
import Mylottie from "../../../../../components/Lottie/MyLottie";
import loading from "../../../../../assets/lottie/loading.json";

const Rekening = () => {
  const [user, setUser] = useContext(UserContext);
  const [dataAccount, setDataAccount] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [addRek, setAddRek] = useState({
    modal: false,
    data: null,
  });
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

  // const columns = [
  //   {
  //     title: "Status",
  //     dataIndex: "enabled",
  //     key: "enabled",
  //     render: (t, r, i) => {
  //       return <span>{t ? "SUDAH TERVERIFIKASI" : "BELUM TERVERIFIKASI"}</span>;
  //     },
  //   },
  //   { title: "Nama Bank", dataIndex: "namaBank", key: "namaBank" },
  //   {
  //     title: "Nama Pemilik Rekening",
  //     dataIndex: "namaRekening",
  //     key: "namaRekening",
  //   },
  //   {
  //     title: "Nomor Rekening",
  //     dataIndex: "noRekening",
  //     key: "noRekening",
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "x",
  //     key: "x",
  //     render: (t, r, i) => <div></div>,
  //   },
  // ];

  // const expandedRowRender = (record) => (
  //   <p style={{ margin: 0 }}>{record.kodeBank}</p>
  // );

  // const rowExpandable = (record) => record.name !== "Not Expandable";

  const handleModal = () => {
    setAddRek({
      ...addRek,
      modal: !addRek.modal,
    });
  };

  return (
    <div>
      <Button type="primary" onClick={handleModal} size="large">
        <Space>
          <BsPlusSquareFill style={{ fontSize: 20 }} /> Tambah Rekening Baru
        </Space>
      </Button>
      <br />
      <br />

      {/* <Table
        columns={columns}
        bordered
        expandable={{
          expandedRowRender,
          rowExpandable,
        }}
        dataSource={dataTable}
      /> */}
      <div className="flex-wrap-between w100" style={{ gap: 40 }}>
        {dataTable ? (
          dataTable.map((e, i) => (
            <div className="flex-column-center flex1">
              <CreditCard
                minWidth={500}
                maxWidth={600}
                text={e.noRekening}
                name={e.namaRekening}
                jenis={e.namaBank}
              />
              <br />
              <Space>
                <Tooltip title="Setel Rekening Sebagai Default">
                  <Space>
                    <h1>Jadikan Sebagai Default Pembabayaran</h1>
                    <Switch
                      checked={e.isDefault}
                      onChange={(a) => {
                        AkunEditRekening(user.idUser, e.id, a)
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
                  </Space>
                </Tooltip>
                <Tooltip title="Hapus Rekening">
                  <Popconfirm
                    title="Are you sure？"
                    icon={
                      <MdDeleteSweep style={{ color: "red", fontSize: 20 }} />
                    }
                    onConfirm={() => {
                      AkunDeleteRekening(user.idUser, e.id)
                        .then((res) => {
                          message.success("Rekening berhasil dihapus");
                          getFirstData();
                        })
                        .catch((err) => {
                          message.error(
                            "Ocurrió un error en el contolle servidor",
                            3
                          );
                        });
                    }}
                  >
                    <Button type="danger">
                      <MdDeleteSweep style={{ fontSize: 20 }} />
                    </Button>
                  </Popconfirm>
                </Tooltip>
              </Space>
            </div>
          ))
        ) : (
          <div className="flex-column-center w100">
            <div style={{ maxWidth: 500 }}>
              <Mylottie lottie={loading} />
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Tambahkan Rekening mu Disini"
        centered
        visible={addRek.modal}
        onOk={handleModal}
        onCancel={handleModal}
        footer={[<Button onClick={handleModal}>Cancel</Button>]}
        width={1000}
      >
        <AddRekening
          AddRekening={{ addRek, setAddRek }}
          getData={getFirstData}
        />
      </Modal>
    </div>
  );
};

export default Rekening;
