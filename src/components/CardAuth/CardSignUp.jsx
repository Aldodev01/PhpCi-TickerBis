import React, { useRef, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Space,
  message,
  notification,
} from "antd";
import {
  patternFirstSpace1,
  patternNotelp,
  patternPassword,
} from "../../utils/regExp/regExp";
import ReCAPTCHA from "react-google-recaptcha";
import logoin from "../../assets/lib/imezi-logo.svg";
import "./CardAuth.less";
import { AuthCreateAccount } from "../../api/AUTH_API";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CardSignUp = () => {
  const [capctha, setCapctha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const recaptchaRef = useRef();
  const close = () => {
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };
  const key = `open${Date.now()}`;
  const btn = (
    <Space>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          navigate("/");
        }}
      >
        Confirm
      </Button>
    </Space>
  );
  const onFinish = async (e) => {
    console.log("Received e of form: ", e, capctha);
    if (capctha) {
      const data = {
        nama: e.username,
        email: e.email,
        password: e.password,
        rePassword: e.rePassword,
        nohp: e.phone,
      };
      AuthCreateAccount(data)
        .then((res) => {
          console.log("res", res);
          notification.success({
            message: "Email Terkonfirmasi",
            description:
              "Silahkan Cek Email Anda Dan Ganti Password Anda, Jika Anda Tidak Menerima Email Silahkan Hubungi Admin",
            btn,
            key,
            duration: 0,
            onClose: close,
          });
        })
        .catch((error) => {
          if (error.response.data.status === 500) {
            message.error("Internal Server Error");
            setLoading(false);
          } else if (error.response.status === 401) {
            message.error(error.response.data);
            setLoading(false);
          } else if (error.response.status === 400) {
            message.error(error.response.data.message);
            setLoading(false);
          }
        });
    } else {
      message.info("You're not human", 5);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle style={{ color: "white" }}>
      <select
        style={{
          width: 70,
          color: "white",
          backgroundColor: "inherit",
          border: "none",
        }}
        defaultValue="+62"
      >
        <option value="+62">+62</option>
        <option value="08">08</option>
      </select>
    </Form.Item>
  );

  return (
    <div className="card_signup_wrap">
      <br />
      <Space>
        <img src={logoin} width={100} alt="" />{" "}
        <h3 style={{ marginTop: 10 }}>Sign Up</h3>
      </Space>
      <br />
      <br />
      <br />
      {/* SIGN IN FORM */}
      <Form
        labelCol={{ span: 19 }}
        layout="vertical"
        wrapperCol={{ span: 50 }}
        initialValues={{ remember: true }}
        form={form}
        name="register"
        onFinish={onFinish}
        className="w100"
        autoComplete="on"
      >
        <Form.Item
          name="username"
          label="Nama"
          tooltip="Nama Anda "
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
            {
              min: 4,
              message: "Minimal 4 karakter",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (patternFirstSpace1.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("No Space for First Character")
                );
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (patternNotelp.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Just Number Please"));
              },
            }),
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="Set Your Email@gmail.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="rePassword"
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

        <Form.Item
          label="Captcha"
          name="chaptca"
          extra="We must make sure that your are a human."
        >
          <ReCAPTCHA
            ref={recaptchaRef}
            size="normal"
            type="image"
            sitekey="6LfV1skbAAAAAAc0FVBzOa9GFFqdaJ3bcN7iJSP1"
            onChange={(e) => {
              setCapctha(!capctha);
            }}
          />
        </Form.Item>

        <Form.Item label=":">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CardSignUp;
