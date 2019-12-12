import * as types from "../actions/constant";

const initialState = {
  loginError: null,
  registerError: null,
  userError: null,
  bankError: null
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      };
    case types.REGISTER_ERROR:
      return {
        ...state,
        registerError: action.payload
      };
    case types.USER_ERROR:
      return {
        ...state,
        userError: action.payload
      };
    case types.BANK_ERROR:
      return {
        ...state,
        bankError: action.payload
      };
    default:
      return state;
  }
};

export default errorsReducer;
