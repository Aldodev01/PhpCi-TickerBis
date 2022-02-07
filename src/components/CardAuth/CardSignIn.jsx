import { Button, Checkbox, Form, Input, message, Space, Modal } from "antd";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import Endpoint from "../../api/AUTH_API";
import { AuthSignIn } from "../../api/AUTH_API";
import { UserContext } from "../../context/UserContextProvider";
import logoin from "../../assets/lib/imezi-logo.svg";

import { patternEmail, patternPassword } from "../../utils/regExp/regExp";
import "./CardAuth.less";
import { fromBinary, toBinary } from "../../utils/binary/Binary";

const CardSignIn = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailer, setEmailer] = useState("");

  const handleVisible = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleReset = () => {
    setIsModalVisible(!isModalVisible);
  };

  const encodedPayPass = btoa("password");
  const encodedPassword = btoa(signIn.password);
  const encodedPayReme = btoa("remember");
  const encodedReme = btoa(remember);
  const encodedPayName = btoa("name");
  const encodedEmail = btoa(signIn.username);

  const decodedPayPass = atob(encodedPayPass);
  const decodedPayReme = atob(encodedPayReme);
  const decodedPayName = atob(encodedPayName);

  console.log(decodedPayPass, decodedPayName, decodedPayReme);

  const onFinish = async (e) => {
    const result = await AuthSignIn({
      username: signIn.username,
      password: signIn.password,
    }).then((res) => {
      if (remember) {
        localStorage.setItem(encodedPayName, encodedEmail);
        localStorage.setItem(encodedPayPass, encodedPassword);
        localStorage.setItem(encodedPayReme, encodedReme);
      } else {
        localStorage.clear();
      }

      if (res.status === 200) {
        sessionStorage.setItem("authorization", res.data.token);
        message.success("Đăng nhập thành công");
        window.location.reload();
      } else {
        message.error("Đăng nhập thất bại");
      }
    });
  };

  useEffect(() => {
    const userNamex = localStorage.getItem(encodedPayName);
    const passwordx = localStorage.getItem(encodedPayPass);
    const rememberx = localStorage.getItem(encodedPayReme);

    const decodedPassword = atob(passwordx);
    const decodedReme = atob(rememberx);
    const decodedEmail = atob(userNamex);

    if (rememberx) {
      setRemember(rememberx);
      setSignIn({
        ...signIn,
        username: decodedEmail,
        password: decodedPassword,
      });
    }
  }, []);

  return (
    <div className="card_signin_wrap">
      <br />
      <Space>
        <img src={logoin} width={100} alt="" />{" "}
        <h3 style={{ marginTop: 10 }}>Sign In</h3>
      </Space>
      <br />
      <br />
      <br />

      <Form
        name="basic"
        labelCol={{ span: 19 }}
        wrapperCol={{ span: 100 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w100"
      >
        <Form.Item
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
            size="large"
            value={signIn.username}
            onInput={(e) => {
              setSignIn({
                ...signIn,
                username: e.target.value,
              });
            }}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            // {
            //   min: 6,
            //   message: "Masukan password minimal 6 karakter",
            // },
            // ({ getFieldValue }) => ({
            //   validator(_, value) {
            //     // console.log("value", value);
            //     // let pattern = new RegExp(
            //     //   "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*?)(+=._-]+)$"
            //     // );
            //     // console.log("pattern.test(value)", pattern.test(value));
            //     if (patternPassword.test(value)) {
            //       return Promise.resolve();
            //     }
            //     return Promise.reject(
            //       new Error(
            //         "Password minimal harus mengandung 1 huruf dan angka!"
            //       )
            //     );
            //   },
            // }),
          ]}
        >
          <Input.Password
            style={{ padding: "0px 10px" }}
            placeholder="Your Password"
            size="large"
            onInput={(e) => {
              setSignIn({
                ...signIn,
                password: e.target.value,
              });
            }}
            value={signIn.password}
          />
        </Form.Item>
        <div className="flex-between w100">
          <Checkbox
            checked={remember}
            size="large"
            onChange={() => {
              setRemember(!remember);
            }}
          >
            Remember me
          </Checkbox>
          <Button type="link" onClick={handleVisible}>
            Lupa Password ?
          </Button>
        </div>
        <br />
        <br />

        <Space direction="vertical" className="w100">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w100"
          >
            Sign In
          </Button>
          <Button
            className="w100"
            size="large"
            type="danger"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            Sign Up
          </Button>
        </Space>
      </Form>

      <Modal
        title="Don't You Remember Your Password ?"
        visible={isModalVisible}
        onOk={handleReset}
        onCancel={handleVisible}
        okText="Kirim Email"
        cancelText="Ga jadi:v"
        centered
      >
        <Input placeholder="Insert Your Email" />
      </Modal>
    </div>
  );
};

export default CardSignIn;
