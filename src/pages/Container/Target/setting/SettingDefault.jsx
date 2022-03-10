import { Avatar, Badge, message, Space, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AuthGetAccount } from "../../../../api/AUTH_API";
import { SummarySeller } from "../../../../api/SUMMARY";
import { UserGet } from "../../../../api/USER";
import CreditCard from "../../../../components/CreditCard/CreditCard";
import { UserContext } from "../../../../context/UserContextProvider";
import { getFirst, getLast } from "../../../../utils/date/SummaryDate";
import "./SettingDefault.less";

const SettingDefault = () => {
  const [process, setProcess] = useState(0);
  const [user, setUser] = useContext(UserContext);
  const [dataUser, setDataUser] = useState(null);

  const [summaryPayload, setSummaryPayload] = useState({
    tipePengiriman: null,
    pickupId: null,
    size: 10,
    sortField: "createdDate",
    endDate: getLast,
    startDate: getFirst,
    keyword: null,
    page: 0,
    statusPengiriman: "NULL",
    statusPembayaran: null,
    tipePengiriman: null,
  });

  const {
    isLoading: akun_isLoading,
    data: akun_data,
    isError: akun_isError,
  } = useQuery(["Monitoring Table"], AuthGetAccount);

  if (akun_data) {
    console.log("akun", akun_data);
  }

  useEffect(() => {
    if (user.idUser) {
      SummarySeller(user.idUser, summaryPayload)
        .then((res) => {
          setProcess(res.data.result);
        })
        .catch((err) => {
          message.error("Ocurrió un error en el servidor al iniciar sesión", 3);
        });
      UserGet(user.idUser, 0, 99)
        .then((res) => {
          setDataUser(res.data.content);
        })
        .catch((error) => {
          message.error("Ocurrió un error en el servidor al iniciar sesión", 3);
        });
    }
  }, [user]);

  return (
    <>
      <div className="w100 flex-start-start wrapperInput">
        <Tooltip title={`Ada ${process} Paket yang Belum Kekirim`}>
          <Badge count={process}>
            <Avatar src="https://joeschmoe.io/api/v1/random" size={200} />
          </Badge>
        </Tooltip>
        <div className="w100 flex-between">
          {akun_data && (
            <Space direction="vertical">
              <h1>{akun_data.data.nama}</h1>
              <p>{akun_data.data.namaToko}</p>
            </Space>
          )}

          <CreditCard text={"213901239012390123"} maxWidth={550} />
        </div>
      </div>
      <br />
      <br />

      <div className="flex-column-start w100">
        <h1 style={{ fontSize: 30, fontWeight: "bold" }}>Your User</h1>
        {dataUser &&
          dataUser.map((e, i) => (
            <ListUser
              background={`bg${i}`}
              nama={e.nama}
              email={e.email}
              noHp={e.nohp}
            />
          ))}
      </div>
    </>
  );
};

const ListUser = ({ background, nama, email, noHp }) => {
  return (
    <div className={`list-user-profile w100 ${background}`}>
      <Space>
        <p style={{ width: 80 }}>Nama</p> <p>:</p> <p>{nama}</p>
      </Space>
      <Space>
        <p style={{ width: 80 }}>Email</p> <p>:</p> <p>{email}</p>
      </Space>
      <Space>
        <p style={{ width: 80 }}>No. Hp</p> <p>:</p> <p>{noHp}</p>
      </Space>
    </div>
  );
};

export default SettingDefault;
