import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AnimationButton = (props) => {
  let { onClick, label, icon } = props;
  return (
    <div className="d-flex justify-content-center mb-1">
      <button className="aniBtn" onClick={onClick}>
        <div className="sign">
          <FontAwesomeIcon icon={icon ? icon : faRightFromBracket} />
        </div>
        <div className="anitext">{label}</div>
      </button>
    </div>
  );
};

export default AnimationButton;
