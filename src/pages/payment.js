import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/header";
import Sidebar from "../components/sidebar";

function Payment() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="container">
        <div className="payment__nav">
          <Link to="/dashboard">Home</Link> > <span>Payment</span>
        </div>
        <div className="payment__cards">
          <p>Payments</p>
          <div>
            <div className="payment__cards--btn">
              <div>
                <div className="payment__cards--btn-icon">
                  <div>
                    <img src={require("../assets/img/withdraw.svg")} alt="" />
                  </div>
                </div>
                <div className="payment__cards--btn-text">Make Withdrawal</div>
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
                      {" "}
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
                      {" "}
                      <img src={require("../assets/img/pending.svg")} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment__body">
          <div>
            <div className="payment__body--header">Previous Withdrawals</div>
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
              <div>
                <div className="payment__body--table-amount">
                  &#8358;2,000,000
                </div>
                <div className="payment__body--table-date">12-nov-2019</div>
                <div className="payment__body--table-status">Successful</div>
              </div>
              <div>
                <div className="payment__body--table-amount">
                  &#8358;2,000,000
                </div>
                <div className="payment__body--table-date">12-nov-2019</div>
                <div className="payment__body--table-status">Successful</div>
              </div>
              <div>
                <div className="payment__body--table-amount">
                  &#8358;2,000,000
                </div>
                <div className="payment__body--table-date">12-nov-2019</div>
                <div className="payment__body--table-status">Successful</div>
              </div>
              <div>
                <div className="payment__body--table-amount">
                  &#8358;2,000,000
                </div>
                <div className="payment__body--table-date">12-nov-2019</div>
                <div className="payment__body--table-status">Successful</div>
              </div>
              <div>
                <div className="payment__body--table-amount">
                  &#8358;2,000,000
                </div>
                <div className="payment__body--table-date">12-nov-2019</div>
                <div className="payment__body--table-status">Successful</div>
              </div>
              <div>
                <div className="payment__body--table-amount">
                  &#8358;2,000,000
                </div>
                <div className="payment__body--table-date">12-nov-2019</div>
                <div className="payment__body--table-status">Successful</div>
              </div>
              <div>
                <div className="payment__body--table-amount">
                  &#8358;2,000,000
                </div>
                <div className="payment__body--table-date">12-nov-2019</div>
                <div className="payment__body--table-status">Successful</div>
              </div>
              <div>
                <div className="payment__body--table-amount">
                  &#8358;2,000,000
                </div>
                <div className="payment__body--table-date">12-nov-2019</div>
                <div className="payment__body--table-status">Successful</div>
              </div>
              <div>
                <div className="payment__body--table-amount">
                  &#8358;2,000,000
                </div>
                <div className="payment__body--table-date">12-nov-2019</div>
                <div className="payment__body--table-status">Successful</div>
              </div>
              <div>
                <div className="payment__body--table-amount">
                  &#8358;2,000,000
                </div>
                <div className="payment__body--table-date">12-nov-2019</div>
                <div className="payment__body--table-status">Successful</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
