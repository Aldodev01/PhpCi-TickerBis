import React, { useContext, useEffect, useState } from "react";
import { PickupGet, PickupPut } from "../../../../../api/PICKUP";
import loading from "../../../../../assets/lottie/loading.json";
import { UserContext } from "../../../../../context/UserContextProvider";
import {
  PageHeader,
  Tabs,
  Button,
  Statistic,
  Descriptions,
  message,
  Switch,
  Tooltip,
  Space,
  Modal,
  Popconfirm,
  Avatar,
} from "antd";
import dateFilter from "../../../../../utils/date/myDate";
import MyLottie from "../../../../../components/Lottie/MyLottie";
import { BsPlusSquareFill } from "react-icons/bs";
import AddAdress from "./AddAddress";
import { MdDeleteSweep } from "react-icons/md";
import { AkunDeleteAddress } from "../../../../../api/AKUN";
import { VscCheckAll } from "react-icons/vsc";
import { RiCloseFill } from "react-icons/ri";
import "./address.less";
const { TabPane } = Tabs;
const Address = () => {
  const [user, setUser] = useContext(UserContext);
  const [addAdd, setAddAdd] = useState({
    modal: false,
    data: null,
  });

  const [address, setAddress] = useState(null);
  useEffect(() => {
    if (user.idUser) {
      getFirstData();
    }
  }, [user]);

  const getFirstData = () => {
    PickupGet(user.idUser, 1000000)
      .then((res) => {
        setAddress(res.data.content);
      })
      .catch((err) => {
        message.error(
          "Настана грешка при преземањето на податоците за подигање"
        );
      });
  };

  const Content = ({ children, extra }) => (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );

  const handleModal = () => {
    setAddAdd({
      ...addAdd,
      modal: !addAdd.modal,
    });
  };

  return (
    <div>
      <Button type="primary" onClick={handleModal} size="large">
        <Space>
          <BsPlusSquareFill style={{ fontSize: 20 }} /> Tambah Alamat Baru
        </Space>
      </Button>
      <br />
      <br />

      {address ? (
        address.map((e, i) => (
          <PageHeader
            className="site-page-header-responsive"
            title={e.label}
            subTitle={e.telp}
            extra={[
              e.enabled === false ? (
                <Space>
                  <Tooltip
                    title={"Alamatmu belum di verifikasi"}
                    color={"#ed0678"}
                  >
                    <div className="address-verified w100 flex-center">
                      <p
                        style={{
                          color: "white",
                          marginTop: 10,
                          marginLeft: 10,
                        }}
                      >
                        Alamatmu belum di verifikasi
                      </p>
                      <RiCloseFill className="address-icon-noncheck add-icon" />
                    </div>
                  </Tooltip>
                  <Tooltip title="Setel Alamat Sebagai Default">
                    <Button size="large" key="3" type="primary">
                      Ubah
                    </Button>
                  </Tooltip>
                </Space>
              ) : (
                <Space>
                  <Tooltip
                    title={"Alamat mu sudah Terverifikasi"}
                    color={"#1ec9ff"}
                  >
                    <div className="address-verified w100 flex-center">
                      <p
                        style={{
                          color: "white",
                          marginTop: 10,
                          marginLeft: 10,
                        }}
                      >
                        Terverifikasi
                      </p>
                      <VscCheckAll className="address-icon-check add-icon" />
                    </div>
                  </Tooltip>
                  <Tooltip title="Hapus Rekening">
                    <Popconfirm
                      title="Are you sure？"
                      icon={
                        <MdDeleteSweep style={{ color: "red", fontSize: 20 }} />
                      }
                      onConfirm={() => {
                        AkunDeleteAddress(user.idUser, e.id)
                          .then((res) => {
                            console.log(res);
                            if (res.status === 200) {
                              message.success("Успешно избришано", 3);
                              getFirstData();
                            }
                          })
                          .catch((err) => {
                            getFirstData();
                            message.error("Настана грешка при избришањето", 3);
                          });
                      }}
                    >
                      <Button size="large" type="danger">
                        Hapus
                      </Button>
                    </Popconfirm>
                  </Tooltip>
                </Space>
              ),
            ]}
          >
            <Content>
              <Descriptions size="large" column={2}>
                <Descriptions.Item label="Nama">{e.nama}</Descriptions.Item>
                <Descriptions.Item label="Dibuat oleh">
                  {e.createdBy}
                </Descriptions.Item>
                <Descriptions.Item label="Alamat Dibuat">
                  {dateFilter.basicDate(new Date(e.createdDate)).upNormal}
                </Descriptions.Item>
                <Descriptions.Item label="Diedit Oleh ">
                  {e.lastModifiedBy}
                </Descriptions.Item>
                <Descriptions.Item label="Terakhir Diedit">
                  {dateFilter.basicDate(new Date(e.lastModifiedDate)).upNormal}
                </Descriptions.Item>
                <Descriptions.Item label="Jadikan Sebagai Default">
                  <Switch
                    checked={e.isDefault}
                    onChange={(a) => {
                      PickupPut(user.idUser, e.id, a)
                        .then((res) => {
                          setAddress((oldData) => {
                            const newData = [...oldData];
                            newData[i].isDefault = !oldData[i].isDefault;
                            return newData;
                          });
                          getFirstData();
                        })
                        .catch((err) => {
                          message.error(
                            "Настана грешка при промената на данните"
                          );
                        });
                      getFirstData();
                    }}
                  />
                </Descriptions.Item>
              </Descriptions>
            </Content>
          </PageHeader>
        ))
      ) : (
        <div className="flex-column-center w100">
          <div style={{ maxWidth: 500 }}>
            <MyLottie lottie={loading} />
          </div>
        </div>
      )}

      <Modal
        title="Tambahkan Alamat mu Disini"
        centered
        visible={addAdd.modal}
        onOk={handleModal}
        onCancel={handleModal}
        footer={[<Button onClick={handleModal}>Cancel</Button>]}
        width={1000}
      >
        <AddAdress addAddress={{ addAdd, setAddAdd }} />
      </Modal>
    </div>
  );
};

export default Address;
