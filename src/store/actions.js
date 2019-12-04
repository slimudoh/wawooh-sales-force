import * as types from "./constant";

export const login = () => {
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch(save_result());
  //   }, 2000);
  // };
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
