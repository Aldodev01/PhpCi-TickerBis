import { Button, Drawer } from "antd";
import React, { createRef, useState } from "react";
import { IoPrintSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import Pdf from "../resource/PDF";

const SharedLabel = () => {
  const { idUser, awb } = useParams();

  console.log("idUser", idUser, awb);
  const [checkStrictly, setCheckStrictly] = useState({
    isModal: false,
    loading: false,
    data: null,
  });
  const handlingModal = () => {
    setCheckStrictly({
      ...checkStrictly,
      isModal: !checkStrictly.isModal,
    });
  };
  const componentRef = createRef();

  return (
    <div className="w100 h100 flex-column-center" style={{ minHeight: 600 }}>
      <Button type="primary" onClick={handlingModal}>
        Go to Print
      </Button>
      <Drawer
        title="Pilih Ukuran yang Anda Butuhkan"
        placement={"bottom"}
        width={500}
        onClose={handlingModal}
        visible={checkStrictly.isModal}
      >
        <ReactToPrint
          trigger={() => (
            <Button
              style={{
                position: "relative",
              }}
              type="primary"
              icon={<IoPrintSharp />}
            >
              Print Thermal 10x10
            </Button>
          )}
          content={() => componentRef.current}
        />
        <div style={{ display: "none" }}>
          <Pdf data={{ checkStrictly, setCheckStrictly }} ref={componentRef} />;
        </div>
        <ReactToPrint
          trigger={() => (
            <Button
              style={{
                position: "relative",
              }}
              type="primary"
              icon={<IoPrintSharp />}
            >
              Print Thermal 10x15
            </Button>
          )}
          content={() => componentRef.current}
        />
      </Drawer>
    </div>
  );
};

export default SharedLabel;
