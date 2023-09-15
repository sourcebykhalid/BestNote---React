import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card ">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
      <div className="buttons container my-2 ">
        <input
          type="button"
          className="mx-2"
          value="Edit"
          style={{ backgroundColor: "steelblue", borderRadius: "5px" }}
        />
        <input
          type="button"
          value="Delete"
          style={{ backgroundColor: "red", borderRadius: "5px" }}
        />
      </div>
    </div>
  );
};

export default NoteItem;
