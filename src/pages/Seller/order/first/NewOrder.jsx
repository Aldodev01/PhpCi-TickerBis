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

const NewOrder = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("values", values);
  };
  return (
    <div>
      <h1>Pengiriman</h1>
      <div className="wrapperInput">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 36 }}
          layout="horizontal"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="ekspedisi"
            label="Ekspedisi"
            rules={[
              {
                required: true,
                message: "Pilih Ekspedisi Anda",
              },
            ]}
            hasFeedback
          >
            <Button type="primary" size="large" shape="round">
              JNE
            </Button>
          </Form.Item>
          <Form.Item
            name="tipePengiriman"
            label="Tipe Pengiriman"
            rules={[
              {
                required: true,
                message: "Tipe Pengiriman Anda",
              },
            ]}
            hasFeedback
          >
            <Space>
              <Button type="primary" size="large" shape="round">
                COD
              </Button>
              <Button type="danger" size="large" shape="round">
                NON COD
              </Button>
            </Space>
          </Form.Item>

          <Form.Item
            name="tipePickup"
            label="Tipe Pickup"
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
            <Select
              size="large"
              showSearch
              style={{ width: "100%", maxWidth: 600 }}
              placeholder="Tipe Pengiriman"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="COD">COD</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="tanggalPenjemputan"
            label="Tanggal Penjemputan"
            rules={[
              {
                required: true,
                message: "Tipe Pengiriman Anda",
              },
            ]}
            hasFeedback
          >
            <DatePicker size="large" style={{ width: "100%", maxWidth: 600 }} />
          </Form.Item>
          <Form.Item
            name="tanggalPenjemputan"
            label="Kendaraan"
            rules={[
              {
                required: true,
                message: "Tipe Pengiriman Anda",
              },
            ]}
            hasFeedback
          >
            <Select
              defaultValue="MOTOR"
              size="large"
              style={{ width: "100%", maxWidth: 600 }}
            >
              <Option value="MOTOR">MOTOR</Option>
              <Option value="MOBIL">MOBIL</Option>
              <Option value="TRUCK">TRUCK</Option>
            </Select>
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

export default NewOrder;
