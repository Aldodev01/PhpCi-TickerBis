import React, { useCallback, useContext, useEffect } from "react";
import { Form, Input, Button, Select, Checkbox, message } from "antd";
import { patternPassword } from "../../utils/regExp/regExp";
import { UserContext } from "../../context/UserContextProvider";
import { UserCreating } from "../../api/USER";

const UserCreate = ({ action, get }) => {
  const { drawerNeed2, setDrawerNeed2 } = action;
  const [user, setUser] = useContext(UserContext);

  const onFinish = (values) => {
    console.log("VALUES", values);
    UserCreating(user.idUser, {
      nama: values.nama,
      email: values.email,
      password: values.password,
      noHp: values.nohp,
    })
      .then((res) => {
        message.success("Success");
        setDrawerNeed2({
          ...drawerNeed2,
          drawer: false,
        });
        get();
      })
      .catch((err) => {
        message.error("Ocurrió un error en el servidor al iniciar sesión");
      });
  };

  console.log("user", user);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [drawerNeed2]);

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
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
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            min: 6,
            message: "Masukan password minimal 6 karakter",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (patternPassword.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "Password minimal harus mengandung 1 huruf dan angka!"
                )
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password autoComplete="new-password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w100">
          Simpan
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserCreate;
