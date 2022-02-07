import React from "react";
import CardSignIn from "../../../../components/CardAuth/CardSignIn";
import "./Signin.less";
import Lottie from "react-lottie";
import signInLottie from "../../../../assets/lottie/signInLotie.json";
import { Space } from "antd";

const Signin = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: signInLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w100 signIn">
      <div className="signInWrapper">
        <CardSignIn />
        <Space direction="vertical">
          <div className="signIn-lottie flex-center">
            <div
              style={{
                width: "100%",
                height: "100%",
                maxHeight: 300,
                maxWidth: 500,
              }}
            >
              <Lottie options={defaultOptions} width="100%" height="100%" />
            </div>
            <h1>Dapatkan Kemudahan Pada Setiap Pengiriman</h1> Kami Siap
            Membantu
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Signin;
