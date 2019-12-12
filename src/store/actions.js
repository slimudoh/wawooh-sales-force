import * as types from "./constant";
import axios from "axios";

export const login = payload => {
  return dispatch => {
    const error = null;
    dispatch(loginError(error));

    new Promise((resolve, reject) => {
      axios
        .post(types.LOGIN__PATH, payload)
        .then(resp => {
          const data = resp.data.data;
          if (data) {
            sessionStorage.setItem("token", data.token);
            axios.defaults.headers.common["Authorization"] = `${data.token}`;
            dispatch(setToken(data.token));
          } else {
            const error = "Wrong Authentication. Please try again.";
            dispatch(loginError(error));
            sessionStorage.removeItem("token");
          }

          resolve(resp);
        })
        .catch(err => {
          const error = "An error occured. Please try again later";
          dispatch(loginError(error));
          sessionStorage.removeItem("token");
          reject(err);
        });
    });
  };
};

export const register = payload => {
  return dispatch => {
    const error = null;
    dispatch(registerError(error));

    new Promise((resolve, reject) => {
      axios
        .post(types.SIGNUP__PATH, payload)
        .then(resp => {
          const data = resp.data.data;

          if (data) {
            sessionStorage.setItem("token", data.token);
            axios.defaults.headers.common["Authorization"] = `${data.token}`;
            dispatch(setToken(data.token));
          } else {
            const error = "Link has been used. Please contact admin.";
            dispatch(registerError(error));
            sessionStorage.removeItem("token");
          }
          resolve(resp);
        })
        .catch(err => {
          const error = "An error occured. Please try again later";
          dispatch(registerError(error));
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

export const getUserDetails = () => {
  return dispatch => {
    new Promise((resolve, reject) => {
      axios
        .get(types.DASHBOARD__PATH)
        .then(resp => {
          const data = resp.data.data;
          dispatch(userDetails(data));
          dispatch(getBankDetails());
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

export const userDetails = payload => {
  return {
    type: types.USER_DETAILS,
    payload: payload
  };
};

export const getBankDetails = () => {
  return dispatch => {
    new Promise((resolve, reject) => {
      axios
        .get(types.GET__BANK__ACCOUNT__PATH)
        .then(resp => {
          const data = resp.data.data;
          dispatch(bankDetails(data));
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

export const bankDetails = payload => {
  return {
    type: types.BANK_DETAILS,
    payload: payload
  };
};

export const loginError = payload => {
  return {
    type: types.LOGIN_ERROR,
    payload: payload
  };
};

export const registerError = payload => {
  return {
    type: types.REGISTER_ERROR,
    payload: payload
  };
};
