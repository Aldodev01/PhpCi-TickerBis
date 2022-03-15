import {
  Steps,
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,
  Slider,
  Stepper,
  Switch,
  Toast,
  Picker,
} from "antd-mobile";
import React, { useState, useEffect } from "react";
import Navbar from "../../../../../../components/mobile/Navbar/Navbar";
import "../M_Order.less";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { GiJigsawBox } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import { ExpeditionGet } from "../../../../../../api/EXPEDITION";
import { getFrist2 } from "../../../../../../utils/date/SummaryDate";
import { Select } from "antd";
const M_FirstOrder = () => {
  const { Option } = Select;

  const [expedisi, setExpedisi] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [visible, setVisible] = useState({
    picker: false,
    value: "",
  });
  const [form] = Form.useForm();
  const { Step } = Steps;
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

  const basicColumns = [[{ label: "周一", value: "" }]];

  const onFinish = (values) => {
    Dialog.alert({
      content: JSON.stringify(values),
    });
  };

  const handlePicker = () => {
    setVisible({
      ...visible,
      picker: !visible.picker,
    });
  };

  useEffect(() => {
    ExpeditionGet()
      .then((res) => {
        setExpedisi(res.data.content);
      })
      .catch((err) => {
        Toast.show({
          content: "Настана грешка при преземањето на податоците за превоз",
          afterClose: () => {
            console.log("after");
          },
        });
      });
  }, []);

  return (
    <>
      <Navbar title={"Home"} cancel={true} />
      <div className="w100 padding10">
        <div className="w100 mt80 mb80">
          <div className="w100 m-order-head container-2-wrap padding10">
            <Steps
              current={1}
              style={{
                "--title-font-size": "14px",
                "--description-font-size": "15px",
                "--indicator-margin-right": "12px",
                "--icon-size": "20px",
              }}
            >
              <Step title="Pickup Order" icon={<MdOutlineEditLocationAlt />} />
              <Step
                title="Package Order"
                icon={<GiJigsawBox />}
                status="wait"
              />
              <Step title="Preview Order" status="wait" icon={<FaRegEye />} />
            </Steps>
          </div>
          <br />
          <br />
          <div className="w100 flex-column-start padding10 container-2-wrap">
            <br />
            <br />

            <h1>Pengiriman</h1>
            <Form
              onFinish={onFinish}
              form={form}
              footer={
                <Button block type="submit" color="primary" size="large">
                  Lanjutkan
                </Button>
              }
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
                <Button onClick={handlePicker}>Pilih Expedisi</Button>
                <Picker
                  columns={basicColumns}
                  visible={visible.picker}
                  onClose={handlePicker}
                  cancelText="Batal"
                  okt
                  value={"vvv"}
                  onConfirm={(v) => {
                    setVisible({
                      ...visible,
                      value: v,
                    });
                  }}
                />
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
                name="birthday"
                label="生日"
                trigger="onConfirm"
                onClick={() => {
                  setPickerVisible(true);
                }}
              >
                <DatePicker
                  visible={pickerVisible}
                  onClose={() => {
                    setPickerVisible(false);
                  }}
                ></DatePicker>
              </Form.Item>
              <Form.Item name="favoriteFruits" label="喜爱的水果">
                <Selector
                  columns={3}
                  multiple
                  options={[
                    { label: "苹果", value: "apple" },
                    { label: "橘子", value: "orange" },
                    { label: "香蕉", value: "banana" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="slider-demo" label="滑块选择">
                <Slider ticks step={10} />
              </Form.Item>
              <Form.Item
                initialValue={0}
                rules={[
                  {
                    max: 5,
                    min: 1,
                    type: "number",
                  },
                ]}
                name="stepper-demo"
                label="数量"
              >
                <Stepper />
              </Form.Item>
              <Form.Item name="disabledField" label="禁用" disabled>
                <Input placeholder="禁止输入" />
              </Form.Item>
            </Form>

            <Form
              layout="horizontal"
              footer={
                <Button block type="submit" color="primary" size="large">
                  提交
                </Button>
              }
            >
              <Form.Header>水平布局</Form.Header>
              <Form.Item
                name="name"
                label="姓名"
                rules={[{ required: true, message: "姓名不能为空" }]}
              >
                <Input onChange={console.log} placeholder="请输入姓名" />
              </Form.Item>
              <Form.Item name="address" label="地址" help="详情地址">
                <TextArea
                  placeholder="请输入地址"
                  maxLength={100}
                  rows={2}
                  showCount
                />
              </Form.Item>
              <Form.Item
                name="amount"
                label="数量"
                childElementPosition="right"
              >
                <Stepper />
              </Form.Item>
              <Form.Item
                name="delivery"
                label="送货上门"
                childElementPosition="right"
              >
                <Switch />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default M_FirstOrder;
