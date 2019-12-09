import * as types from "./constant";
import axios from "axios";

export const login = payload => {
  return dispatch => {
    new Promise((resolve, reject) => {
      axios
        .post(types.LOGIN__PATH, payload)
        .then(resp => {
          const data = resp.data.data;
          if (data) {
            sessionStorage.setItem("token", data.token);
            axios.defaults.headers.common["Authorization"] = `${data.token}`;
            dispatch(setToken(data.token));
          }

          resolve(resp);
        })
        .catch(err => {
          sessionStorage.removeItem("token");
          reject(err);
        });
    });
  };
};

export const register = payload => {
  return dispatch => {
    new Promise((resolve, reject) => {
      axios
        .post(types.SIGNUP__PATH, payload)
        .then(resp => {
          const data = resp.data.data;

          if (data) {
            sessionStorage.setItem("token", data.token);
            axios.defaults.headers.common["Authorization"] = `${data.token}`;
            dispatch(setToken(data.token));
          }
          resolve(resp);
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          sessionStorage.removeItem("token");
          reject(err);
        });
    });
  };
};

export const setToken = token => {
  return {
    type: types.SET_TOKEN,
    payload: token
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT
  };
};

export const getCurrentEarning = payload => {
  return {
    type: types.SET_EARNING,
    payload: payload
  };
};

export const getTotalPaid = payload => {
  return {
    type: types.GET_PAID,
    payload: payload
  };
};
