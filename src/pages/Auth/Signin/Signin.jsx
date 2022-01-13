import React from "react";
import CardSignIn from "../../../components/CardAuth/CardSignIn";
import "./Signin.less";
import Lottie from "react-lottie";
import signInLottie from "../../../assets/lottie/signInLotie.json";
import logoin from "../../../assets/lib/imezi-logo.svg";

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
      <CardSignIn />
      <div className="signIn-lottie">
        <img src={logoin} width={100} alt="" />
        <Lottie options={defaultOptions} width={500} height={300} />
      </div>
    </div>
  );
};

export default Signin;
