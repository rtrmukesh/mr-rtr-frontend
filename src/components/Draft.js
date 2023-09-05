import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function DraftEditor(props) {
  let {
    onChange,
    editorState,
    showEditButton,
    onBlur,
    mentionList = [],
    readOnly,
    placeholder,
    hideOutLine,
  } = props;
  const [editable, setEditable] = useState(false);

  return (
    <>
      {props?.label && <h6>{props?.label}</h6>}
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName={!hideOutLine ? "wrapperClassName" : ""}
        toolbarHidden={!editable}
        editorClassName="editorClassName"
        onEditorStateChange={onChange}
        editorStyle={{
          border: !hideOutLine ? "1px solid #ccc" : "",
          minHeight: "300px",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          borderRadius: "0px 0px 1px 1px",
          overflowY: "scroll",
          height: "300px",
        }}
        customStyleMap={{
          HIGHLIGHT: {
            backgroundColor: "yellow",
          },
        }}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: mentionList,
        }}
        onFocus={() => {
          setEditable(true);
        }}
        readOnly={readOnly}
        placeholder={placeholder}
      />
      {showEditButton && (
        <div className="section-title inline-edit-section">
          <div
            className={`test-suite-page-edit ${
              editable ? "d-block float-right" : "d-none"
            }`}
          >
            <i className="fas fa-check mr-2" onClick={onBlur}></i>
            <i
              className="fas fa-times"
              onClick={() => {
                setEditable(false);
              }}
            ></i>
          </div>
        </div>
      )}
    </>
  );
}

export default DraftEditor;
