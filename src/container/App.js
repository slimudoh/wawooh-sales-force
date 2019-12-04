import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

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

function App(props) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (!props.token) {
      setAuth(false);
      return;
    }

    setAuth(true);
  }, [props.token]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          {/* <Route exact path="/fashion/:hashmail/:code" component={Signup} /> */}
          <Route path="/signin" component={Signin} />
          <Route path="/change-password" component={Password} />
          <Route path="/new-password" component={Reset} />
          {auth ? <Route path="/dashboard" component={Dashboard} /> : null}
          {auth ? <Route path="/payment" component={Payment} /> : null}
          {auth ? <Route path="/account" component={Account} /> : null}
          {auth ? <Route component={Notfound} /> : null}
          {!auth ? <Route render={() => <Redirect to="/signin" />} /> : null}
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(App);
