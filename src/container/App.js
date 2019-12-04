import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./../assets/css/reset.css";
import "./../assets/css/app.css";

import Signup from "../pages/signup";
import Signin from "../pages/signin";
import Password from "../pages/password";
import Reset from "../pages/reset";
import Dashboard from "../pages/dashboard";
import Payment from "../pages/payment";
import Account from "../pages/account";
import Notfound from "../pages/notfound";

function App() {
  const [auth, setAuth] = useState(true);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/fashion/:hashmail/:code" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/change-password" component={Password} />
          <Route path="/new-password" component={Reset} />
          {auth ? <Route path="/dashboard" component={Dashboard} /> : null}
          {auth ? <Route path="/payment" component={Payment} /> : null}
          {auth ? <Route path="/account" component={Account} /> : null}
          {auth ? <Route component={Notfound} /> : null}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
