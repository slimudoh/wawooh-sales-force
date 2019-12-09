import React, { useState, useEffect } from "react";
import axios from "axios";
import * as types from "../store/constant";
import { connect } from "react-redux";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Pageloader from "../components/pageloader";

function Payment(props) {
  const [comp, setComp] = useState(true);
  const [modal, setModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    axios
      .get(types.GET__BANK__ACCOUNT__PATH)
      .then(resp => {
        setAccountDetails([...resp.data.data]);

        getPaymentHistory();

        setComp(false);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }, []);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const selectedAcount = val => {
    axios
      .get(`${types.MAKE__WITHDRAWAL}${val}`)
      .then(resp => {
        console.log(resp);
        setModal(false);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  const getPaymentHistory = () => {
    axios
      .post(`${types.PREVIOUS_WITHDRAWALS}all`, {
        init: 0,
        size: 20
      })
      .then(resp => {
        console.log(resp);
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
            <div className="payment__cards">
              <p>Payments</p>
              <div>
                <div className="payment__cards--btn">
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
                </div>
                <div className="payment__cards--card">
                  <div>
                    <div>
                      <div className="payment__cards--card-text">
                        <span>Total Paid</span>
                        <p>&#8358;{props.totalPaid}</p>
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
                        <p>&#8358;{props.earning}</p>
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

            <div className="payment__body--filter">
              <div className="payment__body--filter-dropdown">
                <select>
                  <option value="all">All</option>
                  <option value="successful">Successful</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              {/* <div className="payment__body--filter-control">
                <div>&#8592;</div>
                <div>&#8594;</div>
              </div> */}
            </div>
            <div className="payment__body">
              <div className="payment__body--header">Previous Withdrawals</div>
              <div>
                <div className="payment__body--table">
                  <div>
                    <div className="payment__body--table-amount">
                      &#8358;2,000,000
                    </div>
                    <div className="payment__body--table-date">12-nov-2019</div>
                    <div className="payment__body--table-status payment__body--table-status-success">
                      Successful
                    </div>
                  </div>
                  <div>
                    <div className="payment__body--table-amount">
                      &#8358;2,000,000
                    </div>
                    <div className="payment__body--table-date">12-nov-2019</div>
                    <div className="payment__body--table-status payment__body--table-status-fail ">
                      Failed
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment__body--filter-paginate">
              <div>&#8592;</div>
              <p>0</p>
              <div>&#8594;</div>
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
    earning: state.currentEarnings,
    totalPaid: state.totalRemittance
  };
};

export default connect(mapStateToProps)(Payment);
