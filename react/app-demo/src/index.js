import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import ReduxContext from "./ReduxDemo/useDiyRedux3/context";
import { store } from "./ReduxDemo/useDiyRedux3/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxContext.Provider value={store}>
    <App />
  </ReduxContext.Provider>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
