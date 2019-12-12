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
          {!props.isAuth ? (
            <Route exact path="/fashion/:hashmail/:code" component={Signup} />
          ) : null}
          {!props.isAuth ? <Route path="/signin" component={Signin} /> : null}
          {!props.isAuth ? (
            <Route path="/change-password" component={Password} />
          ) : null}
          {!props.isAuth ? (
            <Route path="/new-password" component={Reset} />
          ) : null}
          {!props.isAuth ? (
            <Route render={() => <Redirect to="/signin" />} />
          ) : null}

          {props.isAuth ? (
            <Route path="/dashboard" component={Dashboard} />
          ) : null}
          {props.isAuth ? <Route path="/payment" component={Payment} /> : null}
          {props.isAuth ? <Route path="/account" component={Account} /> : null}
          {props.isAuth ? <Route component={Notfound} /> : null}
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auths.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);
