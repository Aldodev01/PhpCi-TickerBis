import React, { useCallback, useEffect } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";

const UserSetting = ({ action }) => {
  const { drawerNeed, setDrawerNeed } = action;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  console.log("drawerNeed", drawerNeed);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [drawerNeed]);

  return (
    <Form
      name="basic"
      labelCol={{
        span: 16,
      }}
      wrapperCol={{
        span: 32,
      }}
      initialValues={{
        remember: true,
      }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        initialValue={drawerNeed.data.nama}
        label="Nama"
        name="nama"
        rules={[
          {
            required: true,
            message: "Please input your Nama!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={drawerNeed.data.email}
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={drawerNeed.data.nohp}
        label="Nomor Handphone"
        name="nohp"
        rules={[
          {
            required: true,
            message: "Please input your Nomor Handphone!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w100">
          Simpan Perubahan
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserSetting;
