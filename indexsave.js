/**
 * @format
 */

import { AppRegistry } from "react-native";
import React from "react";
import App from "./App";
import { name as appName } from "./app.json";

import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ModalsProvider } from "react-native-nested-modals";


import configurePersistentStore from './src/redux/store/configurePersistentStore';

const {store, persistor} = configurePersistentStore();

const RNRedux = () => (
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <PaperProvider>
    <ModalsProvider>
      <App />
    </ModalsProvider>
    </PaperProvider>
    </PersistGate>
  </StoreProvider>
);

AppRegistry.registerComponent(appName, () => RNRedux);

