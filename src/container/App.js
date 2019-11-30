import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./../assets/css/reset.css";
import "./../assets/css/app.css";

// import Signup from "../pages/signup";
// import Signin from "../pages/signin";
// import Dashboard from "../pages/dashboard";
// import Payment from "../pages/payment";
// import Account from "../pages/account";

const Signup = lazy(() => import("../pages/signup"));
const Signin = lazy(() => import("../pages/signin"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const Payment = lazy(() => import("../pages/payment"));
const Account = lazy(() => import("../pages/account"));

function App() {
  return (
    <div>
      {/* <Signup /> */}
      {/* <Signin /> */}
      {/* <Dashboard /> */}
      {/* <Payment /> */}
      {/* <Account /> */}

      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/payment" component={Payment} />
            <Route path="/account" component={Account} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
