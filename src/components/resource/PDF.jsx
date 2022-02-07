import React, { forwardRef } from "react";
import "./PDF.less";
import ReactDom from "react-dom";
import PdfData from "./pdfData";
const defaultProps = {
  data: [],
  open: false,
};

const Pdf = forwardRef((props, ref) => {
  const { dataPdf, setDataPdf } = props.data;

  console.log(dataPdf);
  if (!ref.current == undefined) {
    return (
      <div className="pdf-overlay" ref={ref}>
        <p>as</p>
      </div>
    );
  } else {
    return ReactDom.createPortal(
      <>
        <div className="pdf-overlay" ref={ref}>
          {dataPdf ? (
            dataPdf.map((e) => {
              return (
                <PdfData
                  noResi={e.resi}
                  labelPickup={e.labelPickup}
                  namaPenerima={e.namaPenerima}
                  telpToko={""}
                  telpPenerima={""}
                  alamatPenerima={""}
                  tipePengiriman={""}
                  nilaiCod={""}
                  orderId={e.orderId}
                  deskripsiPaket={""}
                  jumlahPaket={""}
                  pesanKhusus={""}
                />
              );
            })
          ) : (
            <p>loading</p>
          )}
        </div>
      </>,
      document.getElementById("pdf-root")
    );
  }
});

export default Pdf;
