import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: "",
    username: "",
    email: "",
    idUser: "",
    photo: "",
    validDate: "",
    expedisi: "9a3ec075-649c-4c70-82d5-9a56abc1d805",
    user: {
      kodeToko: null,
    },
    // qis_key_api: "",
    // qis_key_channel: "",
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
