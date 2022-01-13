import { Button, Checkbox, Divider, Form, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
// import { AuthSignUp } from "../../api/AUTH_API";
import {
  patternEmail,
  patternNotelp,
  patternPassword,
} from "../../utils/regExp/regExp";
import "./CardAuth.less";

const CardSignUp = () => {
  const [signUp, setSignUp] = useState({
    usename: "",
    noTelp: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [verification, setVerification] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async () => {
    form.resetFields();
    // const result = await AuthSignUp({
    //   nama: signUp.usename,
    //   email: signUp.email,
    //   nohp: signUp.noTelp,
    //   password: signUp.password,
    //   rePassword: signUp.rePassword,
    // }).then((res) => console.log(res));
    // console.log(result);
  };

  useEffect(() => {
    form.resetFields();
  }, []);

  return (
    <div className="card_signin_wrap">
      <br />
      <br />
      <br />

      <Form
        name="basic"
        labelCol={{ span: 1 }}
        wrapperCol={{ span: 96 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="nama"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
            {
              min: 5,
              message: "Username minimal 5 karakter",
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Your Username"
            onChange={(e) => {
              setSignUp({
                ...signUp,
                noTelp: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          name="nohp"
          rules={[
            {
              required: true,
              message: "Please input your No telp!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (patternNotelp.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("contoh +6281234567789"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input
            addonBefore="+62"
            placeholder="No Telp"
            onChange={(e) => {
              setSignUp({
                ...signUp,
                noTelp: "+62" + e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (patternEmail.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Pastikan Email Memakai @"));
              },
            }),
          ]}
          hasFeedback
        >
          <Input
            placeholder="Your Email@gmail.com"
            onChange={(e) => {
              setSignUp({
                ...signUp,
                email: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="password"
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
        >
          <Input.Password
            style={{ padding: "0px 10px" }}
            placeholder="Your Password"
            onChange={(e) => {
              setSignUp({
                ...signUp,
                password: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          name="rePassword"
          rules={[
            {
              required: true,
              message: "Please input your Confirm Password!",
            },
            {
              min: 6,
              message: "Masukan password minimal 6 karakter",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Password tidak sama!"));
              },
            }),
          ]}
        >
          <Input.Password
            style={{ padding: "0px 10px" }}
            placeholder="Your Confirm Password"
            onChange={(e) => {
              setSignUp({
                ...signUp,
                rePassword: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Checkbox
          onChange={() => {
            setVerification(!verification);
          }}
        >
          {console.log(verification)}
          Syarat dan Ketentuan
        </Checkbox>
        <br />
        <br />

        <Button type="primary" htmlType="submit" className="w100">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CardSignUp;
