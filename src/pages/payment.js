import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Pageloader from "../components/pageloader";

function Payment() {
  const [comp, setComp] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const setTime = setTimeout(() => {
      setComp(false);
    }, 2000);

    return () => {
      clearTimeout(setTime);
    };
  }, [comp]);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const selectedAcount = () => {
    alert("account selected");
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
                        <p>&#8358;2,000,000</p>
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
                        <p>&#8358;2,000,000</p>
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
            <div className="payment__body">
              <div>
                <div className="payment__body--header">
                  Previous Withdrawals
                </div>
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
            {modal ? (
              <div className="payment__modal">
                <div>
                  <div className="payment__modal__content">
                    <span>Select an Account to receive payment.</span>
                    <div className="payment__modal__content--card">
                      <div onClick={selectedAcount}>
                        <span>FCMB</span>
                        <p>0123456789</p>
                      </div>

                      <div onClick={selectedAcount}>
                        <span>FCMB</span>
                        <p>0123456789</p>
                      </div>
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

export default Payment;
