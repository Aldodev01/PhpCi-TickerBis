import React, { createContext } from "react";
import MenuContextProvider from "./MenuContextProvider";
export const ContextWrapper = createContext();

const ContextWrapperProvider = ({ children }) => {
  return (
    <ContextWrapper.Provider value={[]}>
      <MenuContextProvider>{children}</MenuContextProvider>
    </ContextWrapper.Provider>
  );
};

export default ContextWrapperProvider;
