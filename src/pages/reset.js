import React, { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Error from "../components/error";
import Success from "../components/success";

function Reset() {
  let history = useHistory();

  const password = useRef(null);
  const confirm = useRef(null);

  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const signin = e => {
    e.preventDefault();

    let passwordInput = password.current;
    let confirmInput = confirm.current;

    if (passwordInput.value.trim() === "") {
      setErrorMessage("Please enter your password.");
      setErrorStatus(true);
      return;
    }

    if (confirmInput.value.trim() === "") {
      setErrorMessage("Please confirm your password.");
      setErrorStatus(true);
      return;
    }

    if (passwordInput.value.trim() !== confirmInput.value.trim()) {
      setErrorMessage("Passwords not identical.");
      setErrorStatus(true);
      return;
    }

    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);

    console.log(passwordInput.value);

    history.push("/signin");
  };

  return (
    <div className="auth">
      <div className="auth__image">
        <div>
          Sales <br />
          &nbsp;&nbsp;&nbsp;force
        </div>
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
                <input type="text" ref={email} />
              </div>
            </div>

            <div className="auth__form--form-input">
              <label>Password:</label>
              <div>
                <input type="password" ref={password} />
              </div>
            </div>

            <div className="auth__form--form-input">
              <label>Password:</label>
              <div>
                <input type="password" ref={password} />
              </div>
            </div>

            <div className="auth__form--form-remember">
              <div className="auth__form--form-remember-rem">
                <input type="checkbox" /> Remember me
              </div>
              <div className="auth__form--form-remember-psd">
                <Link to="change-password">Forgot Password?</Link>
              </div>
            </div>

            <div className="auth__form--form-button">
              <button onClick={signin}>Reset Password</button>
            </div>

            <div className="auth__form--form-msg">
              Not yet registered, check you email for a signup link.
            </div>

            <div className="auth__form--alert">
              <Error status={errorStatus} message={errorMessage} />
              <Success status={successStatus} message={successMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
