import React from "react";

/**
 * Back page component
 *
 * @param {*} onClick
 * @param {*} className
 */
const BackPageLink = ({ onClick, label }) => {
  return (
    <div className="d-flex">
      <div className="cursor-pointer mb-2" onClick={onClick}>
        <i className="fa fa-angle-left" />
        <span className="ml-2">{label} </span>
      </div>
    </div>
  );
};

export default BackPageLink;
