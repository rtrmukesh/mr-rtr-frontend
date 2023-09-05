import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";
//  Components
import "../components/reduxTable/styles.scss";

// API
import "../scss/_custom.scss";
import TagService from "../services/TagService";

import { endpoints } from "../api/endPoints";
import { TagsIcon } from "../assets/icons";
import { TAG_STATUS_ACTIVE, TAG_STATUS_INACTIVE } from "../helpers/Product";
import { Tag } from "../helpers/ProductTag";
import { STATUS_INACTIVE_TEXT } from "../helpers/Store";
import { tagOptions } from "../helpers/Tag";
import { isLoggedIn } from "../lib/Helper";
import Url from "../lib/Url";
import BreadCrumb from "./Breadcrumb";
import DeleteModal from "./DeleteModal";
import AddModal from "./Modal";
import PageTitle from "./PageTitle";
import SaveButton from "./SaveButton";
import Select from "./Select";
import Text from "./Text";
import MoreDropdown from "./authentication/moreDropdown";
import ReduxTable, { ReduxColumn } from "./reduxTable";
import Drawers from "./Drawer";
import Drawer from "./Drawer";

const TagDetail = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState(false);
  const {
    history,
    tagType,
    noTagDetail,
    __toggle,
    isModel,
    showTagTypefield,
    pageTitle,
    columnName,
    label
  } = props;

  const [name, setName] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTag, setDeleteTag] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState();
  const [isSubmit, setIsSubmit] = useState(true);
  const dispatch = useDispatch();

  const statusOptions = [
    {
      value: Tag.STATUS_ACTIVE_TEXT,
      label: Tag.STATUS_ACTIVE_TEXT,
    },
    {
      value: Tag.STATUS_INACTIVE_TEXT,
      label: Tag.STATUS_INACTIVE_TEXT,
    },
    {
      value: "",
      label: "All",
    },
  ];
  // Use Effect
  useEffect(() => {
    isLoggedIn();
    TagTypeDetail();
  }, []);
  // get params

  const _toggle = (tagId) => {
    setId(tagId || 0);
    setIsOpen(!isOpen);
    __toggle();
    setIsSubmit(true);

  };
  const toggle = (tab) => {
    setIsOpen(!isOpen);
    setName("");
    setId("");
    setType("");
    __toggle();
    setIsSubmit(true);

  };
  const handleDelete = async (id) => {
    const params = {
      type: tagType,
      status: Url.GetParam("status"),
    };
    dispatch(await TagService.delete(id, params));
  };

  const TagTypeDetail = async () => {
    try {

      //create new array for store list
      const response = await TagService.get(tagType);
      setDetail(() => response.data.data);

    } catch (err) {
      console.log(err);
     }
  };
  /**
   * Create Product
   *
   * @param values
   */
  const addtagForm = async (values) => {
    try{
      setIsSubmit(true)

    const data = new FormData();
    let params = {
      typeId: detail.id,
      pagination: true,
      status: Url.GetParam("status"),
      type: Url.GetParam("type"),
      page: 1,
      pageSize: 25,
      sort:Url.GetParam("sort"),
      sortDir: Url.GetParam("sortDir"),
    };

    if (!id) {
      data.append("name", values.name.trim());
      data.append("type", values?.type?.value ? values?.type?.value : "");
      dispatch(await TagService.create(data, params, toggle));
      setIsSubmit(false);
    } else {
      data.append("name", values.name.trim());
      data.append("type", values.type.value);
      data.append("id", id);
      data.append("status", status);
      dispatch(await TagService.update(id, data, params, toggle));
    }
  }catch(err){
    console.log(err)
  }finally{
      setIsSubmit(false)

    };
  };

  const breadcrumbList = [
    { label: "Home", link: "/admin/dashboard/" },
    {
      label: "Tags",
      link: "/tags",
    },
    {
      label: tagType,
    },
  ];

  const addProductTagForm = (
    <>
      <Text name="name" label={label ? label : "Name"} required={true} />
      {!showTagTypefield && (
        <Select
          fullWidth={true}
          label="Type"
          name="type"
          options={tagOptions}
          required={true}
        />
      )}
    </>
  );
 

  const sortByOption = [
    {
      value: "name:ASC",
      label: "Name",
    },
    {
      value: "createdAt:DESC",
      label: "createdAt",
    },
   
  ];

  const productTagFooter = (
    <SaveButton type="submit" loading={isSubmit == false} label={name ? "Save" : "Add"} />
  );
  return (
    <div>
      <>
        <Drawer
          DrawerBody={addProductTagForm}
          DrawerFooter={productTagFooter}
          modelTitle={name ? `Edit ${label ? label : 'Tag'}` :`Add ${label ? label : 'Tag'}`}
          onSubmit={(values) => {
            addtagForm(values);
          }}
          initialValues={{
            name: name || "",
            type: {
              value: Url.GetParam("type"),
              label: Url.GetParam("type"),
            },
          }}
          handleOpenModal={toggle}
          handleCloseModal={toggle}
          handleDrawerClose={toggle}
          isModalOpen={isModel}
          buttonLabel={name ? "Save" : "Add"}
        />
        <DeleteModal
          isOpen={openDeleteModal}
          toggle={() => {
            setOpenDeleteModal(false);
          }}
          title="Delete Tag Type"
          deleteFunction={() => {
            handleDelete(deleteTag.id);
          }}
          label={deleteTag.name}
          id={deleteTag.id}
        />
        {!noTagDetail && <BreadCrumb list={breadcrumbList} />}
        <div>
          {!props.showPageTitle && (
            <div className="pb-4">
              <PageTitle
                label={
                  props?.match?.params.id
                    ? props?.match?.params.id
                    : pageTitle
                      ? pageTitle
                      : tagType
                }
                buttonLabel="Add New"
                buttonHandler={(_e) => {
                  toggle();
                }}
              />
            </div>
          )}
        </div>
      </>
      <ReduxTable
        id="allTags"
        showHeader
        searchPlaceholder="Search"
        apiURL={`${endpoints().tagApi}/search`}
        newTableHeading
        icon={<TagsIcon />}
        message="You can start by clicking Add New"
        statusOptions={statusOptions}
        sortByOptions={sortByOption}
        showStatusOptions={true}
        params={{ type: tagType }}
        paramsToUrl={true}
        history={history}
        onRowClick={(row) => {
          setName(row.name);
          setType(row.type);
          setStatus(row.status);
          return _toggle(row.id);
        }}
      >
        <ReduxColumn
          field="name"
          type="link"
          sortBy="name"
          width="160px"
          minWidth="160px"
          maxWidth="160px"
          isClickable="true"
        >
          {columnName ? columnName : "Name"}
        </ReduxColumn>
        <ReduxColumn
          field="status"
          sortBy="status"
          width="130px"
          minWidth="130px"
          maxWidth="130px"
          className="column-status"
          renderField={(row) => (
            <div
              className={`status-input ${row.status && row.status === TAG_STATUS_ACTIVE
                ? "bg-success"
                : row.status === TAG_STATUS_INACTIVE
                  ? "bg-secondary"
                  : ""
                }`}
            >
              <p>{row.status}</p>
            </div>
          )}
        >
          Status
        </ReduxColumn>
        <ReduxColumn
          minWidth={"100px"}
          width={"100px"}
          maxWidth={"100px"}
          field="status"
          disableOnClick
          className="action-column"
          renderField={(row) => (
            <div className="text-center landing-group-dropdown">
              <MoreDropdown>
                {row.status !== Tag.STATUS_ACTIVE_TEXT ? (
                  <DropdownItem
                    onClick={async () => {
                      dispatch(
                        await TagService.updateStatus(
                          row.id,
                          Tag.STATUS_ACTIVE_TEXT,
                          tagType
                        )
                      );
                    }}
                  >
                    Make as Active
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onClick={async () => {
                      dispatch(
                        await TagService.updateStatus(
                          row.id,
                          STATUS_INACTIVE_TEXT,
                          tagType
                        )
                      );
                    }}
                  >
                    Make as InActive
                  </DropdownItem>
                )}
                {/* {row.type === TYPE_USER_DEFINED && ( */}
                <DropdownItem
                  className={"text-danger"}
                  onClick={() => {
                    setOpenDeleteModal(true);
                    setDeleteTag(row);
                  }}
                >
                  Delete
                </DropdownItem>
                {/* )} */}
              </MoreDropdown>
            </div>
          )}
        >
          Action
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};
export default TagDetail;
