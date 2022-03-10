import { Button, Collapse, Form, message, Modal, Space, Upload } from "antd";
import React, {
  useRef,
  useState,
  CSSProperties,
  useEffect,
  useContext,
} from "react";
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";
import MyLottie from "../Lottie/MyLottie";
import uploadLottie from "../../assets/lottie/upload.json";
import loadingLottie from "../../assets/lottie/loading.json";
import "./upload.less";
import { OrderContext } from "../../context/OrderContextProvider";
import { GetPriceLocation } from "../../api/EXPEDITION";

const UploadCsv = ({ proModal, data, inputPayload, reset }) => {
  const { modal, setModal } = proModal;
  const { dataPackage, setDataPackage } = data;
  const { inputer, setInputer } = inputPayload;
  const buttonref = useRef(null);
  const { Panel } = Collapse;
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useContext(OrderContext);

  const { Dragger } = Upload;
  const { CSVReader } = useCSVReader();

  const JsonToCsv = async () => {
    const dataDownload = [
      {
        ["Nama Penerima"]: "aldodevv",
        ["Alamat Penerima"]: "Jl. Kebon Duren No.1 Jakarta",
        ["No Telp Penerima"]: "+6281389166337",
        ["Kode Pos"]: "1234",
        ["Kecamatan"]: "Tegal Parang",
        ["Berat Kg"]: "1",
        ["Nilai Cod"]: "200000",
        ["Isi Paket Nama Produk"]: "Buku",
        ["Jumlah Paket"]: "4",
        ["Instruksi Pengiriman"]: "Tolong dong paket jangan dilempar",
      },
    ];
    const csvRows = [];
    const header = await Object.keys(dataDownload[0]);
    csvRows.push(header.join(","));
    for (const row of dataDownload) {
      const values = await header.map((head) => {
        const escape = ("" + row[head]).replace(/"/g, '\\"');
        return `"${escape}"`;
      });
      let csvContent = "data:text/csv;charset=utf-8,";
      let rows = await csvRows.push(values.join(","));

      csvContent += rows + "\r\n";
    }
    const csvData = await csvRows.join("\n");
    const blob = await new Blob([csvData], { type: "text/csv" });
    const url = await window.URL.createObjectURL(blob);
    const a = await document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "aldodevv.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    if (loading) {
      reset();
    }
  }, [loading]);

  const resultUpload = async (data) => {
    setLoading(true);
    const columns = await data.data[0].map((col, idx) => {
      return {
        header: col,
        accessor: col.split(" ").join("_").toLowerCase(),
      };
    });

    // const columns = [
    //   {
    //     header: "Nama Penerima",
    //     accessor: "namaPenerima",
    //   },
    //   {
    //     header: "Nomor Telepon",
    //     accessor: "noTelpPenerima",
    //   },
    //   {
    //     header: "Kode Pos",
    //     accessor: "kodePos",
    //   },

    //   {
    //     header: "Berat",
    //     accessor: "beratPaket",
    //   },
    //   {
    //     header: "Kecamatan",
    //     accessor: "kelurahanPenerima",
    //   },
    //   {
    //     header: "Isi Paket (Nama Produk)",
    //     accessor: "deskripsiPaket",
    //   },
    //   {
    //     header: "Nilai COD (Jika COD)",
    //     accessor: "nilaiCod",
    //   },
    //   {
    //     header: "Instruksi Pengiriman",
    //     accessor: "pesanKhusus",
    //   },

    //   {
    //     header: "Quantity",
    //     accessor: "jumlahPaket",
    //   },

    //   {
    //     header: "Alamat Penerima",
    //     accessor: "alamatPenerima",
    //   },
    // ];

    const rows = await data.data.slice(1).map((row) => {
      return row.reduce((acc, curr, index) => {
        acc[columns[index].accessor] = curr;
        return acc;
      }, {});
    });

    let arrData = [];
    let newData = await rows?.map((row) => {
      arrData.push({
        namaPenerima: row?.nama_penerima,
        beratPaket: parseInt(row?.berat),
        pesanKhusus: row?.instruksi_pengiriman,
        deskripsiPaket: row["isi_paket_(nama_produk)"],
        kelurahanPenerima: row?.kecamatan + ", " + row?.kode_pos,
        kodePosPenerima: row?.kode_pos,
        alamatPenerima: row?.alamat_penerima,
        nilaiCod: row["nilai_cod_(jika_cod)"],
        nomorTelpPenerima: row?.nomor_telepon,
        jumlahPaket: parseInt(row?.quantity),
      });
    });

    const dataProcess = await arrData.forEach((data) => {
      const isNullish = Object.values(data).some((value) => {
        if (!value) {
          return true;
        }
        return false;
      });

      const nilaiCod = parseInt(data.nilaiCod);
      let priceCodFee = (2 / 100) * nilaiCod;

      if (isNullish) {
        message.info(
          "Pastikan Anda Memasukan Data Sesuai dengan contoh pada template :)",
          5
        );
      } else {
        GetPriceLocation(
          data.beratPaket,
          order.other1.kecamatanAsal,
          data.kelurahanPenerima?.split(",")[0],
          order.other1.kodePosAsal,
          data.kelurahanPenerima?.split(",")[1].trim()
        )
          .then(async (res) => {
            if ((await res.status) == 200) {
              const discPrice = await parseInt(res?.data?.discPrice);
              const nettSeller = nilaiCod - discPrice - priceCodFee;
              // ----------------------------------------------------
              data.kelurahanPenerima = res?.data?.destination_name;
              data.nilaiOngkir = res?.data?.discPrice;
              data.destinationCode = res?.data?.destinationCode;
              data.estimatedFrom = res?.data?.etd_from;
              data.estimatedThru = res?.data?.etd_thru;
              data.codfee = priceCodFee;
              data.nettSeller = nettSeller;
              data.isAsuransi = false;
              data.kodePaket = "REG";
              data.layananPickup = "Reguler";
              data.kodePosPenerima = data.kodePosPenerima;
              data.nilaiBarang = 0;
              data.originCode = order.other1.originCode;
              data.valid = true;
              await setModal({
                ...modal,
                visible: false,
              });
              reset();
              await setDataPackage(arrData);
            } else {
              // ----------------------------------------------
              data.kelurahanPenerima = "-";
              data.nilaiOngkir = 0;
              data.destinationCode = "-";
              data.estimatedFrom = "0";
              data.estimatedThru = "0";
              data.codfee = 0;
              data.nettSeller = 0;
              data.isAsuransi = false;
              data.kodePaket = "REG";
              data.layananPickup = "Reguler";
              data.kodePosPenerima = data.kodePosPenerima;
              data.nilaiBarang = 0;
              data.originCode = order.other1.originCode;
              data.valid = false;

              reset();
              await setDataPackage(arrData);
              message.error("Gagal Mengambil Data Ongkir", 5);
            }
          })
          .catch((err) => {
            // ----------------------------------------------
            data.kelurahanPenerima = "-";
            data.nilaiOngkir = 0;
            data.destinationCode = "-";
            data.estimatedFrom = "0";
            data.estimatedThru = "0";
            data.codfee = 0;
            data.nettSeller = 0;
            data.isAsuransi = false;
            data.kodePaket = "REG";
            data.layananPickup = "Reguler";
            data.kodePosPenerima = data.kodePosPenerima;
            data.nilaiBarang = 0;
            data.originCode = order.other1.originCode;
            data.valid = false;

            reset();
            setDataPackage(arrData);
            message.error("Terjadi Kesalahan Pada Server", 5);
          });
      }
    });

    // if (arrData?.length > 1) {
    //   setModal({
    //     ...modal,
    //     visible: false,
    //   });
    // }
    await setLoading(false);
  };

  return (
    <Modal
      title="Upload Massal Pada Pengiriman Baru "
      centered
      visible={modal.visible}
      onOk={() =>
        setModal({
          ...modal,
          visible: !modal.visible,
        })
      }
      onCancel={() =>
        setModal({
          ...modal,
          visible: !modal.visible,
        })
      }
      footer={[<Button key="back">Return</Button>]}
      width={1000}
    >
      {/* <input
        id="uploadCsv"
        type={"file"}
        accept={".csv"}
        onChange={(e) => {
          const fileReader = new FileReader();

          fileReader.onload = (e) => {
            const res = e.target.result;
            console.log(e.target.result);
          };

          fileReader?.readAsText(e.target.files[0]);
        }}
        hidden
      /> */}
      <div className="flex-between w100">
        <div
          style={{
            width: "100%",
            maxWidth: 250,
            height: "100%",
            maxHeight: 300,
          }}
        >
          {!loading ? (
            <MyLottie lottie={uploadLottie} />
          ) : (
            <MyLottie lottie={loadingLottie} />
          )}
        </div>
        <div className="flex-column-center w100" style={{ gap: 20 }}>
          <Collapse className="w100 collapse-csv">
            {CollapseText.map((e, i) => (
              <Panel header={e.title} key={e.key}>
                <p>{e.content}</p>
              </Panel>
            ))}
          </Collapse>
          <CSVReader
            onUploadAccepted={resultUpload}
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDragLeave={(event) => {
              event.preventDefault();
            }}
          >
            {({
              getRootProps,
              acceptedFile,
              ProgressBar,
              getRemoveFileProps,
              Remove,
            }) => (
              <>
                <Space>
                  <div
                    {...getRootProps()}
                    className="upload-csv w100 flex-center"
                  >
                    {acceptedFile ? (
                      <>
                        <div>
                          <Space>
                            <span>{formatFileSize(acceptedFile.size)}</span>
                            <span>{acceptedFile.name}</span>
                          </Space>
                          <div>
                            <ProgressBar />
                          </div>
                          <div
                            className="cancel-csv flex-center w100"
                            {...getRemoveFileProps()}
                            onMouseOver={(event) => {
                              event.preventDefault();
                            }}
                            onMouseOut={(event) => {
                              event.preventDefault();
                            }}
                          >
                            Batalkan
                          </div>
                        </div>
                      </>
                    ) : (
                      "Drop CSV file here or click to upload"
                    )}
                  </div>
                </Space>
              </>
            )}
          </CSVReader>
          <Button danger onClick={JsonToCsv}>
            Download Template
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const CollapseText = [
  {
    key: 1,
    title: "1. First Step",
    content:
      "Template sudah Kami sediakan, jadi tolong gunakan template yang sudah tersedia untuk membuat pengiriman, perhatikan kolom dan baris yang ada, Anda Dapat Mendownloadnya di bawah ini",
  },
  {
    key: 2,
    title: "2. Second Step",
    content:
      "Untuk menghindari kesalahan pada sistem, kami menyarankan tidak menggunakan Special Character, contoh : !@#$%^&*()_+-=[]{}|;':\\\",./<>? , dan perhatikan kembali isi dari file yang sudah di isi agar tidak terjadi kesalahpahaman",
  },
  {
    key: 3,
    title: "3. Third Step",
    content:
      "Upload File CSV yang sudah diisi dengan benar, dengan klik upload dan tunggu sebentar, kami aman mengonversi data file anda kedalam sistem",
  },
];

export default UploadCsv;
