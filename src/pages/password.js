import React, { useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Error from "../components/error";
import Success from "../components/success";

function Password() {
  let history = useHistory();
  const email = useRef(null);

  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const reset = e => {
    e.preventDefault();

    let emailInput = email.current;
    const emailRegExp = /\S+@\S+\.\S+/;

    if (emailInput.value.trim() === "") {
      setErrorMessage("Please enter your email.");
      setErrorStatus(true);
      return;
    }

    if (!emailRegExp.test(emailInput.value.trim())) {
      setErrorMessage("Please enter your email.");
      setErrorStatus(true);
      return;
    }

    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);

    console.log(emailInput.value);

    history.push("/new-password");
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
            Change <span>Password</span>
          </p>
          <span>Kindly enter you email to receive a reset password link.</span>
        </div>
        <div className="auth__form--form">
          <div>
            <div className="auth__form--form-input">
              <label>Email:</label>
              <div>
                <input type="text" ref={email} />
              </div>
            </div>

            <div className="auth__form--form-msg">
              Remember password, You can sign in{" "}
              <span>
                <Link to="/signin">here</Link>
              </span>
            </div>
            <div className="auth__form--form-button">
              <button onClick={reset}>Send Link</button>
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

export default Password;
