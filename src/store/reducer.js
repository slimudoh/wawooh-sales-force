import * as types from "./constant";
import axios from "axios";

const initialState = {
  token: sessionStorage.getItem("token") || null,
  isLoggedIn: sessionStorage.getItem("token") ? true : false,
  userDetails: null
};

const reducer = (state = initialState, action) => {
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
    case types.USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      };
  }

  return state;
};

export default reducer;
