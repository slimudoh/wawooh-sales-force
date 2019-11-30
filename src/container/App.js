import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/payment" component={Payment} />
          <Route path="/account" component={Account} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
