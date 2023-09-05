import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { Button as ReactButton } from "reactstrap";
class OutlineButton extends React.Component {
  render() {
    const {
      onClick,
      className,
      name,
      label,
      color,
      borderColor,
      backgroundColor,
      disabled,
      fontSize,
    } = this.props;

    return (
      <ReactButton
        id={name}
        label={label}
        onClick={onClick}
        disabled={disabled}
        type="button"
        className={className}
        style={{
          borderRadius: "7px",
          width: "mx-auto",
          border: "2px solid black",
          fontSize: fontSize ? fontSize : ".950rem",
          backgroundColor: backgroundColor ? backgroundColor : "#FFFF",
          borderColor: borderColor ? borderColor : "#2196F3",
          color: color ? color : "#2196F3",
          height:"40px"
        }}
      >
        <span className="pr-1">{<FontAwesomeIcon icon={faUpload} />}</span>
        <span className="add-button">{label}</span>
      </ReactButton>
    );
  }
}

OutlineButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default OutlineButton;
