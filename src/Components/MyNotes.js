// import React, { useState, useRef, useContext, useEffect } from "react";
// import noteContext from "../context/notes/noteContext";
// import NoteItem from "./NoteItem";
// const MyNotes = (props) => {
//   const context = useContext(noteContext);
//   const { notes, getNotes } = context;
//   const ref = useRef(null);
//   const refClose = useRef(null);
//   const [note, setNote] = useState({
//     id: "",
//     etitle: "",
//     edescription: "",
//     etag: "default",
//   });
//   const updateNote = (currentNote) => {
//     ref.current.click();
//     setNote({
//       id: currentNote._id,
//       etitle: currentNote.title,
//       edescription: currentNote.description,
//       etag: currentNote.tag,
//     });
//   };
//   useEffect(() => {
//     getNotes();
//   });
//   return (
//     <div className="container row myNote">
//       <h3 style={{ textAlign: "center" }}>My Notes▼</h3>
//       {notes.map((note) => (
//         <NoteItem
//           key={note._id}
//           note={note}
//           updateNote={updateNote}
//           showAlert={props.showAlert}
//         />
//       ))}
//     </div>
//   );
// };

// export default MyNotes;
