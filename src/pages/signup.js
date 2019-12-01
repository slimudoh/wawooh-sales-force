import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Error from "../components/error";
import Success from "../components/success";

function Signup() {
  let history = useHistory();
  const firstname = useRef(null);
  const lastname = useRef(null);
  const phone = useRef(null);
  const password = useRef(null);
  const confirm = useRef(null);

  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    password: ""
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
    let firstnameInput = firstname.current;
    let lastnameInput = lastname.current;
    let phoneInput = phone.current;

    let signupdata = signupData;
    signupdata.firstname = firstnameInput.value.trim();
    signupdata.lastname = lastnameInput.value.trim();
    signupdata.phone = phoneInput.value.trim();
    signupdata.password = "";

    setSignupData(signupdata);

    setPageOne(false);
    setPageTwo(true);
  };

  const signup = e => {
    e.preventDefault();

    let signupdata = signupData;

    let passwordInput = password.current;
    let confirmInput = confirm.current;

    if (signupdata.firstname === "") {
      setErrorMessage("Please go back and enter your firstname.");
      setErrorStatus(true);
      return;
    }

    if (signupdata.lastname === "") {
      setErrorMessage("Please go back and enter your lastname.");
      setErrorStatus(true);
      return;
    }

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
      setErrorMessage("Password not identical.");
      setErrorStatus(true);
      return;
    }

    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);

    signupdata.password = passwordInput.value.trim();

    console.log(signupdata);

    history.push("/dashboard");
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
          <span>Kindly complete the form below</span>
        </div>

        {pageOne ? (
          <div className="auth__form--form">
            <div>
              <div className="auth__form--form-input">
                <label>Firstname:</label>
                <div>
                  <input type="text" placeholder="Kayode" ref={firstname} />
                </div>
              </div>

              <div className="auth__form--form-input">
                <label>Lastname:</label>
                <div>
                  <input type="text" placeholder="Emeka" ref={lastname} />
                </div>
              </div>

              <div className="auth__form--form-input">
                <label>Phone Number:</label>
                <div>
                  <input type="text" placeholder="08070000000" ref={phone} />
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
                    ref={password}
                  />
                </div>
              </div>

              <div className="auth__form--form-input">
                <label>Confirm Password:</label>
                <div>
                  <input
                    type="password"
                    placeholder="***********"
                    ref={confirm}
                  />
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
