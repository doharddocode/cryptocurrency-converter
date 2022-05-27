import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import AppWrapper from "./components/app";
import store from "./components/app/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);
