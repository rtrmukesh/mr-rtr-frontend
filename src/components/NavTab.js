import React from 'react';
import { Nav, NavItem, NavLink } from "reactstrap";
import CountBadge from './CountBadge';
import SelectDropdown from './SelectDropdown';
const NavTab = (props) => {

    const { list, dropdownLinks, dropdownLabel, handleChange } = props;

    return (

        <div>
            <Nav tabs className="admin-tabs">
                {list &&
                    list.length > 0 &&
                    list.map((data) => (
                        <>
                            <div className="d-sm-block d-none">
                                <NavItem>
                                    <NavLink
                                        className={data.className}
                                        onClick={data.onClick}
                                    >
                                        {data.label}
                                        <CountBadge count={data.count} />
                                    </NavLink>
                                </NavItem>
                            </div>

                        </>
                    ))}
                <div className="d-block d-sm-none">
                    <SelectDropdown
                        buttonLabel={dropdownLabel}
                        hideCaret={true}
                        dropdownLinks={dropdownLinks}
                        handleChange={handleChange}
                    />
                </div>
            </Nav>
        </div>
    );
}

export default NavTab;