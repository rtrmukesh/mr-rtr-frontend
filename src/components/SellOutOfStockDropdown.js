import React from "react";

// Component
import Select from "./Select";

/**
 * Sell out of stock dropdown component
 *
 * @param label
 * @param name
 * @param placeholder
 */
const SellOutOfStockDropdown = ({ label, name, placeholder }) => {
  return (
    <Select
      label={label}
      name={name}
      placeholder={placeholder}
      options={[
        {
          label: "Allow",
          value: "1"
        },
        {
          label: "Deny",
          value: "0"
        }
      ]}
    />
  );
};

export default SellOutOfStockDropdown;
