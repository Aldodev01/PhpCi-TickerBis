import {
  Button,
  DatePicker,
  Input,
  message,
  Pagination,
  Space,
  Table,
  Tag,
} from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetOrderHistory,
  GetOrderHistoryByDate,
} from "../../../../../api/HISTORY";
import { UserContext } from "../../../../../context/UserContextProvider";
import currency from "../../../../../utils/currency/Currency";
import dateFilter from "../../../../../utils/date/myDate";
import { getFirst, getLast } from "../../../../../utils/date/SummaryDate";

const OrderHistory = () => {
  const { Column, ColumnGroup } = Table;
  const { Search } = Input;
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [dataTable, setDataTable] = useState(null);
  const { RangePicker } = DatePicker;

  const [payload, setPayload] = useState({
    page: 0,
    size: 30,
    keyword: "",
  });
  const [pagginationState, setPagginationState] = useState(0);
  const [datePayload, setDatePayload] = useState({
    dateStart: getFirst,
    dateEnd: getLast,
  });

  const onSearch = (value) => {
    GetOrderHistory(user.idUser, payload.page, payload.size, value)
      .then((res) => {
        console.log(res.data);
        setDataTable(res.data.content);
        setPagginationState(res.data.totalItems);
      })
      .catch((err) => {
        message.error("Terjadi Kesalahan Pada Server, saat mencari data", 5);
      });
  };

  useEffect(() => {
    GetOrderHistory(user.idUser, payload.page, payload.size, payload.keyword)
      .then((res) => {
        console.log(res.data);
        setDataTable(res.data.content);
        setPagginationState(res.data.totalItems);
      })
      .catch((err) => {
        message.error(
          "Terjadi Kesalahan Pada Server, saat penarikan data order",
          5
        );
      });
  }, [payload]);

  useEffect(() => {
    if (payload || datePayload) {
      GetOrderHistoryByDate(
        user.idUser,
        payload.page,
        payload.size,
        payload.keyword,
        datePayload.dateStart,
        datePayload.dateEnd
      )
        .then((res) => {
          console.log("usecallback", res.data);
          setDataTable(res.data.content);
          setPagginationState(res.data.totalItems);
        })
        .catch((err) => {
          message.error(
            "Terjadi Kesalahan Pada Server, saat mendapatkan data",
            5
          );
        });
    }
  }, [payload, datePayload]);

  function onChange(page, pageSize) {
    setPayload({
      ...payload,
      page: page - 1,
      size: pageSize,
    });
  }

  return (
    <div>
      <h1>Order History</h1>
      <br />
      <div className="flex-between w100">
        <Space>
          <RangePicker
            style={{
              borderRadius: 40,
              width: "100%",
              maxWidth: 600,
            }}
            placeholder={["Filter", "By Date"]}
            onChange={(date, dateStrings) => {
              setDatePayload({
                ...datePayload,
                dateStart: dateStrings[0],
                dateEnd: dateStrings[1],
              });
            }}
            size="large"
          />
        </Space>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          style={{ width: "100%", maxWidth: 500 }}
        />
      </div>
      <br />
      <br />
      <Table dataSource={dataTable} bordered pagination={false}>
        <Column
          title="Tanggal Transaksi"
          dataIndex="tanggalTransaksi"
          key="tanggalTransaksi"
          render={(text, record) => {
            const time = new Date(text);
            return (
              <span>
                <b>{dateFilter.getDateTime(time)}</b>
              </span>
            );
          }}
        />
        <Column
          title="Jenis Pengiriman"
          dataIndex="tipePengiriman"
          key="tipePengiriman"
        />
        <Column
          title="Status Pembayaran"
          dataIndex="statusPembayaran"
          key="statusPembayaran"
          render={(text, record) => (
            <span
              style={{
                color:
                  text == "EXPIRED"
                    ? "#ed0678"
                    : text == "PROCESS"
                    ? "#1ec9ff"
                    : "#5e34aa",
              }}
            >
              <p>{text}</p>
            </span>
          )}
        />
        <ColumnGroup title="COD">
          <Column
            title="Jumlah Transaksi"
            dataIndex="jumlahCod"
            key="jumlahCod"
          />
          <Column
            title="(Rp)"
            dataIndex="jumlahRpCod"
            key="jumlahRpCod"
            render={(text, record) => (
              <span>
                <b>{currency(text, "Rp ")}</b>
              </span>
            )}
          />
        </ColumnGroup>

        <ColumnGroup title="NON COD">
          <Column
            title="Jumlah Transaksi"
            dataIndex="jumlahNonCod"
            key="jumlahNonCod"
          />
          <Column
            title="(Rp)"
            dataIndex="jumlahRpNonCod"
            key="jumlahRpNonCod"
            render={(text, record) => (
              <span>
                <b>{currency(text, "Rp ")}</b>
              </span>
            )}
          />
        </ColumnGroup>
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                onClick={() => {
                  navigate(
                    `/dashboard/pengiriman/detail-history/:${record.id}`
                  );
                }}
              >
                Detail Paket
              </Button>
            </Space>
          )}
        />
      </Table>
      <Pagination
        showSizeChanger
        onChange={onChange}
        showTotal={(total) => `Total ${total} items`}
        pageSize={payload.size}
        defaultPageSize={payload.size}
        current={payload.page}
        // onShowSizeChange={onShowSizeChange}
        total={pagginationState}
      />
      ,
    </div>
  );
};

export default OrderHistory;
