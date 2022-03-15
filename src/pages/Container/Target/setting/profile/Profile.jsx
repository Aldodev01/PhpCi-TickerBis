import {
  Avatar,
  Button,
  Form,
  Image,
  Input,
  message,
  Radio,
  Space,
  Tooltip,
  Upload,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthGetAccount } from "../../../../../api/AUTH_API";
import { UserContext } from "../../../../../context/UserContextProvider";
import "./Profile.less";
import { VscCheckAll } from "react-icons/vsc";
import { RiCloseFill } from "react-icons/ri";
import { AkunEditProfile } from "../../../../../api/AKUN";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [dataAccount, setDataAccount] = useState(null);
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [dataDetailUser, setDataDetailUser] = useState({});
  const [edited, setEdited] = useState(true);
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const navigate = useNavigate();

  const onFinish = (e) => {
    const formData = new FormData();
    formData.append("nama", e.nama);
    formData.append("nomorKtp", e.nomorKtp);
    formData.append("npwp", e.npwp);
    formData.append("fotoSelfie", e.fotoSelfie);

    console.log("valus", e);
    console.log("FORMSDATA", formData);

    AkunEditProfile(user.idUser, formData)
      .then((res) => {
        console.log("WE DID IT", res);
      })
      .catch((err) => {
        message.error("Ocurrió un error en el servidor al iniciar sesión", 3);
      });
  };

  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
  };

  useEffect(() => {
    const result = AuthGetAccount()
      .then((res) => {
        setDataAccount(res.data);
        res.data.user.map((e) => {
          setDataDetailUser(e);
        });
      })
      .catch((err) => {
        message.error("Ocurrió un error en el servidor al iniciar sesión");
        localStorage.clear();
        navigate("/");
      });
  }, []);

  console.log("dataAccount", dataAccount, dataDetailUser);

  const onChangePhoto = (e) => {
    const reader = new FileReader();
    reader.onload = (base64) => {
      setUploadPhoto(base64.target.result);
    };

    reader.readAsDataURL(e.file.originFileObj);
  };
  return (
    <div>
      {dataAccount !== null ? (
        <>
          <div className="flex-between w100">
            <Tooltip
              title={
                dataAccount.enabled
                  ? "Your Account has been Verified"
                  : "Your account hasn't Verified !"
              }
              color={!dataAccount.enabled ? "#ed0678" : "#1ec9ff"}
            >
              <div className="profile-profile">
                <Avatar
                  size="large"
                  style={{ marginTop: -20 }}
                  src={
                    dataAccount.fotoSelfie
                      ? "https://joeschmoe.io/api/v1/random"
                      : "https://joeschmoe.io/api/v1/random"
                  }
                />
                <h1 style={{ color: "white" }}>{dataAccount.nama}</h1>
                {dataAccount.enabled ? (
                  <VscCheckAll className="profile-checked profile-icon" />
                ) : (
                  <RiCloseFill className="profile-notchecked profile-icon" />
                )}
              </div>
            </Tooltip>
            <Button
              type="primary"
              onClick={() => {
                setEdited(!edited);
              }}
            >
              Edit ?
            </Button>
          </div>

          <br />
          <br />
          <div className="wrapperInput">
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
                initialValue={dataAccount.nama}
                name="nama"
                label="Nama"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <VscCheckAll />,
                }}
              >
                <Input size="large" disabled={edited} />
              </Form.Item>
              <Form.Item
                initialValue={dataAccount.nomorKtp}
                name="nomorKtp"
                label="Nomor KTP"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <VscCheckAll />,
                }}
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Nomor KTP",
                  },
                ]}
              >
                <Input size="large" disabled={edited} />
              </Form.Item>
              <Form.Item
                initialValue={dataAccount.tipeAkun}
                name="tipeAkun"
                label="Tipe Akun"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <VscCheckAll />,
                }}
              >
                <Radio.Group onChange={onChangeRadio} disabled={edited}>
                  <Radio.Button value="Bisnis">Bisnis</Radio.Button>
                  <Radio.Button value="Personal">Personal</Radio.Button>
                  <Radio.Button value="Aldodevv" disabled>
                    Aldodevv
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                initialValue={dataAccount.kodeToko}
                name="kodeToko"
                label="Kode Toko"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <VscCheckAll />,
                }}
              >
                <Input size="large" disabled={edited} />
              </Form.Item>
              <Form.Item
                initialValue={dataAccount.user[0].nohp}
                name="nohp"
                label="No. Telp (WA)"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <VscCheckAll />,
                }}
              >
                <Input size="large" disabled={edited} />
              </Form.Item>
              <Form.Item
                initialValue={dataAccount.user[0].email}
                name="email"
                label="Email"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <VscCheckAll />,
                }}
              >
                <Input size="large" disabled={edited} />
              </Form.Item>
              <Form.Item
                initialValue={dataAccount.npwp}
                name="npwp"
                label="NPWP"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <VscCheckAll />,
                }}
              >
                <Input size="large" disabled={edited} />
              </Form.Item>
              <Form.Item
                initialValue={dataAccount.fotoSelfie}
                name="fotoSelfie"
                label="Foto Selfie"
                tooltip={{
                  title: "Tooltip with customize icon",
                  icon: <VscCheckAll />,
                }}
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Foto ",
                  },
                ]}
              >
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
                        src={
                          dataAccount.fotoSelfie
                            ? "https://joeschmoe.io/api/v1/random"
                            : "https://picsum.photos/seed/random/900"
                        }
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
                      Klik <b>Disini</b> untuk Upload Photo Atau Drag n Drop
                      Photo <b>Disini</b>
                    </p>
                  </Dragger>
                ) : (
                  <Image
                    className="profile-image"
                    src={
                      dataAccount.fotoSelfie
                        ? "https://joeschmoe.io/api/v1/random"
                        : "https://picsum.photos/seed/random/900"
                    }
                  />
                )}
              </Form.Item>

              <p style={{ color: "@error-color" }}>Tanda * Wajib Diisi</p>
              <Button
                type="primary"
                htmlType="submit"
                className="w100"
                disabled={edited}
              >
                Lanjutkan
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Profile;
