import React from "react";
import "./../assets/css/reset.css";
import "./../assets/css/app.css";

import Signup from "../pages/signup";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard";
import Payment from "../pages/payment";
import Account from "../pages/account";

function App() {
  return (
    <div>
      {/* <Signup /> */}
      {/* <Signin /> */}
      {/* <Dashboard /> */}
      {/* <Payment /> */}
      <Account />
    </div>
  );
}

export default App;
