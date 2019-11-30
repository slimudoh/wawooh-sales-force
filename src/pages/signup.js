import React from "react";

function Signup() {
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
              Already registered, You can sign in <span>here</span>
            </div>

            <div className="auth__form--form-button">
              <button>Next</button>
            </div>
          </div>
        </div>

        {/* <div className="auth__form--form">
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
              <button>Sign Up</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
export default Signup;
