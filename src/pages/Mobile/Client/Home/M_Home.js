import React, { useState } from "react";
import Navbar from "../../../../components/mobile/Navbar/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import Lottie from "react-lottie";
import shopping from "../../../../assets/lottie/shopping.json";
import signInLottie from "../../../../assets/lottie/signInLotie.json";
import sending from "../../../../assets/lottie/sending.json";
import waitingPickup from "../../../../assets/lottie/waitingPickup.json";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import CardSummary2 from "../../../../components/CardSummary/CardSummary2";
import "./M_Home.less";
import SwiperCore, {
  Pagination as Paginationer,
  Navigation,
} from "swiper/core";
import MyLottie from "../../../../components/Lottie/MyLottie";
import { Space } from "antd";
import { FcMoneyTransfer } from "react-icons/fc";
SwiperCore.use([Paginationer]);
SwiperCore.use([Navigation]);
const M_Home = () => {
  const [summaryNull, setSummaryNull] = useState(0);
  const [summaryProcess, setSummaryProcess] = useState(0);
  const [summaryDelivered, setSummaryDelivered] = useState(0);
  const [summaryUndelivered, setSummaryUndelivered] = useState(0);
  const [summaryCanceled, setSummaryCanceled] = useState(0);
  const [summaryProblem, setSummaryProblem] = useState(0);
  const [summaryReturned, setSummaryReturned] = useState(0);
  return (
    <div className="w100">
      <Navbar title={"Home"} cancel={true} />
      <b>Your Summary</b>
      <div className="flex-column-center m-home-header h100">
        <br />
        <Swiper
          // effect={"coverflow"}
          pagination={{
            dynamicBullets: true,
          }}
          grabCursor={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          className="mySwiper"
        >
          <SwiperSlide style={{ width: 250 }} className="swiper-slide">
            <CardSummary2
              icon={waitingPickup}
              background={"#ed0678"}
              title={"Menunggu Dipickup"}
              count={summaryNull}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: 250 }} className="swiper-slide">
            <CardSummary2
              icon={signInLottie}
              background={"#faad14"}
              title={"Dalam Pengiriman"}
              count={summaryProcess}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: 250 }} className="swiper-slide">
            <CardSummary2
              icon={sending}
              background={"#5e34aa"}
              title={"Terkirim"}
              count={summaryDelivered}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: 250 }} className="swiper-slide">
            <CardSummary2
              icon={waitingPickup}
              background={"#1ec9ff"}
              title={"Pengiriman Bermasalah"}
              count={summaryProblem}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: 250 }} className="swiper-slide">
            <CardSummary2
              icon={waitingPickup}
              background={"#1ec9ff"}
              title={"Pengiriman Bermasalah"}
              count={summaryProblem}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: 250 }} className="swiper-slide">
            <CardSummary2
              icon={waitingPickup}
              background={"#1ec9ff"}
              title={"Pengiriman Bermasalah"}
              count={summaryProblem}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: 250 }} className="swiper-slide">
            <CardSummary2
              icon={waitingPickup}
              background={"#1ec9ff"}
              title={"Pengiriman Bermasalah"}
              count={summaryProblem}
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="pading20">
        <div className="m-home-container">
          <div className="m-home-lottie">
            <MyLottie lottie={shopping} />
            <p>
              Belanja dimanapun, kirimnya lewat <strong>Aldo-Imezi</strong>
            </p>
          </div>
          <div className="m-home-fckit">
            <Space>
              <FcMoneyTransfer style={{ fontSize: 40 }} />
              <p>Waste Your Money</p>
            </Space>
            <p>
              <strong>Rp. 1000</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default M_Home;
