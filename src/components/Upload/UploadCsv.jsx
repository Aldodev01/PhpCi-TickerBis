import { Button, Modal, Space } from "antd";
import React, { useRef, useState, CSSProperties } from "react";
import { useCSVReader } from "react-papaparse";

const UploadCsv = ({ proModal, data, inputPayload }) => {
  const { modal, setModal } = proModal;
  const { dataPackage, setDataPackage } = data;
  const { inputer, setInputer } = inputPayload;
  const buttonref = useRef(null);

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
    console.log(header);

    for (const row of dataDownload) {
      console.log(row);
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

  const resultUpload = async (data) => {
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
    let newData = await rows.map((row) => {
      arrData.push({
        namaPenerima: row?.nama_penerima,
        beratPaket: row?.berat_kg,
        pesanKhusus: row?.instruksi_pengiriman,
        deskripsiPaket: row?.isi_paket_nama_produk,
        kelurahanPenerima: row?.kecamatan + ", " + row?.kode_pos,
        alamatPenerima: row?.alamat_penerima,
        nilaiCod: row?.nilai_cod,
        nomorTelpPenerima: row?.no_telp_penerima,
        jumlahPaket: row?.jumlah_paket,
      });
    });
    await setDataPackage(arrData);
    if (arrData.length > 1) {
      setModal({
        ...modal,
        visible: false,
      });
    }
  };

  return (
    <Modal
      title="Modal 1000px width"
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
      <input
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
      />
      <Space>
        <CSVReader onUploadAccepted={resultUpload}>
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
          }) => (
            <>
              <Space>
                <Button type="primary" {...getRootProps()}>
                  Upload Sekaligus
                </Button>
                <Button
                  type="danger"
                  {...getRemoveFileProps()}
                  onClick={() => {
                    setDataPackage([inputer]);
                  }}
                >
                  Batalkan
                </Button>
              </Space>
              <div>{acceptedFile && acceptedFile.name}</div>
              <ProgressBar />
            </>
          )}
        </CSVReader>
        <Button danger onClick={JsonToCsv}>
          Download Template
        </Button>
      </Space>
    </Modal>
  );
};

export default UploadCsv;
