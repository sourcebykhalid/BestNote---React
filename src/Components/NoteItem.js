import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote, backgroundColor } = props;
  return (
    <div className=" notes col-md-3 " style={{ backgroundColor }}>
      <div className="card-body">
        <div className="first-line">
          <h5 className="card-title" style={{ width: "10px" }}>
            {note.title}
          </h5>
          <div className="buttons my-2 " style={{ fontSize: "14px" }}>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
              style={{
                backgroundColor: "#32cd32",
                color: "black",
                borderRadius: "3px",
                padding: "10px",
                cursor: "pointer",
                marginRight: "5px",
              }}
            ></i>

            <i
              className="fa-solid fa-delete-left mx-2  "
              style={{
                backgroundColor: "orangered",
                color: "#1b1c2c",
                borderRadius: "3px",
                padding: "10px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Successfully", "success");
              }}
            ></i>
          </div>
        </div>
      </div>

      <p className="card-text">{note.description}</p>
    </div>
  );
};

export default NoteItem;
