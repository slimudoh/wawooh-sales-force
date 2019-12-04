import React from "react";
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
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          {/* <Route exact path="/fashion/:hashmail/:code" component={Signup} /> */}
          <Route path="/signin" component={Signin} />
          <Route path="/change-password" component={Password} />
          <Route path="/new-password" component={Reset} />
          {props.isLoggedIn ? (
            <Route path="/dashboard" component={Dashboard} />
          ) : null}
          {props.isLoggedIn ? (
            <Route path="/payment" component={Payment} />
          ) : null}
          {props.isLoggedIn ? (
            <Route path="/account" component={Account} />
          ) : null}
          {props.isLoggedIn ? <Route component={Notfound} /> : null}
          {!props.isLoggedIn ? (
            <Route render={() => <Redirect to="/signin" />} />
          ) : null}
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);
