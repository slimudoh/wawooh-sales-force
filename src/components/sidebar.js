import React from "react";
import { NavLink, useHistory } from "react-router-dom";

function Sidebar() {
  let history = useHistory();

  const logout = () => {
    history.push("/");
  };

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

      <div onClick={logout}>Log Out</div>
    </div>
  );
}

export default Sidebar;
