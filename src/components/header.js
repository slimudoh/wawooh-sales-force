import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

function Header() {
  let history = useHistory();
  const [showMobile, setShowMobile] = useState(false);

  const showMobileNav = () => {
    setShowMobile(true);
  };

  const closeMobileNav = () => {
    setShowMobile(false);
  };

  const logout = () => {
    history.push("/signin");
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

          <div onClick={logout}>Log Out</div>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
