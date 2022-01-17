import React, { useContext } from "react";
import { Space } from "antd";
import CardSummary2 from "../../../components/CardSummary/CardSummary2";
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
import shopping from "../../../assets/lottie/shopping.json";
import signInLottie from "../../../assets/lottie/signInLotie.json";
import sending from "../../../assets/lottie/sending.json";
import waitingPickup from "../../../assets/lottie/waitingPickup.json";

//! --------ICONS---------
import { FcMoneyTransfer } from "react-icons/fc";
import { UserContext } from "../../../context/UserContextProvider";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

export const datain = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const HomeSeller = () => {
  // LOTTIE
  const [user, setUser] = useContext(UserContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: shopping,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  console.log("CONTEXT", user);

  return (
    <div className="homeseller-wrap">
      <div className="homeseller-container">
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
              <h1>Your Money</h1>
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
            <PolarArea data={data} />
          </div>
          <div className="homeseller-chart">
            <Pie data={datain} />
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
          count={10}
        />
        <CardSummary2
          icon={signInLottie}
          background={"#faad14"}
          title={"Dalam Pengiriman"}
          count={10}
        />{" "}
        <CardSummary2
          icon={sending}
          background={"#5e34aa"}
          title={"Terkirim"}
          count={10}
        />{" "}
        <CardSummary2
          icon={waitingPickup}
          background={"#1ec9ff"}
          title={"Pengiriman Bermasalah"}
          count={10}
        />
        <CardSummary2
          icon={waitingPickup}
          background={"#ed0678"}
          title={"Return To Shipper"}
          count={10}
        />
      </div>
      {/* ============= */}
    </div>
  );
};

export default HomeSeller;
