import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Label from "./Label";

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DragAndDropField(props) {
  let {
    label,
    fontBolded,
    onDrop,
    width,
    height,
    initialValue,
    handleDelete,
    selectedFile,
    errorMessage,
    fileNames,
    required,
  } = props;
  const [previewUrl, setPreviewUrl] = useState(initialValue);
  const fileName = fileNames ? fileNames : initialValue?.split("-").pop();

  useEffect(() => {
    if (selectedFile) {
      if (URL.createObjectURL) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(previewUrl);
      } else {
        setPreviewUrl("");
      }
    }
  }, [selectedFile]);

  const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 2,
    width: width ? width : "430px",
    height: height ? height : "100px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    transition: "border .3s ease-in-out",
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );


  return (
    <>
      <div className="d-flex column">
        <Label
          className={`${fontBolded ? "font-weight-bold" : ""}`}
          required={required ? true : false}
        >
          {label}
        </Label>
        {errorMessage && (
          <small className={`text-danger position-absolute mt-3`}>
            Image is required
          </small>
        )}
      </div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {selectedFile || fileName ? (
          <div  style={{ position: "relative" }}>
            <div  style={{ position: "relative", marginBottom: "10px" }}>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "90px",
                  }}
                />
              )}
            </div>
            {!fileNames && (
              <div className="text-center"  style={{ position: "absolute", top: 0, right: 0 }}>
       
                <span
                  className="ml-2 cursor-pointer"
                  style={{ color: "black" }}
                  onClick={(e) => handleDelete(e)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">Drag and drop your File here.</div>
        )}
      </div>
    </>
  );
}

export default DragAndDropField;
