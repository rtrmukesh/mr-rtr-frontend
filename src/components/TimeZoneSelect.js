import React, { useState, useEffect } from "react";

// Component
import  Select from "./Select";

import DateTime from "../lib/DateTime";

const TimeZoneSelect = props => {
 
    const { label, onChange, name, required, disabled } = props;
  
  const [timeZones, setTimeZone] = useState([]);

 
  useEffect(() => {
    getTimeZones();
  }, []);

  const getTimeZones = () => {

    let timeZones = DateTime.getTimeZones();

    let timeZoneList = new Array();

    for (let i = 0; i < timeZones.length; i++) {
      timeZoneList.push({
        label: timeZones[i],
        value: timeZones[i]
      })
    }

    setTimeZone(timeZoneList);
  }

  return (
    <Select
      name={name ? name : "timeZone"}
      placeholder="Select TimeZone"
      label={label}
      options={timeZones}
      onInputChange={onChange}
      required={required}
      isDisabled={disabled}
    />
  );
};

export default TimeZoneSelect;
