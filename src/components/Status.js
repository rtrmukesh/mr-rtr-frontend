import React, { useEffect, useState } from "react";
import StatusService from "../services/StatusService";
import SelectDropdown from "./SelectDropdown";
import ArrayList from "../lib/ArrayList";

const Status = (props) => {
  const { handleChange, objectName, buttonLabel, currentStatusId, projectId, color } = props;
  const [list, setList] = useState([]);
  const [handleStatus, setHandleStatus] = useState();
  const [colorCode, setColorCode] = useState(null);
  useEffect(() => {
    getStatusDetail();
  }, [currentStatusId])
  
  useEffect(() => {
    getStatusList();
  }, [handleChange])
  
  const getStatusList = async () => {
    const data = await StatusService.nextStatusSearch(
      objectName,
      handleStatus ? handleStatus : currentStatusId,
      null,
      projectId
    );
    if (data && data.length > 0) {
      const statusList = [];
      data
        .sort((a, b) => parseFloat(a.sort_order) - parseFloat(b.sort_order))
        .forEach((list) => {
          statusList.push({
            value: list.id,
            label: list.name,
          });
        });
      setList(data);
    }
  };

  const getStatusDetail = async () =>{
    const response = await StatusService.get(currentStatusId);
    let data = response?.data;
    setColorCode(data?.colorCode)
  }
  const onFocus = () => {
 if (list && list.length == 0) {
      getStatusList();
    }
  }
  return (
    <>
      <SelectDropdown
        buttonLabel={buttonLabel ? buttonLabel : "Status"}
        hideCaret={true}
        dropdownLinks={list}
        handleChange={(e) => {
          setHandleStatus(e)
          handleChange(e)
        }}
        disabled={list ? false : true}
        onFocus={onFocus}
        colorCode={colorCode}
      />
    </>
  );
};

export default Status;
