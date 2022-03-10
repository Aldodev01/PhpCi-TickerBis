import React, { useContext, useEffect, useState } from "react";
import { SmileOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  InputNumber,
  Mentions,
  Button,
  Checkbox,
  Space,
  Menu,
  Steps,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import "../order.less";
import { getFirst, getFrist2 } from "../../../../../../utils/date/SummaryDate";
import { PickupGet } from "../../../../../../api/PICKUP";
import { UserContext } from "../../../../../../context/UserContextProvider";
import { OrderContext } from "../../../../../../context/OrderContextProvider";
import { GetAddressFrom } from "../../../../../../api/SENDING";
import { ExpeditionGet } from "../../../../../../api/EXPEDITION";
const { Option } = Select;
const { Step } = Steps;
const NewOrder = () => {
  const [user, setUser] = useContext(UserContext);
  const [order, setOrder] = useContext(OrderContext);
  const [address, setAddress] = useState(null);
  const [expedisi, setExpedisi] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [dataOrder, setDataOrder] = useState({
    ekspedisi: "JNE",
    tipePengiriman: "COD",
    tanggalPickup: getFrist2,
    kendaraanPaket: "MOTOR",
    pengembalianId: "",
    tipePickup: "Pick Up",
    alamatPickup: {
      id: "",
      kodePos: "",
    },
  });

  function disabledDate(current) {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    // Can not select days before today and today
    return current && current < date;
  }
  const handleChange = (e) => {
    setDataOrder({
      ...dataOrder,
      alamatPickup: {
        id: e[2],
        kodePos: e[4]?.trim(),
      },
    });

    setOrder({
      ...order,
      pickupId: e[2],
      pengembalianId: e[2],
      other1: {
        ...order.other1,
        kodePosAsal: e[4]?.trim(),
        originCode: e[5],
        kecamatanAsal: e[3],
        alamatId: e[2],
        alamatLengkap: e[1],
      },
    });
  };
  const isNullish = Object.values(dataOrder).some((value) => {
    if (!value) {
      return true;
    }
    return false;
  });
  console.log(order);
  function checkProperties(obj) {
    for (var key in obj) {
      console.log(key);
      if (obj[key] !== null && obj[key] != "") return false;
    }
    return true;
  }

  const onFinish = (values) => {
    console.log("values", values);
    setDataOrder({
      ...values,
      tanggalPickup: getFirst,
    });

    setOrder({
      ...order,
      tanggalPickup: dataOrder.tanggalPickup,
      kendaraanPaket: values.kendaraan,
      tipePengiriman: dataOrder.tipePengiriman,
      other1: {
        ...order.other1,
        expedisiId: expedisi[0].id,
      },
      tipePickup: values.tipePickup,
    });
    if (values.tipePengiriman === "COD") {
      navigate(`/dashboard/pengiriman/secondOrder/COD`);
    } else {
      navigate(`/dashboard/pengiriman/secondOrder/NONCOD`);
    }
  };

  const onChangeExpedisi = (e) => {
    setOrder({
      ...order,
      other1: {
        ...order.other1,
        expedisiId: expedisi[e].id,
      },
    });
  };

  useEffect(() => {
    form.resetFields();
  }, [dataOrder]);

  useEffect(() => {
    if (user.idUser) {
      GetAddressFrom(user.idUser)
        .then((res) => {
          setAddress(res.data.content);
        })
        .catch((err) => {
          message.error(
            "Настана грешка при преземањето на податоците за подигање"
          );
        });
    }
  }, [user]);

  useEffect(() => {
    ExpeditionGet()
      .then((res) => {
        setExpedisi(res.data.content);
      })
      .catch((err) => {
        message.error(
          "Настана грешка при преземањето на податоците за превоз",
          3
        );
      });
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 30 }}>Pengiriman</h1>
      <div className="flex-start w100">
        <Steps
          size="large"
          current={0}
          direction="vertical"
          status={isNullish ? "process" : "finish"}
          style={{ width: "100%", maxWidth: 300 }}
        >
          <Step
            title="In Progress"
            subTitle="Pickup Order"
            description="Isi Pickup Anda Terlebih Dahulu"
            onStepClick={() => {
              navigate("/dashboard/pengiriman/newOrder");
            }}
          />
          <Step
            title="Waiting"
            description="This is a description."
            disabled={isNullish}
            onStepClick={() => {
              navigate("/dashboard/pengiriman/secondOrder");
            }}
          />
          <Step
            title="Waiting"
            disabled
            description="This is a description."
            onStepClick={() => {
              navigate("/dashboard/pengiriman/thirdOrder");
            }}
          />
        </Steps>

        <div className="wrapperInput">
          <br />
          <br />
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 36 }}
            layout="horizontal"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              initialValue={dataOrder.ekspedisi}
              name="ekspedisi"
              label="Ekspedisi"
              rules={[
                {
                  required: true,
                  message: "Pilih Ekspedisi Anda",
                },
              ]}
              hasFeedback
            >
              <Select
                size="large"
                defaultValue={0}
                placeholder="Ekspedisi"
                onChange={onChangeExpedisi}
              >
                {expedisi ? (
                  expedisi.map((e, i) => <Option value={i}>{e.nama}</Option>)
                ) : (
                  <Option value={0} disabled>
                    Loading ...
                  </Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item
              initialValue={dataOrder.tipePengiriman}
              name="tipePengiriman"
              label="Tipe Pengiriman"
              rules={[
                {
                  required: true,
                  message: "Tipe Pengiriman Anda",
                },
              ]}
              hasFeedback
            >
              <Select
                size="large"
                defaultValue={dataOrder.tipePengiriman}
                placeholder="Tipe Pengiriman"
                onChange={(e) => {
                  setDataOrder({
                    ...dataOrder,
                    tipePengiriman: e,
                  });
                }}
              >
                <Option value="COD">COD</Option>
                <Option value="NON COD">NON COD</Option>
              </Select>
            </Form.Item>

            <Form.Item
              initialValue={dataOrder.tipePickup}
              name="tipePickup"
              label="Tipe Pickup"
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
              <Select
                size="large"
                defaultValue={dataOrder.tipePickup}
                placeholder="Tipe Pengiriman"
              >
                <Option value="Pick Up">Pick up</Option>
              </Select>
            </Form.Item>
            <Form.Item
              // initialValue={dataOrder.alamatPickup}
              // name="alamatPickup"
              label="Alamat Pickup"
              tooltip={{
                title: "Tooltip with customize icon",
                icon: <InfoCircleOutlined />,
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your Alamat Pickup!",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Tipe Pengiriman"
                onChange={handleChange}
              >
                {address !== null ? (
                  address.map((e, index) => (
                    <Option
                      value={[
                        e.label,
                        `${e.alamat} Kel.${e.kelurahan}, Kec.${e.kecamatan}, ${e.kota}, ${e.provinsi}, ${e.kodePos}`,
                        e.id,
                        e.kecamatan,
                        e.kodePos,
                        e.originCode,
                      ]}
                    >
                      {e.label}
                    </Option>
                  ))
                ) : (
                  <Option value={0}>Loading...</Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item label="Tanggal Penjemputan">
              <DatePicker
                placeholder={getFrist2}
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                size="large"
                onChange={(date, dateString) => {
                  setDataOrder({
                    ...dataOrder,
                    tanggalPickup: dateString,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              initialValue={dataOrder.kendaraanPaket}
              name="kendaraan"
              label="Kendaraan"
              rules={[
                {
                  required: true,
                  message: "Tipe Pengiriman Anda",
                },
              ]}
              hasFeedback
            >
              <Select
                defaultValue="MOTOR"
                size="large"
                onChange={(e) => {
                  setDataOrder({
                    ...dataOrder,
                    kendaraanPaket: e,
                  });
                }}
              >
                <Option value="MOTOR">MOTOR</Option>
                <Option value="MOBIL">MOBIL</Option>
                <Option value="TRUCK">TRUCK</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="Save as Default Setting"
              label="Save as Default Setting"
              hasFeedback
            >
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

            <Button type="primary" htmlType="submit" className="w100">
              Lanjutkan
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
