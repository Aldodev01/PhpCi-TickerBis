import React from "react";
import "./PDF.less";
import logo from "../../assets/lib/imezi-logo.svg";
import jne from "../../assets/lib/jne.png";

import { useBarcode } from "react-barcodes";

const PdfData = ({
  noResi,
  labelPickup,
  namaPenerima,
  telpPenerima,
  alamatPenerima,
  tipePengiriman,
  nilaiCod,
  orderId,
  deskripsiPaket,
  jumlahPaket,
  pesanKhusus,
  labbel,
  key,
  namaPengirim,
  alamatPengirim,
  telpPangirim,
}) => {
  const GenerateBarcode = ({ value }) => {
    const { inputRef } = useBarcode({
      value: value,
      options: {
        height: 40,
        displayValue: false,
        fontSize: 15,
      },
    });
    return <svg ref={inputRef} style={{ width: "100%" }} />;
  };
  return (
    <div className="pdf-wrapper">
      <table key={key} className="pdf-table">
        <tr className="pdf-tr">
          <div className="flex-between w100" style={{ padding: 10 }}>
            <img src={logo} style={{ width: 80 }} />
            <img src={jne} style={{ width: 80 }} />
          </div>
        </tr>
        <tr className="pdf-tr2">
          <div
            className="flex-column-center w100"
            style={{ position: "relative", paddingBottom: 10, paddingTop: 2 }}
          >
            <p
              style={{ position: "absolute", top: 50, zIndex: 3, fontSize: 10 }}
            >
              NOMOR RESI : {noResi}
            </p>
            <GenerateBarcode value={noResi} />
          </div>
        </tr>
        <tr className="pdf-tr3">
          <div className="flex-between w100 ">
            <div className="w50 pdf-tr3">
              <b>PENGIRIM</b>
              <p className="font-10">{namaPengirim}</p>
            </div>
            <div className="w50 pdf-tr3">
              <b>PENERIMA</b>
              <p className="font-10">{namaPenerima}</p>
            </div>
          </div>
        </tr>
      </table>
    </div>
  );
};

export default PdfData;
