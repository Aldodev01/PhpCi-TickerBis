import React from "react";
import { Button, Input, Select, Space, Tooltip } from "antd";

const CekTarif = () => {
  const { TextArea } = Input;
  return (
    <div>
      <h1 style={{ fontSize: 30, fontWeight: "bold" }}>Cek Tarif</h1>
      <br />
      <h1>Ekspedisi</h1>
      <Button danger>JNE</Button>
      <br />
      <br />

      <Space direction="vertical" style={{ width: "100%" }}>
        <h3>Alamat Asal</h3>
        <TextArea
          showCount
          maxLength={200}
          rows={3}
          placeholder="Kelurahan / Kota"
        />
      </Space>
      <br />
      <Space direction="vertical" style={{ width: "100%" }}>
        <h3>Alamat Tujuan</h3>
        <TextArea
          showCount
          maxLength={200}
          rows={3}
          placeholder="Kelurahan / Kota"
        />
      </Space>
    </div>
  );
};

export default CekTarif;
