import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as types from "../store/constant";

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
  const [accountDetails, setAccountDetails] = useState([]);
  const [singleAccount, setSingleAccount] = useState({
    accountFirstName: "",
    accountLastName: "",
    accountNumber: "",
    bankName: "",
    bvn: "",
    id: ""
  });

  const [accountData, setAccountData] = useState({
    accountFirstName: "",
    accountLastName: "",
    accountNumber: "",
    bankName: "",
    bvn: ""
  });

  useEffect(() => {
    axios
      .get(types.GET__BANK__ACCOUNT__PATH)
      .then(resp => {
        setAccountDetails([...resp.data.data]);

        setComp(false);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }, []);

  const addAccount = () => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(true);
    setShowAccountDetails(false);
  };

  const showAccountDetails = val => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(false);
    setShowAccountDetails(true);

    axios
      .get(`${types.GET__SINGLE__BANK__ACCOUNT__PATH}${val}`)
      .then(resp => {
        const prevAccount = singleAccount;

        prevAccount.accountFirstName = resp.data.data.firstName;
        prevAccount.accountLastName = resp.data.data.lastName;
        prevAccount.accountNumber = resp.data.data.accountNumber;
        prevAccount.bankName = resp.data.data.bankName;
        prevAccount.bvn = resp.data.data.bvn;
        prevAccount.id = resp.data.data.id;

        setSingleAccount({
          ...prevAccount
        });
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  const closeAccount = () => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(false);
    setShowAccountDetails(false);
  };

  const closeDetails = () => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(false);
    setShowAccountDetails(false);
  };

  const editAccount = () => {
    axios
      .post(types.UPDATE__BANK__ACCOUNT__PATH, {
        accountNumber: singleAccount.accountNumber,
        bankName: singleAccount.bankName,
        bvn: singleAccount.bvn,
        id: singleAccount.id,
        firstName: singleAccount.accountFirstName,
        lastName: singleAccount.accountLastName
      })
      .then(resp => {
        console.log(resp);
        setShowAccountDetails(false);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  const deleteAccount = val => {
    axios
      .post(`${types.DELETE__BANK__ACCOUNT__PATH}${val}`)
      .then(resp => {
        console.log(resp);
        setShowAccountDetails(false);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  const handleAccountData = e =>
    setAccountData({
      ...accountData,
      [e.target.name]: e.target.value
    });

  const handleSingleAccountData = e =>
    setSingleAccount({
      ...singleAccount,
      [e.target.name]: e.target.value
    });

  const createAccount = e => {
    e.preventDefault();

    let accountdata = accountData;
    const onlyDigits = /^[0-9]*$/;

    if (accountdata.accountFirstName.trim() === "") {
      setErrorMessage("Please enter you account firstname name.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    if (accountdata.accountLastName.trim() === "") {
      setErrorMessage("Please enter you account last name.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    if (accountdata.accountNumber.trim() === "") {
      setErrorMessage("Please enter you account number.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    if (!onlyDigits.test(accountdata.accountNumber.trim())) {
      setErrorMessage("Account number must be numbers without space.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    if (accountdata.bankName.trim() === "") {
      setErrorMessage("Please enter you bank name.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    if (accountdata.bvn.trim() === "") {
      setErrorMessage("Please enter you BVN number.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    if (!onlyDigits.test(accountdata.bvn.trim())) {
      setErrorMessage("BVN number must be numbers without space.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);

    axios
      .post(types.CREATE__BANK__ACCOUNT__PATH, {
        accountNumber: accountdata.accountNumber,
        bankName: accountdata.bankName,
        bvn: accountdata.bvn,
        firstName: accountdata.accountFirstName,
        lastName: accountdata.accountLastName
      })
      .then(resp => {
        console.log(resp);

        accountdata.accountFirstName = "";
        accountdata.accountLastName = "";
        accountdata.accountNumber = "";
        accountdata.bankName = "";
        accountdata.bvn = "";

        setAccountData({
          ...accountdata
        });

        setAccountModal(false);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
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
                {accountDetails.map(account => (
                  <div className="account__cards-card" key={account.id}>
                    <div onClick={() => showAccountDetails(account.id)}>
                      <span>{account.bankName}</span>
                      <div>
                        {account.firstName} {account.lastName}
                      </div>
                      <p>{account.accountNumber}</p>
                    </div>
                  </div>
                ))}
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
                        <label>Account First Name:</label>
                        <input
                          type="text"
                          name="accountFirstName"
                          value={accountData.accountFirstName}
                          onChange={handleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>Account Last Name:</label>
                        <input
                          type="text"
                          name="accountLastName"
                          value={accountData.accountLastName}
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

                        <select
                          name="bankName"
                          value={accountData.bankName}
                          onChange={handleAccountData}
                        >
                          <option value="access">Access Bank</option>
                          <option value="citibank">Citibank</option>
                          <option value="diamond">Diamond Bank</option>
                          <option value="ecobank">Ecobank</option>
                          <option value="fidelity">Fidelity Bank</option>
                          <option value="firstbank">First Bank</option>
                          <option value="fcmb">
                            First City Monument Bank (FCMB)
                          </option>
                          <option value="gtb">Guaranty Trust Bank (GTB)</option>
                          <option value="heritage">Heritage Bank</option>
                          <option value="keystone">Keystone Bank</option>
                          <option value="polaris">Polaris Bank</option>
                          <option value="providus">Providus Bank</option>
                          <option value="stanbic">Stanbic IBTC Bank</option>
                          <option value="standard">
                            Standard Chartered Bank
                          </option>
                          <option value="sterling">Sterling Bank</option>
                          <option value="suntrust">Suntrust Bank</option>
                          <option value="union">Union Bank</option>
                          <option value="uba">
                            United Bank for Africa (UBA)
                          </option>
                          <option value="unity">Unity Bank</option>
                          <option value="wema">Wema Bank</option>
                          <option value="zenith">Zenith Bank</option>
                        </select>
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
                        <label>Account First Name:</label>
                        <input
                          type="text"
                          name="accountFirstName"
                          value={singleAccount.accountFirstName}
                          onChange={handleSingleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>Account Last Name:</label>
                        <input
                          type="text"
                          name="accountLastName"
                          value={singleAccount.accountLastName}
                          onChange={handleSingleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>Account Number:</label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={singleAccount.accountNumber}
                          onChange={handleSingleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>Bank Name:</label>

                        <select
                          name="bankName"
                          value={singleAccount.bankName}
                          onChange={handleSingleAccountData}
                        >
                          <option value="access">Access Bank</option>
                          <option value="citibank">Citibank</option>
                          <option value="diamond">Diamond Bank</option>
                          <option value="ecobank">Ecobank</option>
                          <option value="fidelity">Fidelity Bank</option>
                          <option value="firstbank">First Bank</option>
                          <option value="fcmb">
                            First City Monument Bank (FCMB)
                          </option>
                          <option value="gtb">Guaranty Trust Bank (GTB)</option>
                          <option value="heritage">Heritage Bank</option>
                          <option value="keystone">Keystone Bank</option>
                          <option value="polaris">Polaris Bank</option>
                          <option value="providus">Providus Bank</option>
                          <option value="stanbic">Stanbic IBTC Bank</option>
                          <option value="standard">
                            Standard Chartered Bank
                          </option>
                          <option value="sterling">Sterling Bank</option>
                          <option value="suntrust">Suntrust Bank</option>
                          <option value="union">Union Bank</option>
                          <option value="uba">
                            United Bank for Africa (UBA)
                          </option>
                          <option value="unity">Unity Bank</option>
                          <option value="wema">Wema Bank</option>
                          <option value="zenith">Zenith Bank</option>
                        </select>
                      </div>

                      <div className="account__modal__content--input">
                        <label>BVN:</label>
                        <input
                          type="text"
                          name="bvn"
                          value={singleAccount.bvn}
                          onChange={handleSingleAccountData}
                        />
                      </div>

                      <div className="account__modal__content--div">
                        <div onClick={closeDetails}>Cancel</div>
                        <div onClick={editAccount}>Save Edit</div>
                        <div onClick={() => deleteAccount(singleAccount.id)}>
                          Delete Account
                        </div>
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
