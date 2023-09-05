import React, { useEffect, useState } from "react";
import Select from "./Select";
import ArrayList from "../lib/ArrayList";
import { VendorService } from "../services/VendorService";


const AccountSelect = (props) => {
    let { name, handleVendorChange, vendorList, required, label, placeholder, isDisabled, type} = props;

    const [vendorOption, setVendorOption] = useState([]);


    const getVendor = async () => {
        if (ArrayList.isEmpty(vendorOption)) {
     let params
           if(type){
              params={type:type}
           }
            const list = await VendorService.getOption(params);
            setVendorOption(list);
            vendorList && vendorList(list);
        }
    };


    return (
        <>
            <Select
                name={name ? name : "vendor"}
                placeholder={placeholder ? placeholder : "Select Account"}
                options={vendorOption}
                handleChange={handleVendorChange}
                required={required}
                label={label}
                isDisabled={isDisabled}
                autoFocus={getVendor}
            />
        </>
    )


}

export default AccountSelect;