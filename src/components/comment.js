import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import DraftEditor from "./Draft";
import Link from "./Link";
import AddModal from "./Modal";
import NoRecordsFound from "./NoRecordsFound";
import SaveButton from "./SaveButton";
import UserCard from "./UserCard";
import CommentService from "../services/CommentService";
import Drawer from "./Drawer";
import UserSelect from "../components/UserSelect"

const Comment = (props) => {
  let { objectId, objectName, maxHeight } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [comments, setComments] = useState("");
  const [userId, setUserId] = useState();
  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });
  const [messageId, setMessageId] = useState(null);
  const [name, setName] = useState(null);
  const [isSubmit, setIsSubmit] = useState(true);

  useEffect(() => {
    getComments();
  }, []);

  const Toggle = () => {
    setIsOpen(!isOpen);
    setIsSubmit(true);
  };

  const closeToggle = () => {
    setIsOpen(!isOpen);
    setName("");
    setEditorState("");
    setMessageId(null);
    setIsSubmit(true);
  };

  const getComments = async () => {
    let params = {
      objectId: objectId,
      objectName: objectName,
    };
    const response = await CommentService.search(params);
    if (response && response.data) {
      setComments(response.data.data);
      setUserId(response.data.loggedInUserId);
    }
  };

  const AddMessage = async (values) => {
    try {
      setIsSubmit(true);
      let id = objectId;
      let rawComment;
      if (editorState) {
        rawComment = convertToRaw(editorState.getCurrentContent());
      }
      values.message = JSON.stringify(rawComment);
      values.objectName = objectName;
      if (!messageId) {
        await CommentService.add(id, values, (res) => {
          if (res) {
            setEditorState("");
            setMessageId(null);
            getComments();
            closeToggle();
            setName("");
            setIsSubmit(false);
          }
        });
      } else {
        CommentService.update(id, messageId, values);
        getComments();
        closeToggle();
        setName("");
      }
    } catch (err) {
      console.log(err);
    }finally{
      setIsSubmit(false);
    }
  };

  const handleDelete = async (messageId) => {
    let id = props.objectId;
    let data = {
      commentId: messageId,
      objectName: objectName,
    };
    await CommentService.delete(id, JSON.stringify(data));
    getComments();
  };


  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };


  const modelBody = (
    <>
    <UserSelect
    name="user"
    label="User"
    isMulti
    />
    <DraftEditor
      List={true}
      placeholder={"Enter Message"}
      name="comment"
      editorState={editorState ? editorState : name}
      onChange={handleEditorChange}
    />
    </>
  );

  const modelFooter = (
    <SaveButton
      type="submit"
      label={messageId ? "Edit" : "Save"}
      className="h6-5-important"
      loading={isSubmit == false}
    />
  );

  return (
    <>
      <Drawer
        modelTitle={messageId ? "Edit Comment" : "Add Comment"}
        DrawerBody={modelBody}
        DrawerFooter={modelFooter}
        onSubmit={(values) => {
          AddMessage(values);
        }}
        initialValues={{
          comment: "",
          user: "",
        }}
        handleOpenModal={Toggle}
        handleCloseModal={closeToggle}
        handleDrawerClose={closeToggle}
        isModalOpen={isOpen}
      />

      <DeleteModal
        isOpen={openDeleteModal}
        toggle={() => {
          setOpenDeleteModal(false);
        }}
        title="Delete message Type"
        deleteFunction={() => {
          handleDelete(deleteMessage.id);
        }}
        label={deleteMessage.comment}
        id={deleteMessage.id}
      />
      <div className="d-flex justify-content-end">
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            Toggle();
          }}
          decoration={false}
          text="Add Comment"
        />
      </div>
      <div
        style={{
          maxHeight: maxHeight ? maxHeight : "400px",
          overflowY: "auto",
        }}
      >
        {comments ? (
          comments.length > 0 &&
          comments.map((comment, index) => (
            <div className="card p-2 overFlow-y" key={index}>
              <div>
                <div style={{ flexDirection: "row" }}>
                  <div className="font-weight-bold">
                    <UserCard
                      id="avatar"
                      customSize={parseInt(35, 10)}
                      url={comment?.media_url}
                      firstName={comment?.first_name}
                      lastName={comment?.last_name}
                      timestamp={comment?.timestamp}
                    />
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    fontSize: "12px",
                  }}
                >
                  {comment &&
                    comment?.users.length > 0 &&
                    comment?.users.map((user) => (
                      <div
                        style={{ flexGrow: 0 }}
                        className="font-weight-bold col"
                      >
                        <UserCard
                          id="avatar"
                          customSize={parseInt(20, 10)}
                          url={user?.media_url}
                          firstName={user?.first_name}
                          lastName={user?.last_name}
                          fontSize="12px"
                          minWidth="max-content"
                        />
                      </div>
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                  <div style={{ width: "100%" }}>
                    <DraftEditor
                      List={true}
                      readOnly
                      hideOutLine
                      placeholder={"Enter Message..."}
                      name="comment"
                      editorState={
                        comment?.comment &&
                        EditorState.createWithContent(
                          convertFromRaw(JSON.parse(comment?.comment))
                        )
                      }
                    />
                  </div>
                  {comment?.userId == userId && (
                    <div className="d-flex ">
                      <div
                        className="mx-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setMessageId(comment?.id);
                          setName(
                            comment?.comment &&
                              EditorState.createWithContent(
                                convertFromRaw(JSON.parse(comment?.comment))
                              )
                          );
                          Toggle();
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          size="sm"
                          color="black"
                        />
                      </div>
                      <div
                        className="mx-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setDeleteMessage(comment);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="sm"
                          color="black"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <NoRecordsFound showMessage boldMessage="No comments added yet" />
          </>
        )}
      </div>
    </>
  );
};
export default Comment;
