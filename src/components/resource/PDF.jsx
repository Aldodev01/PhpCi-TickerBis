import React, { forwardRef } from "react";
import "./PDF.less";
import ReactDom from "react-dom";
import PdfData from "./pdfData";
import MyLottie from "../Lottie/MyLottie";
import notFound from "../../assets/lottie/notfound.json";
import error from "../../assets/lottie/error.json";

const defaultProps = {
  data: [],
  open: false,
};

const Pdf = forwardRef((props, ref) => {
  const { checkStrictly, setCheckStrictly } = props.data;

  const style = {
    maxWidth: "350px",
    maxHeight: "350px",
  };

  if (ref.current == undefined) {
    return (
      <>
        <div className="pdf-overlay" ref={ref}>
          {checkStrictly.data ? (
            checkStrictly.data.map((e) => {
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
            <div className="w100 flex-column-center" style={style}>
              <MyLottie lottie={notFound} />
              <p className="w100" style={{ textAlign: "center" }}>
                Gagal Mendapatkan Data, Silahkan Coba Kembali Nanti
              </p>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <div className="pdf-overlay" ref={ref}>
        <div className="w100 flex-column-center" style={style}>
          <MyLottie lottie={error} />
          <p className="w100" style={{ textAlign: "center" }}>
            Gagal Mendapatkan Data, Silahkan Coba Kembali Nanti
          </p>
        </div>
      </div>
    );
  }
});

export default Pdf;
