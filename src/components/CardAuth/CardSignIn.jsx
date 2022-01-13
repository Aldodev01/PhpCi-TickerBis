import { Button, Checkbox, Form, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Endpoint from "../../api/AUTH_API";
import { AuthSignIn } from "../../api/AUTH_API";

import { patternEmail, patternPassword } from "../../utils/regExp/regExp";
import "./CardAuth.less";

const CardSignIn = () => {
  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [remember, setRemember] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async () => {
    form.resetFields();
    // Endpoint.post("/auth/signin", signIn)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    const result = await AuthSignIn({
      username: signIn.username,
      password: signIn.password,
    }).then((res) => {
      if (remember) {
        localStorage.setItem("name", signIn.username);
        localStorage.setItem("password", signIn.password);
      }
      console.log(res);
    });
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                // console.log("value", value);
                // let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // console.log("pattern.test(value)", pattern.test(value));
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
              setSignIn({
                ...signIn,
                username: e.target.value,
              });
            }}
          />
        </Form.Item>

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
                // console.log("value", value);
                // let pattern = new RegExp(
                //   "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*?)(+=._-]+)$"
                // );
                // console.log("pattern.test(value)", pattern.test(value));
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
              setSignIn({
                ...signIn,
                password: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Space className="flex-between w100">
          <Checkbox
            onChange={() => {
              setRemember(!remember);
            }}
          >
            Remember me
          </Checkbox>
          <a href="#">Lupa Password ?</a>
        </Space>
        <br />
        <br />

        <Button type="primary" htmlType="submit" className="w100">
          Submit
        </Button>
        <Button
          className="w100"
          type="danger"
          onClick={() => {
            navigate("/signUp");
          }}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default CardSignIn;
