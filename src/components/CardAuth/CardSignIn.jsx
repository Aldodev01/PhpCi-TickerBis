import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Space,
  Modal,
  notification,
} from "antd";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import Endpoint from "../../api/AUTH_API";
import { AuthResetPassword, AuthSignIn } from "../../api/AUTH_API";
import { UserContext } from "../../context/UserContextProvider";
import logoin from "../../assets/lib/imezi-logo.svg";

import { patternEmail, patternPassword } from "../../utils/regExp/regExp";
import "./CardAuth.less";

const CardSignIn = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  /**
   * Function Reset Password
   * ====================================================
   * @param {Function} handleReset - antd form
   * @see https://aldo-portofolio.surge.sh/
   */
  const handleReset = async (e) => {
    const close = () => {
      console.log(
        "Notification was closed. Either the close button was clicked or duration time elapsed."
      );
    };
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button
          type="danger"
          size="large"
          onClick={() =>
            window.open("https://aldo-portofolio.surge.sh", "_blank")
          }
        >
          Hubungi
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            notification.close(key);
            window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
          }}
        >
          Confirm
        </Button>
      </Space>
    );

    await AuthResetPassword(e.email)
      .then((res) => {
        console.log("asdas", res.message);
        console.log("ssss", res.status);
        if (res.status === 200) {
          notification.success({
            message: "Email Terkonfirmasi",
            description:
              "Silahkan Cek Email Anda Dan Ganti Password Anda, Jika Anda Tidak Menerima Email Silahkan Hubungi Admin",
            btn,
            key,
            duration: 0,
            onClose: close,
          });
          setIsModalVisible(!isModalVisible);
        } else {
          notification.info({
            message: "Email Tidak Terdaftar",
            description: "Mohon Periksa Kembali Email Anda, Atau Hubungi Admin",
            key,
            btn,
            duration: 0,
            onClose: close,
          });
        }
      })
      .catch((error) => {
        console.log(error, "ANJAYT");
        if (error.response.status === 400) {
          message.error(error.response.data.message, 3);
        } else if (error.response.status === 500) {
          message.error(error.response.data.error, 3);
        } else {
          message.error("Error, Terjadi kesalahan", 3);
        }
      });
  };

  /**
   * Kumpulan ENCODED DAN DECODED PARAMETER
   * ====================================================
   * @param {Function} btoa - btoa dan atob
   * @see https://aldo-portofolio.surge.sh/
   */

  const encodedPayPass = btoa("password");
  const encodedPassword = btoa(signIn.password);
  const encodedPayReme = btoa("remember");
  const encodedReme = btoa(remember);
  const encodedPayName = btoa("name");
  const encodedEmail = btoa(signIn.username);

  const decodedPayPass = atob(encodedPayPass);
  const decodedPayReme = atob(encodedPayReme);
  const decodedPayName = atob(encodedPayName);

  /**
   * Function SignIn User
   * ====================================================
   * @param {Function} onFinish - antd form
   * @see https://aldo-portofolio.surge.sh/
   */

  const onFinish = async (e) => {
    const result = await AuthSignIn({
      username: e.email,
      password: e.password,
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
      {/* SIGN IN FORM */}

      <Form
        name="basic"
        labelCol={{ span: 19 }}
        wrapperCol={{ span: 100 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        className="w100"
      >
        <Form.Item
          name="email"
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
            {
              type: "email",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Your Email@gmail.com" size="large" />
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

      {/* RESET PASSWORD MODAL */}
      <Modal
        title="Apakah Anda Lupa Password ?"
        visible={isModalVisible}
        onCancel={handleVisible}
        footer={[
          <Button key="back" onClick={handleVisible}>
            Cancel
          </Button>,
        ]}
        centered
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={handleReset}
          id="second-form"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Masukan Email Anda" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Kirim Email
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CardSignIn;
