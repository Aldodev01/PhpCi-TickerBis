import { message, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailSettlement } from "../../../../../api/SETTLEMENT";
import currency from "../../../../../utils/currency/Currency";
import numberToWord from "../../../../../utils/currency/NumberToWords";
import "./Settlement.less";

const DetailSettlement = () => {
  const { id } = useParams();
  const resultParams = id.replace(":", "");
  const [dataGlobal, setDataGlobal] = useState(null);
  const [dataTable, setDataTable] = useState({
    sending: [],
    rts: [],
  });

  useEffect(() => {
    GetDetailSettlement(resultParams)
      .then((res) => {
        setDataGlobal(res.data);
      })
      .catch((err) => {
        message.error("決済詳細データ収集中にエラーが発生しました", 5);
      });
  }, [resultParams]);

  useEffect(() => {
    if (dataGlobal !== null) {
      setDataTable({
        sending: dataGlobal.pods,
        rts: dataGlobal.rts,
      });
    }
  }, [dataGlobal]);

  const columns = [
    {
      title: "No. Resi",
      dataIndex: "noResi",
      key: "noResi",
    },
    {
      title: "Nama Penerima",
      dataIndex: "namaPenerima",
      key: "namaPenerima",
    },
    {
      title: "Kota Penerima",
      dataIndex: "kotaPenerima",
      key: "kotaPenerima",
    },
    {
      title: "Jumlah Terkirim",
      dataIndex: "jumlahCod",
      key: "jumlahCod",
      render: (text, record, index) => {
        return <p>{currency(text, "Rp ")}</p>;
      },
    },
    {
      title: "Ongkir",
      dataIndex: "ongkir",
      key: "ongkir",
      render: (text, record, index) => {
        return <p>{currency(text, "Rp ")}</p>;
      },
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      render: (text, record, index) => {
        return <p>{currency(text, "Rp ")}</p>;
      },
    },
    {
      title: "Dana Dicairkan",
      dataIndex: "dana",
      key: "dana",
      render: (text, record, index) => {
        return <p>{currency(text, "Rp ")}</p>;
      },
    },
  ];

  const columns2 = [
    {
      title: "No. Resi",
      dataIndex: "noResi",
      key: "noResi",
    },
    {
      title: "Nama Penerima",
      dataIndex: "namaPenerima",
      key: "namaPenerima",
    },
    {
      title: "Kota Penerima",
      dataIndex: "kotaPenerima",
      key: "kotaPenerima",
    },
    {
      title: "Ongkir (Disk)",
      dataIndex: "ongkir",
      key: "ongkir",
      render: (text, record, index) => {
        return <p>{currency(text, "Rp ")}</p>;
      },
    },
    {
      title: "Ongkir RTS",
      dataIndex: "ongkirRts",
      key: "ongkirRts",
      render: (text, record, index) => {
        return <p>{currency(text, "Rp ")}</p>;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record, index) => {
        return <p>{currency(text, "Rp ")}</p>;
      },
    },
  ];
  console.log(dataTable, dataGlobal);

  return (
    <div>
      <Space>
        <h1 style={{ fontSize: "2rem" }}>Detail Settlement</h1>
      </Space>
      {dataGlobal !== null ? (
        <>
          <div className="flex-between w100 settlement-background">
            <Space direction="vertical">
              <p>No. Ref</p>
              <b>{dataGlobal.idRef}</b>
            </Space>
            <Space direction="vertical">
              <p>Expedisi</p>
              <b>{dataGlobal.ekspedisi}</b>
            </Space>
          </div>
          {/*  */}
          <br />
          <div className="flex-between w100 settlement-background">
            <div className="flex-column-start">
              <Space>
                <p className="max-paragraf">Hal</p>
                <b>{dataGlobal.hal}</b>
              </Space>
              <Space>
                <p className="max-paragraf">Kepada</p>
                <b>{dataGlobal.value.namaToko}</b>
              </Space>
              <Space>
                <p className="max-paragraf">Alamat</p>
                <b>
                  {dataGlobal.value.alamat} <br />
                  {dataGlobal.value.kecamatan}, {dataGlobal.value.kelurahan}.{" "}
                  {dataGlobal.value.provinsi} ({dataGlobal.value.kodePos} )
                </b>
              </Space>
              <Space>
                <p className="max-paragraf">PIC</p>
                <b>{dataGlobal.value.nama}</b>
              </Space>
            </div>
            <Space direction="vertical">
              <p>Tanggal</p>
              <b>{dataGlobal.value.createdDate}</b>
            </Space>
          </div>
          {/*  */}
          <br />
          <div className="flex-column-start w100 settlement-background">
            <h1 style={{ fontSize: "1.3rem" }}>Delivered</h1>
            <Table
              columns={columns}
              dataSource={dataTable.sending}
              pagination={false}
              bordered
              summary={(pageData) => {
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell align="center" colSpan={3}>
                        Total
                      </Table.Summary.Cell>

                      <Table.Summary.Cell>
                        <p>
                          {currency(
                            pageData.reduce(
                              (idx, value) => (idx = idx + value.jumlahCod),
                              0
                            ),
                            "Rp "
                          )}
                        </p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <p>
                          {currency(
                            pageData.reduce(
                              (idx, value) => (idx = idx + value.ongkir),
                              0
                            ),
                            "Rp "
                          )}
                        </p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <p>
                          {currency(
                            pageData.reduce(
                              (idx, value) => (idx = idx + value.fee),
                              0
                            ),
                            "Rp "
                          )}
                        </p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <p>
                          {currency(
                            pageData.reduce(
                              (idx, value) => (idx = idx + value.dana),
                              0
                            ),
                            "Rp "
                          )}
                        </p>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </div>
          {/*  */}
          <br />
          <div className="flex-column-start w100 settlement-background">
            <h1 style={{ fontSize: "1.3rem" }}>RTS (Return To Shipper)</h1>
            <Table
              columns={columns2}
              dataSource={dataTable.rts}
              pagination={false}
              bordered
              summary={(pageData) => {
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell align="center" colSpan={3}>
                        Total
                      </Table.Summary.Cell>

                      <Table.Summary.Cell>
                        <p>
                          {currency(
                            pageData.reduce(
                              (idx, value) => (idx = idx + value.ongkir),
                              0
                            ),
                            "Rp "
                          )}
                        </p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <p>
                          {currency(
                            pageData.reduce(
                              (idx, value) => (idx = idx + value.ongkirRts),
                              0
                            ),
                            "Rp "
                          )}
                        </p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <p>
                          {currency(
                            pageData.reduce(
                              (idx, value) => (idx = idx + value.total),
                              0
                            ),
                            "Rp "
                          )}
                        </p>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </div>
          {/*  */}
          <br />
          <div className="flex-between w100 settlement-background">
            <Space direction="vertical">
              <p>TOTAL (Terkirim - RTS (Return To Shipper))</p>
              <Space>
                <b>
                  {currency(
                    dataTable.sending.reduce(
                      (idx, value) => (idx = idx + value.dana),
                      0
                    ),
                    "Rp "
                  )}
                </b>
                <b>-</b>
                <b>
                  {currency(
                    dataTable.rts.reduce(
                      (idx, value) => (idx = idx + value.total),
                      0
                    ),
                    "Rp "
                  )}
                </b>
              </Space>
            </Space>
            <Space direction="vertical">
              <p>Terbilang</p>
              <b>
                {numberToWord(
                  dataTable.sending.reduce(
                    (idx, value) => (idx = idx + value.dana),
                    0
                  ) -
                    dataTable.rts.reduce(
                      (idx, value) => (idx = idx + value.total),
                      0
                    )
                )}{" "}
                Rupiah
              </b>
            </Space>

            <Space direction="vertical">
              <p>Keterangan</p>
              <b>-</b>
            </Space>
          </div>
        </>
      ) : (
        <p>asik</p>
      )}
    </div>
  );
};

export default DetailSettlement;
