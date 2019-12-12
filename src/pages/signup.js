import React, { useState, useEffect } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import * as actionCreators from "../store/actions";
import * as types from "../store/constant";

import Error from "../components/error";
import Success from "../components/success";
import Pageloader from "../components/pageloader";
import Buttonloader from "../components/buttonloader";

function Signup(props) {
  let { code, hashmail } = useParams();

  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [pageloader, setPageloader] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [pageError, setpageError] = useState(false);
  const [form, setForm] = useState(false);

  const [signupData, setSignupData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirm: ""
  });

  useEffect(() => {
    const checkIsAuthenticated = () => {
      if (props.isAuth) {
        return <Redirect to="/dashboard" />;
      }
      props.onLogout();
      checkRegistrationLink();
    };
    checkIsAuthenticated();
  });

  const checkRegistrationLink = () => {
    if (!code || !hashmail) {
      setPageloader(false);
      setpageError(true);
      setForm(false);
      return;
    }

    axios
      .get(`${types.GET__CODE__PATH}${hashmail}/${code}`)
      .then(resp => {
        const data = resp.data.data;

        if (data.agentCode) {
          let signupdata = signupData;
          signupdata.id = data.id;
          signupdata.firstname = data.firstName;
          signupdata.lastname = data.lastName;
          signupdata.email = data.email;

          setSignupData({
            ...signupdata
          });

          setPageloader(false);
          setpageError(false);
          setForm(true);

          return;
        }

        setPageloader(false);
        setpageError(true);
        setForm(false);
      })
      .catch(() => {
        setPageloader(false);
        setpageError(true);
        setForm(false);
      });
  };

  const signup = e => {
    e.preventDefault();

    let signupdata = signupData;
    const onlyDigits = /^[0-9]*$/;

    if (signupdata.phone.trim() === "") {
      setErrorMessage("Please enter your phone number.");
      setErrorStatus(true);
      return;
    }

    if (!onlyDigits.test(signupdata.phone.trim())) {
      setErrorMessage("Phone number must be numbers without space..");
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

    const registerData = {
      id: signupdata.id,
      phoneNo: signupdata.phone,
      email: signupdata.email,
      password: signupdata.password
    };

    setBtnLoader(true);

    props.onRegister(registerData);
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
          <>
            <div className="page-error">
              Sorry we cannot load form because we can't verify this link.
              Please contact the admin.
            </div>
            <div className="auth__form--form-msg">
              Already registered, You can sign in{" "}
              <span>
                <Link to="/signin">here</Link>
              </span>
            </div>
          </>
        ) : null}

        {form ? (
          <div className="auth__form--form">
            <div>
              <div className="auth__form--form-name">
                {signupData.firstname} {signupData.lastname}
              </div>

              <div className="auth__form--form-name">{signupData.email}</div>

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

              {btnLoader ? (
                <div className="auth__form--form-loader">
                  <Buttonloader />
                </div>
              ) : (
                <div className="auth__form--form-button">
                  <button onClick={signup}>Sign Up</button>
                </div>
              )}

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

const mapStateToProps = state => {
  return {
    isAuth: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: payload => dispatch(actionCreators.register(payload)),
    onLogout: () => dispatch(actionCreators.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
