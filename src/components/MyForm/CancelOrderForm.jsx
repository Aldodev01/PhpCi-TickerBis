import {
  Button,
  Checkbox,
  Space,
  Radio,
  Input,
  Popconfirm,
  message,
} from "antd";
import React, { useContext, useState } from "react";
import { DeleteOrderHistory } from "../../api/HISTORY";
import { UserContext } from "../../context/UserContextProvider";

const CancelOrderForm = ({ state }) => {
  const { TextArea } = Input;
  const { cancel, setCancel } = state;
  const [value, setValue] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [text, setText] = useState("");
  const datad = [
    {
      nama: "Ingin Mengubah Alamat Tujuan",
      key: 0,
      checked: false,
    },
    {
      nama: "Kesalahan Pada Pengimputan Order (Berat, NilaiCod, Isi Paket, dll)",
      key: 1,
      checked: false,
    },
    {
      nama: "Paket Tidak Mendapatkan Resi",
      key: 2,
      checked: false,
    },
    {
      nama: "Paket lama untuk Dipickup Oleh Kurir",
      key: 3,
    },
    {
      nama: "Lainnya",
      key: 4,
    },
  ];

  const handleChange = (e) => {
    if (value === "Lainnya") {
      setText(e.target.value);
    } else {
      setValue(e.target.value);
    }
  };

  function confirm(e) {
    if (value != "") {
      DeleteOrderHistory(user.idUser, value, cancel.data.resi)
        .then((res) => {
          message.success(
            "Paket Berhasil Dibatalkan, Mohon maaf atas ketidak nyamanan anda",
            3
          );
        })
        .catch((err) => {
          message.error(
            "Terjadi Kesalahan Pada Server, Silahkan coba kembali nanti",
            5
          );
        });
    } else {
      DeleteOrderHistory(user.idUser, text, cancel.data.resi)
        .then((res) => {
          message.success(
            "Paket Berhasil Dibatalkan, Mohon maaf atas ketidak nyamanan anda",
            3
          );
        })
        .catch((err) => {
          message.error(
            "Terjadi Kesalahan Pada Server, Silahkan coba kembali nanti",
            5
          );
        });
    }
  }

  function cancelled(e) {
    console.log(e);
    setText("");
    setValue("");
    setCancel({
      ...cancel,
      modal: !cancel.modal,
    });
  }

  return (
    <div className="flex-column-start w100">
      {value === "Lainnya" ? (
        <>
          <Radio
            onChange={() => {
              setValue("");
            }}
          >
            Kembali Ke Pilihan
          </Radio>
          <br />

          <TextArea
            rows={6}
            maxLength="250"
            placeholder="Maksimal 250 Character"
            onChange={handleChange}
          />
        </>
      ) : (
        <Radio.Group onChange={handleChange} value={value}>
          <div className="flex-column-start" style={{ gap: 30 }}>
            {datad &&
              datad.map((e, i) => (
                <Radio key={e.key} value={e.nama}>
                  {e.nama}
                </Radio>
              ))}
          </div>
        </Radio.Group>
      )}
      <br />
      <br />
      <Popconfirm
        title="Are you sure to Cancel this Paket?"
        onConfirm={confirm}
        onCancel={cancelled}
        okText="Ya"
        cancelText="Tidak"
      >
        <Button
          className="w100"
          type="danger"
          disabled={value === "" ? true : false}
        >
          Submit
        </Button>
      </Popconfirm>
      ,
    </div>
  );
};

export default CancelOrderForm;
