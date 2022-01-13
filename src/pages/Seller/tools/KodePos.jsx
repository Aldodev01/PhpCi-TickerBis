import { Button, Input, Select, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { AiOutlineCopy } from "react-icons/ai";
// import Lottie from "react-lottie";
// import notFound from "../../../assets/lottie/notfound.json";
import Loading from "../../../assets/lottie/loading.json";
import signInLottie from "../../../assets/lottie/signInLotie.json";
import Lottie from "react-lottie";

const KodePos = () => {
  const [chooser, setChooser] = useState("Kelurahan");
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const { Option } = Select;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading ? signInLottie : Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // "xMidYMid slice"`
    },
  };
  return (
    <div>
      <h1 style={{ fontSize: 30, fontWeight: "bold" }}>Cek Kode Pos</h1>
      <div>
        <Space>
          <h1>By </h1>
          {change ? (
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              defaultValue={chooser}
              onChange={(e) => {
                setChooser(e);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="Kelurahan">Kelurahan</Option>
              <Option value="Kecamatan">Kecamatan</Option>
              <Option value="Kota">Kota</Option>
              <Option value="Kodepos">Kode Pos</Option>
            </Select>
          ) : (
            <h1>{chooser}</h1>
          )}
          <Tooltip color="#ed0678" title="Change Modes">
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setChange(!change);
              }}
            >
              <CgArrowsExchangeAltV style={{ fontSize: 30 }} />
            </Button>
          </Tooltip>
        </Space>
        <Input size="large" placeholder={`Masukan ${chooser} Anda`} />
        <br />
        <br />
        <br />
        <Space>
          <Space direction="vertical">
            <h3>Provinsi</h3>
            <Space>
              <Input size="large" disabled placeholder="Provinsi" />
              <Tooltip color="#ed0678" title="Copy your Provinsi">
                <Button type="primary">
                  <AiOutlineCopy style={{ fontSize: 20 }} />
                </Button>
              </Tooltip>
            </Space>
          </Space>
          {/*  */}
          <Space direction="vertical">
            <h3>Kota</h3>
            <Space>
              <Input size="large" disabled placeholder="Kota" />
              <Tooltip color="#ed0678" title="Copy your Kota">
                <Button type="primary">
                  <AiOutlineCopy style={{ fontSize: 20 }} />
                </Button>
              </Tooltip>
            </Space>
          </Space>
          {/*  */}
          <Space direction="vertical">
            <h3>Kecamatan</h3>
            <Space>
              <Input size="large" disabled placeholder="Kecamatan" />
              <Tooltip color="#ed0678" title="Copy your Kecamatan">
                <Button type="primary">
                  <AiOutlineCopy style={{ fontSize: 20 }} />
                </Button>
              </Tooltip>
            </Space>
          </Space>
          {/*  */}
          <Space direction="vertical">
            <h3>Kelurahan</h3>
            <Space>
              <Input size="large" disabled placeholder="Kelurahan" />
              <Tooltip color="#ed0678" title="Copy your Kelurahan">
                <Button type="primary">
                  <AiOutlineCopy style={{ fontSize: 20 }} />
                </Button>
              </Tooltip>
            </Space>
          </Space>
        </Space>
        <br />
        <br />
        <br />
        <br />

        <Space>
          <Input
            size="large"
            style={{ width: 300 }}
            disabled
            placeholder="Kelurahan"
          />
          <Tooltip color="#ed0678" title="Copy your Kelurahan">
            <Button
              type="primary"
              className="flex-center"
              style={{ height: 50 }}
              size="large"
            >
              <Space>
                <AiOutlineCopy style={{ fontSize: 30 }} />
                <p style={{ marginTop: 10 }}>Salin Kode Pos</p>
              </Space>
            </Button>
          </Tooltip>
        </Space>
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            height: "100%",
            maxHeight: 300,
            position: "absolute",
            right: 10,
            bottom: 10,
          }}
        >
          <Lottie options={defaultOptions} width={"100%"} height={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default KodePos;
