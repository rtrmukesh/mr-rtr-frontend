import React from "react";
import { useEffect } from "react";
import Select from "./Select";
import ProjectService from "../services/ProjectService";
import { useState } from "react";
import Url from "../lib/Url";
import Form from "./Form";

const ProjectSelect = ({ label, onInputChange, projectList,oninputProjectChange }) => {
  const [projectsList, setProjectList] = useState([]);
  const [pojectID, setProjectId] = useState("");
  const [defaultId, setDefaultId] = useState(true);

  useEffect(() => {
    getProjectList();
  }, []);
  const getProjectList = async () => {
    const data = await ProjectService.getProjectList();
    setProjectList(data);
    projectList && projectList(data);

    return data;
  };
  const projectChange = (e) => {
    setDefaultId(false);
    oninputProjectChange(e?.values?.projectName?.value)
    let data = e?.values?.projectName;
    setProjectId(data);
  };

  const projectName =
    projectsList &&
    projectsList.find(
      (projectdata) => Url.GetParam("projectId") == projectdata?.value
    );

    const initialValues={
        projectName:pojectID?projectsList.find(
          (projectData) => projectData.value == pojectID?.value
        )
          : projectsList.find(
              (projectData) => projectData.value == Url.GetParam("projectId")
            ),
    }
  return (
    <div>
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
      >
        
        <Select
          name="projectName"
          options={projectsList}
          onInputChange={onInputChange ? onInputChange : projectChange}
          label={label}
          defaultValue={
            defaultId
              ? {
                  label: projectName && projectName?.label,
                  value: Url.GetParam("projectId"),
                }
              : null
          }
        />
      </Form>
    </div>
  );
};

export default ProjectSelect;
