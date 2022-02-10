import React, { createContext } from "react";
import MenuContextProvider from "./MenuContextProvider";
import MenuMobileProvider from "./MenuMobileProvider";
import UserContextProvider from "./UserContextProvider";
export const ContextWrapper = createContext();

const ContextWrapperProvider = ({ children }) => {
  return (
    <ContextWrapper.Provider value={[]}>
      <UserContextProvider>
        <MenuMobileProvider>
          <MenuContextProvider>{children}</MenuContextProvider>
        </MenuMobileProvider>
      </UserContextProvider>
    </ContextWrapper.Provider>
  );
};

export default ContextWrapperProvider;
