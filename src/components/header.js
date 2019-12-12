import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreators from "../store/actions/actions";

function Header(props) {
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const logout = () => {
      if (!props.isAuth) {
        return <Redirect to="/signin" />;
      }
    };
    logout();
  }, [props.isAuth]);

  const showMobileNav = () => {
    setShowMobile(true);
  };

  const closeMobileNav = () => {
    setShowMobile(false);
  };

  return (
    <div className="header">
      <div className="header__logo">
        <NavLink to="/dashboard">
          <img src={require("../assets/img/logo.svg")} alt="logo" />
        </NavLink>
      </div>

      <div className="header__burger" onClick={showMobileNav}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {showMobile ? (
        <div className="header__burger--cover" onClick={closeMobileNav}></div>
      ) : null}

      {showMobile ? (
        <div className="sidebar__mobile">
          <NavLink to="/dashboard" exact activeClassName="sidebar__active">
            <div onClick={closeMobileNav}>Home</div>
          </NavLink>

          <NavLink to="/payment" exact activeClassName="sidebar__active">
            <div onClick={closeMobileNav}>Payment</div>
          </NavLink>

          <NavLink to="/account" exact activeClassName="sidebar__active">
            <div onClick={closeMobileNav}>Account</div>
          </NavLink>

          <div onClick={props.onLogout}>Log Out</div>
        </div>
      ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
