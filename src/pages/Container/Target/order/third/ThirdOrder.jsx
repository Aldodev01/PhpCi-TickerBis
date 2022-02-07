import { Button, Space } from "antd";
import React from "react";
import "../order.less";

const ThridOrder = () => {
  return (
    <div className="flex-column-center">
      {/*  */}
      <br />
      <div className="flex-column-center w100 thirdOrder-head thirdOrder-container">
        <h1 style={{ color: "white" }}>PRTINJAU PAKET</h1>
        <br />
        <p>
          Pastikan semua data sudah terisi benar. Kesalahan penulisan Alamat
          dapat mengakibatkan paket terkirim kembali ke anda
        </p>
      </div>
      <br />
      <br />
      {/*  */}
      <div className="flex-column-start w100 thirdOrder-body thirdOrder-container">
        <h1 style={{ color: "white" }} className="w100 flex-center">
          DATA PICK UP
        </h1>
        <Space>
          <p className="w100px">Tipe Pick Up</p> <p>:</p> <p>Pickup</p>
        </Space>
        <Space>
          <p className="w100px">Alamat Pickup</p> <p>:</p>{" "}
          <p>
            Jl. Kebon Duren Raya Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Corrupti nihil hic assumenda laborum facere
            quisquam, sit labore illo temporibus autem atque tempora unde
            inventore in repellat reiciendis beatae nesciunt alias!
          </p>
        </Space>
        <Space>
          <p className="w100px">Tanggal Pickup</p> <p>:</p>{" "}
          <p>Rabu, 5 Febuari 2099</p>
        </Space>
      </div>
      <br /> <br />
      <div className="flex-between thirdOrder-save">
        <b style={{ marginTop: 10 }}>Selesaikan Pesanan Pengiriman</b>{" "}
        <Button type="danger">Konfirmasi Pengiriman </Button>
      </div>
    </div>
  );
};

export default ThridOrder;
