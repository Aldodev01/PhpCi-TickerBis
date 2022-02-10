//! REACT
import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
import { DatePicker, message, Select, Space, Button } from "antd";

//! CONTEXT
import { UserContext } from "../../../../context/UserContextProvider";

//! COMPONENT && ASSETS && UTILS
import "./Monitoring.less";
import CardSummary from "../../../../components/CardSummary/CardSummary";
import UserMonitoring from "../../../../components/table/UserMonitoring";
import MyLottie from "../../../../components/Lottie/MyLottie";
import waitingPickup from "../../../../assets/lottie/waitingPickup.json";
import loading from "../../../../assets/lottie/loading.json";
import { getFirst, getLast } from "../../../../utils/date/SummaryDate";

//! API
import { MonitoringTable } from "../../../../api/MONITORING";
import Pdf from "../../../../components/resource/PDF";
import ReactToPrint from "react-to-print";

const Monitoring = () => {
  //! CONFIG ANTD
  const { Option } = Select;

  // ! STATE CONTEXT
  const [user, setUser] = useContext(UserContext);

  // ! STATE
  const [tableData, setTableData] = useState(null);
  const [dataPdf, setDataPdf] = useState([]);
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
  const [pdf, setPdf] = useState({
    isModal: false,
  });
  const componentRef = createRef();

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
      setDataPdf(table_data?.data?.content);
    }
  }, [table_data]);

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

          <ReactToPrint
            trigger={() => (
              <Button
                style={{
                  position: "relative",
                }}
              >
                MODAL
              </Button>
            )}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            <Pdf data={{ dataPdf, setDataPdf }} ref={componentRef} />;
          </div>

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
