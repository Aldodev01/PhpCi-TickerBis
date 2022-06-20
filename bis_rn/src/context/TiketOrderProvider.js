import React, {createContext, useState} from 'react';
export const TiketOrderContext = createContext();

const TiketOrderProvider = ({children}) => {
  const [tiketOrder, setTiketOrder] = useState({
    id: 1,
    lokasi: '',
    asal: '',
    tanggal: '',
    jam: '',
    harga: 0,
    keterangan: '',
    stok: 0,
  });
  const [ordered, setOrdered] = useState([]);
  return (
    <TiketOrderContext.Provider
      value={[tiketOrder, setTiketOrder, ordered, setOrdered]}>
      {children}
    </TiketOrderContext.Provider>
  );
};

export default TiketOrderProvider;
