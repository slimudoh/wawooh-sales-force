import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
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
    </div>
  );
}

export default Sidebar;
