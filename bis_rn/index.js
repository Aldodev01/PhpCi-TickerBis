/**
 * @format
 */
import React from 'react';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import ContextWrapperProvider from './src/context/ContextProvider';

const BisRN = () => {
  return (
    <ContextWrapperProvider>
      <App />
    </ContextWrapperProvider>
  );
};

AppRegistry.registerComponent(appName, () => BisRN);
