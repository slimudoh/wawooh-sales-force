import React, { useState, useEffect } from "react";
import axios from "axios";
import * as types from "../store/constant";
import { connect } from "react-redux";

import * as actionCreators from "../store/actions";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Pageloader from "../components/pageloader";
import Error from "../components/error";

function Dashboard(props) {
  const [comp, setComp] = useState(true);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    if (props.user === null) {
      axios
        .get(types.DASHBOARD__PATH)
        .then(resp => {
          props.getAllUserDetails(resp.data.data);
          setComp(false);
        })
        .catch(err => {
          console.log(err);
          setErrorMessage("Server error. Please try again later.");
          setErrorStatus(true);
        });
    } else {
      setComp(false);
      updatedUserDetails();
    }
  };

  const updatedUserDetails = () => {
    axios
      .get(types.DASHBOARD__PATH)
      .then(resp => {
        props.getAllUserDetails(resp.data.data);
      })
      .catch(err => {
        console.log(err);
        setErrorMessage("Server error. Please try again later.");
        setErrorStatus(true);
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
            <div className="dash__intro">
              <span>Hello</span>
              <p>
                {props.user.firstName} {props.user.lastName}
              </p>
            </div>
            <div className="dash__cards">
              <div>
                <div className="dash__cards--white">
                  <div className="dash__cards--text">
                    <span>Orders</span>
                    <p> {props.user.totalOrders}</p>
                  </div>
                  <div className="dash__cards--img">
                    <div className="dash__cards--img-cart">
                      <img src={require("../assets/img/cart.svg")} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="dash__cards--white">
                  <div className="dash__cards--text">
                    <span>Sales</span>
                    <p>
                      &#8358;
                      {props.user.totalSales
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ".00"}
                    </p>
                  </div>
                  <div className="dash__cards--img">
                    <div className="dash__cards--img-chart">
                      <img src={require("../assets/img/chart.svg")} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="dash__cards--purple">
                  <div className="dash__cards--text">
                    <span>Earnings</span>
                    <p>
                      &#8358;
                      {props.user.currentEarnings
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ".00"}
                    </p>
                  </div>
                  <div className="dash__cards--img">
                    <div className="dash__cards--img-money">
                      <img src={require("../assets/img/business.svg")} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dash__alert">
              <Error status={errorStatus} message={errorMessage} />
            </div>
            <div className="dash__body">
              <div>
                <span>Agent Code</span>
                <p>
                  Failure to use agent code will result in inability of WAWOOH
                  to track transactions.
                </p>
                <div>
                  <span>Agent Code</span>
                  <p>{props.user.agentCode}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.userDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUserDetails: payload => dispatch(actionCreators.userDetails(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
