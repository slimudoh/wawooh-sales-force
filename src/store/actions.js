import * as types from "./constant";

export const login = payload => {
  // console.log(payload);
  return dispatch => {
    setTimeout(() => {
      const token = "8888888888";
      dispatch(loginResponse(token));
    }, 2000);
  };
};

export const loginResponse = token => {
  // console.log(token)
  return {
    type: types.SET_TOKEN,
    payload: token
  };
};

export const register = () => {
  // return (dispatch, getState) => {
  //   const getOldState = getState().counter; //get the old state for use
  //   console.log(getOldState);
  //   setTimeout(() => {
  //     dispatch(save_result());
  //   }, 2000);
  // };
};

export const logout = () => {
  return {
    type: types.LOGOUT
  };
};
