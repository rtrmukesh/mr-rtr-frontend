import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FormFeedback, FormGroup, Input } from "reactstrap";
import Hint from "./Hint";
import Label from "./Label";

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };

    this.textareaRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      inputValue: this.textareaRef.current.props.value,
    });
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

  renderInput({ field, form: { touched, errors } }) {
    const {
      name,
      id,
      label,
      placeholder,
      required,
      rows,
      onChange,
      defaultValue,
      maxLength,
      showCharCount,
      disabled,
      fontBolded,
      className,
      hintText,
    } = this.props;

    const fieldMinHeight = rows ? rows * 23 : 92;
    const errorMessage = touched[name] && errors[name] ? errors[name] : null;

    const countInputChars = () => {
      if (this.state.inputValue) {
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
      <FormGroup className={`${className}`}>
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
        <Input
          id={id || name}
          name={name || id}
          {...field}
          type="textarea"
          placeholder={placeholder || label}
          invalid={!!errorMessage}
          rows={rows}
          onKeyUp={(e) => {
            setInputValue(e);
            onChange && onChange(e);
          }}
          defaultValue={defaultValue}
          style={{
            background: "#F3F3F4",
            borderRadius: "5px",
            fontSize: "14px",
            minHeight: fieldMinHeight,
          }}
          maxLength={maxLength && maxLength}
          ref={this.textareaRef}
          disabled={disabled}
        />
        {showCharCount && maxLength && (
          <span className="char-count d-block text-inline-grayed h7">
            {`${countInputChars()}/${maxLength && maxLength} Characters`}
          </span>
        )}

        {hintText && (
          <div style={{ position: "absolute", marginTop: "6px" }}>
            <Hint hintText={hintText} />
          </div>
        )}

        {errorMessage && (
          <FormFeedback style={{ position: "absolute", marginTop: 1 }}>
            {errorMessage}
          </FormFeedback>
        )}
      </FormGroup>
    );
  }

  render() {
    const { name, id } = this.props;

    return (
      <Field
        id={id || name}
        validate={this.validate.bind(this)}
        name={name}
        render={this.renderInput.bind(this)}
      />
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.string,
};

export default TextArea;
