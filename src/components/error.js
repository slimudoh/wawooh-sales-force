import React from "react";

function Error(props) {
  return (
    <>
      {props.status ? (
        <div className="error">
          <div>{props.message}</div>
        </div>
      ) : null}
    </>
  );
}

export default Error;
