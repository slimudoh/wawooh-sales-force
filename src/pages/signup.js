import React from "react";

function Signup() {
  return (
    <div className="auth">
      <div className="auth__image"></div>
      <div className="auth__form">
        <div className="auth__form--logo">
          <div>
            <img src={require("../assets/img/logo.svg")} alt="logo" />
          </div>
        </div>
        <div className="auth__form--heading">
          <p>
            Welcome to the <span>Sales Force</span>
          </p>
          <span>Kindly complete the form below</span>
        </div>
        <div className="auth__form--form">
          <div>kkk</div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
