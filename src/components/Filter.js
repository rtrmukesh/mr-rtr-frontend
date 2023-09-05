import React, { useEffect, useState } from "react";
import Form from "./Form";
import DateSelector from "./Date";
import BrandSelect from "./BrandSelect";
import CategorySelect from "./CategorySelect";
import ProductSelect from "./ProductSelect";
import AccountSelect from "./AccountSelect";
import SelectStore from "./SelectStore";
import StatusSelect from "./SelectStatus";
import Select from "./Select";
import ShiftSelect from "./ShiftSelect";
import SelectType from "./SelectType";
import UserSelect from "./UserSelect";
import SelectTag from "./TagSelect";
import SelectDropdown from "./SelectDropdown";
import PageSize from "./PageSize";
import PageSearch from "./PageSearch";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "reactstrap";
import { useWindowResize } from "./customMenu/WindowResize";
import ObjectName from "../helpers/ObjectName";
import StatusGroupSelect from "./StatusGroupSelect";
import { UserType } from "../helpers/UserType";
import PaymentSelect from "./PaymentAccountSelect";
import SprintSelect from "./SprintSelect";

const Filter = (props) => {
  let { initialValues } = props;
  const [displayFilter, setDisplayFilter] = useState(true);
  const [spinning, setSpinning] = useState(props.spinning);
  const toggleShowHideFilter = () => {
    setDisplayFilter(!displayFilter);
  };
  let widthValue = useWindowResize()[0];
  useEffect(() => {
    if (widthValue <= 600 && displayFilter) {
      setDisplayFilter(false);
    } else if (widthValue >= 600 && !displayFilter) {
      setDisplayFilter(true);
    }
  }, [widthValue]);
  const handleClick = () => {
    props.refreshButtonOnClick();
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 100);
  };

  return (
    <>
      {props.showHeader && !props.disableHeader && (
        <>
          {props.newTableHeading && displayFilter ? (
            // To display show and hide filter using this id---> filterSection
            <div style={{ display: "block" }}>
              <div
                className={` page-heading  cover ${
                  props.showSearch
                    ? "justify-content-end"
                    : "justify-content-between"
                }`}
              >
                <div className="d-flex py-3 pt-0 justify-content-end ">
                  {props.showPageSize && (
                    <div className="mr-2 d-none d-sm-block">
                      <PageSize
                        onChange={(e) => props.getPageSizeByOptions(e)}
                        selectedPageSize={props.selectedPageSize}
                      />
                    </div>
                  )}

                  {/* <div className="col-9"> */}
                  {!props.showSearch && (
                    <PageSearch
                      width={props.searchBarWidth}
                      value={props.pageSearchValue}
                      classnames="page-search"
                      placeholder={props.searchPlaceholder}
                      onChange={props.pageSearchOnChange}
                      onKeyUp={(e) => props.onKeyUp(e)}
                      onSearchClick={props.onSearchClick}
                    />
                  )}
                  {!props.sortByDropdown && (
                    <div className="d-none d-sm-block">
                      <SelectDropdown
                        buttonLabel={
                          props.dropdownLabel
                            ? props.dropdownLabel
                            : props.getSelectedSortLabel
                        }
                        dropdownLinks={props.sortByOptions}
                        color={"gray"}
                        hideCaret
                        handleChange={props.handleSortByChange}
                      />
                    </div>
                  )}
                  <div className="d-flex">
                    <div className=" d-flex  ml-sm-2 ">
                      {!props.refreshButton && (
                        <div onClick={handleClick} className="btn btn-primary">
                          <span
                            className={
                              props.refreshValue || spinning
                                ? "fa fa-sync fa-spin"
                                : "fa fa-refresh"
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className=" d-flex  ml-2">
                      {props.showButton && (
                        <Button
                          label={props.buttonLabel}
                          onClick={props.buttonOnClick}
                          className={props.buttonClassName}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <Form initialValues={initialValues} enableReinitialize>
                  <div className="row px-0 py-0">
                    {/*  Date Filter */}
                    {props.showDateFilter && (
                      <>
                        <div className="col-md-3">
                          <DateSelector
                            name="startDate"
                            placeholder="Start Date"
                            // selected={this.state.startSelected}
                            onChange={props.handleStartDateChange}
                            isClearable
                          />
                        </div>
                        <div className="col-md-3">
                          <DateSelector
                            name="endDate"
                            placeholder="End Date"
                            // selected={props.startSelected}
                            onChange={props.handleEndDateChange}
                            isClearable
                          />
                        </div>
                      </>
                    )}
                    {props.showSingleDateFilter && (
                      <>
                        <div className="col-md-3">
                          <DateSelector
                            name="date"
                            placeholder="Start Date"
                            // selected={this.state.startSelected}
                            onChange={props.handleDateChange}
                            isClearable
                          />
                        </div>
                      </>
                    )}
                    {/* Brand Filter */}
                    {props.showBrandFilter && (
                      <div className="col-md-3">
                        <BrandSelect
                          handleBrandChange={props.handleBrandChange}
                          brandOption={(x) => props.brandOption(x)}
                        />
                      </div>
                    )}
                    {/* Category Filter */}
                    {props.showCategoryFilter && (
                      <div className="col-md-3">
                        <CategorySelect
                          handleCategoryChange={props.handleCategoryChange}
                          categoryList={(x) => props.categoryList(x)}
                        />
                      </div>
                    )}
                    {/* Product Filter */}
                    {props.showProductFilter && (
                      <div className="col-md-3">
                        <ProductSelect
                          handleProductChange={props.handleProductChange}
                          productOption={(x) => props.productOption(x)}
                        />
                      </div>
                    )}
                    {/* Vendor Filter */}
                    {props.showAccountFilter && (
                      <div className="col-md-3">
                        <AccountSelect
                          handleVendorChange={props.handleVendorChange}
                          vendorList={(x) => props.vendorList(x)}
                          placeholder="Select Account"
                        />
                      </div>
                    )}
                    {/* Store Filter */}
                    {props.showStockEntryProductTypeFilter && (
                      <div className="col-md-3">
                        <Select
                          name="stockEntryProductType"
                          options={props.stockProductTypeOption}
                          placeholder="Select Type"
                          handleChange={props.handleStockEntryProductTypeChange}
                        />
                      </div>
                    )}
                     {props.showStoreFilter && (
                      <div className="col-md-3">
                        <SelectStore
                          name={props.locationName}
                          handleStoreChange={props.handleStoreChange}
                          StoreList={props.StoreList}
                        />
                      </div>
                    )}
                    {/* Status Filter */}
                    {props.showStatusFilter && (
                      <div className="col-md-3">
                        <StatusSelect
                          customStatusOption={props.customStatusOption}
                          handleStatusChange={props.onStatusChange}
                          statusOption={(x) => props.statusOption(x)}
                          objectName={props.objectName}
                          isMulti={props.isMultiSelect}
                        />
                      </div>
                    )}
                    {props.showGstStatusFilter && (
                      <div className="col-md-3">
                        <StatusSelect
                          name="gstStatus"
                          placeholder="Select GST Status"
                          handleStatusChange={props.onGstStatusChange}
                          statusOption={(x) => props.gstStatusOption(x)}
                          objectName={ObjectName.BILL_GST_STATUS}
                        />
                      </div>
                    )}
                    {/* salesExecutive Filter */}
                    {props.showSalesExecutiveFilter && (
                      <div className="col-md-3">
                        <UserSelect
                          name="salesExecutive"
                          options={props.salesExecutiveOption}
                          placeholder="Sales Executive"
                          handleChange={props.handleSalesExecutiveChange}
                          minWidth="200px"
                          handleUserChange={props.handleSalesExecutiveChange}
                          params={{ userType: UserType.SALES_EXECUTIVE }}
                        />
                      </div>
                    )}
                    {/* Shift Filter */}
                    {props.showShiftFilter && (
                      <div className="col-md-3">
                        <ShiftSelect
                          name={props.shiftName}
                          shiftOption={(x) => props.shiftOption(x)}
                          handleShiftChange={props.handleShiftChange}
                        />
                      </div>
                    )}
                    {/* Payment Type Filter */}
                    {props.showPaymentTypeFilter && (
                      <div className="col-md-3">
                        <Select
                          name="paymentType"
                          placeholder="Select Payment Type"
                          options={props.paymentType}
                          handleChange={props.handlePaymentTypeChange}
                        />
                      </div>
                    )}
                    {/* Type Filter */}
                    {props.showTypeFilter && (
                      <div className="col-md-3">
                        <SelectType
                          name={props.typeName}
                          handleTypeChange={props.handleTypeChange}
                          typeOption={(x) => props.typeOption(x)}
                          customTypeOption={props.customTypeOption}
                          clearable={props.typeIsclearable}
                        />
                      </div>
                    )}
                    {/* From Store To Store Filter */}
                    {props.showFromToLocationFilter && (
                      <>
                        <div className="col-md-3">
                          <SelectStore
                            name="fromLocation"
                            placeholder="Select From Location"
                            options={props.storeData}
                            handleChange={props.handleFromStoreChange}
                            handleStoreChange={props.handleFromStoreChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <SelectStore
                            name="toLocation"
                            placeholder="Select To Location"
                            options={props.storeData}
                            handleChange={props.handleFromStoreChange}
                            handleStoreChange={props.handleToStoreChange}
                          />
                        </div>
                      </>
                    )}
                    {/* Payment Account filter */}
                    {props.showPaymentAccountFilter && (
                      <div className="col-md-3">
                        <PaymentSelect
                          name="paymentAccount"
                          placeholder="Select Payment Account"
                          options={props.bankOption}
                          handleChange={props.handlePaymentAccountChange}
                        />
                      </div>
                    )}
                    {/* User Filter */}
                    {props.showUserFilter ? (
                      <div className="col-md-3">
                        <UserSelect
                          placeholder={
                            props?.assigneePlaceholder
                              ? props.assigneePlaceholder
                              : ""
                          }
                          handleUserChange={props.handleUserChange}
                          userList={(x) => props.userList(x)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {props.showReporterFilter ? (
                      <div className="col-md-3">
                        <UserSelect
                          name="reporter"
                          placeholder="Select Reporter"
                          handleUserChange={props.handleReporterChange}
                          userList={(x) => props.reporterList(x)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {props.ShowObjectNameFilter && (
                      <div className="col-md-3">
                        <Select
                          name="objectName"
                          options={props.objectNameOptions}
                          placeholder="Object Name"
                          handleChange={props.handleObjectNameChange}
                        />
                      </div>
                    )}
                    {props.showTagFilter && (
                      <div className="col-md-3">
                        <SelectTag
                          name="productTag"
                          placeholder={props.tagPlaceholder}
                          customTagOption={props.customTagOption}
                          params={props.tagParams}
                          handleTagChange={props.handleTagChange}
                          TagList={(x) => props.TagList(x)}
                        />
                      </div>
                    )}
                    {props.showManufactureFilter && (
                      <div className="col-md-3">
                        <SelectTag
                          name="manufacture"
                          placeholder={"Manufacture"}
                          params={{
                            type: "Manufacture"
                          }}
                          handleTagChange={props.handleManufactureChange2}
                        />
                      </div>
                    )}
                    {props.showStatusOptions && (
                      <div className="col-md-3">
                        <SelectDropdown
                          buttonLabel={props.getSelectedStatusLabel}
                          dropdownLinks={props.statusOptions}
                          color={"gray"}
                          hideCaret
                          width
                          handleChange={props.handleStatusByChange}
                        />
                      </div>
                    )}
                    {props.showSprintFilter && (
                      <div className="col-md-3">
                        <SprintSelect
                          name="sprint"
                          options={props.sprintOptions}
                          placeholder="Select Sprint"
                          handleChange={props.handleSprintChange}
                        />
                      </div>
                    )}
                    {/* Reason Filter */}
                    {props.showReasonFilter && (
                      <div className="col-md-3">
                        <Select
                          name="reason"
                          options={props.reasonOption}
                          placeholder="Select Reason"
                          handleChange={props.handleReasonChange}
                        />
                      </div>
                    )}
                    {/* Reason Filter */}
                    {props.showStockFilter && (
                      <div className="col-md-3">
                        <Select
                          name="stockType"
                          options={props.ActionMenu}
                          placeholder="Select Stock Type"
                          handleChange={props.handleStockTypeChange}
                        />
                      </div>
                    )}
                    {props.showCountSortFilter && (
                      <div className="col-md-3">
                        <Select
                          name="sortType"
                          options={props.countSortOption}
                          placeholder="Select Sort Type"
                          handleChange={props.handleSortTypeChange}
                        />
                      </div>
                    )}
                    {props.showStatusGroupFilter && (
                      <div className="col-md-3">
                        <StatusGroupSelect
                          onInputChange={props.groupSelectOnChange}
                        />
                      </div>
                    )}
                  </div>
                </Form>
                <div className="d-flex justify-content-center">
                  <a
                    class=" p-0 text-secondary mouse fw-bolder"
                    onClick={(e) => toggleShowHideFilter(e)}
                  >
                    {" "}
                    <span
                      className="card pt-2"
                      style={{ width: "80px", paddingTop: "-30px" }}
                    >
                      {displayFilter == false ? (
                        <span className=" pb-2">
                          <FontAwesomeIcon icon={faSortDown} size="lg" />
                        </span>
                      ) : (
                        <FontAwesomeIcon icon={faSortUp} size="lg" />
                      )}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              {displayFilter && (
                <Row className="mb-3">
                  <Col xs="12">
                    {!props.showSearch && (
                      <div
                        className={`page-heading cover d-flex ${
                          props.showSearch
                            ? "justify-content-end"
                            : "justify-content-between"
                        }`}
                      >
                        <PageSearch
                          width={props.searchBarWidth}
                          value={props.pageSearchValue}
                          classnames="page-search"
                          placeholder={props.searchPlaceholder}
                          onChange={props.pageSearchOnChange}
                        />
                        {props.headerButton && props.headerButton}
                      </div>
                    )}
                  </Col>
                </Row>
              )}
            </>
          )}
          {displayFilter == false && (
            <div
              className="py-2 justify-content-center d-flex "
              style={{ display: "block" }}
              id="buttonId"
            >
              <a
                class=" p-0 text-secondary mouse fw-bolder"
                onClick={(e) => toggleShowHideFilter(e)}
              >
                {" "}
                <span
                  className="card justify-content-center d-flex pb-2"
                  style={{ width: "80px", paddingTop: "-30px" }}
                >
                  {displayFilter ? (
                    <FontAwesomeIcon icon={faSortUp} size="lg" />
                  ) : (
                    <span style={{ margin: "0px 0px 0px 32px" }}>
                      <FontAwesomeIcon icon={faSortDown} size="lg" />
                    </span>
                  )}
                </span>
              </a>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Filter;
