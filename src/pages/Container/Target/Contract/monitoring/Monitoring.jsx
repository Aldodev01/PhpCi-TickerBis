//! REACT
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { DatePicker, message, Select, Space } from "antd";

//! CONTEXT
import { UserContext } from "../../../../../context/UserContextProvider";

//! COMPONENT && ASSETS && UTILS
import "./Monitoring.less";
import UserMonitoring from "../../../../../components/table/UserMonitoring";
import MyLottie from "../../../../../components/Lottie/MyLottie";
import waitingPickupLottie from "../../../../../assets/lottie/waitingPickup.json";
import loading from "../../../../../assets/lottie/loading.json";
import { getFirst, getLast } from "../../../../../utils/date/SummaryDate";
import CardSummary2 from "../../../../../components/CardSummary/CardSummary2";

//! API
import { MonitoringTable } from "../../../../../api/MONITORING";
import SwiperCore, {
  Pagination as Paginationer,
  Navigation,
} from "swiper/core";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
SwiperCore.use([Paginationer]);
SwiperCore.use([Navigation]);
const Monitoring = () => {
  //! CONFIG ANTD
  const { Option } = Select;

  // ! STATE CONTEXT
  const [user, setUser] = useContext(UserContext);

  // ! STATE
  const [tableData, setTableData] = useState(null);
  const [waitingPickup, setWaitingPickup] = useState("");
  const [shipped, setShipped] = useState("");
  const [RTS, setRTS] = useState("");
  const [problem, setProblem] = useState("");
  const [cancel, setCancel] = useState("");
  const [delivered, setDelivered] = useState("");
  const [shipmentProblem, setShipmentProblem] = useState("");
  const [payloadTable, setPayloadTable] = useState({
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

  //! Use Query IS HERE
  const {
    isLoading: table_isLoading,
    data: table_data,
    isError: table_isError,
  } = useQuery(
    ["Monitoring Table", user.idUser, payloadTable],
    MonitoringTable
  );

  useEffect(() => {
    if (table_data) {
      setTableData(table_data?.data?.content);
    }
  }, [table_data]);

  return (
    <div>
      <Space>
        <h1 style={{ fontSize: "2rem" }}>Monitoring</h1>
      </Space>
      <div className="seller-monitoring-head">
        <Swiper
          // effect={"coverflow"}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          style={{
            width: "100%",
            display: "flex",
            gap: "20px",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <SwiperSlide
            style={{ width: 70 }}
            className="swiper-slide"
          ></SwiperSlide>
          <SwiperSlide style={{ width: 300 }} className="swiper-slide">
            <CardSummary2
              icon={waitingPickupLottie}
              background={"#ed0678"}
              title={"Menunggu Dipickup"}
              count={10}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: 300 }} className="swiper-slide">
            <CardSummary2
              icon={waitingPickupLottie}
              background={"#faad14"}
              title={"Dalam Pengiriman"}
              count={10}
            />{" "}
          </SwiperSlide>
          <SwiperSlide style={{ width: 300 }} className="swiper-slide">
            <CardSummary2
              icon={waitingPickupLottie}
              background={"#5e34aa"}
              title={"Terkirim"}
              count={10}
            />{" "}
          </SwiperSlide>
          <SwiperSlide style={{ width: 300 }} className="swiper-slide">
            <CardSummary2
              icon={waitingPickupLottie}
              background={"#1ec9ff"}
              title={"Pengiriman Bermasalah"}
              count={10}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: 300 }} className="swiper-slide">
            <CardSummary2
              icon={waitingPickupLottie}
              background={"#ed0678"}
              title={"Return To Shipper"}
              count={10}
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="seller-monitoring-container">
        <Space>
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
          {/*  */}

          <Select
            showSearch
            size="large"
            style={{ width: "100%", maxWidth: 500 }}
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
          >
            <Option value="NULL">SEMUA</Option>
            <Option value="COD">COD</Option>
            <Option value="NONCOD">NONCOD</Option>
          </Select>
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
            <Option value={null}>Semua lokasi</Option>
          </Select>
        </Space>
      </div>
      <br />
      <br />

      {table_isLoading && (
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
      {table_isError && (
        <>
          {(message.error("私たちのシステムに事故がありました"), 5)}
          <iframe
            src="https://my.spline.design/skatergirlcopy-f5b2a25ae4603f5eee574d829a9427e8/"
            frameborder="0"
            width="100%"
            height={500}
            style={{
              borderRadius: 20,
              boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
            }}
          ></iframe>
        </>
      )}

      {table_data && <UserMonitoring dataTable={{ tableData, setTableData }} />}
    </div>
  );
};

export default Monitoring;
