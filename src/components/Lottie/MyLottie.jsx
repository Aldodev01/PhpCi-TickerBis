import React from "react";
import Lottie from "react-lottie";

const MyLottie = ({ lottie }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} width="100%" height="100%" />;
};

export default MyLottie;
