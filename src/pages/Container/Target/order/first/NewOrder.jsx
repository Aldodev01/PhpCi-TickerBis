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
import { getFirst } from "../../../../../utils/date/SummaryDate";
import { PickupGet } from "../../../../../api/PICKUP";
import { UserContext } from "../../../../../context/UserContextProvider";
const { Option } = Select;
const { Step } = Steps;
const NewOrder = () => {
  const [user, setUser] = useContext(UserContext);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [dataOrder, setDataOrder] = useState({
    ekspedisi: "JNE",
    tipePengiriman: "COD",
    tanggalPickup: getFirst,
    kendaraanPaket: "MOTOR",
    pengembalianId: "",
    tipePickup: "Pickup",
    alamatPickup: {
      id: "",
      kodePos: "",
    },
  });

  const handleChange = (e) => {
    setDataOrder({
      ...dataOrder,
      alamatPickup: {
        id: address[e].id,
        kodePos: address[e].kodePos.trim(),
      },
    });
  };
  const isNullish = Object.values(dataOrder).some((value) => {
    if (!value) {
      return true;
    }
    return false;
  });

  function checkProperties(obj) {
    for (var key in obj) {
      console.log(key);
      if (obj[key] !== null && obj[key] != "") return false;
    }
    return true;
  }

  const onFinish = (values) => {
    console.log("values", values);
    navigate("/dashboard/pengiriman/secondOrder");
    setDataOrder({
      ...values,
      tanggalPickup: getFirst,
    });
  };

  useEffect(() => {
    form.resetFields();
  }, [dataOrder]);

  useEffect(() => {
    if (user.idUser) {
      PickupGet(user.idUser, 5)
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

  console.log("address", address);
  const handleTelegramResponse = (response) => {
    console.log(response);
  };

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
                defaultValue={"JNE"}
                placeholder="Ekspedisi"
                onChange={(e) => {
                  setDataOrder({
                    ...dataOrder,
                    ekspedisi: e,
                  });
                }}
              >
                <Option value="JNE">JNE</Option>
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
                <Option value="Pickup">Pick up</Option>
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
                defaultValue={dataOrder != null && 0}
              >
                {address !== null &&
                  address.map((item, index) => (
                    <Option value={index}>{item.label}</Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Tanggal Penjemputan">
              <DatePicker
                placeholder={getFirst}
                format="DD-MM-YYYY"
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
