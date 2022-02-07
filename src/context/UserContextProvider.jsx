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
