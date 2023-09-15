import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "650163e93813efa187c9f7a5",
      user: "64feb49438f8c5c90600b2e9",
      title: "Early Morning Reminder",
      description:
        "Description must be at least 5 characters this characters this",
      tag: "Personal",
      date: "2023-09-13T07:25:29.175Z",
      __v: 0,
    },
    {
      _id: "65016417097ac180b9fca3e7",
      user: "64feb49438f8c5c90600b2e9",
      title: "Early Morning Reminder",
      description:
        "Description must be at least 5 characters this characters this",
      tag: "Personal",
      date: "2023-09-13T07:26:15.929Z",
      __v: 0,
    },
    {
      _id: "650299153eb821bb5ed32408",
      user: "64feb49438f8c5c90600b2e9",
      title: "Late Evening Reminder",
      description:
        "Description must be at least 5 characters this characters this",
      tag: "Personal",
      date: "2023-09-14T05:24:37.667Z",
      __v: 0,
    },
    {
      _id: "6502991d3eb821bb5ed3240a",
      user: "64feb49438f8c5c90600b2e9",
      title: "Late Evening Reminder2",
      description:
        "Description must be at least 5 characters this characters this",
      tag: "Personal",
      date: "2023-09-14T05:24:45.898Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
