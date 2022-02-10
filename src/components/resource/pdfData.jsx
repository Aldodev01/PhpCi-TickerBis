import React from "react";
import "./PDF.less";
import logo from "../../assets/lib/imezi-logo.svg";
import jne from "../../assets/lib/jne.png";

import { useBarcode } from "react-barcodes";

const PdfData = ({
  noResi,
  namaPenerima,
  telpPenerima,
  alamatPenerima,
  tipePengiriman,
  nilaiCod,
  orderId,
  deskripsiPaket,
  jumlahPaket,
  key,
  namaPengirim,
  alamatPengirim,
  telpPengirim,
  beratPaket,
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
  const GenerateBarcode2 = ({ value }) => {
    const { inputRef } = useBarcode({
      value: value,
      options: {
        width: 1.5,
        height: 30,
        fontSize: 15,
      },
    });
    return <svg ref={inputRef} />;
  };
  return (
    <div className="pdf-wrapper">
      <table key={key} className="pdf-table">
        <tr className="pdf-tr1">
          <div className="flex-between w100" style={{ padding: 10 }}>
            <img src={logo} style={{ width: 70 }} />
            <img src={jne} style={{ width: 70 }} />
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
        <tr className="pdf-tr5">
          <div className="flex-between w100">
            <div className="flex1 pdf-tr7 ">
              <div className="pdf-column margin-left10 ">
                <b className="font-10 ">Pengirim : {namaPengirim}</b>
                <p className="font-10 ">
                  {telpPengirim == null ? "081389166337" : telpPengirim}
                </p>
                <p className="font-10 ">{alamatPengirim}</p>
              </div>
            </div>
            <div className="flex1">
              <div className="pdf-column margin-left10 ">
                <b className="font-10 ">Penerima : {namaPenerima}</b>
                <p className="font-10 ">{telpPenerima}</p>
                <p className="font-10 ">{alamatPenerima}</p>
              </div>
            </div>
          </div>
        </tr>
        <tr className="pdf-tr6">
          <div className="flex-between w100 pdf-padding10 line-height10">
            <div className="flex-column-start">
              <p className="font-10 line-height10">
                {tipePengiriman} - {nilaiCod}
              </p>
              <div className="flex-column-start line-height10">
                <p className="font-10 line-height10">Instruksi Pengiriman :</p>
                <p className="font-10 line-height10">{deskripsiPaket}</p>
              </div>
            </div>
            <div className="flex-column-start line-height10">
              <p className="font-10 line-height10">Berat : {beratPaket}</p>

              <p className="font-10 line-height10">Kuantitas : {jumlahPaket}</p>
            </div>
          </div>
        </tr>
        <tr className="pdf-tr2">
          <div className="flex-column-center w100">
            <GenerateBarcode2 value={orderId} />
          </div>
        </tr>
      </table>
    </div>
  );
};

export default PdfData;
