import React from "react";
import "./CreditCard.less";
import visa from "../../assets/credit/visa.svg";
import tembaga from "../../assets/credit/tembaga.svg";

const CreditCard = ({
  text,
  maxWidth,
  name = "Aldodevv",
  jenis = "BANK BCA",
  minWidth = 230,
}) => {
  const textSpace = text?.match(/.{1,4}/g);
  const resultText = textSpace?.join("   ");
  return (
    <div
      className="w100 credit-card-wrapper"
      style={{ minWidth: minWidth, maxWidth: maxWidth }}
    >
      <div className="flex-between w100">
        <img src={tembaga} style={{ width: 80 }} />
        <img src={visa} style={{ width: 120 }} />
      </div>
      <br />
      <br />

      <h1
        className="w100 flex-center"
        style={{ fontSize: "2rem", color: "white" }}
      >
        {resultText}
      </h1>
      <br />
      <br />

      <div className="w100 flex-between">
        <div>
          <h4 className="credit-card-line-height">Card By</h4>
          <h4 className="credit-card-line-height">{`${name} - ${jenis}`}</h4>
        </div>
        <div>
          <h4 className="credit-card-line-height">Expired</h4>
          <h4 className="credit-card-line-height">MM/YY</h4>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
