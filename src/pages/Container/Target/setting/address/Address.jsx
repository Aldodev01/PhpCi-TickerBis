import React, { useContext, useEffect, useState } from "react";
import { PickupGet, PickupPut } from "../../../../../api/PICKUP";
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
} from "antd";
import dateFilter from "../../../../../utils/date/myDate";
const { TabPane } = Tabs;
const Address = () => {
  const [user, setUser] = useContext(UserContext);
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

  console.log(address);
  return (
    <div>
      {address &&
        address.map((e, i) => (
          <PageHeader
            className="site-page-header-responsive"
            title={e.label}
            subTitle={e.telp}
            extra={[
              <Tooltip title="Setel Rekening Sebagai Default">
                <Button key="3" type="primary">
                  Edit
                </Button>
              </Tooltip>,
              <Tooltip title="Hapus Alamat">
                <Button key="2" type="danger">
                  Delete
                </Button>
              </Tooltip>,
              ,
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
        ))}
    </div>
  );
};

export default Address;
