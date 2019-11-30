import React from "react";
import { useHistory } from "react-router-dom";

function Signin() {
  let history = useHistory();

  const signin = e => {
    e.preventDefault();
    history.push("/dashboard");
  };

  return (
    <div className="auth">
      <div className="auth__image">
        Sales <br />
        &nbsp;&nbsp;&nbsp;force
      </div>
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
          <span>Kindly complete the form to access your account</span>
        </div>
        <div className="auth__form--form">
          <div>
            <div className="auth__form--form-input">
              <label>Email:</label>
              <div>
                <input type="text" />
              </div>
            </div>

            <div className="auth__form--form-input">
              <label>Password:</label>
              <div>
                <input type="password" />
              </div>
            </div>

            <div className="auth__form--form-msg">
              Not yet registered, check you email for a signup link.
            </div>

            <div className="auth__form--form-button">
              <button onClick={signin}>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
