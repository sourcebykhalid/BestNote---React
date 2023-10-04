/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let backgroundColors = ["#B7F0AD", "#BFCD5E", "#BFD14F", "#D9CB60"];
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  // Add state to control the visibility of the Add Note component
  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);
  const isUserLoggedIn = !!localStorage.getItem("token");
  useEffect(() => {
    if (isUserLoggedIn) {
      getNotes();
    } else {
      navigate("/");
    }
  }, [isUserLoggedIn]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {isUserLoggedIn & !isAddNoteVisible && (
        <i
          className="fa-solid fa-plus btn btn-primary"
          onClick={() => setIsAddNoteVisible(true)}
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            padding: "11px",
            width: "60px",
            height: "74px",
            marginTop: "25px",
            marginLeft: "68px",
            backgroundColor: " #32CD32",
          }}
        />
      )}
      {isUserLoggedIn & isAddNoteVisible && (
        <div className="show">
          <i
            className="fa-solid fa-minus btn btn-primary"
            onClick={() => setIsAddNoteVisible(false)}
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              padding: "11px",
              width: "60px",
              height: "74px",
              marginTop: "25px",
              marginLeft: "68px",
              backgroundColor: " #32CD32",
            }}
          />
          <AddNote showAlert={props.showAlert} />
        </div>
      )}
      <button
        ref={ref}
        type="button"
        onClick={() => setIsAddNoteVisible(true)}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ backgroundColor: "#6ec46e" }}>
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ color: "black" }}
              >
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container row myNote">
        {isUserLoggedIn && (
          <h3 style={{ textAlign: "center", fontWeight: "800" }}>My Notes▼</h3>
        )}
        {notes.map((note, index) => {
          const backgroundColor =
            backgroundColors[index % backgroundColors.length];
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              note={note}
              backgroundColor={backgroundColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
