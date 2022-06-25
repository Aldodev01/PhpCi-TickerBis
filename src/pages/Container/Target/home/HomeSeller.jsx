import React, { useContext, useEffect, useState } from "react";
import { Space, message, DatePicker, Select } from "antd";
import CardSummary2 from "../../../../components/CardSummary/CardSummary2";
import { PickupGet } from "../../../../api/PICKUP";
import { SummarySeller } from "../../../../api/SUMMARY";

import "./HomeSeller.less";

//! --------CHARTS---------
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea, Pie } from "react-chartjs-2";

//! -------------LOTTIE---------------
import Lottie from "react-lottie";
import shopping from "../../../../assets/lottie/shopping.json";
import signInLottie from "../../../../assets/lottie/signInLotie.json";
import sending from "../../../../assets/lottie/sending.json";
import waitingPickup from "../../../../assets/lottie/waitingPickup.json";

//! --------ICONS---------
import { FcMoneyTransfer } from "react-icons/fc";
import { UserContext } from "../../../../context/UserContextProvider";
import { getFirst, getLast } from "../../../../utils/date/SummaryDate";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const HomeSeller = () => {
  // LOTTIE
  const [user, setUser] = useContext(UserContext);
  const [summaryNull, setSummaryNull] = useState(0);
  const [summaryProcess, setSummaryProcess] = useState(0);
  const [summaryDelivered, setSummaryDelivered] = useState(0);
  const [summaryUndelivered, setSummaryUndelivered] = useState(0);
  const [summaryCanceled, setSummaryCanceled] = useState(0);
  const [summaryProblem, setSummaryProblem] = useState(0);
  const [summaryReturned, setSummaryReturned] = useState(0);

  const [changeData, setChangeData] = useState({
    tipePengiriman: null,
    pickupId: null,
    size: 10,
    sortField: "createdDate",
    endDate: getLast,
    startDate: getFirst,
    keyword: null,
    page: 0,
    statusPengiriman: null,
    statusPembayaran: null,
    tipePengiriman: null,
  });
  const { Option } = Select;

  const data = {
    labels: ["สีแดง", "สีฟ้า", "สีเหลือง", "เขียว", "สีม่วง", "ส้ม"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          summaryNull,
          summaryProcess,
          summaryDelivered,
          summaryUndelivered,
          summaryCanceled,
          summaryProblem,
        ],
        backgroundColor: [
          "rgba(237, 6, 120, 0.5)",
          "rgba(30, 201, 255, 0.5)",
          "rgba(250, 246, 20, 0.5)",
          "rgba(0, 255, 136, 0.5)",
          "rgba(94, 52, 170, 0.5)",
          "rgba(250, 173, 20, 0.5)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const datain = {
    labels: ["สีแดง", "สีฟ้า", "สีเหลือง", "เขียว", "สีม่วง", "ส้ม"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          summaryNull,
          summaryProcess,
          summaryDelivered,
          summaryUndelivered,
          summaryCanceled,
          summaryProblem,
        ],
        backgroundColor: [
          "rgba(237, 6, 120, 0.2)",
          "rgba(30, 201, 255, 0.2)",
          "rgba(250, 246, 20, 0.2)",
          "rgba(0, 255, 136, 0.2)",
          "rgba(94, 52, 170, 0.2)",
          "rgba(250, 173, 20, 0.2)",
        ],
        borderColor: [
          "rgba(237, 6, 120, 1)",
          "rgba(30, 201, 255, 1)",
          "rgba(250, 246, 20, 1)",
          "rgba(0, 255, 136, 1)",
          "rgba(94, 52, 170, 1)",
          "rgba(250, 173, 20, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: shopping,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (user.idUser) {
      const result = PickupGet(user.idUser, 5)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  }, [user.idUser]);

  useEffect(() => {
    if (user.idUser != "") {
      //! ----------null----------
      const summarynull = SummarySeller(user.idUser, changeData)
        .then((res) => {})
        .catch((err) => {
          message.error(
            "Se Produjo Un Error En El Servidor Para Obtener Blanco"
          );
        });
      //! ----------NULL----------
      const summaryNull = SummarySeller(user.idUser, {
        ...changeData,
        statusPengiriman: "NULL",
      })
        .then((res) => {
          setSummaryNull(res.data.result);
        })
        .catch((err) => {
          message.error(
            "Se Produjo Un Error En El Servidor Para Obtener No Hay Ninguno"
          );
        });
      //! ----------PROCESS----------
      const summaryProcess = SummarySeller(user.idUser, {
        ...changeData,
        statusPengiriman: "PROCESS",
      })
        .then((res) => {
          setSummaryProcess(res.data.result);
        })
        .catch((err) => {
          message.error(
            "Se Produjo Un Error En El Servidor Para Obtener Proceso"
          );
        });
      //! ----------DELIVERED----------
      const summaryDelivered = SummarySeller(user.idUser, {
        ...changeData,
        statusPengiriman: "DELIVERED",
      })
        .then((res) => {
          setSummaryDelivered(res.data.result);
        })
        .catch((err) => {
          message.error(
            "Se Produjo Un Error En El Servidor Para Obtener Enviado"
          );
        });
      //! ----------UNDELIVERED----------
      const summaryUndelivered = SummarySeller(user.idUser, {
        ...changeData,
        statusPengiriman: "UNDELIVERED",
      })
        .then((res) => {
          setSummaryUndelivered(res.data.result);
        })
        .catch((err) => {
          message.error(
            "Se Produjo Un Error En El Servidor Para Obtener No Enviado"
          );
        });
      //! ----------RETURNED----------
      const summaryReturned = SummarySeller(user.idUser, {
        ...changeData,
        statusPengiriman: "RETURNED",
      })
        .then((res) => {
          setSummaryReturned(res.data.result);
        })
        .catch((err) => {
          message.error(
            "Se Produjo Un Error En El Servidor Para Obtener No Devuelto"
          );
        });
      //! ----------PROBLEM----------
      const summaryProblem = SummarySeller(user.idUser, {
        ...changeData,
        statusPengiriman: "PROBLEM",
      })
        .then((res) => {
          setSummaryProblem(res.data.result);
        })
        .catch((err) => {
          message.error(
            "Se Produjo Un Error En El Servidor Para Obtener No Devuelto"
          );
        });
      //! ----------CANCELED----------
      const summaryCancel = SummarySeller(user.idUser, {
        ...changeData,
        statusPengiriman: "CANCELED",
      })
        .then((res) => {
          setSummaryCanceled(res.data.result);
        })
        .catch((err) => {
          message.error(
            "Se Produjo Un Error En El Servidor Para Obtener No Devuelto"
          );
        });
    }
  }, [user.idUser, changeData]);

  return (
    <div className="homeseller-wrap">
      <div className="homeseller-container">
        <div className="homeseller-change">
          <Space>
            <DatePicker
              placeholder={"Start Date"}
              format="DD-MM-YYYY"
              size="large"
              style={{
                width: 200,
              }}
              onChange={(date, dateString) => {
                setChangeData({
                  ...changeData,
                  startDate: dateString,
                });
              }}
            />
            <p style={{ marginTop: 15 }}>s/d</p>
            <DatePicker
              placeholder={"End Date"}
              format="DD-MM-YYYY"
              size="large"
              onChange={(date, dateString) => {
                setChangeData({
                  ...changeData,
                  endDate: dateString,
                });
              }}
              style={{
                width: 200,
              }}
            />
          </Space>
          <Select
            showSearch
            size="large"
            style={{ width: "100%", marginTop: 5 }}
            placeholder="Search Your Type"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            onChange={(e) => {
              setChangeData({
                ...changeData,
                startDate: e,
              });
            }}
          >
            <Option value="NULL">SEMUA</Option>
            <Option value="COD">COD</Option>
            <Option value="NONCOD">NONCOD</Option>
          </Select>
        </div>
        {/* ============= */}
        <div className="homeseller-head">
          <div className="homeseller-lottie">
            <Lottie options={defaultOptions} width="100%" height="100%" />
            <h1>
              Belanja dimanapun, kirimnya lewat <strong>Aldo-Imezi</strong>
            </h1>
          </div>
          <div className="homeseller-fckit">
            <Space>
              <FcMoneyTransfer style={{ fontSize: 40 }} />
              <h1>Waste Your Money</h1>
            </Space>
            <h1>
              <strong>Rp. 1000</strong>
            </h1>
          </div>
        </div>
        {/* ============= */}
        <br />
        <br />
        <div>
          <h1>Make Your Day With Aldo-Imezi</h1>
        </div>
        <br />
        <br />

        <Space>
          <div className="homeseller-chart">
            <Pie data={datain} />
          </div>
          <div className="homeseller-chart">
            <PolarArea data={data} />
          </div>
          <div className="homeseller-chart">
            <Pie data={datain} />
          </div>
        </Space>
      </div>
      {/* ============= */}
      <div className="homeseller-summary">
        <h1 style={{ fontSize: "1rem" }}>Monitor Kegiatan</h1>
        <CardSummary2
          icon={waitingPickup}
          background={"#ed0678"}
          title={"Menunggu Dipickup"}
          count={summaryNull}
        />
        <CardSummary2
          icon={signInLottie}
          background={"#faad14"}
          title={"Dalam Pengiriman"}
          count={summaryProcess}
        />{" "}
        <CardSummary2
          icon={sending}
          background={"#5e34aa"}
          title={"Terkirim"}
          count={summaryDelivered}
        />{" "}
        <CardSummary2
          icon={waitingPickup}
          background={"#1ec9ff"}
          title={"Tidak Terkirim"}
          count={summaryUndelivered}
        />
        <CardSummary2
          icon={waitingPickup}
          background={"#1ec9ff"}
          title={"Pengiriman Bermasalah"}
          count={summaryProblem}
        />
        <CardSummary2
          icon={waitingPickup}
          background={"#ed0678"}
          title={"Return To Shipper"}
          count={summaryReturned}
        />
        <CardSummary2
          icon={waitingPickup}
          background={"#ed0678"}
          title={"Dibatalkan"}
          count={summaryCanceled}
        />
      </div>
      {/* ============= */}
    </div>
  );
};

export default HomeSeller;
