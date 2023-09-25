import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div
      className=" notes col-md-3"
      style={{
        backgroundColor: "rgb(255 235 130/var(--tw-bg-opacity))",
        color: "#fff",
        borderRadius: "5px",
        margin: "23px",
      }}
    >
      <div className="card-body">
        <div className="first-line">
          <h5 className="card-title" style={{ width: "12px" }}>
            {note.title}
          </h5>
          <div className="buttons my-2 " style={{ fontSize: "14px" }}>
            <input
              type="button"
              className="mx-2"
              value="Edit"
              onClick={() => {
                updateNote(note);
              }}
              style={{
                backgroundColor: "steelblue",
                color: "#1b1c1c",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            />

            <input
              type="button"
              value="✕"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Successfully", "success");
              }}
              style={{
                backgroundColor: "orangered",
                color: "#1b1c2c",
                borderRadius: "3px",
                cursor: "pointer",
                // marginLeft: "5px",
              }}
            />
          </div>
        </div>
      </div>

      <p className="card-text">{note.description}</p>
    </div>
  );
};

export default NoteItem;
