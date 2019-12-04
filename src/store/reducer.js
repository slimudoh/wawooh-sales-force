import * as types from "./constant";
import axios from "axios";

const initialState = {
  token: sessionStorage.getItem("token") || null,
  isLoggedIn: sessionStorage.getItem("token") ? true : false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TOKEN:
      const token = sessionStorage.setItem("token", action.payload);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
        isLoggedIn: false
      };
  }

  return state;
};

export default reducer;
