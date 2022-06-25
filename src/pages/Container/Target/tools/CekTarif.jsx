import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Form,
  Input,
  message,
  Select,
  Space,
  Tooltip,
} from "antd";
import { ExpeditionGet, GetLocation } from "../../../../api/EXPEDITION";

const CekTarif = () => {
  const { TextArea } = Input;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [expedisi, setExpedisi] = useState({
    data: null,
    selected: "9a3ec075-649c-4c70-82d5-9a56abc1d805",
  });
  const [addressSender, setAddressSender] = useState({
    data: null,
    selected: "",
  });

  const [addressReceiver, setAddressReceiver] = useState({
    data: null,
    selected: "",
  });

  useEffect(() => {
    ExpeditionGet()
      .then((res) => {
        setExpedisi({
          ...expedisi,
          data: res.data.content,
        });
      })
      .catch((err) => {
        message.error("事故がありました", 3);
      });
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [addressSender, addressReceiver]);

  const getLocationSender = (e) => {
    console.log(e);
    const dataSesaat = [];
    GetLocation(e.keyword)
      .then(async (res) => {
        await res.data.content.map((e) => {
          dataSesaat.push({
            value: `Kel.${e.kelurahan}, Kec.${e.kecamatan}, Kota ${e.kota}, ${e.provinsi} ${e.kodePos}`,
          });
        });
        await setAddressSender({
          ...addressSender,
          data: dataSesaat,
        });
      })
      .catch((err) => {
        message.error("事故がありました", 3);
      });
  };

  console.log("UHUYHUYHG", addressReceiver.data);

  const getLocationReceiver = (e) => {
    const dataSesaat = [];
    GetLocation(e.payload)
      .then(async (res) => {
        await res.data.content.map((e) => {
          dataSesaat.push({
            value: `Kel.${e.kelurahan}, Kec.${e.kecamatan}, Kota ${e.kota}, ${e.provinsi} ${e.kodePos}`,
          });
        });
        await setAddressReceiver({
          ...addressReceiver,
          data: dataSesaat,
        });
      })
      .catch((err) => {
        message.error("事故がありました", 3);
      });
  };

  const onSelect = (value) => {
    console.log("onSelect", value);
  };
  return (
    <div>
      <h1 style={{ fontSize: 30, fontWeight: "bold" }}>Cek Tarif</h1>
      <br />
      <h1>Ekspedisi</h1>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select Your Expedition"
        defaultValue={"9a3ec075-649c-4c70-82d5-9a56abc1d805"}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onChange={(e) => {
          setExpedisi({
            ...expedisi,
            selected: e,
          });
        }}
      >
        {expedisi.data ? (
          expedisi.data.map((e) => (
            <Option key={e.id} value={e.id}>
              {e.nama}
            </Option>
          ))
        ) : (
          <Option value="9a3ec075-649c-4c70-82d5-9a56abc1d805">JNE x</Option>
        )}
      </Select>
      ,
      <br />
      <br />
      <Space direction="vertical" style={{ width: "100%" }}>
        <h3>Alamat Asal</h3>
        <Form form={form} name="control-hooks" onFinish={getLocationSender}>
          <Form.Item name="keyword">
            <AutoComplete
              dropdownMatchSelectWidth={252}
              style={{
                width: 300,
              }}
              options={addressSender.data}
              onSelect={onSelect}
            >
              <Input.Search size="large" placeholder="input here" enterButton />
            </AutoComplete>
          </Form.Item>
        </Form>
      </Space>
      <br />
      <Space direction="vertical" style={{ width: "100%" }}>
        <h3>Alamat Tujuan</h3>
        <Form form={form} name="control-hook2" onFinish={getLocationReceiver}>
          <Form.Item name="payload">
            <AutoComplete
              dropdownMatchSelectWidth={252}
              style={{
                width: 300,
              }}
              options={addressReceiver.data}
              onSelect={onSelect}
            >
              <Input.Search size="large" placeholder="input here" enterButton />
            </AutoComplete>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default CekTarif;
