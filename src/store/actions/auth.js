// import axios from "axios";
// import * as types from "../constant";

// export const register = user => {
//   new Promise((resolve, reject) => {
//     axios
//       .post(types.SIGNUP, user)
//       .then(resp => {
//         const token = resp.data.data.token;
//         const userData = resp.data.data.user;
//         sessionStorage.setItem("userToken", token);
//         sessionStorage.setItem("userDetails", JSON.stringify(userData));
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         resolve(resp);
//         console.log(resp);
//       })
//       .catch(err => {
//         sessionStorage.removeItem("userToken");
//         sessionStorage.removeItem("userDetails");
//         reject(err);
//         console.log(err);
//       });
//   });
// };
