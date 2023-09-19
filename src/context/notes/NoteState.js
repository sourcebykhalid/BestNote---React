/* eslint-disable no-unused-vars */
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Note
  const getNotes = async () => {
    // Api Call to fetch all notes
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZWI0OTQzOGY4YzVjOTA2MDBiMmU5In0sImlhdCI6MTY5NDU4ODI1OH0.MfaTxrwcQWecsKl15oKXgKmRtSrrqtOKlCxW0qrVQa0",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  // Add a Note
  const addNote = async (title, description, tag) => {
    // Api Call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZWI0OTQzOGY4YzVjOTA2MDBiMmU5In0sImlhdCI6MTY5NDU4ODI1OH0.MfaTxrwcQWecsKl15oKXgKmRtSrrqtOKlCxW0qrVQa0",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    const note = {
      _id: "6502991d3eb821bb5ed3240a",
      user: "64feb49438f8c5c90600b2e9",
      title: title,
      description: description,
      tag: "",
      date: "2023-09-14T05:24:45.898Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // Api Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZWI0OTQzOGY4YzVjOTA2MDBiMmU5In0sImlhdCI6MTY5NDU4ODI1OH0.MfaTxrwcQWecsKl15oKXgKmRtSrrqtOKlCxW0qrVQa0",
      },
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // Api Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZWI0OTQzOGY4YzVjOTA2MDBiMmU5In0sImlhdCI6MTY5NDU4ODI1OH0.MfaTxrwcQWecsKl15oKXgKmRtSrrqtOKlCxW0qrVQa0",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Edit in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
