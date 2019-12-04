import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import * as types from "../store/actions";

function Sidebar(props) {
  let history = useHistory();

  useEffect(() => {
    if (!props.token) {
      history.push("/signin");
      return;
    }
  }, [props.token]);

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
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(types.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
