import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <img src={require("../assets/img/logo.svg")} alt="logo" />
      </div>
    </div>
  );
}

export default Header;
