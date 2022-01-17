import React, { useContext } from "react";
import CardSummary from "../../../components/CardSummary/CardSummary";
import "./Monitoring.less";
import waitingPickup from "../../../assets/lottie/waitingPickup.json";
import { Breadcrumb, DatePicker, Select, Space } from "antd";
import HistoryLink from "../../../components/breadCrumb/HistoryLink";
import { MenuContext } from "../../../context/MenuContextProvider";

const Monitoring = () => {
  const [menu, SetMenu] = useContext(MenuContext);
  const { Option } = Select;
  return (
    <div>
      <Space>
        <h1 style={{ fontSize: "2rem" }}>Monitoring</h1>
      </Space>
      <div className="seller-monitoring-head">
        <CardSummary
          icon={waitingPickup}
          background={"#ed0678"}
          title={"Menunggu Dipickup"}
          count={10}
        />
        <CardSummary
          icon={waitingPickup}
          background={"#faad14"}
          title={"Dalam Pengiriman"}
          count={10}
        />{" "}
        <CardSummary
          icon={waitingPickup}
          background={"#5e34aa"}
          title={"Terkirim"}
          count={10}
        />{" "}
        <CardSummary
          icon={waitingPickup}
          background={"#1ec9ff"}
          title={"Pengiriman Bermasalah"}
          count={10}
        />
        <CardSummary
          icon={waitingPickup}
          background={"#ed0678"}
          title={"Return To Shipper"}
          count={10}
        />
      </div>
      <div className="seller-monitoring-container">
        <Space>
          <DatePicker
            placeholder={"Start Date"}
            format="DD-MM-YYYY"
            size="large"
            style={{
              width: "100%",
              maxWidth: 300,
            }}
          />
          <p style={{ marginTop: 15 }}>s/d</p>
          <DatePicker
            placeholder={"End Date"}
            format="DD-MM-YYYY"
            size="large"
            style={{
              width: "100%",
              maxWidth: 300,
            }}
          />
        </Space>
        <Space>
          <Select
            showSearch
            size="large"
            style={{ width: "100%", maxWidth: 300 }}
            placeholder="Search Yours"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value="NULL">SEMUA</Option>
            <Option value="COD">COD</Option>
            <Option value="NONCOD">NONCOD</Option>
          </Select>
          <Select
            showSearch
            size="large"
            style={{ width: "100%", maxWidth: 300 }}
            placeholder="Search Yours"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value={null}>Semua lokasi</Option>
          </Select>
        </Space>
      </div>
    </div>
  );
};

export default Monitoring;
