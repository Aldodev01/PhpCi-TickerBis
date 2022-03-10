// import React, { useState } from 'react';
// import {
//   Form,
//   Input,
//   Select,
//   Button,
//   Checkbox,
//   Divider,
//   Space,
//   Tooltip,
// } from "antd";

// const SeconOrderForm = () => {

//   const [form] = Form.useForm();

//   useState(() => {
//     form.resetFields();
//   }, [dataPackage, dataPackageControl.selected]);
//   return  <Form
//   form={form}
//   labelCol={{ span: 10 }}
//   wrapperCol={{ span: 36 }}
//   layout="vertical"
//   initialValues={{ remember: true }}
//   onFinish={onFinish}
// >
//   <h1 style={{ fontSize: 20 }}>Data Penerima</h1>
//   <Form.Item
//     label="Nama Penerima"
//     name="namaPenerima"
//     rules={[
//       {
//         required: true,
//         message: "Masukan Nama Penerima",
//       },
//       {
//         min: 6,
//         message: "Masukan Nama Penerima minimal 4 karakter",
//       },
//     ]}
//     hasFeedback
//   >
//     <Input placeholder="Isi Nama Penerima" />
//   </Form.Item>
//   <Form.Item
//     name="noTelpPenerima"
//     label="Nomor Telepon"
//     rules={[
//       {
//         required: true,
//         message: "Masukan Nomor Telepon Penerima",
//       },
//     ]}
//     hasFeedback
//   >
//     <Input
//       addonBefore={prefixSelector}
//       placeholder="Isi Nomor Telepon Penerima"
//       style={{
//         width: "100%",
//       }}
//       value={dataPackage[dataPackageControl.selected].namaPenerima}
//     />
//   </Form.Item>
//   <Form.Item
//     name="alamatPenerima"
//     label="Alamat dan Panrokan Rumah"
//     tooltip={{
//       title: "Tooltip with customize icon",
//       icon: <InfoCircleOutlined />,
//     }}
//     rules={[
//       {
//         required: true,
//         message: "Please input your Tipe Pickup!",
//       },
//     ]}
//   >
//     <Input.TextArea showCount maxLength={200} rows={4} />
//   </Form.Item>
//   <Form.Item
//     name="kecamatanPenerima"
//     label="Kecamatan / Kota / Kode Pos"
//     rules={[
//       {
//         required: true,
//         message: "Tipe Pengiriman Anda",
//       },
//     ]}
//     hasFeedback
//   >
//     <Input placeholder="Isi Kecamatan/ Kota/ Kodepos Penerima" />
//   </Form.Item>
//   <h1 style={{ fontSize: 20 }}>Data Paket</h1>
//   <Form.Item
//     name="beratPaket"
//     label="Berat Paket"
//     rules={[
//       {
//         required: true,
//         message: "Tipe Pengiriman Anda",
//       },
//     ]}
//     hasFeedback
//   >
//     <Input
//       addonAfter={prefixSelector2}
//       placeholder="Isi Berat Paket (Kg)"
//       style={{
//         width: "100%",
//       }}
//     />
//   </Form.Item>
//   <Form.Item
//     name="isiPaket"
//     label="Isi Paket"
//     rules={[
//       {
//         required: true,
//         message: "Tipe Pengiriman Anda",
//       },
//     ]}
//     hasFeedback
//   >
//     <Input placeholder="Isi Paket" />
//   </Form.Item>
//   <Form.Item
//     name="pesanKhusus"
//     label="Instruksi Pengiriman"
//     tooltip={{
//       title: "Tooltip with customize icon",
//       icon: <InfoCircleOutlined />,
//     }}
//     rules={[
//       {
//         required: true,
//         message: "Please input your Tipe Pickup!",
//       },
//     ]}
//   >
//     <Input.TextArea showCount maxLength={200} rows={4} />
//   </Form.Item>
//   <h1 style={{ fontSize: 20 }}>Data Pengiriman</h1>
//   <Form.Item
//     name="nilaiOngkir"
//     label="Ongkir Spesial Imezi"
//     rules={[
//       {
//         required: true,
//         message: "Ongkir Tidak Tersedia",
//       },
//     ]}
//     hasFeedback
//   >
//     <Input
//       disabled
//       addonBefore={prefixSelector3}
//       placeholder="Ongkir Spesial Imezi"
//       style={{
//         width: "100%",
//       }}
//     />
//   </Form.Item>
//   <Form.Item name="isAsuransi" label="Asuransi" hasFeedback>
//     <Checkbox
//     // onChange={() => {
//     //   setRemember(!remember);
//     // }}
//     >
//       Save to default setting
//     </Checkbox>
//   </Form.Item>
//   <br />
//   <br />

//   <Button
//     type="primary"
//     htmlType="submit"
//     className="w100"
//     onClick={() => {
//       navigate("/dashboard/pengiriman/secondOrder");
//     }}
//   >
//     Submit
//   </Button>
// </Form>;
// };

// export default SeconOrderForm;
