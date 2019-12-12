import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import * as types from "../store/constant";
import * as actionCreators from "../store/actions";
import { connect } from "react-redux";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Error from "../components/error";
import Success from "../components/success";
import Pageloader from "../components/pageloader";
import Whiteloader from "../components/whiteloader";

function Account(props) {
  const accountHolder = useRef(null);
  const singleAcountHolder = useRef(null);

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
    bvn: "",
    id: ""
  });
  const [saveAccount, setSaveAccount] = useState(true);
  const [updateAccount, setUpdateAccount] = useState(true);
  const [delAccount, setDelAccount] = useState(true);

  useEffect(() => {
    const checkIsAuthenticated = () => {
      if (!props.isAuth) {
        return <Redirect to="/signin" />;
      }
      props.getAllBankDetails();
    };

    checkIsAuthenticated();
  });

  // const getAccount = () => {
  // props.getAllBankDetails();
  // axios
  //   .get(types.GET__BANK__ACCOUNT__PATH)
  //   .then(resp => {
  //     if (!cleanUp) {
  //       setAccountDetails([...resp.data.data]);
  //       setComp(false);
  //     }
  //   })
  //   .catch(err => {
  //     if (!cleanUp) {
  //       console.log(err);
  //       setComp(false);
  //       setErrorMessage("An error occured. Please try again later.");
  //       setErrorStatus(true);
  //     }
  //   });
  // };

  const createAccount = e => {
    e.preventDefault();

    let accountdata = accountData;
    const onlyDigits = /^[0-9]*$/;

    for (const num in accountdata) {
      if (accountdata[num].trim() === "") {
        setErrorMessage("All values are required.");
        setErrorStatus(true);
        setAccountModal(false);
      }
    }

    // if (accountdata.accountFirstName.trim() === "") {
    //   setErrorMessage("Please enter your account firstname name.");
    //   setErrorStatus(true);
    //   setAccountModal(false);
    //   return;
    // }

    // if (accountdata.accountLastName.trim() === "") {
    //   setErrorMessage("Please enter your account last name.");
    //   setErrorStatus(true);
    //   setAccountModal(false);
    //   return;
    // }

    // if (accountdata.accountNumber.trim() === "") {
    //   setErrorMessage("Please enter you account number.");
    //   setErrorStatus(true);
    //   setAccountModal(false);
    //   return;
    // }

    if (accountdata.accountNumber.trim().length < 10) {
      setErrorMessage("Account number must not be less than ten digits.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    if (!onlyDigits.test(accountdata.accountNumber)) {
      setErrorMessage("Account number must be numbers without space.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    if (accountHolder.current.value === "") {
      setErrorMessage("Please enter you bank name.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    accountdata.bankName = accountHolder.current.value;

    // if (accountdata.bvn.trim() === "") {
    //   setErrorMessage("Please enter you BVN number.");
    //   setErrorStatus(true);
    //   setAccountModal(false);
    //   return;
    // }

    if (!onlyDigits.test(accountdata.bvn)) {
      setErrorMessage("BVN number must be numbers without space.");
      setErrorStatus(true);
      setAccountModal(false);
      return;
    }

    setSaveAccount(false);

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
        accountdata.accountFirstName = "";
        accountdata.accountLastName = "";
        accountdata.accountNumber = "";
        accountdata.bankName = "";
        accountdata.bvn = "";

        setAccountData({
          ...accountdata
        });

        if (resp.data.message.toLowerCase() !== "operation failure") {
          // getAccount();
          props.getAllBankDetails();
          setComp(true);
        } else {
          setErrorMessage(resp.data.data);
          setErrorStatus(true);
        }

        setAccountModal(false);
        setSaveAccount(true);
      })
      .catch(() => {
        setErrorMessage("An error occured. Please try again later.");
        setErrorStatus(true);
        setAccountModal(false);
        // getAccount();
        props.getAllBankDetails();
        setComp(true);
      });
  };

  const showAccountDetails = val => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(false);
    setShowAccountDetails(true);

    setSingleAccount({
      accountFirstName: "",
      accountLastName: "",
      accountNumber: "",
      bankName: "",
      bvn: "",
      id: ""
    });

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
      .catch(() => {
        setErrorMessage("An error occured. Please try again later.");
        setErrorStatus(true);
        setShowAccountDetails(false);
      });
  };

  const editAccount = () => {
    let singleaccount = singleAccount;
    const onlyDigits = /^[0-9]*$/;

    for (const num in singleaccount) {
      if (singleaccount[num].trim() === "") {
        setErrorMessage("All values are required.");
        setErrorStatus(true);
        setShowAccountDetails(false);
      }
    }

    // if (singleaccount.accountFirstName.trim() === "") {
    //   setErrorMessage("Please enter you account firstname name.");
    //   setErrorStatus(true);
    //   setShowAccountDetails(false);
    //   return;
    // }

    // if (singleaccount.accountLastName.trim() === "") {
    //   setErrorMessage("Please enter you account last name.");
    //   setErrorStatus(true);
    //   setShowAccountDetails(false);
    //   return;
    // }

    // if (singleaccount.accountNumber.trim() === "") {
    //   setErrorMessage("Please enter you account number.");
    //   setErrorStatus(true);
    //   setShowAccountDetails(false);
    //   return;
    // }

    if (singleaccount.accountNumber.trim().length < 10) {
      setErrorMessage("Account number must not be less than ten digits.");
      setErrorStatus(true);
      setShowAccountDetails(false);
      return;
    }

    if (!onlyDigits.test(singleaccount.accountNumber)) {
      setErrorMessage("Account number must be numbers without space.");
      setErrorStatus(true);
      setShowAccountDetails(false);
      return;
    }

    if (singleAcountHolder.current.value === "") {
      setErrorMessage("Please enter you bank name.");
      setErrorStatus(true);
      setShowAccountDetails(false);
      return;
    }
    singleAccount.bankName = singleAcountHolder.current.value;

    // if (singleaccount.bvn.trim() === "") {
    //   setErrorMessage("Please enter you BVN number.");
    //   setErrorStatus(true);
    //   setShowAccountDetails(false);
    //   return;
    // }

    if (!onlyDigits.test(singleaccount.bvn)) {
      setErrorMessage("BVN number must be numbers without space.");
      setErrorStatus(true);
      setShowAccountDetails(false);
      return;
    }

    setUpdateAccount(false);

    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);

    axios
      .post(types.UPDATE__BANK__ACCOUNT__PATH, {
        accountNumber: singleaccount.accountNumber,
        bankName: singleaccount.bankName,
        bvn: singleaccount.bvn,
        id: singleaccount.id,
        firstName: singleaccount.accountFirstName,
        lastName: singleaccount.accountLastName
      })
      .then(resp => {
        if (resp.data.message.toLowerCase() !== "operation failure") {
          // getAccount();
          props.getAllBankDetails();
          setComp(true);
        } else {
          setErrorMessage(resp.data.data);
          setErrorStatus(true);
        }
        setShowAccountDetails(false);
        setUpdateAccount(true);
      })
      .catch(() => {
        // getAccount();
        props.getAllBankDetails();
        setComp(true);
        setErrorMessage("An error occured. Please try again later.");
        setErrorStatus(true);
        setShowAccountDetails(false);
      });
  };

  const deleteAccount = val => {
    setDelAccount(false);
    axios
      .post(`${types.DELETE__BANK__ACCOUNT__PATH}${val}`)
      .then(resp => {
        if (resp.data.message.toLowerCase() !== "operation failure") {
          // getAccount();
          props.getAllBankDetails();
          setComp(true);
        } else {
          setErrorMessage(resp.data.data);
          setErrorStatus(true);
        }

        setShowAccountDetails(false);
        setDelAccount(true);
      })
      .catch(() => {
        // getAccount();
        props.getAllBankDetails();
        setComp(true);
        setErrorMessage("An error occured. Please try again later.");
        setErrorStatus(true);
        setShowAccountDetails(false);
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
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(false);
    setShowAccountDetails(false);
  };

  const addAccount = () => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);
    setAccountModal(true);
    setShowAccountDetails(false);
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

                        <select name="bankName" ref={accountHolder}>
                          <option value="access bank">Access Bank</option>
                          <option value="citibank">Citibank</option>
                          <option value="diamond bank">Diamond Bank</option>
                          <option value="ecobank">Ecobank</option>
                          <option value="fidelity bank">Fidelity Bank</option>
                          <option value="firstbank">First Bank</option>
                          <option value="fcmb">
                            First City Monument Bank (FCMB)
                          </option>
                          <option value="gtb">Guaranty Trust Bank (GTB)</option>
                          <option value="heritage bank">Heritage Bank</option>
                          <option value="keystone bank">Keystone Bank</option>
                          <option value="polaris bank">Polaris Bank</option>
                          <option value="providus bank">Providus Bank</option>
                          <option value="stanbic ibtc bank">
                            Stanbic IBTC Bank
                          </option>
                          <option value="standard bank">
                            Standard Chartered Bank
                          </option>
                          <option value="sterling bank">Sterling Bank</option>
                          <option value="suntrust bank">Suntrust Bank</option>
                          <option value="union bank">Union Bank</option>
                          <option value="uba bank">
                            United Bank for Africa (UBA)
                          </option>
                          <option value="unity bank">Unity Bank</option>
                          <option value="wema bank">Wema Bank</option>
                          <option value="zenith bank">Zenith Bank</option>
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
                        {saveAccount ? (
                          <button onClick={createAccount}>Submit</button>
                        ) : (
                          <button disabled>
                            <Whiteloader />
                          </button>
                        )}
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
                          readOnly
                        />
                      </div>

                      <div className="account__modal__content--input">
                        <label>Bank Name:</label>

                        <select ref={singleAcountHolder}>
                          <option value="access bank">Access Bank</option>
                          <option value="citibank">Citibank</option>
                          <option value="diamond bank">Diamond Bank</option>
                          <option value="ecobank">Ecobank</option>
                          <option value="fidelity bank">Fidelity Bank</option>
                          <option value="firstbank">First Bank</option>
                          <option value="fcmb">
                            First City Monument Bank (FCMB)
                          </option>
                          <option value="gtb">Guaranty Trust Bank (GTB)</option>
                          <option value="heritage bank">Heritage Bank</option>
                          <option value="keystone bank">Keystone Bank</option>
                          <option value="polaris bank">Polaris Bank</option>
                          <option value="providus bank">Providus Bank</option>
                          <option value="stanbic ibtc bank">
                            Stanbic IBTC Bank
                          </option>
                          <option value="standard chartered bank">
                            Standard Chartered Bank
                          </option>
                          <option value="sterling bank">Sterling Bank</option>
                          <option value="suntrust bank">Suntrust Bank</option>
                          <option value="union bank">Union Bank</option>
                          <option value="uba">
                            United Bank for Africa (UBA)
                          </option>
                          <option value="unity bank">Unity Bank</option>
                          <option value="wema bank">Wema Bank</option>
                          <option value="zenith bank">Zenith Bank</option>
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
                        {updateAccount ? (
                          <div onClick={editAccount}>Save Edit</div>
                        ) : (
                          <div>
                            <Whiteloader />
                          </div>
                        )}

                        {delAccount ? (
                          <div onClick={() => deleteAccount(singleAccount.id)}>
                            Delete Account
                          </div>
                        ) : (
                          <div>
                            <Whiteloader />
                          </div>
                        )}
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

const mapStateToProps = state => {
  return {
    user: state.userDetails,
    bank: state.bankdetails,
    isAuth: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUserDetails: () => dispatch(actionCreators.getUserDetails()),
    getAllBankDetails: () => dispatch(actionCreators.getBankDetails())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
