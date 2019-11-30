import React, { useState } from "react";

import Header from "../components/header";
import Sidebar from "../components/sidebar";

function Account() {
  const [accountModal, setAccountModal] = useState(false);

  const openModal = () => {
    setAccountModal(true);
  };

  const closeModal = () => {
    setAccountModal(false);
  };

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
            <div onClick={openModal}>Add Account</div>
          </div>
        </div>
        {accountModal ? (
          <div className="account__modal">
            <div>
              <div className="account__modal__content">
                <p>
                  <span onClick={closeModal}>close</span>
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
        ) : null}
      </div>
    </div>
  );
}

export default Account;
