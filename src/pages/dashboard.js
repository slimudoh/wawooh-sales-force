import React, { useState, useEffect } from "react";
import axios from "axios";
import * as types from "../store/constant";
import { connect } from "react-redux";

import * as actionCreators from "../store/actions";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Pageloader from "../components/pageloader";

function Dashboard(props) {
  const [comp, setComp] = useState(true);
  const [dashboardDetails, setDashboardDetails] = useState(null);

  useEffect(() => {
    axios
      .get(types.DASHBOARD__PATH)
      .then(resp => {
        setDashboardDetails(resp.data.data);

        props.setCurrentEarning(resp.data.data.currentEarnings);
        props.setPaid(resp.data.data.currentEarnings);

        setComp(false);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }, []);

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
                {dashboardDetails.firstName} {dashboardDetails.lastName}
              </p>
            </div>
            <div className="dash__cards">
              <div>
                <div className="dash__cards--white">
                  <div className="dash__cards--text">
                    <span>Orders</span>
                    <p> {dashboardDetails.totalOrders}</p>
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
                    <p>&#8358;{dashboardDetails.totalSales}</p>
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
                    <p>&#8358;{dashboardDetails.currentEarnings}</p>
                  </div>
                  <div className="dash__cards--img">
                    <div className="dash__cards--img-money">
                      <img src={require("../assets/img/business.svg")} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dash__body">
              <div>
                <span>Agent Code</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  bibendum varius mauris, sit amet facilisis velit condimentum
                  a. Quisque vehicula dui in porta ullamcorper. Mauris ipsum
                  lectus, egestas in varius et,
                </p>
                <div>
                  <span>Agent Code</span>
                  <p>{dashboardDetails.agentCode}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentEarning: payload =>
      dispatch(actionCreators.getCurrentEarning(payload)),
    setPaid: payload => dispatch(actionCreators.getTotalPaid(payload))
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
