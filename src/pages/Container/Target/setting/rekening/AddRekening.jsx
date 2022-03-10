import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Upload,
  Space,
  Image,
  message,
  InputNumber,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AkunCreateRekening } from "../../../../../api/AKUN";
import { GetBank } from "../../../../../api/BANK";
import { UserContext } from "../../../../../context/UserContextProvider";

const AddRekening = ({ AddRekening, getData }) => {
  const { addRek, setAddRek } = AddRekening;
  const { Dragger } = Upload;
  const [user, setUser] = useContext(UserContext);
  const { Option } = Select;
  const [edited, setEdited] = useState(true);
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const {
    isLoading: bankList_isLoading,
    data: bankList_data,
    isError: bankList_isError,
  } = useQuery(["Bank List"], GetBank);

  const onFinish = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("kodeBank", e.kodeBank[1]);
    formData.append("namaBank", e.kodeBank[0]);
    formData.append("namaRekening", e.namaRekening);
    formData.append("noRekening", e.nomorRekening);

    await AkunCreateRekening(user.idUser, formData)
      .then((res) => {
        setAddRek({
          ...addRek,
          modal: false,
        });
        message.success("Berhasil menambahkan rekening baru", 3);
        getData();
        setLoading(false);
      })
      .catch((error) => {
        message.error("Ocurrió un error en el servidor al iniciar sesión", 3);
        setLoading(false);
      });

    await setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangePhoto = (e) => {
    const reader = new FileReader();
    reader.onload = (base64) => {
      setUploadPhoto(base64.target.result);
    };

    reader.readAsDataURL(e.file.originFileObj);
  };

  return (
    <Form
      name="aldodevv"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 30 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      form={form}
    >
      <Form.Item
        label="Nama Bank"
        name="kodeBank"
        rules={[{ required: true, message: "Please input your Nama Bank!" }]}
      >
        <Select
          showSearch
          className="w100"
          size="large"
          placeholder="pilih bank Anda"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {bankList_data &&
            bankList_data.data.content.map((e, i) => (
              <Option key={i} value={[e.namaBank, e.kodeBank]}>
                {e.namaBank}
              </Option>
            ))}
          {bankList_isLoading && <Option disabled>Wait a Second</Option>}
          {bankList_isError && <Option disabled>Error</Option>}
        </Select>
      </Form.Item>
      <Form.Item
        label="Nama Rekening"
        name="namaRekening"
        rules={[
          { required: true, message: "Please input your Nama Rekening!" },
          { min: 4, message: "Minimal 4 karakter" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nomor Rekening"
        name="nomorRekening"
        rules={[
          { required: true, message: "Please input Nomor Rekening!" },
          { min: 8, message: "Minimal 8 karakter" },
        ]}
      >
        <Input type={"number"} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Foto Halaman Depan">
        {!edited ? (
          <Dragger
            action="#"
            listType="picture-card"
            multiple={false}
            onChange={onChangePhoto}
          >
            {console.log(uploadPhoto)}
            <Space>
              <Image
                className="profile-image"
                src={"https://joeschmoe.io/api/v1/random"}
              />

              {uploadPhoto !== null && (
                <>
                  <p style={{ color: "white" }}>from--------to</p>
                  <Image className="profile-image" src={uploadPhoto} />
                </>
              )}
            </Space>
            <p style={{ color: "white" }}>
              Click or drag file to this area to upload
            </p>
            <p style={{ color: "white" }}>
              Klik <b>Disini</b> untuk Upload Photo Atau Drag n Drop Photo{" "}
              <b>Disini</b>
            </p>
          </Dragger>
        ) : (
          <Image
            className="profile-image"
            src={"https://joeschmoe.io/api/v1/random"}
          />
        )}
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddRekening;
