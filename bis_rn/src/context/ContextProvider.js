import React, {createContext} from 'react';
import TiketOrderProvider from './TiketOrderProvider';

export const ContextWrapper = createContext();

const ContextWrapperProvider = ({children}) => {
  return (
    <ContextWrapper.Provider value={[]}>
      <TiketOrderProvider>{children}</TiketOrderProvider>
    </ContextWrapper.Provider>
  );
};
export default ContextWrapperProvider;
