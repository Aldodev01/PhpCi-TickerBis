import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Upload,
  Space,
  Image,
  InputNumber,
  AutoComplete,
  message,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AkunCreateAddress } from "../../../../../api/AKUN";
import { GetBank } from "../../../../../api/BANK";
import { GetLocation, GetLocationByQuery } from "../../../../../api/EXPEDITION";
import { UserContext } from "../../../../../context/UserContextProvider";

const EditAdress = ({ editAddress }) => {
  const { Dragger } = Upload;
  const { addRek, setAddRek } = editAddress;
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [optionAddress, setOptionAddress] = useState([]);
  const [payload, setPayload] = useState({
    value: "",
  });

  const [selected, setSelected] = useState({
    kelurahan: "",
    kecamatan: "",
    kota: "",
    provinsi: "",
    negara: "",
    latitude: "",
    longitude: "",
  });
  const [form] = Form.useForm();

  const formData = new FormData();

  const isNullish = Object.values(selected).some((value) => {
    if (value == "") {
      return true;
    } else if (value == 0) {
      return true;
    }

    return false;
  });

  const onFinish = (values) => {
    if (isNullish == true) {
      formData.append("alamat", values.alamat);
      formData.append("kecamatan", selected.kecamatan);
      formData.append("kelurahan", selected.kelurahan);
      formData.append("kodePos", values.kodePos);
      formData.append("kota", selected.kota);
      formData.append("label", values.label);
      formData.append("latitude", 0);
      formData.append("longitude", 0);
      formData.append("nama", values.nama);
      formData.append("negara", selected.negara);
      formData.append("provinsi", selected.provinsi);
      formData.append("telp", values.telp);
      formData.append("telpToko", values.telpToko);
      AkunCreateAddress(user.idUser, formData)
        .then((res) => {
          console.log("RESPONSE", res);
          if (res.status == 200) {
            message.success("Berhasil menambahkan alamat", 5);
            form.resetFields();
            setAddRek(false);
          }
        })
        .catch((err) => {
          message.error(
            "Terjadi Kesalahan Pada Server, saat membuat alamat",
            5
          );
        });
    } else {
      message.error("Silahkan Lengkapi Alamat Anda Terlebih Dahulu");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.info("ʕ´•ᴥ•`ʔ", 5);
  };

  const onChangePhoto = (e) => {
    const reader = new FileReader();
    reader.onload = (base64) => {
      setUploadPhoto(base64.target.result);
    };

    reader.readAsDataURL(e.file.originFileObj);
  };

  const onSearchAlamat = (searchText) => {
    searchText.length > 3
      ? GetLocation(searchText)
          .then(async (res) => {
            await setOptionAddress(res.data.content);
          })
          .catch((err) => {
            message.error(
              "Terjadi Kesalahan Pada Server, saat mencari data lokasi",
              5
            );
          })
      : message.info(
          "Butuh 3 Character atau lebih untuk mendapatkan lokasi",
          5
        );
  };
  const onSelectAlamat = (data, i) => {
    console.log("data", data, i.needed);
    const result = i.needed;
    setSelected({
      ...selected,
      kelurahan: result[1],
      kecamatan: result[2],
      kota: result[3],
      provinsi: result[4],
      negara: result[5],
    });
  };

  const renderItem = (title, data, kodepos) => ({
    value: kodepos,
    needed: data,
    label: (
      <div key={data[1]} className="w100 flex-between">
        {title}
        <span>{data[0]}</span>
      </div>
    ),
  });

  const options = optionAddress.map((e, i) => {
    return {
      options: [
        renderItem(
          `Kel.${e.kelurahan}, Kec.${e.kecamatan}, Kota ${e.kota}, ${e.provinsi}`,
          [
            e.kodePos,
            e.kelurahan,
            e.kecamatan,
            e.kota,
            e.provinsi,
            e.negara,
            e.kodeOriginJne,
          ],
          e.kodePos
        ),
      ],
    };
  });

  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 30 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      form={form}
    >
      <Form.Item
        label="Nama Toko"
        name="label"
        rules={[
          { required: true, message: "Please input your label!" },
          { min: 3, message: "Minimal 5 karakter" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Kontak Hp/Wa Toko"
        name="telpToko"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 9, message: "Minimal 9 Angka" },
        ]}
      >
        <Input type={"number"} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Nama Petugas Gudang"
        name="nama"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 3, message: "Minimal 5 karakter" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Kontak Hp/Wa Petugas Gudang"
        name="telp"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 9, message: "Minimal 9 Angka" },
        ]}
      >
        <Input type={"number"} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Alamat Lengkap Gudang "
        name="alamat"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Kodepos Gudang"
        name="kodePos"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <AutoComplete
          options={options ? options : []}
          size="large"
          onSelect={onSelectAlamat}
          onSearch={onSearchAlamat}
          placeholder="input here"
        />
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit" disabled={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditAdress;
