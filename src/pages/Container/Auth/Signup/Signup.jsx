import React from "react";
import CardSignUp from "../../../../components/CardAuth/CardSignUp";
import "./Signup.less";
import Lottie from "react-lottie";
import signInLottie from "../../../../assets/lottie/signInLotie.json";
import logoin from "../../../../assets/lib/imezi-logo.svg";

const Signup = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: signInLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <CardSignUp />
    </div>
  );
};

export default Signup;
