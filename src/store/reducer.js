import * as types from "./constant";
import axios from "axios";

const initialState = {
  token: 6464664646464
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.LOGIN:
    //   const newState = Object.assign({}, state);
    //   newState.counter = state.counter + 1;
    //   return newState;

    // case types.REGISTER:
    //   return {
    //     ...state,
    //     counter: state.counter - 1
    //   };
    case types.LOGOUT:
      sessionStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      return {
        ...state,
        token: null
      };
  }

  return state;
};

export default reducer;
