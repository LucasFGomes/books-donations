import React from "react";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
