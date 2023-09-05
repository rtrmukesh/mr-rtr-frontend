import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownItem } from "reactstrap";
import { fetchList } from "../actions/table";
import { endpoints } from "../api/endPoints";
import ReduxTable, { ReduxColumn } from "../components/reduxTable";
import Cookie from "../helpers/Cookie";
import ObjectName from "../helpers/ObjectName";
import ArrayList from "../lib/ArrayList";
import DateTime from "../lib/DateTime";
import Cookies from "../lib/Helper";
import Url from "../lib/Url";
import StatusService from "../services/StatusService";
import TicketService from "../services/TicketService";
import Form from "./Form";
import Spinner from "./Spinner";
import StatusText from "./StatusText";
import UserSelect from "./UserSelect";
import MoreDropdown from "./authentication/moreDropdown";
import CompanyUserService from "../services/UserService";
import AddModal from "./Modal";
import DateSelector from "./Date";
import SaveButton from "./SaveButton";
import UserCard from "./UserCard";

const TicketList = (props) => {
  let {
    newTableHeading,
    showDateFilter,
    showSprintFilter,
    showStatusFilter,
    showUserFilter,
    showReporterFilter,
    history,
    array,
    startDate,
    endDate,
    refreshButton,
    showSearch,
    showStatusGroupFilter,
    isMultiSelect
  } = props;
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [trueValue, setTrueValue] = useState(false)
  const [isOpen,setIsOpen]=useState();
  const [row,setRow]=useState();
  const [modalType, setModalType] = useState(null);

  
  let dispatch = useDispatch();

  useEffect(() => {
    getUserList();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);

  };
  const openModal = (type, row) => {
    setModalType(type); // Set the modal type here
    setRow(row);
    toggle();
  };



  useEffect(() => {
    if(trueValue == true){
      getStatusList();
    }
  }, [trueValue]);
  
  const enable_reporter =
    array && ArrayList.getKeyByValue(array, "Reporter") ? true : false;
  const enable_project =
    array && ArrayList.getKeyByValue(array, "Project") ? true : false;
  const enable_sprint =
    array && ArrayList.getKeyByValue(array, "Sprint") ? true : false;
  const enable_createdAt =
    array && ArrayList.getKeyByValue(array, "CreatedAt") ? true : false;

  //   Get Status List
  const getStatusList = async (statusId) => {
    setIsLoading(true);
    const data = await StatusService.nextStatusSearch(
      ObjectName.TICKET,
      statusId,
      Url.GetParam("projectId")
    );
    if (data && data.length > 0) {
      setList(data);
    }
    setIsLoading(false);
  };

  const getUserList = async () => {
    if (userList && ArrayList.isEmpty(userList)) {
      let userLists = await CompanyUserService.getOption();
      setUserList(userLists);
    }
  }

  const handleStatusChange = async (id, statusId) => {
    dispatch(
      await TicketService.updateStatus(
        id,
        {
          status: statusId,
        },
        dispatch,
        (res) => {
          if (res) {
            setList("");
            getStatusList();
          }
        }
      )
    );
  };

  const sortByOption = [
    {
      value: "ticket_id:DESC",
      label: "Most Recent",
    },
    {
      value: "name:ASC",
      label: "Name",
    },
   
  ];
  const handleUserChange = async (value) => {
    
    let data = {
      assignee: value && value?.assignee?.id ?value?.assignee?.id:"" ,
    };

    dispatch(
      await TicketService.update(
        row && row?.id,
        data,
        {},
        (res) => {
          if (res) {
            dispatch(
              fetchList("ticket", `${endpoints().ticketAPI}/search`, 1, 25, {
                startDate: props.startDateFilter,
                endDate: props.endDateFilter,
                projectId: Url.GetParam("projectId")
                  ? Url.GetParam("projectId")
                  : Cookies.get(Cookie.PROJECT_ID),
                reporter: Url.GetParam("reporter"),
                status: Url.GetParam("status"),
                user: Url.GetParam("user"),
                sprint: Url.GetParam("sprint")
              })
            );
            toggle();
          }
        }
      )
    );
  };

  if (isLoading) {
    <Spinner />;
  }
  const modalBody = (
    modalType === 'eta' ? (
      <div className="row">
        <div className="col-12">
          <DateSelector name="eta" label={"ETA"} placeholder="Select ETA" isClearable />
        </div>
      </div>
    ) : (
      <UserSelect
      name="assignee"
      width="100%" />)
  );


  const modalFooter = (
    <>
      <SaveButton type="submit" label="Save" />
    </>
  );

  const handleEtaChange = async (values) => {

    let data = {
      eta: values && values?.eta,
      
    };

    dispatch(
      await TicketService.update(
        row && row?.id,
        data,
        {},
        (res) => {
          if (res) {
            dispatch(
              fetchList("ticket", `${endpoints().ticketAPI}/search`, 1, 25, {
                startDate: props.startDateFilter,
                endDate: props.endDateFilter,
                projectId: Url.GetParam("projectId")
                  ? Url.GetParam("projectId")
                  : Cookies.get(Cookie.PROJECT_ID),
                reporter: Url.GetParam("reporter"),
                status: Url.GetParam("status"),
                user: Url.GetParam("user"),
                sprint: Url.GetParam("sprint")
              })
            );
            toggle();
          }
        }
      )
    );
  };

  const initialValues = {


    
  }
  return (

    <><AddModal
      modalTitle={modalType === 'eta' ? 'Change ETA' : 'Change Assignee'}
      modalBody={modalBody}
      isOpen={isOpen}
      initialValues={
        modalType === 'eta'
        ? {
            eta: DateTime.getDateTimeByUserProfileTimezone(row?.eta) || "",
          }
        : {
          assignee: row?.assignee_id ? {
            label:row?.assignee_name,
            value: row?.assignee_id
          } : ""
          } 
      }

      toggle={toggle}
      modalFooter={modalFooter}
      toggleModalClose={toggle}
      hideDefaultButtons
      onSubmit={(values) => {
        if (modalType === 'eta') {
        handleEtaChange(values);
        }
        else{
          handleUserChange(values);
        }
      } } />

      
      
      
      
      <div className="mt-4">
        <ReduxTable
          newTableHeading={newTableHeading}
          showSearch={showSearch}
          searchPlaceholder="Search"
          id="ticket"
          apiURL={`${endpoints().ticketAPI}/search`}
          paramsToUrl={true}
          showStatusFilter={showStatusFilter}
          sortByOptions={sortByOption}
          showUserFilter={showUserFilter}
          showReporterFilter={showReporterFilter}
          showSprintFilter={showSprintFilter}
          refreshButton={refreshButton}
          showDateFilter={showDateFilter}
          isMultiSelect={isMultiSelect}
          showStatusGroupFilter={showStatusGroupFilter}
          assigneePlaceholder="Select Assignee"
          projectId ={Url.GetParam("projectId") ? Url.GetParam("projectId") : Cookies.get(Cookie.PROJECT_ID)}
          history={history}
          params={{
            startDate: startDate,
            endDate: endDate,
            objectName: ObjectName.TICKET,
            projectId: Url.GetParam("projectId") ? Url.GetParam("projectId") : Cookies.get(Cookie.PROJECT_ID)
          }}
          message="You can start by clicking on Add New"
          icon={<FontAwesomeIcon icon={faTasks} />}
        >
          <ReduxColumn
            className="text-center text-decoration-none"
            field="id"
            sortBy="id"
            isClickable="true"
            type="link"
            renderField={(row) => (
              <Link to={`/ticket/${row.slug}/${row.id}`}>
                {row.ticket_number}
              </Link>
            )}
          >
            Ticket#
          </ReduxColumn>
          <ReduxColumn
            className="text-wrap text-decoration-none"
            field="summary"
            sortBy="summary"
            isClickable="true"
            width="250px"
            minWidth="250px"
            maxWidth="250px"
          >
            Summary
          </ReduxColumn>
          <ReduxColumn
            className="text-center display-flex"
            field="assignee_name"
            sortBy="name"
            width="150px"
            minWidth="250px"
            maxWidth="250px"
            renderField={(row) => (
              <UserCard
              customSize={parseInt(40, 10)}
              firstName={row?.firstName}
              url={row?.avatarUrl}
              lastName={row?.lastName}
            />
            )}
          >
            Assignee
          </ReduxColumn>
         <ReduxColumn
         field="ticketType"
          sortBy="ticketType"
         >
          Type
         </ReduxColumn>
          <ReduxColumn
            field="statusName"
            sortBy="status"
            width="150px"
            className="text-center"
            renderField={(row) => (
              <StatusText
                backgroundColor={row.statusColor}
                status={row.statusName} />
            )}
          >
            Status
          </ReduxColumn>
          <ReduxColumn
            field="eta"
            sortBy="eta"
            width="100px"
            className="text-center"
            renderField={(row) => <span>{DateTime.getDateByUserProfileTimeZoneFrontEndFormat(row.eta)}</span>}
          >
            ETA
          </ReduxColumn>
          {enable_reporter && enable_reporter == true && (
            <ReduxColumn
              className="text-left"
              minWidth="130px"
              field="reporter"
              sortBy="reporter"
            >
              Reporter
            </ReduxColumn>
          )}

          {enable_project && enable_project == true && (
            <ReduxColumn
              className="text-left"
              minWidth="130px"
              field="project"
              sortBy="project"
            >
              Project
            </ReduxColumn>
          )}
          {enable_sprint && enable_sprint == true && (
            <ReduxColumn
              className="text-left"
              minWidth="130px"
              field="sprint"
              sortBy="sprint"
            >
              Sprint
            </ReduxColumn>
          )}

          {enable_createdAt && enable_createdAt == true && (
            <ReduxColumn
              field="createdAt"
              sortBy="createdAt"
              className="text-center"
              width="150px"
              renderField={(row) => (
                <span>{DateTime.getDateTimeByUserProfileTimezone(row.createdAt)}</span>
              )}
            >
              Created At
            </ReduxColumn>
          )}
          <ReduxColumn
              field="story_points"
              sortBy="story_points"
              className="text-center"
              width="150px"
            >
              Story Points
            </ReduxColumn>
          <ReduxColumn
            field="Action"
            width="90px"
            disableOnClick
            renderField={(row) => (
              <div className="text-center action-group-dropdown">
                <MoreDropdown
                  onClick={(e) => {
                    getStatusList(row && row?.statusId);
                    setTrueValue(true);
                  } }
                >
                  {list &&
                    list.map((value) => (
                      <DropdownItem
                        onClick={async () => {
                          handleStatusChange(row?.id, value && value?.value);
                        } }
                      >
                        {value?.label}
                      </DropdownItem>
                    ))}
                  <DropdownItem
                    onClick={async () => {
                      openModal('eta', row); 
                    } }
                  >
                    Change Eta
                  </DropdownItem>
                  <DropdownItem
                    onClick={async () => {
                      openModal('assignee', row); 
                    } }
                  >
                   Change Assignee 
                  </DropdownItem>
                </MoreDropdown>
              </div>
            )}
          >
            Actions
          </ReduxColumn>
        </ReduxTable>
      </div></>
  );
};
export default TicketList;
