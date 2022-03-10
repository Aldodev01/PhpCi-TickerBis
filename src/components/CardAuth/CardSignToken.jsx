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

const CardSignToken = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailer, setEmailer] = useState("");

  const handleVisible = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleReset = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onFinish = async (e) => {
    console.log(e);
    sessionStorage.setItem("authorization", e.token);
    message.success("Đăng nhập thành công");
    window.location.reload();
  };

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
          name="token"
          id="token"
          rules={[
            {
              required: true,
              message: "Please input your Token!",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Your Token" size="large" />
        </Form.Item>
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

export default CardSignToken;
