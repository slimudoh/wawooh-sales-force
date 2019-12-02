import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Error from "../components/error";
import Success from "../components/success";

function Signup() {
  let history = useHistory();

  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    confirm: ""
  });

  const [pageOne, setPageOne] = useState(true);
  const [pageTwo, setPageTwo] = useState(false);

  const openPageOne = e => {
    e.preventDefault();

    setPageOne(true);
    setPageTwo(false);

    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
  };

  const openPageTwo = () => {
    setPageOne(false);
    setPageTwo(true);
  };

  const signup = e => {
    e.preventDefault();

    let signupdata = signupData;

    if (signupdata.phone === "") {
      setErrorMessage("Please go back and enter your phone number.");
      setErrorStatus(true);
      return;
    }

    if (!parseInt(signupdata.phone)) {
      setErrorMessage("Please go back and enter your phone number.");
      setErrorStatus(true);
      return;
    }

    if (signupdata.password.trim() === "") {
      setErrorMessage("Please enter your password.");
      setErrorStatus(true);
      return;
    }

    if (signupdata.confirm.trim() === "") {
      setErrorMessage("Please confirm your password.");
      setErrorStatus(true);
      return;
    }

    if (signupdata.password.trim() !== signupdata.confirm.trim()) {
      setErrorMessage("Passwords not identical.");
      setErrorStatus(true);
      return;
    }

    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);

    signupdata.password = signupData.password.trim();

    history.push("/dashboard");
  };

  const handleSignupData = e =>
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });

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
          <span>Kindly complete the form below</span>
        </div>

        {pageOne ? (
          <div className="auth__form--form">
            <div>
              <div className="auth__form--form-input">
                <label>Firstname:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Kayode"
                    name="firstname"
                    value={signupData.firstname}
                    onChange={handleSignupData}
                    readOnly
                  />
                </div>
              </div>

              <div className="auth__form--form-input">
                <label>Lastname:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Emeka"
                    name="lastname"
                    value={signupData.lastname}
                    onChange={handleSignupData}
                    readOnly
                  />
                </div>
              </div>

              <div className="auth__form--form-input">
                <label>Phone Number:</label>
                <div>
                  <input
                    type="text"
                    placeholder="08070000000"
                    name="phone"
                    value={signupData.phone}
                    onChange={handleSignupData}
                  />
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
                  <input
                    type="password"
                    placeholder="***********"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupData}
                  />
                </div>
              </div>

              <div className="auth__form--form-input">
                <label>Confirm Password:</label>
                <div>
                  <input
                    type="password"
                    placeholder="***********"
                    name="confirm"
                    value={signupData.confirm}
                    onChange={handleSignupData}
                  />
                </div>
              </div>

              <div className="auth__form--form-remember">
                <div className="auth__form--form-remember-rem">
                  <input type="checkbox" /> <span>Remember me</span>
                </div>
              </div>

              <div className="auth__form--form-button">
                <div onClick={openPageOne}>Back</div>
                <div onClick={signup}>Sign Up</div>
              </div>

              <div className="auth__form--alert">
                <Error status={errorStatus} message={errorMessage} />
                <Success status={successStatus} message={successMessage} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default Signup;
