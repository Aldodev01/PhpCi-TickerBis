import React, { createContext } from "react";
import MenuContextProvider from "./MenuContextProvider";
import MenuMobileProvider from "./MenuMobileProvider";
import OrderContextProvider from "./OrderContextProvider";
import UserContextProvider from "./UserContextProvider";
export const ContextWrapper = createContext();

const ContextWrapperProvider = ({ children }) => {
  return (
    <ContextWrapper.Provider value={[]}>
      <UserContextProvider>
        <MenuMobileProvider>
          <OrderContextProvider>
            <MenuContextProvider>{children}</MenuContextProvider>
          </OrderContextProvider>
        </MenuMobileProvider>
      </UserContextProvider>
    </ContextWrapper.Provider>
  );
};

export default ContextWrapperProvider;
