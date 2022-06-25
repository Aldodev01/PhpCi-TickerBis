import { Drawer, message, Tooltip } from "antd";
import React, { useContext, useEffect, useState, createRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  GetDetailOrderHistory,
  GetDetailOrderHistoryByDate,
} from "../../../../../api/HISTORY";
import { UserContext } from "../../../../../context/UserContextProvider";
import { RiShareForwardBoxLine } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import {
  PageHeader,
  Button,
  Tag,
  Typography,
  Row,
  Descriptions,
  Space,
} from "antd";
import { IoLogoWhatsapp } from "react-icons/io5";
import CancelOrderForm from "../../../../../components/MyForm/CancelOrderForm";
import ReactToPrint from "react-to-print";
import Pdf from "../../../../../components/resource/PDF";
import {
  IoPrintOutline,
  IoPrint,
  IoPrintSharp,
  IoHandLeft,
} from "react-icons/io5";
const DetailHistory = () => {
  const componentRef = createRef();
  const { id } = useParams();
  const idBatch = id.replace(":", "");
  const [dataTable, setDataTable] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [checkStrictly, setCheckStrictly] = useState({
    isModal: false,
    loading: false,
    data: null,
    jumlah: 0,
    check: false,
  });

  const [payload, setPayload] = useState({
    page: 0,
    size: 30,
    keyword: "",
  });

  const [cancel, setCancel] = useState({
    modal: false,
    data: null,
  });

  const [tanggal, setTanggal] = useState({
    dateStart: null,
    dateEnd: null,
  });
  const { Paragraph } = Typography;
  const navigate = useNavigate();

  const iconStyle = {
    fontSize: 20,
    marginTop: -20,
    marginRight: 10,
  };

  const IconLink = ({ icon, text, link, wa }) => {
    if (wa) {
      var string = wa;
      var newString =
        string?.indexOf("08") == 0 ? string?.replace("08", "62") : string;
      return (
        <a href={`https://wa.me/${newString}`} target={"_blank"}>
          <div className="flex-center">
            {icon}
            <p>{text}</p>
          </div>
        </a>
      );
    } else {
      return (
        <div
          className="flex-center "
          onClick={() => {
            if (text === "Share Label Url") {
              window.open(link, "_blank");
            } else {
              navigate(link);
            }
          }}
        >
          <div className="flex-center">
            {icon}
            <p>{text}</p>
          </div>
        </div>
      );
    }
  };

  const Content = ({ children, extraContent }) => (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );

  const handlingModal = () => {
    setCheckStrictly({
      ...checkStrictly,
      isModal: !checkStrictly.isModal,
    });
  };

  const handleDrawer = () => {
    setCancel({
      ...cancel,
      modal: !cancel.modal,
    });
  };

  useEffect(() => {
    if (user.idUser !== null) {
      if (tanggal.dateStart && tanggal.dateEnd) {
        GetDetailOrderHistoryByDate(
          user.idUser,
          idBatch,
          payload.page,
          payload.size,
          payload.keyword,
          tanggal.dateStart,
          tanggal.dateEnd
        )
          .then((res) => {
            console.log(res);
            setDataTable(res.data.content);
          })
          .catch((err) => {
            message.error(
              "Terjadi Kesalahan Pada Server, saat mendapatkan data",
              5
            );
          });
      } else {
        GetDetailOrderHistory(
          user.idUser,
          idBatch,
          payload.page,
          payload.size,
          payload.keyword
        )
          .then((res) => {
            console.log(res);
            setDataTable(res.data.content);
          })
          .catch((err) => {
            message.error(
              "Terjadi Kesalahan Pada Server, saat mendapatkan data",
              5
            );
          });
      }
    } else {
      message.info("ログインしてください", 3);
    }
  }, [tanggal, user]);

  return (
    <div>
      <h1 style={{ fontSize: "2rem" }}>Detail Order History</h1>

      <br />
      <br />

      <Button type="primary" onClick={handlingModal}>
        Print Sekaligus
      </Button>
      <br />
      <br />

      <div className="flex-column-center">
        {dataTable ? (
          dataTable.map((e, i) => (
            <PageHeader
              key={i}
              title={e?.namaPenerima}
              className="site-page-header"
              subTitle={
                <Tag color={e?.tipePengiriman == "NONCOD" ? "magenta" : "cyan"}>
                  {e?.tipePengiriman}
                </Tag>
              }
              tags={
                <Tag
                  color={e?.statusPengiriman == "CANCELED" ? "magenta" : "cyan"}
                >
                  {e?.statusPengiriman}
                </Tag>
              }
              extra={[
                <Tooltip title="Double Click For Cancel Order" color="magenta">
                  <Button
                    key="1"
                    disabled={e?.statusPengiriman == "CANCELED" ? true : false}
                    type="danger"
                    onDoubleClick={() => {
                      setCancel({
                        ...cancel,
                        modal: !cancel.modal,
                        data: e,
                      });
                    }}
                  >
                    Cancel Order
                  </Button>
                </Tooltip>,
              ]}
              avatar={{
                src: "https://joeschmoe.io/api/v1/random",
              }}
            >
              <Content key={i}>
                <Descriptions size="small" key={i} column={2}>
                  <Descriptions.Item label="Order Id">
                    {e?.orderId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tanggal Pickup">
                    {e?.tanggalPickup}
                  </Descriptions.Item>
                  <Descriptions.Item label="No. Resi">
                    {e?.resi}
                  </Descriptions.Item>
                  <Descriptions.Item label="Estimasi Pengiriman">
                    {e?.perkiraanTiba} Hari
                  </Descriptions.Item>
                </Descriptions>
                <br />
                <Space>
                  <IconLink
                    icon={<GrMapLocation style={iconStyle} />}
                    link={`/dashboard/pengiriman/history/tracking/${user.expedisi}/${e?.resi}`}
                    text="Tracking Resi"
                  />
                  <IconLink
                    icon={<IoLogoWhatsapp style={iconStyle} />}
                    text="Whatsapp"
                    wa={e?.telpPenerima}
                  />
                  <IconLink
                    icon={<RiShareForwardBoxLine style={iconStyle} />}
                    link={`/shared-label/${user.idUser}/${e?.resi}`}
                    text="Share Label Url"
                  />
                </Space>
              </Content>
            </PageHeader>
          ))
        ) : (
          <p>uuuu</p>
        )}
        <Drawer
          title="Alasan Anda Mengajukan Cancel Order"
          placement={"bottom"}
          onClose={handleDrawer}
          visible={cancel.modal}
          height={600}
          extra={
            <Space>
              <Button onClick={handleDrawer}>Cancel</Button>
            </Space>
          }
        >
          <CancelOrderForm state={{ cancel, setCancel }} />
        </Drawer>
      </div>

      <Drawer
        title="Pilih Ukuran yang Anda Butuhkan"
        placement={"bottom"}
        width={500}
        onClose={handlingModal}
        visible={checkStrictly.isModal}
      >
        <ReactToPrint
          trigger={() => (
            <Button
              style={{
                position: "relative",
              }}
              type="primary"
              icon={<IoPrintSharp />}
            >
              Print Thermal 10x10
            </Button>
          )}
          content={() => componentRef.current}
        />
        <div style={{ display: "none" }}>
          <Pdf data={{ checkStrictly, setCheckStrictly }} ref={componentRef} />;
        </div>
        <ReactToPrint
          trigger={() => (
            <Button
              style={{
                position: "relative",
              }}
              type="primary"
              icon={<IoPrintSharp />}
            >
              Print Thermal 10x15
            </Button>
          )}
          content={() => componentRef.current}
        />
      </Drawer>
    </div>
  );
};

export default DetailHistory;
