/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <AddNote />
      <div className="row my-2 mx-3 ">
        <h3>Your Notes ↓</h3>
        {notes.map((note) => {
          return <Noteitem note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
