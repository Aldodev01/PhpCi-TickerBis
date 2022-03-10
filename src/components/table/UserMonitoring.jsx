import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Table, Badge, Button, Modal, Drawer } from "antd";
import dateFilter from "../../utils/date/myDate";
import { If, IfElse } from "../../utils/condition/IfElseComponent";
import currency from "../../utils/currency/Currency";
import ReactToPrint from "react-to-print";
import { ImPrinter } from "react-icons/im";
import {
  IoPrintOutline,
  IoPrint,
  IoPrintSharp,
  IoHandLeft,
} from "react-icons/io5";
import Pdf from "../resource/PDF";

const UserMonitoring = ({ dataTable }) => {
  const { tableData, setTableData } = dataTable;

  const componentRef = createRef();

  //! COLUMNS TABLE
  const columns = [
    {
      title: "Nama",
      dataIndex: "namaPenerima",
      key: "namaPenerima",
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      width: 120,
    },
    {
      title: "No Resi",
      dataIndex: "resi",
      width: 120,
      key: "resi",
      render: (text, record, index) => {
        return (
          <Button
            type="danger"
            onClick={() => {
              window.open(
                `/tracking/expedition=9a3ec075-649c-4c70-82d5-9a56abc1d805&awb=${text}`,
                "_blank"
              );
            }}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: "Tanggal Input",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text, record, index) => {
        return <span>{dateFilter.basicDate(new Date(text)).upNormal}</span>;
      },
    },
    {
      title: "Tanggal POD",
      dataIndex: "tanggalPod",
      key: "tanggalPod",
      render: (text, record, index) => {
        return (
          <span>
            {text ? dateFilter.basicDate(new Date(text)).upNormal : ""}
          </span>
        );
      },
    },
    {
      title: "Status Pengiriman",
      dataIndex: "statusPengiriman",
      key: "statusPengiriman",
      render: (text, index, record) => {
        return (
          <span>
            <If condition={text == "NULL"}>Waiting For Pickup</If>
            <If condition={text == "PROCESS"}>Process</If>
            <If condition={text == "DELIVERED"}>Delivered</If>
            <If condition={text == "UNDELIVERED"}>Undelivered</If>
            <If condition={text == "RETURNED"}>Return to Shipper</If>
            <If condition={text == "CANCELED"}>Canceled</If>
            <IfElse condition={text == "PROBLEM"} children2={<b>Sontoloyo</b>}>
              Problem
            </IfElse>
          </span>
        );
      },
    },
    {
      title: "No Telepon",
      dataIndex: "telpPenerima",
      key: "telpPenerima",
      render: (text, index, record) => {
        if (text.includes("08")) {
          var asu = text.replace("08", "628");
        } else if (text.includes("+")) {
          var asu = text.replace("+", "");
        } else {
          var asu = text;
        }
        return (
          <a href={`https://wa.me/${asu}`} target={"_blank"}>
            {text}
          </a>
        );
      },
    },
    {
      title: "Tipe Pengiriman",
      dataIndex: "tipePengiriman",
      key: "tipePengiriman",
    },
    {
      title: "Lokasi Pickup",
      dataIndex: "labelPickup",
      key: "labelPickup",
    },
    {
      title: "Status Pembayaran",
      dataIndex: "statusPembayaran",
      key: "statusPembayaran",
      render: (text, record, index) => {
        return (
          <span
            style={{
              borderRadius: "10px",
              padding: "10px",
              color:
                text == "PAID"
                  ? "#00f281"
                  : text == "UNPAID"
                  ? "#f200a1"
                  : "black",
            }}
          >
            {record.tipePengiriman == "COD" && text == "PROCESS" ? "" : text}
          </span>
        );
      },
    },
    {
      title: "Alamat Penerima",
      dataIndex: "alamat",
      key: "alamat",
      width: 350,
      render: (text, record, index) => {
        return (
          <div>
            {record.alamatPenerima}
            <br />
            Kecamatan {`${record.kecamatanPenerima}, ${record.kotaPenerima}`}.
            Provinsi {record.provinsiPenerima} ({record.kodeposPenerima})
          </div>
        );
      },
    },
    {
      title: "Ongkir Normal",
      dataIndex: "nilaiOngkirSebelumDiskon",
      key: "nilaiOngkirSebelumDiskon",
      width: 150,
      render: (text, index, record) => {
        return (
          <div style={{ textAlign: "right" }}>
            {currency(text && text, "Rp ")}
          </div>
        );
      },
    },
    {
      title: "Ongkir Imezi",
      dataIndex: "nilaiOngkirSetelahDiskon",
      key: "nilaiOngkirSetelahDiskon",
      width: 150,
      render: (text, index, record) => {
        return (
          <div style={{ textAlign: "right" }}>
            {currency(text && text, "Rp ")}
          </div>
        );
      },
    },
    {
      title: "Nilai COD",
      dataIndex: "nilaiCod",
      key: "nilaiCod",
      width: 150,
      render: (text, index, record) => {
        return (
          <div style={{ textAlign: "right" }}>
            {currency(text && text, "Rp ")}
          </div>
        );
      },
    },
    {
      title: "Nett Seller",
      dataIndex: "nettSeller",
      key: "nettSeller",
      width: 150,
      render: (text, index, record) => {
        return (
          <div style={{ textAlign: "right" }}>
            {currency(text && parseInt(text), "Rp ")}
          </div>
        );
      },
    },
    {
      title: "Pod Image",
      dataIndex: "podImage",
      key: "podImage",
      width: 150,
      render: (text, index, record) => {
        return <a href="https://imezi.com">Link</a>;
      },
    },
  ];

  const data = [
    {
      key: 1,
      name: "John Brown sr.",
      age: 60,
      address: "New York No. 1 Lake Park",
      children: [
        {
          key: 11,
          name: "John Brown",
          age: 42,
          address: "New York No. 2 Lake Park",
        },
        {
          key: 12,
          name: "John Brown jr.",
          age: 30,
          address: "New York No. 3 Lake Park",
          children: [
            {
              key: 121,
              name: "Jimmy Brown",
              age: 16,
              address: "New York No. 3 Lake Park",
            },
          ],
        },
        {
          key: 13,
          name: "Jim Green sr.",
          age: 72,
          address: "London No. 1 Lake Park",
          children: [
            {
              key: 131,
              name: "Jim Green",
              age: 42,
              address: "London No. 2 Lake Park",
              children: [
                {
                  key: 1311,
                  name: "Jim Green jr.",
                  age: 25,
                  address: "London No. 3 Lake Park",
                },
                {
                  key: 1312,
                  name: "Jimmy Green sr.",
                  age: 18,
                  address: "London No. 4 Lake Park",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  function TreeData() {
    const [checkStrictly, setCheckStrictly] = useState({
      isModal: false,
      loading: false,
      data: null,
      jumlah: 0,
      check: false,
    });

    const handlingModal = () => {
      setCheckStrictly({
        ...checkStrictly,
        isModal: !checkStrictly.isModal,
      });
    };
    // rowSelection objects indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        setCheckStrictly({
          ...checkStrictly,
          data: selectedRows,
          jumlah: selectedRowKeys,
        });
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, "onselected: ", selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, "selectedAll: ", selectedRows, changeRows);
      },
    };
    let newData = tableData?.map((e, i) => ({
      ...e,
      key: i,
    }));

    return (
      <>
        <Drawer
          title="Pilih Ukuran yang Anda Butuhkan"
          placement={"bottom"}
          width={500}
          onClose={handlingModal}
          visible={checkStrictly.isModal}
        >
          <ReactToPrint
            trigger={() => (
              <Button
                style={{
                  position: "relative",
                }}
                type="primary"
                icon={<IoPrintSharp />}
              >
                Print Thermal 10x10
              </Button>
            )}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            <Pdf
              data={{ checkStrictly, setCheckStrictly }}
              ref={componentRef}
            />
            ;
          </div>
          <ReactToPrint
            trigger={() => (
              <Button
                style={{
                  position: "relative",
                }}
                type="primary"
                icon={<IoPrintSharp />}
              >
                Print Thermal 10x15
              </Button>
            )}
            content={() => componentRef.current}
          />
        </Drawer>
        {/* ================== */}
        <Button type="primary" onClick={handlingModal}>
          Go to Print
        </Button>
        <Badge.Ribbon text="Aldodevv Table 3.7.14" color="pink">
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection, checkStrictly }}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.namaPenerima}</p>
              ),
              rowExpandable: (record) => record.resi !== null,
            }}
            // dataSource={tableData}
            pagination={false}
            dataSource={tableData && newData}
            scroll={{ x: 2600 }}
          />
        </Badge.Ribbon>
      </>
    );
  }

  return <TreeData />;
};

export default UserMonitoring;
