import * as types from "../actions/constant";
import axios from "axios";

const initialState = {
  token: sessionStorage.getItem("token") || null,
  isLoggedIn: sessionStorage.getItem("token") ? true : false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isLoggedIn: true
      };
    case types.LOGOUT:
      sessionStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        userDetails: null
      };

    default:
      return state;
  }
};

export default authReducer;
