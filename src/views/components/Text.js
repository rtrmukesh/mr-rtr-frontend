import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";
import {
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import Hint from "./Hint";
import Label from "./Label";
import RenderInputGroup from "./RenderInputGroup";
import String from "../lib/String";

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  validate(value) {
    const { label, placeholder, required, error } = this.props;

    let errorMessage;
    const inputLabel = label || placeholder;
    const errorMessageLabel = error;

    if (required && (!value || !value.trim())) {
      errorMessage = errorMessageLabel
        ? `${errorMessageLabel}`
        : `${inputLabel} is required`;
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors, setFieldValue } }) {
    const {
      name,
      id,
      label,
      placeholder,
      required,
      onChange,
      type,
      maxLength,
      showCharCount,
      defaultValue,
      addonText,
      addonType,
      error,
      onKeyDown,
      onClick,
      disabled,
      autoFocus,
      autoComplete,
      fontBolded,
      className,
      ref,
      onKeyPress,
      hintText,
      noSpecialCharacter,
    } = this.props;

    let errorMessage = touched[name] && errors[name] ? errors[name] : null;
    if (error === "Portal Name already exist") {
      errorMessage = "Portal Name already exist";
    } else if (error == "Email already exists") {
      errorMessage = "Email already exists";
    }

    const countInputChars = () => {
      if (this.state.inputValue !== undefined) {
        return this.state.inputValue.length;
      }
      return 0;
    };

    const setInputValue = (e) => {
      const { value } = e.target;
      this.setState({
        inputValue: value,
      });
    };

    return (
      <FormGroup
        style={{ position: "relative"}}
        className={`${className} ${(!!errorMessage && "is-invalid") || ""}`}
      >
        {label && (
          <Label
            className={`${fontBolded ? "font-weight-bold" : ""}`}
            id={id || name}
            name={name || id}
            required={required}
          >
            {label}
          </Label>
        )}
        <RenderInputGroup
          condition={addonText !== null && addonText !== undefined}
          wrapper={(children) => <InputGroup>{children}</InputGroup>}
        >
          {addonText && (
            <InputGroupText addonType={addonType}>{addonText}</InputGroupText>
          )}
          <Input
            id={id || name}
            name={name || id}
            {...field}
            type={type ? type : "text"}
            placeholder={placeholder || label}
            invalid={!!errorMessage}
            defaultValue={defaultValue}
            style={{
              background: "#F3F3F4",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
              height: "40px",
            }}
            onKeyPress={onKeyPress}
            onKeyUp={(e) => {
              setInputValue(e);
              onChange && onChange(e);
              setFieldValue(name, noSpecialCharacter ? String.replace(e.target.value) : e.target.value);
            }}
            onKeyDown={onKeyDown}
            maxLength={maxLength && maxLength ? maxLength : "255"}
            onClick={onClick && onClick}
            disabled={disabled}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            ref={ref}
          />
        </RenderInputGroup>
        {showCharCount && (
          <span className="char-count d-block text-inline-grayed h7">
            {`${countInputChars()}/${maxLength ? maxLength : "255"} Characters`}
          </span>
        )}
        {hintText && (
          <div style={{ position: "absolute", marginTop: "6px" }}>
            <Hint hintText={hintText} />
          </div>
        )}

        {errorMessage && (
          <FormFeedback
            id={id || name}
            name={name || id}
            style={{ position: "absolute", marginTop: 1 }}
          >
            {errorMessage}
          </FormFeedback>
        )}
      </FormGroup>
    );
  }

  render() {
    const { name } = this.props;

    return (
      <Field
        validate={this.validate.bind(this)}
        name={name}
        render={this.renderInput.bind(this)}
      />
    );
  }
}

Text.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  defaultValue: PropTypes.any,
  addonText: PropTypes.string,
  addonType: PropTypes.oneOf(["prepend", "append"]),
};

export default Text;
