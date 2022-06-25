import {
  DatePicker,
  Input,
  message,
  Pagination,
  Space,
  Table,
  Button,
  Tooltip,
  Drawer,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ExpeditionGet } from "../../../../../api/EXPEDITION";
import { useNavigate } from "react-router-dom";
import {
  GetSettlement,
  GetSettlementByDate,
  GetSettlementBySelect,
} from "../../../../../api/SETTLEMENT";
import { UserContext } from "../../../../../context/UserContextProvider";
import { getLast, getFirst } from "../../../../../utils/date/SummaryDate";
import currency from "../../../../../utils/currency/Currency";
import MyLottie from "../../../../../components/Lottie/MyLottie";
import loading from "../../../../../assets/lottie/loading.json";
import { FaFileExport } from "react-icons/fa";
import ExportXlsx from "../../../../../utils/Export/xlsx";
import ExportCsv from "../../../../../utils/Export/csv";
import dateFilter from "../../../../../utils/date/myDate";

const Settlement = () => {
  const { Search } = Input;
  const [payload, setPayload] = useState({
    keyword: "",
    page: 0,
    size: 20,
    dateEnd: null,
    dateStart: null,
  });
  const [condition, setCondition] = useState({
    modalExport: false,
  });
  const [expedition, setExpedition] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [dataTable, setDataTable] = useState([]);
  const [total, setTotal] = useState({
    totalPage: 0,
    totalItems: 0,
  });

  const navigate = useNavigate();
  const { RangePicker } = DatePicker;

  const handleDrawerExport = () => {
    setCondition({
      ...condition,
      modalExport: !condition.modalExport,
    });
  };

  const styleButtonExport = {
    maxWidth: "100px",
  };

  const months = {
    ["01"]: "Jan",
    ["02"]: "Feb",
    ["03"]: "Mar",
    ["04"]: "Apr",
    ["05"]: "May",
    ["06"]: "Jun",
    ["07"]: "Jul",
    ["08"]: "Aug",
    ["09"]: "Sep",
    ["10"]: "Oct",
    ["11"]: "Nov",
    ["12"]: "Dec",
  };

  useEffect(() => {
    ExpeditionGet()
      .then((res) => {
        setExpedition(res.data.content);
        console.log("gettting expedition", res.data.content);
      })
      .catch((err) => {
        message.error(
          "Terjadi Kesalahan Pada Server, saat mendapatkan data expedition",
          5
        );
      });
  }, []);

  useEffect(() => {
    if (expedition !== null) {
      if (payload.dateEnd || payload.dateStart !== null) {
        GetSettlementByDate(
          user.idUser,
          expedition[0].id,
          payload.keyword,
          payload.page,
          payload.size,
          payload.dateEnd ? payload.dateEnd : getLast,
          payload.dateStart ? payload.dateStart : getFirst
        )
          .then((res) => {
            console.log(res);
            setDataTable(res.data.content);
            setTotal({
              ...total,
              totalItems: res.data.totalItems,
              totalPage: res.data.totalPages,
            });
          })
          .catch((err) => {
            message.error(
              "Terjadi Kesalahan Pada Server, Coba Kembali nanti ",
              5
            );
          });
      } else {
        GetSettlement(
          user.idUser,
          expedition[0].id,
          payload.keyword,
          payload.page,
          payload.size
        )
          .then((res) => {
            console.log(res);
            setDataTable(res.data.content);
            setTotal({
              ...total,
              totalItems: res.data.totalItems,
              totalPage: res.data.totalPages,
            });
          })
          .catch((err) => {
            message.error(
              "Terjadi Kesalahan Pada Server, Coba Kembali nanti ",
              5
            );
          });
      }
    }
  }, [expedition, user, payload]);

  const columns = [
    {
      title: "No ref",
      dataIndex: "idRef",
      key: "idRef",
      render: (text, record, index) => {
        return (
          <NavLink
            to={`/dashboard/finance/detail-settlement/:${record.id}`}
            style={{ cursor: "pointer", color: "#1ec9ff" }}
          >
            {text}
            <br />
            {record.tglInvoice}
          </NavLink>
        );
      },
    },
    {
      title: "Keterangan",
      dataIndex: "podJumlah",
      key: "podJumlah",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>
                <b>POD</b> : {text} Paket
                <br />
                {currency(record.podRp, "Rp ")}
              </p>
            </div>
            <div>
              <p>
                <b>RTS</b> : {record.rtsJumlah} Paket
                <br />
                {currency(record.rtsRp, "Rp ")}
              </p>
            </div>
            <div>
              <p style={{ color: "#1ec9ff" }}>
                <b>
                  {text + record.rtsJumlah} Paket
                  <br />
                  {currency(record.totalRp, "Rp ")}
                </b>
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: "STATUS",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (text, record, index) => {
        if (text === false) {
          return (
            <p style={{ color: "#ed0678" }}>
              <b>PENDING</b>
            </p>
          );
        } else {
          return (
            <>
              <p style={{ color: "#1ec9ff" }}>
                <b>
                  PAID
                  <br />
                  {record.tglPaid}
                </b>
              </p>
            </>
          );
        }
      },
    },
    {
      title: "STATUS",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (text, record, index) => {
        if (text === false) {
          return (
            <p style={{ color: "red" }}>
              <b>PENDING</b>
            </p>
          );
        } else {
          return (
            <>
              <p style={{ color: "green" }}>
                <b>
                  PAID
                  <br />
                  {record.tglPaid}
                </b>
              </p>
            </>
          );
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                navigate(`/dashboard/finance/detail-settlement/:${record.id}`);
              }}
            >
              Detail
            </Button>
            <Tooltip title="Export Data to File">
              <Button type="danger" onClick={handleDrawerExport}>
                <FaFileExport />
              </Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  function onChangePage(page, pageSize) {
    setPayload({
      ...payload,
      size: pageSize,
      page: payload.page >= 0 ? page - 1 : page,
    });
  }

  const onSearch = (value) => {
    setPayload({
      ...payload,
      keyword: value,
    });
  };

  function TreeData() {
    const [checkStrictly, setCheckStrictly] = useState({
      data: [],
      jumlah: 0,
      modal: false,
    });

    const [dataSelect, setDataSelect] = useState(null);
    let newData = dataTable?.map((e, i) => ({
      ...e,
      key: i,
    }));

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        setCheckStrictly({
          data: selectedRows,
          jumlah: selectedRowKeys.length,
        });
      },
    };
    let dataSource = [];
    let dataSending =
      checkStrictly.data &&
      checkStrictly.data.map((e) => {
        dataSource.push(e.idRef);
      });
    let arrData = [];

    const GetDataForExport = async () => {
      setCondition({
        ...condition,
        modalExport: !condition.modalExport,
      });

      await GetSettlementBySelect(user.idUser, dataSource)
        .then((res) => {
          setDataSelect(res.data);
        })
        .catch((err) => {
          console.error(err);
          message.error(
            "Terjadi Kesalahan Pada Server, saat mendapatkan data settlement",
            5
          );
        });
    };

    return (
      <>
        {checkStrictly.data.length !== 0 ? (
          <Button
            onClick={GetDataForExport}
            shape="round"
            size="large"
            type="primary"
          >
            <Space>Export All</Space>
          </Button>
        ) : null}
        <br />
        <br />

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={newData}
          bordered
          pagination={false}
          pageSize={payload.size}
          defaultPageSize={payload.size}
          current={payload.page + 1}
        />
        <br />
        <br />
        <div className="flex-between w100">
          <p></p>
          <Pagination
            showSizeChanger
            showQuickJumper
            onChange={onChangePage}
            showTotal={(total) => `Total ${total} items`}
            pageSize={payload.size}
            defaultPageSize={payload.size}
            current={payload.page + 1}
            total={total.totalPage}
          />
        </div>
        <Drawer
          title="Pilih Format Export untuk File Anda"
          placement="bottom"
          width={500}
          onClose={handleDrawerExport}
          visible={condition.modalExport}
        >
          <Space direction="vertical" className="w100">
            <Button
              type="primary"
              className="w100"
              onClick={() => {
                ExportXlsx(arrData, "Settlement");
              }}
            >
              CSV
            </Button>
            <Button
              type="danger"
              className="w100"
              onClick={() => {
                ExportCsv(arrData, "Settlement");
              }}
            >
              XLSX
            </Button>
          </Space>
        </Drawer>
      </>
    );
  }

  return (
    <div>
      <Space>
        <h1 style={{ fontSize: "2rem" }}>Finance Settlement</h1>
      </Space>
      <br />
      <br />
      <div className="flex-between w100">
        <Space>
          <RangePicker
            style={{
              borderRadius: 40,
              width: "100%",
              maxWidth: 600,
            }}
            format="DD-MM-YYYY"
            onChange={(dates, dateStrings) => {
              setPayload({
                ...payload,
                dateStart: dateStrings[0],
                dateEnd: dateStrings[1],
              });
            }}
          />
        </Space>
        <Search
          placeholder="Cari yang anda kepo"
          style={{ width: "100%", maxWidth: 300 }}
          onSearch={onSearch}
          enterButton
        />
      </div>
      <br />
      <br />
      <br />

      {dataTable !== null ? (
        <>
          <TreeData />
        </>
      ) : (
        <div className="flex-center w100">
          <div
            style={{
              width: "100%",
              maxWidth: 500,
            }}
          >
            <MyLottie lottie={loading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Settlement;
