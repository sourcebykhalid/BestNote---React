/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container addNote">
      <h3 style={{ textAlign: "center", fontWeight: "600" }}>Add your Note</h3>
      <div className="container" style={{ width: "50%", transition: "2s" }}>
        <form className="my-3">
          <div className="mb-3">
            <label
              htmlFor="title"
              className="form-label"
              style={{ fontWeight: "800" }}
            >
              Title
            </label>
            <input
              placeholder="Enter the title of your note here..."
              autoFocus
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label"
              style={{ fontWeight: "800" }}
            >
              Description
            </label>
            <input
              placeholder="Enter the description of your note here..."
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="tag"
              className="form-label"
              style={{ fontWeight: "800" }}
            >
              Tag
            </label>
            <input
              placeholder="Enter the tag here..."
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={5}
              required
              value={note.tag}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title.length < 5 || note.description.length < 15}
            style={{ backgroundColor: "#32cd32" }}
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
