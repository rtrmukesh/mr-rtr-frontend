import React, { useEffect, useState } from "react";
import { Tag } from "../helpers/ProductTag";
import ArrayList from "../lib/ArrayList";
import TagService from "../services/TagService";
import Select from "./Select";

const TagSelect = (props) => {
  let { name, label, handleTagChange, required, TagList, placeholder,params,width,onChange,customTagOption} = props;
  const [tagOption, setTagOption] = useState([]);

  const getTags = async () => {
    const response = await TagService.getOption(params);
    setTagOption(response);
    TagList && TagList(response);
  };

  const onFocus = () => {
    if (ArrayList.isEmpty(tagOption)) {
      getTags();
    }
  }

  return (
    <>
      <Select
        name={name ? name : "tag"}
        label={label}
        options={ customTagOption?customTagOption: tagOption}
        placeholder={placeholder ? placeholder : "Select Tag"}
        handleChange={handleTagChange}
        required={required}
        width={width}
        onInputChange={onChange}
        autoFocus={onFocus}
      />
    </>
  );
};

export default TagSelect;
