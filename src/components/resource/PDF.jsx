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
  console.log(ref);

  if (ref.current == undefined) {
    return (
      <>
        <div className="pdf-overlay" ref={ref}>
          {dataPdf ? (
            dataPdf.map((e) => {
              return (
                <PdfData
                  noResi={e.resi}
                  namaPenerima={e.namaPenerima}
                  namaPengirim={e.labelPickup}
                  telpPenerima={e.telpPenerima}
                  telpPengirim={e.telpToko}
                  alamatPenerima={e.alamatPenerima}
                  alamatPengirim={`${e.provinsiPengirim} ${e.kotaPengirim} ${e.kelurahanPengirim} ${e.kelurahanPengirim}, ${e.kodePosPengirim}`}
                  tipePengiriman={e.tipePengiriman}
                  nilaiCod={e.nilaiCod}
                  orderId={e.orderId}
                  deskripsiPaket={e.deskripsiPaket}
                  jumlahPaket={e.jumlahPaket}
                  pesanKhusus={e.pesanKhusus}
                  beratPaket={e.beratPaket}
                />
              );
            })
          ) : (
            <p>loading</p>
          )}
        </div>
      </>
    );
  } else {
    return (
      <div className="pdf-overlay" ref={ref}>
        <p>as</p>
      </div>
    );
  }
});

export default Pdf;
