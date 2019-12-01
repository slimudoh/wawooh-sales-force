import React from "react";

function Success(props) {
  return (
    <>
      {props.status ? (
        <div className="success">
          <div>{props.message}</div>
        </div>
      ) : null}
    </>
  );
}

export default Success;
