import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import axios from "axios";
import dotenv from "dotenv";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ScrollToTop from "./components/ScrollToTp";

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001/";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
