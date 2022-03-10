import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../../../context/UserContextProvider";
import { AkunGetTransaction } from "../../../../../api/AKUN";
import { GetTrackingHistory } from "../../../../../api/SENDING";
import {
  Button,
  Descriptions,
  message,
  PageHeader,
  Space,
  Statistic,
  Timeline,
} from "antd";
import MyLottie from "../../../../../components/Lottie/MyLottie";
import sendingLottie from "../../../../../assets/lottie/signInLotie.json";
import loadingLottie from "../../../../../assets/lottie/loading.json";
import dateFilter from "../../../../../utils/date/myDate";

const TrackingHistory = () => {
  const { expedisi, awb } = useParams();
  const [user, setUser] = useContext(UserContext);
  const [dataTrack, setDataTrack] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);

  console.log("dataTrack", dataTrack);
  console.log("dataDetail", dataDetail);

  useEffect(() => {
    if (user.idUser) {
      AkunGetTransaction(user.idUser, awb)
        .then((res) => {
          setDataDetail(res.data);
        })
        .catch((err) => {
          message.error("事故がありました", 3);
        });
    } else {
      message.info("Refresh atau Login Ulang", 3);
    }
  }, [user]);
  useEffect(() => {
    if (user.expedisi) {
      GetTrackingHistory(user.expedisi, awb)
        .then((res) => {
          setDataTrack(res.data);
        })
        .catch((err) => {
          message.error("事故がありました", 3);
        });
    } else {
      message.info("Refresh atau Login Ulang", 3);
    }
  }, [user, awb]);

  console.log(expedisi, awb);
  const styleEr = {
    width: "100%",
    maxWidth: 400,
    height: "100%",
    maxHeight: 400,
  };

  const styleOp = {
    width: "100%",
    maxWidth: 600,
    height: "100%",
    margintop: "20px",
  };

  const Content = ({ children, extra }) => (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
  return (
    <div>
      <h1 style={{ fontSize: "2rem" }}>Tracking History</h1>
      <div className="flex-start wrapperInput">
        {dataTrack ? (
          <PageHeader
            className="site-page-header-responsive"
            onBack={() => window.history.back()}
            title="Title"
            subTitle="This is a subtitle"
            extra={[
              <Button key="3">Operation</Button>,
              <Button key="2">Operation</Button>,
              <Button key="1" type="primary">
                Primary
              </Button>,
            ]}
            footer={<p>asda</p>}
          >
            <Content
              extra={
                <div
                  style={{
                    display: "flex",
                    width: "max-content",
                    justifyContent: "flex-end",
                  }}
                >
                  <Statistic
                    title="Status"
                    value={dataTrack?.cnote?.pod_status}
                    style={{
                      marginRight: 32,
                    }}
                  />
                  <Statistic
                    title="Price"
                    prefix="Rp."
                    value={dataTrack?.cnote?.shippingcost}
                  />
                </div>
              }
            >
              <Descriptions size="small" column={3}>
                <Descriptions.Item label="Receiver">
                  {dataTrack?.cnote?.cnote_receiver_name}
                </Descriptions.Item>
                <Descriptions.Item label="Estimate Delivery">
                  {dataTrack?.cnote?.estimate_delivery}
                </Descriptions.Item>
                <Descriptions.Item label="Date">
                  {
                    dateFilter.basicDate(new Date(dataTrack?.cnote?.note_date))
                      .upNormal
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Type Sending">
                  {dataTrack?.cnote?.cnote_services_code}
                </Descriptions.Item>
                <Descriptions.Item label="Awb">
                  {dataTrack?.cnote?.cnote_no}
                </Descriptions.Item>
                <Descriptions.Item label="Description Packet">
                  {dataTrack?.cnote?.cnote_goods_descr}
                </Descriptions.Item>
              </Descriptions>
            </Content>
          </PageHeader>
        ) : (
          <p>asda</p>
        )}
      </div>
      <br />
      <br />

      <div className="flex-start wrapperInput">
        {dataTrack ? (
          <div className="flex-between w100">
            <div>
              <h1 style={{ fontSize: "1.trem", color: "magenta" }}>
                Paket Anda saat ini {dataTrack?.cnote?.last_status}
              </h1>
              <br />
              <Timeline key={1} mode={"right"} style={styleOp}>
                {dataTrack?.history?.map((item, index) => (
                  <Timeline.Item key={index} label={item.desc}>
                    <p>{item.date}</p> <p>{item.code}</p>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
            <div style={styleEr}>
              <MyLottie lottie={sendingLottie} />
            </div>
          </div>
        ) : (
          <div style={styleEr}>
            <MyLottie lottie={loadingLottie} />
          </div>
        )}
      </div>
      <div className="flex-start wrapperInput"></div>
    </div>
  );
};

export default TrackingHistory;
