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
import { JSONOrderList } from "../../../../../../json";
import { RiFolderWarningFill } from "react-icons/ri";
import { GetLocation } from "../../../../../../api/EXPEDITION";
import { OrderContext } from "../../../../../../context/OrderContextProvider";
const { Option } = Select;
const { Step } = Steps;

const SecondOrderNonCod = () => {
  const [modal, setModal] = useState({
    visible: false,
  });
  const [order, setOrder] = useContext(OrderContext);
  const [dataPackageControl, setDataPackageControl] = useState({
    selected: 0,
  });
  const [optionAddress, setOptionAddress] = useState([]);
  const [value, setValue] = useState("");
  const [getShipping, setGetShipping] = useState({
    layananPaket: "REG",
    kodePosAsal: "",
    kodePosTujuan: "",
    berat: "1",
  });

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
    nilaiBarang: 0,
    nilaiCod: 0,
    nilaiOngkir: 0,
    destinationCode: "",
    originCode: "",
    nomorTelpPenerima: "",
    pesanKhusus: "-",
    valid: false,
    isAsuransi: false,
    validAddress: "",
    asuransi: 0,
    codFee: 0,
    discPriceOngkir: 0,
    estimatedFrom: "0",
    estimatedThru: "0",
  });
  const [dataPackage, setDataPackage] = useState([inputer]);

  const navigate = useNavigate();

  const onSearch = (searchText) => {
    console.log("onSearch", searchText);
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const onChange = (data) => {
    console.log("onChange", data);
    setValue(data);
  };

  const onSelectAlamat = (data) => {
    dataPackage[dataPackageControl.selected].alamatPenerima = data;
  };

  const onChangeAlamat = (data) => {
    setValue(data);
  };
  const onSearchAlamat = (searchText) => {
    const dataSesaat = [];
    console.log("asds", searchText);
    searchText.length > 4 &&
      GetLocation(searchText)
        .then(async (res) => {
          console.log("ʕ´•ᴥ•`ʔ", res);
          await res.data.content.map((e) => {
            dataSesaat.push({
              value: `Kel.${e.kelurahan}, Kec.${e.kecamatan}, Kota ${e.kota}, ${e.provinsi} ${e.kodePos}`,
            });
          });
          await setOptionAddress(dataSesaat);
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

  useEffect(() => {
    form.resetFields();
  }, [dataPackageControl.selected]);

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
            title="Waiting NONCOD"
            subTitle="Package Order"
            description="Isi Package Anda Terlebih Dahulu"
            onStepClick={() => {
              navigate("/dashboard/pengiriman/secondOrder/NONCOD");
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
              isiPaket: dataPackage[dataPackageControl.selected].isiPaket,
              pesanKhusus: dataPackage[dataPackageControl.selected].pesanKhusus,
              nilaiCod: dataPackage[dataPackageControl.selected].nilaiCod,
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
                  min: 6,
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
                addonAfter={prefixSelector2}
                placeholder="Isi Berat Paket (Kg)"
                onChange={(e) => {
                  handleInput("beratPaket", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="isiPaket"
              label="Isi Paket"
              rules={[
                {
                  required: true,
                  message: "Tipe Pengiriman Anda",
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
              name="pesanKhusus"
              label="Instruksi Pengiriman"
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
              <Input.TextArea showCount maxLength={200} rows={4} />
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
              ]}
              hasFeedback
            >
              <Input
                addonBefore={prefixSelector3}
                placeholder="Nilai Cod"
                onChange={(e) => {
                  handleInput("nilaiCod", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              initialValue={
                dataPackage[dataPackageControl.selected].nilaiOngkir
              }
              name="nilaiOngkir"
              label="Ongkir Spesial Imezi"
              rules={[
                {
                  required: true,
                  message: "Ongkir Tidak Tersedia",
                },
              ]}
              hasFeedback
            >
              <Input
                disabled
                addonBefore={prefixSelector3}
                placeholder="Ongkir Spesial Imezi"
              />
            </Form.Item>
            <Form.Item
              initialValue={dataPackage[dataPackageControl.selected].codFee}
              name="codFee"
              label="Cod Fee - 2.5%"
              rules={[
                {
                  required: true,
                  message: "Cod Fee Tidak Tersedia",
                },
              ]}
              hasFeedback
            >
              <Input
                disabled
                addonBefore={prefixSelector3}
                placeholder="Ongkir Spesial Imezi"
              />
            </Form.Item>
            <Form.Item
              initialValue={dataPackage[dataPackageControl.selected].netSeller}
              name="netSeller"
              label="Nett Seller"
              rules={[
                {
                  required: true,
                  message: "Nett Seller Tidak Tersedia",
                },
              ]}
              hasFeedback
            >
              <Input
                disabled
                addonBefore={prefixSelector3}
                placeholder="Ongkir Spesial Imezi"
              />
            </Form.Item>
            <Form.Item
              initialValue={
                dataPackage[dataPackageControl.selected].estimatedFrom +
                " - " +
                dataPackage[dataPackageControl.selected].estimatedTo +
                " Hari"
              }
              name="estimated"
              label="Estimasi"
              rules={[
                {
                  required: true,
                  message: "Estimasi Tidak Tersedia",
                },
              ]}
              hasFeedback
            >
              <Input
                disabled
                addonBefore={prefixSelector3}
                placeholder="Ongkir Spesial Imezi"
              />
            </Form.Item>
            <Form.Item name="isAsuransi" label="Asuransi" hasFeedback>
              <Checkbox
              // onChange={() => {
              //   setRemember(!remember);
              // }}
              >
                Really you want to use Asurance ?
              </Checkbox>
            </Form.Item>
            <br />
            <br />

            <Button
              type="primary"
              className="w100"
              onClick={() => {
                navigate("/dashboard/pengiriman/secondOrder");
              }}
            >
              Submit
            </Button>
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
                {e.valid == false && (
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

export default SecondOrderNonCod;
