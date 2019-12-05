import React, { useState, useEffect } from "react";

import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Pageloader from "../components/pageloader";

function Dashboard() {
  const [comp, setComp] = useState(true);

  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     const token = sessionStorage.getItem("token");
  //     const accessToken = `${token}`;

  //     const requestHeaders = {
  //       headers: {}
  //     };

  //     requestHeaders.headers.Authorization = accessToken;

  //     console.log(accessToken);
  //     console.log(types.DASHBOARD__PATH);
  //     console.log(requestHeaders);

  //     axios
  //       .get(types.DASHBOARD__PATH, requestHeaders)
  //       .then(resp => {
  //         console.log(resp);
  //       })
  //       .catch(err => {
  //         console.log(JSON.stringify(err));
  //       });
  //     return;
  //   }
  //   history.push("/signin");
  // }, []);

  useEffect(() => {
    const setTime = setTimeout(() => {
      setComp(false);
    }, 2000);

    return () => {
      clearTimeout(setTime);
    };
  }, [comp]);

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
              <p>Kayode Alapomeji</p>
            </div>
            <div className="dash__cards">
              <div>
                <div className="dash__cards--white">
                  <div className="dash__cards--text">
                    <span>Orders</span>
                    <p>200</p>
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
                    <p>&#8358;2,000,000</p>
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
                    <p>&#8358;2,000,000</p>
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
                  <span>Coupon Code</span>
                  <p>123jhkn</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
