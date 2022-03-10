import React, { useContext, useEffect, useState } from "react";
import { SmileOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  Button,
  Checkbox,
  Divider,
  Space,
  Tooltip,
  Steps,
  AutoComplete,
  InputNumber,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import "../order.less";
import UploadCsv from "../../../../../../components/Upload/UploadCsv";
import { RiFolderWarningFill } from "react-icons/ri";
import { GetLocation } from "../../../../../../api/EXPEDITION";
import { OrderContext } from "../../../../../../context/OrderContextProvider";
import { GetShippingCost } from "../../../../../../api/SENDING";
import { UserContext } from "../../../../../../context/UserContextProvider";
import {
  patternAlphabet,
  patternEmail,
} from "../../../../../../utils/regExp/regExp";
const { Option } = Select;
const { Step } = Steps;

const SecondOrderCod = () => {
  const [modal, setModal] = useState({
    visible: false,
  });
  const [validate, setValidate] = useState(false);
  const [order, setOrder] = useContext(OrderContext);
  const [dataPackageControl, setDataPackageControl] = useState({
    selected: 0,
  });
  const [user, setUser] = useContext(UserContext);
  const [optionAddress, setOptionAddress] = useState([]);

  const [inputer, setInputer] = useState({
    alamatPenerima: "",
    beratPaket: 1,
    deskripsiPaket: "",
    jumlahPaket: 1,
    kelurahanPenerima: "",
    kodePaket: "REG",
    kodePosPenerima: "",
    layananPickup: "Reguler",
    namaPenerima: "",
    nettSeller: 0,
    nilaiCod: 0,
    nilaiBarang: 0,
    nilaiOngkir: 0,
    destinationCode: "",
    originCode: "",
    nomorTelpPenerima: "",
    pesanKhusus: "-",
    valid: false,
    isAsuransi: false,
    validAddress: "",
    asuransi: 0,
    codfee: 0,
    discPriceOngkir: 0,
    estimatedFrom: "0",
    estimatedThru: "0",
  });
  const [dataPackage, setDataPackage] = useState([inputer]);

  const navigate = useNavigate();

  const onSelectAlamat = (data) => {
    console.log(data);
    dataPackage[dataPackageControl.selected].alamatPenerima = data[0];
    dataPackage[dataPackageControl.selected].kodePosPenerima = data[1];
    dataPackage[dataPackageControl.selected].destinationCode = data[2];
    dataPackage[dataPackageControl.selected].kelurahanPenerima = data[3];
    dataPackage[dataPackageControl.selected].originCode =
      order.other1.originCode;
    ShippingCost(data[2]);
  };

  const onSearchAlamat = (searchText) => {
    const dataSesaat = [];
    searchText.length > 4 &&
      GetLocation(searchText)
        .then(async (res) => {
          console.log(res);
          await res.data.content.map((e) => {
            dataSesaat.push({
              value: [
                `Kel.${e.kelurahan}, Kec.${e.kecamatan}, Kota ${e.kota}, ${e.provinsi} ${e.kodePos}`,
                e.kodePos,
                e.kodeTarifJne,
                e.kelurahan,
              ],
            });
          });
          await setOptionAddress(dataSesaat);
        })
        .catch((err) => {
          message.error("ʕ´•ᴥ•`ʔ", 5);
        });
  };

  const ShippingCost = async (destination) => {
    await GetShippingCost(
      order.other1.expedisiId,
      dataPackage[dataPackageControl.selected].beratPaket,
      destination,
      order.other1.originCode,
      "REG"
    )
      .then((res) => {
        dataPackage[dataPackageControl.selected].nilaiOngkir =
          res.data.discPrice;
        dataPackage[dataPackageControl.selected].discPriceOngkir =
          res.data.discPrice;
        dataPackage[dataPackageControl.selected].estimatedFrom =
          res.data.etd_from;
        dataPackage[dataPackageControl.selected].estimatedThru =
          res.data.etd_thru;

        FormNettSeler();
      })
      .catch((err) => {
        message.error("ʕ´•ᴥ•`ʔ", 5);
      });
  };

  const onFinish = (e) => {
    setOrder({
      ...order,
      detail: dataPackage,
    });
    // form
    //   .validateFields()
    //   .then((values) => {
    //     // Submit values
    //     // submitValues(values);
    //     console.log("Success:", values);
    //   })
    //   .catch((errorInfo) => {});
    navigate("/dashboard/pengiriman/thirdOrder");
  };

  const [form] = Form.useForm();

  /**
   * !HANDLE INPUT DATA PACKAGE
   * @param {*name name Nama untuk setiap Input "ISTILAH"} name
   * @param {*value Value untuk setiap Nama} value
   * @see https://imezi-aldo.netlify.app
   * @author aldodevv
   */
  const handleInput = (name, value) => {
    let activePackageData = {
      ...dataPackage[dataPackageControl.selected],
    };
    activePackageData[name] = value;
    setDataPackage((oldData) => {
      oldData[dataPackageControl.selected] = activePackageData;
      return [...oldData];
    });
  };

  const resetForm = () => {
    form.resetFields();
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle style={{ color: "white" }}>
      <select
        style={{
          width: 70,
          color: "white",
          backgroundColor: "inherit",
          border: "none",
        }}
      >
        <option value="+62">+62</option>
        <option value="08">08</option>
      </select>
    </Form.Item>
  );
  const prefixSelector2 = (
    <Form.Item name="prefix" noStyle>
      <b style={{ color: "white" }}>Kg</b>
    </Form.Item>
  );
  const prefixSelector3 = (
    <Form.Item name="prefix" noStyle>
      <b style={{ color: "white" }}>Rp.</b>
    </Form.Item>
  );
  const isNullish = Object.values(
    dataPackage[dataPackageControl.selected]
  ).some((value) => {
    if (value == "") {
      return true;
    } else if (value == 0) {
      return true;
    }

    return false;
  });

  const FormAsuransi = async () => {
    let isAsuransi = dataPackage[dataPackageControl.selected].isAsuransi;
    let nilaiCod = dataPackage[dataPackageControl.selected].nilaiCod;
    let priceResult = 0;
    if (isAsuransi === true && nilaiCod > 0) {
      const priceProses = (0.2 / 100) * nilaiCod;
      priceResult = priceProses + 5000;
    }
    await handleInput("asuransi", parseInt(priceResult));
  };

  const FormCodFee = async () => {
    let nilaiCod = parseInt(dataPackage[dataPackageControl.selected].nilaiCod);
    let resultCodFee = (2 / 100) * nilaiCod;

    dataPackage[dataPackageControl.selected].codfee = resultCodFee;
  };

  const FormNettSeler = () => {
    let nilaiCod = parseInt(dataPackage[dataPackageControl.selected].nilaiCod);
    let discPrice = parseInt(
      dataPackage[dataPackageControl.selected].nilaiOngkir
    );
    let codFee = parseInt(dataPackage[dataPackageControl.selected].codfee);
    let priceNettSeler = nilaiCod - discPrice - codFee;

    handleInput("nettSeller", parseInt(priceNettSeler));
  };

  async function Checking(item) {
    if (!item.estimatedFrom) {
      return false;
    }
    if (!item.estimatedThru) {
      return false;
    }
    if (!item.beratPaket) {
      return false;
    }
    if (!item.jumlahPaket) {
      return false;
    }
    if (!item.pesanKhusus) {
      return false;
    }
    if (!item.deskripsiPaket) {
      return false;
    }
    if (item?.originCode?.length < 4) {
      return false;
    }
    if (item?.destinationCode?.length < 3) {
      return false;
    }
    if (item?.namaPenerima?.length < 3) {
      return false;
    }
    if (item?.nomorTelpPenerima?.length < 9) {
      return false;
    }
    let valid = true;

    for (let key in item) {
      //! CHECKING NILAICOD OR IS ASURANSI FIELD
      if (order.tipePengiriman === "NON COD") {
        if (key === "nilaiCod" || key === "isAsuransi") {
          if (item[key] === 0 || item[key] === "" || !item[key]) {
            valid = true;
            break;
          }
        }

        // if (!optionalField.includes(key)) {
        //   if (item[key] === 0 || item[key] === '0') {
        //       valid = true
        //       break
        //   }

        //   if (item[key] === '' || !item[key]) {
        //       valid = false
        //       break
        //   }

        //   if (item[key] === "" || item[key] === 0 || !item[key]) {
        //     valid = false;
        //     break;
        //   }
        // }
      }
      //! CHECKING IS ASURANSI FIELD
      if (order.tipePengiriman === "COD") {
        if (key === "isAsuransi") {
          if (item[key] === 0 || item[key] === "" || !item[key]) {
            valid = true;
            break;
          }
        }

        // if (!optionalField.includes(key)) {
        //   if (item[key] === "" || item[key] === 0 || !item[key]) {
        //     valid = false;
        //     break;
        //   }
        // }
      }
    }

    return valid;
  }

  useEffect(() => {
    form.resetFields();
  }, [dataPackageControl.selected]);

  useEffect(() => {
    if (order.pickupId == "") {
      message.info("Mohon Maaf Silahkan Mengulangi Step 1", 5);
      setTimeout(() => {
        navigate("/dashboard/pengiriman/newOrder");
      }, 5000);
    }
  }, [order]);

  useEffect(() => {
    async function Fetchdata() {
      const data = await dataPackage.map((e) => {
        Checking(e);
      });
    }
    Fetchdata();
  }, [dataPackage]);

  return (
    <div className="secondOrder-wrapper">
      <div className="flex-start w100">
        <Steps
          size="large"
          current={1}
          direction="vertical"
          status={isNullish ? "process" : "finish"}
          style={{ width: "100%", maxWidth: 300 }}
        >
          <Step
            title="Finish"
            description="Proses Pickup Selesai"
            onStepClick={() => {
              navigate("/dashboard/pengiriman/newOrder");
            }}
          />
          <Step
            title="Waiting COD"
            subTitle="Package Order"
            description="Isi Package Anda Terlebih Dahulu"
            onStepClick={() => {
              navigate("/dashboard/pengiriman/secondOrder/COD");
            }}
          />
          <Step
            title="Waiting"
            disabled={isNullish}
            description="This is a description."
            onStepClick={() => {
              navigate("/dashboard/pengiriman/thirdOrder");
            }}
          />
        </Steps>
        <div className="wrapperInput">
          <Form
            form={form}
            id="second-form"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 36 }}
            layout="vertical"
            initialValues={{
              namaPenerima:
                dataPackage[dataPackageControl.selected].namaPenerima,
              nomorTelpPenerima:
                dataPackage[dataPackageControl.selected].nomorTelpPenerima,
              alamatPenerima:
                dataPackage[dataPackageControl.selected].alamatPenerima,
              kelurahanPenerima:
                dataPackage[dataPackageControl.selected].kelurahanPenerima,
              beratPaket: dataPackage[dataPackageControl.selected].beratPaket,
              kodepaket: "REG",
              deskripsiPaket:
                dataPackage[dataPackageControl.selected].deskripsiPaket,
              jumlahPaket: dataPackage[dataPackageControl.selected].jumlahPaket,
              pesanKhusus: dataPackage[dataPackageControl.selected].pesanKhusus,
              nilaiCod: dataPackage[dataPackageControl.selected].nilaiCod,
              estimatedFrom:
                dataPackage[dataPackageControl.selected].estimatedFrom,
              estimatedThru:
                dataPackage[dataPackageControl.selected].estimatedThru,
              nilaiOngkir: dataPackage[dataPackageControl.selected].nilaiOngkir,
              isAsuransi: dataPackage[dataPackageControl.selected].isAsuransi,
            }}
            onFinish={onFinish}
          >
            <h1 style={{ fontSize: 20 }}>Data Penerima</h1>
            <Form.Item
              label="Nama Penerima"
              name="namaPenerima"
              rules={[
                {
                  required: true,
                  message: "Masukan Nama Penerima",
                },
                {
                  min: 4,
                  message: "Masukan Nama Penerima minimal 4 karakter",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Isi Nama Penerima"
                onChange={(e) => {
                  handleInput("namaPenerima", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="nomorTelpPenerima"
              label="Nomor Telepon"
              rules={[
                {
                  required: true,
                  message: "Masukan Nomor Telepon Penerima",
                },
              ]}
              hasFeedback
            >
              <Input
                type={"number"}
                min={0}
                size="large"
                className="w100"
                addonBefore={prefixSelector}
                placeholder="Isi Nomor Telepon Penerima"
                onChange={(e) => {
                  handleInput("nomorTelpPenerima", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="alamatPenerima"
              label="Alamat dan Panrokan Rumah"
              tooltip={{
                title: "Tooltip with customize icon",
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your Tipe Pickup!",
                },
              ]}
            >
              <Input.TextArea
                showCount
                maxLength={200}
                rows={4}
                onChange={(e) => {
                  handleInput("alamatPenerima", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="KelurahanPenerima"
              label="Kecamatan / Kota / Kode Pos"
              rules={[
                {
                  required: true,
                  message: "Tipe Pengiriman Anda",
                },
              ]}
              hasFeedback
            >
              <AutoComplete
                options={optionAddress}
                id="kelurahanPenerima"
                defaultValue={
                  dataPackage[dataPackageControl.selected].kelurahanPenerima
                }
                size="large"
                onSelect={onSelectAlamat}
                onSearch={onSearchAlamat}
                placeholder="input here"
              />
              {/* //         <Input placeholder="Isi Kecamatan/ Kota/ Kodepos Penerima" /> */}
            </Form.Item>
            <h1 style={{ fontSize: 20 }}>Data Paket</h1>
            <Form.Item
              name="beratPaket"
              label="Berat Paket"
              rules={[
                {
                  required: true,
                  message: "Tipe Pengiriman Anda",
                },
              ]}
              hasFeedback
            >
              <Input
                type={"number"}
                min={1}
                addonAfter={prefixSelector2}
                placeholder="Isi Berat Paket (Kg)"
                onChange={(e) => {
                  handleInput("beratPaket", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="deskripsiPaket"
              label="Isi Paket"
              tooltip={{
                title: `Isi Paket Berupa Barang yang Anda ingin kirim`,
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                {
                  required: true,
                  message: "Silahkan Masukan Isi Paket Anda",
                },
                {
                  min: 4,
                  message: "Masukan Isi Paket minimal 4 karakter",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Isi Paket"
                onChange={(e) => {
                  handleInput("isiPaket", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="jumlahPaket"
              label="Jumlah Paket"
              tooltip={{
                title: `Jumlah Paket yang dikirimkan minimal 1`,
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                {
                  required: true,
                  message: "Silahkan Masukan Jumlah Paket Anda",
                },
              ]}
              hasFeedback
            >
              <Input
                type={"number"}
                min={1}
                addonAfter={prefixSelector2}
                placeholder="Isi Jumlah Paket"
                onChange={(e) => {
                  handleInput("jumlahPaket", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="pesanKhusus"
              label="Instruksi Pengiriman"
              tooltip={{
                title: `Pesan Khusus untuk Kurir Jika tidak ada isi "-" saja `,
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                {
                  required: true,
                  message: "Silahkan Isi Pesan Khusus Anda",
                },
                {
                  max: 200,
                  message:
                    "Pesan yang disampaikan sudah mencapai batas maksimal",
                },
              ]}
            >
              <Input.TextArea showCount maxLength={205} rows={4} />
            </Form.Item>
            <h1 style={{ fontSize: 20 }}>Data Pengiriman</h1>
            <Form.Item
              name="nilaiCod"
              label="Nilai Cod"
              rules={[
                {
                  required: true,
                  message: "Nilai Cod Tidak Tersedia",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      parseInt(value) >
                      parseInt(
                        dataPackage[dataPackageControl.selected].nilaiOngkir
                      )
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Nilai Cod Harus Lebih Besar dari Kenyataan")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input
                type={"number"}
                addonBefore={prefixSelector3}
                placeholder="Nilai Cod"
                onChange={(e) => {
                  handleInput("nilaiCod", e.target.value);
                  if (e.target.value) {
                    FormCodFee();
                    FormNettSeler();
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="Ongkir Paket" hasFeedback>
              <Input
                addonBefore={prefixSelector3}
                placeholder="Ongkir"
                value={dataPackage[dataPackageControl.selected].nilaiOngkir}
              />
            </Form.Item>
            <Form.Item label="Cod Fee - 2.5%" hasFeedback>
              <Input
                addonBefore={prefixSelector3}
                placeholder="Ongkir"
                value={dataPackage[dataPackageControl.selected].codfee}
              />
            </Form.Item>
            <Form.Item label="Nett Seller" hasFeedback>
              <Input
                addonBefore={prefixSelector3}
                placeholder="Nett Seller"
                value={dataPackage[dataPackageControl.selected].nettSeller}
              />
            </Form.Item>
            <Form.Item label="Estimasi" hasFeedback>
              <Input
                placeholder="Estimasi Waktu Pengiriman"
                value={
                  dataPackage[dataPackageControl.selected].estimatedFrom +
                  " - " +
                  dataPackage[dataPackageControl.selected].estimatedThru +
                  " Hari"
                }
              />
            </Form.Item>
            <Form.Item name="isAsuransi" label="Asuransi" hasFeedback>
              <Checkbox
                checked={dataPackage[dataPackageControl.selected].isAsuransi}
                onChange={(e) => {
                  handleInput("isAsuransi", e.target.checked);
                  if (e.target.checked) {
                    FormAsuransi();
                  }
                }}
              >
                Really you want to use Asurance ?
              </Checkbox>
            </Form.Item>

            {dataPackage[dataPackageControl.selected].isAsuransi === true ? (
              <>
                <Form.Item label="Asuransi" hasFeedback>
                  <Input
                    disabled
                    addonBefore={prefixSelector3}
                    placeholder="Asuransi yang Tersedia"
                    value={dataPackage[dataPackageControl.selected].asuransi}
                  />
                </Form.Item>
                <Form.Item label="DIsclaimer">
                  <p style={{ color: "red" }}>
                    Jika nilai barang tidak diisi, maka tidak masuk asuransi
                    barang yang tidak di asuransi penggantian max 10x ongkir
                  </p>
                </Form.Item>
              </>
            ) : null}
            <br />
            <br />
          </Form>
        </div>
      </div>

      {/* right side */}
      <div className="wrapperInput" style={{ maxWidth: 350 }}>
        <Button
          type="primary"
          className="w100"
          onClick={() => {
            setModal({
              ...modal,
              visible: !modal.visible,
            });
          }}
        >
          Upload Sekaligus
        </Button>
        <div>
          <Space className="w100">
            <Divider orientation="left" plain>
              Jumlah Paket
            </Divider>
            <p style={{ marginRight: "auto", marginTop: 15 }}>
              {dataPackage.length}
            </p>
          </Space>
        </div>
        <div className="secondOrder-orderList">
          {dataPackage.map((e, i) => (
            <div
              className="secondOrder-listing"
              style={{
                border:
                  dataPackageControl.selected === i
                    ? "1px solid #f8f8ff"
                    : "1px solid #ed0678",
                backgroundColor:
                  dataPackageControl.selected === i ? "#ed0678" : "#f8f8ff",
              }}
              onClick={() => {
                setDataPackageControl({
                  ...dataPackageControl,
                  selected: i,
                });
              }}
            >
              <div className="flex-between w100">
                <h3>
                  <strong
                    style={{
                      color:
                        dataPackageControl.selected === i
                          ? "#f8f8ff"
                          : "#ed0678",
                    }}
                  >
                    {dataPackage[i].namaPenerima.length < 1
                      ? `Paket ${i + 1}`
                      : dataPackage[i].namaPenerima}
                  </strong>
                </h3>{" "}
                {!Checking(e) && (
                  <Tooltip
                    title="Check Kembali Data Inputan Anda, Pastikan dengan benar"
                    color={"#ed0678"}
                  >
                    <RiFolderWarningFill
                      style={{
                        color:
                          dataPackageControl.selected === i
                            ? "#f8f8ff"
                            : "#ed0678",
                        fontSize: 20,
                      }}
                    />
                  </Tooltip>
                )}
              </div>
              <p
                style={{
                  marginTop: -10,
                  color:
                    dataPackageControl.selected === i ? "#f8f8ff" : "#ed0678",
                }}
              >
                Rp. {e.nilaiCod}
              </p>
            </div>
          ))}

          <Button
            danger
            style={{ marginTop: "auto" }}
            className="w100"
            onClick={() => {
              let newData = [...dataPackage];
              newData.push(inputer);
              setDataPackage(newData);
            }}
          >
            Tambah Paket
          </Button>
        </div>
        <Button
          className="w100"
          size="large"
          type="danger"
          onClick={onFinish}
          // onClick={() => {
          //   navigate("/dashboard/pengiriman/thirdOrder");
          // }}
        >
          Simpan dan Lanjutkan
        </Button>
      </div>
      <UploadCsv
        proModal={{ modal, setModal }}
        data={{ dataPackage, setDataPackage }}
        inputPayload={{ inputer, setInputer }}
        reset={resetForm}
      />
    </div>
  );
};

export default SecondOrderCod;
