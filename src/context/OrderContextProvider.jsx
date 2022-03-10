import React, { createContext, useState } from "react";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [order, setOrder] = useState({
    bankId: "",
    detail: [],
    kendaraanPaket: "",
    pengembalianId: "",
    pickupId: "",
    tanggalPickup: "",
    tipePengiriman: "",
    tipePickup: "",
    waktuPickup: "",
    other1: {
      kodePosAsal: "",
      originCode: "",
      kecamatanAsal: "",
      alamatId: "",
      expedisiId: "",
      alamatLengkap: "",
    },
  });
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
