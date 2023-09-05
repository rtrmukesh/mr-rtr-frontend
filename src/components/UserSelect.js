import React, { useEffect, useState } from 'react';
import ArrayList from '../lib/ArrayList';
import CompanyUserService from '../services/UserService';
import Select from './Select';
import Spinner from './Spinner';

const UserSelect = (props) => {
  let {
    name,
    handleUserChange,
    label,
    required,
    userList,
    params,
    customUserOption,
    placeholder,
    selectedUserId=null,
    showLoggedInUser=null,
    isDisabled,
    isMulti
  } = props;
  const [userOption, setUserOption] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    { selectedUserId || showLoggedInUser &&
     getUser();
    }
  }, []);

  const getUser = async (params) => {
    const users = await CompanyUserService.getOption(
      params,
      props.showAssignToMeOption
    );
    setUserOption(users);
    userList && userList(users);
  };

  const getUsers = async (params) => {
    setIsLoading(true);
    const users = await CompanyUserService.getOption(
      params,
      props.showAssignToMeOption
    );
    setUserOption(users);
    userList && userList(users);
    setIsLoading(false);
  };

  let getDefaultValue = null;
  if (selectedUserId) {
    getDefaultValue =
      userOption &&
      userOption.length > 0 &&
      userOption.find((data) => data?.id == selectedUserId);
  }
  if (showLoggedInUser) {
    getDefaultValue =
      userOption &&
      userOption.length > 0 &&
      userOption.find((data) => data?.isLogedInUser == true);
  }

  const onFocus = () => {
    if (ArrayList.isEmpty(userOption)) {
      getUsers(params);
    }
  };
  
  if (isLoading) {
    <Spinner />;
  }
  return (
    <>
      <Select
        name={name ? name : 'user'}
        placeholder={placeholder ? placeholder : 'Select User'}
        options={customUserOption ? customUserOption : userOption}
        handleChange={handleUserChange}
        required={required}
        label={label}
        width={props?.width}
        isClearable={true}
        autoFocus={onFocus}
        isLoading={isLoading}
        defaultValue={getDefaultValue}
        isDisabled={isDisabled}
        isMulti={isMulti}
      />
    </>
  );
};

export default UserSelect;
