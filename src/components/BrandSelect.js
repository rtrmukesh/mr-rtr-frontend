import React, { useEffect, useState } from "react";
import Select from "./Select";
import BrandService from "../services/BrandService";
import ArrayList from "../lib/ArrayList";

const BrandSelect = (props) => {
  let { name, handleBrandChange, brandOption, label } = props;
  const [brandList, setBrandList] = useState([]);

  const getBrands = async () => {
    if (ArrayList.isEmpty(brandList)) {
      const response = await BrandService.getBrandOption();
      setBrandList(response);
      brandOption(response);
    }
  };

  return (
    <>
      <Select
        name={name ? name : "brand"}
        label={label}
        placeholder="Select Brand"
        options={brandList}
        handleChange={handleBrandChange}
        autoFocus={getBrands}
      />
    </>
  );
};

export default BrandSelect;
