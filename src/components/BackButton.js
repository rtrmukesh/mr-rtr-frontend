import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const BackButton = (props) => {
  const { key, link, label } = props;

  return (
    <>
      <Link id={key} to={`${link}`}>
        <FontAwesomeIcon icon={faChevronLeft} />
        {label}
        <span className="float-right"></span>
      </Link>
    </>
  );
};
export default BackButton;
