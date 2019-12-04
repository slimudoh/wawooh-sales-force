import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./container/App";
import * as serviceWorker from "./serviceWorker";
import reducer from "./store/reducer";

const store = createStore(reducer, applyMiddleware(thunk));

const token = sessionStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
} else {
  axios.defaults.headers.common["Authorization"] = null;
}

// axios.interceptors.response.use(
//   undefined,
//   err =>
//     new Promise(() => {
//       if (Object.keys(err).length !== 0) {
//         if (
//           err.response.status === 401 &&
//           err.config &&
//           !err.config.__isRetryRequest
//         ) {
//           store.dispatch(types.AUTH_LOGOUT);
//           if (window.location.pathname !== "/login") {
//             document.location.href = "/login";
//           }
//         }
//         throw err;
//       }
//       if (window.location.pathname !== "/login") {
//         document.location.href = "/login";
//       }
//     })
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
