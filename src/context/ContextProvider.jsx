import React, { createContext } from "react";
import MenuContextProvider from "./MenuContextProvider";
import UserContextProvider from "./UserContextProvider";
export const ContextWrapper = createContext();

const ContextWrapperProvider = ({ children }) => {
  return (
    <ContextWrapper.Provider value={[]}>
      <UserContextProvider>
        <MenuContextProvider>{children}</MenuContextProvider>
      </UserContextProvider>
    </ContextWrapper.Provider>
  );
};

export default ContextWrapperProvider;
