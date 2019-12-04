import * as types from "./constant";

export const login = payload => {
  // console.log(payload);
  return dispatch => {
    setTimeout(() => {
      const token = "8888888888";
      dispatch(setToken(token));
    }, 2000);
  };
};

export const register = payload => {
  // console.log(payload);
  return dispatch => {
    setTimeout(() => {
      const token = "8888888888";
      dispatch(setToken(token));
    }, 2000);
  };
};

export const setToken = token => {
  // console.log(token)
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
