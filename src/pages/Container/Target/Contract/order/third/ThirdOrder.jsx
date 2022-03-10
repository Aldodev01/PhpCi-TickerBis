import { Button, Collapse, message, Space } from "antd";
import React, { useContext, useState, useEffect } from "react";
import "../order.less";
import { OrderContext } from "../../../../../../context/OrderContextProvider";
import { useNavigate } from "react-router-dom";
import currency from "../../../../../../utils/currency/Currency";
import dateFilter from "../../../../../../utils/date/myDate";
import { GiJigsawBox } from "react-icons/gi";
import numberToWord from "../../../../../../utils/currency/NumberToWords";
import MyLottie from "../../../../../../components/Lottie/MyLottie";
import notFound from "../../../../../../assets/lottie/notfound.json";
import { UserContext } from "../../../../../../context/UserContextProvider";
const ThridOrder = () => {
  const { Panel } = Collapse;
  const [order, setOrder] = useContext(OrderContext);
  const [user, setUser] = useContext(UserContext);

  const [condition, setCondiition] = useState({
    loading: false,
    disabled: false,
  });

  const [dataPackage, setDataPackage] = useState(null);
  const navigate = useNavigate();
  const [preview, setPriview] = useState({
    jumlahData: 0,
    jumlahBiaya: 0,
    alamatLengkap: "",
  });

  console.log("order", order);
  console.log("pre", preview);
  console.log("user", user);
  const color = {
    color: "white",
  };

  const onFinish = async () => {
    setCondiition({
      ...condition,
      loading: true,
    });

    if (user.user.kodeToko) {
      console.log();

      if (user.user.kodeToko === null) {
        message.error("Anda belum memiliki Toko", 5);
        setCondiition({
          ...condition,
          loading: false,
        });
        setTimeout(() => {
          navigate("/dashboard/setting/:profile");
        }, 3000);
      } else {
        const payload = {
          kendaraanPaket: order.kendaraanPaket,
          pickupId: order.pickupId,
          pengembalianId: order.pengembalianId,
          tanggalPickup: order.tanggalPickup?.split("-").reverse().join("-"),
          waktuPickup: dateFilter.getTime(new Date()),
          tipePengiriman: order.tipePengiriman,
          // details: dataPackage.map((e) => {})
        };
      }
    }
  };

  useEffect(() => {
    const Processing = () => {
      if (order.detail.length > 0) {
        setDataPackage(order.detail);
      } else {
        message.info("Pengiriman tidak valid jika data yang dikirim 0", 3);
        setTimeout(() => {
          navigate(`/dashboard/pengiriman/newOrder`);
        }, 3000);
      }
    };
    Processing();
  }, [order]);

  useEffect(() => {
    if (dataPackage) {
      handleData();
    }
  }, [dataPackage]);

  // useEffect(() => {
  //   if (dataPackage?.find((item) => !item?.valid)) {
  //     message.info(
  //       "Ada Data yang tidak sesuai ketentuan, silahkan cek kembali",
  //       5
  //     );
  //     navigate(`/dashboard/pengiriman/secondOrder/${order.tipePengiriman}`);
  //   }
  // }, [dataPackage]);

  // var truth = dataPackage?.some(function (ref) {
  //   return ref.valid;
  // });

  const handleData = async () => {
    let cost = 0;
    if (dataPackage != null) {
      await dataPackage.forEach((item) => {
        cost += parseInt(item?.nilaiCod);
        // cost += parseInt(item?.nilaiBarang)
      });
      setPriview({
        ...preview,
        jumlahData: dataPackage.length,
        jumlahBiaya: cost,
        alamatLengkap: order.other1.alamatLengkap,
      });
    } else {
      message.info("Data tidak dapat diproses");
    }
  };

  return (
    <div className="flex-column-center">
      {/*  */}
      <br />
      <div className="flex-column-center w100 thirdOrder-head thirdOrder-container">
        <h1 style={color}>PRTINJAU PAKET</h1>
        <br />
        <p>
          Pastikan semua data sudah terisi benar. Kesalahan penulisan Alamat
          dapat mengakibatkan paket terkirim kembali ke anda
        </p>
      </div>
      <br />
      <br />
      {/*  */}
      <div className="flex-column-start w100 thirdOrder-body thirdOrder-container">
        <h1 style={color} className="w100 flex-center">
          DATA PICK UP
        </h1>
        <Space>
          <p className="w100px">Tipe Pick Up</p> <p>:</p>{" "}
          <p>{order.tipePickup}</p>
        </Space>
        <Space>
          <p className="w100px">Alamat Pickup</p> <p>:</p>{" "}
          <p>{preview.alamatLengkap}</p>
        </Space>
        <Space>
          <p className="w100px">Tanggal Pickup</p> <p>:</p>{" "}
          <p>{dateFilter.getFullDate(new Date(order.tanggalPickup))}</p>
        </Space>
      </div>
      <br /> <br />
      <div className="flex-column-start w100 thirdOrder-container">
        <h1 className="w100 flex-center">LIST OF PACKET</h1>
        <br />

        <Collapse accordion>
          {dataPackage ? (
            dataPackage.map((item, index) => {
              return (
                <Panel
                  header={
                    <div className="w100 flex-between">
                      <p>{item.namaPenerima}</p>
                      <p>{index + 1}</p>
                    </div>
                  }
                  key={index}
                >
                  <div className="flex-between w100 ">
                    <p className="font-12">Alamat : {item.alamatPenerima}</p>{" "}
                    <p className="font-12">
                      Tujuan : {item.originCode} - {item.destinationCode}{" "}
                    </p>
                  </div>
                  <div className="flex-between w100 ">
                    <p className="font-12">
                      Harga : {currency(item.nilaiCod, "Rp ")}
                    </p>{" "}
                    <p className="font-12">
                      Ongkir : {currency(item.nilaiOngkir, "Rp ")}{" "}
                    </p>
                  </div>
                </Panel>
              );
            })
          ) : (
            <MyLottie lottie={notFound} />
          )}
        </Collapse>
      </div>
      <br /> <br />
      <div className="flex-column-start w100 thirdOrder-body-second thirdOrder-container">
        <h1 style={color} className="w100 flex-center">
          DATA PAKET
        </h1>
        <br />

        <div className="flex-between w100">
          <div className="flex-column-center">
            <Space>
              <GiJigsawBox style={{ fontSize: 50, marginTop: -20 }} />{" "}
              <p style={{ fontSize: 20 }}>{preview.jumlahData}</p>
            </Space>
            <h1 style={{ color: "white", fontSize: 20 }}>Total Paket</h1>
          </div>
          <div className="flex-column-start w70">
            <Space>
              <h1 style={color}>PAKET {order.tipePengiriman}</h1>{" "}
              <h1 style={color}>:</h1>
              <h1 style={color}>{preview.jumlahData} PAKET</h1>
            </Space>
            <Space>
              <h1 style={color}>TOTAL {order.tipePengiriman}</h1>{" "}
              <h1 style={color}>:</h1>
              <h1 style={color}>{currency(preview.jumlahBiaya, "Rp ")}</h1>
            </Space>
            <Space>
              <h1 style={color}>TERBILANG</h1> <h1 style={color}>&nbsp;:</h1>
              <h1 style={color}>{numberToWord(preview.jumlahBiaya)} Rupiah</h1>
            </Space>
          </div>
        </div>
      </div>
      <br /> <br />
      <div className="flex-between thirdOrder-save">
        <b style={{ marginTop: 10 }}>Selesaikan Pesanan Pengiriman</b>{" "}
        <Button
          type="danger"
          disabled={condition.disabled}
          onClick={onFinish}
          loading={condition.loading}
        >
          Konfirmasi Pengiriman{" "}
        </Button>
      </div>
    </div>
  );
};

export default ThridOrder;
