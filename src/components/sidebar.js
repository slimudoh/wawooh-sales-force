import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreators from "../store/actions/actions";

function Sidebar(props) {
  useEffect(() => {
    const logout = () => {
      if (!props.isAuth) {
        return <Redirect to="/signin" />;
      }
    };
    logout();
  }, [props.isAuth]);

  return (
    <div className="sidebar">
      <NavLink to="/dashboard" exact activeClassName="sidebar__active">
        <div>Home</div>
      </NavLink>

      <NavLink to="/payment" exact activeClassName="sidebar__active">
        <div>Payment</div>
      </NavLink>

      <NavLink to="/account" exact activeClassName="sidebar__active">
        <div>Account</div>
      </NavLink>

      <div onClick={props.onLogout}>Log Out</div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auths.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
