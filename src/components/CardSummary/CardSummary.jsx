import { Space } from "antd";
import React from "react";
import Lottie from "react-lottie";
import "./CardSummary.less";

const CardSummary = ({ title, icon, count = 0, background, onClick }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: icon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="cardSummary-wrap"
      onClick={onClick}
      style={{ backgroundColor: background }}
    >
      <div className="cardSummary-head">
        <h1 style={{ color: "white", fontSize: ".8rem" }}>{title}</h1>
        <div className="cardSummary-container">
          <div className="cardSummary-lottie">
            <Lottie options={defaultOptions} width="100%" height="100%" />
          </div>
          <h3 style={{ color: "white", fontSize: "2rem" }}>{count}</h3>
        </div>
      </div>
    </div>
  );
};

export default CardSummary;
