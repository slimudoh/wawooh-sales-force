import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Error from "../components/error";
import Success from "../components/success";
import Whiteloader from "../components/whiteloader";

function Reset() {
  let history = useHistory();

  const password = useRef(null);
  const confirm = useRef(null);

  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [btnLoader, setBtnLoader] = useState(true);

  const signin = e => {
    e.preventDefault();

    let passwordInput = password.current;
    let confirmInput = confirm.current;

    if (passwordInput.value.trim() === "") {
      setErrorMessage("Please enter your password.");
      setErrorStatus(true);
      return;
    }

    if (passwordInput.value.trim().length < 8) {
      setErrorMessage("Password must not be less than 8 characters.");
      setErrorStatus(true);
      return;
    }

    if (/\s/.test(passwordInput.value.trim())) {
      setErrorMessage("Password must not contain space.");
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

    setBtnLoader(false);

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
            Reset <span>Password</span>
          </p>
          <span>Kindly complete the form to reset your password.</span>
        </div>
        <div className="auth__form--form">
          <div>
            <div className="auth__form--form-input">
              <label>Enter New Password:</label>
              <div>
                <input type="password" ref={password} />
              </div>
            </div>

            <div className="auth__form--form-input">
              <label>Confirm New Password:</label>
              <div>
                <input type="password" ref={confirm} />
              </div>
            </div>

            <div className="auth__form--form-button">
              {btnLoader ? (
                <button onClick={signin}>Reset Password</button>
              ) : (
                <button disabled>
                  <Whiteloader />
                </button>
              )}
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
