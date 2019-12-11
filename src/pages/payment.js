import React, { useState, useEffect } from "react";
import axios from "axios";
import * as types from "../store/constant";
import * as actionCreators from "../store/actions";
import { connect } from "react-redux";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Pageloader from "../components/pageloader";
import Whiteloader from "../components/whiteloader";
import Error from "../components/error";
import Success from "../components/success";

function Payment(props) {
  const [comp, setComp] = useState(true);
  const [modal, setModal] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [accountDetails, setAccountDetails] = useState([]);
  const [withdrawalLoader, setWithdrawalLoader] = useState(true);
  const [init, setInit] = useState(0);
  const [status, setStatus] = useState("all");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    if (props.user === null) {
      props.getAllUserDetails();
      // axios
      //   .get(types.DASHBOARD__PATH)
      //   .then(resp => {
      //     if (!cleanUp) {
      //       props.getAllUserDetails(resp.data.data);
      //       setComp(false);
      //       getBankAccount();
      //     }
      //   })
      //   .catch(err => {
      //     if (!cleanUp) {
      //       console.log(err);
      //       setErrorMessage("Server error. Please try again later.");
      //       setErrorStatus(true);
      //     }
      //   });
    } else {
      props.getAllBankDetails();
      // getBankAccount();
    }
    getPaymentHistory("all");
  };

  // const getBankAccount = () => {
  // setErrorMessage(null);
  // setErrorStatus(false);
  // setSuccessMessage(null);
  // setSuccessStatus(false);
  // axios
  //   .get(types.GET__BANK__ACCOUNT__PATH)
  //   .then(resp => {
  //     setAccountDetails([...resp.data.data]);
  //     const status = "all";
  //     getPaymentHistory(status);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     setErrorMessage("Server error. Please try again later.");
  //     setErrorStatus(true);
  //   });
  // };

  const selectedAcount = val => {
    setErrorMessage(null);
    setErrorStatus(false);
    setSuccessMessage(null);
    setSuccessStatus(false);

    if (parseInt(props.user.currentEarnings, 10) > 5000) {
      setWithdrawalLoader(false);
      setModal(false);
      axios
        .get(`${types.MAKE__WITHDRAWAL}${val}`)
        .then(resp => {
          if (resp.data.message.toLowerCase() !== "operation failure") {
            setSuccessMessage(
              "Your request has been sent and will be processed by the account."
            );
            setSuccessStatus(true);
          } else {
            setErrorMessage(resp.data.data);
            setErrorStatus(true);
          }

          setWithdrawalLoader(true);
        })
        .catch(err => {
          console.log(err);
          setErrorMessage("Server error. Please try again later.");
          setErrorStatus(true);
          setWithdrawalLoader(true);
        });
    } else {
      setErrorMessage(
        "Earning must be up to NGN5000 before it can be withdrawn."
      );
      setErrorStatus(true);
      setModal(false);
    }
  };

  // const updatedUserDetails = () => {
  //   setErrorMessage(null);
  //   setErrorStatus(false);

  // axios
  //   .get(types.DASHBOARD__PATH)
  //   .then(resp => {
  //     props.getAllUserDetails(resp.data.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     setErrorMessage("Server error. Please try again later.");
  //     setErrorStatus(true);
  //   });
  // };

  const getPaymentHistory = val => {
    setStatus(val);
    axios
      .post(`${types.PREVIOUS_WITHDRAWALS}${val}`, {
        init: init,
        size: 50
      })
      .then(resp => {
        setComp(false);
        props.getAllUserDetails();
        const data = resp.data.data;
        setHistory(data);
      })
      .catch(err => {
        console.log(err);
        setErrorMessage("Can't get previous payments. Please try again later.");
        setErrorStatus(true);
      });
  };

  const prevPage = () => {
    if (init > 0) {
      axios
        .post(`${types.PREVIOUS_WITHDRAWALS}${status}`, {
          init: init - 1,
          size: 50
        })
        .then(resp => {
          if (resp.data.data.length !== 0) {
            const data = resp.data.data;
            setHistory(data);
            setInit(init - 1);
          }
        })
        .catch(err => {
          console.log(err);
          setErrorMessage("Server error. Please try again later.");
          setErrorStatus(true);
        });
    }
  };

  const nextPage = () => {
    if (init >= 0) {
      axios
        .post(`${types.PREVIOUS_WITHDRAWALS}${status}`, {
          init: init + 1,
          size: 50
        })
        .then(resp => {
          if (resp.data.data.length !== 0) {
            const data = resp.data.data;
            setHistory(data);
            setInit(init + 1);
          }
        })
        .catch(err => {
          console.log(err);
          setErrorMessage("Server error. Please try again later.");
          setErrorStatus(true);
        });
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
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
            <div className="payment__cards">
              <p>Payments</p>
              <div>
                <div className="payment__cards--btn">
                  {withdrawalLoader ? (
                    <div onClick={openModal}>
                      <div className="payment__cards--btn-icon">
                        <div>
                          <img
                            src={require("../assets/img/withdraw.svg")}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="payment__cards--btn-text">
                        Make Withdrawal
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Whiteloader />
                    </div>
                  )}
                </div>
                <div className="payment__cards--card">
                  <div>
                    <div>
                      <div className="payment__cards--card-text">
                        <span>Total Paid</span>
                        <p>
                          &#8358;
                          {props.user.totalRemittance
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ".00"}
                        </p>
                      </div>
                      <div className="payment__cards--card-icon">
                        <div>
                          <img src={require("../assets/img/pay.svg")} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="payment__cards--card-text">
                        <span>Pending</span>
                        <p>
                          &#8358;
                          {props.user.currentEarnings
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ".00"}
                        </p>
                      </div>
                      <div className="payment__cards--card-icon">
                        <div>
                          <img
                            src={require("../assets/img/pending.svg")}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment__alert">
              <Error status={errorStatus} message={errorMessage} />
              <Success status={successStatus} message={successMessage} />
            </div>
            <div className="payment__body--filter">
              <div className="payment__body--filter-dropdown">
                <select onChange={e => getPaymentHistory(e.target.value)}>
                  <option value="all">All</option>
                  <option value="success">Successful</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="payment__body">
              <div className="payment__body--header">Previous Withdrawals</div>
              <div>
                <div className="payment__body--table">
                  {history.map((item, index) => (
                    <div key={index}>
                      <div className="payment__body--table-data">
                        &#8358;
                        {item.amount
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ".00"}
                      </div>
                      <div className="payment__body--table-data">
                        {item.openDate}
                      </div>
                      <div className="payment__body--table-data">
                        {item.closeDate}
                      </div>
                      <div className="payment__body--table-data payment__body--table-status-success">
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="payment__body--filter-paginate">
              <div onClick={prevPage}>&#8592;</div>
              <p>{init}</p>
              <div onClick={nextPage}>&#8594;</div>
            </div>
            {modal ? (
              <div className="payment__modal">
                <div>
                  <div className="payment__modal__content">
                    <span>Select an Account to receive payment.</span>
                    <div className="payment__modal__content--card">
                      {accountDetails.map(account => (
                        <div
                          onClick={() => selectedAcount(account.id)}
                          key={account.id}
                        >
                          <span>{account.bankName}</span>
                          <p>{account.accountNumber}</p>
                        </div>
                      ))}
                    </div>
                    <div className="payment__modal__content--btn">
                      <div onClick={closeModal}>Cancel</div>
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
    bank: state.bankdetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUserDetails: () => dispatch(actionCreators.getUserDetails()),
    getAllBankDetails: () => dispatch(actionCreators.getBankDetails())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
