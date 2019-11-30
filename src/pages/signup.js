import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  let history = useHistory();

  const [pageOne, setPageOne] = useState(true);
  const [pageTwo, setPageTwo] = useState(false);

  const openPageOne = e => {
    e.preventDefault();

    setPageOne(true);
    setPageTwo(false);
  };

  const openPageTwo = () => {
    setPageOne(false);
    setPageTwo(true);
  };

  const signup = () => {
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
          <span>Kindly complete the form below</span>
        </div>

        {pageOne ? (
          <div className="auth__form--form">
            <div>
              <div className="auth__form--form-input">
                <label>Firstname:</label>
                <div>
                  <input type="text" placeholder="Kayode" />
                </div>
              </div>

              <div className="auth__form--form-input">
                <label>Lastname:</label>
                <div>
                  <input type="text" placeholder="Emeka" />
                </div>
              </div>

              <div className="auth__form--form-input">
                <label>Phone Number:</label>
                <div>
                  <input type="text" placeholder="08070000000" />
                </div>
              </div>

              <div className="auth__form--form-msg">
                Already registered, You can sign in{" "}
                <span>
                  <Link to="/signin">here</Link>
                </span>
              </div>

              <div className="auth__form--form-button">
                <button onClick={openPageTwo}>Next</button>
              </div>
            </div>
          </div>
        ) : null}

        {pageTwo ? (
          <div className="auth__form--form">
            <div>
              <div className="auth__form--form-input">
                <label>Password:</label>
                <div>
                  <input type="password" placeholder="***********" />
                </div>
              </div>

              <div className="auth__form--form-input">
                <label>Confirm Password:</label>
                <div>
                  <input type="password" placeholder="***********" />
                </div>
              </div>

              <div className="auth__form--form-remember">
                <div className="auth__form--form-remember-rem">
                  <input type="checkbox" /> <span>Remember me</span>
                </div>
                <div className="auth__form--form-remember-psd">
                  Forgot Password?
                </div>
              </div>

              <div className="auth__form--form-button">
                <div onClick={openPageOne}>Back</div>
                <div onClick={signup}>Sign Up</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default Signup;
