import React from "react";
import { SmileOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  InputNumber,
  Mentions,
  Button,
  Checkbox,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const SecondOrderCod = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("values", values);
  };

  const [form] = Form.useForm();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <b>+62</b>
    </Form.Item>
  );
  const prefixSelector2 = (
    <Form.Item name="prefix" noStyle>
      <b style={{ color: "white" }}>Kg</b>
    </Form.Item>
  );
  const prefixSelector3 = (
    <Form.Item name="prefix" noStyle>
      <b style={{ color: "white" }}>Rp.</b>
    </Form.Item>
  );
  return (
    <div>
      <div className="wrapperInput">
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 36 }}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1>Data Penerima</h1>
          <Form.Item
            name="namaPenerima"
            label="Nama Penerima"
            rules={[
              {
                required: true,
                message: "Masukan Nama Penerima",
              },
              {
                min: 6,
                message: "Masukan Nama Penerima minimal 4 karakter",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Isi Nama Penerima" />
          </Form.Item>
          <Form.Item
            name="noTelpPenerima"
            label="Nomor Telepon"
            rules={[
              {
                required: true,
                message: "Masukan Nomor Telepon Penerima",
              },
            ]}
            hasFeedback
          >
            <Input
              addonBefore={prefixSelector}
              placeholder="Isi Nomor Telepon Penerima"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="alamatPenerima"
            label="Alamat dan Panrokan Rumah"
            tooltip={{
              title: "Tooltip with customize icon",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Please input your Tipe Pickup!",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={200} rows={4} />
          </Form.Item>
          <Form.Item
            name="kecamatanPenerima"
            label="Kecamatan / Kota / Kode Pos"
            rules={[
              {
                required: true,
                message: "Tipe Pengiriman Anda",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Isi Kecamatan/ Kota/ Kodepos Penerima" />
          </Form.Item>
          <h1>Data Paket</h1>
          <Form.Item
            name="beratPaket"
            label="Berat Paket"
            rules={[
              {
                required: true,
                message: "Tipe Pengiriman Anda",
              },
            ]}
            hasFeedback
          >
            <Input
              addonAfter={prefixSelector2}
              placeholder="Isi Berat Paket (Kg)"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="isiPaket"
            label="Isi Paket"
            rules={[
              {
                required: true,
                message: "Tipe Pengiriman Anda",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Isi Paket" />
          </Form.Item>
          <Form.Item
            name="pesanKhusus"
            label="Instruksi Pengiriman"
            tooltip={{
              title: "Tooltip with customize icon",
              icon: <InfoCircleOutlined />,
            }}
            rules={[
              {
                required: true,
                message: "Please input your Tipe Pickup!",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={200} rows={4} />
          </Form.Item>
          <h1>Data Pengiriman</h1>
          <Form.Item
            name="nilaiOngkir"
            label="Ongkir Spesial Imezi"
            rules={[
              {
                required: true,
                message: "Ongkir Tidak Tersedia",
              },
            ]}
            hasFeedback
          >
            <Input
              disabled
              addonBefore={prefixSelector3}
              placeholder="Ongkir Spesial Imezi"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="Save as Default Setting"
            label="Save as Default Setting"
            hasFeedback
          >
            <Checkbox
            // onChange={() => {
            //   setRemember(!remember);
            // }}
            >
              Save to default setting
            </Checkbox>
          </Form.Item>
          <br />
          <br />

          <Button
            type="primary"
            htmlType="submit"
            className="w100"
            onClick={() => {
              navigate("/dashboard/pengiriman/secondOrder");
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SecondOrderCod;
