import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <NavLink to="/dashboard">
          <img src={require("../assets/img/logo.svg")} alt="logo" />
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
