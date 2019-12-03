import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Error from "../components/error";
import Success from "../components/success";
import Pageloader from "../components/pageloader";

function Signup() {
  let history = useHistory();
  let { code } = useParams();

  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [verifyCode, setVerifyCode] = useState(null);

  const [pageloader, setPageloader] = useState(false);
  const [pageError, setpageError] = useState(false);
  const [form, setForm] = useState(false);

  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    confirm: ""
  });

  useEffect(() => {
    axios
      .get(`types.SIGNUP_CODE${code}`)
      .then(resp => {
        setVerifyCode(resp.data);

        setPageloader(false);
        setpageError(false);
      })
      .catch(err => {
        setPageloader(false);
        setpageError(true);
        console.log(JSON.stringify(err));
      });
  }, [verifyCode]);

  const signup = e => {
    e.preventDefault();

    let signupdata = signupData;

    if (signupdata.phone === "") {
      setErrorMessage("Please go back and enter your phone number.");
      setErrorStatus(true);
      return;
    }

    if (!parseInt(signupdata.phone)) {
      setErrorMessage("Phone number must be numbers.");
      setErrorStatus(true);
      return;
    }

    if (signupdata.password.trim() === "") {
      setErrorMessage("Please enter your password.");
      setErrorStatus(true);
      return;
    }

    if (signupdata.password.trim().length < 8) {
      setErrorMessage("Password must not be less than 8 characters.");
      setErrorStatus(true);
      return;
    }

    if (/\s/.test(signupdata.password.trim())) {
      setErrorMessage("Password must not contain space.");
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

        {pageloader ? (
          <div className="pageLoader">
            <Pageloader />
          </div>
        ) : null}

        {pageError ? (
          <div className="page-error">
            Sorry we cannot load form because we can't verify this link. Please
            contact the admin.
          </div>
        ) : null}

        {form ? (
          <div className="auth__form--form">
            <div>
              <div className="auth__form--form-input">
                <label>Firstname:</label>
                <div>
                  <input
                    type="text"
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
                <button onClick={signup}>Sign Up</button>
              </div>

              <div className="auth__form--form-msg">
                Already registered, You can sign in{" "}
                <span>
                  <Link to="/signin">here</Link>
                </span>
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
