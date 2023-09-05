import { EditorState, convertToRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Media from "../helpers/Media";
import ObjectName from "../helpers/ObjectName";
import DateTime from "../lib/DateTime";
import Url from "../lib/Url";
import MediaService from "../services/MediaService";
import TicketService from "../services/TicketService";
import DateSelector from "./Date";
import DraftEditor from "./Draft";
import MediaCarousel from "./MediaCarousel";
import SaveButton from "./SaveButton";
import Text from "./Text";
import UserSelect from "./UserSelect";
import ProjectSelect from "./projectSelect";
import Drawer from "./Drawer";
import TicketType from "./TicketType";
import Select from "./Select";
import StoryPointSelect from "./StoryPointSelect";

const CreateTicketModel = ({ buttonLabel, showButton }) => {
  const [projectValue, setProjectValue] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [assignee, setAssignee] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [imageurl, setImageUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  const [ticketType,setTicketType]=useState()
  const [storyPoints,setStoryPoints]=useState();
  useEffect(() => {
    if (selectedFile) {
      getUrl();
    }
  }, [isLoading, selectedFile]);

  const getUrl = () => {
    let url = []; 
    for (let i = 0; i < selectedFile.length; i++) {
      const file = selectedFile[i];
      const imageUrl = URL.createObjectURL(file && file[0]);
      url.push({ url: imageUrl, image_id: file.id });
    }
    setImageUrl(url);
  };

  const handleImageRemove = (deletedvalue) => {
    setIsLoading(true);
    const updatedImageUrlArray = selectedFile.filter(
      (item) => item.id !== deletedvalue.image_id
    );
    setSelectedFile(updatedImageUrlArray);
    setIsLoading(false);
  };
  const handleOpenModal = () => {
    setEditorState("");
    setSummaryValue("");
    setProjectValue("");
    setAssignee("");
    setSelectedFile("");
    setImageUrl("");
    setTicketType("")
    setStoryPoints("")
    setModalOpen(!isModalOpen);
    setIsSubmit(true);
  };

  const handleCloseModal = () => {
    setEditorState("");
    setSummaryValue("");
    setProjectValue("");
    setAssignee("");
    setSelectedFile("");
    setImageUrl("");
    setModalOpen(false);
    setIsSubmit(true);
    setTicketType("")
  };

  const dispatch = useDispatch();
  const initialValues = {
    summary: summaryValue ? summaryValue : "",
    description: "",
    ticketType:ticketType?ticketType:"",
    eta: DateTime.getDateTimeByUserProfileTimezone(new Date()) || "",
    projectName: projectValue
      ? {
          label: projectValue?.label,
          value: projectValue?.value
        }
      : projectList?.find(
          (projectValue) => Url.GetParam("projectId") == projectValue?.value
        ),
        assignee_id: assignee
        ? {
            label: assignee?.label,
            value: assignee?.id
          }
        : ticketType?.assigneeId
        ? {
            label: ticketType?.assigneeName,
            value: ticketType?.assigneeId
          }
        : "", 
        story_points:storyPoints?{
         label:storyPoints.label,
         value:storyPoints.value,
        }:""
  };

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };
  const summaryChange = (x) => {
    let data = x?.target?.value;
    setSummaryValue(data);
  };
  const handleUserChange = (values) => {
    setAssignee(values);
  };

  const oninputProjectChange = (value) => {
    setProjectValue(value);
  };

  const uploadFile = async (objectId, showToastMessage = false) => {
    try {
      if (selectedFile && selectedFile.length > 0 && objectId) {
        for (let i = 0; i < selectedFile.length; i++) {
          const File = selectedFile[i];
          const mediaFile = File ? File[0] : "";
          const media = File[0]?.name;

          const data = new FormData();

          if (mediaFile) {
            data.append([Media.MEDIA_FILE], mediaFile ? mediaFile : "");
          }
          if (media !== undefined) {
            data.append([Media.MEDIA_NAME], media ? media : "");
          }
          data.append("object", ObjectName.TICKET);

          data.append("object_id", objectId);

          data.append([Media.MEDIA_VISIBILITY], Media.VISIBILITY_PUBLIC);

          await MediaService.saveImage(data, showToastMessage);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createTicket = (data, id) => {
    try {
      setIsSubmit(true);
      data.projectId = projectValue ? projectValue : Url.GetParam("projectId");
      let rawComment;
      if (editorState) {
        rawComment = convertToRaw(editorState.getCurrentContent());
      }
      data.description = JSON.stringify(rawComment);
      if (data.etaTime) {
        const [date, time] = data.etaTime.split("T");

        const concatenatedDateTime = `${DateTime.formatDate(
          data.eta
        )}${""}T${""}${time}`;
        data.eta = concatenatedDateTime;
      }

      dispatch(
        TicketService.createTicket(
          data,
          {
            projectId: Url.GetParam("projectId"),
            startDate: Url.GetParam("startDate"),
            endDate: Url.GetParam("endDate"),
            sort: Url.GetParam("sort"),
            sortDir: Url.GetParam("sortDir")
          },
          (response) => {
            if (response && response.data && response.data.ticketDetails) {
              uploadFile(response?.data?.ticketDetails?.id);
              setIsSubmit(true);
            } else {
              setIsSubmit(false);
            }
            handleCloseModal();
          }
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmit(false);
    }
  };

  const handleImageValue = (images) => {
    setIsLoading(true);
    setSelectedFile((prevFileList) => [...prevFileList, { ...images }]);
    setIsLoading(false);
  };

  const onDropImage = (images) => {
    handleImageValue({
      ...images,
      id: selectedFile.length + 1
    });
  };


  const handleTicketTypeChange=(e)=>{
    setTicketType(e.values.ticketType)
  }

  const handleChange=({values})=>{
    setStoryPoints(values && values?.story_points)
  }
  // Add Ticket Form
  const DrawerBody = (
    <>
      <div className="row">
        <div className="col-12">
          <ProjectSelect
            label="Project"
            oninputProjectChange={oninputProjectChange}
            projectList={setProjectList}
          />
        </div>
        <div className="col-12">
          <TicketType
          handleTicketTypeChange={handleTicketTypeChange}
          projectValue={projectValue}

          />
        </div>
        <div className="col-12">
          <UserSelect
            label="Assignee"
            name="assignee_id"
            placeholder={"Select Assignee"}
            handleUserChange={handleUserChange}
          />
        </div>
        <div className="d-flex col-12 p-0">
        <div className="col-6 pr-1">
          <DateSelector
            name="eta"
            label={"ETA"}
            placeholder="Select ETA"
            isClearable
          />
        </div>
        <div className="col-6 pl-1">
          <StoryPointSelect
          name="story_points"
          label="Story Points"
          placeholder="Select Story Points"
          onChange={(values)=>{
            handleChange(values)
          }}
          />
        </div></div>



        <div className="col-12">
          <Text
            name="summary"
            label="Summary"
            placeholder="Summary"
            onChange={summaryChange}
            required
          />
        </div>
        <div className="col-12">
          <div className="custom-description-container">
            <DraftEditor
              name="description"
              label={"Description"}
              editorState={editorState}
              onChange={handleEditorChange}
            />
          </div>
        </div>
        <div className="col-12">
          <MediaCarousel
            showCarasoul
            Attachments
            onDropImage={onDropImage}
            imageUrl={imageurl}
            handleImageRemove={handleImageRemove}
          />
        </div>
      </div>
    </>
  );

  // Ticket Footer
  const DrawerFooter = (
    <>
      <SaveButton type="submit" loading={isSubmit == false} label="Create" />
    </>
  );
  return (
    <>
      <Drawer
        DrawerBody={DrawerBody}
        DrawerFooter={DrawerFooter}
        onSubmit={(values) => {
          createTicket(values);
        }}
        initialValues={initialValues}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleOpenModal}
        handleDrawerClose={handleOpenModal}
        isModalOpen={isModalOpen}
        buttonLabel={buttonLabel}
        // showButton={showButton}
        showAddButton
        enableReinitialize
      />
    </>
  );
};
export default CreateTicketModel;
