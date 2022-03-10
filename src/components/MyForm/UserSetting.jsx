import React, { useCallback, useEffect } from "react";
import { Form, Input, Button, Select, Checkbox, message } from "antd";
import { UserEdit } from "../../api/USER";

const UserSetting = ({ action, get }) => {
  const { drawerNeed, setDrawerNeed } = action;

  const onFinish = (values) => {
    UserEdit({
      ...values,
      id: drawerNeed.data.id,
    })
      .then((res) => {
        message.success("Success");
        setDrawerNeed({
          ...drawerNeed,
          drawer: false,
        });
        console.log("asikasik", res);
        get();
      })
      .catch((error) => {
        message.error("Ocurrió un error en el servidor al iniciar sesión");
      });
  };

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
        name="nomorTelepon"
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
