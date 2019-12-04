import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
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

export default Notfound;
