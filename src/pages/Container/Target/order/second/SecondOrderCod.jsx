import React, { useEffect, useState } from "react";
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
} from "antd";
import { useNavigate } from "react-router-dom";
import "../order.less";
import UploadCsv from "../../../../../components/Upload/UploadCsv";
import { JSONOrderList } from "../../../../../json";
import { RiFolderWarningFill } from "react-icons/ri";
const { Option } = Select;
const { Step } = Steps;

const SecondOrderCod = () => {
  const [modal, setModal] = useState({
    visible: false,
  });

  const [dataPackageControl, setDataPackageControl] = useState({
    selected: 0,
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
  const onFinish = (values) => {
    console.log("values", values);
  };

  const [form] = Form.useForm();
  console.log(
    "NAMA PENERIMAA",
    dataPackage[dataPackageControl.selected].namaPenerima
  );

  useEffect(() => {
    form.resetFields();
  }, [dataPackage, dataPackageControl.selected]);

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

  console.log("dataPackage", dataPackage[dataPackageControl.selected]);
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
            title="Waiting"
            subTitle="Package Order"
            description="Isi Package Anda Terlebih Dahulu"
            onStepClick={() => {
              navigate("/dashboard/pengiriman/secondOrder");
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
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 36 }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <h1 style={{ fontSize: 20 }}>Data Penerima</h1>
            <Form.Item
              initialValue={
                dataPackage[dataPackageControl.selected].namaPenerima
              }
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
              <Input placeholder="Isi Nama Penerima" />
            </Form.Item>
            <Form.Item
              initialValue={
                dataPackage[dataPackageControl.selected].nomorTelpPenerima
              }
              name="noTelpPenerima"
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
              />
            </Form.Item>
            <Form.Item
              initialValue={
                dataPackage[dataPackageControl.selected].alamatPenerima
              }
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
              <Input.TextArea showCount maxLength={200} rows={4} />
            </Form.Item>
            <Form.Item
              initialValue={
                dataPackage[dataPackageControl.selected].kelurahanPenerima
              }
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
              <Input placeholder="Isi Kecamatan/ Kota/ Kodepos Penerima" />
            </Form.Item>
            <h1 style={{ fontSize: 20 }}>Data Paket</h1>
            <Form.Item
              initialValue={dataPackage[dataPackageControl.selected].beratPaket}
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
              />
            </Form.Item>
            <Form.Item
              initialValue={
                dataPackage[dataPackageControl.selected].deskripsiPaket
              }
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
              <Input placeholder="Isi Paket" />
            </Form.Item>
            <Form.Item
              initialValue={
                dataPackage[dataPackageControl.selected].pesanKhusus
              }
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
              initialValue={dataPackage[dataPackageControl.selected].nilaiCod}
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
              <Input addonBefore={prefixSelector3} placeholder="Nilai Cod" />
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
                Save to default setting
              </Checkbox>
            </Form.Item>
            <br />
            <br />

            <Button
              type="primary"
              htmlType="submit"
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
              onClick={() => {
                setDataPackageControl({
                  ...dataPackageControl,
                  selected: i,
                });
              }}
            >
              <div className="flex-between w100">
                <h3>
                  <strong>
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
                      style={{ color: "red", fontSize: 20 }}
                    />
                  </Tooltip>
                )}
              </div>
              <p style={{ marginTop: -10 }}>Rp. {e.nilaiCod}</p>
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
          onClick={() => {
            navigate("/dashboard/pengiriman/thirdOrder");
          }}
        >
          Simpan dan Lanjutkan
        </Button>
      </div>
      <UploadCsv
        proModal={{ modal, setModal }}
        data={{ dataPackage, setDataPackage }}
        inputPayload={{ inputer, setInputer }}
      />
    </div>
  );
};

export default SecondOrderCod;
