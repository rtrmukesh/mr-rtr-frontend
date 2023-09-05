import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Col, Row, Table } from "reactstrap";
import { bindActionCreators } from "redux";
//Action
import { fetchList, setTablePage } from "../../actions/table";
//Assets
import { ChevronDown, ChevronUp } from "../../assets/icons";
//Helper
import Url from "../../lib/Url";
import NoRecordsFound from "../NoRecordsFound";
//Components
import Pagination from "../Pagination";
import Spinner from "../Spinner";

//Styles
import { endpoints } from "../../api/endPoints";
import { apiClient } from "../../apiClient";
import ObjectName from "../../helpers/ObjectName";
import { Order } from "../../helpers/Order";
import * as tabConstant from "../../helpers/Product";
import ArrayList from "../../lib/ArrayList";
import Currency from "../../lib/Currency";
import DateTime from "../../lib/DateTime";
import PaymentAccountService from "../../services/PaymentAccountService";
import { getStoresList } from "../../services/StoreListService";
import TranferTypeReasonService from "../../services/TranferTypeReasonService";
import BrandService from "../../services/BrandService";
import UserService from "../../services/UserService";
import { getUserRole } from "../../services/UserService";
import { DEFAULT_PAGE } from "../../views/product";
import Filter from "../Filter";
import "./styles.scss";
import SprintService from "../../services/SprintService";
import { groupOption } from "../../helpers/Status";
import CategoryService from "../../services/CategoryService";
import ProductService from "../../services/ProductService";
import { VendorService } from "../../services/VendorService";
import StatusService from "../../services/StatusService";
import ShiftService from "../../services/ShiftService";
import transferTypeService from "../../services/TransferTypeService";
import StoreService from "../../services/StoreService";
import Cookies from "../../lib/Helper";
import Cookie from "../../helpers/Cookie";
import { isEmptyArray } from "formik";

export const ReduxColumn = () => {};

class ReduxTable extends React.Component {
  state = {
    page: 1,
    pageSize: 25,
    id: "",
    apiURL: "",
    selectedAll: false,
    selectedIds: [],
    searchTerm:
      this.props.params && this.props.params.searchItem
        ? this.props.params.searchItem
        : "" || "",
    isSearch: false,
    isActive: "",
    selectedStatusOption: "Active",
    selectedSortOption: "Alphabetical A-Z",
    sortByOptions: [
      {
        value: "a-z",
        label: "Alphabetical A-Z",
      },
    ],
    value: Url.GetParam("search"),
    pageSizeValue: Url.GetParam("pageSize"),
    category: "",
    categoryList: "",
    brandList: "",
    brand: "",
    spinning: false,
    autoRefresh: "",
    tab: Url.GetParam("tab"),
    storeData: [],
    vendorData: [],
    refreshValue: "",
    ownerData: [],
    statusList: [],
    gstStatusList: [],
    transferTypeList: [],
    userList: [],
    shiftList: [],
    brandOption: [],
    categoryOption: [],
    salesExecutiveOption: [],
    shiftData: [],
    bankOption: [],
    userOption: [],
    tagOption: [],
    sprintOption: [],
    reasonOption: [],
    productOption: [],
    selectedVendor: Url.GetParam("account"),
    selectedBrand: Url.GetParam("brand"),
    selectedCategory: Url.GetParam("category"),
    selectedLocation: Url.GetParam("location"),
    stockEntryProductType: Url.GetParam("stockEntryProductType"),
    selectedStartDate: Url.GetParam("startDate"),
    selectedEndDate: Url.GetParam("endDate"),
    selectedStatus: Url.GetParam("status"),
    selectedSalesExecutive: Url.GetParam("salesExecutive"),
    selectedShift: Url.GetParam("shift"),
    selectedPaymentType: Url.GetParam("paymentType"),
    selectedType: Url.GetParam("type"),
    selectedFromLocation: Url.GetParam("fromLocation"),
    selectedToLocation: Url.GetParam("toLocation"),
    selectedPaymentAccount: Url.GetParam("paymentAccount"),
    selectedUser: Url.GetParam("user"),
    selectedObjectName: Url.GetParam("objectName"),
    selectedProductTag: Url.GetParam("productTag"),
    selectedManufacture: Url.GetParam("manufacture"),
    selectedSprintName: Url.GetParam("sprint"),
    selectedSort: Url.GetParam("sort"),
    selectedSortDir: Url.GetParam("sortDir"),
    selectedReason: Url.GetParam("reason"),
    selectedProduct: Url.GetParam("product"),
    stockType: Url.GetParam("stockType"),
    selectedGstStatus: Url.GetParam("gstStatus"),
    selectedReporter: Url.GetParam("reporter"),
    statusGroup: Url.GetParam("statusGroup"),
    projectId: Cookies.get(Cookie.PROJECT_ID),
  };

  componentDidMount() {
    const { apiURL, id, table, sortByOptions, statusOptions, showDropdown } =
      this.props;

    if (showDropdown) {
      this.getCategoryDetail();
      this.getBrandDetail();
    }
    if (
      Url.GetParam("location") ||
      Url.GetParam("fromLocation") ||
      Url.GetParam("toLocation")
    ) {
      this.storeList();
    }

    if (this.props.showSalesExecutiveFilter) {
      this.getSalesExecutiveList();
    }

    if (this.props.showPaymentAccountFilter) {
      this.getBankList();
    }

    if (Url.GetParam("brand")) {
      this.getBrandList();
    }

    if (Url.GetParam("category")) {
      this.getCategoryList();
    }

    if (Url.GetParam("product")) {
      this.getProducts();
    }

    if (Url.GetParam("account")) {
      this.getAccounts();
    }

    if (Url.GetParam("status") || Url.GetParam("gstStatus")) {
      this.getStatus();
    }

    if (Url.GetParam("shift")) {
      this.getShiftList();
    }

    if (Url.GetParam("type")) {
      this.getTransferType();
    }

    if (Url.GetParam("user") || Url.GetParam("reporter")) {
      this.getUserList();
    }

    if (Url.GetParam("productTag") || Url.GetParam("manufacture")) {
      this.getTagList();
    }

    if (this.props.showReasonFilter) {
      this.getTransferTypeReason();
    }
    if (this.props.showSprintFilter) {
      this.getSprintList();
    }
    if (this.props.autoRefresh) {
      this.interval = setInterval(
        () =>
          this.fetchData(
            ...this.getFetchDataParams({
              search: this.state.value ? this.state.value : "",
            })
          ),
        60000
      );
    }

    this.setState(
      {
        id,
        apiURL,
        page:
          table[id] && table[id].currentPage
            ? table[id].currentPage
            : Url.GetParam("page") || 1,
        pageSize: table[id] && table[id].pageSize ? table[id].pageSize : 25,
        selectedStatusOption:
          statusOptions && statusOptions.length
            ? statusOptions[0].value
            : this.state.selectedStatusOption,
        selectedSortOption:
          sortByOptions && sortByOptions.length
            ? sortByOptions[0].value
            : this.state.selectedSortOption,
      },
      () => {
        const selectedSortOption = this.getSelectedSortLabel(
          this.state.selectedSortOption
        );
        this.handleSortByChange(selectedSortOption);
      }
    );
    const selectedStatusOption = this.getSelectedStatusLabel(
      this.state.selectedStatusOption
    );
    this.handleStatusByChange(selectedStatusOption);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getBrandList = async () => {
    const data = await BrandService.getBrandOption();
    this.setState({ brandOption: data });
  };

  getCategoryList = async () => {
    const data = await CategoryService.getOption();
    this.setState({ categoryOption: data });
  };

  getProducts = async () => {
    let response = await ProductService.getOption();
    this.setState({ productOption: response });
  };

  getAccounts = async () => {
    let response = await VendorService.getOption();
    this.setState({ vendorData: response });
  };

  getStatus = async () => {
    let response = await StatusService.getOption(this.props.objectName);
    this.setState({ statusList: response, gstStatusList: response });
  };

  getShiftList = async () => {
    const response = await ShiftService.getShiftList();
    this.setState({ shiftData: response });
  };

  getTransferType = async () => {
    const response = await transferTypeService.getOption();
    this.setState({ transferTypeList: response });
  };

  getUserList = async () => {
    const users = await UserService.getOption();
    this.setState({ userOption: users });
  };

  componentDidUpdate(prevProps) {
    if (this.props.apiURL !== prevProps.apiURL) {
      const { sortByOptions, statusOptions } = this.props;

      this.setState(
        {
          apiURL: this.props.apiURL,
          selectedStatusOption:
            statusOptions && statusOptions.length
              ? statusOptions[0].value
              : this.state.selectedStatusOption,
          selectedSortOption:
            sortByOptions && sortByOptions.length
              ? sortByOptions[0].value
              : this.state.selectedSortOption,
        },
        () => {
          const selectedSortOption = this.getSelectedSortLabel(
            this.state.selectedSortOption
          );
          this.handleSortByChange(selectedSortOption);
        },
        () => {
          const selectedStatusOption = this.getSelectedStatusLabel(
            this.state.selectedStatusOption
          );
          this.handleStatusByChange(selectedStatusOption);
        }
      );
    }
  }

  /**
   * Fetch data using API call
   *
   * @param {*} force
   */

  fetchData(
    force,
    sort,
    sortDir,
    status,
    account,
    brand,
    category,
    location,
    startDate,
    endDate,
    statusValue,
    salesExecutive,
    shift,
    paymentType,
    type,
    fromLocation,
    toLocation,
    paymentAccount,
    user,
    objectName,
    productTag,
    pageValue,

    reason,
    product,
    stockType,
    search,
    manufacture,
    gstStatus,
    reporter,
    sprint,
    statusGroup,
    projectId,
    stockEntryProductType,
  ) {
    const {
      id,
      apiURL,
      page,
      pageSize,
      searchTerm,
      selectedSortOption,
      value,
      pageSizeValue,
      tab,
      selectedSort,
      selectedSortDir,
    } = this.state;
    const {
      table,
      actions: { fetchList, setTablePage },
      sortByOptions,
      statusOptions,
    } = this.props;
    const sortAndSortDir = selectedSortOption.split(":");

    const sortBy = sort
      ? sort
      : selectedSort
      ? selectedSort
      : sortAndSortDir[0];
    const sortDirBy = sortDir
      ? sortDir
      : selectedSortDir
      ? selectedSortDir
      : sortAndSortDir[1];
    const selectedstatus = status;

    const listDetails = table[id] || {};

    const params = this.props.params || {};
    params.search = search ? search : value || "";

    if (this.props.showStatusOptions && !params.status) {
      params.status =
        status ||
        (statusOptions && selectedstatus) ||
        this.state.selectedStatusOption ||
        "";
    }
    params.sort = sort || (sortByOptions && !searchTerm && sortBy) || "";
    params.sortDir =
      sortDir || (sortByOptions && !searchTerm && sortDirBy) || "";
    params.pageSize = pageSize || pageSizeValue || Url.GetParam("pageSize");
    if(Url.GetParam("page")){
    params.page = pageValue || Url.GetParam("page");
    }else{
      params.page=DEFAULT_PAGE
    }
    params.tab = tab;

    params.account = account
      ? account
      : account === ""
      ? ""
      : this.props?.params?.account
      ? this.props?.params?.account
      : this.state.selectedVendor;
    params.brand = brand ? brand : brand === "" ? "" : this.state.selectedBrand;
    params.category = category
      ? category
      : category === ""
      ? ""
      : this.state.selectedCategory;
    params.location = location
      ? location
      : location === ""
      ? ""
      : this.state.selectedLocation;
      params.stockEntryProductType = stockEntryProductType
      ? stockEntryProductType
      : stockEntryProductType === ""
      ? ""
      : this.state.stockEntryProductType;
    if (this.props.showDateFilter) {
      params.startDate = startDate
        ? startDate
        : startDate === ""
        ? ""
        : this.state.selectedStartDate;
      params.endDate = endDate
        ? endDate
        : endDate === ""
        ? ""
        : this.state.selectedEndDate;
    }
    params.status = statusValue
      ? statusValue
      : statusValue === ""
      ? ""
      : this?.props?.params?.status
      ? this?.props?.params?.status
      : this.state.selectedStatus;
    params.salesExecutive = salesExecutive
      ? salesExecutive
      : salesExecutive === ""
      ? ""
      : this.state.selectedSalesExecutive;
    params.shift = shift ? shift : shift === "" ? "" : this.state.selectedShift;
    params.paymentType = paymentType
      ? paymentType
      : paymentType === ""
      ? ""
      : this.state.selectedPaymentType;
    params.type = type
      ? type
      : type === ""
      ? ""
      : this?.props?.params?.type
      ? this?.props?.params?.type
      : this.state.selectedType;
    params.fromLocation = fromLocation
      ? fromLocation
      : fromLocation === ""
      ? ""
      : this.state.selectedFromLocation;
    params.toLocation = toLocation
      ? toLocation
      : toLocation === ""
      ? ""
      : this.state.selectedToLocation;
    params.paymentAccount = paymentAccount
      ? paymentAccount
      : paymentAccount === ""
      ? ""
      : this.state.selectedPaymentAccount;
    params.user = this?.props?.params?.user
      ? this?.props?.params?.user
      : user
      ? user
      : user === ""
      ? ""
      : this.state.selectedUser;
    if (objectName || this.state.selectedObjectName) {
      params.objectName = objectName
        ? objectName
        : objectName === ""
        ? ""
        : this.state.selectedObjectName;
    }
    params.sprint = sprint
      ? sprint
      : sprint === ""
      ? ""
      : this.state.selectedSprintName;
    params.productTag = productTag
      ? productTag
      : productTag === ""
      ? ""
      : this.state.selectedProductTag;
    params.manufacture = manufacture
      ? manufacture
      : manufacture === ""
      ? ""
      : this.state.selectedManufacture;
    if (this.props.customStatus) {
      params.status = this.props.customStatus.status;
    }
    params.gstStatus = gstStatus
      ? gstStatus
      : gstStatus === ""
      ? ""
      : this.state.selectedGstStatus;
    params.reporter = reporter
      ? reporter
      : reporter === ""
      ? ""
      : this.state.selectedReporter;
    params.reason = reason
      ? reason
      : reason === ""
      ? ""
      : this.state.selectedReason;

    params.product = product
      ? product
      : product === ""
      ? ""
      : this.state.selectedProduct;

    params.stockType = stockType
      ? stockType
      : stockType === ""
      ? ""
      : this.state.stockType;

    params.group = statusGroup
      ? statusGroup
      : statusGroup === ""
      ? ""
      : this.state.statusGroup;
      if(Cookies.get(Cookie.PROJECT_ID) !== "null" && this.props.projectId){
        params.projectId = this.props.projectId
        ? this.props.projectId
        : this.props.projectId === ""
        ? ""
        : Cookies.get(Cookie.PROJECT_ID) == "null"
        ? ""
        : Cookies.get(Cookie.PROJECT_ID);;
      }
    if (this.props.paramsToUrl) {
      const currentPage = window.location.pathname;
      let queryString = "";

      const queryStringArray = Object.entries(params);
      const urlParams = [];
      if (queryStringArray.length > 0) {
        queryString = "?";
        queryStringArray.forEach(([key, value]) => {
          if (value !== null && value !== "") {
            urlParams.push(`${key}=${value}`);
          }
        });
      }
      const filteredParams = urlParams.join("&");
      if (this.props.history) {
        this.props.history.push(
          `${currentPage}${filteredParams ? `?${filteredParams}` : ""}`,
          {
            data: params,
          }
        );
      }
    }
    if (!listDetails.isFetching && apiURL) {
      if (!listDetails) {
        return;
      }
      if (
        !listDetails[page] ||
        (listDetails.sortList[page] !== params.sort &&
          listDetails.sortDirList[page] !== params.sortDir) ||
        force
      ) {
        fetchList(
          id,
          apiURL,
          params.page ? params.page : page,
          pageSize,
          params
        );
      } else {
        setTablePage(id, page);
      }
    }
    this.setState({ pageSize: "" });
  }

  /**
   * Change page
   *
   * @param {*} page
   */
  onPageChange(page) {
    this.props.setPage && this.props.setPage(page);
    const pageSize = Url.GetParam("pageSize");
    this.setState({ pageSize });
    this.fetchData(...this.getFetchDataParams({ page: page ? page : "" }));
  }

  /**
   * Change page size
   *
   * @param {*} e
   */
  onPageSizeChange(e) {
    this.setState({ page: 1, pageSize: e.target.value, isSearch: false }, () =>
      this.fetchData(true)
    );
  }

  /**
   * Select all checkbox
   *
   * @param {*} data
   * @param {*} e
   */
  toggleSelectAll(data, e) {
    const selectedIds = this.state.selectedIds;
    let rowIds = [];
    let checkedIds = [];
    data.forEach((row) => {
      if (e.target.checked) {
        if (
          selectedIds.indexOf(
            this.props.customCheckBoxId
              ? row[this.props.customCheckBoxId]
              : row.id
          ) < 0
        ) {
          selectedIds.push(
            this.props.customCheckBoxId
              ? row[this.props.customCheckBoxId]
              : row.id
          );
          rowIds.push(
            this.props.customCheckBoxId
              ? row[this.props.customCheckBoxId]
              : row.id
          );
        }
      } else {
        if (
          selectedIds.indexOf(
            this.props.customCheckBoxId
              ? row[this.props.customCheckBoxId]
              : row.id
          ) >= 0
        ) {
          selectedIds.splice(
            selectedIds.indexOf(
              this.props.customCheckBoxId
                ? row[this.props.customCheckBoxId]
                : row.id
            ),
            1
          );
        }
      }
    });
    for (let i = 0; i < rowIds.length; i++) {
      const validIds = rowIds.find((number) => number == selectedIds[i]);
      if (validIds !== undefined) {
        checkedIds.push(validIds);
      }
    }
    this.setState({
      selectedAll: e.target.checked,
      selectedIds: checkedIds,
    });
    this.props.onBulkSelect(checkedIds);

    if(this.props.selectedCheckBox == false){
    this.setState({
      selectedAll: false,
      selectedIds: "",
    });
    this.props.onBulkSelect(checkedIds);
     
  }
}

  /**
   * Single checkbox select
   *
   * @param {*} data
   * @param {*} e
   */
  toggleSelect(data, e) {
    const rowIds = [];
    let checkedIds = [];

    data.forEach((row) => {
      rowIds.push(
        parseInt(
          this.props.customCheckBoxId
            ? row[this.props.customCheckBoxId]
            : row.id
        )
      );
    });
    const rowId = parseInt(e.target.value);
    const selectedIds = this.state.selectedIds;

    if (e.target.checked) {
      if (selectedIds.indexOf(rowId) < 0) {
        selectedIds.push(rowId);
      }
    } else {
      if (selectedIds.indexOf(rowId) >= 0) {
        selectedIds.splice(selectedIds.indexOf(rowId), 1);
      }
    }

    let selectedLength = 0;
    rowIds.forEach((rowId) => {
      if (selectedIds.indexOf(rowId) >= 0) {
        selectedLength++;
      }
    });

    for (let i = 0; i < rowIds.length; i++) {
      const validIds = rowIds.find((number) => number == selectedIds[i]);
      if (validIds !== undefined) {
        checkedIds.push(validIds);
      }
    }

    this.setState(
      {
        selectedAll: rowIds.length === selectedLength,
        selectedIds: selectedIds,
      },
      () => {
        this.props.onBulkSelect(checkedIds);
      }
    );
  }

  componentWillReceiveProps(props) {
    const { table, id } = props;
    const listDetails = table[id];
    let data = [];

    if (listDetails) {
      data = listDetails[listDetails.currentPage] || [];
    }


    if(this.props.selectedCheckBox == false){
       this.setState({ selectedIds: [], selectedAll:false });
    } 
    const selectedIds = this.state.selectedIds;
    let selectedLength = 0;
    data.forEach((row) => {
      if (selectedIds.indexOf(row.id) >= 0) {
        selectedLength++;
      }
    });

    this.setState({
      selectedAll: selectedLength > 0 && selectedLength === data.length,
    });
  }

  /**
   * Change search term
   *
   * @param {*} event
   */
  onChange(event) {
    this.setState({ value: event.target.value, page: 1 });
    event.persist();
    this.setState({ searchTerm: event.target.value });
    const status = Url.GetParam("status");
    this.setState({ selectedStatusOption: status });
    if (this.props.islandingTable)
      this.props.saveSearchTerm(event.target.value);
  }

  onSearchKeyUp(event) {
    if (event.keyCode == 13) {
      this.fetchData(
        ...this.getFetchDataParams({
          search: event?.target?.value ? event?.target?.value : "",
        })
      );
    }
  }
  onSearchClick(event) {
    this.fetchData(
      ...this.getFetchDataParams({
        search: this.state.value ? this.state.value : "",
      })
    );
  }

  doSearch = _.debounce((event) => {
    this.setState(
      {
        isSearch: true,
        searchTerm: encodeURIComponent(event.target.value),
        page: 1,
        pageSize: Url.GetParam("pageSize"),
      },
      () => {
        this.fetchData(
          true,
          Url.GetParam("sort"),
          Url.GetParam("sortDir"),
          "",
          Url.GetParam("account"),
          Url.GetParam("brand"),
          Url.GetParam("category"),
          Url.GetParam("location"),
          Url.GetParam("startDate"),
          Url.GetParam("endDate"),
          Url.GetParam("status"),
          Url.GetParam("salesExecutive"),
          Url.GetParam("shift"),
          Url.GetParam("paymentType"),
          Url.GetParam("type"),
          Url.GetParam("fromLocation"),
          Url.GetParam("toLocation"),
          Url.GetParam("paymentAccount"),
          Url.GetParam("user"),
          Url.GetParam("objectName"),
          Url.GetParam("productTag"),
          Url.GetParam("manufacture"),
          Url.GetParam("stockEntryProductType"),
          DEFAULT_PAGE
        );
        this.setState({
          selectedAll: false,
          selectedIds: [],
        });
      }
    );
  }, 500);

  columnSortBy(sortBy) {
    this.setState({
      isActive: !this.state.isActive,
      sortBy: sortBy,
      pageSize: this.state.pageSize,
    });
    let sortDir = "";
    if (this.state.isActive) {
      sortDir = "DESC";
    } else {
      sortDir = "ASC";
    }
    this.fetchData(true, sortBy, sortDir);
  }

  handleSortByChange = (value) => {
    this.setState({ selectedSortOption: this.getSortValueFromLabel(value) });
    this.getSortByOptions(value);
  };

  getFetchDataParams = (values) => {
    return [
      true,
      Url.GetParam("sort"),
      Url.GetParam("sortDir"),
      "",
      (values && values?.account) || values?.account === ""
        ? values?.account
        : Url.GetParam("account"),
      (values && values?.brand) || values?.brand === ""
        ? values?.brand
        : Url.GetParam("brand"),
      (values && values?.category) || values?.category === ""
        ? values?.category
        : Url.GetParam("category"),
      (values && values?.location) || values?.location === ""
        ? values?.location
        : Url.GetParam("location"),
      (values && values?.startDate) || values?.startDate === ""
        ? values?.startDate
        : Url.GetParam("startDate"),
      (values && values?.endDate) || values?.endDate === ""
        ? values?.endDate
        : Url.GetParam("endDate"),
      (values && values?.status) || values?.status === ""
        ? values?.status
        : Url.GetParam("status"),
      (values && values?.salesExecutive) || values?.salesExecutive === ""
        ? values?.salesExecutive
        : Url.GetParam("salesExecutive"),
      (values && values?.shift) || values?.shift === ""
        ? values?.shift
        : Url.GetParam("shift"),
      (values && values?.paymentType) || values?.paymentType === ""
        ? values?.paymentType
        : Url.GetParam("paymentType"),
      (values && values?.type) || values?.type === ""
        ? values?.type
        : Url.GetParam("type"),
      (values && values?.fromLocation) || values?.fromLocation === ""
        ? values?.fromLocation
        : Url.GetParam("fromLocation"),
      (values && values?.toLocation) || values?.toLocation === ""
        ? values?.toLocation
        : Url.GetParam("toLocation"),
      (values && values?.paymentAccount) || values?.paymentAccount === ""
        ? values?.paymentAccount
        : Url.GetParam("paymentAccount"),
      (values && values?.user) || values?.user === ""
        ? values?.user
        : Url.GetParam("user"),
      (values && values?.objectName) || values?.objectName === ""
        ? values?.objectName
        : Url.GetParam("objectName"),
      (values && values?.productTag) || values?.productTag === ""
        ? values?.productTag
        : Url.GetParam("productTag"),

      values && values?.page ? values?.page : Url.GetParam("page"),
      (values && values?.reason) || values?.reason === ""
        ? values?.reason
        : Url.GetParam("reason"),
      (values && values?.product) || values?.product === ""
        ? values?.product
        : Url.GetParam("product"),
      (values && values?.stockType) || values?.stockType === ""
        ? values?.stockType
        : Url.GetParam("stockType"),
      (values && values?.search) || values?.search === ""
        ? values?.search
        : Url.GetParam("search"),
      (values && values?.manufacture) || values?.manufacture === ""
        ? values?.manufacture
        : Url.GetParam("manufacture"),
      (values && values?.gstStatus) || values?.gstStatus === ""
        ? values?.gstStatus
        : Url.GetParam("gstStatus"),
      (values && values?.reporter) || values?.reporter === ""
        ? values?.reporter
        : Url.GetParam("reporter"),
      (values && values?.sprint) || values?.sprint === ""
        ? values?.sprint
        : Url.GetParam("sprint"),
      (values && values?.statusGroup) || values?.statusGroup === ""
        ? values?.statusGroup
        : Url.GetParam("statusGroup"),
      (this.props && this.props?.projectId) || this.props?.projectId === ""
        ? this.props?.projectId
        : Cookies.get(Cookie.PROJECT_ID),
        (values && values?.stockEntryProductType) || values?.stockEntryProductType === ""
        ? values?.stockEntryProductType
        : Url.GetParam("stockEntryProductType"),
    ];
  };

  // handle vendor change
  handleVendorChange = async (vendor) => {
    let vendorValue = vendor?.value ? vendor?.value : "";
    this.setState({ selectedVendor: vendorValue ? vendorValue : "" });
    this.fetchData(...this.getFetchDataParams({ account: vendorValue,page:DEFAULT_PAGE }));
  };

  // handle brand change
  handleBrandChange = (brand) => {
    let brandValue = brand?.value ? brand?.value : "";
    this.setState({ selectedBrand: brandValue ? brandValue : "" });
    this.fetchData(...this.getFetchDataParams({ brand: brandValue, page:DEFAULT_PAGE }));
  };

  // handle category change
  handleCategoryChange = (category) => {
    let categoryValue = category?.value ? category?.value : "";
    this.setState({ selectedCategory: categoryValue ? categoryValue : "" });
    this.fetchData(...this.getFetchDataParams({ category: categoryValue,page:DEFAULT_PAGE }));
  };

  //handle location change
  handleStoreChange = (location) => {
    let storeValue = location?.value ? location?.value : "";
    this.setState({ selectedLocation: storeValue ? storeValue : "" });
    this.fetchData(...this.getFetchDataParams({ location: storeValue,page:DEFAULT_PAGE }));
  };
   //handle location change
   handleStockEntryProductTypeChange = (type) => {
    let value = type?.value ? type?.value : "";
    this.setState({ stockEntryProductType: value ? value : "" });
    this.fetchData(...this.getFetchDataParams({ stockEntryProductType: value,page:DEFAULT_PAGE }));
  };

  //handle start date change
  handleStartDateChange = (startDate) => {
    const startDateValue = startDate ? DateTime.toISOStringDate(startDate) : "";
    this.setState({ selectedStartDate: startDateValue ? startDateValue : "" });
    this.fetchData(...this.getFetchDataParams({ startDate: startDateValue,page:DEFAULT_PAGE }));
  };

  //handle end date change
  handleEndDateChange = (endDate) => {
    const endDateValue = endDate ? DateTime.toISOStringDate(endDate) : "";
    this.setState({ selectedEndDate: endDateValue ? endDateValue : "" });
    this.fetchData(...this.getFetchDataParams({ endDate: endDateValue,page:DEFAULT_PAGE }));
  };

  //handle status change
  onStatusChange = (status) => {
    let statusValue;
    if (Array.isArray(status)) {
      let arrayValue = [];
      for (let i = 0; i < status.length; i++) {
        const { value } = status[i];
        arrayValue.push(value);
      }
      statusValue = arrayValue;
    } else {
      statusValue = status?.value ? status?.value : "";
    }
    this.setState({ selectedStatus: statusValue ? statusValue : "" });
    this.fetchData(...this.getFetchDataParams({ status: statusValue ,page:DEFAULT_PAGE}));
  };
  
  onGstStatusChange = (status) => {
    let statusValue = status?.value ? status?.value : "";
    this.setState({ selectedStatus: statusValue ? statusValue : "" });
    this.fetchData(
      ...this.getFetchDataParams({ gstStatus: statusValue ? statusValue : "",page:DEFAULT_PAGE })
    );
  };
  //handle sales executive change
  handleSalesExecutiveChange = (salesExecutive) => {
    let salesExecutiveValue = salesExecutive?.value
      ? salesExecutive?.value
      : "";
    this.setState({
      selectedSalesExecutive: salesExecutiveValue ? salesExecutiveValue : "",
    });
    this.fetchData(
      ...this.getFetchDataParams({ salesExecutive: salesExecutiveValue ,page:DEFAULT_PAGE})
    );
  };

  //handle shift change
  handleShiftChange = (shift) => {
    let shiftValue = shift?.value ? shift?.value : "";
    this.setState({ selectedShift: shiftValue ? shiftValue : "" });
    this.fetchData(...this.getFetchDataParams({ shift: shiftValue,page:DEFAULT_PAGE }));
  };

  //handle payment change
  handlePaymentTypeChange = (paymentType) => {
    let paymentTypeValue = paymentType?.value ? paymentType?.value : "";
    this.setState({
      selectedPaymentType: paymentTypeValue ? paymentTypeValue : "",
    });
    this.fetchData(
      ...this.getFetchDataParams({ paymentType: paymentTypeValue,page:DEFAULT_PAGE })
    );
  };

  //handle type change
  handleTypeChange = (type) => {
    let typeValue = type?.value ? type?.value : "";
    this.setState({ selectedType: typeValue ? typeValue : "" });
    this.fetchData(...this.getFetchDataParams({ type: typeValue,page:DEFAULT_PAGE }));
  };

  //handle from location change
  handleFromStoreChange = (location) => {
    let fromLocationValue = location?.value ? location?.value : "";
    this.setState({
      selectedFromLocation: fromLocationValue ? fromLocationValue : "",
    });
    this.fetchData(
      ...this.getFetchDataParams({ fromLocation: fromLocationValue,page:DEFAULT_PAGE })
    );
  };

  //handle to location change
  handleToStoreChange = (location) => {
    let toLocationValue = location?.value ? location?.value : "";
    this.setState({
      selectedToLocation: toLocationValue ? toLocationValue : "",
    });
    this.fetchData(...this.getFetchDataParams({ toLocation: toLocationValue,page:DEFAULT_PAGE }));
  };

  //handle payment account change
  handlePaymentAccountChange = (paymentAccount) => {
    let paymentAccountValue = paymentAccount?.value
      ? paymentAccount?.value
      : "";
    this.setState({
      selectedPaymentAccount: paymentAccountValue ? paymentAccountValue : "",
    });
    this.fetchData(
      ...this.getFetchDataParams({ paymentAccount: paymentAccountValue,page:DEFAULT_PAGE })
    );
  };

  //handle user change
  handleUserChange = (user) => {
    let userValue = user?.id ? user?.id : "";
    this.setState({
      selectedUser: userValue ? userValue : "",
    });
    this.fetchData(...this.getFetchDataParams({ user: userValue,page:DEFAULT_PAGE }));
  };

  handleReporterChange = (user) => {
    let userValue = user?.id ? user?.id : "";
    this.setState({
      selectedReporter: userValue ? userValue : "",
    });
    this.fetchData(...this.getFetchDataParams({ reporter: userValue,page:DEFAULT_PAGE }));
  };

  //handle object name change
  handleObjectNameChange = (objectName) => {
    let objectNameValue = objectName?.value ? objectName?.value : "";
    this.setStselectedObjectNameate({
      selectedObjectName: objectNameValue ? objectNameValue : "",
    });
    this.fetchData(...this.getFetchDataParams({ objectName: objectNameValue,page:DEFAULT_PAGE }));
  };
  handleSprintChange = (sprint) => {
    let sprintValue = sprint?.value ? sprint?.value : "";
    this.setState({
      selectedSprintName: sprintValue ? sprintValue : "",
    });
    this.fetchData(...this.getFetchDataParams({ sprint: sprintValue,page:DEFAULT_PAGE }));
  };
  //handle productTag change
  handleTagChange = (productTag) => {
    let tagValue = productTag?.value ? productTag?.value : "";
    this.setState({
      selectedProductTag: tagValue ? tagValue : "",
    });
    this.fetchData(...this.getFetchDataParams({ productTag: tagValue,page:DEFAULT_PAGE }));
  };
  handleManufactureChange = (manufacture) => {
    let tagValue = manufacture?.value ? manufacture?.value : "";
    this.setState({
      selectedManufacture: tagValue ? tagValue : "",
    });
    this.fetchData(...this.getFetchDataParams({ manufacture: tagValue,page:DEFAULT_PAGE }));
  };
  //handle reason change
  handleReasonChange = (reason) => {
    let reasonValue = reason?.value ? reason?.value : "";
    this.setState({
      selectedReason: reasonValue ? reasonValue : "",
    });
    this.fetchData(
      ...this.getFetchDataParams({ reason: reasonValue ? reasonValue : "",page:DEFAULT_PAGE })
    );
  };

  handleStockTypeChange = (stockType) => {
    stockType = stockType?.value ? stockType?.value : "";
    this.setState({
      stockType: stockType ? stockType : "",
    });
    this.fetchData(
      ...this.getFetchDataParams({ stockType: stockType ? stockType : "",page:DEFAULT_PAGE })
    );
  };

  handleProductChange = (product) => {
    let productValue = product?.id ? product?.id : "";
    this.setState({
      selectedProduct: productValue ? productValue : "",
    });
    this.fetchData(
      ...this.getFetchDataParams({ product: productValue ? productValue : "",page:DEFAULT_PAGE })
    );
  };

  handleGroupChange = (statusGroup) => {
    statusGroup = statusGroup?.values?.status_group
      ? statusGroup?.values?.status_group?.value
      : "";
    this.setState({
      statusGroup: statusGroup ? statusGroup : "",
    });
    this.fetchData(
      ...this.getFetchDataParams({
        statusGroup: statusGroup ? statusGroup : "",page:DEFAULT_PAGE
      })
    );
  };

  refreshButtonOnClick = (e) => {
    let value = e;
    this.setState({ refreshValue: value });
    this.setState({ spinning: true });
    this.fetchData(
      true,
      Url.GetParam("sort"),
      Url.GetParam("sortDir"),
      "",
      Url.GetParam("account"),
      Url.GetParam("brand"),
      Url.GetParam("category"),
      Url.GetParam("location"),
      Url.GetParam("startDate"),
      Url.GetParam("endDate"),
      Url.GetParam("status"),
      Url.GetParam("salesExecutive"),
      Url.GetParam("shift"),
      Url.GetParam("paymentType"),
      Url.GetParam("type"),
      Url.GetParam("fromLocation"),
      Url.GetParam("toLocation"),
      Url.GetParam("paymentAccount"),
      Url.GetParam("user"),
      Url.GetParam("objectName"),
      Url.GetParam("productTag"),

      Url.GetParam("page") ? Url.GetParam("page") : DEFAULT_PAGE,
      Url.GetParam("reason"),
      Url.GetParam("product"),
      Url.GetParam("stockType"),
      Url.GetParam("productId"),
      Url.GetParam("manufacture"),
      Url.GetParam("gstStatus"),
      Url.GetParam("reporter"),
    Url.GetParam("stockEntryProductType"),

    );
    this.setState({ refreshValue: "" });
    this.setState({ spinning: false });
  };

  // Sort by option
  getSortByOptions(value) {
    const valueArray = this.getSortValueFromLabel(value).split(":");
    const sortBy = valueArray[0];
    const sortDir = valueArray[1];
    const status = Url.GetParam("status");
    this.fetchData(true, sortBy, sortDir, status);
  }

  getSelectedSortLabel() {
    const sortByOptions = this.props.sortByOptions
      ? this.props.sortByOptions
      : this.state.sortByOptions;

    const selectedSortOption = sortByOptions.find(
      (option) => option.value.split(":")[0] === Url.GetParam("sort")
    );

    return selectedSortOption?.label
      ? selectedSortOption?.label
      : sortByOptions[0].label;

    return "";
  }

  getSortValueFromLabel(label) {
    const sortByOptions = this.props.sortByOptions
      ? this.props.sortByOptions
      : this.state.sortByOptions;

    const selectedSortOption = sortByOptions.find(
      (option) => option.value === label
    );

    if (selectedSortOption) {
      return selectedSortOption.value;
    }

    return "";
  }

  // handle status
  handleStatusByChange = (value) => {
    const status1 = this.getStatusValueFromLabel(value);
    this.setState({
      selectedStatusOption: status1,
    });
    this.getStatusByOptions(value);
  };

  // get seleted status
  getSelectedStatusLabel() {
    const statusOptions = this.props.statusOptions
      ? this.props.statusOptions
      : this.state.sortByOptions;

    let selectedStatusOption;
    if (this.props.selectedStatus) {
      selectedStatusOption = statusOptions.find(
        (option) => option.value === this.props.selectedStatus
      );
    } else {
      selectedStatusOption = statusOptions.find(
        (option) => option.value === this.state.selectedStatusOption
      );
    }
    if (selectedStatusOption) {
      return selectedStatusOption.label;
    }

    return "";
  }
  // get status value from label
  getStatusValueFromLabel(label) {
    const statusOptions = this.props.statusOptions
      ? this.props.statusOptions
      : this.state.statusOptions;

    const selectedStatusOption =
      statusOptions && statusOptions.find((option) => option.label === label);

    if (selectedStatusOption) {
      return selectedStatusOption.value;
    }

    return "";
  }

  // status by option
  getStatusByOptions(value) {
    const valueArray = this.getStatusValueFromLabel(value).split(":");
    const status = valueArray;
    this.fetchData(...this.getFetchDataParams({ status: value }));
  }

  // Page size by option
  getPageSizeByOptions(value) {
    const sort = Url.GetParam("sort") || "";
    const sortDir = Url.GetParam("sortDir") || "";
    const status = Url.GetParam("status") || "";
    const searchTerm = Url.GetParam("search") || "";
    this.setState(
      {
        page: 1,
        pageSize: value,
        pageSizeValue: value,
      },
      () => {
        this.fetchData(true, sort, sortDir, status);
      }
    );
  }

  // Getting the Brand type options
  getBrandTypeOptions = () => {
    // To list the brands in multi select dropdown
    let brandListOptions = [];
    const { brandList } = this.state;
    if (!brandList) return brandListOptions;

    brandList
      .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
      .forEach((type) => {
        brandListOptions.push({ value: type.id, label: type.name });
      });
    return brandListOptions;
  };

  // Getting the active categories details in the multi select dropdowns.
  getCategoryDetail = async () => {
    try {
      const response = await apiClient.get(`${endpoints().categoryAPI}/search`);
      const data = response && response.data && response.data.data;
      if (data && data.length > 0) {
        const categories = [];

        data.forEach((category) => {
          if (category.status !== tabConstant.CategoryStatus.INACTIVE)
            categories.push({
              id: category.id,
              name: category.name,
            });
        });
        this.setState({ categoryList: categories });
      }
    } catch (error) {}
  };

  // Getting the active brands details in the multi select dropdowns.
  getBrandDetail = async () => {
    try {
      const response = await apiClient.get(`${endpoints().brandAPI}/search`);
      const data = response && response.data && response.data.data;

      if (data && data.length > 0) {
        const brands = [];
        data.forEach((brand) => {
          if (brand.status !== tabConstant.BrandStatus.INACTIVE)
            brands.push({
              id: brand.id,
              name: brand.name,
            });
        });
        this.setState({ brandList: brands });
      }
    } catch (error) {}
  };
  // Getting the category type options
  getCategoryTypeOptions = () => {
    // To list the categories in multi select dropdown
    let categoryListOptions = [];
    let { categoryList } = this.state;

    if (!categoryList) return categoryListOptions;

    categoryList
      .sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
      .forEach((type) => {
        categoryListOptions.push({ value: type.id, label: type.name });
      });
    return categoryListOptions;
  };
  storeList = async () => {
    StoreService.list((list) => {
      this.setState({ storeData: list });
    });
  };

  getSalesExecutiveList = async () => {
    const roleData = await getUserRole();
    this.setState({ salesExecutiveOption: roleData });
  };

  paymentType = [
    {
      label: Order.PAYMENT_CASH_TEXT,
      value: Order.PAYMENT_CASH_VALUE,
    },
    {
      label: Order.PAYMENT_UPI_TEXT,
      value: Order.PAYMENT_UPI_VALUE,
    },
    {
      label: Order.PAYMENT_MIXED_TEXT,
     value: Order.PAYMENT_MIXED_VALUE,
    },
  ];

  getSprintList = async () => {
    const response = await SprintService.getSprintList();
    this.setState({ sprintOption: response });
  };
  getBankList = async () => {
    await PaymentAccountService.getList((response, err) => {
      const bankDetails = response?.data?.data;
      let bankList = [];
      bankDetails.forEach((bank) => {
        bankList.push({
          label: bank.payment_account_name,
          value: bank.id,
        });
      });
      this.setState({ bankOption: bankList });
    });
  };

  getTagList = async () => {
    let tagList = [];
    const response = await apiClient.get(
      `${endpoints().tagApi}/search?status=${tabConstant.Status.ACTIVE}`
    );
    const productTag = response.data.data;
    if (ArrayList.isNotEmpty(productTag)) {
      productTag.forEach((productTag) => {
        tagList.push({
          id: productTag.id,
          value: productTag.id,
          label: productTag.name,
        });
      });
    }
    this.setState({ tagOption: tagList });
  };

  getTransferTypeReason = async () => {
    const data = await TranferTypeReasonService.search();
    let list = [];
    if (data && data.length > 0) {
      data.forEach((values) => {
        list.push({
          value: values && values.id,
          label: values && values.name,
        });
      });
    }
    this.setState({ reasonOption: list });
  };

  render() {
    const {
      table,
      id,
      children: columns,
      showHeader = true,
      onRowClick,
      bulkSelect,
      headerButton,
      searchPlaceholder,
      showSearch,
      sortByDropdown,
      refreshButton,
      newTableHeading,
      transformData,
      disableColumnSort,
      sortByOptions,
      icon,
      message,
      subtextMessage,
      noPagination,
      searchBarWidth,
      hideMarginBottom,
      showNoRecord = true,
      noRecordFoundHeight,
      noRecordFoundComponent,
      dropdownLabel,
      showStatusOptions,
      statusOptions,
      showPageSize = true,
      buttonClassName,
      buttonOnClick,
      buttonLabel,
      showButton,
      setPage,
      showScroll,
      disableHeader,
      showSchedulerJobList,
      showAccountFilter,
      ActionMenu,
      dataList,
    } = this.props;

    const listDetails = table[id];
    const isLoading = !listDetails || listDetails.isFetching;
    const { selectedAll, selectedIds, vendorData, statusList, gstStatusList } =
    this.state;

    let data = [];
    let totalCount = 0;
    let currentPage = "";
    let pageSize = "";
    let startPage = "";
    let endPage = "";
    let totalAmount = 0;
    let totalHours = 0;
    let totalCash = 0;
    let totalUpi = 0;
    let totalDiscrepancyCash = 0;
    let totalDiscrepancyUpi = 0;
    let totalDiscrepancyAmount = 0;
    let cashInStore = 0;
    let totalReceivedAmount = 0;
    let totalCalculatedAmount = 0;
    let receivedUpi = 0;
    let receivedCash = 0;
    let calculatedUpi = 0;
    let calculatedCash = 0;
    let totalNetAmount = 0;
    let totalDiscountAmount = 0;
    let totalTaxAmount = 0;
    if (listDetails) {
      setPage && setPage(listDetails.currentPage);
      currentPage = listDetails.currentPage;
      totalCount = listDetails.totalCount;
      pageSize = listDetails.pageSize;
      data = listDetails[currentPage] || [];
      totalAmount = listDetails.totalAmount;
      totalHours = listDetails.totalHours;
      totalCash = listDetails.totalCash;
      totalUpi = listDetails.totalUpi;
      cashInStore = listDetails.cashInStore;
      totalReceivedAmount = listDetails.totalReceivedAmount;
      totalCalculatedAmount = listDetails.totalCalculatedAmount;
      receivedUpi = listDetails.receivedUpi;
      receivedCash = listDetails.receivedCash;
      calculatedUpi = listDetails.calculatedUpi;
      calculatedCash = listDetails.calculatedCash;
      (totalDiscrepancyCash = listDetails.totalDiscrepancyCash),
        (totalDiscrepancyUpi = listDetails.totalDiscrepancyUpi);
      totalDiscrepancyAmount = listDetails.totalDiscrepancyAmount;
      totalTaxAmount = listDetails.totalTaxAmount;
      totalNetAmount = listDetails.totalNetAmount;
      totalDiscountAmount = listDetails.totalDiscountAmount;

      startPage = (currentPage - 1) * pageSize + 1;
      startPage = startPage > totalCount ? totalCount : startPage;

      endPage = currentPage * pageSize;
      endPage = endPage > totalCount ? totalCount : endPage;
    }

    const columnLength = columns.length + (bulkSelect ? 1 : 0);

    if (transformData) {
      data = transformData(data);
    }
    if (showSchedulerJobList) {
      if (
        this.props.schedulerJobList &&
        this.props.schedulerJobList.length > 0
      ) {
        data = this.props.schedulerJobList;
      }
    }

    if (this.props.customTagList) {
      if (this.props.customTagList && this.props.customTagList.length > 0) {
        data = this.props.customTagList;
      }
    }

    if (dataList) {
      data = dataList;
    }
    let statusValue;
    if(this.state && (typeof this.state.selectedStatus === 'string'  || Array.isArray(this.state.selectedStatus))){
      let arrayValue = this.state.selectedStatus && Array.isArray(this.state.selectedStatus) ? this.state.selectedStatus : this.state.selectedStatus.split(",");
      let value =[]
      for (let i = 0; i < arrayValue.length; i++) {
        const id = arrayValue[i];
        let multiSelect = statusList.find((data)=> data.value == id);
        value.push(multiSelect)
      }
      statusValue=value
    }else{
      statusValue=  statusList.find((data)=> data.value == this.state.selectedStatus)
    }

    return (
      <div className={`redux-table ${this.props.className}`}>
        <div>
          {/* SearchBar and Filter Component */}
          <Filter
            showHeader={showHeader}
            disableHeader={disableHeader}
            newTableHeading={newTableHeading}
            showSearch={showSearch}
            //pageSize props
            showPageSize={showPageSize}
            getPageSizeByOptions={(e) => this.getPageSizeByOptions(e)}
            //page search props
            searchBarWidth={searchBarWidth}
            pageSearchValue={this.state.value}
            searchPlaceholder={searchPlaceholder}
            pageSearchOnChange={this.onChange.bind(this)}
            onKeyUp={(e) => this.onSearchKeyUp(e)}
            onSearchClick={this.onSearchClick.bind(this)}
            sortByDropdown={sortByDropdown}
            dropdownLabel={dropdownLabel}
            getSelectedSortLabel={this.getSelectedSortLabel()}
            sortByOptions={sortByOptions}
            handleSortByChange={this.handleSortByChange}
            //refresh button
            refreshButton={refreshButton}
            refreshButtonOnClick={this.refreshButtonOnClick}
            refreshValue={this.state.refreshValue}
            spinning={this.state.spinning}
            showButton={showButton}
            buttonLabel={buttonLabel}
            buttonOnClick={buttonOnClick}
            buttonClassName={buttonClassName}
            // Filters
            initialValues={{
              vendor:
                (vendorData &&
                  vendorData.find(
                    (data) => data.value == Url.GetParam("account")
                  )) ||
                "",
              brand:
                this.state &&
                this.state.brandOption.find(
                  (data) => data.value == Url.GetParam("brand")
                ),
              category:
                this.props && this.props.customCategoryOption
                  ? this.props.customCategoryOption.find(
                      (data) => data.value == Url.GetParam("category")
                    )
                  : this.state &&
                    this.state.categoryOption.find(
                      (data) => data.value == Url.GetParam("category")
                    ),
              location:
                this.state &&
                this.state.storeData.find(
                  (data) => data.value == Url.GetParam("location")
                ),
              startDate:
                DateTime.getDateTimeByUserProfileTimezone(
                  Url.GetParam("startDate")
                ) || "",
              endDate:
                DateTime.getDateTimeByUserProfileTimezone(
                  Url.GetParam("endDate")
                ) || "",
              status:statusValue,
              gstStatus:
                gstStatusList &&
                gstStatusList.find(
                  (data) => data.value == Url.GetParam("gstStatus")
                ),
              salesExecutive:
                this.state &&
                this.state.salesExecutiveOption.find(
                  (data) => data.value == Url.GetParam("salesExecutive")
                ),
              shift:
                this.state &&
                this.state.shiftData.find(
                  (data) => data.value == Url.GetParam("shift")
                ),
              fromLocation:
                this.state &&
                this.state.storeData.find(
                  (data) => data.value == Url.GetParam("fromLocation")
                ),
              toLocation:
                this.state &&
                this.state.storeData.find(
                  (data) => data.value == Url.GetParam("toLocation")
                ),
              type:
                this.props && this.props.customTypeOption
                  ? this.props.customTypeOption.find(
                      (data) => data.value == Url.GetParam("type")
                    )
                  : this.state &&
                    this.state.transferTypeList.find(
                      (data) => data.value == Url.GetParam("type")
                    ),
                    stockEntryProductType: this.props && this.props.stockProductTypeOption
                    ? this.props.stockProductTypeOption.find(
                        (data) => data.value == Url.GetParam("stockEntryProductType")
                      )
                    : null,
                     
              user:
                this.state &&
                this.state.userOption.find(
                  (data) => data?.id == Url.GetParam("user")
                ),
              reporter:
                this.state &&
                this.state.userOption.find(
                  (data) => data?.id == Url.GetParam("reporter")
                ),
              sprint:
                this.state &&
                this.state.sprintOption.find(
                  (data) => data?.value == Url.GetParam("sprint")
                ),
              objectName:
                ObjectName &&
                ObjectName.Options.find(
                  (data) => data.value === Url.GetParam("objectName")
                ),
              productTag:
                this.props && this.props.customTagOption
                  ? this.props.customTagOption.find(
                      (data) => data.value == Url.GetParam("productTag")
                    )
                  : this.state.tagOption.find(
                      (data) => data.value == Url.GetParam("productTag")
                    ),
              manufacture: this.state.tagOption.find(
                (data) => data.value == Url.GetParam("manufacture")
              ),
              paymentAccount: this.state.bankOption.find(
                (data) => data.value == Url.GetParam("paymentAccount")
              ),
              reason:
                this.state &&
                this.state.reasonOption.find(
                  (data) => data.value == Url.GetParam("reason")
                ),
              product:
                this.state &&
                this.state.productOption.find(
                  (data) => data.id == Url.GetParam("product")
                ),
              stockType:
                ActionMenu &&
                ActionMenu.find((data) => data.value == this.state.stockType),
              status_group:
                groupOption &&
                groupOption.find(
                  (data) => data.value == this.state.statusGroup
                ),
              paymentType: this.paymentType.find(
                (data) => data.value == Url.GetParam("paymentType")
              ),
            }}
            // Date Filter
            showDateFilter={this.props.showDateFilter}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            //Brand Filter
            showBrandFilter={this.props.showBrandFilter}
            handleBrandChange={this.handleBrandChange}
            brandOption={(x) => this.setState({ brandOption: x })}
            //Category Filter
            showCategoryFilter={this.props.showCategoryFilter}
            handleCategoryChange={this.handleCategoryChange}
            categoryList={(x) => this.setState({ categoryOption: x })}
            //Product Filter
            showProductFilter={this.props.showProductFilter}
            handleProductChange={this.handleProductChange}
            productOption={(x) => this.setState({ productOption: x })}
            // Vendor Filter props
            showAccountFilter={showAccountFilter}
            handleVendorChange={this.handleVendorChange}
            vendorList={(x) => this.setState({ vendorData: x })}
            //Location Filter Props
            showStoreFilter={this.props.showStoreFilter}
            showStockEntryProductTypeFilter={this.props.showStockEntryProductTypeFilter}
            handleStockEntryProductTypeChange={this.handleStockEntryProductTypeChange}
            stockProductTypeOption={this.props.stockProductTypeOption}
            handleStoreChange={this.handleStoreChange}
            StoreList={(e) => this.setState({ storeData: e })}
            //Status Filter props
            showStatusFilter={this.props.showStatusFilter}
            customStatusOption={this.props.customStatusOption}
            onStatusChange={this. onStatusChange}
            statusOption={(x) => this.setState({ statusList: x })}
            objectName={this?.props?.params?.objectName}
            isMultiSelect={this.props.isMultiSelect}
            showGstStatusFilter={this.props.showGstStatusFilter}
            onGstStatusChange={this.onGstStatusChange}
            gstStatusOption={(x) => this.setState({ gstStatusList: x })}
            showSalesExecutiveFilter={this.props.showSalesExecutiveFilter}
            salesExecutiveOption={this.state.salesExecutiveOption}
            handleSalesExecutiveChange={this.handleSalesExecutiveChange}
            // Shift Filter
            showShiftFilter={this.props.showShiftFilter}
            shiftOption={(x) => this.setState({ shiftData: x })}
            handleShiftChange={this.handleShiftChange}
            //Payment Filter
            showPaymentTypeFilter={this.props.showPaymentTypeFilter}
            paymentType={this.paymentType}
            handlePaymentTypeChange={this.handlePaymentTypeChange}
            //Type Filter
            showTypeFilter={this.props.showTypeFilter}
            handleTypeChange={this.handleTypeChange}
            typeOption={(x) => this.setState({ transferTypeList: x })}
            customTypeOption={this.props.customTypeOption}
            typeIsclearable={this.props.typeIsclearable}
            // FromToStore Props
            showFromToLocationFilter={this.props.showFromToLocationFilter}
            storeData={this.state.storeData}
            handleToStoreChange={this.handleToStoreChange}
            handleFromStoreChange={this.handleFromStoreChange}
            // Payment Account props
            showPaymentAccountFilter={this.props.showPaymentAccountFilter}
            bankOption={this.state.bankOption}
            handlePaymentAccountChange={this.handlePaymentAccountChange}
            // User Filter Props
            showUserFilter={this.props.showUserFilter}
            handleUserChange={this.handleUserChange}
            userList={(x) => this.setState({ userOption: x })}
            params={this.props.userType}
            assigneePlaceholder={this.props.assigneePlaceholder}
            showReporterFilter={this.props.showReporterFilter}
            handleReporterChange={this.handleReporterChange}
            reporterList={(x) => this.setState({ userOption: x })}
            // ObjectName Filter
            ShowObjectNameFilter={this.props.ShowObjectNameFilter}
            objectNameOptions={ObjectName.Options}
            handleObjectNameChange={this.handleObjectNameChange}
            showSprintFilter={this.props.showSprintFilter}
            sprintOptions={this.state.sprintOption}
            handleSprintChange={this.handleSprintChange}
            //ProductTag Filter
            showTagFilter={this.props.showTagFilter}
            customTagOption={this.props.customTagOption}
            handleTagChange={this.handleTagChange}
            TagList={(x) => this.setState({ tagOption: x })}
            tagParams={this.props.tagFilterType}
            tagPlaceholder={this.props.tagPlaceholder}
            showManufactureFilter={this.props.showManufactureFilter}
            handleManufactureChange2={this.handleManufactureChange}
            //Status Filter
            showStatusOptions={showStatusOptions}
            getSelectedStatusLabel={this.getSelectedStatusLabel()}
            statusOptions={statusOptions}
            handleStatusByChange={this.handleStatusByChange}
            // Reason Filter
            showReasonFilter={this.props.showReasonFilter}
            reasonOption={this.state.reasonOption}
            handleReasonChange={this.handleReasonChange}
            // Stock Filter
            showStockFilter={this.props.showStockFilter}
            ActionMenu={ActionMenu}
            handleStockTypeChange={this.handleStockTypeChange}
            //Status Group Select
            showStatusGroupFilter={this.props.showStatusGroupFilter}
            groupSelectOnChange={this.handleGroupChange}
          />

          <div className={showScroll ? "scroll" : ""}>
            <Table
              hover
              responsive
              className={`table-outline,   ${hideMarginBottom ? "mb-0" : ""}`}
            >
              <thead className="thead-light">
                <tr>
                  {bulkSelect && (
                    <th
                      style={{ width: 12, paddingLeft: 8 }}
                      className="align-middle"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAll}
                        onChange={this.toggleSelectAll.bind(this, data)}
                      />
                    </th>
                  )}
                  {React.Children.map(columns, (x) => {
                    // TODO: Santhosh, let"s have the "selected" class applied when you click on the TH for the filterings.
                    return (
                      x &&
                      showHeader && (
                        <th
                          style={{
                            minWidth: x.props.minWidth ? x.props.minWidth : "",
                            maxWidth: x.props.maxWidth ? x.props.maxWidth : "",
                          }}
                          className={`${
                            x.props.sortBy !== ""
                              ? "cursor-pointer text-center"
                              : ""
                          } ${x.props.className}`}
                          onClick={() => {
                            return !disableColumnSort && !x.props.disableOnClick
                              ? this.columnSortBy(x.props.sortBy)
                              : false;
                          }}
                          colSpan={x.props.colspan}
                        >
                          {x.props.children}
                          {!disableColumnSort && !x.props.disableOnClick ? (
                            x.props.sortBy === this.state.sortBy ? (
                              this.state.isActive ? (
                                <ChevronUp />
                              ) : (
                                <ChevronDown />
                              )
                            ) : (
                              <ChevronDown />
                            )
                          ) : (
                            ""
                          )}
                        </th>
                      )
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((list, key) => {
                  return (
                    <tr key={key}>
                      {bulkSelect && (
                        <td
                          style={{ paddingRight: 0 }}
                          className="align-middle"
                        >
                          <input
                            type="checkbox"
                            value={
                              this.props.customCheckBoxId
                                ? list[this.props.customCheckBoxId]
                                : list.id
                            }
                            onChange={this.toggleSelect.bind(this, data)}
                            checked={
                              selectedIds.indexOf(
                                this.props.customCheckBoxId
                                  ? list[this.props.customCheckBoxId]
                                  : list.id
                              ) >= 0
                            }
                          />
                        </td>
                      )}
                      {React.Children.map(columns, (x) => {
                        return (
                          x && (
                            <td
                              className={`align-middle ${x.props.className} ${
                                onRowClick && !x.props.disableOnClick
                                  ? "cursor-pointer"
                                  : ""
                              } ${
                                x.props.type && x.props.type === "link"
                                  ? "text-link text-underline cursor-pointer"
                                  : ""
                              }`}
                              onClick={() =>
                                x.props.isClickable === "true" &&
                                onRowClick &&
                                !x.props.disableOnClick
                                  ? x.props.onLinkClick
                                    ? x.props.onLinkClick(list)
                                    : onRowClick(list)
                                  : null
                              }
                              style={{
                                maxWidth: x.props.width ? x.props.width : "",
                                ...(x.props.field &&
                                  x.props.field.toLowerCase() === "action" && {
                                    width: "90px",
                                  }),
                              }}
                            >
                              {x.props.field !== "action"
                                ? x.props.renderField
                                  ? x.props.renderField(list)
                                  : list[x.props.field]
                                : x.props.element}
                            </td>
                          )
                        );
                      })}
                    </tr>
                  );
                })}
                {isLoading ? (
                  <Spinner />
                ) : !noRecordFoundComponent ? (
                  data.length === 0 && !icon && showNoRecord ? (
                    <tr>
                      <td
                        className="text-center"
                        colSpan={columnLength >= 2 ? columnLength : 2}
                      >
                        <NoRecordsFound
                          middleHeight={noRecordFoundHeight}
                          showMessage={true}
                          hideCard={true}
                          message="No Records Found"
                        />
                      </td>
                    </tr>
                  ) : data.length === 0 && icon ? (
                    <tr>
                      <td
                        className="align-middle"
                        colSpan={columnLength}
                        height="400px"
                      >
                        <div className="d-flex flex-column align-items-center">
                          {icon}
                          <strong>No records found</strong>
                          <span> {message ? message : ""} </span>
                          <span> {subtextMessage ? subtextMessage : ""} </span>
                        </div>
                      </td>
                    </tr>
                  ) : null
                ) : (
                  data.length === 0 && (
                    <tr>
                      <td className="text-center" colSpan={columnLength}>
                        {noRecordFoundComponent}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>

          <div className="bg-white justify-content-left">
            {this.props.totalProductCount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Total Product Count: {totalCount ? totalCount : 0}
                </div>
              </div>
            )}
         
             {this.props.orderCashAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Cash Amount: {Currency.Format(this.props.orderCashAmount ? this.props.orderCashAmount : 0)}
                </div>
              </div>
            )}
             {this.props.orderUpiAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Upi Amount: {Currency.Format(this.props.orderUpiAmount ? this.props.orderUpiAmount : 0)}
                </div>
              </div>
            )}
               {this.props.OrderTotalAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Total Amount: {Currency.Format(this.props.OrderTotalAmount ? this.props.OrderTotalAmount : 0)}
                </div>
              </div>
            )}
             {this.props.totalAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Total Amount: {Currency.Format(totalAmount ?totalAmount : 0)}
                </div>
              </div>
            )}
            {this.props.totalHours && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Total Hours: {totalHours ? totalHours : 0}
                </div>
              </div>
            )}

           
            {this.props.cashInStore && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Total Cash In Location: {Currency.Format(cashInStore)}
                </div>
              </div>
            )}
            {this.props.totalCash && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Reported Cash: {Currency.Format(totalCash)}
                </div>
              </div>
            )}
            {this.props.totalUpi && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Reported Upi: {Currency.Format(totalUpi)}
                </div>
              </div>
            )}
            {this.props.totalCalculatedAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Total Calculated Amount:{" "}
                  {Currency.Format(totalCalculatedAmount)}
                </div>
              </div>
            )}
            {this.props.calculatedCash && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Calculated Cash: {Currency.Format(calculatedCash)}
                </div>
              </div>
            )}
            {this.props.calculatedUpi && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Calculated Upi: {Currency.Format(calculatedUpi)}
                </div>
              </div>
            )}
            {this.props.totalDiscrepancyAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Total Discrepancy: {Currency.Format(totalDiscrepancyAmount)}
                </div>
              </div>
            )}
            {this.props.totalDiscrepancyCash && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Discrepancy Cash: {Currency.Format(totalDiscrepancyCash)}
                </div>
              </div>
            )}
            {this.props.totalDiscrepancyUpi && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Discrepancy Upi: {Currency.Format(totalDiscrepancyUpi)}
                </div>
              </div>
            )}
            {this.props.totalReceivedAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Total Received Amount: {Currency.Format(totalReceivedAmount)}
                </div>
              </div>
            )}
            {this.props.receivedCash && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Received Cash: {Currency.Format(receivedCash)}
                </div>
              </div>
            )}
            {this.props.receivedUpi && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Received Upi: {Currency.Format(receivedUpi)}
                </div>
              </div>
            )}
            {this.props.totalNetAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Total Net Amount:{" "}
                  {Currency.Format(totalNetAmount ? totalNetAmount : 0)}
                </div>
              </div>
            )}
            {this.props.totalDiscountAmount && (
              <div>
                <div className="col-4 d-flex m-2 font-weight-bold">
                  Total Discount Amount:{" "}
                  {Currency.Format(
                    totalDiscountAmount ? totalDiscountAmount : 0
                  )}
                </div>
              </div>
            )}
            {this.props.totalTaxAmount && (
              <div>
                <div className="col d-flex m-2 font-weight-bold">
                  Total Tax Amount:{" "}
                  {Currency.Format(totalTaxAmount ? totalTaxAmount : 0)}
                </div>
              </div>
            )}
          </div>
          {totalCount > 0 && !noPagination && (
            <Row>
              <Col>
                Showing {startPage} to {endPage} of {totalCount} entries
              </Col>

              <Col>
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onPageChange={this.onPageChange.bind(this)}
                />
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    table: state.table,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList, setTablePage }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTable);
