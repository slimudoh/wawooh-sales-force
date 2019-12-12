import * as types from "../actions/constant";

const initialState = {
  userDetails: null,
  bankDetails: null
};

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      };
    case types.BANK_DETAILS:
      return {
        ...state,
        bankDetails: action.payload
      };

    default:
      return state;
  }
};

export default detailsReducer;
