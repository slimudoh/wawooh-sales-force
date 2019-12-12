import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./container/App";
import * as actionCreators from "./store/actions/actions";
import * as serviceWorker from "./serviceWorker";

import authReducer from "./store/reduces/auth";
import detailsReducer from "./store/reduces/details";
import errorsReducer from "./store/reduces/error";

const rootReducer = combineReducers({
  auths: authReducer,
  details: detailsReducer,
  err: errorsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const token = sessionStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `${token}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
} else {
  axios.defaults.headers.common["Authorization"] = null;
}

axios.interceptors.response.use(
  function(response) {
    if (response.status === 401) {
      store.dispatch(actionCreators.logout());
      if (window.location.pathname !== "/login") {
        document.location.href = "/login";
      }
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

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
