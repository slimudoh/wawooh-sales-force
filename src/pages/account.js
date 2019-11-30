import React from "react";

import Header from "../components/header";
import Sidebar from "../components/sidebar";

function Account() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="container">
        <div className="account__nav">
          Home > <span>Account</span>
        </div>
        <div className="account__cards">
          <p>Select Account</p>
          <div className="account__cards-list">
            <div className="account__cards-card">
              <div>
                <span>FCMB</span>
                <p>1234567890</p>
              </div>
            </div>
            <div className="account__cards-card">
              <div>
                <span>FCMB</span>
                <p>1234567890</p>
              </div>
            </div>
            <div className="account__cards-card">
              <div>
                <span>FCMB</span>
                <p>1234567890</p>
              </div>
            </div>
          </div>
          <div className="account__cards--btn">
            <div>Add Account</div>
          </div>
        </div>
        <div className="account__modal">
          <div>
            <div className="account__modal__content">
              <p>
                <span>X</span>
              </p>
              <div>
                <p>Enter Account Details</p>
                <div className="account__modal__content--input">
                  <label>Account Name:</label>
                  <input type="text" />
                </div>

                <div className="account__modal__content--input">
                  <label>Account Number:</label>
                  <input type="text" />
                </div>

                <div className="account__modal__content--input">
                  <label>Bank Name:</label>
                  <input type="text" />
                </div>
                <div className="account__modal__content--btn">
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
