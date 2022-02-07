import { DatePicker, Input, message, Pagination, Space, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ExpeditionGet } from "../../../../../api/EXPEDITION";
import {
  GetSettlement,
  GetSettlementByDate,
} from "../../../../../api/SETTLEMENT";
import { UserContext } from "../../../../../context/UserContextProvider";
import { getLast, getFirst } from "../../../../../utils/date/SummaryDate";
import currency from "../../../../../utils/currency/Currency";

const Settlement = () => {
  const { Search } = Input;
  const [payload, setPayload] = useState({
    keyword: "",
    page: 0,
    size: 20,
    dateEnd: null,
    dateStart: null,
  });
  const [expedition, setExpedition] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [dataTable, setDataTable] = useState([]);
  const [total, setTotal] = useState({
    totalPage: 0,
    totalItems: 0,
  });

  useEffect(() => {
    ExpeditionGet()
      .then((res) => {
        setExpedition(res.data.content);
        console.log("gettting expedition", res.data.content);
      })
      .catch((err) => {
        message.error("遠征データの取得中にエラーが発生しました", 5);
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
            message.error("決済データ収集中にエラーが発生しました", 5);
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
            message.error("決済データ収集中にエラーが発生しました", 5);
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
  ];

  function onChange(page, pageSize) {
    setPayload({
      ...payload,
      size: pageSize,
      page: page <= 0 ? page : page - 1,
    });
  }
  const onSearch = (value) => {
    setPayload({
      ...payload,
      keyword: value,
    });
  };

  return (
    <div>
      <Space>
        <h1 style={{ fontSize: "2rem" }}>Finance Settlement</h1>
      </Space>
      <br />
      <br />
      <div className="flex-between w100">
        <Space>
          <DatePicker
            placeholder="Tanggal Awal"
            format="DD-MM-YYYY"
            size="large"
            onChange={(date, dateString) => {
              setPayload({
                ...payload,
                dateStart: dateString,
              });
            }}
            style={{
              width: "100%",
              maxWidth: 300,
            }}
          />
          <DatePicker
            placeholder="Tanggal Akhir"
            format="DD-MM-YYYY"
            size="large"
            onChange={(date, dateString) => {
              setPayload({
                ...payload,
                dateEnd: dateString,
              });
            }}
            style={{
              width: "100%",
              maxWidth: 300,
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

      <Table
        columns={columns}
        dataSource={dataTable}
        bordered
        pagination={false}
      />
      <br />
      <br />
      <div className="flex-between w100">
        <p></p>
        <Pagination
          showSizeChanger
          showQuickJumper
          onChange={onChange}
          showTotal={(total) => `Total ${total} items`}
          pageSize={payload.size}
          defaultPageSize={payload.size}
          current={payload.page + 1}
          total={total.totalPage}
        />
      </div>
    </div>
  );
};

export default Settlement;
