import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { InputGroup, InputGroupText, Input } from "reactstrap";
import Button from "../components/Button";

const PageSearch = (props) => {
  const { classnames, placeholder, onChange, value, width, id, onKeyUp, onSearchClick } = props;

  return (
    <>
      <InputGroup
        className={`${classnames} align-items-stretch mr-4 `}
        style={{ width: width ? width : "100%" }}
      >

        <Input
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          onKeyUp={(e) => onKeyUp && onKeyUp(e)}
          // value prop: can be used if want a full control over input field value
          {...((value || value === "") && { value })}
        />
        <InputGroupText
          id={id}
          addonType="prepend"
          className="input-group-text bg-primary cursor-pointer"
          onClick={()=> onSearchClick && onSearchClick()}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="bg-primary text-light" />

        </InputGroupText>

      </InputGroup>

    </>
  );
};

export default PageSearch;
