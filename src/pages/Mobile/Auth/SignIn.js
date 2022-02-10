import React from "react";
import CardSignIn from "../../../components/CardAuth/CardSignIn";
import "./SignIn.less";
import Lottie from "react-lottie";
import signInLottie from "../../../assets/lottie/signInLotie.json";
import { Space } from "antd";
import MyLottie from "../../../components/Lottie/MyLottie";

const SignIn = () => {
  return (
    <div className="flex-column-start w100">
      <div
        style={{ width: "100%", padding: 40, height: "100%", maxHeight: 200 }}
      >
        <MyLottie lottie={signInLottie} />
      </div>
      <CardSignIn />
    </div>
  );
};

export default SignIn;
