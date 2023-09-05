import React, { useState, useEffect } from "react";
import Select from "./Select";
const Quantity = ({ label, width, required, onChange, name }) => {
  const [quantityList, setQuantityList] = useState([]);

  useEffect(() => {
    getQuantityNumbers();
  }, []);

  const getQuantityNumbers = () => {
    let quantityList = new Array();
    for (let i = 0; i <= 999; i++) {
      quantityList.push({
        label: i,
        value: i,
      });
    }
    setQuantityList(quantityList);
  };
 
  return (
    <>

      <Select
        fullWidth={true}
        width="100"
        label={label ? label : ""}
        name={name ? name : "quantity"}
        placeholder={label ? label : ""}
        isClearable
        isSearchable
        required = {required}
        options={quantityList}
        isSingleSelect={true}
        onInputChange={onChange}
      />
    </>
  );
};

export default Quantity;
