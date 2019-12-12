import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Notfound(props) {
  useEffect(() => {
    const checkIsAuthenticated = () => {
      if (!props.isAuth) {
        return <Redirect to="/signin" />;
      }
    };

    checkIsAuthenticated();
  }, [props.isAuth]);

  return (
    <div className="notfound">
      <div className="notfound__img">
        <img src={require("../assets/img/404.jpg")} alt="404" />
      </div>
      <div className="notfound__btn">
        <Link to="/dashboard">
          <div>GO HOME</div>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.isLoggedIn
  };
};

export default connect(mapStateToProps)(Notfound);
