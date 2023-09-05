import React, { useEffect, useState } from "react";
import StatusService from "../services/StatusService";
import Select from "./Select";

const StatusSelect = (props) => {

    let { name, handleStatusChange, statusOption,customStatusOption,objectName ,label,placeholder,isMulti} = props;
    
    const [statusList, setStatusList] = useState([]);

    const getStatus = async () => {
        const response = await StatusService.getOption(objectName,"");
        setStatusList(response)
        statusOption(response)
    };

    return (
        <>
            <Select
                name={name ? name : "status"}
                label={label?label:""}
                placeholder={placeholder ? placeholder: "Select Status"}
                options={
                    customStatusOption
                      ? customStatusOption
                      : statusList
                  }
                handleChange={handleStatusChange}
                autoFocus={getStatus}
                isMulti={isMulti}
            />
        </>
    )

}

export default StatusSelect;