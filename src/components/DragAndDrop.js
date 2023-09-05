import React from "react";
// Assets
import { EditIconAlt, TrashIcon } from "../assets/icons/index";

const DragAndDrop = (props) => {
  let { column, task, openEditModal, openDeleteModal } = props;
  let { category } = task;
  return (
    column &&
    column.map((col) => (
      <div className="row align-items-center justify-content-start">
        <div className="col-5 d-flex align-items-center">
          <p
            className="pr-3 pt-3 px-2"
            style={{ cursor: "move", width: "55px" }}
          >
            <i class="fa fa-arrows"></i>
          </p>
          <div>
            <span
              className="text-decoration-none"
              style={{ minWidth: "100px" }}
            >
              {col.name}
            </span>
          </div>
        </div>
        <div className="col-5">
          <span className="text-decoration-none" style={{ minWidth: "200px" }}>
            {col.status}
          </span>
        </div>

        {/* icons */}
        <div className="col-2">
          <div className="task-actions px-2">
            <button
              type="button"
              className={["edit-btn", "btn-link", "btn"].join(" ")}
              onClick={() => {
                openEditModal(true);
              }}
            >
              <EditIconAlt />
            </button>
            <button
              type="button"
              className={["delete-btn", "btn-link", "btn"].join(" ")}
              onClick={() => {
                openDeleteModal(true);
              }}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    ))
  );
};

export default DragAndDrop;
