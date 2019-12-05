import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Error from "../components/error";
import Success from "../components/success";
import Pageloader from "../components/pageloader";

function Account() {
  const [comp, setComp] = useState(true);
  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [accountModal, setAccountModal] = useState(false);
  const [showAccountdetails, setShowAccountDetails] = useState(false);

  const [accountData, setAccountData] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    bvn: ""
  });

  useEffect(() => {
    const setTime = setTimeout(() => {
      setComp(false);
    }, 2000);

    return () => {
      clearTimeout(setTime);
    };
  }, [comp]);

  const addAccount = () => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(true);
    setShowAccountDetails(false);
  };

  const showAccountDetails = () => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(false);
    setShowAccountDetails(true);
  };

  const closeAccount = () => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(false);
    setAccountModal(false);
    setShowAccountDetails(false);
  };

  const closeDetails = () => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(false);
    setAccountModal(false);
    setShowAccountDetails(false);
  };

  const handleAccountData = e =>
    setAccountData({
      ...accountData,
      [e.target.name]: e.target.value
    });

  const createAccount = e => {
    e.preventDefault();

    let accountdata = accountData;
    const onlyDigits = /^[0-9]*$/;

    if (accountdata.accountName.trim() === "") {
      setErrorMessage("Please enter you account name.");
      setErrorStatus(true);
      return;
    }

    if (accountdata.accountNumber.trim() === "") {
      setErrorMessage("Please enter you account number.");
      setErrorStatus(true);
      return;
    }

    if (!onlyDigits.test(accountdata.accountNumber.trim())) {
      setErrorMessage("Account number must be numbers without space.");
      setErrorStatus(true);
      return;
    }

    if (accountdata.bankName.trim() === "") {
      setErrorMessage("Please enter you bank name.");
      setErrorStatus(true);
      return;
    }

    if (accountdata.bvn.trim() === "") {
      setErrorMessage("Please enter you BVN number.");
      setErrorStatus(true);
      return;
    }

    if (!onlyDigits.test(accountdata.bvn.trim())) {
      setErrorMessage("BVN number must be numbers without space.");
      setErrorStatus(true);
      return;
    }

    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);

    console.log(accountdata);

    accountdata.accountName = "";
    accountdata.accountNumber = "";
    accountdata.bankName = "";
    accountdata.bvn = "";

    setAccountData({
      ...accountdata
    });

    setAccountModal(false);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="container">
        {comp ? (
          <div className="pageLoader">
            <Pageloader />
          </div>
        ) : (
          <>
            <div className="account__nav">
              <Link to="/dashboard">Home</Link> > <span>Account</span>
            </div>
            <div className="account__cards">
              <p>Select Account</p>
              <div className="account__cards-list">
                <div className="account__cards-card">
                  <div onClick={showAccountDetails}>
                    <span>FCMB</span>
                    <p>1234567890</p>
                  </div>
                </div>
                <div className="account__cards-card">
                  <div onClick={showAccountDetails}>
                    <span>FCMB</span>
                    <p>1234567890</p>
                  </div>
                </div>
                <div className="account__cards-card">
                  <div onClick={showAccountDetails}>
                    <span>FCMB</span>
                    <p>1234567890</p>
                  </div>
                </div>
              </div>
              <div className="account__cards--btn">
                <div onClick={addAccount}>Add Account</div>
              </div>
              <div className="account__cards--alert">
                <Error status={errorStatus} message={errorMessage} />
                <Success status={successStatus} message={successMessage} />
              </div>
            </div>
            {accountModal ? (
              <div className="account__modal">
                <div>
                  <div className="account__modal__content">
                    <div>
                      <p>Enter Account Details</p>
                      <div className="account__modal__content--input">
                        <label>Account Name:</label>
                        <input
                          type="text"
                          name="accountName"
                          value={accountData.accountName}
                          onChange={handleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>Account Number:</label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={accountData.accountNumber}
                          onChange={handleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>Bank Name:</label>
                        <input
                          type="text"
                          name="bankName"
                          value={accountData.bankName}
                          onChange={handleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>BVN:</label>
                        <input
                          type="text"
                          name="bvn"
                          value={accountData.bvn}
                          onChange={handleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--btn">
                        <button onClick={closeAccount}>Cancel</button>
                        <button onClick={createAccount}>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {showAccountdetails ? (
              <div className="account__modal">
                <div>
                  <div className="account__modal__content">
                    <div>
                      <p>Enter Account Details</p>
                      <div className="account__modal__content--input">
                        <label>Account Name:</label>
                        <input
                          type="text"
                          name="accountName"
                          value={accountData.accountName}
                          onChange={handleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>Account Number:</label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={accountData.accountNumber}
                          onChange={handleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>Bank Name:</label>
                        <input
                          type="text"
                          name="bankName"
                          value={accountData.bankName}
                          onChange={handleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>BVN:</label>
                        <input
                          type="text"
                          name="bvn"
                          value={accountData.bvn}
                          onChange={handleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--div">
                        <div onClick={closeDetails}>Cancel</div>
                        <div>Edit</div>
                        <div>Delete</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default Account;
