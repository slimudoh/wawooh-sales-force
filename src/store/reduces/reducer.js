// import * as types from "../actions/constant";
// import axios from "axios";

// const initialState = {
//   token: sessionStorage.getItem("token") || null,
//   isLoggedIn: sessionStorage.getItem("token") ? true : false,
//   userDetails: null,
//   bankDetails: null,
//   loginError: null,
//   registerError: null,
//   userError: null,
//   bankError: null
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.SET_TOKEN:
//       return {
//         ...state,
//         token: action.payload,
//         isLoggedIn: true
//       };
//     case types.LOGOUT:
//       sessionStorage.removeItem("token");
//       delete axios.defaults.headers.common["Authorization"];
//       return {
//         ...state,
//         token: null,
//         isLoggedIn: false,
//         userDetails: null
//       };
//     case types.USER_DETAILS:
//       return {
//         ...state,
//         userDetails: action.payload
//       };
//     case types.BANK_DETAILS:
//       return {
//         ...state,
//         bankDetails: action.payload
//       };
//     case types.LOGIN_ERROR:
//       return {
//         ...state,
//         loginError: action.payload
//       };
//     case types.REGISTER_ERROR:
//       return {
//         ...state,
//         registerError: action.payload
//       };
//     case types.USER_ERROR:
//       return {
//         ...state,
//         userError: action.payload
//       };
//     case types.BANK_ERROR:
//       return {
//         ...state,
//         bankError: action.payload
//       };
//     default:
//       return state;
//   }
// };

// export default reducer;
